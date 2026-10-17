const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),run=g.run,checks=[];
 const test=(name,fn)=>{fn();checks.push(name)};
 const fresh=(species='cerean',choice)=>run(`hydrateState(Game97.freshState(),'species fixture');S.settings.autosave=false;S.species=${JSON.stringify(species)};S.speciesSkillChoice=${JSON.stringify(choice)};S.xpStart=SPECIES[S.species].xp;resetCreationPurchases();S.crew=[]`);
 const fp=()=>run('JSON.stringify({xp:[S.xpStart,S.xpSpent,S.earnedXp],skills:S.skills,chars:S.chars,ids:[...S.talents],credits:S.credits,stage:S.ep15.mainStage,force:S.forceRating})');
 const pair=['Knowledge (Lore)','Knowledge (Xenology)'];
 try{
  for(const [species,page,xp,wt,st,chars,skill]of [
   ['cerean',50,90,10,11,[2,1,3,2,2,2],'Vigilance'],
   ['lannik',164,95,9,11,[2,2,2,2,3,1],'Knowledge (Warfare)'],
   ['lannik',164,95,9,11,[2,2,2,2,3,1],'Streetwise'],
   ['gungan',117,90,10,10,[2,2,1,2,2,3],'Athletics'],
   ['keldor',143,110,9,10,[1,2,2,2,3,2],'Knowledge (Education)']
  ]){
   fresh(species,skill);
   test(species+'/'+skill+': source stats, XP and free starting rank',()=>assert.deepEqual(JSON.parse(run('JSON.stringify({page:SPECIES[S.species].verifiedPage117,xp:S.xpStart,wt:SPECIES[S.species].wt,st:SPECIES[S.species].st,chars:Object.values(SPECIES[S.species].c),rank:S.skills['+JSON.stringify(skill)+']})')),{page,xp,wt,st,chars,rank:1}));
  }
  fresh();
  test('Cerean begins pending with no extra Knowledge ranks or Force sensitivity',()=>{assert.equal(run('Species117.pending()'),true);assert.equal(run('S.forceRating'),0);assert.deepEqual(JSON.parse(run('JSON.stringify(S.skills)')),{Vigilance:1});assert.equal(run('skillCost("Knowledge (Lore)")'),10)});
  test('Legacy creation cannot finalize without the two required choices',()=>{run('S.freeCareer=CAREERS[S.career].skills.slice(0,4);S.freeSpec=CAREERS[S.career].specs[S.spec].slice(0,2);finalize()');assert.equal(run('S.finalized'),false);assert.equal(run('activeTabId78()'),'career')});
  test('Duplicate and non-Knowledge live choices do nothing',()=>{const before=fp();assert.equal(run('Species117.choose(["Knowledge (Lore)","Knowledge (Lore)"])'),false);assert.equal(run('Species117.choose(["Knowledge (Lore)","Brawl"])'),false);assert.equal(fp(),before);assert.equal(run('S.speciesCareerSkills117'),undefined)});
  test('Two distinct choices grant career status without free ranks or XP changes',()=>{const before=fp();assert.equal(run(`Species117.choose(${JSON.stringify(pair)})`),true);assert.equal(fp(),before);assert.equal(run('skillCost("Knowledge (Lore)")'),5);assert.equal(run('skillCost("Knowledge (Xenology)")'),5);assert.equal(run('skillCost("Knowledge (Warfare)")'),10);assert.equal(run('Species117.pending()'),false)});
  test('Confirmed choices cannot be swapped to change later purchase costs',()=>{assert.equal(run('Species117.choose(["Knowledge (Warfare)","Knowledge (Education)"])'),false);assert.deepEqual(JSON.parse(run('JSON.stringify(S.speciesCareerSkills117)')),pair)});
  test('Actual skill purchase and refund use career prices without a free rank',()=>{run('buySkill("Knowledge (Lore)")');assert.equal(run('S.skills["Knowledge (Lore)"]'),1);assert.equal(run('S.xpSpent'),5);run('undoSkill("Knowledge (Lore)")');assert.equal(run('S.xpSpent'),0);assert.equal(run('S.skills["Knowledge (Lore)"]'),0)});
  test('Choices and future costs survive repeated save round trips',()=>{const before=fp();run('Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"Cerean save");Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"Cerean repeated save")');assert.equal(fp(),before);assert.deepEqual(JSON.parse(run('JSON.stringify(S.speciesCareerSkills117)')),pair);assert.equal(run('skillCost("Knowledge (Lore)")'),5)});
  fresh();
  test('A choice cannot change the refund price of an existing creation purchase',()=>{run('buySkill("Knowledge (Lore)")');const before=fp();assert.equal(run(`Species117.choose(${JSON.stringify(pair)})`),false);assert.equal(fp(),before);run('undoSkill("Knowledge (Lore)")');assert.equal(run('S.xpSpent'),0);assert.equal(run(`Species117.choose(${JSON.stringify(pair)})`),true)});
  test('Rebuilding creation clears species choices and their career status',()=>{run('$("species").value="human";selectSpecies()');assert.equal(run('S.speciesCareerSkills117'),undefined);assert.equal(run('skillCost("Knowledge (Lore)")'),10);assert.equal(run('S.xpSpent'),0)});
  fresh();run('S.finalized=true;S.earnedXp=47;S.xpSpent=35;S.credits=4321;S.skills["Knowledge (Lore)"]=2;S.chars.Brawn=4;S.ep15.mainStage=3;globalThis.oldCerean117=JSON.parse(JSON.stringify(serializableState()))');
  test('An existing finalized Cerean can choose once without repricing past skills or resetting progress',()=>{const before=fp();assert.equal(run(`Species117.choose(${JSON.stringify(pair)})`),true);assert.equal(fp(),before);assert.equal(run('skillCost("Knowledge (Lore)")'),15);assert.equal(run('S.skills["Knowledge (Lore)"]'),2)});
  test('Loading an older save without choices cannot inherit them from the current character',()=>{run('Game97.saves.apply(oldCerean117,"original Cerean save")');assert.equal(run('Species117.pending()'),true);assert.equal(run('S.speciesCareerSkills117'),undefined);assert.equal(run('S.skills["Knowledge (Lore)"]'),2);assert.equal(run('S.xpSpent'),35);assert.equal(run('S.ep15.mainStage'),3)});
  test('Legacy review offers the missing choice without requiring era setup',()=>{run('renderReview();Species117.renderReview()');assert.equal(g.window.document.querySelectorAll('#cereanReview117').length,1);assert.ok(g.window.document.querySelector('#cereanReviewChoose117'));g.window.document.querySelector('#cereanReviewChoose117').click();assert.equal(run('activeTabId78()'),'career');assert.ok(g.window.document.querySelector('#cereanConfirm117'))});
  const saved=run('JSON.parse(JSON.stringify(serializableState()))');
  for(const [name,value,species]of [['null',null],['object',{}],['string','Knowledge (Lore)'],['one skill',[pair[0]]],['three skills',[...pair,'Knowledge (Warfare)']],['duplicate',[pair[0],pair[0]]],['non-Knowledge',[pair[0],'Brawl']],['unknown',[pair[0],'Knowledge (Fake)']],['another species',pair,'human']])test('Reject '+name+' choices before mutating progress or save slots',()=>{
   const candidate={...saved,species:species||'cerean',speciesCareerSkills117:value},before=fp(),slots=JSON.stringify({...g.window.localStorage});assert.throws(()=>run(`Game97.saves.apply(${JSON.stringify(candidate)},"bad choices")`));assert.equal(fp(),before);assert.equal(JSON.stringify({...g.window.localStorage}),slots);
  });
  assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
