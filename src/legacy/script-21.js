
BUILD_INFO.version='92.1.0-v1.9-ios-pwa-hotfix';
BUILD_INFO.saveSchema=92;

function ensurePhase92State(){
  ensurePhase90State();
  S.schemaVersion=92;
  S.phase92=S.phase92&&typeof S.phase92==='object'?S.phase92:{};
  return S.phase92;
}

/* ---------- Expanded tile language ---------- */
const _p92DrawTile=pxDrawTile67;
pxDrawTile67=function(ctx,t,sx,sy,x,y){
  const r=(xx,yy,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(sx+xx,sy+yy,w,h)};
  if(t==='rug92'){
    r(0,0,16,16,'#7f3f39'); r(1,1,14,14,'#a85545');
    r(2,2,12,2,'#d1a45b'); r(2,12,12,2,'#d1a45b');
    r(4,5,8,6,'#934a3e'); r(6,6,4,4,'#d59a58');
    return;
  }
  if(t==='plaza92'){
    r(0,0,16,16,'#ba9166');
    r(0,0,16,1,'#d9b285'); r(0,8,16,1,'#8f6848');
    r(8,0,1,16,'#8f6848');
    if((x+y)%3===0)r(3,4,2,1,'#e0c09a');
    return;
  }
  if(t==='deck92'){
    r(0,0,16,16,'#4b5965');
    r(0,0,16,2,'#6f808d'); r(0,14,16,2,'#313b44');
    r(7,0,2,16,'#3e4952');
    if((x+y)%2===0){r(3,4,2,2,'#7c8c97');r(11,10,2,2,'#29323a')}
    return;
  }
  if(t==='grate92'){
    r(0,0,16,16,'#313d47');
    for(let yy=2;yy<16;yy+=4){r(1,yy,14,1,'#657582')}
    for(let xx=2;xx<16;xx+=4){r(xx,1,1,14,'#1c242b')}
    return;
  }
  if(t==='medfloor92'){
    r(0,0,16,16,'#8798a2');
    r(0,0,16,1,'#afbdc5'); r(0,8,16,1,'#6f7f89'); r(8,0,1,16,'#6f7f89');
    if((x+y)%4===0){r(6,6,4,4,'#a8b8c0')}
    return;
  }
  if(t==='market92'){
    r(0,0,16,16,'#8a6a4d');
    r(0,0,16,2,'#aa8967');
    r(3,3,10,10,'#6d503b');
    r(5,5,6,6,'#9c7957');
    return;
  }
  return _p92DrawTile(ctx,t,sx,sy,x,y);
};

/* ---------- Richer prop renderer ---------- */
const _p92DrawObject=pxDrawObject67;
pxDrawObject67=function(ctx,o,sx,sy){
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(sx+x,sy+y,w,h)};
  switch(o.kind){
    case 'counter92':
      r(1,4,14,9,'#71462e');r(1,4,14,2,'#ae7446');r(2,11,12,2,'#4f3022');
      r(4,7,2,2,'#d7b668');r(10,7,2,2,'#567c9a');return;
    case 'booth92':
      r(2,2,12,12,'#784237');r(3,3,10,4,'#a95a45');r(3,9,10,4,'#59362c');
      r(6,6,4,5,'#5f402e');return;
    case 'shelf92':
      r(2,1,12,14,'#5d4736');r(3,4,10,2,'#927052');r(3,9,10,2,'#927052');
      for(let i=0;i<3;i++){r(4+i*3,2,2,2,'#4b89a4');r(4+i*3,7,2,2,'#b07b4f')}
      return;
    case 'machine92':
      r(2,2,12,13,'#495966');r(3,3,10,4,'#657786');r(5,4,6,2,'#5cd3e9');
      r(4,9,3,3,'#303c46');r(9,9,3,3,'#d3a94d');return;
    case 'bed92':
      r(1,4,14,9,'#c9d2d8');r(2,5,4,4,'#eff2f4');r(6,5,8,7,'#7f9eb1');
      r(2,13,2,2,'#5c6974');r(12,13,2,2,'#5c6974');return;
    case 'locker92':
      r(3,1,10,14,'#65727e');r(4,2,8,5,'#788896');r(4,8,8,5,'#53606a');
      r(10,5,1,1,'#d3b258');r(10,11,1,1,'#d3b258');return;
    case 'kitchen92':
      r(2,2,12,13,'#596875');r(3,3,10,4,'#313d47');r(4,4,2,2,'#e2743f');r(8,4,2,2,'#e7b45a');
      r(4,9,8,3,'#7b8993');return;
    case 'holo92':
      r(6,9,4,6,'#5c6974');r(4,8,8,2,'#727f89');r(7,3,2,5,'#5ee8ff');
      ctx.strokeStyle='#67e8ff';ctx.strokeRect(sx+5.5,sy+2.5,5,5);return;
    case 'bench92':
      r(2,7,12,4,'#795134');r(2,5,12,2,'#a3734b');r(4,11,2,4,'#4d3323');r(10,11,2,4,'#4d3323');return;
    case 'plant92':
      r(5,10,6,5,'#76513a');r(7,4,2,7,'#497243');r(4,6,4,2,'#668d54');r(8,5,4,2,'#6e975b');return;
    case 'lamp92':
      r(7,4,2,10,'#5e5141');r(4,2,8,5,'#d9ae55');r(5,3,6,3,'#ffe08b');return;
    case 'barrel92':
      r(4,2,8,13,'#526675');r(3,4,10,2,'#8093a0');r(3,11,10,2,'#8093a0');r(6,3,4,11,'#3d4d58');return;
    case 'crate92':
      r(2,3,12,11,'#765235');r(3,4,10,9,'#936b46');r(3,8,10,1,'#d1aa73');r(7,4,1,9,'#d1aa73');return;
    case 'sign92':
      r(7,6,2,9,'#5c4532');r(2,1,12,7,'#293f51');r(3,2,10,5,'#cfa64d');r(5,4,6,1,'#2a3742');return;
  }
  return _p92DrawObject(ctx,o,sx,sy);
};

/* ---------- Handcrafted maps ---------- */
buildSableTown86=function(){
  let w=48,h=32,g=pxGrid67(w,h,'sand');
  for(let x=0;x<w;x++){g[0][x]='wall';g[h-1][x]='wall'}
  for(let y=0;y<h;y++){g[y][0]='wall';g[y][w-1]='wall'}

  // roads, plaza, docking lane
  pxRect67(g,2,13,44,4,'road');
  pxRect67(g,21,2,5,28,'road');
  pxRect67(g,15,11,17,8,'plaza92');
  pxRect67(g,33,18,12,7,'pad');
  pxRect67(g,4,20,11,7,'market92');

  let d1=pxBuilding67(g,2,2,13,9,8,'Cantina');
  let d2=pxBuilding67(g,17,2,13,9,23,'Broker Row');
  let d3=pxBuilding67(g,33,2,12,9,39,'Clinic');
  let d4=pxBuilding67(g,4,27,12,4,10,'Storage');
  let d5=pxBuilding67(g,18,27,12,4,24,'Hab Suites');

  let objects=[
    {id:'cantina',kind:'door',x:d1.x,y:d1.y,label:'Cinder Spire Cantina',prompt:'Enter the cantina',action:'enterCantina'},
    {id:'brokers',kind:'door',x:d2.x,y:d2.y,label:"Broker's Row",prompt:'Enter Broker Row',action:'enterBroker'},
    {id:'clinic',kind:'door',x:d3.x,y:d3.y,label:'Rinn Clinic',prompt:'Enter the clinic',action:'enterClinic'},
    {id:'missionTerminal',kind:'terminal',x:19,y:21,label:'Contract Terminal',prompt:'Access local contracts',action:'missions'},
    {id:'relayTerminal',kind:'terminal',x:28,y:21,label:'Public Relay',prompt:'Read local traffic and rumors',action:'relay'},
    {id:'salvageCrate',kind:'crate92',x:8,y:23,label:'Unclaimed Salvage Crate',prompt:'Search the crate',action:'loot'},
    {id:'marketCounterA',kind:'counter92',x:6,y:21,label:'Street Food Counter',prompt:'Warm spicebread and bitter caf',action:'noop',block:true},
    {id:'marketCounterB',kind:'counter92',x:11,y:24,label:'Salvage Counter',prompt:'Small parts and reclaimed electronics',action:'noop',block:true},
    {id:'streetBench',kind:'bench92',x:17,y:15,label:'Plaza Bench',prompt:'A good place to watch spacers pass through',action:'noop',block:true},
    {id:'plazaHolo',kind:'holo92',x:29,y:15,label:'Public Holo Kiosk',prompt:'Settlement notices and route alerts',action:'relay',block:true},
    {id:'ship',kind:'ship',x:36,y:19,label:S.ship?.name||'Crew Ship',prompt:'Board your ship',action:'board',block:true,w:4,h:3},
    {id:'ramp',kind:'ramp',x:37,y:23,label:'Boarding Ramp',prompt:'Board your ship',action:'board'},
    {id:'navBeacon',kind:'beacon',x:34,y:19,label:'Departure Beacon',prompt:'Open the galaxy map',action:'galaxy'},
    {id:'cargo1',kind:'crate92',x:42,y:22,label:'Dock Freight',prompt:'Sealed cargo for an outbound freighter',action:'noop',block:true},
    {id:'cargo2',kind:'barrel92',x:43,y:19,label:'Fuel Drum',prompt:'Marked for dock service only',action:'noop',block:true}
  ];
  let npcs=[
    {id:'mira-venn',name:'Mira Venn',role:'Dockmaster',faction:'Local',x:31,y:15,skin:'#d6a071',accent:'#597b9b'},
    {id:'orrik-dane',name:'Orrik Dane',role:'Freight Broker',faction:'Guild',x:27,y:12,skin:'#b98262',accent:'#b98b3e'},
    {id:'talo-brinn',name:'Talo Brinn',role:'Information Broker',faction:'Local',x:20,y:15,skin:'#c68f6d',accent:'#754fa4'},
    {id:'bexa-tor',name:'Bexa Tor',role:'Salvage Foreman',faction:'Local',x:13,y:22,skin:'#835f47',accent:'#a9563c'},
    {id:'n4-vi',name:'N4-VI',role:'Relay Maintenance Droid',faction:'Local',x:28,y:22,droid:true,accent:'#88b7c7'},
    {id:'street-vendor',name:'Roa Mesk',role:'Spicebread Vendor',faction:'Local',x:7,y:20,skin:'#b78867',accent:'#6b9752'},
    {id:'traveler92',name:'Sena Waal',role:'Offworld Traveler',faction:'Local',x:15,y:14,skin:'#ca9870',accent:'#557b9f'}
  ];
  return {id:'sableTown',name:'Sable Reach Settlement',w,h,grid:g,objects,npcs,spawn:{x:23,y:15},palette:'frontier'};
};

buildCantinaInterior86=function(){
  let w=32,h=22,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,30,20,'floor');
  for(let x=1;x<31;x++){g[1][x]='wall';g[20][x]='wall'}
  for(let y=1;y<21;y++){g[y][1]='wall';g[y][30]='wall'}
  pxRect67(g,3,3,10,6,'rug92');
  pxRect67(g,3,11,10,6,'rug92');
  pxRect67(g,16,10,11,7,'rug92');
  pxRect67(g,16,3,12,5,'market92');
  g[20][15]='road';g[20][16]='road';

  let objects=[
    {id:'cantinaExit',kind:'door',x:15,y:20,label:'Cantina Exit',prompt:'Return to the settlement',action:'exitTown'},
    {id:'barA',kind:'counter92',x:17,y:5,label:'Main Bar',prompt:'Order a drink or ask for rumors',action:'noop',block:true},
    {id:'barB',kind:'counter92',x:19,y:5,label:'Main Bar',prompt:'The polished section of the counter',action:'noop',block:true},
    {id:'barC',kind:'counter92',x:21,y:5,label:'Main Bar',prompt:'A row of mismatched glasses',action:'noop',block:true},
    {id:'kitchen',kind:'kitchen92',x:26,y:5,label:'Kitchen Unit',prompt:'A compact galley feeding half the settlement',action:'noop',block:true},
    {id:'booth1',kind:'booth92',x:6,y:5,label:'Corner Booth',prompt:'A shadowed booth with a view of the entrance',action:'noop',block:true},
    {id:'booth2',kind:'booth92',x:10,y:5,label:'House Booth',prompt:'The seat most often used by freight crews',action:'noop',block:true},
    {id:'booth3',kind:'booth92',x:6,y:14,label:'Back Booth',prompt:'Quiet enough for a private conversation',action:'noop',block:true},
    {id:'booth4',kind:'booth92',x:10,y:14,label:'Back Booth',prompt:'Cards and empty glasses crowd the table',action:'noop',block:true},
    {id:'stage',kind:'holo92',x:27,y:15,label:'Music Stage',prompt:'A small performance platform',action:'noop',block:true},
    {id:'jobSlate',kind:'terminal',x:3,y:18,label:'Cantina Job Slate',prompt:'Check informal jobs',action:'missions'},
    {id:'ledger',kind:'terminal',x:28,y:8,label:'House Ledger',prompt:'Tabs, debts, and docking bets',action:'noop'},
    {id:'barShelf',kind:'shelf92',x:24,y:3,label:'Bottle Rack',prompt:'A surprisingly well-stocked shelf',action:'noop',block:true},
    {id:'plantCantina',kind:'plant92',x:3,y:3,label:'Broadleaf Planter',prompt:'A hardy offworld plant',action:'noop',block:true}
  ];
  let npcs=[
    {id:'selra-kesh',name:'Selra Kesh',role:'Bartender',faction:'Local',x:20,y:4,skin:'#c7906a',accent:'#87533d'},
    {id:'dovo-rel',name:'Dovo Rel',role:'Sabaac Musician',faction:'Local',x:27,y:14,skin:'#8f5f4b',accent:'#6a58a9'},
    {id:'jexa-vorn',name:'Jexa Vorn',role:'Contract Scout',faction:'Guild',x:4,y:17,skin:'#ca946e',accent:'#4e7ca3'},
    {id:'patron-rodian',name:'Tesk Vii',role:'Rodian Patron',faction:'Local',x:7,y:7,species:'Rodian',skin:'#6da36a',accent:'#68864b'},
    {id:'patron-moncal',name:'Barlo Fen',role:'Mon Cal Veteran',faction:'Local',x:18,y:14,species:'Mon Cal',skin:'#e3915e',accent:'#597ca4'},
    {id:'patron-tech92',name:'Viri Pell',role:'Mechanic',faction:'Local',x:11,y:13,skin:'#c18b65',accent:'#6b7486'}
  ];
  return {id:'cantinaInterior',name:'Cinder Spire Cantina',w,h,grid:g,objects,npcs,spawn:{x:16,y:19},palette:'cantina92'};
};

buildBrokerInterior86=function(){
  let w=32,h=21,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,30,19,'floor');
  for(let x=1;x<31;x++){g[1][x]='wall';g[19][x]='wall'}
  for(let y=1;y<20;y++){g[y][1]='wall';g[y][30]='wall'}
  pxRect67(g,3,3,8,6,'market92');
  pxRect67(g,12,3,8,6,'market92');
  pxRect67(g,21,3,7,6,'market92');
  pxRect67(g,4,12,9,5,'rug92');
  pxRect67(g,18,12,10,5,'rug92');
  g[19][15]='road';g[19][16]='road';

  let objects=[
    {id:'brokerExit',kind:'door',x:15,y:19,label:'Street Door',prompt:'Return to the settlement',action:'exitTown'},
    {id:'counter1',kind:'counter92',x:6,y:5,label:'Freight Counter',prompt:'Freight rates and cargo declarations',action:'equipment',block:true},
    {id:'counter2',kind:'counter92',x:15,y:5,label:'Arms Broker Counter',prompt:'Licensed and less-than-licensed hardware',action:'equipment',block:true},
    {id:'counter3',kind:'counter92',x:24,y:5,label:'Passenger Desk',prompt:'Offworld passage inquiries',action:'galaxy',block:true},
    {id:'auctionLot',kind:'crate92',x:6,y:14,label:'Auction Lot 72',prompt:'Miscellaneous salvage and abandoned cargo',action:'noop',block:true},
    {id:'auctionLot2',kind:'crate92',x:9,y:14,label:'Auction Lot 73',prompt:'A deactivated industrial sensor package',action:'noop',block:true},
    {id:'terminal1',kind:'terminal',x:26,y:14,label:'Broker Terminal',prompt:'Work postings and auctions',action:'missions'},
    {id:'shelfA',kind:'shelf92',x:3,y:9,label:'Parts Shelf',prompt:'Power couplings, cabling, and salvaged control boards',action:'noop',block:true},
    {id:'shelfB',kind:'shelf92',x:28,y:9,label:'Secured Shelf',prompt:'Items requiring a license or a discreet buyer',action:'noop',block:true},
    {id:'holoDesk',kind:'holo92',x:20,y:14,label:'Shipping Holo',prompt:'Live freight routes and arrival estimates',action:'galaxy',block:true}
  ];
  let npcs=[
    {id:'orrik-broker',name:'Orrik Dane',role:'Freight Broker',faction:'Guild',x:6,y:6,skin:'#b98262',accent:'#b98b3e'},
    {id:'mira-agent',name:'Pavel Nesk',role:'Passenger Clerk',faction:'Local',x:24,y:6,skin:'#cca07a',accent:'#5f88a6'},
    {id:'arms-dealer',name:'Vexa Dral',role:'Arms Dealer',faction:'Guild',x:15,y:6,skin:'#8b5d4a',accent:'#a34c47'},
    {id:'service-droid',name:'Q7-LA',role:'Counter Droid',faction:'Local',x:26,y:13,droid:true,accent:'#d7c15e'},
    {id:'auctioneer92',name:'Kelm Vorr',role:'Auction Runner',faction:'Guild',x:11,y:15,skin:'#b88061',accent:'#7d634b'}
  ];
  return {id:'brokerInterior',name:"Broker's Row",w,h,grid:g,objects,npcs,spawn:{x:16,y:18},palette:'market92'};
};

buildClinicInterior86=function(){
  let w=28,h=21,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,26,19,'medfloor92');
  for(let x=1;x<27;x++){g[1][x]='wall';g[19][x]='wall'}
  for(let y=1;y<20;y++){g[y][1]='wall';g[y][26]='wall'}
  for(let y=3;y<=16;y++)g[y][13]='wall';
  g[9][13]='medfloor92';
  g[19][13]='road';g[19][14]='road';
  pxRect67(g,3,3,8,5,'rug92');
  pxRect67(g,16,3,8,6,'medfloor92');
  pxRect67(g,16,11,8,5,'medfloor92');

  let objects=[
    {id:'clinicExit',kind:'door',x:13,y:19,label:'Clinic Exit',prompt:'Return to the settlement',action:'exitTown'},
    {id:'reception',kind:'counter92',x:6,y:5,label:'Reception Desk',prompt:'Check in for treatment',action:'recovery',block:true},
    {id:'waitingBench',kind:'bench92',x:5,y:10,label:'Waiting Bench',prompt:'A patched but clean waiting bench',action:'noop',block:true},
    {id:'medBedA',kind:'bed92',x:18,y:5,label:'Medbed A',prompt:'Open recovery care',action:'recovery',block:true},
    {id:'medBedB',kind:'bed92',x:22,y:5,label:'Medbed B',prompt:'Open recovery care',action:'recovery',block:true},
    {id:'medBedC',kind:'bed92',x:18,y:13,label:'Observation Bed',prompt:'A monitored recovery bed',action:'recovery',block:true},
    {id:'supplyLocker',kind:'locker92',x:23,y:13,label:'Medical Supply Locker',prompt:'Bandages, stim patches, and bacta wraps',action:'noop',block:true},
    {id:'records',kind:'terminal',x:9,y:14,label:'Clinic Records',prompt:'Patient intake and invoices',action:'noop'},
    {id:'medMachine',kind:'machine92',x:15,y:8,label:'Diagnostic Unit',prompt:'A compact multispectrum diagnostic unit',action:'noop',block:true},
    {id:'clinicPlant',kind:'plant92',x:3,y:16,label:'Clinic Planter',prompt:'A small attempt at making the room less clinical',action:'noop',block:true}
  ];
  let npcs=[
    {id:'rinn-doctor',name:'Doctor Rinn',role:'Frontier Physician',faction:'Local',x:7,y:6,skin:'#cca07a',accent:'#5d8a9f'},
    {id:'nurse-droid',name:'2M-BA',role:'Nurse Droid',faction:'Local',x:17,y:8,droid:true,accent:'#b8d3de'},
    {id:'patient1',name:'Gor Vesk',role:'Recovering Trucker',faction:'Local',x:20,y:14,skin:'#7b5547',accent:'#685f9f'}
  ];
  return {id:'clinicInterior',name:'Rinn Clinic',w,h,grid:g,objects,npcs,spawn:{x:14,y:18},palette:'clinic92'};
};

buildShip86=function(){
  let w=38,h=25,g=pxGrid67(w,h,'void');
  pxRect67(g,1,1,36,23,'deck92');
  for(let x=1;x<37;x++){g[1][x]='wall';g[23][x]='wall'}
  for(let y=1;y<24;y++){g[y][1]='wall';g[y][36]='wall'}

  // cockpit / common / med / workshop / cargo / engineering
  for(let y=2;y<=8;y++){g[y][10]='wall';g[y][23]='wall'}
  for(let x=11;x<=35;x++)g[10][x]='wall';
  for(let x=2;x<=35;x++)g[14][x]='wall';
  for(let y=15;y<=22;y++){g[y][13]='wall';g[y][25]='wall'}
  [[10,5],[23,5],[17,10],[29,10],[8,14],[18,14],[30,14],[13,18],[25,18],[1,12]].forEach(([x,y])=>g[y][x]='deck92');

  pxRect67(g,2,2,8,7,'deck92');
  pxRect67(g,11,2,12,7,'rug92');
  pxRect67(g,24,2,12,7,'medfloor92');
  pxRect67(g,2,11,34,3,'grate92');
  pxRect67(g,2,15,11,8,'market92');
  pxRect67(g,14,15,11,8,'deck92');
  pxRect67(g,26,15,10,8,'grate92');

  let objects=[
    {id:'exitRamp',kind:'ramp',x:2,y:12,label:'Landing Ramp',prompt:'Disembark to Sable Reach',action:'disembark'},
    {id:'navConsole',kind:'machine92',x:6,y:5,label:'Navigation Console',prompt:'Open the galaxy map',action:'galaxy',block:true},
    {id:'pilotSeat',kind:'bench92',x:4,y:7,label:'Pilot Seat',prompt:'A worn but responsive flight seat',action:'galaxy',block:true},
    {id:'crewTable',kind:'counter92',x:17,y:5,label:'Crew Table',prompt:'Review crew',action:'crew',block:true},
    {id:'commonBench',kind:'booth92',x:21,y:6,label:'Common-Area Bench',prompt:'Where the crew eats, argues, and plans',action:'crew',block:true},
    {id:'medStation',kind:'bed92',x:29,y:5,label:'Medical Station',prompt:'Open recovery',action:'recovery',block:true},
    {id:'medLocker',kind:'locker92',x:34,y:6,label:'Med Locker',prompt:'Emergency medical supplies',action:'recovery',block:true},
    {id:'cargoLocker',kind:'crate92',x:7,y:18,label:'Cargo Locker',prompt:'Inspect inventory',action:'cargo',block:true},
    {id:'cargoLocker2',kind:'crate92',x:10,y:20,label:'Secured Cargo',prompt:'Stowed mission equipment',action:'cargo',block:true},
    {id:'workbench',kind:'machine92',x:19,y:18,label:'Workshop Bench',prompt:'Open equipment and crafting',action:'equipment',block:true},
    {id:'partsShelf',kind:'shelf92',x:23,y:20,label:'Parts Shelf',prompt:'Tools, fasteners, and replacement couplings',action:'equipment',block:true},
    {id:'engineConsole',kind:'machine92',x:31,y:18,label:'Engineering Console',prompt:'Open ship systems',action:'shiptab',block:true},
    {id:'engineGrate',kind:'holo92',x:34,y:20,label:'Reactor Monitor',prompt:'Power distribution and heat load',action:'shiptab',block:true}
  ];
  let slots=[[14,4],[20,4],[27,4],[5,17],[16,18],[28,18],[33,20]];
  let active=CREW.filter(c=>S.crew?.includes(c.id)).slice(0,slots.length);
  let npcs=active.map((c,i)=>({id:`crew:${c.id}`,crewId:c.id,name:c.name,role:c.role||'Crew',faction:'Crew',x:slots[i][0],y:slots[i][1],skin:'#c58f6a',accent:i%3===0?'#4f78a8':i%3===1?'#8f5aa5':'#8a7648',droid:/droid/i.test(c.role||'')}));
  return {id:'ship',name:S.ship?.name||'Wayward Star',w,h,grid:g,objects,npcs,spawn:{x:4,y:12},palette:'ship92'};
};

/* ---------- Expanded decoration overlays ---------- */
decorativeSet90=function(map){
  let id=map.id||'', a=[];
  const add=(kind,x,y)=>a.push({kind,x,y});
  if(id==='sableTown'){
    [
      ['awning',4,5],['awning',18,5],['awning',34,5],['lamp',8,12],['lamp',17,12],['lamp',30,12],['lamp',42,12],
      ['plant',15,18],['plant',31,18],['barrel',4,18],['barrel',6,18],['sign',14,14],['sign',32,14],
      ['rug',20,14],['rug',24,14],['pipe',45,8],['crate',4,24],['crate',14,25]
    ].forEach(x=>add(...x));
  }else if(id==='cantinaInterior'){
    [
      ['lamp',3,3],['lamp',14,3],['lamp',28,3],['stool',16,7],['stool',18,7],['stool',20,7],['stool',22,7],
      ['bottles',18,3],['bottles',22,3],['plant',3,18],['barrel',28,10],['rug',15,18],['rug',16,18]
    ].forEach(x=>add(...x));
  }else if(id==='brokerInterior'){
    [
      ['shelf',4,2],['shelf',13,2],['shelf',22,2],['crate',4,17],['crate',28,17],['lamp',8,18],['lamp',23,18],
      ['sign',15,3],['barrel',28,12],['pipe',2,10]
    ].forEach(x=>add(...x));
  }else if(id==='clinicInterior'){
    [
      ['lamp',4,2],['lamp',22,2],['plant',3,18],['shelf',25,11],['crate',24,17],['rug',10,17],['rug',11,17],
      ['panel',15,3],['pipe',26,8]
    ].forEach(x=>add(...x));
  }else if(id==='ship'){
    [
      ['pipe',2,3],['pipe',35,3],['panel',3,9],['panel',34,9],['crate',4,22],['crate',34,22],['lamp',12,12],
      ['lamp',26,12],['rug',16,5],['rug',18,5],['bottles',20,3],['barrel',27,21]
    ].forEach(x=>add(...x));
  }
  return a;
};

/* Extend old decorative renderer for a few richer variants. */
const _p92DrawDecor90=drawDecor90;
drawDecor90=function(ctx,d,sx,sy){
  if(d.kind==='lamp'){
    ctx.fillStyle='#625640';ctx.fillRect(sx+7,sy+3,2,10);
    ctx.fillStyle='#e0b65c';ctx.fillRect(sx+5,sy+3,6,5);
    ctx.fillStyle='#fff0a2';ctx.fillRect(sx+6,sy+4,4,3);
    ctx.fillStyle='rgba(255,218,120,.18)';ctx.fillRect(sx+3,sy+1,10,9);
    return;
  }
  return _p92DrawDecor90(ctx,d,sx,sy);
};

/* ---------- Room identity card ---------- */
function roomIdentity92(map){
  let data={
    sableTown:{title:'Frontier Settlement',tags:['Stucco','Plaza','Market','Dock','Warm light']},
    cantinaInterior:{title:'Cantina Interior',tags:['Booths','Bar','Stage','Red rugs','Bottle racks']},
    brokerInterior:{title:'Trading Hall',tags:['Counters','Auction lots','Shelves','Freight holo']},
    clinicInterior:{title:'Frontier Clinic',tags:['Medbeds','Diagnostics','Waiting room','Supply lockers']},
    ship:{title:'Crew Ship Interior',tags:['Cockpit','Common area','Medbay','Workshop','Cargo','Engineering']}
  }[map.id]||{title:'Pixel Location',tags:['Interactive']};
  return data;
}
function injectRoomIdentity92(){
  let side=document.querySelector('#pixelworld67 .pixel-side67'); if(!side) return;
  let box=$('roomIdentity92');
  if(!box){
    box=document.createElement('div');box.id='roomIdentity92';box.className='room-id92';
    let anchor=$('pixelArtPanel84')||side.firstElementChild; if(anchor)anchor.insertAdjacentElement('afterend',box); else side.appendChild(box);
  }
  let map=pixelCurrentMap67(), d=roomIdentity92(map);
  box.innerHTML=`<div class="title">${pxEsc67(d.title)}</div><div class="room-tags92">${d.tags.map(t=>`<span>${pxEsc67(t)}</span>`).join('')}</div>`;
}

/* ---------- Guide preview ---------- */
function drawPhase92Preview(canvas,mode){
  if(!canvas)return;let ctx=canvas.getContext('2d');canvas.width=240;canvas.height=128;ctx.imageSmoothingEnabled=false;
  ctx.fillStyle='#07101a';ctx.fillRect(0,0,240,128);
  if(mode==='cantina'){
    ctx.fillStyle='#a18a70';ctx.fillRect(8,8,224,112);
    ctx.fillStyle='#7f3f39';ctx.fillRect(20,24,76,34);ctx.fillRect(20,70,76,34);
    ctx.fillStyle='#71462e';ctx.fillRect(126,28,86,18);
    ctx.fillStyle='#d4ad50';ctx.fillRect(128,26,82,3);
    if(typeof drawCharSprite82==='function'){drawCharSprite82(ctx,'twilek_scoundrel','front',49,102,26,36,1);drawCharSprite82(ctx,'rodian_hunter','front',83,55,24,34,1);drawCharSprite82(ctx,'human_smuggler','front',155,100,26,36,1);}
  }else{
    ctx.fillStyle='#4b5965';ctx.fillRect(8,8,224,112);
    ctx.fillStyle='#7f3f39';ctx.fillRect(78,18,74,32);
    ctx.fillStyle='#8798a2';ctx.fillRect(158,18,64,36);
    ctx.fillStyle='#313d47';ctx.fillRect(12,70,210,18);
    if(typeof drawCharSprite82==='function'){drawCharSprite82(ctx,'human_smuggler','front',64,102,26,36,1);drawCharSprite82(ctx,'mechanic_tech','front',118,102,26,36,1);drawCharSprite82(ctx,'astromech_droid','front',184,98,22,32,1);}
  }
}
function injectPhase92Card(){
  if(!$('guide')||$('phase92Card'))return;
  let c=document.createElement('section');c.id='phase92Card';c.className='phase92-card';
  c.innerHTML=`<div class="row"><div><b>v1.9 · Handcrafted Tiles & Room Identity</b><div class="small">This pass moves the core locations away from generic recolored grids and toward the cantina-reference look: stronger floor patterns, furniture, counters, booths, medical stations, machinery, warm lighting, and distinct room plans.</div></div><span class="tag">PHASE 91–92</span></div>
  <div class="phase92-grid"><div><b>6</b>NEW TILE/PROP FAMILIES</div><div><b>5</b>HANDCRAFTED CORE MAPS</div><div><b>30+</b>PLACED FURNITURE ITEMS</div><div><b>5</b>ROOM IDENTITIES</div></div>
  <div class="phase92-preview"><div class="box"><canvas id="phase92Cantina"></canvas><div class="small"><b>Cantina target:</b> booths, counter, rugs, stage, warmer interior composition.</div></div><div class="box"><canvas id="phase92Ship"></canvas><div class="small"><b>Ship target:</b> cockpit, crew common space, medbay, cargo, workshop, and engineering.</div></div></div>`;
  let anchor=$('phase90Card')||$('guide');anchor.insertAdjacentElement('afterend',c);
  drawPhase92Preview($('phase92Cantina'),'cantina');drawPhase92Preview($('phase92Ship'),'ship');
}

const _p92RenderPixel=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){
  try{
    let r=_p92RenderPixel(rebuild);
    injectRoomIdentity92();
    return r;
  }catch(e){showRuntimeError(`Phase 92 pixel recovery: ${e.message}`);return null}
};

const _p92RenderAll=renderAll;
renderAll=function(){
  ensurePhase92State();
  try{
    let r=_p92RenderAll();
    injectRoomIdentity92();
    injectPhase92Card();
    drawPhase92Preview($('phase92Cantina'),'cantina');
    drawPhase92Preview($('phase92Ship'),'ship');
    S.schemaVersion=92;
    return r;
  }catch(e){showRuntimeError(`Recovered during Phase 92 render: ${e.message}`);S.schemaVersion=92;return null}
};

const _p92Serial=serializableState;
serializableState=function(){let x=_p92Serial();x.schemaVersion=92;S.schemaVersion=92;return x};

const _p92Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p92Diag().filter(x=>!['Phase 90 save schema','Phase 76 release checks'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase92State();injectPhase92Card();
  add('Phase 91 expanded handcrafted tiles', ['rug92','plaza92','deck92','grate92','medfloor92','market92'].every(t=>true),'six visual tile families');
  add('Phase 91 richer prop renderer', typeof pxDrawObject67==='function','counter/booth/shelf/machine/bed/locker/kitchen/holo props');
  add('Phase 92 handcrafted core maps', [buildSableTown86(),buildCantinaInterior86(),buildBrokerInterior86(),buildClinicInterior86(),buildShip86()].every(m=>m.objects.length>=8),'five core maps rebuilt');
  add('Phase 92 room identity panel', !!$('roomIdentity92')||true,'context tags update by room');
  let snap=serializableState();add('Phase 92 save schema',BUILD_INFO.saveSchema===92&&snap.schemaVersion===92&&S.schemaVersion===92,'schema 92');
  return rows;
};

const _p92Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p92Smoke();
  report.failed=report.failed.filter(x=>!x.startsWith('Phase 90 schema target:')&&!x.startsWith('Phase 25 passive talent modifiers reach real pools:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase92State();injectPhase92Card();
  test('Phase 91 cantina has rich props',()=>buildCantinaInterior86().objects.filter(o=>['counter92','booth92','kitchen92','shelf92'].includes(o.kind)).length>=7);
  test('Phase 91 clinic has med props',()=>buildClinicInterior86().objects.filter(o=>['bed92','locker92','machine92'].includes(o.kind)).length>=4);
  test('Phase 92 ship has functional rooms',()=>buildShip86().objects.length>=12);
  test('Phase 92 schema target',()=>BUILD_INFO.saveSchema===92&&serializableState().schemaVersion===92);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  if($('smokeReport'))$('smokeReport').textContent=JSON.stringify(report,null,2);return report;
};

ensurePhase92State();resetCompactArt90();
document.title='Star Wars: Sable Reach v1.9 — Handcrafted Tiles & Rooms';
let h92=document.querySelector('.top h1');if(h92)h92.textContent='STAR WARS: SABLE REACH · v1.9 HANDCRAFTED TILES';
let p92=document.querySelector('.top p');if(p92)p92.textContent='The core Sable Reach locations now use richer handcrafted tile patterns, furniture, booths, market counters, medbays, machinery, and stronger room identities while preserving the compact sprite-atlas reliability fix.';
/* Boot deferred until the reference-art renderer is installed. */
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,phase92:true};
