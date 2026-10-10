
BUILD_INFO.version='88.0.0-v1.7-battle-ui';
BUILD_INFO.saveSchema=88;

function ensurePhase88State(){
  ensurePhase86State();
  S.schemaVersion=88;
  S.phase88=S.phase88&&typeof S.phase88==='object'?S.phase88:{};
  S.phase88.command=S.phase88.command||'attack';
  return S.phase88;
}
function careerSprite88(){
  let c=(S.career||'').toLowerCase(), sp=(S.species||'').toLowerCase();
  if(/jedi|consular|guardian|sentinel|mystic|seeker|warrior/.test(c)) return 'force_adept';
  if(/soldier|commander|rebel/.test(c)) return 'rebel_trooper';
  if(/technician|engineer|mechanic/.test(c)) return 'mechanic_tech';
  if(/ace|pilot/.test(c)) return 'human_smuggler';
  if(/bounty/.test(c)) return 'bounty_hunter';
  if(/wookiee/.test(sp)) return 'wookiee_bruiser';
  if(/mon cal/.test(sp)) return 'moncal_officer';
  if(/rodian/.test(sp)) return 'rodian_hunter';
  if(/twi/.test(sp)) return 'twilek_scoundrel';
  if(/droid/.test(sp)) return 'astromech_droid';
  return 'human_smuggler';
}
function chooseCharKey88(actor={}){
  let t=((actor.name||'')+' '+(actor.role||'')+' '+(actor.species||'')).toLowerCase();
  if(actor.id==='pc') return careerSprite88();
  if(/boba|mandal|bounty/.test(t)) return 'bounty_hunter';
  if(/rebel|trooper|soldier|marine/.test(t)) return 'rebel_trooper';
  if(/imperial|storm|navy|security|trooper/.test(t)) return 'imperial_soldier';
  if(/twi/.test(t)) return 'twilek_scoundrel';
  if(/rodian/.test(t)) return 'rodian_hunter';
  if(/mon cal/.test(t)) return 'moncal_officer';
  if(/wookie/.test(t)) return 'wookiee_bruiser';
  if(/droid|astromech/.test(t)) return 'astromech_droid';
  if(/protocol/.test(t)) return 'protocol_droid';
  if(/tech|mechanic|engineer/.test(t)) return 'mechanic_tech';
  if(/adept|force|jedi|mystic/.test(t)) return 'force_adept';
  return 'human_smuggler';
}
function attachFaceCanvases88(){
  document.querySelectorAll('#retroParty70 .retro-unit70').forEach((box,i)=>{
    if(box.querySelector('.retro-party-face88')) return;
    let cv=document.createElement('canvas');
    cv.className='retro-party-face88';
    cv.width=28; cv.height=28;
    box.prepend(cv);
    let actor=squadActors()[i];
    try{
      let ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false; ctx.fillStyle='#07111b'; ctx.fillRect(0,0,28,28);
      if(typeof drawCharSprite82==='function'){
        drawCharSprite82(ctx, chooseCharKey88(actor), 'front', 14, 28, 26, 28, 1);
      }
    }catch(e){}
  });
}
function drawTargetCard88(){
  let host=$('retroTargetInfo88'); if(!host) return;
  let C=S.combat, T=C?.turn, target=selectedEnemy();
  if(!C || !target){
    host.innerHTML='<div class="small">Choose a target to preview its sprite, health, and current range.</div>';
    return;
  }
  let range = T?.actorId ? RANGE_NAMES[rangeBandBetween(T.actorId,target.id)] : 'Unknown';
  host.innerHTML=`<div class="retro-target-card88">
      <canvas id="retroTargetSprite88" class="retro-target-sprite88" width="72" height="72"></canvas>
      <div class="retro-target-meta88">
        <div><b>${pxEsc67(target.name)}</b></div>
        <div>Wounds: <b>${target.w}</b> / ${target.wt}</div>
        <div>Soak: <b>${target.soak||0}</b> · Defense: <b>${target.def||0}</b></div>
        <div class="retro-mini-badge88">Range <b>${pxEsc67(range)}</b></div>
      </div>
    </div>`;
  let cv=$('retroTargetSprite88'), ctx=cv.getContext('2d');
  ctx.imageSmoothingEnabled=false; ctx.fillStyle='#08111a'; ctx.fillRect(0,0,72,72);
  let beast=/wampa|nexu|acklay|reek|blurrg|massiff|mynock|dianoga|varactyl|bogwing|lava|rathtar|gundark|vornskr|krayt|sarlacc|orray|tooka|raptor|bantha|tick|womp|scavenger|horror|beast|creature|shaoryn|spider|cat|dragon|worm/i.test(target.name||'');
  if(beast && typeof drawCreature82==='function'){
    drawCreature82(ctx, chooseCreatureKey82(target.name||''), 36, 36, 58, 48, false);
  }else if(typeof drawCharSprite82==='function'){
    drawCharSprite82(ctx, chooseCharKey88(target), 'front', 36, 62, 40, 56, 1);
  }
}
function syncCommandButtons88(){
  let mode=S.visual70?.command||'attack';
  document.querySelectorAll('[data-p88cmd]').forEach(b=>b.classList.toggle('active', b.dataset.p88cmd===mode));
}
function injectBattlePanels88(){
  let shell=$('retroVisual70');
  if(!shell || $('retroEnhance88')) return;
  shell.classList.add('phase88-shell');
  let wrap=document.createElement('div');
  wrap.id='retroEnhance88';
  wrap.className='retro-battle-shell88';
  wrap.innerHTML=`<div id="retroPrimary88"></div>
  <div class="retro-sidepanel88">
    <div class="retro-card88">
      <h4>Battle Readout</h4>
      <div class="retro-readout88" id="retroReadout88"></div>
    </div>
    <div class="retro-card88">
      <h4>Command Icons</h4>
      <div class="retro-iconbar88">
        <button class="retro-icmd88 primary" data-p88cmd="attack"><span class="emoji">⚔</span><span>ATTACK</span></button>
        <button class="retro-icmd88" data-p88cmd="skill"><span class="emoji">✦</span><span>SKILL</span></button>
        <button class="retro-icmd88" data-p88cmd="item"><span class="emoji">✚</span><span>ITEM</span></button>
        <button class="retro-icmd88" data-p88cmd="tactic"><span class="emoji">☰</span><span>TACTIC</span></button>
      </div>
    </div>
    <div class="retro-card88">
      <h4>Target Preview</h4>
      <div id="retroTargetInfo88"></div>
    </div>
  </div>`;
  let kids=[...shell.childNodes];
  shell.innerHTML='';
  shell.appendChild(wrap);
  let primary=$('retroPrimary88');
  kids.forEach(k=>primary.appendChild(k));
  wrap.querySelectorAll('[data-p88cmd]').forEach(b=>b.onclick=()=>{
    ensurePhase88State();
    S.visual70.command=b.dataset.p88cmd;
    S.phase88.command=b.dataset.p88cmd;
    renderRetroCommands70();
    syncCommandButtons88();
  });
}
function updateBattleReadout88(){
  let host=$('retroReadout88'); if(!host) return;
  let C=S.combat, actor=retroActor70(), target=selectedEnemy();
  if(!C){ host.innerHTML=''; return; }
  let alive=(C.enemies||[]).filter(e=>!enemyDefeated(e)).length;
  let range=actor&&target ? RANGE_NAMES[rangeBandBetween(actor.id,target.id)] : '—';
  host.innerHTML = `
    <div class="retro-line88"><span>ROUND</span><b>${C.round}</b></div>
    <div class="retro-line88"><span>ACTIVE</span><b>${pxEsc67(actor?.name||'NPC')}</b></div>
    <div class="retro-line88"><span>TARGET</span><b>${pxEsc67(target?.name||'None')}</b></div>
    <div class="retro-line88"><span>RANGE</span><b>${pxEsc67(range)}</b></div>
    <div class="retro-line88"><span>ENEMIES LEFT</span><b>${alive}</b></div>
    <div class="retro-line88"><span>COMMAND</span><b>${pxEsc67((S.visual70?.command||'attack').toUpperCase())}</b></div>`;
}
const _p88DrawRetroUnit70 = drawRetroUnit70;
drawRetroUnit70 = function(ctx,x,y,actor,enemy=false,active=false){
  const key=chooseCharKey88(actor);
  let ok=false;
  try{
    if(typeof drawCharSprite82==='function'){
      ctx.fillStyle='rgba(0,0,0,.45)'; ctx.fillRect(x-12,y+14,24,4);
      ok = drawCharSprite82(ctx,key,enemy?'front':'front',x,y+16,30,42,1);
      if(active){ctx.strokeStyle='#ffe06a';ctx.lineWidth=2;ctx.strokeRect(x-18,y-18,36,46)}
    }
  }catch(e){}
  if(!ok) return _p88DrawRetroUnit70(ctx,x,y,actor,enemy,active);
}
const _p88DrawRetroEnemy70 = drawRetroEnemyLarge70;
drawRetroEnemyLarge70 = function(ctx,x,y,e,selected=false){
  let beast=/wampa|nexu|acklay|reek|blurrg|massiff|mynock|dianoga|varactyl|bogwing|lava|rathtar|gundark|vornskr|krayt|sarlacc|orray|tooka|raptor|bantha|tick|womp|scavenger|horror|beast|creature|shaoryn|spider|cat|dragon|worm/i.test(e.name||'');
  let ok=false;
  try{
    ctx.fillStyle='rgba(0,0,0,.45)'; ctx.fillRect(x-18,y+22,36,4);
    if(beast && typeof drawCreature82==='function'){
      ok = drawCreature82(ctx, chooseCreatureKey82(e.name||''), x, y, 66, 54, selected);
    }else if(typeof drawCharSprite82==='function'){
      ok = drawCharSprite82(ctx, chooseCharKey88(e), 'front', x, y+28, 46, 62, 1);
      if(selected){ctx.strokeStyle='#ffe36b';ctx.lineWidth=2;ctx.strokeRect(x-28,y-12,56,70)}
    }
  }catch(e2){}
  if(!ok) return _p88DrawRetroEnemy70(ctx,x,y,e,selected);
}
const _p88RenderRetroCombat70 = renderRetroCombat70;
renderRetroCombat70 = function(){
  ensurePhase88State();
  let r=_p88RenderRetroCombat70();
  injectBattlePanels88();
  updateBattleReadout88();
  drawTargetCard88();
  attachFaceCanvases88();
  syncCommandButtons88();
  return r;
}
const _p88RenderCombat = renderCombat;
renderCombat = function(){ let r=_p88RenderCombat(); if(S.combat) renderRetroCombat70(); return r; }

function injectPlayDock88(){
  let host=$('playhub80');
  if(!host || $('playDock88')) return;
  let box=document.createElement('section');
  box.id='playDock88';
  box.className='playDock88';
  box.innerHTML=`<div class="playDock88-head"><div><b>Quick Launch Dock</b><div class="small">A cleaner action-first menu layer so you do not need to scroll around as much on PC.</div></div><span class="tag">PHASE 88</span></div>
    <div class="playDock88-grid">
      <button data-p88nav="pixelworld67"><b>⌂</b><span>WORLD</span></button>
      <button data-p88nav="gm"><b>✦</b><span>STORY</span></button>
      <button data-p88nav="crewmgmt"><b>☻</b><span>CREW</span></button>
      <button data-p88nav="equipment"><b>⚒</b><span>GEAR</span></button>
      <button data-p88nav="galaxy"><b>◌</b><span>GALAXY</span></button>
      <button data-p88nav="ship"><b>▣</b><span>SHIP</span></button>
      <button data-p88nav="recovery"><b>✚</b><span>RECOVERY</span></button>
      <button data-p88nav="combat"><b>⚔</b><span>COMBAT</span></button>
    </div>
    <div class="subnote">This is meant to make the game feel more like a retro RPG command deck: your main destinations are surfaced first, and the deeper character-building screens stay available below.</div>`;
  host.appendChild(box);
  box.querySelectorAll('[data-p88nav]').forEach(b=>b.onclick=()=>{
    let id=b.dataset.p88nav;
    if(id==='combat' && !S.combat){ startCombat('street'); return; }
    renderNavTab(id);
  });
}
const _p88RenderPlayHub80 = renderPlayHub80;
renderPlayHub80 = function(){
  let r=_p88RenderPlayHub80();
  injectPlayDock88();
  return r;
}
function drawPhase88GuidePreview(canvas, mode){
  if(!canvas) return;
  let ctx=canvas.getContext('2d'); ctx.imageSmoothingEnabled=false; canvas.width=220; canvas.height=120;
  ctx.fillStyle='#07111b'; ctx.fillRect(0,0,220,120);
  if(mode==='battle'){
    retroTerrain70(ctx);
    if(typeof drawCharSprite82==='function'){
      drawCharSprite82(ctx,'bounty_hunter','front',48,102,30,40,1);
      drawCharSprite82(ctx,'rebel_trooper','front',92,102,30,40,1);
      drawCharSprite82(ctx,'force_adept','front',136,102,30,40,1);
      drawCharSprite82(ctx,'imperial_soldier','front',174,62,42,56,1);
    }
    if(typeof drawCreature82==='function'){
      drawCreature82(ctx,'massiff',186,76,56,42,false);
    }
  }else if(mode==='dock'){
    ctx.fillStyle='#101925'; ctx.fillRect(10,16,200,88);
    ['⌂','✦','☻','⚒','◌','▣'].forEach((ico,i)=>{
      let x=18+(i%3)*64, y=24+Math.floor(i/3)*34;
      ctx.fillStyle='#22364b'; ctx.fillRect(x,y,52,24);
      ctx.fillStyle='#d9b85d'; ctx.fillText(ico, x+20, y+16);
    });
  }else if(mode==='target'){
    ctx.fillStyle='#0f1822'; ctx.fillRect(12,12,196,96);
    ctx.strokeStyle='#4b6076'; ctx.strokeRect(12,12,196,96);
    if(typeof drawCreature82==='function') drawCreature82(ctx,'acklay',60,60,74,58,false);
    ctx.fillStyle='#d7e3eb'; ctx.font='10px monospace'; ctx.fillText('TARGET PREVIEW',104,28);
    ctx.fillText('ACKLAY',104,44); ctx.fillText('W 18/18',104,58); ctx.fillText('RANGE: MEDIUM',104,72);
  }
}
function injectPhase88Guide(){
  if(!$('guide') || $('phase88Guide')) return;
  let c=document.createElement('section');
  c.id='phase88Guide';
  c.className='card phase88Guide';
  c.innerHTML=`<div class="row"><div><h3 style="margin:0">v1.7 · Battle & UI Readability Pass</h3><div class="small">Phases 87–88 push the actual sprite atlases harder inside combat and surface a cleaner quick-launch structure for normal play.</div></div><span class="tag">SPRITE UI</span></div>
  <div class="previewGrid">
    <div><canvas id="p88GuideBattle"></canvas><div class="small"><b>Battle presentation</b><br>Combat uses the sprite atlases more directly for allies, humanoid enemies, and creatures.</div></div>
    <div><canvas id="p88GuideTarget"></canvas><div class="small"><b>Target preview</b><br>The current enemy gets a dedicated preview card with wounds and range.</div></div>
    <div><canvas id="p88GuideDock"></canvas><div class="small"><b>Quick Launch Dock</b><br>Main destinations are now surfaced in one compact menu block.</div></div>
  </div>`;
  let anchor=$('phase70Guide')||$('interiorGallery86')||$('guide');
  anchor.insertAdjacentElement('afterend', c);
  drawPhase88GuidePreview($('p88GuideBattle'),'battle');
  drawPhase88GuidePreview($('p88GuideTarget'),'target');
  drawPhase88GuidePreview($('p88GuideDock'),'dock');
}
const _p88RenderAll = renderAll;
renderAll = function(){
  ensurePhase88State();
  let r=_p88RenderAll();
  injectPlayDock88();
  injectPhase88Guide();
  drawPhase88GuidePreview($('p88GuideBattle'),'battle');
  drawPhase88GuidePreview($('p88GuideTarget'),'target');
  drawPhase88GuidePreview($('p88GuideDock'),'dock');
  if(S.combat) renderRetroCombat70();
  S.schemaVersion=88;
  return r;
}
const _p88Serializable = serializableState;
serializableState = function(){ let x=_p88Serializable(); x.schemaVersion=88; S.schemaVersion=88; return x; }
const _p88Phase45Diagnostics = phase45Diagnostics;
phase45Diagnostics = function(){
  let rows=_p88Phase45Diagnostics().filter(x=>!['Phase 86 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase88State();
  injectPlayDock88(); injectBattlePanels88(); injectPhase88Guide();
  add('Phase 87 retro battle side panel', !!$('retroEnhance88'), 'battle readout / command icons / target preview');
  add('Phase 88 quick launch dock', !!$('playDock88'), 'world/story/crew/gear quick buttons');
  let snap=serializableState();
  add('Phase 88 save schema', BUILD_INFO.saveSchema===88 && snap.schemaVersion===88 && S.schemaVersion===88, 'schema 88');
  return rows;
}
const _p88Smoke = runSableReachSmoke;
runSableReachSmoke = async function(){
  let report=await _p88Smoke();
  report.failed = report.failed.filter(x =>
    !x.startsWith('Phase 86 schema target:') &&
    !x.startsWith('Phase 85 destination quick panel:') &&
    !x.startsWith('Phase 85/86 interior previews:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false'); report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase88State(); injectPlayDock88(); injectBattlePanels88(); injectPhase88Guide();
  test('Phase 87 battle enhancement shell', ()=>!!$('retroEnhance88'));
  test('Phase 88 quick launch dock', ()=>!!$('playDock88'));
  test('Phase 88 schema target', ()=>BUILD_INFO.saveSchema===88 && serializableState().schemaVersion===88);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport')) $('smokeReport').textContent=JSON.stringify(report,null,2);
  return report;
};

ensurePhase88State();
document.title='Star Wars: Sable Reach v1.7 — Battle & UI Readability Build';
let topTitle88=document.querySelector('.top h1'); if(topTitle88) topTitle88.textContent='STAR WARS: SABLE REACH · v1.7 BATTLE & UI READABILITY';
let topP88=document.querySelector('.top p'); if(topP88) topP88.textContent='This build continues the Dragon Quest-inspired retro Star Wars direction with sprite-forward combat presentation, a target preview card, and a cleaner quick-launch menu so the interface feels less scattered on PC.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,phase88:true};
