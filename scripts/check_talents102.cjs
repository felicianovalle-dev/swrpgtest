/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the six F&D core diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa102');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={
 Healer:{add:[[5,9]],remove:[[13,17]]},
 'Niman Disciple':{add:[],remove:[[0,4],[2,6],[3,7],[14,18]]},
 Sage:{add:[[14,15]],remove:[[4,8],[11,15],[18,19]]},
 Peacekeeper:{add:[[9,10],[13,14]],remove:[[2,6],[4,8],[10,14]]},
 Protector:{add:[],remove:[[12,13],[12,16]]},
 'Soresu Defender':{add:[],remove:[[1,5],[2,6],[13,17],[15,19]]}
};
const labels={he22:'Passive',n02:'Force Active',n22:'Force Active',n31:'Force Active',pr20:'Force Active',so11:'Force Active',so21:'Active',so31:'Force Active',so32:'Force Active',so40:'Force Passive',so42:'Force Active'};
const specs=Object.keys(deltas),checks=[],errors=[];let browser,server,cancel=false;
function edgeSet(nodes){const ix=Object.fromEntries(nodes.map((n,i)=>[n.id,i]));return new Set(nodes.flatMap((n,i)=>n.links.map(id=>JSON.stringify([Math.min(i,ix[id]),Math.max(i,ix[id])]))));}
(async()=>{
 server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,'index.html')))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1280,height:800},hasTouch:true,serviceWorkers:'block'});
 page.setDefaultTimeout(60000);page.setDefaultNavigationTimeout(60000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('dialog',async d=>{if(cancel)return d.dismiss();await d.accept(d.type()==='prompt'?(d.message().includes('Dedication')?'Brawn':d.defaultValue()):undefined)});
 await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.Game97?.ready);
 const test=async(name,fn)=>{try{await fn();checks.push(name);if(checks.length%25===0)console.log('Passed',checks.length)}catch(e){e.message=name+': '+e.message;throw e}};
 const fresh=spec=>page.evaluate(spec=>{
  hydrateState(Game97.freshState(),'F&D core fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=1;S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,knowledge:S.talentChoices98?.knowledgeSkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('The original six reviews keep coverage and schema intact as later batches are added',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.ruleSet==='fndCore102').length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:6,pending:20,replaced:48,schema:92,build:'96.11-no-disintegrations-audit'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Artisan','Shadow','Shien Expert','Aggressor','Shii-Cho Knight','Starfighter Ace'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}

   if(['Advisor','Makashi Duelist','Seer','Ataru Striker','Hunter','Pathfinder'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout')}
   else{assert.deepEqual(tree,old);assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Full layout in saved build')}
   return;
  }
  assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));
  assert.deepEqual(tree.map(n=>n.type),old.map(n=>labels[n.id]||n.type));
  const expected=edgeSet(old);for(const e of deltas[spec].remove)expected.delete(JSON.stringify(e));for(const e of deltas[spec].add)expected.add(JSON.stringify(e));
  assert.deepEqual([...edgeSet(tree)].sort(),[...expected].sort());assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');
 });
 await test('All 960 saved individual purchases remain unchanged, including removed routes and zero-Force characters',async()=>{
  const results=await page.evaluate(fixture=>{
   const rows=[];
   for(const [spec,ns]of Object.entries(fixture.trees))for(const n of ns){
    const state=Game97.freshState();Object.assign(state,{finalized:true,spec,career:specializationCareer(spec),ownedSpecs:[spec],specTalents:{[spec]:[n.id]},talents:[n.id],credits:4321,earnedXp:77,xpSpent:n.cost,forceRating:0});state.settings.autosave=false;
    if(n.name==='Dedication'){state.chars.Brawn=3;state.dedication={[`${spec}:${n.id}`]:'Brawn'}}
    if(n.name==='Knowledge Specialization')state.talentChoices98={knowledgeSkill:'Knowledge (Lore)'};
    const before=JSON.stringify(state);Game97.saves.validate(state);Talents98.migrate(state);
    rows.push({spec,id:n.id,unchanged:before===JSON.stringify(state),sameAbility:treeForSpec(spec).find(x=>x.id===n.id)?.name===n.name});
   }return rows;
  },fixture);
  assert.equal(results.length,960);for(const r of results){assert.equal(r.unchanged,true,`${r.spec}/${r.id}`);assert.equal(r.sameAbility,true,`${r.spec}/${r.id}`)}
 });
 await test('All 2040 old purchases load together without changing XP, story, characteristics or Force rating',async()=>{
  const r=await page.evaluate(trees=>{
   const old=Game97.freshState();Object.assign(old,{finalized:true,spec:'Healer',career:'Consular',ownedSpecs:Object.keys(trees),specTalents:Object.fromEntries(Object.entries(trees).map(([s,ns])=>[s,ns.map(n=>n.id)])),talents:trees.Healer.map(n=>n.id),credits:4321,earnedXp:77,xpSpent:100,forceRating:9});old.settings.autosave=false;old.ep15.mainStage=4;old.chars=Object.fromEntries(Object.keys(old.chars).map(c=>[c,4]));old.dedication={};old.talentChoices98={knowledgeSkill:'Knowledge (Lore)'};
   for(const [s,ns]of Object.entries(trees))for(const n of ns.filter(n=>n.name==='Dedication'))old.dedication[`${s}:${n.id}`]='Brawn';
   const expected=Object.values(trees).flat().filter(n=>n.name==='Grit').length;Game97.saves.apply(old,'all prior career purchases');
   return{count:allOwnedSpecNodes().length,grit:talentRank('Grit'),expected,credits:S.credits,xp:S.earnedXp,spent:S.xpSpent,force:S.forceRating,stage:S.ep15.mainStage,chars:S.chars,originalIds:Object.fromEntries(Object.keys(trees).filter(s=>!Talents98.replaced.includes(s)).map(s=>[s,[...S.specTalents[s]]]))};
  },{...previous,...fixture.trees});
  assert.equal(r.count,2040);assert.equal(r.grit,r.expected);assert.equal(r.credits,4321);assert.equal(r.xp,77);assert.equal(r.spent,100);assert.equal(r.force,9);assert.equal(r.stage,4);assert.ok(Object.values(r.chars).every(c=>c===4));
  for(const [s,ids]of Object.entries(r.originalIds))assert.deepEqual(ids,({...previous,...fixture.trees})[s].map(n=>n.id));
 });
 await test('The combined old campaign saves and resumes without reapplying upgrades or losing skill choices',async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before)});
 for(const spec of specs){
  console.log('Purchase tree',spec);await fresh(spec);
  await test(`${spec}: 20 real buttons charge exactly 300 XP; Force Rating and Dedication apply once`,async()=>{
   const before=await page.evaluate(()=>S.chars.Brawn);
   for(let i=0;i<20;i++){const b=page.locator('#talentTree [data-tal]:enabled').first();assert.ok(await b.count(),`No reachable ${spec} purchase at ${i}`);await b.click()}
   assert.equal(await page.evaluate(()=>S.talents.size),20);assert.equal(await page.evaluate(()=>S.earnedXp),100);
   assert.equal(await page.evaluate(()=>S.forceRating),spec==='Sage'?3:spec==='Soresu Defender'?1:2);assert.equal(await page.evaluate(()=>S.chars.Brawn),before+(spec==='Sage'?0:1));
   const purchased=await snapshot();await page.evaluate(()=>{for(const id of S.talents)buyViewedTalent(id)});assert.equal(await snapshot(),purchased);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);
  });
  await test(`${spec}: new purchases and choices survive actual save, reload and Resume latest`,async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before)});
 }
 await fresh('Healer');
 await test('The restored Healer Physician connection unlocks Grit at the correct cost',async()=>{
  await page.locator('[data-tal="he01"]').click();await page.locator('[data-tal="he11"]').click();assert.equal(await page.locator('[data-tal="he21"]').isDisabled(),false);await page.locator('[data-tal="he21"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),370);
 });
 await fresh('Niman Disciple');
 await test('A removed Niman Parry connection cannot unlock or charge Defensive Training',async()=>{
  await page.locator('[data-tal="n00"]').click();await page.evaluate(()=>buyViewedTalent('n10'));assert.equal(await page.locator('[data-tal="n10"]').isDisabled(),true);assert.equal(await page.evaluate(()=>S.earnedXp),395);assert.equal(await page.evaluate(()=>S.talents.has('n10')),false);
 });
 await test('Non-Force characters may purchase Force talents; cards explain the Force Rating requirement for use',async()=>{
  await fresh('Niman Disciple');await page.evaluate(()=>{S.forceRating=0;renderAll()});assert.equal(await page.locator('[data-tal="n02"]').isDisabled(),false);await page.locator('[data-tal="n02"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),395);assert.equal(await page.evaluate(()=>S.forceRating),0);assert.match(await page.locator('#talentTree').textContent(),/Force Rating 1\+ required to use/);await page.locator('[data-tal="n00"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),390);
 });
 await test('Force Rating purchases cannot grant initial sensitivity; acquiring a granting universal activates the saved rank once',async()=>{
  await fresh('Healer');const pending=await page.evaluate(()=>{S.career='Bounty Hunter';S.spec='Assassin';S.ownedSpecs=['Assassin','Healer'];S.specTalents.Assassin=new Set();S.talents=S.specTalents.Assassin;S.forceRating=0;S.specTalents.Healer.add('he32');buyViewedTalent('he42');return{force:S.forceRating,owned:S.specTalents.Healer.has('he42'),xp:S.earnedXp}});assert.deepEqual(pending,{force:0,owned:true,xp:375});
  await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.forceRating),0);
  const r=await page.evaluate(()=>{$('universalSelect').value='Force-Sensitive Outcast';buyUniversalSpec();const activated=S.forceRating;buyUniversalSpec();return{activated,again:S.forceRating,owned:S.specTalents.Healer.has('he42')}});assert.deepEqual(r,{activated:2,again:2,owned:true});
  await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.forceRating),2);
 });
 await fresh('Soresu Defender');
 await test('Cancelling Dedication and insufficient XP do not add nodes or change characteristics',async()=>{
  await page.evaluate(()=>{S.talents.add('so40');renderAll()});cancel=true;await page.locator('[data-tal="so41"]').click();cancel=false;assert.equal(await page.evaluate(()=>S.earnedXp),400);assert.equal(await page.evaluate(()=>S.talents.has('so41')),false);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('so00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.has('so00')),false);
 });
 await fresh('Protector');
 await test('Errata blocks a new Heightened Awareness duplicate while granting its connections without charging XP',async()=>{
  const r=await page.evaluate(()=>{
   S.ownedSpecs=['Protector','Scout'];S.specTalents.Scout=new Set([treeForSpec('Scout').find(n=>n.name==='Heightened Awareness').id]);renderAll();buyViewedTalent('pr22');
   return{known:Talents98.knownUnranked('Heightened Awareness'),owned:S.talents.has('pr22'),xp:S.earnedXp,next:eligibleSpecTalent('Protector',treeForSpec('Protector').find(n=>n.id==='pr32')),rule:Talents98.ruleFor('Heightened Awareness').ranked};
  });assert.deepEqual(r,{known:true,owned:false,xp:400,next:true,rule:false});assert.equal(await page.locator('[data-tal="pr22"]').isDisabled(),true);
 });
 await test('Previously saved duplicate Awareness purchases remain saved without charging or deleting ranks',async()=>{
  const r=await page.evaluate(()=>{
   const old=Game97.freshState();Object.assign(old,{finalized:true,career:'Guardian',spec:'Protector',ownedSpecs:['Protector','Scout'],specTalents:{Protector:['pr22'],Scout:[treeForSpec('Scout').find(n=>n.name==='Heightened Awareness').id]},talents:['pr22'],earnedXp:77,forceRating:1});old.settings.autosave=false;Game97.saves.apply(old,'prior Awareness duplicates');return{ids:[...S.talents],count:talentRank('Heightened Awareness'),xp:S.earnedXp};
  });assert.deepEqual(r,{ids:['pr22'],count:2,xp:77});
 });
 await test('Glossary variants and errata are scoped to the right trees',async()=>{
  const r=await page.evaluate(()=>({healing:Talents98.ruleFor('Knowledgeable Healing','Healer').activation,parry:Talents98.ruleFor('Improved Parry','Soresu Defender').activation,reflect:Talents98.ruleFor('Improved Reflect','Soresu Defender').type,assault:Talents98.ruleFor('Force Assault','Niman Disciple').activation,knowledge:Talents98.ruleFor('Knowledge Specialization','Sage').activation,eotE:Talents98.ruleFor('Knowledge Specialization','Scholar').activation,aor:Talents98.ruleFor('Knowledge Specialization','Analyst').activation,awareness:Talents98.ruleFor('Heightened Awareness','Protector').errata}));
  assert.deepEqual({...r,awareness:undefined},{healing:'Passive',parry:'Active (Incidental, Out of Turn)',reflect:'Force Active',assault:'Passive',knowledge:'Active (Incidental)',eotE:'Passive',aor:'Active (Incidental)',awareness:undefined});assert.match(r.awareness,/unranked/);
 });
 await fresh('Healer');
 await test('Healer wound and strain benefits reach the actual Medicine handler',async()=>{
  const r=await page.evaluate(()=>{
   S.talents=new Set(treeForSpec('Healer').filter(n=>['Surgeon','Physician'].includes(n.name)).map(n=>n.id));S.specTalents.Healer=S.talents;S.wounds=8;S.strain=8;renderRecovery();$('healerSelect').value='pc';$('patientSelect').value='pc';$('recoveryAction').value='medicine';
   const original=rollNarr;rollNarr=()=>({ok:true,ns:1,na:1,nt:0,tr:0,de:0,nd:0});try{performRecovery();return{wounds:S.wounds,strain:S.strain}}finally{rollNarr=original}
  });assert.deepEqual(r,{wounds:5,strain:4});
 });
 await test('Lightsaber characteristics follow the saved Niman and Soresu techniques',async()=>{
  await fresh('Niman Disciple');await page.evaluate(()=>{S.talents.add('n11')});assert.equal(await page.evaluate(()=>formTechniqueCharacteristic()),'Willpower');await fresh('Soresu Defender');await page.evaluate(()=>{S.talents.add('so10')});assert.equal(await page.evaluate(()=>formTechniqueCharacteristic()),'Intellect');
 });
 await fresh('Healer');
 await test('Knowledgeable Healing uses the actual allied Medicine and Destiny handler',async()=>{
  const r=await page.evaluate(()=>{
   S.crew=['lena'];S.talents=new Set(['he22']);S.specTalents.Healer=S.talents;S.skills['Knowledge (Xenology)']=2;S.destiny={light:1,dark:0};actorState('lena').wounds=8;renderRecovery();$('healerSelect').value='pc';$('patientSelect').value='lena';$('recoveryAction').value='medicine';
   const original=rollNarr;rollNarr=()=>({ok:true,ns:1,na:0,nt:0,tr:0,de:0,nd:0});try{performRecovery();return{wounds:actorState('lena').wounds,light:S.destiny.light,dark:S.destiny.dark}}finally{rollNarr=original}
  });assert.deepEqual(r,{wounds:5,light:0,dark:1});
 });
 await fresh('Peacekeeper');
 await test('Second Wind restores three strain once per encounter, even after changing rounds',async()=>{
  const r=await page.evaluate(()=>{
   S.talents=new Set(treeForSpec('Peacekeeper').filter(n=>n.name==='Second Wind').map(n=>n.id));S.specTalents.Peacekeeper=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:1}];startCustomEncounter();S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};S.strain=8;secondWind();const once=S.strain;S.combat.round++;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};secondWind();return{once,twice:S.strain,used:S.combat.secondWindRound};
  });assert.deepEqual(r,{once:5,twice:5,used:1});
 });
 await test('Second Wind remains spent across real save and reload, then resets in a new encounter',async()=>{
  await page.evaluate(()=>save());await reload();await page.evaluate(()=>secondWind());assert.equal(await page.evaluate(()=>S.strain),5);
  const r=await page.evaluate(()=>{S.combat=null;startCustomEncounter();S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};S.strain=8;secondWind();return S.strain});assert.equal(r,5);
 });
 await fresh('Protector');
 await test('Stimpack Specialization heals on the fifth use; the sixth heals nothing and still spends the consumable',async()=>{
  const r=await page.evaluate(()=>{
   S.talents=new Set(treeForSpec('Protector').filter(n=>n.name==='Stimpack Specialization').map(n=>n.id));S.specTalents.Protector=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:1}];startCustomEncounter();S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};S.wounds=8;S.stimUses=4;S.stimpacks=2;useStimpack();const fifth=S.wounds;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};useStimpack();return{fifth,sixth:S.wounds,uses:S.stimUses,stimpacks:S.stimpacks};
  });assert.deepEqual(r,{fifth:5,sixth:5,uses:6,stimpacks:0});
 });
 await test('Sixth-use limit survives save and resume',async()=>{
  await page.evaluate(()=>{S.stimpacks=1;save()});await reload();const r=await page.evaluate(()=>{S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};useStimpack();return{wounds:S.wounds,uses:S.stimUses,stimpacks:S.stimpacks}});assert.deepEqual(r,{wounds:5,uses:7,stimpacks:0});
 });
 for(const spec of specs)await test(`${spec}: source timing, summaries and manual limits appear on all 20 cards`,async()=>{
  await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/Force and Destiny Core/);assert.doesNotMatch(text,/Phase 37|still pending|being wired/);
  if(spec==='Niman Disciple'){assert.match(text,/Purchasing this talent does not grant Move/);assert.match(text,/normal two-maneuver limit/)}
  if(spec==='Soresu Defender'){assert.match(text,/Active \(Incidental, Out of Turn\)/);assert.match(text,/following round ends/)}
  if(spec==='Protector')assert.match(text,/unranked under official errata/);
 });
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all six layouts fit without horizontal overflow or source/button overlap`,async()=>{
  await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}
 });
 await page.setViewportSize({width:390,height:844});await fresh('Protector');await page.screenshot({path:path.join(out,'protector-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:6,reviewedNodes:120,retainedIds:120,frozenLayouts:48,frozenNodes:960,sourceRules:57,connectionChanges:21,labelChanges:11,priorCases:960,combinedPriorCases:2040,remainingLayouts:20,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
