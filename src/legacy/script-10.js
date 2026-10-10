
/* =========================================================
   PHASE 71 — GEAR / INVENTORY ART
   PHASE 72 — COMPANION VISUAL SYSTEM
   ========================================================= */
BUILD_INFO.version='72.0.0-v1.3-gear-companions';
BUILD_INFO.saveSchema=72;

const VIS71={toastTimer:null};
function ensurePhase72State(){
  ensurePhase70State();S.schemaVersion=72;
  S.visual71=S.visual71&&typeof S.visual71==='object'?S.visual71:{};
  S.visual71.inspect=S.visual71.inspect||S.weapon||null;
  S.visual71.filter=S.visual71.filter||'all';
  S.visual72=S.visual72&&typeof S.visual72==='object'?S.visual72:{};
  S.visual72.focus=S.visual72.focus||S.crew?.[0]||null;
  S.visual72.lastScene=S.visual72.lastScene||'';
  S.visual72.lastCast=Array.isArray(S.visual72.lastCast)?S.visual72.lastCast:[];
  return S.visual72
}
function iconSeed71(id){return [...String(id||'item')].reduce((a,c)=>((a*33)+c.charCodeAt(0))>>>0,5381)}
function itemVisualKind71(i){
  if(!i)return'gear';let n=(i.name||'').toLowerCase();
  if(i.type==='armor')return /robe|clothing|coat|jacket/.test(n)?'clothing':'armor';
  if(i.type==='weapon'){
    if(/lightsaber|saber/.test(n))return'saber';
    if(/rifle|carbine|bowcaster/.test(n))return'rifle';
    if(/staff|spear|polearm/.test(n))return'staff';
    if(/blade|knife|sword|axe|vibro/.test(n))return'blade';
    if(/grenade|detonator/.test(n))return'grenade';
    return'pistol';
  }
  if(/med|stim/.test(n))return'med';
  if(/reload|ammo/.test(n))return'ammo';
  if(/comlink|comm/.test(n))return'comlink';
  if(/scanner|sensor|binocular/.test(n))return'scanner';
  if(/tool|kit|gear|utility/.test(n))return'tool';
  return'gear'
}
function drawItemIcon71(canvas,item,size=32){
  if(!canvas||!item)return;canvas.width=size;canvas.height=size;let c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
  let s=size/32,r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x*s),Math.round(y*s),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)))};
  let seed=iconSeed71(item.id),metal=['#8795a0','#6e7d88','#a7b0b7'][seed%3],dark='#1b242c',accent=['#4fa6c7','#d4ae4f','#a064b1','#bd5b53'][seed%4],kind=itemVisualKind71(item);
  r(0,0,32,32,'#05090e');r(2,2,28,28,'#101922');
  if(kind==='pistol'){r(7,11,15,6,metal);r(18,9,7,4,dark);r(11,17,6,8,dark);r(16,13,7,2,accent);r(23,12,5,2,metal)}
  else if(kind==='rifle'){r(4,13,23,5,metal);r(7,10,11,3,dark);r(18,11,6,2,accent);r(9,18,5,7,dark);r(25,14,4,2,metal)}
  else if(kind==='saber'){r(5,15,12,4,metal);r(8,13,7,2,dark);r(16,15,11,3,accent);r(26,14,2,5,'#eafcff')}
  else if(kind==='staff'){r(15,4,3,24,metal);r(12,4,9,3,accent);r(12,25,9,3,accent)}
  else if(kind==='blade'){r(7,20,9,4,dark);r(14,18,3,7,metal);r(16,7,5,13,'#b8c3ca');r(19,5,3,5,'#dce6eb')}
  else if(kind==='grenade'){r(10,11,12,14,'#56644e');r(13,7,6,5,metal);r(16,5,5,3,accent);r(13,14,6,2,dark)}
  else if(kind==='armor'){r(9,7,14,6,metal);r(6,13,20,12,metal);r(10,25,5,4,dark);r(18,25,5,4,dark);r(13,15,6,7,accent)}
  else if(kind==='clothing'){r(10,6,12,6,accent);r(7,12,18,15,accent);r(4,13,5,11,dark);r(23,13,5,11,dark);r(14,12,4,15,'#202b34')}
  else if(kind==='med'){r(7,7,18,18,metal);r(14,10,4,12,'#b94d4d');r(10,14,12,4,'#b94d4d')}
  else if(kind==='ammo'){r(7,8,6,17,metal);r(17,8,6,17,metal);r(8,6,4,3,accent);r(18,6,4,3,accent)}
  else if(kind==='comlink'){r(10,6,12,20,dark);r(12,9,8,7,accent);for(let y=19;y<24;y+=2)r(13,y,6,1,metal)}
  else if(kind==='scanner'){r(6,9,20,15,metal);r(9,12,14,8,dark);r(11,14,10,4,accent);r(13,24,6,3,dark)}
  else if(kind==='tool'){r(8,7,5,19,metal);r(18,6,5,20,accent);r(5,22,21,4,dark);r(10,5,3,4,dark)}
  else{r(8,8,16,16,metal);r(11,11,10,10,dark);r(14,14,4,4,accent)}
  c.strokeStyle='#41515e';c.strokeRect(.5,.5,size-1,size-1)
}
function itemStats71(item){
  if(!item)return[];
  if(item.type==='weapon'){let w=effectiveWeapon(item.id);return[['Damage',w.damage],['Crit',w.crit??'—'],['Range',w.range],['Enc',w.enc||0],['HP',`${attachmentUsedHP(item.id)}/${w.hp||0}`]]}
  if(item.type==='armor'){let a=effectiveArmor(item.id);return[['Soak',a.soak],['Defense',a.defense],['Enc',a.enc||0],['HP',`${attachmentUsedHP(item.id)}/${a.hp||0}`]]}
  return[['Enc',item.enc||0],['Rarity',item.rarity??0],['Price',`${(item.price||0).toLocaleString()} cr`]]
}
function compareValue71(label,a,b,type){
  if(typeof a!=='number'||typeof b!=='number')return'compare-even71';
  let betterHigher=!['Crit','Enc'].includes(label);
  if(a===b)return'compare-even71';
  return ((a>b)===betterHigher)?'compare-up71':'compare-down71'
}
function drawPaperdoll71(){
  let cv=$('paperdoll71');if(!cv)return;cv.width=128;cv.height=160;let c=cv.getContext('2d');c.imageSmoothingEnabled=false;
  let r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
  r(0,0,128,160,'#05090e');for(let i=0;i<18;i++)r((i*29)%126,(i*47)%120,1,1,i%2?'#40576c':'#203247');
  let armor=ARMOR[S.armor],kind=itemVisualKind71(armor),cloth=kind==='armor'?'#6f7d87':'#4b718f';
  r(51,22,26,24,'#c89470');r(47,46,34,45,cloth);r(34,50,13,39,cloth);r(81,50,13,39,cloth);r(51,91,13,45,'#27313a');r(66,91,13,45,'#27313a');
  if(kind==='armor'){r(47,47,34,11,'#8d99a2');r(50,61,28,17,'#596772');r(35,52,11,14,'#8d99a2');r(82,52,11,14,'#8d99a2')}
  r(48,16,32,9,'#1f2429');r(45,21,7,18,'#1f2429');r(76,21,7,18,'#1f2429');
  let weapon=WEAPONS[S.weapon],wk=itemVisualKind71(weapon),accent='#d0aa4d';
  if(wk==='rifle'){r(84,71,6,48,'#778690');r(78,75,18,7,'#4a5862');r(87,65,14,6,accent)}
  else if(wk==='saber'){r(88,83,6,28,'#717f88');r(87,49,8,37,'#83e8ff');r(89,45,4,7,'#eafcff')}
  else if(wk==='staff'){r(90,38,4,88,'#737f86');r(85,36,14,5,accent)}
  else if(wk==='blade'){r(88,72,7,36,'#bbc5ca');r(83,105,17,5,'#4b5963')}
  else{r(87,81,25,8,'#75858f');r(92,89,8,22,'#39434b');r(105,78,12,5,accent)}
  c.fillStyle='#9fb0bf';c.font='8px monospace';c.fillText((S.name||'PLAYER').slice(0,14).toUpperCase(),8,150)
}
function renderGearInspector71(){
  let box=$('gearInspector71');if(!box)return;let item=ITEMS[S.visual71.inspect]||ITEMS[S.weapon];if(!item){box.innerHTML='';return}
  let current=item.type==='weapon'?WEAPONS[S.weapon]:item.type==='armor'?ARMOR[S.armor]:null,stats=itemStats71(item),curStats=current?Object.fromEntries(itemStats71(current)):null;
  box.innerHTML=`<div class="row"><div><b>${pxEsc67(item.name)}</b><div class="tiny">${pxEsc67(item.type||'gear')} · ${pxEsc67(item.source||'')}</div></div>${item.type!=='gear'&&S.inventory.includes(item.id)?`<button class="btn primary" id="visualEquip71" ${(item.type==='weapon'&&S.weapon===item.id)||(item.type==='armor'&&S.armor===item.id)?'disabled':''}>Equip</button>`:''}</div><div class="compare-grid71"><div class="compare-card71"><div class="tiny">SELECTED</div>${stats.map(([k,v])=>`<div class="compare-stat71"><span>${pxEsc67(k)}</span><b class="${curStats?compareValue71(k,v,curStats[k],item.type):'compare-even71'}">${pxEsc67(v)}</b></div>`).join('')}<div class="small" style="margin-top:6px">${pxEsc67(itemSummary(item))}</div></div><div class="compare-card71"><div class="tiny">${current?'CURRENT '+item.type.toUpperCase():'DETAILS'}</div>${current?itemStats71(current).map(([k,v])=>`<div class="compare-stat71"><span>${pxEsc67(k)}</span><b>${pxEsc67(v)}</b></div>`).join(''):`<div class="small">${pxEsc67(item.desc||'General carried equipment.')}</div>`}</div></div>`;
  if($('visualEquip71'))$('visualEquip71').onclick=()=>{equipItem(item.id);S.visual71.inspect=item.id;renderVisualEquipment71();safeAutosave()}
}
function renderVisualEquipment71(){
  if(!$('equipment'))return;ensurePhase72State();
  if(!$('visualLoadout71')){
    let card=document.createElement('div');card.id='visualLoadout71';card.className='visual-loadout71';
    card.innerHTML=`<div class="row"><div><b>Visual Loadout & Inventory</b><div class="small">Original pixel icons and a retro paper-doll view layered over the source-grounded item statistics.</div></div><span class="tag">PHASE 71</span></div><div class="visual-loadout-grid71"><div class="paperdoll71"><canvas id="paperdoll71" width="128" height="160"></canvas><div><div class="small" style="margin-top:6px"><b id="visualWeapon71"></b></div><div class="tiny" id="visualArmor71"></div></div></div><div><div id="visualInventory71" class="visual-inventory71"></div><div id="gearInspector71" class="gear-inspector71"></div></div></div>`;
    let warning=$('encWarning');warning?.insertAdjacentElement('afterend',card)
  }
  drawPaperdoll71();$('visualWeapon71').textContent=WEAPONS[S.weapon]?.name||'No weapon';$('visualArmor71').textContent=ARMOR[S.armor]?.name||'No armor';
  let ids=[...new Set(S.inventory||[])].filter(id=>ITEMS[id]);
  $('visualInventory71').innerHTML=ids.map(id=>{let i=ITEMS[id],eq=(i.type==='weapon'&&S.weapon===id)||(i.type==='armor'&&S.armor===id),owner=assignedCrewForItem(id);return`<div class="visual-item71 ${S.visual71.inspect===id?'selected':''} ${eq?'equipped':''}" data-visual-item71="${id}"><div class="visual-item-head71"><canvas class="item-icon71" data-item-icon71="${id}" width="42" height="42"></canvas><div><div class="visual-item-name71">${pxEsc67(i.name)}</div><div class="visual-item-type71">${pxEsc67(i.type)}${eq?' · equipped':''}${owner?' · '+pxEsc67(owner.name):''}</div></div></div></div>`}).join('')||'<div class="small">No carried items.</div>';
  document.querySelectorAll('[data-item-icon71]').forEach(cv=>drawItemIcon71(cv,ITEMS[cv.dataset.itemIcon71],42));
  document.querySelectorAll('[data-visual-item71]').forEach(el=>el.onclick=()=>{S.visual71.inspect=el.dataset.visualItem71;renderVisualEquipment71()});
  renderGearInspector71();decorateMarketIcons71()
}
function decorateMarketIcons71(){
  let shop=$('shopList');if(!shop)return;
  shop.querySelectorAll('[data-buy]').forEach(b=>{let item=ITEMS[b.dataset.buy],card=b.closest('.item');if(!item||!card||card.querySelector('.shop-icon71'))return;let cv=document.createElement('canvas');cv.width=36;cv.height=36;cv.className='item-icon71 shop-icon71';card.prepend(cv);drawItemIcon71(cv,item,36)})
}
function showPickup71(item,label='LOOT ACQUIRED'){
  let stage=document.querySelector('.pixel-stage67');if(!stage||!item)return;let old=$('pickupToast71');old?.remove();let d=document.createElement('div');d.id='pickupToast71';d.className='pickup-toast71';d.innerHTML=`<canvas id="pickupIcon71" width="34" height="34" class="item-icon71"></canvas><div><b>${pxEsc67(label)}</b><div>${pxEsc67(item.name||String(item))}</div></div>`;stage.appendChild(d);drawItemIcon71($('pickupIcon71'),item,34);clearTimeout(VIS71.toastTimer);VIS71.toastTimer=setTimeout(()=>d.remove(),1800)
}
const _p71PxDrawHumanoid=pxDrawHumanoid67;
pxDrawHumanoid67=function(ctx,sx,sy,n,player=false,facing='down'){
  _p71PxDrawHumanoid(ctx,sx,sy,n,player,facing);
  let wid=null,aid=null;
  if(player){wid=S.weapon;aid=S.armor}else if(n?.crewId){wid=currentCrewWeaponId(n.crewId);aid=currentCrewArmorId(n.crewId)}
  if(aid&&ARMOR[aid]&&itemVisualKind71(ARMOR[aid])==='armor'){ctx.fillStyle='#8b98a2';ctx.fillRect(sx+4,sy+7,2,5);ctx.fillRect(sx+10,sy+7,2,5)}
  if(wid&&WEAPONS[wid]){
    let k=itemVisualKind71(WEAPONS[wid]);ctx.fillStyle=k==='saber'?'#78e9ff':'#b7c0c6';
    if(k==='rifle'){ctx.fillRect(sx+11,sy+7,5,2);ctx.fillRect(sx+14,sy+5,1,5)}
    else if(k==='saber'){ctx.fillRect(sx+12,sy+5,1,7);ctx.fillStyle='#eefeff';ctx.fillRect(sx+12,sy+3,1,3)}
    else if(k==='staff'){ctx.fillRect(sx+13,sy+3,1,12)}
    else if(k==='blade'){ctx.fillRect(sx+12,sy+6,1,7)}
    else{ctx.fillRect(sx+12,sy+8,4,2)}
  }
};
const _p71InteractObject=pxInteractObject67;
pxInteractObject67=function(o){
  let beforeCredits=S.credits,beforeLoot=ensurePhase68State().loot?.[o.id];
  let r=_p71InteractObject(o);
  if(o.action==='loot'&&!beforeLoot&&ensurePhase68State().loot?.[o.id]&&S.credits>beforeCredits){
    showPickup71({id:'salvageCredit',name:`Salvage · ${S.credits-beforeCredits} cr`,type:'gear',enc:0});
  }
  return r
};

/* =========================
   PHASE 72 — COMPANION VISUAL SYSTEM
   ========================= */
function companionVisualList72(){
  syncCustomCrew?.();return CREW.filter(c=>c.id!=='pc')
}
function companionStateText72(c){
  let m=crewLifeRecord59(c.id),q=m.request;
  if(m.injury)return`Injured · ${m.injury.name}`;
  if(q?.status==='active')return`Personal quest active`;
  if(q?.status==='offered')return`Wants to talk`;
  if((S.approval?.[c.id]||0)>=25)return'Loyal';
  if((S.approval?.[c.id]||0)>=10)return'Trusted';
  return crewMoraleTier59(m.morale)
}
function loyaltyPips72(c){
  let ap=S.approval?.[c.id]||0,n=ap>=25?5:ap>=10?4:ap>=0?3:ap>=-10?2:1;
  return `<div class="loyalty-track72" title="Approval ${ap}">${[1,2,3,4,5].map(i=>`<span class="${i<=n?'on':''}"></span>`).join('')}</div>`
}
function crewVisualLocation72(id){
  if(S.crew?.includes(id))return S.ship?.owned?'Ship / Active Party':'Active Party';
  let m=crewLifeRecord59(id);if(m.request?.status==='active')return'Following personal lead';
  return S.ship?.owned?'Aboard ship / reserve':'Reserve'
}
function visualSelectCompanion72(id){
  if(S.crew.includes(id)){
    if(S.crew.length<=1){bLog('At least one companion must remain active in the current party system.');return}
    S.crew=S.crew.filter(x=>x!==id)
  }else{
    if(S.crew.length>=2){let old=S.crew[1]||S.crew[0];S.crew=S.crew.filter(x=>x!==old)}
    S.crew.push(id)
  }
  S.visual72.focus=id;renderAll();safeAutosave()
}
function openCompanionDialogue72(id){
  let c=CREW.find(x=>x.id===id);if(!c)return;
  if(S.visual67?.map!=='ship'&&S.ship?.owned){S.visual67.map='ship'}
  let n={id:`crew:${id}`,crewId:id,name:c.name,role:c.role||CUSTOM_CREW_ARCHETYPES[c.archetype]?.name||'Crew',faction:'Crew',accent:'#557a9a'};
  renderNavTab('pixelworld67');setTimeout(()=>openVisualDialogue69(n,crewMeta59(id)?.goal?`I've been thinking about this: ${crewMeta59(id).goal}`:null),0)
}
function createCrewScene72(type='banter'){
  let ids=(S.crew||[]).filter(id=>CREW.some(c=>c.id===id));
  if(ids.length<2)return;
  let a=ids[0],b=ids[1],ma=crewMeta59(a),mb=crewMeta59(b),bond=bond59(a,b),line='';
  if(type==='conference')line=`${crewDisplayName59(a)} and ${crewDisplayName59(b)} spread route notes across the crew table. ${bond>=2?'They anticipate each other easily now.':'They are still learning how the other thinks.'}`;
  else line=`${crewDisplayName59(a)} brings up ${ma.goal.toLowerCase()}. ${crewDisplayName59(b)} answers from the perspective of ${mb.motivation.toLowerCase()}, turning a routine pause into a real conversation.`;
  S.visual72.lastScene=line;S.visual72.lastCast=[a,b]
}
const _p72Banter=crewBanter59;
crewBanter59=function(){let before=ensureCrewLife59StateBase().log?.[0]||'';let r=_p72Banter();createCrewScene72('banter');if(!S.visual72.lastScene&&ensureCrewLife59StateBase().log?.[0]!==before)S.visual72.lastScene=ensureCrewLife59StateBase().log[0];renderCompanionVisual72();return r};
const _p72Conference=crewConference59;
crewConference59=function(){let r=_p72Conference();createCrewScene72('conference');renderCompanionVisual72();return r};
function renderCrewScene72(){
  let box=$('crewScene72');if(!box)return;let cast=S.visual72.lastCast||[];
  if(!S.visual72.lastScene){box.innerHTML='<div class="small">Trigger Banter or hold a Crew Conference to create a visual shipboard scene.</div>';return}
  box.innerHTML=`<div class="row"><b>Latest Shipboard Scene</b><span class="tag">VISUAL</span></div><div class="crew-scene-cast72" style="margin-top:7px">${cast.map(id=>`<canvas width="64" height="64" data-scene-portrait72="${id}"></canvas>`).join('')}<div class="small">${pxEsc67(S.visual72.lastScene)}</div></div>`;
  box.querySelectorAll('[data-scene-portrait72]').forEach(cv=>{let c=CREW.find(x=>x.id===cv.dataset.scenePortrait72);drawPortrait69(cv,{id:c.id,name:c.name,role:c.role,crewId:c.id,accent:'#587b9a'},'pleased')})
}
function renderCompanionVisual72(){
  if(!$('crewmgmt'))return;ensurePhase72State();
  if(!$('crewVisual72')){
    let d=document.createElement('div');d.id='crewVisual72';d.className='crew-visual72';
    d.innerHTML=`<div class="row"><div><b>Visual Party & Companion Deck</b><div class="small">Choose the field party, see morale/approval at a glance, inspect companion equipment, and jump directly into shipboard conversations.</div></div><span class="tag">PHASE 72</span></div><div id="partyStrip72" class="party-strip72"></div><div id="companionGrid72" class="companion-grid72"></div><div id="crewScene72" class="crew-scene72"></div>`;
    let source=$('crewmgmt').querySelector('.source-note');source?.insertAdjacentElement('afterend',d)
  }
  let party=[{id:'pc',name:S.name||'Player',role:`${S.career||'Adventurer'} · ${S.spec||''}`,pc:true},...(S.crew||[]).map(id=>CREW.find(c=>c.id===id)).filter(Boolean)];
  $('partyStrip72').innerHTML=[0,1,2].map(i=>{let c=party[i];if(!c)return`<div class="party-slot72"><div class="party-portrait72" style="display:grid;place-items:center;color:#697b8b">EMPTY</div><div><b>Party Slot ${i}</b><div class="tiny">Select a companion below.</div></div></div>`;return`<div class="party-slot72 active72"><canvas class="party-portrait72" width="64" height="64" data-party-portrait72="${c.id}"></canvas><div><b>${pxEsc67(c.name)}</b><div class="tiny">${pxEsc67(c.role||'Crew')}</div><div class="small">${c.pc?'Player character':companionStateText72(c)}</div></div></div>`}).join('');
  $('partyStrip72').querySelectorAll('[data-party-portrait72]').forEach(cv=>{let id=cv.dataset.partyPortrait72,c=id==='pc'?{id:'pc',name:S.name,role:'Player',species:S.species,accent:'#d2ad51'}:CREW.find(x=>x.id===id);drawPortrait69(cv,{...c,crewId:id==='pc'?null:id},'neutral')});
  let crew=companionVisualList72();
  $('companionGrid72').innerHTML=crew.map(c=>{let active=S.crew.includes(c.id),m=crewLifeRecord59(c.id),ap=S.approval?.[c.id]||0,meta=crewMeta59(c.id),wid=currentCrewWeaponId(c.id),aid=currentCrewArmorId(c.id),q=m.request;return`<div class="companion-card72 ${active?'active72':''}" data-companion-card72="${c.id}"><div class="companion-head72"><canvas class="party-portrait72" width="64" height="64" data-companion-portrait72="${c.id}"></canvas><div><div class="row"><div><b>${pxEsc67(c.name)}</b><div class="tiny">${pxEsc67(c.role||CUSTOM_CREW_ARCHETYPES[c.archetype]?.name||'Crew')}</div></div><span class="status60">${active?'ACTIVE':'RESERVE'}</span></div><div class="tiny" style="margin-top:3px">${pxEsc67(crewVisualLocation72(c.id))} · ${pxEsc67(meta.personality)} · ${pxEsc67(meta.motivation)}</div>${loyaltyPips72(c)}<div class="tiny">Approval ${ap}</div></div></div><div class="crew-meter72 crew-approval72"><span style="width:${Math.max(0,Math.min(100,50+ap*2))}%"></span></div><div class="tiny">Relationship · ${pxEsc67(approvalTier(ap).label)}</div><div class="crew-meter72 crew-morale72"><span style="width:${m.morale}%"></span></div><div class="tiny">Morale ${m.morale} · ${pxEsc67(crewMoraleTier59(m.morale))}${m.injury?' · '+pxEsc67(m.injury.name):''}</div><div class="companion-gear72"><div class="companion-gear-chip72"><canvas width="30" height="30" data-comp-gear72="${wid}"></canvas><span>${pxEsc67(WEAPONS[wid]?.name||'Weapon')}</span></div><div class="companion-gear-chip72"><canvas width="30" height="30" data-comp-gear72="${aid}"></canvas><span>${pxEsc67(ARMOR[aid]?.name||'Armor')}</span></div></div><div class="small" style="margin-top:7px"><b>Goal:</b> ${pxEsc67(meta.goal)}</div>${q?`<div class="tiny" style="margin-top:5px">${pxEsc67(q.title)} · ${pxEsc67(q.status)}</div>`:''}<div class="companion-actions72"><button class="btn ${active?'good':'primary'}" data-party-toggle72="${c.id}">${active?'Reserve':'Add to Party'}</button><button class="btn" data-comp-talk72="${c.id}">Talk on Ship</button><button class="btn" data-comp-goal72="${c.id}">${q?'View Goal':'Ask About Goal'}</button></div></div>`}).join('');
  $('companionGrid72').querySelectorAll('[data-companion-portrait72]').forEach(cv=>{let c=CREW.find(x=>x.id===cv.dataset.companionPortrait72);drawPortrait69(cv,{...c,crewId:c.id},S.approval?.[c.id]>=10?'pleased':'neutral')});
  $('companionGrid72').querySelectorAll('[data-comp-gear72]').forEach(cv=>drawItemIcon71(cv,ITEMS[cv.dataset.compGear72],30));
  $('companionGrid72').querySelectorAll('[data-party-toggle72]').forEach(b=>b.onclick=()=>visualSelectCompanion72(b.dataset.partyToggle72));
  $('companionGrid72').querySelectorAll('[data-comp-talk72]').forEach(b=>b.onclick=()=>openCompanionDialogue72(b.dataset.compTalk72));
  $('companionGrid72').querySelectorAll('[data-comp-goal72]').forEach(b=>b.onclick=()=>{let id=b.dataset.compGoal72,m=crewLifeRecord59(id);if(!m.request)offerCrewRequest59(id);renderCrewLife59();renderCompanionVisual72()});
  renderCrewScene72()
}

/* Render hooks. */
const _p72RenderEquipment=renderEquipment;
renderEquipment=function(){let r=_p72RenderEquipment();renderVisualEquipment71();return r};
const _p72RenderCrewManagement=renderCrewManagement;
renderCrewManagement=function(){let r=_p72RenderCrewManagement();renderCompanionVisual72();return r};

function injectPhase72Guide(){
  if(!$('guide')||$('phase72Guide'))return;let c=document.createElement('section');c.id='phase72Guide';c.className='card';c.style.marginTop='14px';
  c.innerHTML=`<div class="row"><div><b>v1.3 · Gear & Companion Art Pass</b><div class="small">Phases 71–72 move loadouts and party management into the same retro visual language as exploration, dialogue, and combat.</div></div><span class="tag">PHASE 71–72</span></div><div class="grid g2" style="margin-top:9px"><div class="item"><b>Phase 71 · Gear & Inventory Art</b><div class="small">Procedural original item icons, player paper-doll, visual inventory cards, equipment comparison, market icons, loot feedback, and equipment silhouettes on world sprites.</div></div><div class="item"><b>Phase 72 · Companion Visual System</b><div class="small">Visual three-character party strip, portrait roster, morale/approval/loyalty readouts, gear previews, party swapping, shipboard conversation jumps, and visual banter/conference scenes.</div></div></div>`;
  let old=$('phase70Guide');(old||$('guide')).insertAdjacentElement('afterend',c)
}

/* Save / schema / diagnostics */
const _p72Serializable=serializableState;
serializableState=function(){let x=_p72Serializable();x.schemaVersion=72;S.schemaVersion=72;return x};
const _p72RenderAll=renderAll;
renderAll=function(){ensurePhase72State();let r=_p72RenderAll();S.schemaVersion=72;injectPhase72Guide();if(!$('equipment')?.classList.contains('hidden'))renderVisualEquipment71();if(!$('crewmgmt')?.classList.contains('hidden'))renderCompanionVisual72();return r};
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Phase 72: visual equipment state, party presentation, companion scenes, and prior RPG systems. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};

RULE_AUDIT.unshift(
 {id:'gearArt71',name:'Phase 71 gear & inventory art',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'Item icons, paper-doll art, comparison presentation, loot animation, and world-sprite equipment silhouettes are original visual abstractions. Item statistics and source labels continue to come from the existing rules/content database.'},
 {id:'companionVisual72',name:'Phase 72 companion visual system',status:'adapted',source:'Original Sable Reach videogame presentation layer',detail:'Party-strip presentation, portrait roster, visual morale/approval displays, shipboard scene presentation, and party swapping UI are original videogame systems layered over existing companion mechanics.'}
);

const _p72Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p72Diag().filter(x=>!['Phase 70 save schema'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase72State();renderVisualEquipment71();renderCompanionVisual72();injectPhase72Guide();
  add('Phase 71 item icon renderer',typeof drawItemIcon71==='function'&&!!$('visualInventory71'),'procedural pixel icons + visual inventory');
  add('Phase 71 paper-doll loadout',!!$('paperdoll71')&&typeof drawPaperdoll71==='function','weapon and armor reflected visually');
  add('Phase 71 equipment comparison',!!$('gearInspector71')&&typeof renderGearInspector71==='function','selected item vs currently equipped item');
  add('Phase 72 visual party strip',!!$('partyStrip72')&&$('partyStrip72').children.length===3,'player + two companion slots');
  add('Phase 72 companion roster',!!$('companionGrid72')&&document.querySelectorAll('[data-companion-portrait72]').length===companionVisualList72().length,'portrait cards for built-in and custom crew');
  add('Phase 72 visual shipboard scenes',!!$('crewScene72')&&typeof createCrewScene72==='function','banter/conference scene presentation');
  add('Phase 72 save schema',BUILD_INFO.saveSchema===72&&S.schemaVersion===72&&serializableState().schemaVersion===72,'schema 72');
  return rows
};
const _p72Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p72Smoke();
  report.failed=report.failed.filter(x=>!x.startsWith('Phase 70 schema target:'));
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase72State();renderVisualEquipment71();renderCompanionVisual72();
  test('Phase 71 visual inventory exists',()=>!!$('visualInventory71')&&document.querySelectorAll('[data-item-icon71]').length>0);
  test('Phase 71 paper-doll canvas exists',()=>!!$('paperdoll71')&&$('paperdoll71').width===128&&$('paperdoll71').height===160);
  test('Phase 71 equipment inspector exists',()=>!!$('gearInspector71'));
  test('Phase 72 visual party has three slots',()=>$('partyStrip72').children.length===3);
  test('Phase 72 companion portraits cover roster',()=>document.querySelectorAll('[data-companion-portrait72]').length===companionVisualList72().length);
  test('Phase 72 party swap function exists',()=>typeof visualSelectCompanion72==='function');
  test('Phase 72 shipboard visual scene exists',()=>!!$('crewScene72'));
  test('Phase 72 schema target',()=>BUILD_INFO.saveSchema===72&&serializableState().schemaVersion===72);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

ensurePhase72State();injectPhase72Guide();
document.title='Star Wars: Sable Reach — Phase 72 Gear & Companions';
let topTitle72=document.querySelector('.top h1');if(topTitle72)topTitle72.textContent='STAR WARS: SABLE REACH · v1.3 RETRO RPG';
let topP72=document.querySelector('.top p');if(topP72)topP72.textContent='Retro Star Wars RPG build: pixel exploration, portraits, visual gear, companion party management, narrative-dice combat, ships, quests, organizations, and a living galaxy.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,gear:()=>S.visual71,companions:()=>S.visual72};
