/* Reference-directed 32px material art; coordinates retain the 16px gameplay grid. */
const previousMap93=pixelMap67;
pixelMap67=function(id){let m;if(id?.startsWith('hub:')){let hub=id.slice(4);m=hub==='sable'?buildSableTown86():buildHubMap74(hub)}else m=previousMap93(id);
 if(m.id!=='ship'){m.hubId=m.hubId||S.world?.currentHub||'sable';if(m.id==='sableTown'){let q=visualQuestObject73(m);if(q&&!m.objects.some(o=>o.kind==='quest73'))m.objects.push(q)}}return m};
const previousCantina93=buildCantinaInterior86;
buildCantinaInterior86=function(){let m=previousCantina93();for(let o of m.objects)if(o.kind==='booth92'){o.w=2;o.h=2}
 for(let x of [18,20,22,23])m.objects.push({id:'barJoin93-'+x,kind:'counter92',x,y:5,label:'Cantina Bar',prompt:'A worn brass-edged counter',action:'noop',block:true});
 for(let x of [17,19,21])m.objects.push({id:'bottleRack93-'+x,kind:'shelf92',x,y:3,label:'Bottle Rack',prompt:'Bottles from across the Outer Rim',action:'noop',block:true});
 return m};
const previousClassify93=classifyHumanoidSprite82;
classifyHumanoidSprite82=function(n={},player=false){if(player)return previousClassify93(n,true);let b=[n.name,n.role,n.species,n.career,n.faction].filter(Boolean).join(' ').toLowerCase();
 for(let [re,key] of [[/protocol/,'protocol_droid'],[/astromech|droid/,'astromech_droid'],[/wookie/,'wookie_bruiser'],[/twi.?lek/,'twilek_scoundrel'],[/rodian/,'rodian_hunter'],[/mon.?cal/,'moncal_officer'],[/mechanic|tech|engineer|slicer/,'mechanic_tech'],[/jedi|force|mystic/,'force_adept'],[/imperial|stormtrooper/,'imperial_soldier'],[/rebel|alliance/,'rebel_trooper'],[/bounty|mandalor|mercenary/,'bounty_hunter']])if(re.test(b))return key;return 'human_smuggler'};
const ART93={tiles:new Map(),maxTiles:512,frameMap:null,version:'93.0'};
const oldTile93=pxDrawTile67,oldProp93=pxDrawObject67,oldDecor93=drawDecor90,oldPerson93=pxDrawHumanoid67;
function artTheme93(map){
 if(map.id==='ship')return{wall:['#192633','#354655','#7d8d97','#a7b4bb'],floor:['#354552','#435461','#506573'],sand:['#172532','#233441','#3b4c57'],warm:false};
 if(map.id==='clinicInterior')return{wall:['#293d49','#718d98','#b2c8c9','#d6e1d7'],floor:['#6c8c91','#88a3a5','#a2b8b6'],sand:['#3e5d67','#718e98','#97abb0'],warm:false};
 const biome=WORLD_STYLES_74[map.hubId]?.label?.toLowerCase()||'';
 if(map.hubId&&map.hubId!=='sable'){let p=WORLD_STYLES_74[map.hubId];return{wall:['#24323a',p.wall,p.ground2,p.accent],floor:[p.road,p.ground,p.ground2],sand:[p.ground,p.ground2,p.road],warm:/desert|frontier|salvage/.test(biome)}}
 if(map.id!=='sableTown'&&!/Interior/.test(map.id)&&/station|neon|industrial/.test(biome))return{wall:['#172735','#354859','#627788','#99a6b0'],floor:['#344754','#495c6b','#697b86'],sand:['#283d48','#354b57','#4a5e68'],warm:false};
 return{wall:['#67402e','#a7693e','#dfab68','#ffda92'],floor:['#805a3f','#a57d52','#c29968'],sand:['#b9874f','#d2a061','#edbf7d'],warm:true};
}
function noise93(x,y,i){let n=Math.imul(x+17,374761393)^Math.imul(y+29,668265263)^Math.imul(i+7,1274126177);n=Math.imul(n^(n>>>13),1274126177);return(n>>>0)%997/997}
function paintTile93(c,t,x,y,p){
 const r=(x,y,w,h,k)=>{c.fillStyle=k;c.fillRect(x,y,w,h)};
 const floor=/floor|plaza|market|road/.test(t),metal=/deck|metal|pad|grate|medfloor/.test(t);
 if(t==='wall'){
  r(0,0,32,32,p.wall[0]);r(0,1,32,25,p.wall[1]);r(0,1,32,5,p.wall[3]);r(0,6,32,2,p.wall[2]);r(0,25,32,3,p.wall[0]);r(0,28,32,2,p.wall[2]);
  for(let yy=9;yy<25;yy+=8){r(0,yy,32,1,p.wall[0]);let off=(yy===9?0:16);for(let xx=off;xx<32;xx+=16)r(xx,yy,1,8,p.wall[0])}
  for(let i=0;i<13;i++){let xx=Math.floor(noise93(x,y,i)*31),yy=9+Math.floor(noise93(y,x,i+4)*14);r(xx,yy,1,1,p.wall[(i%2)+1])}
  if(x%6===0){r(12,10,10,13,'#272f36');r(13,10,2,13,'#74848b');for(let yy=12;yy<23;yy+=3)r(16,yy,5,1,'#0b1620')}
  return;
 }
 if(t==='roof'){
  r(0,0,32,32,p.wall[0]);r(1,1,30,28,p.wall[1]);r(2,2,28,3,p.wall[3]);r(1,27,30,3,p.wall[0]);
  for(let i=0;i<45;i++){let xx=Math.floor(noise93(x,y,i)*29)+1,yy=Math.floor(noise93(y,x,i)*23)+4;r(xx,yy,1,1,i%3?p.wall[2]:p.wall[0])}
  if(x%5===0){r(12,7,11,13,'#33434f');r(13,8,9,2,'#8595a0');for(let yy=11;yy<19;yy+=3)r(14,yy,7,1,'#162430')}
  return;
 }
 if(t==='rug92'){
  r(0,0,32,32,'#803529');
  const m=ART93.frameMap,edge=(dx,dy)=>!m||pxTile67(m,x+dx,y+dy)!=='rug92';
  if(edge(0,-1)){r(0,1,32,1,'#dda75a');r(0,4,32,1,'#b0653d')}
  if(edge(0,1)){r(0,29,32,1,'#dda75a');r(0,26,32,1,'#b0653d')}
  if(edge(-1,0)){r(1,0,1,32,'#dda75a');r(4,0,1,32,'#b0653d')}
  if(edge(1,0)){r(29,0,1,32,'#dda75a');r(26,0,1,32,'#b0653d')}
  for(let i=0;i<15;i++)r(Math.floor(noise93(x,y,i)*32),Math.floor(noise93(y,x,i)*32),1,1,'#a34831');
  for(let yy=9;yy<=22;yy++){let d=Math.abs(16-yy);r(9+d,yy,Math.max(1,14-2*d),1,yy%3?'#b7633c':'#e3a45b')}
  r(14,13,4,6,'#702d28');r(15,15,2,2,'#e4b066');return;
 }
 if(t==='void'){r(0,0,32,32,'#07101a');return}
 if(metal){
  r(0,0,32,32,t==='medfloor92'?'#89a4a8':'#3e505d');r(1,1,30,2,t==='medfloor92'?'#d3dfd9':'#7c919d');r(1,29,30,2,'#243744');r(0,0,1,32,'#263a46');r(31,0,1,32,'#1b2a35');
  if(t==='grate92'){for(let yy=5;yy<28;yy+=4){r(4,yy,24,2,'#152733');r(5,yy+2,23,1,'#6c828e')}}else{r(4,6,24,19,t==='medfloor92'?'#94afb2':'#465c69');r(5,7,22,1,'#627b87');[[3,3],[27,3],[3,26],[27,26]].forEach(([xx,yy])=>{r(xx,yy,2,2,'#162b38');r(xx,yy,1,1,'#b0c0c5')});if(t==='pad'){r(9,12,14,3,'#d4ac55');r(9,18,14,2,'#d4ac55')}}return;
 }
 if(floor){
  r(0,0,32,32,p.floor[0]);let stagger=y%2?8:0;
  for(let yy=0;yy<32;yy+=16)for(let xx=-stagger;xx<32;xx+=16){r(xx+1,yy+1,15,14,p.floor[(x+y+Math.floor(xx/16)+4)%2+1]);r(xx+2,yy+2,13,1,p.wall[2]);r(xx+2,yy+13,13,1,p.floor[0])}
  for(let i=0;i<24;i++){let xx=Math.floor(noise93(x,y,i)*32),yy=Math.floor(noise93(y,x,i+2)*32);r(xx,yy,1,1,i%2?p.floor[0]:p.wall[2])}return;
 }
 if(t==='sand'){
  r(0,0,32,32,p.sand[1]);for(let i=0;i<65;i++){let xx=Math.floor(noise93(x,y,i)*32),yy=Math.floor(noise93(y,x,i+17)*32);r(xx,yy,i%9===0?2:1,1,p.sand[i%3])}return;
 }
 c.save();c.scale(2,2);oldTile93(c,t,0,0,x,y);c.restore();
}
pxDrawTile67=function(ctx,t,sx,sy,x,y){
 const map=ART93.frameMap||pixelCurrentMap67(),p=artTheme93(map),k=map.id+'|'+t+'|'+(x%12)+'|'+(y%12)+'|'+(t==='rug92'?[[0,-1],[0,1],[-1,0],[1,0]].map(([dx,dy])=>pxTile67(map,x+dx,y+dy)==='rug92'?1:0).join(''):'');
 let tile=ART93.tiles.get(k);if(!tile){tile=document.createElement('canvas');tile.width=tile.height=32;paintTile93(tile.getContext('2d'),t,x,y,p);if(ART93.tiles.size>=ART93.maxTiles)ART93.tiles.clear();ART93.tiles.set(k,tile)}
 ctx.drawImage(tile,sx,sy,16,16);
};
function propArt93(ctx,kind,sx,sy){
 const accepted=['counter92','booth92','shelf92','shelf','bottles','lamp92','lamp','stool','plant92','plant','barrel92','barrel','crate92','crate','door','terminal','machine92','locker92','kitchen92','bed92','bench92','bench','table','awning','pipe','panel','sign92','sign'];
 if(!accepted.includes(kind))return false;
 ctx.save();ctx.translate(sx,sy);ctx.scale(.5,.5);
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)},wood=['#342521','#6b3f2b','#a3683c','#d89a54'],steel=['#13242e','#314754','#607d8c','#9eb4ba'];
 r(3,28,26,3,'#1c171780');
 const bottle=(x,y,i)=>{let c=['#ce952e','#367e9b','#559465','#af6247'][i%4];r(x+1,y,2,2,'#e5b967');r(x,y+2,4,8,'#172833');r(x+1,y+2,2,7,c);r(x+1,y+3,1,4,'#f1d99c');r(x+1,y+7,2,1,'#e5b967')};
 if(/counter|table|bench/.test(kind)){
  r(1,12,30,16,wood[0]);r(2,11,28,5,wood[2]);r(3,11,26,1,wood[3]);r(3,17,26,9,wood[1]);for(let x=4;x<28;x+=6){r(x,18,1,7,wood[0]);r(x+1,18,1,6,wood[2])}r(2,26,28,2,wood[0]);if(kind==='counter92'){bottle(7,3,0);bottle(21,4,1);r(14,8,4,4,'#e6c78b')}if(kind==='table'){r(6,28,3,3,wood[0]);r(24,28,3,3,wood[0])}
 }else if(kind==='booth92'){
  r(1,3,30,25,wood[0]);r(3,4,26,8,'#873831');r(4,4,24,2,'#c16443');for(let x=6;x<28;x+=5)r(x,7,1,4,'#642b2a');r(3,21,26,6,'#a54a36');r(3,21,26,1,'#d2794c');r(9,13,15,8,wood[1]);r(9,13,15,2,wood[3]);r(16,20,2,6,wood[0]);bottle(13,4,0);
 }else if(['shelf92','shelf','bottles'].includes(kind)){
  r(1,1,30,27,wood[0]);for(let y=1;y<28;y+=13){r(2,y,28,2,wood[3]);for(let i=0;i<5;i++)bottle(3+i*5,y+3,i+(y===1?0:1));r(2,y+12,28,2,wood[2])}r(1,1,2,28,wood[2]);r(29,1,2,28,wood[1]);
 }else if(/lamp/.test(kind)){
  r(14,0,3,7,steel[0]);r(11,5,10,2,wood[2]);r(10,8,12,13,'#7b421c');r(12,7,8,15,'#e0a131');r(13,9,6,11,'#ffd76d');r(14,10,3,8,'#fff4b8');r(10,22,12,2,wood[1]);r(13,24,6,2,wood[0]);
 }else if(kind==='stool'){
  r(8,16,3,14,wood[0]);r(23,16,3,14,wood[0]);r(7,10,20,9,wood[1]);r(9,8,16,9,wood[2]);r(10,8,14,2,wood[3]);r(10,15,14,2,wood[0]);
 }else if(/plant/.test(kind)){
  r(8,23,18,8,'#583b28');r(7,21,20,3,'#e0a264');r(10,25,12,4,'#a6633c');r(16,7,2,16,'#244a37');[[13,4,3,14],[19,6,3,14],[7,10,5,4],[21,13,6,3],[10,15,5,3]].forEach(a=>r(...a,'#6b9745'));r(14,5,1,15,'#b7bd5a');r(20,7,1,12,'#93ad4f');
 }else if(/barrel/.test(kind)){
  r(7,3,18,26,steel[0]);r(8,4,16,24,steel[1]);r(10,5,3,22,steel[2]);r(7,6,18,3,steel[3]);r(6,22,20,3,steel[2]);r(11,2,10,2,steel[3]);r(20,10,2,10,steel[0]);
 }else if(/crate/.test(kind)){
  r(3,8,26,21,wood[0]);r(4,7,24,19,wood[2]);r(4,7,24,2,wood[3]);r(5,9,22,14,wood[1]);for(let x=7;x<27;x+=6)r(x,10,1,12,wood[2]);r(4,15,24,2,wood[3]);r(10,8,2,17,wood[3]);r(22,8,2,17,wood[3]);r(15,13,4,6,steel[0]);r(16,14,2,2,'#6ec8ce');
 }else if(kind==='door'){
  r(4,7,24,25,'#382d28');r(6,4,20,27,'#a7784d');r(9,2,14,3,'#d9ab71');r(9,7,16,24,steel[0]);r(10,8,6,22,steel[1]);r(18,8,6,22,steel[1]);r(10,8,2,21,steel[2]);r(21,8,2,21,'#192d39');r(15,10,1,16,'#d0a259');r(19,10,1,16,'#dc9c39');r(27,18,3,7,steel[0]);r(28,19,1,3,'#4cdbf0');
 }else if(kind==='awning'){
  r(1,5,30,15,'#6e2928');r(1,5,30,2,'#e9b454');for(let x=2;x<31;x+=5){r(x,7,3,10,'#b34732');r(x,16,3,3,'#de7943')}r(1,21,2,10,wood[0]);r(29,21,2,10,wood[0]);r(4,20,24,2,wood[3]);
 }else if(kind==='pipe'){
  r(12,0,8,32,steel[0]);r(13,0,6,32,steel[1]);r(14,0,2,32,steel[2]);for(let y=2;y<32;y+=10){r(10,y,12,3,steel[0]);r(11,y,10,2,steel[3])}
 }else if(kind==='bed92'){
  r(2,6,28,23,steel[0]);r(3,7,26,20,'#b5c8c8');r(4,8,8,8,'#e1e5cc');r(13,8,15,17,'#6194a6');r(14,9,13,2,'#a1c8cd');r(4,27,3,4,steel[2]);r(25,27,3,4,steel[2]);
 }else if(/sign/.test(kind)){
  r(14,20,3,11,steel[0]);r(3,2,26,21,steel[0]);r(4,3,24,19,steel[2]);r(6,5,20,15,'#dc8438');r(7,6,18,13,'#7c3a26');for(let x=9;x<25;x+=4){r(x,8,2,3,'#ffd66d');r(x,13,1,3,'#ffe1a2');r(x+1,15,2,1,'#ffd66d')}
 }else{
  r(4,2,24,28,steel[0]);r(5,3,22,25,steel[1]);r(6,3,20,2,steel[3]);r(8,7,16,10,'#142f40');r(9,8,14,8,'#227692');r(10,9,3,5,'#76e8ed');r(15,10,7,1,'#9ee1db');r(15,13,5,1,'#9ee1db');for(let x=8;x<25;x+=4)r(x,20,2,2,x%3?'#b89750':'#d16645');r(7,25,18,1,steel[2]);
 }
 ctx.restore();return true;
}
pxDrawObject67=function(ctx,o,sx,sy){if(o.kind==='booth92'&&o.w===2){ctx.save();ctx.translate(sx,sy);ctx.scale(2,2);propArt93(ctx,o.kind,0,0);ctx.restore();return}if(!propArt93(ctx,o.kind,sx,sy))return oldProp93(ctx,o,sx,sy)};
drawDecor90=function(ctx,d,sx,sy){if(!propArt93(ctx,d.kind,sx,sy))return oldDecor93(ctx,d,sx,sy)};
pxDrawHumanoid67=function(ctx,sx,sy,n,player=false,facing='down'){
 ctx.fillStyle='#171b2670';ctx.fillRect(sx+3,sy+13,11,3);
 ensureArt82();let key=classifyHumanoidSprite82(n,player);
 if(!drawCharSprite82(ctx,key,facing,sx+8,sy+15,18,22,0))oldPerson93(ctx,sx,sy,n,player,facing);
 if(player){ctx.fillStyle='#f1ca6b';ctx.fillRect(sx+5,sy+16,6,.5)}
};
pxDraw67=function(){
 const cv=$('pixelCanvas67');if(!cv)return;
 if(cv.width!==768||cv.height!==512){cv.width=768;cv.height=512}
 const c=cv.getContext('2d');c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=false;c.clearRect(0,0,384,256);
 const map=pixelCurrentMap67(),p=pxPos67(),cam=pxCamera67(map,p);ART93.frameMap=map;
 for(let vy=0;vy<16;vy++)for(let vx=0;vx<24;vx++)pxDrawTile67(c,pxTile67(map,cam.x+vx,cam.y+vy),vx*16,vy*16,cam.x+vx,cam.y+vy);
 const occupied=new Set([...map.objects,...map.npcs,p].map(o=>o.x+','+o.y));
 let dec=decorativeSet90(map).filter(d=>!occupied.has(d.x+','+d.y));
 let entities=[...map.objects.map(o=>({...o,artType:'object'})),...dec.map(d=>({...d,artType:'decor'})),...map.npcs.map(n=>({...n,artType:'person'})),{...p,artType:'player'}].sort((a,b)=>(a.y+(a.h||1)-1)-(b.y+(b.h||1)-1)||Number(a.artType==='player')-Number(b.artType==='player'));
 for(let e of entities){let x=(e.x-cam.x)*16,y=(e.y-cam.y)*16;if(x<-64||y<-48||x>400||y>272)continue;if(e.artType==='object')pxDrawObject67(c,e,x,y);else if(e.artType==='decor')drawDecor90(c,e,x,y);else pxDrawHumanoid67(c,x,y,e,e.artType==='player',e.facing||'down')}
 // Small fixed falloff lights: no animation loop, blur filter, or large image allocation.
 c.save();c.globalCompositeOperation='screen';
 for(let e of entities.filter(e=>/lamp/.test(e.kind||''))){let x=(e.x-cam.x)*16+8,y=(e.y-cam.y)*16+7;if(x<0||y<0||x>384||y>256)continue;let g=c.createRadialGradient(x,y,1,x,y,16);g.addColorStop(0,'rgba(255,170,40,.28)');g.addColorStop(1,'rgba(255,140,20,0)');c.fillStyle=g;c.fillRect(x-16,y-16,32,32)}c.restore();
 c.font='6px monospace';c.textBaseline='bottom';
 map.objects.filter(o=>o.kind==='quest73'||o.kind==='district74').forEach(o=>{let x=(o.x-cam.x)*16,y=(o.y-cam.y)*16;if(x<0||y<0||x>384||y>256)return;let text=o.kind==='quest73'?'★ OBJECTIVE':o.label.toUpperCase().slice(0,18),w=c.measureText(text).width;c.fillStyle='#07111ce8';c.fillRect(x+8-w/2-2,y-5,w+4,8);c.fillStyle=o.kind==='quest73'?'#f5ce70':'#d4e6ec';c.fillText(text,x+8-w/2,y+2)});
 ART93.frameMap=null;
};
BUILD_INFO.version='93.0-reference-art-pass';
document.title='Star Wars: Sable Reach — Reference Art Pass';
const art93Header=document.querySelector('.top h1');if(art93Header)art93Header.textContent='STAR WARS: SABLE REACH · FRONTIER PIXEL ART';
const art93Intro=document.querySelector('.top p');if(art93Intro)art93Intro.textContent='Explore Sable Reach in richer 16-bit pixel art: textured frontier stone, crimson rugs, bottle racks, amber lanterns, and blue steel ship interiors.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,art93:ART93};
/* Keep late-added historical guide cards inside Guide instead of covering the game workspace. */
function tidyWorkspace93(){
 const guide=$('guide'),host=$('tabHost78');if(!guide||!host)return;
 const h=document.querySelector('.top h1');if(h)h.textContent='STAR WARS: SABLE REACH · FRONTIER PIXEL ART';
 document.querySelectorAll('.wrap > section,#tabHost78 > section:not(.tab)').forEach(section=>{if(section.id==='combat'){host.appendChild(section);return}if(!section.classList.contains('tab'))guide.appendChild(section)});
}
const previousRender93=renderAll;
renderAll=function(){let r=previousRender93();tidyWorkspace93();return r};
const previousNav93=renderNavTab;
renderNavTab=function(id){let r=previousNav93(id);tidyWorkspace93();return r};

