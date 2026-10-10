const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const game=await openGame(),w=game.window,run=game.run,checks=[];
 const check=(name,condition)=>{assert.ok(condition(),name);checks.push(name)};
 const economy=()=>run('JSON.stringify({credits:S.credits,xp:S.earnedXp,skills:S.skills,day:S.world.day,strain:S.strain,wounds:S.wounds})');
 try{
  check('Home modules boot without a runtime error',()=>game.errors.length===0&&run('Game97.ready'));
  run('S.finalized=true;S.settings.autosave=false;S.visual75.tutorialSeen=true;S.story61.active=null;S.combat=null;S.ep15.mainStage=0;S.ep15.flags={};renderAll();renderNavTab("playhub80")');
  const baseline=run('JSON.parse(JSON.stringify(serializableState()))');
  check('Courier objective identifies the person and location',()=>{const o=run('Game97.objectives.describe()');return o.label==='Talk to Rhea'&&o.location==='Cinder Spire Cantina'&&o.instruction.includes('Rhea Sol')});
  const before=economy();w.document.getElementById('homeObjective97').click();
  check('Courier shortcut opens the actual cantina choices without rolling or rewarding',()=>run('activeTabId78()')==='adventure'&&w.document.getElementById('choices').textContent.includes('Ask Rhea directly')&&economy()===before);
  run('renderNavTab("playhub80")');
  check('Deeper Home tools start collapsed and stay available',()=>!w.document.getElementById('homeTools97').open&&!!w.document.getElementById('hubForce80')&&!!w.document.getElementById('hubOps80'));
  w.document.getElementById('homeTools97').open=true;run('renderAll()');
  check('Home preserves an expanded More options section on refresh',()=>w.document.getElementById('homeTools97').open);
  w.document.getElementById('hubTrain96').click();
  check('Home Training shortcut opens the existing Training workflow',()=>run('activeTabId78()')==='worktraining96'&&run('S.downtime96.panel')==='training');
  check('Training no longer displays phase labels',()=>!w.document.getElementById('worktraining96').textContent.includes('PHASES'));
  const scenarios=[
   ['creation',{...baseline,finalized:false},'review'],
   ['active combat',{...baseline,combat:{}},'combat'],
   ['courier wreck',{...baseline,ep15:{...baseline.ep15,mainStage:1}},'adventure'],
   ['completed courier adventure',{...baseline,ep15:{...baseline.ep15,mainStage:9}},'story61tab']
  ];
  for(const [name,state,target] of scenarios)check(`${name} has a valid objective destination`,()=>run(`Game97.objectives.describe(${JSON.stringify(state)}).target`)===target);
  const quest={id:'home-test',templateId:'embers73',title:'Embers in the Static',status:'active',node:'decode',completedNodes:[],optional:{},flags:{},failures:{}};
  const storyNodes=[['signal','story61tab'],['talo','story61tab'],['decode','story61tab'],['ferrixFight','story61tab'],['finale','story61tab'],['ferrixTravel','galaxy']];
  for(const [node,target] of storyNodes){const state={...baseline,story61:{...baseline.story61,active:{...quest,node}}};check(`Story node ${node} routes from structured state`,()=>run(`Game97.objectives.describe(${JSON.stringify(state)}).target`)===target)}
  const skillState={...baseline,story61:{...baseline.story61,active:quest}};
  run(`Game97.saves.apply(${JSON.stringify(skillState)},"mission test");renderNavTab("playhub80")`);const skillBefore=economy();
  w.document.getElementById('homeObjective97').click();
  check('Skill objective reveals its check without rolling or advancing the mission',()=>run('activeTabId78()')==='story61tab'&&!!w.document.getElementById('storyAction61')&&run('S.story61.active.node')==='decode'&&economy()===skillBefore);
  check('Story screen uses mission wording and preserves player choices',()=>!w.document.getElementById('story61tab').textContent.includes('Story Engine'));
  run(`Game97.saves.apply(${JSON.stringify({...baseline,story61:{...baseline.story61,active:{...quest,node:'talo'}}})},"conversation test");renderNavTab("playhub80")`);const conversationBefore=economy();
  w.document.getElementById('homeObjective97').click();
  check('Conversation objective exposes a usable interaction without deciding for the player',()=>run('activeTabId78()')==='story61tab'&&!!w.document.getElementById('resolveVisualCampaign73')&&run('S.story61.active.node')==='talo'&&economy()===conversationBefore);
  run('renderNavTab("pixelworld67");updateWorldPolish75()');
  check('World redraw retains the named contact instead of an unavailable marker instruction',()=>w.document.getElementById('questGuide75').textContent.includes('Talo Brinn')&&!w.document.getElementById('questGuide75').textContent.includes('flashing'));
  run(`Game97.saves.apply(${JSON.stringify({...baseline,story61:{...baseline.story61,active:{...quest,node:'ferrixTravel'}}})},"travel test");renderNavTab("playhub80")`);const travelBefore=economy();
  w.document.getElementById('homeObjective97').click();
  check('Travel objective opens travel planning without travelling or charging credits',()=>run('activeTabId78()')==='galaxy'&&run('S.world.currentHub')==='sable'&&economy()===travelBefore);
  check('Historical release panels live outside the campaign guide',()=>w.document.getElementById('about97').contains(w.document.getElementById('phase92Card'))&&!w.document.getElementById('guide').contains(w.document.getElementById('release76')));
  run(`Game97.saves.apply(${JSON.stringify({...baseline,name:'Phase 99 Explorer'})},"named character");renderNavTab("playhub80")`);
  check('Copy cleanup preserves user-authored character names',()=>w.document.querySelector('.home-head97').textContent.includes('Phase 99 Explorer')&&run('S.name')==='Phase 99 Explorer');
  run('renderNavTab("equipment");Game97.resume.capture();renderNavTab("about97")');
  check('Release notes do not replace the current gameplay continuation',()=>run('S.resume97.screen')==='equipment');
  w.localStorage.clear();w.localStorage.setItem(run('RC_SAVE_KEY'),JSON.stringify({...baseline,name:'Saved Hero',credits:678,lastSaved:null,saveInfo97:null}));
  run('S.finalized=false;S.lastSaved=null;renderNavTab("playhub80")');
  check('Fresh Home previews the saved campaign without inventing a timestamp',()=>w.document.querySelector('.home-head97').textContent.includes('Saved Hero')&&w.document.getElementById('homeWorld97')&&w.document.getElementById('playhub80').textContent.includes('Save timestamp unavailable'));
  w.document.getElementById('homeWorld97').click();
  check('Enter World from a fresh Home loads the offered campaign first',()=>run('S.name')==='Saved Hero'&&run('S.credits')===678&&run('activeTabId78()')==='pixelworld67');
  check('Save schema and namespaces remain unchanged',()=>run("serializableState().schemaVersion===92&&RC_SAVE_KEY==='swrpg-phase92'"));
  assert.deepEqual(game.errors,[]);console.log(JSON.stringify({targeted:checks.length,checks,errors:game.errors},null,2));
 }finally{game.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
