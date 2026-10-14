const assert=require('node:assert/strict'),openGame=require('./game_test_harness.cjs');
(async()=>{
 const g=await openGame(),w=g.window,run=g.run,checks=[];
 const check=(name,test)=>{assert.ok(test(),name);checks.push(name)};
 const state=()=>run('JSON.parse(JSON.stringify(serializableState()))');
 const fingerprint=()=>run('JSON.stringify({name:S.name,credits:S.credits,skills:S.skills,ep15:S.ep15,ship:S.ship})');
 try{
  run('S.finalized=true;S.settings.autosave=false;S.credits=999;S.ep15.mainStage=9;S.ep15.flags.completed=true;S.ship.owned=true;S.transientOtherCampaign={secret:true};renderAll()');
  const full=state(),partial={...full,name:'Older campaign',credits:100,scene:0};
  for(const key of ['ep15','ship','story61','world','crafting','downtime96','transientOtherCampaign'])delete partial[key];
  run(`Game97.saves.apply(${JSON.stringify(partial)},"older import",{imported:true})`);
  check('Older import does not inherit completed quest or owned ship',()=>run('S.ep15.mainStage===0&&!S.ship.owned&&!S.transientOtherCampaign'));
  check('Recovery checkpoint preserves unsaved progress before import',()=>run('JSON.parse(localStorage.getItem(RC_SAVE_KEY+"-recovery")).credits===999'));
  check('Imported campaign has a visible autosave pause',()=>w.document.getElementById('save97').textContent.includes('autosave is paused'));
  run('S.settings.autosave=true;renderNavTab("equipment")');await new Promise(r=>setTimeout(r,300));
  check('Import navigation cannot overwrite autosave',()=>run('!localStorage.getItem(RC_AUTO_KEY)&&safeAutosave()===false'));
  check('Manual saving retains the imported campaign and resumes autosave',()=>run('save()===true&&safeAutosave()===true&&JSON.parse(localStorage.getItem(RC_AUTO_KEY)).name==="Older campaign"'));
  const manual=w.localStorage.getItem(run('RC_SAVE_KEY')),auto=w.localStorage.getItem(run('RC_AUTO_KEY'));
  run('S.credits=777;S.settings.autosave=false;Game97.saves.loadSlot("manual")');
  check('Explicit load checkpoints unsaved current progress',()=>run('S.credits===100&&JSON.parse(localStorage.getItem(RC_SAVE_KEY+"-recovery")).credits===777'));
  check('Load leaves manual and auto slots unchanged',()=>manual===w.localStorage.getItem(run('RC_SAVE_KEY'))&&auto===w.localStorage.getItem(run('RC_AUTO_KEY')));
  check('Latest excludes the newer recovery checkpoint',()=>run('Game97.saves.loadSlot("latest")&&S.credits===100'));
  run('S.credits=555;Game97.saves.loadSlot("manual")');
  const recovery=w.localStorage.getItem(run('RC_SAVE_KEY+"-recovery"'));
  check('Recovery can restore previous progress without replacing itself',()=>run('Game97.saves.loadSlot("recovery")&&S.credits===555')&&recovery===w.localStorage.getItem(run('RC_SAVE_KEY+"-recovery"')));
  const invalids=[
   ['characteristic string',{...full,chars:{...full.chars,Brawn:'broken'}}],
   ['out of range skill',{...full,skills:{...full.skills,Mechanics:999}}],
   ['negative credits',{...full,credits:-1}],['fractional credits',{...full,credits:1.5}],
   ['negative XP',{...full,earnedXp:-2}],['string XP',{...full,xpSpent:'10'}],
   ['string schema',{...full,schemaVersion:'broken'}],['newer schema',{...full,schemaVersion:93}],
   ['null world',{...full,world:null}],['invalid nested day',{...full,medical:{...full.medical,day:'broken'}}],
   ['null wound count',{...full,wounds:null}],['unsafe field',JSON.parse(JSON.stringify(full).replace('"name":','"__proto__":{"polluted":true},"name":'))]
  ];
  for(const [name,data]of invalids){const before=fingerprint(),slotsBefore=JSON.stringify({...w.localStorage});let rejected=false;try{run(`Game97.saves.apply(JSON.parse(${JSON.stringify(JSON.stringify(data))}),"invalid")`)}catch{rejected=true}check(`Reject ${name} without changing campaign or slots`,()=>rejected&&before===fingerprint()&&slotsBefore===JSON.stringify({...w.localStorage}));}
  const legacy={...partial};delete legacy.schemaVersion;
  check('Valid older save without schema remains accepted',()=>run(`!!Game97.saves.validate(${JSON.stringify(legacy)})`));
  run(`Game97.saves.apply(${JSON.stringify({...legacy,scene:5})},"old completed scene")`);
  check('Legacy completed scene still migrates its own quest and ship',()=>run('S.ep15.mainStage===9&&S.ship.owned'));
  run(`Game97.saves.apply(${JSON.stringify({...legacy,finalized:false})},"creation");S.name="Unsaved creation";Game97.saves.loadSlot("manual")`);
  check('Loading preserves edited unfinalized character creation',()=>run('JSON.parse(localStorage.getItem(RC_SAVE_KEY+"-recovery")).name==="Unsaved creation"'));
  run('S.credits=4321;globalThis.originalReliabilitySet=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key===RC_SAVE_KEY+"-recovery")throw new Error("quota test");return originalReliabilitySet.call(this,key,value)}');
  check('Failed recovery write aborts loading and retains current campaign',()=>run('Game97.saves.loadSlot("manual")===false&&S.credits===4321'));
  run('Storage.prototype.setItem=originalReliabilitySet');
  // Exercise the actual file-input reader path, not only the public apply API.
  const readAsText=w.FileReader.prototype.readAsText;
  let importTimeout;
  const importFinished=new Promise((resolve,reject)=>{
   importTimeout=setTimeout(()=>reject(new Error('File reader did not finish importing')),10000);
   w.FileReader.prototype.readAsText=function(...args){
    this.addEventListener('loadend',()=>{clearTimeout(importTimeout);resolve()},{once:true});
    return readAsText.apply(this,args);
   };
  });
  try{
   run(`importSaveFile(new File([${JSON.stringify(JSON.stringify(partial))}],"older.json",{type:"application/json"}))`);
   await importFinished;
  }finally{clearTimeout(importTimeout);w.FileReader.prototype.readAsText=readAsText;}
  check('File import uses isolation, recovery and paused autosave',()=>run('S.name==="Older campaign"&&S.ep15.mainStage===0&&!S.ship.owned&&JSON.parse(localStorage.getItem(RC_SAVE_KEY+"-recovery")).credits===4321&&safeAutosave()===false'));
  assert.deepEqual(g.errors,[]);console.log(JSON.stringify({passed:checks.length,checks},null,2));
 }finally{g.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
