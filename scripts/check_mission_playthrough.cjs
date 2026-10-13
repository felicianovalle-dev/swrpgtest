const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),w=g.window,run=g.run,checks=[];
 const check=(name,code)=>{assert.ok(run(code),name);checks.push(name)};
 try{
  run('S.finalized=true;S.settings.autosave=false;S.gmDestinyMode="off";S.ship.owned=true;S.ship.stations.navigator="pc";S.chars={Brawn:6,Agility:6,Intellect:6,Cunning:6,Willpower:6,Presence:6};S.skills={Cool:5,Astrogation:5,"Ranged (Heavy)":5};S.credits=100000;S.weapon="carbine";ensureInventory();renderAll();globalThis.missionRender=renderAll;globalThis.missionNav=renderNavTab;globalThis.missionRoll=rollNarr;globalThis.missionPerform=performBest;renderAll=()=>{renderStory61();renderCombat()};renderNavTab=()=>{};rollNarr=p=>({ok:(p.proficiency||0)>=4,ns:(p.proficiency||0)>=4?50:0,na:0,nt:0,tr:0,de:0,nd:0});performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:2,nt:0,tr:0,de:0,nd:0}})');
  const baseline=run('JSON.parse(JSON.stringify(serializableState()))');
  const routes=[['trust','buy','alliance'],['compartment','trade','erase'],['bait','pressure','keep']];
  for(const choices of routes){
   run(`Game97.saves.apply(${JSON.stringify(baseline)},"playthrough");S.world.currentHub="sable";S.ship.location="sable";startStory61("embers73")`);
   const path=[];let battles=0,attacks=0,steps=0;
   while(run('!!S.story61.active')&&steps++<50){
    const node=run('JSON.parse(JSON.stringify(storyNode61()))'),id=run('S.story61.active.node');path.push(id);
    if(node.type==='visual73')run('resolveVisualNode73()');
    else if(node.type==='skill')run('storySkill61()');
    else if(node.type==='travel')run('storyTravelAction61()');
    else if(node.type==='district')run('storyDistrictAction61()');
    else if(node.type==='dialogue73'){
     const pick=id==='talo'?choices[0]:id==='middleman'?choices[1]:choices[2];run('interactCampaign73()');
     const button=w.document.querySelector(`[data-campaign-choice73="${pick}"]`);assert.ok(button,`${id} presents ${pick}`);const credits=run('S.credits');button.click();
     if(pick==='buy'){button.click();check('Paid broker choice charges 250 credits exactly once',`S.credits===${credits-250}`);}
    }else if(node.type==='combat'){
     run('storyCombat61()');battles++;let turns=0;
     while(run('!!S.combat')&&turns++<50){
      const actor=run('S.combat.turn?.actorId');
      if(actor==='pc'){run('$("target").value=String(S.combat.enemies.findIndex(e=>!enemyDefeated(e)));if(rangeBandBetween("pc",selectedEnemy().id)>2)moveRange(-1);if(S.combat){$("target").value=String(S.combat.enemies.findIndex(e=>!enemyDefeated(e)));pcAttack()}');attacks++;}
      if(run('!!S.combat?.turn'))run('endTurn()');
     }
     assert.ok(!run('S.combat'),`${id} ends through attack/turn handlers: ${run('JSON.stringify({round:S.combat?.round,turn:S.combat?.turn,log:S.combat?.log.slice(-5)})')}`);
    }else if(node.type==='finale'){
     const credits=run('S.credits'),xp=run('S.earnedXp'),bonus=run('Object.values(S.story61.active.optional).filter(Boolean).length');run('storyFinale61()');
     check(`${choices.join('/')}: finale pays its stated reward and optional bonuses`,`S.credits===${credits+2400+bonus*100}&&S.earnedXp===${xp+34+bonus*2}`);
    }else throw Error(`Unhandled mission node ${id}/${node.type}`);
   }
   check(`${choices.join('/')}: finishes the campaign`, 'S.story61.active===null&&S.story61.completed[0].completedNodes.length===16');
   assert.equal(battles,2);assert.ok(attacks>=4);checks.push(`${choices.join('/')}: both battles won through attacks and turn progression`);
   check(`${choices.join('/')}: reaches Yavin and receives one unique reward`,'S.world.currentHub==="yavin4"&&S.inventory.filter(id=>id==="echoKey73").length===1&&S.visual73.rewarded');
   const rewards=run('JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory})');run('finishStory61()');check(`${choices.join('/')}: completion cannot pay twice`,`${JSON.stringify(rewards)}===JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory})`);
   console.log(JSON.stringify({route:choices,path,battles,attacks}));
  }
  run(`Game97.saves.apply(${JSON.stringify(baseline)},"location check");startStory61("embers73");S.story61.active.node="talo";S.world.currentHub="ferrix"`);
  const before=run('JSON.stringify({node:S.story61.active.node,credits:S.credits,rep:S.ep15.rep})');run('interactCampaign73();campaignChoice73("trust")');
  check('Remote dialogue cannot advance or charge a campaign',`${JSON.stringify(before)}===JSON.stringify({node:S.story61.active.node,credits:S.credits,rep:S.ep15.rep})`);
  run('S.story61.active=null;S.customEncounter=[{id:"navyTrooper",count:1},{id:"navyOfficer",count:1}];startCustomEncounter();$("target").value="1";$("target").dispatchEvent(new Event("change"));renderCombat()');
  check('Second combat target survives selection and redraw','$("target").value==="1"&&S.combat.targetIndex===1');
  w.document.querySelector('[data-retro-target70="0"]').click();check('Retro target buttons update saved selection','$("target").value==="0"&&S.combat.targetIndex===0');
  w.document.querySelector('[data-retro-target70="1"]').click();
  const targetSave=run('JSON.parse(JSON.stringify(serializableState()))');run('S.combat=null');run(`Game97.saves.apply(${JSON.stringify(targetSave)},"target restore")`);
  check('Saved combat target is restored','$("target").value==="1"&&S.combat.targetIndex===1');
  run('S.combat.enemies[1].w=S.combat.enemies[1].wt+1;renderCombat()');
  check('Defeated target falls back to a surviving enemy','$("target").value==="0"&&S.combat.targetIndex===0');
  run('renderAll=missionRender;renderNavTab=missionNav;rollNarr=missionRoll;performBest=missionPerform');assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
