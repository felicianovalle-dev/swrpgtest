const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),run=g.run,checks=[];
 const test=(name,fn)=>{fn();checks.push(name)};
 const fresh=(species,choice)=>run(`hydrateState(Game97.freshState(),'species review check');S.settings.autosave=false;S.species=${JSON.stringify(species)};S.speciesSkillChoice=${JSON.stringify(choice)};S.xpStart=SPECIES[S.species].xp;resetCreationPurchases();S.crew=[]`);
 const fingerprint=()=>run('JSON.stringify({credits:S.credits,xp:[S.xpStart,S.xpSpent,S.earnedXp],chars:S.chars,skills:S.skills,ids:[...S.talents],stage:S.ep15.mainStage,force:S.forceRating})');
 try{
  // Golden values transcribed from the supplied 358-page guide copy, not read from the new catalog.
  for(const [species,page,wt,st,chars,skill]of [
   ['chiss',60,10,10,[2,2,3,2,2,1],'Cool'],
   ['mirialan',179,10,11,[2,3,2,1,2,2],'Discipline'],
   ['pantoran',207,10,10,[2,2,2,1,2,3],'Cool'],
   ['pantoran',207,10,10,[2,2,2,1,2,3],'Negotiation'],
   ['sullustan',267,9,10,[1,3,2,2,2,2],'Astrogation']
  ]){
   fresh(species,skill);
   test(species+'/'+skill+': source stats, XP, starting rank and no free Force sensitivity',()=>{
    const result=run('({page:SPECIES[S.species].verifiedPage116,wt:SPECIES[S.species].wt,st:SPECIES[S.species].st,chars:Object.values(SPECIES[S.species].c),xp:S.xpStart,rank:S.skills['+JSON.stringify(skill)+'],force:S.forceRating})');
    assert.deepEqual(JSON.parse(JSON.stringify(result)),{page,wt,st,chars,xp:100,rank:1,force:0});
   });
   test(species+'/'+skill+': existing campaign preserves spending, skills, story and stats across repeated loads',()=>{
    run('S.finalized=true;S.earnedXp=47;S.xpSpent=35;S.credits=4321;S.chars.Brawn=4;S.ep15.mainStage=3');const before=fingerprint();
    run('Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"older character");Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"repeated load")');assert.equal(fingerprint(),before);
   });
  }
  fresh('sullustan','Astrogation');
  for(const skill of ['Piloting (Planetary)','Piloting (Space)'])test('Sullustan: '+skill+' removes exactly one Setback for the PC',()=>{
   assert.equal(run(`talentCheckMods({id:'pc'},${JSON.stringify(skill)},{setback:3}).setback`),2);
   assert.equal(run(`talentCheckMods({id:'kira'},${JSON.stringify(skill)},{setback:3}).setback`),3);
  });
  test('Sullustan: no unrelated skill bonus and no negative Setback',()=>{assert.equal(run('talentCheckMods({id:"pc"},"Astrogation",{setback:3}).setback'),3);assert.equal(run('talentCheckMods({id:"pc"},"Piloting (Space)",{setback:0}).setback'),0)});
  test('Sullustan: ship pool removes the innate rank from a controlled negative-handling fixture',()=>{
   run('S.ship.model="lambda";S.ship.upgrades=[];globalThis.handling116=SHIP_MODELS.lambda.handling;SHIP_MODELS.lambda.handling=-2');const human=run('S.species="human";shipSkillPool(actorById("pc"),"Piloting (Space)").p.setback');
   assert.ok(human>0);assert.equal(run('S.species="sullustan";shipSkillPool(actorById("pc"),"Piloting (Space)").p.setback'),Math.max(0,human-1));run("SHIP_MODELS.lambda.handling=handling116");
  });
  test('Purchased Skilled Jockey stacks with the innate rank without adding another saved purchase',()=>{
   run('S.spec="Pilot";S.career="Smuggler";S.ownedSpecs=["Pilot"];S.specTalents={Pilot:new Set(["pil01"])};S.talents=S.specTalents.Pilot;renderReview()');
   assert.equal(run('talentRank("Skilled Jockey")'),2);assert.equal(run('S.talents.size'),1);assert.equal(run('talentCheckMods({id:"pc"},"Piloting (Space)",{setback:3}).setback'),1);
   assert.ok(g.window.document.getElementById('speciesTalents116').textContent.includes('1 included · 2 total'));
  });
  test('Repeated save loads do not duplicate innate ranks or spend XP',()=>{
   const before=fingerprint();run('Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"pilot save");Game97.saves.apply(JSON.parse(JSON.stringify(serializableState())),"repeat pilot save");renderReview()');assert.equal(fingerprint(),before);assert.equal(run('talentRank("Skilled Jockey")'),2);
  });
  for(const [species,name]of [['bothan','Convincing Demeanor'],['rodian','Expert Tracker'],['duros','Galaxy Mapper'],['jawa','Utinni!'],['selkath','Surgeon'],['sullustan','Skilled Jockey']]){
   fresh(species);run('S.finalized=true');
   test(species+': legacy review shows one included rank without changing saved progress',()=>{
    const before=fingerprint();run('renderReview();Game97.campaign.refreshReview();Game97.campaign.refreshReview()');const box=g.window.document.querySelector('#speciesTalents116');assert.ok(box.textContent.includes(name));assert.ok(box.textContent.includes('1 included · 1 total'));assert.equal(g.window.document.querySelectorAll('#speciesTalents116').length,1);assert.equal(fingerprint(),before);
   });
  }
  test('Switching to a species without included talents removes the previous card',()=>{run('S.species="human";Game97.campaign.refreshReview()');assert.equal(g.window.document.querySelector('#speciesTalents116'),null)});
  assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
