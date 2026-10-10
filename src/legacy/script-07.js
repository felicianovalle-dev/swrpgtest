
/* =========================================================
   PHASE 65 — MOBILE / IPHONE APP PASS
   PHASE 66 — V1.2 RELEASE & BALANCE PASS
   ========================================================= */
BUILD_INFO.version='66.0.0-v1.2-release';
BUILD_INFO.architecture='single-file responsive browser + installable PWA build';
BUILD_INFO.saveSchema=66;

const _p66Ensure64=ensurePhase64State;
function ensurePhase66State(){
  _p66Ensure64();
  S.schemaVersion=66;
  S.settings={mobileHud:true,highContrast:false,...(S.settings||{})};
  S.release66=S.release66&&typeof S.release66==='object'?S.release66:{firstSeen:new Date().toISOString(),notesSeen:false};
  return S;
}

function appMode65(){return (window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true?'standalone':'browser'}
function onlineLabel65(){return navigator.onLine===false?'OFFLINE':'ONLINE'}
function ensureMobileChrome65(){
  if(!$('mobileStatus65')){
    let host=document.createElement('div');host.id='mobileStatus65';host.className='mobile-status65';host.setAttribute('aria-live','polite');
    let wrap=document.querySelector('.wrap');wrap?.insertBefore(host,wrap.firstChild);
  }
  if(!$('mobileQuick65')){
    let sheet=document.createElement('div');sheet.id='mobileQuick65';sheet.className='mobile-quick65 hidden';sheet.setAttribute('aria-label','Mobile quick actions');
    sheet.innerHTML=`<div class="mobile-quick-card65"><div class="row"><div><b>Quick Actions</b><div id="mobileMode65" class="tiny"></div></div><button id="mobileQuickClose65" class="btn">Close</button></div><div class="mobile-quick-grid65"><button class="btn primary" data-q65="continue">Continue</button><button class="btn good" data-q65="save">Quick Save</button><button class="btn" data-q65="explore">Explore</button><button class="btn" data-q65="galaxy">Galaxy</button><button class="btn" data-q65="story">Story</button><button class="btn" data-q65="base">Base</button><button class="btn" data-q65="recovery">Recovery</button><button class="btn" data-q65="crew">Crew</button><button class="btn" data-q65="export">Export Save</button><button class="btn" data-q65="import">Import Save</button></div><div id="mobileInstall65" class="mobile-appnote65 small"></div></div>`;
    document.body.appendChild(sheet);
    sheet.addEventListener('click',e=>{if(e.target===sheet)closeMobileQuick65()});
    $('mobileQuickClose65').onclick=closeMobileQuick65;
    sheet.querySelectorAll('[data-q65]').forEach(b=>b.onclick=()=>mobileQuickAction65(b.dataset.q65));
  }
  document.body.dataset.appMode=appMode65();
  updateMobileStatus65();
}
function openMobileQuick65(){ensureMobileChrome65();let sheet=$('mobileQuick65');sheet?.classList.remove('hidden');let standalone=appMode65()==='standalone';if($('mobileMode65'))$('mobileMode65').textContent=`${standalone?'Home Screen app':'Browser'} · ${onlineLabel65()}`;if($('mobileInstall65'))$('mobileInstall65').textContent=standalone?'Running in standalone Home Screen mode. Saves remain on this device; export backups before clearing website data.':'iPhone: for the app-like version, host the PWA folder over HTTPS, open it in Safari, then use Share → Add to Home Screen. The PWA caches the game for offline play after its first successful load.'}
function closeMobileQuick65(){$('mobileQuick65')?.classList.add('hidden')}
function mobileQuickAction65(action){
  if(action==='continue')renderNavTab(recommendedTab());
  else if(action==='save')save();
  else if(action==='explore')renderNavTab('explore');
  else if(action==='galaxy')renderNavTab('galaxy');
  else if(action==='story')renderNavTab('story61tab');
  else if(action==='base')renderNavTab('base');
  else if(action==='recovery')renderNavTab('recovery');
  else if(action==='crew')renderNavTab('crewmgmt');
  else if(action==='export')exportJSON();
  else if(action==='import')$('importSaveFile')?.click();
  if(!['export','import'].includes(action))closeMobileQuick65();
}
function mobileVital65(){
  let wt=typeof woundThreshold==='function'?woundThreshold():0,st=typeof strainThreshold==='function'?strainThreshold():0;
  return {w:`${Number(S.wounds||0)}/${wt}`,s:`${Number(S.strain||0)}/${st}`}
}
function updateMobileStatus65(){
  if(!$('mobileStatus65'))return;ensurePhase66State();let v=mobileVital65(),hub='Character Creation';try{hub=S.finalized&&S.world?hub50().name:hub}catch(e){}
  let objective='Build your character.';try{objective=objectiveText()}catch(e){}
  $('mobileStatus65').innerHTML=`<div class="mobile-main65"><div style="min-width:0"><div class="tiny">${opEsc(hub)} · ${onlineLabel65()}</div><div class="mobile-objective65"><b>${opEsc(objective)}</b></div><div class="mobile-stats65"><span class="pill">XP ${S.finalized?S.earnedXp:Math.max(0,S.xpStart-S.xpSpent)}</span><span class="pill">Cr ${Number(S.credits||0).toLocaleString()}</span><span class="pill">W ${v.w}</span><span class="pill">S ${v.s}</span><span class="pill">Day ${Number(S.world?.day||1)}</span></div></div><button id="mobileQuickOpen65" class="mobile-iconbtn65" aria-label="Open quick actions">⋯</button></div>`;
  $('mobileQuickOpen65').onclick=openMobileQuick65;
}
function applyMobilePreferences65(){ensurePhase66State();document.body.dataset.mobileHud=S.settings.mobileHud?'on':'off';document.body.dataset.contrast=S.settings.highContrast?'high':'normal';document.body.dataset.appMode=appMode65()}
function injectMobileSettings65(){
  let settings=$('difficultySelect')?.closest('.card');if(!settings||$('mobileHudSelect65'))return;
  settings.insertAdjacentHTML('beforeend',`<label style="display:block;margin-top:8px">Mobile status HUD<select id="mobileHudSelect65"><option value="on">On</option><option value="off">Off</option></select></label><label style="display:block;margin-top:8px">Contrast<select id="contrastSelect65"><option value="normal">Standard</option><option value="high">High contrast</option></select></label>`);
  $('mobileHudSelect65').onchange=()=>{S.settings.mobileHud=$('mobileHudSelect65').value==='on';applyMobilePreferences65();safeAutosave()};
  $('contrastSelect65').onchange=()=>{S.settings.highContrast=$('contrastSelect65').value==='high';applyMobilePreferences65();safeAutosave()};
}
function syncMobileSettings65(){injectMobileSettings65();if($('mobileHudSelect65'))$('mobileHudSelect65').value=S.settings.mobileHud?'on':'off';if($('contrastSelect65'))$('contrastSelect65').value=S.settings.highContrast?'high':'normal';applyMobilePreferences65()}

// Fix Story Engine's historical Episode-0 #story ID collision without changing the Episode 0 text container.
function ensureStoryTab66(){
  let nav=$('nav');let btn=nav?.querySelector('[data-tab="story61tab"]');
  if(!btn&&nav){btn=document.createElement('button');btn.dataset.tab='story61tab';btn.textContent='Story';let gm=nav.querySelector('[data-tab="gm"]');nav.insertBefore(btn,gm)}
  if(!$('story61tab')){let sec=document.createElement('section');sec.id='story61tab';sec.className='tab card hidden';let gm=$('gm');gm?.parentNode.insertBefore(sec,gm)}
  if(btn&&!btn.dataset.phase66Bound){btn.dataset.phase66Bound='1';btn.addEventListener('click',()=>renderNavTab('story61tab'))}
  refreshMobileAllTabs52?.();
}

function releaseCounts66(){
  let hubs=Object.keys(GALAXY_HUBS_50||{}).length,districts=Object.values(DISTRICTS_51||{}).reduce((n,a)=>n+(a?.length||0),0),stories=Object.keys(STORY_TEMPLATES_61||{}).length;
  return {hubs,districts,stories,baseTypes:Object.keys(BASE_TYPES_62||{}).length,facilities:Object.keys(FACILITIES_62||{}).length,ops:Object.keys(OPERATION_TYPES||{}).length}
}
function releaseBalance66(){
  let opTypes=Object.values(OPERATION_TYPES||{}),credits=opTypes.map(x=>Number(x.baseCredits||0)).filter(Number.isFinite),storyRewards=Object.values(STORY_TEMPLATES_61||{}).map(x=>Number(x.reward?.xp||0)).filter(Number.isFinite);
  return {operationCreditMin:credits.length?Math.min(...credits):0,operationCreditMax:credits.length?Math.max(...credits):0,storyXpMin:storyRewards.length?Math.min(...storyRewards):0,storyXpMax:storyRewards.length?Math.max(...storyRewards):0};
}
function injectRelease66(){
  if(!$('guide'))return;ensurePhase66State();let c=$('release66');if(!c){c=document.createElement('div');c.id='release66';c.className='card release66';c.style.marginTop='12px';$('guide').appendChild(c)}
  let n=releaseCounts66(),bal=releaseBalance66();
  c.innerHTML=`<div class="row"><div><b>Sable Reach v1.2 · Release Build</b><div class="small">Phase 66 closes the current roadmap with mobile polish, migration hardening, UI cleanup, and whole-project validation.</div></div><span class="tag good">v1.2</span></div><div class="release66-grid"><div class="release66-stat"><div class="tiny">GALAXY HUBS</div><b>${n.hubs}</b></div><div class="release66-stat"><div class="tiny">DISTRICTS</div><b>${n.districts}</b></div><div class="release66-stat"><div class="tiny">STORY ARCS</div><b>${n.stories}</b></div><div class="release66-stat"><div class="tiny">BASE FACILITIES</div><b>${n.facilities}</b></div></div><div class="release66-notes"><div><b>Phase 65 · Mobile/App</b><div class="small">Compact sticky mobile status, quick-actions sheet, standalone/offline status, iPhone-safe viewport handling, 16px form fields to prevent unwanted Safari zoom, landscape tuning, high-contrast mode, and stronger touch/focus targets.</div></div><div><b>Phase 66 · Release/Balance</b><div class="small">Story-tab collision fixed, v1.2 save namespace/migration, final export naming, release diagnostics, accessibility pass, and a non-destructive economy sanity check. Current operation base rewards span ${bal.operationCreditMin.toLocaleString()}–${bal.operationCreditMax.toLocaleString()} credits; story finales award ${bal.storyXpMin}–${bal.storyXpMax} XP before optional bonuses.</div></div></div><div class="pills" style="margin-top:10px"><button id="releaseValidate66" class="btn primary">Run v1.2 Validation</button><button id="releaseBackup66" class="btn">Export Backup</button></div><div id="releaseStatus66" class="small" style="margin-top:8px"></div>`;
  $('releaseValidate66').onclick=()=>{let rows=phase45Diagnostics(),bad=rows.filter(x=>!x.ok);$('releaseStatus66').innerHTML=bad.length?`<span class="bad">${bad.length} validation issue(s): ${opEsc(bad.map(x=>x.name).join(', '))}</span>`:`<span class="good">${rows.length} release diagnostics passed.</span>`};
  $('releaseBackup66').onclick=exportJSON;
}

const _p66Serializable=serializableState;
serializableState=function(){ensurePhase66State();let x=_p66Serializable();x.schemaVersion=66;S.schemaVersion=66;return x};

const _p66RenderNav=renderNavTab;
renderNavTab=function(id){ensureStoryTab66();ensurePhase66State();let r=_p66RenderNav(id);if(id==='story61tab')renderStory61();S.schemaVersion=66;syncMobileNav52?.(id);updateMobileStatus65();return r};
const _p66RenderAll=renderAll;
renderAll=function(){ensurePhase66State();ensureStoryTab66();let r=_p66RenderAll();S.schemaVersion=66;syncMobileSettings65();ensureMobileChrome65();injectRelease66();updateMobileStatus65();return r};
const _p66Global=updateGlobalStatus;
updateGlobalStatus=function(){let r=_p66Global();updateMobileStatus65();return r};
const _p66Guide=renderGuide;
renderGuide=function(){let r=_p66Guide();syncMobileSettings65();injectRelease66();return r};
const _p66ApplyVisual=applyVisualSettings;
applyVisualSettings=function(){let r=_p66ApplyVisual();applyMobilePreferences65();return r};

// v1.2 save/export labels.
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Sable Reach v1.2 / Phase 66. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};
exportJSON=function(){try{let data=JSON.stringify(serializableState(),null,2),blob=new Blob([data],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${(S.name||'Sable_Reach').replace(/[^a-z0-9]+/gi,'_')}_Sable_Reach_v1_2_Save.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);bLog('v1.2 save backup exported.')}catch(err){showRuntimeError(`Export failed: ${err.message}`)}};

// Keep all action buttons bound to the latest overridden save/export functions.
function rebindReleaseActions66(){for(const id of ['save','guideSave'])if($(id))$(id).onclick=save;for(const id of ['export','guideExport'])if($(id))$(id).onclick=exportJSON}

RULE_AUDIT.unshift(
 {id:'mobile65',name:'Phase 65 dedicated iPhone/mobile app pass',status:'adapted',source:'Original Sable Reach interface layer',detail:'Adds a compact mobile status HUD, quick-action sheet, standalone/offline indicators, viewport safe-area handling, landscape tuning, high-contrast option, accessible focus states, and touch-first sizing. No tabletop rule is changed.'},
 {id:'release66',name:'Phase 66 v1.2 release and balance pass',status:'adapted',source:'Whole-project Sable Reach integration pass',detail:'Fixes the Story-tab DOM collision, moves saves to schema 66 with migration from Phase 64/62, cleans release-facing labels, adds final diagnostics, and sanity-checks reward ranges without silently rewriting source-derived mechanics.'}
);

const _p66Diagnostics=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p66Diagnostics().filter(x=>!/^Phase 64 save (schema|serialization)$/.test(x.name));const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});ensurePhase66State();ensureStoryTab66();let n=releaseCounts66(),ids=[...document.querySelectorAll('[id]')].map(x=>x.id),dups=ids.filter((id,i)=>ids.indexOf(id)!==i);
  add('Phase 65 iPhone viewport',document.querySelector('meta[name="viewport"]')?.content.includes('viewport-fit=cover'),'safe-area capable viewport');
  add('Phase 65 mobile quick actions',!!$('mobileStatus65')&&!!$('mobileQuick65')&&$('mobileQuick65').querySelectorAll('[data-q65]').length>=10,'touch-first HUD and quick sheet present');
  add('Phase 65 accessibility polish',getComputedStyle(document.body).getPropertyValue('--tap').trim().length>0&&!!$('contrastSelect65'),'focus/touch sizing + high-contrast control');
  add('Phase 66 Story tab collision fixed',!!$('story61tab')&&$('story')!==$('story61tab')&&document.querySelector('[data-tab="story61tab"]'),'Episode 0 #story remains separate from Story Engine tab');
  add('Phase 66 unique DOM IDs',dups.length===0,dups.length?`duplicates: ${[...new Set(dups)].join(', ')}`:'no duplicate ids');
  add('Phase 66 content integration',n.hubs>=16&&n.districts>=65&&n.stories>=4&&n.baseTypes>=6&&n.facilities>=8,`${n.hubs} hubs · ${n.districts} districts · ${n.stories} stories · ${n.baseTypes} base types · ${n.facilities} facilities`);
  let bal=releaseBalance66();add('Phase 66 reward sanity',bal.operationCreditMin>=100&&bal.operationCreditMax<=5000&&bal.storyXpMin>=5&&bal.storyXpMax<=50,`operations ${bal.operationCreditMin}–${bal.operationCreditMax} cr · story ${bal.storyXpMin}–${bal.storyXpMax} XP`);
  add('Phase 66 save schema',S.schemaVersion===66&&BUILD_INFO.saveSchema===66&&serializableState().schemaVersion===66,'schema 66');
  try{let x=JSON.parse(JSON.stringify(serializableState()));add('Phase 66 save serialization',x.schemaVersion===66&&typeof x.world?.sim64==='object'&&typeof x.org62==='object','campaign + dynamic galaxy + organization survive JSON round-trip')}catch(e){add('Phase 66 save serialization',false,e.message)}
  return rows
};

const _p66Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p66Smoke();report.failed=report.failed.filter(x=>!x.startsWith('Phase 64 schema target:')&&!x.startsWith('Phase 61 Story tab renders:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase66State();ensureStoryTab66();ensureMobileChrome65();syncMobileSettings65();
  test('Phase 65 mobile status HUD exists',()=>!!$('mobileStatus65')&&!!$('mobileQuickOpen65'));
  test('Phase 65 mobile quick sheet has ten actions',()=>$('mobileQuick65').querySelectorAll('[data-q65]').length>=10);
  test('Phase 65 viewport supports iPhone safe areas',()=>document.querySelector('meta[name="viewport"]')?.content.includes('viewport-fit=cover'));
  test('Phase 65 high-contrast preference persists',()=>{let before=S.settings.highContrast;S.settings.highContrast=true;applyMobilePreferences65();let ok=document.body.dataset.contrast==='high';S.settings.highContrast=before;applyMobilePreferences65();return ok});
  test('Phase 66 Story Engine owns a real tab section',()=>{renderNavTab('story61tab');return !$('story61tab').classList.contains('hidden')&&$('story61tab').textContent.includes('Story Engine')});
  test('Phase 66 preserves Episode 0 story container',()=>!!$('adventure').querySelector('#story')&&$('story')!==$('story61tab'));
  test('Phase 66 has no duplicate DOM ids',()=>{let ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return new Set(ids).size===ids.length});
  test('Phase 66 schema target',()=>{ensurePhase66State();return BUILD_INFO.saveSchema===66&&S.schemaVersion===66&&serializableState().schemaVersion===66});
  test('Phase 66 release diagnostics all pass',()=>phase45Diagnostics().every(x=>x.ok));
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

// Final release-facing diagnostics wording.
const _p66ReleaseReadiness=renderReleaseReadiness;
renderReleaseReadiness=function(){let r=_p66ReleaseReadiness();if($('releasePanel')){$('releasePanel').querySelector('b')?.replaceChildren(document.createTextNode('Sable Reach v1.2 Diagnostics'));let sm=$('releasePanel').querySelector('.small');if(sm)sm.textContent='Non-destructive whole-project structural checks. The browser smoke suite remains available through the build test hook.'}return r};

window.addEventListener('online',()=>{updateMobileStatus65();openMobileQuick65();closeMobileQuick65()});
window.addEventListener('offline',updateMobileStatus65);
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMobileQuick65();$('mobileSheet52')?.classList.add('hidden')}});

ensurePhase66State();ensureStoryTab66();ensureMobileChrome65();syncMobileSettings65();rebindReleaseActions66();document.title='Star Wars: Sable Reach v1.2 — Phase 66';
let topTitle=document.querySelector('.top h1');if(topTitle)topTitle.textContent='STAR WARS: SABLE REACH v1.2';
renderAll();injectRelease66();renderReleaseReadiness();
window.__SABLE_REACH__={version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,galaxy:()=>({hubs:GALAXY_HUBS_50,influence:S.world?.sim64?.influence}),release:()=>({counts:releaseCounts66(),balance:releaseBalance66(),schema:S.schemaVersion})};
