/* Campaign creation uses the shared runtime and the existing XP/story/save engines. */
(() => {
  'use strict';
  const game=window.Game97, catalog=window.CharacterCatalog97, content=window.CampaignContent97, esc=pxEsc67;
  const defaults={enabled:false,era:'civil-war',faction:'fringe',focus:'fringe',mission:'fringeManifest97',weapon:'pistol',applied:false,opening:'unread'};
  const personal={callsign:'',pronouns:'',appearance:'',background:'',goal:'',motivation:'Freedom',shipName:''};
  const steps=[['campaignSetup97','1 · Beginning'],['identity','2 · Identity'],['career','3 · Career'],['chars','4 · Starting XP'],['personal97','5 · Personal details'],['review','6 · Review']];
  function config(state=S) { const value=state.campaign97;return value&&typeof value==='object'&&!Array.isArray(value)?{...defaults,...value,profile:{...personal,...value.profile}}:{...defaults,profile:{...personal}}; }
  function hasSetup(state=S) { return config(state).enabled===true; }
  function lane(state=S) { const c=config(state);return c.focus==='force'?'force':content.factions[c.faction]?.lane||'fringe'; }
  function compatible(c) { return !!content.eras[c.era]?.factions.includes(c.faction); }
  function eligibleMission(id,state=S) {
    const t=STORY_TEMPLATES_61[id];if(!t)return false;
    if(!hasSetup(state))return !t.campaign97;
    if(!t.campaign97)return false;
    const allowed=t.campaign97.lane===content.factions[config(state).faction]?.lane || t.campaign97.lane==='force'&&state.forceRating>0;
    return allowed&&!state.story61?.completed?.some(q=>q.templateId===id);
  }
  function offers(state=S) { return hasSetup(state)?content.missions.filter(m=>eligibleMission(m.id,state)).map(m=>m.id):null; }
  function initialMissions(state=S) { return content.missions.filter(m=>m.lane===lane(state)); }
  function choose(field,value) {
    if(S.finalized)return false;
    const c=config();c.enabled=true;c[field]=value;
    if(!content.eras[c.era])c.era=defaults.era;
    if(!compatible(c))c.faction=content.eras[c.era].factions[0];
    if(!['fringe','service','force'].includes(c.focus))c.focus='fringe';
    const list=content.missions.filter(m=>m.lane===(c.focus==='force'?'force':content.factions[c.faction].lane));
    if(!list.some(m=>m.id===c.mission))c.mission=list[0].id;
    if(!['holdout','pistol','carbine','lightsaber'].includes(c.weapon))c.weapon='pistol';
    S.campaign97=c;renderAll();return true;
  }
  function startCreation() { choose('era',config().era);renderNavTab('identity'); }
  function issues(state=S) {
    if(!hasSetup(state))return [];
    const c=config(state), errors=[];
    if(window.Species117?.pending(state))errors.push('Choose two Knowledge career skills for Intellectuals on the Career screen.');
    if(!compatible(c))errors.push('Choose an allegiance available at your era start.');
    if(!initialMissions(state).some(m=>m.id===c.mission))errors.push('Choose an opening for your story type.');
    if(!state.name?.trim())errors.push('Give your character a name.');
    const meta=CAREERS[state.career],req=catalog.requirement(state.spec);
    if(req.species&&state.species!==req.species)errors.push('Clone Soldier specializations require a Clone character.');
    if(req.forceRating&&state.forceRating<req.forceRating)errors.push(`${state.spec} requires Force Rating ${req.forceRating}. Begin as a Padawan and acquire this specialization later.`);
    if(c.focus==='force'&&state.forceRating<1)errors.push('This opening needs Force Rating 1. Choose a Force career or purchase a Force-sensitive universal specialization.');
    if(c.weapon==='lightsaber'&&state.forceRating<1)errors.push('Choose a blaster starter or build a Force-sensitive character for the lightsaber starter.');
    const cap=meta?.careerPicks||4;
    if(state.freeCareer?.length!==cap || state.freeSpec?.length!==2)errors.push(`Choose ${cap} free career ranks and 2 free specialization ranks.`);
    if(Object.values(state.skills||{}).some(rank=>rank>2))errors.push('Starting skill ranks cannot exceed 2.');
    if(state.xpSpent>state.xpStart || state.xpSpent<0)errors.push('Starting XP spending must fit your species budget.');
    if(state.species==='human') {
      const bonus=state.speciesBonus97||[],career=new Set([...meta.skills,...meta.specs[state.spec]]);
      if(bonus.length!==2||new Set(bonus).size!==2||bonus.some(sk=>career.has(sk)))errors.push('Choose the Human bonus rank in two distinct non-career skills on the Career screen.');
    }
    return errors;
  }
  function checkBeforeFinalize() {
    const errors=issues();if(errors.length){bLog(errors.join(' '));refreshReview();renderNavTab('review');return false;}return true;
  }
  function applyBeginning() {
    const c=config();if(c.applied||!S.finalized)return false;
    c.applied=true;c.opening='unread';S.campaign97=c;S.originApplied=true;
    S.credits=500;S.weapon=c.weapon;S.armor='heavyClothing';
    S.inventory=(S.inventory||[]).filter(id=>!WEAPONS[id]&&!ARMOR[id]);ensureInventory();
    S.ship.owned=true;S.ship.model='hwk290';ensurePhase14State();S.ship.name=c.profile.shipName.trim()||'First Light';S.ship.location='sable';
    S.ep15.mainStage=9;S.ep15.dungeonStage=0;S.ep15.location='orbit';S.ep15.flags.originSkipped=true;
    S.ep15.flags.campaignOpening97=true;
    const faction=content.factions[c.faction];
    S.framework=c.focus==='force'||CAREERS[S.career].forceStart?'Morality':faction.framework;
    S.frameworkType=S.framework==='Morality'?'Compassion / Hatred':faction.type;S.frameworkValue=S.framework==='Morality'?50:10;
    if($('framework'))$('framework').value=S.framework;
    S.world.currentHub='sable';S.story61.active=null;S.story61.offers=offers();
    S.ep15.rep[faction.rep]=S.ep15.rep[faction.rep]||0;
    gLog(`Campaign begins: ${content.eras[c.era].name} · ${faction.name}. ${STORY_TEMPLATES_61[c.mission].name}.`);
    safeAutosave();return true;
  }
  function beginMission(id=config().mission) {
    if(!S.finalized||!config().applied||S.combat||!eligibleMission(id))return false;
    if(S.story61.active?.status==='active')return false;
    S.campaign97.opening='started';startStory61(id);return true;
  }
  function objective(state=S) {
    const result=(title,instruction,label,target)=>({title,instruction,location:'Campaign beginning',label,target});
    if(state.combat||state.story61?.active?.status==='active')return null;
    if(!state.finalized)return hasSetup(state)?result('Build your character','Choose free skills and starting XP, add personal details, then review your beginning.','Review character','review'):result('Choose your beginning','Choose an era and allegiance, then build the character you want to play.','Choose beginning','campaignSetup97');
    if(!hasSetup(state))return null;
    if(config(state).opening==='unread')return result('Read your opening',`Meet your crew and review the first assignment: ${STORY_TEMPLATES_61[config(state).mission]?.name||'your opening mission'}.`,'Read opening','opening97');
    return result('Choose your next assignment','Browse the missions suited to your allegiance and Force training, or take downtime.','Browse suitable missions','opening97');
  }
  function stepNav(id) { return `<nav class="creation-steps97" aria-label="Character creation steps">${steps.map(([target,label])=>`<button type="button" data-create-step97="${target}" ${target===id?'aria-current="step"':''}>${label}</button>`).join('')}</nav>`; }
  function bindSteps(root) { root.querySelectorAll('[data-create-step97]').forEach(b=>b.onclick=()=>{if(!hasSetup()&&!S.finalized)choose('era',config().era);renderNavTab(b.dataset.createStep97);}); }
  function errorHTML(errors) { return errors.length?`<div class="creation-errors97" role="status"><ul>${errors.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>`:''; }
  function renderSetup() {
    const box=$('campaignSetup97');if(!box)return;const c=config(),locked=S.finalized;
    if(locked&&!hasSetup()){box.innerHTML='<h2>Your campaign beginning</h2><p>This character keeps its original campaign, current location, and missions. Its era was not recorded by the earlier start screen.</p><p>Create a new character to choose one of the new beginnings.</p><button class="btn" data-create-step97="playhub80">Return Home</button>';bindSteps(box);return;}
    const list=initialMissions(),mission=STORY_TEMPLATES_61[c.mission],faction=content.factions[c.faction];
    box.innerHTML=`${locked?'':stepNav('campaignSetup97')}<h2>Choose your beginning</h2><p>Choose when your story starts and who you stand with. Your choices guide the opening and mission offers.</p><div class="creation-grid97">
      <label>Era start<select id="beginEra97" ${locked?'disabled':''}>${Object.entries(content.eras).map(([id,e])=>`<option value="${id}" ${id===c.era?'selected':''}>${esc(e.name)}</option>`).join('')}</select></label>
      <label>Allegiance<select id="beginFaction97" ${locked?'disabled':''}>${content.eras[c.era].factions.map(id=>`<option value="${id}" ${id===c.faction?'selected':''}>${esc(content.factions[id].name)}</option>`).join('')}</select></label>
      <label>Story focus<select id="beginFocus97" ${locked?'disabled':''}><option value="fringe" ${c.focus==='fringe'?'selected':''}>Life on the fringe / chosen allegiance</option><option value="service" ${c.focus==='service'?'selected':''}>Service and duty / chosen allegiance</option><option value="force" ${c.focus==='force'?'selected':''}>Force-sensitive journey</option></select></label>
      <label>First assignment<select id="beginMission97" ${locked?'disabled':''}>${list.map(m=>`<option value="${m.id}" ${m.id===c.mission?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label></div>
      <div class="creation-note97"><h3>${esc(content.eras[c.era].name)}</h3><p>${esc(content.eras[c.era].text)}</p><p><b>${esc(faction.name)}:</b> ${esc(faction.text)}</p>${c.focus==='force'?'<p>A Force-sensitive journey can accompany any allegiance. It needs Force Rating 1, obtained through your career or XP purchases.</p>':''}</div>
      <div class="creation-note97"><h3>${esc(mission.name)}</h3><p>${esc(mission.summary)}</p><p class="campaign-source97">Original Sable Reach short adventure · Inspiration: ${esc(mission.campaign97.source)}. This is a new scenario, with its own choices and rewards.</p></div>
      <p class="campaign-source97">Starting kit: 500 credits, heavy clothing, two crew members, and a shared HWK-290 transport. Choose your starter weapon during Personal details. This is a Sable Reach game-start option; species XP and talent costs still apply.</p>
      <div class="creation-next97"><button class="btn" id="catalogOpen97">Options & sources</button><button class="btn primary" id="beginIdentity97">${locked?'View character':'Next · Identity & species'}</button></div>`;
    bindSteps(box);$('beginIdentity97').onclick=locked?()=>renderNavTab('identity'):startCreation;
    $('catalogOpen97').onclick=()=>{renderNavTab('about97');$('catalogAudit97')?.scrollIntoView({block:'start'});};
    for(const [id,field]of [['beginEra97','era'],['beginFaction97','faction'],['beginFocus97','focus'],['beginMission97','mission']])$(id).onchange=()=>choose(field,$(id).value);
  }
  function renderPersonal() {
    const box=$('personal97');if(!box)return;const c=config(),p=c.profile;
    box.innerHTML=`${S.finalized?'':stepNav('personal97')}<h2>Make the character yours</h2><p>Personal details describe who you are and what you want. They stay with your saved character.</p><div class="creation-grid97">
      <label>Callsign<input id="personalCallsign97" maxlength="60" value="${esc(p.callsign)}" placeholder="Optional"></label><label>Pronouns<input id="personalPronouns97" maxlength="40" value="${esc(p.pronouns)}" placeholder="Optional"></label>
      <label>Motivation<select id="personalMotivation97">${['Freedom','Duty','Knowledge','Family','Justice','Survival','Ambition','Redemption'].map(v=>`<option ${v===p.motivation?'selected':''}>${v}</option>`).join('')}</select></label>
      <label>Ship name<input id="personalShip97" maxlength="60" value="${esc(p.shipName)}" placeholder="First Light" ${S.finalized?'disabled':''}></label>
      <label class="wide97">Appearance<input id="personalAppearance97" maxlength="240" value="${esc(p.appearance)}" placeholder="Clothing, markings, scars, or other distinguishing details"></label>
      <label class="wide97">Background<textarea id="personalBackground97" maxlength="800" rows="3" placeholder="Where you came from and what brought you to this crew">${esc(p.background)}</textarea></label>
      <label class="wide97">Personal goal<input id="personalGoal97" maxlength="240" value="${esc(p.goal)}" placeholder="What you hope to accomplish"></label>
      <label class="wide97">Starter weapon<select id="personalWeapon97" ${S.finalized?'disabled':''}>${['holdout','pistol','carbine','lightsaber'].map(id=>`<option value="${id}" ${id===c.weapon?'selected':''}>${esc(WEAPONS[id].name)}${id==='lightsaber'?' · needs Force Rating 1':''}</option>`).join('')}</select></label></div>
      <p class="campaign-source97">Personal descriptions do not change your dice pools. Species, skills, characteristics, talents, and equipment provide the mechanical customization.</p>
      ${S.finalized?'':`<div class="creation-next97"><button class="btn" data-create-step97="chars">Back · Starting XP</button><button class="btn primary" data-create-step97="review">Next · Review character</button></div>`}`;
    bindSteps(box);
    for(const [id,key]of [['personalCallsign97','callsign'],['personalPronouns97','pronouns'],['personalMotivation97','motivation'],['personalShip97','shipName'],['personalAppearance97','appearance'],['personalBackground97','background'],['personalGoal97','goal']])$(id).oninput=()=>{const next=config();next.profile[key]=$(id).value;S.campaign97=next;};
    $('personalWeapon97').onchange=()=>choose('weapon',$('personalWeapon97').value);
  }
  function renderSpeciesTalents() {
    const body=$('reviewBody');if(!body)return;
    body.querySelector('#speciesTalents116')?.remove();
    const included=Object.entries(SPECIES[S.species]?.bonusTalents97||{});if(!included.length)return;
    const box=document.createElement('div');box.id='speciesTalents116';box.className='creation-profile97';
    box.innerHTML=`<h3>Species talents · ${esc(SPECIES[S.species].name)}</h3><p>Included with your species at no XP cost. Total ranks include purchased talents.</p><ul>${included.map(([name,rank])=>`<li><b>${esc(name)}</b> · ${rank} included · ${talentRank(name)} total</li>`).join('')}</ul>`;
    body.appendChild(box);
  }
  function refreshReview() {
    renderSpeciesTalents();
    window.Species117?.renderReview();
    if(!hasSetup()||!$('reviewBody'))return;const c=config(),p=c.profile,errors=issues();let box=$('campaignReview97');
    if(!box){box=document.createElement('div');box.id='campaignReview97';box.className='creation-profile97';$('reviewBody').appendChild(box);}
    box.innerHTML=`<h3>Your beginning</h3><p><b>${esc(content.eras[c.era].name)}</b> · ${esc(content.factions[c.faction].name)}<br>${esc(STORY_TEMPLATES_61[c.mission].name)}</p><p>500 credits · ${esc(WEAPONS[c.weapon].name)} · Heavy clothing · Shared transport: ${esc(p.shipName.trim()||'First Light')}</p><p>${esc(p.callsign?`${p.callsign} · `:'')}${esc(p.motivation)}${p.pronouns?` · ${esc(p.pronouns)}`:''}</p>${p.appearance?`<p>${esc(p.appearance)}</p>`:''}${p.background?`<p>${esc(p.background)}</p>`:''}${p.goal?`<p><b>Personal goal:</b> ${esc(p.goal)}</p>`:''}${S.finalized?'':errorHTML(errors)}<p class="campaign-source97">Unspent starting XP carries into advancement once. Starting equipment and transport are supplied by this game beginning.</p>`;
    if(!S.finalized){$('finalize').textContent='Begin your campaign';$('finalize').disabled=errors.length>0;}
  }
  function renderBonusPicker() {
    $('speciesBonusPicker97')?.remove();if(!hasSetup()||S.finalized||S.species!=='human')return;
    const box=document.createElement('div');box.id='speciesBonusPicker97';box.className='creation-note97';$('careerInfo').after(box);
    const selected=S.speciesBonus97||[],career=new Set([...CAREERS[S.career].skills,...CAREERS[S.career].specs[S.spec]]),skills=Object.keys(SKILL_CHAR).filter(sk=>!career.has(sk)||selected.includes(sk));
    box.innerHTML=`<h3>Human bonus skills · ${selected.length}/2</h3><p>Choose one free rank in each of two distinct skills outside your starting career and specialization. Later training does not remove these ranks. Source: Complete Species Guide v6, p.128.</p><div class="chips">${skills.map(sk=>`<button class="chip ${selected.includes(sk)?'on':''}" data-species-bonus97="${esc(sk)}" ${!selected.includes(sk)&&(selected.length>=2||(S.skills[sk]||0)>=2)?'disabled':''}>${esc(sk)}</button>`).join('')}</div>`;
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{const skill=b.dataset.speciesBonus97,chosen=S.speciesBonus97||[];if(chosen.includes(skill)){chosen.splice(chosen.indexOf(skill),1);S.skills[skill]--;}else if(chosen.length<2&&!career.has(skill)&&(S.skills[skill]||0)<2){chosen.push(skill);S.skills[skill]=(S.skills[skill]||0)+1;}S.speciesBonus97=chosen;renderAll();});
  }
  function renderUniversalNotes() {
    const select=$('universalSelect');if(!select)return;let box=$('universalNotes97');if(!box){box=document.createElement('div');box.id='universalNotes97';box.className='campaign-source97';(select.closest('label')||select.parentElement).after(box);}
    const name=select.value,meta=catalog.data.universals[name]||{},record=catalog.data.trees[name],req=catalog.requirement(name);
    box.innerHTML=`${record?esc(record.source):'Force-sensitive universal specialization'} · ${meta.grantsForce?'Provides Force Rating 1 if you do not already have it.':name==='Nightsister'?'Force Rating 1 comes from purchasing Witchcraft, not just acquiring the specialization.':'Acquiring this specialization does not grant Force Rating.'}${req.species?` Requires ${esc(SPECIES[req.species].name)}.`:''}${meta.knowledgeChoice?`<label>Bonus Knowledge career skill<select id="universalKnowledge97">${Object.keys(SKILL_CHAR).filter(sk=>sk.startsWith('Knowledge')).map(sk=>`<option ${sk===(S.universalKnowledge97?.[name]||'Knowledge (Education)')?'selected':''}>${esc(sk)}</option>`).join('')}</select></label>`:''}`;
    if(!catalog.eligible(name))$('buyUniversal').disabled=true;
    $('universalKnowledge97')?.addEventListener('change',()=>{if(S.universalSpecs.includes(name)){S.universalKnowledge97=S.universalKnowledge97||{};S.universalKnowledge97[name]=$('universalKnowledge97').value;}});
  }
  function renderCreationExtras() {
    const oldEra=$('era');if(oldEra){const c=config();oldEra.innerHTML=Object.entries(content.eras).map(([id,e])=>`<option value="${id}" ${id===c.era?'selected':''}>${esc(e.name)}</option>`).join('');oldEra.disabled=S.finalized;oldEra.onchange=()=>choose('era',oldEra.value);if(S.finalized&&!hasSetup()){oldEra.innerHTML='<option>Original campaign · era not recorded</option>';}}
    for(const [id]of steps){const panel=$(id);if(!panel)continue;panel.querySelector('.creation-insert97')?.remove();panel.querySelector('.creation-footer97')?.remove();if(S.finalized||!hasSetup()||['campaignSetup97','personal97'].includes(id))continue;
      const nav=document.createElement('div');nav.className='creation-insert97';nav.innerHTML=stepNav(id);panel.prepend(nav);bindSteps(nav);
      const footer=document.createElement('div');footer.className='creation-footer97 creation-next97';const target={identity:'career',career:'chars',chars:'personal97',review:'personal97'}[id];
      footer.innerHTML=id==='chars'?`<p>Starting XP remaining: ${S.xpStart-S.xpSpent}. Characteristics can only be raised directly during creation. Skills and talents can be bought now or later.</p><button class="btn" data-create-step97="skills">Buy skills</button><button class="btn" data-create-step97="talents">Buy talents</button><button class="btn" data-create-step97="force">Universal & Force options</button><button class="btn primary" data-create-step97="personal97">Next · Personal details</button>`:`<p>${id==='career'?`Free ranks: ${S.freeCareer.length}/${careerPickCap()} career · ${S.freeSpec.length}/2 specialization.`:id==='identity'?'Changing species resets creation purchases. Review the starting XP and species traits before continuing.':''}</p><button class="btn" data-create-step97="${target}">${id==='review'?'Edit personal details':`Next · ${target==='career'?'Career & skills':'Starting XP'}`}</button>`;
      panel.appendChild(footer);bindSteps(footer);
    }
    if($('originSetup46'))$('originSetup46').hidden=hasSetup();
    if(hasSetup()&&S.species==='human'){const note=$('speciesInfo')?.querySelector('.small');if(note)note.textContent='Adaptable. Choose one free rank in each of two non-career skills on the Career screen.';}
    const info=$('careerInfo');if(info&&!info.querySelector('.campaign-source97')){const p=document.createElement('p');p.className='campaign-source97';p.textContent=`Talent tree: ${catalog.status(S.spec)}. ${catalog.data.trees[S.spec]?.source||SPECIALIZATION_TREE_SOURCE[S.spec]||'Exact source layout is not imported.'}`;info.appendChild(p);}
    if(!S.finalized){for(const option of $('specSelect').options){const req=catalog.requirement(option.value);option.disabled=!!req.forceRating||!!req.species&&S.species!==req.species;if(req.forceRating)option.textContent=`${option.value} · advancement after Force Rating ${req.forceRating}`;}for(const option of $('careerSelect').options)option.disabled=option.value==='Clone Soldier'&&S.species!=='clone';}
    for(const option of $('buySpecSelect')?.options||[]){option.disabled=!catalog.eligible(option.value);const req=catalog.requirement(option.value);if(req.forceRating)option.textContent+=` · requires Force Rating ${req.forceRating}`;else if(req.species)option.textContent+=' · requires Clone species';}
    if($('buySpecSelect')&&!catalog.eligible($('buySpecSelect').value))$('buySpecBtn').disabled=true;
    renderBonusPicker();renderUniversalNotes();refreshReview();
  }
  function renderOpening() {
    const box=$('opening97');if(!box)return;if(!hasSetup()){box.innerHTML='<h2>Campaign missions</h2><p>Your character keeps its original adventures.</p><button class="btn" data-create-step97="story61tab">Open story missions</button>';bindSteps(box);return;}
    const c=config(),p=c.profile,first=STORY_TEMPLATES_61[c.mission],active=S.story61?.active?.status==='active';
    box.innerHTML=`<h2>${c.opening==='unread'?'Your story begins':'Campaign assignments'}</h2><p>${esc(content.eras[c.era].name)} · ${esc(content.factions[c.faction].name)} · ${esc(S.name)}${p.callsign?` “${esc(p.callsign)}”`:''}</p>${c.opening==='unread'?`<div class="opening-crawl97"><p>${esc(content.paths[lane()].intro)}</p><p>${esc(first.summary)}</p></div><div class="creation-note97"><h3>Start here</h3><p>Read the assignment, choose an approach, then make a skill check. A failed check can lead to a different route. Credits and XP are awarded when you resolve the finale.</p></div><button class="btn primary" id="startOpening97" ${!S.finalized||active?'disabled':''}>Begin · ${esc(first.name)}</button>`:''}
      ${active?'<p>An assignment is in progress.</p><button class="btn primary" data-create-step97="story61tab">Continue current assignment</button>':''}
      <div class="campaign-missions97">${(offers()||[]).filter(id=>c.opening!=='unread'||id!==c.mission).map(id=>{const t=STORY_TEMPLATES_61[id];return `<article><h3>${esc(t.name)}</h3><p>${esc(t.summary)}</p><p class="campaign-source97">${esc(t.campaign97.source)}</p><button class="btn" data-opening-mission97="${id}" ${!S.finalized||active||c.opening==='unread'?'disabled':''}>Accept assignment</button></article>`;}).join('')}</div>
      <div class="creation-next97"><button class="btn" data-create-step97="playhub80">Home</button><button class="btn" id="openingJobs97">Jobs & Training</button></div><p class="campaign-source97">These are original short adventures inspired by your sources. The complete published adventures remain separate references.</p>`;
    bindSteps(box);if($('startOpening97'))$('startOpening97').onclick=()=>beginMission();box.querySelectorAll('[data-opening-mission97]').forEach(b=>b.onclick=()=>beginMission(b.dataset.openingMission97));$('openingJobs97').onclick=()=>openWorkHub96('jobs');
  }
  function renderAudit() {
    const parent=$('about97');if(!parent)return;let box=$('catalogAudit97');if(!box){box=document.createElement('section');box.id='catalogAudit97';box.className='creation-profile97';parent.prepend(box);}
    const c=catalog.coverage();
    box.innerHTML=`<h2>Character options & source coverage</h2><p>${c.careers} official careers · ${c.placements} career placements · ${c.trees} distinct career trees · ${c.universal} universal trees · ${c.species} species profiles.</p><p>${c.full} career layouts are recorded as full; ${c.simplified} use standardized data and ${c.prototype} still use prototypes. This audit does not certify every existing full tree or every talent effect against a sourcebook. ${Object.values(catalog.data.trees).filter(record=>record.auditedExisting).length} older full layouts have been checked against their sourcebooks. ${[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))].filter(name=>catalog.status(name)==='Full layout in saved build').length} older full layouts still await a fresh source check. The 25 Clone Wars and universal layouts were checked against the supplied tree collections. The 12 former prototype layouts were checked against the supplied Edge of the Empire core book and collection. Mechanic, Scout, and 14 Force and Destiny layouts were also checked against the supplied books and collections. The remaining 20 Age of Rebellion layouts were checked against the supplied core and career books. Earlier purchases are preserved; no career layouts remain simplified.</p><p>Six new species, with three Aqualish variants, use the supplied Complete Species Guide v6. Their characteristics, thresholds, XP, and starting ranks were checked on the cited pages. The guide is a fan supplement. Bothan, Rodian, Duros and Jawa base stats and starting benefits were also checked; their species-granted talents now count alongside purchased ranks. Tracking, navigation and scavenging time reductions and Jawa sensory traits require narrative resolution. Chiss, Mirialan, Pantoran and Sullustan have also been checked; Sullustan now includes Skilled Jockey. Lighting and temperature traits remain narrative. Review shows species talent ranks separately from purchased talents. Cerean, Lannik, Gungan and Kel Dor have also been checked. Cerean Intellectuals now supports two chosen Knowledge career skills without free ranks. Lannik, Gungan and Kel Dor situational effects remain narrative. Sluissi, Weequay, Wookiee, Toydarian, Trandoshan, Twi’lek, Nautolan and Mon Calamari have also been checked. Sluissi now includes Solid Repairs; the other reviewed traits remain narrative. Lasat, Togruta, Zeltron and Zabrak have also been checked. Zabrak Coercion now includes one automatic Advantage instead of a Boost die. The other three profiles’ situational effects remain narrative. Eleven older profiles still await a fresh source audit.</p><div class="catalog-scroll97"><table class="catalog-table97"><thead><tr><th>Career</th><th>Specializations and layout status</th></tr></thead><tbody>${Object.entries(CAREERS).map(([name,career])=>`<tr><th>${esc(name)}</th><td>${Object.keys(career.specs).map(n=>`${esc(n)} · ${esc(catalog.status(n))}`).join('<br>')}</td></tr>`).join('')}</tbody></table></div><details><summary>Universal options</summary><p>${Object.keys(UNIVERSAL_TREES).map(esc).join(' · ')}</p><p>New universal layouts follow the supplied collections. Sourcebook rules remain the authority. Unimplemented special actions require narrative resolution.</p></details><details><summary>Campaign and adventure scope</summary><p>Four era start points and six story paths select the opening and suitable short missions. These are original Sable Reach scenarios inspired by Rise of the Separatists, Collapse of the Republic, Dawn of Rebellion, Under a Black Sun, Operation: Shadowpoint, and Lure of the Lost. They are not full ports of published adventures.</p><p>The existing galaxy, NPCs, procedural contracts, and older adventures retain their prior setting; they are not a complete era simulation. The new starts use the shared Sable Reach maps. Existing campaigns are preserved without retroactively assigning an era or replacing their quests.</p><p>Signature abilities, many special talent actions, and the entire 300-plus-species compilation are not fully implemented.</p></details>`;
  }
  function render() { renderSetup();renderPersonal();renderOpening();renderCreationExtras();renderAudit();const q=S.story61?.active,t=STORY_TEMPLATES_61[q?.templateId],panel=$('story61tab');if(t?.campaign97&&panel&&!panel.querySelector('.campaign-source97')){const p=document.createElement('p');p.className='campaign-source97';p.textContent=`${t.campaign97.kind} · ${t.campaign97.source}`;panel.appendChild(p);} }
  function install() {
    const host=$('tabHost78')||document.querySelector('.wrap');
    for(const [id,title,group]of [['campaignSetup97','Campaign beginning','character'],['personal97','Personal details','character'],['opening97','Campaign assignments','core']])if(!$(id)){const section=document.createElement('section');section.id=id;section.className=`tab tab78 card hidden ${id==='opening97'?'opening97':'creation97'}`;section.setAttribute('aria-label',title);host.appendChild(section);const b=document.createElement('button');b.dataset.tab=id;b.textContent=title;b.onclick=()=>renderNavTab(id);$('nav').appendChild(b);NAV_GROUP_MAP80[id]=group;if(group==='core')CORE_TAB_SET80.add(id);}
    catalog.installOptions();
  }
  function validateSnapshot(state) {
    if(state.campaign97!==undefined){const c=state.campaign97;if(!c||typeof c!=='object'||Array.isArray(c)||typeof c.enabled!=='boolean')throw new Error('Invalid campaign beginning.');if(c.enabled&&(!compatible(c)||!['fringe','service','force'].includes(c.focus)||!initialMissions(state).some(m=>m.id===c.mission)||!['holdout','pistol','carbine','lightsaber'].includes(c.weapon)))throw new Error('Invalid era, allegiance, or opening.');if(c.profile&&(!c.profile||Array.isArray(c.profile)||typeof c.profile!=='object'||Object.values(c.profile).some(v=>typeof v!=='string')))throw new Error('Invalid personal details.');}
    if(state.speciesBonus97&&(!Array.isArray(state.speciesBonus97)||state.speciesBonus97.some(sk=>!SKILL_CHAR[sk])||state.speciesBonus97.length>2||new Set(state.speciesBonus97).size!==state.speciesBonus97.length))throw new Error('Invalid species bonus skills.');
    if(state.universalKnowledge97&&(typeof state.universalKnowledge97!=='object'||Array.isArray(state.universalKnowledge97)||Object.values(state.universalKnowledge97).some(sk=>!SKILL_CHAR[sk]||!sk.startsWith('Knowledge'))))throw new Error('Invalid universal Knowledge choice.');
  }
  game.campaign={config,hasSetup,lane,choose,issues,checkBeforeFinalize,applyBeginning,beginMission,eligibleMission,offers,objective,refreshReview,refreshUniversal:renderUniversalNotes,validateSnapshot,render};
  game.on('install',install);game.on('render',render);game.on('hydrate',()=>{catalog.installOptions();render();});
  game.on('ready',()=>{if(!S.finalized&&!game.saves.candidates().some(row=>row.valid&&row.kind!=='recovery'))game.resume.current();});
  game.on('navigate',({id,internal})=>{if(!internal&&!S.finalized&&hasSetup()&&!['playhub80','save97','about97'].includes(id)){const c=config();c.step=id;S.campaign97=c;}if(['campaignSetup97','personal97','opening97','identity','career','review','force'].includes(id))render();});
  BUILD_INFO.version='96.23-species-coercion';BUILD_INFO.saveSchema=92;
  window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version};
})();
