/* Save slots and continuation are additive fields in the existing schema-92 state. */
(() => {
  'use strict';
  const game = window.Game97, escape = pxEsc67;
  const slots = {manual:RC_SAVE_KEY, auto:RC_AUTO_KEY, backup:RC_BACKUP_KEY, recovery:`${RC_SAVE_KEY}-recovery`};
  const labels = {manual:'Manual save', auto:'Autosave', backup:'Previous manual backup', recovery:'Before last load or import'};
  const legacyCandidates = saveCandidates;
  let feedback = '', feedbackError = false, storageError = '', resumeTimer, restoring = false;
  let restoringScroll = 0, importedUnsaved = false;
  const unreadableSlots = new Map();

  function validate(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Not a campaign save.');
    if (typeof data.name !== 'string' || !SPECIES[data.species] || !CAREERS[data.career]) throw new Error('Missing or unknown character identity.');
    if (!CAREERS[data.career].specs[data.spec]) throw new Error('Unknown character specialization.');
    for (const key of ['chars', 'skills']) if (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key])) throw new Error(`Invalid ${key}.`);
    const integer=(value,path,min=0,max=Number.MAX_SAFE_INTEGER)=>{
      if(!Number.isSafeInteger(value)||value<min||value>max)throw new Error(`Invalid ${path}. Expected a whole number from ${min} to ${max}.`);
    };
    integer(data.credits,'credits');
    if(data.schemaVersion!==undefined)integer(data.schemaVersion,'schemaVersion',1);
    if (data.schemaVersion > 92) throw new Error('This save uses a newer, unsupported schema.');
    for(const key of Object.keys(SPECIES[data.species].c))integer(data.chars[key],`chars.${key}`,1,7);
    for(const [key,value] of Object.entries(data.skills))integer(value,`skills.${key}`,0,5);
    for(const key of ['xpStart','xpSpent','earnedXp','forceRating','wounds','strain','stimpacks','stimUses','reloads','conflict'])
      if(data[key]!==undefined)integer(data[key],key);
    if(data.morality!==undefined)integer(data.morality,'morality',0,100);
    const inspect=(value,base,path='campaign')=>{
      if(value===null){if(base!==undefined&&base!==null)throw new Error(`Invalid ${path}.`);return;}
      if(Array.isArray(base)&&!Array.isArray(value))throw new Error(`Invalid ${path}.`);
      if(typeof base==='number'&&!Number.isFinite(value))throw new Error(`Invalid ${path}.`);
      if(base&&typeof base==='object'&&!Array.isArray(base)&&(!value||typeof value!=='object'||Array.isArray(value)))throw new Error(`Invalid ${path}.`);
      if(typeof base==='boolean'&&typeof value!=='boolean')throw new Error(`Invalid ${path}.`);
      if(value&&typeof value==='object')for(const [key,entry] of Object.entries(value)){
        if(['__proto__','constructor','prototype'].includes(key))throw new Error(`Unsafe field ${path}.${key}.`);
        inspect(entry,base?.[key],`${path}.${key}`);
      }
    };
    inspect(data,game.freshState());
    for(const group of ['world','medical','destiny','ordnance','charSpend','dedication'])
      if(data[group]&&typeof data[group]==='object')for(const [key,value]of Object.entries(data[group]))
        if(typeof value==='number')integer(value,`${group}.${key}`,group==='world'&&key==='day'?1:0);
    if (data.talents && !Array.isArray(data.talents)) throw new Error('Invalid talent list.');
    for(const key of ['freeCareer','freeSpec','ownedSpecs','universalSpecs','crew','inventory'])
      if(data[key] && !Array.isArray(data[key]))throw new Error(`Invalid ${key} list.`);
    for(const key of ['forceOwned','specTalents','universalTalents']) {
      if(!data[key])continue;
      if(typeof data[key]!=='object'||Array.isArray(data[key])||Object.values(data[key]).some(value=>!Array.isArray(value)))throw new Error(`Invalid ${key} data.`);
    }
    game.campaign?.validateSnapshot(data);
    window.Talents98?.validateSnapshot(data);
    window.Species117?.validateSnapshot(data);
    window.Species120?.validateSnapshot(data);
    return data;
  }
  function candidates() {
    storageError = '';
    let raw;
    try { raw = legacyCandidates(); const recovery=localStorage.getItem(slots.recovery);if(recovery)raw.push({key:slots.recovery,raw:recovery}); }
    catch (error) { storageError = `Saved games cannot be read: ${error.message}`; return []; }
    return raw.map((entry, order) => {
      const kind = Object.keys(slots).find(k => slots[k] === entry.key) || 'legacy';
      try {
        const unreadable=unreadableSlots.get(entry.key);
        if(unreadable?.raw===entry.raw)throw new Error(unreadable.error);
        const data = validate(JSON.parse(entry.raw));
        const exact = Number.isFinite(Date.parse(data.saveInfo97?.savedAt));
        const at = exact ? data.saveInfo97.savedAt : data.lastSaved;
        return {...entry, data, kind, order, exact, at, time:Date.parse(at) || 0, valid:true};
      } catch (error) { return {...entry, kind, order, valid:false, error:error.message, time:0}; }
    }).sort((a,b) => b.time-a.time || a.order-b.order);
  }
  function currentScreen() { return activeTabId78(); }
  function playableScreen(id) {
    if(id==='combat'&&!S.combat)return false;
    return typeof id === 'string' && /^[a-zA-Z0-9_-]+$/.test(id) &&
      document.getElementById(id)?.classList.contains('tab') && !['save97','playhub80','about97'].includes(id);
  }
  function capture() {
    const id = currentScreen();
    if (playableScreen(id)) S.resume97 = {
      screen:id, panel:id === 'worktraining96' ? S.downtime96?.panel : null,
      windowScroll:Math.max(0,window.scrollY || 0),
      hostScroll:Math.max(0,document.getElementById('tabHost78')?.scrollTop || 0)
    };
    return S.resume97;
  }
  function resumeCurrent() {
    clearTimeout(resumeTimer);
    const stored = S.resume97 && typeof S.resume97 === 'object' ? {...S.resume97} : {};
    const id = S.combat ? 'combat' : playableScreen(stored.screen) ? stored.screen : S.finalized ? 'playhub80' : game.campaign ? 'campaignSetup97' : 'guide';
    const wasRestoring=restoring;restoring = true;
    try {
      if (id === 'worktraining96' && S.downtime96) S.downtime96.panel = stored.panel === 'training' ? 'training' : 'jobs';
      if (PX67.dialog) closePixelDialog67(false);
      WORLD94.menu = WORLD94.drawer = false;
      renderNavTab(id);
      const token = ++restoringScroll;
      requestAnimationFrame(() => {
        if (token !== restoringScroll || currentScreen() !== id) return;
        const host = document.getElementById('tabHost78');
        if (host) host.scrollTop = Math.max(0,Number(stored.hostScroll) || 0);
        window.scrollTo({top:Math.max(0,Number(stored.windowScroll) || 0),behavior:'auto'});
      });
    } finally { restoring = wasRestoring; }
    return id;
  }
  function message(text, error=false) { feedback=text; feedbackError=error; refresh(); }
  function write(kind) {
    if (kind === 'auto' && (!game.ready || game.hydrating || restoring || importedUnsaved || !S.settings?.autosave || !S.finalized)) return false;
    clearTimeout(resumeTimer); capture();
    const stamp = new Date().toISOString();
    const data = serializableState();
    data.resume97 = S.resume97 ? {...S.resume97} : null;
    data.lastSaved = stamp;
    data.saveInfo97 = {savedAt:stamp, kind, build:BUILD_INFO.version,
      objective:typeof objectiveGuide75 === 'function' ? objectiveGuide75() : objectiveText()};
    try {
      validate(data);
      const raw = JSON.stringify(data);
      if (kind === 'manual') {
        const previous = localStorage.getItem(slots.manual);
        if (previous) {
          let readable=true;
          try{validate(JSON.parse(previous));}catch{readable=false;}
          if(readable)localStorage.setItem(slots.backup,previous);
        }
      }
      localStorage.setItem(slots[kind],raw);
      if (localStorage.getItem(slots[kind]) !== raw) throw new Error('The browser did not retain the save.');
      S.lastSaved=stamp; S.saveInfo97=data.saveInfo97;
      unreadableSlots.delete(slots[kind]);
      storageError='';
      if (kind === 'manual') {importedUnsaved=false;feedback='Manual save written. The previous manual save is retained as your backup.';}
      feedbackError=false;
      refresh(); return true;
    } catch (error) {
      feedback=`${labels[kind]} failed: ${error.message} Export your campaign to keep a file copy.`;
      feedbackError=true;
      S.saveWarnings = [...(S.saveWarnings || []), feedback].slice(-20);
      refresh(); return false;
    }
  }
  function checkpoint() {
    const current=serializableState(),fresh=game.freshState();
    const creationChanged=['name','species','career','spec','chars','skills','charSpend','xpSpent','talents','forceOwned','freeCareer','freeSpec','campaign97','speciesBonus97','universalKnowledge97'].some(key=>JSON.stringify(current[key])!==JSON.stringify(fresh[key]));
    if(!S.finalized&&!S.lastSaved&&!creationChanged)return;
    capture();const data=validate(serializableState()),stamp=new Date().toISOString();
    data.lastSaved=stamp;data.saveInfo97={savedAt:stamp,kind:'recovery',build:BUILD_INFO.version,objective:typeof objectiveGuide75==='function'?objectiveGuide75():objectiveText()};
    const raw=JSON.stringify(data);localStorage.setItem(slots.recovery,raw);
    if(localStorage.getItem(slots.recovery)!==raw)throw new Error('Recovery checkpoint could not be retained. Export your current campaign before loading another.');
  }
  function apply(data, label, {recover=true,imported=false}={}) {
    validate(data); clearTimeout(resumeTimer);
    if(recover)checkpoint();
    const before = JSON.parse(JSON.stringify(serializableState()));
    restoring = true;
    try { hydrateState(data,label);resumeCurrent(); }
    catch (error) {
      for(const key of Object.keys(S))if(!Object.hasOwn(before,key))delete S[key];
      hydrateState(before,'current game restored after unsuccessful load');
      resumeCurrent();
      throw error;
    } finally { restoring = false; }
    importedUnsaved=imported;
    feedback=`Loaded ${label}.`;feedbackError=false;
    refresh(); return true;
  }
  function loadSlot(kind='latest') {
    const rows=candidates();
    const eligible=rows.filter(r=>r.valid&&(kind==='latest'?r.kind!=='recovery':r.kind===kind));
    if (!eligible.length) { message(storageError || `No readable ${kind==='latest'?'saved game':labels[kind]} is available.`,true); return false; }
    let failure;
    for(const row of eligible){
      try{return apply(row.data,kind==='latest' ? `${labels[row.kind] || 'older save'} · ${formatTime(row)}` : labels[kind],{recover:row.kind!=='recovery'});}
      catch(error){failure=error;unreadableSlots.set(row.key,{raw:row.raw,error:error.message});}
    }
    message(`Load failed: ${failure.message} Your current campaign has been retained.`,true);return false;
  }
  function formatTime(row) {
    return row.time ? new Date(row.time).toLocaleString() : 'Timestamp unavailable';
  }
  function screenTitle(data) {
    const id=data.resume97?.screen;
    if(id==='combat'&&data.combat)return 'Combat';
    if (id==='worktraining96') return data.resume97.panel==='training' ? 'Training' : 'Jobs';
    return document.querySelector(`#nav button[data-tab="${playableScreen(id)?id:'playhub80'}"]`)?.textContent || 'Play Hub';
  }
  function slotHTML(kind, rows) {
    const row=rows.find(r=>r.kind===kind);
    if (!row) return `<article class="save-slot97"><h3>${labels[kind]}</h3><p>No save in this slot.</p></article>`;
    if (!row.valid) return `<article class="save-slot97"><h3>${labels[kind]}</h3><p>Unreadable save: ${escape(row.error)}</p><p class="save-note97">Other slots remain available. This slot has not been changed.</p></article>`;
    const data=row.data;
    return `<article class="save-slot97"><h3>${labels[kind]}</h3><time>${escape(formatTime(row))}</time>${!row.exact?'<p class="save-note97">Legacy timestamp: older autosaves may carry the last manual-save time.</p>':''}<p><b>${escape(data.name)}</b> · Day ${Number(data.world?.day)||1}<br>${Number(data.credits).toLocaleString()} credits · ${escape(screenTitle(data))}</p><p>${escape(data.saveInfo97?.objective || 'Objective details are restored with this campaign.')}</p><button class="btn" data-loadslot97="${kind}">${kind==='recovery'?'Restore before last load':kind==='backup'?'Restore backup':`Load ${kind==='auto'?'autosave':'manual'}`}</button></article>`;
  }
  function install() {
    const host=document.getElementById('tabHost78') || document.querySelector('.wrap');
    if (!host) return;
    if (!document.getElementById('save97')) {
      const section=document.createElement('section');section.id='save97';section.className='tab card hidden tab78';section.setAttribute('aria-label','Saved games');host.appendChild(section);
      const nav=document.createElement('button');nav.dataset.tab='save97';nav.dataset.icon='▣';nav.textContent='Saved games';nav.onclick=openManager;document.getElementById('nav')?.appendChild(nav);
      NAV_GROUP_MAP80.save97='core';CORE_TAB_SET80.add('save97');
    }
    for (const id of ['guideLoad','load']) {const button=document.getElementById(id);if(button){button.textContent='Saved games';button.onclick=openManager;}}
    for (const id of ['guideSave','save']) {const button=document.getElementById(id);if(button)button.onclick=()=>write('manual');}
    const worldButton=document.getElementById('worldSave94');
    if (worldButton) {worldButton.textContent='Saves';worldButton.onclick=openManager;}
    const continueButton=document.getElementById('playHubContinue80');
    if (continueButton) {continueButton.textContent=game.home?(S.finalized?'Continue':'Continue creation'):'Continue current game';continueButton.onclick=resumeCurrent;}
  }
  function refresh() {
    install(); const rows=candidates(), latest=rows.find(r=>r.valid&&r.kind!=='recovery');
    const status=document.getElementById('saveStatus');
    if (status) status.textContent=feedbackError ? 'Save needs attention' : latest ? `${labels[latest.kind] || 'Saved'} · ${formatTime(latest)}` : storageError ? 'Saves unavailable' : 'No saved game';
    const section=document.getElementById('save97');
    if (section) {
      section.innerHTML=`<h2>Saved games</h2><p class="save-note97">Loading or importing first preserves your current campaign in “Before last load or import.” Manual saves, autosaves, and the previous manual backup stay separate.</p>${importedUnsaved?'<p role="status">Imported campaign: autosave is paused until you save manually. Export a file copy if you prefer.</p>':''}<div class="save-actions97"><button class="btn primary" id="resumeLatest97" ${latest?'':'disabled'}>Resume latest</button><button class="btn" id="manualSave97">Save current game</button><button class="btn" id="exportSave97">Export campaign</button><button class="btn" id="importSave97">Import campaign</button><button class="btn" id="continueCurrent97">Return to current game</button></div>${feedback||storageError?`<div class="save-feedback97 ${feedbackError||storageError?'error':''}" role="status">${escape(storageError||feedback)}</div>`:''}<div class="save-slots97">${Object.keys(slots).map(kind=>slotHTML(kind,rows)).join('')}</div><p class="save-note97">Resume latest uses the newest readable manual, auto, backup, or older save; it excludes the recovery checkpoint. Restoring the checkpoint leaves it available. Exported files let you move a campaign between browsers or devices.</p>${rows.some(r=>r.kind==='legacy')?`<details class="save-legacy97"><summary>Older save slots</summary>${rows.filter(r=>r.kind==='legacy').map(r=>`<p>${escape(r.key)} · ${r.valid?escape(formatTime(r)):'Unreadable'}</p>`).join('')}</details>`:''}`;
      section.querySelectorAll('[data-loadslot97]').forEach(b=>b.onclick=()=>loadSlot(b.dataset.loadslot97));
      document.getElementById('resumeLatest97').onclick=()=>loadSlot('latest');
      document.getElementById('manualSave97').onclick=()=>write('manual');
      document.getElementById('exportSave97').onclick=()=>{capture();exportJSON();};
      document.getElementById('importSave97').onclick=()=>document.getElementById('importSaveFile').click();
      document.getElementById('continueCurrent97').onclick=resumeCurrent;
    }
    const hub=document.getElementById('playhub80');
    if (hub && game.home) game.home.refreshSaved(latest);
    else if (hub) {
      let card=document.getElementById('resumeCard97');
      if (!card) {card=document.createElement('div');card.id='resumeCard97';card.className='save-panel97 save-resume97';hub.insertBefore(card,hub.firstChild);}
      card.innerHTML=`<div><b>${latest?'Your saved campaign':'Saved games'}</b><div class="save-note97">${latest?`${escape(latest.data.name)} · ${escape(formatTime(latest))}`:'Save or import a campaign to resume it later.'}</div></div><div class="save-actions97"><button class="btn primary" id="hubResumeLatest97" ${latest?'':'disabled'}>Resume latest</button><button class="btn" id="hubSaves97">Saved games</button></div>`;
      document.getElementById('hubResumeLatest97').onclick=()=>loadSlot('latest');document.getElementById('hubSaves97').onclick=openManager;
    }
  }
  function openManager() { capture(); renderNavTab('save97'); refresh(); }
  save=()=>write('manual'); safeAutosave=()=>write('auto'); load=()=>loadSlot('latest');
  newestSaveRaw=()=>candidates().find(row=>row.valid&&row.kind!=='recovery')||null;
  continueBestScreen80=resumeCurrent;
  importSaveFile=file=>{
    if (!file) return;
    const reader=new FileReader();
    reader.onload=()=>{
      try {const data=validate(JSON.parse(reader.result));apply(data,'imported campaign',{imported:true});message('Imported campaign loaded. Autosave is paused until you save manually. Your previous campaign is available in the recovery checkpoint.');}
      catch(error){message(`Import failed: ${error.message} Your current campaign has been retained.`,true);}
    };
    reader.onerror=()=>message('The selected file could not be read.',true);reader.readAsText(file);
  };
  game.on('install',install);game.on('render',refresh);
  game.on('ready',()=>{
    refresh();
    // Offer the saved campaign without silently loading or overwriting it.
    if(candidates().some(row=>row.valid&&row.kind!=='recovery'))renderNavTab('playhub80');
  });
  game.on('hydrate',data=>{
    clearTimeout(resumeTimer);feedback='';feedbackError=false;
    S.resume97=data.resume97 && typeof data.resume97==='object' ? {...data.resume97} : null;
    S.saveInfo97=data.saveInfo97 && typeof data.saveInfo97==='object' ? {...data.saveInfo97} : null;
    S.lastSaved=data.saveInfo97?.savedAt || data.lastSaved || null;
  });
  game.on('navigate',({id,internal})=>{
    if (!internal && !restoring && game.ready && playableScreen(id)) {
      restoringScroll++;capture();clearTimeout(resumeTimer);resumeTimer=setTimeout(()=>safeAutosave(),150);
    }
    refresh();
  });
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')safeAutosave();});
  window.addEventListener('pagehide',()=>safeAutosave());
  game.saves={candidates,loadSlot,write,validate,apply,open:openManager,refresh};
  game.resume={capture,current:resumeCurrent};
})();
