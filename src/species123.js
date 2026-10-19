/* Gand respiration: a once-only starting choice; breathing remains narrative. */
(()=>{
 'use strict';
 const game=window.Game97,esc=pxEsc67;
 const choices={lungless:{name:'Lungless',xp:0},ammonia:{name:'With lungs · ammonia breather',xp:10}};
 const selected=(state=S)=>state.species==='gand'&&typeof state.gandRespiration123==='string'&&Object.hasOwn(choices,state.gandRespiration123)?choices[state.gandRespiration123]:null;
 const pending=(state=S)=>state.species==='gand'&&!selected(state);
 function choose(id){
  if(!pending()||typeof id!=='string'||!Object.hasOwn(choices,id))return false;
  const choice=choices[id],start=S.xpStart+choice.xp,earned=S.earnedXp+(S.finalized?choice.xp:0);
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(earned))return false;
  S.gandRespiration123=id;S.xpStart=start;S.earnedXp=earned;
  bLog(`${choice.name} confirmed.${choice.xp?` The included 10 XP ${S.finalized?'is available for advancement':'increases your starting budget'}.`:''} Past purchases and characteristics are unchanged. Breathing is resolved narratively.`);
  renderAll();return true;
 }
 function validateSnapshot(state){
  const id=state.gandRespiration123;
  if(id!==undefined&&(state.species!=='gand'||typeof id!=='string'||!Object.hasOwn(choices,id)))throw new Error('Invalid Gand respiration subtype.');
 }
 function renderReview(){
  $('gandReview123')?.remove();if(S.species!=='gand'||!$('reviewBody'))return;
  const choice=selected(),box=document.createElement('div');box.id='gandReview123';box.className='creation-profile97';
  box.innerHTML=`<h3>Gand respiration</h3>${choice?`<p>${esc(choice.name)} · starting XP ${S.xpStart}. Breathing remains manual.</p>`:'<p>Choose your respiration subtype on Identity. Existing characters can confirm their missing choice once.</p><button class="btn" id="gandReviewChoose123">Choose respiration</button>'}`;
  $('reviewBody').appendChild(box);$('gandReviewChoose123')?.addEventListener('click',()=>renderNavTab('identity'));
  if(!S.finalized&&pending()&&$('finalize'))$('finalize').disabled=true;
 }
 function render(){
  $('gandChoice123')?.remove();renderReview();if(S.species!=='gand'||!$('speciesInfo'))return;
  const choice=selected(),box=document.createElement('div');box.id='gandChoice123';box.className='creation-note97';
  const pill=$('speciesInfo').querySelector('.row > .pill');if(pill)pill.textContent=`Starting XP ${S.xpStart}`;
  box.innerHTML=choice?`<h3>${esc(choice.name)} · confirmed</h3><p>The choice is fixed. ${choice.xp?'The included 10 XP has already been granted.':'No extra XP is granted.'} Breathing and Rituals remain manual.</p>`:`<h3>Choose your respiration</h3><p>Lungless ignores suffocation penalties. With lungs grants 10 extra starting XP, but needs an ammonia mask in ordinary environments; oxygen is a rating-8 dangerous atmosphere. Breathing remains manual and no mask is automatically added. The choice is fixed when confirmed.${S.finalized?' An older character can confirm once; With lungs grants the missing 10 XP for advancement without changing purchases.':''}</p><label>Respiration<select id="gandRespiration123"><option value="">Choose a subtype</option><option value="lungless">Lungless · no extra XP</option><option value="ammonia">With lungs · +10 XP</option></select></label><button class="btn" id="gandConfirm123" disabled>Confirm respiration</button>`;
  $('speciesInfo').after(box);if(!choice){$('gandRespiration123').onchange=()=>{$('gandConfirm123').disabled=!Object.hasOwn(choices,$('gandRespiration123').value)};$('gandConfirm123').onclick=()=>choose($('gandRespiration123').value);}
 }
 window.Species123={pending,choose,validateSnapshot,renderReview};
 game.on('render',render);game.on('hydrate',data=>{if(data.gandRespiration123===undefined)delete S.gandRespiration123;render();});game.on('navigate',({id})=>{if(['identity','review'].includes(id))render();});
})();
