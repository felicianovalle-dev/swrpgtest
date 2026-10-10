
/* =========================================================
   PHASE 69 — PIXEL PORTRAITS / VISUAL DIALOGUE
   PHASE 70 — RETRO COMBAT 3.0 PRESENTATION
   ========================================================= */
BUILD_INFO.version='70.0.0-v1.3-portraits-retro-combat';
BUILD_INFO.saveSchema=70;

const VISUAL_SOCIAL_69={
  plain:{skill:'Charm',label:'Speak Plainly',desc:'Be direct and personable.'},
  deal:{skill:'Negotiation',label:'Offer a Deal',desc:'Find terms that benefit both sides.'},
  misdirect:{skill:'Deception',label:'Misdirect',desc:'Hide the crew’s real purpose.'},
  pressure:{skill:'Coercion',label:'Apply Pressure',desc:'Push until the other person gives ground.'}
};
const PORTRAIT_PALETTES_69=[
  {skin:'#d19a72',shadow:'#8a5b46',hair:'#1c2027',cloth:'#547c9c',eye:'#dff6ff'},
  {skin:'#aa7455',shadow:'#734638',hair:'#301d1a',cloth:'#8a6641',eye:'#e5f4ff'},
  {skin:'#8b5d44',shadow:'#5b382c',hair:'#171717',cloth:'#6d4f88',eye:'#fff1a7'},
  {skin:'#dfb18b',shadow:'#986a51',hair:'#574237',cloth:'#496b55',eye:'#d8f5ff'}
];
function ensurePhase70State(){
  ensurePhase68State();S.schemaVersion=70;
  S.visual69=S.visual69&&typeof S.visual69==='object'?S.visual69:{};
  let D=S.visual69;
  D.relations=D.relations&&typeof D.relations==='object'?D.relations:{};
  D.socialMemory=D.socialMemory&&typeof D.socialMemory==='object'?D.socialMemory:{};
  D.lastResults=D.lastResults&&typeof D.lastResults==='object'?D.lastResults:{};
  D.portraitSeen=D.portraitSeen&&typeof D.portraitSeen==='object'?D.portraitSeen:{};
  S.visual70=S.visual70&&typeof S.visual70==='object'?S.visual70:{};
  S.visual70.enabled=S.visual70.enabled!==false;
  S.visual70.command=S.visual70.command||'attack';
  return S.visual70
}
function visualRelation69(id){ensurePhase70State();if(!Number.isFinite(S.visual69.relations[id]))S.visual69.relations[id]=2;return S.visual69.relations[id]}
function changeVisualRelation69(id,n){ensurePhase70State();S.visual69.relations[id]=Math.max(0,Math.min(5,visualRelation69(id)+n));return S.visual69.relations[id]}
function visualNpc69(id){let map=pixelCurrentMap67();return map.npcs.find(n=>n.id===id)||CREW.find(c=>c.id===id)||S.customCrew?.find(c=>c.id===id)||null}
function portraitProfile69(n={}){
  let id=n.id||n.crewId||n.name||'npc',hash=[...String(id)].reduce((a,c)=>a+c.charCodeAt(0),0),p=PORTRAIT_PALETTES_69[hash%PORTRAIT_PALETTES_69.length];
  let rec=n.crewId?CREW.find(c=>c.id===n.crewId):CREW.find(c=>c.id===id),custom=S.customCrew?.find(c=>c.id===(n.crewId||id)),species=custom?.species||(n.crewId==='pc'?S.species:null)||rec?.species||'human';
  let droid=!!n.droid||/droid/i.test(n.role||rec?.role||'')||/^n4/i.test(id);
  return{...p,droid,species,accent:n.accent||p.cloth,hash,name:n.name||rec?.name||'Unknown'};
}
function drawPortrait69(canvas,n,expression='neutral'){
  if(!canvas)return;let ctx=canvas.getContext('2d'),P=portraitProfile69(n),W=64,H=64;canvas.width=W;canvas.height=H;ctx.imageSmoothingEnabled=false;
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
  r(0,0,W,H,'#05090d');r(3,3,58,58,'#0e1822');r(5,5,54,54,'#172535');
  // star-field / panel accents
  for(let i=0;i<9;i++){let x=(P.hash*(i+3)*7)%54+5,y=(P.hash*(i+5)*11)%52+6;r(x,y,1,1,i%2?'#334b60':'#70899b')}
  if(P.droid){
    r(18,11,28,9,P.accent);r(15,20,34,28,'#8797a3');r(19,24,26,19,'#566570');r(22,15,20,5,'#1a2b37');
    r(25,17,3,3,'#82f6ff');r(35,17,3,3,'#e7b64f');r(24,29,16,4,'#142733');r(19,48,8,9,'#697985');r(37,48,8,9,'#697985');
    return
  }
  let species=(P.species||'human').toLowerCase();
  // shoulders / torso
  r(12,43,40,16,P.accent);r(8,49,48,10,P.accent);r(17,39,30,8,P.shadow);
  // species silhouette
  if(species.includes('twi')){r(15,22,7,28,P.skin);r(42,22,7,28,P.skin)}
  if(species.includes('rodian')){r(16,10,4,8,P.skin);r(44,10,4,8,P.skin)}
  if(species.includes('lasat')){r(10,12,8,16,P.skin);r(46,12,8,16,P.skin)}
  if(species.includes('zabrak')){for(let x=20;x<=44;x+=6)r(x,8-(x%12?2:0),3,7,P.shadow)}
  // head
  let headX=18,headY=13,headW=28,headH=30;
  if(species.includes('rodian')){headX=16;headW=32}
  r(headX,headY,headW,headH,P.skin);r(headX,headY+headH-6,headW,6,P.shadow);
  // hair / hood
  if(!species.includes('twi')&&!species.includes('rodian')&&!species.includes('lasat')){r(headX,headY,headW,7,P.hair);r(headX-2,headY+4,5,13,P.hair);r(headX+headW-3,headY+4,5,13,P.hair)}
  if(species.includes('rodian')){r(18,18,28,17,'#5d8d64');r(20,33,24,7,'#406947')}
  if(species.includes('lasat')){r(14,10,36,9,'#6d5a83');r(12,17,40,21,'#8b6da0')}
  // eyes
  let eyeY=27; r(23,eyeY,5,3,'#12161a');r(36,eyeY,5,3,'#12161a');r(25,eyeY,2,2,P.eye);r(38,eyeY,2,2,P.eye);
  if(expression==='angry'){r(22,24,7,2,P.shadow);r(35,24,7,2,P.shadow)}
  if(expression==='pleased'){r(24,28,3,1,P.eye);r(37,28,3,1,P.eye)}
  // mouth / snout
  if(species.includes('rodian')){r(26,34,12,5,'#3e5741')}
  else if(expression==='pleased'){r(27,36,10,2,'#5a302c');r(29,38,6,1,'#d9c1a8')}
  else if(expression==='angry')r(27,38,10,2,'#5a302c');
  else r(28,37,8,2,'#5a302c');
  // collar / faction accent
  r(23,44,18,5,'#1a232b');r(29,44,6,6,'#d1aa4b');
}
function visualSocialDifficulty69(n,skill){
  let d=2,rel=visualRelation69(n.id);
  if(rel>=4&&['Charm','Negotiation'].includes(skill))d--;
  if(rel<=1&&['Deception','Coercion'].includes(skill))d++;
  if(n.faction==='Empire'&&localHeat50()>=5)d++;
  if(n.faction==='Guild'&&skill==='Negotiation'&&(S.ep15?.rep?.Guild||0)>=5)d--;
  return Math.max(1,Math.min(5,d))
}
function socialPreview69(n,mode){
  let o=VISUAL_SOCIAL_69[mode],diff=visualSocialDifficulty69(n,o.skill),q=bestActor(o.skill,{diff});
  return{o,diff,q,done:!!S.visual69.socialMemory[`${n.id}:${mode}:${S.world?.day||1}`]}
}
function visualDialogueText69(n){
  return {
    'mira-venn':'Landing fees are easy. Keeping captains from blocking each other on departure is the hard part.',
    'orrik-dane':'Freight, passage, discreet cargo. Every problem has a price; the trick is knowing which price is real.',
    'talo-brinn':'You can ask a direct question. Whether you get a direct answer depends on how interesting the question is.',
    'bexa-tor':'If it still has a serial number, somebody thinks they own it. If it does not, somebody probably filed it off.',
    'n4-vi':'Relay integrity: thirty-eight percent. Local rumor integrity: considerably lower.'
  }[n.id]||`${n.name} watches the traffic moving through the settlement.`
}
function openVisualDialogue69(n,text=null,result=''){
  ensurePhase70State();let box=$('pixelDialog67');if(!box)return;PX67.dialog={title:n.name,text:text||visualDialogueText69(n),actions:[]};box.classList.remove('hidden');
  let rel=n.crewId?(S.approval?.[n.crewId]||0):visualRelation69(n.id),relPct=n.crewId?Math.max(0,Math.min(100,50+rel*5)):rel*20;
  let social=n.crewId?'':Object.keys(VISUAL_SOCIAL_69).map(mode=>{let p=socialPreview69(n,mode),pool=dicePoolHTML(p.q.p);return `<div class="pixel-social-option69"><b>${pxEsc67(p.o.label)} · ${pxEsc67(p.o.skill)}</b><span class="tiny">${p.done?'Already tried today · ':''}Recommended: ${pxEsc67(p.q.actor.name)} · difficulty ${p.diff}</span><div style="margin-top:4px">${pool}</div><button class="btn social69" data-visual-social69="${mode}" ${p.done?'disabled':''}>${p.done?'Resolved Today':'Try Approach'}</button></div>`}).join('');
  box.innerHTML=`<div class="pixel-dialog69"><div><div class="pixel-portrait-frame69"><canvas class="pixel-portrait69" id="portrait69"></canvas></div><div class="pixel-relation69" title="${n.crewId?'Approval':'Relationship'}"><span style="width:${relPct}%"></span></div><div class="tiny" style="text-align:center;margin-top:3px">${n.crewId?'APPROVAL':'REL'} ${rel}</div></div><div class="pixel-dialog-copy69"><div class="pixel-speaker67">${pxEsc67(n.name)}</div><div class="pixel-speaker-meta69">${pxEsc67(n.role||'Local')} · ${pxEsc67(n.faction||'Independent')}</div><div class="small" style="margin-top:8px">“${pxEsc67(text||visualDialogueText69(n))}”</div>${result?`<div class="pixel-social-result69">${pxEsc67(result)}</div>`:''}${social?`<div class="pixel-social-grid69">${social}</div>`:''}<div class="pixel-dialog-actions67"><button class="btn primary" id="visualWork69">${n.crewId?'Talk / Crew Profile':'Ask About Work'}</button>${n.crewId?`<button class="btn" id="visualGoal69">Personal Goal</button>`:'<button class="btn" id="visualExplore69">Classic Explore</button>'}<button class="btn" id="visualClose69">Leave</button></div></div></div>`;
  drawPortrait69($('portrait69'),n,result&&/fails|refuses|worsens|suspicion/i.test(result)?'angry':result?'pleased':'neutral');
  box.querySelectorAll('[data-visual-social69]').forEach(b=>b.onclick=()=>resolveVisualSocial69(n.id,b.dataset.visualSocial69));
  $('visualClose69').onclick=()=>closePixelDialog67();
  $('visualWork69').onclick=()=>{closePixelDialog67(false);if(n.crewId){S.crewConversation=n.crewId;renderNavTab('crewmgmt')}else renderNavTab('gm')};
  if($('visualExplore69'))$('visualExplore69').onclick=()=>{closePixelDialog67(false);renderNavTab('explore')};
  if($('visualGoal69'))$('visualGoal69').onclick=()=>{closePixelDialog67(false);offerCrewRequest59(n.crewId);renderNavTab('crewmgmt')};
}
function resolveVisualSocial69(id,mode){
  ensurePhase70State();let n=visualNpc69(id);if(!n)return;let p=socialPreview69(n,mode),key=`${id}:${mode}:${S.world?.day||1}`;if(p.done)return;
  let out=performBest(p.o.skill,{diff:p.diff,setback:(mode==='misdirect'&&localHeat50()>=7)?1:0}),msg='';
  S.visual69.socialMemory[key]={ok:out.r.ok,actor:out.q.actor.name,day:S.world?.day||1};
  if(out.r.ok){
    if(mode==='plain'){changeVisualRelation69(id,1);adjustFactionRep(n.faction||'Local',1);msg=`${out.q.actor.name} makes a genuine connection. Relationship +1 and ${n.faction||'Local'} reputation +1.`}
    else if(mode==='deal'){changeVisualRelation69(id,1);let c=25+p.diff*15;S.credits+=c;ledgerEntry(c,`Visual dialogue deal — ${n.name}`);msg=`${out.q.actor.name} finds useful terms. Relationship +1 and ${c} credits of value secured.`}
    else if(mode==='misdirect'){S.ep15.intel=(S.ep15.intel||0)+1;msg=`${out.q.actor.name} keeps the real objective hidden and draws out a useful detail. +1 Intel.`}
    else{changeVisualRelation69(id,-1);S.ep15.intel=(S.ep15.intel||0)+2;msg=`${out.q.actor.name} gets the answer under pressure. +2 Intel, but relationship -1.`}
  }else{
    if(mode==='pressure'){changeVisualRelation69(id,-1);adjustHeat50(1,`an open intimidation attempt involving ${n.name}`);msg=`${n.name} refuses to be pushed. Relationship -1 and local heat +1.`}
    else if(mode==='misdirect'){changeVisualRelation69(id,-1);adjustHeat50(1,`a failed deception around ${n.name}`);msg=`${n.name} catches the inconsistency. Relationship -1 and local heat +1.`}
    else{msg=`${out.q.actor.name}'s ${p.o.skill} approach does not land. No permanent gain.`}
  }
  S.visual69.lastResults[id]=msg;pxLog67(`${n.name}: ${msg}`);safeAutosave();openVisualDialogue69(n,visualDialogueText69(n),msg)
}
const _p69VisualNpc67=pxVisualNpc67;
pxVisualNpc67=function(n){
  if(n?.crewId){
    let meta=crewMeta59(n.crewId),full=CREW.find(c=>c.id===n.crewId)||n;
    openVisualDialogue69({...n,role:full.role||n.role,faction:'Crew'},meta?.goal?`I've been thinking about this: ${meta.goal}`:null);return
  }
  openVisualDialogue69(n)
};

/* Improve Phase 68 ship population: custom recruits already synchronized into CREW, and positions scale to seven active companions. */
const _p69BuildShip67=buildShip67;
buildShip67=function(){
  syncCustomCrew?.();let map=_p69BuildShip67(),slots=[[11,4],[15,4],[21,4],[7,14],[18,14],[25,13],[26,16]],
      active=(S.crew||[]).map(id=>CREW.find(c=>c.id===id)).filter(Boolean).slice(0,slots.length);
  map.npcs=active.map((c,i)=>({id:`crew:${c.id}`,crewId:c.id,name:c.name,role:c.role||CUSTOM_CREW_ARCHETYPES[c.archetype]?.name||'Crew',faction:'Crew',x:slots[i][0],y:slots[i][1],skin:'#c58f6a',accent:i%3===0?'#4f78a8':i%3===1?'#8f5aa5':'#8a7648',droid:/droid/i.test(c.role||'')}));
  return map
};

/* =========================
   PHASE 70 — RETRO COMBAT PRESENTATION
   ========================= */
const RETRO70={lastLog:'',flashUntil:0,lastTarget:null};
function ensureRetroCombat70(){
  let combat=$('combat');if(!combat)return;
  if(!$('retroCombat70')){
    let box=document.createElement('div');box.id='retroCombat70';box.className='retro-combat70';
    let tactical=combat.querySelector('.tactical-board');(tactical||combat.children[1])?.insertAdjacentElement('beforebegin',box);
  }
  let box=$('retroCombat70');if(!box.dataset.ready){
    box.innerHTML=`<div class="row"><div><div class="retro-label70">RETRO COMBAT 3.0</div><div class="small">Classic JRPG presentation over the existing narrative-dice and tactical combat engine.</div></div><button class="btn combat-visual-toggle70" id="retroToggle70">Hide Visual</button></div><div id="retroVisual70"><div class="retro-combat-stage70"><canvas id="retroBattleCanvas70" width="384" height="216" aria-label="Retro combat scene"></canvas><div id="retroDiceTray70" class="retro-dice-tray70"></div><div id="retroEvent70" class="retro-event70 hidden"></div></div><div class="retro-overlay70"><div class="retro-party70"><div class="row"><b>Party</b><span class="retro-round70" id="retroRound70"></span></div><div id="retroParty70" class="retro-party-list70"></div><div id="retroTargets70" class="retro-target-row70"></div></div><div class="retro-command70"><div class="row"><b>Command</b><span class="tiny" id="retroActor70"></span></div><div class="retro-command-grid70"><button class="primary" data-retro-command70="attack">ATTACK</button><button data-retro-command70="skill">SKILL</button><button data-retro-command70="item">ITEM</button><button data-retro-command70="tactic">TACTIC</button></div><div id="retroSub70" class="retro-sub70"></div><div class="retro-help70">These buttons call the same Phase 60 combat actions. The visual layer does not simplify away range bands, cover, talents, weapon qualities, Destiny, strain, Critical Injuries, or narrative dice.</div></div></div></div>`;
    box.dataset.ready='1';
    $('retroToggle70').onclick=()=>{S.visual70.enabled=!S.visual70.enabled;renderRetroCombat70();safeAutosave()};
    box.querySelectorAll('[data-retro-command70]').forEach(b=>b.onclick=()=>{S.visual70.command=b.dataset.retroCommand70;renderRetroCommands70()});
  }
}
function retroScenePalette70(){
  let h=S.world?.currentHub||'sable';
  let sets={tatooine:['#8b6640','#c09a61','#3a271d'],narshaddaa:['#241b39','#6b3e86','#1b5971'],bespin:['#d6b37d','#8b6d73','#4f6370'],yavin:['#233d2a','#476a3b','#18251e'],dantooine:['#65744c','#879b63','#283729'],nalhutta:['#44552f','#788049','#292c1e'],toydaria:['#405a40','#6a7d4b','#233629'],corellia:['#4b4f4c','#7b6350','#20282d'],ferrix:['#6e4938','#9d6a4b','#332820']};
  return sets[h]||['#24303b','#4a5662','#111820']
}
function drawRetroUnit70(ctx,x,y,actor,enemy=false,active=false){
  const r=(xx,yy,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(xx,yy,w,h)},droid=/droid/i.test(actor.name||'')||/droid/i.test(actor.role||'');
  let accent=enemy?'#8b3f42':active?'#d7b74f':'#4f789b';
  // shadow
  r(x-11,y+13,22,4,'#0007');
  if(droid){r(x-6,y-9,12,7,'#7c8d99');r(x-8,y-2,16,14,'#566672');r(x-3,y-7,2,2,'#8ff7ff')}
  else{
    r(x-5,y-12,10,9,enemy?'#b6b9bd':'#c7926b');r(x-7,y-4,14,11,accent);r(x-6,y+7,5,7,'#242c34');r(x+1,y+7,5,7,'#242c34');
    if(enemy&&/storm|imperial|trooper/i.test(actor.name||'')){r(x-6,y-13,12,8,'#d5d8da');r(x-4,y-10,8,3,'#23282d')}
  }
  if(active){ctx.strokeStyle='#ffe06a';ctx.lineWidth=2;ctx.strokeRect(x-10,y-16,20,31)}
}
function drawRetroEnemyLarge70(ctx,x,y,e,selected=false){
  const r=(xx,yy,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(xx,yy,w,h)};
  let imperial=/storm|imperial|navy|security|trooper|varrik/i.test(e.name||''),beast=/stalker|beast|creature|shaoryn/i.test(e.name||'');
  r(x-18,y+18,36,5,'#0008');
  if(beast){r(x-18,y-5,36,20,'#67724c');r(x-12,y-15,24,13,'#7d875b');r(x-14,y-10,4,3,'#e3bd4d');r(x+10,y-10,4,3,'#e3bd4d');r(x-23,y+1,8,5,'#596343');r(x+15,y+1,8,5,'#596343')}
  else{
    r(x-13,y-20,26,18,imperial?'#d4d7d9':'#9a6d57');r(x-16,y-3,32,25,imperial?'#c2c6c8':'#7c4b43');
    if(imperial){r(x-10,y-14,20,6,'#23282d');r(x-6,y-6,12,3,'#15191c')}
    else{r(x-9,y-13,18,4,'#2a2020');r(x-5,y-7,3,3,'#e7d8b3');r(x+3,y-7,3,3,'#e7d8b3')}
  }
  if(selected){ctx.strokeStyle='#ffe36b';ctx.lineWidth=2;ctx.strokeRect(x-25,y-24,50,49)}
}
function retroTerrain70(ctx){
  let [a,b,c]=retroScenePalette70();ctx.fillStyle=c;ctx.fillRect(0,0,384,216);
  ctx.fillStyle=a;ctx.fillRect(0,96,384,120);ctx.fillStyle=b;ctx.fillRect(0,126,384,90);
  for(let i=0;i<24;i++){let x=(i*71+37)%384,y=105+(i*43)%96;ctx.fillStyle=i%2?'#ffffff0b':'#00000013';ctx.fillRect(x,y,12+(i%3)*5,2)}
  // skyline / Star Wars-ish industrial silhouettes
  ctx.fillStyle='#111820';for(let i=0;i<12;i++){let x=i*36-8,h=18+(i*17)%42;ctx.fillRect(x,96-h,28,h);if(i%3===0)ctx.fillRect(x+10,96-h-10,7,10)}
  ctx.fillStyle='#d6ae4a';for(let i=0;i<6;i++)ctx.fillRect(18+i*67,88-(i%2)*10,2,2)
}
function drawRetroBattle70(){
  let cv=$('retroBattleCanvas70'),C=S.combat;if(!cv||!C)return;let ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;retroTerrain70(ctx);
  let party=squadActors(),T=C.turn,target=selectedEnemy(),partyY=177;
  let px=[50,105,160,215,270].slice(0,party.length);
  party.forEach((a,i)=>drawRetroUnit70(ctx,px[i],partyY,a,false,T?.actorId===a.id));
  let alive=C.enemies.filter(e=>!enemyDefeated(e)),ex=alive.length===1?[300]:alive.length===2?[275,335]:alive.length===3?[250,302,350]:[228,270,315,356];
  alive.slice(0,4).forEach((e,i)=>drawRetroEnemyLarge70(ctx,ex[i]||350,72+(i%2)*8,e,target?.id===e.id));
  // range band horizon
  ctx.fillStyle='#07101bcc';ctx.fillRect(8,104,148,15);ctx.fillStyle='#b8c7d4';ctx.font='8px monospace';ctx.fillText(target&&T?.actorId?`${RANGE_NAMES[rangeBandBetween(T.actorId,target.id)]} RANGE · ${target.name}`:'WAITING FOR TURN',13,114);
}
function retroActor70(){let C=S.combat,T=C?.turn;return T?actorById(T.actorId):null}
function renderRetroParty70(){
  let C=S.combat;if(!C)return;let T=C.turn;
  $('retroParty70').innerHTML=squadActors().map(a=>{let st=actorState(a.id),wt=actorWT(a.id),ss=actorST(a.id),active=T?.actorId===a.id,down=actorIsIncapacitated(a.id),wp=Math.max(0,Math.min(100,(st.wounds/wt)*100)),sp=Math.max(0,Math.min(100,(st.strain/ss)*100));return`<div class="retro-unit70 ${active?'active':''} ${down?'down':''}"><b>${pxEsc67(a.name)}</b><div>W ${st.wounds}/${wt} · S ${st.strain}/${ss}</div><div class="retro-hp70"><span style="width:${wp}%"></span></div><div class="retro-sp70"><span style="width:${sp}%"></span></div></div>`}).join('');
  $('retroTargets70').innerHTML=C.enemies.map((e,i)=>enemyDefeated(e)?'':`<button class="retro-target70 ${selectedEnemy()?.id===e.id?'on':''}" data-retro-target70="${i}">${pxEsc67(e.name)} · W ${e.w}/${e.wt}</button>`).join('');
  $('retroTargets70').querySelectorAll('[data-retro-target70]').forEach(b=>b.onclick=()=>{$('target').value=b.dataset.retroTarget70;renderCombat()});
}
function retroProxyButton70(id,label,cls=''){
  let b=$(id);if(!b||b.disabled)return'';return`<button class="btn ${cls}" data-retro-proxy70="${id}">${pxEsc67(label||b.textContent)}</button>`
}
function renderRetroCommands70(){
  if(!$('retroSub70')||!S.combat)return;let mode=S.visual70.command,actor=retroActor70(),html='';
  if(mode==='attack'){
    html=retroProxyButton70(actor?.id==='pc'?'cAttack':'cCrew',actor?.id==='pc'?'Attack':'Crew Attack','primary')+retroProxyButton70('cUnarmed','Unarmed')+retroProxyButton70('cGrenFrag','Frag')+retroProxyButton70('cGrenStun','Stun Grenade')+retroProxyButton70('cGrenThermal','Thermal');
  }else if(mode==='skill'){
    ['cPrecise','cMoveObj','cHurl','cLeapIn','cLeapOut','cSenseScan','cInfluence','cFarStrike','cSaberThrow','cHeadbutt','cHardHeaded','cInnerPeace','cHeroic','cPowerPain','cImpTough','cIndomitable','cReleaseWill','cCrewSupport'].forEach(id=>{html+=retroProxyButton70(id)});
  }else if(mode==='item'){
    html=retroProxyButton70('mStim','Stimpack','primary')+retroProxyButton70('mReload','Reload')+retroProxyButton70('cGrenFrag','Frag')+retroProxyButton70('cGrenStun','Stun Grenade')+retroProxyButton70('cGrenThermal','Thermal');
  }else{
    html=retroProxyButton70('mCloser','Move Toward')+retroProxyButton70('mFarther','Move Away')+retroProxyButton70('mAim','Aim')+retroProxyButton70('mCover','Take Cover')+retroProxyButton70('mSide','Side Step')+retroProxyButton70('mStance','Defensive Stance')+retroProxyButton70('cOverwatch','Overwatch')+retroProxyButton70('cSuppress','Suppress')+retroProxyButton70('markTarget60','Mark Target')+retroProxyButton70('terrainAction60');
  }
  html+=retroProxyButton70('cEnd','End Turn','good');
  $('retroSub70').innerHTML=html||'<span class="tiny">No available command in this category for the active character.</span>';
  $('retroSub70').querySelectorAll('[data-retro-proxy70]').forEach(b=>b.onclick=()=>$(b.dataset.retroProxy70)?.click());
}
function retroDiceFromLog70(text=''){
  let tray=$('retroDiceTray70');if(!tray)return;tray.innerHTML='';if(!text||text===RETRO70.lastLog)return;RETRO70.lastLog=text;
  let n=Math.max(2,Math.min(6,(text.match(/\b(Success|Advantage|Threat|Failure|Triumph|Despair)\b/gi)||[]).length||3)),glyphs=['◆','▲','●','✦','⬢','◇'];
  for(let i=0;i<n;i++){let d=document.createElement('div');d.className='retro-die70';d.textContent=glyphs[(text.length+i*3)%glyphs.length];tray.appendChild(d)}
  let ev=$('retroEvent70');if(ev){ev.classList.remove('hidden');ev.textContent=text.replace(/<[^>]+>/g,'').slice(0,170);clearTimeout(RETRO70.flashUntil);RETRO70.flashUntil=setTimeout(()=>ev.classList.add('hidden'),1800)}
}
function renderRetroCombat70(){
  ensurePhase70State();ensureRetroCombat70();let C=S.combat,box=$('retroCombat70');if(!box)return;
  if(!C){box.classList.add('hidden');return}box.classList.remove('hidden');
  $('retroVisual70').classList.toggle('hidden',!S.visual70.enabled);$('retroToggle70').textContent=S.visual70.enabled?'Hide Visual':'Show Visual';
  if(!S.visual70.enabled)return;
  $('retroRound70').textContent=`ROUND ${C.round} · ${currentSlot()?.side||''}`;
  $('retroActor70').textContent=retroActor70()?.name||'NPC';
  drawRetroBattle70();renderRetroParty70();renderRetroCommands70();retroDiceFromLog70(C.log?.[0]||'')
}

/* Hook the retro presentation after all prior combat renderers. */
const _p70RenderCombat=renderCombat;
renderCombat=function(){let r=_p70RenderCombat();if(S.combat)renderRetroCombat70();return r};
const _p70StartCombat=startCombat;
startCombat=function(kind){let r=_p70StartCombat(kind);if(S.combat){ensureRetroCombat70();renderRetroCombat70()}return r};
const _p70CombatWin=combatWin;
combatWin=function(){let r=_p70CombatWin();if($('retroCombat70'))$('retroCombat70').classList.add('hidden');return r};

function injectPhase70Guide(){
  if(!$('guide')||$('phase70Guide'))return;let c=document.createElement('section');c.id='phase70Guide';c.className='card';c.style.marginTop='14px';
  c.innerHTML=`<div class="row"><div><b>v1.3 · Character & Combat Art Pass</b><div class="small">Phases 69–70 make people and battles readable in the same retro visual language as the new world map.</div></div><span class="tag">RETRO RPG</span></div><div class="grid g2" style="margin-top:9px"><div class="item"><b>Phase 69 · Portraits & Visual Dialogue</b><div class="small">Procedural original pixel portraits, relationship meter, role/faction identity, social approach previews, best-actor recommendations, narrative dice pools, and persistent daily social outcomes.</div></div><div class="item"><b>Phase 70 · Retro Combat 3.0</b><div class="small">A classic battle scene, party status window, visual target selection, command menu, combat event/dice animation, and direct proxies into the full Phase 60 tactical engine.</div></div></div>`;
  let old=$('phase68Guide');(old||$('guide')).insertAdjacentElement('afterend',c)
}

/* Save/schema/render integration. */
const _p70Serializable=serializableState;
serializableState=function(){let x=_p70Serializable();x.schemaVersion=70;S.schemaVersion=70;return x};
const _p70RenderAll=renderAll;
renderAll=function(){ensurePhase70State();let r=_p70RenderAll();S.schemaVersion=70;injectPhase70Guide();if(S.combat)renderRetroCombat70();return r};
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Phase 70: pixel portraits, visual dialogue memory, and Retro Combat 3.0 presentation. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};

RULE_AUDIT.unshift(
 {id:'pixelPortraitDialogue69',name:'Phase 69 pixel portraits & visual dialogue',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'Portrait construction, expression states, relationship meter, conversation layout, and visual social-menu presentation are original. Social checks still call the existing FFG-style skill/dice engine.'},
 {id:'retroCombat70',name:'Phase 70 Retro Combat 3.0',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'Battle art, command windows, target highlights, and dice/event animation are presentation abstractions over the existing Phase 60 tactical and FFG-style combat mechanics.'}
);
const _p70Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p70Diag().filter(x=>!['Phase 68 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase70State();injectPixelWorld67();ensureRetroCombat70();injectPhase70Guide();
  add('Phase 69 portrait renderer',typeof drawPortrait69==='function'&&typeof openVisualDialogue69==='function','procedural 64×64 portraits + expression states');
  add('Phase 69 social preview',Object.keys(VISUAL_SOCIAL_69).length===4&&['Charm','Negotiation','Deception','Coercion'].every(s=>Object.values(VISUAL_SOCIAL_69).some(x=>x.skill===s)),'four social approaches preserve best-actor dice previews');
  add('Phase 69 daily social memory',typeof S.visual69.socialMemory==='object','anti-spam social outcomes persisted');
  add('Phase 70 retro combat UI',!!$('retroCombat70')&&!!$('retroBattleCanvas70')&&!!$('retroSub70'),'battle canvas + party window + command menu');
  add('Phase 70 visual does not replace tactical board',!!$('battlefield')&&!!$('combatButtons')&&!!$('maneuverButtons'),'legacy tactical controls retained');
  add('Phase 70 save schema',BUILD_INFO.saveSchema===70&&S.schemaVersion===70&&serializableState().schemaVersion===70,'schema 70');
  return rows
};
const _p70Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p70Smoke();
  report.failed=report.failed.filter(x=>!x.startsWith('Phase 68 schema target:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase70State();injectPixelWorld67();ensureRetroCombat70();
  test('Phase 69 has four social approaches',()=>Object.keys(VISUAL_SOCIAL_69).length===4);
  test('Phase 69 portrait canvas renderer exists',()=>typeof drawPortrait69==='function');
  test('Phase 69 visual NPC dialogue has relationship state',()=>Number.isFinite(visualRelation69('mira-venn')));
  test('Phase 70 retro battle canvas exists',()=>!!$('retroBattleCanvas70')&&$('retroBattleCanvas70').width===384&&$('retroBattleCanvas70').height===216);
  test('Phase 70 exposes four classic command categories',()=>document.querySelectorAll('[data-retro-command70]').length===4);
  test('Phase 70 keeps legacy combat controls',()=>!!$('battlefield')&&!!$('combatButtons')&&!!$('maneuverButtons'));
  test('Phase 70 schema target',()=>BUILD_INFO.saveSchema===70&&serializableState().schemaVersion===70);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

ensurePhase70State();injectPixelWorld67();ensureRetroCombat70();injectPhase70Guide();
document.title='Star Wars: Sable Reach — Phase 70 Retro RPG';
let topTitle70=document.querySelector('.top h1');if(topTitle70)topTitle70.textContent='STAR WARS: SABLE REACH · v1.3 RETRO RPG';
let topP70=document.querySelector('.top p');if(topP70)topP70.textContent='Retro Star Wars RPG build: pixel exploration, visual dialogue and portraits, narrative-dice combat, crew, ships, quests, organizations, and a living galaxy.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,pixel:()=>({map:pixelCurrentMap67(),position:pxPos67(),visual:S.visual67}),visualDialogue:(id)=>{let n=visualNpc69(id);if(n)openVisualDialogue69(n)},retroCombat:()=>S.visual70};
