/* Release history stays available in About; play screens explain player actions. */
(() => {
  'use strict';
  const game = window.Game97;
  const releasePanels = ['guideReleasePanel','release66','artGallery82','roomGallery84',
    'interiorGallery86','uiAudit78','phase68Guide','phase70Guide','phase88Guide',
    'phase90Card','phase92Card','phase72Guide','phase74Guide','release76'];
  const replacements = new Map([
    ['Story Engine 2.0','Story missions'],
    ['No Story Engine history yet.','No mission history yet.'],
    ['Refresh Hooks','Find other missions'],
    ['Implemented in the current rules engine.','Available in play.'],
    ['No transactions recorded by the Phase 43 ledger yet.','No transactions recorded yet.'],
    ['A compact solo-game layer for paid work, training, and recovery between operations.','Take paid work, train skills, or recover between missions.'],
    ['Roll the selected campaign engine at session start and carry its consequences until session end.','Roll your campaign framework at session start. Its effects last until session end.'],
    ['Phase 41 uses source-grounded Special Modifications weapon, gadget, chassis, and directive templates. Result-focus automation is an original solo-game abstraction.','Craft weapons, gadgets, and droids using the listed templates. Result focus is a game adaptation.'],
    ['This is an existing save migrated from Phase 45. Its original starting state is preserved.','This campaign keeps the starting resources and origin recorded in its older save.'],
    ['A 17-stage authored adventure built specifically to connect Pixel World exploration, visual dialogue, best-actor checks, travel, district navigation, Retro Combat 3.0, faction influence, and a unique reward.','Follow a mysterious transmission from Sable Reach through salvage yards, brokers, and abandoned Rebel sites. Your choices shape who controls the recovered intelligence.'],
    ['Story Engine 2.0 is an original Sable Reach videogame narrative layer. Its checks, combat, wounds, strain, skills, reputation, Duty/Obligation/Morality hooks, and equipment use the existing FFG-style systems.','Mission choices affect reputation and campaign resources. Skill checks, combat, wounds, strain, and equipment use the same rules as the rest of the campaign.'],
    ['This quest is an original Sable Reach storyline built to exercise the existing travel, exploration, crew, social, combat, reputation, heat, and campaign-framework systems.','Your mission choices can affect crew relationships, reputation, local heat, and campaign resources.'],
    ['The game now has a visual RPG layer on top of the full rules systems.','Explore Sable Reach, follow story leads, and prepare your crew for the next mission.'],
    ['Keep the FFG depth','Use your character and crew'],
    ['Visual dialogue and battles are presentation layers. Character skills, narrative dice, range, cover, talents, Force powers, injuries, equipment, and crew checks remain active underneath.','Skills, talents, Force powers, equipment, cover, and injuries affect your checks. Use your crew’s strengths when choosing an approach.']
  ]);
  const copyEntries = [...replacements].sort((a,b)=>b[0].length-a[0].length);
  function install() {
    const host = document.getElementById('tabHost78'); if (!host || document.getElementById('about97')) return;
    const tab = document.createElement('section'); tab.id='about97';tab.className='tab card hidden tab78';
    tab.setAttribute('aria-label','About and release notes');
    tab.innerHTML='<h2>About & release notes</h2><p>Development history, art previews, and build checks are kept here. Use Home to return to your campaign.</p><div id="releaseHistory97"></div>';
    host.appendChild(tab);
    const button=document.createElement('button');button.dataset.tab='about97';button.textContent='About & release notes';button.onclick=()=>renderNavTab('about97');
    document.getElementById('nav')?.appendChild(button);NAV_GROUP_MAP80.about97='systems';
  }
  function cleanText(root) {
    if (!root) return;
    // Home already owns its copy; character and saved-campaign names are user data.
    if(root.id==='playhub80')return;
    root.querySelectorAll('.tag,.pill,.work-kicker96').forEach(element=>{
      if (/^PHASES?\s+\d+(?:[–-]\d+)?$/i.test(element.textContent.trim())) element.classList.add('hidden');
    });
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let text;
    while(text=walker.nextNode()) {
      if(text.parentElement.closest('script,style,pre,textarea,#rulesaudit,#about97,#runtimeError,.tag.hidden,.pill.hidden'))continue;
      let value=text.nodeValue;
      for(const [from,to] of copyEntries)if(value.includes(from))value=value.replaceAll(from,to);
      if(/A reusable classic-console exploration layer/.test(value))value='Explore the town and nearby areas. Walk to characters, terminals, doors, and story markers to interact.';
      if(/Phase 67 establishes the renderer/.test(value))value='Use the arrow keys or tap a tile to walk. Select a nearby character or object to interact.';
      if(/Desktop layout now uses a sticky sidebar/.test(value))value='Choose a section or press Ctrl/Cmd+K to find one.';
      if(/Core Play shows the screens you actually use most/.test(value))value='Choose Core Play for your campaign, Character for advancement, or Systems for references and settings.';
      if(/Difficulty is an original videogame balance layer/.test(value))value='Difficulty adjusts encounter balance. Skill, talent, and narrative-dice rules stay the same.';
      value=value.replace(/\bPhases?\s+\d+(?:[–-]\d+)?(?:'s)?\s*(?:[·:—]\s*)?/gi,'');
      if(value!==text.nodeValue)text.nodeValue=value;
    }
  }
  function refresh() {
    install();document.title='Star Wars: Sable Reach';
    const title=document.querySelector('.top h1'),subtitle=document.querySelector('.top p'),banner=document.querySelector('.rc-banner .row>div>b');
    if(title)title.textContent='STAR WARS: SABLE REACH';
    if(subtitle)subtitle.textContent='Explore the galaxy, follow story leads, and build your crew.';
    if(banner)banner.textContent='Sable Reach';
    for(const [id,label] of [['playhub80','Home'],['guide','How to play']]){
      const button=document.querySelector(`#nav button[data-tab="${id}"]`);if(button)button.textContent=label;
    }
    const history=document.getElementById('releaseHistory97');
    for(const id of releasePanels){const panel=document.getElementById(id);if(panel&&history&&!history.contains(panel))history.appendChild(panel);}
    document.querySelectorAll('#guide > .card').forEach(panel=>{if(panel.textContent.includes('Historical milestone scope'))history?.appendChild(panel);});
    document.querySelectorAll('#tabHost78 > .tab:not(#about97):not(#rulesaudit)').forEach(cleanText);
    cleanText(document.querySelector('.top'));cleanText(document.querySelector('#sidebar78'));
    cleanText(document.getElementById('tutorial76'));
    const objective=game.objectives.describe();
    for(const id of ['globalObjective','worldObjective75','questGuide75']){const element=document.getElementById(id);if(element)element.textContent=`${objective.title}. ${objective.instruction}`;}
    const mobileObjective=document.querySelector('#mobileStatus65 .mobile-objective65');if(mobileObjective)mobileObjective.textContent=objective.title;
  }
  game.playCopy={refresh};
  game.on('install',refresh);game.on('render',refresh);game.on('navigate',refresh);game.on('ready',refresh);
})();
