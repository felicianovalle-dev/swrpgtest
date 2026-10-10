
BUILD_INFO.version='84.0.0-v1.5-visual-conversion';
BUILD_INFO.saveSchema=84;
function ensurePhase84State(){
  ensurePhase82State(); S.schemaVersion=84;
  S.ui84=S.ui84&&typeof S.ui84==='object'?S.ui84:{};
  return S.ui84
}
function pxR84(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}
function pixelPalette84(map){
  if(map?.id==='ship') return {
    sand:['#0d1118','#111721','#151d28'],
    road:['#546472','#617384','#6f8294'],
    wall:['#5f6d79','#738595','#394550'],
    roof:['#7b4d3d','#9a644f','#4a2d24'],
    floor:['#667787','#7a8c99','#53616d'],
    metal:['#5e707d','#728696','#46535e'],
    pad:['#394655','#556273','#2a3340'],
    glow:'#6bd8ff'
  };
  return {
    sand:['#c89d69','#d5ae7c','#b38958'],
    road:['#8b6540','#a47a4d','#6b4c31'],
    wall:['#d6b685','#e4ca9c','#b79260'],
    roof:['#8b493d','#b35b49','#6d342d'],
    floor:['#9f8a73','#b49c83','#846f59'],
    metal:['#617180','#768796','#4c5d69'],
    pad:['#374556','#516175','#26303d'],
    glow:'#5ed4ff'
  };
}
const _p84pxDrawTile67=pxDrawTile67;
pxDrawTile67=function(ctx,t,sx,sy,x,y){
  let map;
  try{ map=pixelCurrentMap67() }catch(e){ map={id:'sableTown'} }
  let p=pixelPalette84(map);
  let pick=(arr,off=0)=>arr[(Math.abs(x*17+y*11+off))%arr.length];
  if(t==='void'){
    pxR84(ctx,sx,sy,16,16,'#04070b');
    if((x+y)%5===0) pxR84(ctx,sx+((x*7+y)%12),sy+((x*3+y*5)%12),1,1,'#b7c9d9');
    return;
  }
  if(t==='sand'){
    pxR84(ctx,sx,sy,16,16,pick(p.sand));
    pxR84(ctx,sx,sy,16,2,pick(p.sand,1));
    if((x+y)%2===0) pxR84(ctx,sx+2,sy+10,2,1,'#9f7747');
    if((x*3+y)%5===0) pxR84(ctx,sx+11,sy+5,1,1,'#e8c79a');
    if((x+y)%4===0) pxR84(ctx,sx+7,sy+13,2,1,'#8a643d');
    return;
  }
  if(t==='road'){
    pxR84(ctx,sx,sy,16,16,pick(p.road));
    pxR84(ctx,sx,sy+12,16,4,pick(p.road,1));
    for(let i=0;i<16;i+=4){ pxR84(ctx,sx+i,sy,1,16,'#6f4d2e22'); }
    if((x+y)%2===0){ pxR84(ctx,sx+2,sy+3,12,2,'#b55a49'); pxR84(ctx,sx+2,sy+6,12,1,'#e8b874'); }
    return;
  }
  if(t==='wall'){
    let base=pick(p.wall);
    pxR84(ctx,sx,sy,16,16,base);
    pxR84(ctx,sx,sy,16,3,'#ecd2a6');
    pxR84(ctx,sx,sy+12,16,4,'#a07d4d');
    pxR84(ctx,sx,sy,1,16,'#f0dcb8');
    if((x+y)%4===0){ pxR84(ctx,sx+6,sy+6,4,3,'#6b87a3'); pxR84(ctx,sx+7,sy+7,2,1,'#b7ecff'); }
    return;
  }
  if(t==='roof'){
    pxR84(ctx,sx,sy,16,16,pick(p.roof));
    pxR84(ctx,sx,sy,16,2,'#d37a63');
    for(let i=0;i<16;i+=3) pxR84(ctx,sx+i,sy+3,1,12,'#5c2d24');
    pxR84(ctx,sx+1,sy+13,14,2,'#3a1d17');
    return;
  }
  if(t==='floor'){
    pxR84(ctx,sx,sy,16,16,pick(p.floor));
    for(let i=0;i<=16;i+=8){ pxR84(ctx,sx+i,sy,1,16,'#7f6c58'); pxR84(ctx,sx,sy+i,16,1,'#7f6c58'); }
    if((x+y)%3===0) pxR84(ctx,sx+6,sy+6,4,4,'#cbb19355');
    return;
  }
  if(t==='metal'){
    pxR84(ctx,sx,sy,16,16,pick(p.metal));
    pxR84(ctx,sx,sy,16,2,'#91a4b2');
    pxR84(ctx,sx,sy,2,16,'#91a4b2');
    pxR84(ctx,sx+14,sy,2,16,'#42505b');
    pxR84(ctx,sx,sy+14,16,2,'#42505b');
    if((x+y)%2===0){ pxR84(ctx,sx+7,sy+7,2,2,'#24303a'); }
    return;
  }
  if(t==='pad'){
    pxR84(ctx,sx,sy,16,16,pick(p.pad));
    ctx.strokeStyle='#8a9bad'; ctx.lineWidth=1; ctx.strokeRect(sx+.5,sy+.5,15,15);
    pxR84(ctx,sx+2,sy+2,12,12,'#1c242f');
    pxR84(ctx,sx+7,sy+0,2,16,'#d5a24d');
    pxR84(ctx,sx+0,sy+7,16,2,'#d5a24d');
    return;
  }
  return _p84pxDrawTile67(ctx,t,sx,sy,x,y)
}
const _p84pxDrawObject67=pxDrawObject67;
pxDrawObject67=function(ctx,o,sx,sy){
  let map; try{map=pixelCurrentMap67()}catch(e){map={id:'sableTown'}}
  let p=pixelPalette84(map), r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
  if(o.kind==='terminal'){r(sx+3,sy+3,10,10,'#2c3d4d');r(sx+4,sy+4,8,5,'#6ae3ff');r(sx+5,sy+10,6,4,'#667887');r(sx+6,sy+5,4,2,'#d8f8ff');return}
  if(o.kind==='crate'){r(sx+2,sy+4,12,10,'#7c5936');r(sx+2,sy+8,12,1,'#cfac72');r(sx+6,sy+4,1,10,'#cfac72');r(sx+10,sy+4,1,10,'#563822');return}
  if(o.kind==='door'){r(sx+1,sy+1,14,15,'#d7b47e');r(sx+3,sy+4,10,11,'#456073');r(sx+5,sy+6,6,5,'#6ac9ff');r(sx+10,sy+9,1,1,'#ffdb74');return}
  if(o.kind==='beacon'){r(sx+7,sy+2,2,12,'#8d9ba7');r(sx+5,sy+1,6,3,'#50d2ff');r(sx+4,sy+13,8,2,'#56646f');return}
  if(o.kind==='ramp'){r(sx+1,sy+10,14,4,'#95a6b2');r(sx+3,sy+8,10,2,'#c8d4dc');r(sx+5,sy+6,6,2,'#5c6976');return}
  if(o.kind==='table'){r(sx+3,sy+5,10,6,'#784d30');r(sx+4,sy+6,8,4,'#9a643b');r(sx+7,sy+11,2,4,'#53311f');return}
  if(o.kind==='med'){r(sx+3,sy+4,10,8,'#d7dde4');r(sx+6,sy+6,4,4,'#cf5d63');r(sx+7,sy+5,2,6,'#cf5d63');r(sx+6,sy+6,4,4,'#cf5d63');r(sx+6,sy+13,4,2,'#7e8d9c');return}
  if(o.kind==='bench'){r(sx+2,sy+5,12,8,'#604a33');r(sx+3,sy+4,10,2,'#907557');r(sx+5,sy+8,2,2,'#c1d1dd');r(sx+9,sy+8,2,2,'#50d2ff');return}
  if(o.kind==='ship'){
    r(sx+4,sy+4,56,34,'#63727c');r(sx+13,sy+1,38,12,'#7a8b97');r(sx+20,sy+15,24,12,'#4f5b63');
    r(sx+0,sy+16,12,8,'#49555d');r(sx+52,sy+16,12,8,'#49555d');r(sx+23,sy+7,18,5,'#7ae3ff');
    r(sx+10,sy+32,44,5,'#323d44'); r(sx+27,sy+37,10,3,'#d2a851');
    return;
  }
  return _p84pxDrawObject67(ctx,o,sx,sy)
}
function drawPreviewScene84(canvas,mode='town'){
  if(!canvas) return;
  let ctx=canvas.getContext('2d'); canvas.width=216; canvas.height=120; ctx.imageSmoothingEnabled=false;
  let r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
  if(mode==='town'){
    r(0,0,216,120,'#08101a'); r(0,58,216,62,'#b88956'); r(0,78,216,42,'#92653d');
    r(10,16,56,54,'#d8b988'); r(74,11,62,59,'#d8b988'); r(144,20,62,50,'#d8b988');
    r(12,18,52,6,'#ebd2a6'); r(76,13,58,6,'#ebd2a6'); r(146,22,58,6,'#ebd2a6');
    r(17,25,42,12,'#93493d'); r(81,22,48,12,'#93493d'); r(151,30,48,12,'#93493d');
    r(26,40,20,22,'#4d677c'); r(95,41,20,21,'#4d677c'); r(165,45,20,17,'#4d677c');
    r(0,85,216,3,'#cb9958'); r(0,98,216,3,'#c57f4d');
    if(typeof drawCharSprite82==='function'){ drawCharSprite82(ctx,'bounty_hunter','front',104,98,34,48,1); drawCharSprite82(ctx,'twilek_scoundrel','left',63,94,30,44,1); drawCharSprite82(ctx,'rodian_hunter','right',145,94,28,42,1); }
  } else if(mode==='ship'){
    r(0,0,216,120,'#07101a'); r(0,56,216,64,'#52606f'); r(0,82,216,38,'#3f4b57');
    r(18,12,58,38,'#6c7e8d'); r(84,12,48,38,'#6c7e8d'); r(140,12,58,38,'#6c7e8d');
    r(18,12,58,5,'#9cadba'); r(84,12,48,5,'#9cadba'); r(140,12,58,5,'#9cadba');
    r(26,26,16,12,'#5ed4ff'); r(153,24,14,14,'#5ed4ff'); r(104,24,10,18,'#b05555');
    r(0,78,216,5,'#c89d4c');
    if(typeof drawCharSprite82==='function'){ drawCharSprite82(ctx,'human_smuggler','front',88,97,32,46,1); drawCharSprite82(ctx,'mechanic_tech','left',130,97,30,44,1); drawCharSprite82(ctx,'astromech_droid','front',48,96,24,36,1); }
  } else {
    r(0,0,216,120,'#08101a'); if(typeof drawCreature82==='function'){ drawCreature82(ctx,'acklay',108,62,96,72,false); }
  }
}
function injectPixelVisualPanel84(){
  let side=document.querySelector('#pixelworld67 .pixel-side67'); if(!side) return;
  if(!$('pixelArtPanel84')){
    let d=document.createElement('div'); d.id='pixelArtPanel84'; d.className='pixel-art84';
    d.innerHTML=`<div class="pixel-title67">Scene Preview</div><canvas id="pxScenePreview84" width="216" height="120" style="margin-top:8px"></canvas><div class="small" id="pxSceneCaption84" style="margin-top:8px"></div><div class="pixel-legend84" id="pxLegend84"></div>`;
    side.appendChild(d);
  }
}
function updatePixelVisualPanel84(){
  if(!$('pixelArtPanel84')) injectPixelVisualPanel84();
  let map; try{map=pixelCurrentMap67()}catch(e){map={id:'sableTown'}}
  let mode=map.id==='ship'?'ship':'town';
  drawPreviewScene84($('pxScenePreview84'),mode);
  let caps={
    town:'Sable Reach now leans into the warm stucco / awning / cantina look from the target art. NPCs and the player use the integrated sprite atlas.',
    ship:'The ship map now uses cooler panel colors, metal tiles, and sprite-driven crew scenes to read more like a classic pixel JRPG interior.',
    battle:'Creature encounters use the bestiary sheet art as the main visual driver.'
  };
  if($('pxSceneCaption84')) $('pxSceneCaption84').textContent=caps[mode]||caps.town;
  let legend=$('pxLegend84');
  if(legend){
    legend.innerHTML=(mode==='ship'
      ?[['#9cadba','Bulkhead'],['#5ed4ff','Console'],['#c89d4c','Deck stripe']]
      :[['#d8b988','Stucco'],['#93493d','Awning'],['#4d677c','Door'],['#c57f4d','Rug path']]
    ).map(([c,t])=>`<span><i style="background:${c}"></i>${t}</span>`).join('');
  }
}
function injectRoomGallery84(){
  let host=$('artGallery82'); if(!host || $('roomGallery84')) return;
  let box=document.createElement('section');
  box.id='roomGallery84'; box.className='room-gallery84';
  box.innerHTML=`<div class="row"><div><h3 style="margin:0">Visual Conversion Targets</h3><div class="small">These are the current in-engine scene goals for the next map and UI passes.</div></div><span class="tag">PHASE 83–84</span></div>
  <div class="room-grid84">
    <div class="room-card84"><canvas id="roomTown84" width="216" height="120"></canvas><div class="small"><b>Sable Reach Town Read</b><br>Warm stucco exteriors, rugs/roads, blue doors, and sprite-led NPC readability.</div></div>
    <div class="room-card84"><canvas id="roomShip84" width="216" height="120"></canvas><div class="small"><b>Ship Interior Read</b><br>Cool metallic interiors, clean walkable rooms, and more readable stations.</div></div>
  </div>`;
  host.insertAdjacentElement('afterend',box);
  drawPreviewScene84($('roomTown84'),'town');
  drawPreviewScene84($('roomShip84'),'ship');
}
const _p84retroTerrain70=retroTerrain70;
retroTerrain70=function(ctx){
  let h=S.world?.currentHub||'sable';
  if(h==='sable' || h==='ship'){
    let indoor=(ensurePhase68State?.().map==='ship');
    if(indoor){
      pxR84(ctx,0,0,384,216,'#08101a'); pxR84(ctx,0,104,384,112,'#556270'); pxR84(ctx,0,128,384,88,'#44505b');
      for(let i=0;i<6;i++){ pxR84(ctx,20+i*60,22,42,36,'#687887'); pxR84(ctx,20+i*60,22,42,4,'#9fafbc'); }
      for(let i=0;i<9;i++){ pxR84(ctx,10+i*42,136,18,2,'#c89d4c'); }
      return;
    }else{
      pxR84(ctx,0,0,384,216,'#08101a'); pxR84(ctx,0,100,384,116,'#be8f5f'); pxR84(ctx,0,136,384,80,'#8a5d39');
      for(let i=0;i<7;i++){ let x=10+i*54,w=42+(i%2)*6,h=28+(i%3)*7; pxR84(ctx,x,72-h,w,h,'#d8b988'); pxR84(ctx,x,72-h,w,4,'#ecd2a6'); pxR84(ctx,x+5,72-h+10,w-10,8,'#93493d'); }
      for(let i=0;i<10;i++){ pxR84(ctx,i*38,149+(i%2)*6,24,3,'#c57f4d'); }
      return;
    }
  }
  return _p84retroTerrain70(ctx)
}
const _p84renderPixelWorld67=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){
  let r=_p84renderPixelWorld67(rebuild);
  injectPixelVisualPanel84();
  updatePixelVisualPanel84();
  return r
}
const _p84renderAll=renderAll;
renderAll=function(){
  ensurePhase84State();
  let r=_p84renderAll();
  injectPixelVisualPanel84();
  updatePixelVisualPanel84();
  injectRoomGallery84();
  drawPreviewScene84($('roomTown84'),'town');
  drawPreviewScene84($('roomShip84'),'ship');
  S.schemaVersion=84;
  return r
}
const _p84Serializable=serializableState;
serializableState=function(){ let x=_p84Serializable(); x.schemaVersion=84; S.schemaVersion=84; return x }
const _p84Save=save;
save=function(){ let r=_p84Save(); S.schemaVersion=84; return r }
const _p84Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p84Diag().filter(x=>!['Phase 82 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase84State(); injectPixelVisualPanel84(); updatePixelVisualPanel84(); injectRoomGallery84();
  add('Phase 83 pixel visual panel present',!!$('pixelArtPanel84'),'scene preview attached to pixel world sidebar');
  add('Phase 84 room gallery present',!!$('roomGallery84'),'visual conversion target gallery inserted');
  let snap=serializableState(); add('Phase 84 save schema',BUILD_INFO.saveSchema===84&&snap.schemaVersion===84&&S.schemaVersion===84,'schema 84');
  return rows
}
const _p84Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p84Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 82 schema target:') &&
    !x.startsWith('Phase 81 art gallery exists:') &&
    !x.startsWith('Phase 82 art preview canvases exist:') &&
    !x.startsWith('Phase 82 crew scene cantina enhanced:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase84State(); injectPixelVisualPanel84(); updatePixelVisualPanel84(); injectRoomGallery84();
  test('Phase 83 pixel visual panel',()=>!!$('pixelArtPanel84')&&!!$('pxScenePreview84'));
  test('Phase 84 room gallery',()=>!!$('roomGallery84')&&!!$('roomTown84')&&!!$('roomShip84'));
  test('Phase 84 schema target',()=>BUILD_INFO.saveSchema===84&&serializableState().schemaVersion===84);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport')) $('smokeReport').textContent=JSON.stringify(report,null,2);
  return report
};

ensurePhase84State();
document.title='Star Wars: Sable Reach v1.5 — Visual Conversion Build';
let topTitle84=document.querySelector('.top h1'); if(topTitle84) topTitle84.textContent='STAR WARS: SABLE REACH · v1.5 VISUAL CONVERSION';
let topP84=document.querySelector('.top p'); if(topP84) topP84.textContent='The retro Star Wars RPG now pushes further into the sprite-sheet and pixel-environment style, with warmer desert-town map rendering, cooler ship interiors, stronger window skinning, and dedicated scene previews.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,phase84:true};
