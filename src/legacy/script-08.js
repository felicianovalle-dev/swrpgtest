
/* =========================================================
   PHASE 67 — PIXEL ENGINE / VISUAL EXPLORATION FOUNDATION
   PHASE 68 — SABLE REACH TOWN + EXPLORABLE SHIP INTERIOR
   ========================================================= */
BUILD_INFO.version='68.0.0-v1.3-visual-foundations';
BUILD_INFO.architecture='single-file responsive browser + installable PWA + canvas pixel-world layer';
BUILD_INFO.saveSchema=68;

const PX67={tile:16,viewW:24,viewH:16,canvasW:384,canvasH:256,cache:{},path:[],timer:null,dialog:null,lastPrompt:'',pressed:false};
const PX67_COLORS={
  sand:['#9b7448','#ad8556','#8b653f'],road:['#725b44','#80674c','#68513d'],floor:['#45515b','#51606a','#394650'],
  wall:['#26313a','#34414b','#1e282f'],roof:['#433f3a','#514942','#342f2b'],pad:['#303841','#48525d','#202831'],
  metal:['#39434d','#596671','#242c34'],grass:['#65754e','#75855a','#566641'],void:['#05070b','#0b1015','#020304']
};
function pxEsc67(s){return typeof opEsc==='function'?opEsc(String(s??'')):String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
function ensurePhase68State(){
  if(typeof ensurePhase66State==='function')ensurePhase66State();
  S.schemaVersion=68;
  S.visual67=S.visual67&&typeof S.visual67==='object'?S.visual67:{};
  let V=S.visual67;
  V.map=V.map||'sableTown';
  V.positions=V.positions&&typeof V.positions==='object'?V.positions:{};
  V.positions.sableTown=V.positions.sableTown||{x:20,y:12,facing:'down'};
  V.positions.ship=V.positions.ship||{x:4,y:10,facing:'right'};
  V.visited=V.visited&&typeof V.visited==='object'?V.visited:{};
  V.flags=V.flags&&typeof V.flags==='object'?V.flags:{};
  V.loot=V.loot&&typeof V.loot==='object'?V.loot:{};
  V.log=Array.isArray(V.log)?V.log:[];
  V.lastMap=V.lastMap||V.map;
  return V;
}
function pxLog67(msg){let V=ensurePhase68State();V.log.unshift(`Day ${S.world?.day||1}: ${msg}`);V.log=V.log.slice(0,20)}
function pxGrid67(w,h,fill='sand'){return Array.from({length:h},()=>Array(w).fill(fill))}
function pxRect67(g,x,y,w,h,t){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)if(g[yy]&&g[yy][xx]!==undefined)g[yy][xx]=t}
function pxBuilding67(g,x,y,w,h,doorX,label){
  pxRect67(g,x,y,w,h,'roof');
  for(let xx=x;xx<x+w;xx++){g[y][xx]='wall';g[y+h-1][xx]='wall'}
  for(let yy=y;yy<y+h;yy++){g[yy][x]='wall';g[yy][x+w-1]='wall'}
  g[y+h-1][doorX]='road';
  return {x:doorX,y:y+h-1,label};
}
function buildSableTown67(){
  let w=42,h=28,g=pxGrid67(w,h,'sand');
  for(let x=0;x<w;x++){g[0][x]='wall';g[h-1][x]='wall'}
  for(let y=0;y<h;y++){g[y][0]='wall';g[y][w-1]='wall'}
  pxRect67(g,1,11,40,4,'road'); pxRect67(g,16,1,5,26,'road'); pxRect67(g,28,11,13,4,'road');
  let d1=pxBuilding67(g,2,2,11,8,7,'Cantina');
  let d2=pxBuilding67(g,16,2,11,8,21,'Broker Row');
  let d3=pxBuilding67(g,30,2,10,8,34,'Clinic');
  pxRect67(g,2,17,12,8,'metal'); pxRect67(g,3,18,10,6,'sand');
  for(let x=2;x<14;x++){g[17][x]='wall';g[24][x]='wall'};for(let y=17;y<25;y++){g[y][2]='wall';g[y][13]='wall'};g[20][13]='road';
  pxRect67(g,29,16,11,9,'pad');
  for(let x=29;x<40;x++){g[16][x]='wall';g[24][x]='wall'};for(let y=16;y<25;y++){g[y][29]='wall';g[y][39]='wall'};g[20][29]='road';
  for(let y=18;y<=22;y++)for(let x=32;x<=37;x++)g[y][x]='metal';
  let objects=[
    {id:'cantina',kind:'door',x:d1.x,y:d1.y,label:'Cinder Spire Cantina',prompt:'Enter the cantina',action:'cantina'},
    {id:'brokers',kind:'door',x:d2.x,y:d2.y,label:"Broker's Row",prompt:'Browse contracts and market stalls',action:'market'},
    {id:'clinic',kind:'door',x:d3.x,y:d3.y,label:'Rinn Clinic',prompt:'Enter the clinic',action:'clinic'},
    {id:'missionTerminal',kind:'terminal',x:18,y:18,label:'Contract Terminal',prompt:'Access local contracts',action:'missions'},
    {id:'relayTerminal',kind:'terminal',x:23,y:18,label:'Public Relay',prompt:'Read local traffic and rumors',action:'relay'},
    {id:'salvageCrate',kind:'crate',x:8,y:21,label:'Unclaimed Salvage Crate',prompt:'Search the crate',action:'loot'},
    {id:'ship',kind:'ship',x:34,y:19,label:S.ship?.name||'Crew Ship',prompt:'Board your ship',action:'board',block:true,w:4,h:3},
    {id:'ramp',kind:'ramp',x:34,y:23,label:'Boarding Ramp',prompt:'Board your ship',action:'board'},
    {id:'navBeacon',kind:'beacon',x:31,y:18,label:'Departure Beacon',prompt:'Open the galaxy map',action:'galaxy'}
  ];
  let npcs=[
    {id:'mira-venn',name:'Mira Venn',role:'Dockmaster',faction:'Local',x:27,y:13,skin:'#d6a071',accent:'#597b9b'},
    {id:'orrik-dane',name:'Orrik Dane',role:'Freight Broker',faction:'Guild',x:21,y:11,skin:'#b98262',accent:'#b98b3e'},
    {id:'talo-brinn',name:'Talo Brinn',role:'Information Broker',faction:'Local',x:17,y:13,skin:'#c68f6d',accent:'#754fa4'},
    {id:'bexa-tor',name:'Bexa Tor',role:'Salvage Foreman',faction:'Local',x:11,y:20,skin:'#835f47',accent:'#a9563c'},
    {id:'n4-vi',name:'N4-VI',role:'Relay Maintenance Droid',faction:'Local',x:23,y:20,droid:true,accent:'#88b7c7'}
  ];
  return {id:'sableTown',name:'Sable Reach Settlement',w,h,grid:g,objects,npcs,spawn:{x:20,y:12},palette:'frontier'};
}
function buildShip67(){
  let w=32,h=20,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,30,18,'metal');
  for(let x=1;x<31;x++){g[1][x]='wall';g[18][x]='wall'}
  for(let y=1;y<19;y++){g[y][1]='wall';g[y][30]='wall'}
  // Room dividers
  for(let x=8;x<=28;x++)g[8][x]='wall';
  for(let x=8;x<=28;x++)g[11][x]='wall';
  for(let y=2;y<=7;y++){g[y][8]='wall';g[y][18]='wall';}
  for(let y=12;y<=17;y++){g[y][11]='wall';g[y][21]='wall';}
  // Door gaps
  [[8,5],[18,5],[13,8],[23,8],[8,10],[13,11],[23,11],[11,14],[21,14],[1,10]].forEach(([x,y])=>g[y][x]='floor');
  pxRect67(g,2,2,6,6,'floor');   // cockpit
  pxRect67(g,9,2,9,6,'floor');   // bunks
  pxRect67(g,19,2,10,6,'floor'); // med / lounge
  pxRect67(g,2,9,27,2,'floor');  // corridor
  pxRect67(g,2,12,9,6,'floor');  // cargo
  pxRect67(g,12,12,9,6,'floor'); // workshop
  pxRect67(g,22,12,7,6,'floor'); // engineering
  let objects=[
    {id:'exitRamp',kind:'ramp',x:2,y:10,label:'Landing Ramp',prompt:'Disembark to Sable Reach',action:'disembark'},
    {id:'navConsole',kind:'terminal',x:5,y:4,label:'Navigation Console',prompt:'Open the galaxy map',action:'galaxy'},
    {id:'crewTable',kind:'table',x:13,y:5,label:'Crew Table',prompt:'Review crew and companion life',action:'crew'},
    {id:'medStation',kind:'med',x:24,y:5,label:'Medical Station',prompt:'Open Recovery',action:'recovery'},
    {id:'cargoLocker',kind:'crate',x:6,y:15,label:'Cargo Locker',prompt:'Inspect field inventory',action:'cargo'},
    {id:'workbench',kind:'bench',x:16,y:15,label:'Workshop Bench',prompt:'Open equipment and crafting',action:'equipment'},
    {id:'engineConsole',kind:'terminal',x:25,y:15,label:'Engineering Console',prompt:'Open detailed ship systems',action:'shiptab'}
  ];
  let slots=[[11,4],[15,4],[21,4],[7,14],[18,14],[25,13],[26,16]];
  let active=CREW.filter(c=>S.crew?.includes(c.id)).slice(0,slots.length);
  let npcs=active.map((c,i)=>({id:`crew:${c.id}`,crewId:c.id,name:c.name,role:c.role||'Crew',faction:'Crew',x:slots[i][0],y:slots[i][1],skin:'#c58f6a',accent:i%3===0?'#4f78a8':i%3===1?'#8f5aa5':'#8a7648',droid:/droid/i.test(c.role||'')}));
  return {id:'ship',name:S.ship?.name||'Crew Ship',w,h,grid:g,objects,npcs,spawn:{x:4,y:10},palette:'ship'};
}
function pixelMap67(id){
  if(id==='ship')return buildShip67();
  return buildSableTown67();
}
function pixelCurrentMap67(){let V=ensurePhase68State();if(V.map==='ship')return pixelMap67('ship');return pixelMap67('sableTown')}
function pxPos67(){let V=ensurePhase68State(),m=pixelCurrentMap67();return V.positions[m.id]||(V.positions[m.id]={x:m.spawn.x,y:m.spawn.y,facing:'down'})}
function pxTile67(map,x,y){return map.grid[y]?.[x]??'void'}
function pxObjectAt67(map,x,y){return map.objects.find(o=>o.x===x&&o.y===y)}
function pxNpcAt67(map,x,y){return map.npcs.find(n=>n.x===x&&n.y===y)}
function pxBlockedByBigObject67(map,x,y){
  return map.objects.some(o=>o.block&&x>=o.x&&x<o.x+(o.w||1)&&y>=o.y&&y<o.y+(o.h||1));
}
function pxWalkable67(map,x,y,{ignoreNpc=false}={}){
  if(x<0||y<0||x>=map.w||y>=map.h)return false;
  if(['wall','roof','void'].includes(pxTile67(map,x,y)))return false;
  if(pxBlockedByBigObject67(map,x,y))return false;
  if(!ignoreNpc&&pxNpcAt67(map,x,y))return false;
  return true;
}
function pxNeighbors67(map,x,y){
  return [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>({x:x+dx,y:y+dy})).filter(p=>pxWalkable67(map,p.x,p.y));
}
function pxFindPath67(map,start,target,adjacent=false){
  let goals=[];
  if(adjacent){goals=pxNeighbors67(map,target.x,target.y)}
  else if(pxWalkable67(map,target.x,target.y,{ignoreNpc:true}))goals=[target];
  if(!goals.length)return[];
  let goalSet=new Set(goals.map(p=>`${p.x},${p.y}`)),q=[start],seen=new Set([`${start.x},${start.y}`]),prev=new Map(),found=null;
  while(q.length){
    let a=q.shift(),k=`${a.x},${a.y}`;if(goalSet.has(k)){found=a;break}
    for(let n of pxNeighbors67(map,a.x,a.y)){let nk=`${n.x},${n.y}`;if(seen.has(nk))continue;seen.add(nk);prev.set(nk,k);q.push(n)}
  }
  if(!found)return[];
  let out=[],k=`${found.x},${found.y}`,startK=`${start.x},${start.y}`;
  while(k!==startK){let [x,y]=k.split(',').map(Number);out.push({x,y});k=prev.get(k);if(!k)return[]}
  return out.reverse();
}
function pxFacing67(dx,dy){return Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up')}
function pxMove67(dx,dy,saveAtEnd=true){
  if(!$('pixelworld67')||$('pixelworld67').classList.contains('hidden'))return false;
  closePixelDialog67(false);let map=pixelCurrentMap67(),p=pxPos67(),nx=p.x+dx,ny=p.y+dy;p.facing=pxFacing67(dx,dy);
  if(pxWalkable67(map,nx,ny)){p.x=nx;p.y=ny;ensurePhase68State().visited[`${map.id}:${nx},${ny}`]=true;renderPixelWorld67(false);if(saveAtEnd)safeAutosave();return true}
  renderPixelWorld67(false);return false
}
function pxStopPath67(){if(PX67.timer){clearInterval(PX67.timer);PX67.timer=null}PX67.path=[]}
function pxAutoPath67(path,onDone){
  pxStopPath67();PX67.path=path.slice();
  if(!PX67.path.length){onDone?.();return}
  PX67.timer=setInterval(()=>{let p=pxPos67(),n=PX67.path.shift();if(!n){pxStopPath67();onDone?.();safeAutosave();return}let dx=n.x-p.x,dy=n.y-p.y;if(Math.abs(dx)+Math.abs(dy)!==1||!pxMove67(dx,dy,false)){pxStopPath67();return}if(!PX67.path.length){pxStopPath67();onDone?.();safeAutosave()}},90)
}
function pxTargetEntity67(map,x,y){return pxNpcAt67(map,x,y)||pxObjectAt67(map,x,y)}
function pxInteractNearby67(){
  let map=pixelCurrentMap67(),p=pxPos67(),vec={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[p.facing]||[0,1];
  let options=[[p.x,p.y],[p.x+vec[0],p.y+vec[1]],...[...Array(4)].map((_,i)=>[[1,0],[-1,0],[0,1],[0,-1]][i]).map(([dx,dy])=>[p.x+dx,p.y+dy])];
  for(let [x,y] of options){let e=pxTargetEntity67(map,x,y);if(e){pxInteractEntity67(e);return}}
  openPixelDialog67('Nothing here','There is nothing close enough to interact with.',[{label:'Close'}])
}
function pxTap67(ev){
  if(PX67.dialog)return;
  let canvas=$('pixelCanvas67');if(!canvas)return;let r=canvas.getBoundingClientRect(),sx=PX67.canvasW/r.width,sy=PX67.canvasH/r.height;
  let px=(ev.clientX-r.left)*sx,py=(ev.clientY-r.top)*sy,map=pixelCurrentMap67(),p=pxPos67(),cam=pxCamera67(map,p);
  let tx=cam.x+Math.floor(px/PX67.tile),ty=cam.y+Math.floor(py/PX67.tile);if(tx<0||ty<0||tx>=map.w||ty>=map.h)return;
  let entity=pxTargetEntity67(map,tx,ty),adj=!!entity;
  let path=pxFindPath67(map,{x:p.x,y:p.y},{x:tx,y:ty},adj);
  if(!path.length&&entity){let dist=Math.abs(tx-p.x)+Math.abs(ty-p.y);if(dist<=1||(!entity.block&&tx===p.x&&ty===p.y))pxInteractEntity67(entity);return}
  pxAutoPath67(path,entity?()=>pxInteractEntity67(entity):null)
}
function pxCamera67(map,p){
  let x=Math.max(0,Math.min(map.w-PX67.viewW,p.x-Math.floor(PX67.viewW/2)));
  let y=Math.max(0,Math.min(map.h-PX67.viewH,p.y-Math.floor(PX67.viewH/2)));
  return{x,y}
}
function pxPixelRect67(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function pxDrawTile67(ctx,t,sx,sy,x,y){
  let c=PX67_COLORS[t]||PX67_COLORS.sand,idx=(x*13+y*7)%c.length;base=c[idx];
  pxPixelRect67(ctx,sx,sy,16,16,base);
  if(t==='sand'){ctx.fillStyle=c[(idx+1)%c.length];if((x+y)%3===0)ctx.fillRect(sx+3,sy+5,2,1);if((x*5+y)%7===0)ctx.fillRect(sx+11,sy+11,1,1)}
  if(t==='road'){ctx.fillStyle='#9a8060';if((x+y)%4===0)ctx.fillRect(sx+2,sy+12,5,1)}
  if(t==='wall'){ctx.fillStyle='#51616e';ctx.fillRect(sx,sy,16,3);ctx.fillStyle='#172129';ctx.fillRect(sx,sy+13,16,3)}
  if(t==='roof'){ctx.fillStyle='#62584c';ctx.fillRect(sx+1,sy+1,14,2);ctx.fillStyle='#272421';ctx.fillRect(sx+2,sy+13,12,2)}
  if(t==='floor'){ctx.fillStyle='#60717d';ctx.fillRect(sx,sy,16,1);ctx.fillRect(sx,sy,1,16)}
  if(t==='metal'||t==='pad'){ctx.strokeStyle='#65727d';ctx.lineWidth=1;ctx.strokeRect(sx+.5,sy+.5,15,15);if((x+y)%3===0){ctx.fillStyle='#1e252c';ctx.fillRect(sx+7,sy+7,2,2)}}
}
function pxDrawHumanoid67(ctx,sx,sy,n,player=false,facing='down'){
  let accent=player?'#d6b34b':(n.accent||'#7592aa'),skin=n.skin||'#c58f6a';
  if(n.droid){pxPixelRect67(ctx,sx+5,sy+3,6,5,accent);pxPixelRect67(ctx,sx+4,sy+8,8,6,'#8495a2');pxPixelRect67(ctx,sx+5,sy+14,2,2,'#8495a2');pxPixelRect67(ctx,sx+9,sy+14,2,2,'#8495a2');pxPixelRect67(ctx,sx+7,sy+4,1,1,'#b9f3ff');return}
  pxPixelRect67(ctx,sx+5,sy+1,6,5,skin);pxPixelRect67(ctx,sx+4,sy+6,8,6,accent);pxPixelRect67(ctx,sx+5,sy+12,3,4,'#222c35');pxPixelRect67(ctx,sx+9,sy+12,3,4,'#222c35');
  if(player){ctx.fillStyle='#f5e184';if(facing==='left')ctx.fillRect(sx+3,sy+8,2,1);else if(facing==='right')ctx.fillRect(sx+12,sy+8,2,1);else ctx.fillRect(sx+7,sy,2,1)}
}
function pxDrawObject67(ctx,o,sx,sy){
  if(o.kind==='terminal'){pxPixelRect67(ctx,sx+4,sy+3,8,10,'#1d343f');pxPixelRect67(ctx,sx+6,sy+5,4,4,'#3cd4df');pxPixelRect67(ctx,sx+7,sy+13,2,3,'#596671')}
  else if(o.kind==='crate'){pxPixelRect67(ctx,sx+2,sy+4,12,10,'#67563b');ctx.strokeStyle='#b89958';ctx.strokeRect(sx+2.5,sy+4.5,11,9);ctx.beginPath();ctx.moveTo(sx+2,sy+9);ctx.lineTo(sx+14,sy+9);ctx.stroke()}
  else if(o.kind==='door'){pxPixelRect67(ctx,sx+3,sy+1,10,15,'#253746');pxPixelRect67(ctx,sx+5,sy+4,6,7,'#476276');pxPixelRect67(ctx,sx+10,sy+8,1,1,'#ffd56b')}
  else if(o.kind==='ramp'){pxPixelRect67(ctx,sx+1,sy+5,14,7,'#697985');ctx.fillStyle='#1d252b';for(let i=0;i<4;i++)ctx.fillRect(sx+2+i*3,sy+10,2,1)}
  else if(o.kind==='beacon'){pxPixelRect67(ctx,sx+7,sy+2,2,12,'#697985');pxPixelRect67(ctx,sx+5,sy+2,6,3,'#f2a74b')}
  else if(o.kind==='table'){pxPixelRect67(ctx,sx+2,sy+6,12,6,'#5a4734');pxPixelRect67(ctx,sx+3,sy+12,2,4,'#323942');pxPixelRect67(ctx,sx+11,sy+12,2,4,'#323942')}
  else if(o.kind==='med'){pxPixelRect67(ctx,sx+2,sy+3,12,11,'#d6dadd');pxPixelRect67(ctx,sx+7,sy+5,2,7,'#b84444');pxPixelRect67(ctx,sx+4,sy+8,8,2,'#b84444')}
  else if(o.kind==='bench'){pxPixelRect67(ctx,sx+1,sy+8,14,5,'#59636d');pxPixelRect67(ctx,sx+3,sy+4,4,4,'#8d6e46');pxPixelRect67(ctx,sx+10,sy+5,2,3,'#d1a94a')}
  else if(o.kind==='ship'){ // multi-tile silhouette, anchored at top-left
    pxPixelRect67(ctx,sx-8,sy+7,64,24,'#3d4a55');pxPixelRect67(ctx,sx+8,sy,30,12,'#52616d');pxPixelRect67(ctx,sx+19,sy-5,8,9,'#83a7b8');pxPixelRect67(ctx,sx-2,sy+13,10,6,'#252d34');pxPixelRect67(ctx,sx+47,sy+13,10,6,'#252d34');
  }
}
function pxDraw67(){
  let canvas=$('pixelCanvas67');if(!canvas)return;let ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,canvas.width,canvas.height);
  let map=pixelCurrentMap67(),p=pxPos67(),cam=pxCamera67(map,p),T=PX67.tile;
  for(let vy=0;vy<PX67.viewH;vy++)for(let vx=0;vx<PX67.viewW;vx++){let x=cam.x+vx,y=cam.y+vy;pxDrawTile67(ctx,pxTile67(map,x,y),vx*T,vy*T,x,y)}
  for(let o of map.objects){let vx=o.x-cam.x,vy=o.y-cam.y;if(vx<-4||vy<-4||vx>PX67.viewW+4||vy>PX67.viewH+4)continue;pxDrawObject67(ctx,o,vx*T,vy*T)}
  for(let n of map.npcs){let vx=n.x-cam.x,vy=n.y-cam.y;if(vx<0||vy<0||vx>=PX67.viewW||vy>=PX67.viewH)continue;pxDrawHumanoid67(ctx,vx*T,vy*T,n,false,'down')}
  let vx=p.x-cam.x,vy=p.y-cam.y;pxDrawHumanoid67(ctx,vx*T,vy*T,{},true,p.facing);
  // objective marker
  let q=typeof storyNextObjective61==='function'?storyNextObjective61():null;
  if(q&&q.hub===S.world?.currentHub&&map.id==='sableTown'&&q.district){ctx.strokeStyle='#ffe36b';ctx.lineWidth=2;ctx.strokeRect((PX67.viewW-2)*T+3,3,10,10)}
}
function pxNearby67(){
  let map=pixelCurrentMap67(),p=pxPos67(),all=[...map.objects,...map.npcs],best=null,dist=99;
  for(let e of all){let d=Math.abs(e.x-p.x)+Math.abs(e.y-p.y);if(d<dist){dist=d;best=e}}
  return dist<=1?best:null;
}
function pxPrompt67(){
  let e=pxNearby67();return e?(e.prompt||`Talk to ${e.name}`):'Move with arrows/WASD or tap a destination. Face something and press Interact.';
}
function openPixelDialog67(title,text,actions=[]){
  PX67.dialog={title,text,actions};let box=$('pixelDialog67');if(!box)return;box.classList.remove('hidden');
  box.innerHTML=`<div class="pixel-speaker67">${pxEsc67(title)}</div><div class="small">${pxEsc67(text)}</div><div class="pixel-dialog-actions67">${(actions.length?actions:[{label:'Close'}]).map((a,i)=>`<button class="btn ${a.primary?'primary':''}" data-pxdlg67="${i}">${pxEsc67(a.label)}</button>`).join('')}</div>`;
  box.querySelectorAll('[data-pxdlg67]').forEach(b=>b.onclick=()=>{let a=actions[Number(b.dataset.pxdlg67)];closePixelDialog67(false);a?.run?.()});
}
function closePixelDialog67(render=true){PX67.dialog=null;$('pixelDialog67')?.classList.add('hidden');if(render)renderPixelWorld67(false)}
function pxSwitchMap67(id){
  let V=ensurePhase68State();if(id==='ship'&&!S.ship?.owned){openPixelDialog67('No ship yet','Finish the early campaign until your crew has a ship to board.',[{label:'Close'}]);return}
  V.map=id;V.lastMap=id;let m=pixelCurrentMap67(),p=pxPos67();if(!pxWalkable67(m,p.x,p.y,{ignoreNpc:true})){V.positions[m.id]={x:m.spawn.x,y:m.spawn.y,facing:'down'}}
  pxLog67(`Entered ${m.name}.`);renderPixelWorld67();safeAutosave()
}
function pxVisualNpc67(n){
  if(n.crewId){
    let meta=typeof crewMeta59==='function'?crewMeta59(n.crewId):null,approval=S.approval?.[n.crewId]||0;
    openPixelDialog67(n.name,`${n.role}. ${meta?.goal?`Current goal: ${meta.goal}`:'A member of your active crew.'} Approval ${approval}.`,[
      {label:'Talk',primary:true,run:()=>{S.crewConversation=n.crewId;renderNavTab('crewmgmt')}},
      {label:'Crew screen',run:()=>renderNavTab('crewmgmt')},
      {label:'Leave'}
    ]);return
  }
  let text={
    'mira-venn':'“Landing fees are easy. Keeping captains from blocking each other on departure is the hard part.”',
    'orrik-dane':'“Freight, passage, discreet cargo. Every problem has a price; the trick is knowing which price is real.”',
    'talo-brinn':'“You can ask a direct question. Whether you get a direct answer depends on how interesting the question is.”',
    'bexa-tor':'“If it still has a serial number, somebody thinks they own it. If it does not, somebody probably filed it off.”',
    'n4-vi':'“Relay integrity: thirty-eight percent. Local rumor integrity: considerably lower.”'
  }[n.id]||`${n.name} watches the traffic moving through the settlement.`;
  openPixelDialog67(n.name,text,[
    {label:'Ask about work',primary:true,run:()=>renderNavTab('gm')},
    {label:'Explore district',run:()=>renderNavTab('explore')},
    {label:'Leave'}
  ])
}
function pxInspectCargo67(){
  let count=Object.keys(S.world?.explore58?.inventory||{}).filter(k=>S.world.explore58.inventory[k]).length;
  openPixelDialog67('Cargo Locker',`Field inventory contains ${count} tracked key/evidence item${count===1?'':'s'}. Detailed inventory remains available in the exploration interface.`,[
    {label:'Open Explore inventory',primary:true,run:()=>renderNavTab('explore')},{label:'Close'}
  ])
}
function pxInteractObject67(o){
  switch(o.action){
    case 'board': pxSwitchMap67('ship');break;
    case 'disembark': pxSwitchMap67('sableTown');break;
    case 'galaxy': renderNavTab('galaxy');break;
    case 'missions': renderNavTab('gm');break;
    case 'market': renderNavTab('equipment');break;
    case 'clinic': renderNavTab('recovery');break;
    case 'crew': renderNavTab('crewmgmt');break;
    case 'recovery': renderNavTab('recovery');break;
    case 'equipment': renderNavTab('equipment');break;
    case 'shiptab': renderNavTab('ship');break;
    case 'cargo': pxInspectCargo67();break;
    case 'cantina':
      openPixelDialog67('Cinder Spire Cantina','Music leaks through the old pressure door. Pilots, locals, and contract hunters trade stories inside.',[
        {label:'Enter / local scene',primary:true,run:()=>{try{if(S.world?.currentHub==='sable'){S.world.explore.currentDistrict='brokers'};renderNavTab('explore')}catch(e){renderNavTab('explore')}}},
        {label:'Check contracts',run:()=>renderNavTab('gm')},{label:'Leave'}
      ]);break;
    case 'relay':
      openPixelDialog67('Public Relay',`Current objective: ${objectiveText()}. The terminal also carries local traffic and faction chatter.`,[
        {label:'Galaxy Pulse',primary:true,run:()=>renderNavTab('galaxy')},{label:'Story log',run:()=>renderNavTab('story61tab')},{label:'Close'}
      ]);break;
    case 'loot':{
      let V=ensurePhase68State();
      if(V.loot[o.id]){openPixelDialog67(o.label,'The crate has already been searched.',[{label:'Close'}]);break}
      V.loot[o.id]=true;let cr=45;S.credits+=cr;ledgerEntry(cr,'Pixel-world salvage crate');pxLog67(`Recovered ${cr} credits of saleable salvage from the yard.`);
      openPixelDialog67(o.label,`Inside: tagged couplings, a half-dead power cell, and saleable scrap worth ${cr} credits.`,[{label:'Take salvage',primary:true}]);safeAutosave();break;
    }
    default: openPixelDialog67(o.label||'Object',o.prompt||'Nothing unusual happens.',[{label:'Close'}])
  }
}
function pxInteractEntity67(e){if(e.crewId||e.role)return pxVisualNpc67(e);return pxInteractObject67(e)}
function injectPixelWorld67(){
  let nav=$('nav');if(nav&&!document.querySelector('[data-tab="pixelworld67"]')){
    let b=document.createElement('button');b.dataset.tab='pixelworld67';b.textContent='World';let exploreBtn=document.querySelector('[data-tab="explore"]');nav.insertBefore(b,exploreBtn||null);
  }
  if(!$('pixelworld67')){
    let sec=document.createElement('section');sec.id='pixelworld67';sec.className='tab card hidden';
    sec.innerHTML=`<div class="row"><div><h2 style="margin:0">Pixel World</h2><div class="small">A reusable classic-console exploration layer inspired by early top-down JRPG readability, rebuilt with original Star Wars-flavored pixel shapes.</div></div><div class="pills"><span class="pill">Phase <b>67–68</b></span><span class="pill">Tile <b>16×16</b></span><span class="pill">Schema <b>68</b></span></div></div>
      <div class="pixel-mapbar67"><button class="btn" id="pxTown67">Sable Reach</button><button class="btn" id="pxShip67">Ship Interior</button><button class="btn" id="pxClassic67">Classic Explore</button></div>
      <div class="pixel-shell67">
        <div class="pixel-stage67"><canvas id="pixelCanvas67" width="384" height="256" aria-label="Pixel exploration map" tabindex="0"></canvas><div id="pixelDialog67" class="pixel-dialog67 hidden"></div></div>
        <div class="pixel-side67">
          <div class="pixel-window67"><div class="pixel-title67" id="pxLocation67">SABLE REACH</div><div class="pixel-status67"><div class="pixel-stat67">CR <b id="pxCredits67">0</b></div><div class="pixel-stat67">XP <b id="pxXp67">0</b></div><div class="pixel-stat67">W <b id="pxWounds67">0</b></div><div class="pixel-stat67">S <b id="pxStrain67">0</b></div><div class="pixel-stat67">DAY <b id="pxDay67">1</b></div><div class="pixel-stat67">HEAT <b id="pxHeat67">0</b></div></div><div id="pxPrompt67" class="pixel-note67"></div></div>
          <div class="pixel-window67"><div class="pixel-title67">Controls</div><div class="pixel-help67" style="margin-top:6px">Tap a tile to pathfind. Tap an NPC/object to walk into interaction range. Keyboard: <kbd>WASD</kbd> / <kbd>Arrows</kbd>, then <kbd>Space</kbd> or <kbd>Enter</kbd>.</div><div class="pixel-dpad67"><button class="up" data-pxmove67="0,-1" aria-label="Move up">▲</button><button class="left" data-pxmove67="-1,0" aria-label="Move left">◀</button><button class="down" data-pxmove67="0,1" aria-label="Move down">▼</button><button class="right" data-pxmove67="1,0" aria-label="Move right">▶</button></div><button class="pixel-action67" id="pxInteract67">INTERACT</button></div>
          <div class="pixel-window67"><div class="pixel-title67">Visual Language</div><div class="pixel-legend67"><div class="pixel-key67"><span class="pixel-swatch67" style="background:#9b7448"></span>Ground</div><div class="pixel-key67"><span class="pixel-swatch67" style="background:#725b44"></span>Street</div><div class="pixel-key67"><span class="pixel-swatch67" style="background:#39434d"></span>Ship / metal</div><div class="pixel-key67"><span class="pixel-swatch67" style="background:#3cd4df"></span>Interactive tech</div></div><div class="tiny" style="margin-top:7px">Phase 67 establishes the renderer, camera, collisions, pathfinding, touch input, sprite primitives, and reusable interaction layer. Phase 68 uses it for Sable Reach and the crew ship.</div></div>
        </div>
      </div>`;
    let explore=$('explore');explore?.parentNode.insertBefore(sec,explore);
  }
  document.querySelectorAll('#nav button[data-tab]').forEach(b=>{if(!b.dataset.phase68Bound){b.dataset.phase68Bound='1';b.addEventListener('click',()=>{if(!b.disabled)renderNavTab(b.dataset.tab)})}});
  if($('pixelCanvas67')&&!$('pixelCanvas67').dataset.phase68Bound){
    $('pixelCanvas67').dataset.phase68Bound='1';$('pixelCanvas67').addEventListener('pointerdown',pxTap67);
    $('pxInteract67').onclick=pxInteractNearby67;
    document.querySelectorAll('[data-pxmove67]').forEach(b=>b.onclick=()=>{let [dx,dy]=b.dataset.pxmove67.split(',').map(Number);pxStopPath67();pxMove67(dx,dy)});
    $('pxTown67').onclick=()=>pxSwitchMap67('sableTown');$('pxShip67').onclick=()=>pxSwitchMap67('ship');$('pxClassic67').onclick=()=>renderNavTab('explore');
  }
  if($('mobileQuick65')&&!$('mobileQuick65').querySelector('[data-q65="world"]')){
    let grid=$('mobileQuick65').querySelector('.mobile-quick-grid65'),b=document.createElement('button');b.className='btn primary';b.dataset.q65='world';b.textContent='Pixel World';grid?.insertBefore(b,grid.firstChild);b.onclick=()=>mobileQuickAction65('world');
  }
  refreshMobileAllTabs52?.();
}
function renderPixelWorld67(rebuild=true){
  injectPixelWorld67();ensurePhase68State();let sec=$('pixelworld67');if(!sec)return;
  let V=S.visual67;
  let map=pixelCurrentMap67(),p=pxPos67();
  if($('pxLocation67'))$('pxLocation67').textContent=`${map.name} · ${p.x},${p.y}`;
  if($('pxCredits67'))$('pxCredits67').textContent=Number(S.credits||0).toLocaleString();
  if($('pxXp67'))$('pxXp67').textContent=S.finalized?S.earnedXp:Math.max(0,S.xpStart-S.xpSpent);
  if($('pxWounds67'))$('pxWounds67').textContent=`${S.wounds||0}/${woundThreshold()}`;
  if($('pxStrain67'))$('pxStrain67').textContent=`${S.strain||0}/${strainThreshold()}`;
  if($('pxDay67'))$('pxDay67').textContent=S.world?.day||1;
  if($('pxHeat67'))$('pxHeat67').textContent=typeof localHeat50==='function'?localHeat50():0;
  if($('pxPrompt67'))$('pxPrompt67').innerHTML=`<b>${pxEsc67(pxPrompt67())}</b><div class="tiny" style="margin-top:4px">Objective: ${pxEsc67(objectiveText())}</div>${S.world?.currentHub!=='sable'&&V.map!=='ship'?`<div class="tiny" style="margin-top:4px">Visual town maps for ${pxEsc67(hub50()?.name||S.world.currentHub)} arrive in Phase 74. The ship remains visually explorable anywhere.</div>`:''}`;
  $('pxTown67')?.classList.toggle('on',V.map==='sableTown');$('pxShip67')?.classList.toggle('on',V.map==='ship');if($('pxShip67'))$('pxShip67').disabled=!S.ship?.owned;
  pxDraw67();
}
function pxKey67(e){
  if(!$('pixelworld67')||$('pixelworld67').classList.contains('hidden'))return;
  if(['input','select','textarea','button'].includes((e.target?.tagName||'').toLowerCase()))return;
  if(PX67.dialog)return;
  let k=e.key.toLowerCase(),mv={arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1],arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0]}[k];
  if(mv){e.preventDefault();pxStopPath67();pxMove67(mv[0],mv[1]);return}
  if(k===' '||k==='enter'){e.preventDefault();pxStopPath67();pxInteractNearby67()}
}
document.addEventListener('keydown',pxKey67);

function injectPhase68Guide(){
  if(!$('guide')||$('phase68Guide'))return;let c=document.createElement('section');c.id='phase68Guide';c.className='card';c.style.marginTop='14px';
  c.innerHTML=`<div class="row"><div><b>v1.3 Visual Foundations</b><div class="small">Phases 67–68 begin the Dragon Quest / Dragon Warrior-inspired visual conversion without replacing the deeper FFG systems.</div></div><span class="tag">PIXEL WORLD</span></div><div class="grid g2" style="margin-top:9px"><div class="item"><b>Phase 67 · Pixel Engine</b><div class="small">16×16 tiles, camera, collisions, NPC/object sprites, keyboard movement, touch pathfinding, interaction prompts, and reusable map definitions.</div></div><div class="item"><b>Phase 68 · Town + Ship</b><div class="small">Sable Reach becomes the first walkable settlement and the crew ship becomes the first explorable interior/hub.</div></div></div><button class="btn primary" id="openPixelWorld68" style="margin-top:9px">Enter Pixel World</button>`;
  let build=$('buildLog')?.closest('section');(build||$('guide')).insertAdjacentElement('beforebegin',c);$('openPixelWorld68').onclick=()=>renderNavTab('pixelworld67')
}
const _p68Nav=renderNavTab;
renderNavTab=function(id){injectPixelWorld67();_p68Nav(id);if(id==='pixelworld67')renderPixelWorld67();syncMobileNav52?.()};
const _p68RenderAll=renderAll;
renderAll=function(){ensurePhase68State();_p68RenderAll();S.schemaVersion=68;injectPixelWorld67();injectPhase68Guide();if($('pixelworld67')&&!$('pixelworld67').classList.contains('hidden'))renderPixelWorld67(false)};
const _p68MobileQuick=mobileQuickAction65;
mobileQuickAction65=function(action){if(action==='world'){closeMobileQuick65();renderNavTab('pixelworld67');return}_p68MobileQuick(action)};

const _p68Serializable=serializableState;
serializableState=function(){let x=_p68Serializable();x.schemaVersion=68;S.schemaVersion=68;return x};
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Phase 68: pixel-world exploration, Sable Reach town state, and explorable ship interior. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};

RULE_AUDIT.unshift(
 {id:'pixelEngine67',name:'Phase 67 pixel exploration engine',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'Tile rendering, sprite primitives, pathfinding, collisions, touch movement, camera behavior, and visual interactions are original videogame systems. They do not replace the FFG-derived check/combat rules underneath.'},
 {id:'shipInterior68',name:'Phase 68 explorable ship hub',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'The ship interior map, room arrangement, crew placement, and visual access to existing recovery/equipment/crew/navigation systems are original presentation abstractions.'}
);
const _p68Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p68Diag().filter(x=>!['Phase 66 save schema','Phase 66 save serialization'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  injectPixelWorld67();ensurePhase68State();
  let town=pixelMap67('sableTown'),ship=pixelMap67('ship');
  add('Phase 67 reusable pixel renderer',!!$('pixelCanvas67')&&PX67.tile===16&&PX67.viewW>=12,'16×16 tile engine with 24×16 viewport');
  add('Phase 67 Sable Reach map',town.w>=40&&town.h>=24&&town.objects.length>=8&&town.npcs.length>=5,`${town.w}×${town.h} · ${town.objects.length} interactables · ${town.npcs.length} NPCs`);
  add('Phase 67 touch pathfinding',pxFindPath67(town,{x:20,y:12},{x:18,y:18},true).length>0,'BFS path resolves to an interactable adjacency tile');
  add('Phase 68 ship interior',ship.objects.some(x=>x.action==='galaxy')&&ship.objects.some(x=>x.action==='crew')&&ship.objects.some(x=>x.action==='equipment')&&ship.objects.some(x=>x.action==='recovery'),'navigation, crew, workshop, medical and cargo interactions wired');
  add('Phase 68 save schema',S.schemaVersion===68&&BUILD_INFO.saveSchema===68&&serializableState().schemaVersion===68,'schema 68');
  return rows
};
const _p68Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p68Smoke();
  report.failed=report.failed.filter(x=>!x.startsWith('Phase 66 schema target:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  injectPixelWorld67();ensurePhase68State();
  test('Phase 67 Pixel World tab exists',()=>!!$('pixelworld67')&&!!document.querySelector('[data-tab="pixelworld67"]'));
  test('Phase 67 canvas uses crisp logical resolution',()=>$('pixelCanvas67').width===PX67.canvasW*2&&$('pixelCanvas67').height===PX67.canvasH*2);
  test('Phase 67 Sable Reach renderer has NPCs and interactables',()=>{let m=pixelMap67('sableTown');return m.npcs.length>=5&&m.objects.length>=8});
  test('Phase 67 tap pathfinder can reach contract terminal',()=>pxFindPath67(pixelMap67('sableTown'),{x:20,y:12},{x:18,y:18},true).length>0);
  test('Phase 68 ship map exposes core rooms',()=>{let a=pixelMap67('ship').objects.map(x=>x.action);return ['galaxy','crew','recovery','cargo','equipment','shiptab'].every(x=>a.includes(x))});
  test('Phase 68 schema target',()=>BUILD_INFO.saveSchema===68&&serializableState().schemaVersion===68);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

ensurePhase68State();injectPixelWorld67();injectPhase68Guide();
document.title='Star Wars: Sable Reach — Phase 68 Visual Foundations';
let topTitle68=document.querySelector('.top h1');if(topTitle68)topTitle68.textContent='STAR WARS: SABLE REACH · v1.3 PREVIEW';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,pixel:()=>({map:pixelCurrentMap67(),position:pxPos67(),visual:S.visual67})};
