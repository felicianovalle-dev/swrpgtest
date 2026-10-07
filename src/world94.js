/* Full-size World viewport, explicit sprite frames, and connected architecture.
   This layer leaves the RPG data and schema 92 save namespace intact. */
const WORLD94={drawer:false,menu:false,zoom:1,buildings:new Map(),resize:null,fitting:false};
const BUILDING_ART94={image:null};
function buildingImage94(){
 if(!BUILDING_ART94.image){const im=new Image();im.decoding='async';im.src=BUILDING94_URI;BUILDING_ART94.image=im;im.addEventListener('load',()=>{WORLD94.buildings.clear();renderPixelWorld67(false)},{once:true})}
 return BUILDING_ART94.image;
}
const priorSable94=buildSableTown86;
buildSableTown86=function(){
 const m=priorSable94();
 m.buildings94=[
  {x:2,y:4,w:13,h:7,door:8,kind:'cantina',label:'CINDER SPIRE'},
  {x:17,y:4,w:13,h:7,door:23,kind:'market',label:'BROKER’S ROW'},
  {x:33,y:4,w:12,h:7,door:39,kind:'clinic',label:'RINN CLINIC'},
  {x:6,y:27,w:8,h:4,door:10,kind:'storage',label:'FREIGHT DEPOT'},
  {x:20,y:27,w:8,h:4,door:24,kind:'hab',label:'HABITATION'}
 ];
 // Make collision footprints match the dedicated sprite silhouettes. Door
 // coordinates and existing positions stay stable; only blocked roof cells
 // become smaller, so old saved positions cannot be stranded by this change.
 for(const [x,y,w,h]of [[2,2,13,9],[17,2,13,9],[33,2,12,9],[4,27,12,4],[18,27,12,4]])pxRect67(m.grid,x,y,w,h,'sand');
 for(const b of m.buildings94)pxBuilding67(m.grid,b.x,b.y,b.w,b.h,b.door,b.label);
 return m;
};

function pixelRound94(c,x,y,w,h,r,color){
 c.fillStyle=color;
 c.fillRect(x+r,y,w-2*r,h);c.fillRect(x,y+r,w,h-2*r);
 for(let yy=0;yy<r;yy+=2){let inset=Math.ceil(r-Math.sqrt(r*r-(r-yy)*(r-yy)));c.fillRect(x+inset,y+yy,w-2*inset,2);c.fillRect(x+inset,y+h-yy-2,w-2*inset,2)}
}
function pixelDome94(c,x,y,w,h,color){
 c.fillStyle=color;for(let yy=0;yy<h;yy+=2){let rel=(yy-h/2)/(h/2),ww=Math.round(Math.sqrt(Math.max(0,1-rel*rel))*w/2)*2;c.fillRect(Math.round(x+(w-ww)/2),y+yy,ww,2)}
}
function buildingCanvas94(b){
 const key=[b.w,b.h,b.door-b.x,b.kind].join(':');if(WORLD94.buildings.has(key))return WORLD94.buildings.get(key);
 const cv=document.createElement('canvas');cv.width=b.w*32;cv.height=b.h*32+12;const c=cv.getContext('2d'),W=b.w*32,H=b.h*32,DX=(b.door-b.x)*32+16;
 const r=(x,y,w,h,k)=>{c.fillStyle=k;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 const im=buildingImage94(),frame=BUILDING94_FRAMES[b.kind];
 if(im.complete&&im.naturalWidth&&frame){
  const [sx,sy,sw,sh,doorX]=frame,dh=Math.min(H,Math.round((W-6)*sh/sw)),top=H-dh;
  c.imageSmoothingEnabled=false;
  // Align the painted entrance with the interactive tile, including asymmetry
  // from awnings and pipes, rather than assuming the image center is the door.
  c.drawImage(im,sx,sy,doorX,sh,3,top,DX-3,dh);
  c.drawImage(im,sx+doorX,sy,sw-doorX,sh,DX,top,W-DX-3,dh);
  WORLD94.buildings.set(key,cv);return cv;
 }
 // Continuous weathered stucco silhouette and parapet, without tile seams.
 pixelRound94(c,8,18,W-10,H-8,18,'#49342980');pixelRound94(c,2,5,W-8,H-6,20,'#69442f');
 pixelRound94(c,2,2,W-10,H-18,20,'#e2b17a');pixelRound94(c,6,7,W-18,H-28,16,'#b98051');
 pixelRound94(c,15,18,W-37,H-70,14,'#d0a16b');pixelRound94(c,24,26,W-55,H-82,10,'#b57b4e');
 r(8,H-78,W-25,63,'#c5915d');r(8,H-77,W-25,6,'#f0bf81');r(8,H-19,W-25,5,'#9a6442');r(8,H-14,W-25,4,'#6f4936');
 for(let i=0;i<W*H/110;i++){let x=9+Math.floor(noise93(b.x,b.y,i)*(W-29)),y=12+Math.floor(noise93(b.y,b.x,i+61)*(H-30));r(x,y,i%8===0?2:1,1,['#e5b67b','#a87550','#d7a16a','#bc895b'][i%4])}
 // Hairline plaster cracks have an irregular rhythm rather than a brick grid.
 for(let i=0;i<8;i++){let x=28+Math.floor(noise93(b.x,3,i)*(W-62)),y=32+Math.floor(noise93(b.y,5,i)*(H-62));for(let j=0;j<5;j++){r(x+j,y+j*2,1,2,'#976646');if(j===3)r(x+j-2,y+j*2,2,1,'#a9754c')}}
 if(b.h>5){
  const dw=b.kind==='clinic'?132:156,dh=94,dx=42,dy=35;
  pixelDome94(c,dx+5,dy+13,dw,dh,'#936343');pixelDome94(c,dx,dy,dw,dh,'#e0ad73');pixelDome94(c,dx+8,dy+8,dw-18,dh-18,'#d29b62');
  pixelDome94(c,dx+16,dy+12,dw-38,dh-42,'#deb17a');pixelDome94(c,dx+23,dy+16,dw-59,dh-65,'#e8be88');
  for(let i=0;i<120;i++){let xx=Math.floor(noise93(i,b.x,9)*dw),yy=Math.floor(noise93(i,b.y,13)*dh);if(((xx-dw/2)/(dw/2))**2+((yy-dh/2)/(dh/2))**2<.82)r(dx+xx,dy+yy,1,1,i%2?'#e8b57b':'#b78050')}
  r(W-87,33,53,54,'#604d3b');r(W-86,31,51,50,'#314452');r(W-83,34,45,3,'#9ba0a0');for(let yy=41;yy<77;yy+=7){r(W-81,yy,41,4,'#152836');r(W-81,yy+4,41,1,'#68848b')}
  r(W-43,92,10,H-175,'#233641');r(W-42,92,3,H-175,'#617987');for(let yy=92;yy<H-84;yy+=22){r(W-46,yy,17,5,'#182a36');r(W-45,yy,15,2,'#a8a09a')}
  pixelDome94(c,W-160,44,44,18,'#7b898c');r(W-160,52,44,32,'#394e59');r(W-155,54,5,27,'#8a9c9d');r(W-160,80,44,5,'#20303c');
 }
 // Windows recessed into a single facade.
 for(const x of [36,W-71]){r(x,H-67,29,30,'#92613d');r(x+3,H-64,23,23,'#20303b');r(x+5,H-62,4,18,'#e7ac50');r(x+13,H-62,7,18,'#b47430');r(x+3,H-40,23,3,'#e3b375');r(x+10,H-64,2,23,'#473b31')}
 // Arched entrance aligns exactly with the existing walkable door cell.
 pixelRound94(c,DX-25,H-69,50,67,18,'#895537');pixelRound94(c,DX-22,H-68,44,66,16,'#efc38d');pixelRound94(c,DX-18,H-62,36,63,14,'#172a36');
 r(DX-15,H-46,30,43,'#344754');r(DX-14,H-45,3,40,'#667b80');r(DX-1,H-45,2,42,'#111e28');r(DX-8,H-40,1,25,'#c29a51');r(DX+7,H-40,1,25,'#c29a51');r(DX-4,H-25,2,4,'#ecd396');r(DX+3,H-25,2,4,'#ecd396');r(DX-22,H-3,44,3,'#eed2a1');
 for(const x of [DX-37,DX+32]){r(x+3,H-61,2,8,'#41382d');r(x,H-53,10,24,'#7b492b');r(x+2,H-52,6,20,'#eda746');r(x+3,H-50,3,15,'#ffe99c');r(x-1,H-55,12,3,'#443a30');r(x-1,H-30,12,3,'#674729')}
 if(b.kind==='cantina'||b.kind==='market'){
  const ax=25,ay=H-107,aw=114;r(ax-4,ay-8,3,69,'#253643');r(ax+aw,ay-8,3,69,'#253643');r(ax-6,ay-4,aw+12,4,'#c4a36a');
  for(let xx=0;xx<aw;xx+=2){let sag=Math.round(Math.sin(xx/aw*Math.PI)*13);r(ax+xx,ay+sag,2,35,xx%12<6?'#9e3d32':'#b44d35');r(ax+xx,ay+sag,2,2,'#eb8c50');r(ax+xx,ay+sag+33,2,2,'#602e2a')}
  r(ax+2,ay+48,aw-6,6,'#865133');r(ax+2,ay+48,aw-6,2,'#e2ae64');for(let x=ax+8;x<ax+aw-4;x+=12){r(x,ay+37,6,10,x%3?'#548a90':'#ab7632');r(x+1,ay+35,3,3,'#edc874')}
 }
 if(b.kind==='clinic'){r(DX+49,H-85,26,26,'#263d50');r(DX+59,H-82,6,20,'#87d6cf');r(DX+52,H-75,20,6,'#87d6cf')}
 c.font='bold 11px monospace';const tw=c.measureText(b.label).width;r(DX-tw/2-9,H-92,tw+18,16,'#213342');r(DX-tw/2-8,H-91,tw+16,1,'#b39558');c.fillStyle='#edca84';c.fillText(b.label,DX-tw/2,H-80);
 WORLD94.buildings.set(key,cv);return cv;
}

const priorPaint94=paintTile93;
paintTile93=function(c,t,x,y,p){
 if(['floor','road','plaza92','market92'].includes(t)){
  const r=(xx,yy,w,h,col)=>{c.fillStyle=col;c.fillRect(xx,yy,w,h)};
  r(0,0,32,32,p.floor[1]);r(0,0,32,1,p.floor[0]);r(0,0,1,32,p.floor[0]);r(2,2,28,1,p.wall[2]);r(30,3,1,27,p.floor[0]);
  for(let i=0;i<35;i++)r(Math.floor(noise93(x,y,i)*29)+2,Math.floor(noise93(y,x,i+19)*28)+3,1,1,i%3?p.floor[2]:p.floor[0]);
  if((x+y)%4===0){r(21,23,1,4,p.floor[0]);r(22,25,3,1,p.floor[0])}return;
 }
 if(t==='wall'&&ART93.frameMap&&ART93.frameMap.id!=='sableTown'){
  const m=ART93.frameMap,r=(xx,yy,w,h,col)=>{c.fillStyle=col;c.fillRect(xx,yy,w,h)};
  r(0,0,32,32,p.wall[1]);r(0,0,32,6,p.wall[3]);r(0,6,32,2,p.wall[2]);r(0,27,32,5,p.wall[0]);
  if(pxTile67(m,x-1,y)!=='wall')r(0,0,3,27,p.wall[2]);if(pxTile67(m,x+1,y)!=='wall')r(29,0,3,27,p.wall[0]);
  for(let i=0;i<16;i++)r(Math.floor(noise93(x,y,i)*28)+2,Math.floor(noise93(y,x,i+7)*17)+9,1,1,p.wall[i%2?2:0]);return;
 }
 return priorPaint94(c,t,x,y,p);
};
ART93.tiles.clear();ART93.maxTiles=1024;

function fitWorld94(){
 if(WORLD94.fitting||!document.body.classList.contains('world-play94'))return;
 const stage=document.querySelector('#pixelworld67 .pixel-stage67'),cv=$('pixelCanvas67');if(!stage||!cv)return;
 const r=stage.getBoundingClientRect();if(r.width<10||r.height<10)return;WORLD94.fitting=true;
 const tileScreen=(r.width<700?29:42)*WORLD94.zoom;
 PX67.viewW=Math.max(12,Math.min(44,Math.floor(r.width/tileScreen)));PX67.viewH=Math.max(8,Math.min(32,Math.floor(r.height/tileScreen)));
 PX67.canvasW=PX67.viewW*16;PX67.canvasH=PX67.viewH*16;
 const scale=Math.min(r.width/PX67.canvasW,r.height/PX67.canvasH);
 cv.style.width=Math.floor(PX67.canvasW*scale)+'px';cv.style.height=Math.floor(PX67.canvasH*scale)+'px';
 pxDraw67();WORLD94.fitting=false;
}

pxDraw67=function(){
 const cv=$('pixelCanvas67');if(!cv)return;const W=PX67.canvasW,H=PX67.canvasH;
 if(cv.width!==W*2||cv.height!==H*2){cv.width=W*2;cv.height=H*2}
 const c=cv.getContext('2d');c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=false;c.clearRect(0,0,W,H);
 const map=pixelCurrentMap67(),p=pxPos67(),cam=pxCamera67(map,p),buildings=map.buildings94||[];ART93.frameMap=map;
 try{
  for(let y=0;y<PX67.viewH;y++)for(let x=0;x<PX67.viewW;x++){
   const wx=cam.x+x,wy=cam.y+y,inBuilding=buildings.some(b=>wx>=b.x&&wx<b.x+b.w&&wy>=b.y&&wy<b.y+b.h);
   pxDrawTile67(c,inBuilding?'sand':pxTile67(map,wx,wy),x*16,y*16,wx,wy);
  }
  const occupied=new Set([...map.objects,...map.npcs,p].map(o=>o.x+','+o.y));
  const dec=decorativeSet90(map).filter(d=>!occupied.has(d.x+','+d.y)&&!buildings.some(b=>d.x>=b.x&&d.x<b.x+b.w&&d.y>=b.y&&d.y<b.y+b.h));
  const entities=[...buildings.map(b=>({...b,artType:'building',foot:b.y+b.h-1})),...map.objects.map(o=>({...o,artType:'object',foot:o.y+(o.h||1)-1})),...dec.map(d=>({...d,artType:'decor',foot:d.y})),...map.npcs.map(n=>({...n,artType:'person',foot:n.y})),{...p,artType:'player',foot:p.y}].sort((a,b)=>a.foot-b.foot||Number(a.artType==='player')-Number(b.artType==='player'));
  for(const e of entities){
   const x=(e.x-cam.x)*16,y=(e.y-cam.y)*16;if(x+(e.w||2)*16<0||y+(e.h||2)*16<0||x>W+32||y>H+32)continue;
   if(e.artType==='building'){const im=buildingCanvas94(e);c.drawImage(im,x,y,im.width/2,im.height/2)}
   else if(e.artType==='object'){
    if(e.kind==='door'&&buildings.some(b=>e.x===b.door&&e.y===b.y+b.h-1))continue;
    pxDrawObject67(c,e,x,y);
   }else if(e.artType==='decor')drawDecor90(c,e,x,y);else pxDrawHumanoid67(c,x,y,e,e.artType==='player',e.facing||'down');
  }
  c.save();c.globalCompositeOperation='screen';
  const lights=[...entities.filter(e=>/lamp/.test(e.kind||'')),...buildings.flatMap(b=>[{x:b.door-1,y:b.y+b.h-2},{x:b.door+1,y:b.y+b.h-2}])];
  for(const l of lights){const x=(l.x-cam.x)*16+8,y=(l.y-cam.y)*16+10;if(x<0||y<0||x>W||y>H)continue;const g=c.createRadialGradient(x,y,1,x,y,18);g.addColorStop(0,'rgba(255,179,74,.26)');g.addColorStop(1,'rgba(255,150,40,0)');c.fillStyle=g;c.fillRect(x-18,y-18,36,36)}c.restore();
  c.font='6px monospace';c.textBaseline='bottom';
  for(const o of map.objects.filter(o=>o.kind==='quest73'||o.kind==='district74')){let x=(o.x-cam.x)*16,y=(o.y-cam.y)*16;if(x<0||y<0||x>W||y>H)continue;let label=o.kind==='quest73'?'★ OBJECTIVE':o.label.toUpperCase().slice(0,18),tw=c.measureText(label).width;c.fillStyle='#07111ce8';c.fillRect(x+8-tw/2-2,y-5,tw+4,8);c.fillStyle=o.kind==='quest73'?'#f5ce70':'#d4e6ec';c.fillText(label,x+8-tw/2,y+2)}
 }finally{ART93.frameMap=null}
};

function ensureWorldUI94(){
 const sec=$('pixelworld67'),stage=sec?.querySelector('.pixel-stage67'),shell=sec?.querySelector('.pixel-shell67');if(!sec||!stage||!shell)return;
 if(!$('worldBar94')){
  const bar=document.createElement('div');bar.id='worldBar94';
  bar.innerHTML='<div class="world-brand94"><small>SABLE REACH</small><strong id="worldPlace94"></strong></div><div class="world-stats94" id="worldStats94"></div><div class="world-buttons94"><button class="world-button94" id="worldMenu94" aria-expanded="false">Menu</button><button class="world-button94" id="worldMap94" aria-expanded="false">Area & travel</button><button class="world-button94" id="worldFullscreen94">Fullscreen</button></div>';
  sec.prepend(bar);
  const footer=document.createElement('div');footer.id='worldFooter94';footer.innerHTML='<div class="world-links94"><button class="world-button94" data-worldnav94="story61tab">Journal</button><button class="world-button94" data-worldnav94="crewmgmt">Crew</button><button class="world-button94" data-worldnav94="equipment">Gear</button><button class="world-button94 optional94" data-worldnav94="galaxy">Galaxy</button><button class="world-button94" id="worldSave94">Save</button></div><span id="worldPrompt94" class="world-prompt94"></span><button class="world-button94" id="worldInteract94">Interact</button>';sec.appendChild(footer);
  const drawer=document.createElement('aside');drawer.id='worldDrawer94';drawer.hidden=true;drawer.setAttribute('aria-label','Area map and travel');drawer.innerHTML='<div class="drawer-head94">AREA MAP & TRAVEL<button class="world-button94" id="worldDrawerClose94" aria-label="Close area and travel">✕</button></div>';shell.appendChild(drawer);
  drawer.appendChild(sec.querySelector('.pixel-side67'));
  const touch=document.createElement('div');touch.id='worldTouch94';touch.innerHTML='<button class="up" data-worldmove94="0,-1" aria-label="Walk up">▲</button><button class="left" data-worldmove94="-1,0" aria-label="Walk left">◀</button><button class="down" data-worldmove94="0,1" aria-label="Walk down">▼</button><button class="right" data-worldmove94="1,0" aria-label="Walk right">▶</button>';stage.appendChild(touch);
  $('worldMenu94').onclick=()=>{WORLD94.menu=!WORLD94.menu;WORLD94.drawer=false;syncWorldUI94()};$('worldMap94').onclick=()=>{WORLD94.drawer=!WORLD94.drawer;WORLD94.menu=false;syncWorldUI94()};$('worldDrawerClose94').onclick=()=>{WORLD94.drawer=false;syncWorldUI94()};
  $('worldInteract94').onclick=pxInteractNearby67;
  $('worldSave94').onclick=()=>{save();$('worldSave94').textContent='Saved';setTimeout(()=>{if($('worldSave94'))$('worldSave94').textContent='Save'},1200)};
  footer.querySelectorAll('[data-worldnav94]').forEach(b=>b.onclick=()=>renderNavTab(b.dataset.worldnav94));
  touch.querySelectorAll('[data-worldmove94]').forEach(b=>b.onclick=()=>{if(PX67.dialog)return;const [dx,dy]=b.dataset.worldmove94.split(',').map(Number);pxStopPath67();pxMove67(dx,dy);$('pixelCanvas67')?.focus({preventScroll:true})});
  $('worldFullscreen94').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch(e){$('worldFullscreen94').textContent='Expanded view'}fitWorld94()};
  stage.addEventListener('pointerdown',e=>{if(e.target.id==='pixelCanvas67')$('pixelCanvas67').focus({preventScroll:true})});
  drawer.querySelectorAll('[data-pxdest86]').forEach(b=>b.addEventListener('click',()=>{WORLD94.drawer=false;syncWorldUI94();fitWorld94()}));
  if(typeof ResizeObserver!=='undefined'){WORLD94.resize=new ResizeObserver(()=>fitWorld94());WORLD94.resize.observe(stage)}
 }
 const context=$('worldContext74');if(context&&!$('worldDrawer94').contains(context))$('worldDrawer94').appendChild(context);
 document.querySelectorAll('#worldDrawer94 .pixel-window67').forEach(el=>{if(/Visual Language|Scene Preview/.test(el.querySelector('.pixel-title67')?.textContent||''))el.dataset.reference94='true'});
}
function syncWorldUI94(){
 const active=!!$('pixelworld67')&&!$('pixelworld67').classList.contains('hidden');
 document.body.classList.toggle('world-play94',active);document.body.classList.toggle('menu-open94',active&&WORLD94.menu);document.body.classList.toggle('dialog-open94',active&&!!PX67.dialog);
 if(!active){WORLD94.menu=false;WORLD94.drawer=false;return}
 ensureWorldUI94();const m=pixelCurrentMap67();$('worldPlace94').textContent=m.name;
 $('worldStats94').innerHTML=`<span>W <b>${S.wounds||0}/${woundThreshold()}</b></span><span>S <b>${S.strain||0}/${strainThreshold()}</b></span><span class="secondary94">CR <b>${Number(S.credits||0).toLocaleString()}</b></span><span class="secondary94">DAY <b>${S.world?.day||1}</b></span>`;
 $('worldPrompt94').textContent=pxNearby67()?.prompt||pxNearby67()?.name||'WASD / arrows to walk · Click to move · Space to interact';
 $('worldDrawer94').hidden=!WORLD94.drawer;$('worldMap94').setAttribute('aria-expanded',String(WORLD94.drawer));$('worldMenu94').setAttribute('aria-expanded',String(WORLD94.menu));
}
const priorWorldRender94=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){let r=priorWorldRender94(rebuild);syncWorldUI94();fitWorld94();return r};
const priorNav94=renderNavTab;
renderNavTab=function(id){if(id!=='pixelworld67'&&PX67.dialog)closePixelDialog67(false);let r=priorNav94(id);syncWorldUI94();fitWorld94();return r};
const priorRenderAll94=renderAll;
renderAll=function(){let r=priorRenderAll94();syncWorldUI94();fitWorld94();return r};

/* Compact dialogue leaves the map visible; detailed dice previews are opt-in. */
drawPortrait69=function(canvas,n,expression='neutral'){
 if(!canvas)return;canvas.width=canvas.height=64;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
 c.fillStyle='#132637';c.fillRect(0,0,64,64);c.fillStyle='#203b50';c.fillRect(3,3,58,58);
 const key=classifyHumanoidSprite82(n,n.id==='pc');drawCharSprite82(c,key,'down',32,59,44,52,0);
 if(expression==='pleased'){c.strokeStyle='#d5b376';c.strokeRect(2,2,60,60)}
};
openVisualDialogue69=function(n,text=null,result=''){
 ensurePhase70State();let box=$('pixelDialog67');if(!box)return;PX67.dialog={title:n.name,text:text||visualDialogueText69(n),actions:[]};pxStopPath67();box.classList.remove('hidden');
 let rel=n.crewId?(S.approval?.[n.crewId]||0):visualRelation69(n.id);
 let social=n.crewId?'':Object.keys(VISUAL_SOCIAL_69).map(mode=>{let p=socialPreview69(n,mode);return `<div class="pixel-social-option69"><b>${pxEsc67(p.o.label)} · ${pxEsc67(p.o.skill)}</b><span class="tiny">${p.done?'Already tried today · ':''}${pxEsc67(p.q.actor.name)} · difficulty ${p.diff}</span><div>${dicePoolHTML(p.q.p)}</div><button class="btn social69" data-visual-social69="${mode}" ${p.done?'disabled':''}>${p.done?'Resolved Today':'Try Approach'}</button></div>`}).join('');
 box.innerHTML=`<div class="dialog-head94"><div class="dialog-avatar94"><canvas id="portrait69" aria-label="${pxEsc67(n.name)} portrait"></canvas></div><div class="dialog-body94"><div class="pixel-speaker67">${pxEsc67(n.name)}</div><div class="pixel-speaker-meta69">${pxEsc67(n.role||'Local')} · ${pxEsc67(n.faction||'Independent')} · ${n.crewId?'Approval':'Relationship'} ${rel}</div><div class="dialog-line94">“${pxEsc67(text||visualDialogueText69(n))}”</div>${result?`<div class="pixel-social-result69">${pxEsc67(result)}</div>`:''}<div class="pixel-dialog-actions67"><button class="btn primary" id="visualWork69">${n.crewId?'Talk / Crew Profile':'Ask About Work'}</button>${n.crewId?'<button class="btn" id="visualGoal69">Personal Goal</button>':''}<button class="btn" id="visualClose69">Leave</button></div>${social?`<details><summary>Choose a social approach · view dice pools</summary><div class="pixel-social-grid69">${social}</div></details>`:''}</div><button class="world-button94 dialog-close94" id="dialogDismiss94" aria-label="Close dialogue">✕</button></div>`;
 drawPortrait69($('portrait69'),n,result?'pleased':'neutral');box.querySelectorAll('[data-visual-social69]').forEach(b=>b.onclick=()=>resolveVisualSocial69(n.id,b.dataset.visualSocial69));
 $('visualClose69').onclick=$('dialogDismiss94').onclick=()=>{closePixelDialog67();$('pixelCanvas67')?.focus({preventScroll:true})};
 $('visualWork69').onclick=()=>{closePixelDialog67(false);if(n.crewId){S.crewConversation=n.crewId;renderNavTab('crewmgmt')}else renderNavTab('gm')};
 if($('visualGoal69'))$('visualGoal69').onclick=()=>{closePixelDialog67(false);offerCrewRequest59(n.crewId);renderNavTab('crewmgmt')};syncWorldUI94();
};
const priorClose94=closePixelDialog67;
closePixelDialog67=function(render=true){let r=priorClose94(render);document.body.classList.remove('dialog-open94');return r};
document.addEventListener('keydown',e=>{
 if(!document.body.classList.contains('world-play94'))return;
 if(e.key==='Escape'){if(PX67.dialog)closePixelDialog67();else{WORLD94.drawer=false;WORLD94.menu=false;syncWorldUI94()}$('pixelCanvas67')?.focus({preventScroll:true});e.preventDefault()}
},true);
BUILD_INFO.version='94.0-world-viewport-and-architecture';BUILD_INFO.saveSchema=92;
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,world94:WORLD94};
