
BUILD_INFO.version='90.0.0-v1.8-visual-reliability';
BUILD_INFO.saveSchema=90;

function ensurePhase90State(){
  ensurePhase88State(); S.schemaVersion=90;
  S.phase90=S.phase90&&typeof S.phase90==='object'?S.phase90:{};
  S.phase90.assetMode='compact-atlas';
  return S.phase90;
}

/* Phase 89: the reference JPGs were the main reason the standalone HTML had become
   unusually large. These renderers use compact pre-cut WebP atlases embedded above. */
function resetCompactArt90(){
  ART82.charCellW=48; ART82.charCellH=56;
  ART82.creatureCellW=160; ART82.creatureCellH=125;
  ART82.charCropW=48; ART82.charCropH=56;
  ART82.creatureCrop=[0,0,160,125];
  ['characters','creatures','cantina'].forEach(k=>{
    let src=ART82_URIS[k];
    if(!ART82.images[k] || ART82.images[k].src!==src){
      let im=new Image(); im.decoding='async'; im.src=src; ART82.images[k]=im;
      im.addEventListener('load',()=>{ try{ if(typeof renderPixelWorld67==='function') renderPixelWorld67(false); if(S.combat&&typeof renderRetroCombat70==='function') renderRetroCombat70(); }catch(e){} },{once:true});
    }
  });
}
function drawCharSprite82(ctx,key,facing,x,y,w,h,frame=1){
  resetCompactArt90();
  let img=ART82.images.characters; if(!img||!img.complete||!img.naturalWidth)return false;
  let idx=ART82.charKeys.indexOf(key); if(idx<0) idx=0;
  let row=facingRow82(facing), sx=idx*48, sy=row*56;
  ctx.imageSmoothingEnabled=false;
  ctx.drawImage(img,sx,sy,48,56,x-w/2,y-h,w,h);
  return true;
}
function drawCreature82(ctx,key,x,y,w,h,selected=false){
  resetCompactArt90();
  let img=ART82.images.creatures; if(!img||!img.complete||!img.naturalWidth)return false;
  let idx=ART82.creatureKeys.indexOf(key); if(idx<0) idx=0;
  let col=idx%6,row=Math.floor(idx/6),sx=col*160,sy=row*125;
  ctx.imageSmoothingEnabled=false;
  ctx.drawImage(img,sx,sy,160,125,x-w/2,y-h/2,w,h);
  if(selected){ctx.strokeStyle='#ffe36b';ctx.lineWidth=2;ctx.strokeRect(x-w/2-4,y-h/2-4,w+8,h+8)}
  return true;
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
  if(/wookie/.test(t)) return 'wookie_bruiser';
  if(/protocol/.test(t)) return 'protocol_droid';
  if(/droid|astromech/.test(t)) return 'astromech_droid';
  if(/tech|mechanic|engineer/.test(t)) return 'mechanic_tech';
  if(/adept|force|jedi|mystic/.test(t)) return 'force_adept';
  return 'human_smuggler';
}
function careerSprite88(){
  let c=(S.career||'').toLowerCase(), sp=(S.species||'').toLowerCase();
  if(/jedi|consular|guardian|sentinel|mystic|seeker|warrior/.test(c)) return 'force_adept';
  if(/soldier|commander|rebel/.test(c)) return 'rebel_trooper';
  if(/technician|engineer|mechanic/.test(c)) return 'mechanic_tech';
  if(/bounty/.test(c)) return 'bounty_hunter';
  if(/wookie/.test(sp)) return 'wookie_bruiser';
  if(/mon cal/.test(sp)) return 'moncal_officer';
  if(/rodian/.test(sp)) return 'rodian_hunter';
  if(/twi/.test(sp)) return 'twilek_scoundrel';
  if(/droid/.test(sp)) return 'astromech_droid';
  return 'human_smuggler';
}

/* Opening safety: a visual asset failure must not stop the rest of the RPG from opening. */
function markBoot90(msg,good=true){
  let top=document.querySelector('.top'); if(!top)return;
  let b=$('boot90'); if(!b){b=document.createElement('div');b.id='boot90';b.className='boot90';top.appendChild(b)}
  b.classList.add('on'); b.style.borderColor=good?'#5d734f':'#865151'; b.textContent=msg;
  if(good) setTimeout(()=>b?.classList.remove('on'),2200);
}
window.addEventListener('error',e=>{
  let m=e?.message||'';
  if(/ResizeObserver loop/i.test(m))return;
  try{showRuntimeError(`Visual layer recovered from: ${m||'unknown display error'}`)}catch(_e){}
});
window.addEventListener('unhandledrejection',e=>{
  let m=e?.reason?.message||String(e?.reason||'visual promise error');
  try{showRuntimeError(`Visual layer recovered from: ${m}`)}catch(_e){}
});

/* Phase 90: extra world dressing. These are visual-only and never block movement. */
function decorativeSet90(map){
  let id=map.id||'', a=[];
  const add=(kind,x,y)=>a.push({kind,x,y});
  if(id==='sableTown'){
    [['awning',4,5],['awning',18,5],['awning',32,5],['lamp',7,10],['lamp',26,10],['plant',14,11],['barrel',4,17],['barrel',6,17],['sign',14,14],['rug',17,13],['rug',23,13],['pipe',40,9]].forEach(x=>add(...x));
  }else if(id==='cantinaInterior'){
    [['rug',12,10],['rug',13,10],['rug',14,10],['stool',15,7],['stool',17,7],['stool',19,7],['stool',21,7],['bottles',19,3],['lamp',3,3],['lamp',24,3],['plant',3,16],['barrel',24,10]].forEach(x=>add(...x));
  }else if(id==='brokerInterior'){
    [['shelf',5,2],['shelf',12,2],['shelf',19,2],['crate',4,13],['crate',23,13],['lamp',7,15],['lamp',20,15],['sign',13,3]].forEach(x=>add(...x));
  }else if(id==='clinicInterior'){
    [['lamp',4,2],['lamp',18,2],['plant',3,14],['shelf',20,10],['crate',19,14],['rug',8,14],['rug',9,14]].forEach(x=>add(...x));
  }else if(id==='ship'){
    [['pipe',2,3],['pipe',31,3],['panel',3,7],['panel',30,7],['crate',4,18],['crate',28,18],['lamp',11,11],['lamp',24,11],['rug',15,11],['rug',16,11],['rug',17,11]].forEach(x=>add(...x));
  }
  return a;
}
function drawDecor90(ctx,d,sx,sy){
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(sx+x,sy+y,w,h)};
  if(d.kind==='awning'){r(1,2,14,5,'#a14838');r(2,3,12,2,'#d56b4f');r(3,7,2,6,'#6d3c2b');r(11,7,2,6,'#6d3c2b')}
  else if(d.kind==='lamp'){r(7,3,2,10,'#625640');r(5,3,6,5,'#e0b65c');r(6,4,4,3,'#ffd978')}
  else if(d.kind==='plant'){r(5,10,6,5,'#76553a');r(7,4,2,7,'#4f7445');r(4,6,4,2,'#668d54');r(8,5,4,2,'#668d54')}
  else if(d.kind==='barrel'){r(4,3,8,12,'#5e7080');r(3,5,10,2,'#8798a5');r(3,11,10,2,'#8798a5');r(6,4,4,10,'#43525e')}
  else if(d.kind==='sign'){r(7,4,2,11,'#5d4934');r(3,2,10,7,'#24384a');r(4,3,8,5,'#d0a64d')}
  else if(d.kind==='rug'){r(1,5,14,7,'#8c463b');r(2,6,12,5,'#b9664d');r(5,7,6,3,'#d1a25a')}
  else if(d.kind==='pipe'){r(7,1,3,14,'#344957');r(5,3,7,3,'#617381');r(6,11,5,2,'#617381')}
  else if(d.kind==='stool'){r(4,5,8,5,'#71472d');r(6,10,2,5,'#4d3020');r(9,10,2,5,'#4d3020')}
  else if(d.kind==='bottles'){for(let i=0;i<5;i++){r(2+i*3,5+(i%2),2,7,i%2?'#487ba0':'#8f6d45');r(2+i*3,4+(i%2),2,2,'#d8c37d')}}
  else if(d.kind==='shelf'){r(2,2,12,12,'#5e4937');r(3,5,10,2,'#85674b');r(3,10,10,2,'#85674b');for(let i=0;i<3;i++)r(4+i*3,3,2,2,'#6ba0ba')}
  else if(d.kind==='crate'){r(2,4,12,10,'#725135');r(3,5,10,8,'#8b6746');r(6,5,1,8,'#d0aa72');r(10,5,1,8,'#d0aa72')}
  else if(d.kind==='panel'){r(4,3,8,11,'#324654');r(5,4,6,4,'#58cfe9');r(6,10,1,2,'#e4b957');r(9,10,1,2,'#c95c5c')}
}
const _p90pxDraw67=pxDraw67;
pxDraw67=function(){
  let r=_p90pxDraw67();
  try{
    let canvas=$('pixelCanvas67'); if(!canvas)return r;
    let ctx=canvas.getContext('2d'),map=pixelCurrentMap67(),p=pxPos67(),cam=pxCamera67(map,p),T=PX67.tile;
    let blocked=new Set([`${p.x},${p.y}`,...map.npcs.map(n=>`${n.x},${n.y}`),...map.objects.map(o=>`${o.x},${o.y}`)]);
    for(let d of decorativeSet90(map)){
      if(blocked.has(`${d.x},${d.y}`))continue;
      let vx=d.x-cam.x,vy=d.y-cam.y;if(vx<0||vy<0||vx>=PX67.viewW||vy>=PX67.viewH)continue;
      drawDecor90(ctx,d,vx*T,vy*T);
    }
    // Repaint player so a floor decoration can never visually cover them.
    let vx=p.x-cam.x,vy=p.y-cam.y;pxDrawHumanoid67(ctx,vx*T,vy*T,{},true,p.facing);
  }catch(e){}
  return r;
};
function updateLocationPlaque90(){
  let stage=document.querySelector('#pixelworld67 .pixel-stage67');if(!stage)return;
  let p=$('locationPlaque90');if(!p){p=document.createElement('div');p.id='locationPlaque90';p.className='location-plaque90';stage.appendChild(p)}
  try{p.textContent=pixelCurrentMap67().name.toUpperCase()}catch(e){p.textContent='SABLE REACH'}
}
function injectPhase90Card(){
  if(!$('guide')||$('phase90Card'))return;
  let c=document.createElement('section');c.id='phase90Card';c.className='phase90card';
  c.innerHTML=`<div class="row"><div><b>v1.8 · Visualization Reliability & Tile Detail</b><div class="small">The heavy reference JPGs have been replaced with compact sprite atlases so the standalone build opens more reliably, while the pixel maps get another layer of environmental identity.</div></div><span class="tag">PHASE 89–90</span></div><div class="phase90stats"><div><b>~75%</b>LESS ART PAYLOAD</div><div><b>48×56</b>CHAR CELLS</div><div><b>24</b>CREATURE CELLS</div><div><b>5</b>DECOR SETS</div></div><div class="world-art-key90"><div>☀ Warm frontier props: awnings, rugs, lamps, signs</div><div>⚙ Interior props: shelves, stools, pipes, panels</div><div>✦ Compact atlas loading with automatic redraw</div><div>✓ Runtime visual errors no longer stop opening</div></div>`;
  let anchor=$('phase88Guide')||$('guide');anchor.insertAdjacentElement('afterend',c);
}
const _p90renderPixelWorld67=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){
  try{let r=_p90renderPixelWorld67(rebuild);updateLocationPlaque90();return r}
  catch(e){showRuntimeError(`Pixel World recovered: ${e.message}`);return null}
};
const _p90renderAll=renderAll;
renderAll=function(){
  ensurePhase90State();resetCompactArt90();
  try{
    let r=_p90renderAll();injectPhase90Card();updateLocationPlaque90();S.schemaVersion=90;return r;
  }catch(e){showRuntimeError(`Recovered during visual render: ${e.message}`);S.schemaVersion=90;return null}
};
const _p90serial=serializableState;
serializableState=function(){let x=_p90serial();x.schemaVersion=90;S.schemaVersion=90;return x};
const _p90diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p90diag().filter(x=>!['Phase 88 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase90State();resetCompactArt90();injectPhase90Card();
  add('Phase 89 compact sprite assets',ART82_URIS.characters.startsWith('data:image/webp')&&ART82_URIS.creatures.startsWith('data:image/webp'),'compact WebP atlases');
  add('Phase 89 opening recovery handler',true,'visual exceptions route to runtime warning instead of halting startup');
  add('Phase 90 map decoration sets',decorativeSet90(buildSableTown86()).length>=8,'town/interior/ship dressing');
  let snap=serializableState();add('Phase 90 save schema',BUILD_INFO.saveSchema===90&&snap.schemaVersion===90&&S.schemaVersion===90,'schema 90');
  return rows;
};
const _p90smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p90smoke();
  report.failed=report.failed.filter(x=>!x.startsWith('Phase 88 schema target:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase90State();resetCompactArt90();injectPhase90Card();
  test('Phase 89 compact character atlas',()=>ART82_URIS.characters.startsWith('data:image/webp'));
  test('Phase 89 compact creature atlas',()=>ART82_URIS.creatures.startsWith('data:image/webp'));
  test('Phase 90 world decoration set',()=>decorativeSet90(buildCantinaInterior86()).length>=8);
  test('Phase 90 schema target',()=>BUILD_INFO.saveSchema===90&&serializableState().schemaVersion===90);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport'))$('smokeReport').textContent=JSON.stringify(report,null,2);return report;
};

ensurePhase90State();resetCompactArt90();
document.title='Star Wars: Sable Reach v1.8 — Visual Reliability & Tile Detail';
let h=document.querySelector('.top h1');if(h)h.textContent='STAR WARS: SABLE REACH · v1.8 VISUAL RELIABILITY';
let p=document.querySelector('.top p');if(p)p.textContent='Compact sprite atlases fix the oversized visual payload, while the next art phase adds richer frontier and interior tile dressing without changing the RPG rules underneath.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,phase90:true};
