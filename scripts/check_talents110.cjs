/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three Dangerous Covenants diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa110');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={Demolitionist:{add:[[6,7],[12,13]],remove:[[2,6],[7,11],[9,13],[13,17],[16,17]]},Enforcer:{add:[[5,6],[6,7],[8,9],[9,10],[12,13],[13,14]],remove:[[2,6],[4,8],[6,10],[10,14],[13,17],[14,18]]},Heavy:{add:[[4,5],[5,6],[6,7],[10,11],[12,13]],remove:[[2,6],[4,8],[6,10],[10,14],[13,17]]}};
const labels={dm21:'Active'};
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
  hydrateState(Game97.freshState(),'Dangerous Covenants fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');S.crew=[];
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Thirty-seven of the original 48 layouts are reviewed; 11 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:43,pending:11,replaced:48,schema:92,build:'96.14-dangerous-covenants-audit'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger','Cyber Tech','Droid Tech','Modder','Demolitionist','Enforcer','Heavy'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
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
 await test('Both Heavy career placements share the same reviewed original IDs',async()=>{assert.deepEqual(await page.evaluate(()=>({hired:CAREERS['Hired Gun'].specs.Heavy,soldier:CAREERS.Soldier.specs.Heavy})),{hired:['Gunnery','Perception','Ranged (Heavy)','Resilience'],soldier:['Gunnery','Perception','Ranged (Heavy)','Resilience']})});
 await test('Source pages, career skills and activation corrections match the diagrams and glossary',async()=>{
  for(const [s,p]of [['Demolitionist',29],['Enforcer',27],['Heavy',31]])assert.deepEqual(await page.evaluate(s=>{const t=CharacterCatalog97.data.trees[s];return[t.bookPage,t.bookPdfPage,t.ruleSet]},s),[p,p+1,'dangerous110']);
  assert.deepEqual(await page.evaluate(()=>CAREERS['Hired Gun'].specs.Demolitionist),['Computers','Cool','Mechanics','Skulduggery']);assert.deepEqual(await page.evaluate(()=>CAREERS['Hired Gun'].specs.Enforcer),['Brawl','Coercion','Knowledge (Underworld)','Streetwise']);
  assert.equal(await page.evaluate(()=>treeForSpec('Demolitionist').find(n=>n.id==='dm21').type),'Active');assert.equal(await page.evaluate(()=>treeForSpec('Demolitionist').find(n=>n.id==='dm40').type),'Passive');
 });
 await test('Independent starting Fearsome, Selective Detonation and Heavy Grit have no linked purchases',async()=>{for(const [s,id]of [['Enforcer','en02'],['Demolitionist','dm02'],['Heavy','hv02']]){await fresh(s);assert.equal(await page.locator(`[data-tal="${id}"]`).isDisabled(),false);assert.equal(await page.evaluate(id=>treeForSpec(S.spec).find(n=>n.id===id).links.length,id),0)}});
 await test('Canceled Dedication and insufficient XP cannot change purchases',async()=>{await fresh('Enforcer');await page.evaluate(()=>{S.talents.add('en40');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="en41"]').click();cancel=false;assert.equal(await snapshot(),before);await fresh('Heavy');await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('hv00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.size),0)});
 await test('All 35 scoped rules have checked ranks, activation, source pages and resolution notes',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules110);assert.equal(Object.keys(rules).length,35);
  const ranked=['Barrage','Black Market Contacts','Brace','Burly','Dedication','Defensive Stance','Durable','Enduring','Fearsome','Grit','Intimidating','Powerful Blast','Rapid Reaction','Second Wind','Selective Detonation','Side Step','Steady Nerves','Street Smarts','Toughened'];
  const pages={32:['Burly','Fearsome','Heavy Hitter','Heroic Resilience','Improvised Detonation','Improved Improvised Detonation','Loom','Master Grenadier','Powerful Blast','Rain of Death','Selective Detonation'],33:['Steady Nerves','Talk the Talk','Time to Go','Improved Time to Go','Walk the Walk']};
  for(const [n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>25&&r.resolutionNote.length>25,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const [p,ns]of Object.entries(pages))for(const n of ns){assert.equal(rules[n].page,+p,n);assert.equal(rules[n].pdfPage,+p+1,n);assert.equal(rules[n].source,`Dangerous Covenants · p.${p}`,n)}
  assert.equal(rules['Heroic Resilience'].activation,'Active (Incidental, Out of Turn)');assert.equal(rules['Improved Time to Go'].type,'Active');assert.equal(rules['Improved Improvised Detonation'].type,'Passive');assert.match(rules['Heroic Resilience'].summary,/one Destiny.*for that hit/);assert.match(rules['Heroic Resilience'].resolutionNote,/no once-per-encounter/);assert.match(rules['Selective Detonation'].summary,/Advantage or one Triumph/);assert.match(rules['Master Grenadier'].summary,/after a miss/);assert.match(rules['Heavy Hitter'].summary,/increase existing Breach/);
 });
 async function coercionCase({answer='2',room=20,winded=false,skill='Coercion',decline=false,upgrade=2,crew=false}={}){
  await fresh('Enforcer');return page.evaluate(o=>{S.talents=new Set(['en01','en20','en33']);S.specTalents[S.spec]=S.talents;S.strain=Math.max(0,strainThreshold()-o.room);S.conditions.winded=o.winded;const before=S.strain,old={roll:rollNarr,prompt:window.prompt,confirm:window.confirm,best:bestActor};let pool,prompts=0;
   if(o.crew)bestActor=(skill,ctx)=>actorPool({...actorById('pc'),id:'lena'},skill,ctx);
   rollNarr=p=>{pool={...p};return{ok:true,ns:1,na:0,tr:0,de:0}};window.prompt=()=>{prompts++;return o.answer};window.confirm=()=>!o.decline;
   try{performBest(o.skill,{diff:2,upgrade:o.upgrade});return{before,strain:S.strain,pool,prompts}}finally{rollNarr=old.roll;window.prompt=old.prompt;window.confirm=old.confirm;bestActor=old.best}
  },{answer,room,winded,skill,decline,upgrade,crew});
 }
 for(const answer of [null,'','0','-1','bad','Infinity','-Infinity'])await test(`Intimidating ${String(answer)} spends nothing and preserves Challenge dice`,async()=>{const r=await coercionCase({answer});assert.equal(r.strain,r.before);assert.equal(r.pool.challenge,2)});
 for(const [options,n]of [[{answer:'1.9'},1],[{answer:'0.9'},0],[{answer:'99'},3],[{room:1},1],[{room:0},0],[{winded:true},0],[{decline:true},0],[{skill:'Charm'},0],[{crew:true},0]])await test(`Intimidating whole costs and eligibility ${JSON.stringify(options)}`,async()=>{const r=await coercionCase(options);assert.equal(r.strain-r.before,n,JSON.stringify(r));assert.equal(r.pool.challenge,Math.max(0,2-n),JSON.stringify(r));assert.equal(r.pool.difficulty,Math.min(2,n),JSON.stringify(r));assert.ok(r.prompts<=1)});
 await test('Intimidating never deletes ordinary difficulty dice',async()=>{const r=await coercionCase({upgrade:0,answer:'3'});assert.equal(r.strain-r.before,3);assert.equal(r.pool.challenge,0);assert.equal(r.pool.difficulty,2)});
 await test('Committed recommendation/preview never prompts or spends Intimidating strain',async()=>{await fresh('Enforcer');const r=await page.evaluate(()=>{S.talents.add('en01');const old=window.prompt;let prompts=0;window.prompt=()=>{prompts++;return'1'};try{actorPool(actorById('pc'),'Coercion',{diff:2,upgrade:1,commit:true});return{strain:S.strain,prompts}}finally{window.prompt=old}});assert.deepEqual(r,{strain:0,prompts:0})});
 const battle=async(spec,ids)=>{await fresh(spec);await page.evaluate(ids=>{S.talents=new Set(ids);S.specTalents[S.spec]=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyOfficer',count:3}];const old=beginSlot;beginSlot=()=>{};try{startCustomEncounter()}finally{beginSlot=old}S.combat.slots.sort((a,b)=>Number(b.side==='PC')-Number(a.side==='PC'));S.combat.slotIndex=0;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0,started:true};for(const e of S.combat.enemies){e.soak=0;e.w=0;e.wt=1000}S.strain=0;renderCombat()},ids)};
 async function defenseCase({stance=false,answer='1',room=20,maneuvers=0,actionUsed=false,blocked=false,winded=false}={}){
  await battle(stance?'Enforcer':'Heavy',stance?['en21']:['hv20']);return page.evaluate(o=>{const C=S.combat;Object.assign(C.turn,{maneuvers:o.maneuvers,actionUsed:o.actionUsed});S.conditions.immobilized=o.blocked?1:0;S.conditions.winded=o.winded;S.strain=Math.max(0,strainThreshold()-o.room);const before=S.strain,old={ask:window.prompt,yes:window.confirm};window.prompt=()=>o.answer;window.confirm=()=>true;try{if(o.stance)defensiveStanceManeuver();else sideStepManeuver();return{before,strain:S.strain,maneuvers:C.turn.maneuvers,actionUsed:C.turn.actionUsed,defense:o.stance?(C.meleeDefUpgrade||0):(C.defUpgrade||0)}}finally{window.prompt=old.ask;window.confirm=old.yes}}, {stance,answer,room,maneuvers,actionUsed,blocked,winded});
 }
 for(const stance of [false,true]){
  for(const answer of [null,'','0','-1','bad','Infinity'])await test(`${stance?'Defensive Stance':'Side Step'} ${String(answer)} spends neither a maneuver nor strain`,async()=>{const r=await defenseCase({stance,answer});assert.equal(r.strain,r.before);assert.equal(r.maneuvers,0);assert.equal(r.defense,0)});
  for(const [options,n,m]of [[{answer:'1.9'},1,1],[{answer:'99'},1,1],[{room:0},0,0],[{blocked:true},0,0],[{winded:true},0,0],[{maneuvers:2},0,2],[{maneuvers:1,actionUsed:true,room:2},0,1],[{maneuvers:1,actionUsed:true,room:3},3,2]])await test(`${stance?'Defensive Stance':'Side Step'} reserves costs safely ${JSON.stringify(options)}`,async()=>{const r=await defenseCase({stance,...options});assert.equal(r.strain-r.before,n);assert.equal(r.maneuvers,m);assert.equal(r.defense,n?1:0)});
 }
 await test('Defensive strain and upgrade survive save/reload without another charge',async()=>{await defenseCase();const get=()=>page.evaluate(()=>JSON.stringify({strain:S.strain,turn:S.combat.turn,def:S.combat.defUpgrade}));const before=await get();await page.evaluate(()=>save());await reload();assert.equal(await get(),before)});
 for(const skill of ['Ranged (Heavy)','Gunnery','Ranged (Light)','Melee'])for(const range of [2,3,4])await test(`Barrage requires its combat skill and range: ${skill}/${range}`,async()=>{await fresh('Heavy');const n=await page.evaluate(({skill,range})=>{S.talents=new Set(['hv01','hv10','hv31']);S.specTalents[S.spec]=S.talents;return barrageDamage(skill,range)},{skill,range});assert.equal(n,['Ranged (Heavy)','Gunnery'].includes(skill)&&range>=3?3:0)});
 await test('An actual Barrage attack adds damage once; saved Auto-fire continuation does not repeat it',async()=>{await battle('Heavy',['hv01','hv10','hv31']);const r=await page.evaluate(()=>{S.weapon='repeater';S.inventory.push('repeater');S.combat.autoFireMode=true;const e=S.combat.enemies[0];S.combat.positions={pc:0,[e.id]:3};$('target').value='0';const old={roll:rollNarr,pool:combatPool};rollNarr=()=>({ok:true,ns:1,na:4,tr:0,de:0});combatPool=(a,t)=>({w:{...effectiveWeapon('repeater'),range:'Extreme'},p:makePool(2,0,3),skill:'Ranged (Heavy)',range:3,invalid:false});try{pcAttack();const damage=e.w,one=S.combat.pendingSpend.oneHitDamage98,base=effectiveWeapon('repeater').damage+1;return{damage,one,base}}finally{rollNarr=old.roll;combatPool=old.pool}});assert.equal(r.damage,r.base+3);assert.equal(r.one,3);await page.evaluate(()=>save());await reload();const after=await page.evaluate(()=>{const e=S.combat.enemies[0],before=e.w;extraHit();return{delta:e.w-before,extra:S.combat.pendingSpend.extraHits,adv:S.combat.pendingSpend.advantage}});assert.deepEqual(after,{delta:r.base,extra:1,adv:2})});
 async function blastCase({master=true,hit=true,actor='pc',adv=4,weapon='pulse'}={}){
  await battle('Demolitionist',master?['dm00','dm12','dm31','dm42']:['dm00','dm12','dm31']);return page.evaluate(o=>{const C=S.combat,t=C.enemies[0],other=C.enemies[1];C.positions={pc:0,[t.id]:2,[other.id]:2};startSymbolSpend({id:o.actor},t,WEAPONS[o.weapon],{ok:o.hit,ns:o.hit?1:0,na:o.adv,tr:0,de:0},0);renderSpendPanel();return{profile:blastProfile(),button:$('spBlast')?.textContent||null,before:t.w,other:other.w,adv:C.pendingSpend.advantage}},{master,hit,actor,adv,weapon});
 }
 for(const master of [false,true])for(const hit of [false,true])await test(`Master Grenadier cost, preview and actual payment (${master}/${hit})`,async()=>{const before=await blastCase({master,hit}),cost=(hit?2:3)-(master?1:0);assert.equal(before.profile.cost,cost);assert.equal(before.profile.rating,9);assert.match(before.button,new RegExp('^'+cost+'A Blast 9'));const after=await page.evaluate(()=>{activateBlast();return{adv:S.combat.pendingSpend.advantage,first:S.combat.enemies[0].w,second:S.combat.enemies[1].w}});assert.equal(after.adv,4-cost);assert.equal(after.first,hit?0:9);assert.equal(after.second,9)});
 await test('Master Grenadier does not reduce another actor’s cost or add the PC Blast ranks',async()=>{const r=await blastCase({actor:'lena',hit:true});assert.equal(r.profile.cost,2);assert.equal(r.profile.rating,6)});
 await test('Insufficient Blast Advantage cannot spend or damage targets',async()=>{await blastCase({adv:0});const r=await page.evaluate(()=>{activateBlast();return{adv:S.combat.pendingSpend.advantage,damage:S.combat.enemies.reduce((n,e)=>n+e.w,0),button:!!$('spBlast')}});assert.deepEqual(r,{adv:0,damage:0,button:false})});
 await test('Powerful Blast cannot give an ordinary blaster a Blast quality',async()=>{const r=await blastCase({weapon:'pistol'});assert.equal(r.profile,null);assert.equal(r.button,null);const result=await page.evaluate(()=>{activateBlast();return{adv:S.combat.pendingSpend.advantage,damage:S.combat.enemies.reduce((n,e)=>n+e.w,0)}});assert.deepEqual(result,{adv:4,damage:0})});
 await test('Natural Enforcer offers one saved failed Coercion or Streetwise reroll',async()=>{await fresh('Enforcer');const r=await page.evaluate(()=>{S.talents.add('en12');const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest('Coercion',{diff:2}).r,b=performBest('Streetwise',{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed.naturalEnforcer}}finally{rollNarr=old}});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.sessionUsed.naturalEnforcer),true)});
 await test('Steady Nerves and Street Smarts apply only to their PC skills',async()=>{await fresh('Demolitionist');const r=await page.evaluate(()=>{S.ownedSpecs=['Demolitionist','Enforcer'];S.specTalents.Demolitionist=new Set(['dm03','dm22']);S.specTalents.Enforcer=new Set(['en03','en31']);S.talents=S.specTalents.Demolitionist;const pc=actorById('pc'),get=(skill,actor=pc)=>talentCheckMods(actor,skill,{setback:4}).setback;return{cool:get('Cool'),skulduggery:get('Skulduggery'),streetwise:get('Streetwise'),knowledge:get('Knowledge (Underworld)'),coercion:get('Coercion'),other:get('Cool',{...pc,id:'lena'})}});assert.deepEqual(r,{cool:2,skulduggery:2,streetwise:2,knowledge:2,coercion:4,other:4})});
 await test('About derives 43 reviewed original-ID layouts and 11 pending',async()=>{await fresh('Heavy');await page.evaluate(()=>renderNavTab('about97'));const text=await page.locator('#catalogAudit97').textContent();assert.match(text,/43 older full layouts have been checked/);assert.match(text,/11 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards explain current activation and manual boundaries`,async()=>{await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/Dangerous Covenants/);assert.doesNotMatch(text,/Phase 37|still pending|being wired|older handlers/);if(spec==='Demolitionist'){assert.match(text,/after a miss/);assert.match(text,/Advantage or one Triumph/);assert.match(text,/glossary labels this improvement Passive/)}if(spec==='Enforcer'){assert.match(text,/whole-strain/);assert.match(text,/engaged with you/);assert.match(text,/Melee-only/)}if(spec==='Heavy'){assert.match(text,/for that hit/);assert.match(text,/one hit only/);assert.match(text,/Cumbersome/);assert.match(text,/manually/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all three layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Heavy');await page.screenshot({path:path.join(out,'heavy-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:35,connectionChanges:29,labelChanges:1,priorCases:960,combinedPriorCases:2040,remainingLayouts:11,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
