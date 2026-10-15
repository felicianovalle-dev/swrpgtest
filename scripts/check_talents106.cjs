/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three EotE core diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa106');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={Assassin:{add:[],remove:[[16,17]]},Scoundrel:{add:[[9,10],[13,14]],remove:[[4,5]]},Slicer:{add:[[9,10],[10,11],[14,15],[17,18]],remove:[[1,5],[2,6],[4,5],[6,7],[18,19]]}};
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
  hydrateState(Game97.freshState(),'EotE core fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Twenty-five of the original 48 layouts are reviewed; 23 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:31,pending:23,replaced:48,schema:92,build:'96.10-eote-core-audit'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
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

 for(const [spec,from,to]of [['Scoundrel','s21','s22'],['Scoundrel','s31','s32'],['Slicer','z21','z22'],['Slicer','z22','z23'],['Slicer','z32','z33'],['Slicer','z41','z42']])await test(`${spec}: restored ${from}–${to} is usable`,async()=>{
  await fresh(spec);await page.evaluate(from=>{S.talents.add(from);renderAll()},from);const price=await page.evaluate(to=>treeForSpec(S.spec).find(n=>n.id===to).cost,to);await page.locator(`[data-tal="${to}"]`).click();assert.equal(await page.evaluate(to=>S.talents.has(to),to),true);assert.equal(await page.evaluate(()=>S.earnedXp),400-price);
 });
 for(const [spec,from,to]of [['Assassin','a40','a41'],['Scoundrel','s10','s11'],['Slicer','z01','z11'],['Slicer','z02','z12'],['Slicer','z10','z11'],['Slicer','z12','z13'],['Slicer','z42','z43']])await test(`${spec}: removed ${from}–${to} cannot unlock or charge a purchase`,async()=>{
  await fresh(spec);await page.evaluate(from=>{S.talents.add(from);renderAll()},from);const before=await snapshot();assert.equal(await page.locator(`[data-tal="${to}"]`).isDisabled(),true);await page.evaluate(to=>buyViewedTalent(to),to);assert.equal(await snapshot(),before);
 });
 await test('Slicer shares its reviewed layout and skill package between Technician and Spy',async()=>{await fresh('Slicer');const r=await page.evaluate(()=>{const a=JSON.stringify(treeForSpec('Slicer'));S.career='Spy';renderAll();return{same:a===JSON.stringify(treeForSpec('Slicer')),skills:CAREERS.Spy.specs.Slicer,source:SPECIALIZATION_TREE_SOURCE.Slicer,status:CharacterCatalog97.status('Slicer')}});assert.equal(r.same,true);assert.deepEqual(r.skills,['Computers','Knowledge (Education)','Knowledge (Underworld)','Stealth']);assert.equal(r.source,'Edge of the Empire Core · p.91');assert.equal(r.status,'Reviewed layout')});
 await test('Canceled Dedication and Deadly Accuracy choices, and insufficient XP, preserve state',async()=>{
  await fresh('Assassin');await page.evaluate(()=>{S.talents.add('a32');S.talents.add('a31');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="a42"]').click();await page.locator('[data-tal="a41"]').click();cancel=false;assert.equal(await snapshot(),before);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('a00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.has('a00')),false);
 });
 await test('All 32 rules have independently checked activation, ranks, pages and resolution notes',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules106);assert.equal(Object.keys(rules).length,32);
  const unranked=['Anatomy Lessons','Improved Defensive Slicing','Jump Up','Master of Shadows','Master Slicer','Mental Fortress','Natural Charmer','Natural Programmer','Quick Draw','Skilled Slicer','Soft Spot','Targeted Blow'];
  const passive=['Bypass Security','Codebreaker','Convincing Demeanor','Deadly Accuracy','Dedication','Defensive Slicing','Improved Defensive Slicing','Grit','Hidden Storage','Lethal Blows','Quick Strike','Resolve','Stalker','Technical Aptitude','Toughened'];
  const pages={132:['Anatomy Lessons','Black Market Contacts'],133:['Bypass Security','Codebreaker','Convincing Demeanor'],134:['Deadly Accuracy','Dedication','Defensive Slicing','Improved Defensive Slicing'],135:['Dodge'],136:['Grit'],137:['Hidden Storage'],138:['Jump Up','Lethal Blows','Master of Shadows'],139:['Master Slicer','Mental Fortress','Natural Charmer','Natural Programmer'],141:['Precise Aim','Quick Draw','Quick Strike','Rapid Reaction'],142:['Resolve','Side Step','Skilled Slicer','Sniper Shot'],143:['Soft Spot','Stalker'],144:['Targeted Blow'],145:['Technical Aptitude','Toughened']};
  for(const [pageNo,names]of Object.entries(pages))for(const name of names){const r=rules[name];assert.equal(r.page,+pageNo,name);assert.equal(r.pdfPage,+pageNo+9,name);assert.equal(r.ranked,!unranked.includes(name),name);assert.equal(r.type,passive.includes(name)?'Passive':'Active',name);assert.equal(r.force,false,name);assert.ok(r.summary.length>25&&r.resolutionNote.length>25,name);assert.equal(r.source,`Edge of the Empire Core · p.${pageNo}`)}
  assert.equal(rules['Master Slicer'].activation,'Active (Incidental)');assert.equal(rules['Skilled Slicer'].activation,'Active (Incidental)');assert.equal(rules['Precise Aim'].activation,'Active (Maneuver)');assert.equal(rules.Dodge.activation,'Active (Incidental, Out of Turn)');assert.match(rules['Improved Defensive Slicing'].summary,/replaces/);assert.match(rules['Targeted Blow'].errata,/removes Mercenary Soldier/);
 });
 const battle=async(spec,ids)=>{await fresh(spec);await page.evaluate(ids=>{S.talents=new Set(ids);S.specTalents[S.spec]=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:6}];const begin=beginSlot;beginSlot=()=>{};try{startCustomEncounter()}finally{beginSlot=begin}S.combat.slots.sort((a,b)=>Number(b.side==='PC')-Number(a.side==='PC'));S.combat.slotIndex=0;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0,started:true};const e=S.combat.enemies[0];S.combat.positions={pc:2,[e.id]:4};e.soak=0;e.def=3;S.strain=0;S.destiny={light:2,dark:3};renderCombat()},ids)};
 const preciseCase=async(opts={})=>{await battle('Assassin',['a10','a40']);return page.evaluate(opts=>{
  const old={prompt:window.prompt,confirm:window.confirm,roll:rollNarr};let calls=0,pool=null;const C=S.combat,T=C.turn,e=C.enemies[0];C.unarmedReady=true;
  T.maneuvers=opts.maneuvers||0;T.actionUsed=!!opts.spent;T.preciseAimUsed=!!opts.used;S.strain=opts.strain??0;S.conditions.winded=!!opts.winded;S.conditions.immobilized=opts.immobilized?1:0;
  if(opts.outOfRange)C.positions[e.id]=9;if(opts.dropped)S.conditions.droppedWeapon=true;
  window.prompt=()=>Object.hasOwn(opts,'answer')?opts.answer:'2';window.confirm=()=>opts.confirm!==false;rollNarr=p=>{calls++;pool={...p};return{ok:false,ns:0,na:0,tr:0,de:0,nt:0,nd:0}};
  const before={strain:S.strain,maneuvers:T.maneuvers,action:T.actionUsed};
  try{document.querySelector('#cPrecise').click();return{calls,pool,before,strain:S.strain,maneuvers:T.maneuvers,action:T.actionUsed,used:!!T.preciseAimUsed,unarmedReady:C.unarmedReady}}finally{window.prompt=old.prompt;window.confirm=old.confirm;rollNarr=old.roll}
 },opts)};
 await test('Precise Aim spends its maneuver, chosen whole strain and attack action on a miss',async()=>{const r=await preciseCase({answer:'1.8'});assert.equal(r.calls,1);assert.equal(r.strain,1);assert.equal(r.maneuvers,1);assert.equal(r.action,true);assert.equal(r.used,true);assert.equal(r.pool.setback,2);assert.equal(r.unarmedReady,false)});
 for(const answer of [null,'0','-1','bad','Infinity'])await test(`Precise Aim ${String(answer)} preserves resources and unarmed defense`,async()=>{const r=await preciseCase({answer});assert.equal(r.calls,0);assert.equal(r.strain,r.before.strain);assert.equal(r.maneuvers,r.before.maneuvers);assert.equal(r.action,r.before.action);assert.equal(r.used,false);assert.equal(r.unarmedReady,true)});
 for(const opts of [{outOfRange:true},{dropped:true},{immobilized:true},{maneuvers:2},{maneuvers:1,confirm:false},{maneuvers:1,winded:true},{spent:true},{used:true}])await test(`Blocked Precise Aim ${JSON.stringify(opts)} preserves resources and defense`,async()=>{const r=await preciseCase(opts);assert.equal(r.calls,0);assert.equal(r.strain,r.before.strain);assert.equal(r.maneuvers,r.before.maneuvers);assert.equal(r.action,r.before.action);assert.equal(r.unarmedReady,true)});
 await test('Precise Aim pays a second maneuver without exchanging away its attack',async()=>{const r=await preciseCase({maneuvers:1});assert.equal(r.calls,1);assert.equal(r.strain,4);assert.equal(r.maneuvers,2);assert.equal(r.action,true);assert.equal(r.pool.setback,1)});
 await test('Precise Aim accounts for activation strain before second-maneuver capacity',async()=>{await fresh('Assassin');const threshold=await page.evaluate(()=>strainThreshold());const r=await preciseCase({maneuvers:1,strain:threshold-2});assert.equal(r.calls,0);assert.equal(r.strain,r.before.strain);assert.equal(r.maneuvers,1);assert.equal(r.action,false);assert.equal(r.unarmedReady,true)});
 await test('Spent Precise Aim action survives actual save, reload and Resume',async()=>{await preciseCase();await page.evaluate(()=>save());await reload();const r=await page.evaluate(()=>{let calls=0;const old=rollNarr;rollNarr=()=>{calls++;return{ok:false,ns:0,na:0,tr:0,de:0}};try{pcAttack('precise');return{calls,used:S.combat.turn.preciseAimUsed,action:S.combat.turn.actionUsed,strain:S.strain}}finally{rollNarr=old}});assert.deepEqual(r,{calls:0,used:true,action:true,strain:2})});
 await test('Normal attacks still spend one action and no maneuver or activation strain',async()=>{await battle('Assassin',[]);const r=await page.evaluate(()=>{const old=rollNarr;rollNarr=()=>({ok:false,ns:0,na:0,tr:0,de:0});try{pcAttack();return{action:S.combat.turn.actionUsed,maneuvers:S.combat.turn.maneuvers,strain:S.strain}}finally{rollNarr=old}});assert.deepEqual(r,{action:true,maneuvers:0,strain:0})});
 await test('Slicer codebreaking and security benefits stay on marked PC tasks',async()=>{await fresh('Slicer');const r=await page.evaluate(()=>{S.talents=new Set(['z00','z32','z03','z13','z21']);S.specTalents.Slicer=S.talents;const pc=actorById('pc');return{decrypt:talentCheckMods(pc,'Computers',{diff:3,setback:5,decrypt:true}),security:talentCheckMods(pc,'Skulduggery',{diff:3,setback:5,security:true}),normal:talentCheckMods(pc,'Computers',{diff:3,setback:5}),other:talentCheckMods({...pc,id:'lena'},'Computers',{diff:3,setback:5,decrypt:true})}});assert.deepEqual(r.decrypt,{boost:0,setback:3,diff:2});assert.deepEqual(r.security,{boost:0,setback:2,diff:3});assert.deepEqual(r.normal,{boost:0,setback:5,diff:3});assert.deepEqual(r.other,{boost:0,setback:5,diff:3})});
 for(const [spec,id,key,skills]of [['Slicer','z20','naturalProgrammer',['Computers','Astrogation']],['Scoundrel','s41','naturalCharmer',['Charm','Deception']]])await test(`${spec}: failed eligible checks offer one saved session reroll`,async()=>{
  await fresh(spec);const r=await page.evaluate(({id,key,skills})=>{S.talents.add(id);const old={roll:rollNarr,confirm:window.confirm};let count=0;window.confirm=()=>true;rollNarr=()=>{count++;return{ok:true,ns:1,na:0,tr:0,de:0}};const failed={ok:false,ns:0,na:0,tr:0,de:0},q={actor:actorById('pc'),p:{}};try{const wrong=naturalReroll('Athletics',q,failed),success=naturalReroll(skills[0],q,{...failed,ok:true}),first=naturalReroll(skills[0],q,failed),second=naturalReroll(skills[1],q,failed);return{count,wrong:wrong.ok,success:success.ok,first:first.ok,second:second.ok,used:S.sessionUsed[key]}}finally{rollNarr=old.roll;window.confirm=old.confirm}},{id,key,skills});assert.deepEqual(r,{count:1,wrong:false,success:true,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(key=>S.sessionUsed[key],key),true);
 });
 for(const spec of specs)await test(`${spec}: all cards disclose source, timing and manual limits`,async()=>{await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const t=await page.locator('#talentTree').textContent();assert.match(t,/Edge of the Empire Core/);assert.doesNotMatch(t,/Phase 37|still pending|being wired|older handlers/);if(spec==='Assassin'){assert.match(t,/spends its maneuver and action/);assert.match(t,/does not extend weapon range/)}if(spec==='Scoundrel'){assert.match(t,/does not increase carrying capacity/);assert.match(t,/successful check requires manual/)}if(spec==='Slicer'){assert.match(t,/Triumph/);assert.match(t,/instead of.*Setback/);assert.match(t,/Injuries recorded/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all three layouts fit without overflow or source/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Slicer');await page.screenshot({path:path.join(out,'slicer-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:32,connectionChanges:13,labelChanges:0,priorCases:960,combinedPriorCases:2040,remainingLayouts:23,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});

