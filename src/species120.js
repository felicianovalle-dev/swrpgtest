/* One included Geonosian rank, including a once-only claim for older saves. */
(()=>{
 'use strict';
 const game=window.Game97,esc=pxEsc67;
 const known=skill=>typeof skill==='string'&&Object.hasOwn(SKILL_CHAR,skill);
 const pending=(state=S)=>state.species==='geonosian'&&!known(state.geonosianSkill120);
 const available=skill=>known(skill)&&(S.skills[skill]||0)<(S.finalized?5:2)&&(S.finalized||(S.skills[skill]||0)<=freeFloor(skill));
 function choose(skill){
  if(!pending()||!available(skill))return false;
  S.geonosianSkill120=skill;S.skills[skill]=(S.skills[skill]||0)+1;
  bLog(`Geonosian starting benefit: ${skill} gains one included rank. XP spending is unchanged.`);renderAll();return true;
 }
 function validateSnapshot(state){
  const skill=state.geonosianSkill120;
  if(skill!==undefined&&(state.species!=='geonosian'||!known(skill)||!Number.isInteger(state.skills?.[skill])||state.skills[skill]<1||state.skills[skill]>5))throw new Error('Invalid Geonosian included skill rank.');
 }
 function renderReview(){
  $('geonosianReview120')?.remove();if(S.species!=='geonosian'||!$('reviewBody'))return;
  const box=document.createElement('div');box.id='geonosianReview120';box.className='creation-profile97';
  box.innerHTML=`<h3>Geonosian included rank</h3>${pending()?'<p>Choose one skill rank on Identity. Existing progress and XP spending are preserved.</p><button class="btn" id="geonosianReviewChoose120">Choose included rank</button>':`<p>${esc(S.geonosianSkill120)} · one included rank</p>`}`;
  $('reviewBody').appendChild(box);$('geonosianReviewChoose120')?.addEventListener('click',()=>renderNavTab('identity'));
  if(!S.finalized&&pending()&&$('finalize'))$('finalize').disabled=true;
 }
 function render(){
  $('geonosianChoice120')?.remove();renderReview();if(S.species!=='geonosian'||!$('speciesInfo'))return;
  const box=document.createElement('div');box.id='geonosianChoice120';box.className='creation-note97';
  box.innerHTML=!pending()?`<h3>Included skill rank · confirmed</h3><p>${esc(S.geonosianSkill120)} gains one included rank. The choice is fixed.</p>`:`<h3>Choose your included skill rank</h3><p>Choose any skill. This adds one rank without spending or refunding XP. The choice is fixed when confirmed.${S.finalized?' Older characters can claim their missing starting benefit once.':' During creation, undo any paid ranks in your chosen skill first; the creation cap remains rank 2.'}</p><label>Skill<select id="geonosianSkill120"><option value="">Choose a skill</option>${Object.keys(SKILL_CHAR).map(skill=>`<option ${available(skill)?'':'disabled'} value="${esc(skill)}">${esc(skill)}${available(skill)?'':' · unavailable at current ranks'}</option>`).join('')}</select></label><button class="btn" id="geonosianConfirm120" disabled>Confirm included rank</button>`;
  $('speciesInfo').after(box);
  if(pending()){$('geonosianSkill120').onchange=()=>{$('geonosianConfirm120').disabled=!available($('geonosianSkill120').value)};$('geonosianConfirm120').onclick=()=>choose($('geonosianSkill120').value);}
 }
 window.Species120={pending,choose,validateSnapshot,renderReview};
 game.on('render',render);game.on('hydrate',data=>{if(data.geonosianSkill120===undefined)delete S.geonosianSkill120;render();});game.on('navigate',({id})=>{if(['identity','review'].includes(id))render();});
})();
