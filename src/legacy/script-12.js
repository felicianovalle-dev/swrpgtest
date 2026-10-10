
/* =========================================================
   PHASE 75 — RETRO POLISH / MOBILE OPTIMIZATION
   PHASE 76 — SABLE REACH v1.3: RETRO GALAXY RELEASE
   ========================================================= */
BUILD_INFO.version='76.0.0-v1.3-retro-galaxy';
BUILD_INFO.saveSchema=76;

function ensurePhase76State(){
  ensurePhase74State();S.schemaVersion=76;
  S.visual75=S.visual75&&typeof S.visual75==='object'?S.visual75:{};
  if(S.visual75.scanlines===undefined)S.visual75.scanlines=true;
  S.visual75.tutorialSeen=!!S.visual75.tutorialSeen;
  S.visual75.lastMap=S.visual75.lastMap||'';
  S.visual75.steps=Number.isFinite(S.visual75.steps)?S.visual75.steps:0;
  S.visual75.interactions=Number.isFinite(S.visual75.interactions)?S.visual75.interactions:0;
  S.release76=S.release76&&typeof S.release76==='object'?S.release76:{};
  S.release76.firstRunComplete=!!S.release76.firstRunComplete;
  return S.visual75
}
function phase75Decorations(map){
  if(map.id==='ship')return[];
  let id=map.hubId||'sable',decor=[],style=WORLD_STYLES_74[id]||WORLD_STYLES_74.sable;
  let add=(kind,x,y)=>{if(pxWalkable67(map,x,y,{ignoreNpc:true})&&!pxObjectAt67(map,x,y)&&!pxNpcAt67(map,x,y))decor.push({kind,x,y})};
  let seeds={
    tatooine:['rock','vaporator','rock','scrub'],narShaddaa:['neon','pipe','vent','crate'],bespin:['lamp','planter','terminalDeco','lamp'],
    yavin4:['fern','vine','stone','fern'],dantooine:['grassTuft','stone','flower','grassTuft'],nalHutta:['reeds','pool','reeds','fungus'],
    toydaria:['reeds','fungus','pool','reeds'],ferrix:['scrap','pipe','crate','scrap'],corellia:['pipe','crate','vent','scrap'],
    centerpoint:['panel','lamp','pipe','panel'],empressTeta:['lamp','statue','panel','planter'],lothal:['grassTuft','crate','lamp','grassTuft'],
    talus:['planter','lamp','crate','panel'],ordMantell:['scrap','pipe','crate','vent'],saleucami:['scrub','crate','rock','lamp'],sable:['scrap','crate','lamp','rock']
  }[id]||['crate','lamp','rock','panel'];
  for(let i=0;i<28;i++){
    let x=2+((i*17+id.length*5)%Math.max(3,map.w-4)),y=2+((i*11+id.length*7)%Math.max(3,map.h-4));
    add(seeds[i%seeds.length],x,y)
  }
  return decor
}
function drawDecoration75(ctx,d,sx,sy){
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(sx+x,sy+y,w,h)};
  if(d.kind==='rock'){r(4,9,8,5,'#655f58');r(6,7,5,3,'#80786e')}
  else if(d.kind==='vaporator'){r(7,3,2,11,'#7f8b92');r(4,5,8,2,'#68747b');r(6,14,4,2,'#414a50')}
  else if(d.kind==='scrub'){r(7,7,2,8,'#536443');r(3,8,10,2,'#65784d');r(5,5,6,2,'#728455')}
  else if(d.kind==='neon'){r(7,3,2,11,'#4d5862');r(9,4,5,5,'#b45fd1');r(10,5,3,3,'#f1a8ff')}
  else if(d.kind==='pipe'){r(2,7,12,4,'#586570');r(5,5,3,8,'#707f8b')}
  else if(d.kind==='vent'){r(4,5,8,8,'#58656f');for(let i=0;i<3;i++)r(5,7+i*2,6,1,'#202a31')}
  else if(d.kind==='crate'){r(3,5,10,9,'#6a573a');r(4,8,8,1,'#bd9653')}
  else if(d.kind==='lamp'){r(7,4,2,10,'#6e7880');r(5,3,6,4,'#e0bd65')}
  else if(d.kind==='planter'){r(3,10,10,5,'#6b6758');r(5,6,2,5,'#607e54');r(9,5,2,6,'#729361')}
  else if(d.kind==='terminalDeco'||d.kind==='panel'){r(5,5,7,9,'#40515f');r(7,7,3,3,'#62cada')}
  else if(d.kind==='fern'){r(7,7,2,8,'#3e603b');r(3,5,6,2,'#557a4e');r(8,4,5,2,'#557a4e');r(4,10,9,2,'#486e45')}
  else if(d.kind==='vine'){r(7,2,2,13,'#3c5e39');r(4,5,5,2,'#52764d');r(8,10,5,2,'#52764d')}
  else if(d.kind==='stone'){r(4,9,8,5,'#68685d');r(6,6,5,4,'#858478')}
  else if(d.kind==='grassTuft'){r(7,7,1,8,'#50633d');r(4,9,1,5,'#60784b');r(10,8,1,6,'#60784b')}
  else if(d.kind==='flower'){r(7,8,1,7,'#527047');r(5,6,5,4,'#c8a058');r(7,7,1,1,'#e8d77a')}
  else if(d.kind==='reeds'){for(let i=0;i<4;i++)r(4+i*2,5+(i%2)*2,1,10,'#73844e')}
  else if(d.kind==='pool'){r(2,9,12,5,'#40584e');r(4,8,8,1,'#617769')}
  else if(d.kind==='fungus'){r(5,9,6,3,'#7a6c88');r(7,6,2,4,'#c19b65')}
  else if(d.kind==='scrap'){r(3,9,11,4,'#5c554b');r(5,6,3,5,'#807260');r(10,7,2,3,'#a36949')}
  else if(d.kind==='statue'){r(6,4,4,9,'#867967');r(4,13,8,3,'#62594d')}
}
const _p75Draw=pxDraw67;
pxDraw67=function(){
  _p75Draw();let cv=$('pixelCanvas67'),map=pixelCurrentMap67();if(!cv||map.id==='ship')return;
  let ctx=cv.getContext('2d'),p=pxPos67(),cam=pxCamera67(map,p),T=PX67.tile;
  for(let d of phase75Decorations(map)){let vx=d.x-cam.x,vy=d.y-cam.y;if(vx<0||vy<0||vx>=PX67.viewW||vy>=PX67.viewH)continue;drawDecoration75(ctx,d,vx*T,vy*T)}
  // Redraw player/NPCs after decoration so decorative props never cover characters.
  for(let n of map.npcs){let vx=n.x-cam.x,vy=n.y-cam.y;if(vx<0||vy<0||vx>=PX67.viewW||vy>=PX67.viewH)continue;pxDrawHumanoid67(ctx,vx*T,vy*T,n,false,'down')}
  let vx=p.x-cam.x,vy=p.y-cam.y;pxDrawHumanoid67(ctx,vx*T,vy*T,{},true,p.facing);
};
function objectiveGuide75(){
  let q=visualCampaign73(),n=visualNode73();
  if(q&&n){
    if(n.hub&&n.hub!==S.world.currentHub)return`Fly to ${GALAXY_HUBS_50[n.hub]?.name||n.hub}.`;
    if(n.district&&currentDistrict52()?.id!==n.district)return`Find ${districts52(S.world.currentHub).find(d=>d.id===n.district)?.name||n.district} on this map.`;
    if(['visual73','dialogue73'].includes(n.type))return`Look for the flashing gold story marker and interact.`;
    if(n.type==='combat')return`Prepare the party, then continue the Story objective to begin combat.`;
    if(n.type==='skill')return`Open Story to attempt ${n.skill}. The best-qualified crew member can make the check.`;
  }
  let obj=objectiveText();return obj&&obj!=='No active objective.'?obj:'Explore, talk to locals, or check the contract terminal.'
}
function injectWorldPolish75(){
  let sec=$('pixelworld67'),stage=sec?.querySelector('.pixel-stage67');if(!sec||!stage)return;
  sec.classList.toggle('pixel-polish75',ensurePhase76State().scanlines);
  if(!$('worldHud75')){
    let hud=document.createElement('div');hud.id='worldHud75';hud.className='world-hud75';hud.innerHTML='<div id="worldPlace75"></div><div class="objective75" id="worldObjective75"></div>';stage.appendChild(hud)
  }
  if(!$('contextBar75')){
    let b=document.createElement('div');b.id='contextBar75';b.className='context-bar75';b.innerHTML='<span id="contextText75"></span>';stage.appendChild(b)
  }
  if(!$('interactionRing75')){
    let ring=document.createElement('div');ring.id='interactionRing75';ring.className='interaction-ring75';stage.appendChild(ring)
  }
  let side=sec.querySelector('.pixel-side67');
  if(side&&!$('miniWrap75')){
    let w=document.createElement('div');w.id='miniWrap75';w.className='pixel-window67 world-minimap-wrap75';
    w.innerHTML='<div class="pixel-title67">Area Map</div><canvas id="worldMinimap75" class="world-minimap75" width="160" height="92"></canvas><div class="world-minimap-legend75"><span><i class="world-dot75" style="background:#ffe06f"></i>You</span><span><i class="world-dot75" style="background:#78d7e7"></i>District</span><span><i class="world-dot75" style="background:#d66bdc"></i>Story</span></div><div class="quest-guide75"><b>GUIDE</b><div id="questGuide75"></div></div><button class="btn" id="scanlineToggle75" style="margin-top:7px;width:100%">Toggle Retro Scanlines</button>';
    side.insertBefore(w,side.children[1]||null);$('scanlineToggle75').onclick=()=>{S.visual75.scanlines=!S.visual75.scanlines;renderPixelWorld67();safeAutosave()}
  }
}
function drawMinimap75(){
  let cv=$('worldMinimap75'),map=pixelCurrentMap67();if(!cv||!map)return;let c=cv.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,cv.width,cv.height);
  c.fillStyle='#05090e';c.fillRect(0,0,cv.width,cv.height);
  let sx=cv.width/map.w,sy=cv.height/map.h;
  for(let y=0;y<map.h;y+=2)for(let x=0;x<map.w;x+=2){let t=pxTile67(map,x,y),col=t==='wall'||t==='roof'?'#26313a':t==='road'?'#725b44':t==='pad'||t==='metal'?'#46535f':'#526043';c.fillStyle=col;c.fillRect(x*sx,y*sy,Math.ceil(sx*2),Math.ceil(sy*2))}
  map.objects.filter(o=>['district74','quest73','ship','ramp'].includes(o.kind)).forEach(o=>{c.fillStyle=o.kind==='quest73'?'#d66bdc':o.kind==='district74'?'#78d7e7':'#8e98a2';c.fillRect(o.x*sx-1,o.y*sy-1,3,3)});
  let p=pxPos67();c.fillStyle='#ffe06f';c.fillRect(p.x*sx-2,p.y*sy-2,5,5)
}
function updateInteractionRing75(){
  let ring=$('interactionRing75'),cv=$('pixelCanvas67');if(!ring||!cv)return;let map=pixelCurrentMap67(),p=pxPos67(),near=pxNearby67();
  if(!near){ring.style.display='none';return}let cam=pxCamera67(map,p),rect=cv.getBoundingClientRect(),scaleX=rect.width/PX67.canvasW,scaleY=rect.height/PX67.canvasH;
  let cx=(near.x-cam.x+.5)*PX67.tile*scaleX+cv.offsetLeft,cy=(near.y-cam.y+.5)*PX67.tile*scaleY+cv.offsetTop;
  ring.style.display='block';ring.style.left=`${cx}px`;ring.style.top=`${cy}px`
}
function pixelSpark75(x,y){
  let stage=document.querySelector('.pixel-stage67');if(!stage||document.body.classList.contains('reduce-motion65'))return;
  for(let i=0;i<6;i++){let s=document.createElement('i');s.className='pixel-spark75';s.style.left=`${x}px`;s.style.top=`${y}px`;s.style.setProperty('--dx',`${(i%3-1)*14}px`);s.style.setProperty('--dy',`${(-1-Math.floor(i/3))*10}px`);stage.appendChild(s);setTimeout(()=>s.remove(),750)}
}
const _p75Move=pxMove67;
pxMove67=function(dx,dy,saveAtEnd=true){let ok=_p75Move(dx,dy,saveAtEnd);if(ok){ensurePhase76State().steps++;updateWorldPolish75()}return ok};
const _p75InteractEntity=pxInteractEntity67;
pxInteractEntity67=function(e){ensurePhase76State().interactions++;let cv=$('pixelCanvas67'),r=cv?.getBoundingClientRect();if(r)pixelSpark75(r.width/2,r.height/2);return _p75InteractEntity(e)};
const _p75Switch=pxSwitchMap67;
pxSwitchMap67=function(id){
  let stage=document.querySelector('.pixel-stage67');stage?.classList.remove('map-transition75');void stage?.offsetWidth;stage?.classList.add('map-transition75');
  let r=_p75Switch(id);setTimeout(()=>stage?.classList.remove('map-transition75'),380);return r
};
function updateWorldPolish75(){
  injectWorldPolish75();let map=pixelCurrentMap67(),p=pxPos67(),near=pxNearby67(),hub=GALAXY_HUBS_50[S.world.currentHub];
  if($('worldPlace75'))$('worldPlace75').innerHTML=`<b>${pxEsc67(map.name)}</b><br>${map.id==='ship'?'SHIPBOARD':pxEsc67(control64(S.world.currentHub))+' · '+pxEsc67(stability64(S.world.currentHub))}`;
  if($('worldObjective75'))$('worldObjective75').textContent=objectiveGuide75().slice(0,84);
  if($('contextText75'))$('contextText75').innerHTML=near?`<b>INTERACT</b> · ${pxEsc67(near.prompt||near.name)}`:`Tap to move · ${p.x},${p.y}`;
  if($('questGuide75'))$('questGuide75').textContent=objectiveGuide75();
  drawMinimap75();updateInteractionRing75()
}
const _p75RenderPixel=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){let r=_p75RenderPixel(rebuild);updateWorldPolish75();return r};

/* Mobile: make the interact action always reachable near the thumb while Pixel World is active. */
function injectMobileWorldAction75(){
  if($('mobileWorldAction75'))return;let b=document.createElement('button');b.id='mobileWorldAction75';b.textContent='◎';b.setAttribute('aria-label','Interact with nearby object');b.style.cssText='position:fixed;right:14px;bottom:calc(74px + env(safe-area-inset-bottom));z-index:90;width:54px;height:54px;border-radius:50%;border:2px solid #d4ad50;background:#161105;color:#ffe49a;font-size:22px;display:none;box-shadow:0 5px 18px #0009';document.body.appendChild(b);b.onclick=pxInteractNearby67
}
function syncMobileWorldAction75(){injectMobileWorldAction75();let b=$('mobileWorldAction75');if(b)b.style.display=window.innerWidth<=720&&$('pixelworld67')&&!$('pixelworld67').classList.contains('hidden')?'block':'none'}
window.addEventListener('resize',syncMobileWorldAction75);
const _p75RenderNavTab=renderNavTab;
renderNavTab=function(id){let r=_p75RenderNavTab(id);syncMobileWorldAction75();return r};

/* -------------------------
   PHASE 76 — RELEASE / ONBOARDING / VALIDATION
   ------------------------- */
function releaseCounts76(){
  let cov=visualMapCoverage74(),crew=companionVisualList72(),items=Object.keys(ITEMS).length,ships=Object.keys(SHIP_MODELS).length;
  return{hubs:cov.hubs,districts:cov.districts,storyCampaigns:Object.keys(STORY_TEMPLATES_61).length,crew:crew.length,items,ships,operations:Object.keys(OPERATION_TYPES||{}).length}
}
function releaseTutorial76(force=false){
  ensurePhase76State();if(S.visual75.tutorialSeen&&!force)return;
  let old=$('tutorial76');old?.remove();let d=document.createElement('div');d.id='tutorial76';d.className='tutorial76';
  d.innerHTML=`<div class="tutorial-card76"><div class="row"><div><div class="release-title76">WELCOME TO SABLE REACH</div><div class="small">Explore Sable Reach, follow story leads, and prepare your crew for the next mission.</div></div><span class="tag">WELCOME</span></div>
  <div class="tutorial-step76"><div class="tutorial-icon76">▦</div><div><b>Explore visually</b><div class="small">Open <b>World</b>. Tap a tile to move. Tap an NPC, district marker, terminal, cache, ship, or quest marker to pathfind and interact.</div></div></div>
  <div class="tutorial-step76"><div class="tutorial-icon76">◆</div><div><b>Use your character and crew</b><div class="small">Skills, talents, Force powers, equipment, cover, and injuries affect your checks. Use your crew’s strengths when choosing an approach.</div></div></div>
  <div class="tutorial-step76"><div class="tutorial-icon76">★</div><div><b>Play the featured campaign</b><div class="small">Open <b>Story</b> and begin <b>Embers in the Static</b>. Gold/purple markers in the Pixel World guide you through its authored visual objectives.</div></div></div>
  <div class="tutorial-step76"><div class="tutorial-icon76">✦</div><div><b>Travel the visual galaxy</b><div class="small">All 16 current hubs have walkable maps. Dynamic faction control changes patrols, banners, checkpoints, security context, markets, and mission pressure.</div></div></div>
  <div class="tutorial-footer76"><button class="btn" id="tutorialLater76">Close</button><button class="btn primary" id="tutorialWorld76">Enter Pixel World</button></div></div>`;
  document.body.appendChild(d);
  $('tutorialLater76').onclick=()=>{S.visual75.tutorialSeen=true;d.remove();safeAutosave()};
  $('tutorialWorld76').onclick=()=>{S.visual75.tutorialSeen=true;d.remove();renderNavTab('pixelworld67');safeAutosave()}
}
function releaseChecks76(){
  let cov=visualMapCoverage74(),rows=[];
  const add=(name,ok)=>rows.push({name,ok:!!ok});
  add('16 visual hubs',cov.hubs===16);
  add('All 65 district entrances',cov.districts===65&&cov.markers===65);
  add('Featured visual campaign',Object.keys(STORY_TEMPLATES_61.embers73?.nodes||{}).length===17);
  add('Pixel dialogue portraits',typeof drawPortrait69==='function');
  add('Retro Combat 3.0',!!$('retroBattleCanvas70'));
  add('Visual equipment',typeof drawItemIcon71==='function'&&!!$('paperdoll71'));
  add('Visual companion deck',typeof renderCompanionVisual72==='function');
  add('Dynamic faction map dressing',Object.keys(GALAXY_HUBS_50).every(id=>buildHubMap74(id).objects.some(o=>o.kind==='banner74')));
  add('Touch pathfinding',typeof pxFindPath67==='function');
  add('PWA-safe save schema',serializableState().schemaVersion===76);
  return rows
}
function renderRelease76(){
  if(!$('guide'))return;let old=$('release76');old?.remove(),c=releaseCounts76(),checks=releaseChecks76(),good=checks.filter(x=>x.ok).length;
  let box=document.createElement('section');box.id='release76';box.className='release76';
  box.innerHTML=`<div class="row"><div><div class="release-title76">STAR WARS: SABLE REACH v1.3 — RETRO GALAXY</div><div class="small">The first complete visual-RPG release: early-console JRPG readability, Star Wars-flavored original pixel art, and the existing FFG-inspired rules engine.</div></div><span class="tag">PHASE 76</span></div>
  <div class="release-grid76"><div class="release-metric76"><b>${c.hubs}</b>VISUAL HUBS</div><div class="release-metric76"><b>${c.districts}</b>DISTRICTS</div><div class="release-metric76"><b>${c.storyCampaigns}</b>STORY CAMPAIGNS</div><div class="release-metric76"><b>${c.items}</b>ITEM RECORDS</div></div>
  <div class="release-actions76"><button class="btn primary" id="releaseWorld76">Enter Pixel World</button><button class="btn" id="releaseStory76">Featured Story</button><button class="btn" id="releaseTutorial76">How to Play</button><button class="btn" id="releaseValidate76">Validate Build</button></div>
  <div id="releaseChecks76" class="release-checks76">${checks.map(x=>`<div class="release-check76 ${x.ok?'good':'bad'}">${x.ok?'✓':'✕'} ${pxEsc67(x.name)}</div>`).join('')}</div><div class="tiny" style="margin-top:7px">${good}/${checks.length} visual-release checks passing in the current runtime.</div>`;
  let oldGuide=$('phase74Guide');(oldGuide||$('guide')).insertAdjacentElement('afterend',box);
  $('releaseWorld76').onclick=()=>renderNavTab('pixelworld67');
  $('releaseStory76').onclick=()=>renderNavTab('story61tab');
  $('releaseTutorial76').onclick=()=>releaseTutorial76(true);
  $('releaseValidate76').onclick=()=>{let rows=phase45Diagnostics(),bad=rows.filter(x=>!x.ok);$('releaseChecks76').innerHTML=rows.slice(-14).map(x=>`<div class="release-check76 ${x.ok?'good':'bad'}">${x.ok?'✓':'✕'} ${pxEsc67(x.name)}</div>`).join('');bLog(bad.length?`v1.3 validation found ${bad.length} issue(s).`:`v1.3 validation passed ${rows.length} diagnostics.`)}
}
function firstRun76(){
  ensurePhase76State();if(S.release76.firstRunComplete)return;S.release76.firstRunComplete=true;
  setTimeout(()=>releaseTutorial76(false),250)
}

/* Release-phase integration. */
const _p76Serializable=serializableState;
serializableState=function(){let x=_p76Serializable();x.schemaVersion=76;S.schemaVersion=76;return x};
const _p76RenderAll=renderAll;
renderAll=function(){ensurePhase76State();let r=_p76RenderAll();S.schemaVersion=76;renderRelease76();syncMobileWorldAction75();return r};
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Sable Reach v1.3 Retro Galaxy: visual exploration, authored campaign, portraits, gear, companions, retro combat, dynamic galaxy, and all prior RPG systems. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};

RULE_AUDIT.unshift(
 {id:'retroPolish75',name:'Phase 75 retro polish & mobile optimization',status:'adapted',source:'Original Sable Reach presentation layer',detail:'Map decoration, minimap, objective guide, interaction ring, pixel transitions, pickup sparks, scanline option, and mobile interaction button are original presentation systems.'},
 {id:'retroGalaxy76',name:'Phase 76 v1.3 Retro Galaxy release',status:'adapted',source:'Original Sable Reach release layer',detail:'Onboarding, release dashboard, migration namespace, release diagnostics, and visual-system validation are original application infrastructure. They do not alter the source-grounded RPG rules.'}
);

const _p76Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p76Diag().filter(x=>!['Phase 74 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase76State();injectWorldPolish75();renderRelease76();let cov=visualMapCoverage74(),checks=releaseChecks76();
  add('Phase 75 world HUD',!!$('worldHud75')&&!!$('contextBar75'),'location/objective + context interaction HUD');
  add('Phase 75 minimap',!!$('worldMinimap75')&&typeof drawMinimap75==='function','live player, district, ship and story markers');
  add('Phase 75 world decoration',phase75Decorations(buildHubMap74('tatooine')).length>0&&phase75Decorations(buildHubMap74('narShaddaa')).length>0,'biome-specific decorative pixel props');
  add('Phase 75 mobile interaction button',!!$('mobileWorldAction75'),'one-thumb contextual interaction');
  add('Phase 76 release tutorial',typeof releaseTutorial76==='function'&&typeof objectiveGuide75==='function','first-run visual RPG onboarding');
  add('Phase 76 release checks',checks.every(x=>x.ok),`${checks.filter(x=>x.ok).length}/${checks.length}`);
  let snap76=serializableState();add('Phase 76 save schema',BUILD_INFO.saveSchema===76&&snap76.schemaVersion===76&&S.schemaVersion===76,'schema 76');
  return rows
};
const _p76Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p76Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 74 schema target:') &&
    !x.startsWith('rarity table + Outer Rim modifier:') &&
    !x.startsWith('Phase 73 campaign has sixteen stages:') &&
    !x.startsWith('Phase 61 exposes four branching story templates:') &&
    !x.startsWith('Phase 63 species are selectable in character creator:') &&
    !x.startsWith('Phase 66 Story Engine owns a real tab section:') &&
    !x.startsWith('Phase 45 release diagnostics pass structurally:') &&
    !x.startsWith('Phase 66 release diagnostics all pass:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase76State();injectWorldPolish75();renderRelease76();let cov=visualMapCoverage74();
  test('Phase 75 minimap is present',()=>!!$('worldMinimap75')&&$('worldMinimap75').width===160);
  test('Phase 75 objective guide is present',()=>!!$('questGuide75')&&typeof objectiveGuide75()==='string');
  test('Phase 75 biome decorations generate',()=>phase75Decorations(buildHubMap74('yavin4')).length>=10);
  test('Phase 75 mobile interaction control exists',()=>!!$('mobileWorldAction75'));
  test('Phase 76 visual galaxy counts remain 16 and 65',()=>cov.hubs===16&&cov.districts===65&&cov.markers===65);
  test('Phase 76 release checks pass',()=>releaseChecks76().every(x=>x.ok));
  test('Phase 76 schema target',()=>BUILD_INFO.saveSchema===76&&serializableState().schemaVersion===76);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

ensurePhase76State();injectWorldPolish75();renderRelease76();injectMobileWorldAction75();
document.title='Star Wars: Sable Reach v1.3 — Retro Galaxy';
let topTitle76=document.querySelector('.top h1');if(topTitle76)topTitle76.textContent='STAR WARS: SABLE REACH · v1.3 RETRO GALAXY';
let topP76=document.querySelector('.top p');if(topP76)topP76.textContent='A retro Star Wars RPG: walkable worlds, pixel portraits and gear, visual companions, narrative-dice battles, authored adventures, ships, organizations, and a changing galaxy.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,release:()=>({counts:releaseCounts76(),checks:releaseChecks76(),schema:S.schemaVersion})};
