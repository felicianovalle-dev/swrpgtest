const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),run=g.run,checks=[];
 const check=(name,fn)=>{fn();checks.push(name)};
 try{
  const rows=[
   ['bothan','Convincing Demeanor',100,10,11,[1,2,2,3,2,2],'Deception',{},'Knowledge (Lore)',{},'Perception'],
   ['rodian','Expert Tracker',100,10,10,[2,3,2,2,2,1],'Survival',{track:true},'Survival',{},'Survival'],
   ['duros','Galaxy Mapper',100,11,10,[1,2,3,2,2,2],'Astrogation',{},'Piloting (Space)',{},'Astrogation'],
   ['jawa','Utinni!',90,8,11,[1,2,2,3,2,2],'Mechanics',{scavenge:true},'Mechanics',{},'Mechanics']
  ];
  for(const [species,talent,xp,wt,st,chars,skill,ctx,other,otherCtx,choice]of rows){
   run(`hydrateState(Game97.freshState(),'species check');S.species=${JSON.stringify(species)};S.speciesSkillChoice=${JSON.stringify(choice)};S.settings.autosave=false;S.xpStart=SPECIES[S.species].xp;resetCreationPurchases();renderAll();S.crew=[]`);
   check(species+': source stats and free skill rank',()=>{
    const r=run('({xp:S.xpStart,wt:SPECIES[S.species].wt,st:SPECIES[S.species].st,chars:Object.values(SPECIES[S.species].c),rank:S.skills['+JSON.stringify(choice)+']})');
    assert.deepEqual(JSON.parse(JSON.stringify(r)),{xp,wt,st,chars,rank:1});
   });
   const mods=(s,c,actor='pc')=>run(`talentCheckMods({id:${JSON.stringify(actor)}},${JSON.stringify(s)},${JSON.stringify({setback:3,...c})}).setback`);
   check(species+': innate talent works only for eligible PC check',()=>{assert.equal(run(`talentRank(${JSON.stringify(talent)})`),1);assert.equal(mods(skill,ctx),2);assert.equal(mods(other,otherCtx),3);assert.equal(mods(skill,ctx,'kira'),3)});
   check(species+': purchased ranks stack once without changing XP',()=>{
    run(`globalThis.speciesXp115=JSON.stringify([S.xpStart,S.xpSpent,S.earnedXp]);globalThis.speciesNode115=[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].map(spec=>[spec,treeForSpec(spec)]).flatMap(([spec,nodes])=>nodes.filter(n=>n.name===${JSON.stringify(talent)}).map(n=>({spec,id:n.id}))).find(Boolean);S.ownedSpecs=[speciesNode115.spec];S.spec=speciesNode115.spec;S.career=specializationCareer(S.spec);S.specTalents={[S.spec]:new Set([speciesNode115.id])};S.talents=S.specTalents[S.spec]`);
    assert.equal(run(`talentRank(${JSON.stringify(talent)})`),2);assert.equal(mods(skill,ctx),1);assert.equal(run('JSON.stringify([S.xpStart,S.xpSpent,S.earnedXp])===speciesXp115'),true);
   });
   check(species+': old save round trip preserves purchases, XP and rank count',()=>{
    run(`S.finalized=true;S.credits=4321;S.ep15.mainStage=3;globalThis.speciesBefore115=JSON.stringify({xp:[S.xpStart,S.xpSpent,S.earnedXp],skills:S.skills,ids:[...S.talents],credits:S.credits,stage:S.ep15.mainStage});globalThis.speciesSave115=JSON.parse(JSON.stringify(serializableState()));Game97.saves.apply(speciesSave115,'existing species save');Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),'repeat load')`);
    assert.equal(run('JSON.stringify({xp:[S.xpStart,S.xpSpent,S.earnedXp],skills:S.skills,ids:[...S.talents],credits:S.credits,stage:S.ep15.mainStage})===speciesBefore115'),true);assert.equal(run(`talentRank(${JSON.stringify(talent)})`),2);
   });
   check(species+': species change removes innate benefit without deleting purchased rank',()=>{run('S.species="human"');assert.equal(run(`talentRank(${JSON.stringify(talent)})`),1)});
  }
  check('Setback removal floors at zero',()=>{run('S.species="bothan"');assert.equal(run('talentCheckMods({id:"pc"},"Skulduggery",{setback:0}).setback'),0)});
  assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
