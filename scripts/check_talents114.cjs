/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three Stay on Target diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa114');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={'Beast Rider':{add:[[13,14]],remove:[[6,10],[8,12],[13,17],[15,19]]},Hotshot:{add:[[6,7],[9,10],[10,11]],remove:[[4,8],[5,6],[7,11],[9,13],[17,18]]},Rigger:{add:[],remove:[[5,9],[7,11],[9,13],[14,15],[17,18],[18,19]]}};
const labels={br30:'Active',hot40:'Active'};
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
  hydrateState(Game97.freshState(),'Stay on Target fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');S.crew=[];
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('All original 48 layouts are reviewed; none remain and schema stays 92',async()=>{
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
  for(const [spec,printedPage]of [['Beast Rider',27],['Hotshot',29],['Rigger',31]])assert.deepEqual(await page.evaluate(s=>{const t=CharacterCatalog97.data.trees[s];return[t.bookPage,t.bookPdfPage,t.ruleSet]},spec),[printedPage,printedPage+1,'target114']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Ace.specs['Beast Rider']),['Athletics','Knowledge (Xenology)','Perception','Survival']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Ace.specs.Hotshot),['Cool','Coordination','Piloting (Planetary)','Piloting (Space)']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Ace.specs.Rigger),['Gunnery','Knowledge (Underworld)','Mechanics','Resilience']);
 });
 await test('All 37 scoped rules have explicit activation, ranks, source and resolution boundaries',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules114);assert.equal(Object.keys(rules).length,37);
  const ranked=['Beast Wrangler','Black Market Contacts','Bolstered Armor','Customized Cooling Unit','Dedication','Expert Handler','Expert Tracker','Fortified Vacuum Seal','Gearhead','Grit','High-G Training','Larger Project','Outdoorsman','Overstocked Ammo','Second Chances','Shortcut','Skilled Jockey','Toughened','Tuned Maneuvering Thrusters'];
  for(const[n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>20&&r.resolutionNote.length>20,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const [printed,names]of [[32,['Beast Wrangler','Bolstered Armor','Corellian Sendoff','Improved Corellian Sendoff','Customized Cooling Unit','Expert Handler','Fancy Paint Job','Fortified Vacuum Seal','High-G Training','Koiogran Turn','Larger Project']],[33,['Not Today','Overstocked Ammo','Reinforced Frame','Second Chances','Showboat','Signature Vehicle','Soothing Tone','Spur','Improved Spur','Supreme Spur','Tuned Maneuvering Thrusters']]])for(const n of names)assert.deepEqual([rules[n].page,rules[n].pdfPage,rules[n].source],[printed,printed+1,`Stay on Target · p.${printed}`]);
  assert.equal(rules['Improved Spur'].type,'Active');assert.equal(rules['Improved Dead to Rights'].type,'Active');assert.match(rules.Showboat.summary,/Triumph.*Despair.*without.*Success or Failure/);assert.match(rules['Koiogran Turn'].summary,/speed four.*two strain.*all opponents/);assert.match(rules['Corellian Sendoff'].summary,/two enemy.*close.*equal or smaller.*minor collision/);
  assert.match(rules['Signature Vehicle'].summary,/owned.*three.*Larger Project.*two characters/);assert.match(rules['Reinforced Frame'].summary,/Critical rating.*one higher/);assert.match(rules['Not Today'].summary,/Critical Hit is still suffered/);assert.match(rules['Soothing Tone'].summary,/Once per encounter while riding.*Average Knowledge.*Successes.*no strain threshold/);
  assert.match(rules['Improved Spur'].summary,/one strain.*maneuver.*Average/);assert.match(rules['Supreme Spur'].summary,/one strain to maintain/);assert.match(rules['Second Chances'].summary,/selected positive dice.*Force dice cannot/);
 });
 await test('Unaffordable purchases do not spend XP',async()=>{await fresh('Beast Rider');await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('br00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.size),0)});
 for(const [skill,ctx,expected]of [['Survival',{},0],['Survival',{beast:true},0],['Melee',{beast:true},0],['Perception',{beast:true},0],['Survival',{wrangle:true},2],['Discipline',{wrangle:true},2],['Survival',{beast:true,wrangle:true},2]])await test(`Beast Wrangler qualifies only explicit wrangling ${skill}/${JSON.stringify(ctx)}`,async()=>{await fresh('Beast Rider');const r=await page.evaluate(({skill,ctx})=>{S.talents=new Set(['br03','br21']);S.specTalents[S.spec]=S.talents;return actorPool(actorById('pc'),skill,{diff:2,...ctx}).p.boost},{skill,ctx});assert.equal(r,expected)});
 await test('Hunter beast context remains independent from Beast Wrangler context',async()=>{await fresh('Beast Rider');const r=await page.evaluate(()=>{const hunter=treeForSpec('Hunter').find(n=>n.name==='Hunter');S.ownedSpecs.push('Hunter');S.specTalents.Hunter=new Set([hunter.id]);S.talents=new Set(['br03','br21']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc'),get=ctx=>actorPool(pc,'Survival',{diff:2,...ctx}).p.boost;return{beast:get({beast:true}),wrangle:get({wrangle:true}),both:get({beast:true,wrangle:true})}});assert.deepEqual(r,{beast:1,wrangle:2,both:3})});
 for(const [skill,ctx,expected]of [['Survival',{},4],['Survival',{beast:true},4],['Survival',{riding:true},2],['Athletics',{riding:true},4],['Survival',{wrangle:true},4]])await test(`Expert Handler only removes riding Survival Setback ${skill}/${JSON.stringify(ctx)}`,async()=>{await fresh('Beast Rider');const r=await page.evaluate(({skill,ctx})=>{S.talents=new Set(['br13','br33']);S.specTalents[S.spec]=S.talents;return actorPool(actorById('pc'),skill,{diff:2,setback:4,...ctx}).p.setback},{skill,ctx});assert.equal(r,expected)});
 await test('Beast Rider supported checks keep forage, tracking and outdoor contexts distinct',async()=>{await fresh('Beast Rider');const r=await page.evaluate(()=>{S.talents=new Set(['br00','br02','br10','br11','br20']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc'),get=ctx=>actorPool(pc,'Survival',{diff:2,setback:4,...ctx}).p.setback;return{ordinary:get({}),forage:get({forage:true}),track:get({track:true}),outdoors:get({outdoors:true})}});assert.deepEqual(r,{ordinary:4,forage:2,track:2,outdoors:2})});
 await test('Skilled Jockey and Gearhead retain only their appropriate skill scopes',async()=>{await fresh('Rigger');const r=await page.evaluate(()=>{S.ownedSpecs=['Rigger','Hotshot'];S.specTalents.Rigger=new Set(['rig02','rig32']);S.specTalents.Hotshot=new Set(['hot02']);S.talents=S.specTalents.Rigger;const pc=actorById('pc'),get=sk=>actorPool(pc,sk,{diff:2,setback:4}).p.setback;return{mechanics:get('Mechanics'),planetary:get('Piloting (Planetary)'),space:get('Piloting (Space)'),other:get('Gunnery')}});assert.deepEqual(r,{mechanics:2,planetary:3,space:3,other:4})});
 await test('Natural Outdoorsman failed-check reroll and session use survive Resume',async()=>{await fresh('Beast Rider');const r=await page.evaluate(()=>{S.talents.add('br32');const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest('Resilience',{diff:2}).r,b=performBest('Survival',{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed.naturalOutdoorsman}}finally{rollNarr=old}});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.sessionUsed.naturalOutdoorsman),true)});
 await test('Purchased animal passives survive Resume with matching context effects',async()=>{await fresh('Beast Rider');await page.evaluate(()=>{S.talents=new Set(['br03','br21','br13','br33']);S.specTalents[S.spec]=S.talents;save()});await reload();assert.deepEqual(await page.evaluate(()=>{const p=actorPool(actorById('pc'),'Survival',{diff:2,setback:4,riding:true,wrangle:true}).p;return{boost:p.boost,setback:p.setback,force:S.forceRating}}),{boost:2,setback:2,force:0})});
 await test('About reports 54 reviewed original-ID layouts and none awaiting source checks',async()=>{await fresh('Rigger');await page.evaluate(()=>renderNavTab('about97'));const t=await page.locator('#catalogAudit97').textContent();assert.match(t,/54 older full layouts have been checked/);assert.match(t,/0 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards disclose manual limits`,async()=>{await fresh(spec);const t=await page.locator('#talentTree').textContent();assert.match(t,/Stay on Target/);assert.doesNotMatch(t,/Phase 37|being wired|still pending/);if(spec==='Beast Rider'){assert.match(t,/tame or wrangle/);assert.match(t,/rider’s cost is separate/)}if(spec==='Hotshot'){assert.match(t,/without that symbol’s usual Success or Failure/);assert.match(t,/two enemy vehicles/)}if(spec==='Rigger'){assert.match(t,/does not grant a free vehicle/);assert.match(t,/not an automatic full repair/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: three layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Beast Rider');await page.screenshot({path:path.join(out,'beast-rider-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:37,connectionChanges:19,labelChanges:2,priorCases:960,combinedPriorCases:2040,remainingLayouts:0,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
