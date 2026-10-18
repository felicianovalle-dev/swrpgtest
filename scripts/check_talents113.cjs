/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three Lead by Example diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa113');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={Figurehead:{add:[],remove:[[5,9],[14,18]]},Instructor:{add:[],remove:[[9,10],[14,18],[16,17]]},Strategist:{add:[],remove:[[7,11],[12,13]]}};
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
 const test=async(name,fn)=>{try{await fn();checks.push(name);if(checks.length%25===0)console.log('Passed',checks.length)}catch(e){console.error('Failed:',name);e.message=name+': '+e.message;throw e}};
 const fresh=spec=>page.evaluate(spec=>{
  hydrateState(Game97.freshState(),'Lead by Example fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');S.crew=[];
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Forty-five of the original 48 layouts are reviewed; 3 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:54,pending:0,replaced:48,schema:92,build:'96.23-species-coercion'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger','Cyber Tech','Droid Tech','Modder','Demolitionist','Enforcer','Heavy','Archaeologist','Big-Game Hunter','Entrepreneur','Marshal','Performer','Figurehead','Instructor','Strategist','Beast Rider','Hotshot','Rigger'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
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

 for(const [spec,d]of Object.entries(deltas))for(const [from,to]of d.add)await test(`${spec}: restored ${from}–${to} route buys the correct original ID`,async()=>{await fresh(spec);const ns=fixture.trees[spec];await page.evaluate(id=>{S.talents.add(id);renderAll()},ns[from].id);await page.locator(`[data-tal="${ns[to].id}"]`).click();assert.equal(await page.evaluate(id=>S.talents.has(id),ns[to].id),true);assert.equal(await page.evaluate(()=>S.earnedXp),400-ns[to].cost)});
 for(const [spec,d]of Object.entries(deltas))for(const [from,to]of d.remove)await test(`${spec}: unsupported ${from}–${to} route cannot unlock or charge a new purchase`,async()=>{await fresh(spec);const ns=fixture.trees[spec];await page.evaluate(id=>{S.talents.add(id);renderAll()},ns[from].id);const before=await snapshot();assert.equal(await page.locator(`[data-tal="${ns[to].id}"]`).isDisabled(),true);await page.evaluate(id=>buyViewedTalent(id),ns[to].id);assert.equal(await snapshot(),before)});



 await test('Source pages and bonus career skills match the supplied book',async()=>{
  for(const [spec,printedPage]of [['Figurehead',29],['Instructor',31],['Strategist',33]])assert.deepEqual(await page.evaluate(s=>{const t=CharacterCatalog97.data.trees[s];return[t.bookPage,t.bookPdfPage,t.ruleSet]},spec),[printedPage,printedPage+1,'lead113']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Commander.specs.Figurehead),['Cool','Leadership','Negotiation','Knowledge (Core Worlds)']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Commander.specs.Instructor),['Discipline','Medicine','Ranged (Heavy)','Knowledge (Education)']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Commander.specs.Strategist),['Computers','Cool','Vigilance','Knowledge (Warfare)']);
 });
 await test('All 37 scoped rules have source, activation, ranks and explicit resolution boundaries',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules113);assert.equal(Object.keys(rules).length,37);
  const ranked=['Body Guard','Command','Commanding Presence','Conditioned','Confidence','Coordinated Assault','Dedication','Grit','Knowledge Specialization','Physical Training','Positive Spin','Ready for Anything','Researcher','Resolve','Stimpack Specialization',"That's How It's Done",'Toughened','Well Read'];
  for(const[n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>20&&r.resolutionNote.length>20,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const [printed,names]of [[34,['Improved Body Guard','Calm Commander','Clever Commander','Improved Commanding Presence','Conditioned','Improved Confidence','Encouraging Words','Master Instructor','Master Strategist','Natural Instructor']],[35,['Positive Spin','Ready for Anything','Improved Ready for Anything','Improved Researcher',"That's How It's Done",'Thorough Assessment','Well Read']]])for(const n of names)assert.deepEqual([rules[n].page,rules[n].pdfPage,rules[n].source],[printed,printed+1,`Lead by Example · p.${printed}`]);
  assert.match(rules['Improved Commanding Presence'].summary,/minion.*rival.*attacking it ends/);assert.match(rules['Thorough Assessment'].summary,/another character.*at most one per check/);assert.match(rules["That's How It's Done"].summary,/start of your next turn.*beyond the first/);assert.equal(rules['Improved Confidence'].type,'Passive');assert.equal(rules['Improved Ready for Anything'].type,'Passive');
 });
 const readyWellRead=async()=>{await fresh('Strategist');await page.evaluate(()=>{S.talents.add('str03');renderAll()})};
 for(const answers of [[null],['Knowledge (Lore)',null],['Knowledge (Lore)','Knowledge (Education)',null],['Athletics'],['Knowledge (Lore)','Knowledge (Lore)'],['Knowledge (Lore)','Knowledge (Education)','Knowledge (Education)']])await test(`Well Read cancellation/invalid input ${JSON.stringify(answers)} preserves XP and choices`,async()=>{await readyWellRead();const before=await snapshot();await page.evaluate(answers=>{const old=window.prompt;window.prompt=()=>answers.shift();try{buyViewedTalent('str13')}finally{window.prompt=old}},answers);assert.equal(await snapshot(),before)});
 await test('Unaffordable Well Read purchase does not ask or charge',async()=>{await readyWellRead();const r=await page.evaluate(()=>{S.earnedXp=9;let asked=0;const old=window.prompt;window.prompt=()=>{asked++;return null};try{buyViewedTalent('str13');return{asked,xp:S.earnedXp,owned:S.talents.has('str13')}}finally{window.prompt=old}});assert.deepEqual(r,{asked:0,xp:9,owned:false})});
 await test('Well Read grants exactly three career skills without free ranks and survives save/Resume',async()=>{await readyWellRead();const r=await page.evaluate(()=>{const old=window.prompt;let a=['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)'];window.prompt=()=>a.shift();try{buyViewedTalent('str13');return{choices:S.talentChoices98.wellRead['Strategist:str13'],career:['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)'].map(x=>careerSkills().has(x)),ranks:['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)'].map(x=>S.skills[x]||0),xp:S.earnedXp}}finally{window.prompt=old}});assert.deepEqual(r,{choices:['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)'],career:[true,true,true],ranks:[0,0,0],xp:390});const before=await snapshot();await page.evaluate(()=>{buyViewedTalent('str13');save()});await reload();assert.equal(await snapshot(),before);assert.deepEqual(await page.evaluate(()=>['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)'].map(x=>careerSkills().has(x))),[true,true,true]);assert.match(await page.locator('#talentCompatibility98').textContent(),/Knowledge \(Xenology\)/)});
 await test('Existing Well Read owners choose missing skills without repurchasing or changing XP',async()=>{await fresh('Strategist');await page.evaluate(()=>{S.talents.add('str13');S.xpSpent=10;S.earnedXp=77;delete S.talentChoices98;renderAll()});assert.equal(await page.locator('[data-talent-choice98="str13"]').count(),1);await page.locator('[data-talent-choice98="str13"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),77);assert.equal(await page.evaluate(()=>S.xpSpent),10);assert.equal(await page.evaluate(()=>S.talents.size),1);assert.equal(await page.evaluate(()=>S.talentChoices98.wellRead['Strategist:str13'].length),3);assert.equal(await page.locator('[data-talent-choice98="str13"]').count(),0);await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.earnedXp),77)});
 for(const value of [null,[],{'Strategist:str13':['Knowledge (Lore)','Knowledge (Lore)','Knowledge (Education)']},{'Strategist:str13':['Knowledge (Lore)','Athletics','Knowledge (Education)']},{'Strategist:str13':['Knowledge (Lore)']},{'Figurehead:fig00':['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)']}])await test(`Malformed Well Read save is rejected ${JSON.stringify(value)}`,async()=>{await fresh('Strategist');const r=await page.evaluate(value=>{const state=Game97.freshState();state.spec='Strategist';state.career='Commander';state.ownedSpecs=['Strategist'];state.specTalents={Strategist:['str13']};state.talents=['str13'];state.talentChoices98={wellRead:value};try{Game97.saves.validate(state);return false}catch(e){return /Well Read/.test(e.message)}},value);assert.equal(r,true)});
 await test('Unowned Well Read choices grant no career skills',async()=>{await fresh('Strategist');assert.equal(await page.evaluate(()=>{S.talentChoices98={wellRead:{'Strategist:str13':['Knowledge (Lore)','Knowledge (Education)','Knowledge (Xenology)']}};return Talents98.careerSkills().size}),0)});
 await test('Canceled Knowledge Specialization preserves XP and purchases',async()=>{await fresh('Strategist');await page.evaluate(()=>{S.talents.add('str10');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="str20"]').click();cancel=false;assert.equal(await snapshot(),before)});
 for(const [skill,tri,accept,expected]of [['Knowledge (Lore)',1,true,3],['Knowledge (Lore)',0,true,1],['Knowledge (Lore)',1,false,1],['Knowledge (Education)',1,true,1]])await test(`Knowledge Specialization conversion ${skill}/${tri}/${accept}`,async()=>{await fresh('Strategist');const r=await page.evaluate(o=>{S.talents=new Set(['str20','str31']);S.specTalents[S.spec]=S.talents;S.talentChoices98={knowledgeSkill:'Knowledge (Lore)'};const old={roll:rollNarr,yes:window.confirm};rollNarr=()=>({ok:true,ns:1,na:0,tr:o.tri,de:0});window.confirm=()=>o.accept;try{const q=performBest(o.skill,{diff:2});return{ns:q.r.ns,tr:q.r.tr}}finally{rollNarr=old.roll;window.confirm=old.yes}}, {skill,tri,accept});assert.deepEqual(r,{ns:expected,tr:expected===3?0:tri})});
 await test('Natural Instructor failed-check reroll and session limit survive Resume',async()=>{await fresh('Instructor');const r=await page.evaluate(()=>{S.talents.add('ins41');const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest('Discipline',{diff:2}).r,b=performBest('Leadership',{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed.naturalInstructor}}finally{rollNarr=old}});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.sessionUsed.naturalInstructor),true)});
 await test('Shared modifiers and Ready for Anything respect PC skill and initiative scopes',async()=>{await fresh('Instructor');const r=await page.evaluate(()=>{S.ownedSpecs=['Instructor','Figurehead','Strategist'];S.specTalents.Instructor=new Set(['ins00','ins12','ins01','ins20']);S.specTalents.Figurehead=new Set(['fig03','fig10','fig20','fig33','fig02','fig31']);S.specTalents.Strategist=new Set(['str00','str21','str02','str22']);S.talents=S.specTalents.Instructor;const pc=actorById('pc'),get=(sk,ctx={})=>actorPool(pc,sk,{diff:3,setback:4,...ctx}).p;return{athletics:get('Athletics').boost,athSetback:get('Athletics').setback,coord:get('Coordination').setback,resilience:get('Resilience').boost,lead:get('Leadership').boost,leadSetback:get('Leadership').setback,cool:get('Cool').setback,initiative:get('Cool',{initiative:true}).setback,vig:get('Vigilance',{initiative:true}).setback,ordinaryVig:get('Vigilance').setback,knowledge:get('Knowledge (Lore)').setback,fear:get('Discipline',{fear:true}).difficulty}});assert.deepEqual(r,{athletics:2,athSetback:2,coord:2,resilience:2,lead:2,leadSetback:2,cool:2,initiative:0,vig:2,ordinaryVig:4,knowledge:2,fear:1})});
 await test('About derives 51 reviewed original-ID layouts and three pending',async()=>{await fresh('Figurehead');await page.evaluate(()=>renderNavTab('about97'));const t=await page.locator('#catalogAudit97').textContent();assert.match(t,/54 older full layouts have been checked/);assert.match(t,/0 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards disclose manual boundaries`,async()=>{await fresh(spec);const t=await page.locator('#talentTree').textContent();assert.match(t,/Lead by Example/);assert.doesNotMatch(t,/Phase 37|being wired|still pending/);if(spec==='Figurehead')assert.match(t,/minion group or rival/);if(spec==='Instructor')assert.match(t,/start of your next turn/);if(spec==='Strategist'){assert.match(t,/mass-combat phase/);assert.match(t,/without repurchasing/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Strategist');await page.screenshot({path:path.join(out,'strategist-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:37,connectionChanges:7,labelChanges:0,priorCases:960,combinedPriorCases:2040,remainingLayouts:3,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
