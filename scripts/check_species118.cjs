const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),run=g.run,checks=[];
 const test=(name,fn)=>{fn();checks.push(name)};
 const fresh=(species,choice)=>run(`hydrateState(Game97.freshState(),'species fixture');S.settings.autosave=false;S.species=${JSON.stringify(species)};S.speciesSkillChoice=${JSON.stringify(choice)};S.xpStart=SPECIES[S.species].xp;resetCreationPurchases();S.crew=[]`);
 const fp=()=>run('JSON.stringify({xp:[S.xpStart,S.xpSpent,S.earnedXp],skills:S.skills,chars:S.chars,ids:[...S.talents],credits:S.credits,stage:S.ep15.mainStage,force:S.forceRating})');
 try{
  const rows=[
   ['sluissi',261,90,10,10,[2,2,3,1,2,2],null,{Discipline:1,Mechanics:1}],
   ['weequay',312,90,10,11,[3,2,1,3,2,1],'Athletics',{Athletics:1}],
   ['weequay',312,90,10,11,[3,2,1,3,2,1],'Resilience',{Resilience:1}],
   ['wookiee',316,90,14,9,[3,2,2,2,1,2],null,{Brawl:1}],
   ['toydarian',289,90,9,12,[1,1,2,2,3,3],null,{}],
   ['trandoshan',290,85,12,9,[3,2,2,2,2,1],'Brawl',{Brawl:1}],
   ['trandoshan',290,85,12,9,[3,2,2,2,2,1],'Perception',{Perception:1}],
   ['twilek',296,100,10,11,[1,2,2,2,2,3],'Charm',{Charm:1}],
   ['twilek',296,100,10,11,[1,2,2,2,2,3],'Deception',{Deception:1}],
   ['nautolan',188,90,11,11,[3,2,2,2,1,2],null,{Athletics:1}],
   ['moncal',180,100,10,10,[2,2,3,1,2,2],null,{'Knowledge (Education)':1}]
  ];
  for(const [species,page,xp,wt,st,chars,choice,skills]of rows){
   fresh(species,choice);
   test(species+'/'+(choice||'fixed')+': guide stats and included ranks match without free Force sensitivity',()=>assert.deepEqual(JSON.parse(run('JSON.stringify({page:SPECIES[S.species].verifiedPage118,xp:S.xpStart,wt:SPECIES[S.species].wt,st:SPECIES[S.species].st,chars:Object.values(SPECIES[S.species].c),skills:S.skills,force:S.forceRating})')),{page,xp,wt,st,chars,skills,force:0}));
   test(species+'/'+(choice||'fixed')+': old progress survives repeated save loads',()=>{run('S.finalized=true;S.xpSpent=35;S.earnedXp=47;S.credits=4321;S.chars.Brawn=4;S.ep15.mainStage=3');const before=fp();run('Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"old species save");Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"repeat species save")');assert.equal(fp(),before)});
  }
  test('The saved source-review backlog contains exactly seven remaining profiles',()=>{
   assert.deepEqual(JSON.parse(run("JSON.stringify(Object.entries(SPECIES).filter(([id,s])=>id!=='human'&&!s.verifiedPage97&&!s.verifiedPage115&&!s.verifiedPage116&&!s.verifiedPage117&&!s.verifiedPage118&&!s.verifiedPage119&&!s.verifiedPage120).map(([id,s])=>s.name).sort())")),['Dantari','Dowutin','Gand','Mikkian','Miraluka','Phydolon',"Tiss'shar"].sort());
  });
  fresh('sluissi');run('S.finalized=true;S.ship.owned=true;S.ship.stations.engineer="pc";S.ship.hull=10;S.ship.strain=0;globalThis.repairRoll118=rollNarr;rollNarr=()=>({ok:true,ns:2,na:0,nt:0,tr:0,de:0});renderAll()');
  test('Sluissi includes one Solid Repairs rank without a saved purchase or XP charge',()=>{assert.equal(run('talentRank("Solid Repairs")'),1);assert.equal(run('S.talents.size'),0);assert.equal(run('S.xpSpent'),0);assert.ok(g.window.document.querySelector('#speciesTalents116').textContent.includes('Solid Repairs'))});
  test('Rendered ship hull-repair control applies the included rank on success',()=>{g.window.document.getElementById('shipRepairHull').click();assert.equal(run('S.ship.hull'),7)});
  test('Purchased Solid Repairs stacks with the innate rank exactly once',()=>{run('S.spec="Mechanic";S.career="Technician";S.ownedSpecs=["Mechanic"];S.specTalents={Mechanic:new Set(["source99-mechanic-3"])};S.talents=S.specTalents.Mechanic;S.ship.hull=10;repairShip("hull")');assert.equal(run('talentRank("Solid Repairs")'),2);assert.equal(run('S.ship.hull'),6);assert.equal(run('S.talents.size'),1)});
  test('Solid Repairs does not increase system-strain recovery',()=>{run('S.ship.strain=10;repairShip("strain")');assert.equal(run('S.ship.strain'),8)});
  test('Failed repair does not receive the species bonus',()=>{run('S.ship.hull=10;rollNarr=()=>({ok:false,ns:-1,na:0,nt:0,tr:0,de:0});repairShip("hull")');assert.equal(run('S.ship.hull'),10)});
  test('Successful repair floors remaining hull trauma at zero',()=>{run('S.ship.hull=1;rollNarr=()=>({ok:true,ns:2,na:0,nt:0,tr:0,de:0});repairShip("hull")');assert.equal(run('S.ship.hull'),0)});
  test('The PC species does not add its rank to a crew engineer',()=>{run('S.crew=["lena"];S.ship.stations.engineer="lena";S.ship.hull=10;repairShip("hull")');assert.equal(run('S.ship.hull'),8)});
  test('Combat damage control includes the rank once and retains its action limit',()=>{run('S.ship.stations.engineer="pc";S.ship.strain=0;S.ship.hull=10;startShipCombat();shipDamageControl()');assert.equal(run('S.ship.hull'),7);assert.equal(run('S.ship.combat.used.engineer'),true);run('shipDamageControl()');assert.equal(run('S.ship.hull'),7)});
  test('Saving a repaired battle does not reapply healing or duplicate ranks',()=>{run('globalThis.repairedHull118=S.ship.hull;Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"repaired ship battle")');assert.equal(run('S.ship.hull===repairedHull118'),true);assert.equal(run('S.ship.combat.used.engineer'),true);assert.equal(run('talentRank("Solid Repairs")'),2)});
  run('rollNarr=repairRoll118');assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
