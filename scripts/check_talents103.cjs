/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the six F&D core diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa103');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={
 Advisor:{add:[],remove:[[5,9],[13,17],[18,19]]},
 'Makashi Duelist':{add:[[18,19]],remove:[[0,4],[2,6],[3,7],[10,11],[13,14],[14,18]]},
 Seer:{add:[[9,10]],remove:[[15,19]]},
 'Ataru Striker':{add:[],remove:[[1,5],[7,11]]},
 Hunter:{add:[[2,6]],remove:[[7,11]]},
 Pathfinder:{add:[],remove:[[5,9],[7,11],[13,14],[13,17],[15,19]]}
};
const labels={mk31:'Active',at11:'Force Active',at21:'Force Active',at23:'Active',hu32:'Passive',hu42:'Force Passive',pf20:'Force Passive'};
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
  hydrateState(Game97.freshState(),'Mystic and Seeker fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=1;S.crew=[];renderAll();renderNavTab('talents');
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,knowledge:S.talentChoices98?.knowledgeSkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Thirty-one of the original 48 layouts are reviewed; 17 remain and schema stays 92',async()=>{
  assert.equal(Object.keys(fixture.trees).length,48);assert.equal(Object.values(fixture.trees).flat().length,960);
  assert.deepEqual(await page.evaluate(()=>CharacterCatalog97.coverage()),{careers:20,placements:118,species:44,trees:112,universal:17,full:112,simplified:0,prototype:0});
  assert.deepEqual(await page.evaluate(()=>({audited:Object.values(CharacterCatalog97.data.trees).filter(r=>r.auditedExisting).length,pending:[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(s=>CharacterCatalog97.status(s)==='Full layout in saved build').length,replaced:Talents98.replaced.length,schema:BUILD_INFO.saveSchema,build:BUILD_INFO.version})),{audited:43,pending:11,replaced:48,schema:92,build:'96.14-dangerous-covenants-audit'});
 });
 for(const [spec,old]of Object.entries(fixture.trees))await test(`${spec}: original IDs and tiers survive; only reviewed source changes occur`,async()=>{
  const tree=await page.evaluate(s=>treeForSpec(s),spec);
  if(!deltas[spec]){
   if(['Assassin','Scoundrel','Slicer','Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger','Cyber Tech','Droid Tech','Modder','Demolitionist','Enforcer','Heavy'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}
   if(['Artisan','Shadow','Shien Expert','Aggressor','Shii-Cho Knight','Starfighter Ace'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout');return}

   if(['Healer','Niman Disciple','Sage','Peacekeeper','Protector','Soresu Defender'].includes(spec)){assert.deepEqual(tree.map(n=>[n.id,n.name,n.row,n.col,n.cost]),old.map(n=>[n.id,n.name,n.row,n.col,n.cost]));assert.equal(await page.evaluate(s=>CharacterCatalog97.status(s),spec),'Reviewed layout')}
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
   assert.equal(await page.evaluate(()=>S.forceRating),spec==='Seer'?3:['Advisor','Hunter','Pathfinder'].includes(spec)?2:1);assert.equal(await page.evaluate(()=>S.chars.Brawn),before+(spec==='Seer'?0:1));
   const purchased=await snapshot();await page.evaluate(()=>{for(const id of S.talents)buyViewedTalent(id)});assert.equal(await snapshot(),purchased);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);
  });
  await test(`${spec}: new purchases and choices survive actual save, reload and Resume latest`,async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before)});
 }

 await fresh('Hunter');
 await test('The restored Expert Tracker link makes Hunter purchasable for the exact XP',async()=>{
  await page.locator('[data-tal="hu02"]').click();assert.equal(await page.locator('[data-tal="hu12"]').isDisabled(),false);await page.locator('[data-tal="hu12"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),385);
 });
 await fresh('Seer');
 await test('Seer Grit now connects to Forewarning without an invented Dodge route to Force Rating',async()=>{
  await page.locator('[data-tal="se01"]').click();await page.locator('[data-tal="se11"]').click();await page.locator('[data-tal="se21"]').click();assert.equal(await page.locator('[data-tal="se22"]').isDisabled(),false);await page.locator('[data-tal="se22"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),355);
  await fresh('Seer');await page.evaluate(()=>{S.talents.add('se33');renderAll();buyViewedTalent('se43')});assert.equal(await page.evaluate(()=>S.earnedXp),400);assert.equal(await page.evaluate(()=>S.talents.has('se43')),false);
 });
 await fresh('Makashi Duelist');
 await test('Top-row Grit cannot unlock Parry through a removed connection or charge XP',async()=>{
  await page.locator('[data-tal="mk00"]').click();await page.evaluate(()=>buyViewedTalent('mk10'));assert.equal(await page.locator('[data-tal="mk10"]').isDisabled(),true);assert.equal(await page.evaluate(()=>S.earnedXp),395);assert.equal(await page.evaluate(()=>S.talents.has('mk10')),false);
 });
 await fresh('Pathfinder');
 await test('Pathfinder keeps the book connection from Quick Movement to Natural Outdoorsman',async()=>{
  await page.evaluate(()=>{S.talents.add('pf32');renderAll()});assert.equal(await page.locator('[data-tal="pf42"]').isDisabled(),false);await page.locator('[data-tal="pf42"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),375);
 });
 await fresh('Ataru Striker');
 await test('Force talents remain purchasable at rating zero while cards explain the use prerequisite',async()=>{
  await page.evaluate(()=>{S.forceRating=0;renderAll()});await page.locator('[data-tal="at02"]').click();await page.locator('[data-tal="at12"]').click();assert.equal(await page.evaluate(()=>S.earnedXp),385);assert.equal(await page.evaluate(()=>S.forceRating),0);assert.match(await page.locator('#talentTree').textContent(),/Force Rating 1\+ required to use/);
 });
 await fresh('Advisor');
 await test('Cancelling Dedication and insufficient XP do not add purchases or modify characteristics',async()=>{
  await page.evaluate(()=>{S.talents.add('ad30');renderAll()});const before=await snapshot();cancel=true;await page.locator('[data-tal="ad40"]').click();cancel=false;assert.equal(await snapshot(),before);await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('ad00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.has('ad00')),false);
 });
 await fresh('Hunter');
 await test('Sixth Sense uses the ordinary ranked F&D rule and keeps the AoR variant unranked',async()=>{
  const r=await page.evaluate(()=>{
   const other=treeForSpec('Ambassador').find(n=>n.name==='Sixth Sense');S.career='Bounty Hunter';S.spec='Assassin';S.ownedSpecs=['Assassin','Hunter','Ambassador'];S.specTalents.Assassin=new Set();S.specTalents.Ambassador=new Set([other.id]);S.talents=S.specTalents.Assassin;S.forceRating=0;S.specTalents.Hunter.add('hu33');renderAll();
   const before=S.earnedXp,ranked=Talents98.ruleFor('Sixth Sense','Hunter'),aor=Talents98.ruleFor('Sixth Sense','Ambassador');buyViewedTalent('hu32');const defense=playerDefense('ranged'),melee=playerDefense('melee');S.talentView='Ambassador';const duplicate=Talents98.knownUnranked('Sixth Sense');buyViewedTalent(other.id);
   return{owned:S.specTalents.Hunter.has('hu32'),spent:before-S.earnedXp,force:S.forceRating,ranked:ranked.ranked,forceTalent:ranked.force,aor:aor.ranked,duplicate,defense,melee};
  });assert.deepEqual(r,{owned:true,spent:20,force:0,ranked:true,forceTalent:false,aor:false,duplicate:true,defense:2,melee:0});
 });
 await test('Both saved Sixth Sense ranks and their defense survive save and actual resume',async()=>{await page.evaluate(()=>save());const before=await snapshot();await reload();assert.equal(await snapshot(),before);assert.equal(await page.evaluate(()=>playerDefense('ranged')),2)});
 await test('The glossary governs timing, Force labels, animal range and Conditioned errata',async()=>{
  const r=await page.evaluate(()=>{
   const one=(name,spec)=>{const v=Talents98.ruleFor(name,spec);return{activation:v.activation,ranked:v.ranked,force:v.force}};
   return{feint:one('Feint','Makashi Duelist'),parry:one('Improved Parry','Ataru Striker'),shot:one('Intuitive Shot','Hunter'),empathy:one('Animal Empathy','Pathfinder'),bond:one('Animal Bond','Pathfinder'),movement:one('Quick Movement','Pathfinder'),mental:Talents98.ruleFor('Mental Bond','Pathfinder').summary,errata:Talents98.ruleFor('Conditioned','Ataru Striker').errata};
  });assert.deepEqual(r.feint,{activation:'Passive',ranked:true,force:false});assert.deepEqual(r.parry,{activation:'Active (Incidental, Out of Turn)',ranked:false,force:false});assert.deepEqual(r.shot,{activation:'Passive',ranked:false,force:true});assert.deepEqual(r.empathy,r.shot);assert.deepEqual(r.bond,r.shot);assert.deepEqual(r.movement,{activation:'Active (Incidental)',ranked:false,force:true});assert.match(r.mental,/extreme range/);assert.match(r.errata,/Conditioned ranks, not Coordination/);
 });
 await fresh('Makashi Duelist');
 await test('Duelist training affects real Melee and Lightsaber pools only against one engaged opponent',async()=>{
  const r=await page.evaluate(()=>{
   S.talents.add('mk12');S.weapon='lightsaber';S.gmDestinyMode='off';S.customEncounter=[{id:'navyTrooper',count:3}];startCustomEncounter();const target=S.combat.enemies[0];S.combat.positions={pc:2,[target.id]:2};const pc=actorById('pc');
   const group=combatPool(pc,target).p.boost||0,specialGroup=specialCombatPool(pc,target,effectiveWeapon('lightsaber'),0).p.boost||0;
   target.type='rival';target.members=1;const single=combatPool(pc,target).p.boost||0,specialSingle=specialCombatPool(pc,target,effectiveWeapon('lightsaber'),0).p.boost||0;
   const meleeId=Object.keys(WEAPONS).find(id=>WEAPONS[id].skill==='Melee'&&!quality(WEAPONS[id],'accurate'));S.weapon=meleeId;const melee=combatPool(actorById('pc'),target).p.boost||0;
   S.weapon='pistol';const ranged=combatPool(actorById('pc'),target).p.boost||0;S.combat.positions[target.id]=3;const short=duelistTrainingBoost(actorById('pc'),'Lightsaber',1);
   S.weapon=meleeId;S.combat.positions[target.id]=2;S.combat.enemies.push({...target,id:'other'});S.combat.positions.other=2;const multiple=combatPool(actorById('pc'),target).p.boost||0;
   return{group,specialGroup,single,specialSingle,melee,ranged,short,multiple};
  });assert.deepEqual(r,{group:0,specialGroup:0,single:1,specialSingle:1,melee:1,ranged:0,short:0,multiple:0});
 });
 await test('Makashi and Ataru techniques choose the correct actual Lightsaber characteristics',async()=>{
  await fresh('Makashi Duelist');await page.evaluate(()=>S.talents.add('mk11'));assert.equal(await page.evaluate(()=>formTechniqueCharacteristic()),'Presence');await fresh('Ataru Striker');await page.evaluate(()=>S.talents.add('at12'));assert.equal(await page.evaluate(()=>formTechniqueCharacteristic()),'Agility');
 });
 await fresh('Ataru Striker');
 await test('Two Conditioned ranks remove two Athletics or Coordination setbacks and leave other skills alone',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['at00','at33']);S.specTalents[S.spec]=S.talents;const pc=actorById('pc');return ['Athletics','Coordination','Mechanics'].map(sk=>talentCheckMods(pc,sk,{setback:4}).setback)});assert.deepEqual(r,[2,2,4]);
 });
 await fresh('Hunter');
 await test('Tracking, beast checks, Keen Eyed and Uncanny Senses reach the existing check handlers',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['hu01','hu12','hu02','hu11','hu21','hu13','hu23']);S.specTalents.Hunter=S.talents;const pc=actorById('pc');return{tracking:talentCheckMods(pc,'Survival',{setback:4,track:true}),beast:talentCheckMods(pc,'Survival',{beast:true}),perception:talentCheckMods(pc,'Perception',{setback:4}),vigilance:talentCheckMods(pc,'Vigilance',{setback:4}),ordinary:talentCheckMods(pc,'Survival',{setback:4})}});
  assert.deepEqual(r.tracking,{boost:0,setback:2,diff:2});assert.deepEqual(r.beast,{boost:2,setback:0,diff:2});assert.deepEqual(r.perception,{boost:1,setback:3,diff:2});assert.deepEqual(r.vigilance,{boost:1,setback:3,diff:2});assert.deepEqual(r.ordinary,{boost:0,setback:4,diff:2});
 });
 await fresh('Pathfinder');
 await test('Forager, Outdoorsman and Enduring apply only their intended checks and soak',async()=>{
  const r=await page.evaluate(()=>{const before=playerSoak();S.talents=new Set(['pf02','pf11','pf13','pf41']);S.specTalents.Pathfinder=S.talents;const pc=actorById('pc');return{forage:talentCheckMods(pc,'Survival',{setback:4,forage:true}).setback,outdoors:talentCheckMods(pc,'Survival',{setback:4,outdoors:true}).setback,ordinary:talentCheckMods(pc,'Survival',{setback:4}).setback,soak:playerSoak()-before}});assert.deepEqual(r,{forage:2,outdoors:2,ordinary:4,soak:1});
 });
 await fresh('Advisor');
 await test('Advisor social setback removal leaves unrelated checks and other actors unchanged',async()=>{
  const r=await page.evaluate(()=>{S.talents=new Set(['ad00','ad23','ad03']);S.specTalents.Advisor=S.talents;const pc=actorById('pc');return{charm:talentCheckMods(pc,'Charm',{setback:4}).setback,deception:talentCheckMods(pc,'Deception',{setback:4}).setback,leadership:talentCheckMods(pc,'Leadership',{setback:4}).setback,mechanics:talentCheckMods(pc,'Mechanics',{setback:4}).setback,other:talentCheckMods({...pc,id:'lena'},'Deception',{setback:4}).setback}});assert.deepEqual(r,{charm:3,deception:2,leadership:3,mechanics:4,other:4});
 });
 await fresh('Makashi Duelist');
 await test('Intense Presence pays one Destiny point and recovers the correct strain',async()=>{
  const r=await page.evaluate(()=>{S.talents.add('mk30');S.strain=7;S.chars.Presence=3;S.destiny={light:1,dark:0};useIntensePresence();return{strain:S.strain,light:S.destiny.light,dark:S.destiny.dark}});assert.deepEqual(r,{strain:4,light:0,dark:1});
 });
 for(const spec of specs)await test(`${spec}: source timing and manual limits appear on all 20 playable cards`,async()=>{
  await fresh(spec);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);const text=await page.locator('#talentTree').textContent();assert.match(text,/Force and Destiny Core/);assert.doesNotMatch(text,/Phase 37|still pending|being wired/);
  if(spec==='Pathfinder'){assert.match(text,/half your Force rating, rounded down/);assert.match(text,/does not create a companion automatically/);assert.match(text,/extreme range/);assert.match(text,/three maneuvers/)}
  if(spec==='Ataru Striker'){assert.match(text,/Force point to engage/);assert.match(text,/further points for Advantage/);assert.match(text,/Conditioned, following official errata/)}
  if(spec==='Makashi Duelist'){assert.match(text,/Average Lightsaber/);assert.match(text,/ignoring soak/);assert.match(text,/groups of multiple minions do not qualify/)}
 });
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: all six layouts fit without horizontal overflow or source/button overlap`,async()=>{
  await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}
 });
 await page.setViewportSize({width:390,height:844});await fresh('Pathfinder');await page.screenshot({path:path.join(out,'pathfinder-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:6,reviewedNodes:120,retainedIds:120,frozenLayouts:48,frozenNodes:960,sourceRules:65,connectionChanges:21,labelChanges:7,priorCases:960,combinedPriorCases:2040,remainingLayouts:17,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
