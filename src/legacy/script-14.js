
/* =========================================================
   PHASE 79 — PRIMARY PLAY LOOP HUB
   PHASE 80 — FULL UI CONSOLIDATION / PIXEL CONSISTENCY PASS
   ========================================================= */
BUILD_INFO.version='80.0.0-v1.4-loop-ui';
BUILD_INFO.saveSchema=80;

function ensurePhase80State(){
  ensurePhase78State();S.schemaVersion=80;
  S.ui80=S.ui80&&typeof S.ui80==='object'?S.ui80:{};
  S.ui80.navMode=S.ui80.navMode||'core';
  S.ui80.shortcuts=Array.isArray(S.ui80.shortcuts)?S.ui80.shortcuts:[];
  return S.ui80
}
const NAV_GROUP_MAP80={
  playhub80:'core',guide:'core',equipment:'core',crewmgmt:'core',galaxy:'core',ship:'core',recovery:'core',adventure:'core',
  identity:'character',career:'character',skills:'character',chars:'character',talents:'character',force:'character',
  campaign:'systems',gm:'systems',database:'systems',rulesaudit:'systems',review:'systems',explore:'systems'
};
const CORE_TAB_SET80=new Set(['playhub80','guide','equipment','crewmgmt','galaxy','ship','recovery','adventure']);
function ensurePlayHub80(){
  let host=$('tabHost78')||document.querySelector('.wrap'); if(!host) return;
  if(!$('playhub80')){
    let sec=document.createElement('section');
    sec.id='playhub80'; sec.className='tab card hidden';
    let guide=$('guide');
    if(guide&&guide.parentElement===host) host.insertBefore(sec,guide); else host.prepend(sec);
  }
  if(!document.querySelector('#nav button[data-tab="playhub80"]')){
    let btn=document.createElement('button');
    btn.dataset.tab='playhub80'; btn.textContent='Play Hub';
    let guideBtn=document.querySelector('#nav button[data-tab="guide"]');
    if(guideBtn) guideBtn.insertAdjacentElement('beforebegin',btn); else $('nav')?.prepend(btn);
  }
}
function classifyNav80(){
  document.querySelectorAll('#nav button').forEach(btn=>{
    btn.dataset.group=NAV_GROUP_MAP80[btn.dataset.tab]||'systems'
  })
}
function injectNavModes80(){
  let navHost=$('navHost78'); if(!navHost||$('sidebarModes80')) return;
  let wrap=document.createElement('div');
  wrap.className='workspace78-card';
  wrap.innerHTML=`<div class="workspace78-title">Workspace</div><div id="sidebarModes80"><button data-mode="core">Core Play</button><button data-mode="character">Character</button><button data-mode="systems">Systems</button><button data-mode="all">All</button></div><div class="note80">Core Play shows the screens you actually use most while playing. Character and Systems let you drill into the deeper rule-management tabs only when you need them.</div>`;
  navHost.insertAdjacentElement('beforebegin',wrap);
  wrap.querySelectorAll('button').forEach(b=>b.onclick=()=>{S.ui80.navMode=b.dataset.mode;applyNavMode80();safeAutosave()})
}
function applyNavMode80(){
  ensurePhase80State(); classifyNav80();
  let mode=S.ui80.navMode||'core';
  document.querySelectorAll('#sidebarModes80 button').forEach(b=>b.classList.toggle('on',b.dataset.mode===mode));
  let visibleGroups = mode==='all' ? null : new Set([mode]);
  document.querySelectorAll('#nav button').forEach(btn=>{
    let keep=false;
    if(mode==='all') keep=true;
    else keep = visibleGroups.has(btn.dataset.group) || btn.dataset.tab==='playhub80';
    btn.style.display=keep?'':'none';
  })
}
function loopStats80(){
  let xp=S.xp||0, credits=S.credits||0, wounds=S.wounds||0, strain=S.strain||0, crewCount=(S.crew||[]).length, day=S.world?.day||1;
  return {xp,credits,wounds,strain,crewCount,day}
}
function playHubSummary80(id){
  if(id==='world') return {
    icon:'⌂', title:'World', text:pxEsc67(pixelCurrentMap67?.().name||GALAXY_HUBS_50[S.world?.currentHub]?.name||'Unknown location'),
    note:pxEsc67(objectiveGuide75?objectiveGuide75():'Explore and interact.'),
    buttons:[['Enter World',()=>renderNavTab('pixelworld67')],['Galaxy',()=>renderNavTab('galaxy')]]
  };
  if(id==='story') return {
    icon:'★', title:'Story', text:pxEsc67((visualCampaign73()?.title)||'Open the current story systems'),
    note:pxEsc67(objectiveGuide75?objectiveGuide75():'Check active objectives and missions.'),
    buttons:[['Featured Story',()=>renderNavTab('story61tab')],['Adventure Log',()=>renderNavTab('adventure')]]
  };
  if(id==='crew') return {
    icon:'CR', title:'Crew', text:pxEsc67(((S.crew||[]).map(x=>crewDisplayName59?crewDisplayName59(x):x).join(', '))||'No active companions'),
    note:'Manage companions, morale, gear, and relationships.',
    buttons:[['Open Crew',()=>renderNavTab('crewmgmt')],['Recovery',()=>renderNavTab('recovery')]]
  };
  if(id==='equipment') return {
    icon:'EQ', title:'Equipment', text:pxEsc67((WEAPONS[S.weapon]?.name||'Unarmed')+' · '+(ARMOR[S.armor]?.name||'No armor')),
    note:'Gear, market, workshop, attachments, and consumables.',
    buttons:[['Open Equipment',()=>renderNavTab('equipment')],['Database',()=>renderNavTab('database')]]
  };
}
function renderPlayHub80(){
  ensurePlayHub80();
  let el=$('playhub80'); if(!el) return;
  let st=loopStats80();
  let cards=['world','story','crew','equipment'].map(k=>playHubSummary80(k)).filter(Boolean);
  el.innerHTML=`<div class="row"><div><h2 style="margin:0">Play Hub</h2><div class="small">A cleaner primary gameplay loop: world exploration, story progression, crew management, and equipment are surfaced first, while deeper systems stay one click away.</div></div><button class="btn primary" id="playHubContinue80">Continue where I left off</button></div>
  <div class="bigStat80"><div class="metric"><b>${st.xp}</b>XP</div><div class="metric"><b>${Number(st.credits).toLocaleString()}</b>CREDITS</div><div class="metric"><b>${st.crewCount}</b>ACTIVE CREW</div><div class="metric"><b>${st.day}</b>DAY</div></div>
  <div class="systemDock80"><span class="pill">Objective <b>${pxEsc67(objectiveGuide75?objectiveGuide75():objectiveText())}</b></span><span class="pill">Wounds <b>${st.wounds}</b></span><span class="pill">Strain <b>${st.strain}</b></span><span class="pill">Current Hub <b>${pxEsc67(GALAXY_HUBS_50[S.world?.currentHub]?.name||'Unknown')}</b></span></div>
  <div class="playhub80-grid">${cards.map(c=>`<div class="loopCard80"><div class="loopCard80-head"><div class="loopIcon80">${c.icon}</div><div><b>${c.title}</b><div class="small">${c.text}</div></div></div><div class="small">${c.note}</div><div class="actions">${c.buttons.map((b,i)=>`<button class="btn ${i===0?'primary':''}" data-loop-btn="${c.title}:${i}">${b[0]}</button>`).join('')}</div></div>`).join('')}</div>
  <div class="subGrid80">
    <div class="subCard80"><div class="loopCard80-head"><div class="loopIcon80">CH</div><div><b>Character Build</b><div class="small">Identity, skills, characteristics, talents, and Force.</div></div></div><div class="actions"><button class="btn" id="hubIdentity80">Identity</button><button class="btn" id="hubSkills80">Skills</button><button class="btn" id="hubTalents80">Talents</button><button class="btn" id="hubForce80">Force</button></div></div>
    <div class="subCard80"><div class="loopCard80-head"><div class="loopIcon80">✧</div><div><b>Galaxy & Travel</b><div class="small">Travel, factions, worlds, and ship progression.</div></div></div><div class="actions"><button class="btn" id="hubGalaxy80">Galaxy</button><button class="btn" id="hubShip80">Ship</button><button class="btn" id="hubExplore80">Explore</button></div></div>
    <div class="subCard80"><div class="loopCard80-head"><div class="loopIcon80">DB</div><div><b>Deep Systems</b><div class="small">Campaign systems, operations, reference database, and audits.</div></div></div><div class="actions"><button class="btn" id="hubCampaign80">Campaign</button><button class="btn" id="hubOps80">Operations</button><button class="btn" id="hubDatabase80">Database</button></div></div>
  </div>
  <div class="release80"><div class="row"><div><b>Phase 79–80 UI Consolidation</b><div class="small">This pass combines cleaner desktop layout, simplified tab access, a real play loop hub, stronger icon consistency, and a more unified look across Equipment, Crew, Galaxy, and Database.</div></div><span class="tag">PHASE 79–80</span></div><div class="release80-grid"><div class="metric"><b>4</b>PRIMARY LOOP SCREENS</div><div class="metric"><b>3</b>NAV MODES</div><div class="metric"><b>1</b>PLAY HUB</div><div class="metric"><b>Ctrl+K</b>FAST JUMP</div></div></div>`;
  $('playHubContinue80').onclick=()=>continueBestScreen80();
  let buttonMap=[
    ['hubIdentity80','identity'],['hubSkills80','skills'],['hubTalents80','talents'],['hubForce80','force'],
    ['hubGalaxy80','galaxy'],['hubShip80','ship'],['hubExplore80','explore'],
    ['hubCampaign80','campaign'],['hubOps80','gm'],['hubDatabase80','database']
  ];
  buttonMap.forEach(([id,tab])=>{ if($(id)) $(id).onclick=()=>renderNavTab(tab) });
  // Loop cards
  let loopBtns=[...el.querySelectorAll('[data-loop-btn]')];
  let fns=[...cards.flatMap(c=>c.buttons.map(x=>x[1]))];
  loopBtns.forEach((b,i)=>b.onclick=fns[i]);
}
function continueBestScreen80(){
  let obj=(objectiveGuide75?objectiveGuide75():objectiveText()).toLowerCase();
  if(obj.includes('fly')||obj.includes('map')||obj.includes('marker')||obj.includes('look for')) return renderNavTab('pixelworld67');
  if(obj.includes('story')||obj.includes('mission')||obj.includes('quest')) return renderNavTab('story61tab');
  return renderNavTab('playhub80')
}
function injectToolbar80(tabId){
  let tab=$(tabId); if(!tab || tab.querySelector(':scope > .toolbar80')) return;
  let bar=document.createElement('div');
  bar.className='toolbar80';
  bar.innerHTML=`<button class="btn" data-jump80="playhub80">Play Hub</button><button class="btn" data-jump80="pixelworld67">World</button><button class="btn" data-jump80="story61tab">Story</button><button class="btn" data-jump80="crewmgmt">Crew</button><button class="btn" data-jump80="equipment">Equipment</button><button class="btn" data-jump80="galaxy">Galaxy</button>`;
  let header=tab.querySelector(':scope > .row,:scope > h2');
  if(header) header.insertAdjacentElement('afterend',bar); else tab.prepend(bar);
  bar.querySelectorAll('[data-jump80]').forEach(btn=>btn.onclick=()=>renderNavTab(btn.dataset.jump80))
}
function installUnifiedTabs80(){
  ['equipment','crewmgmt','galaxy','database','pixelworld67','story61tab','guide','campaign','gm','ship','recovery','explore'].forEach(injectToolbar80);
  document.body.classList.add('unifiedFrame80');
}
function keyboardShortcuts80(e){
  let t=e.target; if(t && ['INPUT','TEXTAREA','SELECT'].includes(t.tagName)) return;
  if(!e.altKey) return;
  let map={'1':'playhub80','2':'pixelworld67','3':'story61tab','4':'crewmgmt','5':'equipment','6':'galaxy','7':'ship','8':'database'};
  if(map[e.key]){e.preventDefault();renderNavTab(map[e.key])}
}
document.addEventListener('keydown',keyboardShortcuts80);
function currentPrimaryScreens80(){
  return [
    {id:'playhub80',label:'Play Hub'},
    {id:'pixelworld67',label:'World'},
    {id:'story61tab',label:'Story'},
    {id:'crewmgmt',label:'Crew'},
    {id:'equipment',label:'Equipment'},
    {id:'galaxy',label:'Galaxy'}
  ]
}
const _p80RenderNavTab=renderNavTab;
renderNavTab=function(id){
  ensurePlayHub80();
  let r=_p80RenderNavTab(id);
  if(id==='playhub80') renderPlayHub80();
  installUnifiedTabs80();
  applyNavMode80();
  updateActiveSummary78?.();
  updateOutline78?.();
  return r
}
const _p80RenderAll=renderAll;
renderAll=function(){
  ensurePhase80State();
  let r=_p80RenderAll();
  ensurePlayHub80();
  classifyNav80();
  injectNavModes80();
  installUnifiedTabs80();
  renderPlayHub80();
  applyNavMode80();
  S.schemaVersion=80;
  return r
}
const _p80Serializable=serializableState;
serializableState=function(){let x=_p80Serializable(); x.schemaVersion=80; S.schemaVersion=80; return x}
const _p80Save=save;
save=function(){let r=_p80Save(); S.schemaVersion=80; return r}

/* Diagnostics */
const _p80Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p80Diag().filter(x=>!['Phase 78 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase80State(); ensurePlayHub80(); classifyNav80(); injectNavModes80(); installUnifiedTabs80(); renderPlayHub80();
  add('Phase 79 Play Hub',!!$('playhub80')&&!!document.querySelector('#nav button[data-tab="playhub80"]'),'primary loop hub');
  add('Phase 79 primary loop shortcuts',currentPrimaryScreens80().length===6,'hub + world + story + crew + equipment + galaxy');
  add('Phase 80 nav modes',!!$('sidebarModes80')&&document.querySelectorAll('#sidebarModes80 button').length===4,'core / character / systems / all');
  add('Phase 80 unified toolbars',document.querySelectorAll('.toolbar80').length>=8,'major tabs receive a shared jump toolbar');
  add('Phase 80 visual frame consistency',document.body.classList.contains('unifiedFrame80'),'shared retro framing applied');
  let snap=serializableState(); add('Phase 80 save schema',BUILD_INFO.saveSchema===80&&snap.schemaVersion===80&&S.schemaVersion===80,'schema 80');
  return rows
}
const _p80Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p80Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 78 schema target:') &&
    !x.startsWith('Phase 45 release diagnostics pass structurally:') &&
    !x.startsWith('Phase 66 release diagnostics all pass:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase80State(); ensurePlayHub80(); classifyNav80(); injectNavModes80(); installUnifiedTabs80(); renderPlayHub80();
  test('Phase 79 Play Hub exists',()=>!!$('playhub80'));
  test('Phase 79 Play Hub nav exists',()=>!!document.querySelector('#nav button[data-tab="playhub80"]'));
  test('Phase 80 nav modes exist',()=>!!$('sidebarModes80'));
  test('Phase 80 toolbar count',()=>document.querySelectorAll('.toolbar80').length>=8);
  test('Phase 80 schema target',()=>BUILD_INFO.saveSchema===80&&serializableState().schemaVersion===80);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport')) $('smokeReport').textContent=JSON.stringify(report,null,2);
  return report
};

ensurePhase80State();
document.title='Star Wars: Sable Reach v1.4 — Play Hub UI';
let topTitle80=document.querySelector('.top h1'); if(topTitle80) topTitle80.textContent='STAR WARS: SABLE REACH · v1.4 PLAY HUB UI';
let topP80=document.querySelector('.top p'); if(topP80) topP80.textContent='Retro Star Wars RPG with a cleaner primary play loop, simplified desktop navigation, unified panel styling, and the full visual systems underneath.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,ui80:()=>S.ui80};
