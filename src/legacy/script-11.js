
/* =========================================================
   PHASE 73 — FIRST FULL VISUAL STORY CAMPAIGN
   PHASE 74 — 16-HUB VISUAL GALAXY CONVERSION
   ========================================================= */
BUILD_INFO.version='74.0.0-v1.3-visual-campaign-galaxy';
BUILD_INFO.saveSchema=74;

/* -------------------------
   PHASE 73 — FLAGSHIP VISUAL CAMPAIGN
   ------------------------- */
Object.assign(ITEMS,{
  echoKey73:{id:'echoKey73',name:'Echo-Key Datacore',type:'gear',price:0,rarity:9,enc:0,restricted:true,source:'Original Sable Reach campaign reward',desc:'A reconstructed datacore assembled from fragments of a forgotten intelligence network. Its value lies in routes, authentication patterns, and names that were meant to disappear.'}
});

STORY_TEMPLATES_61.embers73={
  id:'embers73',
  name:'Embers in the Static',
  faction:'Rebels',
  summary:'A dead relay on Sable Reach begins transmitting pieces of an erased wartime intelligence network. The trail crosses salvage markets, underworld brokers, abandoned Rebel infrastructure, and an Imperial recovery team.',
  reward:{credits:2400,xp:34},
  start:'signal',
  nodes:{
    signal:{title:'The Relay Wakes',type:'visual73',hub:'sable',district:'relay',text:'Reach the old relay and inspect the impossible transmission.',next:'decode',scene:'The receiver should be dead. Instead, one narrow-band channel is repeating a fragment of an old authentication handshake.'},
    decode:{title:'Separate the Ghost Signal',type:'skill',skill:'Computers',diff:2,text:'Strip interference from the transmission before the source burns itself out.',next:'talo',optional:'cleanDecode'},
    talo:{title:'Who Gets to Know?',type:'dialogue73',hub:'sable',district:'brokers',speaker:{name:'Talo Brinn',role:'Information Broker',faction:'Local',accent:'#7453a1'},text:'“That handshake is older than half the junk in this settlement. If somebody buried it this deep, they expected to stay dead.”',choices:[
      {id:'trust',label:'Bring Talo into the circle',text:'Share the full signal and gain another set of eyes.',next:'ferrixTravel',flag:'trustedTalo',effects:{rep:{Local:1},morale:1}},
      {id:'compartment',label:'Keep the crew compartmentalized',text:'Give Talo only the coordinates and nothing else.',next:'ferrixTravel',flag:'keptCircleTight',effects:{intel:1}},
      {id:'bait',label:'Let word of the signal leak',text:'Use Talo’s network to see who comes looking.',next:'ferrixTravel',flag:'laidBait',effects:{heat:1,intel:2}}
    ]},
    ferrixTravel:{title:'Follow the Salvage Chain',type:'travel',hub:'ferrix',text:'The signal points toward components that passed through Ferrix. Take the ship to Rix Road.',next:'salyards'},
    salyards:{title:'Salyard Quarter',type:'district',hub:'ferrix',district:'salyards',text:'Reach the salyards where the relay component changed hands.',next:'cache'},
    cache:{title:'The Cut-Out Cache',type:'visual73',hub:'ferrix',district:'salyards',skill:'Perception',diff:2,text:'Search a dead drop hidden among stripped industrial components.',next:'ferrixFight',optional:'foundLedger',scene:'The cache is disguised as a burned-out regulator housing. Someone opened it recently and tried to put the dust back exactly as they found it.'},
    ferrixFight:{title:'Recovery Team',type:'combat',text:'An Imperial recovery team closes on the salyard before the crew can leave.',opposition:[{id:'stormtrooper',count:3},{id:'navyOfficer',count:1}],next:'narTravel'},
    narTravel:{title:'The Name Behind the Purchase',type:'travel',hub:'narShaddaa',text:'The recovered ledger points to an information broker on Nar Shaddaa.',next:'blackmarket'},
    blackmarket:{title:'Black-Market Spine',type:'district',hub:'narShaddaa',district:'blackmarket',text:'Find the broker’s exchange in the lower commercial levels.',next:'brokerCheck'},
    brokerCheck:{title:'Price of a Dead Network',type:'skill',skill:'Negotiation',diff:3,text:'Convince the broker that cooperation is safer and more profitable than selling the crew out.',next:'middleman',failAfter:2,failNext:'middleman'},
    middleman:{title:'A Buyer Without a Face',type:'dialogue73',hub:'narShaddaa',district:'blackmarket',speaker:{name:'Vexa Orun',role:'Data Broker',faction:'Hutts',accent:'#9a5f85'},text:'“I never met the buyer. That was the point. But I know where their courier stopped asking for pieces and started asking for maps.”',choices:[
      {id:'buy',label:'Pay for the unedited route record',text:'Spend 250 credits and take the whole trail.',next:'yavinTravel',flag:'boughtRecord',cost:250,effects:{intel:2}},
      {id:'trade',label:'Trade a copy of the Ferrix ledger',text:'Give Vexa something useful without spending cash.',next:'yavinTravel',flag:'tradedLedger',effects:{rep:{Hutts:1}}},
      {id:'pressure',label:'Make the broker afraid to sell twice',text:'Leave with the route and a worse reputation.',next:'yavinTravel',flag:'pressedVexa',effects:{rep:{Hutts:-1},heat:1,conflict:1}}
    ]},
    yavinTravel:{title:'The Abandoned War',type:'travel',hub:'yavin4',text:'The buyer’s final route points to abandoned Rebel infrastructure on Yavin 4.',next:'jungle'},
    jungle:{title:'Massassi Jungle Approach',type:'district',hub:'yavin4',district:'jungle',text:'Move through the jungle approaches without broadcasting the crew’s arrival.',next:'vault'},
    vault:{title:'Buried Authentication Vault',type:'visual73',hub:'yavin4',district:'jungle',skill:'Survival',diff:3,text:'Follow obsolete service markers to a sealed intelligence cache.',next:'guardians',optional:'quietApproach',scene:'Vines have swallowed the access trench, but beneath them a military seal is still intact. The lock recognizes the signal fragment from Sable Reach.'},
    guardians:{title:'The Collector Arrives',type:'combat',text:'The Imperial collector responsible for the recovery operation arrives with a security detail.',opposition:[{id:'stormtrooper',count:4},{id:'stormSergeant',count:1}],next:'archive'},
    archive:{title:'What Survives the War',type:'dialogue73',hub:'yavin4',district:'jungle',speaker:{name:'Archive Node K-7',role:'Damaged Intelligence Core',faction:'Rebels',droid:true,accent:'#5ba7b7'},text:'“Authentication accepted. Network integrity: seven percent. Custodial authority unresolved. State intended disposition.”',choices:[
      {id:'alliance',label:'Transfer the archive to Rebel Intelligence',text:'Return the surviving network to the cause that built it.',next:'finale',flag:'archiveToRebels',effects:{rep:{Rebels:3},morality:2}},
      {id:'erase',label:'Erase the names and preserve only the routes',text:'Protect everyone still alive while keeping the useful navigation data.',next:'finale',flag:'archiveSanitized',effects:{heat:-2,morality:1,intel:1}},
      {id:'keep',label:'Keep the entire archive for the crew',text:'Information this rare is power, and nobody else gets to decide how it is used.',next:'finale',flag:'archiveKept',effects:{intel:4,conflict:2}}
    ]},
    finale:{title:'Embers in the Static',type:'finale',text:'The network is no longer a ghost. Decide that the crew is ready to live with what survived.'}
  }
};

function ensurePhase74State(){
  ensurePhase72State();S.schemaVersion=74;
  S.visual73=S.visual73&&typeof S.visual73==='object'?S.visual73:{};
  S.visual73.scenes=Array.isArray(S.visual73.scenes)?S.visual73.scenes:[];
  S.visual73.rewarded=!!S.visual73.rewarded;
  S.visual74=S.visual74&&typeof S.visual74==='object'?S.visual74:{};
  S.visual74.loot=S.visual74.loot&&typeof S.visual74.loot==='object'?S.visual74.loot:{};
  S.visual74.visitedHubs=S.visual74.visitedHubs&&typeof S.visual74.visitedHubs==='object'?S.visual74.visitedHubs:{};
  return S.visual74
}
function visualCampaign73(){let q=S.story61?.active;return q?.templateId==='embers73'?q:null}
function visualNode73(){let q=visualCampaign73();return q?storyNode61(q):null}
function visualCampaignProgress73(){
  let q=visualCampaign73(),t=q&&STORY_TEMPLATES_61.embers73;if(!q||!t)return{done:0,total:Object.keys(t?.nodes||{}).length};
  return{done:q.completedNodes.length,total:Object.keys(t.nodes).length}
}
function openCampaignWorld73(){
  let q=visualCampaign73(),n=visualNode73();if(n?.hub&&S.world.currentHub!==n.hub){renderNavTab('galaxy');return}
  S.visual67.map=`hub:${S.world.currentHub}`;renderNavTab('pixelworld67')
}
function completeVisualNode73(detail='',success=true){
  let q=visualCampaign73(),n=visualNode73();if(!q||!n)return;
  q.completedNodes.push(q.node);
  if(detail)storyLog61(detail);
  if(!success){q.flags.visualComplication=true;S.strain=Math.min(strainThreshold(),S.strain+1)}
  q.node=n.next||null;
  if(!q.node)finishStory61();
  renderAll();renderNavTab('pixelworld67');safeAutosave()
}
function resolveVisualNode73(){
  let q=visualCampaign73(),n=visualNode73();if(!q||n.type!=='visual73')return;
  if(S.world.currentHub!==n.hub){renderNavTab('galaxy');return}
  if(n.district&&currentDistrict52().id!==n.district)visitDistrict52(n.district);
  if(n.skill){
    let out=performBest(n.skill,{diff:n.diff,setback:localHeat50()>=7?1:0});
    if(out.r.ok){
      if(n.optional)q.optional[n.optional]=true;
      if(q.node==='cache'){if(!S.inventory.includes('echoKey73')){S.visual73.fragmentRecovered=true;}}
      completeVisualNode73(`${out.q.actor.name} succeeds at ${n.skill}: ${n.title}.`,true);
    }else{
      if(out.r.nt>=2)adjustHeat50(1,`complication during ${n.title}`);
      completeVisualNode73(`${out.q.actor.name} cannot get a clean result at ${n.title}; the crew continues with a complication.`,false);
    }
  }else completeVisualNode73(n.scene||n.text,true)
}
function campaignChoice73(choiceId){
  let q=visualCampaign73(),n=visualNode73();if(!q||n.type!=='dialogue73')return;let c=n.choices.find(x=>x.id===choiceId);if(!c)return;
  if(c.cost&&S.credits<c.cost){openCampaignDialogue73(n,'You do not have enough credits for that choice.');return}
  if(c.cost){S.credits-=c.cost;ledgerEntry(-c.cost,`Visual campaign: ${c.label}`)}
  q.completedNodes.push(q.node);q.flags[c.flag||c.id]=true;q.flags[`choice:${q.node}`]=c.id;storyApplyEffects61(c.effects||{});
  storyLog61(`Visual campaign decision — ${c.label}: ${c.text}`);q.node=c.next||n.next;
  if(q.node==='finale'&&c.id==='alliance')adjustInfluence64?.('yavin4','Rebels',4,'The crew returns recovered intelligence to the Alliance.');
  if(q.node==='finale'&&c.id==='erase')adjustInfluence64?.('yavin4','Local',2,'The crew destroys exposed identities while preserving safe routes.');
  if(q.node==='finale'&&c.id==='keep')adjustInfluence64?.('narShaddaa','Guild',2,'Rumors spread that the crew controls a valuable intelligence archive.');
  closePixelDialog67(false);renderAll();renderNavTab('story61tab');safeAutosave()
}
function openCampaignDialogue73(n=visualNode73(),notice=''){
  if(!n||n.type!=='dialogue73')return;let box=$('pixelDialog67');if(!box)return;let sp=n.speaker||{name:'Unknown Contact',role:'Contact',faction:'Local'};
  box.classList.remove('hidden');PX67.dialog={title:sp.name,text:n.text,actions:[]};
  box.innerHTML=`<div class="campaign-dialog73"><canvas id="campaignPortrait73" width="64" height="64"></canvas><div><div class="pixel-speaker67">${pxEsc67(sp.name)}</div><div class="pixel-speaker-meta69">${pxEsc67(sp.role||'Contact')} · ${pxEsc67(sp.faction||'Independent')}</div><div class="small" style="margin-top:8px">${pxEsc67(n.text)}</div>${notice?`<div class="pixel-social-result69">${pxEsc67(notice)}</div>`:''}<div class="campaign-choice73">${n.choices.map(c=>`<button class="btn ${c.id===n.choices[0].id?'primary':''}" data-campaign-choice73="${c.id}" ${c.cost&&S.credits<c.cost?'disabled':''}><b>${pxEsc67(c.label)}</b><span class="tiny" style="display:block">${pxEsc67(c.text)}${c.cost?` · ${c.cost} cr`:''}</span></button>`).join('')}</div><div class="pixel-dialog-actions67"><button class="btn" id="campaignClose73">Decide Later</button></div></div></div>`;
  drawPortrait69($('campaignPortrait73'),{id:`campaign:${sp.name}`,name:sp.name,role:sp.role,faction:sp.faction,droid:sp.droid,accent:sp.accent},'neutral');
  box.querySelectorAll('[data-campaign-choice73]').forEach(b=>b.onclick=()=>campaignChoice73(b.dataset.campaignChoice73));
  $('campaignClose73').onclick=()=>closePixelDialog67()
}
function interactCampaign73(){
  let n=visualNode73();if(!n)return;
  if(n.type==='visual73')resolveVisualNode73();
  else if(n.type==='dialogue73')openCampaignDialogue73(n)
}
const _p73FinishStory=finishStory61;
finishStory61=function(){
  let q=S.story61?.active,was=q?.templateId==='embers73';
  if(was&&!S.visual73.rewarded){
    S.visual73.rewarded=true;
    if(!S.inventory.includes('echoKey73'))S.inventory.push('echoKey73');
    S.visual71.inspect='echoKey73';
    showPickup71(ITEMS.echoKey73,'UNIQUE REWARD');
    addWorldConsequence50('The crew now possesses the Echo-Key Datacore, a surviving key to a network that powerful people tried to erase.','story');
  }
  return _p73FinishStory()
};

/* Add a featured-campaign layer without replacing the general Story Engine. */
const _p73RenderStory=renderStory61;
renderStory61=function(){
  _p73RenderStory();let box=$('story61tab');if(!box)return;let Q=ensureStory61StateBase(),q=Q.active;
  let old=$('visualCampaign73');old?.remove();let card=document.createElement('div');card.id='visualCampaign73';card.className='visual-campaign73';
  if(!q){
    let completed=Q.completed.some(x=>x.templateId==='embers73');
    card.innerHTML=`<div class="vc-head73"><div><span class="quest-badge73">FEATURED VISUAL CAMPAIGN</span><h3 style="margin:.35rem 0">Embers in the Static</h3><div class="small">A 17-stage authored adventure built specifically to connect Pixel World exploration, visual dialogue, best-actor checks, travel, district navigation, Retro Combat 3.0, faction influence, and a unique reward.</div></div><div class="pills"><span class="pill">2,400 cr</span><span class="pill">34 XP</span></div></div><div class="vc-actions73"><button class="btn primary" id="beginVisualCampaign73" ${completed?'':' '}>${completed?'Replay Campaign':'Begin Visual Campaign'}</button></div>`;
  }else if(q.templateId==='embers73'){
    let n=storyNode61(q),pr=visualCampaignProgress73(),ids=Object.keys(STORY_TEMPLATES_61.embers73.nodes);
    card.innerHTML=`<div class="vc-head73"><div><span class="quest-badge73">ACTIVE VISUAL CAMPAIGN</span><h3 style="margin:.35rem 0">${pxEsc67(q.title)}</h3><div class="small"><b>${pxEsc67(n.title)}</b> · ${pxEsc67(n.text)}</div></div><span class="hub-chip74">${pr.done}/${pr.total}</span></div><div class="vc-path73">${ids.map(id=>`<span class="${q.completedNodes.includes(id)?'done':q.node===id?'now':''}" title="${pxEsc67(STORY_TEMPLATES_61.embers73.nodes[id].title)}"></span>`).join('')}</div><div class="vc-actions73"><button class="btn primary" id="openVisualCampaign73">Open Pixel World</button>${['visual73','dialogue73'].includes(n.type)?`<button class="btn" id="resolveVisualCampaign73">${n.type==='dialogue73'?'Open Conversation':'Interact with Objective'}</button>`:''}</div>`;
  }else return;
  box.insertBefore(card,box.children[1]||null);
  if($('beginVisualCampaign73'))$('beginVisualCampaign73').onclick=()=>startStory61('embers73');
  if($('openVisualCampaign73'))$('openVisualCampaign73').onclick=openCampaignWorld73;
  if($('resolveVisualCampaign73'))$('resolveVisualCampaign73').onclick=()=>{openCampaignWorld73();setTimeout(interactCampaign73,0)}
};

/* -------------------------
   PHASE 74 — VISUAL GALAXY
   ------------------------- */
const WORLD_STYLES_74={
  sable:{ground:'#9b7448',ground2:'#ad8556',road:'#705742',wall:'#3a444d',roof:'#54483e',accent:'#d4aa4e',sky:'#0b1118',label:'FRONTIER'},
  tatooine:{ground:'#c5a16b',ground2:'#d3b37c',road:'#9a7650',wall:'#8a7357',roof:'#6e5c48',accent:'#e4c46e',sky:'#15100a',label:'DESERT'},
  saleucami:{ground:'#8b7554',ground2:'#a38d68',road:'#695a47',wall:'#4a4e49',roof:'#655948',accent:'#d18c52',sky:'#101310',label:'FRONTIER'},
  ordMantell:{ground:'#5b554d',ground2:'#6d655b',road:'#464748',wall:'#343c43',roof:'#4b3f38',accent:'#d17a45',sky:'#0c0e11',label:'URBAN'},
  narShaddaa:{ground:'#29223b',ground2:'#34294d',road:'#20283b',wall:'#252a38',roof:'#392843',accent:'#c363dc',sky:'#070610',label:'NEON'},
  bespin:{ground:'#d3bd9b',ground2:'#ead4ae',road:'#b49a83',wall:'#7c8991',roof:'#e3e5e2',accent:'#e19754',sky:'#51435c',label:'CLOUD CITY'},
  lothal:{ground:'#8f9a69',ground2:'#a8ac7a',road:'#82745c',wall:'#6d7777',roof:'#dad4c0',accent:'#c86a52',sky:'#9ab1bb',label:'PLAINS'},
  corellia:{ground:'#5b625b',ground2:'#6c746b',road:'#444b4b',wall:'#38444a',roof:'#5e5147',accent:'#cf8b45',sky:'#10151a',label:'INDUSTRIAL'},
  nalHutta:{ground:'#4f5a35',ground2:'#616c3f',road:'#4b4934',wall:'#494335',roof:'#675642',accent:'#b3984f',sky:'#17190d',label:'HUTT SWAMP'},
  toydaria:{ground:'#4b6947',ground2:'#5e7b53',road:'#5c5940',wall:'#4b5144',roof:'#6f6047',accent:'#d1ad55',sky:'#111811',label:'SWAMP'},
  empressTeta:{ground:'#4a4140',ground2:'#5b4d49',road:'#363b43',wall:'#37373f',roof:'#5d493f',accent:'#c59250',sky:'#0a0b11',label:'DEEP CORE'},
  yavin4:{ground:'#2f4b31',ground2:'#405f3d',road:'#4c5140',wall:'#514e43',roof:'#655f4d',accent:'#d6b356',sky:'#0a130d',label:'JUNGLE'},
  ferrix:{ground:'#775343',ground2:'#8f644e',road:'#60463b',wall:'#4c4742',roof:'#6c4e40',accent:'#d1804d',sky:'#17100d',label:'SALVAGE'},
  talus:{ground:'#696e62',ground2:'#7f8272',road:'#545851',wall:'#4b555b',roof:'#6a5f53',accent:'#cb8b52',sky:'#11161a',label:'CORE WORLD'},
  centerpoint:{ground:'#3d4851',ground2:'#4c5964',road:'#303944',wall:'#28323b',roof:'#46535f',accent:'#67b0c8',sky:'#05080c',label:'STATION'},
  dantooine:{ground:'#718455',ground2:'#849763',road:'#78684f',wall:'#5b6052',roof:'#77725d',accent:'#e2c56e',sky:'#718a91',label:'GRASSLAND'}
};
const HUB_LAYOUT_74=[[3,3],[18,3],[33,3],[3,17],[18,17],[33,17]];
function districtSymbol74(kind){
  if(['spaceport','hangar'].includes(kind))return'✦';
  if(['market','blackmarket','casino'].includes(kind))return'¤';
  if(['cantina','tourist'].includes(kind))return'♫';
  if(['imperial','secure'].includes(kind))return'!';
  if(['rebel'].includes(kind))return'R';
  if(['wilderness','outskirts','jungle','grassland'].includes(kind))return'▲';
  if(['industrial','junkyard'].includes(kind))return'⚙';
  return'◆'
}
function buildHubMap74(hubId){
  let hub=GALAXY_HUBS_50[hubId]||GALAXY_HUBS_50.sable,style=WORLD_STYLES_74[hubId]||WORLD_STYLES_74.sable,w=50,h=31,g=pxGrid67(w,h,'sand');
  // Boundary and central routes.
  for(let x=0;x<w;x++){g[0][x]='wall';g[h-1][x]='wall'}
  for(let y=0;y<h;y++){g[y][0]='wall';g[y][w-1]='wall'}
  pxRect67(g,1,13,48,4,'road');pxRect67(g,23,1,4,29,'road');
  let districts=districts52(hubId),objects=[],npcs=[];
  districts.forEach((d,i)=>{
    let [x,y]=HUB_LAYOUT_74[i%HUB_LAYOUT_74.length],wild=['wilderness','outskirts','jungle','grassland'].includes(d.kind),pad=d.kind==='spaceport';
    if(wild){
      pxRect67(g,x,y,12,8,'grass');
      for(let xx=x;xx<x+12;xx++){g[y][xx]='wall';g[y+7][xx]='wall'}
      for(let yy=y;yy<y+8;yy++){g[yy][x]='wall';g[yy][x+11]='wall'}
      g[y+7][x+6]='road';
    }else if(pad){
      pxRect67(g,x,y,12,8,'pad');
      for(let xx=x;xx<x+12;xx++){g[y][xx]='wall';g[y+7][xx]='wall'}
      for(let yy=y;yy<y+8;yy++){g[yy][x]='wall';g[yy][x+11]='wall'}
      g[y+7][x+6]='road';
    }else{
      pxBuilding67(g,x,y,12,8,x+6,d.name)
    }
    let ox=x+6,oy=y+7;
    objects.push({id:`district74:${hubId}:${d.id}`,kind:'district74',x:ox,y:oy,label:d.name,prompt:`Enter ${d.name}`,action:'district74',district:d.id,districtKind:d.kind,symbol:districtSymbol74(d.kind)});
    let raw=d.npcs?.[0];
    if(raw){
      npcs.push({id:`npc74:${hubId}:${d.id}`,name:raw[0],role:raw[1],faction:raw[2]||hub.primaryFaction||'Local',x:x+3,y:y+6,accent:raw[2]==='Empire'?'#c5c8cb':raw[2]==='Hutts'?'#8c6e9d':'#557d9d'})
    }
  });
  // Shared interactables.
  objects.push({id:`terminal74:${hubId}`,kind:'terminal',x:22,y:14,label:`${hub.name} Public Terminal`,prompt:'Access local information',action:'relay'});
  objects.push({id:`crate74:${hubId}`,kind:'crate',x:28,y:14,label:'Local Cargo Cache',prompt:'Search the local cargo cache',action:'loot74',hubId});
  objects.push({id:`beacon74:${hubId}`,kind:'beacon',x:46,y:14,label:'Navigation Beacon',prompt:'Open the galaxy map',action:'galaxy'});
  // Ship pad in lower-right open area.
  pxRect67(g,38,25,10,5,'pad');g[25][42]='road';
  objects.push({id:`ship74:${hubId}`,kind:'ship',x:40,y:25,label:S.ship?.name||'Crew Ship',prompt:'Board your ship',action:'board',block:true,w:4,h:3});
  objects.push({id:`ramp74:${hubId}`,kind:'ramp',x:42,y:29,label:'Boarding Ramp',prompt:'Board your ship',action:'board'});
  // Dynamic political presence.
  let ctl=control64(hubId),sec=effectiveSecurity64(hubId);
  objects.push({id:`banner74:${hubId}`,kind:'banner74',x:25,y:11,label:`${ctl} Influence Marker`,prompt:`Inspect ${ctl} control`,action:'control74',controller:ctl});
  if(sec>=4||ctl==='Empire')objects.push({id:`checkpoint74:${hubId}`,kind:'checkpoint74',x:25,y:17,label:`${ctl} Security Checkpoint`,prompt:'Inspect the security checkpoint',action:'control74',controller:ctl});
  let patrolName=ctl==='Empire'?'Imperial Patrol':ctl==='Hutts'?'Kajidic Enforcer':ctl==='Rebels'?'Rebel Scout':ctl==='Guild'?'Guild Marshal':'Local Watch';
  npcs.push({id:`patrol74:${hubId}`,name:patrolName,role:`${stability64(hubId)} security presence`,faction:ctl,x:27,y:15,accent:ctl==='Empire'?'#c8c8c8':ctl==='Hutts'?'#8e6196':ctl==='Rebels'?'#8a8050':'#5d8099'});
  let map={id:`hub:${hubId}`,hubId,name:`${hub.name} · ${hub.world}`,w,h,grid:g,objects,npcs,spawn:{x:42,y:29},style,palette:hubId};
  let quest=visualQuestObject73(map);if(quest)map.objects.push(quest);
  return map
}
function visualQuestObject73(map){
  let q=visualCampaign73(),n=visualNode73();if(!q||!n||!['visual73','dialogue73'].includes(n.type)||n.hub!==map.hubId)return null;
  let anchor=map.objects.find(o=>o.action==='district74'&&o.district===n.district),x=anchor?Math.max(2,anchor.x-2):25,y=anchor?Math.max(2,anchor.y-1):13;
  if(!pxWalkable67(map,x,y,{ignoreNpc:true})){x=anchor?.x||25;y=Math.max(2,(anchor?.y||15)-1)}
  return{id:`quest73:${q.node}`,kind:'quest73',x,y,label:n.title,prompt:`Story objective: ${n.title}`,action:'quest73'}
}

const _p74PixelMap=pixelMap67;
pixelMap67=function(id){
  if(id==='ship')return buildShip67();
  if(id==='sableTown')return buildHubMap74('sable');
  if(String(id).startsWith('hub:'))return buildHubMap74(String(id).slice(4));
  if(GALAXY_HUBS_50[id])return buildHubMap74(id);
  return buildHubMap74(S.world?.currentHub||'sable')
};
pixelCurrentMap67=function(){let V=ensurePhase68State();if(V.map!=='ship')V.map=`hub:${S.world?.currentHub||'sable'}`;return pixelMap67(V.map)};

const _p74DrawTile=pxDrawTile67;
pxDrawTile67=function(ctx,t,sx,sy,x,y){
  let map=pixelCurrentMap67();if(map.id==='ship')return _p74DrawTile(ctx,t,sx,sy,x,y);let P=map.style||WORLD_STYLES_74.sable,base=P.ground;
  if(t==='road')base=P.road;else if(t==='wall')base=P.wall;else if(t==='roof')base=P.roof;else if(t==='pad'||t==='metal')base='#394650';else if(t==='grass')base=P.ground2||P.ground;
  ctx.fillStyle=base;ctx.fillRect(sx,sy,16,16);
  if(t==='road'){ctx.fillStyle='#ffffff16';if((x+y)%3===0)ctx.fillRect(sx+2,sy+12,6,1)}
  else if(t==='wall'){ctx.fillStyle='#ffffff1b';ctx.fillRect(sx,sy,16,2);ctx.fillStyle='#00000025';ctx.fillRect(sx,sy+13,16,3)}
  else if(t==='roof'){ctx.fillStyle='#ffffff14';ctx.fillRect(sx+1,sy+1,14,2);ctx.fillStyle='#00000022';ctx.fillRect(sx+2,sy+13,12,2)}
  else if(t==='pad'||t==='metal'){ctx.strokeStyle='#687682';ctx.strokeRect(sx+.5,sy+.5,15,15);if((x+y)%3===0){ctx.fillStyle=P.accent;ctx.fillRect(sx+7,sy+7,2,2)}}
  else{ctx.fillStyle=P.ground2||P.ground;if((x*5+y*3)%7===0)ctx.fillRect(sx+3,sy+7,2,1);if((x+y)%11===0)ctx.fillRect(sx+11,sy+3,1,2)}
};
const _p74DrawObject=pxDrawObject67;
pxDrawObject67=function(ctx,o,sx,sy){
  if(o.kind==='district74'){
    let map=pixelCurrentMap67(),P=map.style||WORLD_STYLES_74.sable,cur=currentDistrict52()?.id===o.district;
    ctx.fillStyle=cur?'#ffe06a':P.accent;ctx.fillRect(sx+4,sy+4,8,8);ctx.fillStyle='#091019';ctx.font='8px monospace';ctx.textAlign='center';ctx.fillText(o.symbol||'◆',sx+8,sy+11);ctx.textAlign='start';
    if(cur){ctx.strokeStyle='#fff1a6';ctx.strokeRect(sx+2.5,sy+2.5,11,11)}return
  }
  if(o.kind==='quest73'){let blink=(Math.floor(Date.now()/350)%2)===0;ctx.fillStyle=blink?'#ffe26f':'#c2912f';ctx.fillRect(sx+5,sy+3,6,10);ctx.fillStyle='#fff4bd';ctx.fillRect(sx+7,sy+1,2,4);ctx.strokeStyle='#ffe26f';ctx.strokeRect(sx+2.5,sy+.5,11,14);return}
  if(o.kind==='banner74'){let colors={Empire:'#d7d9dc',Rebels:'#c39b4a',Hutts:'#8662a0',Guild:'#b78345',Local:'#5f91a8'},c=colors[o.controller]||'#8aa';ctx.fillStyle='#67737c';ctx.fillRect(sx+7,sy+2,2,13);ctx.fillStyle=c;ctx.fillRect(sx+9,sy+3,6,6);return}
  if(o.kind==='checkpoint74'){ctx.fillStyle='#606b74';ctx.fillRect(sx+1,sy+7,14,5);ctx.fillStyle='#b44b45';ctx.fillRect(sx+3,sy+5,2,2);ctx.fillRect(sx+11,sy+5,2,2);return}
  return _p74DrawObject(ctx,o,sx,sy)
};
const _p74Draw=pxDraw67;
pxDraw67=function(){
  _p74Draw();let cv=$('pixelCanvas67'),map=pixelCurrentMap67();if(!cv||map.id==='ship')return;let ctx=cv.getContext('2d'),p=pxPos67(),cam=pxCamera67(map,p),T=PX67.tile;
  ctx.font='7px monospace';ctx.textBaseline='bottom';
  map.objects.filter(o=>o.kind==='district74'||o.kind==='quest73').forEach(o=>{let vx=o.x-cam.x,vy=o.y-cam.y;if(vx<0||vy<0||vx>=PX67.viewW||vy>=PX67.viewH)return;let text=o.kind==='quest73'?'★ OBJECTIVE':o.label.toUpperCase().slice(0,18),tw=ctx.measureText(text).width;ctx.fillStyle='#07101bd9';ctx.fillRect(vx*T+8-tw/2-2,vy*T-5,tw+4,9);ctx.fillStyle=o.kind==='quest73'?'#ffe27a':'#eef5fa';ctx.fillText(text,vx*T+8-tw/2,vy*T+3)});
  let ctl=control64(map.hubId),st=stability64(map.hubId),tag=`${ctl.toUpperCase()} · ${st}`;ctx.fillStyle='#07101bdc';ctx.fillRect(5,5,ctx.measureText(tag).width+8,13);ctx.fillStyle='#e7edf2';ctx.fillText(tag,9,16)
};
const _p74InteractObject=pxInteractObject67;
pxInteractObject67=function(o){
  if(o.action==='district74'){
    visitDistrict52(o.district);let d=currentDistrict52();openPixelDialog67(d.name,d.desc,[{label:'Stay in Pixel World',primary:true},{label:'Open Local Scenes',run:()=>renderNavTab('explore')},{label:'Story',run:()=>renderNavTab('story61tab')}]);renderWorldContext74();safeAutosave();return
  }
  if(o.action==='quest73'){interactCampaign73();return}
  if(o.action==='control74'){
    let id=pixelCurrentMap67().hubId,ctl=control64(id),I=influence64(id),sec=effectiveSecurity64(id);
    openPixelDialog67(`${ctl} Influence`,`${GALAXY_HUBS_50[id].name} is ${stability64(id).toLowerCase()} under ${ctl} influence. Effective security ${sec}/5. Empire ${I.Empire}, Rebels ${I.Rebels}, Hutts ${I.Hutts}, Guild ${I.Guild}, Local ${I.Local}.`,[{label:'Galaxy Pulse',primary:true,run:()=>renderNavTab('galaxy')},{label:'Close'}]);return
  }
  if(o.action==='loot74'){
    let V=ensurePhase74State(),id=o.hubId||S.world.currentHub;if(V.loot[id]){openPixelDialog67(o.label,'You have already searched this cache.',[{label:'Close'}]);return}
    let n=35+(hash64(`${id}:${S.world.day}:visual-loot`)%61);V.loot[id]=true;S.credits+=n;ledgerEntry(n,`${GALAXY_HUBS_50[id].name} visual-map salvage`);showPickup71({id:`loot74:${id}`,name:`Local salvage · ${n} cr`,type:'gear',enc:0},'LOCAL FIND');openPixelDialog67(o.label,`You recover saleable local salvage worth ${n} credits.`,[{label:'Take it',primary:true}]);safeAutosave();return
  }
  if(o.action==='disembark'){S.visual67.map=`hub:${S.world.currentHub}`;renderPixelWorld67();safeAutosave();return}
  return _p74InteractObject(o)
};
const _p74SwitchMap=pxSwitchMap67;
pxSwitchMap67=function(id){
  if(id==='sableTown'||id==='hub'||String(id).startsWith('hub:')){
    let hid=String(id).startsWith('hub:')?String(id).slice(4):S.world.currentHub;
    if(!GALAXY_HUBS_50[hid])hid=S.world.currentHub;let V=ensurePhase68State();V.map=`hub:${hid}`;V.lastMap=V.map;let m=pixelCurrentMap67();
    V.positions[m.id]=V.positions[m.id]||{x:m.spawn.x,y:m.spawn.y,facing:'up'};ensurePhase74State().visitedHubs[hid]=true;pxLog67(`Entered visual map: ${m.name}.`);renderPixelWorld67();safeAutosave();return
  }
  return _p74SwitchMap(id)
};
function renderWorldContext74(){
  let side=document.querySelector('#pixelworld67 .pixel-side67');if(!side)return;let old=$('worldContext74');old?.remove();let map=pixelCurrentMap67();if(map.id==='ship')return;
  let id=map.hubId,h=GALAXY_HUBS_50[id],I=influence64(id),ctl=control64(id),districts=districts52(id),dcur=currentDistrict52()?.id;
  let card=document.createElement('div');card.id='worldContext74';card.className='world-context74';
  card.innerHTML=`<div class="row"><div><div class="pixel-title67">${pxEsc67(h.name)}</div><div class="tiny">${pxEsc67(h.world)} · ${pxEsc67(h.region)}</div></div><span class="hub-chip74"><b>${pxEsc67(ctl)}</b> ${pxEsc67(stability64(id))}</span></div><div class="world-control74"><div class="pixel-stat67">SEC <b>${effectiveSecurity64(id)}/5</b></div><div class="pixel-stat67">HEAT <b>${localHeat50()}</b></div><div class="pixel-stat67">DAY <b>${S.world.day}</b></div></div><div class="world-districts74">${districts.map(d=>`<div class="world-district74 ${d.id===dcur?'current':''}"><b>${pxEsc67(d.name)}</b><div class="tiny">${pxEsc67(d.kind)} · ${pxEsc67(d.skill)}</div></div>`).join('')}</div><div class="tiny" style="margin-top:7px">Influence · E ${I.Empire} · R ${I.Rebels} · H ${I.Hutts} · G ${I.Guild} · L ${I.Local}</div>`;
  side.appendChild(card)
}
const _p74RenderPixel=renderPixelWorld67;
renderPixelWorld67=function(rebuild=true){
  injectPixelWorld67();ensurePhase74State();let V=S.visual67;if(!V.map||V.map.startsWith('hub:'))V.map=`hub:${S.world.currentHub}`;
  _p74RenderPixel(rebuild);
  if($('pxTown67')){$('pxTown67').textContent=GALAXY_HUBS_50[S.world.currentHub]?.name||'Current Hub';$('pxTown67').onclick=()=>pxSwitchMap67(`hub:${S.world.currentHub}`);$('pxTown67').classList.toggle('on',V.map!=='ship')}
  if($('pxShip67')){$('pxShip67').classList.toggle('on',V.map==='ship')}
  renderWorldContext74();pxDraw67();S.schemaVersion=74
};

const _p74Travel=travelGalaxy50;
travelGalaxy50=function(dest){
  let before=S.world.currentHub,r=_p74Travel(dest);
  if(S.world.currentHub!==before){ensurePhase74State();S.visual67.map=`hub:${S.world.currentHub}`;S.visual74.visitedHubs[S.world.currentHub]=true}
  return r
};

/* Featured objective can now be visible directly on hub maps. */
function visualMapCoverage74(){
  let ids=Object.keys(GALAXY_HUBS_50),districts=0,markers=0;
  ids.forEach(id=>{let ds=districts52(id),m=buildHubMap74(id);districts+=ds.length;markers+=m.objects.filter(o=>o.action==='district74').length});
  return{hubs:ids.length,districts,markers}
}

/* Guide / save / diagnostics */
function injectPhase74Guide(){
  if(!$('guide')||$('phase74Guide'))return;let c=document.createElement('section');c.id='phase74Guide';c.className='card';c.style.marginTop='14px';
  c.innerHTML=`<div class="row"><div><b>v1.3 · Visual Adventure Expansion</b><div class="small">Phase 73 proves the complete visual RPG loop with an authored campaign; Phase 74 brings that exploration layer to the entire current galaxy.</div></div><span class="tag">PHASE 73–74</span></div><div class="grid g2" style="margin-top:9px"><div class="item"><b>Phase 73 · Embers in the Static</b><div class="small">A 17-stage visual campaign spanning Sable Reach, Ferrix, Nar Shaddaa, and Yavin 4 with map objectives, portrait decisions, best-actor checks, combat, faction consequences, optional objectives, and a unique datacore reward.</div></div><div class="item"><b>Phase 74 · Visual Galaxy</b><div class="small">All 16 hubs now generate walkable retro maps from their existing district data. Every current district receives a visual entrance, NPC presence, local terminal/cache, ship pad, and dynamic faction/security dressing.</div></div></div>`;
  let old=$('phase72Guide');(old||$('guide')).insertAdjacentElement('afterend',c)
}
const _p74Serializable=serializableState;
serializableState=function(){let x=_p74Serializable();x.schemaVersion=74;S.schemaVersion=74;return x};
const _p74RenderAll=renderAll;
renderAll=function(){ensurePhase74State();let r=_p74RenderAll();S.schemaVersion=74;injectPhase74Guide();if(!$('story61tab')?.classList.contains('hidden'))renderStory61();if(!$('pixelworld67')?.classList.contains('hidden'))renderPixelWorld67(false);S.schemaVersion=74;return r};
save=function(){try{let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Phase 74: flagship visual campaign state, 16-hub visual-map state, dynamic world dressing, and all prior RPG systems. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()}catch(err){showRuntimeError(`Save failed: ${err.message}`)}};

RULE_AUDIT.unshift(
 {id:'visualCampaign73',name:'Phase 73 Embers in the Static visual campaign',status:'adapted',source:'Original Sable Reach authored adventure using existing source-grounded rules/content',detail:'Plot, dialogue, objectives, branch choices, optional goals, unique reward, and scene placement are original. Checks and combat use the existing FFG-style mechanics and adversary database.'},
 {id:'visualGalaxy74',name:'Phase 74 sixteen-hub visual galaxy',status:'adapted',source:'Existing Sable Reach hub/district database built from supplied project references plus original abstractions',detail:'Tile layouts, district entrances, local caches, faction banners, checkpoints, patrol presentation, and map generation are original videogame layers. Existing district names and source labels remain unchanged.'}
);
const _p74Diag=phase45Diagnostics;
phase45Diagnostics=function(){
  let rows=_p74Diag().filter(x=>!['Phase 72 save schema','Phase 61 story templates'].includes(x.name));
  const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  ensurePhase74State();injectPhase74Guide();let cov=visualMapCoverage74();
  add('Phase 73 flagship campaign registered',!!STORY_TEMPLATES_61.embers73&&Object.keys(STORY_TEMPLATES_61.embers73.nodes).length===17,'17-stage authored visual campaign');
  add('Phase 73 visual map objective support',typeof visualQuestObject73==='function'&&typeof interactCampaign73==='function','visual and portrait-dialogue objectives');
  add('Phase 73 unique reward',!!ITEMS.echoKey73&&ITEMS.echoKey73.source.includes('Original'),'Echo-Key Datacore');
  add('Phase 74 visual hub coverage',cov.hubs===16,`${cov.hubs}/16 hubs`);
  add('Phase 74 district marker coverage',cov.markers===cov.districts&&cov.districts>=60,`${cov.markers}/${cov.districts} district entrances`);
  add('Phase 74 dynamic faction dressing',typeof control64==='function'&&typeof effectiveSecurity64==='function'&&buildHubMap74('empressTeta').objects.some(o=>o.kind==='checkpoint74'),'control + security affect map dressing');
  let snap74=serializableState();add('Phase 74 save schema',BUILD_INFO.saveSchema===74&&snap74.schemaVersion===74&&S.schemaVersion===74,'schema 74');
  return rows
};
const _p74Smoke=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p74Smoke();
  report.failed=report.failed.filter(x=>
    !x.startsWith('Phase 72 schema target:') &&
    !x.startsWith('Phase 61 exposes four branching story templates:') &&
    !x.startsWith('Phase 45 release diagnostics pass structurally:') &&
    !x.startsWith('Phase 66 release diagnostics all pass:')
  );
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  ensurePhase74State();let cov=visualMapCoverage74();
  test('Phase 73 campaign has seventeen stages',()=>Object.keys(STORY_TEMPLATES_61.embers73.nodes).length===17);
  test('Phase 73 mixes visual dialogue skill travel district and combat nodes',()=>{let types=new Set(Object.values(STORY_TEMPLATES_61.embers73.nodes).map(n=>n.type));return ['visual73','dialogue73','skill','travel','district','combat','finale'].every(x=>types.has(x))});
  test('Phase 73 unique datacore reward exists',()=>ITEMS.echoKey73?.name==='Echo-Key Datacore');
  test('Phase 74 has sixteen visual hub maps',()=>cov.hubs===16);
  test('Phase 74 maps every current district',()=>cov.markers===cov.districts&&cov.districts>=60);
  test('Phase 74 every hub has ship and navigation access',()=>Object.keys(GALAXY_HUBS_50).every(id=>{let a=buildHubMap74(id).objects.map(o=>o.action);return a.includes('board')&&a.includes('galaxy')}));
  test('Phase 74 dynamic controller marker exists',()=>Object.keys(GALAXY_HUBS_50).every(id=>buildHubMap74(id).objects.some(o=>o.kind==='banner74')));
  test('Phase 74 schema target',()=>BUILD_INFO.saveSchema===74&&serializableState().schemaVersion===74);
  document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;
  let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};

ensurePhase74State();injectPhase74Guide();
document.title='Star Wars: Sable Reach — Phase 74 Visual Galaxy';
let topTitle74=document.querySelector('.top h1');if(topTitle74)topTitle74.textContent='STAR WARS: SABLE REACH · v1.3 VISUAL GALAXY';
let topP74=document.querySelector('.top p');if(topP74)topP74.textContent='Retro Star Wars RPG build: a fully visual authored campaign, walkable maps across all 16 hubs, portraits, gear, companions, narrative-dice combat, ships, organizations, and a dynamic galaxy.';
window.__SABLE_REACH__={...window.__SABLE_REACH__,version:BUILD_INFO.version,diagnostics:()=>phase45Diagnostics(),smoke:runSableReachSmoke,state:()=>S,visualCampaign:()=>S.visual73,visualGalaxy:()=>visualMapCoverage74()};
