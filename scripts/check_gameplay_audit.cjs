const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),w=g.window,run=g.run,passed=[],failed=[];
 const check=(name,code)=>{try{assert.ok(run(code),name);passed.push(name)}catch(e){failed.push({name,error:e.message})}};
 try{
  run('S.finalized=true;S.settings.autosave=false;S.credits=1000000;ensurePhase43State();globalThis.auditRoll=rollNarr;globalThis.auditPerform=performBest;rollNarr=()=>({ok:true,ns:1,na:0,nt:0,nd:0});performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:0,nt:0,nd:0}});renderEquipment()');
  // The matrix exercises real equipment controls and handlers. Redraw only the
  // equipment panel here; the operation checks below restore the full renderer.
  run('globalThis.auditRender=renderAll;renderAll=()=>renderEquipment()');
  const chassis=run('Object.values(CRAFT_TEMPLATES).filter(t=>t.category==="droid").map(t=>t.id)'),directives=run('Object.keys(DROID_DIRECTIVES)');
  for(const chassisId of chassis)for(const directive of directives){
   run(`S.droids=[];S.activeDroidId=null;S.crafting.pendingDroids=[];$("craftTemplate").value=${JSON.stringify(chassisId)};S.crafting.materials[${JSON.stringify(chassisId)}]=true;updateCraftPreview()`);
   w.document.getElementById('craftBuild').click();
   run(`$("droidDirective").value=${JSON.stringify(directive)};$("droidFlexSkill").value="Medicine"`);w.document.getElementById('programDroid').click();
   check(`${chassisId}/${directive}: builds, programs and participates in party checks`,`S.droids.length===1&&S.droids[0].directive===${JSON.stringify(directive)}&&S.droids[0].status==="active"&&!!bestActor("Mechanics")`);
   if(directive==='labor')check(`${chassisId}: flexible directive uses Medicine`,'S.droids[0].type==="minion"?S.droids[0].groupSkills.includes("Medicine"):S.droids[0].skills.Medicine===2');
  }
  run('$("craftTemplate").value="gadgetSpecialist";$("craftSkill").value="Medicine";renderAll()');
  check('Gadget skill choice survives a refresh','$("craftSkill").value==="Medicine"');
  run('globalThis.auditFirstDroid=S.droids[0].id;$("craftTemplate").value="droidMonotask";S.crafting.materials.droidMonotask=true;updateCraftPreview()');w.document.getElementById('craftBuild').click();
  run('$("droidDirective").value="repair"');w.document.getElementById('programDroid').click();
  check('Programming a second droid preserves the existing utility assignment','S.droids.length===2&&S.activeDroidId===auditFirstDroid');
  const second=run('S.droids[1].id');w.document.querySelector(`[data-active-droid="${second}"]`).click();
  check('Roster button switches the utility droid','S.activeDroidId===S.droids[1].id&&activeDroidActor().sk.Mechanics===2');
  const saved=run('JSON.parse(JSON.stringify(serializableState()))');run('S.droids=[];S.activeDroidId=null');run(`Game97.saves.apply(${JSON.stringify(saved)},"droid roster")`);
  check('Save restoration retains both droids and the selected utility','S.droids.length===2&&S.activeDroidId===S.droids[1].id');
  run('S.inventory=["carbine","lightsaber","heavyClothing","craftEnergyPistol"];S.itemAttachments={};S.crafting.mods.craftEnergyPistol={hp:1};renderEquipment();$("attachmentItem").value="carbine";globalThis.auditAttachment=Object.values(ATTACHMENTS).find(a=>compatibleAttachment(a,ITEMS.carbine)&&a.hp<=attachmentFreeHP("carbine"));S.credits=0;installAttachment(auditAttachment.id)');
  check('Insufficient credits cannot install or charge','S.credits===0&&!hasAttachment("carbine",auditAttachment.id)');
  run('S.credits=100000;performBest=()=>({r:{ok:false}});installAttachment(auditAttachment.id)');
  check('Failed attachment sourcing leaves inventory and credits intact','S.credits===100000&&!hasAttachment("carbine",auditAttachment.id)');
  run('performBest=()=>({q:{actor:actorById("pc")},r:{ok:true,ns:1,na:0,nt:0,nd:0}});$("attachmentItem").value="lightsaber";installAttachment(auditAttachment.id)');
  check('Incompatible attachment cannot install or charge','S.credits===100000&&!hasAttachment("lightsaber",auditAttachment.id)');
  check('Customizable crafting bonus supplies usable hard points','attachmentFreeHP("craftEnergyPistol")===(ITEMS.craftEnergyPistol.hp+1)');
  check('Restricted droid material acquisition is marked restricted','CRAFT_TEMPLATES.droidCombat.restricted===true&&CRAFT_TEMPLATES.droidAdvanced.restricted===true');
  for(const id of ['droidCombat','droidAdvanced']){
   run(`$("craftTemplate").value=${JSON.stringify(id)};S.crafting.materials[${JSON.stringify(id)}]=false;performBest=skill=>{globalThis.auditAcquisitionSkill=skill;return {q:{actor:actorById("pc")},r:{ok:true,ns:1,na:0,nt:0,nd:0}}};updateCraftPreview()`);w.document.getElementById('craftBuyMaterials').click();
   check(`${id}: restricted materials use Streetwise`,'auditAcquisitionSkill==="Streetwise"');
  }
  run('S.inventory.push("craftSlugPistol");$("attachmentItem").value="craftSlugPistol";globalThis.auditCreditBefore=S.credits;installAttachment(auditAttachment.id)');
  check('An item without enough hard points cannot install or charge','S.credits===auditCreditBefore&&!hasAttachment("craftSlugPistol",auditAttachment.id)');
  run('renderAll=auditRender;S.droids=[];S.activeDroidId=null;S.crafting.pendingDroids=[];ensurePhase45State();globalThis.auditOp=buildOperation("rebel",2,"urban");auditOp.org62=true;auditOp.status="active";auditOp.objectives.forEach(o=>o.done=false);S.gmOps.current=auditOp;ensureOrg62StateBase();ensurePhase50State()');
  const economy='JSON.stringify({credits:S.credits,xp:S.earnedXp,completed:S.world.completedOps,heat:S.world.imperialHeat,influence:ensureOrg62StateBase().influence,treasury:ensureOrg62StateBase().treasury,hubInfluence:influence64(S.world.currentHub)})';
  const before=run(economy);run('claimOperationReward()');
  check('Incomplete operation cannot grant payouts or world/organization effects',`${JSON.stringify(before)}===${economy}`);
  run('auditOp.objectives.forEach(o=>o.done=true);claimOperationReward()');
  check('Completed operation pays and records completion','auditOp.rewarded&&auditOp.status==="completed"');
  const after=run(economy);run('claimOperationReward()');
  check('Repeated claim cannot repeat payouts or world/organization effects',`${JSON.stringify(after)}===${economy}`);
  run('rollNarr=auditRoll;performBest=auditPerform');
  assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:passed.length,failed,checks:passed},null,2));assert.equal(failed.length,0,'Gameplay audit failures');
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
