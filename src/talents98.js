/* Source layouts live in catalog data; this module owns compatible purchases
   and explicit talent choices. It never reprices an imported character. */
window.Talents98=(()=>{
  'use strict';
  const catalog=window.CharacterCatalog97,esc=pxEsc67;
  const replaced=Object.keys(catalog.data.trees).filter(name=>catalog.data.trees[name].replacesPrototype);
  const legacy=Object.fromEntries(replaced.map(spec=>[spec,genericTree(spec)]));
  const legacyNodes=(spec,set)=> (legacy[spec]||[]).filter(n=>set.has(n.id));
  function migrate(state){
    state.specTalents=state.specTalents||{};
    if(replaced.includes(state.spec))state.specTalents[state.spec]=[...new Set([...(state.specTalents[state.spec]||[]),...(state.talents||[])])];
    for(const spec of replaced){
      if(!Array.isArray(state.specTalents[spec]))continue;
      const set=new Set(state.specTalents[spec]),tree=treeForSpec(spec);
      for(const old of legacy[spec]){
        if(!set.has(old.id))continue;
        const target=tree.filter(n=>n.name===old.name&&!set.has(n.id)).sort((a,b)=>Math.abs(a.cost-old.cost)-Math.abs(b.cost-old.cost)||a.row-b.row||a.col-b.col)[0];
        if(!target)continue; // Retain the original node and its existing effects.
        set.delete(old.id);set.add(target.id);
        state.talentImports98=state.talentImports98||[];
        state.talentImports98.push({spec,from:old.id,to:target.id,paid:old.cost});
        const from=`${spec}:${old.id}`,to=`${spec}:${target.id}`;
        if(state.dedication&&Object.hasOwn(state.dedication,from)){state.dedication[to]=state.dedication[from];delete state.dedication[from];}
      }
      state.specTalents[spec]=[...set];
    }
    if(replaced.includes(state.spec))state.talents=[...(state.specTalents[state.spec]||[])];
  }
  function choiceForPurchase(n){
    const ask=(label,allowed)=>{const answer=prompt(`${label}\n${allowed.join(', ')}`,allowed[0]);if(answer===null)return null;return allowed.includes(answer.trim())?answer.trim():null;};
    if(n.name==='Well Rounded'){
      const skills=Object.keys(SKILL_CHAR),first=ask('Well Rounded: choose the first career skill.',skills);
      if(!first)return false;
      const second=ask('Well Rounded: choose a different second career skill.',skills.filter(sk=>sk!==first));
      return second?{wellRounded:[first,second]}:false;
    }
    if(n.name==='Knowledge Specialization'&&!S.talentChoices98?.knowledgeSkill){
      const skill=ask('Knowledge Specialization: choose the Knowledge skill for all ranks.',Object.keys(SKILL_CHAR).filter(sk=>sk.startsWith('Knowledge (')));
      return skill?{knowledgeSkill:skill}:false;
    }
    return {};
  }
  function commitChoice(spec,id,choice){
    if(!choice.wellRounded&&!choice.knowledgeSkill)return;
    const choices=S.talentChoices98=S.talentChoices98||{};
    if(choice.wellRounded){choices.wellRounded=choices.wellRounded||{};choices.wellRounded[`${spec}:${id}`]=choice.wellRounded;}
    if(choice.knowledgeSkill)choices.knowledgeSkill=choice.knowledgeSkill;
  }
  function careerSkills(){
    const selected=S.talentChoices98?.wellRounded||{},skills=new Set();
    for(const spec of S.ownedSpecs||[])for(const n of treeForSpec(spec))if(n.name==='Well Rounded'&&S.specTalents?.[spec]?.has(n.id))for(const sk of selected[`${spec}:${n.id}`]||[])skills.add(sk);
    return skills;
  }
  function spendKnowledgeTriumph(skill,q,r){
    const rank=talentRank('Knowledge Specialization');
    if(q.actor.id!=='pc'||!rank||S.talentChoices98?.knowledgeSkill!==skill||r.tr<1)return r;
    if(confirm(`Use Knowledge Specialization? Spend 1 Triumph to add ${rank} Success on ${skill}.`)){
      r.tr--;r.ns+=rank;r.ok=r.ns>0;bLog(`Knowledge Specialization spent 1 Triumph for ${rank} Success.`);
    }
    return r;
  }
  const statuses={
    'Feral Strength':'Adds 1 damage per rank to one successful Brawl or Melee hit.',
    'Deadly Accuracy':'Damage uses the currently selected combat skill. Separate skill choices for multiple ranks remain manual.',
    'Natural Scholar':'Offers one failed Knowledge-check reroll per session. Rerolling successful checks remains manual.',
    'Well Rounded':'Chosen skills become career skills; no free ranks are granted.',
    'Knowledge Specialization':'The chosen Knowledge skill can spend a Triumph for extra Successes during party checks.',
    'Blooded':'Boosts explicitly marked toxin checks. Ongoing poison duration requires narrative handling.',
    'Outdoorsman':'Removes setbacks on explicitly marked outdoor-terrain checks. Travel-time and terrain movement benefits require narrative handling.',
    'Utinni!':'Removes setbacks on explicitly marked scavenging checks. Search-time reduction requires narrative handling.',
    'Confidence':'Reduces difficulty on explicitly marked Discipline fear checks.',
    'Respected Scholar':'Downgrades challenge dice on explicitly marked academic-institution checks.',
    'Bacta Specialist':'Bacta-tank and long-term-care benefits require narrative handling.',
    'Pressure Point':'The optional Brawl strain damage and soak bypass require narrative handling.',
    'Stim Application':'Resolve the Medicine action, target characteristic, and temporary effect narratively.',
    'Improved Stim Application':'Resolve the increased difficulty and lower target strain narratively.',
    'Supreme Stim Application':'Resolve extra temporary characteristics from Triumph narratively.',
    'Master Doctor':'The once-per-round strain-for-Medicine-difficulty action requires narrative handling.',
    'Frenzied Attack':'The optional strain-for-attack-upgrades ability requires narrative handling.',
    'Scathing Tirade':'The Coercion action and affected enemy strain require narrative handling.',
    'Improved Scathing Tirade':'Apply affected enemies’ temporary setbacks narratively.',
    'Supreme Scathing Tirade':'The strain-for-maneuver activation requires narrative handling.',
    'Indistinguishable':'Upgrade checks to identify this character narratively.',
    "Nobody's Fool":'Upgrade incoming social checks narratively.',
    'Wheel and Deal':'Apply the bonus to qualifying legal sales narratively.',
    'Smooth Talker':'Record the chosen social skill and resolve Triumph conversion narratively.',
    'Stroke of Genius':'The once-per-session Intellect substitution requires narrative handling.',
    'Strong Arm':'Resolve increased thrown-weapon range narratively.',
    'Jump Up':'Resolve standing as an incidental once per round narratively.'
  };
  function status(name){return statuses[name]||null;}
  function knownUnranked(name){return catalog.data.talentRules98[name]?.ranked===false&&hasTalent(name);}
  function validateSnapshot(state){
    const oneHit=state.combat?.pendingSpend?.oneHitDamage98;
    if(oneHit!==undefined&&(!Number.isInteger(oneHit)||oneHit<0||oneHit>240))throw new Error('Invalid single-hit talent damage.');
    const choices=state.talentChoices98;
    if(choices!==undefined){
      if(!choices||typeof choices!=='object'||Array.isArray(choices))throw new Error('Invalid talent choices.');
      if(choices.knowledgeSkill!==undefined&&(!SKILL_CHAR[choices.knowledgeSkill]||!choices.knowledgeSkill.startsWith('Knowledge (')))throw new Error('Invalid Knowledge Specialization choice.');
      if(choices.wellRounded!==undefined){
        if(!choices.wellRounded||typeof choices.wellRounded!=='object'||Array.isArray(choices.wellRounded))throw new Error('Invalid Well Rounded choices.');
        for(const [key,skills]of Object.entries(choices.wellRounded)){
          const owned=Object.entries(state.specTalents||{}).some(([spec,ids])=>treeForSpec(spec).some(n=>`${spec}:${n.id}`===key&&n.name==='Well Rounded'&&ids.includes(n.id)));
          if(!owned||!Array.isArray(skills)||skills.length!==2||new Set(skills).size!==2||skills.some(sk=>!Object.hasOwn(SKILL_CHAR,sk)))throw new Error('Invalid Well Rounded skills.');
        }
      }
    }
    if(state.talentImports98!==undefined){
      if(!Array.isArray(state.talentImports98)||state.talentImports98.length>240)throw new Error('Invalid imported talent record.');
      const seen=new Set();
      for(const rec of state.talentImports98){
        const old=legacy[rec?.spec]?.find(n=>n.id===rec.from),target=old&&treeForSpec(rec.spec).find(n=>n.id===rec.to),key=`${rec?.spec}:${rec?.from}`;
        if(!old||!target||target.name!==old.name||rec.paid!==old.cost||seen.has(key))throw new Error('Invalid imported talent mapping.');seen.add(key);
      }
    }
  }
  function render(){
    $('talentCompatibility98')?.remove();
    const parent=$('talentTree');if(!parent)return;
    const spec=S.talentView,set=S.specTalents?.[spec]||new Set(),retained=legacyNodes(spec,set),mapped=(S.talentImports98||[]).filter(r=>r.spec===spec&&set.has(r.to));
    const tree=treeForSpec(spec),owned=tree.filter(n=>set.has(n.id)),pending=owned.filter(n=>n.name==='Well Rounded'&&!S.talentChoices98?.wellRounded?.[`${spec}:${n.id}`]||n.name==='Knowledge Specialization'&&!S.talentChoices98?.knowledgeSkill);
    if(catalog.data.trees[spec]?.coreReviewed)for(let i=0;i<tree.length;i++){
      const card=parent.children[i],n=tree[i];if(!card)continue;
      card.classList.add('source-tal98');
      card.querySelector('.talent-path98')?.remove();const p=document.createElement('p');p.className='tiny talent-path98';
      const rule=catalog.data.talentRules98[n.name];p.textContent=`${rule.source} · ${rule.activation}. Connected talents: ${n.links.length?n.links.map(id=>{const v=tree.find(x=>x.id===id);return `${v.name} (${v.cost} XP)`;}).join(' · '):'No linked purchases.'}`;card.insertBefore(p,card.querySelector('button'));
    }
    if(!retained.length&&!mapped.length&&!pending.length&&!owned.some(n=>['Well Rounded','Knowledge Specialization'].includes(n.name)))return;
    const box=document.createElement('section');box.id='talentCompatibility98';box.className='creation-note97';
    box.innerHTML=`<h3>Your talent purchases</h3>${mapped.length?`<p>${mapped.length} earlier purchase${mapped.length===1?'':'s'} now match nodes in this tree. Your XP, characteristics, and original amounts spent are preserved.</p><details><summary>Earlier purchase amounts</summary><ul>${mapped.map(r=>{const n=tree.find(n=>n.id===r.to);return `<li>${esc(n.name)}: ${r.paid} XP originally; ${n.cost} XP for a new purchase in this tree.</li>`;}).join('')}</ul></details>`:''}${retained.length?`<p>Earlier purchases retained: ${retained.map(n=>`${esc(n.name)} (${n.cost} XP originally)`).join(' · ')}.</p><p>These preserve your earlier abilities as game options. They do not unlock connections in the published tree and cannot be bought again from the earlier layout.</p>`:''}${owned.filter(n=>n.name==='Well Rounded'||n.name==='Knowledge Specialization').map(n=>{const skills=n.name==='Well Rounded'?S.talentChoices98?.wellRounded?.[`${spec}:${n.id}`]:S.talentChoices98?.knowledgeSkill;return `<p><b>${esc(n.name)}:</b> ${skills?esc(Array.isArray(skills)?skills.join(' · '):skills):'Choose the required skill below.'}</p>`;}).join('')}${pending.map(n=>`<button class="btn" data-talent-choice98="${esc(n.id)}">Choose skills · ${esc(n.name)}</button>`).join('')}`;
    parent.before(box);
    box.querySelectorAll('[data-talent-choice98]').forEach(b=>b.onclick=()=>{const n=owned.find(n=>n.id===b.dataset.talentChoice98),choice=choiceForPurchase(n);if(choice!==false){commitChoice(spec,n.id,choice);renderAll();safeAutosave();}});
  }
  function attach(game){game.on('render',render);game.on('navigate',({id})=>{if(id==='talents')render();});}
  return {migrate,legacyNodes,choiceForPurchase,commitChoice,careerSkills,spendKnowledgeTriumph,status,knownUnranked,validateSnapshot,render,attach,legacy,replaced};
})();
