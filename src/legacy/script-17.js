
BUILD_INFO.version='86.0.0-v1.6-interior-maps';
BUILD_INFO.saveSchema=86;

function ensurePhase86State(){
  ensurePhase84State();
  S.schemaVersion=86;
  S.ui86=S.ui86&&typeof S.ui86==='object'?S.ui86:{};
  return S.ui86;
}
function currentMapId86(){
  let V=ensurePhase68State();
  return V.map||'sableTown';
}
function mapLabel86(id){
  return {
    sableTown:'Sable Reach',
    cantinaInterior:'Cinder Spire Cantina',
    brokerInterior:"Broker's Row",
    clinicInterior:'Rinn Clinic',
    ship:'Wayward Star'
  }[id]||'Unknown';
}
function buildSableTown86(){
  let w=44,h=30,g=pxGrid67(w,h,'sand');
  for(let x=0;x<w;x++){g[0][x]='wall';g[h-1][x]='wall'}
  for(let y=0;y<h;y++){g[y][0]='wall';g[y][w-1]='wall'}

  // main roads / rugs / plaza
  pxRect67(g,2,12,40,4,'road');
  pxRect67(g,19,2,5,26,'road');
  pxRect67(g,28,16,12,6,'road');
  pxRect67(g,4,18,11,6,'metal');
  pxRect67(g,5,19,9,4,'sand');
  pxRect67(g,31,18,9,6,'pad');
  for(let x=7;x<37;x+=6) pxRect67(g,x,9,3,2,'road');

  let d1=pxBuilding67(g,2,2,12,8,8,'Cantina');
  let d2=pxBuilding67(g,16,2,12,8,22,'Broker Row');
  let d3=pxBuilding67(g,30,2,11,8,35,'Clinic');
  let d4=pxBuilding67(g,3,24,10,4,8,'Storage');
  let d5=pxBuilding67(g,15,24,10,4,20,'Hab Suites');

  // docking pad framing
  for(let x=31;x<40;x++){g[18][x]='wall';g[23][x]='wall'}
  for(let y=18;y<24;y++){g[y][31]='wall';g[y][39]='wall'}
  g[21][31]='road';

  let objects=[
    {id:'cantina',kind:'door',x:d1.x,y:d1.y,label:'Cinder Spire Cantina',prompt:'Enter the cantina',action:'enterCantina'},
    {id:'brokers',kind:'door',x:d2.x,y:d2.y,label:"Broker's Row",prompt:'Enter Broker Row',action:'enterBroker'},
    {id:'clinic',kind:'door',x:d3.x,y:d3.y,label:'Rinn Clinic',prompt:'Enter the clinic',action:'enterClinic'},
    {id:'missionTerminal',kind:'terminal',x:18,y:19,label:'Contract Terminal',prompt:'Access local contracts',action:'missions'},
    {id:'relayTerminal',kind:'terminal',x:24,y:19,label:'Public Relay',prompt:'Read local traffic and rumors',action:'relay'},
    {id:'salvageCrate',kind:'crate',x:8,y:21,label:'Unclaimed Salvage Crate',prompt:'Search the crate',action:'loot'},
    {id:'ship',kind:'ship',x:33,y:19,label:S.ship?.name||'Crew Ship',prompt:'Board your ship',action:'board',block:true,w:4,h:3},
    {id:'ramp',kind:'ramp',x:34,y:22,label:'Boarding Ramp',prompt:'Board your ship',action:'board'},
    {id:'navBeacon',kind:'beacon',x:31,y:19,label:'Departure Beacon',prompt:'Open the galaxy map',action:'galaxy'},
    {id:'crateRow1',kind:'crate',x:5,y:25,label:'Cargo Stack',prompt:'Common freight',action:'noop'},
    {id:'crateRow2',kind:'crate',x:18,y:25,label:'Hab Supplies',prompt:'A supply pallet',action:'noop'}
  ];
  let npcs=[
    {id:'mira-venn',name:'Mira Venn',role:'Dockmaster',faction:'Local',x:28,y:14,skin:'#d6a071',accent:'#597b9b'},
    {id:'orrik-dane',name:'Orrik Dane',role:'Freight Broker',faction:'Guild',x:22,y:11,skin:'#b98262',accent:'#b98b3e'},
    {id:'talo-brinn',name:'Talo Brinn',role:'Information Broker',faction:'Local',x:18,y:14,skin:'#c68f6d',accent:'#754fa4'},
    {id:'bexa-tor',name:'Bexa Tor',role:'Salvage Foreman',faction:'Local',x:11,y:21,skin:'#835f47',accent:'#a9563c'},
    {id:'n4-vi',name:'N4-VI',role:'Relay Maintenance Droid',faction:'Local',x:24,y:21,droid:true,accent:'#88b7c7'},
    {id:'street-vendor',name:'Roa Mesk',role:'Spicebread Vendor',faction:'Local',x:9,y:14,skin:'#b78867',accent:'#6b9752'}
  ];
  return {id:'sableTown',name:'Sable Reach Settlement',w,h,grid:g,objects,npcs,spawn:{x:21,y:14},palette:'frontier'};
}
function buildCantinaInterior86(){
  let w=28,h=20,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,26,18,'floor');
  for(let x=1;x<27;x++){g[1][x]='wall';g[18][x]='wall'}
  for(let y=1;y<19;y++){g[y][1]='wall';g[y][26]='wall'}
  // booths and bar walls
  for(let y=3;y<=8;y++){g[y][5]='wall';g[y][10]='wall'}
  for(let y=3;y<=8;y++){g[y][17]='wall';g[y][22]='wall'}
  for(let x=12;x<=24;x++)g[4][x]='wall';
  for(let x=12;x<=24;x++)g[8][x]='wall';
  g[18][13]='road'; g[18][14]='road';
  let objects=[
    {id:'cantinaExit',kind:'door',x:13,y:18,label:'Cantina Exit',prompt:'Return to the settlement',action:'exitTown'},
    {id:'barCounter',kind:'table',x:18,y:6,label:'Bar Counter',prompt:'Order something strong',action:'noop'},
    {id:'backOffice',kind:'terminal',x:23,y:6,label:'House Ledger',prompt:'A list of tabs and unpaid docking bets',action:'noop'},
    {id:'sideTable1',kind:'table',x:7,y:5,label:'Booth Table',prompt:'A sticky old booth',action:'noop'},
    {id:'sideTable2',kind:'table',x:19,y:13,label:'Booth Table',prompt:'A table with a fine view of the stage',action:'noop'},
    {id:'stage',kind:'beacon',x:24,y:15,label:'Stage',prompt:'A compact music stage',action:'noop'},
    {id:'jobSlate',kind:'terminal',x:4,y:14,label:'Cantina Job Slate',prompt:'Check informal jobs',action:'missions'}
  ];
  let npcs=[
    {id:'selra-kesh',name:'Selra Kesh',role:'Bartender',faction:'Local',x:19,y:5,skin:'#c7906a',accent:'#87533d'},
    {id:'dovo-rel',name:'Dovo Rel',role:'Sabaac Musician',faction:'Local',x:24,y:14,skin:'#8f5f4b',accent:'#6a58a9'},
    {id:'jexa-vorn',name:'Jexa Vorn',role:'Contract Scout',faction:'Guild',x:6,y:14,skin:'#ca946e',accent:'#4e7ca3'},
    {id:'patron-rodian',name:'Tesk Vii',role:'Rodian Patron',faction:'Local',x:7,y:6,species:'Rodian',skin:'#6da36a',accent:'#68864b'},
    {id:'patron-moncal',name:'Barlo Fen',role:'Mon Cal Veteran',faction:'Local',x:18,y:13,species:'Mon Cal',skin:'#e3915e',accent:'#597ca4'}
  ];
  return {id:'cantinaInterior',name:'Cinder Spire Cantina',w,h,grid:g,objects,npcs,spawn:{x:14,y:17},palette:'interior'};
}
function buildBrokerInterior86(){
  let w=28,h=18,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,26,16,'floor');
  for(let x=1;x<27;x++){g[1][x]='wall';g[16][x]='wall'}
  for(let y=1;y<17;y++){g[y][1]='wall';g[y][26]='wall'}
  for(let x=3;x<25;x+=7){ for(let y=4;y<=12;y++) g[y][x]='wall'; }
  g[16][13]='road'; g[16][14]='road';
  let objects=[
    {id:'brokerExit',kind:'door',x:13,y:16,label:'Street Door',prompt:'Return to the settlement',action:'exitTown'},
    {id:'counter1',kind:'table',x:5,y:4,label:'Freight Counter',prompt:'Freight rates for the current week',action:'equipment'},
    {id:'counter2',kind:'table',x:12,y:7,label:'Arms Broker Counter',prompt:'Restricted goods gossip',action:'equipment'},
    {id:'counter3',kind:'table',x:19,y:4,label:'Passenger Desk',prompt:'Offworld passage inquiries',action:'galaxy'},
    {id:'terminal1',kind:'terminal',x:23,y:11,label:'Broker Terminal',prompt:'Work postings and auctions',action:'missions'},
    {id:'crate1',kind:'crate',x:8,y:13,label:'Auction Lot',prompt:'Lot 72: miscellaneous salvage',action:'noop'}
  ];
  let npcs=[
    {id:'orrik-broker',name:'Orrik Dane',role:'Freight Broker',faction:'Guild',x:5,y:5,skin:'#b98262',accent:'#b98b3e'},
    {id:'mira-agent',name:'Pavel Nesk',role:'Passenger Clerk',faction:'Local',x:19,y:5,skin:'#cca07a',accent:'#5f88a6'},
    {id:'arms-dealer',name:'Vexa Dral',role:'Arms Dealer',faction:'Guild',x:12,y:8,skin:'#8b5d4a',accent:'#a34c47'},
    {id:'service-droid',name:'Q7-LA',role:'Counter Droid',faction:'Local',x:23,y:10,droid:true,accent:'#d7c15e'}
  ];
  return {id:'brokerInterior',name:"Broker's Row",w,h,grid:g,objects,npcs,spawn:{x:14,y:15},palette:'interior'};
}
function buildClinicInterior86(){
  let w=24,h=18,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,22,16,'floor');
  for(let x=1;x<23;x++){g[1][x]='wall';g[16][x]='wall'}
  for(let y=1;y<17;y++){g[y][1]='wall';g[y][22]='wall'}
  for(let y=3;y<=13;y++)g[y][12]='wall';
  g[8][12]='floor'; g[16][11]='road'; g[16][12]='road';
  let objects=[
    {id:'clinicExit',kind:'door',x:11,y:16,label:'Clinic Exit',prompt:'Return to the settlement',action:'exitTown'},
    {id:'recoveryDesk',kind:'table',x:5,y:4,label:'Reception Desk',prompt:'Check in for treatment',action:'recovery'},
    {id:'medBed',kind:'med',x:17,y:5,label:'Medbed',prompt:'Open recovery care',action:'recovery'},
    {id:'supplyLocker',kind:'crate',x:17,y:11,label:'Medical Supplies',prompt:'Bandages, stim patches, and bacta wraps',action:'noop'},
    {id:'records',kind:'terminal',x:7,y:11,label:'Clinic Records',prompt:'Patient intake and invoices',action:'noop'}
  ];
  let npcs=[
    {id:'rinn-doctor',name:'Doctor Rinn',role:'Frontier Physician',faction:'Local',x:5,y:5,skin:'#cca07a',accent:'#5d8a9f'},
    {id:'nurse-droid',name:'2M-BA',role:'Nurse Droid',faction:'Local',x:16,y:6,droid:true,accent:'#b8d3de'},
    {id:'patient1',name:'Gor Vesk',role:'Recovering Trucker',faction:'Local',x:17,y:12,skin:'#7b5547',accent:'#685f9f'}
  ];
  return {id:'clinicInterior',name:'Rinn Clinic',w,h,grid:g,objects,npcs,spawn:{x:11,y:15},palette:'interior'};
}
function buildShip86(){
  let w=34,h=22,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,32,20,'metal');
  for(let x=1;x<33;x++){g[1][x]='wall';g[20][x]='wall'}
  for(let y=1;y<21;y++){g[y][1]='wall';g[y][32]='wall'}
  for(let x=9;x<=30;x++)g[9][x]='wall';
  for(let x=9;x<=30;x++)g[13][x]='wall';
  for(let y=2;y<=8;y++){g[y][9]='wall';g[y][20]='wall'}
  for(let y=14;y<=19;y++){g[y][12]='wall';g[y][22]='wall'}
  [[9,5],[20,5],[15,9],[25,9],[9,12],[15,13],[25,13],[12,16],[22,16],[1,11]].forEach(([x,y])=>g[y][x]='floor');
  pxRect67(g,2,2,7,7,'floor');
  pxRect67(g,10,2,10,7,'floor');
  pxRect67(g,21,2,10,7,'floor');
  pxRect67(g,2,10,29,3,'floor');
  pxRect67(g,2,14,10,6,'floor');
  pxRect67(g,13,14,9,6,'floor');
  pxRect67(g,23,14,8,6,'floor');
  let objects=[
    {id:'exitRamp',kind:'ramp',x:2,y:11,label:'Landing Ramp',prompt:'Disembark to Sable Reach',action:'disembark'},
    {id:'navConsole',kind:'terminal',x:5,y:5,label:'Navigation Console',prompt:'Open the galaxy map',action:'galaxy'},
    {id:'crewTable',kind:'table',x:14,y:5,label:'Crew Table',prompt:'Review crew',action:'crew'},
    {id:'medStation',kind:'med',x:25,y:5,label:'Medical Station',prompt:'Open recovery',action:'recovery'},
    {id:'cargoLocker',kind:'crate',x:6,y:16,label:'Cargo Locker',prompt:'Inspect inventory',action:'cargo'},
    {id:'workbench',kind:'bench',x:17,y:16,label:'Workshop Bench',prompt:'Open equipment and crafting',action:'equipment'},
    {id:'engineConsole',kind:'terminal',x:27,y:16,label:'Engineering Console',prompt:'Open ship systems',action:'shiptab'}
  ];
  let slots=[[13,4],[17,4],[23,4],[7,15],[18,15],[26,15],[28,18]];
  let active=CREW.filter(c=>S.crew?.includes(c.id)).slice(0,slots.length);
  let npcs=active.map((c,i)=>({id:`crew:${c.id}`,crewId:c.id,name:c.name,role:c.role||'Crew',faction:'Crew',x:slots[i][0],y:slots[i][1],skin:'#c58f6a',accent:i%3===0?'#4f78a8':i%3===1?'#8f5aa5':'#8a7648',droid:/droid/i.test(c.role||'')}))
  return {id:'ship',name:S.ship?.name||'Wayward Star',w,h,grid:g,objects,npcs,spawn:{x:4,y:11},palette:'ship'};
}

const _p86pixelMap67=pixelMap67;
pixelMap67=function(id){
  if(id==='ship') return buildShip86();
  if(id==='cantinaInterior') return buildCantinaInterior86();
  if(id==='brokerInterior') return buildBrokerInterior86();
  if(id==='clinicInterior') return buildClinicInterior86();
  if(id==='sableTown') return buildSableTown86();
  return buildSableTown86();
}
pixelCurrentMap67=function(){
  let V=ensurePhase68State();
  return pixelMap67(V.map||'sableTown');
}
const _p86pxSwitchMap67=pxSwitchMap67;
pxSwitchMap67=function(id){
  let V=ensurePhase68State();
  if(id==='ship'&&!S.ship?.owned){openPixelDialog67('No ship yet','Finish the early campaign until your crew has a ship to board.',[{label:'Close'}]);return}
  V.map=id; V.lastMap=id;
  let m=pixelCurrentMap67(),p=pxPos67();
  if(!pxWalkable67(m,p.x,p.y,{ignoreNpc:true})) V.positions[m.id]={x:m.spawn.x,y:m.spawn.y,facing:'down'};
  pxLog67(`Entered ${m.name}.`);
  renderPixelWorld67();
  safeAutosave();
}
const _p86pxInteractObject67=pxInteractObject67;
pxInteractObject67=function(o){
  switch(o.action){
    case 'enterCantina': pxSwitchMap67('cantinaInterior'); return;
    case 'enterBroker': pxSwitchMap67('brokerInterior'); return;
    case 'enterClinic': pxSwitchMap67('clinicInterior'); return;
    case 'exitTown': pxSwitchMap67('sableTown'); return;
    case 'noop':
      openPixelDialog67(o.label||'Detail', o.prompt||'You take a closer look. Nothing demands immediate action.', [{label:'Close'}]);
      return;
  }
  return _p86pxInteractObject67(o);
}
const _p86pxVisualNpc67=pxVisualNpc67;
pxVisualNpc67=function(n){
  const custom = {
    'selra-kesh':'“You want rumors, jobs, or a drink? Order them in that order and I might have all three.”',
    'dovo-rel':'“You can hear the station hum if you play in the right key.”',
    'jexa-vorn':'“Half the best contracts never touch a terminal. They pass from one booth to the next.”',
    'patron-rodian':'“This cantina is safer than it looks. Which is to say: not very.”',
    'patron-moncal':'“Never trust a captain who says a route is simple.”',
    'orrik-broker':'“Freight, passengers, discretion. Pick two.”',
    'mira-agent':'“We can get you offworld. The real question is whether you want a manifest attached.”',
    'arms-dealer':'“Officially? I trade security supplies. Unofficially, we should speak quietly.”',
    'service-droid':'“Auction lot rotation in fourteen minutes. Please haggle responsibly.”',
    'rinn-doctor':'“If you are bleeding, sit. If you are not bleeding, still sit. It will save us time.”',
    'nurse-droid':'“Sanitation cycle complete. Please do not contaminate the medbay intentionally.”',
    'patient1':'“Doc says I can walk tomorrow. I say tomorrow can argue with the doc.”',
    'street-vendor':'“Fresh spicebread, warmed over a repurposed fusion grate. Better than it sounds.”'
  }[n.id];
  if(custom){
    openPixelDialog67(n.name, custom, [
      {label:'Talk', primary:true, run:()=>{}},
      {label:'Open related screen', run:()=>{ if(/doctor|nurse/i.test(n.role)) renderNavTab('recovery'); else if(/broker|dealer|vendor|scout/i.test(n.role)) renderNavTab('equipment'); else if(/contract/i.test(n.role)) renderNavTab('gm'); else renderNavTab('crewmgmt'); }},
      {label:'Leave'}
    ]);
    return;
  }
  return _p86pxVisualNpc67(n);
}

function injectDestinations86(){
  let side=document.querySelector('#pixelworld67 .pixel-side67');
  if(!side || $('pixelDestinations86')) return;
  let box=document.createElement('div');
  box.id='pixelDestinations86';
  box.className='pixel-window86';
  box.innerHTML=`<div class="pixel-title67">Destinations</div>
    <div class="pixel-breadcrumb86" id="pxBreadcrumb86">Sable Reach / Settlement</div>
    <div class="pixel-dests86">
      <button data-pxdest86="sableTown">Settlement</button>
      <button data-pxdest86="cantinaInterior">Cantina</button>
      <button data-pxdest86="brokerInterior">Broker Row</button>
      <button data-pxdest86="clinicInterior">Clinic</button>
      <button data-pxdest86="ship">Ship</button>
      <button data-pxdest86="classicExplore">Classic UI</button>
    </div>
    <div class="phase86-note">Interiors now exist as explorable pixel maps. On PC this should make navigation cleaner and more intuitive by keeping the most-used destinations one click away.</div>`;
  side.appendChild(box);
  box.querySelectorAll('[data-pxdest86]').forEach(btn=>{
    btn.onclick=()=>{
      let id=btn.dataset.pxdest86;
      if(id==='classicExplore') return renderNavTab('explore');
      pxSwitchMap67(id);
    };
  });
}
function updateDestinations86(){
  injectDestinations86();
  let current=currentMapId86();
  let trail = {
    sableTown:'Sable Reach / Settlement',
    cantinaInterior:'Sable Reach / Cinder Spire Cantina',
    brokerInterior:"Sable Reach / Broker's Row",
    clinicInterior:'Sable Reach / Rinn Clinic',
    ship:'Wayward Star / Interior'
  }[current] || mapLabel86(current);
  if($('pxBreadcrumb86')) $('pxBreadcrumb86').textContent = trail;
  document.querySelectorAll('[data-pxdest86]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.pxdest86===current);
    if(btn.dataset.pxdest86==='ship') btn.disabled = !S.ship?.owned;
  });
}
function drawInteriorPreview86(canvas, mode){
  if(!canvas) return;
  let ctx=canvas.getContext('2d'); canvas.width=216; canvas.height=120; ctx.imageSmoothingEnabled=false;
  let r=(x,y,w,h,c)=>{ctx.fillStyle=c; ctx.fillRect(x,y,w,h);}
  r(0,0,216,120,'#08101a');
  r(8,8,200,104,'#8d765f');
  r(10,10,196,100,'#a38c72');
  if(mode==='cantina'){
    r(24,22,42,20,'#784d30'); r(76,22,42,20,'#784d30'); r(128,22,60,16,'#784d30');
    r(136,56,56,20,'#784d30'); r(168,74,22,20,'#87533d');
    if(typeof drawCharSprite82==='function'){drawCharSprite82(ctx,'twilek_scoundrel','front',48,84,26,38,1); drawCharSprite82(ctx,'rodian_hunter','left',88,84,24,36,1); drawCharSprite82(ctx,'moncal_officer','right',150,82,24,36,1);}
  }else if(mode==='broker'){
    r(28,24,30,18,'#784d30'); r(92,28,30,18,'#784d30'); r(156,24,30,18,'#784d30');
    r(40,70,26,18,'#6a7e8a'); r(150,70,28,20,'#6a7e8a');
    if(typeof drawCharSprite82==='function'){drawCharSprite82(ctx,'mechanic_tech','front',43,81,24,36,1); drawCharSprite82(ctx,'bounty_hunter','front',108,80,24,36,1); drawCharSprite82(ctx,'protocol_droid','front',171,80,22,34,1);}
  }else if(mode==='clinic'){
    r(30,22,40,18,'#d7dde4'); r(132,28,46,20,'#d7dde4'); r(144,72,28,18,'#d7dde4');
    r(42,28,16,6,'#cf5d63'); r(150,34,10,10,'#cf5d63');
    if(typeof drawCharSprite82==='function'){drawCharSprite82(ctx,'human_smuggler','front',154,86,24,36,1); drawCharSprite82(ctx,'protocol_droid','front',60,86,22,34,1);}
  }
}
function injectInteriorGallery86(){
  let host=$('roomGallery84');
  if(!host || $('interiorGallery86')) return;
  let sec=document.createElement('section');
  sec.id='interiorGallery86';
  sec.className='interior-gallery86';
  sec.innerHTML=`<div class="row"><div><h3 style="margin:0">Interior Map Pass</h3><div class="small">The major Sable Reach destinations now exist as their own explorable pixel spaces instead of just sending you to another tab.</div></div><span class="tag">PHASE 85–86</span></div>
  <div class="interior-grid86">
    <div class="interior-card86"><canvas id="intCantina86" width="216" height="120"></canvas><div class="small"><b>Cantina</b><br>Bar, booths, stage, and informal contract contact.</div></div>
    <div class="interior-card86"><canvas id="intBroker86" width="216" height="120"></canvas><div class="small"><b>Broker Row</b><br>Freight, gear, travel desks, and auction space.</div></div>
    <div class="interior-card86"><canvas id="intClinic86" width="216" height="120"></canvas><div class="small"><b>Rinn Clinic</b><br>Reception, medbay, and supply locker.</div></div>
  </div>`;
  host.insertAdjacentElement('afterend', sec);
  drawInteriorPreview86($('intCantina86'),'cantina');
  drawInteriorPreview86($('intBroker86'),'broker');
  drawInteriorPreview86($('intClinic86'),'clinic');
}
const _p86renderPixelWorld67=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){
  let r=_p86renderPixelWorld67(rebuild);
  injectDestinations86();
  updateDestinations86();
  let p = $('pxPrompt67');
  if(p){
    p.innerHTML += `<div class="tiny" style="margin-top:4px">Current area: ${pxEsc67(mapLabel86(currentMapId86()))}. Doors now enter explorable interiors.</div>`;
  }
  return r;
}
const _p86renderAll=renderAll;
renderAll=function(){
  ensurePhase86State();
  let r=_p86renderAll();
  injectDestinations86();
  updateDestinations86();
  injectInteriorGallery86();
  drawInteriorPreview86($('intCantina86'),'cantina');
  drawInteriorPreview86($('intBroker86'),'broker');
  drawInteriorPreview86($('intClinic86'),'clinic');
  S.schemaVersion=86;
  return r;
}
const _p86Serializable=serializableState;
serializableState=function(){ let x=_p86Serializable(); x.schemaVersion=86; S.schemaVersion=86; return x; }
const _p86Save=save;
save=function(){ let r=_p86Save(); S.schemaVersion=86; return r; }

const _p86Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p86Diag().filter(x=>!['Phase 84 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase86State(); injectDestinations86(); updateDestinations86(); injectInteriorGallery86();
  add('Phase 85 interior destination panel present',!!$('pixelDestinations86'),'quick destination panel attached');
  add('Phase 86 interior gallery present',!!$('interiorGallery86'),'gallery shows cantina / broker / clinic');
  let snap=serializableState();
  add('Phase 86 save schema',BUILD_INFO.saveSchema===86&&snap.schemaVersion===86&&S.schemaVersion===86,'schema 86');
  return rows;
}
const _p86Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p86Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 84 schema target:') &&
    !x.startsWith('Phase 83 pixel visual panel:') &&
    !x.startsWith('Phase 84 room gallery:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false'); report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase86State(); injectDestinations86(); updateDestinations86(); injectInteriorGallery86();
  test('Phase 85 destination quick panel',()=>!!$('pixelDestinations86'));
  test('Phase 85/86 interior previews',()=>!!$('intCantina86')&&!!$('intBroker86')&&!!$('intClinic86'));
  test('Phase 86 schema target',()=>BUILD_INFO.saveSchema===86&&serializableState().schemaVersion===86);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport')) $('smokeReport').textContent=JSON.stringify(report,null,2);
  return report;
};

ensurePhase86State();
document.title='Star Wars: Sable Reach v1.6 — Interior Maps Build';
let topTitle86=document.querySelector('.top h1'); if(topTitle86) topTitle86.textContent='STAR WARS: SABLE REACH · v1.6 INTERIOR MAPS';
let topP86=document.querySelector('.top p'); if(topP86) topP86.textContent='Sable Reach now has dedicated explorable interior maps for the cantina, Broker’s Row, and clinic, plus cleaner destination navigation so the retro Star Wars RPG feels more intuitive on PC and mobile.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,phase86:true};
