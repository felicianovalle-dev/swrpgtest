/* Saved layouts come from the published 38fc8aa build. Expected changes below
   were checked against the three Far Horizons diagrams and glossary, not generated
   from the new catalog. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa112');
fs.mkdirSync(out,{recursive:true});
const readFixture=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures',name),'utf8'));
const fixture=readFixture('older-layouts102.json');
const previous=Object.assign({},...['prototype-talents98.json','simplified-talents99.json','aor-talents100.json','core-trees101.json'].map(f=>readFixture(f).trees));
const deltas={Entrepreneur:{add:[[7,11],[13,17]],remove:[]},Marshal:{add:[[10,14]],remove:[]},Performer:{add:[[5,6],[5,9]],remove:[]}};
const labels={per00:'Active',per30:'Active'};
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
  hydrateState(Game97.freshState(),'Far Horizons fixture');S.finalized=true;S.settings.autosave=false;S.settings.reducedMotion=true;S.visual75.tutorialSeen=true;
  S.career=specializationCareer(spec);S.spec=spec;S.ownedSpecs=[spec];S.talentView=spec;S.specTalents={[spec]:new Set()};S.talents=S.specTalents[spec];S.earnedXp=400;S.forceRating=0;S.gmDestinyMode='off';S.crew=[];renderAll();renderNavTab('talents');S.crew=[];
 },spec);
 const snapshot=()=>page.evaluate(()=>JSON.stringify({xp:S.earnedXp,spent:S.xpSpent,chars:S.chars,force:S.forceRating,ids:Object.fromEntries(S.ownedSpecs.map(s=>[s,[...S.specTalents[s]]])),dedication:S.dedication,choices:S.talentChoices98,deadlyAccuracySkill:S.deadlyAccuracySkill}));
 const reload=async()=>{await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>Game97.ready);await page.locator('#hubResumeLatest97').click()};
 await test('Forty-two of the original 48 layouts are reviewed; 6 remain and schema stays 92',async()=>{
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


 await test('Source pages and bonus career skills match the supplied book',async()=>{
  for(const [spec,printedPage]of [['Entrepreneur',27],['Marshal',29],['Performer',31]])assert.deepEqual(await page.evaluate(s=>{const t=CharacterCatalog97.data.trees[s];return[t.bookPage,t.bookPdfPage,t.ruleSet]},spec),[printedPage,printedPage+1,'far112']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Colonist.specs.Entrepreneur),['Discipline','Knowledge (Education)','Knowledge (Underworld)','Negotiation']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Colonist.specs.Marshal),['Coercion','Knowledge (Underworld)','Ranged (Light)','Vigilance']);
  assert.deepEqual(await page.evaluate(()=>CAREERS.Colonist.specs.Performer),['Charm','Coordination','Deception','Melee']);
 });
 await test('All 39 scoped rules have explicit activation, ranks, source and resolution boundaries',async()=>{
  const rules=await page.evaluate(()=>CharacterCatalog97.data.talentRules112);assert.equal(Object.keys(rules).length,39);
  const ranked=['Bad Cop','Congenial','Convincing Demeanor','Dedication','Distracting Behavior','Dodge','Durable','Good Cop','Greased Palms','Grit','Hard Headed','Kill with Kindness','Know Somebody','Plausible Deniability','Point Blank','Rapid Recovery','Second Wind','Smooth Talker','Sound Investments','Street Smarts','Toughened','Wheel and Deal'];
  for(const[n,r]of Object.entries(rules)){assert.equal(r.ranked,ranked.includes(n),n);assert.equal(r.force,false,n);assert.ok(r.summary.length>20&&r.resolutionNote.length>20,n);assert.ok(r.activation===r.type||r.activation.startsWith(r.type+' ('),n)}
  for(const [printed,names]of [[32,['Bad Cop','Biggest Fan','Bought Info','Congenial','Coordination Dodge','Distracting Behavior']],[33,['Improved Distracting Behavior','Deceptive Taunt','Greased Palms','Good Cop','Natural Athlete','Natural Merchant','Sound Investments','Throwing Credits','Unrelenting Skeptic','Improved Unrelenting Skeptic']]])for(const n of names)assert.deepEqual([rules[n].page,rules[n].pdfPage,rules[n].source],[printed,printed+1,`Far Horizons · p.${printed}`]);
  assert.match(rules['Distracting Behavior'].summary,/Cunning.*chosen NPCs.*automatic Threat.*beginning.*engaged.*per rank/);assert.match(rules['Improved Distracting Behavior'].summary,/two automatic Threat.*allies/);assert.equal(rules['Improved Distracting Behavior'].type,'Passive');assert.equal(rules['Smooth Talker'].type,'Active');
  assert.match(rules['Point Blank'].summary,/one hit.*short or engaged/);assert.match(rules['Point Blank'].resolutionNote,/errata v2.0/);assert.match(rules['Throwing Credits'].summary,/all resulting strain-threshold.*Story complications/);
  for(const n of ['Good Cop','Bad Cop'])assert.match(rules[n].summary,/two Advantage.*ally.*same target.*encounter.*only one use/);
  assert.match(rules['Deceptive Taunt'].summary,/opposed Deception.*medium.*subsequent turns/);assert.match(rules['Improved Unrelenting Skeptic'].summary,/fails.*Destiny Point.*Despair/);
 });
 await test('Unaffordable purchases charge no XP',async()=>{await fresh('Entrepreneur');await page.evaluate(()=>{S.earnedXp=4;buyViewedTalent('ent00')});assert.equal(await page.evaluate(()=>S.earnedXp),4);assert.equal(await page.evaluate(()=>S.talents.size),0)});
 await test('Sound Investments pays every rank once at session start and does not repay on Resume',async()=>{
  await fresh('Entrepreneur');const result=await page.evaluate(()=>{S.talents=new Set(['ent00','ent12','ent23','ent30','ent43']);S.specTalents[S.spec]=S.talents;ensurePhase43State();S.campaign.session.active=false;S.credits=1000;startCampaignSession();const first=S.credits;startCampaignSession();return{first,second:S.credits,active:S.campaign.session.active}});assert.deepEqual(result,{first:1500,second:1500,active:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(()=>S.credits),1500);await page.evaluate(()=>startCampaignSession());assert.equal(await page.evaluate(()=>S.credits),1500);
 });
 const battle=async()=>{await fresh('Marshal');await page.evaluate(()=>{S.talents=new Set(['mar23','mar33']);S.specTalents[S.spec]=S.talents;S.customEncounter=[{id:'navyOfficer',count:3}];const old=beginSlot;beginSlot=()=>{};try{startCustomEncounter()}finally{beginSlot=old}S.combat.slots.sort((a,b)=>Number(b.side==='PC')-Number(a.side==='PC'));S.combat.slotIndex=0;S.combat.turn={actorId:'pc',actionUsed:false,maneuvers:0,aim:0,started:true};for(const e of S.combat.enemies){e.soak=0;e.w=0;e.wt=1000}S.strain=0;S.gmDestinyMode='off';renderCombat()})};
 for(const skill of ['Ranged (Light)','Ranged (Heavy)','Gunnery','Melee'])for(const range of [0,1,2,3])await test(`Point Blank skill/range eligibility ${skill}/${range}`,async()=>{await fresh('Marshal');const bonus=await page.evaluate(({skill,range})=>{S.talents=new Set(['mar23','mar33']);S.specTalents[S.spec]=S.talents;return pointBlankDamage(skill,range)},{skill,range});assert.equal(bonus,skill.startsWith('Ranged')&&range<=1?2:0)});
 async function attack({hit=true,range=1}={}){await battle();return page.evaluate(o=>{S.weapon='repeater';S.inventory.push('repeater');S.combat.autoFireMode=true;const e=S.combat.enemies[0];const old={roll:rollNarr,pool:combatPool};rollNarr=()=>({ok:o.hit,ns:o.hit?1:0,na:4,tr:0,de:0});combatPool=()=>({w:{...effectiveWeapon('repeater'),range:'Extreme'},p:makePool(2,0,2),skill:'Ranged (Heavy)',range:o.range,invalid:false});try{pcAttack();return{damage:e.w,one:S.combat.pendingSpend.oneHitDamage98||0,base:effectiveWeapon('repeater').damage+1}}finally{rollNarr=old.roll;combatPool=old.pool}}, {hit,range})}
 for(const range of [0,1,2])await test(`Point Blank actual first hit at range ${range}`,async()=>{const r=await attack({range});assert.equal(r.damage,r.base+(range<=1?2:0));assert.equal(r.one,range<=1?2:0)});
 await test('Misses add no Point Blank damage or one-hit offset',async()=>{const r=await attack({hit:false});assert.equal(r.damage,0);assert.equal(r.one,0)});
 await test('Point Blank saved Auto-fire continuation excludes the one-hit bonus',async()=>{const first=await attack();await page.evaluate(()=>save());await reload();const r=await page.evaluate(()=>{const e=S.combat.enemies[0],before=e.w;extraHit();return{damage:e.w-before,adv:S.combat.pendingSpend.advantage,extra:S.combat.pendingSpend.extraHits,one:S.combat.pendingSpend.oneHitDamage98}});assert.deepEqual(r,{damage:first.base,adv:2,extra:1,one:2})});
 await test('Point Blank saved Linked continuation excludes the one-hit bonus',async()=>{const first=await attack();await page.evaluate(()=>save());await reload();const r=await page.evaluate(()=>{const p=S.combat.pendingSpend,e=S.combat.enemies[0],before=e.w,old=WEAPONS.repeater.qualities;S.combat.autoFireMode=false;WEAPONS.repeater.qualities={linked:2};try{extraHit();return{delta:e.w-before,extra:p.extraHits}}finally{WEAPONS.repeater.qualities=old}});assert.deepEqual(r,{delta:first.base,extra:1})});
 for(const [spec,id,key,skill,other]of [['Entrepreneur','ent40','naturalMerchant','Streetwise','Negotiation'],['Performer','per22','naturalAthlete','Athletics','Coordination']])await test(`${key}: failed-check reroll and session limit survive Resume`,async()=>{await fresh(spec);const r=await page.evaluate(o=>{S.talents.add(o.id);const old=rollNarr;let rolls=0;rollNarr=()=>({ok:++rolls===2,ns:rolls===2?1:0,na:0,tr:0,de:0});try{const a=performBest(o.skill,{diff:2}).r,b=performBest(o.other,{diff:2}).r;return{rolls,first:a.ok,second:b.ok,used:S.sessionUsed[o.key]}}finally{rollNarr=old}}, {id,key,skill,other});assert.deepEqual(r,{rolls:3,first:true,second:false,used:true});await page.evaluate(()=>save());await reload();assert.equal(await page.evaluate(k=>S.sessionUsed[k],key),true)});
 await test('Shared social Setback removals apply only to their listed skills',async()=>{await fresh('Performer');const r=await page.evaluate(()=>{S.ownedSpecs=['Entrepreneur','Marshal','Performer'];S.specTalents.Entrepreneur=new Set(['ent01']);S.specTalents.Marshal=new Set(['mar02']);S.specTalents.Performer=new Set(['per01','per03']);S.talents=S.specTalents.Performer;const pc=actorById('pc'),get=sk=>actorPool(pc,sk,{diff:2,setback:4}).p.setback;return{charm:get('Charm'),lead:get('Leadership'),deception:get('Deception'),coercion:get('Coercion'),street:get('Streetwise'),under:get('Knowledge (Underworld)'),skul:get('Skulduggery'),other:get('Athletics')}});assert.deepEqual(r,{charm:3,lead:3,deception:2,coercion:3,street:3,under:3,skul:3,other:4})});
 await test('About derives 48 reviewed original-ID layouts and six pending',async()=>{await fresh('Entrepreneur');await page.evaluate(()=>renderNavTab('about97'));const t=await page.locator('#catalogAudit97').textContent();assert.match(t,/54 older full layouts have been checked/);assert.match(t,/0 older full layouts still await/)});
 for(const spec of specs)await test(`${spec}: source cards disclose manual limits`,async()=>{await fresh(spec);const t=await page.locator('#talentTree').textContent();assert.match(t,/Far Horizons/);assert.doesNotMatch(t,/Phase 37|being wired|still pending/);if(spec==='Entrepreneur'){assert.match(t,/Story complications/);assert.match(t,/do not pay again/)}if(spec==='Marshal'){assert.match(t,/errata v2.0/);assert.match(t,/retroactively add a Despair/)}if(spec==='Performer'){assert.match(t,/glossary labels this improvement Passive/);assert.match(t,/automatic Threat/);assert.match(t,/medium range/)}});
 for(const [width,height]of [[320,568],[375,667],[390,844],[428,926],[844,390],[1280,800]])await test(`${width}x${height}: three layouts fit without card/button overlap`,async()=>{await page.setViewportSize({width,height});for(const spec of specs){await fresh(spec);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,spec);assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#talentTree .tal')].every(c=>c.querySelector('.talent-path98').getBoundingClientRect().bottom<=c.querySelector('button').getBoundingClientRect().top)),true,spec)}});
 await page.setViewportSize({width:390,height:844});await fresh('Performer');await page.screenshot({path:path.join(out,'performer-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 const report={passed:checks.length,reviewedLayouts:3,reviewedNodes:60,retainedIds:60,frozenLayouts:48,frozenNodes:960,sourceRules:39,connectionChanges:5,labelChanges:2,priorCases:960,combinedPriorCases:2040,remainingLayouts:6,coverage:await page.evaluate(()=>CharacterCatalog97.coverage()),errors,checks};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,checks:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
