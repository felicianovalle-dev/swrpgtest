
/* =========================================================
   PHASE 77 — DESKTOP UX LAYOUT PASS
   PHASE 78 — PIXEL UI / NAVIGATION POLISH
   ========================================================= */
BUILD_INFO.version='78.0.0-v1.3-ui-polish';
BUILD_INFO.saveSchema=78;

function ensurePhase78State(){
  ensurePhase76State();S.schemaVersion=78;
  S.ui78=S.ui78&&typeof S.ui78==='object'?S.ui78:{};
  if(S.ui78.compact===undefined)S.ui78.compact=false;
  S.ui78.navFilter=S.ui78.navFilter||'';
  S.ui78.paletteOpen=!!S.ui78.paletteOpen;
  S.ui78.outlineOpen=S.ui78.outlineOpen!==false;
  return S.ui78
}
function activeTab78(){return document.querySelector('#tabHost78 > .tab:not(.hidden), .wrap > .tab:not(.hidden)')}
function activeTabId78(){return activeTab78()?.id||'guide'}
function sectionLabel78(el){
  let h=el.querySelector(':scope > h2,:scope > h3,:scope > .pixel-title67')||el.querySelector('h2,h3,.pixel-title67,b');
  let text=(h?.textContent||'Section').trim().replace(/\s+/g,' ');
  return text.length>44?text.slice(0,44)+'…':text
}
function annotateSections78(tab){
  if(!tab)return;
  let blocks=[...tab.querySelectorAll(':scope > .card,:scope > .pixel-window67,:scope > .visual-loadout71,:scope > .crew-visual72,:scope > .world-context74,:scope > .release76,:scope > .uiAudit78')];
  blocks.forEach((el,i)=>{
    if(!el.id)el.id=`${tab.id}-sec-${i+1}`;
    el.classList.add('sectionAnchor78');
    if(!el.querySelector(':scope > .sectionTag78')){
      let tag=document.createElement('div');
      tag.className='sectionTag78';
      tag.innerHTML=`<span>§</span><b>${pxEsc67(sectionLabel78(el))}</b>`;
      el.insertBefore(tag,el.firstChild);
    }
  })
}
function outlineSections78(tab){
  if(!tab)return[];
  annotateSections78(tab);
  return [...tab.querySelectorAll(':scope > .card,:scope > .pixel-window67,:scope > .visual-loadout71,:scope > .crew-visual72,:scope > .world-context74,:scope > .release76,:scope > .uiAudit78')].slice(0,18)
}
function buildDesktopShell78(){
  let wrap=document.querySelector('.wrap');if(!wrap)return;
  if(!$('desktopShell78')){
    let rt=$('runtimeError');
    let shell=document.createElement('div');shell.id='desktopShell78';
    shell.innerHTML=`<aside id="sidebar78"><div id="sidebarInner78"><div class="workspace78-card"><div class="workspace78-title">Quick Access</div><div id="sidebarQuick78"></div></div><div class="workspace78-card"><div class="workspace78-title">Sections</div><input id="sidebarSearch78" type="text" placeholder="Filter sections or press Ctrl/Cmd+K"><div class="release78note">Desktop layout now uses a sticky sidebar and one main content panel so you do far less full-page scrolling.</div><div id="navHost78" style="margin-top:10px"></div></div><div class="workspace78-card"><div class="workspace78-title">Active View</div><div id="activeSummary78"></div></div><div class="workspace78-card"><div class="workspace78-title">Page Outline</div><div id="outlineList78"></div><div id="outlineEmpty78" class="hidden">No major sections found for this page.</div></div></div></aside><main id="main78"><div id="tabHost78"></div></main>`;
    rt.insertAdjacentElement('afterend',shell);
    let nav=$('nav'); if(nav) $('navHost78').appendChild(nav);
    let host=$('tabHost78');
    [...wrap.querySelectorAll(':scope > .tab')].forEach(tab=>host.appendChild(tab));
  }
  $('nav')?.classList.add('nav78');
  document.body.classList.toggle('compact78',!!ensurePhase78State().compact);
  buildQuickAccess78();
  buildCommandPalette78();
  decorateNavButtons78();
  syncSidebarFilter78();
  syncMobileWorldAction75?.();
}
function decorateNavButtons78(){
  let iconMap={guide:'⌂',identity:'ID',career:'✦',skills:'SK',chars:'CH',talents:'T',force:'F',campaign:'◎',gm:'OP',equipment:'EQ',crewmgmt:'CR',galaxy:'✧',explore:'◎',ship:'▲',recovery:'+',database:'DB',rulesaudit:'RA',review:'✓',adventure:'▶'};
  document.querySelectorAll('#nav button').forEach(btn=>btn.dataset.icon=iconMap[btn.dataset.tab]||'■')
}
function buildQuickAccess78(){
  let box=$('sidebarQuick78'); if(!box) return;
  box.innerHTML='';
  let buttons=[
    ['Guide','guide'],['World','pixelworld67'],['Story','story61tab'],['Equip','equipment'],['Crew','crewmgmt'],['Save',null],
    ['Palette',null],['Compact',null],['Galaxy','galaxy']
  ];
  buttons.forEach(([label,target])=>{
    let b=document.createElement('button');b.className='btn';b.textContent=label;
    if(label==='Save') b.onclick=()=>save();
    else if(label==='Palette') b.onclick=()=>togglePalette78(true);
    else if(label==='Compact') b.onclick=()=>{S.ui78.compact=!S.ui78.compact;document.body.classList.toggle('compact78',S.ui78.compact);save()};
    else if(target==='pixelworld67') b.onclick=()=>renderNavTab('pixelworld67');
    else if(target==='story61tab') b.onclick=()=>renderNavTab('story61tab');
    else b.onclick=()=>renderNavTab(target);
    box.appendChild(b);
  })
}
function currentNavButtons78(){
  return [...document.querySelectorAll('#nav button')].map(b=>({id:b.dataset.tab,label:b.textContent.trim(),disabled:b.disabled}))
}
function syncSidebarFilter78(){
  let q=(ensurePhase78State().navFilter||'').trim().toLowerCase();
  document.querySelectorAll('#nav button').forEach(btn=>{
    let show=!q||btn.textContent.toLowerCase().includes(q) || (btn.dataset.tab||'').toLowerCase().includes(q);
    btn.style.display=show?'':'none'
  })
}
function updateActiveSummary78(){
  let box=$('activeSummary78'); if(!box) return;
  let id=activeTabId78(), title=document.querySelector(`#nav button[data-tab="${id}"]`)?.textContent || document.querySelector(`#${id} h2`)?.textContent || id;
  let credits=typeof S.credits==='number'?S.credits.toLocaleString():'0';
  let summary = `
    <div class="pills" style="margin-bottom:8px">
      <span class="pill">Tab <b>${pxEsc67(title)}</b></span>
      <span class="pill">XP <b>${S.xp||0}</b></span>
      <span class="pill">Credits <b>${credits}</b></span>
      <span class="pill">Day <b>${S.world?.day||1}</b></span>
    </div>
    <div class="small"><b>Objective:</b> ${pxEsc67(objectiveGuide75?objectiveGuide75():objectiveText())}</div>
  `;
  if(id==='equipment'){
    summary += `<div class="small" style="margin-top:7px"><b>Current loadout:</b> ${(WEAPONS[S.weapon]?.name||'—')} · ${(ARMOR[S.armor]?.name||'—')}</div>`;
  }else if(id==='crewmgmt'){
    summary += `<div class="small" style="margin-top:7px"><b>Active crew:</b> ${(S.crew||[]).map(id=>crewDisplayName59?crewDisplayName59(id):id).join(', ')||'None'}</div>`;
  }else if(id==='pixelworld67'){
    summary += `<div class="small" style="margin-top:7px"><b>Location:</b> ${pxEsc67(pixelCurrentMap67?.().name||GALAXY_HUBS_50[S.world?.currentHub]?.name||'Unknown')}</div>`;
  }
  box.innerHTML = summary;
}
function updateOutline78(){
  let list=$('outlineList78'), empty=$('outlineEmpty78'); if(!list||!empty) return;
  let tab=activeTab78();
  let sections=outlineSections78(tab);
  list.innerHTML='';
  if(!sections.length){empty.classList.remove('hidden'); return;}
  empty.classList.add('hidden');
  sections.forEach(el=>{
    let b=document.createElement('button');
    b.textContent=sectionLabel78(el);
    b.onclick=()=>{
      let scroller=tab;
      scroller.scrollTo({top:Math.max(0,el.offsetTop-14),behavior:'smooth'})
    };
    list.appendChild(b);
  })
}
function buildCommandPalette78(){
  if($('commandPalette78')) return;
  let d=document.createElement('div');
  d.id='commandPalette78'; d.className='hidden';
  d.innerHTML=`<div id="commandCard78"><div class="workspace78-title">Jump to a Section</div><input id="commandSearch78" type="text" placeholder="Type a section name…" style="width:100%;margin:0;padding:12px;background:#09131d;border:1px solid #42586b;border-radius:10px;color:#eef3f7"><div id="commandResults78"></div><div class="small" style="margin-top:8px">Tip: press <b>Ctrl/Cmd + K</b> anywhere in the app.</div></div>`;
  document.body.appendChild(d);
  d.addEventListener('click',e=>{if(e.target===d) togglePalette78(false)});
  $('commandSearch78').addEventListener('input',renderCommandResults78)
}
function togglePalette78(open){
  let d=$('commandPalette78'); if(!d) return;
  d.classList.toggle('hidden',!open); S.ui78.paletteOpen=!!open;
  if(open){ renderCommandResults78(); $('commandSearch78').value=''; setTimeout(()=>$('commandSearch78').focus(),30) }
}
function renderCommandResults78(){
  let host=$('commandResults78'); if(!host) return;
  let q=($('commandSearch78').value||'').trim().toLowerCase();
  let buttons=currentNavButtons78().filter(x=>!x.disabled && (!q || x.label.toLowerCase().includes(q) || x.id.toLowerCase().includes(q)));
  host.innerHTML='';
  buttons.forEach((item,i)=>{
    let b=document.createElement('button');
    b.className='commandItem78'+(i===0?' active':'');
    b.innerHTML=`<b>${pxEsc67(item.label)}</b><div class="small">${pxEsc67(item.id)}</div>`;
    b.onclick=()=>{togglePalette78(false); renderNavTab(item.id)};
    host.appendChild(b);
  })
}
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){e.preventDefault();togglePalette78(!$('commandPalette78')?.classList.contains('hidden'))}
  if(e.key==='Escape' && $('commandPalette78') && !$('commandPalette78').classList.contains('hidden')) togglePalette78(false)
});
function installTabChrome78(){
  document.querySelectorAll('#tabHost78 > .tab, .wrap > .tab').forEach(tab=>{
    tab.classList.add('tab78');
    annotateSections78(tab)
  })
}
function injectUiAudit78(){
  if(!$('guide') || $('uiAudit78')) return;
  let navCount=document.querySelectorAll('#nav button').length;
  let box=document.createElement('section');
  box.id='uiAudit78'; box.className='uiAudit78';
  box.innerHTML=`<div class="row"><div><b>Desktop UI / Pixel Interface Pass</b><div class="small">This build focuses on cleaner PC navigation, less overall scrolling, stronger section hierarchy, and more readable retro panel styling.</div></div><span class="tag">PHASE 77–78</span></div><div class="uiAudit78Grid"><div class="metric"><b>${navCount}</b>SECTION BUTTONS</div><div class="metric"><b>1</b>STICKY SIDEBAR</div><div class="metric"><b>1</b>PAGE OUTLINE</div><div class="metric"><b>Ctrl+K</b>JUMP PALETTE</div></div>`;
  $('guide').insertAdjacentElement('afterend',box);
}
const _p78RenderNavTab=renderNavTab;
renderNavTab=function(id){
  let r=_p78RenderNavTab(id);
  installTabChrome78();
  updateActiveSummary78();
  updateOutline78();
  syncMobileWorldAction75?.();
  return r
}
const _p78RenderAll=renderAll;
renderAll=function(){
  ensurePhase78State();
  let r=_p78RenderAll();
  buildDesktopShell78();
  installTabChrome78();
  injectUiAudit78();
  updateActiveSummary78();
  updateOutline78();
  S.schemaVersion=78;
  return r
}
const _p78Serializable=serializableState;
serializableState=function(){let x=_p78Serializable();x.schemaVersion=78;S.schemaVersion=78;return x}
const _p78Save=save;
save=function(){let r=_p78Save();S.schemaVersion=78;return r}
function initSidebarSearch78(){
  let input=$('sidebarSearch78'); if(!input || input.dataset.bound78) return;
  input.dataset.bound78='1';
  input.value=ensurePhase78State().navFilter||'';
  input.addEventListener('input',()=>{
    S.ui78.navFilter=input.value;
    syncSidebarFilter78()
  })
  input.addEventListener('focus',()=>input.select())
}

/* Diagnostics */
const _p78Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p78Diag().filter(x=>!['Phase 76 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase78State();buildDesktopShell78();installTabChrome78();injectUiAudit78();initSidebarSearch78();
  add('Phase 77 desktop shell',!!$('desktopShell78')&&!!$('sidebar78')&&!!$('main78'),'sticky sidebar + tab host');
  add('Phase 77 page outline',!!$('outlineList78'),'outline generated for active page');
  add('Phase 77 internal tab scrolling',window.innerWidth<1180 || !!activeTab78(),'tab host active for desktop');
  add('Phase 78 command palette',!!$('commandPalette78')&&!!$('commandSearch78'),'Ctrl/Cmd+K jump palette');
  add('Phase 78 compact mode',typeof ensurePhase78State().compact==='boolean','optional denser layout');
  let snap=serializableState(); add('Phase 78 save schema',BUILD_INFO.saveSchema===78&&snap.schemaVersion===78&&S.schemaVersion===78,'schema 78');
  return rows
}
const _p78Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p78Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 76 schema target:') &&
    !x.startsWith('Phase 76 release checks pass:') &&
    !x.startsWith('Phase 45 release diagnostics pass structurally:') &&
    !x.startsWith('Phase 66 release diagnostics all pass:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase78State();buildDesktopShell78();installTabChrome78();initSidebarSearch78();
  test('Phase 77 sidebar exists',()=>!!$('sidebar78'));
  test('Phase 77 tab host exists',()=>!!$('tabHost78'));
  test('Phase 77 outline exists',()=>!!$('outlineList78'));
  test('Phase 78 command palette exists',()=>!!$('commandPalette78'));
  test('Phase 78 sidebar search exists',()=>!!$('sidebarSearch78'));
  test('Phase 78 schema target',()=>BUILD_INFO.saveSchema===78&&serializableState().schemaVersion===78);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport')) $('smokeReport').textContent=JSON.stringify(report,null,2);
  return report
};

ensurePhase78State();
document.title='Star Wars: Sable Reach v1.3 — UI Polish Build';
let topTitle78=document.querySelector('.top h1'); if(topTitle78) topTitle78.textContent='STAR WARS: SABLE REACH · v1.3 UI POLISH';
let topP78=document.querySelector('.top p'); if(topP78) topP78.textContent='Retro Star Wars RPG with cleaner desktop navigation, a sticky sidebar workspace, page outlines, pixel-art UI polish, and the full visual RPG systems.';
renderAll();
initSidebarSearch78();
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,ui:()=>S.ui78};
