/* Player-facing objectives use campaign state, never keywords in objective prose. */
(() => {
  'use strict';
  const game = window.Game97;
  function describe(state = S) {
    const result = (title, instruction, location, label, target, extra = {}) =>
      ({title, instruction, location, label, target, ...extra});
    if (!state.finalized) return result('Finish your character',
      'Choose your free skills, spend starting XP, and review your character before beginning the campaign.',
      'Character creation', 'Review character', 'review');
    if (state.combat) return result('Finish the current encounter',
      'Return to combat to review the active turn and choose your next action.',
      'Current encounter', 'Return to combat', 'combat');
    const quest = state.story61?.active, template = STORY_TEMPLATES_61[quest?.templateId];
    const node = quest?.status === 'active' ? template?.nodes[quest.node] : null;
    if (node) {
      const hub = node.hub || state.world?.currentHub || 'sable';
      const hubName = GALAXY_HUBS_50[hub]?.name || hub;
      const district = DISTRICTS_51[hub]?.find(d => d.id === node.district);
      const location = district ? `${district.name} · ${hubName}` : hubName;
      const extra = {questTitle:quest.title || template.name, node:quest.node};
      if (node.hub && node.hub !== state.world?.currentHub) return result(
        `Travel to ${hubName}`, state.ship?.owned ? node.text :
          `A ship is required to reach ${hubName}. Check travel options and your ship before departing.`,
        hubName, 'Plan travel', 'galaxy', {...extra, hub});
      if (['visual73', 'dialogue73'].includes(node.type)) return result(node.title,
        node.type === 'dialogue73' ? `Talk to ${node.speaker?.name || 'the story contact'} at ${district?.name || hubName}. Review the conversation before choosing a response.` :
          `${node.text} Open the mission to review the interaction${node.skill?` and ${node.skill} check`:''}.`,
        location, node.type === 'dialogue73' ? 'Review conversation' : 'Review story interaction',
        'story61tab', extra);
      if (node.type === 'district') return result(node.title,
        `Reach ${district?.name || node.district}. Open the mission to review its location and arrival action.`,
        location, 'Open location objective', 'story61tab', extra);
      if (node.type === 'travel') return result(node.title,
        `You are at ${hubName}. Open the mission to confirm arrival and review the next step.`,
        location, 'Review arrival', 'story61tab', extra);
      if (node.type === 'skill') return result(node.title,
        `${node.text} Review the ${node.skill} check before rolling.`,
        quest.title || template.name, `Review ${node.skill} check`, 'story61tab', extra);
      if (node.type === 'combat') return result(node.title,
        `${node.text} Review the encounter and prepare your crew before beginning combat.`,
        quest.title || template.name, 'Prepare encounter', 'story61tab', extra);
      if (node.type === 'choice') return result(node.title, node.text,
        quest.title || template.name, 'Review your choices', 'story61tab', extra);
      if (node.type === 'finale') return result(node.title, node.text,
        quest.title || template.name, 'Review mission finale', 'story61tab', extra);
      return result(node.title, node.text, quest.title || template.name, 'Open mission', 'story61tab', extra);
    }
    const episode = state.ep15 || {}, stage = episode.mainStage || 0;
    const episodeResult = (title, instruction, location, label) => result(title, instruction,
      EP15_LOCATIONS[location]?.name || location, label, 'adventure', {episodeLocation:location});
    if (stage === 0) return episodeResult('Find the courier trail',
      'Ask Rhea Sol about the crashed Imperial courier, or gather rumors from the cantina crowd.', 'cantina', 'Talk to Rhea');
    if (stage === 1) return episodeResult('Locate the courier wreck',
      'Cross the Ash Flats and use Survival to find the Imperial crash site.', 'ash', 'Open Ash Flats');
    if (!episode.flags?.cipherCore && stage < 9) return episodeResult('Recover the Cipher Core',
      'Inspect the courier vault at the crash site and choose how to open it.', 'crash', 'Inspect courier vault');
    if (stage < 4) return episodeResult('Deal with the recovery patrol',
      'Return to the crash site and choose how to handle the Imperial recovery patrol.', 'crash', 'Review patrol encounter');
    if (!state.flags?.faction && stage < 9) return episodeResult('Choose who receives the Cipher Core',
      'Meet the contacts in the Underworks and review the consequences before choosing a faction.', 'underworks', 'Meet the contacts');
    if (stage < 6) return episodeResult('Plan the listening-post strike',
      'Use the recovered intelligence to plan an approach to the Imperial listening post.', 'underworks', 'Review strike plan');
    if (stage < 8) {
      const location = ['outpostGate', 'outpostService', 'outpostCommand', 'hangar'][Math.min(3, Math.max(0, episode.dungeonStage || 0))];
      return episodeResult('Infiltrate the listening post',
        'Review the available approaches at the current infiltration stage and obtain Hangar Twelve access.', location, 'Review infiltration');
    }
    if (stage < 9) return episodeResult('Seize the freighter',
      'Prepare your crew, then confront Chief Varrik in Hangar Twelve.', 'hangar', 'Review Hangar Twelve');
    return result('Choose your next mission', 'The courier adventure is complete. Browse story missions or take a contract.',
      'Story missions', 'Browse missions', 'story61tab');
  }
  function open() {
    const objective = describe();
    if (PX67.dialog) closePixelDialog67(false);
    WORLD94.menu = WORLD94.drawer = false;
    if (objective.episodeLocation) epGo(objective.episodeLocation);
    renderNavTab(objective.target);
    const focus = objective.target === 'story61tab' ?
      document.getElementById('storyAction61') || document.querySelector('[data-story-choice61]') || document.getElementById('resolveVisualCampaign73') : null;
    requestAnimationFrame(() => {
      const panel = document.getElementById(objective.target);
      if (focus) { focus.scrollIntoView({block:'center'}); focus.focus({preventScroll:true}); }
      else { if (panel) panel.scrollTop = 0; window.scrollTo({top:0,behavior:'auto'}); }
    });
    return objective.target;
  }
  function refresh() {
    const objective = describe();
    const drawer = document.getElementById('worldDrawer94');
    if (drawer && !document.getElementById('objectivePanel97')) {
      const card = document.createElement('section'); card.id = 'objectivePanel97'; card.className = 'objective-panel97';
      card.innerHTML = '<b>Current objective</b><p id="objectiveText97"></p><p id="objectiveLocation97" class="small"></p><button class="btn" id="worldObjectiveAction97"></button>';
      drawer.querySelector('.drawer-head94')?.insertAdjacentElement('afterend',card);
    }
    const text = document.getElementById('objectiveText97'), location = document.getElementById('objectiveLocation97');
    if (text) text.textContent = `${objective.title}. ${objective.instruction}`;
    if (location) location.textContent = objective.location;
    const action = document.getElementById('worldObjectiveAction97');
    if (action) { action.textContent = objective.label; action.onclick = open; }
  }
  game.objectives = {describe, open, refresh};
  // World movement, legacy HUDs, and save summaries share the same objective wording.
  objectiveGuide75 = () => { const objective=describe(); return `${objective.title}. ${objective.instruction}`; };
  game.on('install',refresh); game.on('render',refresh); game.on('navigate',refresh);
})();
