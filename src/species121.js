/* Tiss'shar subspecies benefits: derived talent ranks or one included skill rank. */
(()=>{
 'use strict';
 const game=window.Game97,esc=pxEsc67;
 const choices={
  'ask-ar':{name:'Ask-ar',skill:'Coordination'},'isk-ar':{name:'Isk-ar',talent:'Gearhead'},
  'kal-ar':{name:'Kal-ar',skill:'Charm'},'nil-ar':{name:'Nil-ar',skill:'Stealth'},
  'orl-ar':{name:'Orl-ar',skill:'Athletics'},'sil-ar':{name:'Sil-ar',talent:'Convincing Demeanor'}
 };
 const selected=(state=S)=>state.species==='tissshar'&&typeof state.tisssharSubtype121==='string'&&Object.hasOwn(choices,state.tisssharSubtype121)?choices[state.tisssharSubtype121]:null;
 const pending=(state=S)=>state.species==='tissshar'&&!selected(state);
 const skillChoice=()=>selected()?.skill;
 const skillBonus=skill=>skillChoice()===skill?1:0;
 const talentBonus=name=>selected()?.talent===name?1:0;
 const available=id=>{if(typeof id!=='string'||!Object.hasOwn(choices,id))return false;const c=choices[id];return !!c&&(!c.skill||((S.skills[c.skill]||0)<(S.finalized?5:2)&&(S.finalized||(S.skills[c.skill]||0)<=freeFloor(c.skill))));};
 function choose(id){
  if(!pending()||!available(id))return false;
  S.tisssharSubtype121=id;const c=choices[id];if(c.skill)S.skills[c.skill]=(S.skills[c.skill]||0)+1;
  bLog(`${c.name} starting benefit confirmed. Saved characteristics, XP spending and purchases are unchanged.`);renderAll();return true;
 }
 function validateSnapshot(state){
  const id=state.tisssharSubtype121;if(id===undefined)return;
  if(state.species!=='tissshar'||typeof id!=='string'||!Object.hasOwn(choices,id))throw new Error('Invalid Tiss’shar subspecies.');
  const skill=choices[id].skill;if(skill&&(!Number.isInteger(state.skills?.[skill])||state.skills[skill]<1||state.skills[skill]>5))throw new Error('Invalid Tiss’shar included skill rank.');
 }
 const benefit=c=>c.skill?`${c.skill} 1`:`${c.talent} 1`;
 function renderReview(){
  $('tisssharReview121')?.remove();if(S.species!=='tissshar'||!$('reviewBody'))return;
  const c=selected(),box=document.createElement('div');box.id='tisssharReview121';box.className='creation-profile97';
  box.innerHTML=`<h3>Tiss’shar subspecies</h3>${c?`<p>${esc(c.name)} · ${esc(benefit(c))} included${c.talent?` · ${talentRank(c.talent)} total talent rank(s)`:''}</p>`:'<p>Choose your subspecies benefit on Identity. Existing characters may claim the missing benefit once.</p><button class="btn" id="tisssharReviewChoose121">Choose subspecies</button>'}`;
  $('reviewBody').appendChild(box);$('tisssharReviewChoose121')?.addEventListener('click',()=>renderNavTab('identity'));if(!S.finalized&&pending()&&$('finalize'))$('finalize').disabled=true;
 }
 function render(){
  $('tisssharChoice121')?.remove();renderReview();if(S.species!=='tissshar'||!$('speciesInfo'))return;
  const c=selected(),box=document.createElement('div');box.id='tisssharChoice121';box.className='creation-note97';
  box.innerHTML=c?`<h3>${esc(c.name)} · confirmed</h3><p>${esc(benefit(c))} is included. The choice is fixed; purchased talent ranks stack.</p>`:`<h3>Choose your subspecies</h3><p>Each subspecies includes one skill or talent rank. The choice is fixed when confirmed. ${S.finalized?'Claiming an older character’s missing benefit preserves saved characteristics and past XP spending.':'Undo any paid ranks in the chosen skill first; the creation cap remains rank 2.'}</p><label>Subspecies<select id="tisssharSubtype121"><option value="">Choose a subspecies</option>${Object.entries(choices).map(([id,c])=>`<option value="${id}" ${available(id)?'':'disabled'}>${esc(c.name)} · ${esc(benefit(c))}${available(id)?'':' · unavailable at current ranks'}</option>`).join('')}</select></label><button class="btn" id="tisssharConfirm121" disabled>Confirm subspecies</button>`;
  $('speciesInfo').after(box);if(!c){$('tisssharSubtype121').onchange=()=>{$('tisssharConfirm121').disabled=!available($('tisssharSubtype121').value)};$('tisssharConfirm121').onclick=()=>choose($('tisssharSubtype121').value);}
 }
 window.Species121={pending,choose,validateSnapshot,renderReview,skillChoice,skillBonus,talentBonus};
 game.on('render',render);game.on('hydrate',data=>{if(data.tisssharSubtype121===undefined)delete S.tisssharSubtype121;render();});game.on('navigate',({id})=>{if(['identity','review'].includes(id))render();});
})();
