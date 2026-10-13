const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),w=g.window,run=g.run,checks=[];
 const check=(name,code)=>{assert.ok(run(code),name);checks.push(name)};
 try{
  run('S.finalized=true;S.settings.autosave=false;S.credits=100000;ensureStory61StateBase();globalThis.storyAuditRender=renderAll;globalThis.storyAuditNav=renderNavTab;globalThis.storyAuditPerform=performBest;renderAll=()=>{};renderNavTab=()=>{};performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:2,nt:0,nd:0}})');
  const templates=run('JSON.parse(JSON.stringify(STORY_TEMPLATES_61))');
  for(const [id,t]of Object.entries(templates)){
   // Branch handlers are exercised with explicit node fixtures, without claiming
   // that these fixtures play the travel or combat encounters end to end.
   for(const [nodeId,n]of Object.entries(t.nodes)){
    const fixture=()=>run(`S.story61.active={id:"audit-${id}",templateId:${JSON.stringify(id)},title:${JSON.stringify(t.name)},status:"active",node:${JSON.stringify(nodeId)},completedNodes:[],optional:{},flags:{},failures:{}}`);
    if(n.type==='skill'){
     fixture();run('storySkill61()');check(`${id}/${nodeId}: successful skill follows its next node`,`S.story61.active?.node===${JSON.stringify(n.next)}||(!S.story61.active&&!${JSON.stringify(n.next||null)})`);
     if(n.failNext){fixture();run('performBest=()=>({q:{actor:actorById("pc")},r:{ok:false,ns:0,na:0,nt:0,nd:0}})');for(let i=0;i<(n.failAfter||2);i++)run('storySkill61()');check(`${id}/${nodeId}: repeated failure opens the declared fallback`,`S.story61.active?.node===${JSON.stringify(n.failNext)}`);run('performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:2,nt:0,nd:0}})');}
    }else if(n.type==='choice')for(const c of n.choices){fixture();run(`storyChoice61(${JSON.stringify(c.id)})`);check(`${id}/${nodeId}/${c.id}: choice preserves its branch`,`S.story61.active?.node===${JSON.stringify(c.next||n.next)}||(!S.story61.active&&!${JSON.stringify(c.next||n.next||null)})`);}
   }
   run(`startStory61(${JSON.stringify(id)})`);const before=run('JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory})');run('finishStory61()');
   check(`${id}: premature completion cannot grant rewards`,`${JSON.stringify(before)}===JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory})&&S.story61.active?.status==="active"`);
   run(`S.story61.active.node="finale";finishStory61()`);const after=run('JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory,completed:S.story61.completed.length})');run('finishStory61()');
   check(`${id}: completing twice cannot repeat rewards`,`${JSON.stringify(after)}===JSON.stringify({credits:S.credits,xp:S.earnedXp,inventory:S.inventory,completed:S.story61.completed.length})`);
  }
  run('startStory61("relay");S.story61.active.node="ambush";renderAll=storyAuditRender;renderNavTab=storyAuditNav;storyCombat61()');
  check('Story combat launches and records its quest link','S.combat?.kind==="customEncounter"&&S.story61.pendingCombat?.nodeId==="ambush"');
  const started=run('JSON.stringify({combat:S.combat,pending:S.story61.pendingCombat})');run('storyCombat61()');check('Repeated launch cannot replace an active story battle',`${JSON.stringify(started)}===JSON.stringify({combat:S.combat,pending:S.story61.pendingCombat})`);
  run('S.combat.round=3;S.combat.enemies[0].w=1');
  const battle=run('JSON.stringify({combat:S.combat,pending:S.story61.pendingCombat,node:S.story61.active.node})');
  const saved=run('JSON.parse(JSON.stringify(serializableState()))');run('S.combat=null;S.story61.pendingCombat=null');run(`Game97.saves.apply(${JSON.stringify(saved)},"combat test")`);
  assert.deepEqual(JSON.parse(run('JSON.stringify({combat:S.combat,pending:S.story61.pendingCombat,node:S.story61.active.node})')),JSON.parse(battle));
  check('Combat restoration preserves enemies, initiative, turn and quest link','activeTabId78()==="combat"');
  run('combatWin()');check('Restored combat victory advances only its linked objective','!S.combat&&!S.story61.pendingCombat&&S.story61.active.node==="finale"');
  const xp=run('S.earnedXp');run('combatWin()');check('Repeated victory is harmless and cannot grant XP again',`S.earnedXp===${xp}`);
  run('S.resume97={screen:"combat"};Game97.resume.current()');check('A stale combat screen without a battle falls back safely','activeTabId78()==="playhub80"');
  run('performBest=storyAuditPerform');assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
