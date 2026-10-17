/* Cerean Intellectuals: two permanent career-skill choices, never free ranks. */
(() => {
  'use strict';
  const game=window.Game97,esc=pxEsc67;
  const knowledge=()=>Object.keys(SKILL_CHAR).filter(skill=>skill.startsWith('Knowledge ('));
  function valid(skills){return Array.isArray(skills)&&skills.length===2&&new Set(skills).size===2&&skills.every(skill=>knowledge().includes(skill));}
  function chosen(state=S){return state.species==='cerean'&&valid(state.speciesCareerSkills117)?state.speciesCareerSkills117:[];}
  function pending(state=S){return state.species==='cerean'&&chosen(state).length!==2;}
  // During creation, do not change the refund price of an already-purchased rank.
  function available(skill){return S.finalized||careerSkills().has(skill)||(S.skills[skill]||0)<=freeFloor(skill);}
  function choose(skills){
    if(!pending()||!valid(skills)||!skills.every(available))return false;
    S.speciesCareerSkills117=[...skills];
    bLog(`Intellectuals: ${skills.join(' and ')} are now career skills. No free ranks or XP refunds are granted.`);
    renderAll();return true;
  }
  function validateSnapshot(state){
    if(state.speciesCareerSkills117!==undefined&&(state.species!=='cerean'||!valid(state.speciesCareerSkills117)))throw new Error('Invalid Cerean Knowledge career skills.');
  }
  function renderReview(){
    $('cereanReview117')?.remove();if(S.species!=='cerean'||!$('reviewBody'))return;
    const box=document.createElement('div');box.id='cereanReview117';box.className='creation-profile97';
    box.innerHTML=`<h3>Intellectuals · Cerean</h3>${pending()?'<p>Choose two Knowledge career skills on the Career screen.</p><button class="btn" id="cereanReviewChoose117">Choose Knowledge skills</button>':`<p>${chosen().map(esc).join(' · ')}</p><p>These are career skills. Skill ranks still cost XP.</p>`}`;
    $('reviewBody').appendChild(box);
    $('cereanReviewChoose117')?.addEventListener('click',()=>renderNavTab('career'));
    if(!S.finalized&&pending()&&$('finalize'))$('finalize').disabled=true;
  }
  function render(){
    $('cereanKnowledge117')?.remove();renderReview();if(S.species!=='cerean'||!$('careerInfo'))return;
    const box=document.createElement('div');box.id='cereanKnowledge117';box.className='creation-note97';
    if(!pending())box.innerHTML=`<h3>Intellectuals · confirmed</h3><p>${chosen().map(esc).join(' · ')}</p><p>These are career skills. No free ranks are granted; existing XP spending is unchanged.</p>`;
    else {
      const options=knowledge().map(skill=>`<option value="${esc(skill)}" ${available(skill)?'':'disabled'}>${esc(skill)}${available(skill)?careerSkills().has(skill)?' · already career':'':' · undo purchased ranks first'}</option>`).join('');
      box.innerHTML=`<h3>Intellectuals · choose two Knowledge skills</h3><p>Your choices become career skills, without free ranks. Choices are fixed when confirmed.</p>${knowledge().some(skill=>!available(skill))?'<p>To choose a skill bought during creation, undo its purchased ranks first. This preserves the original XP refund.</p>':''}<label>First Knowledge skill<select id="cereanFirst117"><option value="">Choose a skill</option>${options}</select></label><label>Second Knowledge skill<select id="cereanSecond117"><option value="">Choose another skill</option>${options}</select></label><button class="btn" id="cereanConfirm117" disabled>Confirm Knowledge skills</button>`;
    }
    $('careerInfo').after(box);
    if(pending()){
      const values=()=>[$('cereanFirst117').value,$('cereanSecond117').value];
      for(const id of ['cereanFirst117','cereanSecond117'])$(id).onchange=()=>{$('cereanConfirm117').disabled=!valid(values())||!values().every(available);};
      $('cereanConfirm117').onclick=()=>choose(values());
    }
  }
  window.Species117={careerSkills:chosen,pending,choose,validateSnapshot,renderReview};
  game.on('render',render);game.on('hydrate',render);game.on('navigate',({id})=>{if(['career','review'].includes(id))render();});
})();
