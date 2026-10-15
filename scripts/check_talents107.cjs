/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three No Disintegrations diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa107');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={'Martial Artist':{add:[[6,7],[9,10],[13,14]],remove:[[1,4],[2,6],[7,11],[14,18]]},Operator:{add:[[6,7],[8,12],[10,11],[13,14],[14,15]],remove:[[1,5]]},'Skip Tracer':{add:[[4,5],[5,6],[6,7],[9,13],[10,11],[14,15],[18,19]],remove:[]}};
const labels={};
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
  hydrateState(Game97.freshState(),'No Disintegrations fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Thirty-one of the original 48 layouts are reviewed; 17 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:37,pending:17,replaced:48,schema:92,build:'96.12-fly-casual-audit'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Healer','Niman Disciple','Sage','Peacekeeper','Protector','Soresu Defender','Advisor','Makashi Duelist','Seer','Ataru Striker','Hunter','Pathfinder','Artisan','Shadow','Shien Expert','Aggressor','Shii-Cho Knight','Starfighter Ace','Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout')}
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
  await test(`${spec}: 20 real buttons charge exactly 300 XP; Dedication applies once without granting Force sensitivity`,async()=>{
   const before=await page.evaluate(()=>S.chars.Brawn);
   for(let i=0;i<20;i++){const b=page.locator('#talentTree [data-tal]:enabled').first();assert.ok(await b.count(),`No reachable ${spec} purchase at ${i}`);await b.click()}
   assert.equal(await page.evaluate(()=>S.talents.size),20);assert.equal(await page.evaluate(()=>S.earnedXp),100);
   assert.equal(await page.evaluate(()=>S.forceRating),0);assert.equal(await page.evaluate(()=>S.chars.Brawn),before+1);
   const purchased=await snapshot();await page.evaluate(()=>{for(const id of S.talents)buyViewedTalent(id)});assert.equal(await snapshot(),purchased);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);
  });
  await test(`${spec}: new purchases and choices survive actual save, reload and Resume latest`,async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before)});
 }

 for(const [spec,delta]of Object.entries(deltas))for(const [from,to]of delta.add)await test(`${spec}: restored ${from}–${to} route buys the correct original ID`,async()=>{
  await fresh(spec);const ids=fixture.trees[spec].map(n=>n.id);await page.evaluate(id=>{S.talents.add(id);renderAll()},ids[from]);const price=fixture.trees[spec][to].cost;
  await page.locator(`[data-tal="${ids[to]}"]`).click();assert.equal(await page.evaluate(id=>S.talents.has(id),ids[to]),true);assert.equal(await page.evaluate(()=>S.earnedXp),400-price);
 });
 for(const [spec,delta]of Object.entries(deltas))for(const [from,to]of delta.remove)await test(`${spec}: unsupported ${from}–${to} route cannot charge or unlock a new purchase`,async()=>{
  await fresh(spec);const ids=fixture.trees[spec].map(n=>n.id);await page.evaluate(id=>{S.talents.add(id);renderAll()},ids[from]);const before=await snapshot();assert.equal(await page.locator(`[data-tal="${ids[to]}"]`).isDisabled(),true);await page.evaluate(id=>buyViewedTalent(id),ids[to]);assert.equal(await snapshot(),before);
 });
 await test('Martial Artist Parry/Grit and Operator Galaxy Mapper are independent starting purchases',async()=>{for(const [spec,ids]of [['Martial Artist',['ma01','ma02']],['Operator',['op01']]]){await fresh(spec);for(const id of ids){assert.equal(await page.locator(`[data-tal="${id}"]`).isDisabled(),false);assert.equal(await page.evaluate(({spec,id})=>treeForSpec(spec).find(n=>n.id===id).links.length,{spec,id}),0)}}});
 await test('Canceled Dedication and insufficient XP preserve all character state',async()=>{await fresh('Martial Artist');await page.evaluate(()=>{S.talents.add('ma31');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="ma41"]').click();cancel=false;assert.equal(await snapshot(),before);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('ma00')});assert.equal(await page.evaluate(()=>S.talents.has('ma00')),false);assert.equal(await page.evaluate(()=>S.earnedXp),4)});
 await test('39 scoped rules have independently checked source, activation, ranks and honest resolution notes',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules107);assert.equal(Object.keys(rules).length,39);
  const ranked=['Bypass Security','Dedication','Expert Tracker','Galaxy Mapper','Good Cop','Grit','Hard-Boiled','Iron Body',"Nobody's Fool",'Overwhelm Defenses','Parry','Planet Mapper','Rapid Recovery','Shortcut','Skilled Jockey','Street Smarts','Toughened'];
  const pages={34:['All-Terrain Driver','Bought Info','Coordination Dodge','Debilitating Shot','Good Cop','Grapple','Hard-Boiled','Hindering Shot','Informant','Iron Body'],35:['Martial Grace','Mind Over Matter','Offensive Driving','Overbalance','Overwhelm Defenses','Parry','Planet Mapper','Precision Strike','Improved Precision Strike'],36:['Supreme Precision Strike','Reconstruct the Scene','Improved Shortcut','Improved Street Smarts','Unarmed Parry']};
  for(const [name,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(name),name);assert.equal(r.force,false,name);assert.ok(r.summary.length>25&&r.resolutionNote.length>25,name);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),name)}
  for(const [pageNo,names]of Object.entries(pages))for(const name of names){assert.equal(rules[name].page,+pageNo,name);assert.equal(rules[name].pdfPage,+pageNo+1,name);assert.equal(rules[name].source,`No Disintegrations · p.${pageNo}`)}
  for(const name of ['Coordination Dodge','Parry','Precision Strike','Improved Precision Strike','Supreme Precision Strike'])assert.equal(rules[name].activation,'Active (Incidental, Out of Turn)',name);
  for(const name of ['Grapple','Offensive Driving'])assert.equal(rules[name].activation,'Active (Maneuver)',name);
  assert.equal(rules['Hard-Boiled'].type,'Passive');assert.equal(rules['Good Cop'].type,'Passive');assert.match(rules['Martial Grace'].errata,/2017-11-20/);
  assert.match(rules['Bought Info'].summary,/one Success/);assert.match(rules['Improved Street Smarts'].summary,/Formidable/);assert.match(rules['Supreme Precision Strike'].resolutionNote,/only Easy and Average/);assert.match(rules['Coordination Dodge'].resolutionNote,/no once-per-session/);
 });
 const battle=async(ids=['ma00','ma10','ma12','ma20','ma22','ma23'])=>{await fresh('Martial Artist');await page.evaluate(ids=>{S.talents=new Set(ids);S.specTalents[S.spec]=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:10}];const begin=beginSlot;beginSlot=()=>{};try{startCustomEncounter()}finally{beginSlot=begin}S.combat.slots.sort((a,b)=>Number(b.side==='PC')-Number(a.side==='PC'));S.combat.slotIndex=0;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0,started:true};const e=S.combat.enemies[0];S.combat.positions={pc:2,[e.id]:2};e.soak=0;e.def=0;S.strain=0;S.skills.Coordination=2;renderCombat()},ids)};
 await test('Martial Artist Iron Body applies two ranks to PC checks and unarmed Critical rating without Force sensitivity',async()=>{await battle();const r=await page.evaluate(()=>{const pc=actorById('pc');return{coord:talentCheckMods(pc,'Coordination',{setback:5}).setback,res:talentCheckMods(pc,'Resilience',{setback:5}).setback,other:talentCheckMods({...pc,id:'lena'},'Coordination',{setback:5}).setback,crit:unarmedWeapon().crit,force:S.forceRating}});assert.deepEqual(r,{coord:3,res:3,other:5,crit:3,force:0})});
 for(const success of [false,true])await test(`Visible unarmed ${success?'hit':'miss'} applies Martial Grace only on success and spends one action`,async()=>{await battle();const r=await page.evaluate(success=>{const roll=rollNarr;rollNarr=()=>({ok:success,ns:success?1:0,na:0,tr:0,de:0,nt:0,nd:0});try{document.querySelector('#cUnarmed').click();return{strain:S.strain,used:S.combat.martialGraceRound===S.combat.round,action:S.combat.turn.actionUsed,wounds:S.combat.enemies[0].w}}finally{rollNarr=roll}},success);assert.equal(r.strain,success?2:0);assert.equal(r.used,success);assert.equal(r.action,true);assert.equal(r.wounds>0,success)});
 await test('Martial Grace cancellation and same-round retry preserve resources; saved round use survives Resume',async()=>{await battle();const r=await page.evaluate(()=>{const confirm=window.confirm;window.confirm=()=>false;let declined;try{declined=maybeMartialGrace()}finally{window.confirm=confirm}const first=maybeMartialGrace(),again=maybeMartialGrace();return{declined,first,again,strain:S.strain}});assert.deepEqual(r,{declined:0,first:2,again:0,strain:2});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>maybeMartialGrace()),0);assert.equal(await page.evaluate(()=>S.strain),2)});
 await test('Unarmed Parry reduces damage before soak for two strain',async()=>{await battle();const r=await page.evaluate(()=>{S.combat.unarmedReady=true;return{damage:reduceIncomingWithSaber(8,false),strain:S.strain}});assert.deepEqual(r,{damage:5,strain:2})});
 for(const improved of [false,true])for(const answer of [null,'','0','-1','bad','Infinity','99'])await test(`${improved?'Improved':'Basic'} Precision selection ${String(answer)} spends neither strain nor round use`,async()=>{await battle(improved?['ma03','ma23']:['ma03']);const r=await page.evaluate(answer=>{const prompt=window.prompt;window.prompt=()=>answer;try{return{chosen:choosePrecisionCritical({skill:'Brawl'}),strain:S.strain,used:S.combat.precisionImprovedRound===S.combat.round}}finally{window.prompt=prompt}},answer);assert.deepEqual(r,{chosen:null,strain:0,used:false})});
 await test('Accepted Average Critical selection spends two strain once, floors fractions and preserves round use through Resume',async()=>{await battle(['ma03','ma23']);const r=await page.evaluate(()=>{const prompt=window.prompt;window.prompt=()=> '2.8';try{const first=choosePrecisionCritical({skill:'Brawl'}),used=S.combat.precisionImprovedRound===S.combat.round,second=choosePrecisionCritical({skill:'Brawl'});return{first,used,second,strain:S.strain}}finally{window.prompt=prompt}});assert.deepEqual(r,{first:46,used:true,second:6,strain:3});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.combat.precisionImprovedRound===S.combat.round),true)});
 await test('Lightsaber cannot use Improved Precision Strike and ranged checks cannot use either tier',async()=>{await battle(['ma03','ma23']);const r=await page.evaluate(()=>({saber:choosePrecisionCritical({skill:'Lightsaber'}),strain:S.strain,used:S.combat.precisionImprovedRound===S.combat.round,ranged:choosePrecisionCritical({skill:'Ranged (Light)'})}));assert.deepEqual(r,{saber:1,strain:1,used:false,ranged:null})});
 await test('Hard-Boiled spends only available Advantage up to ranks; Rapid Recovery adds strain healing',async()=>{await fresh('Skip Tracer');const r=await page.evaluate(()=>{S.talents=new Set(['st01','st20','st41','st03','st21']);S.specTalents[S.spec]=S.talents;S.wounds=8;S.strain=8;renderAll();document.querySelector('#healerSelect').value='pc';document.querySelector('#patientSelect').value='pc';document.querySelector('#recoveryAction').value='cool';const roll=rollNarr;rollNarr=()=>({ok:true,ns:2,na:2,tr:0,de:0,nt:0,nd:0});try{document.querySelector('#performRecovery').click();return{wounds:S.wounds,strain:S.strain}}finally{rollNarr=roll}});assert.deepEqual(r,{wounds:6,strain:4})});
 await test('Operator piloting and Astrogation setback benefits are PC-specific',async()=>{await fresh('Operator');const r=await page.evaluate(()=>{S.talents=new Set(['op01','op20','op42']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc');return{planet:talentCheckMods(pc,'Piloting (Planetary)',{setback:4}).setback,space:talentCheckMods(pc,'Piloting (Space)',{setback:4}).setback,astro:talentCheckMods(pc,'Astrogation',{setback:4}).setback,other:talentCheckMods({...pc,id:'lena'},'Piloting (Space)',{setback:4}).setback}});assert.deepEqual(r,{planet:2,space:2,astro:3,other:4})});
 await test('About reports 37 reviewed original-ID layouts and 17 pending from current catalog data',async()=>{await fresh('Martial Artist');await page.evaluate(()=>renderNavTab('about97'));const text=await page.locator('#catalogAudit97').textContent();assert.match(text,/37 older full layouts have been checked/);assert.match(text,/17 older full layouts still await/);assert.doesNotMatch(text,/Twelve older full layouts/)});
 for(const spec of specs)await test(`${spec}: source cards disclose actual costs, timing and manual limits`,async()=>{await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/No Disintegrations/);assert.doesNotMatch(text,/Phase 37|still pending|being wired|older handlers/);if(spec==='Martial Artist'){assert.match(text,/only Easy and Average/);assert.match(text,/no once-per-session/)}if(spec==='Operator'){assert.match(text,/hull trauma/);assert.match(text,/close range/)}if(spec==='Skip Tracer'){assert.match(text,/Formidable/);assert.match(text,/one Success/);assert.match(text,/repeat attempts are not enforced/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: three source layouts fit without overflow or overlapping purchase buttons`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Martial Artist');await page.screenshot({path:path.join(out,'martial-artist-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:39,connectionChanges:20,labelChanges:0,priorCases:960,combinedPriorCases:2040,remainingLayouts:17,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
