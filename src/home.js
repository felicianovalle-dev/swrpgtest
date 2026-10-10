/* One Home renderer replaces the accumulated Home presentation wrappers. */
(() => {
  'use strict';
  const game = window.Game97, escape = pxEsc67;
  const destinations = [
    ['hubStory97','Story missions','story61tab'], ['hubOps80','Contracts','gm'],
    ['hubCrew97','Crew','crewmgmt'], ['hubGear97','Equipment','equipment'],
    ['hubRecovery97','Recovery','recovery'], ['hubGalaxy80','Galaxy & travel','galaxy'],
    ['hubShip80','Ship','ship'], ['hubExplore80','Districts','explore'],
    ['hubIdentity80','Character','identity'], ['hubSkills80','Skills','skills'],
    ['hubTalents80','Talents','talents'], ['hubForce80','Force powers','force'],
    ['hubCampaign80','Campaign settings','campaign'], ['hubBase97','Base','base'],
    ['hubDatabase80','Rules & equipment reference','database'], ['hubGuide97','How to play','guide']
  ];
  function latestSave() { return game.saves.candidates().find(row => row.valid) || null; }
  function offeredSave(latest) { return !!latest && !S.finalized && !S.lastSaved; }
  function enterCurrent(action) {
    if (offeredSave(latestSave()) && !game.saves.loadSlot('latest')) return false;
    action(); return true;
  }
  function render() {
    ensurePlayHub80();
    const hub = document.getElementById('playhub80'); if (!hub) return;
    const expanded = document.getElementById('homeTools97')?.open || false;
    const latest = latestSave(), offered = offeredSave(latest), state = offered ? latest.data : S;
    const objective = game.objectives.describe(state), location = GALAXY_HUBS_50[state.world?.currentHub]?.name || 'Sable Reach';
    hub.classList.add('home97'); hub.setAttribute('aria-label','Home');
    hub.innerHTML = `<header class="home-head97"><h2>Home</h2><p>${escape(state.name)} · ${escape(location)}</p></header>
      <dl class="home-stats97"><div><dt>Credits</dt><dd>${Number(state.credits||0).toLocaleString()}</dd></div><div><dt>XP available</dt><dd>${offered ? (state.finalized?Number(state.earnedXp)||0:(Number(state.xpStart)||0)-(Number(state.xpSpent)||0)) : availableXp()}</dd></div><div><dt>Crew</dt><dd>${state.crew?.length||0}</dd></div><div><dt>Day</dt><dd>${state.world?.day||1}</dd></div></dl>
      <div class="home-primary97"><button class="btn primary" id="${offered?'hubResumeLatest97':'playHubContinue80'}">${offered?'Resume saved game':state.finalized?'Continue':'Continue creation'}</button><button class="btn" id="homeWorld97">Enter World</button></div>
      ${offered?`<p class="home-saved-note97">${latest.time?`${latest.exact?'Saved':'Legacy save time'} ${escape(new Date(latest.time).toLocaleString())}`:'Save timestamp unavailable'}</p>`:''}
      <section class="home-objective97" aria-label="Current objective"><div class="home-kicker97">Next objective</div><h3>${escape(objective.title)}</h3><p>${escape(objective.instruction)}</p><p class="home-location97">${escape(objective.location)}</p><button class="btn" id="homeObjective97">${escape(objective.label)}</button></section>
      <div class="home-shortcuts97" id="hubWork96"><button class="btn" id="hubJobs96">Jobs · earn credits</button><button class="btn" id="hubTrain96">Training · gain skills</button></div>
      <details class="home-tools97" id="homeTools97" ${expanded?'open':''}><summary>More options</summary><div id="resumeCard97" class="home-save97"><p id="homeSavedTime97"></p><div class="home-links97"><button class="btn" id="hubSaves97">Saved games</button>${offered?'':'<button class="btn" id="hubResumeLatest97">Resume latest save</button>'}</div></div><nav class="home-links97" id="playDock88" aria-label="More game options">${destinations.map(([id,label,target])=>`<button class="btn" id="${id}" data-hometab97="${target}">${label}</button>`).join('')}</nav></details>`;
    const current = document.getElementById('playHubContinue80'); if (current) current.onclick = () => game.resume.current();
    document.getElementById('homeWorld97').onclick = () => enterCurrent(() => renderNavTab('pixelworld67'));
    document.getElementById('homeObjective97').onclick = () => enterCurrent(() => game.objectives.open());
    document.getElementById('hubJobs96').onclick = () => enterCurrent(() => openWorkHub96('jobs'));
    document.getElementById('hubTrain96').onclick = () => enterCurrent(() => openWorkHub96('training'));
    hub.querySelectorAll('[data-hometab97]').forEach(button => button.onclick = () => enterCurrent(() => renderNavTab(button.dataset.hometab97)));
    refreshSaved(latest);
  }
  function refreshSaved(latest) {
    const note = document.getElementById('homeSavedTime97');
    if (note) note.textContent = latest ? `${latest.data.name} · ${latest.time?`${latest.exact?'saved':'legacy save time'} ${new Date(latest.time).toLocaleString()}`:'save timestamp unavailable'}` : 'No saved campaign yet. Save or import a campaign to resume it later.';
    const resume = document.getElementById('hubResumeLatest97');
    if (resume) { resume.disabled = !latest; resume.onclick = () => game.saves.loadSlot('latest'); }
    const saves = document.getElementById('hubSaves97'); if (saves) saves.onclick = game.saves.open;
  }
  game.home = {render,refreshSaved};
  renderPlayHub80 = render;
  game.on('navigate',({id})=>document.body.classList.toggle('home-play97',id==='playhub80'));
})();
