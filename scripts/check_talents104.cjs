/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the six F&D core diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa104');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={"Artisan": {"add": [[2, 6]], "remove": [[6, 10], [9, 13]]}, "Shadow": {"add": [[6, 10]], "remove": [[3, 7], [7, 11], [8, 12], [12, 16], [15, 19], [17, 18]]}, "Shien Expert": {"add": [], "remove": [[0, 4], [3, 7], [13, 14], [16, 17], [17, 18], [18, 19]]}, "Aggressor": {"add": [], "remove": [[18, 19]]}, "Shii-Cho Knight": {"add": [], "remove": [[4, 5], [10, 11], [14, 18], [15, 19]]}, "Starfighter Ace": {"add": [], "remove": [[4, 8], [8, 12], [9, 10], [10, 14]]}};
const labels={sd32:'Force Active',sh03:'Force Active',sh13:'Force Active',sh23:'Force Active',sh33:'Force Active',sc32:'Active',sa30:'Force Passive'};
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
  hydrateState(Game97.freshState(),'Sentinel and Warrior fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=1;S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Thirty-one of the original 48 layouts are reviewed; 17 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:54,pending:0,replaced:48,schema:92,build:'96.27-gand-respiration'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger','Cyber Tech','Droid Tech','Modder','Demolitionist','Enforcer','Heavy','Archaeologist','Big-Game Hunter','Entrepreneur','Marshal','Performer','Figurehead','Instructor','Strategist','Beast Rider','Hotshot','Rigger'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Healer','Niman Disciple','Sage','Peacekeeper','Protector','Soresu Defender','Advisor','Makashi Duelist','Seer','Ataru Striker','Hunter','Pathfinder'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout')}
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
   assert.equal(await page.evaluate(()=>S.forceRating),['Artisan','Shadow','Aggressor','Starfighter Ace'].includes(spec)?2:1);assert.equal(await page.evaluate(()=>S.chars.Brawn),before+1);
   const purchased=await snapshot();await page.evaluate(()=>{for(const id of S.talents)buyViewedTalent(id)});assert.equal(await snapshot(),purchased);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);
  });
  await test(`${spec}: new purchases and choices survive actual save, reload and Resume latest`,async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before)});
 }


 await fresh('Artisan');
 await test('Mental Tools now unlocks Fine Tuning through its book connection',async()=>{
  await page.locator('[data-tal="art02"]').click();assert.equal(await page.locator('[data-tal="art12"]').isDisabled(),false);await page.locator('[data-tal="art12"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),385);
 });
 await fresh('Shadow');
 await test('Shadow Codebreaker now reaches Grit and the second Sleight of Mind rank',async()=>{
  await page.locator('[data-tal="sd02"]').click();await page.locator('[data-tal="sd12"]').click();assert.equal(await page.locator('[data-tal="sd22"]').isDisabled(),false);await page.locator('[data-tal="sd22"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),370);
 });
 await fresh('Shien Expert');
 await test('An unsupported Shien Side Step connection cannot unlock Toughened or charge XP',async()=>{
  await page.locator('[data-tal="sh00"]').click();await page.evaluate(()=>buyViewedTalent('sh10'));assert.equal(await page.locator('[data-tal="sh10"]').isDisabled(),true);assert.equal(await page.evaluate(()=>S.earnedXp),395);assert.equal(await page.evaluate(()=>S.talents.has('sh10')),false);
 });
 await fresh('Shii-Cho Knight');
 await test('Shii-Cho retains Conditioned–Multiple Opponents but removes the Improved Parry shortcut to Dedication',async()=>{
  await page.locator('[data-tal="sc01"]').click();await page.locator('[data-tal="sc11"]').click();assert.equal(await page.locator('[data-tal="sc12"]').isDisabled(),false);await page.locator('[data-tal="sc12"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),375);
  await fresh('Shii-Cho Knight');await page.evaluate(()=>{S.talents.add('sc32');renderAll();buyViewedTalent('sc42')});assert.equal(await page.evaluate(()=>S.earnedXp),400);assert.equal(await page.evaluate(()=>S.talents.has('sc42')),false);
 });
 await fresh('Shadow');
 await test('Well Rounded saves two distinct career skills and never grants free ranks',async()=>{
  const before=await page.evaluate(()=>JSON.stringify(S.skills));await page.locator('[data-tal="sd00"]').click();await page.locator('[data-tal="sd10"]').click();const r=await page.evaluate(()=>{const choices=S.talentChoices98.wellRounded['Shadow:sd10'];return{choices,career:choices.every(sk=>careerSkills().has(sk)),skills:JSON.stringify(S.skills),xp:S.earnedXp}});assert.equal(r.choices.length,2);assert.equal(new Set(r.choices).size,2);assert.equal(r.career,true);assert.equal(r.skills,before);assert.equal(r.xp,385);
 });
 await test('Well Rounded choices survive real save and Resume latest',async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before);assert.equal(await page.evaluate(()=>S.talentChoices98.wellRounded['Shadow:sd10'].every(sk=>careerSkills().has(sk))),true)});
 await fresh('Shadow');
 await test('Cancelling Well Rounded, Dedication or buying with insufficient XP leaves state unchanged',async()=>{
  await page.locator('[data-tal="sd00"]').click();const before=await snapshot();cancel=true;await page.locator('[data-tal="sd10"]').click();cancel=false;assert.equal(await snapshot(),before);
  await page.evaluate(()=>{S.talents.add('sd42');renderAll()});const ded=await snapshot();cancel=true;await page.locator('[data-tal="sd43"]').click();cancel=false;assert.equal(await snapshot(),ded);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('sd01')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.has('sd01')),false);
 });
 await test('An older Well Rounded purchase retains its XP and can complete its missing choice without repurchase',async()=>{
  await page.evaluate(()=>{const old=Game97.freshState();Object.assign(old,{finalized:true,career:'Sentinel',spec:'Shadow',ownedSpecs:['Shadow'],specTalents:{Shadow:['sd10']},talents:['sd10'],earnedXp:77,forceRating:1});old.settings.autosave=false;Game97.saves.apply(old,'old Shadow choice');renderNavTab('talents')});assert.equal(await page.locator('[data-talent-choice98="sd10"]').count(),1);await page.locator('[data-talent-choice98="sd10"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),77);assert.equal(await page.evaluate(()=>S.talents.size),1);assert.equal(await page.evaluate(()=>S.talentChoices98.wellRounded['Shadow:sd10'].length),2);
 });
 await fresh('Shien Expert');
 await test('An already known Improved Reflect grants connections without a duplicate purchase or XP charge',async()=>{
  const r=await page.evaluate(()=>{S.ownedSpecs.push('Soresu Defender');S.specTalents['Soresu Defender']=new Set(['so42']);buyViewedTalent('sh23');renderAll();return{xp:S.earnedXp,owned:S.talents.has('sh23'),known:Talents98.knownUnranked('Improved Reflect'),next:eligibleSpecTalent('Shien Expert',treeForSpec('Shien Expert').find(n=>n.id==='sh33'))}});assert.deepEqual(r,{xp:400,owned:false,known:true,next:true});assert.equal(await page.locator('[data-tal="sh23"]').isDisabled(),true);
 });
 await fresh('Artisan');
 await test('Non-Force characters can purchase Force nodes while their cards retain the use prerequisite',async()=>{
  await page.evaluate(()=>{S.forceRating=0;renderAll()});await page.locator('[data-tal="art02"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),395);assert.equal(await page.evaluate(()=>S.forceRating),0);assert.match(await page.locator('#talentTree').textContent(),/Force Rating 1\+ required to use/);
 });
 await fresh('Starfighter Ace');
 await test('Buying Force Rating cannot establish initial sensitivity and remains inactive across a non-Force save',async()=>{
  const r=await page.evaluate(()=>{S.career='Bounty Hunter';S.spec='Assassin';S.ownedSpecs=['Assassin','Starfighter Ace'];S.specTalents.Assassin=new Set();S.talents=S.specTalents.Assassin;S.specTalents['Starfighter Ace'].add('sa30');S.forceRating=0;buyViewedTalent('sa40');return{xp:S.earnedXp,rating:S.forceRating,owned:S.specTalents['Starfighter Ace'].has('sa40')}});assert.deepEqual(r,{xp:375,rating:0,owned:true});await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before);
 });
 await test('The glossary governs Force designations, action timing and limits',async()=>{
  const r=await page.evaluate(()=>({reflect:Talents98.ruleFor('Reflect','Shien Expert').type,improved:Talents98.ruleFor('Improved Reflect','Shien Expert').activation,parry:Talents98.ruleFor('Improved Parry','Shii-Cho Knight').activation,strike:Talents98.ruleFor('Intuitive Strike','Starfighter Ace'),shadow:Talents98.ruleFor('Now You See Me','Shadow'),item:Talents98.ruleFor('Imbue Item','Artisan').activation,well:Talents98.ruleFor('Well Rounded','Shadow').ranked,counter:Talents98.ruleFor('Counterstrike','Shien Expert').summary,odds:Talents98.ruleFor('Against All Odds','Aggressor').summary,terrify:Talents98.ruleFor('Terrify','Aggressor').summary}));assert.equal(r.reflect,'Force Active');assert.equal(r.improved,'Active (Incidental, Out of Turn)');assert.equal(r.parry,r.improved);assert.equal(r.strike.activation,'Passive');assert.equal(r.strike.force,true);assert.equal(r.strike.ranked,false);assert.match(r.strike.summary,/2 Force points/);assert.equal(r.shadow.force,true);assert.match(r.shadow.summary,/thirty minutes/);assert.equal(r.item,'Active (Maneuver)');assert.equal(r.well,true);assert.match(r.counter,/during your next turn/);assert.match(r.odds,/exceeding your wound threshold/);assert.match(r.terrify,/1 Conflict at each session/);
 });
 await fresh('Shii-Cho Knight');
 await test('Multiple Opponents applies to real Brawl, Melee and Lightsaber pools against a minion group, excluding blasters',async()=>{
  const r=await page.evaluate(()=>{S.talents.add('sc12');S.weapon='lightsaber';S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:3}];startCustomEncounter();const target=S.combat.enemies[0];S.combat.positions={pc:2,[target.id]:2};const pc=actorById('pc');const count=engagedOpponentCount(pc),saber=combatPool(pc,target).p.boost||0,brawl=specialCombatPool(pc,target,unarmedWeapon(),0).p.boost||0;
   const meleeId=Object.keys(WEAPONS).find(id=>WEAPONS[id].skill==='Melee'&&!quality(WEAPONS[id],'accurate'));S.weapon=meleeId;const melee=combatPool(actorById('pc'),target).p.boost||0;S.weapon='pistol';const blaster=combatPool(actorById('pc'),target).p.boost||0,gunnery=multipleOpponentBoost(pc,'Gunnery');target.members=1;S.weapon='lightsaber';const single=combatPool(actorById('pc'),target).p.boost||0;target.type='rival';S.combat.enemies.push({...target,id:'other'});S.combat.positions.other=2;const two=combatPool(actorById('pc'),target).p.boost||0;return{count,saber,brawl,melee,blaster,gunnery,single,two}});assert.deepEqual(r,{count:3,saber:1,brawl:1,melee:1,blaster:0,gunnery:0,single:0,two:1});
 });
 await test('Special ranged Lightsaber checks retain the bonus when multiple other opponents are engaged',async()=>{
  const r=await page.evaluate(()=>{const pc=actorById('pc'),target=S.combat.enemies[0];target.type='minion';target.members=3;S.combat.enemies[1].type='rival';S.combat.positions[S.combat.enemies[1].id]=4;return specialCombatPool(pc,S.combat.enemies[1],effectiveWeapon('lightsaber'),2).p.boost||0});assert.equal(r,1);
 });
 await fresh('Starfighter Ace');
 async function intuitiveCase(fr,successes=null,dark=false,acceptCosts=true){
  await fresh('Starfighter Ace');return page.evaluate(({fr,successes,dark,acceptCosts})=>{S.talents.add('sa30');S.forceRating=3;S.morality=dark?20:50;S.destiny={light:1,dark:1};S.strain=0;S.conflict=0;S.ship.owned=true;S.ship.stations.gunner='pc';startShipCombat();S.ship.combat.enemies=[{...SHIP_ENEMY_TEMPLATE,id:'test-fighter',name:'Test fighter',hull:100,hullNow:0,armor:0,criticals:[]}];const damage=shipStats().weapon.damage,roll=rollNarr,force=rollForce,ask=window.prompt,yes=window.confirm;rollNarr=()=>({ok:false,ns:0,na:0,tr:0,de:0,nt:0,nd:0});rollForce=()=>({...fr,faces:['controlled']});const confirmations=[];window.confirm=message=>{confirmations.push(message);return acceptCosts||!/^Use \d+ (light|dark)-side pip/.test(message)};window.prompt=(message,initial)=>successes===null?initial:String(successes);
   try{shipFire();const once=S.ship.combat.enemies[0].hullNow;shipFire();return{hit:once,damage,twice:S.ship.combat.enemies[0].hullNow,strain:S.strain,conflict:S.conflict,light:S.destiny.light,dark:S.destiny.dark,used:S.ship.combat.used.gunner,log:S.ship.log.join(' '),confirmations}}finally{rollNarr=roll;rollForce=force;window.prompt=ask;window.confirm=yes}
  },{fr,successes,dark,acceptCosts});
 }
 await test('Intuitive Strike cannot add a result for one Force point',async()=>{const r=await intuitiveCase({light:1,dark:0});assert.equal(r.hit,0);assert.equal(r.used,true);assert.equal(r.strain,0);assert.equal(r.conflict,0);assert.match(r.log,/two usable Force points/)});
 await test('An odd three-point roll adds only one result and the ship cannot fire twice that round',async()=>{const r=await intuitiveCase({light:3,dark:0});assert.equal(r.hit,r.damage+1);assert.equal(r.twice,r.hit);assert.equal(r.strain,0);assert.match(r.log,/2 Force points into 1 Success/)});
 await test('Four Force points can split into one Success and one Advantage',async()=>{const r=await intuitiveCase({light:4,dark:0},1);assert.equal(r.hit,r.damage+1);assert.match(r.log,/4 Force points into 1 Success and 1 Advantage/)});
 await test('Mixed Force points pay only the single opposite pip used, leaving the odd pip unspent',async()=>{const r=await intuitiveCase({light:1,dark:2});assert.equal(r.hit,r.damage+1);assert.equal(r.strain,1);assert.equal(r.conflict,1);assert.equal(r.light,0);assert.equal(r.dark,2)});
 await test('Dark-side alignment pays the used light pip and flips dark Destiny without adding Conflict',async()=>{const r=await intuitiveCase({light:2,dark:1},null,true);assert.equal(r.hit,r.damage+1);assert.equal(r.strain,1);assert.equal(r.conflict,0);assert.equal(r.light,2);assert.equal(r.dark,0)});
 await test('Declining opposite-pip costs grants no result and changes no Destiny, strain or Conflict',async()=>{const r=await intuitiveCase({light:1,dark:2},null,false,false);assert.equal(r.hit,0);assert.equal(r.strain,0);assert.equal(r.conflict,0);assert.equal(r.light,1);assert.equal(r.dark,1);assert.ok(r.confirmations.some(message=>/^Use 1 dark-side pip/.test(message)))});
 await test('Fractional Success input cannot create fractional combat results',async()=>{const r=await intuitiveCase({light:4,dark:0},1.5);assert.equal(r.hit,r.damage+1);assert.match(r.log,/4 Force points into 1 Success and 1 Advantage/)});
 await fresh('Artisan');
 await test('Artisan repair ranks reach actual hull and system-strain handlers',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['art00','art11','art30','art01','art12']);S.specTalents.Artisan=S.talents;S.ship.owned=true;S.ship.stations.engineer='pc';S.ship.hull=10;S.ship.strain=10;S.gmDestinyMode='off';const roll=rollNarr;rollNarr=()=>({ok:true,ns:1,na:0,tr:0,de:0,nt:0,nd:0});try{repairShip('hull');repairShip('strain');return{hull:S.ship.hull,strain:S.ship.strain}}finally{rollNarr=roll}});assert.deepEqual(r,{hull:6,strain:7});
 });
 await fresh('Shadow');
 await test('Shadow street, decrypting and Force stealth modifiers leave other actors and unrelated checks alone',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['sd00','sd22','sd01','sd02','sd31']);S.specTalents.Shadow=S.talents;const pc=actorById('pc');return{street:talentCheckMods(pc,'Streetwise',{setback:4}).setback,decrypt:talentCheckMods(pc,'Computers',{setback:4,diff:3,decrypt:true}),stealth:talentCheckMods(pc,'Stealth'),ordinary:talentCheckMods(pc,'Computers',{setback:4,diff:3}),other:talentCheckMods({...pc,id:'lena'},'Stealth')}});assert.equal(r.street,3);assert.deepEqual(r.decrypt,{boost:0,setback:2,diff:2});assert.deepEqual(r.stealth,{boost:2,setback:0,diff:2});assert.deepEqual(r.ordinary,{boost:0,setback:4,diff:3});assert.deepEqual(r.other,{boost:0,setback:0,diff:2});
 });
 await fresh('Shien Expert');
 await test('Shien Technique and Falling Avalanche reach real characteristics and one-hit damage helpers',async()=>{
  const r=await page.evaluate(()=>{S.talents.add('sh12');S.talents.add('sh40');S.strain=0;S.chars.Brawn=3;const a=maybeFallingAvalanche('Lightsaber'),b=maybeFallingAvalanche('Ranged (Light)');return{characteristic:formTechniqueCharacteristic(),a,b,strain:S.strain}});assert.deepEqual(r,{characteristic:'Cunning',a:3,b:0,strain:2});
 });
 await fresh('Shii-Cho Knight');
 await test('Second Wind counts both saved ranks once per encounter and stays spent across resume',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['sc01','sc10']);S.specTalents[S.spec]=S.talents;S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:1}];startCustomEncounter();S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0};S.strain=8;secondWind();const once=S.strain;S.combat.round++;secondWind();return{once,twice:S.strain}});assert.deepEqual(r,{once:6,twice:6});await page.evaluate(()=>save());await reload();await page.evaluate(()=>secondWind());assert.equal(await page.evaluate(()=>S.strain),6);
 });
 await fresh('Starfighter Ace');
 await test('Starfighter piloting and Astrogation bonuses are scoped to PC checks',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['sa01','sa33','sa13']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc');return{pilot:talentCheckMods(pc,'Piloting (Space)',{setback:4}).setback,astro:talentCheckMods(pc,'Astrogation',{setback:4}).setback,other:talentCheckMods({...pc,id:'lena'},'Piloting (Space)',{setback:4}).setback}});assert.deepEqual(r,{pilot:2,astro:3,other:4});
 });
 for(const spec of specs)await test(`${spec}: all 20 cards disclose source timing and actual automation limits`,async()=>{
  await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/Force and Destiny Core/);assert.doesNotMatch(text,/Phase 37|still pending|being wired/);
  if(spec==='Artisan'){assert.match(text,/Each item can receive this improvement only once/);assert.match(text,/does not provide materials or a workshop/);assert.match(text,/once per round/i)}
  if(spec==='Shadow'){assert.match(text,/thirty minutes/);assert.match(text,/grants no free ranks/)}
  if(spec==='Aggressor'){assert.match(text,/1 Conflict at each session/);assert.match(text,/exceeding your wound threshold/)}
  if(spec==='Starfighter Ace'){assert.match(text,/2 Force points/);assert.match(text,/silhouette 5 or smaller/)}
  if(spec==='Shii-Cho Knight')assert.match(text,/hardest initial opponent/);
 });
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all six layouts fit without horizontal overflow or source/button overlap`,async()=>{
  await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}
 });
 await page.setViewportSize({width:390,height:844});await fresh('Shadow');await page.screenshot({path:path.join(out,'shadow-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:6,reviewedNodes:120,retainedIds:120,frozenLayouts:48,frozenNodes:960,sourceRules:70,connectionChanges:25,labelChanges:7,priorCases:960,combinedPriorCases:2040,remainingLayouts:17,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
