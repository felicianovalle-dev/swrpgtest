const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),run=g.run,checks=[];
 const check=(name,code)=>{assert.ok(run(code),name);checks.push(name)};
 try{
  run('S.finalized=true;S.settings.autosave=false;S.gmDestinyMode="off";S.ship.owned=true;S.credits=10000;startStory61("relay");globalThis.setbackRoll=rollNarr;globalThis.setbackPerform=performBest;globalThis.setbackRender=renderAll;renderAll=()=>{renderStory61();renderCombat()};performBest=()=>({q:{actor:actorById("pc")},r:{ok:false,ns:0,na:0,nt:0,tr:0,de:0}})');
  const credits=run('S.credits'),xp=run('S.earnedXp'),strain=run('S.strain');run('storySkill61()');
  check('First failed mission check retains its objective and costs one strain',`S.story61.active.node==="decode"&&S.strain===${strain+1}&&S.credits===${credits}&&S.earnedXp===${xp}`);
  run('storySkill61()');check('Repeated failure opens the declared alternate route','S.story61.active.node==="bruteforce"&&S.story61.active.flags.failForward');
  run('performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:0,nt:0,tr:0,de:0}});storySkill61()');check('Alternate route can succeed and continue','S.story61.active.node==="route"');
  const from=run('S.world.currentHub'),day=run('S.world.day');run('rollNarr=()=>({ok:false,ns:-1,na:-2,nt:0,tr:0,de:0});storyTravelAction61()');
  check('Failed travel preserves location, day and objective',`S.world.currentHub===${JSON.stringify(from)}&&S.world.day===${day}&&S.story61.active.node==="route"&&S.ship.strain===2`);
  check('Failed travel awards no credits or XP',`S.credits===${credits}&&S.earnedXp===${xp}`);
  run('rollNarr=()=>({ok:true,ns:2,na:0,nt:0,tr:0,de:0});storyTravelAction61()');check('Failed travel remains retryable','S.world.currentHub==="lothal"&&S.story61.active.node==="outskirts"');
  run('S.story61.active.node="ambush";storyCombat61();globalThis.defeatEnemy=S.combat.enemies[0];globalThis.defeatEncounter=S.medical.encounter;S.medical.woundTreated[`${S.medical.encounter}:pc`]=true;for(const id of ["pc",...S.crew]){let st=actorState(id);st.wounds=actorWT(id)+1;st.conditions.staggered=1};enemyFinishSlot(defeatEnemy)');
  check('Defeat clears the battle without completing its story objective','!S.combat&&S.story61.active.node==="ambush"&&!S.story61.pendingCombat');
  check('Defeat opens the actual story retry controls','activeTabId78()==="story61tab"&&!!document.getElementById("storyAction61")');
  check('Defeat begins a fresh medical encounter and clears temporary combat effects','S.medical.encounter===defeatEncounter+1&&actorState("pc").conditions.staggered===0');
  check('Emergency withdrawal leaves living actors below their incapacitation thresholds','squadActors().every(a=>!actorIsIncapacitated(a.id))');
  check('Defeat awards no credits or XP',`S.credits===${credits}&&S.earnedXp===${xp}`);
  const wounds=run('actorState("pc").wounds');run('renderRecovery();$("healerSelect").value="lena";$("patientSelect").value="pc";$("recoveryAction").value="medicine";performRecovery()');
  check('Medicine is available after defeat despite treatment in the previous encounter',`actorState("pc").wounds===${wounds-2}`);
  const healed=run('actorState("pc").wounds');run('performRecovery()');check('The new encounter still limits Medicine to one treatment',`actorState("pc").wounds===${healed}`);
  run('storyCombat61()');check('The defeated mission can launch a new linked battle','S.combat?.kind==="customEncounter"&&S.story61.pendingCombat.nodeId==="ambush"');
  const saved=run('JSON.parse(JSON.stringify(serializableState()))');run('S.combat=null;S.story61.pendingCombat=null');run(`Game97.saves.apply(${JSON.stringify(saved)},"retry battle")`);
  check('Retry battle survives save restoration','S.combat?.kind==="customEncounter"&&S.story61.pendingCombat.nodeId==="ambush"&&activeTabId78()==="combat"');
  run('S.combat=null;S.story61.active=null;S.story61.pendingCombat=null;ensurePhase45State();S.gmOps.current=buildOperation("rebel",2,"urban");S.gmOps.current.status="active";launchOperationCombat(2);globalThis.opDefeatEnemy=S.combat.enemies[0];for(const id of ["pc",...S.crew])actorState(id).wounds=actorWT(id)+1;enemyFinishSlot(opDefeatEnemy)');
  check('Operation defeat clears its battle link and retains the unfinished objective','!S.combat&&!S.gmOps.combatLink&&!S.gmOps.current.objectives[2].done&&!S.gmOps.current.rewarded');
  check('Operation defeat opens its retry board','activeTabId78()==="gm"');
  const encounter=run('S.medical.encounter');run('enemyFinishSlot(opDefeatEnemy)');check('A stale defeat callback cannot repeat recovery',`S.medical.encounter===${encounter}`);
  run('renderAll=setbackRender;rollNarr=setbackRoll;performBest=setbackPerform');assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
