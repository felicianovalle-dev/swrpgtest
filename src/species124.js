/* Check-local declarations. Only the rolled result/context enters S.last. */
(()=>{
 'use strict';
 let selectedSpecies=null,qualifies=false,difficulty=2,boost=0,setback=0;
 const supported=()=>['devaronian','wookiee'].includes(S.species);
 const bounded=(value,max)=>Number.isInteger(Number(value))?Math.max(0,Math.min(max,Number(value))):0;
 const skill=()=>S.species==='devaronian'?'Resilience':'Athletics';
 const context=()=>({actorId:'pc',speciesCheck124:true,diff:difficulty,boost,setback,...(S.species==='devaronian'?{poison:qualifies}:{climb:true,clawPierceable:qualifies})});
 function clearContext(){selectedSpecies=null;qualifies=false;difficulty=2;boost=0;setback=0;}
 function renderPool(){
  if(!$('speciesPool124')||!supported())return;
  const q=actorPool(actorById('pc'),skill(),context()),poison=S.species==='devaronian';
  $('speciesPool124').innerHTML=`<p>${pxEsc67(S.name)} · ${skill()} · ${qualifies?(poison?'Multiple Livers: +3 Boost':'Climbing Claws: +1 Boost'):'No species bonus'}</p>${dicePoolHTML(q.p)}`;
 }
 function roll(){
  if(!supported()||!S.finalized||S.combat)return false;
  const out=performBest(skill(),context());
  qualifies=false;render();$('speciesRoll124')?.focus({preventScroll:true});renderHud();safeAutosave();return out;
 }
 function render(){
  if(!$('skills'))return;
  if(selectedSpecies!==S.species){clearContext();selectedSpecies=S.species;}
  let box=$('speciesChecks124');
  if(!supported()){box?.remove();return;}
  if(!box){box=document.createElement('section');box.id='speciesChecks124';box.className='creation-note97';$('skills').append(box);}
  const poison=S.species==='devaronian',last=S.last;
  box.innerHTML=`<h3>${poison?'Poison resistance':'Climbing'} check</h3><p>${poison?'Multiple Livers adds 3 Boost when resisting poison, including alcohol. Other Resilience checks receive no species bonus.':'Climbing Claws adds 1 Boost to an Athletics check when climbing a surface your claws can pierce. Other Athletics checks receive no climbing bonus.'}</p>
   <label style="display:flex;align-items:center;gap:8px"><input id="speciesQualifies124" type="checkbox" style="width:auto;flex:0 0 auto" ${qualifies?'checked':''}> ${poison?'This check resists poison':'The climbing surface can be pierced by claws'}</label>
   <div class="grid g3"><label>Difficulty<select id="speciesDifficulty124">${[0,1,2,3,4,5].map(n=>`<option value="${n}" ${difficulty===n?'selected':''}>${n}</option>`).join('')}</select></label><label>Other Boost dice<input id="speciesBoost124" type="number" min="0" max="10" value="${boost}"></label><label>Setback dice<input id="speciesSetback124" type="number" min="0" max="10" value="${setback}"></label></div>
   <div id="speciesPool124" aria-live="polite"></div>
   <button id="speciesRoll124" class="btn primary" ${!S.finalized||S.combat?'disabled':''}>Roll your ${skill()} check</button><p>${!S.finalized?'Finalize your character to roll.':S.combat?'Finish the active combat before using this check.':'Uses your character and the normal check, Destiny and talent rules. No XP or credits are awarded.'} Confirm the circumstance for each roll; it clears after rolling, leaving Skills, or loading.</p>
   ${last?.ctx?.speciesCheck124?`<div id="speciesLast124" role="status"><b>Last check · ${pxEsc67(last.q.skill)}</b>${dicePoolHTML(last.q.p)}${resultHTML(last.r)}</div>`:''}`;
  $('speciesQualifies124').onchange=()=>{qualifies=$('speciesQualifies124').checked;renderPool();};
  for(const [id,max,set] of [['speciesDifficulty124',5,v=>difficulty=v],['speciesBoost124',10,v=>boost=v],['speciesSetback124',10,v=>setback=v]])$(id).onchange=()=>{const value=bounded($(id).value,max);set(value);$(id).value=String(value);renderPool();};
  $('speciesRoll124').onclick=roll;
  renderPool();
 }
 window.Species124={render,clearContext};
 Game97.on('render',render);
 Game97.on('hydrate',()=>{clearContext();render();});
 Game97.on('navigate',({id,internal})=>{if(id==='skills')render();else if(!internal){clearContext();render();}});
})();
