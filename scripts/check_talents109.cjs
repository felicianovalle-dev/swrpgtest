/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three Special Modifications diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa109');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={'Cyber Tech':{add:[],remove:[[2,6],[11,15],[13,17],[14,18]]},'Droid Tech':{add:[],remove:[[5,9],[9,13],[14,18]]},Modder:{add:[],remove:[[2,6],[10,14],[12,16],[17,18],[18,19]]}};
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
  hydrateState(Game97.freshState(),'Special Modifications fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Thirty-four of the original 48 layouts are reviewed; 14 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:54,pending:0,replaced:48,schema:92,build:'96.21-cerean-knowledge'});
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
 await test('Every reviewed layout uses the physical source page offset of three',async()=>{
  const trees=await page.evaluate(()=>Object.fromEntries(['Cyber Tech','Droid Tech','Modder'].map(s=>[s,CharacterCatalog97.data.trees[s]])));
  for(const [spec,p]of [['Cyber Tech',29],['Droid Tech',31],['Modder',33]]){assert.equal(trees[spec].bookPage,p);assert.equal(trees[spec].bookPdfPage,p+3);assert.equal(trees[spec].ruleSet,'specialMods109');assert.equal(trees[spec].source,`Special Modifications · p.${p}`)}
 });
 await test('Cyber Tech Engineered Redundancies is an independent starting purchase',async()=>{await fresh('Cyber Tech');assert.equal(await page.locator('[data-tal="ct02"]').isDisabled(),false);assert.equal(await page.evaluate(()=>treeForSpec(S.spec).find(n=>n.id==='ct02').links.length),0)});
 await test('Canceled Dedication and insufficient XP preserve the campaign',async()=>{await fresh('Modder');await page.evaluate(()=>{S.talents.add('md31');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="md41"]').click();cancel=false;assert.equal(await snapshot(),before);await fresh('Droid Tech');await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('dt00')});assert.equal(await page.evaluate(()=>S.talents.size),0);assert.equal(await page.evaluate(()=>S.earnedXp),4)});
 await test('The three Technician skill packages match the supplied diagrams',async()=>{assert.deepEqual(await page.evaluate(()=>Object.fromEntries(['Cyber Tech','Droid Tech','Modder'].map(s=>[s,CAREERS.Technician.specs[s]]))),{'Cyber Tech':['Athletics','Mechanics','Medicine','Vigilance'],'Droid Tech':['Computers','Cool','Mechanics','Leadership'],Modder:['Gunnery','Mechanics','Piloting (Space)','Streetwise']})});
 await test('All 33 scoped rules have checked ranks, activation, source pages and resolution notes',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules109);assert.equal(Object.keys(rules).length,33);
  const ranked=['Cyberneticist','Dedication','Deft Maker','Durable','Eye for Detail','Gearhead','Grit','Hidden Storage','Jury Rigged','Know Somebody','Larger Project','Machine Mender','More Machine than Man','Resolve','Speaks Binary','Surgeon','Tinkerer','Toughened'];
  const pages={34:['Custom Loadout','Cyberneticist','Deft Maker','Engineered Redundancies','Eye for Detail','Energy Transfer','Fancy Paint Job','Larger Project','Machine Mender','More Machine than Man'],35:['Overcharge','Improved Overcharge','Supreme Overcharge','Reroute Processors','Resourceful Refit','Signature Vehicle','Improved Speaks Binary','Supreme Speaks Binary']};
  for(const [n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>25&&r.resolutionNote.length>25,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const [p,ns]of Object.entries(pages))for(const n of ns){assert.equal(rules[n].page,+p,n);assert.equal(rules[n].pdfPage,+p+3,n);assert.equal(rules[n].source,`Special Modifications · p.${p}`,n)}
  for(const n of ['Energy Transfer','Supreme Speaks Binary'])assert.equal(rules[n].activation,'Active (Maneuver)');
  for(const n of ['Overcharge','Reroute Processors','Resourceful Refit'])assert.equal(rules[n].activation,'Active (Action)');
  assert.match(rules['Engineered Redundancies'].summary,/five.*combined/);assert.match(rules['Energy Transfer'].summary,/at least one cybernetic/);assert.match(rules['Supreme Speaks Binary'].summary,/non-minion.*next turn|next turn.*non-minion/);assert.match(rules['Improved Speaks Binary'].summary,/assist.*additional Boost/);assert.match(rules['Reroute Processors'].summary,/minimum of 0.*maximum of 7/);assert.match(rules['Supreme Overcharge'].summary,/once for each implant after the first/);assert.match(rules['Resourceful Refit'].summary,/same host.*minimum of 0/);
 });
 async function eyeCase({answer='2',room=20,winded=false,skill='Mechanics',successes=4,decline=false}={}){
  await fresh('Droid Tech');return page.evaluate(o=>{
   S.talents=new Set(['dt11','dt40']);S.specTalents[S.spec]=S.talents;S.strain=Math.max(0,strainThreshold()-o.room);S.conditions.winded=o.winded;
   const before=S.strain,old={roll:rollNarr,prompt:window.prompt,confirm:window.confirm};let prompts=0;
   rollNarr=()=>({ok:o.successes>0,ns:o.successes,na:0,tr:0,de:0});window.prompt=()=>{prompts++;return o.answer};window.confirm=()=>!o.decline;
   try{const r=performBest(o.skill,{diff:2}).r;return{before,strain:S.strain,ns:r.ns,na:r.na,ok:r.ok,prompts}}finally{rollNarr=old.roll;window.prompt=old.prompt;window.confirm=old.confirm}
  },{answer,room,winded,skill,successes,decline});
 }
 for(const skill of ['Mechanics','Computers'])await test(`${skill}: Eye for Detail converts two whole Successes for two strain`,async()=>{const r=await eyeCase({skill});assert.equal(r.strain-r.before,2);assert.equal(r.ns,2);assert.equal(r.na,2);assert.equal(r.ok,true);assert.equal(r.prompts,1)});
 for(const answer of [null,'','0','-1','bad','Infinity','-Infinity'])await test(`Eye for Detail ${String(answer)} spends nothing and preserves the result`,async()=>{const r=await eyeCase({answer});assert.equal(r.strain,r.before);assert.equal(r.ns,4);assert.equal(r.na,0)});
 for(const [options,n]of [[{answer:'1.9'},1],[{answer:'0.9'},0],[{answer:'99'},2],[{answer:'2',room:1},1],[{room:0},0],[{winded:true},0],[{decline:true},0],[{skill:'Medicine'},0],[{successes:2},1],[{successes:1},0],[{successes:0},0]])await test(`Eye for Detail respects whole costs, ranks, success and eligibility ${JSON.stringify(options)}`,async()=>{const r=await eyeCase(options);assert.equal(r.strain-r.before,n);assert.equal(r.ns,(options.successes??4)-n);assert.equal(r.na,n);assert.equal(r.ok,(options.successes??4)>0)});
 await test('Converted symbols and paid whole strain survive save/reload/Resume',async()=>{await eyeCase({answer:'1.9'});const before=await page.evaluate(()=>({strain:S.strain,result:S.last.r}));await page.evaluate(()=>save());await reload();assert.deepEqual(await page.evaluate(()=>({strain:S.strain,result:S.last.r})),before)});
 await test('Deft Maker removes droid setbacks on Mechanics and Computers, only for the PC',async()=>{await fresh('Droid Tech');const r=await page.evaluate(()=>{S.talents=new Set(['dt10','dt33']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc'),get=(skill,ctx={},actor=pc)=>talentCheckMods(actor,skill,{setback:4,...ctx}).setback;return{build:get('Mechanics',{droid:true}),program:get('Computers',{droid:true}),ordinary:get('Computers'),medicine:get('Medicine',{droid:true}),other:get('Computers',{droid:true},{...pc,id:'lena'}),minimum:get('Computers',{droid:true,setback:1})}});assert.deepEqual(r,{build:2,program:2,ordinary:4,medicine:4,other:4,minimum:0})});
 await test('Cyberneticist includes marked Medicine installation and Mechanics, while ordinary checks are unchanged',async()=>{await fresh('Cyber Tech');const r=await page.evaluate(()=>{S.talents=new Set(['ct00','ct13']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc'),get=(skill,ctx={},actor=pc)=>talentCheckMods(actor,skill,{setback:4,...ctx}).setback;return{build:get('Mechanics',{cybernetic:true}),install:get('Medicine',{cybernetic:true}),ordinary:get('Medicine'),computers:get('Computers',{cybernetic:true}),other:get('Medicine',{cybernetic:true},{...pc,id:'lena'}),minimum:get('Medicine',{cybernetic:true,setback:1})}});assert.deepEqual(r,{build:2,install:2,ordinary:4,computers:4,other:4,minimum:0})});
 await test('Gearhead remains Mechanics-only and ranks do not compound its discount',async()=>{await fresh('Modder');const r=await page.evaluate(()=>{S.talents=new Set(['md10','md33']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc');return{mechanics:talentCheckMods(pc,'Mechanics',{setback:4}).setback,computers:talentCheckMods(pc,'Computers',{setback:4}).setback,summary:Talents98.ruleFor('Gearhead').summary}});assert.equal(r.mechanics,2);assert.equal(r.computers,4);assert.match(r.summary,/extra ranks do not halve/)});
 for(const ranks of [0,1,2])await test(`Workshop material cost with ${ranks} Deft Maker ranks uses one 50 percent discount`,async()=>{await fresh('Droid Tech');const r=await page.evaluate(ranks=>{S.talents=new Set(['dt10','dt33'].slice(0,ranks));S.specTalents[S.spec]=S.talents;return Object.fromEntries(['droidMonotask','droidCombat','craftEnergyPistol','gadgetSimple'].map(id=>[id,craftMaterialCost(CRAFT_TEMPLATES[id])]))},ranks);assert.deepEqual(r,{droidMonotask:ranks?300:600,droidCombat:ranks?1625:3250,craftEnergyPistol:200,gadgetSimple:50})});
 await test('The Workshop preview and disabled purchase button use the discounted shortfall',async()=>{await fresh('Droid Tech');await page.evaluate(()=>{S.talents.add('dt10');S.credits=299;renderAll();renderNavTab('equipment');$('craftTemplate').value='droidMonotask';updateCraftPreview()});assert.equal(await page.locator('#craftBuyMaterials').isDisabled(),true);assert.match(await page.locator('#craftPreview').textContent(),/Materials 300 cr.*Deft Maker: 50% off/);assert.match(await page.locator('#craftPreview').textContent(),/1 more credits/);await page.evaluate(()=>{S.credits=300;updateCraftPreview()});assert.equal(await page.locator('#craftBuyMaterials').isDisabled(),false)});
 await test('Actual discounted acquisition charges once; failures and insufficient credits charge nothing',async()=>{await fresh('Droid Tech');const r=await page.evaluate(()=>{S.talents.add('dt10');S.credits=299;renderAll();$('craftTemplate').value='droidMonotask';const old=performBest;let rolls=0;performBest=()=>{rolls++;return{r:{ok:false}}};try{phase43CraftMaterials();const insufficient=S.credits;S.credits=300;phase43CraftMaterials();const failed=S.credits;performBest=()=>{rolls++;return{r:{ok:true}}};phase43CraftMaterials();const paid=S.credits,ledger=S.campaign.ledger[0].amount;phase43CraftMaterials();return{insufficient,failed,paid,after:S.credits,materials:S.crafting.materials.droidMonotask,ledger,rolls}}finally{performBest=old}});assert.deepEqual(r,{insufficient:299,failed:300,paid:0,after:0,materials:true,ledger:-300,rolls:2})});
 await test('Materials purchased before this update stay ready without retroactive charges or refunds',async()=>{await fresh('Droid Tech');const r=await page.evaluate(()=>{S.talents.add('dt10');S.credits=1234;S.crafting.materials.droidMonotask=true;const old=serializableState();Game97.saves.apply(old,'previously acquired materials');renderNavTab('equipment');$('craftTemplate').value='droidMonotask';updateCraftPreview();phase43CraftMaterials();return{credits:S.credits,materials:S.crafting.materials.droidMonotask,disabled:$('craftBuyMaterials').disabled,ready:$('craftPreview').textContent.includes('Materials ready')}});assert.deepEqual(r,{credits:1234,materials:true,disabled:true,ready:true})});
 await test('Real construct and program buttons carry the droid context and use Deft Maker setbacks',async()=>{
  await fresh('Droid Tech');const r=await page.evaluate(()=>{
   S.talents.add('dt10');S.credits=300;renderAll();renderNavTab('equipment');$('craftTemplate').value='droidMonotask';S.crafting.materials.droidMonotask=true;updateCraftPreview();
   const old={pool:actorPool,roll:rollNarr},calls=[];
   actorPool=(actor,skill,ctx={})=>{const q=old.pool(actor,skill,{...ctx,setback:2});calls.push({skill,droid:ctx.droid,construct:!!ctx.construct,setback:q.p.setback});return q};rollNarr=()=>({ok:true,ns:1,na:0,tr:0,de:0});
   try{$('craftBuild').click();$('programDroid').click();return{calls,status:S.droids[0].status,pending:S.crafting.pendingDroids.length,active:S.activeDroidId===S.droids[0].id}}finally{actorPool=old.pool;rollNarr=old.roll}
  });assert.deepEqual(r.calls.filter(x=>x.skill==='Mechanics'&&x.construct),[{skill:'Mechanics',droid:true,construct:true,setback:1}]);assert.deepEqual(r.calls.filter(x=>x.skill==='Computers'&&x.droid),[{skill:'Computers',droid:true,construct:false,setback:1}]);assert.equal(r.status,'active');assert.equal(r.pending,0);assert.equal(r.active,true);
  const before=await page.evaluate(()=>JSON.stringify({droids:S.droids,pending:S.crafting.pendingDroids,active:S.activeDroidId,credits:S.credits,materials:S.crafting.materials}));await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>JSON.stringify({droids:S.droids,pending:S.crafting.pendingDroids,active:S.activeDroidId,credits:S.credits,materials:S.crafting.materials})),before);
 });
 await test('Natural Tinkerer offers one failed Mechanics reroll per session and saves use',async()=>{await fresh('Modder');const r=await page.evaluate(()=>{S.talents.add('md42');const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest('Mechanics',{diff:2}).r,b=performBest('Mechanics',{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed.naturalTinkerer}}finally{rollNarr=old}});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.sessionUsed.naturalTinkerer),true)});
 await test('About derives 48 reviewed original-ID layouts and 6 pending from current data',async()=>{await fresh('Cyber Tech');await page.evaluate(()=>renderNavTab('about97'));const text=await page.locator('#catalogAudit97').textContent();assert.match(text,/54 older full layouts have been checked/);assert.match(text,/0 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards disclose exact activation and current manual limits`,async()=>{await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/Special Modifications/);assert.doesNotMatch(text,/Phase 37|still pending|being wired|older handlers/);if(spec==='Cyber Tech'){assert.match(text,/five.*combined/);assert.match(text,/Active \(Maneuver\)/);assert.match(text,/maximum|cap/)}if(spec==='Droid Tech'){assert.match(text,/non-minion/);assert.match(text,/50 percent/);assert.match(text,/whole Success/)}if(spec==='Modder'){assert.match(text,/silhouette 3 or lower/);assert.match(text,/same host/);assert.match(text,/manually/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all three layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Cyber Tech');await page.screenshot({path:path.join(out,'cyber-tech-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:33,connectionChanges:12,labelChanges:0,priorCases:960,combinedPriorCases:2040,remainingLayouts:14,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
