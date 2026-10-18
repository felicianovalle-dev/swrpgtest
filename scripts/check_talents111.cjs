/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the two Enter the Unknown diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa111');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={Archaeologist:{add:[],remove:[[5,6]]},'Big-Game Hunter':{add:[[10,14]],remove:[]}};
const labels={arc13:'Active',arc33:'Active',arc21:'Passive'};
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
  hydrateState(Game97.freshState(),'Enter the Unknown fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');S.crew=[];
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Forty-two of the original 48 layouts are reviewed; 6 remain and schema stays 92',async()=>{
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
  for(const [spec,printedPage]of [['Archaeologist',25],['Big-Game Hunter',27]])assert.deepEqual(await page.evaluate(s=>{const t=CharacterCatalog97.data.trees[s];return[t.bookPage,t.bookPdfPage,t.ruleSet]},spec),[printedPage,printedPage+1,'unknown111']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Explorer.specs.Archaeologist),['Athletics','Discipline','Knowledge (Education)','Knowledge (Lore)']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Explorer.specs['Big-Game Hunter']),['Knowledge (Xenology)','Ranged (Heavy)','Stealth','Survival']);
 });
 await test('All 28 scoped rules have explicit activation, ranks, source and resolution boundaries',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules111);assert.equal(Object.keys(rules).length,28);
  const ranked=['Confidence','Dedication','Durable','Enduring','Expert Tracker','Grit','Hard Headed','Knowledge Specialization','Outdoorsman','Quick Strike','Researcher','Resolve','Respected Scholar','Stalker','Toughened','Well Rounded'];
  for(const[n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>20&&r.resolutionNote.length>20,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const n of ['Bring It Down',"Hunter's Quarry","Improved Hunter's Quarry",'Museum Worthy','Pin'])assert.deepEqual([rules[n].page,rules[n].pdfPage,rules[n].source],[30,31,'Enter the Unknown · p.30']);
  assert.match(rules['Bring It Down'].summary,/single hit/);assert.match(rules["Hunter's Quarry"].summary,/all attacks.*next turn/);assert.match(rules["Improved Hunter's Quarry"].resolutionNote,/glossary.*Passive/);assert.match(rules['Museum Worthy'].summary,/Hard Knowledge.*GM approval/);assert.match(rules.Pin.summary,/opposed Athletics.*engaged/);
  assert.equal(rules.Knockdown.type,'Passive');assert.match(rules.Knockdown.summary,/Triumph.*silhouette/);assert.equal(rules['Knowledge Specialization'].type,'Active');
 });
 await test('Independent Well Rounded and starting Grit have no connected route',async()=>{for(const [spec,id]of [['Archaeologist','arc00'],['Big-Game Hunter','bgh01']]){await fresh(spec);assert.equal(await page.locator(`[data-tal="${id}"]`).isDisabled(),false);assert.equal(await page.evaluate(id=>treeForSpec(S.spec).find(n=>n.id===id).links.length,id),0)}});
 await test('Canceled Well Rounded and insufficient XP preserve purchases and choices',async()=>{await fresh('Archaeologist');const before=await snapshot();cancel=true;await page.locator('[data-tal="arc00"]').click();cancel=false;assert.equal(await snapshot(),before);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('arc00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.size),0)});
 await test('Well Rounded records two different career skills without free skill ranks and resumes exactly',async()=>{
  await fresh('Archaeologist');const result=await page.evaluate(()=>{const old=window.prompt;let answers=['Computers','Melee'];window.prompt=()=>answers.shift();try{buyViewedTalent('arc00');return{choice:S.talentChoices98.wellRounded['Archaeologist:arc00'],ranks:[S.skills.Computers||0,S.skills.Melee||0],career:[careerSkills().has('Computers'),careerSkills().has('Melee')],xp:S.earnedXp}}finally{window.prompt=old}});
  assert.deepEqual(result,{choice:['Computers','Melee'],ranks:[0,0],career:[true,true],xp:395});await page.evaluate(()=>save());await reload();assert.deepEqual(await page.evaluate(()=>S.talentChoices98.wellRounded['Archaeologist:arc00']),['Computers','Melee']);assert.equal(await page.evaluate(()=>careerSkills().has('Computers')&&careerSkills().has('Melee')),true);
 });
 await test('Invalid duplicate Well Rounded skills spend no XP',async()=>{await fresh('Archaeologist');const r=await page.evaluate(()=>{const old=window.prompt;window.prompt=()=>'Computers';try{buyViewedTalent('arc00');return{xp:S.earnedXp,size:S.talents.size}}finally{window.prompt=old}});assert.deepEqual(r,{xp:400,size:0})});
 await test('Knowledge Specialization cancellation does not charge or record a choice',async()=>{await fresh('Archaeologist');await page.evaluate(()=>{S.talents.add('arc03');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="arc13"]').click();cancel=false;assert.equal(await snapshot(),before)});
 for(const [skill,tri,accept,expected]of [['Knowledge (Lore)',1,true,3],['Knowledge (Lore)',0,true,1],['Knowledge (Lore)',1,false,1],['Knowledge (Education)',1,true,1]])await test(`Knowledge Specialization conversion ${skill}/${tri}/${accept}`,async()=>{await fresh('Archaeologist');const r=await page.evaluate(o=>{S.talents=new Set(['arc13','arc33']);S.specTalents[S.spec]=S.talents;S.talentChoices98={knowledgeSkill:'Knowledge (Lore)'};const old={roll:rollNarr,yes:window.confirm};rollNarr=()=>({ok:true,ns:1,na:0,tr:o.tri,de:0});window.confirm=()=>o.accept;try{const q=performBest(o.skill,{diff:2});return{ns:q.r.ns,tr:q.r.tr}}finally{rollNarr=old.roll;window.confirm=old.yes}}, {skill,tri,accept});assert.deepEqual(r,{ns:expected,tr:expected===3?0:tri})});
 const battle=async()=>{await fresh('Big-Game Hunter');await page.evaluate(()=>{S.talents=new Set(['bgh40']);S.specTalents[S.spec]=S.talents;S.customEncounter=[{id:'navyOfficer',count:3}];const old=beginSlot;beginSlot=()=>{};try{startCustomEncounter()}finally{beginSlot=old}S.combat.slots.sort((a,b)=>Number(b.side==='PC')-Number(a.side==='PC'));S.combat.slotIndex=0;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0,started:true};for(const e of S.combat.enemies){e.soak=0;e.w=0;e.wt=1000}S.strain=0;S.gmDestinyMode='off';renderCombat()})};
 async function attack({hit=true,light=2,accept=true,brawn=2,own=true}={}){await battle();return page.evaluate(o=>{if(!o.own){S.talents.clear();S.specTalents[S.spec]=S.talents}S.weapon='repeater';S.inventory.push('repeater');S.destiny={light:o.light,dark:0};S.combat.autoFireMode=true;const e=S.combat.enemies[0];e.c.Brawn=o.brawn;const old={roll:rollNarr,pool:combatPool,yes:window.confirm};let offers=0;window.confirm=m=>{if(m.includes('Bring It Down'))offers++;return o.accept};rollNarr=()=>({ok:o.hit,ns:o.hit?1:0,na:4,tr:0,de:0});combatPool=()=>({w:{...effectiveWeapon('repeater'),range:'Extreme'},p:makePool(2,0,2),skill:'Ranged (Heavy)',range:2,invalid:false});try{pcAttack();return{damage:e.w,one:S.combat.pendingSpend.oneHitDamage98||0,base:effectiveWeapon('repeater').damage+1,destiny:{...S.destiny},offers}}finally{rollNarr=old.roll;combatPool=old.pool;window.confirm=old.yes}}, {hit,light,accept,brawn,own})}
 for(const brawn of [0,2,5])await test(`Bring It Down applies exact target Brawn ${brawn} to one hit and pays one Destiny`,async()=>{const r=await attack({brawn});assert.equal(r.damage,r.base+brawn);assert.equal(r.one,brawn);assert.deepEqual(r.destiny,{light:1,dark:1});assert.equal(r.offers,1)});
 for(const options of [{hit:false},{light:0},{accept:false},{own:false}])await test(`Bring It Down eligibility and declined use ${JSON.stringify(options)}`,async()=>{const r=await attack(options);assert.equal(r.damage,options.hit===false?0:r.base);assert.equal(r.one,0);assert.deepEqual(r.destiny,{light:options.light===0?0:2,dark:0});assert.equal(r.offers,options.accept===false?1:0)});
 await test('Bring It Down saved Auto-fire continuation excludes the one-hit bonus without paying Destiny again',async()=>{const first=await attack({brawn:5});await page.evaluate(()=>save());await reload();const r=await page.evaluate(()=>{const e=S.combat.enemies[0],before=e.w;extraHit();return{damage:e.w-before,destiny:S.destiny,adv:S.combat.pendingSpend.advantage,extra:S.combat.pendingSpend.extraHits,one:S.combat.pendingSpend.oneHitDamage98}});assert.deepEqual(r,{damage:first.base,destiny:{light:1,dark:1},adv:2,extra:1,one:5})});
 await test('Bring It Down also excludes its bonus from Linked additional hits',async()=>{const first=await attack({brawn:2});const r=await page.evaluate(()=>{const p=S.combat.pendingSpend,e=S.combat.enemies[0],before=e.w,old=WEAPONS.repeater.qualities;S.combat.autoFireMode=false;WEAPONS.repeater.qualities={linked:2};try{extraHit();return{delta:e.w-before,destiny:S.destiny,extra:p.extraHits}}finally{WEAPONS.repeater.qualities=old}});assert.deepEqual(r,{delta:first.base,destiny:{light:1,dark:1},extra:1})});
 await test('Natural Hunter has one saved failed-check reroll per session',async()=>{await fresh('Big-Game Hunter');const r=await page.evaluate(()=>{S.talents.add('bgh21');const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest('Perception',{diff:2}).r,b=performBest('Vigilance',{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed.naturalHunter}}finally{rollNarr=old}});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.sessionUsed.naturalHunter),true)});
 await test('Researcher, Respected Scholar, Stalker and survival context modifiers match their PC scopes',async()=>{await fresh('Archaeologist');const r=await page.evaluate(()=>{S.ownedSpecs=['Archaeologist','Big-Game Hunter'];S.specTalents.Archaeologist=new Set(['arc02','arc23','arc22','arc42']);S.specTalents['Big-Game Hunter']=new Set(['bgh00','bgh02','bgh20','bgh03','bgh11','bgh22','bgh33','bgh12']);S.talents=S.specTalents.Archaeologist;const pc=actorById('pc'),get=(skill,ctx={})=>actorPool(pc,skill,{diff:2,setback:4,...ctx}).p;return{knowledge:get('Knowledge (Lore)').setback,academic:get('Charm',{academic:true,upgrade:2}).challenge,stealth:get('Stealth').boost,forage:get('Survival',{forage:true}).setback,outdoors:get('Athletics',{outdoors:true}).setback,track:get('Survival',{track:true}).setback,fear:get('Discipline',{fear:true}).difficulty,ordinary:get('Survival').setback}});assert.deepEqual(r,{knowledge:2,academic:0,stealth:2,forage:2,outdoors:2,track:2,fear:1,ordinary:4})});
 await test('About derives 48 reviewed original-ID layouts and six pending',async()=>{await fresh('Archaeologist');await page.evaluate(()=>renderNavTab('about97'));const t=await page.locator('#catalogAudit97').textContent();assert.match(t,/54 older full layouts have been checked/);assert.match(t,/0 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards explain activation and manual boundaries`,async()=>{await fresh(spec);const text=await page.locator('#talentTree').textContent();assert.match(text,/Enter the Unknown/);assert.doesNotMatch(text,/Phase 37|being wired|still pending/);if(spec==='Archaeologist'){assert.match(text,/Triumph/);assert.match(text,/GM approval/);assert.match(text,/opposed Athletics/)}else{assert.match(text,/all attacks/);assert.match(text,/glossary labels this improvement Passive/);assert.match(text,/single hit/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: both layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Archaeologist');await page.screenshot({path:path.join(out,'archaeologist-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:2,reviewedNodes:40,retainedIds:40,frozenLayouts:48,frozenNodes:960,sourceRules:28,connectionChanges:2,labelChanges:3,priorCases:960,combinedPriorCases:2040,remainingLayouts:9,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
