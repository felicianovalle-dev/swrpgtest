/* Phases 95–96. Existing formulas and schema-92 saves remain authoritative. */
const WORK96={busy:false,notice:null};
/* The dedicated QA page exposes this simulated display mode visibly. Normal
   tabs keep the platform-reported mode; no phone/browser fingerprint changes. */
const priorAppMode96=appMode65;
appMode65=function(){return window.frameElement?.id==='game96'&&new URLSearchParams(location.search).get('layoutQA')==='standalone'?'standalone':priorAppMode96()};
function freshDowntime96(){return {panel:'jobs',jobSkill:'Mechanics',studySkill:'Mechanics',history:[],shifts:0,totalPay:0}}
function ensureDowntime96(){
 ensurePhase46State();
 if(!S.downtime96||typeof S.downtime96!=='object'||Array.isArray(S.downtime96))S.downtime96=freshDowntime96();
 const d=S.downtime96;
 d.panel=d.panel==='training'?'training':'jobs';
 if(!GENERAL_SKILLS.includes(d.jobSkill))d.jobSkill='Mechanics';
 if(!Object.hasOwn(SKILL_CHAR,d.studySkill))d.studySkill='Mechanics';
 d.history=Array.isArray(d.history)?d.history.filter(x=>x&&typeof x.text==='string').slice(0,20):[];
 for(const k of ['shifts','totalPay'])if(!Number.isFinite(d[k])||d[k]<0)d[k]=0;
 return d;
}
function downtimeBlock96(){
 if(!S.finalized)return 'Finish and finalize your character before taking a job or training.';
 if(S.combat)return 'Finish the current combat before starting downtime.';
 if(actorIsIncapacitated('pc'))return 'Recover first: your character is incapacitated.';
 return '';
}
function notice96(title,text,error=false){WORK96.notice={title,text,error};renderWorkHub96()}
function logDowntime96(title,text){const d=ensureDowntime96();d.history.unshift({day:S.world?.day||1,title,text});d.history=d.history.slice(0,20);WORK96.notice={title,text,error:false}}
function finishDowntimeDay96(){campaignRest();safeAutosave()}
function workShift96(skill=ensureDowntime96().jobSkill){
 if(WORK96.busy)return false;
 const block=downtimeBlock96();if(block){notice96('Not available yet',block,true);return false}
 if(!GENERAL_SKILLS.includes(skill)){notice96('Choose a job skill','Select one of the listed skills.',true);return false}
 WORK96.busy=true;
 try{
  const d=ensureDowntime96();d.jobSkill=skill;
  const result=performBest(skill,{diff:2}),r=result.r;
  const pay=r.ok?75+25*Math.max(0,r.ns)+10*Math.max(0,r.na):0;
  S.credits+=pay;d.shifts++;d.totalPay+=pay;
  ledgerEntry(pay,`Downtime job — ${skill}`);
  const text=`${result.q.actor.name} used ${skill}. ${rtxt(r)}. ${pay?`Earned ${pay} credits.`:'No payout this time.'} One day passes, including a night of rest.`;
  gLog(text);logDowntime96(pay?`Shift complete · +${pay} Cr`:'Shift complete · 0 Cr',text);
  finishDowntimeDay96();renderWorkHub96();return {pay,result:r};
 }finally{WORK96.busy=false}
}
function practiceSkill96(skill=ensureDowntime96().studySkill){
 if(WORK96.busy)return false;
 const block=downtimeBlock96();if(block){notice96('Not available yet',block,true);return false}
 if(!Object.hasOwn(SKILL_CHAR,skill)){notice96('Choose a skill','Select one of the listed skills.',true);return false}
 const rank=S.skills[skill]||0;if(rank>=5){notice96('Maximum rank',`${skill} is already rank 5.`,true);return false}
 WORK96.busy=true;
 try{
  ensureDowntime96().studySkill=skill;
  const diff=Math.min(5,rank+1),q=actorPool(actorById('pc'),skill,{diff,commit:false}),r=rollNarr(q.p);
  const rec=S.training.skills[skill]||(S.training.skills[skill]={progress:0});
  if(!Number.isFinite(rec.progress)||rec.progress<0)rec.progress=0;
  const gain=r.ok?1+Math.floor(Math.max(0,r.na)/2)+(r.tr?1:0):(r.na>=3?1:0),target=trainingTarget(rank);
  rec.progress+=gain;S.training.sessions++;
  const improved=rec.progress>=target;
  if(improved){rec.progress-=target;S.skills[skill]=rank+1}
  ledgerEntry(0,`Study session — ${skill}`);
  const text=`${skill}: ${rtxt(r)}. +${gain} practice. ${improved?`Rank ${rank} → ${rank+1}!`:`${rec.progress}/${target} toward rank ${rank+1}.`} One day passes, including a night of rest. No credits or XP spent.`;
  bLog(text);logDowntime96(improved?`${skill} improved to rank ${rank+1}`:'Practice session complete',text);
  finishDowntimeDay96();renderWorkHub96();return {gain,improved,result:r};
 }finally{WORK96.busy=false}
}
function advanceSkill96(skill=ensureDowntime96().studySkill){
 const block=downtimeBlock96();if(block){notice96('Not available yet',block,true);return false}
 if(!Object.hasOwn(SKILL_CHAR,skill))return false;
 const rank=S.skills[skill]||0,cost=skillCost(skill);
 if(rank>=5){notice96('Maximum rank',`${skill} is already rank 5.`,true);return false}
 if(availableXp()<cost){notice96('More XP needed',`Rank ${rank+1} in ${skill} costs ${cost} XP. You have ${availableXp()} XP. Complete missions to earn more.`,true);return false}
 buySkill(skill);
 const text=`${skill}: rank ${rank} → ${S.skills[skill]}. Spent ${cost} XP; ${availableXp()} XP remains. No day passes.`;
 logDowntime96('Skill purchased',text);safeAutosave();renderWorkHub96();return true;
}
function openWorkHub96(panel='jobs'){
 ensureDowntime96().panel=panel==='training'?'training':'jobs';
 if(PX67.dialog)closePixelDialog67(false);
 renderNavTab('worktraining96');
 $('mobileSheet52')?.classList.add('hidden');$('mobileQuick65')?.classList.add('hidden');
 window.scrollTo({top:0,behavior:'auto'});safeAutosave();
}
function skillOptions96(skills,selected){return skills.map(sk=>`<option value="${pxEsc67(sk)}" ${sk===selected?'selected':''}>${pxEsc67(sk)} · rank ${S.skills[sk]||0}</option>`).join('')}
function ensureWorkHub96(){
 const host=$('tabHost78')||document.querySelector('.wrap');if(!host)return;
 if(!$('worktraining96')){const sec=document.createElement('section');sec.id='worktraining96';sec.className='tab card hidden tab78';sec.setAttribute('aria-label','Jobs and Training');host.appendChild(sec)}
 if(!document.querySelector('#nav [data-tab="worktraining96"]')){
  const b=document.createElement('button');b.dataset.tab='worktraining96';b.dataset.icon='Cr';b.textContent='Jobs & Training';b.onclick=()=>openWorkHub96();$('nav')?.appendChild(b);
 }
 NAV_GROUP_MAP80.worktraining96='core';CORE_TAB_SET80.add('worktraining96');
 installDowntimeDock96();
}
function renderWorkHub96(){
 ensureWorkHub96();const sec=$('worktraining96');if(!sec)return;
 const d=ensureDowntime96(),block=downtimeBlock96(),rank=S.skills[d.studySkill]||0,rec=S.training.skills[d.studySkill],progress=Math.max(0,Number(rec?.progress)||0),target=trainingTarget(rank),cost=skillCost(d.studySkill);
 const best=bestActor(d.jobSkill,{diff:2,commit:false}),practice=actorPool(actorById('pc'),d.studySkill,{diff:Math.min(5,rank+1),commit:false});
 sec.innerHTML=`<div class="work-head96"><div><div class="work-kicker96">DOWNTIME · PHASES 95–96</div><h2>Jobs & Training</h2><p>Earn credits on a local shift. Practice a skill or spend earned XP to improve it.</p><div class="work-balance96"><span>CR <b>${Number(S.credits||0).toLocaleString()}</b></span><span>XP <b>${availableXp()}</b></span><span>DAY <b>${S.world?.day||1}</b></span></div></div><button class="btn" id="workWorld96">World</button></div>
 ${block?`<div class="work-note96">${pxEsc67(block)}${!S.finalized?'<br><button class="btn" id="workBuild96">Finish character</button>':''}</div>`:''}
 <div class="work-tabs96" role="tablist" aria-label="Downtime activities"><button id="jobsTab96" role="tab" aria-controls="jobsPanel96" aria-selected="${d.panel==='jobs'}">Jobs · earn credits</button><button id="trainTab96" role="tab" aria-controls="trainingPanel96" aria-selected="${d.panel==='training'}">Training · gain skills</button></div>
 <div id="jobsPanel96" role="tabpanel" aria-labelledby="jobsTab96" ${d.panel!=='jobs'?'hidden':''}><div class="work-grid96"><div class="work-card96"><div class="work-kicker96">LOCAL WORK · 1 DAY</div><h3>Take a paid shift</h3><p>Repair equipment, haul freight, assist a clinic, or use another skill. Your strongest crew member handles the check.</p><label for="jobSkill96">Work skill</label><select id="jobSkill96">${skillOptions96(GENERAL_SKILLS,d.jobSkill)}</select><div class="work-preview96"><b>${pxEsc67(best.actor.name)}</b> · difficulty 2<br>${dicePoolHTML(best.p)}</div><button class="btn primary" id="workShift96" ${block?'disabled':''}>Work one day · roll for credits</button><p>Success pays <b>75 + 25 per net success + 10 per net advantage</b> credits. Failure pays 0. Includes a night of rest.</p></div><div class="work-card96"><div class="work-kicker96">LONGER OPPORTUNITIES</div><h3>Contracts & missions</h3><p>Find bounties, salvage contracts, and story missions on the Operations board. Missions can award credits and XP.</p><button class="btn" id="workContracts96">Open Operations board</button><button class="btn" id="workStory96">Open Story missions</button><p>Shifts earn credits, not XP. Practice builds skill ranks directly.</p><div class="work-balance96"><span>SHIFTS <b>${d.shifts}</b></span><span>TOTAL PAY <b>${Number(d.totalPay).toLocaleString()} Cr</b></span></div></div></div></div>
 <div id="trainingPanel96" role="tabpanel" aria-labelledby="trainTab96" ${d.panel!=='training'?'hidden':''}><div class="work-card96"><label for="trainSkill96" style="margin-top:0">Skill to improve</label><select id="trainSkill96">${skillOptions96(Object.keys(SKILL_CHAR),d.studySkill)}</select><p><b>${pxEsc67(d.studySkill)}</b> · current rank ${rank}${rank<5?` → next rank ${rank+1}`:' · maximum rank'}</p></div><div class="work-grid96" style="margin-top:14px"><div class="work-card96"><div class="work-kicker96">PRACTICE · 1 DAY · NO XP COST</div><h3>Learn through practice</h3><p>${rank>=5?'This skill is fully trained.':`${progress}/${target} practice toward rank ${rank+1}. Progress carries over between sessions.`}</p><progress class="work-progress96" max="${target}" value="${Math.min(progress,target)}" aria-label="Practice toward next skill rank"></progress><div class="work-preview96">Your character · difficulty ${Math.min(5,rank+1)}<br>${dicePoolHTML(practice.p)}</div><button class="btn primary" id="practiceSkill96" ${block||rank>=5?'disabled':''}>Practice one day · roll to learn</button><p>Success gives 1 practice, +1 per 2 net advantage, +1 for a triumph. A failed roll can give 1 practice with 3+ net advantage. Includes rest.</p><p>This is the game's free-practice option, separate from XP advancement. Practice does not award XP.</p></div><div class="work-card96"><div class="work-kicker96">XP ADVANCEMENT · INSTANT</div><h3>Spend earned XP</h3><p>${rank>=5?'Maximum rank reached.':`Buy rank ${rank+1} in ${pxEsc67(d.studySkill)} for ${cost} XP. You have ${availableXp()} XP available.`}</p><button class="btn primary" id="advanceSkill96" ${block||rank>=5||availableXp()<cost?'disabled':''}>${rank>=5?'Rank 5 · fully trained':`Buy rank ${rank+1} · ${cost} XP`}</button><p>Uses the existing career / non-career skill costs. No credits spent and no day passes.</p><button class="btn" id="trainingMissions96">Find missions to earn XP</button></div></div></div>
 ${WORK96.notice?`<div class="work-result96 ${WORK96.notice.error?'error96':''}" role="status"><b>${pxEsc67(WORK96.notice.title)}</b>${pxEsc67(WORK96.notice.text)}</div>`:''}
 <details class="work-log96"><summary>Recent activity · ${d.history.length} entries</summary>${d.history.length?`<ol>${d.history.map(x=>`<li><b>Day ${x.day} · ${pxEsc67(x.title||'Downtime')}</b><br>${pxEsc67(x.text)}</li>`).join('')}</ol>`:'<p class="small">Completed shifts and training sessions will appear here.</p>'}</details>`;
 $('workWorld96').onclick=()=>renderNavTab('pixelworld67');if($('workBuild96'))$('workBuild96').onclick=()=>renderNavTab('guide');
 $('jobsTab96').onclick=()=>openWorkHub96('jobs');$('trainTab96').onclick=()=>openWorkHub96('training');
 sec.querySelector('[role="tablist"]').onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const panel=d.panel==='jobs'?'training':'jobs';openWorkHub96(panel);$(panel==='jobs'?'jobsTab96':'trainTab96').focus()}};
 $('jobSkill96').onchange=e=>{d.jobSkill=e.target.value;WORK96.notice=null;renderWorkHub96();safeAutosave()};
 $('trainSkill96').onchange=e=>{d.studySkill=e.target.value;WORK96.notice=null;renderWorkHub96();safeAutosave()};
 $('workShift96').onclick=()=>workShift96();$('practiceSkill96').onclick=()=>practiceSkill96();$('advanceSkill96').onclick=()=>advanceSkill96();
 $('workContracts96').onclick=()=>renderNavTab('gm');$('workStory96').onclick=$('trainingMissions96').onclick=()=>renderNavTab('story61tab');
}
function installDowntimeDock96(){
 const dock=$('mobileDock52');if(!dock||dock.dataset.phase96)return;
 dock.dataset.phase96='true';delete dock.dataset.ready;
 dock.innerHTML='<button data-mobiletab52="playhub80"><span>⌂</span><small>Home</small></button><button data-mobiletab52="pixelworld67"><span>◎</span><small>World</small></button><button data-mobiletab52="worktraining96" data-workpanel96="jobs"><span>Cr</span><small>Jobs</small></button><button data-mobiletab52="worktraining96" data-workpanel96="training"><span>↑</span><small>Train</small></button><button id="mobileMore52"><span>☰</span><small>More</small></button>';
 initMobile52();dock.querySelectorAll('[data-workpanel96]').forEach(b=>b.onclick=()=>openWorkHub96(b.dataset.workpanel96));
}
const priorSyncMobile96=syncMobileNav52;
syncMobileNav52=function(id){priorSyncMobile96(id);$('mobileDock52')?.querySelectorAll('[data-workpanel96]').forEach(b=>b.classList.toggle('on',id==='worktraining96'&&b.dataset.workpanel96===ensureDowntime96().panel))};
const priorHub96=renderPlayHub80;
renderPlayHub80=function(){
 priorHub96();const hub=$('playhub80');if(!hub||$('hubWork96'))return;
 const card=document.createElement('div');card.id='hubWork96';card.className='work-card96 hub-work96';
 card.innerHTML='<div class="work-kicker96">BUILD YOUR NEXT ADVANTAGE</div><h3>Jobs & Training</h3><p>Need credits or a stronger skill? Take a paid shift, practice for free, or buy a rank with earned XP.</p><div class="actions"><button class="btn primary" id="hubJobs96">Find paid work</button><button class="btn" id="hubTrain96">Learn a skill</button></div>';
 hub.querySelector('.playhub80-grid')?.insertAdjacentElement('beforebegin',card);
 $('hubJobs96').onclick=()=>openWorkHub96('jobs');$('hubTrain96').onclick=()=>openWorkHub96('training');
};
const priorLoopStats96=loopStats80;
loopStats80=function(){return {...priorLoopStats96(),xp:availableXp()}};
const priorWorldUI96=ensureWorldUI94;
ensureWorldUI94=function(){
 priorWorldUI96();const drawer=$('worldDrawer94');if(!drawer||$('worldWork96'))return;
 const card=document.createElement('div');card.id='worldWork96';card.className='world-work96';card.innerHTML='<button class="world-button94" id="worldJobs96">Jobs · earn Cr</button><button class="world-button94" id="worldTrain96">Train · gain skills</button><div class="tiny">In Sable Reach, the Jobs and Training kiosks are on the central plaza, just south of Broker’s Row.</div>';
 drawer.querySelector('.drawer-head94')?.insertAdjacentElement('afterend',card);
 $('worldJobs96').onclick=()=>openWorkHub96('jobs');$('worldTrain96').onclick=()=>openWorkHub96('training');
};
const priorTown96=buildSableTown86;
buildSableTown86=function(){const m=priorTown96();m.objects.push(
 {id:'jobsKiosk96',kind:'terminal',x:22,y:12,label:'Jobs Kiosk',prompt:'Find paid local work',action:'jobs96'},
 {id:'trainingKiosk96',kind:'terminal',x:24,y:12,label:'Training Kiosk',prompt:'Practice and improve skills',action:'training96'});return m};
const priorObject96=pxInteractObject67;
pxInteractObject67=function(o){if(o.action==='jobs96')return openWorkHub96('jobs');if(o.action==='training96')return openWorkHub96('training');return priorObject96(o)};
const priorObjectDraw96=pxDrawObject67;
pxDrawObject67=function(c,o,x,y){
 const r=priorObjectDraw96(c,o,x,y);if(!['jobs96','training96'].includes(o.action))return r;
 c.save();c.font='bold 6px monospace';c.textBaseline='bottom';const label=o.action==='jobs96'?'JOBS':'TRAIN',tw=c.measureText(label).width;c.fillStyle='#081522';c.fillRect(x+8-tw/2-2,y-7,tw+4,9);c.fillStyle=o.action==='jobs96'?'#ffdc7a':'#9eddd4';c.fillText(label,x+8-tw/2,y);c.restore();return r;
};
const priorDialogue96=openVisualDialogue69;
openVisualDialogue69=function(n,...args){const r=priorDialogue96(n,...args);if(!n.crewId&&$('visualWork69'))$('visualWork69').onclick=()=>openWorkHub96('jobs');return r};
/* Old Campaign buttons use the same guarded, day-consuming workflows. */
downtimeJob=function(){return workShift96($('downtimeSkill')?.value||'Mechanics')};
studySkillSession=function(){return practiceSkill96($('studySkill46')?.value||'Mechanics')};
function syncLegacyDowntime96(){
 const block=downtimeBlock96();
 if($('downtimeJob')){$('downtimeJob').textContent='Work one day · roll for credits';$('downtimeJob').disabled=!!block}
 if($('studyButton46')){$('studyButton46').textContent='Practice one day · roll to learn';$('studyButton46').disabled=!!block||(S.skills[$('studySkill46')?.value]||0)>=5}
 const note=$('studyDowntime46')?.querySelector('.small');
 if(note)note.textContent='Free practice builds skill ranks directly. Each session takes one day including rest; no XP or credits are spent. Jobs & Training in Core Play and the mobile dock shows progress, payouts, and XP advancement.';
}
const priorHydrate96=hydrateState;
hydrateState=function(x,label){if(x&&typeof x==='object'&&!Array.isArray(x)){S.downtime96=x.downtime96||freshDowntime96();WORK96.notice=null}return priorHydrate96(x,label)};
const priorNav96=renderNavTab;
renderNavTab=function(id){ensureWorkHub96();const r=priorNav96(id);if(id==='worktraining96')renderWorkHub96();syncMobileNav52(id);return r};
const priorRender96=renderAll;
renderAll=function(){ensureWorkHub96();const r=priorRender96();renderWorkHub96();syncLegacyDowntime96();const active=document.querySelector('#tabHost78>.tab:not(.hidden)')?.id;syncMobileNav52(active);return r};
const priorDiagnostics96=phase45Diagnostics;
phase45Diagnostics=function(){const rows=priorDiagnostics96();rows.push({name:'Phase 95 local-map styles',ok:!!$('downtime96Styles')},{name:'Phase 96 Jobs and Training hub',ok:!!$('worktraining96')&&document.querySelectorAll('#mobileDock52 [data-workpanel96]').length===2},{name:'Phase 96 saved downtime state',ok:!!serializableState().downtime96&&serializableState().schemaVersion===92});return rows};
BUILD_INFO.version='96.0-jobs-training-mobile';BUILD_INFO.saveSchema=92;
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version};
