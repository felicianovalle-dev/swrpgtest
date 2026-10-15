/* Sourced character options; audited layouts can retain their original node IDs. */
window.CharacterCatalog97 = (() => {
  'use strict';
  const data = @@CHARACTER_OPTIONS@@;
  const ruleSets={aor100:data.talentRules100,core101:data.talentRules101,fndCore102:data.talentRules102,fndCore103:data.talentRules103,fndCore104:data.talentRules104,fndSupp105:data.talentRules105,eoteCore106:data.talentRules106};
  function rulesFor(spec){return ruleSets[data.trees[spec]?.ruleSet];}
  Object.assign(SPECIES, data.species);
  Object.assign(CAREERS, data.careers);
  for(const rules of [data.talentRules98,data.talentRules100,data.talentRules101])
    for(const [name,rule]of Object.entries(rules||{}))if(rule.summary)TALENT_BLURBS[name]=rule.summary;
  for (const [name, record] of Object.entries(data.trees)) {
    const prefix = (record.idPrefix||'cw97')+'-' + name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const ids = record.nodeIds || record.names.map((_,i) => `${prefix}-${i}`);
    const nodes = record.names.map((talent,i) => node(ids[i],talent,Math.floor(i/4),i%4,
      (Math.floor(i/4)+1)*5, rulesFor(name)?.[talent]?.summary || TALENT_BLURBS[talent] ||
      `Resolve this ability using ${record.source}. Its special action requires narrative resolution.`,
      record.types[i], record.edges.filter(edge=>edge.includes(i)).map(edge=>ids[edge[0]===i?edge[1]:edge[0]])));
    if (record.universal) UNIVERSAL_TREES[name] = nodes;
    else { EXACT_TREES[name] = nodes; SPECIALIZATION_TREE_SOURCE[name] = record.source; }
  }
  function requirement(name) { return data.requirements[name] || {}; }
  function eligible(name) {
    const r=requirement(name);
    return (!r.forceRating || S.forceRating>=r.forceRating) && (!r.species || S.species===r.species);
  }
  function status(name) {
    if (data.trees[name]?.auditedExisting) return 'Reviewed layout';
    if (data.trees[name]) return 'Imported layout';
    if (EXACT_TREES[name] || FULL_SOURCE_TREES.has(name)) return 'Full layout in saved build';
    if (PHASE37_STANDARD_SPECS.has(name)) return 'Simplified layout';
    if (FORM_TREES[name]) return 'Partial layout';
    return 'Prototype layout';
  }
  function coverage() {
    const names=[...new Set(Object.values(CAREERS).flatMap(c=>Object.keys(c.specs)))];
    return {careers:Object.keys(CAREERS).length,placements:Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs).length,0),
      species:Object.keys(SPECIES).length,trees:names.length,universal:Object.keys(UNIVERSAL_TREES).length,
      full:names.filter(n=>EXACT_TREES[n]||FULL_SOURCE_TREES.has(n)).length,
      simplified:names.filter(n=>!EXACT_TREES[n]&&!FULL_SOURCE_TREES.has(n)&&PHASE37_STANDARD_SPECS.has(n)).length,
      prototype:names.filter(n=>!EXACT_TREES[n]&&!FULL_SOURCE_TREES.has(n)&&!PHASE37_STANDARD_SPECS.has(n)&&!FORM_TREES[n]).length};
  }
  const talentSkills = {
    'Basic Combat Training':['Brawl','Ranged (Light)'], 'Tactical Combat Training':['Melee','Ranged (Heavy)'],
    'Vehicle Combat Training':['Gunnery','Piloting (Planetary)'], 'Well Traveled':['Knowledge (Core Worlds)','Knowledge (Outer Rim)'],
    'Pilot Training':['Piloting (Planetary)','Piloting (Space)'],
    'Secrets of the Force':['Knowledge (Lore)','Lightsaber'], 'Secrets of the Jedi':['Lightsaber'],
    'Improved Secrets of the Jedi':['Discipline']
  };
  function bonusSkills() {
    const skills=new Set();
    for(const sk of window.Talents98?.careerSkills()||[])skills.add(sk);
    for (const spec of S.universalSpecs || []) for (const sk of data.universals[spec]?.skills || []) skills.add(sk);
    for (const n of [...allOwnedSpecNodes(),...ownedUniversalNodes()]) for (const sk of talentSkills[n.name]||[]) skills.add(sk);
    if ((S.universalSpecs||[]).includes('Republic Representative')) {
      const pick=S.universalKnowledge97?.['Republic Representative']; if(pick && SKILL_CHAR[pick] && pick.startsWith('Knowledge'))skills.add(pick);
    }
    return skills;
  }
  function installOptions() {
    const refill=(id,entries,value)=>{const el=$(id);if(!el)return;el.innerHTML=entries.map(([key,label])=>`<option value="${pxEsc67(key)}">${pxEsc67(label)}</option>`).join('');el.value=value;};
    refill('species',Object.entries(SPECIES).map(([id,s])=>[id,s.name]),S.species);
    refill('careerSelect',Object.keys(CAREERS).map(n=>[n,n]),S.career);
    refill('universalSelect',Object.keys(UNIVERSAL_TREES).map(n=>[n,n]),S.universalView);
  }
  return {data,rulesFor,requirement,eligible,status,coverage,bonusSkills,installOptions};
})();
