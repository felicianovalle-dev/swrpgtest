
/* Phase 17: static rules/data, content definitions, and initial state. */
const BUILD_INFO={version:'52.0.0-exploration-mobile',architecture:'single-file responsive browser build',saveSchema:52};
const $=id=>document.getElementById(id);
const NARR={boost:[{},{},{s:1},{s:1,a:1},{a:2},{a:1}],setback:[{},{},{f:1},{f:1},{t:1},{t:1}],ability:[{},{s:1},{s:1},{s:2},{a:1},{a:1},{s:1,a:1},{a:2}],difficulty:[{},{f:1},{f:2},{t:1},{t:1},{t:1},{t:2},{f:1,t:1}],proficiency:[{},{s:1},{s:1},{s:2},{s:2},{a:1},{s:1,a:1},{s:1,a:1},{s:1,a:1},{a:2},{a:2},{s:1,tr:1}],challenge:[{},{f:1},{f:1},{f:2},{f:2},{t:1},{t:1},{f:1,t:1},{f:1,t:1},{t:2},{t:2},{f:1,de:1}]};
const FORCE_FACES=[{dark:1},{dark:1},{dark:1},{dark:1},{dark:1},{dark:1},{dark:2},{light:1},{light:1},{light:2},{light:2},{light:2}];
const SKILL_CHAR={'Astrogation':'Intellect','Athletics':'Brawn','Brawl':'Brawn','Charm':'Presence','Coercion':'Willpower','Computers':'Intellect','Cool':'Presence','Coordination':'Agility','Deception':'Cunning','Discipline':'Willpower','Gunnery':'Agility','Leadership':'Presence','Lightsaber':'Brawn','Mechanics':'Intellect','Medicine':'Intellect','Melee':'Brawn','Negotiation':'Presence','Perception':'Cunning','Piloting (Planetary)':'Agility','Piloting (Space)':'Agility','Ranged (Heavy)':'Agility','Ranged (Light)':'Agility','Resilience':'Brawn','Skulduggery':'Cunning','Stealth':'Agility','Streetwise':'Cunning','Survival':'Cunning','Vigilance':'Willpower','Knowledge (Core Worlds)':'Intellect','Knowledge (Education)':'Intellect','Knowledge (Lore)':'Intellect','Knowledge (Outer Rim)':'Intellect','Knowledge (Underworld)':'Intellect','Knowledge (Warfare)':'Intellect','Knowledge (Xenology)':'Intellect'};
const SPECIES={
human:{name:'Human',xp:110,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},note:'Adaptable baseline. The source profile grants two ranks in any two non-career skills; that flexible picker is still pending.',source:'Complete Species Guide'},
clone:{name:'Clone',xp:100,wt:11,st:11,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},free:{Resilience:1,'Knowledge (Warfare)':1},note:'Military training package.',source:'Rise of the Separatists'},
geonosian:{name:'Geonosian',xp:140,wt:9,st:9,c:{Brawn:2,Agility:2,Intellect:2,Cunning:1,Willpower:1,Presence:1},note:'High starting XP with low Cunning, Willpower, and Presence.',source:'Rise of the Separatists'},
kaminoan:{name:'Kaminoan',xp:100,wt:9,st:10,c:{Brawn:1,Agility:2,Intellect:3,Cunning:2,Willpower:2,Presence:2},free:{Medicine:1},note:'Intellect-focused baseline and medical training.',source:'Rise of the Separatists'},
umbaran:{name:'Umbaran',xp:100,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},free:{Deception:1},note:'Deception training; other racial abilities remain to be automated.',source:'Rise of the Separatists'},
bothan:{name:'Bothan',xp:100,wt:10,st:11,c:{Brawn:1,Agility:2,Intellect:2,Cunning:3,Willpower:2,Presence:2},freeChoice:['Perception','Streetwise'],note:'Skilled spies; choose Perception or Streetwise. Convincing Demeanor racial automation is pending.',source:'Complete Species Guide'},
rodian:{name:'Rodian',xp:100,wt:10,st:10,c:{Brawn:2,Agility:3,Intellect:2,Cunning:2,Willpower:2,Presence:1},free:{Survival:1},note:'Hunting culture; Survival training. Expert Tracker racial automation is pending.',source:'Complete Species Guide'},
trandoshan:{name:'Trandoshan',xp:85,wt:12,st:9,c:{Brawn:3,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:1},freeChoice:['Brawl','Perception'],note:'Choose Brawl or Perception. Claws, infrared vision, and regeneration are recorded.',source:'Complete Species Guide'},
twilek:{name:"Twi'lek",xp:100,wt:10,st:11,c:{Brawn:1,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:3},freeChoice:['Charm','Deception'],note:'Choose Charm or Deception. Desert adaptation is recorded for environmental automation.',source:'Complete Species Guide'},
lasat:{name:'Lasat',xp:95,wt:9,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:3,Willpower:1,Presence:2},freeChoice:['Mechanics','Survival'],note:'Choose Mechanics or Survival. Night vision and temperature adaptation are recorded.',source:'Complete Species Guide'},
togruta:{name:'Togruta',xp:100,wt:10,st:10,c:{Brawn:1,Agility:2,Intellect:2,Cunning:3,Willpower:2,Presence:2},free:{Perception:1},note:'Perception training; Pack Instincts will improve assistance in a later pass.',source:'Complete Species Guide'},
zeltron:{name:'Zeltron',xp:100,wt:10,st:12,c:{Brawn:2,Agility:2,Intellect:1,Cunning:2,Willpower:1,Presence:3},free:{Charm:1},note:'Charm training; pheromone and empathy mechanics are recorded.',source:'Complete Species Guide'},
tissshar:{name:"Tiss'shar",xp:85,wt:11,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},free:{Negotiation:1},note:'Negotiation training, night vision, and natural claws/teeth.',source:'Complete Species Guide'},
lannik:{name:'Lannik',xp:95,wt:9,st:11,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:1},freeChoice:['Knowledge (Warfare)','Streetwise'],note:'Choose Warfare or Streetwise; silhouette 0 and Indomitable are recorded.',source:'Complete Species Guide'},
cerean:{name:'Cerean',xp:90,wt:10,st:11,c:{Brawn:2,Agility:1,Intellect:3,Cunning:2,Willpower:2,Presence:2},free:{Vigilance:1},note:'Begins with Vigilance 1. Intellectuals may designate two Knowledge skills as career skills; that flexible career-skill choice is recorded but not yet automated.',source:'Complete Species Guide project reference · p.47'},
mirialan:{name:'Mirialan',xp:100,wt:10,st:11,c:{Brawn:2,Agility:3,Intellect:2,Cunning:1,Willpower:2,Presence:2},free:{Discipline:1},note:'Begins with Discipline 1.',source:'Complete Species Guide project reference · p.177'},
nautolan:{name:'Nautolan',xp:90,wt:11,st:11,c:{Brawn:3,Agility:2,Intellect:2,Cunning:2,Willpower:1,Presence:2},free:{Athletics:1},note:'Begins with Athletics 1. Aquatic, low-light, and pheromone-sensing traits are recorded; environmental interactions remain contextual.',source:'Complete Species Guide project reference · p.185'},
moncal:{name:'Mon Calamari',xp:100,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:3,Cunning:1,Willpower:2,Presence:2},free:{'Knowledge (Education)':1},note:'Begins with Knowledge (Education) 1 and is aquatic.',source:'Complete Species Guide project reference · p.178'},
zabrak:{name:'Zabrak',xp:95,wt:11,st:12,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:1},freeChoice:['Brawl','Survival'],note:'Choose Brawl or Survival 1. Fearsome Countenance adds a Boost to Coercion checks.',source:'Complete Species Guide project reference · p.327'},
mikkian:{name:'Mikkian',xp:100,wt:10,st:11,c:{Brawn:1,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:2},free:{Discipline:1},note:'Begins with Discipline 1. Sensory tendrils add a Boost to Perception checks.',source:'Knights of Fate · species profile'},
dowutin:{name:'Dowutin',xp:85,wt:15,st:8,c:{Brawn:3,Agility:1,Intellect:2,Cunning:2,Willpower:2,Presence:2},free:{Resilience:1},note:'Begins with Resilience 1. Large and Immovable are recorded; silhouette choice and forced-movement resistance are not yet fully automated.',source:'Knights of Fate · species profile'},
phydolon:{name:'Phydolon',xp:100,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:1},freeChoice:['Cool','Discipline'],note:'Choose Cool or Discipline 1. Symbiotic Resilience improves natural healing; isolation modifies end-of-encounter strain recovery.',source:'Knights of Fate · species profile'}
,chiss:{name:'Chiss',xp:100,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:3,Cunning:2,Willpower:2,Presence:1},free:{Cool:1},note:'Begins with Cool 1. Infrared Vision removes Setback dice caused by lighting; that environmental removal is recorded but not yet globally automated.',source:'Complete Species Guide v6.0 fan supplement · p.57'}
,duros:{name:'Duros',xp:100,wt:11,st:10,c:{Brawn:1,Agility:2,Intellect:3,Cunning:2,Willpower:2,Presence:2},freeChoice:['Astrogation','Piloting (Space)'],note:'Choose Astrogation or Piloting (Space) 1. Intuitive Navigation grants Galaxy Mapper; species-granted talent automation is recorded for a later pass.',source:'Complete Species Guide v6.0 fan supplement · p.84'}
,gand:{name:'Gand',xp:85,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:1},free:{Discipline:1},note:'Begins with Discipline 1. Ritual tracking visions and lungless/ammonia-breather subspecies options remain contextual.',source:'Complete Species Guide v6.0 fan supplement · p.103'}
,gungan:{name:'Gungan',xp:90,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:1,Cunning:2,Willpower:2,Presence:3},free:{Athletics:1},note:'Begins with Athletics 1. Aquatic traits and High Jump (3 strain for two range bands once per round) are recorded; dedicated traversal automation is pending.',source:'Complete Species Guide v6.0 fan supplement · p.114'}
,jawa:{name:'Jawa',xp:90,wt:8,st:11,c:{Brawn:1,Agility:2,Intellect:2,Cunning:3,Willpower:2,Presence:2},free:{Mechanics:1},note:'Begins with Mechanics 1. Scavengers grants Utinni!; Night Vision, olfactory senses, and Silhouette 0 are recorded for contextual handling.',source:'Complete Species Guide v6.0 fan supplement · p.134'}
,keldor:{name:'Kel Dor',xp:110,wt:9,st:10,c:{Brawn:1,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:2},free:{'Knowledge (Education)':1},note:'Begins with Knowledge (Education) 1. Requires helium breathing support and protective goggles in normal oxygen atmospheres.',source:'Complete Species Guide v6.0 fan supplement · p.140'}
,miraluka:{name:'Miraluka',xp:110,wt:9,st:11,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:3,Presence:1},freeChoice:['Perception','Vigilance'],note:'Choose Perception or Vigilance 1. The source profile is Blind without Force-based sight; that special sensory subsystem is not yet automated.',source:'Complete Species Guide v6.0 fan supplement · p.176'}
,pantoran:{name:'Pantoran',xp:100,wt:10,st:10,c:{Brawn:2,Agility:2,Intellect:2,Cunning:1,Willpower:2,Presence:3},freeChoice:['Cool','Negotiation'],note:'Choose Cool or Negotiation 1. Cold Adaptations removes cold-environment Setback dice and adds one in hot conditions; environmental automation is pending.',source:'Complete Species Guide v6.0 fan supplement · p.205'}
,sullustan:{name:'Sullustan',xp:100,wt:9,st:10,c:{Brawn:1,Agility:3,Intellect:2,Cunning:2,Willpower:2,Presence:2},free:{Astrogation:1},note:'Begins with Astrogation 1. Large Eyes affects lighting penalties; Born Pilots grants Skilled Jockey. Species-granted talent automation is pending.',source:'Complete Species Guide v6.0 fan supplement · p.264'}
,toydarian:{name:'Toydarian',xp:90,wt:9,st:12,c:{Brawn:1,Agility:1,Intellect:2,Cunning:2,Willpower:3,Presence:3},note:'Force Resistance increases difficulty of telepathic Force powers by two. Hovering ignores ordinary terrain/fall penalties; Silhouette 0. These traits are recorded contextually.',source:'Complete Species Guide v6.0 fan supplement · p.287'}
,weequay:{name:'Weequay',xp:90,wt:10,st:11,c:{Brawn:3,Agility:2,Intellect:1,Cunning:3,Willpower:2,Presence:1},freeChoice:['Athletics','Resilience'],note:'Choose Athletics or Resilience 1. Clan pheromone communication is narrative/contextual.',source:'Complete Species Guide v6.0 fan supplement · p.309'}
,wookiee:{name:'Wookiee',xp:90,wt:14,st:9,c:{Brawn:3,Agility:2,Intellect:2,Cunning:2,Willpower:1,Presence:2},free:{Brawl:1},note:'Begins with Brawl 1. Climbing Claws add a Boost on suitable climbs. Wookiee Rage adds melee damage while wounded/critically injured; direct automation is pending.',source:'Complete Species Guide v6.0 fan supplement · p.313'}

};
const CAREERS={
'Bounty Hunter':{line:'Edge of the Empire',careerPicks:4,skills:['Athletics','Brawl','Perception','Piloting (Planetary)','Piloting (Space)','Ranged (Heavy)','Streetwise','Vigilance'],specs:{'Assassin':['Melee','Ranged (Heavy)','Skulduggery','Stealth'],'Gadgeteer':['Brawl','Coercion','Mechanics','Ranged (Light)'],'Survivalist':['Knowledge (Xenology)','Perception','Resilience','Survival'],'Martial Artist':['Athletics','Brawl','Coordination','Discipline'],'Operator':['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'],'Skip Tracer':['Cool','Knowledge (Underworld)','Negotiation','Skulduggery']}},
'Smuggler':{line:'Edge of the Empire',careerPicks:4,skills:['Coordination','Deception','Knowledge (Underworld)','Perception','Piloting (Space)','Skulduggery','Streetwise','Vigilance'],specs:{'Pilot':['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'],'Scoundrel':['Charm','Cool','Deception','Ranged (Light)'],'Thief':['Computers','Skulduggery','Stealth','Vigilance'],'Charmer':['Charm','Cool','Leadership','Negotiation'],'Gambler':['Computers','Cool','Deception','Skulduggery'],'Gunslinger':['Coercion','Cool','Knowledge (Outer Rim)','Ranged (Light)']}},
'Technician':{line:'Edge of the Empire',careerPicks:4,skills:['Astrogation','Computers','Coordination','Discipline','Knowledge (Outer Rim)','Mechanics','Perception','Piloting (Planetary)'],specs:{'Mechanic':['Brawl','Mechanics','Piloting (Space)','Skulduggery'],'Outlaw Tech':['Knowledge (Education)','Mechanics','Knowledge (Underworld)','Streetwise'],'Slicer':['Computers','Knowledge (Education)','Knowledge (Underworld)','Stealth'],'Cyber Tech':['Athletics','Mechanics','Medicine','Vigilance'],'Droid Tech':['Computers','Cool','Mechanics','Leadership'],'Modder':['Gunnery','Mechanics','Piloting (Space)','Streetwise']}},
'Hired Gun':{line:'Edge of the Empire',careerPicks:4,skills:['Athletics','Brawl','Discipline','Melee','Piloting (Planetary)','Ranged (Light)','Resilience','Vigilance'],specs:{'Bodyguard':['Gunnery','Perception','Piloting (Planetary)','Ranged (Heavy)'],'Marauder':['Coercion','Melee','Resilience','Survival'],'Mercenary Soldier':['Discipline','Gunnery','Leadership','Ranged (Heavy)'],'Demolitionist':['Computers','Cool','Mechanics','Skulduggery'],'Enforcer':['Brawl','Coercion','Knowledge (Underworld)','Streetwise'],'Heavy':['Gunnery','Perception','Ranged (Heavy)','Resilience']}},
'Explorer':{line:'Edge of the Empire',careerPicks:4,skills:['Astrogation','Cool','Knowledge (Lore)','Knowledge (Outer Rim)','Knowledge (Xenology)','Perception','Piloting (Space)','Survival'],specs:{'Fringer':['Astrogation','Coordination','Negotiation','Streetwise'],'Scout':['Athletics','Medicine','Piloting (Planetary)','Survival'],'Trader':['Deception','Knowledge (Core Worlds)','Knowledge (Underworld)','Negotiation'],'Archaeologist':['Athletics','Discipline','Knowledge (Education)','Knowledge (Lore)'],'Big-Game Hunter':['Knowledge (Xenology)','Ranged (Heavy)','Stealth','Survival'],'Driver':['Cool','Gunnery','Mechanics','Piloting (Planetary)']}},
'Colonist':{line:'Edge of the Empire',careerPicks:4,skills:['Charm','Deception','Knowledge (Core Worlds)','Knowledge (Education)','Knowledge (Lore)','Leadership','Negotiation','Streetwise'],specs:{'Doctor':['Cool','Knowledge (Education)','Medicine','Resilience'],'Politico':['Charm','Coercion','Deception','Knowledge (Core Worlds)'],'Scholar':['Knowledge (Education)','Knowledge (Outer Rim)','Knowledge (Underworld)','Knowledge (Xenology)'],'Entrepreneur':['Discipline','Knowledge (Education)','Knowledge (Underworld)','Negotiation'],'Marshal':['Coercion','Knowledge (Underworld)','Ranged (Light)','Vigilance'],'Performer':['Charm','Coordination','Deception','Melee']}},
'Commander':{line:'Age of Rebellion',careerPicks:4,skills:['Coercion','Cool','Discipline','Knowledge (Warfare)','Leadership','Perception','Ranged (Light)','Vigilance'],specs:{'Commodore':['Astrogation','Computers','Knowledge (Education)','Knowledge (Outer Rim)'],'Squadron Leader':['Gunnery','Mechanics','Piloting (Planetary)','Piloting (Space)'],'Tactician':['Brawl','Discipline','Leadership','Ranged (Heavy)'],'Figurehead':['Cool','Leadership','Negotiation','Knowledge (Core Worlds)'],'Instructor':['Discipline','Medicine','Ranged (Heavy)','Knowledge (Education)'],'Strategist':['Computers','Cool','Vigilance','Knowledge (Warfare)']}},
'Ace':{line:'Age of Rebellion',careerPicks:4,skills:['Astrogation','Cool','Gunnery','Mechanics','Perception','Piloting (Planetary)','Piloting (Space)','Ranged (Light)'],specs:{'Driver':['Cool','Gunnery','Mechanics','Piloting (Planetary)'],'Gunner':['Discipline','Gunnery','Ranged (Heavy)','Resilience'],'Pilot':['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'],'Beast Rider':['Athletics','Knowledge (Xenology)','Perception','Survival'],'Hotshot':['Cool','Coordination','Piloting (Planetary)','Piloting (Space)'],'Rigger':['Gunnery','Knowledge (Underworld)','Mechanics','Resilience']}},
'Diplomat':{line:'Age of Rebellion',careerPicks:4,forceStart:false,skills:['Charm','Deception','Knowledge (Core Worlds)','Knowledge (Lore)','Knowledge (Outer Rim)','Knowledge (Xenology)','Leadership','Negotiation'],specs:{'Agitator':['Coercion','Deception','Knowledge (Underworld)','Streetwise'],'Ambassador':['Charm','Discipline','Knowledge (Core Worlds)','Negotiation'],'Quartermaster':['Computers','Negotiation','Skulduggery','Vigilance'],'Advocate':['Coercion','Deception','Negotiation','Vigilance'],'Analyst':['Computers','Knowledge (Education)','Knowledge (Warfare)','Perception'],'Propagandist':['Charm','Deception','Knowledge (Warfare)','Perception']}},
'Soldier':{line:'Age of Rebellion',careerPicks:4,forceStart:false,skills:['Athletics','Brawl','Knowledge (Warfare)','Medicine','Melee','Ranged (Light)','Ranged (Heavy)','Survival'],specs:{'Commando':['Brawl','Melee','Resilience','Survival'],'Medic':['Knowledge (Xenology)','Medicine','Resilience','Vigilance'],'Sharpshooter':['Cool','Perception','Ranged (Light)','Ranged (Heavy)'],'Heavy':['Gunnery','Perception','Ranged (Heavy)','Resilience'],'Trailblazer':['Knowledge (Outer Rim)','Perception','Stealth','Survival'],'Vanguard':['Athletics','Cool','Resilience','Vigilance']}},
'Engineer':{line:'Age of Rebellion',careerPicks:4,forceStart:false,skills:['Athletics','Computers','Knowledge (Education)','Mechanics','Perception','Piloting (Space)','Ranged (Light)','Vigilance'],specs:{'Mechanic':['Brawl','Mechanics','Piloting (Space)','Skulduggery'],'Saboteur':['Coordination','Mechanics','Skulduggery','Stealth'],'Scientist':['Computers','Knowledge (Education)','Knowledge (Lore)','Medicine'],'Droid Specialist':['Computers','Cool','Mechanics','Melee'],'Sapper':['Athletics','Knowledge (Warfare)','Mechanics','Survival'],'Shipwright':['Gunnery','Knowledge (Education)','Mechanics','Piloting (Space)']}},
'Spy':{line:'Age of Rebellion',careerPicks:4,forceStart:false,skills:['Computers','Cool','Coordination','Deception','Knowledge (Warfare)','Perception','Skulduggery','Stealth'],specs:{'Infiltrator':['Deception','Melee','Skulduggery','Streetwise'],'Scout':['Athletics','Medicine','Piloting (Planetary)','Survival'],'Slicer':['Computers','Knowledge (Education)','Knowledge (Underworld)','Stealth'],'Courier':['Athletics','Deception','Streetwise','Vigilance'],'Interrogator':['Charm','Coercion','Medicine','Perception'],'Sleeper Agent':['Charm','Cool','Discipline','Knowledge (Education)']}},

'Consular':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Cool','Discipline','Knowledge (Education)','Knowledge (Lore)','Leadership','Negotiation'],specs:{'Healer':['Discipline','Knowledge (Education)','Knowledge (Xenology)','Medicine'],'Niman Disciple':['Discipline','Leadership','Lightsaber','Negotiation'],'Sage':['Astrogation','Charm','Cool','Knowledge (Lore)'],'Arbiter':['Knowledge (Xenology)','Lightsaber','Negotiation','Perception'],'Ascetic':['Athletics','Discipline','Resilience','Vigilance'],'Teacher':['Knowledge (Education)','Knowledge (Lore)','Leadership','Perception']}},
'Guardian':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Brawl','Cool','Discipline','Melee','Resilience','Vigilance'],specs:{'Peacekeeper':['Discipline','Leadership','Perception','Piloting (Planetary)'],'Protector':['Athletics','Medicine','Ranged (Light)','Resilience'],'Soresu Defender':['Discipline','Knowledge (Lore)','Lightsaber','Vigilance'],'Armorer':['Knowledge (Outer Rim)','Lightsaber','Mechanics','Resilience'],'Warden':['Brawl','Coercion','Discipline','Knowledge (Underworld)'],'Warleader':['Leadership','Perception','Ranged (Light)','Survival']}},
'Mystic':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Charm','Coercion','Knowledge (Lore)','Knowledge (Outer Rim)','Perception','Vigilance'],specs:{'Advisor':['Charm','Deception','Negotiation','Streetwise'],'Makashi Duelist':['Charm','Cool','Coordination','Lightsaber'],'Seer':['Discipline','Knowledge (Lore)','Survival','Vigilance'],'Alchemist':['Knowledge (Education)','Knowledge (Xenology)','Medicine','Resilience'],'Magus':['Coercion','Discipline','Knowledge (Lore)','Medicine'],'Prophet':['Charm','Coercion','Deception','Leadership']}},
'Seeker':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Knowledge (Xenology)','Piloting (Planetary)','Piloting (Space)','Ranged (Heavy)','Survival','Vigilance'],specs:{'Ataru Striker':['Athletics','Coordination','Lightsaber','Perception'],'Hunter':['Coordination','Ranged (Heavy)','Stealth','Vigilance'],'Pathfinder':['Medicine','Ranged (Light)','Resilience','Survival'],'Executioner':['Discipline','Melee','Perception','Ranged (Heavy)'],'Hermit':['Discipline','Knowledge (Xenology)','Stealth','Survival'],'Navigator':['Astrogation','Knowledge (Outer Rim)','Perception','Survival']}},
'Sentinel':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Computers','Deception','Knowledge (Core Worlds)','Perception','Skulduggery','Stealth'],specs:{'Artisan':['Astrogation','Computers','Knowledge (Education)','Mechanics'],'Shadow':['Knowledge (Underworld)','Skulduggery','Stealth','Streetwise'],'Shien Expert':['Athletics','Lightsaber','Resilience','Skulduggery'],'Investigator':['Knowledge (Education)','Knowledge (Underworld)','Perception','Streetwise'],'Racer':['Cool','Coordination','Piloting (Planetary)','Piloting (Space)'],'Sentry':['Coordination','Lightsaber','Stealth','Vigilance']}},
'Warrior':{line:'Force and Destiny',careerPicks:3,forceStart:true,skills:['Athletics','Brawl','Cool','Melee','Perception','Survival'],specs:{'Aggressor':['Coercion','Knowledge (Underworld)','Ranged (Light)','Streetwise'],'Shii-Cho Knight':['Athletics','Coordination','Lightsaber','Melee'],'Starfighter Ace':['Astrogation','Gunnery','Mechanics','Piloting (Space)'],'Colossus':['Brawl','Discipline','Melee','Resilience'],'Juyo Berserker':['Coercion','Discipline','Lightsaber','Melee'],'Steel Hand Adept':['Brawl','Coordination','Discipline','Vigilance']}}
};

const SPECIALIZATION_DB=[
{name:'Advocate',career:'Diplomat',skills:['Coercion','Deception','Negotiation','Vigilance'],source:'Desperate Allies',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Analyst',career:'Diplomat',skills:['Computers','Knowledge (Education)','Knowledge (Warfare)','Perception'],source:'Desperate Allies',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Propagandist',career:'Diplomat',skills:['Charm','Deception','Knowledge (Warfare)','Perception'],source:'Desperate Allies',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Heavy',career:'Soldier',skills:['Gunnery','Perception','Ranged (Heavy)','Resilience'],source:'Forged in Battle',implementation:'Shared specialization · existing full source tree'},
{name:'Trailblazer',career:'Soldier',skills:['Knowledge (Outer Rim)','Perception','Stealth','Survival'],source:'Forged in Battle',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Vanguard',career:'Soldier',skills:['Athletics','Cool','Resilience','Vigilance'],source:'Forged in Battle',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Droid Specialist',career:'Engineer',skills:['Computers','Cool','Mechanics','Melee'],source:'Fully Operational',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Sapper',career:'Engineer',skills:['Athletics','Knowledge (Warfare)','Mechanics','Survival'],source:'Fully Operational',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Courier',career:'Spy',skills:['Athletics','Deception','Streetwise','Vigilance'],source:'Cyphers and Masks',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Interrogator',career:'Spy',skills:['Charm','Coercion','Medicine','Perception'],source:'Cyphers and Masks',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Sleeper Agent',career:'Spy',skills:['Charm','Cool','Discipline','Knowledge (Education)'],source:'Cyphers and Masks',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Arbiter',career:'Consular',skills:['Knowledge (Xenology)','Lightsaber','Negotiation','Perception'],source:'Disciples of Harmony',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Ascetic',career:'Consular',skills:['Athletics','Discipline','Resilience','Vigilance'],source:'Disciples of Harmony',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Teacher',career:'Consular',skills:['Knowledge (Education)','Knowledge (Lore)','Leadership','Perception'],source:'Disciples of Harmony',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Warden',career:'Guardian',skills:['Brawl','Coercion','Discipline','Knowledge (Underworld)'],source:'Keeping the Peace',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Warleader',career:'Guardian',skills:['Leadership','Perception','Ranged (Light)','Survival'],source:'Keeping the Peace',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Alchemist',career:'Mystic',skills:['Knowledge (Education)','Knowledge (Xenology)','Medicine','Resilience'],source:'Unlimited Power',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Magus',career:'Mystic',skills:['Coercion','Discipline','Knowledge (Lore)','Medicine'],source:'Unlimited Power',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Prophet',career:'Mystic',skills:['Charm','Coercion','Deception','Leadership'],source:'Unlimited Power',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Executioner',career:'Seeker',skills:['Discipline','Melee','Perception','Ranged (Heavy)'],source:'Savage Spirits',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Hermit',career:'Seeker',skills:['Discipline','Knowledge (Xenology)','Stealth','Survival'],source:'Savage Spirits',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Navigator',career:'Seeker',skills:['Astrogation','Knowledge (Outer Rim)','Perception','Survival'],source:'Savage Spirits',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Investigator',career:'Sentinel',skills:['Knowledge (Education)','Knowledge (Underworld)','Perception','Streetwise'],source:'Endless Vigil',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Racer',career:'Sentinel',skills:['Cool','Coordination','Piloting (Planetary)','Piloting (Space)'],source:'Endless Vigil',implementation:'Playable skill package · Phase 37 standardized progression tree'},
{name:'Sentry',career:'Sentinel',skills:['Coordination','Lightsaber','Stealth','Vigilance'],source:'Endless Vigil',implementation:'Playable skill package · Phase 37 standardized progression tree'},

{name:'Armorer',career:'Guardian',skills:['Knowledge (Outer Rim)','Lightsaber','Mechanics','Resilience'],source:'Keeping the Peace',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Colossus',career:'Warrior',skills:['Brawl','Discipline','Melee','Resilience'],source:'Knights of Fate',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Juyo Berserker',career:'Warrior',skills:['Coercion','Discipline','Lightsaber','Melee'],source:'Knights of Fate',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Steel Hand Adept',career:'Warrior',skills:['Brawl','Coordination','Discipline','Vigilance'],source:'Knights of Fate',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Shipwright',career:'Engineer',skills:['Gunnery','Knowledge (Education)','Mechanics','Piloting (Space)'],source:'Fully Operational',implementation:'Playable skill package · generic talent tree pending source import'},
{name:'Martial Artist',career:'Bounty Hunter',skills:['Athletics','Brawl','Coordination','Discipline'],source:'No Disintegrations',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Operator',career:'Bounty Hunter',skills:['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'],source:'No Disintegrations',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Skip Tracer',career:'Bounty Hunter',skills:['Cool','Knowledge (Underworld)','Negotiation','Skulduggery'],source:'No Disintegrations',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Charmer',career:'Smuggler',skills:['Charm','Cool','Leadership','Negotiation'],source:'Fly Casual',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Gambler',career:'Smuggler',skills:['Computers','Cool','Deception','Skulduggery'],source:'Fly Casual',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Gunslinger',career:'Smuggler',skills:['Coercion','Cool','Knowledge (Outer Rim)','Ranged (Light)'],source:'Fly Casual',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Cyber Tech',career:'Technician',skills:['Athletics','Mechanics','Medicine','Vigilance'],source:'Special Modifications',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Droid Tech',career:'Technician',skills:['Computers','Cool','Mechanics','Leadership'],source:'Special Modifications',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Modder',career:'Technician',skills:['Gunnery','Mechanics','Piloting (Space)','Streetwise'],source:'Special Modifications',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Demolitionist',career:'Hired Gun',skills:['Computers','Cool','Mechanics','Skulduggery'],source:'Dangerous Covenants',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Enforcer',career:'Hired Gun',skills:['Brawl','Coercion','Knowledge (Underworld)','Streetwise'],source:'Dangerous Covenants',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Heavy',career:'Hired Gun',skills:['Gunnery','Perception','Ranged (Heavy)','Resilience'],source:'Dangerous Covenants',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Entrepreneur',career:'Colonist',skills:['Discipline','Knowledge (Education)','Knowledge (Underworld)','Negotiation'],source:'Far Horizons',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Marshal',career:'Colonist',skills:['Coercion','Knowledge (Underworld)','Ranged (Light)','Vigilance'],source:'Far Horizons',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Performer',career:'Colonist',skills:['Charm','Coordination','Deception','Melee'],source:'Far Horizons',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Archaeologist',career:'Explorer',skills:['Athletics','Discipline','Knowledge (Education)','Knowledge (Lore)'],source:'Enter the Unknown',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Big-Game Hunter',career:'Explorer',skills:['Knowledge (Xenology)','Ranged (Heavy)','Stealth','Survival'],source:'Enter the Unknown',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Driver',career:'Explorer',skills:['Cool','Gunnery','Mechanics','Piloting (Planetary)'],source:'Enter the Unknown',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Figurehead',career:'Commander',skills:['Cool','Leadership','Negotiation','Knowledge (Core Worlds)'],source:'Lead by Example',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Instructor',career:'Commander',skills:['Discipline','Medicine','Ranged (Heavy)','Knowledge (Education)'],source:'Lead by Example',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Strategist',career:'Commander',skills:['Computers','Cool','Vigilance','Knowledge (Warfare)'],source:'Lead by Example',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Beast Rider',career:'Ace',skills:['Athletics','Knowledge (Xenology)','Perception','Survival'],source:'Stay on Target',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Hotshot',career:'Ace',skills:['Cool','Coordination','Piloting (Planetary)','Piloting (Space)'],source:'Stay on Target',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Rigger',career:'Ace',skills:['Gunnery','Knowledge (Underworld)','Mechanics','Resilience'],source:'Stay on Target',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Commodore',career:'Commander',skills:['Astrogation','Computers','Knowledge (Education)','Knowledge (Outer Rim)'],source:'Age of Rebellion Core',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Squadron Leader',career:'Commander',skills:['Gunnery','Mechanics','Piloting (Planetary)','Piloting (Space)'],source:'Age of Rebellion Core',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Tactician',career:'Commander',skills:['Brawl','Discipline','Leadership','Ranged (Heavy)'],source:'Age of Rebellion Core',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Driver',career:'Ace',skills:['Cool','Gunnery','Mechanics','Piloting (Planetary)'],source:'Age of Rebellion Core / Enter the Unknown',implementation:'Playable skill package · shared source-grounded 20-node talent tree'},
{name:'Gunner',career:'Ace',skills:['Discipline','Gunnery','Ranged (Heavy)','Resilience'],source:'Age of Rebellion Core',implementation:'Playable skill package · source-grounded 20-node talent tree'},
{name:'Pilot',career:'Ace',skills:['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'],source:'Age of Rebellion Core',implementation:'Playable skill package · source-grounded 20-node talent tree'}
];
const CAREER_SOURCE_DB={
'Bounty Hunter':'Edge of the Empire line','Smuggler':'Edge of the Empire line','Technician':'Edge of the Empire line','Hired Gun':'Edge of the Empire line','Explorer':'Edge of the Empire line','Colonist':'Edge of the Empire line','Commander':'Lead by Example','Ace':'Stay on Target',
'Consular':'Force and Destiny Core','Guardian':'Force and Destiny Core + Keeping the Peace','Mystic':'Force and Destiny Core','Seeker':'Force and Destiny Core','Sentinel':'Force and Destiny Core','Warrior':'Force and Destiny Core + Knights of Fate','Engineer':'Fully Operational'
};

function node(id,name,row,col,cost,effect,type='Passive',links=[]){return{id,name,row,col,cost,effect,type,links}}
const EXACT_TREES={
'Assassin':[
node('a00','Grit',0,0,5,'+1 strain threshold per rank.','Passive',['a10']),node('a01','Lethal Blows',0,1,5,'Improves Critical Injury results.','Passive',['a11']),node('a02','Stalker',0,2,5,'Boost Stealth and Coordination checks.','Passive',['a12']),node('a03','Dodge',0,3,5,'Spend strain to upgrade an incoming attack.','Active',['a13']),
node('a10','Precise Aim',1,0,10,'Spend strain to ignore target defense.','Active',['a00','a11','a20']),node('a11','Jump Up',1,1,10,'Stand from prone/seated as an incidental.','Active',['a01','a10','a12','a21']),node('a12','Quick Strike',1,2,10,'Boost attacks against targets that have not acted.','Passive',['a02','a11','a13','a22']),node('a13','Quick Draw',1,3,10,'Draw or holster once per round as an incidental.','Active',['a03','a12','a23']),
node('a20','Targeted Blow',2,0,15,'Spend Destiny after a hit to add Agility to damage.','Active',['a10','a30']),node('a21','Stalker',2,1,15,'Boost Stealth and Coordination checks.','Passive',['a11','a22','a31']),node('a22','Lethal Blows',2,2,15,'Improves Critical Injury results.','Passive',['a12','a21','a32']),node('a23','Anatomy Lessons',2,3,15,'Spend Destiny after a hit to add Intellect to damage.','Active',['a13','a33']),
node('a30','Stalker',3,0,20,'Boost Stealth and Coordination checks.','Passive',['a20','a31','a40']),node('a31','Sniper Shot',3,1,20,'Trade increased difficulty for additional weapon range.','Active',['a21','a30','a41']),node('a32','Dodge',3,2,20,'Spend strain to upgrade an incoming attack.','Active',['a22','a42']),node('a33','Lethal Blows',3,3,20,'Improves Critical Injury results.','Passive',['a23','a43']),
node('a40','Precise Aim',4,0,25,'Spend strain to ignore target defense.','Active',['a30','a41']),node('a41','Deadly Accuracy',4,1,25,'Selected combat skill adds its ranks to one hit.','Passive',['a31','a40']),node('a42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['a32']),node('a43','Master of Shadows',4,3,25,'Spend strain to reduce a Stealth/Skulduggery check difficulty.','Active',['a33'])],
'Scoundrel':[
node('s00','Black Market Contacts',0,0,5,'Can trade higher price for lower illegal-item rarity.','Active',['s10']),node('s01','Convincing Demeanor',0,1,5,'Remove setback from Deception and Skulduggery.','Passive',[]),node('s02','Quick Draw',0,2,5,'Draw or holster once per round as an incidental.','Active',[]),node('s03','Rapid Reaction',0,3,5,'Spend strain to improve initiative.','Active',['s13']),
node('s10','Convincing Demeanor',1,0,10,'Remove setback from Deception and Skulduggery.','Passive',['s00','s11','s20']),node('s11','Black Market Contacts',1,1,10,'Can trade higher price for lower illegal-item rarity.','Active',['s10','s12','s21']),node('s12','Convincing Demeanor',1,2,10,'Remove setback from Deception and Skulduggery.','Passive',['s11','s22']),node('s13','Quick Strike',1,3,10,'Boost attacks against targets that have not acted.','Passive',['s03','s23']),
node('s20','Hidden Storage',2,0,15,'Creates concealed carrying capacity.','Passive',['s10','s30']),node('s21','Toughened',2,1,15,'+2 wound threshold per rank.','Passive',['s11','s31']),node('s22','Black Market Contacts',2,2,15,'Can trade higher price for lower illegal-item rarity.','Active',['s12','s32']),node('s23','Side Step',2,3,15,'Spend strain to upgrade incoming ranged attacks.','Active',['s13','s33']),
node('s30','Toughened',3,0,20,'+2 wound threshold per rank.','Passive',['s20','s40']),node('s31','Rapid Reaction',3,1,20,'Spend strain to improve initiative.','Active',['s21','s41']),node('s32','Hidden Storage',3,2,20,'Creates concealed carrying capacity.','Passive',['s22','s42']),node('s33','Side Step',3,3,20,'Spend strain to upgrade incoming ranged attacks.','Active',['s23','s43']),
node('s40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['s30','s41']),node('s41','Natural Charmer',4,1,25,'Once per session, reroll one Charm or Deception check.','Active',['s31','s40']),node('s42','Soft Spot',4,2,25,'Spend Destiny after a hit to add Cunning to damage.','Active',['s32','s43']),node('s43','Quick Strike',4,3,25,'Boost attacks against targets that have not acted.','Passive',['s33','s42'])],
'Slicer':[
node('z00','Codebreaker',0,0,5,'Better at decrypting and breaking codes.','Passive',['z10']),node('z01','Grit',0,1,5,'+1 strain threshold per rank.','Passive',['z11']),node('z02','Technical Aptitude',0,2,5,'Computer tasks take less time.','Passive',['z12']),node('z03','Bypass Security',0,3,5,'Remove setback from locks and security devices.','Passive',['z13']),
node('z10','Defensive Slicing',1,0,10,'Makes hostile slicing checks harder.','Passive',['z00','z11','z20']),node('z11','Technical Aptitude',1,1,10,'Computer tasks take less time.','Passive',['z01','z10','z12','z21']),node('z12','Grit',1,2,10,'+1 strain threshold per rank.','Passive',['z02','z11','z13','z22']),node('z13','Bypass Security',1,3,10,'Remove setback from locks and security devices.','Passive',['z03','z12','z23']),
node('z20','Natural Programmer',2,0,15,'Once per session, reroll Computers or Astrogation.','Active',['z10','z30']),node('z21','Bypass Security',2,1,15,'Remove setback from locks and security devices.','Passive',['z11','z31']),node('z22','Defensive Slicing',2,2,15,'Makes hostile slicing checks harder.','Passive',['z12','z32']),node('z23','Grit',2,3,15,'+1 strain threshold per rank.','Passive',['z13','z33']),
node('z30','Defensive Slicing',3,0,20,'Makes hostile slicing checks harder.','Passive',['z20','z31','z40']),node('z31','Improved Defensive Slicing',3,1,20,'Upgrades hostile slicing difficulty.','Passive',['z21','z30','z32','z41']),node('z32','Codebreaker',3,2,20,'Better at decrypting and breaking codes.','Passive',['z22','z31','z42']),node('z33','Resolve',3,3,20,'Reduce involuntary strain suffered.','Passive',['z23','z43']),
node('z40','Skilled Slicer',4,0,25,'Advances quickly through a computer system after success.','Active',['z30','z41']),node('z41','Master Slicer',4,1,25,'Spend strain to reduce slicing difficulty.','Active',['z31','z40']),node('z42','Mental Fortress',4,2,25,'Spend Destiny to ignore some mental critical effects.','Active',['z32','z43']),node('z43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['z33','z42'])],

'Armorer':[
node('ar00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['ar10']),
node('ar01','Toughened',0,1,5,'Increase wound threshold by 2.','Passive',['ar11']),
node('ar02','Gearhead',0,2,5,'Remove setback from Mechanics checks; attachment modification costs are reduced.','Passive',['ar12']),
node('ar03','Inventor',0,3,5,'Improve checks to construct items or modify attachments.','Passive',['ar13']),
node('ar10','Saber Throw',1,0,10,'Make a Force-assisted ranged lightsaber attack and call the weapon back.','Force Active',['ar00','ar20']),
node('ar11','Armor Master',1,1,10,'While wearing armor, increase total soak by 1.','Passive',['ar01','ar12','ar21']),
node('ar12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['ar02','ar11']),
node('ar13','Gearhead',1,3,10,'Additional rank of Gearhead.','Passive',['ar03','ar23']),
node('ar20','Toughened',2,0,15,'Increase wound threshold by 2.','Passive',['ar10','ar30']),
node('ar21','Improved Armor Master',2,1,15,'Armor with soak 2 or more also grants +1 defense.','Passive',['ar11','ar22','ar31']),
node('ar22','Inventor',2,2,15,'Additional rank of Inventor.','Passive',['ar21','ar32']),
node('ar23','Mental Tools',2,3,15,'Always count as having suitable tools for Mechanics checks.','Force Passive',['ar13','ar33']),
node('ar30','Comprehend Technology',3,0,20,'Use Force insight to operate an unfamiliar device using temporary skill ranks.','Force Active',['ar20','ar31','ar40']),
node('ar31','Tinkerer',3,1,20,'Add one hard point to a limited number of items.','Passive',['ar21','ar30','ar32','ar41']),
node('ar32','Falling Avalanche',3,2,20,'Suffer strain to add Brawn to the next successful Lightsaber hit.','Force Active',['ar22','ar31','ar33','ar42']),
node('ar33','Supreme Armor Master',3,3,20,'Once per round, suffer strain to reduce the result of a Critical Injury based on soak.','Active',['ar23','ar32','ar43']),
node('ar40','Force Rating',4,0,25,'Increase Force Rating by 1.','Force Passive',['ar30','ar41']),
node('ar41','Imbue Item',4,1,25,'Commit a Force die to temporarily improve one item while paying strain each round.','Force Active',['ar31','ar40','ar42']),
node('ar42','Reinforce Item',4,2,25,'Commit Force dice to grant Cortosis temporarily to a weapon or armor.','Force Active',['ar32','ar41']),
node('ar43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['ar33'])
],

'Colossus':[
node('co00','Toughened',0,0,5,'Increase wound threshold by 2.','Passive',['co10']),
node('co01','Durable',0,1,5,'Reduce Critical Injury rolls suffered by 10.','Passive',['co11']),
node('co02','Hard Headed',0,2,5,'Attempt a Discipline check to clear staggered or disoriented.','Active',['co12']),
node('co03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['co13']),
node('co10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['co00','co20']),
node('co11','Durable',1,1,10,'Additional rank of Durable.','Passive',['co01','co21']),
node('co12','Hard Headed',1,2,10,'Additional rank reduces the Hard Headed difficulty.','Active',['co02','co22']),
node('co13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['co03','co23']),
node('co20','Toughened',2,0,15,'Increase wound threshold by 2.','Passive',['co10','co30']),
node('co21','Durable',2,1,15,'Additional rank of Durable.','Passive',['co11','co31']),
node('co22','Headbutt',2,2,15,'Once per encounter, suffer wounds to knock down and disorient an engaged target.','Active',['co12','co32']),
node('co23','Enduring',2,3,15,'Increase soak by 1.','Passive',['co13','co33']),
node('co30','Toughened',3,0,20,'Increase wound threshold by 2.','Passive',['co20','co40']),
node('co31','Unstoppable',3,1,20,'A Critical Injury result reduced to 1 can be completely ignored.','Passive',['co21','co41']),
node('co32','Improved Hard Headed',3,2,20,'Hard Headed can recover from strain incapacitation on the following turn.','Active',['co22','co42']),
node('co33','Indomitable Will',3,3,20,'Commit Force dice to reduce incoming damage while paying strain each turn.','Force Active',['co23','co43']),
node('co40','Improved Toughened',4,0,25,'Once per session, heal wounds equal to ranks in Toughened.','Active',['co30','co41']),
node('co41','Heroic Fortitude',4,1,25,'Spend Destiny to ignore Critical Injury effects on Brawn and Agility checks until encounter end.','Active',['co31','co40','co42']),
node('co42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['co32','co41','co43']),
node('co43','Power From Pain',4,3,25,'Once per session, spend Destiny to gain Force Rating for each Critical Injury until encounter end.','Force Active',['co33','co42'])
],

'Juyo Berserker':[
node('ju00','Toughened',0,0,5,'Increase wound threshold by 2.','Passive',['ju10']),
node('ju01','Parry',0,1,5,'Reduce melee-hit damage by suffering strain.','Active',['ju11']),
node('ju02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['ju12']),
node('ju03','Intimidating',0,3,5,'Suffer strain to modify Coercion difficulty.','Active',['ju13']),
node('ju10','Inner Peace',1,0,10,'Once per encounter, convert dark Destiny to light and reduce this session’s Conflict.','Active',['ju00','ju11','ju20']),
node('ju11','Parry',1,1,10,'Additional rank of Parry.','Active',['ju01','ju10','ju12','ju21']),
node('ju12','Vaapad Control',1,2,10,'Suffer 1 strain to downgrade a Lightsaber check based on light Destiny in the pool.','Force Active',['ju02','ju11','ju22']),
node('ju13','Lethal Blows',1,3,10,'Add +10 to Critical Injury results inflicted.','Passive',['ju03','ju23']),
node('ju20','Balance',2,0,15,'At encounter end, use Force dice to recover additional strain.','Force Active',['ju10','ju30']),
node('ju21','Lethal Blows',2,1,15,'Additional rank of Lethal Blows.','Passive',['ju11','ju22','ju31']),
node('ju22','Quick Strike',2,2,15,'Gain Boost against a target that has not acted.','Passive',['ju12','ju21','ju32']),
node('ju23','Embrace Your Hate',2,3,15,'Spend Destiny after a successful melee attack; gain Conflict to add damage based on dark Destiny.','Force Active',['ju13','ju33']),
node('ju30','Inner Peace',3,0,20,'Additional rank of Inner Peace.','Active',['ju20','ju40']),
node('ju31','Intimidating',3,1,20,'Additional rank of Intimidating.','Active',['ju21','ju41']),
node('ju32','Juyo Savagery',3,2,20,'Lightsaber Critical Injury rolls gain +5 per dark Destiny point in the pool.','Force Passive',['ju22','ju42']),
node('ju33','Quick Strike',3,3,20,'Additional rank of Quick Strike.','Passive',['ju23','ju43']),
node('ju40','Parry',4,0,25,'Additional rank of Parry.','Active',['ju30','ju41']),
node('ju41','Embrace Your Hate',4,1,25,'Second rank of Embrace Your Hate.','Force Active',['ju31','ju40','ju42']),
node('ju42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['ju32','ju41','ju43']),
node('ju43','Multiple Opponents',4,3,25,'Gain Boost in close combat while engaged with multiple opponents.','Passive',['ju33','ju42'])
],

'Steel Hand Adept':[
node('sha00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['sha10']),
node('sha01','Iron Body',0,1,5,'Remove setback from Coordination and Resilience; reduce unarmed Critical rating.','Passive',['sha11']),
node('sha02','Iron Body',0,2,5,'Additional rank of Iron Body.','Passive',['sha12']),
node('sha03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',['sha13']),
node('sha10','Martial Grace',1,0,10,'Once per round, suffer strain to add Coordination ranks to one successful Brawl hit.','Active',['sha00','sha20']),
node('sha11',"Acklay's Scything Strike",1,1,10,'Unarmed Brawl attacks gain Pierce equal to Force Rating.','Force Passive',['sha01','sha21']),
node('sha12','Unarmed Parry',1,2,10,'Parry while unarmed and reduce its strain cost.','Passive',['sha02','sha22']),
node('sha13','Precision Strike',1,3,10,'Alter a Brawl/Melee/Lightsaber Critical Injury to an Easy result by suffering strain.','Active',['sha03','sha23']),
node('sha20','Dodge',2,0,15,'Suffer strain to upgrade an incoming combat check.','Active',['sha10','sha21','sha30']),
node('sha21','Swift',2,1,15,'Ignore extra movement penalties from difficult terrain.','Passive',['sha11','sha20','sha22','sha31']),
node('sha22','Parry',2,2,15,'Reduce melee-hit damage by suffering strain.','Active',['sha12','sha21','sha23','sha32']),
node('sha23','Improved Precision Strike',2,3,15,'Once per round, alter a Brawl/Melee Critical Injury to an Average result by suffering strain.','Active',['sha13','sha22','sha33']),
node('sha30','Improved Dodge',3,0,20,'After using Dodge, reposition after the triggering attack resolves.','Active',['sha20','sha40']),
node('sha31','Toughened',3,1,20,'Increase wound threshold by 2.','Passive',['sha21','sha41']),
node('sha32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['sha22','sha42']),
node('sha33','Sapith Sundering',3,3,20,'Add Force dice to Brawl; the attack gains Sunder and can activate it with Force results.','Force Active',['sha23','sha43']),
node('sha40','Force Rating',4,0,25,'Increase Force Rating by 1.','Force Passive',['sha30','sha41']),
node('sha41','Far Strike',4,1,25,'Make a Force-assisted Brawl attack at range, extending to Long with Force points.','Force Active',['sha31','sha40']),
node('sha42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['sha32','sha43']),
node('sha43','Dodge',4,3,25,'Additional rank of Dodge.','Active',['sha33','sha42'])
]
};


const EOTE_CAREER_BOOK_TREES={
'Martial Artist':[
node('ma00','Iron Body',0,0,5,'Remove Setback from Coordination and Resilience checks; reduce the Critical rating of unarmed attacks.','Passive',['ma10']),
node('ma01','Parry',0,1,5,'Suffer strain to reduce damage from a melee hit.','Active',['ma10']),
node('ma02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['ma12']),
node('ma03','Precision Strike',0,3,5,'When inflicting a close-combat Critical Injury, suffer strain to choose an Easy result.','Active',['ma13']),
node('ma10','Parry',1,0,10,'Additional rank of Parry.','Active',['ma00','ma01','ma11','ma20']),
node('ma11','Toughened',1,1,10,'Increase wound threshold by 2.','Passive',['ma10','ma12','ma21']),
node('ma12','Martial Grace',1,2,10,'Once per round, suffer strain to add Coordination ranks to one successful Brawl hit.','Active',['ma02','ma11','ma22']),
node('ma13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['ma03','ma23']),
node('ma20','Unarmed Parry',2,0,15,'Parry while unarmed and reduce its strain cost.','Passive',['ma10','ma21','ma30']),
node('ma21','Grapple',2,1,15,'Once per round, make it harder for engaged opponents to disengage.','Active',['ma11','ma20','ma31']),
node('ma22','Iron Body',2,2,15,'Additional rank of Iron Body.','Passive',['ma12','ma23','ma32']),
node('ma23','Improved Precision Strike',2,3,15,'Once per round, suffer strain to choose an Average Critical Injury result on a close-combat hit.','Active',['ma13','ma22','ma33']),
node('ma30','Overbalance',3,0,20,'Certain negative results on an engaged foe’s combat check can stagger that foe briefly.','Passive',['ma20']),
node('ma31','Toughened',3,1,20,'Increase wound threshold by 2.','Passive',['ma21','ma41']),
node('ma32','Mind Over Matter',3,2,20,'Spend Destiny to recover strain equal to Willpower.','Active',['ma22','ma42']),
node('ma33','Grit',3,3,20,'Increase strain threshold by 1.','Passive',['ma23','ma43']),
node('ma40','Coordination Dodge',4,0,25,'When targeted by a combat check, spend Destiny to add failures based on Coordination.','Active',['ma41']),
node('ma41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['ma31','ma40','ma42']),
node('ma42','Natural Brawler',4,2,25,'Once per session, reroll one Brawl or Melee check.','Active',['ma32','ma41']),
node('ma43','Supreme Precision Strike',4,3,25,'Once per session, suffer strain to choose a Hard Critical Injury result on an unarmed hit.','Active',['ma33'])
],
'Operator':[
node('op00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['op10']),
node('op01','Galaxy Mapper',0,1,5,'Remove Setback from Astrogation checks and reduce route-calculation time.','Passive',['op11']),
node('op02','Shortcut',0,2,5,'Add Boost to chase checks made to catch or escape an opponent.','Passive',['op12']),
node('op03','Overwhelm Defenses',0,3,5,'After an unsuccessful vehicle-weapon attack, spend Advantage to reduce defense in the targeted zone.','Active',['op13']),
node('op10','Full Throttle',1,0,10,'Hard Piloting action can temporarily increase vehicle top speed.','Active',['op00','op11','op20']),
node('op11','Planet Mapper',1,1,10,'Remove Setback from Streetwise or Survival checks to navigate a planet and reduce travel time.','Passive',['op01','op10','op21']),
node('op12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['op02','op22']),
node('op13','Debilitating Shot',1,3,10,'Spend Advantage on a successful vehicle attack to reduce the target’s maximum speed temporarily.','Active',['op03','op23']),
node('op20','Skilled Jockey',2,0,15,'Remove Setback from Piloting (Planetary) and Piloting (Space) checks.','Passive',['op10']),
node('op21','All-Terrain Driver',2,1,15,'Ignore the usual piloting penalties for difficult terrain.','Passive',['op11','op22','op31']),
node('op22','Offensive Driving',2,2,15,'Maneuver: suffer system strain to upgrade an enemy vehicle’s next Piloting difficulty.','Active',['op12','op21','op32']),
node('op23','Grit',2,3,15,'Increase strain threshold by 1.','Passive',['op13','op33']),
node('op30',"Let's Ride",3,0,20,'Once per round, mount/dismount or enter a cockpit or weapon station as an incidental.','Active',['op31','op40']),
node('op31','Shortcut',3,1,20,'Additional rank of Shortcut.','Passive',['op21','op30','op41']),
node('op32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['op22','op42']),
node('op33','Overwhelm Defenses',3,3,20,'Additional rank of Overwhelm Defenses.','Active',['op23','op43']),
node('op40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['op30','op41']),
node('op41','Improved Shortcut',4,1,25,'In a chase or race, suffer strain to add success based on Shortcut ranks.','Active',['op31','op40','op42']),
node('op42','Skilled Jockey',4,2,25,'Additional rank of Skilled Jockey.','Passive',['op32','op41']),
node('op43','Hindering Shot',4,3,25,'Make the next Gunnery attack harder; on a hit the target suffers system strain when it moves.','Active',['op33'])
],
'Skip Tracer':[
node('st00','Bypass Security',0,0,5,'Remove Setback from checks to disable security devices or open locked doors.','Passive',['st10']),
node('st01','Hard-Boiled',0,1,5,'When recovering strain after an encounter, spend Advantage to recover wounds.','Passive',['st11']),
node('st02','Good Cop',0,2,5,'Spend Advantage from Charm or Negotiation to improve an ally’s next social check against the same target.','Passive',['st12']),
node('st03','Rapid Recovery',0,3,5,'Recover one additional strain per rank after an encounter.','Passive',['st13']),
node('st10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['st00','st20']),
node('st11','Expert Tracker',1,1,10,'Remove Setback from tracking checks and reduce tracking time.','Passive',['st01','st21']),
node('st12','Street Smarts',1,2,10,'Remove Setback from Streetwise and Knowledge (Underworld) checks.','Passive',['st02','st22']),
node('st13','Bought Info',1,3,10,'Pay credits to reduce the difficulty of a Knowledge check.','Active',['st03','st23']),
node('st20','Hard-Boiled',2,0,15,'Additional rank of Hard-Boiled.','Passive',['st10','st21','st30']),
node('st21','Rapid Recovery',2,1,15,'Additional rank of Rapid Recovery.','Passive',['st11','st20']),
node('st22','Improved Street Smarts',2,2,15,'Once per session, use a hard Streetwise or Knowledge (Underworld) check to learn a vital clue.','Active',['st12','st32']),
node('st23','Street Smarts',2,3,15,'Additional rank of Street Smarts.','Passive',['st13','st33']),
node('st30','Bypass Security',3,0,20,'Additional rank of Bypass Security.','Passive',['st20']),
node('st31',"Nobody's Fool",3,1,20,'Upgrade incoming Charm, Coercion, and Deception checks once per rank.','Passive',['st32','st41']),
node('st32','Good Cop',3,2,20,'Additional rank of Good Cop.','Passive',['st22','st31','st42']),
node('st33','Informant',3,3,20,'Once per session, reveal a contact who can shed light on a chosen subject.','Active',['st23','st43']),
node('st40','Reconstruct the Scene',4,0,25,'Hard Perception action can identify physical characteristics of a person present at the scene recently.','Active',['st41']),
node('st41','Hard-Boiled',4,1,25,'Additional rank of Hard-Boiled.','Passive',['st31','st40','st42']),
node('st42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['st32','st41']),
node('st43','Soft Spot',4,3,25,'Spend Destiny after a successful hit to add Cunning to damage.','Active',['st33'])
],
'Charmer':[
node('ch00','Smooth Talker',0,0,5,'Choose a social skill; Triumph can add extra success based on ranks.','Active',['ch10']),
node('ch01','Inspiring Rhetoric',0,1,5,'Leadership action recovers strain for allies at short range.','Active',['ch11']),
node('ch02','Kill with Kindness',0,2,5,'Remove Setback from Charm and Leadership checks.','Passive',['ch12']),
node('ch03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['ch13']),
node('ch10','Kill with Kindness',1,0,10,'Additional rank of Kill with Kindness.','Passive',['ch00','ch20']),
node('ch11','Improved Inspiring Rhetoric',1,1,10,'Allies helped by Inspiring Rhetoric also gain Boost dice temporarily.','Passive',['ch01','ch12']),
node('ch12','Congenial',1,2,10,'Suffer strain to reduce Charm/Negotiation difficulty or make hostile social checks harder.','Active',['ch02','ch11','ch22']),
node('ch13','Plausible Deniability',1,3,10,'Remove Setback from Coercion and Deception checks.','Passive',['ch03','ch23']),
node('ch20','Disarming Smile',2,0,15,'Opposed Charm action can reduce a target’s defenses for the encounter.','Active',['ch10','ch30']),
node('ch21','Works Like a Charm',2,1,15,'Once per session, use Presence instead of the characteristic normally linked to one check.','Active',['ch22']),
node('ch22','Disarming Smile',2,2,15,'Additional rank of Disarming Smile.','Active',['ch12','ch21','ch32']),
node('ch23','Grit',2,3,15,'Increase strain threshold by 1.','Passive',['ch13','ch33']),
node('ch30','Smooth Talker',3,0,20,'Additional rank of Smooth Talker.','Active',['ch20','ch31','ch40']),
node('ch31','Congenial',3,1,20,'Additional rank of Congenial.','Active',['ch30']),
node('ch32','Just Kidding!',3,2,20,'Spend Destiny to ignore a Despair on a nearby allied social check.','Active',['ch22','ch33','ch42']),
node('ch33','Intense Presence',3,3,20,'Spend Destiny to recover strain equal to Presence.','Active',['ch23','ch32','ch43']),
node('ch40','Natural Charmer',4,0,25,'Once per session, reroll one Charm or Deception check.','Active',['ch30','ch41']),
node('ch41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['ch40']),
node('ch42',"Don't Shoot!",4,2,25,'Once per session, a Hard Charm action can prevent enemies from targeting the character until they attack.','Active',['ch32','ch43']),
node('ch43','Resolve',4,3,25,'Reduce involuntary strain suffered, to a minimum of 1.','Passive',['ch33','ch42'])
],
'Gambler':[
node('ga00','Convincing Demeanor',0,0,5,'Remove Setback from Deception and Skulduggery checks.','Passive',['ga10']),
node('ga01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',['ga11']),
node('ga02','Toughened',0,2,5,'Increase wound threshold by 2.','Passive',['ga12']),
node('ga03','Up the Ante',0,3,5,'Win additional credits when gambling.','Passive',['ga13']),
node('ga10','Grit',1,0,10,'Increase strain threshold by 1.','Passive',['ga00','ga20']),
node('ga11','Second Chances',1,1,10,'Once per encounter, reroll a number of positive dice up to ranks.','Active',['ga01','ga21']),
node('ga12','Dedication',1,2,10,'Increase one characteristic by 1, maximum 6.','Passive',['ga13']),
node('ga13','Supreme Double or Nothing',1,3,10,'Double or Nothing also doubles remaining Triumph and Despair.','Passive',['ga03','ga12','ga23']),
node('ga20','Second Chances',2,0,15,'Additional rank of Second Chances.','Active',['ga10','ga30']),
node('ga21','Convincing Demeanor',2,1,15,'Additional rank of Convincing Demeanor.','Passive',['ga11','ga31']),
node('ga22','Fortune Favors the Bold',2,2,15,'Once per session, suffer 2 strain to flip one dark Destiny Point to light.','Active',['ga32']),
node('ga23','Natural Rogue',2,3,15,'Once per session, reroll one Skulduggery or Stealth check.','Active',['ga13','ga33']),
node('ga30','Up the Ante',3,0,20,'Additional rank of Up the Ante.','Passive',['ga20','ga40']),
node('ga31','Up the Ante',3,1,20,'Additional rank of Up the Ante.','Passive',['ga21','ga32']),
node('ga32','Clever Solution',3,2,20,'Once per session, make one skill check using Cunning instead of its normal characteristic.','Active',['ga22','ga31','ga33','ga42']),
node('ga33','Second Chances',3,3,20,'Additional rank of Second Chances.','Active',['ga23','ga32','ga43']),
node('ga40','Double or Nothing',4,0,25,'Suffer 2 strain and increase a check’s difficulty to double remaining positive symbols.','Active',['ga30','ga41']),
node('ga41','Smooth Talker',4,1,25,'Choose a social skill; Triumph can add extra success based on ranks.','Active',['ga40','ga42']),
node('ga42','Natural Negotiator',4,2,25,'Once per session, reroll one Cool or Negotiation check.','Active',['ga32','ga41','ga43']),
node('ga43','Improved Double or Nothing',4,3,25,'Double or Nothing also doubles remaining success.','Passive',['ga33','ga42'])
],
'Gunslinger':[
node('gs00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['gs10']),
node('gs01','Quick Strike',0,1,5,'Add Boost against targets that have not acted yet this encounter.','Passive',['gs11']),
node('gs02','Rapid Reaction',0,2,5,'Suffer strain to add Success to Initiative checks.','Active',['gs12']),
node('gs03','Quick Draw',0,3,5,'Once per round, draw or holster a weapon or accessible item as an incidental.','Active',['gs13']),
node('gs10','Lethal Blows',1,0,10,'Add +10 per rank to Critical Injury results inflicted.','Passive',['gs00','gs20']),
node('gs11','Grit',1,1,10,'Increase strain threshold by 1.','Passive',['gs01','gs21']),
node('gs12','Quick Strike',1,2,10,'Additional rank of Quick Strike.','Passive',['gs02','gs22']),
node('gs13','Improved Quick Draw',1,3,10,'Quick Draw may be used twice per round.','Passive',['gs03','gs23']),
node('gs20','Toughened',2,0,15,'Increase wound threshold by 2.','Passive',['gs10','gs30']),
node('gs21',"Call 'Em",2,1,15,'Ignore the special combat penalty for using Aim to target a specific location.','Passive',['gs11','gs31']),
node('gs22','Dodge',2,2,15,'Suffer strain to upgrade an incoming combat check.','Active',['gs12','gs23','gs32']),
node('gs23','Sorry About the Mess',2,3,15,'Reduce a weapon’s Critical rating by 1 against targets that have not acted yet.','Passive',['gs13','gs22','gs33']),
node('gs30','Confidence',3,0,20,'Reduce fear-check difficulty.','Passive',['gs20','gs31','gs40']),
node('gs31','Lethal Blows',3,1,20,'Additional rank of Lethal Blows.','Passive',['gs21','gs30','gs41']),
node('gs32','Guns Blazing',3,2,20,'Suffer strain to avoid increasing difficulty when attacking with two Ranged (Light) weapons.','Active',['gs22','gs33','gs42']),
node('gs33','Rapid Reaction',3,3,20,'Additional rank of Rapid Reaction.','Active',['gs23','gs32','gs43']),
node('gs40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['gs30','gs41']),
node('gs41','Spitfire',4,1,25,'After a successful two-pistol attack, extra hits may be allocated to other targets in range.','Passive',['gs31','gs40']),
node('gs42','Natural Marksman',4,2,25,'Once per session, reroll one Ranged (Light) or Ranged (Heavy) check.','Active',['gs32']),
node('gs43','Deadly Accuracy',4,3,25,'Choose a combat skill; add its ranks to one hit of a successful attack.','Passive',['gs33'])
]
};
Object.assign(EXACT_TREES,EOTE_CAREER_BOOK_TREES);


const EOTE_TECH_HIRED_TREES={
'Cyber Tech':[
node('ct00','Cyberneticist',0,0,5,'Remove Setback from checks to build, repair, or install cybernetics; cybernetic purchases cost less.','Passive',['ct10']),
node('ct01','More Machine than Man',0,1,5,'Increase the character’s cybernetic implant limit by 1 per rank.','Passive',['ct11']),
node('ct02','Engineered Redundancies',0,2,5,'Emergency repair patches can heal the character; Mechanics can be used to treat their wounds.','Passive',['ct12']),
node('ct03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',['ct13']),
node('ct10','Eye for Detail',1,0,10,'After a Mechanics or Computers check, suffer strain to convert successes into advantages.','Active',['ct00','ct20']),
node('ct11','Toughened',1,1,10,'Increase wound threshold by 2.','Passive',['ct01','ct12','ct21']),
node('ct12','Energy Transfer',1,2,10,'Suffer strain to power an unpowered device or replenish an exhausted energy source.','Active',['ct02','ct11','ct13','ct22']),
node('ct13','Cyberneticist',1,3,10,'Additional rank of Cyberneticist.','Passive',['ct03','ct12','ct23']),
node('ct20','Overcharge',2,0,15,'Once per encounter, make a hard Mechanics action to temporarily overcharge an installed cybernetic.','Active',['ct10','ct21','ct30']),
node('ct21','More Machine than Man',2,1,15,'Additional rank of More Machine than Man.','Passive',['ct11','ct20','ct22','ct31']),
node('ct22','Durable',2,2,15,'Reduce Critical Injury rolls suffered by 10 per rank, minimum 1.','Passive',['ct12','ct21','ct23','ct32']),
node('ct23','Surgeon',2,3,15,'Medicine wound treatment heals +1 wound per rank.','Passive',['ct13','ct22','ct33']),
node('ct30','Improved Overcharge',3,0,20,'Overcharge can spend favorable narrative results to immediately take another action.','Passive',['ct20','ct31','ct40']),
node('ct31','Utility Belt',3,1,20,'Spend Destiny to produce a plausible undocumented item or weapon from a tool belt or satchel.','Active',['ct21','ct30','ct32','ct41']),
node('ct32','More Machine than Man',3,2,20,'Additional rank of More Machine than Man.','Passive',['ct22','ct31','ct33','ct42']),
node('ct33','Surgeon',3,3,20,'Additional rank of Surgeon.','Passive',['ct23','ct32','ct43']),
node('ct40','More Machine than Man',4,0,25,'Additional rank of More Machine than Man.','Passive',['ct30','ct41']),
node('ct41','Durable',4,1,25,'Additional rank of Durable.','Passive',['ct31','ct40','ct42']),
node('ct42','Supreme Overcharge',4,2,25,'Overcharge may be used on any number of installed cybernetics; a Despair can short one out.','Passive',['ct32','ct41','ct43']),
node('ct43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['ct33','ct42'])
],
'Droid Tech':[
node('dt00','Machine Mender',0,0,5,'Mechanics checks that heal a droid restore +1 wound per rank.','Passive',['dt10']),
node('dt01','Hidden Storage',0,1,5,'Gain concealed storage capacity in a vehicle or item equal to ranks.','Passive',['dt11']),
node('dt02','Speaks Binary',0,2,5,'When directing NPC droids, grant Boost dice based on ranks.','Passive',['dt12']),
node('dt03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['dt13']),
node('dt10','Deft Maker',1,0,10,'Remove Setback from droid repair/modification/construction checks and reduce material cost.','Passive',['dt00','dt11','dt20']),
node('dt11','Eye for Detail',1,1,10,'After a Mechanics or Computers check, suffer strain to convert successes into advantages.','Active',['dt01','dt10','dt21']),
node('dt12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['dt02','dt13','dt22']),
node('dt13','Speaks Binary',1,3,10,'Additional rank of Speaks Binary.','Passive',['dt03','dt12','dt23']),
node('dt20','Grit',2,0,15,'Increase strain threshold by 1.','Passive',['dt10','dt30']),
node('dt21','Supreme Speaks Binary',2,1,15,'Once per encounter, temporarily let directed NPC droids use one of the character’s skill ranks.','Active',['dt11','dt22','dt31']),
node('dt22','Improved Speaks Binary',2,2,15,'Directed NPC droids gain an additional Boost die.','Passive',['dt12','dt21','dt32']),
node('dt23','Hidden Storage',2,3,15,'Additional rank of Hidden Storage.','Passive',['dt13','dt33']),
node('dt30','Redundant Systems',3,0,20,'Once per session, use Mechanics and parts from a functioning device to repair a broken one.','Active',['dt20','dt40']),
node('dt31','Machine Mender',3,1,20,'Additional rank of Machine Mender.','Passive',['dt21','dt32','dt41']),
node('dt32','Speaks Binary',3,2,20,'Additional rank of Speaks Binary.','Passive',['dt22','dt31','dt33','dt42']),
node('dt33','Deft Maker',3,3,20,'Additional rank of Deft Maker.','Passive',['dt23','dt32','dt43']),
node('dt40','Eye for Detail',4,0,25,'Additional rank of Eye for Detail.','Active',['dt30','dt41']),
node('dt41','Reroute Processors',4,1,25,'Once per encounter, a Computers action can shift one point between two droid characteristics.','Active',['dt31','dt40','dt42']),
node('dt42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['dt32','dt41','dt43']),
node('dt43','Machine Mender',4,3,25,'Additional rank of Machine Mender.','Passive',['dt33','dt42'])
],
'Modder':[
node('md00','Tinkerer',0,0,5,'Add one hard point to a number of items equal to ranks; each item may be modified once.','Passive',['md10']),
node('md01','Resolve',0,1,5,'Reduce involuntary strain suffered by 1 per rank, minimum 1.','Passive',['md11']),
node('md02','Know Somebody',0,2,5,'Once per session reduce the rarity of a legal purchase by ranks.','Active',['md12']),
node('md03','Signature Vehicle',0,3,5,'Choose a vehicle as the signature vehicle and upgrade Mechanics checks made on it.','Passive',['md13']),
node('md10','Gearhead',1,0,10,'Remove Setback from Mechanics checks and reduce attachment-mod costs.','Passive',['md00','md11','md20']),
node('md11','Tinkerer',1,1,10,'Additional rank of Tinkerer.','Passive',['md01','md10','md21']),
node('md12','Fancy Paint Job',1,2,10,'Upgrade social checks made in the presence of the signature vehicle.','Passive',['md02','md13','md22']),
node('md13','Larger Project',1,3,10,'Increase the maximum silhouette of the signature vehicle by 1 per rank.','Passive',['md03','md12','md23']),
node('md20','Resourceful Refit',2,0,15,'Average Mechanics action can salvage an old attachment to build a new one at reduced price.','Active',['md10','md21','md30']),
node('md21','Resolve',2,1,15,'Additional rank of Resolve.','Passive',['md11','md20','md31']),
node('md22','Larger Project',2,2,15,'Additional rank of Larger Project.','Passive',['md12','md23','md32']),
node('md23','Toughened',2,3,15,'Increase wound threshold by 2.','Passive',['md13','md22','md33']),
node('md30','Jury Rigged',3,0,20,'Choose one item and grant it a permanent improvement while it remains in use.','Passive',['md20','md40']),
node('md31','Hidden Storage',3,1,20,'Gain concealed storage capacity in a vehicle or item equal to ranks.','Passive',['md21','md32','md41']),
node('md32','Tinkerer',3,2,20,'Additional rank of Tinkerer.','Passive',['md22','md31','md33','md42']),
node('md33','Gearhead',3,3,20,'Additional rank of Gearhead.','Passive',['md23','md32','md43']),
node('md40','Jury Rigged',4,0,25,'A second rank of Jury Rigged for another eligible item.','Passive',['md30','md41']),
node('md41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['md31','md40','md42']),
node('md42','Natural Tinkerer',4,2,25,'Once per session, reroll one Mechanics check.','Active',['md32','md41','md43']),
node('md43','Custom Loadout',4,3,25,'Add two additional hard points to the signature vehicle.','Passive',['md33','md42'])
],
'Demolitionist':[
node('dm00','Powerful Blast',0,0,5,'Increase damage dealt by activated Blast by 1 per rank.','Passive',['dm10']),
node('dm01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',['dm11']),
node('dm02','Selective Detonation',0,2,5,'Spend Advantage when using Blast/explosives to exclude targets, up to ranks.','Active',['dm12']),
node('dm03','Steady Nerves',0,3,5,'Remove Setback from Cool and Skulduggery checks.','Passive',['dm13']),
node('dm10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['dm00','dm20']),
node('dm11','Time to Go',1,1,10,'Spend Destiny out of turn to move into cover or out of an imminent blast.','Active',['dm01','dm21']),
node('dm12','Powerful Blast',1,2,10,'Additional rank of Powerful Blast.','Passive',['dm02','dm22']),
node('dm13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['dm03','dm23']),
node('dm20','Enduring',2,0,15,'Increase soak by 1.','Passive',['dm10','dm30']),
node('dm21','Improved Time to Go',2,1,15,'Time to Go may also move one engaged ally out of danger.','Passive',['dm11','dm31']),
node('dm22','Steady Nerves',2,2,15,'Additional rank of Steady Nerves.','Passive',['dm12','dm32']),
node('dm23','Rapid Reaction',2,3,15,'Suffer strain to add Success to Initiative checks.','Active',['dm13','dm33']),
node('dm30','Improvised Detonation',3,0,20,'Use Mechanics and available materials to assemble an explosive during an encounter.','Active',['dm20','dm40']),
node('dm31','Powerful Blast',3,1,20,'Additional rank of Powerful Blast.','Passive',['dm21','dm32','dm41']),
node('dm32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['dm22','dm31','dm33','dm42']),
node('dm33','Selective Detonation',3,3,20,'Additional rank of Selective Detonation.','Active',['dm23','dm32','dm43']),
node('dm40','Improved Improvised Detonation',4,0,25,'Improvised Detonation becomes easier and produces a more powerful explosive.','Passive',['dm30','dm41']),
node('dm41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['dm31','dm40','dm42']),
node('dm42','Master Grenadier',4,2,25,'Improve the efficiency of grenade and explosive special qualities.','Passive',['dm32','dm41','dm43']),
node('dm43','Selective Detonation',4,3,25,'Additional rank of Selective Detonation.','Active',['dm33','dm42'])
],
'Enforcer':[
node('en00','Toughened',0,0,5,'Increase wound threshold by 2.','Passive',['en10']),
node('en01','Intimidating',0,1,5,'Suffer strain to downgrade Coercion difficulty or upgrade incoming Coercion.','Active',['en11']),
node('en02','Fearsome',0,2,5,'Enemies becoming engaged may be forced to make a fear check.','Passive',['en12']),
node('en03','Street Smarts',0,3,5,'Remove Setback from Streetwise and Knowledge (Underworld).','Passive',['en13']),
node('en10','Durable',1,0,10,'Reduce Critical Injury rolls suffered by 10 per rank, minimum 1.','Passive',['en00','en20']),
node('en11','Stunning Blow',1,1,10,'Melee attacks may deal strain instead of wounds; soak still applies.','Active',['en01','en21']),
node('en12','Natural Enforcer',1,2,10,'Once per session, reroll one Coercion or Streetwise check.','Active',['en02','en22']),
node('en13','Talk the Talk',1,3,10,'Spend Destiny on a Knowledge check to substitute Streetwise or Knowledge (Underworld).','Active',['en03','en23']),
node('en20','Intimidating',2,0,15,'Additional rank of Intimidating.','Active',['en10','en30']),
node('en21','Defensive Stance',2,1,15,'Suffer strain as a maneuver to upgrade incoming melee attacks.','Active',['en11','en31']),
node('en22','Toughened',2,2,15,'Increase wound threshold by 2.','Passive',['en12','en32']),
node('en23','Loom',2,3,15,'An engaged ally’s successful Charm, Deception, or Negotiation gains Advantage based on your Coercion.','Passive',['en13','en33']),
node('en30','Second Wind',3,0,20,'Once per encounter recover strain equal to ranks.','Active',['en20','en40']),
node('en31','Street Smarts',3,1,20,'Additional rank of Street Smarts.','Passive',['en21','en41']),
node('en32','Walk the Walk',3,2,20,'Spend Destiny after a successful Brawl hit to add Streetwise ranks to damage.','Active',['en22','en42']),
node('en33','Intimidating',3,3,20,'Additional rank of Intimidating.','Active',['en23','en43']),
node('en40','Fearsome',4,0,25,'Additional rank of Fearsome.','Passive',['en30','en41']),
node('en41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['en31','en40','en42']),
node('en42','Black Market Contacts',4,2,25,'Reduce rarity of illicit/exotic purchases by ranks at increased cost.','Active',['en32','en41','en43']),
node('en43','Fearsome',4,3,25,'Additional rank of Fearsome.','Passive',['en33','en42'])
],
'Heavy':[
node('hv00','Burly',0,0,5,'Reduce weapon Cumbersome and Encumbrance by 1 per rank, minimum 1.','Passive',['hv10']),
node('hv01','Barrage',0,1,5,'Add +1 damage per rank to one Ranged (Heavy) or Gunnery hit at Long or Extreme range.','Passive',['hv11']),
node('hv02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['hv12']),
node('hv03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',['hv13']),
node('hv10','Barrage',1,0,10,'Additional rank of Barrage.','Passive',['hv00','hv20']),
node('hv11','Brace',1,1,10,'Brace against environmental Setback affecting the next action.','Active',['hv01','hv21']),
node('hv12','Spare Clip',1,2,10,'The character’s ranged weapons cannot run out of ammunition due to Despair.','Passive',['hv02','hv22']),
node('hv13','Durable',1,3,10,'Reduce Critical Injury rolls suffered by 10 per rank, minimum 1.','Passive',['hv03','hv23']),
node('hv20','Side Step',2,0,15,'Suffer strain as a maneuver to upgrade incoming ranged attacks.','Active',['hv10','hv30']),
node('hv21','Burly',2,1,15,'Additional rank of Burly.','Passive',['hv11','hv31']),
node('hv22','Heroic Fortitude',2,2,15,'Spend Destiny to ignore Critical Injury effects on Brawn/Agility checks for the encounter.','Active',['hv12','hv32']),
node('hv23','Toughened',2,3,15,'Increase wound threshold by 2.','Passive',['hv13','hv33']),
node('hv30','Brace',3,0,20,'Additional rank of Brace.','Active',['hv20','hv40']),
node('hv31','Barrage',3,1,20,'Additional rank of Barrage.','Passive',['hv21','hv41']),
node('hv32','Rain of Death',3,2,20,'Maneuver: Auto-Fire does not increase the difficulty of an attack made this turn.','Active',['hv22','hv42']),
node('hv33','Heroic Resilience',3,3,20,'Once per encounter, temporarily increase soak based on ranks in Resilience.','Active',['hv23','hv43']),
node('hv40','Burly',4,0,25,'Additional rank of Burly.','Passive',['hv30','hv41']),
node('hv41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['hv31','hv40','hv42']),
node('hv42','Armor Master',4,2,25,'Increase soak by 1 while wearing armor.','Passive',['hv32','hv41','hv43']),
node('hv43','Heavy Hitter',4,3,25,'Once per session, spend Triumph on a successful Ranged (Heavy) or Gunnery attack to add Breach 1.','Active',['hv33','hv42'])
]
};
Object.assign(EXACT_TREES,EOTE_TECH_HIRED_TREES);


const EOTE_COLONIST_EXPLORER_TREES={
'Entrepreneur':[
node('ent00','Sound Investments',0,0,5,'At the start of a new session, gain 100 credits per rank.','Passive',['ent10']),
node('ent01','Plausible Deniability',0,1,5,'Remove Setback from Coercion and Deception checks.','Passive',[]),
node('ent02','Rapid Recovery',0,2,5,'Recover one extra strain per rank after an encounter.','Passive',['ent12']),
node('ent03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',[]),
node('ent10','Rapid Recovery',1,0,10,'Additional rank of Rapid Recovery.','Passive',['ent00','ent11','ent20']),
node('ent11','Wheel and Deal',1,1,10,'Legal sales return 10% more credits per rank.','Passive',['ent10','ent21']),
node('ent12','Sound Investments',1,2,10,'Additional rank of Sound Investments.','Passive',['ent02','ent13','ent22']),
node('ent13','Wheel and Deal',1,3,10,'Additional rank of Wheel and Deal.','Passive',['ent12']),
node('ent20','Greased Palms',2,0,15,'Before a social check, spend credits to upgrade the positive dice pool.','Active',['ent10','ent21','ent30']),
node('ent21','Throwing Credits',2,1,15,'At session start, credits can offset the strain-threshold penalty of triggered Obligation.','Active',['ent11','ent20']),
node('ent22','Bought Info',2,2,15,'Spend credits in place of a Knowledge check to obtain reliable information.','Active',['ent12','ent23']),
node('ent23','Sound Investments',2,3,15,'Additional rank of Sound Investments.','Passive',['ent22','ent33']),
node('ent30','Sound Investments',3,0,20,'Additional rank of Sound Investments.','Passive',['ent20','ent31','ent40']),
node('ent31','Toughened',3,1,20,'Increase wound threshold by 2.','Passive',['ent30']),
node('ent32','Master Merchant',3,2,20,'Trade strain for improved buy/sell or Obligation terms.','Active',['ent33']),
node('ent33','Know Somebody',3,3,20,'Once per session, reduce the rarity of a legal purchase by ranks.','Active',['ent23','ent32','ent43']),
node('ent40','Natural Merchant',4,0,25,'Once per session, reroll one Streetwise or Negotiation check.','Active',['ent30','ent41']),
node('ent41','Intense Focus',4,1,25,'Suffer 1 strain as a maneuver to upgrade the next skill check once.','Active',['ent40','ent42']),
node('ent42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['ent41','ent43']),
node('ent43','Sound Investments',4,3,25,'Additional rank of Sound Investments.','Passive',['ent33','ent42'])
],
'Marshal':[
node('mar00','Hard Headed',0,0,5,'Use Discipline to recover from staggered or disoriented conditions.','Active',[]),
node('mar01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',['mar11']),
node('mar02','Street Smarts',0,2,5,'Remove Setback from Streetwise and Knowledge (Underworld) checks.','Passive',['mar12']),
node('mar03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',[]),
node('mar10','Durable',1,0,10,'Reduce Critical Injury rolls by 10 per rank, minimum 1.','Passive',['mar11','mar20']),
node('mar11','Good Cop',1,1,10,'Spend favorable social results to improve an ally’s next social check against the target.','Passive',['mar01','mar10','mar12','mar21']),
node('mar12','Bad Cop',1,2,10,'Spend favorable social results to improve an ally’s next social check against the target.','Passive',['mar02','mar11','mar13']),
node('mar13','Quick Draw',1,3,10,'Once per round, draw or holster an accessible item as an incidental.','Active',['mar12','mar23']),
node('mar20','Hard Headed',2,0,15,'Additional rank of Hard Headed.','Active',['mar10','mar30']),
node('mar21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['mar11','mar22','mar31']),
node('mar22','Good Cop',2,2,15,'Additional rank of Good Cop.','Passive',['mar21']),
node('mar23','Point Blank',2,3,15,'Add damage with Ranged (Light/Heavy) attacks at Engaged or Short range.','Passive',['mar13','mar33']),
node('mar30','Durable',3,0,20,'Additional rank of Durable.','Passive',['mar20']),
node('mar31','Unrelenting Skeptic',3,1,20,'Add failures to Deception attempts against the character based on Vigilance ranks.','Passive',['mar21','mar32','mar41']),
node('mar32','Bad Cop',3,2,20,'Additional rank of Bad Cop.','Passive',['mar31']),
node('mar33','Point Blank',3,3,20,'Additional rank of Point Blank.','Passive',['mar23','mar43']),
node('mar40','Improved Hard Headed',4,0,25,'When incapacitated by strain, attempt a harder Hard Headed check to remain barely conscious.','Active',['mar30']),
node('mar41','Improved Unrelenting Skeptic',4,1,25,'On a failed Deception check against the character, spend Destiny to add Despair.','Active',['mar31','mar42']),
node('mar42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['mar41']),
node('mar43','Natural Marksman',4,3,25,'Once per session, reroll one Ranged (Light) or Ranged (Heavy) check.','Active',['mar33'])
],
'Performer':[
node('per00','Smooth Talker',0,0,5,'Choose a social skill; spend Triumph to add extra successes with that skill.','Passive',[]),
node('per01','Kill with Kindness',0,1,5,'Remove Setback from Charm and Leadership checks.','Passive',['per11']),
node('per02','Distracting Behavior',0,2,5,'Suffer strain to hinder nearby NPC checks until the next turn.','Active',['per12']),
node('per03','Convincing Demeanor',0,3,5,'Remove Setback from Deception and Skulduggery checks.','Passive',[]),
node('per10','Distracting Behavior',1,0,10,'Additional rank of Distracting Behavior.','Active',['per11','per20']),
node('per11','Congenial',1,1,10,'Trade strain for Charm/Negotiation difficulty downgrades or upgrades.','Active',['per01','per10']),
node('per12','Dodge',1,2,10,'Suffer strain to upgrade an incoming combat check.','Active',['per02','per13','per22']),
node('per13','Jump Up',1,3,10,'Stand from prone or seated as an incidental once per round.','Active',['per12']),
node('per20','Distracting Behavior',2,0,15,'Additional rank of Distracting Behavior.','Active',['per10','per21','per30']),
node('per21','Intense Presence',2,1,15,'Spend a light Destiny Point to recover strain equal to Presence.','Active',['per20']),
node('per22','Natural Athlete',2,2,15,'Once per session, reroll one Athletics or Coordination check.','Active',['per12','per23','per32']),
node('per23','Second Wind',2,3,15,'Once per encounter, recover strain equal to ranks.','Active',['per22','per33']),
node('per30','Smooth Talker',3,0,20,'Additional rank of Smooth Talker.','Passive',['per20','per31','per40']),
node('per31','Improved Distracting Behavior',3,1,20,'Distracting Behavior also adds failures to affected NPC checks.','Passive',['per30','per41']),
node('per32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['per22','per33','per42']),
node('per33','Toughened',3,3,20,'Increase wound threshold by 2.','Passive',['per23','per32','per43']),
node('per40','Biggest Fan',4,0,25,'Once per session, use a hard Charm check to turn an NPC into an enthusiastic fan.','Active',['per30']),
node('per41','Deceptive Taunt',4,1,25,'Once per session, use Deception to force an adversary to focus attacks on the character.','Active',['per31']),
node('per42','Coordination Dodge',4,2,25,'Once per session when targeted, spend Destiny to add failures based on Coordination ranks.','Active',['per32']),
node('per43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['per33'])
],
'Archaeologist':[
node('arc00','Well Rounded',0,0,5,'Choose any two skills and permanently treat them as career skills.','Passive',[]),
node('arc01','Hard Headed',0,1,5,'Use Discipline to recover from staggered or disoriented conditions.','Active',['arc11']),
node('arc02','Researcher',0,2,5,'Remove Setback from Knowledge checks and reduce research time.','Passive',['arc12']),
node('arc03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['arc13']),
node('arc10','Durable',1,0,10,'Reduce Critical Injury rolls by 10 per rank, minimum 1.','Passive',['arc11','arc20']),
node('arc11','Toughened',1,1,10,'Increase wound threshold by 2.','Passive',['arc01','arc10','arc12']),
node('arc12','Resolve',1,2,10,'Reduce involuntary strain by 1 per rank, minimum 1.','Passive',['arc02','arc11','arc13']),
node('arc13','Knowledge Specialization',1,3,10,'Choose a Knowledge skill; Triumph can add extra successes based on ranks.','Passive',['arc03','arc12','arc23']),
node('arc20','Stunning Blow',2,0,15,'Melee attacks may deal strain instead of wounds.','Active',['arc10','arc21','arc30']),
node('arc21','Knockdown',2,1,15,'After a successful melee hit, spend Advantage to knock the target prone.','Active',['arc20']),
node('arc22','Respected Scholar',2,2,15,'Downgrade difficulty of social checks with institutes of learning.','Passive',['arc32']),
node('arc23','Researcher',2,3,15,'Additional rank of Researcher.','Passive',['arc13','arc33']),
node('arc30','Hard Headed',3,0,20,'Additional rank of Hard Headed.','Active',['arc20','arc31','arc40']),
node('arc31','Enduring',3,1,20,'Increase soak by 1.','Passive',['arc30','arc32','arc41']),
node('arc32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['arc22','arc31','arc33','arc42']),
node('arc33','Knowledge Specialization',3,3,20,'Additional rank of Knowledge Specialization.','Passive',['arc23','arc32','arc43']),
node('arc40','Pin',4,0,25,'Use an opposed Athletics action to immobilize an engaged opponent.','Active',['arc30','arc41']),
node('arc41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['arc31','arc40']),
node('arc42','Respected Scholar',4,2,25,'Additional rank of Respected Scholar.','Passive',['arc32','arc43']),
node('arc43','Museum Worthy',4,3,25,'Once per session, make a hard Knowledge (Education) check to identify the historical value of a relic or ruin.','Active',['arc33','arc42'])
],
'Big-Game Hunter':[
node('bgh00','Forager',0,0,5,'Remove environmental Setback when finding food, water, or shelter; forage faster.','Passive',['bgh10']),
node('bgh01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',[]),
node('bgh02','Stalker',0,2,5,'Add Boost to Stealth and Coordination checks.','Passive',['bgh12']),
node('bgh03','Outdoorsman',0,3,5,'Remove Setback from wilderness movement/environment checks and reduce overland travel time.','Passive',['bgh13']),
node('bgh10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['bgh00','bgh11','bgh20']),
node('bgh11','Outdoorsman',1,1,10,'Additional rank of Outdoorsman.','Passive',['bgh10','bgh12']),
node('bgh12','Confidence',1,2,10,'Reduce fear-check difficulty per rank.','Passive',['bgh02','bgh11','bgh22']),
node('bgh13','Swift',1,3,10,'Ignore ordinary penalties for moving through difficult terrain.','Passive',['bgh03']),
node('bgh20','Stalker',2,0,15,'Additional rank of Stalker.','Passive',['bgh10']),
node('bgh21','Natural Hunter',2,1,15,'Once per session, reroll one Perception or Vigilance check.','Active',['bgh22']),
node('bgh22','Expert Tracker',2,2,15,'Remove Setback from tracking checks and reduce tracking time.','Passive',['bgh12','bgh21','bgh23']),
node('bgh23','Heightened Awareness',2,3,15,'Nearby allies gain Boost on Perception/Vigilance checks.','Passive',['bgh22','bgh33']),
node('bgh30','Grit',3,0,20,'Increase strain threshold by 1.','Passive',['bgh31','bgh40']),
node('bgh31',"Hunter's Quarry",3,1,20,'Use Survival to designate a quarry and improve attacks against that target.','Active',['bgh30','bgh32','bgh41']),
node('bgh32','Quick Strike',3,2,20,'Add Boost to attacks against targets that have not acted yet.','Passive',['bgh31','bgh42']),
node('bgh33','Expert Tracker',3,3,20,'Additional rank of Expert Tracker.','Passive',['bgh23','bgh43']),
node('bgh40','Bring It Down',4,0,25,'Once per attack, spend a light Destiny Point to add damage equal to the target’s Brawn.','Active',['bgh30']),
node('bgh41',"Improved Hunter's Quarry",4,1,25,'Suffer 2 strain to perform Hunter’s Quarry as a maneuver.','Passive',['bgh31']),
node('bgh42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['bgh32','bgh43']),
node('bgh43','Superior Reflexes',4,3,25,'Increase melee defense by 1.','Passive',['bgh33','bgh42'])
],
'Driver':[
node('drv00','Full Throttle',0,0,5,'Use Piloting to increase vehicle speed temporarily.','Active',['drv10']),
node('drv01','All-Terrain Driver',0,1,5,'Ignore ordinary difficult-terrain penalties while driving with Piloting (Planetary).','Passive',[]),
node('drv02','Fine Tuning',0,2,5,'Vehicle/starship repair checks restore additional system strain per rank.','Passive',[]),
node('drv03','Gearhead',0,3,5,'Remove Setback from Mechanics checks and reduce attachment modification costs.','Passive',['drv13']),
node('drv10','Grit',1,0,10,'Increase strain threshold by 1.','Passive',['drv00','drv11','drv20']),
node('drv11','Skilled Jockey',1,1,10,'Remove Setback from Piloting (Planetary) and Piloting (Space) checks.','Passive',['drv10','drv12','drv21']),
node('drv12','Rapid Reaction',1,2,10,'Suffer strain to add Successes to initiative checks.','Active',['drv11','drv13']),
node('drv13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['drv03','drv12','drv23']),
node('drv20','Improved Full Throttle',2,0,15,'Full Throttle can be attempted as a maneuver at easier difficulty after suffering strain.','Passive',['drv10','drv30']),
node('drv21','Tricky Target',2,1,15,'Count the piloted vehicle or starship as one silhouette smaller when attacked.','Passive',['drv11','drv31']),
node('drv22','Fine Tuning',2,2,15,'Additional rank of Fine Tuning.','Passive',['drv23','drv32']),
node('drv23','Toughened',2,3,15,'Increase wound threshold by 2.','Passive',['drv13','drv22','drv33']),
node('drv30','Defensive Driving',3,0,20,'Increase defense of a piloted vehicle/starship per rank.','Passive',['drv20','drv31','drv40']),
node('drv31','Skilled Jockey',3,1,20,'Additional rank of Skilled Jockey.','Passive',['drv21','drv30','drv32']),
node('drv32','Natural Driver',3,2,20,'Once per session, reroll one Piloting (Planetary) or Gunnery check.','Active',['drv22','drv31']),
node('drv33','Gearhead',3,3,20,'Additional rank of Gearhead.','Passive',['drv23','drv43']),
node('drv40','Supreme Full Throttle',4,0,25,'Full Throttle increases speed by 2 instead of 1.','Passive',['drv30','drv41']),
node('drv41','Full Stop',4,1,25,'Use a full-stop maneuver to drop vehicle speed to zero and take system strain.','Active',['drv40','drv42']),
node('drv42','Master Driver',4,2,25,'Once per round, suffer 2 strain to perform a vehicle action as a maneuver.','Active',['drv41','drv43']),
node('drv43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['drv33','drv42'])
]
};
Object.assign(EXACT_TREES,EOTE_COLONIST_EXPLORER_TREES);

const AOR_COMMANDER_ACE_TREES={
'Figurehead':[
node('fig00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',[]),
node('fig01','Resolve',0,1,5,'Reduce involuntary strain suffered by 1 per rank, to a minimum of 1.','Passive',['fig11']),
node('fig02','Confidence',0,2,5,'Reduce the difficulty of fear checks per rank.','Passive',['fig12']),
node('fig03','Command',0,3,5,'Add Boost to Leadership checks per rank and bolster allies receiving orders.','Passive',['fig13']),
node('fig10','Command',1,0,10,'Additional rank of Command.','Passive',['fig11','fig20']),
node('fig11','Inspiring Rhetoric',1,1,10,'Use Leadership to help nearby allies recover strain; favorable results can restore more.','Active',['fig01','fig10','fig12','fig21']),
node('fig12','Calm Commander',1,2,10,'Use Cool ranks instead of Leadership ranks when making mass-combat checks.','Passive',['fig02','fig11','fig22']),
node('fig13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['fig03','fig23']),
node('fig20','Commanding Presence',2,0,15,'Remove Setback from Leadership and Cool checks per rank.','Passive',['fig10','fig21','fig30']),
node('fig21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['fig11','fig20','fig31']),
node('fig22','Improved Inspiring Rhetoric',2,2,15,'Allies aided by Inspiring Rhetoric also gain temporary Boost dice on checks.','Passive',['fig12','fig23','fig32']),
node('fig23','Positive Spin',2,3,15,'When Duty increases, increase it by an additional point per rank.','Passive',['fig13','fig22','fig33']),
node('fig30','Resolve',3,0,20,'Additional rank of Resolve.','Passive',['fig20','fig31','fig40']),
node('fig31','Confidence',3,1,20,'Additional rank of Confidence.','Passive',['fig21','fig30','fig32','fig41']),
node('fig32','Improved Confidence',3,2,20,'Spend Advantage on a fear check to improve nearby allies facing the same fear.','Passive',['fig22','fig31','fig42']),
node('fig33','Commanding Presence',3,3,20,'Additional rank of Commanding Presence.','Passive',['fig23','fig43']),
node('fig40','Intense Presence',4,0,25,'Spend a light Destiny Point to recover strain equal to Presence.','Active',['fig30','fig41']),
node('fig41','Natural Leader',4,1,25,'Once per session, reroll one Cool or Leadership check.','Active',['fig31','fig40','fig42']),
node('fig42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['fig32','fig41','fig43']),
node('fig43','Improved Commanding Presence',4,3,25,'Once per session, use Commanding Presence in an opposed social action to force a target to leave the encounter.','Active',['fig33','fig42'])
],
'Instructor':[
node('ins00','Conditioned',0,0,5,'Remove Setback from Athletics and Coordination checks; reduce harm from falling.','Passive',['ins10']),
node('ins01','Physical Training',0,1,5,'Add Boost to Athletics and Resilience checks per rank.','Passive',['ins11']),
node('ins02','Body Guard',0,2,5,'Suffer strain to guard an engaged ally, upgrading attacks against that ally until your next turn.','Active',['ins12']),
node('ins03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',[]),
node('ins10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['ins00','ins20']),
node('ins11','Encouraging Words',1,1,10,'After an engaged ally fails a check, suffer strain to let that ally treat the next encounter check as out of turn.','Active',['ins01','ins21']),
node('ins12','Conditioned',1,2,10,'Additional rank of Conditioned.','Passive',['ins02','ins13','ins22']),
node('ins13','Stimpack Specialization',1,3,10,'Stimpacks heal one additional wound per rank.','Passive',['ins12','ins23']),
node('ins20','Physical Training',2,0,15,'Additional rank of Physical Training.','Passive',['ins10','ins21','ins30']),
node('ins21','Master Instructor',2,1,15,'Once per round, suffer strain to let an ally use your Discipline rank for the ally’s next Discipline check.','Active',['ins11','ins20','ins22','ins31']),
node('ins22','Body Guard',2,2,15,'Additional rank of Body Guard.','Active',['ins12','ins21','ins23','ins32']),
node('ins23','Improved Body Guard',2,3,15,'Once per session, when a guarded ally is hit, take that hit instead.','Active',['ins13','ins22','ins33']),
node('ins30','Field Commander',3,0,20,'Use Leadership to let nearby allies immediately perform free maneuvers by suffering strain.','Active',['ins20','ins31','ins40']),
node('ins31','Grit',3,1,20,'Increase strain threshold by 1.','Passive',['ins21','ins30','ins32','ins41']),
node('ins32','Stimpack Specialization',3,2,20,'Additional rank of Stimpack Specialization.','Passive',['ins22','ins31','ins33','ins42']),
node('ins33','Toughened',3,3,20,'Increase wound threshold by 2.','Passive',['ins23','ins32','ins43']),
node('ins40','Improved Field Commander',4,0,25,'Field Commander can reach more allies and can enable stronger immediate actions with favorable results.','Passive',['ins30','ins41']),
node('ins41','Natural Instructor',4,1,25,'Once per session, reroll one Discipline or Leadership check.','Active',['ins31','ins40','ins42']),
node('ins42',"That's How It's Done",4,2,25,'After succeeding at a skill check, suffer strain to add a Boost to the same skill used by a nearby ally during the next round.','Active',['ins32','ins41','ins43']),
node('ins43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['ins33','ins42'])
],
'Strategist':[
node('str00','Researcher',0,0,5,'Remove Setback from Knowledge checks and reduce research time.','Passive',['str10']),
node('str01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',[]),
node('str02','Ready for Anything',0,2,5,'Remove Setback from mass-combat checks and from Cool or Vigilance checks used for initiative.','Passive',['str12']),
node('str03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['str13']),
node('str10','Grit',1,0,10,'Increase strain threshold by 1.','Passive',['str00','str11','str20']),
node('str11','Clever Commander',1,1,10,'Use Knowledge (Warfare) ranks instead of Leadership ranks for mass-combat checks.','Passive',['str10','str12','str21']),
node('str12','Command',1,2,10,'Add Boost to Leadership checks per rank and bolster allies receiving orders.','Passive',['str02','str11','str13','str22']),
node('str13','Well Read',1,3,10,'Choose three Knowledge skills and permanently make them career skills.','Passive',['str03','str12','str23']),
node('str20','Knowledge Specialization',2,0,15,'Choose a Knowledge skill; Triumph can add extra successes based on ranks.','Active',['str10','str21','str30']),
node('str21','Researcher',2,1,15,'Additional rank of Researcher.','Passive',['str11','str20','str31']),
node('str22','Ready for Anything',2,2,15,'Additional rank of Ready for Anything.','Passive',['str12','str23','str32']),
node('str23','Master Strategist',2,3,15,'Once per mass-combat phase, suffer strain to reduce a mass-combat check’s difficulty.','Active',['str13','str22','str33']),
node('str30','Improved Researcher',3,0,20,'On a successful Knowledge check, allies can gain an upgrade when acting on those facts before your next turn.','Passive',['str20','str31','str40']),
node('str31','Knowledge Specialization',3,1,20,'Additional rank of Knowledge Specialization.','Active',['str21','str30','str32','str41']),
node('str32','Coordinated Assault',3,2,20,'Direct engaged allies so their combat checks gain Advantage based on Leadership ranks until your next turn.','Active',['str22','str31','str33','str42']),
node('str33','Command',3,3,20,'Additional rank of Command.','Passive',['str23','str32','str43']),
node('str40','Thorough Assessment',4,0,25,'Once per session, make a hard Knowledge check to create a shared pool of Boost dice for the encounter.','Active',['str30','str41']),
node('str41','Careful Planning',4,1,25,'Once per session, introduce a plausible prepared fact into the narrative as though Destiny had been spent.','Active',['str31','str40','str42']),
node('str42','Improved Ready for Anything',4,2,25,'On initiative checks, spend Triumph to add successes based on Ready for Anything ranks.','Passive',['str32','str41','str43']),
node('str43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['str33','str42'])
],
'Beast Rider':[
node('br00','Forager',0,0,5,'Remove environmental Setback when finding food, water, or shelter; forage faster.','Passive',['br10']),
node('br01','Toughened',0,1,5,'Increase wound threshold by 2.','Passive',['br11']),
node('br02','Outdoorsman',0,2,5,'Remove Setback from wilderness movement and environmental checks and reduce overland travel time.','Passive',['br12']),
node('br03','Beast Wrangler',0,3,5,'Add Boost to checks made to tame or wrangle creatures per rank.','Passive',['br13']),
node('br10','Outdoorsman',1,0,10,'Additional rank of Outdoorsman.','Passive',['br00','br11','br20']),
node('br11','Expert Tracker',1,1,10,'Remove Setback from tracking checks and reduce tracking time.','Passive',['br01','br10','br12','br21']),
node('br12','Toughened',1,2,10,'Increase wound threshold by 2.','Passive',['br02','br11','br22']),
node('br13','Expert Handler',1,3,10,'Remove Setback from Survival checks made while riding beasts.','Passive',['br03','br23']),
node('br20','Expert Tracker',2,0,15,'Additional rank of Expert Tracker.','Passive',['br10','br21','br30']),
node('br21','Beast Wrangler',2,1,15,'Additional rank of Beast Wrangler.','Passive',['br11','br20','br22','br31']),
node('br22',"Let's Ride",2,2,15,'Once per round, mount, dismount, enter a cockpit, or enter a weapon station as an incidental.','Active',['br12','br21','br23','br32']),
node('br23','Grit',2,3,15,'Increase strain threshold by 1.','Passive',['br13','br22','br33']),
node('br30','Improved Spur',3,0,20,'Spur can be attempted as a maneuver by suffering strain and at reduced difficulty.','Passive',['br20','br31','br40']),
node('br31','Spur',3,1,20,'Use Survival to push a beast to increase speed, at the cost of strain to the mount.','Active',['br21','br30','br41']),
node('br32','Natural Outdoorsman',3,2,20,'Once per session, reroll one Resilience or Survival check.','Active',['br22','br42']),
node('br33','Expert Handler',3,3,20,'Additional rank of Expert Handler.','Passive',['br23','br43']),
node('br40','Supreme Spur',4,0,25,'When maintaining Spur, the beast suffers less strain each round.','Passive',['br30']),
node('br41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['br31','br42']),
node('br42','Grit',4,2,25,'Increase strain threshold by 1.','Passive',['br32','br41','br43']),
node('br43','Soothing Tone',4,3,25,'Use Knowledge (Xenology) to help a beast recover strain.','Active',['br33','br42'])
],
'Hotshot':[
node('hot00','Shortcut',0,0,5,'Add Boost to chase checks made to catch or escape another participant.','Passive',[]),
node('hot01','High-G Training',0,1,5,'When a piloted vehicle suffers system strain, suffer personal strain instead up to ranks.','Active',['hot11']),
node('hot02','Skilled Jockey',0,2,5,'Remove Setback from Piloting (Planetary) and Piloting (Space) checks.','Passive',['hot12']),
node('hot03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['hot13']),
node('hot10','Second Chances',1,0,10,'Once per encounter, reroll positive dice up to ranks.','Active',['hot11','hot20']),
node('hot11','Grit',1,1,10,'Increase strain threshold by 1.','Passive',['hot01','hot10','hot12','hot21']),
node('hot12','Shortcut',1,2,10,'Additional rank of Shortcut.','Passive',['hot02','hot11','hot22']),
node('hot13','High-G Training',1,3,10,'Additional rank of High-G Training.','Active',['hot03','hot23']),
node('hot20','Dead to Rights',2,0,15,'Spend Destiny before firing a vehicle-mounted weapon to add damage based on Agility.','Active',['hot10','hot21','hot30']),
node('hot21','High-G Training',2,1,15,'Additional rank of High-G Training.','Active',['hot11','hot20','hot31']),
node('hot22','Grit',2,2,15,'Increase strain threshold by 1.','Passive',['hot12','hot32']),
node('hot23','Intense Presence',2,3,15,'Spend a light Destiny Point to recover strain equal to Presence.','Active',['hot13','hot33']),
node('hot30','Second Chances',3,0,20,'Additional rank of Second Chances.','Active',['hot20','hot40']),
node('hot31','Corellian Sendoff',3,1,20,'Use Cool to force nearby ships or vehicles into a minor collision.','Active',['hot21','hot32','hot41']),
node('hot32','Koiogran Turn',3,2,20,'When an opponent gains the advantage in a piloted craft, perform a maneuver to remove that effect.','Active',['hot22','hot31','hot42']),
node('hot33','Grit',3,3,20,'Increase strain threshold by 1.','Passive',['hot23','hot43']),
node('hot40','Improved Dead to Rights',4,0,25,'Dead to Rights adds more damage based on Agility.','Passive',['hot30']),
node('hot41','Improved Corellian Sendoff',4,1,25,'Corellian Sendoff can inflict a major collision instead.','Passive',['hot31','hot42']),
node('hot42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['hot32','hot41','hot43']),
node('hot43','Showboat',4,3,25,'When making a vehicle or starship check, suffer strain to improve successful or failed narrative results.','Active',['hot33','hot42'])
],
'Rigger':[
node('rig00','Black Market Contacts',0,0,5,'Reduce rarity of illicit purchases at the cost of a higher price.','Active',['rig10']),
node('rig01','Toughened',0,1,5,'Increase wound threshold by 2.','Passive',[]),
node('rig02','Gearhead',0,2,5,'Remove Setback from Mechanics checks and reduce attachment-modification costs.','Passive',['rig12']),
node('rig03','Larger Project',0,3,5,'Increase the silhouette limit of the signature vehicle per rank.','Passive',['rig13']),
node('rig10','Grit',1,0,10,'Increase strain threshold by 1.','Passive',['rig00','rig20']),
node('rig11','Fancy Paint Job',1,1,10,'Upgrade social checks made in the presence of the signature vehicle.','Passive',['rig12','rig21']),
node('rig12','Signature Vehicle',1,2,10,'Choose a starship or vehicle as a signature vehicle and improve Mechanics checks made on it.','Passive',['rig02','rig11','rig22']),
node('rig13','Larger Project',1,3,10,'Additional rank of Larger Project.','Passive',['rig03','rig23']),
node('rig20','Black Market Contacts',2,0,15,'Additional rank of Black Market Contacts.','Active',['rig10','rig30']),
node('rig21','Overstocked Ammo',2,1,15,'Increase Limited Ammo on weapons mounted to the signature vehicle per rank.','Passive',['rig11','rig22','rig31']),
node('rig22','Tuned Maneuvering Thrusters',2,2,15,'Increase the handling of the signature vehicle per rank.','Passive',['rig12','rig21','rig23','rig32']),
node('rig23','Bolstered Armor',2,3,15,'Increase the armor of the signature vehicle per rank.','Passive',['rig13','rig22','rig33']),
node('rig30','Toughened',3,0,20,'Increase wound threshold by 2.','Passive',['rig20','rig40']),
node('rig31','Customized Cooling Unit',3,1,20,'Increase the system-strain threshold of the signature vehicle per rank.','Passive',['rig21','rig32','rig41']),
node('rig32','Gearhead',3,2,20,'Additional rank of Gearhead.','Passive',['rig22','rig31','rig33','rig42']),
node('rig33','Fortified Vacuum Seal',3,3,20,'Increase the hull-trauma threshold of the signature vehicle per rank.','Passive',['rig23','rig32','rig43']),
node('rig40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['rig30']),
node('rig41','Tuned Maneuvering Thrusters',4,1,25,'Additional rank of Tuned Maneuvering Thrusters.','Passive',['rig31','rig42']),
node('rig42','Not Today',4,2,25,'Once per session, spend Destiny to save the signature vehicle from destruction.','Active',['rig32','rig41','rig43']),
node('rig43','Reinforced Frame',4,3,25,'The signature vehicle gains Massive 1, making serious Critical Hits harder to trigger.','Passive',['rig33','rig42'])
]
};
Object.assign(EXACT_TREES,AOR_COMMANDER_ACE_TREES);

const AOR_CORE_COMMANDER_ACE_TREES={
'Commodore':[
node('com00','Solid Repairs',0,0,5,'Repair one additional hull trauma per rank when repairing a vehicle or starship.','Passive',['com10']),
node('com01','Command',0,1,5,'Add Boost to Leadership checks per rank and bolster allies receiving orders.','Passive',[]),
node('com02','Rapid Reaction',0,2,5,'Suffer strain up to ranks to add automatic successes to an initiative check.','Active',['com12']),
node('com03','Galaxy Mapper',0,3,5,'Remove Setback from Astrogation checks and reduce route-calculation time.','Passive',['com13']),
node('com10','Known Schematic',1,0,10,'Once per session, use Knowledge (Education) to establish useful familiarity with a building or ship design.','Active',['com00']),
node('com11','Commanding Presence',1,1,10,'Remove Setback from Leadership and Cool checks per rank.','Passive',['com21']),
node('com12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['com02','com22']),
node('com13','Familiar Suns',1,3,10,'Once per session, use Knowledge (Outer Rim) to establish useful environmental information about the current location.','Active',['com03','com23']),
node('com20','Solid Repairs',2,0,15,'Additional rank of Solid Repairs.','Passive',['com30']),
node('com21','Command',2,1,15,'Additional rank of Command.','Passive',['com11','com31']),
node('com22','Rapid Reaction',2,2,15,'Additional rank of Rapid Reaction.','Active',['com12','com32']),
node('com23','Galaxy Mapper',2,3,15,'Additional rank of Galaxy Mapper.','Passive',['com13','com33']),
node('com30','Hold Together',3,0,20,'Spend Destiny after a vehicle or starship takes damage to convert that damage into system strain.','Active',['com20','com40']),
node('com31','Commanding Presence',3,1,20,'Additional rank of Commanding Presence.','Passive',['com21','com41']),
node('com32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['com22','com42']),
node('com33','Master Starhopper',3,3,20,'Once per round, suffer strain to reduce the difficulty of an Astrogation check.','Active',['com23','com43']),
node('com40','Solid Repairs',4,0,25,'Additional rank of Solid Repairs.','Passive',['com30','com41']),
node('com41','Fire Control',4,1,25,'Direct coordinated fire so attacks from the current vehicle treat target silhouette as one larger until your next turn.','Active',['com31','com40','com42']),
node('com42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['com32','com41','com43']),
node('com43','Galaxy Mapper',4,3,25,'Additional rank of Galaxy Mapper.','Passive',['com33','com42'])
],
'Squadron Leader':[
node('sql00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['sql10']),
node('sql01','Quick Strike',0,1,5,'Add Boost to combat checks against targets that have not acted yet.','Passive',[]),
node('sql02',"Let's Ride",0,2,5,'Once per round, mount, dismount, or enter a cockpit or weapon station as an incidental.','Active',[]),
node('sql03','Defensive Driving',0,3,5,'Increase defense of a piloted vehicle or starship per rank.','Passive',['sql13']),
node('sql10','Field Commander',1,0,10,'Use Leadership to let nearby allies immediately perform free maneuvers by suffering strain.','Active',['sql00','sql11','sql20']),
node('sql11','Confidence',1,1,10,'Reduce the difficulty of fear checks per rank.','Passive',['sql10','sql21']),
node('sql12','Quick Strike',1,2,10,'Additional rank of Quick Strike.','Passive',['sql13','sql22']),
node('sql13','Situational Awareness',1,3,10,'Nearby allies gain Boost dice on Perception and Vigilance checks while operating around your vehicle.','Passive',['sql03','sql12','sql23']),
node('sql20','Command',2,0,15,'Add Boost to Leadership checks per rank and bolster allies receiving orders.','Passive',['sql10','sql30']),
node('sql21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['sql11','sql31']),
node('sql22','Full Stop',2,2,15,'Bring a piloted vehicle to speed zero as a maneuver, suffering system strain based on speed reduced.','Active',['sql12','sql32']),
node('sql23','Defensive Driving',2,3,15,'Additional rank of Defensive Driving.','Passive',['sql13','sql33']),
node('sql30','Improved Field Commander',3,0,20,'Field Commander can affect more allies and, with favorable results, enable an immediate action.','Passive',['sql20','sql40']),
node('sql31','Command',3,1,20,'Additional rank of Command.','Passive',['sql21','sql32','sql41']),
node('sql32','Form On Me!',3,2,20,'Nearby allied pilots can share the benefits of your Gain the Advantage result.','Passive',['sql22','sql31','sql33','sql42']),
node('sql33','Tricky Target',3,3,20,'Count the piloted craft as one silhouette smaller when it is attacked.','Passive',['sql23','sql32','sql43']),
node('sql40','Master Leader',4,0,25,'Once per round, suffer strain to reduce the difficulty of your next Leadership check.','Active',['sql30','sql41']),
node('sql41','Confidence',4,1,25,'Additional rank of Confidence.','Passive',['sql31','sql40']),
node('sql42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['sql32']),
node('sql43','Brilliant Evasion',4,3,25,'Once per encounter, win an opposed Piloting check to keep one opponent from attacking you for several rounds.','Active',['sql33'])
],
'Tactician':[
node('tac00','Outdoorsman',0,0,5,'Remove Setback from wilderness movement/environmental checks and reduce overland travel time.','Passive',['tac10']),
node('tac01','Commanding Presence',0,1,5,'Remove Setback from Leadership and Cool checks per rank.','Passive',['tac11']),
node('tac02','Toughened',0,2,5,'Increase wound threshold by 2.','Passive',['tac12']),
node('tac03','Side Step',0,3,5,'Suffer strain as a maneuver to upgrade incoming ranged attacks until your next turn.','Active',['tac13']),
node('tac10','Outdoorsman',1,0,10,'Additional rank of Outdoorsman.','Passive',['tac00','tac20']),
node('tac11','Confidence',1,1,10,'Reduce the difficulty of fear checks per rank.','Passive',['tac01','tac21']),
node('tac12','Quick Draw',1,2,10,'Once per round, draw or holster a weapon or item as an incidental.','Active',['tac02','tac13','tac22']),
node('tac13','Swift',1,3,10,'Ignore ordinary penalties for moving through difficult terrain.','Passive',['tac03','tac12','tac23']),
node('tac20','Natural Outdoorsman',2,0,15,'Once per session, reroll one Resilience or Survival check.','Active',['tac10','tac30']),
node('tac21','Toughened',2,1,15,'Increase wound threshold by 2.','Passive',['tac11','tac31']),
node('tac22','Body Guard',2,2,15,'Suffer strain to guard an engaged ally, upgrading attacks against that ally until your next turn.','Active',['tac12','tac23','tac32']),
node('tac23','Body Guard',2,3,15,'Additional rank of Body Guard.','Active',['tac13','tac22','tac33']),
node('tac30','Confidence',3,0,20,'Additional rank of Confidence.','Passive',['tac20','tac31','tac40']),
node('tac31','Commanding Presence',3,1,20,'Additional rank of Commanding Presence.','Passive',['tac21','tac30','tac41']),
node('tac32','Field Commander',3,2,20,'Use Leadership to let nearby allies immediately perform free maneuvers by suffering strain.','Active',['tac22','tac42']),
node('tac33','Side Step',3,3,20,'Additional rank of Side Step.','Active',['tac23','tac43']),
node('tac40','Coordinated Assault',4,0,25,'Coordinate nearby allies so their combat checks gain extra Advantage for a short time.','Active',['tac30']),
node('tac41','Natural Leader',4,1,25,'Once per session, reroll one Cool or Leadership check.','Active',['tac31']),
node('tac42','Improved Field Commander',4,2,25,'Field Commander can affect more allies and, with favorable results, enable an immediate action.','Passive',['tac32']),
node('tac43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['tac33'])
],
'Gunner':[
node('gun00','Durable',0,0,5,'Reduce Critical Injury rolls suffered by 10 per rank, minimum 1.','Passive',['gun10']),
node('gun01','Grit',0,1,5,'Increase strain threshold by 1.','Passive',['gun11']),
node('gun02','Overwhelm Defenses',0,2,5,'After a successful vehicle-weapon attack, spend Advantage per rank to reduce defense in the targeted zone.','Active',['gun12']),
node('gun03','Debilitating Shot',0,3,5,'Spend Advantage on a successful vehicle attack to reduce the target’s maximum speed temporarily.','Active',['gun13']),
node('gun10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['gun00','gun11','gun20']),
node('gun11','Brace',1,1,10,'Brace to remove environmental Setback dice from your next action.','Active',['gun01','gun10','gun12','gun21']),
node('gun12','Spare Clip',1,2,10,'Ranged weapons do not run out of ammunition because of Despair unless Limited Ammo applies.','Passive',['gun02','gun11','gun22']),
node('gun13','True Aim',1,3,10,'Aim and upgrade the next combat check once per rank.','Active',['gun03','gun23']),
node('gun20','Durable',2,0,15,'Additional rank of Durable.','Passive',['gun10','gun21','gun30']),
node('gun21','Enduring',2,1,15,'Increase soak by 1.','Passive',['gun11','gun20','gun31']),
node('gun22','Jury Rigged',2,2,15,'Choose one item to receive a permanent focused improvement while it remains in use.','Passive',['gun12','gun32']),
node('gun23','Overwhelm Defenses',2,3,15,'Additional rank of Overwhelm Defenses.','Active',['gun13','gun33']),
node('gun30','Toughened',3,0,20,'Increase wound threshold by 2.','Passive',['gun20','gun31','gun40']),
node('gun31','Enduring',3,1,20,'Increase soak by 1.','Passive',['gun21','gun30','gun41']),
node('gun32','Brace',3,2,20,'Additional rank of Brace.','Active',['gun22','gun42']),
node('gun33','Exhaust Port',3,3,20,'Spend Destiny before a vehicle attack to ignore Massive for that attack.','Active',['gun23','gun43']),
node('gun40','Heroic Fortitude',4,0,25,'Spend Destiny to ignore Critical Injury penalties affecting Brawn or Agility checks for the encounter.','Active',['gun30','gun41']),
node('gun41','Jury Rigged',4,1,25,'Additional rank of Jury Rigged.','Passive',['gun31','gun40','gun42']),
node('gun42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['gun32','gun41','gun43']),
node('gun43','True Aim',4,3,25,'Additional rank of True Aim.','Active',['gun33','gun42'])
],
'Pilot':[
node('pil00','Full Throttle',0,0,5,'Use Piloting to increase vehicle speed temporarily.','Active',['pil10']),
node('pil01','Skilled Jockey',0,1,5,'Remove Setback from Piloting (Planetary) and Piloting (Space) checks.','Passive',['pil11']),
node('pil02','Galaxy Mapper',0,2,5,'Remove Setback from Astrogation checks and reduce route-calculation time.','Passive',['pil12']),
node('pil03',"Let's Ride",0,3,5,'Once per round, mount, dismount, or enter a cockpit or weapon station as an incidental.','Active',['pil13']),
node('pil10','Skilled Jockey',1,0,10,'Additional rank of Skilled Jockey.','Passive',['pil00','pil11','pil20']),
node('pil11','Dead to Rights',1,1,10,'Spend Destiny before firing a vehicle-mounted weapon to add damage based on Agility.','Active',['pil01','pil10','pil21']),
node('pil12','Galaxy Mapper',1,2,10,'Additional rank of Galaxy Mapper.','Passive',['pil02','pil13','pil22']),
node('pil13','Rapid Recovery',1,3,10,'Recover one additional strain per rank after an encounter.','Passive',['pil03','pil12','pil23']),
node('pil20','Improved Full Throttle',2,0,15,'Full Throttle can be attempted as a maneuver at easier difficulty after suffering strain.','Passive',['pil10','pil30']),
node('pil21','Improved Dead to Rights',2,1,15,'Dead to Rights adds damage equal to full Agility instead of half.','Passive',['pil11','pil31']),
node('pil22','Grit',2,2,15,'Increase strain threshold by 1.','Passive',['pil12','pil32']),
node('pil23','Natural Pilot',2,3,15,'Once per session, reroll one Piloting (Space) or Gunnery check.','Active',['pil13','pil33']),
node('pil30','Grit',3,0,20,'Increase strain threshold by 1.','Passive',['pil20','pil31','pil40']),
node('pil31','Supreme Full Throttle',3,1,20,'Full Throttle increases top speed by 2 instead of 1.','Passive',['pil21','pil30','pil41']),
node('pil32','Tricky Target',3,2,20,'Count the piloted vehicle or starship as one silhouette smaller when attacked.','Passive',['pil22','pil33','pil42']),
node('pil33','Defensive Driving',3,3,20,'Increase defense of a piloted vehicle or starship per rank.','Passive',['pil23','pil32','pil43']),
node('pil40','Master Pilot',4,0,25,'Once per round while piloting a starship, suffer 2 strain to perform an action as a maneuver.','Active',['pil30','pil41']),
node('pil41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['pil31','pil40']),
node('pil42','Toughened',4,2,25,'Increase wound threshold by 2.','Passive',['pil32','pil43']),
node('pil43','Brilliant Evasion',4,3,25,'Once per encounter, win an opposed Piloting check to keep one opponent from attacking you for several rounds.','Active',['pil33','pil42'])
]
};
Object.assign(EXACT_TREES,AOR_CORE_COMMANDER_ACE_TREES);

const PHASE37_STANDARD_SPECS=new Set(["Agitator", "Ambassador", "Quartermaster", "Advocate", "Analyst", "Propagandist", "Commando", "Medic", "Sharpshooter", "Trailblazer", "Vanguard", "Saboteur", "Scientist", "Droid Specialist", "Sapper", "Infiltrator", "Courier", "Interrogator", "Sleeper Agent", "Arbiter", "Ascetic", "Teacher", "Warden", "Warleader", "Alchemist", "Magus", "Prophet", "Executioner", "Hermit", "Navigator", "Investigator", "Racer", "Sentry", "Mechanic", "Scout", "Shipwright"]);
function phase37Grid(spec,names){let arr=[];for(let r=0;r<5;r++)for(let c=0;c<4;c++){let i=r*4+c,id=`p37-${spec.replace(/[^a-z0-9]/gi,'').toLowerCase()}-${r}-${c}`,links=[];if(c>0)links.push(`p37-${spec.replace(/[^a-z0-9]/gi,'').toLowerCase()}-${r}-${c-1}`);if(c<3)links.push(`p37-${spec.replace(/[^a-z0-9]/gi,'').toLowerCase()}-${r}-${c+1}`);if(r>0)links.push(`p37-${spec.replace(/[^a-z0-9]/gi,'').toLowerCase()}-${r-1}-${c}`);if(r<4)links.push(`p37-${spec.replace(/[^a-z0-9]/gi,'').toLowerCase()}-${r+1}-${c}`);let name=names[i],isForce=['Force Rating','Sense Danger','Uncanny Senses','Uncanny Reactions','Reflect','Parry','Balance','Touch of Fate','Preemptive Avoidance'].includes(name);arr.push(node(id,name,r,c,(r+1)*5,name==='Dedication'?'Increase one characteristic by 1, maximum 6.':name==='Force Rating'?'Increase Force Rating by 1.':'Phase 37 standardized progression node. Consult the cited sourcebook for the exact full talent text and prerequisite geometry.',isForce?'Force Passive':'Passive',links))}return arr}
const PHASE37_TREES={
"Agitator":phase37Grid("Agitator",["Plausible Deniability", "Side Step", "Point Blank", "Brace", "Natural Skill", "Intimidating", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Scathing Tirade", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Dedication"]),
"Ambassador":phase37Grid("Ambassador",["Indistinguishable", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Kill with Kindness", "Durable", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Hard Headed", "True Aim", "Inspiring Rhetoric", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Dedication"]),
"Quartermaster":phase37Grid("Quartermaster",["Know Somebody", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Wheel and Deal", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Master Merchant", "Durable", "Side Step", "Point Blank", "Brace", "Dedication"]),
"Advocate":phase37Grid("Advocate",["Plausible Deniability", "Side Step", "Point Blank", "Brace", "Natural Skill", "Congenial", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Nobody’s Fool", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Dedication"]),
"Analyst":phase37Grid("Analyst",["Researcher", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Valuable Facts", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Knowledge Specialization", "Durable", "Side Step", "Point Blank", "Brace", "Dedication"]),
"Propagandist":phase37Grid("Propagandist",["Kill with Kindness", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Inspiring Rhetoric", "Resolve", "Durable", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Hard Headed", "Positive Spin", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Dedication"]),
"Commando":phase37Grid("Commando",["Physical Training", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Toughened", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Resolve", "Durable", "Durable", "Point Blank", "Brace", "Natural Skill", "Dedication", "Dedication"]),
"Medic":phase37Grid("Medic",["Surgeon", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Resolve", "Bacta Specialist", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Stim Application", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Dedication"]),
"Sharpshooter":phase37Grid("Sharpshooter",["True Aim", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Resolve", "Sniper Shot", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Deadly Accuracy", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Dedication"]),
"Trailblazer":phase37Grid("Trailblazer",["Expert Tracker", "Point Blank", "Brace", "Natural Skill", "Dedication", "Forager", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Stalker", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Resolve", "Dedication"]),
"Vanguard":phase37Grid("Vanguard",["Body Guard", "Rapid Recovery", "Resolve", "Durable", "Side Step", "Toughened", "Brace", "Natural Skill", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Improved Body Guard", "Stalker", "Grit", "Toughened", "Confidence", "Dedication"]),
"Saboteur":phase37Grid("Saboteur",["Demolitionist", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Powerful Blast", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Resolve", "Durable", "Side Step", "Point Blank", "Brace", "Selective Detonation", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Dedication"]),
"Scientist":phase37Grid("Scientist",["Researcher", "Natural Skill", "Dedication", "Hard Headed", "True Aim", "Knowledge Specialization", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Inventor", "Rapid Recovery", "Resolve", "Durable", "Side Step", "Dedication"]),
"Droid Specialist":phase37Grid("Droid Specialist",["Machine Mender", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Gearhead", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Speaks Binary", "Resolve", "Durable", "Side Step", "Point Blank", "Dedication"]),
"Sapper":phase37Grid("Sapper",["Brace", "Grit", "Toughened", "Confidence", "Rapid Reaction", "Explosive Engineer", "Rapid Recovery", "Resolve", "Durable", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Improvised Position", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Dedication"]),
"Infiltrator":phase37Grid("Infiltrator",["Dodge", "Durable", "Side Step", "Point Blank", "Brace", "Stalker", "Dedication", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Natural Rogue", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Dedication"]),
"Courier":phase37Grid("Courier",["Shortcut", "Brace", "Natural Skill", "Dedication", "Hard Headed", "Swift", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Toughened", "Confidence", "Freerunning", "Quick Draw", "Rapid Recovery", "Resolve", "Durable", "Dedication"]),
"Interrogator":phase37Grid("Interrogator",["Intimidating", "Toughened", "Confidence", "Rapid Reaction", "Quick Draw", "Good Cop", "Resolve", "Durable", "Side Step", "Point Blank", "Brace", "Natural Skill", "Dedication", "Hard Headed", "Bad Cop", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Dedication"]),
"Sleeper Agent":phase37Grid("Sleeper Agent",["Plausible Deniability", "Side Step", "Point Blank", "Brace", "Natural Skill", "Convincing Demeanor", "Hard Headed", "True Aim", "Armor Master", "Jury Rigged", "Field Commander", "Skilled Jockey", "Stalker", "Grit", "Master of Shadows", "Confidence", "Rapid Reaction", "Quick Draw", "Rapid Recovery", "Dedication"]),
"Arbiter":phase37Grid("Arbiter",["Sense Emotions", "Quick Draw", "Dodge", "Conditioned", "Researcher", "Savvy Negotiator", "Preemptive Avoidance", "Grit", "Toughened", "Confidence", "Sense Danger", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Crucial Point", "Reflect", "Parry", "Balance", "Dedication", "Force Rating"]),
"Ascetic":phase37Grid("Ascetic",["Physical Training", "Toughened", "Confidence", "Sense Danger", "Uncanny Senses", "Force Protection", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Iron Soul", "Dodge", "Conditioned", "Researcher", "Dedication", "Force Rating"]),
"Teacher":phase37Grid("Teacher",["Researcher", "Toughened", "Confidence", "Sense Danger", "Uncanny Senses", "Respected Scholar", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Well Rounded", "Dodge", "Conditioned", "Researcher", "Dedication", "Force Rating"]),
"Warden":phase37Grid("Warden",["Intimidating", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Precision Strike", "Dodge", "Conditioned", "Researcher", "Keen Eyed", "Preemptive Avoidance", "Grit", "Toughened", "Confidence", "Scathing Tirade", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Dedication", "Force Rating"]),
"Warleader":phase37Grid("Warleader",["Prime Positions", "Grit", "Toughened", "Confidence", "Sense Danger", "Suppressing Fire", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Coordinated Assault", "Quick Draw", "Dodge", "Conditioned", "Dedication", "Force Rating"]),
"Alchemist":phase37Grid("Alchemist",["Stimpack Specialization", "Sense Danger", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Alchemical Arts", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Quick Draw", "Dodge", "Identify Ingredients", "Researcher", "Keen Eyed", "Preemptive Avoidance", "Dedication", "Force Rating"]),
"Magus":phase37Grid("Magus",["Healing Trance", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Channel Agony", "Dodge", "Conditioned", "Researcher", "Keen Eyed", "Preemptive Avoidance", "Grit", "Toughened", "Confidence", "Secret Lore", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Dedication", "Force Rating"]),
"Prophet":phase37Grid("Prophet",["Overwhelming Aura", "Preemptive Avoidance", "Grit", "Toughened", "Confidence", "Scathing Tirade", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Inspiring Rhetoric", "Force Rating", "Quick Draw", "Dodge", "Dedication", "Force Rating"]),
"Executioner":phase37Grid("Executioner",["Quick Strike", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Hunter’s Quarry", "Parry", "Balance", "Touch of Fate", "Dedication", "Force Rating", "Quick Draw", "Dodge", "Conditioned", "Lethal Blows", "Keen Eyed", "Preemptive Avoidance", "Grit", "Dedication", "Force Rating"]),
"Hermit":phase37Grid("Hermit",["Forager", "Keen Eyed", "Preemptive Avoidance", "Grit", "Toughened", "Soothing Tone", "Sense Danger", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "One with Nature", "Dedication", "Force Rating", "Quick Draw", "Dedication", "Force Rating"]),
"Navigator":phase37Grid("Navigator",["Studious Plotting", "Grit", "Toughened", "Confidence", "Sense Danger", "Galaxy Mapper", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Planet Mapper", "Quick Draw", "Dodge", "Conditioned", "Dedication", "Force Rating"]),
"Investigator":phase37Grid("Investigator",["Street Smarts", "Grit", "Toughened", "Confidence", "Sense Danger", "Keen Eyed", "Uncanny Reactions", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Balance", "Touch of Fate", "Dedication", "Reconstruct the Scene", "Quick Draw", "Dodge", "Conditioned", "Dedication", "Force Rating"]),
"Racer":phase37Grid("Racer",["Skilled Jockey", "Quick Draw", "Dodge", "Conditioned", "Researcher", "Shortcut", "Preemptive Avoidance", "Grit", "Toughened", "Confidence", "Sense Danger", "Uncanny Senses", "Uncanny Reactions", "Rapid Recovery", "Full Throttle", "Reflect", "Parry", "Balance", "Dedication", "Force Rating"]),
"Sentry":phase37Grid("Sentry",["Toughened", "Rapid Recovery", "Resolve", "Reflect", "Parry", "Reflect", "Touch of Fate", "Dedication", "Force Rating", "Quick Draw", "Dodge", "Conditioned", "Researcher", "Keen Eyed", "Saber Throw", "Grit", "Toughened", "Confidence", "Dedication", "Force Rating"]),
"Mechanic":phase37Grid("Mechanic",["Gearhead","Grit","Toughened","Quick Draw","Solid Repairs","Jury Rigged","Inventor","Rapid Recovery","Bad Motivator","Brace","Durable","Natural Skill","Armor Master","Hard Headed","Dedication","Point Blank","Skilled Jockey","Resolve","True Aim","Dedication"]),
"Scout":phase37Grid("Scout",["Rapid Recovery","Forager","Expert Tracker","Quick Strike","Stalker","Shortcut","Keen Eyed","Swift","Disorient","Toughened","Grit","Side Step","Natural Outdoorsman","Rapid Reaction","Dedication","Durable","Confidence","Brace","True Aim","Dedication"]),
"Shipwright":phase37Grid("Shipwright",["Solid Repairs","Gearhead","Grit","Toughened","Eye for Detail","Inventor","Jury Rigged","Brace","Push the Specs","Rapid Recovery","Resolve","Durable","Master Artisan","Skilled Jockey","Dedication","Hard Headed","Armor Master","Natural Skill","True Aim","Dedication"]),
};
const SPECIALIZATION_TREE_SOURCE={
"Mechanic":"Age of Rebellion Core / Edge of the Empire shared specialization · standardized Phase 37 topology",
"Agitator":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Ambassador":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Quartermaster":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Advocate":"Desperate Allies \u00b7 standardized Phase 37 topology",
"Analyst":"Desperate Allies \u00b7 standardized Phase 37 topology",
"Propagandist":"Desperate Allies \u00b7 standardized Phase 37 topology",
"Commando":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Medic":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Sharpshooter":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Trailblazer":"Forged in Battle \u00b7 standardized Phase 37 topology",
"Vanguard":"Forged in Battle \u00b7 standardized Phase 37 topology",
"Saboteur":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Scientist":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Droid Specialist":"Fully Operational \u00b7 standardized Phase 37 topology",
"Sapper":"Fully Operational \u00b7 standardized Phase 37 topology",
"Shipwright":"Fully Operational \u00b7 existing specialization package",
"Infiltrator":"Age of Rebellion Core \u00b7 standardized Phase 37 topology",
"Scout":"Age of Rebellion Core / Enter the Unknown shared specialization",
"Courier":"Cyphers and Masks \u00b7 standardized Phase 37 topology",
"Interrogator":"Cyphers and Masks \u00b7 standardized Phase 37 topology",
"Sleeper Agent":"Cyphers and Masks \u00b7 standardized Phase 37 topology",
"Arbiter":"Disciples of Harmony \u00b7 standardized Phase 37 topology",
"Ascetic":"Disciples of Harmony \u00b7 standardized Phase 37 topology",
"Teacher":"Disciples of Harmony \u00b7 standardized Phase 37 topology",
"Warden":"Keeping the Peace \u00b7 standardized Phase 37 topology",
"Warleader":"Keeping the Peace \u00b7 standardized Phase 37 topology",
"Alchemist":"Unlimited Power \u00b7 standardized Phase 37 topology",
"Magus":"Unlimited Power \u00b7 standardized Phase 37 topology",
"Prophet":"Unlimited Power \u00b7 standardized Phase 37 topology",
"Executioner":"Savage Spirits \u00b7 standardized Phase 37 topology",
"Hermit":"Savage Spirits \u00b7 standardized Phase 37 topology",
"Navigator":"Savage Spirits \u00b7 standardized Phase 37 topology",
"Investigator":"Endless Vigil \u00b7 standardized Phase 37 topology",
"Racer":"Endless Vigil \u00b7 standardized Phase 37 topology",
"Sentry":"Endless Vigil \u00b7 standardized Phase 37 topology",

'Assassin':'Edge of the Empire core line',
'Scoundrel':'Edge of the Empire core line',
'Slicer':'Edge of the Empire core line',
'Armorer':'Keeping the Peace · full source tree',
'Colossus':'Knights of Fate · full source tree',
'Juyo Berserker':'Knights of Fate · full source tree',
'Steel Hand Adept':'Knights of Fate · full source tree',
'Niman Disciple':'Force and Destiny Core · p.70',
'Soresu Defender':'Force and Destiny Core · p.77',
'Makashi Duelist':'Force and Destiny Core · p.82',
'Ataru Striker':'Force and Destiny Core · p.87',
'Shien Expert':'Force and Destiny Core · p.95',
'Shii-Cho Knight':'Force and Destiny Core · p.100',
'Healer':'Force and Destiny Core · p.69',
'Sage':'Force and Destiny Core · p.71',
'Peacekeeper':'Force and Destiny Core · p.75',
'Protector':'Force and Destiny Core · p.76',
'Advisor':'Force and Destiny Core · p.81',
'Seer':'Force and Destiny Core · p.83',
'Hunter':'Force and Destiny Core · p.88',
'Pathfinder':'Force and Destiny Core · p.89',
'Artisan':'Force and Destiny Core · p.93',
'Shadow':'Force and Destiny Core · p.94',
'Aggressor':'Force and Destiny Core · p.99',
'Starfighter Ace':'Force and Destiny Core · p.101',
'Martial Artist':'No Disintegrations · talent tree p.30',
'Operator':'No Disintegrations · talent tree p.32',
'Skip Tracer':'No Disintegrations · talent tree p.34',
'Charmer':'Fly Casual · talent tree p.28',
'Gambler':'Fly Casual · talent tree p.30',
'Gunslinger':'Fly Casual · talent tree p.32',
'Cyber Tech':'Special Modifications · talent tree p.29',
'Droid Tech':'Special Modifications · talent tree p.31',
'Modder':'Special Modifications · talent tree p.33',
'Demolitionist':'Dangerous Covenants · Demolitionist talent tree',
'Enforcer':'Dangerous Covenants · Enforcer talent tree',
'Heavy':'Dangerous Covenants · Heavy talent tree',
'Entrepreneur':'Far Horizons · talent tree p.27',
'Marshal':'Far Horizons · talent tree p.29',
'Performer':'Far Horizons · talent tree p.31',
'Archaeologist':'Enter the Unknown · talent tree p.25',
'Big-Game Hunter':'Enter the Unknown · talent tree p.27',
'Driver':'Age of Rebellion Core · p.67 / Enter the Unknown · talent tree p.29',
'Figurehead':'Lead by Example · talent tree p.29',
'Instructor':'Lead by Example · talent tree p.31',
'Strategist':'Lead by Example · talent tree p.33',
'Beast Rider':'Stay on Target · talent tree p.27',
'Hotshot':'Stay on Target · talent tree p.29',
'Rigger':'Stay on Target · talent tree p.31',
'Commodore':'Age of Rebellion Core · p.73',
'Squadron Leader':'Age of Rebellion Core · p.74',
'Tactician':'Age of Rebellion Core · p.75',
'Gunner':'Age of Rebellion Core · p.68',
'Pilot':'Age of Rebellion Core · p.69'
};

const FULL_SOURCE_TREES=new Set(['Healer','Niman Disciple','Sage','Peacekeeper','Protector','Soresu Defender','Advisor','Makashi Duelist','Seer','Ataru Striker','Hunter','Pathfinder','Artisan','Shadow','Shien Expert','Aggressor','Shii-Cho Knight','Starfighter Ace']);
const FORM_TREES={
'Niman Disciple':[
node('n00','Parry',0,0,5,'Reduce melee-hit damage by suffering strain.','Active',['n10']),
node('n01',"Nobody's Fool",0,1,5,'Upgrade incoming Charm, Coercion, or Deception checks once per rank.','Passive',['n11']),
node('n02','Reflect',0,2,5,'Reduce ranged-hit damage by suffering strain.','Active',['n12']),
node('n03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',['n13']),
node('n10','Defensive Training',1,0,10,'Appropriate melee weapons gain Defensive equal to ranks.','Passive',['n00','n11','n20']),
node('n11','Niman Technique',1,1,10,'Use Willpower instead of Brawn for Lightsaber checks.','Force Passive',['n01','n10','n21']),
node('n12','Toughened',1,2,10,'Increase wound threshold by 2.','Passive',['n02','n22']),
node('n13','Parry',1,3,10,'Additional rank of Parry.','Active',['n03','n23']),
node('n20','Parry',2,0,15,'Additional rank of Parry.','Active',['n10','n21','n30']),
node('n21','Sense Emotions',2,1,15,'Add a Boost to Charm, Coercion, and Deception against targets vulnerable to Force powers.','Force Passive',['n11','n20','n22','n31']),
node('n22','Reflect',2,2,15,'Additional rank of Reflect.','Active',['n12','n21','n23','n32']),
node('n23','Defensive Training',2,3,15,'Additional rank of Defensive Training.','Passive',['n13','n22','n33']),
node('n30','Sum Djem',3,0,20,'Spend narrative results on a successful Lightsaber check to disarm the opponent.','Force Passive',['n20','n31','n40']),
node('n31','Reflect',3,1,20,'Additional rank of Reflect.','Active',['n21','n30','n32','n41']),
node('n32','Draw Closer',3,2,20,'Make a Willpower-based Lightsaber attack and spend Force results to pull the target closer or add success.','Force Active',['n22','n31','n33','n42']),
node('n33','Center of Being',3,3,20,'Maneuver that raises incoming Critical ratings until the next turn.','Force Active',['n23','n32','n43']),
node('n40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['n30','n41']),
node('n41','Force Assault',4,1,25,'After a missed Lightsaber attack, spend narrative results to make Move as a maneuver.','Force Passive',['n31','n40']),
node('n42','Force Rating',4,2,25,'Increase Force Rating by 1.','Force Passive',['n32','n43']),
node('n43','Improved Center of Being',4,3,25,'Center of Being may be performed as an incidental for strain.','Force Passive',['n33','n42'])
],
'Soresu Defender':[
node('so00','Parry',0,0,5,'Reduce melee-hit damage by suffering strain.','Active',['so10']),
node('so01','Parry',0,1,5,'Additional rank of Parry.','Active',['so11']),
node('so02','Toughened',0,2,5,'Increase wound threshold by 2.','Passive',['so12']),
node('so03','Defensive Stance',0,3,5,'Spend strain as a maneuver to upgrade incoming melee attacks.','Active',['so13']),
node('so10','Soresu Technique',1,0,10,'Use Intellect instead of Brawn for Lightsaber checks.','Force Passive',['so00','so11','so20']),
node('so11','Reflect',1,1,10,'Reduce ranged-hit damage by suffering strain.','Active',['so01','so10','so12','so21']),
node('so12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['so02','so11','so22']),
node('so13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['so03','so23']),
node('so20','Confidence',2,0,15,'Decrease fear-check difficulty by ranks.','Passive',['so10','so21','so30']),
node('so21','Improved Parry',2,1,15,'Certain narrative results on Parry can strike the attacker after the original attack resolves.','Passive',['so11','so20','so22','so31']),
node('so22','Defensive Circle',2,2,15,'Hard Intellect/Lightsaber action can grant defense to nearby allies.','Force Active',['so12','so21','so32']),
node('so23','Parry',2,3,15,'Additional rank of Parry.','Active',['so13','so33']),
node('so30','Parry',3,0,20,'Additional rank of Parry.','Active',['so20','so31','so40']),
node('so31','Reflect',3,1,20,'Additional rank of Reflect.','Active',['so21','so30','so32','so41']),
node('so32','Reflect',3,2,20,'Additional rank of Reflect.','Active',['so22','so31','so33','so42']),
node('so33','Defensive Stance',3,3,20,'Additional rank of Defensive Stance.','Active',['so23','so32','so43']),
node('so40','Supreme Parry',4,0,25,'If no combat check was made during the previous turn, Parry costs less strain.','Passive',['so30','so41']),
node('so41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['so31','so40','so42']),
node('so42','Improved Reflect',4,2,25,'Certain narrative results on Reflect can redirect the hit to another target.','Passive',['so32','so41','so43']),
node('so43','Strategic Form',4,3,25,'Hard Intellect/Lightsaber action can prevent a nearby foe from attacking chosen targets briefly.','Force Active',['so33','so42'])
],
'Makashi Duelist':[
node('mk00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['mk10']),
node('mk01','Resist Disarm',0,1,5,'Suffer strain to avoid being disarmed or having a weapon damaged or destroyed.','Active',['mk11']),
node('mk02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['mk12']),
node('mk03','Parry',0,3,5,'Reduce melee-hit damage by suffering strain.','Active',['mk13']),
node('mk10','Parry',1,0,10,'Additional rank of Parry.','Active',['mk00','mk11','mk20']),
node('mk11','Makashi Technique',1,1,10,'Use Presence instead of Brawn for Lightsaber checks.','Force Passive',['mk01','mk10','mk12','mk21']),
node('mk12',"Duelist's Training",1,2,10,'Gain a Boost on Melee/Lightsaber checks when engaged with one opponent.','Passive',['mk02','mk11','mk13','mk22']),
node('mk13','Feint',1,3,10,'Spend narrative results from a missed melee attack to upgrade the opponent’s next attack.','Passive',['mk03','mk12','mk23']),
node('mk20','Parry',2,0,15,'Additional rank of Parry.','Active',['mk10','mk21','mk30']),
node('mk21','Feint',2,1,15,'Additional rank of Feint.','Passive',['mk11','mk20','mk22','mk31']),
node('mk22','Parry',2,2,15,'Additional rank of Parry.','Active',['mk12','mk21','mk23','mk32']),
node('mk23','Parry',2,3,15,'Additional rank of Parry.','Active',['mk13','mk22','mk33']),
node('mk30','Intense Presence',3,0,20,'Spend Destiny to recover strain equal to Presence.','Active',['mk20','mk31','mk40']),
node('mk31','Improved Parry',3,1,20,'Certain narrative results on Parry can strike the attacker.','Passive',['mk21','mk30','mk32','mk41']),
node('mk32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['mk22','mk31','mk33','mk42']),
node('mk33','Defensive Training',3,3,20,'Appropriate melee weapons gain Defensive equal to ranks.','Passive',['mk23','mk32','mk43']),
node('mk40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['mk30','mk41']),
node('mk41','Sum Djem',4,1,25,'Spend narrative results on a successful Lightsaber check to disarm the opponent.','Force Passive',['mk31','mk40']),
node('mk42','Makashi Finish',4,2,25,'Presence-based Lightsaber action can add Force Rating to a Critical Injury roll.','Force Active',['mk32']),
node('mk43','Makashi Flourish',4,3,25,'Once per encounter, opposed Presence/Lightsaber action can recover strain.','Force Active',['mk33'])
],
'Ataru Striker':[
node('at00','Conditioned',0,0,5,'Remove Setback from Athletics and Coordination; reduce falling harm.','Passive',['at10']),
node('at01','Parry',0,1,5,'Reduce melee-hit damage by suffering strain.','Active',['at11']),
node('at02','Jump Up',0,2,5,'Stand from prone once per round as an incidental.','Active',['at12']),
node('at03','Quick Draw',0,3,5,'Draw/holster a weapon or access an item once per round as an incidental.','Active',['at13']),
node('at10','Dodge',1,0,10,'Suffer strain to upgrade an incoming combat check.','Active',['at00','at20']),
node('at11','Reflect',1,1,10,'Reduce ranged-hit damage by suffering strain.','Active',['at01','at12','at21']),
node('at12','Ataru Technique',1,2,10,'Use Agility instead of Brawn for Lightsaber checks.','Force Passive',['at02','at11','at22']),
node('at13','Quick Strike',1,3,10,'Gain Boost against targets that have not yet acted.','Passive',['at03','at23']),
node('at20','Quick Strike',2,0,15,'Additional rank of Quick Strike.','Passive',['at10','at30']),
node('at21','Reflect',2,1,15,'Additional rank of Reflect.','Active',['at11','at22','at31']),
node('at22','Parry',2,2,15,'Additional rank of Parry.','Active',['at12','at21','at23','at32']),
node('at23','Improved Parry',2,3,15,'Certain narrative results on Parry can strike the attacker.','Passive',['at13','at22','at33']),
node('at30','Dodge',3,0,20,'Additional rank of Dodge.','Active',['at20','at40']),
node('at31','Hawk Bat Swoop',3,1,20,'Agility/Lightsaber action can engage a short-range target and spend Force results for success.','Force Active',['at21','at41']),
node('at32','Saber Swarm',3,2,20,'Maneuver; suffer strain so the next Agility/Lightsaber attack gains Linked equal to Force Rating.','Force Active',['at22','at33','at42']),
node('at33','Conditioned',3,3,20,'Additional rank of Conditioned.','Passive',['at23','at32','at43']),
node('at40','Parry',4,0,25,'Additional rank of Parry.','Active',['at30','at41']),
node('at41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['at31','at40','at42']),
node('at42','Saber Throw',4,2,25,'Make a Force-assisted Lightsaber attack out to Medium range and call the weapon back.','Force Active',['at32','at41']),
node('at43','Balance',4,3,25,'At encounter end, use Force results to recover additional strain.','Force Active',['at33'])
],
'Shien Expert':[
node('sh00','Side Step',0,0,5,'Suffer strain as a maneuver to upgrade incoming ranged attacks.','Active',['sh10']),
node('sh01','Conditioned',0,1,5,'Remove Setback from Athletics and Coordination; reduce falling harm.','Passive',['sh11']),
node('sh02','Street Smarts',0,2,5,'Remove Setback from Streetwise and Knowledge (Underworld).','Passive',['sh12']),
node('sh03','Reflect',0,3,5,'Reduce ranged-hit damage by suffering strain.','Active',['sh13']),
node('sh10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['sh00','sh11','sh20']),
node('sh11','Parry',1,1,10,'Reduce melee-hit damage by suffering strain.','Active',['sh01','sh10','sh21']),
node('sh12','Shien Technique',1,2,10,'Use Cunning instead of Brawn for Lightsaber checks.','Force Passive',['sh02','sh13','sh22']),
node('sh13','Reflect',1,3,10,'Additional rank of Reflect.','Active',['sh03','sh12','sh23']),
node('sh20','Parry',2,0,15,'Additional rank of Parry.','Active',['sh10','sh21','sh30']),
node('sh21','Counterstrike',2,1,15,'After an opponent misses with certain negative results, upgrade your next Lightsaber attack against that opponent.','Force Passive',['sh11','sh20','sh31']),
node('sh22','Grit',2,2,15,'Increase strain threshold by 1.','Passive',['sh12','sh23','sh32']),
node('sh23','Improved Reflect',2,3,15,'Certain narrative results on Reflect can redirect the hit to another target.','Passive',['sh13','sh22','sh33']),
node('sh30','Djem So Deflection',3,0,20,'After using Reflect, spend Destiny to reposition closer to or engage the opponent.','Force Active',['sh20','sh31','sh40']),
node('sh31','Defensive Stance',3,1,20,'Additional rank of Defensive Stance.','Active',['sh21','sh30','sh32','sh41']),
node('sh32','Saber Throw',3,2,20,'Make a Force-assisted Lightsaber attack out to Medium range and call the weapon back.','Force Active',['sh22','sh31','sh33','sh42']),
node('sh33','Reflect',3,3,20,'Additional rank of Reflect.','Active',['sh23','sh32','sh43']),
node('sh40','Falling Avalanche',4,0,25,'Suffer strain to add Brawn to the next successful Lightsaber hit.','Force Active',['sh30','sh41']),
node('sh41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['sh31','sh40','sh42']),
node('sh42','Disruptive Strike',4,2,25,'Cunning/Lightsaber action can spend Force results to hinder the target’s next combat check.','Force Active',['sh32','sh41','sh43']),
node('sh43','Supreme Reflect',4,3,25,'If no combat check was made during the previous turn, Reflect costs less strain.','Force Passive',['sh33','sh42'])
],
'Shii-Cho Knight':[
node('sc00','Parry',0,0,5,'Reduce melee-hit damage by suffering strain.','Active',['sc10']),
node('sc01','Second Wind',0,1,5,'Once per encounter recover strain equal to ranks.','Active',['sc11']),
node('sc02','Toughened',0,2,5,'Increase wound threshold by 2.','Passive',['sc12']),
node('sc03','Parry',0,3,5,'Additional rank of Parry.','Active',['sc13']),
node('sc10','Second Wind',1,0,10,'Additional rank of Second Wind.','Active',['sc00','sc11','sc20']),
node('sc11','Conditioned',1,1,10,'Remove Setback from Athletics and Coordination; reduce falling harm.','Passive',['sc01','sc10','sc12','sc21']),
node('sc12','Multiple Opponents',1,2,10,'Gain a Boost on close-combat checks when engaged with multiple opponents.','Passive',['sc02','sc11','sc22']),
node('sc13','Durable',1,3,10,'Reduce Critical Injury rolls suffered by 10 per rank.','Passive',['sc03','sc23']),
node('sc20','Quick Draw',2,0,15,'Draw/holster a weapon or access an item once per round as an incidental.','Active',['sc10','sc30']),
node('sc21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['sc11','sc22','sc31']),
node('sc22','Parry',2,2,15,'Additional rank of Parry.','Active',['sc12','sc21','sc23','sc32']),
node('sc23','Defensive Training',2,3,15,'Appropriate melee weapons gain Defensive equal to ranks.','Passive',['sc13','sc22','sc33']),
node('sc30','Natural Blademaster',3,0,20,'Once per session reroll a Lightsaber or Melee check.','Active',['sc20','sc31','sc40']),
node('sc31','Sarlacc Sweep',3,1,20,'Harder Lightsaber attack can spend Advantage to hit additional engaged targets.','Force Active',['sc21','sc30','sc41']),
node('sc32','Improved Parry',3,2,20,'Certain narrative results on Parry can strike the attacker.','Passive',['sc22','sc33','sc42']),
node('sc33','Sum Djem',3,3,20,'Spend narrative results on a successful Lightsaber check to disarm the opponent.','Force Passive',['sc23','sc32','sc43']),
node('sc40','Center of Being',4,0,25,'Maneuver that raises incoming Critical ratings until the next turn.','Force Active',['sc30','sc41']),
node('sc41','Durable',4,1,25,'Additional rank of Durable.','Passive',['sc31','sc40','sc42']),
node('sc42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['sc32','sc41','sc43']),
node('sc43','Parry',4,3,25,'Additional rank of Parry.','Active',['sc33','sc42'])
]
};

const CORE_FAD_TREES={
'Healer':[
node('he00','Surgeon',0,0,5,'Medicine wound treatment heals +1 wound per rank.','Passive',['he10']),
node('he01','Healing Trance',0,1,5,'Commit Force to heal wounds over the course of a full encounter.','Force Active',['he11']),
node('he02','Rapid Recovery',0,2,5,'Recover additional strain after an encounter.','Passive',['he12']),
node('he03','Physician',0,3,5,'Medicine wound treatment also heals additional strain.','Passive',[]),
node('he10','Physician',1,0,10,'Additional rank of Physician.','Passive',['he00','he11','he20']),
node('he11','Physician',1,1,10,'Additional rank of Physician.','Passive',['he01','he10']),
node('he12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['he02','he13']),
node('he13','Healing Trance',1,3,10,'Additional rank of Healing Trance.','Force Active',['he12','he23']),
node('he20','Healing Trance',2,0,15,'Additional rank of Healing Trance.','Force Active',['he10','he21','he30']),
node('he21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['he20','he22','he31']),
node('he22','Knowledgeable Healing',2,2,15,'Spend Destiny when healing an ally to add wounds healed based on Knowledge (Xenology).','Active',['he21','he32']),
node('he23','Rapid Recovery',2,3,15,'Additional rank of Rapid Recovery.','Passive',['he13','he33']),
node('he30','Surgeon',3,0,20,'Additional rank of Surgeon.','Passive',['he20','he40']),
node('he31','Improved Healing Trance',3,1,20,'Healing Trance may also attempt to heal a Critical Injury.','Force Passive',['he21','he41']),
node('he32','Calming Aura',3,2,20,'Force powers targeting the character generate less Advantage.','Force Passive',['he22','he42']),
node('he33','Toughened',3,3,20,'Increase wound threshold by 2.','Passive',['he23']),
node('he40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['he30','he41']),
node('he41','Natural Doctor',4,1,25,'Once per session reroll one Medicine check.','Active',['he31','he40','he42']),
node('he42','Force Rating',4,2,25,'Increase Force Rating by 1.','Force Passive',['he32','he41','he43']),
node('he43','Improved Calming Aura',4,3,25,'Extend Calming Aura to nearby allies for strain.','Force Active',['he42'])
],
'Sage':[
node('sg00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',[]),
node('sg01','Kill with Kindness',0,1,5,'Remove Setback from Charm and Leadership checks.','Passive',['sg11']),
node('sg02','Researcher',0,2,5,'Remove Setback from Knowledge checks and research more quickly.','Passive',['sg12']),
node('sg03','Grit',0,3,5,'Increase strain threshold by 1.','Passive',[]),
node('sg10','Smooth Talker',1,0,10,'Choose a social skill; spend Triumph to gain extra success.','Active',['sg11','sg20']),
node('sg11','Researcher',1,1,10,'Additional rank of Researcher.','Passive',['sg01','sg10','sg12','sg21']),
node('sg12','Confidence',1,2,10,'Reduce fear-check difficulty.','Passive',['sg02','sg11','sg13','sg22']),
node('sg13','Knowledge Specialization',1,3,10,'Choose a Knowledge skill; Triumph can generate additional success.','Active',['sg12']),
node('sg20','Valuable Facts',2,0,15,'Once per encounter, a successful Knowledge check can add Triumph to an ally’s later check.','Active',['sg10','sg21']),
node('sg21','Smooth Talker',2,1,15,'Additional rank of Smooth Talker.','Active',['sg11','sg20','sg31']),
node('sg22','Knowledge Specialization',2,2,15,'Additional Knowledge Specialization.','Active',['sg12','sg23','sg32']),
node('sg23','One with the Universe',2,3,15,'Once per session meditate with Astrogation to improve the next encounter’s Force results.','Force Active',['sg22','sg33']),
node('sg30','Force Rating',3,0,20,'Increase Force Rating by 1.','Force Passive',['sg40','sg31']),
node('sg31','Grit',3,1,20,'Increase strain threshold by 1.','Passive',['sg21','sg30','sg32','sg41']),
node('sg32','Preemptive Avoidance',3,2,20,'Spend Destiny to disengage from an engaged enemy as an out-of-turn incidental.','Force Active',['sg22','sg31','sg42']),
node('sg33','Knowledge Specialization',3,3,20,'Additional Knowledge Specialization.','Active',['sg23','sg43']),
node('sg40','Balance',4,0,25,'At encounter end, use Force results to recover additional strain.','Force Active',['sg30']),
node('sg41','The Force Is My Ally',4,1,25,'Once per session suffer strain to perform a Force-power action as a maneuver.','Force Active',['sg31','sg42']),
node('sg42','Natural Negotiator',4,2,25,'Once per session reroll one Cool or Negotiation check.','Active',['sg32','sg41','sg43']),
node('sg43','Force Rating',4,3,25,'Increase Force Rating by 1.','Force Passive',['sg33','sg42'])
],
'Peacekeeper':[
node('pk00','Command',0,0,5,'Add Boost to Leadership checks and improve allies’ Discipline after receiving orders.','Passive',['pk10']),
node('pk01','Confidence',0,1,5,'Reduce fear-check difficulty.','Passive',[]),
node('pk02','Second Wind',0,2,5,'Once per encounter recover strain equal to ranks.','Active',['pk12']),
node('pk03','Commanding Presence',0,3,5,'Remove Setback from Leadership and Cool checks.','Passive',['pk13']),
node('pk10','Commanding Presence',1,0,10,'Additional rank of Commanding Presence.','Passive',['pk00','pk11','pk20']),
node('pk11','Toughened',1,1,10,'Increase wound threshold by 2.','Passive',['pk10','pk12','pk21']),
node('pk12','Second Wind',1,2,10,'Additional rank of Second Wind.','Active',['pk02','pk11','pk13','pk22']),
node('pk13','Confidence',1,3,10,'Additional rank of Confidence.','Passive',['pk03','pk12']),
node('pk20','Toughened',2,0,15,'Increase wound threshold by 2.','Passive',['pk10','pk21','pk30']),
node('pk21','Enhanced Leader',2,1,15,'Add Force dice to Leadership checks and spend Force results for success or advantage.','Force Passive',['pk11','pk20']),
node('pk22','Command',2,2,15,'Additional rank of Command.','Passive',['pk12','pk23','pk32']),
node('pk23','Field Commander',2,3,15,'Leadership action lets nearby allies suffer strain to perform free maneuvers.','Active',['pk22','pk33']),
node('pk30','Steely Nerves',3,0,20,'Spend Destiny to ignore Critical Injury effects on Willpower/Presence checks for the encounter.','Active',['pk20','pk31','pk40']),
node('pk31','Second Wind',3,1,20,'Additional rank of Second Wind.','Active',['pk30','pk41']),
node('pk32','Toughened',3,2,20,'Increase wound threshold by 2.','Passive',['pk22','pk33','pk42']),
node('pk33','Improved Field Commander',3,3,20,'Field Commander can affect more allies and potentially grant an action.','Passive',['pk23','pk32','pk43']),
node('pk40','Unity Assault',4,0,25,'After a missed combat check, spend narrative results to perform an allied Force power as a maneuver.','Force Active',['pk30']),
node('pk41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['pk31']),
node('pk42','Force Rating',4,2,25,'Increase Force Rating by 1.','Force Passive',['pk32']),
node('pk43','Natural Leader',4,3,25,'Once per session reroll one Cool or Leadership check.','Active',['pk33'])
],
'Protector':[
node('pr00','Toughened',0,0,5,'Increase wound threshold by 2.','Passive',[]),
node('pr01','Body Guard',0,1,5,'Guard an engaged ally by suffering strain to upgrade attacks against them.','Active',['pr11']),
node('pr02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',[]),
node('pr03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',['pr13']),
node('pr10','Parry',1,0,10,'Reduce melee-hit damage by suffering strain.','Active',['pr11','pr20']),
node('pr11','Physician',1,1,10,'Medicine wound treatment also heals additional strain.','Passive',['pr01','pr10','pr12','pr21']),
node('pr12','Stimpack Specialization',1,2,10,'Stimpacks heal +1 wound per rank.','Passive',['pr11','pr13','pr22']),
node('pr13','Force Protection',1,3,10,'Commit Force and suffer strain each turn to increase soak.','Force Active',['pr03','pr12','pr23']),
node('pr20','Reflect',2,0,15,'Reduce ranged-hit damage by suffering strain.','Active',['pr10','pr30']),
node('pr21','Stimpack Specialization',2,1,15,'Additional rank of Stimpack Specialization.','Passive',['pr11','pr22','pr31']),
node('pr22','Heightened Awareness',2,2,15,'Nearby allies improve Perception/Vigilance; engaged allies gain a larger benefit.','Passive',['pr12','pr21','pr23','pr32']),
node('pr23','Center of Being',2,3,15,'Maneuver that raises incoming Critical ratings until next turn.','Force Active',['pr13','pr22']),
node('pr30','Circle of Shelter',3,0,20,'Use Parry or Reflect to protect an engaged ally.','Force Passive',['pr20','pr31','pr40']),
node('pr31','Force Protection',3,1,20,'Additional rank of Force Protection.','Force Active',['pr21','pr30','pr32','pr41']),
node('pr32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['pr22','pr31','pr33','pr42']),
node('pr33','Body Guard',3,3,20,'Additional rank of Body Guard.','Active',['pr32','pr43']),
node('pr40','Center of Being',4,0,25,'Additional rank of Center of Being.','Force Active',['pr30','pr41']),
node('pr41','Force Rating',4,1,25,'Increase Force Rating by 1.','Force Passive',['pr31','pr40','pr42']),
node('pr42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['pr32','pr41','pr43']),
node('pr43','Improved Body Guard',4,3,25,'Once per session suffer a hit intended for an ally protected by Body Guard.','Active',['pr33','pr42'])
],
'Advisor':[
node('ad00','Plausible Deniability',0,0,5,'Remove Setback from Coercion and Deception checks.','Passive',['ad10']),
node('ad01','Know Somebody',0,1,5,'Once per session reduce the rarity of a legal purchase.','Active',['ad11']),
node('ad02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['ad12']),
node('ad03','Kill with Kindness',0,3,5,'Remove Setback from Charm and Leadership checks.','Passive',['ad13']),
node('ad10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['ad00','ad20']),
node('ad11','Know Somebody',1,1,10,'Additional rank of Know Somebody.','Active',['ad01','ad21']),
node('ad12','Knowledge Is Power',1,2,10,'Once per session count Force Rating as Knowledge (Lore) ranks for one check.','Force Active',['ad02']),
node('ad13',"Nobody's Fool",1,3,10,'Upgrade incoming Charm, Coercion, and Deception checks.','Passive',['ad03','ad23']),
node('ad20','Grit',2,0,15,'Increase strain threshold by 1.','Passive',['ad10','ad30']),
node('ad21','Smooth Talker',2,1,15,'Choose a social skill; spend Triumph for additional success.','Active',['ad11','ad22','ad31']),
node('ad22','Smooth Talker',2,2,15,'Additional rank of Smooth Talker.','Active',['ad21','ad23','ad32']),
node('ad23','Plausible Deniability',2,3,15,'Additional rank of Plausible Deniability.','Passive',['ad13','ad22','ad33']),
node('ad30',"Nobody's Fool",3,0,20,'Additional rank of Nobody’s Fool.','Passive',['ad20','ad31','ad40']),
node('ad31','Natural Charmer',3,1,20,'Once per session reroll a Charm or Deception check.','Active',['ad21','ad30','ad32','ad41']),
node('ad32','Contingency Plan',3,2,20,'Spend Destiny to recover strain equal to Cunning.','Active',['ad22','ad31','ad33','ad42']),
node('ad33','Sense Emotions',3,3,20,'Add Boost to Charm, Coercion, and Deception checks.','Force Passive',['ad23','ad32','ad43']),
node('ad40','Dedication',4,0,25,'Increase one characteristic by 1, maximum 6.','Passive',['ad30','ad41']),
node('ad41','Steely Nerves',4,1,25,'Spend Destiny to ignore Critical Injury effects on Willpower/Presence checks for the encounter.','Active',['ad31','ad40','ad42']),
node('ad42','Force Rating',4,2,25,'Increase Force Rating by 1.','Force Passive',['ad32','ad41','ad43']),
node('ad43','Sense Advantage',4,3,25,'Once per session add two Setback dice to one NPC skill check.','Force Active',['ad33','ad42'])
],
'Seer':[
node('se00','Forager',0,0,5,'Remove Setback from checks to find food, water, or shelter; forage more quickly.','Passive',[]),
node('se01','Uncanny Reactions',0,1,5,'Add Boost to Vigilance checks.','Force Passive',['se11']),
node('se02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',[]),
node('se03','Expert Tracker',0,3,5,'Remove Setback from tracking checks and track more quickly.','Passive',['se13']),
node('se10','Rapid Reaction',1,0,10,'Suffer strain to add Success to Initiative checks.','Active',['se11','se20']),
node('se11','Keen Eyed',1,1,10,'Remove Setback from Perception and Vigilance and search faster.','Passive',['se01','se10','se12','se21']),
node('se12','Uncanny Reactions',1,2,10,'Additional rank of Uncanny Reactions.','Force Passive',['se11','se22']),
node('se13','Toughened',1,3,10,'Increase wound threshold by 2.','Passive',['se03','se23']),
node('se20','Sense Danger',2,0,15,'Once per session remove up to two Setback dice from one check.','Force Active',['se10','se21','se30']),
node('se21','Grit',2,1,15,'Increase strain threshold by 1.','Passive',['se11','se20','se31']),
node('se22','Forewarning',2,2,15,'Action that grants nearby allies defense equal to Force Rating until they act.','Force Active',['se12','se32']),
node('se23','Preemptive Avoidance',2,3,15,'Spend Destiny to disengage from an engaged enemy out of turn.','Force Active',['se13','se33']),
node('se30','Force Rating',3,0,20,'Increase Force Rating by 1.','Force Passive',['se20','se31','se40']),
node('se31','Sense Advantage',3,1,20,'Once per session add two Setback dice to one NPC skill check.','Force Active',['se21','se30','se32','se41']),
node('se32','The Force Is My Ally',3,2,20,'Once per session suffer strain to perform a Force-power action as a maneuver.','Force Active',['se22','se31','se42']),
node('se33','Dodge',3,3,20,'Suffer strain to upgrade an incoming combat check.','Active',['se23','se43']),
node('se40','Rapid Reaction',4,0,25,'Additional rank of Rapid Reaction.','Active',['se30','se41']),
node('se41','Toughened',4,1,25,'Increase wound threshold by 2.','Passive',['se31','se40']),
node('se42','Natural Mystic',4,2,25,'Once per session reroll one Force-power check.','Force Active',['se32','se43']),
node('se43','Force Rating',4,3,25,'Increase Force Rating by 1.','Force Passive',['se33','se42'])
],
'Hunter':[
node('hu00','Rapid Recovery',0,0,5,'Recover additional strain after an encounter.','Passive',['hu10']),
node('hu01','Hunter',0,1,5,'Add Boost when interacting with beasts and improve Critical Injuries against them.','Passive',['hu11']),
node('hu02','Expert Tracker',0,2,5,'Remove Setback from tracking checks and track more quickly.','Passive',[]),
node('hu03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',[]),
node('hu10','Toughened',1,0,10,'Increase wound threshold by 2.','Passive',['hu00','hu11']),
node('hu11','Expert Tracker',1,1,10,'Additional rank of Expert Tracker.','Passive',['hu01','hu10','hu21']),
node('hu12','Hunter',1,2,10,'Additional rank of Hunter.','Passive',['hu22','hu13']),
node('hu13','Uncanny Senses',1,3,10,'Add Boost to Perception checks.','Force Passive',['hu12','hu23']),
node('hu20','Side Step',2,0,15,'Suffer strain as a maneuver to upgrade incoming ranged attacks.','Active',['hu30']),
node('hu21','Keen Eyed',2,1,15,'Remove Setback from Perception and Vigilance and search faster.','Passive',['hu11','hu22','hu31']),
node('hu22','Natural Hunter',2,2,15,'Once per session reroll one Perception or Vigilance check.','Active',['hu12','hu21','hu23']),
node('hu23','Uncanny Reactions',2,3,15,'Add Boost to Vigilance checks.','Force Passive',['hu13','hu22','hu33']),
node('hu30','Rapid Recovery',3,0,20,'Additional rank of Rapid Recovery.','Passive',['hu20','hu31','hu40']),
node('hu31','Soft Spot',3,1,20,'Spend Destiny after a hit to add Cunning to damage.','Active',['hu21','hu30','hu41']),
node('hu32','Sixth Sense',3,2,20,'Increase ranged defense by 1.','Force Passive',['hu33','hu42']),
node('hu33','Rapid Recovery',3,3,20,'Additional rank of Rapid Recovery.','Passive',['hu23','hu32','hu43']),
node('hu40','Side Step',4,0,25,'Additional rank of Side Step.','Active',['hu30']),
node('hu41','Dedication',4,1,25,'Increase one characteristic by 1, maximum 6.','Passive',['hu31','hu42']),
node('hu42','Intuitive Shot',4,2,25,'Add Force dice to ranged attacks and spend Force results for success or advantage.','Force Active',['hu32','hu41','hu43']),
node('hu43','Force Rating',4,3,25,'Increase Force Rating by 1.','Force Passive',['hu33','hu42'])
],
'Pathfinder':[
node('pf00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',['pf10']),
node('pf01','Keen Eyed',0,1,5,'Remove Setback from Perception and Vigilance and search faster.','Passive',['pf11']),
node('pf02','Forager',0,2,5,'Remove Setback from checks to find food, water, or shelter; forage more quickly.','Passive',['pf12']),
node('pf03','Swift',0,3,5,'Ignore normal movement penalties for difficult terrain.','Passive',['pf13']),
node('pf10','Keen Eyed',1,0,10,'Additional rank of Keen Eyed.','Passive',['pf00','pf11','pf20']),
node('pf11','Outdoorsman',1,1,10,'Remove Setback from environmental movement/survival checks and reduce overland travel time.','Passive',['pf01','pf10','pf12','pf21']),
node('pf12','Toughened',1,2,10,'Increase wound threshold by 2.','Passive',['pf02','pf11','pf13','pf22']),
node('pf13','Outdoorsman',1,3,10,'Additional rank of Outdoorsman.','Passive',['pf03','pf12','pf23']),
node('pf20','Animal Empathy',2,0,15,'Add Force dice to checks to handle or tame animals.','Force Active',['pf10','pf21','pf30']),
node('pf21','Animal Bond',2,1,15,'Develop a Force bond with a suitable animal companion.','Force Passive',['pf11','pf20','pf31']),
node('pf22','Grit',2,2,15,'Increase strain threshold by 1.','Passive',['pf12','pf23','pf32']),
node('pf23','Sleight of Mind',2,3,15,'Add Boost to Stealth unless opposition is immune to Force powers.','Force Passive',['pf13','pf22']),
node('pf30','Mental Bond',3,0,20,'Commit Force to communicate with and sense through a bonded animal at long range.','Force Active',['pf20','pf31','pf40']),
node('pf31','Force Rating',3,1,20,'Increase Force Rating by 1.','Force Passive',['pf21','pf30','pf32','pf41']),
node('pf32','Quick Movement',3,2,20,'Suffer strain and use Force to gain an additional Move maneuver after an action.','Force Active',['pf22','pf31','pf33','pf42']),
node('pf33','Toughened',3,3,20,'Increase wound threshold by 2.','Passive',['pf32','pf43']),
node('pf40','Share Pain',4,0,25,'When a bonded animal suffers wounds, reduce them and suffer some yourself.','Force Active',['pf30']),
node('pf41','Enduring',4,1,25,'Increase soak by 1.','Passive',['pf31','pf42']),
node('pf42','Natural Outdoorsman',4,2,25,'Once per session reroll one Resilience or Survival check.','Active',['pf32','pf41','pf43']),
node('pf43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['pf33','pf42'])
],
'Artisan':[
node('art00','Solid Repairs',0,0,5,'Repair one additional hull trauma on successful vehicle/starship repair checks.','Passive',['art10']),
node('art01','Fine Tuning',0,1,5,'Repair one additional system strain on successful vehicle/starship repair checks.','Passive',['art11']),
node('art02','Mental Tools',0,2,5,'Always count as having suitable tools for Mechanics checks.','Force Passive',[]),
node('art03','Technical Aptitude',0,3,5,'Reduce time required for computer-related work.','Passive',['art13']),
node('art10','Grit',1,0,10,'Increase strain threshold by 1.','Passive',['art00','art11','art20']),
node('art11','Solid Repairs',1,1,10,'Additional rank of Solid Repairs.','Passive',['art01','art10','art12','art21']),
node('art12','Fine Tuning',1,2,10,'Additional rank of Fine Tuning.','Passive',['art11','art13','art22']),
node('art13','Grit',1,3,10,'Increase strain threshold by 1.','Passive',['art03','art12','art23']),
node('art20','Inventor',2,0,15,'Improve checks to construct items or modify attachments.','Passive',['art10','art21','art30']),
node('art21','Imbue Item',2,1,15,'Commit Force to temporarily enhance a weapon, armor, or item while paying strain.','Force Active',['art11','art20','art22','art31']),
node('art22','Natural Tinkerer',2,2,15,'Once per session reroll one Mechanics check.','Active',['art12','art21','art23']),
node('art23','Defensive Slicing',2,3,15,'Add Setback to hostile Computers checks against defended systems.','Passive',['art13','art22','art33']),
node('art30','Solid Repairs',3,0,20,'Additional rank of Solid Repairs.','Passive',['art20','art31','art40']),
node('art31','Force Rating',3,1,20,'Increase Force Rating by 1.','Force Passive',['art21','art30','art41']),
node('art32','Defensive Slicing',3,2,20,'Additional rank of Defensive Slicing.','Passive',['art33','art42']),
node('art33','Mental Fortress',3,3,20,'Spend Destiny to ignore some mental Critical Injury penalties for the encounter.','Active',['art23','art32','art43']),
node('art40','Master Artisan',4,0,25,'Once per round suffer strain to reduce the difficulty of the next Mechanics check.','Active',['art30','art41']),
node('art41','Intuitive Improvements',4,1,25,'Add Force dice to crafting/repair checks and spend results to increase hard points.','Force Passive',['art31','art40']),
node('art42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['art32','art43']),
node('art43','Comprehend Technology',4,3,25,'Use a Force-assisted Knowledge check to operate an unfamiliar device with temporary skill ranks.','Force Active',['art33','art42'])
],
'Shadow':[
node('sd00','Sleight of Mind',0,0,5,'Add Boost to Stealth unless opposition is immune to Force powers.','Force Passive',['sd10']),
node('sd01','Street Smarts',0,1,5,'Remove Setback from Streetwise and Knowledge (Underworld).','Passive',['sd11']),
node('sd02','Codebreaker',0,2,5,'Remove Setback from codebreaking/decryption checks and reduce difficulty.','Passive',['sd12']),
node('sd03','Indistinguishable',0,3,5,'Upgrade difficulty of checks to identify the character.','Passive',['sd13']),
node('sd10','Well Rounded',1,0,10,'Choose any two skills and make them career skills.','Passive',['sd00','sd20']),
node('sd11','Mental Fortress',1,1,10,'Spend Destiny to ignore some mental Critical Injury penalties for the encounter.','Active',['sd01','sd21']),
node('sd12','Grit',1,2,10,'Increase strain threshold by 1.','Passive',['sd02','sd13']),
node('sd13','Indistinguishable',1,3,10,'Additional rank of Indistinguishable.','Passive',['sd03','sd12','sd23']),
node('sd20','Shroud',2,0,15,'Spend Destiny to become undetectable by Force powers and conceal your own Force abilities for the encounter.','Force Active',['sd10','sd30']),
node('sd21','Dodge',2,1,15,'Suffer strain to upgrade an incoming combat check.','Active',['sd11','sd22','sd31']),
node('sd22','Sleight of Mind',2,2,15,'Additional rank of Sleight of Mind.','Force Passive',['sd21','sd32']),
node('sd23','Grit',2,3,15,'Increase strain threshold by 1.','Passive',['sd13','sd33']),
node('sd30','Slippery Minded',3,0,20,'Hard Deception action can immediately end ongoing Force effects on the character.','Force Active',['sd20','sd31','sd40']),
node('sd31','Codebreaker',3,1,20,'Additional rank of Codebreaker.','Passive',['sd21','sd30','sd32','sd41']),
node('sd32','Now You See Me',3,2,20,'Once per session, Hard Deception can make several nearby NPCs forget the character.','Active',['sd22','sd31','sd33','sd42']),
node('sd33','Dodge',3,3,20,'Additional rank of Dodge.','Active',['sd23','sd32','sd43']),
node('sd40','Force Rating',4,0,25,'Increase Force Rating by 1.','Force Passive',['sd30','sd41']),
node('sd41','Anatomy Lessons',4,1,25,'Spend Destiny after a hit to add Intellect to damage.','Active',['sd31','sd40','sd42']),
node('sd42','Master of Shadows',4,2,25,'Suffer strain to reduce the difficulty of Stealth or Skulduggery.','Active',['sd32','sd41','sd43']),
node('sd43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['sd33','sd42'])
],
'Aggressor':[
node('ag00','Intimidating',0,0,5,'Suffer strain to downgrade Coercion difficulty or upgrade incoming Coercion.','Active',['ag10']),
node('ag01','Plausible Deniability',0,1,5,'Remove Setback from Coercion and Deception checks.','Passive',['ag11']),
node('ag02','Grit',0,2,5,'Increase strain threshold by 1.','Passive',['ag12']),
node('ag03','Toughened',0,3,5,'Increase wound threshold by 2.','Passive',['ag13']),
node('ag10','Fearsome',1,0,10,'Enemies becoming engaged may be forced to make fear checks.','Passive',['ag00','ag11','ag20']),
node('ag11','Intimidating',1,1,10,'Additional rank of Intimidating.','Active',['ag01','ag10','ag12','ag21']),
node('ag12','Prey on the Weak',1,2,10,'Deal +1 damage per rank against disoriented targets.','Passive',['ag02','ag11','ag22']),
node('ag13','Sense Advantage',1,3,10,'Once per session add two Setback dice to one NPC skill check.','Force Active',['ag03','ag23']),
node('ag20','Fearsome',2,0,15,'Additional rank of Fearsome.','Passive',['ag10','ag21','ag30']),
node('ag21','Terrify',2,1,15,'Hard Coercion plus Force can disorient and immobilize a target.','Force Active',['ag11','ag20','ag31']),
node('ag22','Crippling Blow',2,2,15,'Increase next combat-check difficulty to make a successful hit hamper target movement.','Active',['ag12','ag23','ag32']),
node('ag23','Toughened',2,3,15,'Increase wound threshold by 2.','Passive',['ag13','ag22','ag33']),
node('ag30','Grit',3,0,20,'Increase strain threshold by 1.','Passive',['ag20','ag31','ag40']),
node('ag31','Improved Terrify',3,1,20,'Reduce Terrify difficulty and spend Triumph to stagger an affected target.','Force Passive',['ag21','ag30','ag41']),
node('ag32','Prey on the Weak',3,2,20,'Additional rank of Prey on the Weak.','Passive',['ag22','ag42']),
node('ag33','Heroic Fortitude',3,3,20,'Spend Destiny to ignore Critical Injury effects on Brawn/Agility checks for the encounter.','Active',['ag23','ag43']),
node('ag40','Force Rating',4,0,25,'Increase Force Rating by 1.','Force Passive',['ag30','ag41']),
node('ag41','Fearsome',4,1,25,'Additional rank of Fearsome.','Passive',['ag31','ag40','ag42']),
node('ag42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['ag32','ag41','ag43']),
node('ag43','Against All Odds',4,3,25,'When incapacitated, make a Force-assisted Resilience check to recover wounds and return to the fight.','Force Active',['ag33','ag42'])
],
'Starfighter Ace':[
node('sa00','Grit',0,0,5,'Increase strain threshold by 1.','Passive',[]),
node('sa01','Skilled Jockey',0,1,5,'Remove Setback from Piloting (Planetary) and Piloting (Space).','Passive',['sa11']),
node('sa02','Rapid Reaction',0,2,5,'Suffer strain to add Success to Initiative checks.','Active',['sa12']),
node('sa03','Solid Repairs',0,3,5,'Repair one additional hull trauma on successful vehicle/starship repair checks.','Passive',['sa13']),
node('sa10','Intuitive Evasion',1,0,10,'Commit Force while piloting to upgrade attacks against your craft.','Force Active',['sa11','sa20']),
node('sa11','Confidence',1,1,10,'Reduce fear-check difficulty.','Passive',['sa01','sa10','sa12','sa21']),
node('sa12','Solid Repairs',1,2,10,'Additional rank of Solid Repairs.','Passive',['sa02','sa11','sa13','sa22']),
node('sa13','Galaxy Mapper',1,3,10,'Remove Setback from Astrogation and reduce calculation time.','Passive',['sa03','sa12','sa23']),
node('sa20','Full Throttle',2,0,15,'Hard Piloting action can temporarily increase vehicle top speed.','Active',['sa10','sa21','sa30']),
node('sa21','Rapid Reaction',2,1,15,'Additional rank of Rapid Reaction.','Active',['sa11','sa20','sa22','sa31']),
node('sa22','Exhaust Port',2,2,15,'Spend Destiny before a vehicle attack to ignore Massive for that attack.','Active',['sa12','sa21','sa32']),
node('sa23','Grit',2,3,15,'Increase strain threshold by 1.','Passive',['sa13','sa33']),
node('sa30','Intuitive Strike',3,0,20,'Add Force dice to planetary-scale weapon checks and spend Force results for success or advantage.','Force Active',['sa20','sa31','sa40']),
node('sa31','Touch of Fate',3,1,20,'Once per session add two Boost dice to any check.','Force Active',['sa21','sa30','sa32','sa41']),
node('sa32','Grit',3,2,20,'Increase strain threshold by 1.','Passive',['sa22','sa31','sa33','sa42']),
node('sa33','Skilled Jockey',3,3,20,'Additional rank of Skilled Jockey.','Passive',['sa23','sa32','sa43']),
node('sa40','Force Rating',4,0,25,'Increase Force Rating by 1.','Force Passive',['sa30']),
node('sa41','Tricky Target',4,1,25,'Treat piloted vehicle/starship as silhouette 1 lower when attacked.','Passive',['sa31','sa42']),
node('sa42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['sa32','sa41','sa43']),
node('sa43','Intuitive Evasion',4,3,25,'Additional rank of Intuitive Evasion.','Force Active',['sa33','sa42'])
]
};
Object.assign(EXACT_TREES,CORE_FAD_TREES);


const GENERIC=['Toughened','Grit','Quick Strike','Rapid Reaction','Confidence','Durable','Defensive Stance','Point Blank','Rapid Recovery','Side Step','Brace','Field Commander','Natural Skill','Dedication','Hard Headed','True Aim','Armor Master','Jury Rigged','Resolve','Mastery'];
function genericTree(spec){let seed=[...spec].reduce((a,c)=>a+c.charCodeAt(0),0),arr=[];for(let r=0;r<5;r++)for(let c=0;c<4;c++){let name=GENERIC[(seed+r*4+c)%GENERIC.length],id=`g-${spec}-${r}-${c}`,links=[];if(r>0)links.push(`g-${spec}-${r-1}-${c}`);if(r<4)links.push(`g-${spec}-${r+1}-${c}`);arr.push(node(id,name,r,c,(r+1)*5,name==='Dedication'?'Increase one characteristic by 1.':'Prototype effect hook.','Prototype',links))}return arr}

const UNIVERSAL_TREES={
'Force Sensitive Exile':[
node('ux00','Uncanny Senses',0,0,5,'Add a boost per rank to Perception checks.','Force Passive',['ux10']),
node('ux01','Insight',0,1,5,'Perception and Discipline become career skills.','Force Passive',['ux11']),
node('ux02','Forager',0,2,5,'Reduce setbacks when finding food, water, or shelter.','Passive',['ux12']),
node('ux03','Uncanny Reactions',0,3,5,'Add a boost per rank to Vigilance checks.','Force Passive',['ux13']),
node('ux10','Convincing Demeanor',1,0,10,'Remove setback per rank from Deception and Skulduggery.','Passive',['ux00','ux20']),
node('ux11','Overwhelm Emotions',1,1,10,'May add Force dice to Charm, Coercion, and Deception checks.','Force Passive',['ux01','ux21']),
node('ux12','Intense Focus',1,2,10,'Suffer 1 strain to upgrade the ability of a skill check once.','Active',['ux02','ux22']),
node('ux13','Quick Draw',1,3,10,'Draw or holster once per round as an incidental.','Active',['ux03','ux23']),
node('ux20','Sense Danger',2,0,15,'Once per session remove two setback dice from one check.','Force Active',['ux10','ux30']),
node('ux21','Sense Emotions',2,1,15,'Add a boost to social checks against valid targets.','Force Passive',['ux11','ux31']),
node('ux22','Balance',2,2,15,'At encounter end, roll Force dice to recover additional strain.','Force Active',['ux12','ux32']),
node('ux23','Touch of Fate',2,3,15,'Once per session add two boost dice to one check.','Force Active',['ux13','ux33']),
node('ux30','Street Smarts',3,0,20,'Remove setback per rank from Streetwise or Underworld checks.','Passive',['ux20','ux31','ux40']),
node('ux31','Uncanny Senses',3,1,20,'Add a boost per rank to Perception checks.','Force Passive',['ux21','ux30','ux32','ux41']),
node('ux32','Uncanny Reactions',3,2,20,'Add a boost per rank to Vigilance checks.','Force Passive',['ux22','ux31','ux33','ux42']),
node('ux33','Street Smarts',3,3,20,'Remove setback per rank from Streetwise or Underworld checks.','Passive',['ux23','ux32','ux43']),
node('ux40','Sixth Sense',4,0,25,'Gain +1 ranged defense.','Force Passive',['ux30']),
node('ux41','Force Rating',4,1,25,'Increase Force Rating by 1.','Force Passive',['ux31']),
node('ux42','Dedication',4,2,25,'Increase one characteristic by 1, maximum 6.','Passive',['ux32']),
node('ux43','Superior Reflexes',4,3,25,'Gain +1 melee defense.','Force Passive',['ux33'])
],
'Force-Sensitive Emergent':[
node('ue00','Insight',0,0,5,'Perception and Discipline become career skills.','Force Passive',['ue10']),
node('ue01','Uncanny Senses',0,1,5,'Add a boost per rank to Perception checks.','Force Passive',['ue11']),
node('ue02','Indistinguishable',0,2,5,'Upgrade checks made to identify the character.','Passive',['ue12']),
node('ue03','Grit',0,3,5,'Increase strain threshold by 1 per rank.','Passive',['ue13']),
node('ue10','Uncanny Reactions',1,0,10,'Add a boost per rank to Vigilance checks.','Force Passive',['ue00','ue20']),
node('ue11','Toughened',1,1,10,'Increase wound threshold by 2 per rank.','Passive',['ue01','ue21']),
node('ue12','Sleight of Mind',1,2,10,'Add a boost per rank to Stealth against valid observers.','Force Passive',['ue02','ue22']),
node('ue13','Sleight of Mind',1,3,10,'Add a boost per rank to Stealth against valid observers.','Force Passive',['ue03','ue23']),
node('ue20','Uncanny Senses',2,0,15,'Add a boost per rank to Perception checks.','Force Passive',['ue10','ue30']),
node('ue21','Uncanny Reactions',2,1,15,'Add a boost per rank to Vigilance checks.','Force Passive',['ue11','ue31']),
node('ue22','Grit',2,2,15,'Increase strain threshold by 1 per rank.','Passive',['ue12','ue32']),
node('ue23','Indistinguishable',2,3,15,'Upgrade checks made to identify the character.','Passive',['ue13','ue33']),
node('ue30','Toughened',3,0,20,'Increase wound threshold by 2 per rank.','Passive',['ue20','ue31','ue40']),
node('ue31','Sense Danger',3,1,20,'Once per session remove two setback dice from one check.','Force Active',['ue21','ue30','ue32','ue41']),
node('ue32','Touch of Fate',3,2,20,'Once per session add two boost dice to one check.','Force Active',['ue22','ue31','ue33','ue42']),
node('ue33','Balance',3,3,20,'At encounter end, roll Force dice to recover additional strain.','Force Active',['ue23','ue32','ue43']),
node('ue40','Invigorate',4,0,25,'Once per encounter assist a nearby ally with a physical check using the Force.','Force Active',['ue30']),
node('ue41','Force of Will',4,1,25,'Once per session use Willpower for one skill check.','Force Active',['ue31']),
node('ue42','Force Rating',4,2,25,'Increase Force Rating by 1.','Force Passive',['ue32']),
node('ue43','Dedication',4,3,25,'Increase one characteristic by 1, maximum 6.','Passive',['ue33'])
]
};

const FORCE_TREES={
Move:{basic:{id:'m-basic',name:'Move Basic',cost:10,effect:'Move a silhouette-0 object at short range.'},nodes:[
node('m-mag1','Magnitude',0,0,5,'Affects additional targets.','Force',['m-mag2']),node('m-str1','Strength',0,1,10,'Can affect larger objects.','Force',['m-str2']),node('m-rng1','Range',0,2,5,'Extends maximum range.','Force',['m-hurl']),node('m-rng2','Range',0,3,5,'Extends maximum range.','Force',['m-hurl']),node('m-mag2','Magnitude',1,0,5,'Affects additional targets.','Force',['m-mag1','m-mag3']),node('m-str2','Strength',1,1,10,'Can affect larger objects.','Force',['m-str1','m-str3']),node('m-hurl','Control — Hurl',1,2,10,'Combine Discipline and Move to throw objects as attacks.','Force',['m-rng1','m-rng2','m-pull','m-rng3']),node('m-mag3','Magnitude',2,0,10,'Affects additional targets.','Force',['m-mag2','m-mag4']),node('m-str3','Strength',2,1,15,'Can affect larger objects.','Force',['m-str2','m-str4']),node('m-pull','Control — Pull',2,2,5,'Pull secured or held objects free.','Force',['m-hurl','m-fine']),node('m-rng3','Range',2,3,15,'Extends maximum range.','Force',['m-hurl','m-fine']),node('m-mag4','Magnitude',3,0,10,'Affects additional targets.','Force',['m-mag3']),node('m-str4','Strength',3,1,20,'Can affect very large objects.','Force',['m-str3']),node('m-fine','Control — Fine Manipulation',3,2,15,'Manipulate objects remotely with hand-like precision.','Force',['m-pull','m-rng3'])]},
Sense:{basic:{id:'s-basic',name:'Sense Basic',cost:10,effect:'Sense nearby living beings or an engaged target’s emotional state.'},nodes:[
node('sn-def','Control — Defense',0,0,10,'Commit a Force die to upgrade incoming attacks.','Force',['sn-dur']),node('sn-thought','Control — Thoughts',0,2,10,'Spend Force points to sense surface thoughts.','Force',['sn-range1','sn-mag1']),node('sn-dur','Duration',1,0,10,'Ongoing Sense effects can trigger more often.','Force',['sn-def','sn-strength']),node('sn-range1','Range',1,2,5,'Extends Sense range.','Force',['sn-thought','sn-range2']),node('sn-mag1','Magnitude',1,3,5,'Affects more targets.','Force',['sn-thought','sn-mag2']),node('sn-strength','Strength',2,0,10,'Committed Sense upgrades are stronger.','Force',['sn-dur','sn-off']),node('sn-range2','Range',2,2,10,'Further extends Sense range.','Force',['sn-range1','sn-range3']),node('sn-mag2','Magnitude',2,3,10,'Affects more targets.','Force',['sn-mag1','sn-mag3']),node('sn-off','Control — Offense',3,0,10,'Commit a Force die to upgrade your combat checks.','Force',['sn-strength']),node('sn-range3','Range',3,2,10,'Further extends Sense range.','Force',['sn-range2']),node('sn-mag3','Magnitude',3,3,10,'Affects more targets.','Force',['sn-mag2'])]},
Enhance:{basic:{id:'e-basic',name:'Enhance Basic',cost:10,effect:'Roll Force dice with Athletics; spend pips for success/advantage.'},nodes:[
node('e-coord','Control — Coordination',0,0,5,'Enhance can augment Coordination.','Force',['e-planet']),node('e-res','Control — Resilience',0,1,5,'Enhance can augment Resilience.','Force',['e-brawl']),node('e-leap','Control — Force Leap',0,2,10,'Spend a Force point to leap to a short-range location.','Force',['e-leapv']),node('e-planet','Control — Planetary Piloting',1,0,5,'Enhance can augment Piloting (Planetary).','Force',['e-coord','e-space']),node('e-brawl','Control — Brawl',1,1,5,'Enhance can augment Brawl.','Force',['e-res','e-brawn']),node('e-leapv','Control — Vertical Leap',1,2,10,'Force Leap can also travel vertically.','Force',['e-leap','e-range']),node('e-space','Control — Space Piloting',2,0,5,'Enhance can augment Piloting (Space).','Force',['e-planet','e-agility']),node('e-brawn','Control — Commit Brawn',2,1,10,'Commit a Force die to increase Brawn by 1.','Force',['e-brawl']),node('e-range','Range',2,3,10,'Extends Force Leap range.','Force',['e-leapv','e-maneuver']),node('e-agility','Control — Commit Agility',3,0,10,'Commit a Force die to increase Agility by 1.','Force',['e-space']),node('e-maneuver','Control — Leap Maneuver',3,2,10,'Force Leap can be performed as a maneuver.','Force',['e-range'])]},
Influence:{basic:{id:'i-basic',name:'Influence Basic',cost:10,effect:'Spend a Force point to stress the mind of one engaged living target for 1 strain, ignoring soak.'},nodes:[
node('i-rng1','Range',0,0,5,'Spend Force results to extend the power by additional range bands.','Force',['i-social','i-rng2']),
node('i-mag1','Magnitude',0,1,5,'Spend Force results to affect additional targets.','Force',['i-social','i-mag2']),
node('i-ctl-emotion','Control — Emotion / Belief',0,2,10,'Opposed Discipline plus Influence can impose an emotional state or short-lived untrue belief.','Force',['i-str1','i-social']),
node('i-social','Control — Social Checks',1,0,15,'Add Influence Force dice to Coercion, Charm, Deception, Leadership, or Negotiation; spend Force results for success or advantage.','Force',['i-rng1','i-mag1','i-rng2','i-mag2','i-dur1']),
node('i-str1','Strength',1,3,10,'The basic strain effect inflicts 2 strain per activation instead of 1.','Force',['i-ctl-emotion','i-dur2']),
node('i-rng2','Range',2,0,10,'Additional Range upgrade.','Force',['i-rng1','i-social','i-rng3']),
node('i-mag2','Magnitude',2,1,5,'Additional Magnitude upgrade.','Force',['i-mag1','i-social','i-mag3']),
node('i-dur1','Duration',2,2,5,'Extend emotion/belief effects by additional rounds or minutes.','Force',['i-social','i-dur3']),
node('i-dur2','Duration',2,3,5,'Additional Duration upgrade.','Force',['i-str1','i-dur4']),
node('i-rng3','Range',3,0,10,'Additional Range upgrade.','Force',['i-rng2']),
node('i-mag3','Magnitude',3,1,10,'Additional Magnitude upgrade.','Force',['i-mag2']),
node('i-dur3','Duration',3,2,5,'Additional Duration upgrade.','Force',['i-dur1']),
node('i-dur4','Duration',3,3,5,'Additional Duration upgrade.','Force',['i-dur2'])
]},
Foresee:{basic:{id:'f-basic',name:'Foresee Basic',cost:10,effect:'Spend a Force point to gain vague hints about the user’s personal future up to one day ahead.'},nodes:[
node('f-ctl-init','Control — Initiative',0,0,10,'When rolling Initiative, add a Foresee power check and spend Force results for success.','Force',['f-mag1','f-rng1','f-ctl-defense']),
node('f-str1','Strength',0,3,5,'Spend Force results to extract more specific details from a vision.','Force',['f-dur1','f-str2']),
node('f-mag1','Magnitude',1,0,5,'Spend Force results to increase the number of affected targets.','Force',['f-ctl-init','f-mag2']),
node('f-rng1','Range',1,1,5,'Spend Force results to increase the power’s range.','Force',['f-ctl-init','f-rng2']),
node('f-ctl-defense','Control — Opening Defense',1,2,10,'Affected targets gain +2 melee and ranged defense during the first round of combat.','Force',['f-ctl-init','f-rng3']),
node('f-dur1','Duration',1,3,5,'Spend Force results to see additional days into the future.','Force',['f-str1','f-str2']),
node('f-mag2','Magnitude',2,0,5,'Additional Magnitude upgrade.','Force',['f-mag1','f-ctl-maneuver']),
node('f-rng2','Range',2,1,5,'Additional Range upgrade.','Force',['f-rng1','f-rng3','f-ctl-maneuver']),
node('f-rng3','Range',2,2,5,'Additional Range upgrade.','Force',['f-ctl-defense','f-rng2','f-ctl-maneuver']),
node('f-str2','Strength',2,3,5,'Additional Strength upgrade.','Force',['f-str1','f-dur1','f-dur2']),
node('f-ctl-maneuver','Control — Pre-Combat Maneuver',3,0,15,'During Initiative, spend Force results so affected targets may take one maneuver before round one begins.','Force',['f-mag2','f-rng2','f-rng3']),
node('f-dur2','Duration',3,3,5,'Additional Duration upgrade.','Force',['f-str2'])
]}
};
const FORCE_TREE_SOURCE={
Move:'Force and Destiny Core · p.298',
Sense:'Force and Destiny Core · p.304',
Enhance:'Force and Destiny Core · p.288',
Influence:'Force and Destiny Core · p.294',
Foresee:'Force and Destiny Core · p.290'
};
const FRAME={Obligation:['Debt','Bounty','Family','Oath','Responsibility','Criminal'],Duty:['Combat Victory','Intelligence','Sabotage','Support','Space Superiority','Personnel'],Morality:['Compassion / Hatred','Bravery / Anger','Curiosity / Obsession','Discipline / Stubbornness','Mercy / Weakness']};
const WEAPONS={
pistol:{id:'pistol',type:'weapon',name:'Blaster Pistol',skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',enc:1,hp:3,price:400,rarity:4,qualities:{stun:true},source:'Core profile'},
carbine:{id:'carbine',type:'weapon',name:'Blaster Carbine',skill:'Ranged (Heavy)',damage:9,crit:3,range:'Medium',enc:3,hp:4,price:850,rarity:5,qualities:{stun:true},source:'Core profile'},
holdout:{id:'holdout',type:'weapon',name:'Holdout Blaster',skill:'Ranged (Light)',damage:5,crit:4,range:'Short',enc:1,hp:1,price:200,rarity:4,qualities:{stun:true},source:'Under a Black Sun'},
lightsaber:{id:'lightsaber',type:'weapon',name:'Basic Lightsaber',skill:'Lightsaber',damage:6,crit:2,range:'Engaged',enc:1,hp:5,price:10000,rarity:10,restricted:true,qualities:{breach:1,sunder:true},source:'Force & Destiny / Rise of the Separatists'},
training:{id:'training',type:'weapon',name:'Training Lightsaber',skill:'Lightsaber',damage:6,crit:null,range:'Engaged',enc:1,hp:5,price:400,rarity:6,qualities:{stunDamage:true},source:'Rise of the Separatists'},
nova:{id:'nova',type:'weapon',name:'Model-1 Nova Viper',skill:'Ranged (Light)',damage:7,crit:3,range:'Medium',enc:2,hp:2,price:4500,rarity:9,qualities:{accurate:2,pierce:2,stun:true},source:'Fly Casual'},
pulse:{id:'pulse',type:'weapon',name:'VES-700 Pulse Rifle',skill:'Ranged (Heavy)',damage:8,crit:3,range:'Medium',enc:4,hp:3,price:950,rarity:6,qualities:{blast:6,stun:true},source:'Fly Casual'},
scatter:{id:'scatter',type:'weapon',name:'8-Gauge Scatter Gun',skill:'Ranged (Heavy)',damage:7,crit:6,range:'Short',enc:3,hp:2,price:550,rarity:4,qualities:{blast:3,knockdown:true},source:'Fly Casual'},
acid:{id:'acid',type:'weapon',name:'Tenloss L70 Acid Projector',skill:'Ranged (Heavy)',damage:6,crit:2,range:'Short',enc:4,hp:1,price:1250,rarity:7,qualities:{blast:6,burn:3,vicious:1},source:'Lords of Nal Hutta'},
repeater:{id:'repeater',type:'weapon',name:'ACP Repeater Gun',skill:'Ranged (Heavy)',damage:7,crit:3,range:'Medium',enc:3,hp:1,price:1000,rarity:6,qualities:{autoFire:true,stun:true},source:'Lords of Nal Hutta'},
lance:{id:'lance',type:'weapon',name:'Weequay Blaster Lance',skill:'Ranged (Heavy)',damage:8,crit:3,range:'Extreme',enc:5,hp:2,price:850,rarity:6,qualities:{accurate:1,cumbersome:2},source:'Lords of Nal Hutta'},
vibroglaive:{id:'vibroglaive',type:'weapon',name:"Beastmaster's Vibro-glaive",skill:'Melee',damage:2,addBrawn:true,crit:2,range:'Engaged',enc:3,hp:3,price:975,rarity:6,qualities:{defensive:2,pierce:3},source:'Lords of Nal Hutta'},
vibrosword:{id:'vibrosword',type:'weapon',name:'Double-Bladed Vibrosword',skill:'Melee',damage:2,addBrawn:true,crit:2,range:'Engaged',enc:4,hp:3,price:1300,rarity:6,qualities:{defensive:1,linked:1,pierce:2,vicious:1,unwieldy:3},source:'Knights of Fate'},
boonta:{id:'boonta',type:'weapon',name:'Boonta Blaster',skill:'Ranged (Light)',damage:6,crit:3,range:'Short',enc:1,hp:1,price:1000,rarity:8,qualities:{stun:true},source:'Lords of Nal Hutta'},
ata:{id:'ata',type:'weapon',name:'Greff-Timms ATA Pulse-Wave Blaster',skill:'Ranged (Light)',damage:5,crit:3,range:'Short',enc:2,hp:2,price:750,rarity:6,restricted:true,qualities:{vicious:3},source:'Lords of Nal Hutta'},
dissuader:{id:'dissuader',type:'weapon',name:'KD-30 Dissuader Pistol',skill:'Ranged (Light)',damage:4,crit:5,range:'Short',enc:2,hp:0,price:350,rarity:6,qualities:{pierce:2,vicious:1},source:'Lords of Nal Hutta'},
repulsor:{id:'repulsor',type:'weapon',name:'SakTek D-29 Repulsor Rifle',skill:'Gunnery',damage:8,crit:4,range:'Medium',enc:3,hp:3,price:1550,rarity:7,qualities:{disorient:3,knockdown:true,stunDamage:true},source:'Lords of Nal Hutta'},
cryo:{id:'cryo',type:'weapon',name:'CryoBan Projector',skill:'Ranged (Heavy)',damage:6,crit:2,range:'Short',enc:3,hp:0,price:500,rarity:4,qualities:{blast:6,cumbersome:3,vicious:2},source:'Fly Casual'}
,a280cfe:{id:'a280cfe',type:'weapon',name:'A280-CFE Convertible Heavy Blaster Pistol',skill:'Ranged (Light)',damage:8,crit:3,range:'Medium',enc:3,hp:1,price:1700,rarity:7,restricted:true,qualities:{stun:true},source:'Gadgets and Gear · p.9',note:'Source permits a maneuver-based rifle configuration when its two rifle-mode accessories are fitted; alternate-mode attachment workflow is not automated.'}
,a280c:{id:'a280c',type:'weapon',name:'A280C Heavy Blaster Rifle',skill:'Ranged (Heavy)',damage:9,crit:4,range:'Long',enc:5,hp:2,price:1800,rarity:7,qualities:{accurate:1,cumbersome:3,stun:true},source:'Gadgets and Gear · p.9'}
,stingbeam:{id:'stingbeam',type:'weapon',name:'A95 Stingbeam',skill:'Ranged (Light)',damage:5,crit:3,range:'Engaged',enc:1,hp:0,price:400,rarity:5,qualities:{stun:true,vicious:1},source:'Gadgets and Gear · p.9'}
,br219:{id:'br219',type:'weapon',name:'BR-219 Heavy Blaster Pistol',skill:'Ranged (Light)',damage:8,crit:3,range:'Short',enc:2,hp:2,price:625,rarity:7,restricted:true,qualities:{stun:true,vicious:2},source:'Gadgets and Gear · p.10'}
,c10:{id:'c10',type:'weapon',name:'C-10 Dragoneye Reaper Heavy Blaster Pistol',skill:'Ranged (Light)',damage:8,crit:3,range:'Medium',enc:3,hp:3,price:1000,rarity:7,qualities:{stun:true},source:'Gadgets and Gear · p.10'}
,cs14:{id:'cs14',type:'weapon',name:'CS14 Ghost Light Blaster Pistol',skill:'Ranged (Light)',damage:5,crit:3,range:'Short',enc:1,hp:0,price:550,rarity:6,restricted:true,qualities:{stun:true},source:'Gadgets and Gear · p.11',note:'Special concealment/scanner rules remain contextual.'}
,dhx:{id:'dhx',type:'weapon',name:'DH-X Heavy Blaster Rifle',skill:'Ranged (Heavy)',damage:10,crit:3,range:'Long',enc:7,hp:4,price:1900,rarity:6,qualities:{cumbersome:3,pierce:2},source:'Gadgets and Gear · p.11'}
,dh17:{id:'dh17',type:'weapon',name:'DH-17 Blaster Carbine',skill:'Ranged (Heavy)',damage:8,crit:3,range:'Medium',enc:2,hp:3,price:900,rarity:6,qualities:{autoFire:true,inaccurate:2,stun:true},source:'Gadgets and Gear · p.11'}
,disruptorPistol:{id:'disruptorPistol',type:'weapon',name:'Disruptor Pistol',skill:'Ranged (Light)',damage:10,crit:2,range:'Short',enc:2,hp:2,price:3000,rarity:6,restricted:true,qualities:{vicious:4},source:'Gadgets and Gear · p.11'}
,disruptorRifle:{id:'disruptorRifle',type:'weapon',name:'Disruptor Rifle',skill:'Ranged (Heavy)',damage:10,crit:2,range:'Long',enc:5,hp:4,price:5000,rarity:6,restricted:true,qualities:{cumbersome:2,vicious:5},source:'Gadgets and Gear · p.12'}
,dls12:{id:'dls12',type:'weapon',name:'DLS-12 Heavy Blaster Carbine',skill:'Ranged (Heavy)',damage:10,crit:3,range:'Medium',enc:4,hp:3,price:1350,rarity:7,qualities:{autoFire:true,cumbersome:2},source:'Gadgets and Gear · p.12'}
,dl19c:{id:'dl19c',type:'weapon',name:'DL-19C Blaster Pistol',skill:'Ranged (Light)',damage:5,crit:4,range:'Medium',enc:1,hp:4,price:1000,rarity:4,qualities:{stun:true},source:'Gadgets and Gear · p.12'}
,dr45:{id:'dr45',type:'weapon',name:'DR-45 Dragoon Cavalry Blaster',skill:'Ranged (Light)',damage:8,crit:3,range:'Medium',enc:1,hp:3,price:1900,rarity:6,qualities:{accurate:1,stun:true},source:'Gadgets and Gear · p.12',note:'Source allows a maneuver to convert to Ranged (Heavy); alternate-mode switching is not yet automated.'}
,duelingPistol:{id:'duelingPistol',type:'weapon',name:'Dueling Pistol',skill:'Ranged (Light)',damage:9,crit:2,range:'Short',enc:2,hp:2,price:750,rarity:5,qualities:{accurate:1,limitedAmmo:1,prepare:1},source:'Gadgets and Gear · p.13'}
,e5:{id:'e5',type:'weapon',name:'E5 Blaster Carbine',skill:'Ranged (Heavy)',damage:9,crit:3,range:'Medium',enc:3,hp:4,price:550,rarity:3,qualities:{inaccurate:1,stun:true},source:'Gadgets and Gear · p.13'}
,e11s:{id:'e11s',type:'weapon',name:'E-11S Sniper Rifle',skill:'Ranged (Heavy)',damage:10,crit:3,range:'Extreme',enc:6,hp:3,price:3500,rarity:7,restricted:true,qualities:{accurate:1,cumbersome:2,pierce:3,slowFiring:1},source:'Gadgets and Gear · p.13'}
,elg3a:{id:'elg3a',type:'weapon',name:'ELG-3A Blaster Pistol',skill:'Ranged (Light)',damage:6,crit:4,range:'Short',enc:1,hp:0,price:400,rarity:5,qualities:{stun:true},source:'Gadgets and Gear · p.13'}
,glx:{id:'glx',type:'weapon',name:'GLX Firelance Blaster Rifle',skill:'Ranged (Heavy)',damage:7,crit:3,range:'Long',enc:3,hp:3,price:1600,rarity:6,qualities:{autoFire:true,disorient:2,stun:true},source:'Gadgets and Gear · p.13'}

};


const COMBAT_SPECIAL_WEAPONS={
unarmed:{id:'unarmed',type:'special',name:'Unarmed Strike',skill:'Brawl',damage:0,addBrawn:true,crit:5,range:'Engaged',qualities:{disorient:1,knockdown:true},source:'Core-style unarmed profile corroborated by Lords of Nal Hutta NPC fist profile',implementation:'Playable combat profile'}
};


const ATTACHMENT_REFERENCE_DB=[
{name:'Droid Targeting System',type:'Weapon Attachment',applies:'Any personal ranged weapon',hp:3,price:3200,rarity:null,summary:'Upgrades the ability of Ranged combat checks made with the weapon once. Published modification options are indexed but not yet automated.',source:'Fully Operational · p.55',implementation:'Reference only'},
{name:'Automated Weapon Mounting',type:'Armor Attachment',applies:'Armor; mounts an Encumbrance 3-or-less Ranged (Light), Ranged (Heavy), or Melee weapon',hp:2,price:3000,restricted:true,rarity:null,summary:'Once per encounter, a maneuver can enable a combat action with the mounted weapon without using the wearer’s hands; the source profile makes that attack harder unless modified.',source:'Fully Operational · p.56',implementation:'Reference only'},
{name:'Utility Arm',type:'Armor Attachment',applies:'Armor / harness',hp:2,price:2000,rarity:3,summary:'Armor-mounted mechanical manipulator for engineering and field work. Cost, rarity, and hard-point requirement are indexed; its full modifier package awaits a deeper exact extraction.',source:'Fully Operational · pp.56–57',implementation:'Reference only'}
,{name:'Shortened Barrel',type:'Weapon Attachment',applies:'Ranged weapon',hp:null,price:null,rarity:null,summary:'Makes a weapon easier to conceal at the cost of maximum range; exact mod options are kept reference-only until the attachment table is fully transcribed.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}
,{name:'Integrated Holsters',type:'Armor Attachment',applies:'Armor',hp:null,price:null,rarity:null,summary:'Source attachment increases practical carried weapon capacity and integrates holsters into armor; exact table/mod values remain reference-only.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}
,{name:'Ion Shielding',type:'Armor Attachment',applies:'Armor',hp:null,price:null,rarity:null,summary:'Protective armor modification intended to improve resistance to Ion effects; exact attachment table values remain reference-only.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}
,{name:'Reflec Adaptive Skin',type:'Armor Attachment',applies:'Armor',hp:null,price:null,rarity:null,summary:'Sensor-masking armor surface for stealth operations; full attachment modifiers remain reference-only.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}
,{name:'Cortosis Weave',type:'Armor Attachment',applies:'Armor',hp:null,price:null,rarity:null,summary:'Cortosis reinforcement intended to protect armor against Breach/Sunder interactions; exact table values remain reference-only.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}
,{name:'Biofeedback System',type:'Armor Attachment',applies:'Armor',hp:null,price:null,rarity:null,summary:'Wearer-support system represented in the source attachment catalog; exact mechanical package remains reference-only pending table transcription.',source:'Gadgets and Gear · Chapter VIII',implementation:'Reference only'}

];

const ARMOR={
heavyClothing:{id:'heavyClothing',type:'armor',name:'Heavy Clothing',defense:0,soak:1,enc:1,hp:0,price:50,rarity:1,source:'Common profile'},
blastVest:{id:'blastVest',type:'armor',name:'Blast Vest',defense:0,soak:1,enc:3,hp:1,price:200,rarity:3,source:'Fly Casual / Age material'},
armoredClothing:{id:'armoredClothing',type:'armor',name:'Armored Clothing',defense:1,soak:1,enc:3,hp:1,price:1000,rarity:6,source:'Core profile'},
paddedArmor:{id:'paddedArmor',type:'armor',name:'Padded Armor',defense:0,soak:2,enc:2,hp:0,price:500,rarity:3,source:'Suns of Fortune examples'},
cloneArmor:{id:'cloneArmor',type:'armor',name:'Phase I Clone Trooper Armor',defense:0,soak:2,enc:4,hp:5,price:2000,rarity:6,restricted:true,source:'Rise of the Separatists'},
arcArmor:{id:'arcArmor',type:'armor',name:'Phase I ARC Trooper Armor',defense:1,soak:2,enc:5,hp:4,price:6000,rarity:7,restricted:true,source:'Rise of the Separatists'},
jediCommander:{id:'jediCommander',type:'armor',name:'Jedi Commander Armor',defense:1,soak:2,enc:5,hp:3,price:5000,rarity:8,restricted:true,source:'Rise of the Separatists'}
,adverseGear:{id:'adverseGear',type:'armor',name:'Adverse Environment Gear',defense:0,soak:1,enc:2,hp:1,price:500,rarity:1,source:'Gadgets and Gear · p.67',note:'Source allows the wearer to ignore one Setback imposed by an appropriate hostile environment; contextual automation pending.'}
,allianceStealth:{id:'allianceStealth',type:'armor',name:'Alliance Light Stealth Armor',defense:0,soak:2,enc:3,hp:2,price:2200,rarity:7,restricted:true,source:'Gadgets and Gear · p.67',note:'Adds a Boost die to Stealth checks; passive skill-pool hook is pending.'}
,armoredDrop:{id:'armoredDrop',type:'armor',name:'Armored Drop Suit',defense:1,soak:1,enc:6,hp:2,price:7500,rarity:7,source:'Gadgets and Gear · p.67',note:'Integrated flight system is source-indexed but not yet represented by planetary vehicle movement.'}
,armoredHalfVest:{id:'armoredHalfVest',type:'armor',name:'Armored Half-Vest',defense:1,soak:1,enc:3,hp:0,price:500,rarity:5,source:'Gadgets and Gear · p.68',note:'Source item can become damaged when its wearer suffers a Critical Injury; item-damage trigger is not automated.'}
,beastHide:{id:'beastHide',type:'armor',name:'Beast-Hide Armor',defense:0,soak:1,enc:2,hp:0,price:300,rarity:3,source:'Gadgets and Gear · p.68',note:'Source grants automatic social symbols in culturally appropriate situations; handled narratively.'}
,catchVest:{id:'catchVest',type:'armor',name:'Catch Vest',defense:0,soak:2,enc:1,hp:0,price:300,rarity:3,source:'Gadgets and Gear · p.69',note:'Source soak 2 applies to energy weapons and only soak 1 to other damage; current engine uses the displayed soak 2 universally and labels this as a partial automation.'}
,climbsuit:{id:'climbsuit',type:'armor',name:'Climbsuit',defense:0,soak:1,enc:2,hp:2,price:1450,rarity:4,source:'Gadgets and Gear · p.69',note:'Source upgrades climbing checks once and reduces falling harm; those situational effects remain contextual.'}
,cloakingCoat:{id:'cloakingCoat',type:'armor',name:'Cloaking Coat',defense:0,soak:1,enc:4,hp:1,price:550,rarity:8,restricted:true,source:'Gadgets and Gear · p.69',note:'Source upgrades electronic detection checks against the wearer twice; contextual until sensor stealth is expanded.'}
,creshLuck:{id:'creshLuck',type:'armor',name:'Cresh Luck Armor',defense:0,soak:2,enc:4,hp:1,price:1000,rarity:5,source:'Gadgets and Gear · p.69',note:'Infrared sensor array grants automatic Advantage to Vigilance in source rules; not globally automated.'}

};

const ORDNANCE={
frag:{id:'frag',name:'Frag Grenade',type:'ordnance',skill:'Ranged (Light)',damage:8,crit:4,range:'Short',qualities:{blast:6,limitedAmmo:1},source:'Chronicles of the Gatekeeper',implementation:'Source profile · shared squad consumable'},
stun:{id:'stun',name:'Stun Grenade',type:'ordnance',skill:'Ranged (Light)',damage:8,crit:null,range:'Short',qualities:{blast:8,disorient:3,limitedAmmo:1,stunDamage:true},source:'Chronicles of the Gatekeeper',implementation:'Source profile · shared squad consumable'},
miniThermal:{id:'miniThermal',name:'Mini Thermal Detonator',type:'ordnance',skill:'Ranged (Light)',damage:12,crit:2,range:'Short',blastRadius:1,qualities:{blast:10,limitedAmmo:1},source:'Under a Black Sun',implementation:'Source profile · campaign consumable; defective-batch story rule not used by default'}
};
const ORDNANCE_RESUPPLY={
frag:{price:50,label:'Frag Grenade',note:'Campaign economy price; profile itself is source-grounded.'},
stun:{price:75,label:'Stun Grenade',note:'Campaign economy price; profile itself is source-grounded.'},
miniThermal:{price:750,label:'Mini Thermal Detonator',note:'Campaign economy price; intentionally game-balanced rather than claimed source price.'}
};

const GEAR={
stimpack:{id:'stimpack',type:'gear',name:'Stimpack',enc:0,price:25,rarity:1,source:'Core medical gear'},
comlink:{id:'comlink',type:'gear',name:'Comlink',enc:0,price:25,rarity:0,source:'Common gear'},
datapad:{id:'datapad',type:'gear',name:'Datapad',enc:1,price:75,rarity:1,source:'Common gear'},
scanner:{id:'scanner',type:'gear',name:'General Purpose Scanner',enc:1,price:500,rarity:3,source:'Under a Black Sun'},
extraReload:{id:'extraReload',type:'gear',name:'Extra Reload',enc:0,price:25,rarity:1,source:'Core gear profile — price/profile should be re-verified in a later exact-data pass'}
};
const ITEMS={...WEAPONS,...ARMOR,...GEAR};

const ATTACHMENTS={
weaponTether:{id:'weaponTether',name:'Weapon Tether',kind:'weapon',hp:1,price:250,rarity:4,source:'Keeping the Peace',desc:'A tether lets the wielder recover a dropped engaged weapon as an incidental.',effect:'tether'},
setTrigger:{id:'setTrigger',name:'Set Trigger',kind:'weapon',hp:1,price:450,rarity:4,source:'Fly Casual',desc:'Hair-trigger tuning affects the first combat check made with the weapon each encounter.',effect:'setTrigger'},
underslungScattergun:{id:'underslungScattergun',name:'Underslung Scattergun',kind:'weapon',hp:3,price:750,rarity:5,restricted:true,source:'Fly Casual',desc:'Adds a single-shot short-range scattergun profile; its full alternate-fire UI is reserved for a later pass.',effect:'display'},
blasterSuppressor:{id:'blasterSuppressor',name:'Blaster Suppressor',kind:'weapon',hp:1,price:750,rarity:5,restricted:true,source:'Lords of Nal Hutta',desc:'Makes a compatible blaster dramatically harder to locate by sound.',effect:'narrative'},
pistolHilt:{id:'pistolHilt',name:'Pistol Hilt',kind:'lightsaber',hp:2,price:750,rarity:5,source:'Endless Vigil',desc:'Lets an unignited lightsaber fire a short-range stun bolt. Alternate-fire UI is reserved for a later pass.',effect:'display'},
reflexGrip:{id:'reflexGrip',name:'Reflex Grip',kind:'lightsaber',hp:2,price:4000,rarity:8,source:'Endless Vigil',desc:'Parry and Reflect count one rank higher, but each use costs one additional strain.',effect:'reflex'},
threatMonitor:{id:'threatMonitor',name:'Threat Monitor',kind:'armor',hp:1,price:750,rarity:4,source:'Lords of Nal Hutta',desc:'Adds an automatic Advantage to Initiative checks.',effect:'initiativeAdv'},
droidDefense:{id:'droidDefense',name:'Droid Brain Defense System',kind:'armor',hp:3,price:5000,rarity:6,source:'Fully Operational',desc:'Increases the armor’s defense by 1.',effect:'armorDefense'},
repulsorPack:{id:'repulsorPack',name:'Repulsor Pack',kind:'armor',hp:2,price:2500,rarity:4,source:'Fully Operational',desc:'Provides limited personal repulsorlift movement. Vehicle-scale handling is not yet simulated.',effect:'narrative'},
squadTactical:{id:'squadTactical',name:'Squad Tactical Systems',kind:'armor',hp:1,price:2000,rarity:5,source:'Rise of the Separatists',desc:'Designed to improve Perception and Vigilance while linked with similarly equipped allies.',effect:'squad'}
};
const CRAFT_TEMPLATES={
utilityRig:{id:'utilityRig',name:'Prototype Utility Rig',materialPrice:100,rarity:2,diff:2,time:'2 hours',desc:'Engine-test template. On success, create a reusable workshop rig that adds 1 Boost to one Mechanics repair check per encounter.'},
fieldPadding:{id:'fieldPadding',name:'Prototype Field Padding',materialPrice:150,rarity:2,diff:2,time:'4 hours',desc:'Engine-test template. On success, create field padding that reduces carried encumbrance by 1 while in inventory.'}
};


const ADVERSARY_DB=[
{name:'Police Droid',type:'Minion',source:'Under a Black Sun',summary:'Brawn 2 · Agility 2 · Intellect 1 · Cunning 2 · Willpower 1 · Presence 1 · Soak 3 · WT 6. Group skills: Ranged (Light), Vigilance. Light blaster pistol Damage 5, Crit 4, Medium, Stun setting.'},
{name:'Coruscant Underworld Police',type:'Rival',source:'Under a Black Sun',summary:'Brawn 3 · Agility 2 · Intellect 2 · Cunning 2 · Willpower 3 · Presence 1 · Soak 4 · WT 4. Ranged (Light) 2 plus Brawl, Coercion, Discipline, Melee, Vigilance 1.'},
{name:'Black Sun Thug',type:'Minion',source:'Under a Black Sun',summary:'Brawn 3 · Agility 2 · Intellect 2 · Cunning 2 · Willpower 1 · Presence 1 · Soak 3 · WT 6. Group skills: Brawl, Coercion, Ranged (Light).'},
{name:'IA Security Agent',type:'Rival',source:'Suns of Fortune',summary:'Brawl 2, Discipline 2, Perception 2, Ranged (Light) 3, Surveillance 3, Vigilance 2. Adversary 1. Blaster pistol and shock gloves.'},
{name:'Bim Gizzo',type:'Rival',source:'Suns of Fortune',summary:'Charm 2, Deception 3, Perception 3, Ranged (Light) 2, Skulduggery 3, Stealth 2, Streetwise 2. Adversary 1; Convincing Demeanor 2.'},
{name:'Brom',type:'Rival',source:'Suns of Fortune',summary:'Brawl 3, Cool 2, Coercion 3, Ranged (Light) 2, Resilience 2. Adversary 1. Heavy blaster pistol and padded armor.'},
{name:'Tunnel Worm',type:'Rival',source:'Suns of Fortune',summary:'Silhouette 3. Serrated maw has Burn 4, Sunder, Vicious 2; crushing tail has Concussive 3, Knockdown, Prepare 1.'},
{name:'General Ran Niall',type:'Nemesis',source:'Onslaught at Arda I',summary:'Cool 3, Discipline 3, Gunnery 3, Warfare 4, Leadership 3, Perception 3, Ranged (Heavy) 2, Vigilance 3. Adversary 2.'},
{name:'Sianna Sekko',type:'Nemesis',source:'Nexus of Power',summary:'Deception 2, Discipline 3, Lightsaber 3, Ranged (Light) 1, Stealth 2, Vigilance 2. Adversary 2, Force Rating 3, Ataru Technique, Parry 3, Reflect 3.'},
{name:'Jedi Temple Guardian',type:'Nemesis',source:'Nexus of Power',summary:'Discipline 2, Medicine 2, Melee 2, Lightsaber 2, Perception 2, Vigilance 2. Adversary 1, Force Rating 4, Parry 4, Reflect 4. Temple Guard lightsaber pike.'},
{name:'Graf Lind',type:'Rival',source:'Mask of the Pirate Queen',summary:'Athletics 1, Brawl 2, Charm 3, Deception 3, Underworld 2, Melee 3, Ranged (Light) 2, Streetwise 3. Natural Brawler and Quick Draw.'},
{name:'Gamorrean Hutt Guard',type:'Rival',source:'The Enemy of my Enemy Adventure',summary:'Brawn 4 · Agility 2 · Intellect 1 · Cunning 1 · Willpower 1 · Presence 1 · Soak 5 · WT 14 · Adversary 1. Vibro-axe Damage 7, Crit 2, Pierce 2, Vicious 3, Sunder.'},
{name:'Gundark',type:'Nemesis',source:'The Enemy of my Enemy Adventure',summary:'Brawn 5 · Agility 2 · Intellect 1 · Cunning 2 · Willpower 1 · Presence 1 · Soak 6 · WT 20 · ST 10 · Adversary 1. Brawl 3; claws Damage 5, Crit 3, Pierce 2, Vicious 1.'},
{name:'Enhanced Soldier',type:'Rival',source:'The Enemy of my Enemy Adventure',summary:'Brawn 4 · Agility 3 · Intellect 1 · Cunning 2 · Willpower 2 · Presence 2 · Soak 5 · Defense 1 · WT 20 · Adversary 1. Carbine Damage 9 and vibroknife Damage 5; chemical enhancement improves combat and physical checks.'},
{name:'Sorority Palace Guard',type:'Minion',source:'Mask of the Pirate Queen',summary:'Group skills: Coercion, Cool, Discipline, Melee, Ranged (Heavy). Blaster carbine Damage 9 and vibrosword Damage 5 with Defensive 1, Pierce 2, Vicious 1.'},
{name:'Hutt Majordomo',type:'Rival',source:'Lords of Nal Hutta',summary:'Social and underworld specialist with Charm, Coercion, Deception, Leadership, Negotiation, Streetwise, Perception and Underworld expertise; includes Intimidating and Nobody’s Fool.'},
{name:'AO-2 Droid Assassin',type:'Nemesis',source:'Lords of Nal Hutta',summary:'Droid assassin with Melee 4, Vigilance 4, Ranged (Heavy) 3, Lethal Blows 3, Precise Aim 2 and Targeted Blow; integrated vibroblade and blaster rifle.'}

];

const CREW=[
{id:'kira',name:'Kira Drenn',role:'Mandalorian frontliner',c:{Brawn:4,Agility:3,Intellect:2,Cunning:2,Willpower:3,Presence:2},sk:{Athletics:2,Brawl:2,'Ranged (Light)':2,Coercion:1,Discipline:2,Survival:1},weapon:'pistol',armor:'armoredClothing',wt:14,st:13,soak:5,def:1},
{id:'lena',name:'Lena Varo',role:'Twi’lek slicer',c:{Brawn:1,Agility:3,Intellect:4,Cunning:3,Willpower:2,Presence:3},sk:{Computers:3,Mechanics:2,Medicine:1,Deception:2,Perception:2,Streetwise:1,Cool:1},weapon:'holdout',armor:'heavyClothing',wt:11,st:12,soak:2,def:0},
{id:'tavo',name:'Tavo Renn',role:'Rodian marksman',c:{Brawn:2,Agility:4,Intellect:2,Cunning:4,Willpower:2,Presence:1},sk:{'Ranged (Heavy)':3,Perception:3,Streetwise:2,Survival:3,Stealth:2,Vigilance:2},weapon:'carbine',armor:'paddedArmor',wt:12,st:12,soak:4,def:0}
];
const COMPANION_ROLES={
assault:{name:'Assault',desc:'Adds 1 Boost to combat attacks.'},
guard:{name:'Guard',desc:'Adds +1 defense to that companion.'},
support:{name:'Support',desc:'May use an action to assist the squad, granting a Boost and recovering strain.'}
};
const COMPANION_PERKS={
kira:[
{id:'bulwark',name:'Beskar Nerve',cost:10,desc:'Guard role grants one additional defense.',effect:'guardDefense'},
{id:'closeQuarters',name:'Close-Quarters Hunter',cost:15,desc:'Gain 1 Boost on attacks at Engaged or Short range.',effect:'closeBoost'},
{id:'rally',name:'Hold the Line',cost:15,desc:'Support action also gives the player +1 defense until their next turn.',effect:'supportDefense'}],
lena:[
{id:'slicerSuite',name:'Ghost-Slicer Suite',cost:10,desc:'Gain 1 Boost on Computers and Mechanics checks.',effect:'techBoost'},
{id:'fieldMedic',name:'Field Medic',cost:15,desc:'Successful Medicine wound treatment heals 1 additional wound.',effect:'medicHeal'},
{id:'quickPatch',name:'Quick Patch',cost:15,desc:'Once per encounter, Support also heals 1 wound from the most injured ally.',effect:'supportHeal'}],
tavo:[
{id:'hunterEye',name:'Hunter’s Eye',cost:10,desc:'Gain 1 Boost on Perception and Survival checks.',effect:'huntBoost'},
{id:'deadeye',name:'Deadeye',cost:15,desc:'Gain 1 Boost on Ranged (Heavy) attacks at Medium or longer range.',effect:'rangedBoost'},
{id:'suppressor',name:'Suppressing Fire',cost:15,desc:'Support action also gives one enemy a Setback on its next check.',effect:'supportSetback'}]
};
const COMPANION_DIALOGUE={
kira:{intro:'Kira checks the seal on her armor. “If we’re doing this, we do it clean. No panic, no waste.”',past:'“Armor is only useful if the person inside it knows what they stand for. I’m still deciding what I stand for now.”',trusted:'“You’ve proven you don’t fold when things get ugly. That matters more than speeches.”',loyal:'“Whatever waits beyond Sable Reach, you won’t face it alone.”',wary:'“I’m still here. Don’t confuse that with trust.”'},
lena:{intro:'Lena turns a datapad over in one hand. “Every lock has a mistake in it. People usually have more.”',past:'“I used to think information made you safe. Then I learned it just tells dangerous people exactly what you’re worth.”',trusted:'“I’ve stopped building three escape plans every time you walk into a room. Mostly.”',loyal:'“You gave me room to choose what I become. I won’t forget that.”',wary:'“Keep me out of whatever game you’re playing. I’ll do the job, nothing more.”'},
tavo:{intro:'Tavo studies the exits. “A clean shot solves most problems. Knowing when not to take it solves the rest.”',past:'“Tracking is patience. Hunting people is the same, except people convince themselves they’re clever.”',trusted:'“You’re getting easier to read. That’s a compliment. Means I know where you’ll stand when the shooting starts.”',loyal:'“If somebody marks you, they mark me too.”',wary:'“I work with people I don’t like all the time. Don’t make me practice.”'}
};
const COMPANION_QUESTS={
kira:{name:'Ashes of Concord',summary:'Kira learns that an old clan signet from her past is circulating through Sable Reach’s underworld.',stages:[{skill:'Streetwise',diff:3,text:'Trace the signet through black-market brokers.'},{skill:'Athletics',diff:2,text:'Reach the hidden cache before scavengers strip it.'}],reward:'Kira recovers the signet and chooses to carry it again.'},
lena:{name:'Ghost Key',summary:'A dead slicer’s access key appears on the local net, tied to a mistake Lena thought she buried.',stages:[{skill:'Computers',diff:3,text:'Trace the Ghost Key through a hostile relay.'},{skill:'Mechanics',diff:3,text:'Physically isolate and purge the compromised hardware.'}],reward:'Lena destroys the backdoor and keeps a clean copy of the useful code.'},
tavo:{name:'Long Shot',summary:'Tavo recognizes a bounty cipher attached to someone who vanished before he could settle the hunt.',stages:[{skill:'Survival',diff:3,text:'Reconstruct the quarry’s trail from old route data.'},{skill:'Ranged (Heavy)',diff:3,text:'Make the covering shot when the trail turns into an ambush.'}],reward:'Tavo closes the old hunt on his terms instead of the client’s.'}
};

const EP15_LOCATIONS={
cantina:{name:'Cinder Spire Cantina',zone:'Sable Reach'},
market:{name:'Dustline Market',zone:'Sable Reach'},
clinic:{name:'Rinn Clinic',zone:'Sable Reach'},
underworks:{name:'Sable Reach Underworks',zone:'Sable Reach'},
ash:{name:'Ash Flats',zone:'Wilderness'},
crash:{name:'Imperial Crash Site',zone:'Wilderness'},
camp:{name:'Scavenger Camp',zone:'Wilderness'},
sensor:{name:'Broken Sensor Mast',zone:'Wilderness'},
outpostGate:{name:'Imperial Listening Post — Perimeter',zone:'Imperial Facility'},
outpostService:{name:'Imperial Listening Post — Service Level',zone:'Imperial Facility'},
outpostCommand:{name:'Imperial Listening Post — Command Deck',zone:'Imperial Facility'},
hangar:{name:'Hangar Twelve',zone:'Imperial Facility'},
orbit:{name:'Low Orbit',zone:'Episode 0 Complete'}
};
const EP15_QUEST_DEFS={
main:{name:'Fallen Courier',main:true,summary:'Find the crashed Imperial courier, seize its Cipher Core, survive the fallout, and escape Sable Reach with a ship.'},
water:{name:'Water for Sable Reach',summary:'Rinn Clinic needs the settlement’s failing condenser brought back online.'},
missing:{name:'The Missing Scout',summary:'A local scout disappeared in the Ash Flats while tracking the Imperial crash.'},
ledger:{name:'Black Ledger',summary:'A Hutt fixer wants an encrypted ledger quietly removed from a rival cache.'},
bounty:{name:'A Name on the Board',summary:'Bounty broker Vesk Anlow wants Korda Venn taken off the local lanes.'},
signal:{name:'Ghost Signal',summary:'A dead sensor mast is broadcasting an impossible Imperial handshake.'},
meds:{name:'Stolen Meds',summary:'A crate of clinic supplies disappeared into the market before reaching Rinn Clinic.'}
};
const EP15_NPCS={
rhea:{name:'Rhea Sol',role:'Cantina proprietor',text:'A sharp-eyed human who hears every rumor that survives a night in the Cinder Spire.'},
vesk:{name:'Vesk Anlow',role:'Bounty broker',text:'A Devaronian broker who keeps contracts clean, concise, and paid.'},
meela:{name:'Dr. Meela Rinn',role:'Clinic physician',text:'An exhausted physician holding Sable Reach together with salvaged equipment and stubbornness.'},
garr:{name:'Garr Vesh',role:'Hutt fixer',text:'A Nikto middleman with expensive boots and a talent for making requests sound inevitable.'},
sila:{name:'Sila Tor',role:'Rebel courier',text:'A quiet courier using Sable Reach as a listening post against local Imperial traffic.'},
korda:{name:'Korda Venn',role:'Wanted raider',text:'A scavenger captain who has been robbing caravans and selling information twice.'},
varrik:{name:'Chief Varrik',role:'Imperial security chief',text:'The officer responsible for sealing the crash site and erasing anyone who saw too much.'}
};
const EP15_LOOT={
crashCache:{name:'Courier Emergency Cache',desc:'150 credits, 1 stimpack, and 1 extra reload.'},
scoutPack:{name:'Scout’s Field Pack',desc:'General Purpose Scanner and 100 credits.'},
sensorParts:{name:'Sensor Mast Components',desc:'1 extra reload and 125 credits.'},
outpostArmory:{name:'Outpost Armory Cache',desc:'Armored Clothing and 200 credits.'},
bossLocker:{name:'Varrik’s Lockbox',desc:'350 credits and a Model-1 Nova Viper if not already owned.'}
};

const SHIP_MODELS={
hwk290:{id:'hwk290',name:'HWK-290 Light Freighter',model:'HWK-290 Light Freighter',class:'Light Freighter',manufacturer:'Corellian Engineering Corporation',silhouette:3,speed:4,handling:1,defense:1,armor:2,hull:18,strain:18,enc:75,passengers:2,crew:'Pilot and co-pilot',hp:5,hyperdrive:'Class 2',sensor:'Short',price:70000,rarity:7,source:'Force and Destiny Core / Far Horizons / Starships and Speeders',implementation:'Playable',weapon:{name:'Hangar Twelve Medium Laser Cannon',skill:'Gunnery',damage:6,crit:3,range:'Close',source:'Original Episode 0 refit; stock HWK-290 is unarmed.'}},
jumpmaster:{id:'jumpmaster',name:'JumpMaster 5000',model:'JumpMaster 5000',class:'Scout / Patrol Craft',manufacturer:'Corellian Engineering Corporation',silhouette:4,speed:4,handling:1,defense:1,armor:2,hull:14,strain:8,enc:30,passengers:1,crew:'One pilot',hp:2,hyperdrive:'Class 3 / backup Class 15',sensor:'Extreme',price:55000,rarity:5,source:'Starships and Speeders · p.86',implementation:'Playable',weapon:{name:'Forward Light Laser Cannon',skill:'Gunnery',damage:5,crit:3,range:'Close'}},
fang:{id:'fang',name:'Fang Starfighter',model:'Fang Starfighter',class:'Starfighter',manufacturer:'MandalMotors',silhouette:3,speed:6,handling:3,defense:1,armor:2,hull:10,strain:8,enc:4,passengers:0,crew:'One pilot',hp:1,hyperdrive:'Class 2',sensor:'Medium',price:175000,rarity:8,source:'Starships and Speeders · p.46',implementation:'Playable',weapon:{name:'Wing-mounted Medium Laser Cannons',skill:'Gunnery',damage:6,crit:3,range:'Close',qualities:{linked:1}},note:'Proton torpedoes and Narrow Attack Profile are indexed in the database; the solo patrol loop uses the primary laser battery.'},
yt2400:{id:'yt2400',name:'YT-2400 Light Freighter',model:'YT-2400 Light Freighter',class:'Light Freighter',manufacturer:'Corellian Engineering Corporation',silhouette:4,speed:3,handling:0,defense:1,armor:4,hull:25,strain:18,enc:140,passengers:6,crew:'Pilot and co-pilot/engineer',hp:5,hyperdrive:'Class 2 / backup Class 12',sensor:'Short',price:130000,rarity:5,source:'Starships and Speeders · p.100',implementation:'Playable',weapon:{name:'Twin Medium Laser Cannon',skill:'Gunnery',damage:6,crit:3,range:'Close',qualities:{linked:1}}},
lambda:{id:'lambda',name:'Lambda-class T-4a Long Range Shuttle',model:'Lambda-class T-4a Long Range Shuttle',class:'Long-range Shuttle',manufacturer:'Sienar Fleet Systems',silhouette:4,speed:3,handling:0,defense:2,armor:4,hull:25,strain:15,enc:200,passengers:20,crew:'Pilot, co-pilot, navigator, gunner, communications operator, engineer',hp:2,hyperdrive:'Class 1 / backup Class 10',sensor:'Short',price:140000,rarity:6,restricted:true,source:'Starships and Speeders · p.54',implementation:'Playable',weapon:{name:'Twin Light Laser Cannons',skill:'Gunnery',damage:5,crit:3,range:'Close',qualities:{linked:1}},note:'The source profile has several weapon mounts; the solo patrol loop selects the forward twin light laser battery as the primary attack.'},
firespray:{id:'firespray',name:'Firespray System Patrol Craft',model:'Firespray System Patrol Craft',class:'Patrol / Attack Craft',manufacturer:'Kuat Systems Engineering',silhouette:4,speed:4,handling:0,defense:1,armor:4,hull:15,strain:12,enc:65,passengers:6,crew:'One pilot and two guards',hp:4,hyperdrive:'Class 3 / backup Class 15',sensor:'Short',price:80000,rarity:4,source:'Starships and Speeders · patrol-craft profile',implementation:'Playable',weapon:{name:'Primary Laser Cannon Battery',skill:'Gunnery',damage:6,crit:3,range:'Close'},note:'Multiple source weapon systems are abstracted to one primary battery in the current solo patrol loop.'}
};
const SHIP_BASE=SHIP_MODELS.hwk290;
const VEHICLE_DB=[
{name:'M-68 Landspeeder',class:'Landspeeder',manufacturer:'Mobquet Swoops and Speeders',maxAltitude:'2 meters',sensor:'Close',crew:'One driver',enc:10,passengers:1,price:9200,rarity:5,hp:2,weapons:'None.',source:'Starships and Speeders · M-68 profile',implementation:'Reference record · ground-vehicle driving loop pending'},
{name:'X-34 Landspeeder',class:'Landspeeder',manufacturer:'SoroSuub',maxAltitude:'1 meter',sensor:'Close',crew:'One pilot',enc:15,passengers:1,price:4500,rarity:2,hp:2,weapons:'None.',source:'Starships and Speeders · X-34 profile',implementation:'Reference record · ground-vehicle driving loop pending'},
{name:'Flare-S Swoop',class:'Swoop / Speeder Bike',manufacturer:'Mobquet Swoops and Speeders',sensor:null,crew:'One rider',enc:null,passengers:0,price:null,rarity:null,hp:null,weapons:'None in stock racing configuration.',source:'Starships and Speeders · Flare-S profile',implementation:'Reference record · source-indexed, exact stat strip pending clean extraction'}
];
const STARSHIP_DB=[
...Object.values(SHIP_MODELS).map(x=>({...x,weapons:x.id==='hwk290'?'Stock profile is unarmed; Sable Reach starts with an original medium-laser refit.':`${x.weapon.name}: Damage ${x.weapon.damage}, Crit ${x.weapon.crit}, ${x.weapon.range}${x.weapon.qualities?.linked?`, Linked ${x.weapon.qualities.linked}`:''}.`})),
{name:'G1-M4-C Dunelizard — Thwheek custom',class:'Starfighter',manufacturer:'Unknown / custom profile',silhouette:3,speed:4,handling:1,defense:1,armor:3,hull:8,strain:7,hyperdrive:null,sensor:null,crew:'One pilot',enc:null,passengers:0,price:null,rarity:null,hp:null,weapons:'Forward linked medium laser cannons: Damage 6, Close; Linked.',source:'Long Arm of the Hutt',implementation:'Reference record'},
{name:'H-22A D-wing',class:'Shuttle',manufacturer:'Incom Corporation',silhouette:null,speed:null,handling:null,defense:null,armor:null,hull:null,strain:null,hyperdrive:'Class 2',sensor:'Short',crew:'One pilot, two gunners',enc:120,passengers:12,price:145000,rarity:6,hp:1,weapons:'Twin heavy lasers, light lasers, proton torpedoes, and auto-blasters.',source:'Knights of Fate',implementation:'Reference record · primary handling/threshold block pending exact extraction'},
{name:'Kihraxz Light Starfighter',class:'Starfighter',manufacturer:'TransGalMeg Industries',silhouette:null,speed:null,handling:null,defense:null,armor:null,hull:null,strain:null,hyperdrive:'Class 3',sensor:'Close',crew:'One pilot',enc:7,passengers:0,price:65000,rarity:6,hp:5,weapons:'Twin light blaster cannons, concussion missiles, and a light ion cannon.',source:'No Disintegrations',implementation:'Reference record · primary handling/threshold block pending exact extraction'},
{name:'Ainik-class Survey Vessel',class:'Survey Vessel',manufacturer:'SoroSuub',silhouette:null,speed:null,handling:null,defense:null,armor:null,hull:null,strain:null,hyperdrive:'Class 3 / backup Class 12',sensor:'Extreme',crew:'Pilot, co-pilot, two engineers/scientists',enc:150,passengers:6,price:120000,rarity:7,hp:3,weapons:'Dorsal and ventral quad laser cannons Damage 5, Crit 3, Close, Accurate 1, Linked 3; light tractor beam.',source:'Fully Operational',implementation:'Reference record · research-lab rule indexed'},
{name:'Penumbra-class Stealth Freighter',class:'Freighter',manufacturer:'Brennkeyes Syndicate',silhouette:null,speed:null,handling:null,defense:null,armor:null,hull:null,strain:null,hyperdrive:'Class 4 / backup Class 20',sensor:'Short',crew:'Pilot, co-pilot, gunner',enc:90,passengers:4,price:100000,rarity:9,hp:0,weapons:'Twin light ion cannons Damage 5, Crit 4, Close, Ion, Linked 1.',source:'Keeping the Peace',implementation:'Reference record · stealth-system rule indexed'}
];

const SHIP_UPGRADES={
reinforcedHull:{id:'reinforcedHull',name:'Reinforced Hull Bracing',hp:1,price:1800,desc:'+3 Hull Trauma Threshold.',effect:'hull'},
auxCap:{id:'auxCap',name:'Auxiliary Capacitors',hp:1,price:1600,desc:'+3 System Strain Threshold.',effect:'strain'},
shieldBooster:{id:'shieldBooster',name:'Shield Booster',hp:1,price:2400,desc:'+1 Defense.',effect:'defense'},
engineTune:{id:'engineTune',name:'Engine Tuning',hp:1,price:2200,desc:'+1 Handling.',effect:'handling'},
targeting:{id:'targeting',name:'Targeting Computer',hp:1,price:2600,desc:'Adds 1 Boost to the ship gunner’s attacks.',effect:'gunnery'},
hyperTune:{id:'hyperTune',name:'Hyperdrive Tuning',hp:1,price:3000,desc:'Improves the campaign hyperdrive from Class 2 to Class 1.',effect:'hyper'}
};
const SHIP_DESTINATIONS={
sable:{name:'Sable Reach',diff:1,desc:'Local settlement and repair facilities.'},
orbit:{name:'Vardos Minor Orbit',diff:1,desc:'Low orbit above the Episode 0 region.'},
relay:{name:'Kestrel Relay',diff:2,desc:'A remote communications relay along the local route.'},
demeris:{name:'Demeris Run',diff:3,desc:'A poorly charted smuggler corridor beyond local patrol lanes.'}
};
const SHIP_ENEMY_TEMPLATE={name:'Imperial Patrol Fighter',silhouette:3,speed:5,handling:2,defense:0,armor:2,hull:7,strain:6,agility:3,gunnery:2,weapon:{name:'Twin Laser Cannons',damage:6,crit:3,range:'Close'}};


const RULE_AUDIT=[

{id:'galaxyEquipment40',name:'Phases 38–40 Galaxy Equipment Mega-Update',status:'verified',source:'Complete Species Guide v6.0 fan supplement; Gadgets and Gear; Starships and Speeders',detail:'Phase 38 adds twelve source-labeled species profiles from the fan Complete Species Guide; Phase 39 imports a large source-grounded slice of Gadgets and Gear blasters/armor and expands attachment references; Phase 40 adds a source-grounded multi-ship hangar plus a vehicle reference catalog. Narrative-only racial traits, selected item side rules, attachment tables, and ground-vehicle driving remain explicitly partial/reference rather than guessed.'},
{id:'species40',name:'Expanded species roster provenance',status:'verified',source:'Complete Species Guide v6.0 / June 2020 fan product',detail:'Chiss, Duros, Gand, Gungan, Jawa, Kel Dor, Miraluka, Pantoran, Sullustan, Toydarian, Weequay, and Wookiee profiles use the fan supplement’s printed characteristics, thresholds, starting XP, and listed starting skill where applicable. The UI labels the source as a fan supplement.'},
{id:'gadgets40',name:'Gadgets and Gear combat profiles',status:'verified',source:'Gadgets and Gear · Blasters pp.9–13; Armor pp.67–69',detail:'The imported weapon and armor cards preserve printed damage/critical/range or defense/soak, encumbrance, hard points, price, rarity, restriction flags, and listed qualities. Situational text not supported by the current engine is described but not silently automated.'},
{id:'hangar40',name:'Multi-ship hangar and ship acquisition',status:'adapted',source:'Starships and Speeders profiles + Sable Reach solo economy',detail:'Ship chassis statistics are source-grounded. Owning multiple ships, switching between stored per-model condition states, and acquiring ships through the existing rarity check are videogame campaign adaptations.'},

{id:'careerCompletion37',name:'Phase 31–37 career completion mega-update',status:'adapted',source:'Age of Rebellion Core; Desperate Allies; Forged in Battle; Fully Operational; Cyphers and Masks; Disciples of Harmony; Keeping the Peace; Unlimited Power; Savage Spirits; Endless Vigil',detail:'All 18 core careers now expose six specialization choices. Career and specialization skill packages are source-grounded. Previously audited exact trees are preserved. Newly added Phase 31–37 specializations use connected 20-node 5/10/15/20/25 XP progression grids as a transparent videogame bridge; exact printed talent-card text and prerequisite geometry remain a later transcription/audit task.'},

{id:'rarity',name:'Item rarity & availability',status:'verified',source:'Core equipment rarity table',detail:'Rarity 0–1 is Simple; 2–3 Easy; 4–5 Average; 6–7 Hard; 8–9 Daunting; 10 Formidable. Sable Reach applies an Outer Rim +2 rarity modifier.'},
{id:'medicine',name:'Medicine & natural recovery',status:'verified',source:'Force and Destiny Core recovery rules',detail:'Medicine wound treatment is once per patient per encounter; self-treatment increases difficulty by two. A full night heals 1 wound and all strain. Weekly natural Critical recovery uses Resilience at the injury severity.'},
{id:'criticalHealing',name:'Critical Injury treatment frequency',status:'verified',source:'Force and Destiny Core recovery rules',detail:'Each Critical Injury may receive a Medicine treatment attempt once per narrative week at difficulty equal to severity.'},
{id:'criticalTable',name:'Full Critical Injury table',status:'verified',source:'Force and Destiny Core critical injury table',detail:'Phase 19+ uses the full table with the full 01–151+ Star Wars table, including Off-Balance, Stunned, Head Ringer, Fearsome/Agonizing Wounds, Overpowered, Maimed, Blinded, Gruesome Injury, Bleeding Out, and The End is Nigh.'},
{id:'minions',name:'Minion groups',status:'verified',source:'Under a Black Sun rules summary',detail:'Combined wound pool, one soak application, group-only skill ranks equal to additional surviving minions, and Critical Hits remove one minion-equivalent.'},
{id:'destiny',name:'Destiny response timing',status:'verified',source:'Under a Black Sun rules summary',detail:'Acting side may spend first, opposing side may respond, and tokens flip after the roll resolves.'},
{id:'stun',name:'Blaster stun range',status:'verified',source:'Under a Black Sun rules summary',detail:'Stun setting deals strain after soak and is limited to Short range.'},
{id:'cumbersome',name:'Cumbersome / Unwieldy',status:'verified',source:'Force and Destiny item qualities',detail:'Each point below the required Brawn/Agility increases check difficulty by one; it is not a Setback penalty.'},
{id:'parry',name:'Parry / Reflect timing',status:'verified',source:'FFG adversary/talent profiles',detail:'Damage reduction occurs after the hit is calculated but before soak is applied.'},
{id:'hwk',name:'HWK-290 base profile',status:'verified',source:'F&D Core p.263; Far Horizons pp.56–57; Starships and Speeders p.85',detail:'Silhouette 3, Speed 4, Handling +1, Armor 2, Hull 18, System Strain 18, 75 encumbrance, 2 passengers, Class 2 hyperdrive, 5 hard points, 70,000 credits/rarity 7, stock unarmed.'},
{id:'cover',name:'Individual cover state',status:'adapted',source:'Core combat rules + videogame abstraction',detail:'Cover now belongs to the acting character instead of a single global PC flag, but exact geometry remains abstracted into range-band combat.'},
{id:'threat',name:'Solo Threat/Despair resolution',status:'adapted',source:'Under a Black Sun symbol-spend options',detail:'The legal effects are source-shaped, but the solo engine chooses a compact priority outcome rather than running a human GM decision every roll.'},
{id:'companions',name:'Companion XP / approval / roles',status:'adapted',source:'Original Sable Reach system',detail:'Companion statistics use the shared dice engine; XP, approval thresholds, roles, perks, and loyalty quests are original videogame systems.'},
{id:'shipCombat',name:'Starship combat encounter',status:'adapted',source:'FFG vehicle concepts + original solo loop',detail:'Pilot/Gunner/Engineer checks and planetary-scale statistics are source-shaped; the round/station encounter is streamlined for solo play.'},
{id:'shipUpgrades',name:'Ship upgrade packages',status:'adapted',source:'Original Sable Reach content',detail:'Hard points follow the FFG customization concept, but Phase 14 upgrade packages are original.'},
{id:'craftingTemplates',name:'Workshop practice templates',status:'adapted',source:'FFG crafting structure + original templates',detail:'Select template → acquire materials → construct follows the source structure; current Utility Rig and Field Padding profiles are original.'},
{id:'talentTrees',name:'Full specialization tree database',status:'prototype',source:'Pending exact-data expansion',detail:'Several trees are partial/source-shaped rather than a complete source-verified implementation.'},
{id:'forceTrees',name:'Five source-grounded Force power trees',status:'verified',source:'Force and Destiny Core',detail:'Move, Sense, Enhance, Influence, and Foresee now use source-grounded tree structures and XP costs. The app automates interactions that map cleanly to the solo engine and labels remaining narrative effects.'},
{id:'repairEconomy',name:'Dockyard / equipment repair pricing',status:'prototype',source:'Original economy abstraction',detail:'Repair checks exist, but service pricing and some damage-state details still need a dedicated exact-data pass.'},
{id:'contentDatabase',name:'Curated source content library',status:'verified',source:'Project source books and reference guides',detail:'Phase 20 adds source-labeled species, specialization skill packages, adversaries, attachments, ships, Force powers, and talents. Coverage is intentionally incomplete, and reference-only records are kept distinct from playable mechanics.'},
{id:'tacticalAI',name:'Per-unit positioning & enemy AI',status:'adapted',source:'FFG range-band combat concepts + original solo tactics layer',detail:'Phase 21 gives each combatant an abstract position and derives range separately for every attacker/target pair. Enemy roles, target scoring, cover use, aiming, officer support, and retreat/advance choices are original solo-game automation built around the narrative range-band system.'},
{id:'ordnance22',name:'Grenade profiles & AoE handling',status:'adapted',source:'Chronicles of the Gatekeeper; Under a Black Sun + Phase 22 tactical abstraction',detail:'Frag and stun grenade combat profiles, plus the mini thermal detonator profile, are source-grounded. Shared inventory, resupply prices, tactical-position blast radii, and AI grenade selection are videogame adaptations.'},
{id:'morale22',name:'Suppression, morale & retreats',status:'adapted',source:'Star Wars narrative combat themes + original solo AI',detail:'Suppression penalties, morale checks, retreat states, rally behavior, and encounter-specific AI packages are original systems designed to make solo combat tactically responsive.'},
{id:'progression23',name:'Source-grounded advanced specialization trees',status:'verified',source:'Keeping the Peace; Knights of Fate',detail:'Phase 23 replaces generic placeholders for Armorer, Colossus, Juyo Berserker, and Steel Hand Adept with source-grounded 20-node talent contents and XP tiers, using application connector paths recreated from the source presentation. It also permits non-career specialization advancement with the standard added XP premium. Talent text is paraphrased, and mechanical automation varies by talent and is labeled in the UI.'},
{id:'forms24',name:'Complete core lightsaber-form trees',status:'verified',source:'Force and Destiny Core',detail:'Phase 24 replaces the six partial lightsaber-form trees with full 20-node source-grounded layouts for Niman, Soresu, Makashi, Ataru, Shien, and Shii-Cho.'},
{id:'coreSpecs25',name:'Complete Force and Destiny core career trees',status:'verified',source:'Force and Destiny Core',detail:'Phase 25 adds the remaining twelve Force and Destiny Core specialization trees as source-grounded 20-node layouts: Healer, Sage, Peacekeeper, Protector, Advisor, Seer, Hunter, Pathfinder, Artisan, Shadow, Aggressor, and Starfighter Ace.'},
{id:'edgeBooks26',name:'Bounty Hunter & Smuggler career-book trees',status:'verified',source:'No Disintegrations; Fly Casual',detail:'Phase 26 adds full 20-node source-grounded trees and bonus career-skill packages for Martial Artist, Operator, Skip Tracer, Charmer, Gambler, and Gunslinger. Talent text is paraphrased and engine automation is labeled per talent.'},
{id:'edgeBooks27',name:'Technician & Hired Gun career-book trees',status:'verified',source:'Special Modifications; Dangerous Covenants',detail:'Phase 27 adds source-grounded 20-node trees and bonus career-skill packages for Cyber Tech, Droid Tech, Modder, Demolitionist, Enforcer, and Heavy. Special Modifications nodes were verified against the supplied source pages; Dangerous Covenants node/tier data was cross-checked against the source-book reference and secondary indexes because the supplied PDF is damaged in the local renderer.'},
{id:'edgeBooks28',name:'Colonist & Explorer career-book trees',status:'verified',source:'Far Horizons; Enter the Unknown',detail:'Phase 28 adds source-grounded 20-node trees and bonus career-skill packages for Entrepreneur, Marshal, Performer, Archaeologist, Big-Game Hunter, and Driver. Talent names, tier placement, career-skill packages, and tree connections are recreated from the supplied source-book talent-tree pages; descriptions are paraphrased for the game UI.'},
{id:'aorBooks29',name:'Commander & Ace career-book trees',status:'verified',source:'Lead by Example; Stay on Target',detail:'Phase 29 adds Commander and Ace to character creation and recreates the six career-book specializations Figurehead, Instructor, Strategist, Beast Rider, Hotshot, and Rigger as 20-node source-grounded talent trees. Career skills and bonus specialization skills come directly from the tree headers; talent descriptions are paraphrased for the game UI.'},
{id:'aorCore30',name:'Commander & Ace core specialization trees',status:'verified',source:'Age of Rebellion Core specialization references',detail:'Phase 30 adds Commodore, Squadron Leader, Tactician, Gunner, and Pilot as full 20-node trees and adds the shared Driver specialization to the Ace career. Bonus career skills, XP tiers, talent names, and source-page provenance follow the Age of Rebellion core specialization references; UI descriptions are paraphrased.'}
];


let S={name:'Zek Tarren',species:'human',career:'Bounty Hunter',spec:'Assassin',base:{},chars:{},charSpend:{},skills:{},freeCareer:[],freeSpec:[],xpStart:110,xpSpent:0,talents:new Set(),dedication:{},forceRating:0,forceOwned:{Move:new Set(),Sense:new Set(),Enhance:new Set(),Influence:new Set(),Foresee:new Set()},forceTab:'Move',forceCommitted:{sense:false,brawn:false,agility:false},framework:'Obligation',frameworkType:'Debt',frameworkValue:10,destiny:{light:2,dark:2},conflict:0,finalized:false,earnedXp:0,wounds:0,strain:0,scene:0,crew:['kira','lena'],weapon:'carbine',last:null,combat:null,buildLog:[],gameLog:[],sessionUsed:{naturalProgrammer:false,naturalCharmer:false,naturalDoctor:false,naturalNegotiator:false,naturalLeader:false,naturalHunter:false,naturalOutdoorsman:false,naturalTinkerer:false,naturalMystic:false,naturalBrawler:false,naturalRogue:false,naturalMarksman:false,naturalEnforcer:false,naturalMerchant:false,naturalAthlete:false,naturalDriver:false,naturalInstructor:false,naturalPilot:false,worksLikeACharm:false,cleverSolution:false,fortuneFavorsBold:false,senseDanger:false,touchOfFate:false,forceOfWill:false,powerFromPain:false,improvedToughened:false},deadlyAccuracySkill:null,conflictReduction:0,flags:{},universalSpecs:[],universalTalents:{'Force Sensitive Exile':new Set(),'Force-Sensitive Emergent':new Set()},universalView:'Force Sensitive Exile',morality:50,criticals:[],stunMode:false,credits:500,inventory:[],armor:'heavyClothing',stimpacks:2,stimUses:0,ordnance:{frag:2,stun:1,miniThermal:0},speciesSkillChoice:null,crewState:{},conditions:{prone:false,immobilized:0,staggered:0,disoriented:0,hamstrung:false,winded:false,compromised:false,atBrink:false,bleedingOut:false},medical:{encounter:1,woundTreated:{},critTreated:{},day:1},dead:false,crewLoadout:{kira:{weapon:null,armor:null},lena:{weapon:null,armor:null},tavo:{weapon:null,armor:null}},approval:{kira:0,lena:0,tavo:0},destinyPending:{allyUpgrade:0,npcDifficulty:0},destinyHeld:{light:0,dark:0},gmDestinyMode:'prompt',narrativeFacts:[],ownedSpecs:[],specTalents:{},talentView:null,forceCommitted:{sense:false,brawn:false,agility:false},foreseeBoost:0,itemAttachments:{},attachmentMods:{},reloads:1,itemDamage:{},crafting:{materials:{},crafted:{},utilityRigReady:true},market:{last:null},crewProgress:{},crewConversation:'kira',crewQuestLog:[],crewField:{supportUsed:{}},ship:{owned:false,name:'Wayward Star',location:'sable',hull:0,strain:0,criticals:[],upgrades:[],stations:{pilot:'pc',navigator:'lena',gunner:'tavo',engineer:'lena'},combat:null,log:[]},ep15:{initialized:false,location:'cantina',mainStage:0,dungeonStage:0,quests:{},rep:{Rebels:0,Hutts:0,Empire:0,Guild:0,Local:0},intel:0,salvage:0,visited:{},flags:{},loot:{},completed:[],lastNpc:null},schemaVersion:52,settings:{difficulty:'standard',tutorial:true,autosave:true,uiScale:'standard',reducedMotion:false},lastSaved:null,saveWarnings:[]};

/* Phase 17: shared actor/rules helpers and database plumbing. */
function freshConditions(){return{prone:false,immobilized:0,staggered:0,disoriented:0,suppressed:0,hamstrung:false,winded:false,compromised:false,atBrink:false,bleedingOut:false,lastBleedRound:0,cover:false,headRinger:false,fearsomeWound:false,agonizingWound:false,slightlyDazed:false,scatteredSenses:false,temporarilyLame:false,blinded:false,knockedSenseless:false,lostArm:0,lostLeg:0,noFreeManeuver:0,nextSetback:0,nextUpgrade:0,nextDifficulty:0,slowedRound:0,droppedWeapon:false,endIsNigh:0,endIsNighRound:0}}
function ensureCrewState(){
  ensurePhase8State();S.crewState=S.crewState||{};
  for(const c of CREW){
    if(!S.crewState[c.id])S.crewState[c.id]={wounds:0,strain:0,criticals:[],conditions:freshConditions(),incapacitated:false,permanentCharLoss:{}};
    S.crewState[c.id].criticals=S.crewState[c.id].criticals||[];S.crewState[c.id].permanentCharLoss=S.crewState[c.id].permanentCharLoss||{};
    S.crewState[c.id].conditions=S.crewState[c.id].conditions||{};
    for(const [k,v] of Object.entries(freshConditions()))if(S.crewState[c.id].conditions[k]===undefined)S.crewState[c.id].conditions[k]=v
  }
  S.conditions=S.conditions||{};for(const [k,v] of Object.entries(freshConditions()))if(S.conditions[k]===undefined)S.conditions[k]=v;S.permanentCharLoss=S.permanentCharLoss||{};
  S.medical=S.medical||{encounter:1,woundTreated:{},critTreated:{},day:1};
  S.medical.woundTreated=S.medical.woundTreated||{};S.medical.critTreated=S.medical.critTreated||{};
  for(const id of ['pc',...CREW.map(c=>c.id)]){
    let st=id==='pc'?{criticals:S.criticals}:S.crewState[id];
    (st?.criticals||[]).forEach((cr,i)=>{if(!cr.uid)cr.uid=`${id}-${cr.roll||0}-${i}-${cr.name||'crit'}`})
  }
}
function actorById(id){return id==='pc'?{id:'pc',name:S.name,c:S.chars,sk:S.skills,weapon:S.weapon,wt:woundThreshold(),st:strainThreshold(),soak:playerSoak(),def:playerDefense('ranged')}:effectiveCrew(id)}
function actorState(id){ensureCrewState();return id==='pc'?{get wounds(){return S.wounds},set wounds(v){S.wounds=v},get strain(){return S.strain},set strain(v){S.strain=v},get criticals(){return S.criticals},set criticals(v){S.criticals=v},conditions:S.conditions,get incapacitated(){return S.wounds>woundThreshold()||S.strain>strainThreshold()||S.dead},set incapacitated(v){}}:S.crewState[id]}
function actorWT(id){return id==='pc'?woundThreshold():(CREW.find(c=>c.id===id)?.wt||10)}
function actorST(id){return id==='pc'?strainThreshold():(CREW.find(c=>c.id===id)?.st||10)}
function actorSoak(id){if(id==='pc')return playerSoak();let c=CREW.find(x=>x.id===id),a=effectiveArmor(currentCrewArmorId(id));return (c?.c.Brawn||1)+(a?.soak||0)}
function actorDefense(id,kind='ranged'){
  let foresee=S.combat?.round===1&&S.combat?.foreseeDefenseIds?.includes(id)?2:0;
  if(id==='pc')return playerDefense(kind)+foresee;
  let a=effectiveArmor(currentCrewArmorId(id)),base=(a?.defense||0)+foresee,p=crewProgress(id),w=effectiveWeapon(currentCrewWeaponId(id));
  if(kind==='melee')base+=quality(w,'defensive');
  if(kind==='ranged')base+=quality(w,'deflection');
  if(p.role==='guard')base+=1;if(p.role==='guard'&&crewPerkByEffect(id,'guardDefense'))base+=1;return base
}
function actorIsIncapacitated(id){let st=actorState(id);return id==='pc'?(S.dead||st.wounds>actorWT(id)||st.strain>actorST(id)):(!!st.incapacitated||st.wounds>actorWT(id)||st.strain>actorST(id))}
function canVoluntarilySufferStrain(id){return !actorState(id).conditions.winded}
function actorStrain(id,amount){let st=actorState(id);st.strain=Math.max(0,Math.min(actorST(id)+1,st.strain+amount));if(st.strain>actorST(id)&&id!=='pc')st.incapacitated=true}
function actorHealStrain(id,amount){let st=actorState(id);st.strain=Math.max(0,st.strain-amount);if(id!=='pc'&&st.wounds<=actorWT(id)&&st.strain<=actorST(id))st.incapacitated=false}
function actorHealWounds(id,amount){let st=actorState(id);st.wounds=Math.max(0,st.wounds-amount);if(id!=='pc'&&st.wounds<=actorWT(id)&&st.strain<=actorST(id))st.incapacitated=false}
function actorDamage(id,amount){
  let st=actorState(id),wt=actorWT(id),wasOver=st.wounds>wt;
  st.wounds=Math.min(wt*2,st.wounds+Math.max(0,amount));
  if(st.wounds>wt&&!wasOver){
    inflictPartyCritical(id,true);
    if(id!=='pc')st.incapacitated=true
  }else if(st.wounds>wt&&id!=='pc')st.incapacitated=true
}
function conditionsText(id){
  let c=actorState(id).conditions,arr=[];if(c.cover)arr.push('Cover');if(c.suppressed>0)arr.push(`Suppressed ${c.suppressed}`);if(c.prone)arr.push('Prone');if(c.immobilized>0)arr.push(`Immobilized ${c.immobilized}`);if(c.staggered>0)arr.push(`Staggered ${c.staggered}`);if(c.disoriented>0)arr.push(`Disoriented ${c.disoriented}`);if(c.hamstrung)arr.push('Hamstrung');if(c.winded)arr.push('Winded');if(c.compromised)arr.push('Compromised');if(c.atBrink)arr.push('At the Brink');if(c.temporarilyLame)arr.push('Temporarily Lame');if(c.blinded)arr.push('Blinded');if(c.knockedSenseless)arr.push('Knocked Senseless');if(c.lostArm)arr.push(`Maimed arm ×${c.lostArm}`);if(c.lostLeg)arr.push(`Maimed leg ×${c.lostLeg}`);if(c.bleedingOut)arr.push('Bleeding Out');return arr.join(', ')||'None'
}
function severityDifficulty(sev){return sev==='Easy'?1:sev==='Average'?2:sev==='Hard'?3:sev==='Daunting'?4:5}


const CREW_SPECIALTIES={
  kira:['Athletics','Brawl','Ranged (Light)','Coercion','Discipline'],
  lena:['Computers','Mechanics','Medicine','Deception','Perception'],
  tavo:['Ranged (Heavy)','Perception','Survival','Stealth','Streetwise']
};

function ensurePhase9State(){
  ensurePhase8State();
  S.ownedSpecs=Array.isArray(S.ownedSpecs)?S.ownedSpecs:[];
  if(!S.ownedSpecs.includes(S.spec))S.ownedSpecs.unshift(S.spec);
  S.specTalents=S.specTalents||{};
  for(const sp of S.ownedSpecs){
    if(!S.specTalents[sp])S.specTalents[sp]=new Set();
    if(!(S.specTalents[sp] instanceof Set))S.specTalents[sp]=new Set(S.specTalents[sp]||[]);
  }
  if(S.talents instanceof Set){
    for(const id of S.talents)S.specTalents[S.spec].add(id);
  }else S.talents=new Set(S.talents||[]);
  S.talents=S.specTalents[S.spec];
  S.talentView=S.talentView&&S.ownedSpecs.includes(S.talentView)?S.talentView:S.spec;
  S.forceOwned=S.forceOwned||{};
  for(const p of Object.keys(FORCE_TREES)){
    if(!(S.forceOwned[p] instanceof Set))S.forceOwned[p]=new Set(S.forceOwned[p]||[]);
  }
  S.forceCommitted={sense:false,brawn:false,agility:false,...(S.forceCommitted||{})};
  S.foreseeBoost=S.foreseeBoost||0;
}
function treeForSpec(spec){return EXACT_TREES[spec]||FORM_TREES[spec]||PHASE37_TREES[spec]||genericTree(spec)}
function viewedTalentSet(){ensurePhase9State();return S.specTalents[S.talentView]||new Set()}
function specializationCareers(spec){
  let out=[];for(const [career,c] of Object.entries(CAREERS))if(Object.prototype.hasOwnProperty.call(c.specs,spec))out.push(career);return out
}
function specializationCareer(spec,preferred=S?.career){
  let careers=specializationCareers(spec);return preferred&&careers.includes(preferred)?preferred:(careers[0]||null)
}
function allSpecializationChoices(){
  let bySpec=new Map();
  for(const [career,c] of Object.entries(CAREERS))for(const spec of Object.keys(c.specs)){
    let rec={spec,career,inCareer:career===S.career},prev=bySpec.get(spec);
    if(!prev||rec.inCareer)bySpec.set(spec,rec)
  }
  return [...bySpec.values()]
}
function specializationCount(){ensurePhase9State();return (S.ownedSpecs?.length||0)+(S.universalSpecs?.length||0)}
function additionalSpecCost(spec=$('buySpecSelect')?.value){
  ensurePhase9State();let base=10*(specializationCount()+1),career=specializationCareer(spec);
  return base+(career&&career!==S.career?10:0)
}
function buyAdditionalSpec(){
  ensurePhase9State();let sp=$('buySpecSelect')?.value;if(!sp||S.ownedSpecs.includes(sp))return;
  let sourceCareer=specializationCareer(sp),cost=additionalSpecCost(sp);if(!sourceCareer)return;
  if(!charge(cost,`${sp} specialization`))return;
  S.ownedSpecs.push(sp);S.specTalents[sp]=new Set();S.talentView=sp;
  bLog(`${sp} (${sourceCareer}) acquired${sourceCareer===S.career?' as an in-career specialization':' as a non-career specialization'}. Its specialization skills are now career skills; no free starting ranks are granted.`);renderAll()
}
function eligibleSpecTalent(spec,n){
  let set=S.specTalents[spec]||new Set();return n.row===0||n.links.some(id=>set.has(id))
}
function buyViewedTalent(id){
  ensurePhase9State();let spec=S.talentView,set=S.specTalents[spec],n=treeForSpec(spec).find(x=>x.id===id);
  if(!n||set.has(id)||!eligibleSpecTalent(spec,n))return;
  if(n.name==='Dedication'){
    let ch=prompt('Dedication: choose Brawn, Agility, Intellect, Cunning, Willpower, or Presence');
    if(!S.chars[ch]||S.chars[ch]>=6){bLog('Dedication cancelled or invalid characteristic.');return}
    if(!charge(n.cost,`${spec}: Dedication`))return;set.add(id);S.chars[ch]++;S.dedication[`${spec}:${id}`]=ch;bLog(`Dedication increased ${ch} to ${S.chars[ch]}.`);renderAll();return
  }
  if(n.name==='Deadly Accuracy'){
    let allowed=['Brawl','Melee','Ranged (Light)','Ranged (Heavy)','Gunnery','Lightsaber'],
        pick=prompt(`Deadly Accuracy: choose one combat skill (${allowed.join(', ')})`,S.deadlyAccuracySkill||'Ranged (Light)');
    if(!allowed.includes(pick)){bLog('Deadly Accuracy purchase cancelled: choose a listed combat skill.');return}
    if(!charge(n.cost,`${spec}: ${n.name}`))return;
    set.add(id);S.deadlyAccuracySkill=pick;bLog(`Deadly Accuracy is keyed to ${pick}.`);renderAll();return
  }
  if(charge(n.cost,`${spec}: ${n.name}`)){
    set.add(id);
    if(n.name==='Force Rating'){S.forceRating++;bLog(`Force Rating increased to ${S.forceRating}.`)}
    renderAll()
  }
}
function allOwnedSpecNodes(){
  ensurePhase9State();let out=[];
  for(const sp of S.ownedSpecs){let set=S.specTalents[sp]||new Set();for(const n of treeForSpec(sp))if(set.has(n.id))out.push(n)}
  return out
}
function toggleEnhanceCommit(which){
  ensurePhase9State();let id=which==='Brawn'?'e-brawn':'e-agility',key=which.toLowerCase();
  if(!S.forceOwned.Enhance.has(id)){bLog(`${which} commitment upgrade is not owned.`);return}
  if(S.forceCommitted[key]){S.forceCommitted[key]=false;bLog(`Enhance ${which} die uncommitted.`)}
  else if(forceAvailable()>0){S.forceCommitted[key]=true;bLog(`Committed one Force die: ${which} +1, maximum 6.`)}
  else bLog('No uncommitted Force die is available.');
  renderAll()
}
function useInfluenceBasic(){
  if(!S.forceOwned.Influence.has('i-basic')||forceAvailable()<1)return;
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);
  if(!use.ok){bLog(`Influence failed to generate a usable Force point. ${fr.faces.join(' ')}`);return}
  let strain=S.forceOwned.Influence.has('i-str1')?2:1;
  bLog(`Influence activated (${fr.faces.join(' ')}): an engaged living target may suffer ${strain} strain ignoring soak. Resolve the narrative target in play.`);renderAll()
}
function useForesee(){
  if(!S.forceOwned.Foresee.has('f-basic')||forceAvailable()<1)return;
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);
  if(!use.ok){bLog(`Foresee produced no usable vision. ${fr.faces.join(' ')}`);return}
  let days=1+[...S.forceOwned.Foresee].filter(x=>x.startsWith('f-dur')).length,
      detailRanks=[...S.forceOwned.Foresee].filter(x=>x.startsWith('f-str')).length,
      detail=detailRanks>=2?'highly specific details':detailRanks===1?'more specific details':'vague hints';
  bLog(`Foresee vision (${fr.faces.join(' ')}): ${detail} about the character’s personal future up to roughly ${days} day(s) ahead.`);renderAll()
}

function ensurePhase8State(){
  S.crewLoadout=S.crewLoadout||{};
  S.approval=S.approval||{};
  for(const c of CREW){
    S.crewLoadout[c.id]={weapon:null,armor:null,...(S.crewLoadout[c.id]||{})};
    if(!Number.isFinite(S.approval[c.id]))S.approval[c.id]=0;
  }
  S.destinyPending={allyUpgrade:0,npcDifficulty:0,...(S.destinyPending||{})};
  S.destinyHeld={light:0,dark:0,...(S.destinyHeld||{})};
  S.gmDestinyMode=S.gmDestinyMode||'prompt';
  S.narrativeFacts=S.narrativeFacts||[];
}
function approvalTier(v){
  if(v>=25)return{label:'Loyal',cls:'loyal'};
  if(v>=10)return{label:'Trusted',cls:'trusted'};
  if(v<=-25)return{label:'Hostile',cls:'hostile'};
  if(v<=-10)return{label:'Wary',cls:'wary'};
  return{label:'Neutral',cls:''}
}
function changeApproval(id,delta,reason=''){
  ensurePhase8State();let old=S.approval[id]||0,n=Math.max(-100,Math.min(100,old+delta));S.approval[id]=n;
  let c=CREW.find(x=>x.id===id);gLog(`${c?.name||id} approval ${delta>=0?'+':''}${delta}${reason?` — ${reason}`:''}.`);
}
function approvalBoost(actor,skill){
  if(!actor||actor.id==='pc')return 0;
  return (S.approval?.[actor.id]||0)>=10 && (CREW_SPECIALTIES[actor.id]||[]).includes(skill) ? 1 : 0;
}
function currentCrewWeaponId(id){
  let c=CREW.find(x=>x.id===id);return S.crewLoadout?.[id]?.weapon||c?.weapon
}
function currentCrewArmorId(id){
  let c=CREW.find(x=>x.id===id);return S.crewLoadout?.[id]?.armor||c?.armor
}
function assignedCrewForItem(id){
  for(const c of CREW){
    let l=S.crewLoadout?.[c.id]||{};
    if(l.weapon===id||l.armor===id)return c
  }
  return null
}
function crewItemAvailable(id,crewId,type){
  if(!S.inventory?.includes(id))return false;
  if(type==='weapon'&&S.weapon===id)return false;
  if(type==='armor'&&S.armor===id)return false;
  let owner=assignedCrewForItem(id);return !owner||owner.id===crewId
}
function setCrewLoadout(crewId,type,value){
  ensurePhase8State();let c=CREW.find(x=>x.id===crewId);if(!c)return;
  if(value==='default'){S.crewLoadout[crewId][type]=null}
  else if(crewItemAvailable(value,crewId,type)){S.crewLoadout[crewId][type]=value}
  else{bLog('That item is currently being used by someone else.');return}
  bLog(`${c.name} ${type} set to ${type==='weapon'?WEAPONS[currentCrewWeaponId(crewId)].name:ARMOR[currentCrewArmorId(crewId)].name}.`);
  renderAll()
}
function toggleCrewActive(id){
  if(S.crew.includes(id)){if(S.crew.length>1)S.crew=S.crew.filter(x=>x!==id)}
  else if(S.crew.length<2)S.crew.push(id);
  else{bLog('Only two companions can be active at once.');return}
  renderAll()
}
function upgradePositivePool(p,n=1){
  while(n-->0){if(p.ability>0){p.ability--;p.proficiency++}else p.ability++}
  return p
}
function upgradeDifficultyPool(p,n=1){
  while(n-->0){if(p.difficulty>0){p.difficulty--;p.challenge++}else p.difficulty++}
  return p
}
function reserveLightDestiny(kind){
  ensurePhase8State();
  if(S.destinyPending[kind]){bLog('That Destiny effect is already queued.');return false}
  if(S.destiny.light<1){bLog('No Light Destiny Point is available.');return false}
  S.destiny.light--;S.destinyHeld.light++;S.destinyPending[kind]=1;
  bLog(kind==='allyUpgrade'?'Light Destiny reserved to upgrade the next allied check.':'Light Destiny reserved to upgrade the difficulty of the next NPC check.');
  renderAll();return true
}
function reserveDarkDestiny(){
  ensurePhase8State();if(S.destiny.dark<1)return false;
  S.destiny.dark--;S.destinyHeld.dark++;return true
}
function settleHeldDestiny(side,count=1){
  ensurePhase8State();
  if(side==='light'){
    let n=Math.min(count,S.destinyHeld.light);S.destinyHeld.light-=n;S.destiny.dark+=n
  }else{
    let n=Math.min(count,S.destinyHeld.dark);S.destinyHeld.dark-=n;S.destiny.light+=n
  }
}
function cancelQueuedDestiny(){
  ensurePhase8State();
  let n=(S.destinyPending.allyUpgrade||0)+(S.destinyPending.npcDifficulty||0);
  S.destiny.light+=n;S.destinyHeld.light=Math.max(0,S.destinyHeld.light-n);
  S.destinyPending.allyUpgrade=0;S.destinyPending.npcDifficulty=0;
  bLog('Queued Light Destiny returned to the pool.');renderAll()
}
function spendNarrativeDestiny(){
  ensurePhase8State();if(S.destiny.light<1){bLog('No Light Destiny Point is available.');return}
  let fact=prompt('What useful narrative fact do you want to introduce?');
  if(!fact?.trim())return;
  S.destiny.light--;S.destiny.dark++;S.narrativeFacts.unshift(fact.trim());S.narrativeFacts=S.narrativeFacts.slice(0,8);
  gLog(`Destiny fact: ${fact.trim()}`);renderAll()
}
function maybeGMDarkDifficulty(p,label='this check'){
  ensurePhase8State();
  if(S.gmDestinyMode!=='prompt'||S.destiny.dark<1)return false;
  if(!confirm(`The solo GM has ${S.destiny.dark} Dark Destiny. Spend 1 to upgrade the difficulty of ${label}?`))return false;
  reserveDarkDestiny();upgradeDifficultyPool(p,1);return true
}
function maybeGMDarkAbility(p,label='this NPC check'){
  ensurePhase8State();
  if(S.gmDestinyMode!=='prompt'||S.destiny.dark<1)return false;
  if(!confirm(`The solo GM has ${S.destiny.dark} Dark Destiny. Spend 1 to upgrade ${label}?`))return false;
  reserveDarkDestiny();upgradePositivePool(p,1);return true
}
function applyQueuedAllyDestiny(p,consume=true){
  ensurePhase8State();if(!S.destinyPending.allyUpgrade)return false;
  upgradePositivePool(p,1);
  if(consume)S.destinyPending.allyUpgrade=0;
  return true
}
function applyQueuedNpcDestiny(p,consume=true){
  ensurePhase8State();if(!S.destinyPending.npcDifficulty)return false;
  upgradeDifficultyPool(p,1);
  if(consume)S.destinyPending.npcDifficulty=0;
  return true
}
function partyActorForCharacteristic(actor){
  if(!actor?.id)return null;
  if(actor.id==='pc'||CREW.some(c=>c.id===actor.id))return actor.id;
  return null
}
function effectiveCharacteristic(actor,ch){
  let base=actor?.c?.[ch]||1,id=partyActorForCharacteristic(actor);if(!id)return base;
  let heroic=id==='pc'&&S.combat?.heroicFortitude&&['Brawn','Agility'].includes(ch),
      st=actorState(id),temporary=heroic?0:st.criticals.filter(c=>c.name==='Horrific Injury'&&c.affectedChar===ch).length;
  let permanent=heroic?0:(id==='pc'?(S.permanentCharLoss?.[ch]||0):(S.crewState[id]?.permanentCharLoss?.[ch]||0));
  let bonus=id==='pc'&&ch==='Brawn'&&S.forceCommitted?.brawn?1:id==='pc'&&ch==='Agility'&&S.forceCommitted?.agility?1:0;
  return Math.max(1,Math.min(6,base-temporary-permanent+bonus))
}
function criticalCheckMods(id,skill,ch){
  let c=actorState(id).conditions,diff=0,setback=0,upgrade=0,removeBoost=false;
  if(id==='pc'&&S.combat?.heroicFortitude&&['Brawn','Agility'].includes(ch))return{diff,setback,upgrade,removeBoost};
  if(c.headRinger&&['Intellect','Cunning'].includes(ch))diff++;
  if(c.fearsomeWound&&['Presence','Willpower'].includes(ch))diff++;
  if(c.agonizingWound&&['Brawn','Agility'].includes(ch))diff++;
  if(c.slightlyDazed)setback++;
  if(c.scatteredSenses)removeBoost=true;
  if((c.lostArm||c.lostLeg))setback++;
  if(c.blinded)upgrade+=['Perception','Vigilance'].includes(skill)?3:2;
  return{diff,setback,upgrade,removeBoost}
}
function crippledDifficulty(id,skill){
  if(id==='pc'&&S.combat?.heroicFortitude&&['Brawn','Agility'].includes(SKILL_CHAR[skill]))return 0;
  let crits=actorState(id).criticals.filter(c=>c.name==='Crippled'),n=0;
  for(const cr of crits){
    if(cr.limb==='arm'&&['Brawl','Melee','Lightsaber','Ranged (Light)','Ranged (Heavy)','Gunnery','Mechanics','Medicine','Skulduggery'].includes(skill))n++;
    if(cr.limb==='leg'&&['Athletics','Coordination','Stealth','Piloting (Planetary)','Piloting (Space)'].includes(skill))n++
  }
  return n
}
function criticalExtra(cr){return cr.affectedChar?` · ${cr.affectedChar}${cr.permanent?' permanently':''} -1`:cr.limb?` · ${cr.limb}${cr.name==='Maimed'?' lost':' impaired'}`:''}
function beforeCombatAction(id){
  let c=actorState(id).conditions;if(c.atBrink){actorStrain(id,1);cLog(`${actorById(id).name} suffers 1 strain from At the Brink.`)}
}
function isLastPcSlot(){
  let C=S.combat;if(!C)return true;
  return !C.slots.slice(C.slotIndex+1).some(s=>s.side==='PC')
}

function dbRecordText(x){
  return `${x.name||''} ${x.type||''} ${x.source||''} ${x.summary||''} ${x.note||''} ${x.skill||''} ${x.manufacturer||''} ${x.career||''} ${x.implementation||''} ${(x.skills||[]).join(' ')} ${JSON.stringify(x.qualities||{})}`.toLowerCase()
}
function databaseImplementationClass(v=''){
  let t=String(v).toLowerCase();return t.includes('reference')||t.includes('pending')?'reference':'playable'
}
function allSpecializationRecords(){
  let out=[];
  for(const [career,c] of Object.entries(CAREERS)){
    for(const [name,skills] of Object.entries(c.specs)){
      let known=SPECIALIZATION_DB.find(x=>x.name===name&&x.career===career);
      let treeStatus=(EXACT_TREES[name]||FULL_SOURCE_TREES.has(name))?'source-grounded full tree':FORM_TREES[name]?'source-based partial tree':'generic talent tree pending exact import';
      out.push({name,career,type:'Specialization',skills,source:known?.source||CAREER_SOURCE_DB[career]||c.line,implementation:known?.implementation||`Playable skill package · ${treeStatus}`,summary:`${career} specialization · Career skills: ${skills.join(', ')}. Talent presentation: ${treeStatus}.`})
    }
  }
  return out
}
function allTalentRecords(){
  let seen=new Map();
  const add=(name,node,source,implementation)=>{
    let key=node.name;if(!seen.has(key))seen.set(key,{name:node.name,type:'Talent',source,implementation,summary:`${node.type||'Talent'} · ${node.effect||'Effect indexed in talent tree.'}`})
  };
  for(const [spec,nodes] of Object.entries(EXACT_TREES))for(const n of nodes)add(n.name,n,`${spec} tree`,'Playable · source-reference tree');
  for(const [spec,nodes] of Object.entries(FORM_TREES))for(const n of nodes)add(n.name,n,`${spec} tree`,FULL_SOURCE_TREES.has(spec)?'Playable · source-grounded full tree':'Playable · partial source-based tree');
  for(const [spec,nodes] of Object.entries(UNIVERSAL_TREES))for(const n of nodes)add(n.name,n,`${spec} universal tree`,'Playable · source-based universal tree');
  return [...seen.values()].sort((a,b)=>a.name.localeCompare(b.name))
}
function databaseRecords(cat){
  if(cat==='species')return Object.entries(SPECIES).map(([id,x])=>({...x,recordId:id,type:'Species',implementation:'Playable',summary:`WT ${x.wt}+Brawn · ST ${x.st}+Willpower · Starting XP ${x.xp} · ${Object.entries(x.c).map(([k,v])=>`${k} ${v}`).join(' · ')}. ${x.note}`}));
  if(cat==='career')return Object.entries(CAREERS).map(([name,x])=>({name,type:'Career',source:CAREER_SOURCE_DB[name]||x.line,implementation:'Playable',summary:`${x.line} · Career skills: ${x.skills.join(', ')} · ${Object.keys(x.specs).length} specialization option(s) currently indexed.`}));
  if(cat==='specialization')return allSpecializationRecords();
  if(cat==='weapon')return [
    ...Object.values(WEAPONS).map(x=>({...x,type:'Weapon',implementation:'Playable',summary:itemSummary(x)})),
    ...Object.values(ORDNANCE).map(x=>({...x,type:'Ordnance',summary:`${x.skill} · Damage ${x.damage} · Crit ${x.crit??'—'} · ${x.range} · ${Object.entries(x.qualities||{}).map(([k,v])=>`${k} ${v===true?'':v}`).join(', ')}.`,implementation:x.implementation||'Playable'}))
  ];
  if(cat==='armor')return Object.values(ARMOR).map(x=>({...x,type:'Armor',implementation:'Playable',summary:itemSummary(x)}));
  if(cat==='gear')return Object.values(GEAR).map(x=>({...x,type:'Gear',implementation:'Playable',summary:`Enc ${x.enc??0} · ${Number(x.price||0).toLocaleString()} cr · Rarity ${x.rarity??'—'}.`}));
  if(cat==='attachment')return [
    ...Object.values(ATTACHMENTS).map(x=>({...x,type:'Attachment',implementation:'Playable',summary:`${x.kind} · ${x.hp} HP · ${Number(x.price||0).toLocaleString()} cr · Rarity ${x.rarity??'—'}${x.restricted?' · Restricted':''}. ${x.desc||''}`})),
    ...ATTACHMENT_REFERENCE_DB
  ];
  if(cat==='force')return Object.entries(FORCE_TREES).map(([name,x])=>({name,type:'Force Power',source:FORCE_TREE_SOURCE[name]||'Force and Destiny Core',implementation:'Playable · source-grounded tree',summary:`Basic power ${x.basic.cost} XP · ${x.nodes.length} source-grounded upgrades. ${x.basic.effect}`}));
  if(cat==='talent')return allTalentRecords();
  if(cat==='adversary')return ADVERSARY_DB.map(x=>({...x,implementation:'Reference record'}));
  if(cat==='ship')return [...STARSHIP_DB,...VEHICLE_DB].map(x=>{
    let stats=[x.silhouette!=null?`Sil ${x.silhouette}`:'',x.speed!=null?`Speed ${x.speed}`:'',x.handling!=null?`Handling ${x.handling>=0?'+':''}${x.handling}`:'',x.armor!=null?`Armor ${x.armor}`:'',x.hull!=null?`Hull ${x.hull}`:'',x.strain!=null?`Strain ${x.strain}`:''].filter(Boolean).join(' · ');
    return {...x,type:'Starship / Vehicle',summary:`${x.class}${x.manufacturer?` · ${x.manufacturer}`:''}${stats?` · ${stats}`:''}${x.hyperdrive?` · Hyperdrive ${x.hyperdrive}`:''}${x.sensor?` · Sensors ${x.sensor}`:''}${x.price?` · ${Number(x.price).toLocaleString()} cr`:''}${x.rarity!=null?` · Rarity ${x.rarity}`:''}${x.hp!=null?` · ${x.hp} HP`:''}. ${x.weapons||''}`}
  });
  return[]
}
function renderDatabase(){
  if(!$('database'))return;
  let specCount=Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs).length,0);
  let equipmentCount=Object.keys(WEAPONS).length+Object.keys(ORDNANCE).length+Object.keys(ARMOR).length+Object.keys(GEAR).length+Object.keys(ATTACHMENTS).length+ATTACHMENT_REFERENCE_DB.length;
  $('dbSpeciesCount').textContent=Object.keys(SPECIES).length;$('dbSpecCount').textContent=specCount;$('dbEquipCount').textContent=equipmentCount;$('dbAdvCount').textContent=ADVERSARY_DB.length;$('dbShipCount').textContent=STARSHIP_DB.length+VEHICLE_DB.length;$('dbForceCount').textContent=Object.keys(FORCE_TREES).length;
  let cat=$('dbCategory')?.value||'species',q=($('dbSearch')?.value||'').trim().toLowerCase(),impl=$('dbImplementation')?.value||'all',list=databaseRecords(cat);
  list=list.filter(x=>(impl==='all'||databaseImplementationClass(x.implementation)===impl)&&(!q||dbRecordText(x).includes(q)));
  $('dbCoverage').innerHTML=`<b>Curated coverage:</b> ${Object.keys(SPECIES).length} playable species · ${Object.keys(CAREERS).length} careers · ${specCount} specialization skill packages · ${ADVERSARY_DB.length} adversary references · ${STARSHIP_DB.length} starship + ${VEHICLE_DB.length} vehicle records. This is an expanding source-index, not a claim that every record from every book has been imported.`;
  $('dbList').innerHTML=list.map(x=>{
    let klass=databaseImplementationClass(x.implementation)==='playable'?'good':'gold';
    let action=cat==='species'&&!S.finalized&&x.recordId?`<button class="btn" data-db-species="${x.recordId}">Use in creator</button>`:'';
    return`<div class="item"><div class="row"><div><b>${x.name}</b><div class="tiny">${x.type||cat}${x.career?` · ${x.career}`:''}</div></div><span class="tag ${klass}">${x.implementation||'Reference'}</span></div><div class="small" style="margin-top:7px">${x.summary||x.note||''}</div><div class="row" style="margin-top:8px"><div class="tiny">Source: ${x.source||'Game database'}</div>${action}</div></div>`
  }).join('')||'<div class="small">No matching records.</div>';
  document.querySelectorAll('[data-db-species]').forEach(b=>b.onclick=()=>{$('species').value=b.dataset.dbSpecies;selectSpecies();renderNavTab('identity')})
}

function renderRulesAudit(){
  if(!$('rulesaudit'))return;
  let counts={verified:0,adapted:0,prototype:0};RULE_AUDIT.forEach(x=>counts[x.status]++);
  $('auditVerifiedCount').textContent=counts.verified;$('auditAdaptedCount').textContent=counts.adapted;$('auditPrototypeCount').textContent=counts.prototype;
  let filter=$('auditFilter')?.value||'all',q=($('auditSearch')?.value||'').trim().toLowerCase();
  let list=RULE_AUDIT.filter(x=>(filter==='all'||x.status===filter)&&(!q||`${x.name} ${x.source} ${x.detail}`.toLowerCase().includes(q)));
  let labels={verified:['SOURCE-VERIFIED','good'],adapted:['GAME ADAPTATION','gold'],prototype:['PROTOTYPE / PENDING','bad']};
  $('auditList').innerHTML=list.map(x=>{let [label,cls]=labels[x.status];return`<div class="item"><div class="row"><b>${x.name}</b><span class="tag ${cls}">${label}</span></div><div class="small" style="margin-top:6px">${x.detail}</div><div class="tiny" style="margin-top:7px">Basis: ${x.source}</div></div>`}).join('')||'<div class="small">No matching audit entries.</div>'
}

const RC_SAVE_KEY='swrpg-phase92';
const RC_AUTO_KEY='swrpg-phase92-autosave';
const RC_BACKUP_KEY='swrpg-phase92-backup';
const DIFFICULTY={
  story:{name:'Story',enemyBoost:0,enemySetback:1,damage:-1},
  standard:{name:'Standard',enemyBoost:0,enemySetback:0,damage:0},
  veteran:{name:'Veteran',enemyBoost:1,enemySetback:0,damage:1}
};

/* Phase 17: guide, Episode 0, ship, companions, equipment, recovery. */
function ensurePhase16State(){
  S.schemaVersion=52;S.settings={difficulty:'standard',tutorial:true,autosave:true,uiScale:'standard',reducedMotion:false,...(S.settings||{})};
  if(!DIFFICULTY[S.settings.difficulty])S.settings.difficulty='standard';
  S.saveWarnings=Array.isArray(S.saveWarnings)?S.saveWarnings:[];
}

function clampPct(v){return Math.max(0,Math.min(100,Number.isFinite(v)?v:0))}
function meterHTML(label,used,max,kind='wound'){
  max=Math.max(1,Number(max)||1);used=Math.max(0,Number(used)||0);
  let remaining=Math.max(0,max-used),pct=clampPct(remaining/max*100);
  return `<div class="meter"><div class="meter-head"><span>${label}</span><b>${used}/${max}</b></div><div class="meter-track"><div class="meter-fill ${kind}" style="width:${pct}%"></div></div></div>`
}
function dicePoolHTML(p){
  if(!p)return'<span class="tiny">—</span>';
  let dice=[['proficiency','Y'],['ability','G'],['boost','B'],['challenge','R'],['difficulty','P'],['setback','K']];
  let out=dice.filter(([k])=>p[k]).map(([k,l])=>`<span class="die-chip die-${k}" title="${k}">${l}×${p[k]}</span>`).join('');
  return `<span class="dice-pool">${out||'<span class="tiny">—</span>'}</span>`
}
function resultHTML(r){
  if(!r)return'';
  let chips=[];
  chips.push(`<span class="result-chip ${r.ns>0?'good':r.ns<0?'bad':''}">${r.ns>0?`${r.ns} Success`:r.ns<0?`${Math.abs(r.ns)} Failure`:'No net Success'}</span>`);
  chips.push(`<span class="result-chip ${r.na>0?'good':r.na<0?'bad':''}">${r.na>0?`${r.na} Advantage`:r.na<0?`${Math.abs(r.na)} Threat`:'No net Advantage/Threat'}</span>`);
  if(r.tr)chips.push(`<span class="result-chip good">${r.tr} Triumph</span>`);
  if(r.de)chips.push(`<span class="result-chip bad">${r.de} Despair</span>`);
  return `<span class="result-line">${chips.join('')}</span>`
}
function locationIcon(id){
  return ({cantina:'☕',market:'◇',clinic:'✚',underworks:'⌁',ash:'≋',crash:'✦',camp:'⌂',sensor:'⌁',outpostGate:'▣',outpostService:'⚙',outpostCommand:'⌘',hangar:'▲',orbit:'◉'})[id]||'✦'
}
function renderQuickHud(){
  if(!$('quickHud'))return;ensurePhase16State();
  let loc=S.finalized?(EP15_LOCATIONS[S.ep15?.location]?.name||'Sable Reach'):'Character Creation';
  if(!S.finalized){
    $('quickHud').innerHTML=`<div class="hud-main"><div class="tiny">CURRENT BUILD</div><b>${S.name||'Unnamed Drifter'}</b><div class="small">${S.career} · ${S.spec}</div></div>
      <div class="hud-cell"><span class="tiny">Species</span><span class="hud-value">${SPECIES[S.species]?.name||S.species}</span></div>
      <div class="hud-cell"><span class="tiny">Creation XP</span><span class="hud-value">${Math.max(0,S.xpStart-S.xpSpent)}</span></div>
      <div class="hud-cell"><span class="tiny">Free skills</span><span class="hud-value">${S.freeCareer.length+S.freeSpec.length}/${careerPickCap()+2}</span></div>
      <div class="hud-cell"><span class="tiny">Destiny</span><span class="hud-value">${S.destiny.light}L / ${S.destiny.dark}D</span></div>
      <div class="hud-cell"><span class="tiny">Objective</span><span class="hud-value">Finalize</span></div>`;
    return
  }
  $('quickHud').innerHTML=`<div class="hud-main"><div class="tiny">${loc}</div><b>${S.name}</b><div class="small">${S.career} · ${S.spec} · ${S.crew.length} companions active</div></div>
    <div class="hud-cell">${meterHTML('Wounds',S.wounds,woundThreshold(),'wound')}</div>
    <div class="hud-cell">${meterHTML('Strain',S.strain,strainThreshold(),'strain')}</div>
    <div class="hud-cell"><span class="tiny">Credits</span><span class="hud-value">${Number(S.credits||0).toLocaleString()}</span><span class="tiny">cr</span></div>
    <div class="hud-cell"><span class="tiny">Earned XP</span><span class="hud-value">${S.earnedXp}</span></div>
    <div class="hud-cell"><span class="tiny">Destiny</span><span class="hud-value">${S.destiny.light}L / ${S.destiny.dark}D</span></div>`
}
function applyVisualSettings(){
  ensurePhase16State();document.body.dataset.uiScale=S.settings.uiScale||'standard';document.body.dataset.reducedMotion=String(!!S.settings.reducedMotion)
}

function completionMilestones(){
  ensurePhase15State();let e=S.ep15||{},qs=e.quests||{};
  return[
    {id:'build',name:'Character build ready',done:S.freeCareer?.length===careerPickCap()&&S.freeSpec?.length===2},
    {id:'final',name:'Character finalized',done:!!S.finalized},
    {id:'lead',name:'Courier trail found',done:(e.mainStage||0)>=1},
    {id:'core',name:'Cipher Core recovered',done:!!e.flags?.cipherCore},
    {id:'faction',name:'Cipher Core decision made',done:!!S.flags?.faction},
    {id:'outpost',name:'Listening post breached',done:(e.mainStage||0)>=7},
    {id:'hangar',name:'Hangar Twelve secured',done:(e.mainStage||0)>=9},
    {id:'ship',name:'Ship acquired',done:!!S.ship?.owned}
  ]
}
function completionPercent(){let m=completionMilestones();return Math.round(100*m.filter(x=>x.done).length/m.length)}
function recommendedTab(){
  if(!S.finalized){
    if(S.freeCareer?.length!==careerPickCap()||S.freeSpec?.length!==2)return'career';
    return'review'
  }
  if(S.combat)return'adventure';
  if(S.ep15?.mainStage>=9&&S.ship?.owned)return'ship';
  return'adventure'
}
function objectiveText(){
  ensurePhase15State();let e=S.ep15;
  if(!S.finalized)return S.freeCareer?.length===careerPickCap()&&S.freeSpec?.length===2?'Review your build and finalize the character.':'Finish your free career and specialization skill selections, then review the build.';
  if(e.mainStage===0)return'Find a lead on the crashed Imperial courier in the Cinder Spire.';
  if(e.mainStage===1)return'Cross the Ash Flats and locate the courier wreck.';
  if(!e.flags.cipherCore)return'Open the courier vault and recover the Cipher Core.';
  if(e.mainStage<4)return'Survive or outmaneuver the Imperial recovery patrol.';
  if(!S.flags.faction)return'Decide who receives the Cipher Core in the Sable Reach Underworks.';
  if(e.mainStage<6)return'Use your new intelligence to plan the strike on the Imperial listening post.';
  if(e.mainStage<8)return'Infiltrate the listening post and obtain Hangar Twelve access.';
  if(e.mainStage<9)return'Defeat Chief Varrik and seize the freighter in Hangar Twelve.';
  return'Core Episode 0 complete. Advance the crew, finish side quests, and operate your ship.'
}
function contextualAdventureHint(){
  if(!S.settings.tutorial)return'';
  let e=S.ep15;
  if(e.mainStage===0)return'Checks show the best available party member before you roll. Different approaches use different skills, so crew composition matters.';
  if(e.mainStage<=3)return'Wounds persist. After a fight, visit Recovery; stimpacks heal wounds but become less effective with repeated same-day use.';
  if(e.mainStage===4&&!S.flags.faction)return'This faction choice is persistent. It changes reputation, companion approval, credits, intel, and later infiltration options.';
  if(e.mainStage>=6&&e.mainStage<9)return'Infiltration failures do not necessarily end the mission. They can raise the alarm, force combat, or reinforce the finale.';
  if(e.mainStage>=9)return'The vertical slice is complete, but free-roam, companion quests, advancement, crafting, and ship combat remain available.';
  return'Use the map to revisit unlocked locations and the quest tracker to see unfinished side content.'
}
function combatTutorialHint(){
  if(!S.settings.tutorial||!S.combat)return'';
  let T=S.combat.turn;
  if(S.combat.pendingSpend)return'Spend Advantage/Triumph on legal options before resolving the remainder. Threat/Despair are then handled by the solo-GM layer.';
  if(T?.actorId==='pc')return'Use individual range, cover, Aim, grenades, suppressive fire, and Overwatch together. Suppression can blunt an enemy attack; grenades are strongest against enemies sharing a tactical position.';
  return'Any unused active companion may fill a PC initiative slot. Enemy AI now uses grenades, suppression, morale checks, retreats, rallies, and encounter-specific tactics in addition to range and cover.'
}
function rcStateIssues(){
  let issues=[];ensurePhase16State();
  if(!SPECIES[S.species])issues.push('Unknown species');
  if(!CAREERS[S.career])issues.push('Unknown career');
  if(CAREERS[S.career]&&!CAREERS[S.career].specs[S.spec])issues.push('Unknown starting specialization');
  if(!Array.isArray(S.crew))issues.push('Crew list invalid');
  if(!S.destiny||!Number.isFinite(S.destiny.light)||!Number.isFinite(S.destiny.dark))issues.push('Destiny pool invalid');
  if(S.finalized&&!S.inventory?.includes(S.weapon))issues.push('Equipped weapon missing from inventory');
  if(S.finalized&&!S.inventory?.includes(S.armor))issues.push('Equipped armor missing from inventory');
  if(S.ship?.owned&&!S.ship.name)issues.push('Owned ship has no name');
  if(S.combat){
    if(!S.combat.positions)issues.push('Combat tactical positions missing');
    else{
      for(const a of squadActors())if(!Number.isFinite(S.combat.positions[a.id]))issues.push(`Missing tactical position for ${a.name}`);
      for(const e of S.combat.enemies||[])if(!Number.isFinite(S.combat.positions[e.id]))issues.push(`Missing tactical position for ${e.name}`)
    }
  }
  if(!S.ep15?.quests?.main)issues.push('Episode 0 main quest state missing');
  return issues
}
function runDiagnostics(){
  let issues=rcStateIssues(),required=['guide','identity','career','skills','chars','talents','force','campaign','equipment','crewmgmt','recovery','database','rulesaudit','review','adventure','combat','ship'],missing=required.filter(id=>!$(id));
  issues.push(...missing.map(id=>`Missing UI section #${id}`));
  let text=issues.length?`<span class="bad"><span class="statusdot bad"></span>${issues.length} issue(s): ${issues.join(' · ')}</span>`:`<span class="good"><span class="statusdot ok"></span>RC integrity checks passed. Core state and required UI sections are present.</span>`;
  if($('diagnosticStatus'))$('diagnosticStatus').innerHTML=text;return issues
}
function renderGuide(){
  if(!$('guide'))return;ensurePhase16State();let pct=completionPercent(),milestones=completionMilestones(),next=milestones.find(x=>!x.done);
  $('guideObjective').innerHTML=`<b>${objectiveText()}</b><div class="tiny" style="margin-top:4px">${pct}% of core Episode 0 milestones complete.</div>`;
  $('guideProgress').style.width=`${pct}%`;
  $('milestoneList').innerHTML=milestones.map(m=>`<div class="item milestone ${m.done?'done':next?.id===m.id?'now':''}"><span class="statusdot ${m.done?'ok':next?.id===m.id?'warn':''}"></span>${m.name}${m.done?' ✓':''}</div>`).join('');
  $('difficultySelect').value=S.settings.difficulty;$('tutorialSelect').value=S.settings.tutorial?'on':'off';$('autosaveSelect').value=S.settings.autosave?'on':'off';$('uiScaleSelect').value=S.settings.uiScale||'standard';$('motionSelect').value=S.settings.reducedMotion?'off':'on';
  $('continueGame').textContent=S.finalized?'Continue Campaign':'Continue Character Creation';
  $('diagnosticStatus').innerHTML=rcStateIssues().length?'<span class="gold">Diagnostics have warnings. Run the check for details.</span>':'<span class="good">State health looks good.</span>';
  document.querySelectorAll('[data-guidego]').forEach(b=>{let tab=b.dataset.guidego;b.disabled=(tab==='adventure'&&!S.finalized)||(tab==='ship'&&!S.ship?.owned);b.onclick=()=>renderNavTab(tab)})
}
function updateGlobalStatus(){
  if(!$('globalProgress'))return;ensurePhase16State();let pct=completionPercent(),d=DIFFICULTY[S.settings.difficulty];
  $('globalProgress').style.width=`${pct}%`;$('globalObjective').textContent=objectiveText();$('difficultyBadge').textContent=d.name;
  $('autosaveBadge').textContent=S.settings.autosave?'Autosave ON':'Autosave OFF';
  $('saveStatus').textContent=S.lastSaved?`Saved ${new Date(S.lastSaved).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`:'Not saved';
}
function safeAutosave(){
  if(!S.settings?.autosave||!S.finalized)return;
  try{localStorage.setItem(RC_AUTO_KEY,JSON.stringify(serializableState()))}catch(err){S.saveWarnings.push(`Autosave: ${err.message}`)}
}
function saveCandidates(){
  let keys=[RC_SAVE_KEY,RC_AUTO_KEY,RC_BACKUP_KEY,'swrpg-phase90','swrpg-phase90-autosave','swrpg-phase90-backup','swrpg-phase88','swrpg-phase88-autosave','swrpg-phase88-backup','swrpg-phase86','swrpg-phase86-autosave','swrpg-phase86-backup','swrpg-phase84','swrpg-phase84-autosave','swrpg-phase84-backup','swrpg-phase82','swrpg-phase82-autosave','swrpg-phase82-backup','swrpg-phase80','swrpg-phase80-autosave','swrpg-phase80-backup','swrpg-phase78','swrpg-phase78-autosave','swrpg-phase78-backup','swrpg-phase76','swrpg-phase76-autosave','swrpg-phase76-backup','swrpg-phase74','swrpg-phase74-autosave','swrpg-phase74-backup','swrpg-phase72','swrpg-phase72-autosave','swrpg-phase72-backup','swrpg-phase70','swrpg-phase70-autosave','swrpg-phase70-backup','swrpg-phase68','swrpg-phase68-autosave','swrpg-phase68-backup','swrpg-phase66','swrpg-phase66-autosave','swrpg-phase66-backup','swrpg-phase64','swrpg-phase64-autosave','swrpg-phase64-backup','swrpg-phase62','swrpg-phase62-autosave','swrpg-phase62-backup','swrpg-phase60','swrpg-phase60-autosave','swrpg-phase60-backup','swrpg-phase58','swrpg-phase58-autosave','swrpg-phase58-backup','swrpg-phase56','swrpg-phase56-autosave','swrpg-phase56-backup','swrpg-phase54','swrpg-phase54-autosave','swrpg-phase54-backup','swrpg-phase52','swrpg-phase52-autosave','swrpg-phase52-backup','swrpg-phase50','swrpg-phase50-autosave','swrpg-phase50-backup','swrpg-phase48','swrpg-phase48-autosave','swrpg-phase48-backup','swrpg-phase46','swrpg-phase46-autosave','swrpg-phase46-backup','swrpg-phase45','swrpg-phase45-autosave','swrpg-phase45-backup','swrpg-phase43','swrpg-phase43-autosave','swrpg-phase43-backup','swrpg-phase40','swrpg-phase40-autosave','swrpg-phase40-backup','swrpg-phase37','swrpg-phase37-autosave','swrpg-phase37-backup','swrpg-phase30','swrpg-phase30-autosave','swrpg-phase30-backup','swrpg-phase29','swrpg-phase29-autosave','swrpg-phase29-backup','swrpg-phase28','swrpg-phase28-autosave','swrpg-phase28-backup','swrpg-phase27','swrpg-phase26','swrpg-phase25','swrpg-phase24','swrpg-phase23','swrpg-phase22','swrpg-phase21','swrpg-phase20','swrpg-phase19','swrpg-phase18','swrpg-phase17','swrpg-phase16','swrpg-phase15','swrpg-phase14','swrpg-phase13','swrpg-phase12','swrpg-phase11','swrpg-phase10','swrpg-phase9','swrpg-phase8','swrpg-phase7','swrpg-phase6','swrpg-phase5','swrpg-phase4','swrpg-phase3','swrpg-phase2'];
  return keys.map(key=>({key,raw:localStorage.getItem(key)})).filter(x=>x.raw)
}
function newestSaveRaw(){return saveCandidates()[0]||null}
function hydrateState(x,label='save'){
  if(!x||typeof x!=='object')throw new Error('Save file is not a valid state object.');
  Object.assign(S,x);
  S.talents=new Set(x.talents||[]);
  S.forceOwned=Object.fromEntries(Object.entries(x.forceOwned||{Move:[],Sense:[],Enhance:[],Influence:[],Foresee:[]}).map(([k,v])=>[k,new Set(v||[])]));
  S.ownedSpecs=x.ownedSpecs||[x.spec];S.specTalents=Object.fromEntries(Object.entries(x.specTalents||{}).map(([k,v])=>[k,new Set(v||[])]));S.talentView=x.talentView||x.spec;S.foreseeBoost=x.foreseeBoost||0;
  S.universalSpecs=x.universalSpecs||[];S.universalTalents={'Force Sensitive Exile':new Set(x.universalTalents?.['Force Sensitive Exile']||[]),'Force-Sensitive Emergent':new Set(x.universalTalents?.['Force-Sensitive Emergent']||[])};S.universalView=x.universalView||S.universalSpecs[0]||'Force Sensitive Exile';
  S.morality=Number.isFinite(x.morality)?x.morality:50;S.criticals=x.criticals||[];S.stunMode=!!x.stunMode;S.crewState=x.crewState||{};S.conditions={...freshConditions(),...(x.conditions||{})};S.medical=x.medical||{encounter:1,woundTreated:{},critTreated:{},day:1};
  S.crewLoadout=x.crewLoadout||{};S.approval=x.approval||{};S.destinyPending=x.destinyPending||{allyUpgrade:0,npcDifficulty:0};S.destinyHeld=x.destinyHeld||{light:0,dark:0};S.gmDestinyMode=x.gmDestinyMode||'prompt';S.narrativeFacts=x.narrativeFacts||[];
  S.itemAttachments=x.itemAttachments||{};S.attachmentMods=x.attachmentMods||{};S.reloads=Number.isFinite(x.reloads)?x.reloads:1;S.itemDamage=x.itemDamage||{};S.crafting=x.crafting||{materials:{},crafted:{},utilityRigReady:true};S.market=x.market||{last:null};
  S.crewProgress=x.crewProgress||{};S.crewConversation=x.crewConversation||'kira';S.crewQuestLog=x.crewQuestLog||[];S.crewField=x.crewField||{supportUsed:{}};S.ship=x.ship||S.ship;S.ep15=x.ep15||S.ep15;
  S.sessionUsed={naturalProgrammer:false,naturalCharmer:false,naturalDoctor:false,naturalNegotiator:false,naturalLeader:false,naturalHunter:false,naturalOutdoorsman:false,naturalTinkerer:false,naturalMystic:false,naturalBrawler:false,naturalRogue:false,naturalMarksman:false,naturalEnforcer:false,naturalMerchant:false,naturalAthlete:false,naturalDriver:false,naturalInstructor:false,naturalPilot:false,worksLikeACharm:false,cleverSolution:false,fortuneFavorsBold:false,senseDanger:false,touchOfFate:false,forceOfWill:false,powerFromPain:false,improvedToughened:false,...(x.sessionUsed||{})};S.deadlyAccuracySkill=x.deadlyAccuracySkill||null;S.conflictReduction=Number.isFinite(x.conflictReduction)?x.conflictReduction:0;S.settings={difficulty:'standard',tutorial:true,autosave:true,uiScale:'standard',reducedMotion:false,...(x.settings||{})};
  ensurePhase12State();ensurePhase13State();ensurePhase14State();ensurePhase15State();ensurePhase16State();ensureCrewState();ensureInventory();
  $('name').value=S.name;$('species').value=S.species;$('careerSelect').value=S.career;let specs=Object.keys(CAREERS[S.career].specs);$('specSelect').innerHTML=specs.map(y=>`<option>${y}</option>`).join('');$('specSelect').value=S.spec;$('framework').value=S.framework;$('frameworkValue').value=S.frameworkValue;
  if(CAREERS[S.career]?.forceStart&&S.forceRating<1)S.forceRating=1;S.lastSaved=new Date().toISOString();bLog(`Loaded ${label}.`);renderAll();return rcStateIssues()
}
function importSaveFile(file){
  if(!file)return;let reader=new FileReader();
  reader.onload=()=>{try{let x=JSON.parse(reader.result);hydrateState(x,'imported save');save()}catch(err){showRuntimeError(`Import failed: ${err.message}`)}};reader.readAsText(file)
}
function newGame(){
  if(!confirm('Start a new game? This clears the current manual/autosave/backup slots. Export first if you want to keep this run.'))return;
  localStorage.removeItem(RC_SAVE_KEY);localStorage.removeItem(RC_AUTO_KEY);localStorage.removeItem(RC_BACKUP_KEY);location.reload()
}
function showRuntimeError(message){
  let box=$('runtimeError');if(!box)return;box.classList.remove('hidden');box.innerHTML=`<b>Runtime warning</b><div class="small" style="margin-top:5px">${String(message)}</div>`
}

function ensurePhase15State(){
  S.ep15=S.ep15||{};
  let e=S.ep15;e.location=e.location||'cantina';e.quests=e.quests||{};e.rep={Rebels:0,Hutts:0,Empire:0,Guild:0,Local:0,...(e.rep||{})};e.visited=e.visited||{};e.flags=e.flags||{};e.loot=e.loot||{};e.completed=e.completed||[];
  if(!Number.isFinite(e.intel))e.intel=0;if(!Number.isFinite(e.salvage))e.salvage=0;if(!Number.isFinite(e.dungeonStage))e.dungeonStage=0;
  if(!Number.isFinite(e.mainStage))e.mainStage=0;
  for(const id of Object.keys(EP15_QUEST_DEFS))if(!e.quests[id])e.quests[id]={status:id==='main'?'active':(id==='water'||id==='missing'||id==='bounty'||id==='meds'?'available':'locked'),stage:0};
  if(!e.initialized){
    if(S.scene>=5){e.mainStage=9;e.location='orbit';e.quests.main.status='complete';S.ship.owned=true}
    else if(S.scene===4){e.mainStage=8;e.location='hangar';e.dungeonStage=3}
    else if(S.scene===3){e.mainStage=5;e.location='underworks'}
    else if(S.scene===2){e.mainStage=4;e.location='crash'}
    else if(S.scene===1){e.mainStage=2;e.location='ash'}
    else{e.mainStage=0;e.location='cantina'}
    e.initialized=true
  }
  if(e.mainStage>=2&&e.quests.signal.status==='locked')e.quests.signal.status='available';
  if(e.mainStage>=4&&e.quests.ledger.status==='locked')e.quests.ledger.status='available';
  if(e.mainStage>=9)S.scene=Math.max(S.scene||0,5);else if(e.mainStage>=5)S.scene=Math.max(S.scene||0,4);else if(e.mainStage>=4)S.scene=Math.max(S.scene||0,3);else if(e.mainStage>=2)S.scene=Math.max(S.scene||0,1)
}
function epQuest(id){ensurePhase15State();return S.ep15.quests[id]}
function epCompleteQuest(id,xp=0,credits=0){
  let q=epQuest(id);if(q.status==='complete')return;q.status='complete';if(!S.ep15.completed.includes(id))S.ep15.completed.push(id);
  if(xp){S.earnedXp+=xp;awardCrewXP(Math.max(1,Math.floor(xp/3)),`${EP15_QUEST_DEFS[id].name} completed`)}
  if(credits)S.credits+=credits;
  gLog(`${EP15_QUEST_DEFS[id].name} complete.${xp?` +${xp} XP.`:''}${credits?` +${credits} credits.`:''}`)
}
function epRewardLoot(id){
  if(S.ep15.loot[id])return;S.ep15.loot[id]=true;
  if(id==='crashCache'){S.credits+=150;S.stimpacks+=1;S.reloads+=1}
  if(id==='scoutPack'){S.credits+=100;if(!S.inventory.includes('scanner'))S.inventory.push('scanner')}
  if(id==='sensorParts'){S.credits+=125;S.reloads+=1}
  if(id==='outpostArmory'){S.credits+=200;if(!S.inventory.includes('armoredClothing'))S.inventory.push('armoredClothing')}
  if(id==='bossLocker'){S.credits+=350;if(!S.inventory.includes('nova')&&WEAPONS.nova)S.inventory.push('nova')}
  gLog(`Loot recovered: ${EP15_LOOT[id].name} — ${EP15_LOOT[id].desc}`)
}
function epRep(faction,amount,reason=''){
  ensurePhase15State();S.ep15.rep[faction]=(S.ep15.rep[faction]||0)+amount;gLog(`${faction} reputation ${amount>=0?'+':''}${amount}${reason?` — ${reason}`:''}.`)
}
function epGo(loc){
  ensurePhase15State();if(!EP15_LOCATIONS[loc])return;S.ep15.location=loc;S.ep15.visited[loc]=true;renderAdventure()
}
function epCheck(skill,ctx,onSuccess,onFail=null,label=''){
  let x=performBest(skill,ctx);
  if(x.r.ok){if(label)gLog(`${label}: ${x.q.actor.name} succeeds with ${skill}.`);onSuccess?.(x)}
  else{if(label)gLog(`${label}: ${x.q.actor.name} fails ${skill}.`);if(onFail)onFail(x);else{let id=x.q.actor.id;if(id==='pc')S.strain=Math.min(strainThreshold(),S.strain+1);else actorStrain(id,1)}}
  renderAll();return x
}
function epStartQuest(id){
  let q=epQuest(id);if(q.status!=='available')return;q.status='active';q.stage=0;gLog(`Quest started: ${EP15_QUEST_DEFS[id].name}.`);renderAdventure()
}
function mainAdvance(stage,loc=null){
  ensurePhase15State();S.ep15.mainStage=Math.max(S.ep15.mainStage,stage);epQuest('main').stage=S.ep15.mainStage;if(loc)S.ep15.location=loc;
  if(stage>=9){epQuest('main').status='complete';S.scene=5;S.ship.owned=true}
  updateQuestLocks()
}
function epTalk(npc){
  ensurePhase15State();S.ep15.lastNpc=npc;let n=EP15_NPCS[npc];if(n)gLog(`${n.name}: ${n.text}`);renderAdventure()
}
function epMainLead(skill,ctx){
  epCheck(skill,ctx,()=>{mainAdvance(1,'cantina');S.ep15.flags.crashLead=true;S.earnedXp+=3;awardCrewXP(1,'found the crash lead');gLog('Rhea pieces together the sightings: the courier came down beyond the eastern ash ridge. +3 XP.')},null,'Finding the courier trail')
}
function epNavigateAsh(){
  epCheck('Survival',{diff:2},()=>{mainAdvance(2,'crash');S.earnedXp+=3;gLog('The party crosses the ash flats and reaches the broken Imperial courier. +3 XP.')},()=>{S.strain=Math.min(strainThreshold(),S.strain+2);gLog('The ash storm turns the party around. The PC suffers 2 strain.')},'Crossing the Ash Flats')
}
function epOpenVault(skill,ctx){
  epCheck(skill,ctx,()=>{mainAdvance(3,'crash');S.ep15.flags.cipherCore=true;S.ep15.intel++;S.earnedXp+=5;epRewardLoot('crashCache');gLog('The Cipher Core comes free from the courier vault. +5 XP.')},null,'Opening the courier vault')
}
function epStartPatrol(){S.ep15.flags.returnAfterCombat='crash';startCombat('ep15Patrol')}
function epCipherDecisionReady(){return S.ep15.mainStage>=4&&S.ep15.flags.cipherCore&&!S.flags.faction}
function epEnterOutpost(){
  mainAdvance(6,'outpostGate');S.ep15.dungeonStage=Math.max(0,S.ep15.dungeonStage);gLog('The crew approaches the Imperial listening post hidden in the basalt escarpment.');renderAdventure()
}
function epOutpostGate(skill,ctx){
  epCheck(skill,ctx,()=>{S.ep15.dungeonStage=1;mainAdvance(7,'outpostService');S.earnedXp+=5;gLog('The perimeter is breached without raising the full base alarm. +5 XP.')},()=>{S.ep15.flags.outpostAlarm=true;startCombat('ep15Outpost')},'Breaching the listening post')
}
function epOutpostService(skill,ctx){
  epCheck(skill,ctx,()=>{S.ep15.dungeonStage=2;mainAdvance(7,'outpostCommand');S.ep15.intel++;S.earnedXp+=5;if(!S.ep15.loot.outpostArmory&&skill==='Skulduggery')epRewardLoot('outpostArmory');gLog('Service access opens the route to the command deck. +5 XP.')},()=>{S.ep15.flags.outpostAlarm=true;actorStrain('pc',1);gLog('The service level locks down; the crew can try another approach.')},'Service-level infiltration')
}
function epOutpostCommand(skill,ctx){
  epCheck(skill,ctx,()=>{S.ep15.dungeonStage=3;mainAdvance(8,'hangar');S.ep15.flags.hangarOverride=true;S.earnedXp+=8;gLog('The command deck yields Hangar Twelve access and launch codes. +8 XP.')},()=>{S.ep15.flags.bossReinforced=true;mainAdvance(8,'hangar');gLog('Varrik detects the intrusion and fortifies Hangar Twelve.')},'Cracking the command deck')
}
function epWaterQuest(){
  let q=epQuest('water');if(q.status==='available')epStartQuest('water');
  epCheck('Mechanics',{diff:2},()=>{q.stage=1;epCompleteQuest('water',5,125);S.ep15.rep.Local+=2;S.stimpacks+=1;changeApproval('lena',2,'helped keep Sable Reach alive')},null,'Repairing the condenser')
}
function epMissingScoutSearch(){
  let q=epQuest('missing');if(q.status==='available')epStartQuest('missing');
  epCheck('Survival',{diff:2},()=>{q.stage=1;S.ep15.flags.scoutFound=true;gLog('Tracks lead to a wounded scout cornered in a glass-rock ravine.');startCombat('ep15Beasts')},null,'Tracking the missing scout')
}
function epLedgerQuest(){
  let q=epQuest('ledger');if(q.status==='available')epStartQuest('ledger');
  epCheck('Skulduggery',{diff:3},()=>{epCompleteQuest('ledger',6,250);epRep('Hutts',2,'delivered the Black Ledger');changeApproval('lena',-1,'disliked the Hutt job')},null,'Stealing the Black Ledger')
}
function epBountyLocate(){
  let q=epQuest('bounty');if(q.status==='available')epStartQuest('bounty');
  epCheck('Streetwise',{diff:2},()=>{q.stage=1;S.ep15.location='camp';S.ep15.flags.kordaLocated=true;gLog('Korda Venn is hiding among the scavenger rigs west of the crash site.')},null,'Locating Korda Venn')
}
function epBountyTalkDown(){
  epCheck('Coercion',{diff:3},()=>{epCompleteQuest('bounty',8,300);epRep('Guild',2,'Korda Venn surrendered');changeApproval('tavo',2,'clean bounty resolution');S.ep15.flags.kordaResolved=true;epGo('cantina')},()=>startCombat('ep15Bounty'),'Demanding Korda’s surrender')
}
function epSignalQuest(){
  let q=epQuest('signal');if(q.status==='available')epStartQuest('signal');
  epCheck('Computers',{diff:2},()=>{q.stage=1;S.ep15.intel+=2;epRewardLoot('sensorParts');epCompleteQuest('signal',6,0);epRep('Rebels',1,'shared Imperial handshake data');gLog('The ghost transmission is a dormant Imperial authentication handshake pointing toward a hidden listening post.')},null,'Decoding the ghost signal')
}
function epMedsQuest(){
  let q=epQuest('meds');if(q.status==='available')epStartQuest('meds');
  epCheck('Streetwise',{diff:2},()=>{q.stage=1;epCheck('Negotiation',{diff:2},()=>{epCompleteQuest('meds',5,75);S.stimpacks+=2;S.ep15.rep.Local+=2;changeApproval('lena',1,'recovered clinic supplies')},null,'Recovering the clinic crate')},null,'Tracing the stolen supplies')
}
function renderEpisodeMap(){
  if(!$('episodeMap'))return;ensurePhase15State();
  let e=S.ep15,locs=['cantina','market','clinic','underworks'];
  if(e.mainStage>=1)locs.push('ash');if(e.mainStage>=2)locs.push('crash');if(e.quests.bounty.stage>=1)locs.push('camp');if(e.mainStage>=2)locs.push('sensor');
  if(e.mainStage>=6&&e.quests.main.status!=='complete')locs.push('outpostGate');
  if(e.dungeonStage>=1)locs.push('outpostService');if(e.dungeonStage>=2)locs.push('outpostCommand');if(e.dungeonStage>=3)locs.push('hangar');if(e.mainStage>=9)locs.push('orbit');
  $('episodeMap').innerHTML=[...new Set(locs)].map(id=>`<button class="btn ${e.location===id?'primary':''}" data-eploc="${id}">${EP15_LOCATIONS[id].name}</button>`).join('');
  document.querySelectorAll('[data-eploc]').forEach(b=>b.onclick=()=>epGo(b.dataset.eploc))
}
function renderQuestTracker(){
  if(!$('questTracker'))return;ensurePhase15State();
  let order=['main','water','missing','ledger','bounty','signal','meds'];
  $('questTracker').innerHTML=order.map(id=>{let q=epQuest(id),d=EP15_QUEST_DEFS[id];return`<div style="margin-bottom:7px"><b>${d.main?'★ ':''}${d.name}</b> <span class="tag">${q.status}</span><div class="tiny">${d.summary}</div></div>`}).join('');
  let r=S.ep15.rep;$('factionRep').innerHTML=`Reputation — Rebels ${r.Rebels} · Hutts ${r.Hutts} · Empire ${r.Empire} · Guild ${r.Guild} · Sable Reach ${r.Local} · Intel ${S.ep15.intel}`
}

function ensurePhase14State(){
  S.ship=S.ship||{};
  S.ship.owned=!!S.ship.owned||S.scene>=5;
  S.ship.model=S.ship.model&&SHIP_MODELS[S.ship.model]?S.ship.model:'hwk290';
  S.ship.ownedModels=Array.isArray(S.ship.ownedModels)?S.ship.ownedModels.filter(id=>SHIP_MODELS[id]):[];
  if(S.ship.owned&&!S.ship.ownedModels.includes('hwk290'))S.ship.ownedModels.unshift('hwk290');
  if(S.ship.owned&&!S.ship.ownedModels.includes(S.ship.model))S.ship.ownedModels.push(S.ship.model);
  S.ship.hangar=(S.ship.hangar&&typeof S.ship.hangar==='object')?S.ship.hangar:{};
  S.ship.name=S.ship.name||'Wayward Star';S.ship.location=S.ship.location||'sable';
  if(!Number.isFinite(S.ship.hull))S.ship.hull=0;if(!Number.isFinite(S.ship.strain))S.ship.strain=0;
  S.ship.criticals=Array.isArray(S.ship.criticals)?S.ship.criticals:[];
  S.ship.upgrades=Array.isArray(S.ship.upgrades)?S.ship.upgrades:[];
  S.ship.stations={pilot:'pc',navigator:'lena',gunner:'tavo',engineer:'lena',...(S.ship.stations||{})};
  S.ship.log=Array.isArray(S.ship.log)?S.ship.log:[];if(S.ship.combat===undefined)S.ship.combat=null
}
function shipModel(){ensurePhase14State();return SHIP_MODELS[S.ship.model]||SHIP_MODELS.hwk290}
function shipStats(){
  ensurePhase14State();let base=shipModel(),x={...base,weapon:{...(base.weapon||{})}};
  for(const id of S.ship.upgrades){
    if(id==='reinforcedHull')x.hull+=3;if(id==='auxCap')x.strain+=3;if(id==='shieldBooster')x.defense+=1;if(id==='engineTune')x.handling+=1;if(id==='hyperTune')x.hyperdrive='Class 1'
  }
  return x
}
function snapshotCurrentShip(){
  ensurePhase14State();S.ship.hangar[S.ship.model]={name:S.ship.name,hull:S.ship.hull,strain:S.ship.strain,criticals:JSON.parse(JSON.stringify(S.ship.criticals||[])),upgrades:[...(S.ship.upgrades||[])]}
}
function switchShipModel(id){
  ensurePhase14State();if(!SHIP_MODELS[id]||!S.ship.ownedModels.includes(id)||id===S.ship.model)return;
  if(S.ship.combat){bLog('Finish the current starship encounter before switching vessels.');return}
  snapshotCurrentShip();let prev=S.ship.model,Snap=S.ship.hangar[id]||{};S.ship.model=id;S.ship.name=Snap.name||SHIP_MODELS[id].name;S.ship.hull=Snap.hull||0;S.ship.strain=Snap.strain||0;S.ship.criticals=Array.isArray(Snap.criticals)?Snap.criticals:[];S.ship.upgrades=Array.isArray(Snap.upgrades)?Snap.upgrades:[];shipLog(`Switched active vessel from ${SHIP_MODELS[prev]?.name||prev} to ${SHIP_MODELS[id].name}.`);renderAll()
}
function purchaseShipModel(id){
  ensurePhase14State();let m=SHIP_MODELS[id];if(!m||S.ship.ownedModels.includes(id))return;
  let terms=blackMarketTerms(m);if(S.credits<terms.price){bLog(`Not enough credits for ${m.name}.`);return}
  let skill=m.restricted?'Streetwise':'Negotiation',ap=acquisitionProfile(terms.rarity),result=performBest(skill,{diff:ap.diff,upgrade:ap.upgrade});
  if(!result.r.ok){bLog(`${m.name} could not be located. ${skill} ${acquisitionLabel(ap.diff)} failed at effective rarity ${ap.effective}.`);renderShip();return}
  S.credits-=terms.price;S.ship.ownedModels.push(id);S.ship.hangar[id]={name:m.name,hull:0,strain:0,criticals:[],upgrades:[]};bLog(`Acquired ${m.name} for ${terms.price.toLocaleString()} credits. It is now available in the hangar.`);renderAll()
}
function shipUsedHP(){return S.ship.upgrades.reduce((n,id)=>n+(SHIP_UPGRADES[id]?.hp||0),0)}
function shipFreeHP(){return Math.max(0,shipStats().hp-shipUsedHP())}
function shipActors(){return[{id:'pc',name:S.name,c:S.chars,sk:S.skills},...CREW.map(c=>effectiveCrew(c.id))]}
function shipActor(id){return shipActors().find(a=>a.id===id)||shipActors()[0]}
function stationActor(station){return shipActor(S.ship.stations[station])}
function shipSkillPool(actor,skill,diff=2,boost=0,upgrade=0){
  let ch=SKILL_CHAR[skill]||'Intellect',val=effectiveCharacteristic(actor,ch),rank=actor.sk?.[skill]||0,p=makePool(val,rank,diff,boost,0,upgrade);
  if(skill==='Piloting (Space)'){let handling=shipStats().handling;if(handling>0)p.boost+=handling;else p.setback+=Math.abs(handling)}
  if(actor.id==='pc'){
    if(skill==='Piloting (Space)'||skill==='Piloting (Planetary)')p.setback=Math.max(0,p.setback-talentRank('Skilled Jockey'));
    if(skill==='Astrogation')p.setback=Math.max(0,p.setback-talentRank('Galaxy Mapper'));
    if(skill==='Mechanics')p.setback=Math.max(0,p.setback-talentRank('Gearhead'));
  }
  return{actor,skill,ch,val,rank,p}
}
function shipLog(msg){
  ensurePhase14State();S.ship.log.unshift(msg);S.ship.log=S.ship.log.slice(0,18);
  if(S.ship.combat){S.ship.combat.log.unshift(msg);S.ship.combat.log=S.ship.combat.log.slice(0,18)}
}
function setShipStation(station,id){
  ensurePhase14State();S.ship.stations[station]=id;shipLog(`${shipActor(id).name} assigned to ${station}.`);renderShip()
}
function shipCritical(){
  let roll=1+Math.floor(Math.random()*100)+10*S.ship.criticals.length,cr;
  if(roll<=25)cr={roll,name:'Shield Flicker',effect:'Defense reduced by 1 for this encounter.'};
  else if(roll<=50)cr={roll,name:'Sensor Ghost',effect:'Add 1 Setback to piloting and gunnery checks.'};
  else if(roll<=75)cr={roll,name:'Engine Hit',effect:'Maximum speed reduced by 1 until repaired.'};
  else if(roll<=100)cr={roll,name:'Weapon Malfunction',effect:'Increase gunner attack difficulty by 1 until repaired.'};
  else cr={roll,name:'Major System Failure',effect:'Immediately suffer 3 system strain.'};
  S.ship.criticals.push(cr);if(cr.name==='Major System Failure')S.ship.strain+=3;shipLog(`SHIP CRITICAL ${roll}: ${cr.name} — ${cr.effect}`);return cr
}
function shipCritPenalty(kind){
  let n=0;for(const c of S.ship.criticals){if(c.name==='Sensor Ghost'&&(kind==='pilot'||kind==='gunner'))n++;if(c.name==='Weapon Malfunction'&&kind==='gunner')n++}return n
}
function shipMaxSpeed(){
  let max=shipStats().speed-S.ship.criticals.filter(c=>c.name==='Engine Hit').length;return Math.max(1,max)
}
function installShipUpgrade(id){
  ensurePhase14State();let u=SHIP_UPGRADES[id];if(!u||S.ship.upgrades.includes(id))return;
  if(shipFreeHP()<u.hp){bLog('Not enough free ship hard points.');return}
  if(S.credits<u.price){bLog(`Not enough credits for ${u.name}.`);return}
  let eng=stationActor('engineer'),q=shipSkillPool(eng,'Mechanics',2),r=rollNarr(q.p);
  if(!r.ok){let loss=Math.ceil(u.price*.1);S.credits=Math.max(0,S.credits-loss);shipLog(`${eng.name} fails to install ${u.name}; ${loss} credits of materials are lost. ${rtxt(r)}`);renderAll();return}
  S.credits-=u.price;S.ship.upgrades.push(id);shipLog(`${u.name} installed by ${eng.name}. ${rtxt(r)}`);renderAll()
}
function plotShipCourse(){
  ensurePhase14State();let dest=$('shipDestination')?.value;if(!SHIP_DESTINATIONS[dest])return;
  let nav=stationActor('navigator'),d=SHIP_DESTINATIONS[dest],q=shipSkillPool(nav,'Astrogation',d.diff),r=rollNarr(q.p);
  if(r.ok){S.ship.location=dest;let recovery=Math.max(0,r.na);S.ship.strain=Math.max(0,S.ship.strain-recovery);shipLog(`${nav.name} plots a course to ${d.name}. ${rtxt(r)}${recovery?` · recovered ${recovery} system strain en route`:''}`)}
  else{let strain=Math.max(1,-r.na);S.ship.strain=Math.min(shipStats().strain+1,S.ship.strain+strain);shipLog(`Astrogation to ${d.name} fails. ${rtxt(r)} · ship suffers ${strain} system strain.`)}
  renderAll()
}
function repairShip(mode){
  ensurePhase14State();let eng=stationActor('engineer'),need=mode==='hull'?S.ship.hull:S.ship.strain;if(need<=0){bLog(`No ${mode==='hull'?'hull trauma':'system strain'} to repair.`);return}
  let q=shipSkillPool(eng,'Mechanics',2),r=rollNarr(q.p);
  if(r.ok){
    let bonus=eng.id==='pc'?(mode==='hull'?talentRank('Solid Repairs'):talentRank('Fine Tuning')):0,amt=Math.max(1,r.ns)+bonus;
    if(mode==='hull')S.ship.hull=Math.max(0,S.ship.hull-amt);else S.ship.strain=Math.max(0,S.ship.strain-amt);
    shipLog(`${eng.name} repairs ${amt} ${mode==='hull'?'hull trauma':'system strain'}${bonus?` (${bonus} from ${mode==='hull'?'Solid Repairs':'Fine Tuning'})`:''}. ${rtxt(r)}`)
  }
  else shipLog(`${eng.name}'s repair attempt fails. ${rtxt(r)}`);
  renderAll()
}
function dockyardRepair(){
  ensurePhase14State();let cost=S.ship.hull*100+S.ship.strain*50+S.ship.criticals.length*300;
  if(cost<=0){bLog('The ship is already fully serviced.');return}
  if(S.credits<cost){bLog(`Dockyard service costs ${cost} credits.`);return}
  if(!confirm(`Pay ${cost} credits to clear hull trauma, system strain, and prototype ship criticals?`))return;
  S.credits-=cost;S.ship.hull=0;S.ship.strain=0;S.ship.criticals=[];shipLog(`Dockyard service completed for ${cost} credits.`);renderAll()
}
function startShipCombat(){
  ensurePhase14State();if(!S.ship.owned)return;
  S.ship.combat={round:1,range:0,speed:Math.min(3,shipMaxSpeed()),evasive:false,assist:0,used:{pilot:false,navigator:false,gunner:false,engineer:false},enemies:[
    {...SHIP_ENEMY_TEMPLATE,id:'fighter1',hullNow:0,criticals:[]},
    {...SHIP_ENEMY_TEMPLATE,id:'fighter2',hullNow:0,criticals:[]}
  ],log:[]};
  shipLog('Two Imperial patrol fighters drop from high orbit and move to intercept.');renderShip()
}
function shipActiveEnemies(){return S.ship.combat?.enemies?.filter(e=>e.hullNow<e.hull)||[]}
function vehicleRangeDifficulty(range){return [2,2,3,4,5][range]||5}
function shipPilotAction(type){
  let C=S.ship.combat;if(!C||C.used.pilot)return;let pilot=stationActor('pilot');
  if(type==='accelerate'){C.speed=Math.min(shipMaxSpeed(),C.speed+1);C.used.pilot=true;shipLog(`${pilot.name} accelerates to speed ${C.speed}.`);renderShip();return}
  if(type==='decelerate'){C.speed=Math.max(0,C.speed-1);C.used.pilot=true;shipLog(`${pilot.name} reduces speed to ${C.speed}.`);renderShip();return}
  if(type==='evasive'){S.ship.strain++;C.evasive=true;C.used.pilot=true;shipLog(`${pilot.name} throws the ship into evasive maneuvers; 1 system strain suffered.`);renderShip();return}
  let dir=type==='close'?-1:1,target=Math.max(0,Math.min(4,C.range+dir)),boost=C.assist;
  if(target===C.range)return;
  let q=shipSkillPool(pilot,'Piloting (Space)',2,boost),pen=shipCritPenalty('pilot');q.p.setback+=pen;let r=rollNarr(q.p);C.assist=0;C.used.pilot=true;
  if(r.ok){C.range=target;shipLog(`${pilot.name} ${type==='close'?'closes':'opens'} to ${['Close','Short','Medium','Long','Extreme'][C.range]} range. ${rtxt(r)}`)}
  else{S.ship.strain+=1;shipLog(`${pilot.name} fails the maneuver. ${rtxt(r)} · 1 system strain.`)}
  renderShip()
}
function shipCopilotAction(){
  let C=S.ship.combat;if(!C||C.used.navigator)return;let nav=stationActor('navigator'),q=shipSkillPool(nav,'Piloting (Space)',1),r=rollNarr(q.p);C.used.navigator=true;
  if(r.ok){C.assist+=1;S.ship.strain=Math.max(0,S.ship.strain-1);shipLog(`${nav.name} assists the flight crew: +1 Boost to the next pilot/gunner action and recovers 1 system strain. ${rtxt(r)}`)}
  else shipLog(`${nav.name}'s co-pilot assistance fails. ${rtxt(r)}`);renderShip()
}
function shipFire(){
  let C=S.ship.combat;if(!C||C.used.gunner)return;let enemies=shipActiveEnemies();if(!enemies.length)return;
  let target=enemies[0],w=shipStats().weapon;if(C.range>0){shipLog(`${w.name} is Close-range only; get closer before firing.`);return}
  let gun=stationActor('gunner'),boost=C.assist+(S.ship.upgrades.includes('targeting')?1:0),diff=vehicleRangeDifficulty(C.range),q=shipSkillPool(gun,'Gunnery',diff,boost);
  q.p.setback+=shipCritPenalty('gunner');if(C.evasive)upgradeDifficultyPool(q.p,1);
  let r=rollNarr(q.p);C.assist=0;C.used.gunner=true;
  if(gun.id==='pc'&&hasTalent('Intuitive Strike')&&forceAvailable()>0&&confirm('Use Intuitive Strike and add Force dice to this Gunnery check?')){
    let fr=rollForce(forceAvailable()),preferred=preferredForcePips(fr),opposite=oppositeForcePips(fr),want=preferred;
    if(opposite>0&&canUseOppositePips()&&confirm(`Intuitive Strike rolled ${opposite} opposite-alignment Force point${opposite===1?'':'s'}. Use them too?`)){
      let paid=useForcePoints(fr,preferred+opposite);if(paid.ok)want=preferred+opposite
    }
    if(want>0){
      let succ=Math.max(0,Math.min(want,Number(prompt(`Intuitive Strike has ${want} usable Force point${want===1?'':'s'}. How many become automatic Success? The rest become Advantage.`,String(want)))||0)),
          adv=want-succ;r.ns+=succ;r.na+=adv;r.ok=r.ns>0;
      shipLog(`Intuitive Strike converts ${want} Force point${want===1?'':'s'} into ${succ} Success and ${adv} Advantage.`)
    }
  }
  if(r.ok){let dmg=Math.max(0,w.damage+r.ns-target.armor);target.hullNow+=dmg;shipLog(`${gun.name} hits ${target.name} for ${dmg} hull trauma. ${rtxt(r)}`);if(r.na>=w.crit&&dmg>0){target.criticals.push({name:'Critical Hit'});target.hullNow+=2;shipLog(`${target.name} suffers a critical hit (+2 hull trauma in this encounter abstraction).`)}}
  else shipLog(`${gun.name} misses ${target.name}. ${rtxt(r)}`);
  if(!shipActiveEnemies().length){S.ship.combat=null;S.credits+=350;awardCrewXP(4,'starship victory',CREW.map(c=>c.id));shipLog('Patrol fighters destroyed or driven off. Salvage and bounty data yield 350 credits.');renderAll();return}
  renderShip()
}
function shipDamageControl(){
  let C=S.ship.combat;if(!C||C.used.engineer)return;let eng=stationActor('engineer'),q=shipSkillPool(eng,'Mechanics',2),r=rollNarr(q.p);C.used.engineer=true;
  if(r.ok){
    if(S.ship.strain>0){let amt=Math.max(1,r.ns)+(eng.id==='pc'?talentRank('Fine Tuning'):0);S.ship.strain=Math.max(0,S.ship.strain-amt);shipLog(`${eng.name} clears ${amt} system strain. ${rtxt(r)}`)}
    else if(S.ship.hull>0){let amt=1+(eng.id==='pc'?talentRank('Solid Repairs'):0);S.ship.hull=Math.max(0,S.ship.hull-amt);shipLog(`${eng.name} patches ${amt} hull trauma. ${rtxt(r)}`)}
    else shipLog(`${eng.name} stabilizes systems. ${rtxt(r)}`)
  }
  else shipLog(`${eng.name}'s damage control attempt fails. ${rtxt(r)}`);renderShip()
}
function enemyShipRound(){
  let C=S.ship.combat;if(!C)return;
  for(const e of shipActiveEnemies()){
    if(C.range>0){C.range=Math.max(0,C.range-1);shipLog(`${e.name} closes to ${['Close','Short','Medium','Long','Extreme'][C.range]} range.`);continue}
    let dm=DIFFICULTY[S.settings?.difficulty||'standard'],p=makePool(e.agility,e.gunnery,2,dm.enemyBoost,shipStats().defense+dm.enemySetback,0);if(C.evasive)upgradeDifficultyPool(p,1);let r=rollNarr(p);
    if(r.ok){let dmg=Math.max(0,e.weapon.damage+r.ns+DIFFICULTY[S.settings?.difficulty||'standard'].damage-shipStats().armor);S.ship.hull+=dmg;shipLog(`${e.name} hits for ${dmg} hull trauma. ${rtxt(r)}`);if(r.na>=e.weapon.crit&&dmg>0)shipCritical()}
    else shipLog(`${e.name} misses. ${rtxt(r)}`)
  }
  if(S.ship.hull>shipStats().hull){S.ship.hull=shipStats().hull;S.ship.combat=null;shipLog('The freighter is disabled. Emergency systems limp the ship back toward Sable Reach for repairs.');S.ship.location='sable';renderAll();return}
  C.round++;C.evasive=false;C.used={pilot:false,navigator:false,gunner:false,engineer:false};renderShip()
}
function endShipRound(){if(!S.ship.combat)return;enemyShipRound()}

function ensurePhase13State(){
  S.crewProgress=S.crewProgress||{};S.crewQuestLog=S.crewQuestLog||[];S.crewField=S.crewField||{supportUsed:{}};S.crewField.supportUsed=S.crewField.supportUsed||{};
  let defaults={kira:'guard',lena:'support',tavo:'assault'};
  for(const c of CREW){
    let p=S.crewProgress[c.id]||(S.crewProgress[c.id]={});
    if(!Number.isFinite(p.xp))p.xp=0;p.skillBonus=p.skillBonus||{};p.perks=Array.isArray(p.perks)?p.perks:[];
    p.role=p.role||defaults[c.id]||'assault';p.talked=p.talked||{};p.quest=p.quest||{status:'locked',stage:0}
  }
  S.crewConversation=S.crewConversation||'kira'
}
function crewProgress(id){ensurePhase13State();return S.crewProgress[id]}
function effectiveCrew(id){
  let c=CREW.find(x=>x.id===id);
  if(!c)return null;
  let p=crewProgress(id),sk={...c.sk};
  for(const [skill,b] of Object.entries(p.skillBonus||{}))sk[skill]=(sk[skill]||0)+b;
  return {...c,sk,weapon:currentCrewWeaponId(id),armor:currentCrewArmorId(id)}
}
function crewHasPerk(id,perkId){return crewProgress(id).perks.includes(perkId)}
function crewPerkByEffect(id,effect){return (COMPANION_PERKS[id]||[]).some(p=>p.effect===effect&&crewHasPerk(id,p.id))}
function crewSkillRank(id,skill){return effectiveCrew(id)?.sk?.[skill]||0}
function crewSkillCost(id,skill){return (crewSkillRank(id,skill)+1)*5}
function awardCrewXP(amount,reason='',ids=null){
  let targets=ids||S.crew;for(const id of targets){if(S.crewProgress[id])S.crewProgress[id].xp+=amount}
  if(targets.length)gLog(`${targets.map(id=>CREW.find(c=>c.id===id)?.name).filter(Boolean).join(' & ')} gain ${amount} companion XP${reason?` — ${reason}`:''}.`)
}
function buyCrewSkill(id,skill){
  let p=crewProgress(id),rank=crewSkillRank(id,skill),cost=(rank+1)*5;if(rank>=5)return;
  if(p.xp<cost){bLog(`${effectiveCrew(id).name} needs ${cost} companion XP for ${skill} ${rank+1}.`);return}
  p.xp-=cost;p.skillBonus[skill]=(p.skillBonus[skill]||0)+1;bLog(`${effectiveCrew(id).name} trains ${skill} to rank ${rank+1}.`);renderAll()
}
function buyCrewPerk(id,perkId){
  let p=crewProgress(id),perk=(COMPANION_PERKS[id]||[]).find(x=>x.id===perkId);if(!perk||p.perks.includes(perkId))return;
  if(p.xp<perk.cost){bLog(`${effectiveCrew(id).name} needs ${perk.cost} companion XP for ${perk.name}.`);return}
  p.xp-=perk.cost;p.perks.push(perkId);bLog(`${effectiveCrew(id).name} unlocks ${perk.name}.`);renderAll()
}
function setCrewRole(id,role){if(!COMPANION_ROLES[role])return;crewProgress(id).role=role;bLog(`${effectiveCrew(id).name} role set to ${COMPANION_ROLES[role].name}.`);renderAll()}
function crewRoleBoost(actor,skill,target=null){
  if(!actor||actor.id==='pc')return 0;let p=crewProgress(actor.id),boost=0,ri=(S.combat&&target&&typeof rangeBandBetween==='function')?rangeBandBetween(actor.id,target.id):null;
  if(p.role==='assault'&&['Brawl','Melee','Lightsaber','Ranged (Light)','Ranged (Heavy)','Gunnery'].includes(skill))boost++;
  if(actor.id==='kira'&&crewPerkByEffect('kira','closeBoost')&&ri!=null&&ri<=1&&['Brawl','Melee','Ranged (Light)','Ranged (Heavy)'].includes(skill))boost++;
  if(actor.id==='lena'&&crewPerkByEffect('lena','techBoost')&&['Computers','Mechanics'].includes(skill))boost++;
  if(actor.id==='tavo'&&crewPerkByEffect('tavo','huntBoost')&&['Perception','Survival'].includes(skill))boost++;
  if(actor.id==='tavo'&&crewPerkByEffect('tavo','rangedBoost')&&skill==='Ranged (Heavy)'&&ri!=null&&ri>=2)boost++;
  return boost
}
function crewDialogueLine(id){
  let tier=approvalTier(S.approval[id]||0),d=COMPANION_DIALOGUE[id];
  if(tier.label==='Loyal')return d.loyal;if(tier.label==='Trusted')return d.trusted;if(tier.label==='Wary'||tier.label==='Hostile')return d.wary;return d.intro
}
function factionReaction(id){
  let f=S.flags.faction,lines={
    kira:{Rebels:'“Rebels take risks for something bigger than themselves. I can work with that.”',Hutts:'“Hutts remember every debt. So should we.”',Empire:'Kira’s voice goes flat. “You knew what dealing with the Empire would mean.”',Guild:'“A contract is at least honest about what it wants.”'},
    lena:{Rebels:'“Information in Rebel hands can save people. It can also get them killed. I hope you chose carefully.”',Hutts:'“Selling secrets to Hutts is how secrets learn to grow teeth.”',Empire:'Lena stares at you. “Do not ask me to pretend that was harmless.”',Guild:'“The Guild will monetize it. Predictable is better than Imperial.”'},
    tavo:{Rebels:'“Rebels pay badly, but they usually know why they’re shooting.”',Hutts:'“Hutt credits spend. Hutt favors don’t disappear.”',Empire:'“I’ve hunted for people like that. I don’t enjoy owing them.”',Guild:'“The Guild understands leverage. That was the practical call.”'}};
  return f?(lines[id]?.[f]||''):'The Cipher Core decision has not been made yet.'
}
function selectCrewConversation(id){S.crewConversation=id;renderCrewManagement()}
function crewTalkTopic(id,topic){
  let p=crewProgress(id),d=COMPANION_DIALOGUE[id],line='';
  if(topic==='past'){line=d.past;if(!p.talked.past){p.talked.past=true;changeApproval(id,2,'shared history')}}
  if(topic==='encourage'){line=`${effectiveCrew(id).name} accepts the encouragement with ${S.approval[id]>=10?'an easy familiarity':'a cautious nod'}.`;if(!p.talked.encourage){p.talked.encourage=true;changeApproval(id,1,'personal conversation')}}
  if(topic==='cipher')line=factionReaction(id);p.lastLine=line;renderAll()
}
function questUnlocked(id){return (S.approval[id]||0)>=10&&S.scene>=3}
function updateQuestLocks(){for(const c of CREW){let q=crewProgress(c.id).quest;if(q.status==='locked'&&questUnlocked(c.id))q.status='available'}}
function startCrewQuest(id){updateQuestLocks();let q=crewProgress(id).quest;if(q.status!=='available')return;q.status='active';q.stage=0;S.crewQuestLog.unshift(`${effectiveCrew(id).name}: ${COMPANION_QUESTS[id].name} started.`);bLog(`${COMPANION_QUESTS[id].name} started.`);renderAll()}
function runCrewQuest(id){
  updateQuestLocks();let p=crewProgress(id),q=p.quest,data=COMPANION_QUESTS[id];if(q.status!=='active'||!data)return;
  if(!S.crew.includes(id)){bLog(`${effectiveCrew(id).name} must be in the active squad for this mission step.`);return}
  let stage=data.stages[q.stage],x=performBest(stage.skill,{diff:stage.diff});
  if(x.r.ok){q.stage++;changeApproval(id,2,`${data.name} progress`);awardCrewXP(3,`${data.name} progress`,[id]);S.crewQuestLog.unshift(`${data.name}: ${stage.text} — success.`);
    if(q.stage>=data.stages.length){q.status='complete';p.xp+=10;S.earnedXp+=5;changeApproval(id,5,`${data.name} completed`);S.crewQuestLog.unshift(`${data.name} complete: ${data.reward}`);gLog(`${data.name} completed. ${effectiveCrew(id).name} +10 companion XP; player +5 XP.`)}
  }else{actorStrain(id,1);S.crewQuestLog.unshift(`${data.name}: ${stage.text} — setback.`);bLog(`${data.name} step failed. ${effectiveCrew(id).name} suffers 1 strain; the mission remains active.`)}
  renderAll()
}
function crewSupportAction(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId==='pc')return;if(!startTurnActor())return;T=C.turn;if(!T||T.actionUsed)return;let id=T.actorId,p=crewProgress(id);if(p.role!=='support')return;
  T.actionUsed=true;beforeCombatAction(id);C.nextAllyBoost=(C.nextAllyBoost||0)+1;
  let allies=squadActors().filter(a=>!actorIsIncapacitated(a.id)&&a.id!==id).sort((a,b)=>actorState(b.id).strain-actorState(a.id).strain);
  if(allies[0])actorHealStrain(allies[0].id,1);
  if(id==='lena'&&crewPerkByEffect(id,'supportHeal')&&!C.quickPatchUsed){let hurt=squadActors().filter(a=>actorState(a.id).wounds>0).sort((a,b)=>actorState(b.id).wounds-actorState(a.id).wounds)[0];if(hurt){actorHealWounds(hurt.id,1);C.quickPatchUsed=true;cLog(`Lena’s Quick Patch heals 1 wound on ${hurt.name}.`)}}
  if(id==='kira'&&crewPerkByEffect(id,'supportDefense'))C.tempDefenseActor={...(C.tempDefenseActor||{}),pc:(C.tempDefenseActor?.pc||0)+1};
  if(id==='tavo'&&crewPerkByEffect(id,'supportSetback')){let t=C.enemies[Number($('target').value)||0]||activeEnemies()[0];if(t)t.nextSetback=(t.nextSetback||0)+1}
  cLog(`${actorById(id).name} supports the squad: next allied check gains a Boost; an ally recovers 1 strain.`);renderCombat()
}

function ensurePhase12State(){
  S.itemAttachments=S.itemAttachments||{};S.attachmentMods=S.attachmentMods||{};S.itemDamage=S.itemDamage||{};
  if(!Number.isFinite(S.reloads))S.reloads=1;
  S.ordnance={frag:2,stun:1,miniThermal:0,...(S.ordnance||{})};
  S.crafting=S.crafting||{materials:{},crafted:{},utilityRigReady:true};
  S.crafting.materials=S.crafting.materials||{};S.crafting.crafted=S.crafting.crafted||{};if(S.crafting.utilityRigReady===undefined)S.crafting.utilityRigReady=true;
  S.market=S.market||{last:null}
}
function attachmentsFor(itemId){ensurePhase12State();return S.itemAttachments[itemId]||[]}
function attachmentUsedHP(itemId){return attachmentsFor(itemId).reduce((n,id)=>n+(ATTACHMENTS[id]?.hp||0),0)}
function attachmentFreeHP(itemId){let i=ITEMS[itemId];return Math.max(0,(i?.hp||0)-attachmentUsedHP(itemId))}
function hasAttachment(itemId,attId){return attachmentsFor(itemId).includes(attId)}
function compatibleAttachment(att,item){
  if(!att||!item)return false;
  if(att.kind==='armor')return item.type==='armor';
  if(att.kind==='lightsaber')return item.type==='weapon'&&item.skill==='Lightsaber';
  if(att.kind==='weapon')return item.type==='weapon'&&item.skill!=='Lightsaber';
  return false
}
function effectiveWeapon(id){
  ensurePhase12State();let base=WEAPONS[id];if(!base)return base;
  let w={...base,qualities:{...(base.qualities||{})},attachments:[...attachmentsFor(id)]};
  return w
}
function effectiveArmor(id){
  ensurePhase12State();let base=ARMOR[id];if(!base)return base;
  let a={...base,attachments:[...attachmentsFor(id)]};
  if(a.attachments.includes('droidDefense'))a.defense=(a.defense||0)+1;
  return a
}
function marketRarityModifier(){return 2}
function acquisitionProfile(rarity){
  let base=Math.max(0,Number(rarity||0)),modifier=marketRarityModifier(),effective=Math.max(0,base+modifier);
  let diff=effective<=1?0:effective<=3?1:effective<=5?2:effective<=7?3:effective<=9?4:5;
  let upgrade=Math.max(0,effective-10);
  return{base,modifier,effective,diff,upgrade}
}
function blackMarketTerms(item){
  let rarity=item.rarity||0,price=item.price||0,used=0,max=talentRank('Black Market Contacts');
  if(item.restricted&&max>0&&confirm(`Use Black Market Contacts for ${item.name}? Reduce rarity by up to ${max}; each rank used raises price by 50% of base price.`)){
    used=Math.max(0,Math.min(max,Number(prompt('Black Market Contacts ranks to use',String(max)))||0));
    rarity=Math.max(0,rarity-used);price=Math.round(price*(1+0.5*used))
  }
  return{rarity,price,used}
}
function acquisitionDifficulty(rarity){return acquisitionProfile(rarity).diff}
function acquisitionLabel(d){return['Simple','Easy','Average','Hard','Daunting','Formidable'][d]||`Difficulty ${d}`}
function attemptPurchase(id){
  ensurePhase12State();let i=ITEMS[id];if(!i)return;
  if(i.id!=='stimpack'&&i.id!=='extraReload'&&S.inventory.includes(id)){bLog(`${i.name} already owned.`);return}
  let terms=blackMarketTerms(i);
  if(S.credits<terms.price){bLog(`Not enough credits for ${i.name}${terms.used?' after Black Market Contacts markup':''}.`);return}
  let skill=i.restricted?'Streetwise':'Negotiation',ap=acquisitionProfile(terms.rarity);
  let result=performBest(skill,{diff:ap.diff,upgrade:ap.upgrade});
  S.market.last={item:id,skill,diff:ap.diff,upgrade:ap.upgrade,effectiveRarity:ap.effective,success:result.r.ok};
  if(!result.r.ok){bLog(`${i.name} could not be located. ${skill} ${acquisitionLabel(ap.diff)}${ap.upgrade?` with ${ap.upgrade} difficulty upgrade(s)`:''} failed at effective rarity ${ap.effective}.`);renderEquipment();return}
  S.credits-=terms.price;
  if(i.id==='stimpack')S.stimpacks++;
  else if(i.id==='extraReload')S.reloads++;
  else S.inventory.push(id);
  bLog(`Located and purchased ${i.name} for ${terms.price} credits${terms.used?` using Black Market Contacts ${terms.used}`:''}.`);renderAll()
}
function installAttachment(attId){
  ensurePhase12State();let itemId=$('attachmentItem')?.value,item=ITEMS[itemId],att=ATTACHMENTS[attId];if(!item||!att)return;
  if(!S.inventory.includes(itemId)){bLog('You must own the item before modifying it.');return}
  if(!compatibleAttachment(att,item)){bLog('That attachment is not compatible.');return}
  if(hasAttachment(itemId,attId)){bLog('Attachment already installed.');return}
  if(attachmentFreeHP(itemId)<att.hp){bLog(`${item.name} does not have ${att.hp} free hard point(s).`);return}
  let terms=blackMarketTerms(att);
  if(S.credits<terms.price){bLog(`Not enough credits for ${att.name}${terms.used?' after Black Market Contacts markup':''}.`);return}
  let ap=acquisitionProfile(terms.rarity),skill=att.restricted?'Streetwise':'Negotiation',r=performBest(skill,{diff:ap.diff,upgrade:ap.upgrade});
  if(!r.r.ok){bLog(`${att.name} could not be sourced. ${skill} ${acquisitionLabel(ap.diff)}${ap.upgrade?` + ${ap.upgrade} upgrade(s)`:''} failed.`);return}
  S.credits-=terms.price;(S.itemAttachments[itemId]||(S.itemAttachments[itemId]=[])).push(attId);
  bLog(`${att.name} installed on ${item.name}. ${att.hp} hard point(s) used.`);renderAll()
}
function removeAttachment(attId){
  let itemId=$('attachmentItem')?.value;if(!itemId)return;
  S.itemAttachments[itemId]=(S.itemAttachments[itemId]||[]).filter(x=>x!==attId);
  bLog(`${ATTACHMENTS[attId]?.name||attId} removed from ${ITEMS[itemId]?.name||itemId}.`);renderAll()
}
function craftMaterials(){
  ensurePhase12State();let id=$('craftTemplate')?.value,t=CRAFT_TEMPLATES[id];if(!t)return;
  if(S.crafting.materials[id]){bLog('Materials already acquired for that project.');return}
  if(S.credits<t.materialPrice){bLog('Not enough credits for crafting materials.');return}
  let ap=acquisitionProfile(t.rarity),r=performBest('Negotiation',{diff:ap.diff,upgrade:ap.upgrade});
  if(!r.r.ok){bLog(`Could not acquire the materials for ${t.name}.`);return}
  S.credits-=t.materialPrice;S.crafting.materials[id]=true;bLog(`Materials acquired for ${t.name} (${t.materialPrice} cr).`);renderAll()
}
function craftBuild(){
  ensurePhase12State();let id=$('craftTemplate')?.value,t=CRAFT_TEMPLATES[id];if(!t)return;
  if(!S.crafting.materials[id]){bLog('Acquire the materials first.');return}
  let a=actorById('pc'),q=actorPool(a,'Mechanics',{diff:t.diff,construct:true,commit:true}),r=rollNarr(q.p);
  S.crafting.materials[id]=false;
  if(!r.ok){bLog(`${t.name} construction fails; the prototype materials are lost. ${rtxt(r)}`);renderAll();return}
  S.crafting.crafted[id]=(S.crafting.crafted[id]||0)+1;
  if(id==='utilityRig')S.crafting.utilityRigReady=true;
  bLog(`${t.name} completed. ${rtxt(r)}`);renderAll()
}
function repairEquippedItem(){
  ensurePhase12State();let id=S.weapon,damage=S.itemDamage[id]||0;
  if(!damage){bLog(`${ITEMS[id]?.name||id} does not currently need repair.`);return}
  let a=actorById('pc'),boost=S.crafting.crafted.utilityRig&&S.crafting.utilityRigReady?1:0,q=actorPool(a,'Mechanics',{diff:Math.min(4,damage+1),boost,commit:true}),r=rollNarr(q.p);
  if(boost)S.crafting.utilityRigReady=false;
  if(r.ok){S.itemDamage[id]=Math.max(0,damage-1);bLog(`Repair succeeds on ${ITEMS[id].name}. Damage state is now ${S.itemDamage[id]}. ${rtxt(r)}`)}
  else bLog(`Repair attempt fails on ${ITEMS[id].name}. ${rtxt(r)}`);
  renderAll()
}
function reloadCurrentWeapon(){
  ensurePhase12State();let C=S.combat,T=C?.turn;if(!C||!T||T.actorId!=='pc'||S.reloads<1)return;
  if(!C.outOfAmmo?.[S.weapon])return;
  if(!spendManeuver(1,'Reload'))return;
  S.reloads--;C.outOfAmmo[S.weapon]=false;cLog(`${S.name} reloads ${effectiveWeapon(S.weapon).name}. ${S.reloads} reload(s) remain.`);renderCombat();renderEquipment()
}

function armorObj(){return effectiveArmor(S.armor)||ARMOR.heavyClothing}
function playerSoak(){
  let a=armorObj(),bonus=talentRank('Enduring');
  if(hasTalent('Armor Master')&&a)bonus+=1;
  return S.chars.Brawn+(a?.soak||0)+bonus
}
function playerDefense(kind='ranged'){
  let a=armorObj(),w=WEAPONS[S.weapon],d=a?.defense||0;
  if(hasTalent('Improved Armor Master')&&(a?.soak||0)>=2)d+=1;
  if(kind==='melee'){d+=quality(w,'defensive');if(hasTalent('Superior Reflexes'))d+=1}
  if(kind==='ranged'){d+=quality(w,'deflection');if(hasTalent('Sixth Sense'))d+=1}
  return d;
}
function encThreshold(){return 5+(S.chars.Brawn||0)}
function itemEnc(id){
  let i=ITEMS[id];if(!i)return 0;if(assignedCrewForItem(id))return 0;
  if(i.type==='armor'&&S.armor===id)return Math.max(0,(i.enc||0)-3);
  return i.enc||0
}
function currentEnc(){let n=(S.inventory||[]).reduce((n,id)=>n+itemEnc(id),0);if(S.crafting?.crafted?.fieldPadding)n=Math.max(0,n-1);return n}
function ensureInventory(){
  S.inventory=S.inventory||[];
  if(S.weapon&&!S.inventory.includes(S.weapon))S.inventory.push(S.weapon);
  if(S.armor&&!S.inventory.includes(S.armor))S.inventory.push(S.armor);
}
function itemSummary(i){
  if(!i)return'';
  let att=attachmentsFor(i.id).map(id=>ATTACHMENTS[id]?.name).filter(Boolean);
  if(i.type==='weapon'){
    let w=effectiveWeapon(i.id),q=Object.entries(w.qualities||{}).map(([k,v])=>`${k}${v===true?'':` ${v}`}`).join(', ');
    return `${w.skill} · Damage ${w.addBrawn?'+':''}${w.damage} · Crit ${w.crit??'—'} · ${w.range} · Enc ${w.enc||0} · HP ${attachmentUsedHP(i.id)}/${w.hp||0}${q?' · '+q:''}${att.length?' · Attachments: '+att.join(', '):''}${S.itemDamage?.[i.id]?` · Damage state ${S.itemDamage[i.id]}`:''}`;
  }
  if(i.type==='armor'){let a=effectiveArmor(i.id);return `Defense ${a.defense} · Soak +${a.soak} · Enc ${a.enc} · HP ${attachmentUsedHP(i.id)}/${a.hp}${att.length?' · Attachments: '+att.join(', '):''}`}
  return `Enc ${i.enc||0}`;
}
function buyItem(id){attemptPurchase(id)}
function equipItem(id){
  let i=ITEMS[id];if(!i||!S.inventory.includes(id))return;let owner=assignedCrewForItem(id);if(owner){bLog(`${i.name} is assigned to ${owner.name}. Reassign it in the Crew tab first.`);return}
  if(i.type==='weapon')S.weapon=id;
  if(i.type==='armor')S.armor=id;
  bLog(`Equipped ${i.name}.`);renderEquipment();renderAdventure()
}

function medicalWeek(){return Math.floor((Math.max(1,S.medical.day)-1)/5)+1}
function medicineDifficulty(id){
  let w=actorState(id).wounds,wt=actorWT(id);return w>wt?3:w>wt/2?2:1
}
function recoveryActorPool(healerId,skill,diff,commit=false){
  let a=actorById(healerId);
  if(healerId==='pc')return actorPool(a,skill,{diff,commit}).p;
  let ch=SKILL_CHAR[skill],rank=a.sk?.[skill]||0,val=a.c?.[ch]||1;return makePool(val,rank,diff)
}

function renderShip(){
  if(!$('ship'))return;ensurePhase14State();
  $('shipTab').disabled=!S.ship.owned;$('shipLockState').textContent=S.ship.owned?'OWNED':'LOCKED';
  $('shipLockState').className='pill'+(S.ship.owned?' good':'');
  $('shipLocked').classList.toggle('hidden',S.ship.owned);$('shipOwned').classList.toggle('hidden',!S.ship.owned);
  if(!S.ship.owned)return;
  let st=shipStats(),loc=SHIP_DESTINATIONS[S.ship.location]||SHIP_DESTINATIONS.sable;
  $('shipNameDisplay').textContent=S.ship.name;$('shipNameInput').value=S.ship.name;$('shipLocation').textContent=loc.name;$('shipSource').textContent=st.source;
  $('shipStats').innerHTML=`<span class="pill">Sil ${st.silhouette}</span><span class="pill">Speed ${st.speed}</span><span class="pill">Handling ${st.handling>=0?'+':''}${st.handling}</span><span class="pill">Defense ${st.defense}</span><span class="pill">Armor ${st.armor}</span><span class="pill">Hull ${S.ship.hull}/${st.hull}</span><span class="pill">Strain ${S.ship.strain}/${st.strain}</span><span class="pill">Enc ${st.enc}</span><span class="pill">Passengers ${st.passengers}</span><span class="pill">Hyperdrive ${st.hyperdrive}</span>`;
  $('shipCondition').innerHTML=`Chassis: <b>${st.name||st.model}</b> · Weapon: <b>${st.weapon.name}</b> — Gunnery · Damage ${st.weapon.damage} · Crit ${st.weapon.crit} · ${st.weapon.range}<br>Criticals: ${S.ship.criticals.length?S.ship.criticals.map(c=>`${c.roll} ${c.name}`).join(' · '):'None'}<br><span class="tiny">${st.note||st.weapon.source||'Source-grounded chassis profile.'}</span>`;
  $('shipNameInput').onchange=()=>{S.ship.name=$('shipNameInput').value.trim()||'Wayward Star';renderShip()};

  let opts=shipActors().map(a=>`<option value="${a.id}">${a.name}</option>`).join('');
  for(const [id,station] of [['shipPilot','pilot'],['shipNavigator','navigator'],['shipGunner','gunner'],['shipEngineer','engineer']]){$(id).innerHTML=opts;$(id).value=S.ship.stations[station];$(id).onchange=()=>setShipStation(station,$(id).value)}
  let pilot=stationActor('pilot'),nav=stationActor('navigator'),gun=stationActor('gunner'),eng=stationActor('engineer');
  $('stationPreview').innerHTML=`Pilot: ${pilot.name} · Piloting (Space) ${pilot.sk?.['Piloting (Space)']||0} &nbsp;|&nbsp; Navigator: ${nav.name} · Astrogation ${nav.sk?.Astrogation||0}<br>Gunner: ${gun.name} · Gunnery ${gun.sk?.Gunnery||0} &nbsp;|&nbsp; Engineer: ${eng.name} · Mechanics ${eng.sk?.Mechanics||0}`;

  $('shipDestination').innerHTML=Object.entries(SHIP_DESTINATIONS).map(([id,d])=>`<option value="${id}" ${id===S.ship.location?'selected':''}>${d.name}</option>`).join('');
  let d=SHIP_DESTINATIONS[$('shipDestination').value]||loc,navQ=shipSkillPool(nav,'Astrogation',d.diff);
  $('shipTravelPreview').innerHTML=`${d.desc}<br><b>${nav.name}</b>: Astrogation ${navQ.rank} · ${ptxt(navQ.p)}`;
  $('shipDestination').onchange=renderShip;$('shipTravelBtn').onclick=plotShipCourse;
  $('shipRepairHull').onclick=()=>repairShip('hull');$('shipRepairStrain').onclick=()=>repairShip('strain');$('shipDockRepair').onclick=dockyardRepair;
  let service=S.ship.hull*100+S.ship.strain*50+S.ship.criticals.length*300;
  $('shipRepairPreview').textContent=`Engineer ${eng.name} · Mechanics ${eng.sk?.Mechanics||0}. Prototype dockyard full-service cost: ${service} credits.`;


  if($('shipHangar')){
    $('shipHangar').innerHTML=S.ship.ownedModels.map(id=>{let m=SHIP_MODELS[id],active=id===S.ship.model,snap=active?{name:S.ship.name,hull:S.ship.hull,strain:S.ship.strain,upgrades:S.ship.upgrades}:S.ship.hangar[id]||{};return`<div class="item"><div class="row"><div><b>${snap.name||m.name}</b> ${active?'<span class="tag good">ACTIVE</span>':''}<div class="small">${m.class} · Sil ${m.silhouette} · Speed ${m.speed} · Handling ${m.handling>=0?'+':''}${m.handling} · Armor ${m.armor} · Hull ${snap.hull||0}/${m.hull} · Strain ${snap.strain||0}/${m.strain}</div><div class="tiny">${m.source} · ${m.hp} HP · ${m.hyperdrive} · ${Number(m.price).toLocaleString()} cr / Rarity ${m.rarity}${m.restricted?' · Restricted':''}</div></div><button class="btn" data-shipswitch="${id}" ${active?'disabled':''}>${active?'Active':'Switch'}</button></div></div>`}).join('');
    document.querySelectorAll('[data-shipswitch]').forEach(b=>b.onclick=()=>switchShipModel(b.dataset.shipswitch));
  }
  if($('shipMarket')){
    $('shipMarket').innerHTML=Object.values(SHIP_MODELS).filter(m=>!S.ship.ownedModels.includes(m.id)).map(m=>{let ap=acquisitionProfile(m.rarity),skill=m.restricted?'Streetwise':'Negotiation';return`<div class="item"><div class="row"><div><b>${m.name}</b><div class="small">${m.class} · Sil ${m.silhouette} · Speed ${m.speed} · Handling ${m.handling>=0?'+':''}${m.handling} · Defense ${m.defense} · Armor ${m.armor} · Hull ${m.hull} · Strain ${m.strain}</div><div class="tiny">${Number(m.price).toLocaleString()} cr · Rarity ${m.rarity}${m.restricted?' · Restricted':''} · ${skill} ${acquisitionLabel(ap.diff)} at Sable Reach · ${m.source}</div></div><button class="btn" data-shipbuy="${m.id}" ${S.credits<m.price?'disabled':''}>Locate & Buy</button></div></div>`}).join('')||'<div class="small">Every currently playable ship chassis is already in your hangar.</div>';
    document.querySelectorAll('[data-shipbuy]').forEach(b=>b.onclick=()=>purchaseShipModel(b.dataset.shipbuy));
  }

  $('shipHP').textContent=`${shipUsedHP()}/${st.hp}`;
  $('shipUpgradeList').innerHTML=Object.values(SHIP_UPGRADES).map(u=>{let owned=S.ship.upgrades.includes(u.id),can=shipFreeHP()>=u.hp&&S.credits>=u.price;return`<div class="item"><div class="row"><div><b>${u.name}</b><div class="small">${u.desc}</div><div class="tiny">${u.hp} HP · ${u.price.toLocaleString()} cr · original campaign upgrade package</div></div><button class="btn" data-shipup="${u.id}" ${owned||!can?'disabled':''}>${owned?'Installed':'Install'}</button></div></div>`}).join('');
  document.querySelectorAll('[data-shipup]').forEach(b=>b.onclick=()=>installShipUpgrade(b.dataset.shipup));
  $('startShipCombat').onclick=startShipCombat;

  let C=S.ship.combat;$('shipCombat').classList.toggle('hidden',!C);
  if(C){
    $('shipRound').textContent=C.round;$('shipRange').textContent=['Close','Short','Medium','Long','Extreme'][C.range];
    $('shipCombatStatus').textContent=`Speed ${C.speed}/${shipMaxSpeed()} · Defense ${st.defense} · Armor ${st.armor} · Hull ${S.ship.hull}/${st.hull} · Strain ${S.ship.strain}/${st.strain}${C.evasive?' · EVASIVE':''}`;
    $('shipEnemyList').innerHTML=C.enemies.map(e=>`<div class="item ${e.hullNow>=e.hull?'down':''}"><b>${e.name}</b><div class="tiny">Hull ${e.hullNow}/${e.hull} · Armor ${e.armor} · Speed ${e.speed}${e.hullNow>=e.hull?' · DISABLED':''}</div></div>`).join('');
    $('shipCombatLog').innerHTML=C.log.map(x=>`<div>${x}</div>`).join('');
    $('shipClose').disabled=C.used.pilot||C.range===0;$('shipOpen').disabled=C.used.pilot||C.range===4;$('shipAccel').disabled=C.used.pilot||C.speed>=shipMaxSpeed();$('shipDecel').disabled=C.used.pilot||C.speed<=0;$('shipEvasive').disabled=C.used.pilot;
    $('shipCopilotAction').disabled=C.used.navigator;$('shipFire').disabled=C.used.gunner;$('shipDamageControl').disabled=C.used.engineer;
    $('shipClose').onclick=()=>shipPilotAction('close');$('shipOpen').onclick=()=>shipPilotAction('open');$('shipAccel').onclick=()=>shipPilotAction('accelerate');$('shipDecel').onclick=()=>shipPilotAction('decelerate');$('shipEvasive').onclick=()=>shipPilotAction('evasive');
    $('shipCopilotAction').onclick=shipCopilotAction;$('shipFire').onclick=shipFire;$('shipDamageControl').onclick=shipDamageControl;$('shipEndRound').onclick=endShipRound
  }
  safeAutosave()
}

function renderRecovery(){
  if(!$('recovery'))return;ensureCrewState();
  $('encounterNumber').textContent=S.medical.encounter;
  let ids=['pc',...S.crew],actors=ids.map(actorById);
  $('recoveryParty').innerHTML=actors.map(a=>{let st=actorState(a.id);return`<div class="item"><b>${a.name}</b><div class="small">Wounds ${st.wounds}/${actorWT(a.id)} · Strain ${st.strain}/${actorST(a.id)} · Soak ${actorSoak(a.id)}</div><div class="tiny">Conditions: ${conditionsText(a.id)}</div><div class="tiny">Criticals: ${st.criticals.length?st.criticals.map(c=>`${c.roll} ${c.name} (${c.sev})${criticalExtra(c)}`).join(' · '):'None'}</div></div>`}).join('');
  $('healerSelect').innerHTML=ids.map(id=>{let a=actorById(id);return`<option value="${id}">${a.name} · Medicine ${a.sk?.Medicine||0}</option>`}).join('');
  $('patientSelect').innerHTML=ids.map(id=>`<option value="${id}">${actorById(id).name}</option>`).join('');
  if($('criticalSelect'))$('criticalSelect').onchange=updateRecoveryPreview;
  updateRecoveryPreview()
}
function updateRecoveryPreview(){
  if(!$('recoveryPreview'))return;
  let hid=$('healerSelect').value||'pc',pid=$('patientSelect').value||'pc',act=$('recoveryAction').value,skill='Medicine',diff=medicineDifficulty(pid),note='',pst=actorState(pid);
  let wrap=$('criticalSelectWrap'),sel=$('criticalSelect');
  if(wrap)wrap.classList.toggle('hidden',act!=='critical');
  if(sel){
    let current=sel.value;
    sel.innerHTML=pst.criticals.map(cr=>`<option value="${cr.uid}">${cr.roll} · ${cr.name} (${cr.sev})</option>`).join('');
    if(current&&pst.criticals.some(cr=>cr.uid===current))sel.value=current
  }
  if(act==='cool'||act==='discipline'){skill=act==='cool'?'Cool':'Discipline';diff=0;note='Simple check. Each net Success recovers 1 strain.'}
  if(act==='medicine'){note=`Source-verified wound treatment: ${['Simple','Easy','Average','Hard'][diff]} Medicine based on current wounds; one wound-treatment check per patient per encounter. Net Success heals wounds and Advantage recovers strain.`}
  if(act==='critical'){
    let cr=pst.criticals.find(x=>x.uid===sel?.value)||pst.criticals[0];
    if(!cr){$('recoveryPreview').innerHTML='No Critical Injury to treat.';return}
    diff=severityDifficulty(cr.sev);
    let ck=`${medicalWeek()}:${pid}:${cr.uid}`,used=!!S.medical.critTreated[ck];
    note=`Treating ${cr.name} uses ${cr.sev} (${acquisitionLabel(diff)}) difficulty. Source-verified frequency: one treatment attempt for this injury per narrative week.${used?' This injury already had its attempt this week.':''}`
  }
  let selfPenalty=(skill==='Medicine'&&hid===pid)?2:0,finalDiff=diff+selfPenalty;
  if(selfPenalty)note+=` Self-treatment increases Medicine difficulty by two.`;
  let p=recoveryActorPool(hid,skill,finalDiff);$('recoveryPreview').innerHTML=`<b>${actorById(hid).name}</b> uses ${skill} on ${actorById(pid).name}<br><div style="margin-top:6px">${dicePoolHTML(p)}</div><div class="tiny" style="margin-top:7px">${note} Recovery assumes access to proper medical equipment.</div>`
}
function performRecovery(){
  let hid=$('healerSelect').value,pid=$('patientSelect').value,act=$('recoveryAction').value,skill='Medicine',diff=medicineDifficulty(pid),key=`${S.medical.encounter}:${pid}`,pst=actorState(pid);
  if(act==='medicine'&&S.medical.woundTreated[key]){bLog(`${actorById(pid).name} already received a Medicine wound-treatment check this encounter.`);return}
  if(act==='cool'||act==='discipline'){skill=act==='cool'?'Cool':'Discipline';diff=0}
  let cr=null;
  if(act==='critical'){
    let uid=$('criticalSelect')?.value;cr=pst.criticals.find(x=>x.uid===uid)||pst.criticals[0];
    if(!cr){bLog('No Critical Injury to treat.');return}
    diff=severityDifficulty(cr.sev);
    let ck=`${medicalWeek()}:${pid}:${cr.uid}`;
    if(S.medical.critTreated[ck]){bLog('That Critical Injury already had its Medicine treatment attempt this narrative week.');return}
  }
  let finalDiff=diff+((skill==='Medicine'&&hid===pid)?2:0),p=recoveryActorPool(hid,skill,finalDiff,true),r=rollNarr(p);
  if(hid==='pc'&&!r.ok)r=naturalReroll(skill,{actor:actorById('pc'),p},r);
  if(act==='medicine'){
    S.medical.woundTreated[key]=true;
    if(r.ok){
      let healed=Math.max(0,r.ns)+(hid==='pc'?talentRank('Surgeon'):0)+(hid==='lena'&&crewPerkByEffect('lena','medicHeal')?1:0),
          strainHeal=Math.max(0,r.na)+(hid==='pc'?talentRank('Physician'):0);
      if(hid==='pc'&&pid!=='pc'&&hasTalent('Knowledgeable Healing')&&S.destiny.light>0&&confirm(`Use Knowledgeable Healing? Spend 1 light Destiny Point to add Knowledge (Xenology) ${S.skills['Knowledge (Xenology)']||0} wounds healed.`)){
        S.destiny.light--;S.destiny.dark++;healed+=S.skills['Knowledge (Xenology)']||0
      }
      actorHealWounds(pid,healed);if(strainHeal>0)actorHealStrain(pid,strainHeal);
      bLog(`${actorById(hid).name} treats ${actorById(pid).name}: ${rtxt(r)} · heals ${healed} wounds${strainHeal>0?` and ${strainHeal} strain`:''}.`)
    } else bLog(`Medicine check fails: ${rtxt(r)}.`)
  }else if(act==='cool'||act==='discipline'){
    let healed=Math.max(0,r.ns)+(pid==='pc'?talentRank('Rapid Recovery'):0);
    if(pid==='pc'&&S.species==='phydolon'&&healed>0)healed=Math.max(1,healed-1);
    actorHealStrain(pid,healed);
    let hardBoiled=pid==='pc'?Math.min(Math.max(0,r.na),talentRank('Hard-Boiled')):0;
    if(hardBoiled)actorHealWounds('pc',hardBoiled);
    bLog(`${actorById(pid).name} catches their breath with ${skill}: ${rtxt(r)} · recovers ${healed} strain${hardBoiled?` and ${hardBoiled} wound${hardBoiled===1?'':'s'} from Hard-Boiled`:''}${pid==='pc'&&S.species==='phydolon'?' after Symbiont Isolation':''}.`)
  }else if(act==='critical'){
    let ck=`${medicalWeek()}:${pid}:${cr.uid}`;S.medical.critTreated[ck]=true;
    if(r.ok){
      pst.criticals=pst.criticals.filter(x=>x.uid!==cr.uid);
      clearHealedCritCondition(pid,cr);
      bLog(`${actorById(hid).name} successfully treats ${cr.name}: ${rtxt(r)}.`)
    }else bLog(`Critical treatment fails: ${rtxt(r)}.`)
  }
  renderRecovery();if(S.finalized)renderAdventure()
}
function clearHealedCritCondition(id,cr){
  let st=actorState(id),c=st.conditions,still=name=>st.criticals.some(x=>x.name===name);
  if(cr.name==='Slowed Down'&&!still('Slowed Down'))c.slowedRound=0;
  if(cr.name==='Sudden Jolt'&&!still('Sudden Jolt'))c.droppedWeapon=false;
  if(cr.name==='Distracted'&&!still('Distracted'))c.noFreeManeuver=0;
  if(cr.name==='Off-Balance'&&!still('Off-Balance'))c.nextSetback=0;
  if(cr.name==='Stunned'&&!still('Stunned'))c.staggered=0;
  if(cr.name==='Stinger'&&!still('Stinger'))c.nextDifficulty=0;
  if(cr.name==='Bowled Over'&&!still('Bowled Over'))c.prone=false;
  if(cr.name==='Head Ringer'&&!still('Head Ringer'))c.headRinger=false;
  if(cr.name==='Fearsome Wound'&&!still('Fearsome Wound'))c.fearsomeWound=false;
  if(cr.name==='Agonizing Wound'&&!still('Agonizing Wound'))c.agonizingWound=false;
  if(cr.name==='Slightly Dazed'&&!still('Slightly Dazed'))c.slightlyDazed=false;
  if(cr.name==='Scattered Senses'&&!still('Scattered Senses'))c.scatteredSenses=false;
  if(cr.name==='Hamstrung'&&!still('Hamstrung'))c.hamstrung=false;
  if(cr.name==='Winded'&&!still('Winded'))c.winded=false;
  if(cr.name==='Compromised'&&!still('Compromised'))c.compromised=false;
  if(cr.name==='At the Brink'&&!still('At the Brink'))c.atBrink=false;
  if(cr.name==='Temporarily Lame'&&!still('Temporarily Lame'))c.temporarilyLame=false;
  if(cr.name==='Blinded'&&!still('Blinded'))c.blinded=false;
  if(cr.name==='Knocked Senseless'&&!still('Knocked Senseless'))c.knockedSenseless=false;
  if(cr.name==='Bleeding Out'&&!still('Bleeding Out'))c.bleedingOut=false;
  if(cr.name==='The End is Nigh'&&!still('The End is Nigh')){c.endIsNigh=0;c.endIsNighRound=0}
  /* Maimed and Gruesome Injury leave permanent consequences after the Critical itself is treated. */
}
function naturalWeeklyCriticalRecovery(id){
  let st=actorState(id);if(!st.criticals.length)return;
  let cr=st.criticals[0],a=actorById(id),rank=a.sk?.Resilience||0,val=a.c?.Brawn||1,p=makePool(val,rank,severityDifficulty(cr.sev)),r=rollNarr(p);
  if(r.ok){
    st.criticals=st.criticals.filter(x=>x.uid!==cr.uid);clearHealedCritCondition(id,cr);
    bLog(`${a.name} naturally recovers from ${cr.name}: ${rtxt(r)}.`);
    if(r.tr&&st.criticals.length){let extra=st.criticals[0];st.criticals=st.criticals.filter(x=>x.uid!==extra.uid);clearHealedCritCondition(id,extra);bLog(`Triumph: ${a.name} also recovers from ${extra.name}.`)}
  }else{
    actorHealWounds(id,1);bLog(`${a.name} does not recover from ${cr.name} this week (${rtxt(r)}), but recovers 1 additional wound.`)
  }
}
function startNewDay(){
  let oldWeek=medicalWeek();
  for(const id of ['pc',...S.crew]){
    let woundHeal=(id==='pc'&&S.species==='phydolon')?2:1;
    actorHealWounds(id,woundHeal);
    actorHealStrain(id,actorState(id).strain)
  }
  if(S.species==='phydolon'&&actorState('pc').criticals.length)naturalWeeklyCriticalRecovery('pc');
  S.stimUses=0;S.medical.day++;
  let newWeek=medicalWeek();
  if(newWeek>oldWeek)for(const id of ['pc',...S.crew])if(!(id==='pc'&&S.species==='phydolon'))naturalWeeklyCriticalRecovery(id);
  bLog(`A full night's rest begins day ${S.medical.day} (standard week ${newWeek}): the party recovers natural wounds and all strain.${S.species==='phydolon'?' Symbiotic Resilience gives the Phydolon PC an extra wound of natural healing and a nightly Critical recovery attempt.':''} Stimpack diminishing returns reset.${newWeek>oldWeek?' Weekly natural Critical Injury recovery was checked for the rest of the active party.':''}`);
  renderRecovery();renderEquipment();if(S.finalized)renderAdventure()
}

function renderCrewManagement(){
  if(!$('crewmgmt'))return;ensureCrewState();ensurePhase13State();updateQuestLocks();$('activeCrewCount').textContent=S.crew.length;
  $('crewCards').innerHTML=CREW.map(c=>{
    let st=actorState(c.id),tier=approvalTier(S.approval[c.id]||0),cw=currentCrewWeaponId(c.id),ca=currentCrewArmorId(c.id),p=crewProgress(c.id),ep=effectiveCrew(c.id);
    let wopts=[`<option value="default">Default — ${WEAPONS[c.weapon].name}</option>`].concat((S.inventory||[]).filter(id=>ITEMS[id]?.type==='weapon'&&crewItemAvailable(id,c.id,'weapon')).map(id=>`<option value="${id}" ${S.crewLoadout[c.id].weapon===id?'selected':''}>${WEAPONS[id].name}</option>`));
    let aopts=[`<option value="default">Default — ${ARMOR[c.armor].name}</option>`].concat((S.inventory||[]).filter(id=>ITEMS[id]?.type==='armor'&&crewItemAvailable(id,c.id,'armor')).map(id=>`<option value="${id}" ${S.crewLoadout[c.id].armor===id?'selected':''}>${ARMOR[id].name}</option>`));
    let skills=(CREW_SPECIALTIES[c.id]||[]).map(skill=>{let rank=ep.sk[skill]||0,cost=crewSkillCost(c.id,skill);return`<span class="pill">${skill} ${rank} <button class="btn" style="padding:2px 6px" data-crewskill="${c.id}" data-skill="${skill}" ${rank>=5||p.xp<cost?'disabled':''}>+ ${cost}XP</button></span>`}).join('');
    let perks=(COMPANION_PERKS[c.id]||[]).map(pk=>`<div class="tiny" style="margin-top:5px"><b>${pk.name}</b> — ${pk.desc} ${p.perks.includes(pk.id)?'<span class="good">UNLOCKED</span>':`<button class="btn" style="padding:2px 6px" data-crewperk="${c.id}" data-perk="${pk.id}" ${p.xp<pk.cost?'disabled':''}>${pk.cost} XP</button>`}</div>`).join('');
    return `<div class="item"><div class="row"><div><b>${c.name}</b><div class="tiny">${c.role}</div></div><div class="pills"><button class="btn" data-talkcrew="${c.id}">Talk</button><button class="btn ${S.crew.includes(c.id)?'good':''}" data-activecrew="${c.id}">${S.crew.includes(c.id)?'Active':'Reserve'}</button></div></div>
      <div class="small" style="margin-top:7px">Approval <span class="approval ${tier.cls}">${S.approval[c.id]} · ${tier.label}</span> · Companion XP <b class="gold">${p.xp}</b></div>
      <div class="tiny">Wounds ${st.wounds}/${actorWT(c.id)} · Strain ${st.strain}/${actorST(c.id)} · Soak ${actorSoak(c.id)} · Defense ${actorDefense(c.id)}</div>
      <label style="display:block;margin-top:7px">Combat role<select data-crewrole="${c.id}">${Object.entries(COMPANION_ROLES).map(([id,r])=>`<option value="${id}" ${p.role===id?'selected':''}>${r.name} — ${r.desc}</option>`).join('')}</select></label>
      <label style="display:block;margin-top:7px">Weapon<select class="loadout-select" data-crewweapon="${c.id}">${wopts.join('')}</select></label>
      <label style="display:block;margin-top:7px">Armor<select class="loadout-select" data-crewarmor="${c.id}">${aopts.join('')}</select></label>
      <div class="tiny" style="margin-top:7px">Current: ${WEAPONS[cw].name} · ${ARMOR[ca].name}</div>
      <div class="small" style="margin-top:8px"><b>Skill development</b></div><div class="pills" style="margin-top:5px">${skills}</div>
      <div class="small" style="margin-top:8px"><b>Companion perks</b></div>${perks}</div>`
  }).join('');
  document.querySelectorAll('[data-activecrew]').forEach(b=>b.onclick=()=>toggleCrewActive(b.dataset.activecrew));
  document.querySelectorAll('[data-talkcrew]').forEach(b=>b.onclick=()=>selectCrewConversation(b.dataset.talkcrew));
  document.querySelectorAll('[data-crewrole]').forEach(s=>s.onchange=()=>setCrewRole(s.dataset.crewrole,s.value));
  document.querySelectorAll('[data-crewskill]').forEach(b=>b.onclick=()=>buyCrewSkill(b.dataset.crewskill,b.dataset.skill));
  document.querySelectorAll('[data-crewperk]').forEach(b=>b.onclick=()=>buyCrewPerk(b.dataset.crewperk,b.dataset.perk));
  document.querySelectorAll('[data-crewweapon]').forEach(s=>{s.value=S.crewLoadout[s.dataset.crewweapon].weapon||'default';s.onchange=()=>setCrewLoadout(s.dataset.crewweapon,'weapon',s.value)});
  document.querySelectorAll('[data-crewarmor]').forEach(s=>{s.value=S.crewLoadout[s.dataset.crewarmor].armor||'default';s.onchange=()=>setCrewLoadout(s.dataset.crewarmor,'armor',s.value)});
  renderCrewStoryPanel()
}
function renderCrewStoryPanel(){
  let id=S.crewConversation||'kira',c=CREW.find(x=>x.id===id)||CREW[0],p=crewProgress(c.id),tier=approvalTier(S.approval[c.id]||0),q=COMPANION_QUESTS[c.id],qs=p.quest,questButtons='';
  if(qs.status==='available')questButtons=`<button class="btn primary" id="startCompQuest">Start ${q.name}</button>`;
  if(qs.status==='active'){let stage=q.stages[qs.stage];questButtons=`<button class="btn primary" id="continueCompQuest">Continue mission</button><span class="small">${stage?.text||''}</span>`}
  if(qs.status==='complete')questButtons=`<span class="good">Personal mission complete — ${q.reward}</span>`;
  if(qs.status==='locked')questButtons=`<span class="small">Locked: reach Trusted (+10 approval) and progress to the Cipher Core decision.</span>`;
  $('crewStoryPanel').innerHTML=`<div class="row"><div><b>${c.name} — ${tier.label}</b><div class="small">${p.lastLine||crewDialogueLine(c.id)}</div></div><span class="pill">${q.name}</span></div>
    <div class="pills" style="margin-top:9px"><button class="btn" id="talkPast">Ask about the past</button><button class="btn" id="talkCipher">Discuss the Cipher Core</button><button class="btn" id="talkEncourage">Encourage them</button></div>
    <hr><b>Personal mission: ${q.name}</b><div class="small" style="margin:5px 0 8px">${q.summary}</div><div class="pills">${questButtons}</div>
    ${S.crewQuestLog.length?`<div class="tiny" style="margin-top:10px"><b>Recent companion story:</b> ${S.crewQuestLog.slice(0,3).join(' · ')}</div>`:''}`;
  $('talkPast').onclick=()=>crewTalkTopic(c.id,'past');$('talkCipher').onclick=()=>crewTalkTopic(c.id,'cipher');$('talkEncourage').onclick=()=>crewTalkTopic(c.id,'encourage');
  if($('startCompQuest'))$('startCompQuest').onclick=()=>startCrewQuest(c.id);if($('continueCompQuest'))$('continueCompQuest').onclick=()=>runCrewQuest(c.id)
}
function renderAdventureDestiny(){
  ensurePhase8State();
  if($('advLightDestiny'))$('advLightDestiny').textContent=S.destiny.light;
  if($('advDarkDestiny'))$('advDarkDestiny').textContent=S.destiny.dark;
  if($('advDestinyStatus'))$('advDestinyStatus').textContent=`Queued: ${S.destinyPending.allyUpgrade?'ally upgrade ':''}${S.destinyPending.npcDifficulty?'NPC difficulty ':''}${!S.destinyPending.allyUpgrade&&!S.destinyPending.npcDifficulty?'none':''}`;
  if($('advDestinyAlly'))$('advDestinyAlly').disabled=S.destiny.light<1||!!S.destinyPending.allyUpgrade;
  if($('advDestinyNpc'))$('advDestinyNpc').disabled=S.destiny.light<1||!!S.destinyPending.npcDifficulty
}
function renderCombatDestiny(){
  if(!$('combatDestiny')||!S.combat)return;ensurePhase8State();
  $('combatDestiny').innerHTML=`<div class="row"><div><b>Destiny</b><div class="tiny">Light ${S.destiny.light} · Dark ${S.destiny.dark} · held L${S.destinyHeld.light}/D${S.destinyHeld.dark}</div></div><div class="pills"><button id="combatDestinyAllyBtn" class="btn" ${S.destiny.light<1||S.destinyPending.allyUpgrade?'disabled':''}>Light: upgrade allied check</button><button id="combatDestinyNpcBtn" class="btn" ${S.destiny.light<1||S.destinyPending.npcDifficulty?'disabled':''}>Light: raise stakes</button></div></div>`;
  if($('combatDestinyAllyBtn'))$('combatDestinyAllyBtn').onclick=()=>reserveLightDestiny('allyUpgrade');
  if($('combatDestinyNpcBtn'))$('combatDestinyNpcBtn').onclick=()=>reserveLightDestiny('npcDifficulty')
}


function updateCraftPreview(){
  if(!$('craftPreview'))return;ensurePhase12State();let t=CRAFT_TEMPLATES[$('craftTemplate').value]||Object.values(CRAFT_TEMPLATES)[0];if(!t)return;
  $('craftPreview').innerHTML=`<b>${t.name}</b><br>Materials ${t.materialPrice} cr · rarity ${t.rarity} · Mechanics ${acquisitionLabel(t.diff)} · estimated ${t.time}<div class="tiny" style="margin-top:5px">${t.desc}<br>Materials acquired: ${S.crafting.materials[t.id]?'yes':'no'} · completed: ${S.crafting.crafted[t.id]||0}</div>`;
  $('craftBuyMaterials').disabled=!!S.crafting.materials[t.id]||S.credits<t.materialPrice;$('craftBuild').disabled=!S.crafting.materials[t.id];
  $('workshopStatus').textContent='Crafting architecture follows the source books’ three-step model; these particular practice templates are original placeholders for engine testing.'
}

function buyOrdnance(id){
  ensurePhase12State();let g=ORDNANCE_RESUPPLY[id];if(!g)return;
  if(S.credits<g.price){bLog(`Not enough credits for ${g.label}.`);return}
  S.credits-=g.price;S.ordnance[id]=(S.ordnance[id]||0)+1;
  bLog(`Purchased ${g.label} for ${g.price} credits. Ordnance resupply pricing is a Sable Reach gameplay adaptation.`);
  renderEquipment();safeAutosave()
}

function renderEquipment(){
  if(!$('equipment'))return;ensurePhase12State();ensureInventory();
  $('credits').textContent=S.credits;$('encNow').textContent=currentEnc();$('encMax').textContent=encThreshold();$('stimCount').textContent=S.stimpacks;$('reloadCount').textContent=S.reloads;
  $('encWarning').classList.toggle('hidden',currentEnc()<=encThreshold());$('encWarning').textContent=currentEnc()>encThreshold()?`Over encumbrance threshold by ${currentEnc()-encThreshold()}. Combat and physical checks may suffer penalties.`:'';
  let w=WEAPONS[S.weapon],a=ARMOR[S.armor];
  $('equippedGear').innerHTML=`<div class="item"><div class="tiny">WEAPON</div><b>${w.name}</b><div class="small">${itemSummary(w)}</div></div><div class="item"><div class="tiny">ARMOR</div><b>${a.name}</b><div class="small">${itemSummary(a)}</div></div>`;
  $('inventoryList').innerHTML=(S.inventory||[]).map(id=>{let i=ITEMS[id];if(!i)return'';let eq=(i.type==='weapon'&&S.weapon===id)||(i.type==='armor'&&S.armor===id),owner=assignedCrewForItem(id);return`<div class="item"><div class="row"><div><b>${i.name}</b>${owner?` <span class="tag">${owner.name}</span>`:''}<div class="small">${itemSummary(i)}</div><div class="tiny">${i.source||''}</div></div>${i.type!=='gear'?`<button class="btn" data-equip="${id}" ${eq||owner?'disabled':''}>${eq?'Equipped':owner?'Assigned':'Equip'}</button>`:''}</div></div>`}).join('')+`<div class="item"><b>Consumables</b><div class="small">Stimpacks ×${S.stimpacks} · Extra Reloads ×${S.reloads}<br>Frag Grenades ×${S.ordnance.frag||0} · Stun Grenades ×${S.ordnance.stun||0} · Mini Thermal Detonators ×${S.ordnance.miniThermal||0}</div><div class="pills" style="margin-top:8px">${Object.entries(ORDNANCE_RESUPPLY).map(([id,g])=>`<button class="btn" data-ord-buy="${id}" ${S.credits<g.price?'disabled':''}>Buy ${g.label} · ${g.price} cr</button>`).join('')}</div><div class="tiny" style="margin-top:6px">Grenade combat profiles are source-grounded; these Sable Reach resupply prices are game-balance values.</div></div>`+(S.crafting.crafted.utilityRig?`<div class="item"><b>Crafted Utility Rig ×${S.crafting.crafted.utilityRig}</b><div class="small">One Boost on a repair check when ready.</div></div>`:'')+(S.crafting.crafted.fieldPadding?`<div class="item"><b>Crafted Field Padding ×${S.crafting.crafted.fieldPadding}</b><div class="small">Prototype effect: carried encumbrance reduced by 1.</div></div>`:'');
  document.querySelectorAll('[data-equip]').forEach(b=>b.onclick=()=>equipItem(b.dataset.equip));document.querySelectorAll('[data-ord-buy]').forEach(b=>b.onclick=()=>buyOrdnance(b.dataset.ordBuy));

  let filter=$('shopFilter')?.value||'all',shopQ=($('shopSearch')?.value||'').trim().toLowerCase(),list=Object.values(ITEMS).filter(i=>(filter==='all'||i.type===filter)&&(!shopQ||`${i.name} ${i.source||''} ${i.skill||''} ${JSON.stringify(i.qualities||{})}`.toLowerCase().includes(shopQ)));
  $('shopList').innerHTML=list.map(i=>{let ap=acquisitionProfile(i.rarity),skill=i.restricted?'Streetwise':'Negotiation',owned=i.id!=='stimpack'&&i.id!=='extraReload'&&S.inventory.includes(i.id);return`<div class="item"><div class="row"><div><b>${i.name}</b><div class="small">${itemSummary(i)}</div><div class="tiny">${i.price.toLocaleString()} cr · base Rarity ${i.rarity??0}${i.restricted?' · Restricted':''} · Sable Reach effective Rarity ${ap.effective} (+${ap.modifier}) · ${skill} ${acquisitionLabel(ap.diff)}${ap.upgrade?` + ${ap.upgrade} upgrade(s)`:''} · ${i.source||''}</div></div><button class="btn" data-buy="${i.id}" ${S.credits<i.price||owned?'disabled':''}>${owned?'Owned':'Locate & Buy'}</button></div></div>`}).join('');
  document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>attemptPurchase(b.dataset.buy));

  let modItems=(S.inventory||[]).filter(id=>['weapon','armor'].includes(ITEMS[id]?.type));
  $('attachmentItem').innerHTML=modItems.map(id=>`<option value="${id}">${ITEMS[id].name}</option>`).join('');
  if(modItems.length){
    let iid=$('attachmentItem').value||modItems[0],item=ITEMS[iid],installed=attachmentsFor(iid);
    $('attachmentStatus').innerHTML=`<b>${item.name}</b> · hard points ${attachmentUsedHP(iid)}/${item.hp||0}<br><span class="tiny">Installed: ${installed.length?installed.map(x=>ATTACHMENTS[x].name).join(', '):'none'}</span>`;
    let compatible=Object.values(ATTACHMENTS).filter(a=>compatibleAttachment(a,item));
    $('attachmentList').innerHTML=compatible.map(a=>{let on=installed.includes(a.id),can=attachmentFreeHP(iid)>=a.hp;return`<div class="item"><div class="row"><div><b>${a.name}</b><div class="small">${a.desc}</div><div class="tiny">${a.hp} HP · ${a.price.toLocaleString()} cr · Rarity ${a.rarity}${a.restricted?' · Restricted':''} · ${a.source}</div></div><button class="btn" data-att="${a.id}" ${!on&&!can?'disabled':''}>${on?'Remove':'Source & Install'}</button></div></div>`}).join('')||'<div class="small">No compatible attachments in the current database.</div>';
    document.querySelectorAll('[data-att]').forEach(b=>b.onclick=()=>installed.includes(b.dataset.att)?removeAttachment(b.dataset.att):installAttachment(b.dataset.att))
  }else{$('attachmentStatus').textContent='Acquire a weapon or armor item first.';$('attachmentList').innerHTML=''}
  $('attachmentItem').onchange=renderEquipment;

  $('craftTemplate').innerHTML=Object.values(CRAFT_TEMPLATES).map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  updateCraftPreview()
}
function useStimpack(){
  let C=S.combat,T=C?.turn;if(!C||!T||S.stimpacks<=0)return;let id=T.actorId,name=actorById(id)?.name||id;
  if(!spendManeuver(1,'Use Stimpack'))return;
  let heal=Math.max(0,5-S.stimUses)+(id==='pc'?talentRank('Stimpack Specialization'):0);S.stimpacks--;S.stimUses++;
  let before=actorState(id).wounds;actorHealWounds(id,heal);cLog(`${name} uses a stimpack and heals ${before-actorState(id).wounds} wounds (${heal} maximum this use).`);renderCombat();renderRecovery()
}

/* Phase 17: character advancement, dice pools, Force and talent engine. */
function careerMeta(){return CAREERS[S.career]}
function careerPickCap(){return careerMeta().careerPicks||4}
function isForceCareer(){return !!careerMeta().forceStart}
function formTechniqueCharacteristic(){
  if(hasTalent('Niman Technique'))return 'Willpower';
  if(hasTalent('Soresu Technique'))return 'Intellect';
  if(hasTalent('Makashi Technique'))return 'Presence';
  if(hasTalent('Ataru Technique'))return 'Agility';
  if(hasTalent('Shien Technique'))return 'Cunning';
  return 'Brawn'
}
function skillCharacteristic(actor,skill,ctx={}){
  if(actor.id==='pc'&&ctx.useWillpower)return 'Willpower';
  if(actor.id==='pc'&&ctx.usePresence)return 'Presence';
  if(actor.id==='pc'&&ctx.useCunning)return 'Cunning';
  if(actor.id==='pc'&&skill==='Lightsaber')return formTechniqueCharacteristic();
  return SKILL_CHAR[skill]
}
function bLog(x){S.buildLog.unshift(x);renderLogs()}function gLog(x){S.gameLog.unshift(x);renderLogs()}
function tree(){return treeForSpec(S.spec)}
function universalTree(name){return UNIVERSAL_TREES[name]||[]}
function ownedUniversalNodes(){
  let out=[];
  for(const spec of S.universalSpecs){
    const set=S.universalTalents[spec]||new Set();
    for(const n of universalTree(spec)) if(set.has(n.id)) out.push(n);
  }
  return out;
}

const TALENT_BLURBS={
'Toughened':'Raises your wound threshold by 2 per rank, letting you stay on your feet longer.',
'Grit':'Raises your strain threshold by 1 per rank, giving you more room for extra maneuvers and strain-powered abilities.',
'Parry':'When a close-combat hit lands and you have an appropriate weapon ready, suffer 3 strain to reduce the damage by 2 plus your Parry ranks.',
'Reflect':'When a ranged hit lands while you are wielding a lightsaber, suffer 3 strain to reduce the damage by 2 plus your Reflect ranks.',
'Quick Strike':'Adds a Boost die when attacking a target that has not acted yet in the encounter.',
'Rapid Reaction':'At initiative, you may suffer strain up to your ranks to add that many automatic successes to your initiative result.',
'Stalker':'Adds Boost dice to Stealth and Coordination checks based on ranks.',
'Convincing Demeanor':'Removes Setback dice from Deception and Skulduggery checks.',
'Bypass Security':'Removes Setback dice from checks to bypass locks and security devices.',
'Codebreaker':'Improves codebreaking and decryption by removing Setback dice and reducing difficulty in the situations it applies to.',
'Natural Programmer':'Once per session, reroll a Computers or Astrogation check.',
'Natural Charmer':'Once per session, reroll a Charm or Deception check.',
'Resolve':'Reduces involuntary strain suffered from effects by 1 per rank, to a minimum of 1.',
'Precise Aim':'Spend strain before an attack to reduce the target’s defense for that attack.',
'Lethal Blows':'Adds +10 per rank to Critical Injury rolls you inflict, making critical hits more severe.',
'Durable':'Subtracts 10 per rank from Critical Injury rolls you suffer.',
'Side Step':'As a maneuver, suffer strain up to your ranks to upgrade incoming ranged attacks until your next turn.',
'Defensive Stance':'As a maneuver, suffer strain up to your ranks to upgrade incoming melee attacks until your next turn.',
'Second Wind':'Once per encounter, recover strain equal to your ranks.',
'Conditioned':'Removes Setback dice from Athletics and Coordination checks. Its falling-damage benefit is not automated yet.',
"Nobody's Fool":'Upgrades the difficulty of Charm, Coercion, and Deception checks made against you.',
'Insight':'Makes Perception and Discipline career skills.',
'Uncanny Senses':'Adds Boost dice to Perception checks based on ranks.',
'Uncanny Reactions':'Adds Boost dice to Vigilance checks based on ranks.',
'Sleight of Mind':'Adds Boost dice to Stealth checks when concealing yourself from observers through the Force.',
'Sense Emotions':'Adds a Boost die to certain social checks by reading the target through the Force.',
'Street Smarts':'Removes Setback dice from Streetwise and Knowledge (Underworld) checks.',
'Forager':'Reduces environmental Setback dice when searching for food, water, or shelter.',
'Sense Danger':'Once per session, remove up to two Setback dice from one check.',
'Touch of Fate':'Once per session, add two Boost dice to one check.',
'Intense Focus':'Suffer 1 strain before a check to upgrade your ability once.',
'Force of Will':'Once per session, make one skill check using Willpower instead of its normal characteristic.',
'Balance':'At the end of an encounter, roll Force dice and recover strain from usable Force pips.',
'Sixth Sense':'Adds ranged defense.',
'Superior Reflexes':'Adds melee defense.',
'Force Rating':'Permanently increases your Force Rating by 1.',
'Dedication':'Permanently raises one characteristic by 1, subject to the normal maximum.',
'Niman Technique':'Lets Lightsaber checks use Willpower instead of Brawn.',
'Soresu Technique':'Lets Lightsaber checks use Intellect instead of Brawn.',
'Makashi Technique':'Lets Lightsaber checks use Presence instead of Brawn.',
'Ataru Technique':'Lets Lightsaber checks use Agility instead of Brawn.',
'Shien Technique':'Lets Lightsaber checks use Cunning instead of Brawn.',
"Duelist's Training":'Adds a Boost die to Melee or Lightsaber attacks when engaged with only one opponent.',
'Multiple Opponents':'Adds a Boost die to close-combat attacks when engaged with multiple opponents.',
'Quick Draw':'Lets you draw or holster a weapon once per round without spending your maneuver.',
'Jump Up':'Lets you stand from prone as an incidental instead of spending a maneuver.',
'Defensive Training':'Improves your melee defense while wielding an appropriate melee weapon.',
'Resist Disarm':'Lets you spend strain to resist attempts to disarm you or damage your weapon.',
'Feint':'A deceptive close-combat technique that makes an opponent’s response less effective.',
'Indistinguishable':'Makes checks to identify or recognize you more difficult.',
'Overwhelm Emotions':'Lets you roll Force dice with Charm, Coercion, or Deception and apply the Force result to the social check.',
'Invigorate':'A Force-assisted support talent that helps an ally perform a physical task.',
'Armor Master':'Improves the protection gained from worn armor.',
'Jury Rigged':'Improves one chosen item or weapon in a specific way.',
'True Aim':'A stronger form of aiming that both aims and upgrades the attack.',
'Point Blank':'Increases ranged-weapon damage at very close ranges.',
'Brace':'Helps remove environmental Setback dice by bracing yourself.',
'Field Commander':'Lets you direct allies so they can reposition or act more effectively.',
'Hard Headed':'When staggered or disoriented, attempt a Discipline check to shake off the condition; extra ranks reduce the difficulty.',
'Improved Hard Headed':'Extends Hard Headed so it can recover from incapacitation caused by exceeding strain threshold.',
'Confidence':'Improves resistance to fear.',
'Gearhead':'Removes Setback dice from Mechanics checks and reduces attachment-modification costs.',
'Inventor':'Improves construction and attachment-modification checks.',
'Mental Tools':'You always count as having suitable tools available for Mechanics checks.',
'Improved Armor Master':'While wearing armor with soak 2 or more, increase defense by 1.',
'Supreme Armor Master':'Once per round when suffering a Critical Injury, suffer strain to reduce the Critical result based on your soak.',
'Saber Throw':'Make a Force-assisted Lightsaber attack at range and spend Force points to hit and return the weapon.',
'Falling Avalanche':'Suffer strain to add Brawn to one successful Lightsaber hit.',
'Tinkerer':'Permanently add a hard point to a limited number of items.',
'Imbue Item':'Commit Force to temporarily enhance an item while sustaining the effect with strain.',
'Reinforce Item':'Commit Force to temporarily give a weapon or armor the Cortosis quality.',
'Enduring':'Increase soak by 1 per rank.',
'Unstoppable':'If a Critical Injury roll is reduced to 1, ignore that Critical Injury entirely.',
'Improved Toughened':'Once per session, heal wounds equal to your ranks in Toughened.',
'Headbutt':'Once per encounter, suffer 2 wounds to knock an engaged target prone and disorient it.',
'Heroic Fortitude':'Spend Destiny to ignore Critical Injury penalties that affect Brawn or Agility checks until encounter end.',
'Indomitable Will':'Commit Force dice after suffering strain to reduce incoming damage while paying ongoing strain each turn.',
'Power From Pain':'Once per session, spend Destiny to increase Force Rating by your current number of Critical Injuries for the encounter.',
'Inner Peace':'Once per encounter, turn dark Destiny to light and reduce Conflict gained this session.',
'Vaapad Control':'Before a Lightsaber check, suffer strain to downgrade red difficulty dice according to the light Destiny pool.',
'Embrace Your Hate':'After a successful close-combat hit, spend Destiny and gain Conflict to add damage based on the dark Destiny pool.',
'Juyo Savagery':'Adds +5 to Lightsaber Critical Injury rolls for each dark Destiny point in the pool.',
'Iron Body':'Removes Setback from Coordination and Resilience and lowers the Critical rating of unarmed attacks.',
'Martial Grace':'Once per round, suffer 2 strain to add Coordination ranks to one successful Brawl hit.',
"Acklay's Scything Strike":'Unarmed Brawl attacks gain Pierce equal to Force Rating.',
'Unarmed Parry':'Allows Parry while fighting unarmed and reduces its strain cost.',
'Precision Strike':'When inflicting certain close-combat Critical Injuries, suffer strain to choose an easier result.',
'Improved Precision Strike':'Extends Precision Strike to Average Critical Injury results once per round.',
'Sapith Sundering':'Add Force dice to Brawl attacks; the attack gains Sunder and Force results can help activate it.',
'Swift':'Ignore extra movement cost from difficult terrain.',
'Improved Dodge':'After using Dodge, reposition after the triggering attack.',
'Far Strike':'Make a Force-assisted Brawl attack at range, spending Force results to reach farther targets.',
'Surgeon':'Successful Medicine checks to treat wounds heal +1 wound per rank.',
'Physician':'Successful Medicine checks to treat wounds also restore +1 strain per rank.',
'Rapid Recovery':'Recover +1 additional strain per rank when recovering strain after an encounter.',
'Natural Doctor':'Once per session, reroll one Medicine check.',
'Knowledgeable Healing':'Spend Destiny while healing an ally to increase wounds healed using Knowledge (Xenology).',
'Kill with Kindness':'Remove one Setback per rank from Charm and Leadership checks.',
'Researcher':'Remove one Setback per rank from Knowledge checks; research also takes less time.',
'Smooth Talker':'A chosen social skill can convert Triumph into extra success based on ranks.',
'Knowledge Specialization':'A chosen Knowledge skill can convert Triumph into extra success based on ranks.',
'Valuable Facts':'Once per encounter, a successful Knowledge action can improve an ally’s later check.',
'One with the Universe':'Meditate once per session to influence the next encounter’s Force results.',
'Preemptive Avoidance':'Spend Destiny to disengage from an engaged enemy out of turn.',
'The Force Is My Ally':'Once per session, suffer strain to perform a Force-power action as a maneuver.',
'Natural Negotiator':'Once per session, reroll one Cool or Negotiation check.',
'Command':'Adds Boost dice to Leadership checks based on ranks.',
'Commanding Presence':'Removes Setback dice from Leadership and Cool checks.',
'Enhanced Leader':'Adds Force dice to Leadership and converts Force results into success or advantage.',
'Field Commander':'Leadership action lets allies immediately perform free maneuvers by suffering strain.',
'Improved Field Commander':'Improves Field Commander, increasing its reach and allowing stronger results.',
'Steely Nerves':'Spend Destiny to ignore Critical Injury penalties affecting Willpower or Presence checks for an encounter.',
'Natural Leader':'Once per session, reroll one Cool or Leadership check.',
'Body Guard':'Spend strain as a maneuver to upgrade attacks against an engaged ally you are protecting.',
'Stimpack Specialization':'Stimpacks heal +1 wound per rank.',
'Force Protection':'Commit Force dice and sustain strain to increase soak.',
'Heightened Awareness':'Nearby allies improve Perception and Vigilance checks.',
'Circle of Shelter':'Use Parry or Reflect to reduce damage suffered by an engaged ally.',
'Improved Body Guard':'Once per session, take a hit intended for an ally protected by Body Guard.',
'Know Somebody':'Once per session, reduce the rarity of a legal item you are trying to purchase.',
'Knowledge Is Power':'Once per session, use Force Rating as Knowledge (Lore) ranks for a check.',
'Contingency Plan':'Spend Destiny to recover strain equal to Cunning.',
'Sense Advantage':'Once per session, impose two Setback dice on an NPC skill check.',
'Expert Tracker':'Removes Setback from tracking checks and reduces tracking time.',
'Keen Eyed':'Removes Setback from Perception and Vigilance checks and speeds searches.',
'Forewarning':'Use the Force to grant nearby allies temporary defense.',
'Natural Mystic':'Once per session, reroll one Force-power check.',
'Hunter':'Adds Boost when dealing with beasts and improves Critical Injury rolls against them.',
'Natural Hunter':'Once per session, reroll one Perception or Vigilance check.',
'Soft Spot':'Spend Destiny after a successful hit to add Cunning to damage.',
'Intuitive Shot':'Add Force dice to ranged attacks and spend Force results for success or advantage.',
'Outdoorsman':'Removes environmental Setback and reduces overland travel time.',
'Animal Empathy':'Add Force dice to checks to handle or tame animals.',
'Animal Bond':'Forms a persistent Force bond with a suitable animal companion.',
'Mental Bond':'Commit Force to communicate with and sense through a bonded animal.',
'Quick Movement':'Spend strain and Force results to gain extra movement after an action.',
'Share Pain':'Redirect part of a bonded animal’s wounds to yourself.',
'Natural Outdoorsman':'Once per session, reroll one Resilience or Survival check.',
'Solid Repairs':'Successful vehicle/starship repair checks restore +1 hull trauma per rank.',
'Known Schematic':'Once per session, use Knowledge (Education) to establish useful familiarity with a building or ship design.',
'Familiar Suns':'Once per session, use Knowledge (Outer Rim) to establish useful information about the current environment.',
'Master Starhopper':'Spend strain to reduce the difficulty of an Astrogation check.',
'Fire Control':'Coordinate vehicle fire so attacks from the current craft treat the target as a larger silhouette.',
'Situational Awareness':'Nearby allies receive Boost dice to Perception and Vigilance while operating around your vehicle.',
'Form On Me!':'Nearby allied pilots can share the benefits of your Gain the Advantage action.',
'Master Leader':'Spend strain to reduce the difficulty of your next Leadership check.',
'Brilliant Evasion':'Once per encounter, an opposed Piloting check can prevent one opponent from attacking you for several rounds.',
'Master Pilot':'Once per round while piloting a starship, suffer strain to perform an action as a maneuver.',
'Natural Pilot':'Once per session, reroll one Piloting (Space) or Gunnery check.',
'Fine Tuning':'Successful vehicle/starship repair checks restore +1 system strain per rank.',
'Technical Aptitude':'Computer-related tasks take less time.',
'Natural Tinkerer':'Once per session, reroll one Mechanics check.',
'Defensive Slicing':'Makes hostile Computers checks against systems you defend more difficult.',
'Mental Fortress':'Spend Destiny to ignore certain mental Critical Injury effects for the encounter.',
'Master Artisan':'Suffer strain to reduce the difficulty of the next Mechanics check.',
'Intuitive Improvements':'Add Force dice to crafting or repair checks to improve item hard points.',
'Well Rounded':'Choose two skills and permanently make them career skills.',
'Shroud':'Spend Destiny to conceal yourself from Force detection and mask your Force use for the encounter.',
'Slippery Minded':'Use Deception to immediately end an ongoing Force effect on yourself.',
'Now You See Me':'Once per session, Deception can make nearby NPCs forget the character.',
'Anatomy Lessons':'Spend Destiny after a successful hit to add Intellect to damage.',
'Fearsome':'Enemies that become engaged may be forced to make a fear check.',
'Prey on the Weak':'Add +1 damage per rank when hitting a disoriented target.',
'Terrify':'Force-assisted Coercion can disorient and immobilize a target.',
'Improved Terrify':'Terrify becomes easier and can stagger a target with Triumph.',
'Crippling Blow':'Make the next combat check harder; a successful hit causes a lingering movement penalty.',
'Against All Odds':'When incapacitated, attempt a Force-assisted Resilience check to return to the fight.',
'Skilled Jockey':'Removes Setback dice from Piloting (Planetary) and Piloting (Space) checks.',
'Galaxy Mapper':'Removes Setback from Astrogation checks and speeds route calculation.',
'Full Throttle':'Hard Piloting action can temporarily increase a vehicle’s top speed.',
'Exhaust Port':'Spend Destiny before a vehicle attack to ignore a target-size protection effect.',
'Intuitive Strike':'Add Force dice to planetary-scale weapon attacks and convert Force results into success or advantage.',
'Tricky Target':'Treat the piloted craft as effectively smaller when enemies attack it.',
'Hard-Boiled':'When recovering strain after an encounter, Advantage can also heal wounds, up to ranks in Hard-Boiled.',
'Good Cop':'Advantage on Charm or Negotiation can improve an ally’s next social check against the same target.',
'Bought Info':'Spend credits to make an applicable Knowledge check easier.',
'Improved Street Smarts':'Once per session, use Streetwise or Knowledge (Underworld) to uncover a vital clue.',
'Informant':'Once per session, establish a useful contact who can provide information about a chosen subject.',
'Reconstruct the Scene':'A difficult Perception action can reveal physical details about someone recently present at a scene.',
'Shortcut':'Adds Boost dice to chase checks made to catch or escape another participant.',
'Overwhelm Defenses':'After a failed vehicle-weapon attack, spend Advantage to reduce defense in the targeted zone.',
'Planet Mapper':'Removes navigation Setback on planetary Streetwise or Survival checks and speeds travel.',
'All-Terrain Driver':'Ignore normal piloting penalties caused by difficult terrain.',
'Offensive Driving':'Suffer system strain to make an opposing vehicle’s next Piloting check harder.',
"Let's Ride":'Once per round, mount, dismount, or enter a cockpit or weapon station as an incidental.',
'Improved Shortcut':'In a chase or race, suffer strain to add automatic successes based on Shortcut ranks.',
'Debilitating Shot':'Spend Advantage on a successful vehicle attack to reduce the target’s maximum speed temporarily.',
'Hindering Shot':'Make a Gunnery attack harder; a hit makes movement inflict system strain on the target.',
'Inspiring Rhetoric':'Leadership action lets nearby allies recover strain.',
'Improved Inspiring Rhetoric':'Allies helped by Inspiring Rhetoric also gain temporary Boost dice.',
'Congenial':'Suffer strain to downgrade the difficulty of Charm or Negotiation checks, or upgrade hostile versions targeting you.',
'Disarming Smile':'An opposed Charm action can lower a target’s defenses for the encounter.',
'Works Like a Charm':'Once per session, make one skill check using Presence instead of its normal characteristic.',
'Just Kidding!':'Spend Destiny to cancel a Despair generated on a nearby allied social check.',
'Intense Presence':'Spend a Destiny Point to recover strain equal to Presence.',
"Don't Shoot!":'Once per session, a difficult Charm action can prevent enemies from targeting you until you attack.',
'Up the Ante':'Increase gambling winnings by 10% per rank.',
'Second Chances':'Once per encounter, reroll a number of positive dice up to ranks in Second Chances.',
'Fortune Favors the Bold':'Once per session, suffer 2 strain to flip one dark Destiny Point to light.',
'Natural Rogue':'Once per session, reroll one Skulduggery or Stealth check.',
'Clever Solution':'Once per session, make one skill check using Cunning instead of its normal characteristic.',
'Double or Nothing':'Suffer strain and increase a check’s difficulty to double remaining positive narrative symbols.',
'Improved Double or Nothing':'Double or Nothing also doubles remaining successes.',
'Supreme Double or Nothing':'Double or Nothing also doubles remaining Triumph and Despair.',
'Improved Quick Draw':'Quick Draw may be used twice in the same round.',
"Call 'Em":'Ignore the normal called-shot penalty when using Aim to target a specific location.',
'Sorry About the Mess':'Against a target that has not acted yet, reduce the weapon’s Critical rating by 1, minimum 1.',
'Guns Blazing':'Suffer strain to avoid the normal difficulty increase when attacking with two Ranged (Light) weapons.',
'Spitfire':'With two pistols, additional hits can be assigned to other legal targets.',
'Natural Marksman':'Once per session, reroll one Ranged (Light) or Ranged (Heavy) check.',
'Deadly Accuracy':'Choose one combat skill; successful attacks with it add that skill’s ranks to one hit.',
'Grapple':'Once per round, make it harder for engaged opponents to disengage.',
'Overbalance':'Certain negative combat results from an engaged opponent can briefly stagger that opponent.',
'Mind Over Matter':'Spend Destiny to recover strain based on Willpower.',
'Coordination Dodge':'Spend Destiny when targeted by an attack to add failures based on Coordination.',
'Natural Brawler':'Once per session, reroll one Brawl or Melee check.',
'Supreme Precision Strike':'Once per session, suffer strain to select a harder Critical Injury result on an unarmed hit.',
'Cyberneticist':'Removes Setback from cybernetic construction/repair/installation checks and lowers cybernetic purchase costs.',
'More Machine than Man':'Increases the maximum number of cybernetic implants the character can support.',
'Engineered Redundancies':'Allows emergency repair patches and Mechanics treatment to help a heavily cybernetic character.',
'Eye for Detail':'After a Mechanics or Computers check, suffer strain to convert successes into advantages.',
'Energy Transfer':'Suffer strain to power an unpowered device or replenish a depleted energy source.',
'Overcharge':'Once per encounter, use Mechanics to temporarily enhance an installed cybernetic.',
'Improved Overcharge':'Successful Overcharge checks can spend favorable results to act again immediately.',
'Supreme Overcharge':'Extends Overcharge to multiple installed cybernetics, with a risk of shorting one out.',
'Utility Belt':'Spend Destiny to produce a plausible undocumented item from a tool belt or satchel.',
'Machine Mender':'Mechanics checks used to repair a droid heal +1 wound per rank.',
'Hidden Storage':'Adds concealed storage capacity to a vehicle or item.',
'Speaks Binary':'Improves NPC droid checks when the character directs them.',
'Deft Maker':'Removes Setback from droid construction/repair/modification and reduces material costs.',
'Supreme Speaks Binary':'Once per encounter, temporarily let directed NPC droids use one of the character’s skill ranks.',
'Improved Speaks Binary':'Directed NPC droids gain an additional Boost die.',
'Redundant Systems':'Once per session, cannibalize a working device to repair a broken one.',
'Reroute Processors':'Once per encounter, use Computers to move one point between two droid characteristics.',
'Signature Vehicle':'Designates one craft as the character’s signature vehicle and improves Mechanics work on it.',
'Fancy Paint Job':'Improves social checks made in the presence of the signature vehicle.',
'Larger Project':'Raises the silhouette limit for the character’s signature vehicle.',
'Resourceful Refit':'Use Mechanics to salvage an old attachment into a replacement at reduced cost.',
'Custom Loadout':'Adds additional hard points to the signature vehicle.',
'Powerful Blast':'Adds +1 damage per rank whenever the Blast quality is activated.',
'Selective Detonation':'Spend Advantage when using explosives to exclude targets from a blast, up to ranks.',
'Steady Nerves':'Removes Setback from Cool and Skulduggery checks.',
'Time to Go':'Spend Destiny out of turn to move into cover or escape an imminent blast.',
'Improved Time to Go':'Time to Go can also move one engaged ally.',
'Improvised Detonation':'Build an explosive from available materials during an encounter.',
'Improved Improvised Detonation':'Makes Improvised Detonation easier and more damaging.',
'Master Grenadier':'Improves the efficiency of grenade and explosive special qualities.',
'Natural Enforcer':'Once per session, reroll one Coercion or Streetwise check.',
'Stunning Blow':'Melee attacks may deal strain instead of wounds; soak still applies.',
'Talk the Talk':'Spend Destiny on a Knowledge check to substitute Streetwise or Knowledge (Underworld).',
'Loom':'An engaged ally’s successful social check gains Advantage based on your Coercion ranks.',
'Walk the Walk':'Spend Destiny on a successful Brawl hit to add Streetwise ranks to damage.',
'Black Market Contacts':'Reduce the rarity of illicit or exotic purchases at the cost of a higher purchase price.',
'Burly':'Reduces the Encumbrance and Cumbersome rating of carried weapons.',
'Barrage':'Adds damage to Ranged (Heavy) or Gunnery hits made at Long or Extreme range.',
'Spare Clip':'Prevents ranged weapons from running out of ammunition because of Despair.',
'Rain of Death':'A maneuver that lets Auto-Fire avoid its normal difficulty increase for the turn.',
'Heroic Resilience':'Once per encounter, temporarily increase soak based on Resilience.',
'Heavy Hitter':'Once per session, spend Triumph on a successful Ranged (Heavy) or Gunnery attack to add Breach 1.',
'Physical Training':'Adds Boost dice to Athletics and Resilience checks per rank.',
'Encouraging Words':'After a nearby ally fails, suffer strain to set up a better follow-up attempt.',
'Master Instructor':'Temporarily lets an ally benefit from the instructor’s Discipline expertise.',
'Natural Instructor':'Once per session, reroll one Discipline or Leadership check.',
"That's How It's Done":'After a successful demonstration, suffer strain to give a nearby ally a Boost on the same skill.',
'Calm Commander':'Uses Cool expertise in place of Leadership expertise for mass-combat checks.',
'Positive Spin':'Increases Duty gains by an additional point per rank when Duty rises.',
'Improved Confidence':'Leverages a successful fear response to steady nearby allies facing the same threat.',
'Improved Commanding Presence':'Once per session, turn Commanding Presence into an opposed social action that can drive a target from the scene.',
'Ready for Anything':'Removes Setback from mass-combat and initiative checks.',
'Clever Commander':'Uses Knowledge (Warfare) expertise in place of Leadership expertise for mass-combat checks.',
'Well Read':'Choose three Knowledge skills and make them career skills.',
'Master Strategist':'Once per mass-combat phase, suffer strain to reduce the difficulty of a mass-combat check.',
'Improved Researcher':'Successful research can improve allies’ next checks when acting on those facts.',
'Coordinated Assault':'Direct nearby allies so their attacks gain Advantage based on Leadership.',
'Thorough Assessment':'Once per session, a hard Knowledge check can create shared Boost dice for the encounter.',
'Careful Planning':'Once per session, establish a plausible prepared fact in the narrative.',
'Improved Ready for Anything':'Triumph on initiative can generate additional successes based on ranks.',
'Beast Wrangler':'Adds Boost dice when taming or wrangling creatures.',
'Expert Handler':'Removes Setback from Survival checks made while riding beasts.',
'Spur':'Use Survival to push a mount to greater speed at the cost of strain.',
'Improved Spur':'Makes Spur faster and easier by accepting personal strain.',
'Supreme Spur':'Reduces the strain a mount suffers while Spur remains active.',
'Soothing Tone':'Use Knowledge (Xenology) to help a beast recover strain.',
'High-G Training':'Transfer some vehicle system strain to the pilot as personal strain.',
'Dead to Rights':'Spend Destiny before a vehicle-weapon attack to add Agility-based damage.',
'Improved Dead to Rights':'Improves the Agility-based damage bonus from Dead to Rights.',
'Corellian Sendoff':'Use Cool to force nearby vehicles into a collision.',
'Improved Corellian Sendoff':'Upgrades the collision caused by Corellian Sendoff.',
'Koiogran Turn':'Use a maneuver to remove an opponent’s gained-advantage position.',
'Showboat':'Trade strain for stronger narrative results on vehicle or starship checks.',
'Overstocked Ammo':'Raises Limited Ammo on weapons mounted to a signature vehicle.',
'Tuned Maneuvering Thrusters':'Raises the handling of the signature vehicle.',
'Bolstered Armor':'Raises the armor of the signature vehicle.',
'Customized Cooling Unit':'Raises the signature vehicle’s system-strain threshold.',
'Fortified Vacuum Seal':'Raises the signature vehicle’s hull-trauma threshold.',
'Not Today':'Once per session, spend Destiny to keep the signature vehicle from being destroyed.',
'Reinforced Frame':'Gives the signature vehicle Massive 1, making severe Critical Hits harder to trigger.',
'Mastery':'A high-tier specialization benefit. The exact effect depends on the completed source tree.'
};
function talentBlurb(name,base){
  return TALENT_BLURBS[name]||base||'This talent is part of the specialization tree. Its complete effect is still being wired into the game.';
}
function talentEngineStatus(name){
  const wired=new Set([
    'Toughened','Grit','Parry','Reflect','Quick Strike','Rapid Reaction','Stalker',
    'Convincing Demeanor','Bypass Security','Codebreaker','Natural Programmer',
    'Natural Charmer','Resolve','Precise Aim','Lethal Blows','Durable','Side Step',
    'Defensive Stance','Second Wind','Conditioned','Insight','Uncanny Senses',
    'Uncanny Reactions','Sleight of Mind','Sense Emotions','Street Smarts','Forager',
    'Sense Danger','Touch of Fate','Intense Focus','Force of Will','Balance',
    'Sixth Sense','Superior Reflexes','Force Rating','Dedication','Niman Technique',
    'Soresu Technique','Makashi Technique','Ataru Technique','Shien Technique',
    "Duelist's Training",'Multiple Opponents','Armor Master','Improved Armor Master',
    'Supreme Armor Master','Saber Throw','Falling Avalanche','Enduring','Unstoppable',
    'Improved Toughened','Headbutt','Heroic Fortitude','Indomitable Will','Power From Pain',
    'Inner Peace','Vaapad Control','Embrace Your Hate','Juyo Savagery','Iron Body',
    'Martial Grace',"Acklay's Scything Strike",'Unarmed Parry','Far Strike','Hard Headed','Precision Strike','Improved Precision Strike',
    'Surgeon','Physician','Rapid Recovery','Natural Doctor','Kill with Kindness','Researcher',
    'Command','Commanding Presence','Natural Negotiator','Natural Leader','Natural Hunter',
    'Natural Outdoorsman','Natural Tinkerer','Plausible Deniability','Keen Eyed','Expert Tracker',
    'Stimpack Specialization','Hunter','Prey on the Weak','Skilled Jockey','Galaxy Mapper','Enhanced Leader',
    'Solid Repairs','Fine Tuning','Intuitive Strike','Natural Brawler','Natural Rogue',
    'Natural Marksman','Works Like a Charm','Clever Solution','Congenial','Hard-Boiled',
    'Sorry About the Mess','Deadly Accuracy','Fortune Favors the Bold','Intense Presence',
    'Eye for Detail','Steady Nerves','Natural Enforcer','Powerful Blast','Barrage','Spare Clip','Black Market Contacts',
    'Sound Investments','Natural Merchant','Natural Athlete','Natural Driver','Natural Instructor','Natural Pilot','Point Blank','Bring It Down'
  ]);
  const partial=new Set([
    'Gearhead','Inventor','Tinkerer','Mental Tools','Comprehend Technology','Imbue Item',
    'Reinforce Item','Improved Hard Headed',
    'Sapith Sundering','Improved Dodge','Swift','Intimidating','Knowledgeable Healing',
    'Smooth Talker','Knowledge Specialization','Valuable Facts','One with the Universe',
    'Preemptive Avoidance','The Force Is My Ally','Field Commander',
    'Improved Field Commander','Steely Nerves','Body Guard','Force Protection','Heightened Awareness',
    'Circle of Shelter','Improved Body Guard','Know Somebody','Knowledge Is Power','Contingency Plan',
    'Sense Advantage','Forewarning','Natural Mystic','Soft Spot','Intuitive Shot','Outdoorsman',
    'Animal Empathy','Animal Bond','Mental Bond','Quick Movement','Share Pain','Technical Aptitude',
    'Defensive Slicing','Mental Fortress','Master Artisan','Intuitive Improvements','Well Rounded',
    'Shroud','Slippery Minded','Now You See Me','Anatomy Lessons','Fearsome','Terrify',
    'Improved Terrify','Crippling Blow','Against All Odds','Full Throttle','Exhaust Port','Tricky Target',
    'Good Cop','Bought Info','Improved Street Smarts','Informant','Reconstruct the Scene','Shortcut',
    'Overwhelm Defenses','Planet Mapper','All-Terrain Driver','Offensive Driving',"Let's Ride",
    'Improved Shortcut','Debilitating Shot','Hindering Shot','Inspiring Rhetoric',
    'Improved Inspiring Rhetoric','Disarming Smile','Just Kidding!',"Don't Shoot!",'Up the Ante',
    'Second Chances','Double or Nothing','Improved Double or Nothing','Supreme Double or Nothing',
    'Improved Quick Draw',"Call 'Em",'Guns Blazing','Spitfire','Grapple','Overbalance',
    'Mind Over Matter','Coordination Dodge','Supreme Precision Strike','Cyberneticist','More Machine than Man',
    'Engineered Redundancies','Energy Transfer','Overcharge','Improved Overcharge','Supreme Overcharge','Utility Belt',
    'Machine Mender','Hidden Storage','Speaks Binary','Deft Maker','Supreme Speaks Binary','Improved Speaks Binary',
    'Redundant Systems','Reroute Processors','Signature Vehicle','Fancy Paint Job','Larger Project','Resourceful Refit',
    'Custom Loadout','Selective Detonation','Time to Go','Improved Time to Go','Improvised Detonation',
    'Improved Improvised Detonation','Master Grenadier','Stunning Blow','Talk the Talk','Loom','Walk the Walk',
    'Burly','Rain of Death','Heroic Resilience','Heavy Hitter',
    'Wheel and Deal','Greased Palms','Throwing Credits','Master Merchant','Unrelenting Skeptic','Improved Unrelenting Skeptic',
    'Distracting Behavior','Improved Distracting Behavior','Biggest Fan','Deceptive Taunt','Coordination Dodge','Respected Scholar','Pin','Museum Worthy',
    "Hunter's Quarry","Improved Hunter's Quarry",'Heightened Awareness','Defensive Driving','Full Stop','Master Driver',
    'Physical Training','Encouraging Words','Master Instructor',"That's How It's Done",'Calm Commander','Positive Spin','Improved Confidence','Improved Commanding Presence',
    'Ready for Anything','Clever Commander','Well Read','Master Strategist','Improved Researcher','Coordinated Assault','Thorough Assessment','Careful Planning','Improved Ready for Anything',
    'Beast Wrangler','Expert Handler','Spur','Improved Spur','Supreme Spur','Soothing Tone','High-G Training','Dead to Rights','Improved Dead to Rights','Corellian Sendoff','Improved Corellian Sendoff','Koiogran Turn','Showboat',
    'Overstocked Ammo','Tuned Maneuvering Thrusters','Bolstered Armor','Customized Cooling Unit','Fortified Vacuum Seal','Not Today','Reinforced Frame',
    'Known Schematic','Familiar Suns','Master Starhopper','Fire Control','Situational Awareness','Form On Me!','Master Leader','Brilliant Evasion','Master Pilot'
  ]);
  if(wired.has(name))return'Implemented in the current rules engine.';
  if(partial.has(name))return'Partially automated; some source effects still require manual/narrative handling.';
  return'Displayed in the tree; its full automatic effect is still pending.';
}

function talentRank(name){
  ensurePhase9State();let r=allOwnedSpecNodes().filter(n=>n.name===name).length;
  r+=ownedUniversalNodes().filter(n=>n.name===name).length;return r;
}
function hasTalent(name){return talentRank(name)>0}
function baseWT(){return SPECIES[S.species].wt+S.chars.Brawn}function baseST(){return SPECIES[S.species].st+S.chars.Willpower}function woundThreshold(){return baseWT()+2*talentRank('Toughened')}function strainThreshold(){return baseST()+talentRank('Grit')}
function effectiveForceRating(){return Math.max(0,S.forceRating+(S.combat?.powerFromPainFR||0))}
function forceAvailable(){return Math.max(0,effectiveForceRating()-(S.forceCommitted.sense?1:0)-(S.forceCommitted.brawn?1:0)-(S.forceCommitted.agility?1:0)-(S.combat?.indomitableCommitted||0))}
function availableXp(){return S.finalized?S.earnedXp:S.xpStart-S.xpSpent}function charge(cost,label){if(availableXp()<cost){bLog(`Not enough XP: ${label} costs ${cost}.`);return false}if(S.finalized)S.earnedXp-=cost;else S.xpSpent+=cost;bLog(`Purchased ${label} (${cost} XP).`);return true}
function refund(cost,label){if(S.finalized)S.earnedXp+=cost;else S.xpSpent=Math.max(0,S.xpSpent-cost);bLog(`Refunded ${label} (${cost} XP).`)}
function makePool(ch,rank,diff=2,boost=0,setback=0,upgrade=0){let hi=Math.max(ch,rank),lo=Math.min(ch,rank),p={ability:hi-lo,proficiency:lo,difficulty:diff,challenge:0,boost,setback};return upgradeDifficultyPool(p,upgrade)}
function rollNarr(p){let o={s:0,f:0,a:0,t:0,tr:0,de:0};Object.entries(p).forEach(([k,n])=>{for(let i=0;i<n;i++){let face=NARR[k][Math.floor(Math.random()*NARR[k].length)];Object.entries(face).forEach(([q,v])=>o[q]+=v)}});o.ns=o.s-o.f;o.na=o.a-o.t;o.ok=o.ns>0;return o}
function ptxt(p){return [['proficiency','🟡'],['ability','🟢'],['boost','🔵'],['challenge','🔴'],['difficulty','🟣'],['setback','⚫']].filter(([k])=>p[k]).map(([k,e])=>`${e}${p[k]}`).join(' ')||'—'}
function rtxt(r){return `${r.ns>0?r.ns+' Success':r.ns<0?Math.abs(r.ns)+' Failure':'No net Success'} · ${r.na>0?r.na+' Advantage':r.na<0?Math.abs(r.na)+' Threat':'No net Advantage/Threat'}${r.tr?' · '+r.tr+' Triumph':''}${r.de?' · '+r.de+' Despair':''}`}
function rollForce(n){let light=0,dark=0,faces=[];for(let i=0;i<n;i++){let f=FORCE_FACES[Math.floor(Math.random()*12)];light+=f.light||0;dark+=f.dark||0;faces.push(f.light?`◯${f.light}`:`●${f.dark}`)}return{light,dark,faces}}
function isDarkSide(){return S.morality<30}
function preferredForcePips(fr){return isDarkSide()?fr.dark:fr.light}
function oppositeForcePips(fr){return isDarkSide()?fr.light:fr.dark}
function canUseOppositePips(){return isDarkSide()?S.destiny.dark>0:S.destiny.light>0}
function useForcePoints(fr,need=1){
  const pref=preferredForcePips(fr);
  if(pref>=need)return{ok:true,usedPreferred:need,usedOpposite:0};
  const missing=need-pref,opp=oppositeForcePips(fr);
  if(opp<missing||!canUseOppositePips())return{ok:false};
  const side=isDarkSide()?'light':'dark';
  if(!confirm(`Use ${missing} ${side}-side pip(s)? This flips 1 Destiny and causes ${missing} strain${isDarkSide()?'':' and Conflict'}.`))return{ok:false};
  if(isDarkSide()){S.destiny.dark--;S.destiny.light++}
  else{S.destiny.light--;S.destiny.dark++;S.conflict+=missing}
  S.strain=Math.min(strainThreshold(),S.strain+missing);
  return{ok:true,usedPreferred:pref,usedOpposite:missing}
}
function careerSkills(){
  ensurePhase9State();let s=new Set(CAREERS[S.career].skills);
  for(const sp of S.ownedSpecs){let c=specializationCareer(sp);for(const sk of (c?CAREERS[c].specs[sp]||[]:[]))s.add(sk)}
  if(hasTalent('Insight')){s.add('Perception');s.add('Discipline')}return s
}
function resetCreationPurchases(){let sp=SPECIES[S.species];S.chars={...sp.c};S.charSpend={};S.skills={...(sp.free||{})};if(sp.freeChoice?.length){let pick=S.speciesSkillChoice&&sp.freeChoice.includes(S.speciesSkillChoice)?S.speciesSkillChoice:sp.freeChoice[0];S.speciesSkillChoice=pick;S.skills[pick]=(S.skills[pick]||0)+1}S.xpSpent=0;S.freeCareer=[];S.freeSpec=[];S.talents=new Set();S.dedication={};S.ownedSpecs=[S.spec];S.specTalents={[S.spec]:S.talents};S.talentView=S.spec;S.universalSpecs=[];S.universalTalents={'Force Sensitive Exile':new Set(),'Force-Sensitive Emergent':new Set()};S.universalView='Force Sensitive Exile';S.forceRating=isForceCareer()?1:0;S.forceOwned={Move:new Set(),Sense:new Set(),Enhance:new Set(),Influence:new Set(),Foresee:new Set()};S.forceCommitted={sense:false,brawn:false,agility:false};S.foreseeBoost=0}function selectSpecies(reset=true){let sp=SPECIES[$('species').value];S.species=$('species').value;S.speciesSkillChoice=sp.freeChoice?.[0]||null;S.base={...sp.c};S.xpStart=sp.xp;resetCreationPurchases();if(reset)bLog(`Species set to ${sp.name}; creation purchases reset.`);renderAll()}
function selectCareer(reset=true){S.career=$('careerSelect').value;if(CAREERS[S.career].forceStart){S.framework='Morality';if($('framework'))$('framework').value='Morality'}let specs=Object.keys(CAREERS[S.career].specs);$('specSelect').innerHTML=specs.map(x=>`<option>${x}</option>`).join('');S.spec=specs[0];if(!S.finalized)resetCreationPurchases();if(reset)bLog(`Career set to ${S.career}; creation purchases reset for the new career.`);renderAll()}
function selectSpec(){S.spec=$('specSelect').value;if(!S.finalized)resetCreationPurchases();bLog(`Specialization set to ${S.spec}; creation purchases reset.`);renderAll()}
function toggleFree(kind,sk){let arr=kind==='career'?S.freeCareer:S.freeSpec,cap=kind==='career'?careerPickCap():2;if(arr.includes(sk)){arr.splice(arr.indexOf(sk),1);S.skills[sk]=Math.max(0,(S.skills[sk]||0)-1)}else if(arr.length<cap){arr.push(sk);S.skills[sk]=(S.skills[sk]||0)+1}else bLog(`Only ${cap} free ${kind} picks are allowed.`);renderAll()}
function skillCost(sk){let n=(S.skills[sk]||0)+1;return n*5+(careerSkills().has(sk)?0:5)}
function freeFloor(sk){return (S.freeCareer.includes(sk)?1:0)+(S.freeSpec.includes(sk)?1:0)+(SPECIES[S.species].free?.[sk]||0)}
function buySkill(sk){let r=S.skills[sk]||0,max=S.finalized?5:2;if(r>=max){bLog(`${sk} is at the current rank cap.`);return}let c=skillCost(sk);if(charge(c,`${sk} rank ${r+1}`)){S.skills[sk]=r+1;renderAll()}}
function undoSkill(sk){if(S.finalized){bLog('Creation skill purchases cannot be refunded after finalization.');return}let r=S.skills[sk]||0;if(r<=freeFloor(sk))return;let c=r*5+(careerSkills().has(sk)?0:5);S.skills[sk]--;refund(c,`${sk} rank ${r}`);renderAll()}
function buyChar(ch){if(S.finalized){bLog('Direct characteristic purchases are locked after creation.');return}let v=S.chars[ch];if(v>=5)return;let c=(v+1)*10;if(charge(c,`${ch} ${v+1}`)){S.chars[ch]++;(S.charSpend[ch]??=[]).push(c);renderAll()}}
function undoChar(ch){if(S.finalized)return;let a=S.charSpend[ch]||[];if(!a.length)return;let c=a.pop();S.chars[ch]--;refund(c,`${ch} increase`);renderAll()}
function eligibleTalent(n){return n.row===0||n.links.some(id=>S.talents.has(id))}
function buyTalent(id){let n=tree().find(x=>x.id===id);if(!n||S.talents.has(id)||!eligibleTalent(n))return;if(n.name==='Dedication'){let ch=prompt('Dedication: choose Brawn, Agility, Intellect, Cunning, Willpower, or Presence');if(!S.chars[ch]||S.chars[ch]>=6){bLog('Dedication cancelled or invalid characteristic.');return}if(!charge(n.cost,'Dedication'))return;S.talents.add(id);S.chars[ch]++;S.dedication[id]=ch;bLog(`Dedication increased ${ch} to ${S.chars[ch]}.`);renderAll();return}if(charge(n.cost,n.name)){S.talents.add(id);if(n.name==='Force Rating'){S.forceRating++;bLog(`Force Rating increased to ${S.forceRating}.`)}renderAll()}}
function forceSet(power){return S.forceOwned[power]}
function forceTreeData(){return FORCE_TREES[S.forceTab]}
function forceEligible(n){let d=forceTreeData(),set=forceSet(S.forceTab);if(!set.has(d.basic.id))return false;return n.row===0||n.links.some(id=>set.has(id))}
function buyForce(id){if(S.forceRating<1){bLog('Force Rating 1+ required.');return}let d=forceTreeData(),set=forceSet(S.forceTab);if(id===d.basic.id){if(set.has(id))return;if(charge(d.basic.cost,`${S.forceTab} basic power`)){set.add(id);renderAll()}return}let n=d.nodes.find(x=>x.id===id);if(!n||set.has(id)||!forceEligible(n))return;if(charge(n.cost,`${S.forceTab}: ${n.name}`)){set.add(id);renderAll()}}
function universalSpecCost(){return 10*(specializationCount()+1)}
function buyUniversalSpec(){
  const spec=$('universalSelect').value;
  if(S.universalSpecs.includes(spec)){bLog(`${spec} is already owned.`);return}
  const cost=universalSpecCost();
  if(!charge(cost,spec))return;
  S.universalSpecs.push(spec);S.universalView=spec;
  if(!S.universalTalents[spec])S.universalTalents[spec]=new Set();
  if(S.forceRating<1){S.forceRating=1;bLog(`${spec} grants Force Rating 1.`)}
  renderAll()
}
function universalEligible(spec,n){
  const set=S.universalTalents[spec]||new Set();
  return n.row===0||n.links.some(id=>set.has(id))
}
function buyUniversalTalent(spec,id){
  if(!S.universalSpecs.includes(spec)){bLog(`Purchase ${spec} first.`);return}
  const n=universalTree(spec).find(x=>x.id===id),set=S.universalTalents[spec];
  if(!n||set.has(id)||!universalEligible(spec,n))return;
  if(n.name==='Dedication'){
    const ch=prompt('Dedication: choose Brawn, Agility, Intellect, Cunning, Willpower, or Presence');
    if(!S.chars[ch]||S.chars[ch]>=6){bLog('Dedication cancelled or invalid characteristic.');return}
    if(!charge(n.cost,`${spec}: Dedication`))return;
    set.add(id);S.chars[ch]++;S.dedication[`univ:${spec}:${id}`]=ch;bLog(`Dedication increased ${ch} to ${S.chars[ch]}.`);renderAll();return
  }
  if(!charge(n.cost,`${spec}: ${n.name}`))return;
  set.add(id);
  if(n.name==='Force Rating'){S.forceRating++;bLog(`Force Rating increased to ${S.forceRating}.`)}
  renderAll()
}
function actors(){ensurePhase13State();return[{id:'pc',name:S.name,c:S.chars,sk:S.skills},...S.crew.map(effectiveCrew).filter(Boolean)]}
function talentCheckMods(actor,skill,ctx={}){
  let boost=ctx.boost||0,setback=ctx.setback||0,diff=ctx.diff||2;
  if(actor.id==='pc'){
    if(skill==='Stealth'||skill==='Coordination')boost+=talentRank('Stalker');
    if(skill==='Perception')boost+=talentRank('Uncanny Senses');if(skill==='Athletics'||skill==='Coordination')setback=Math.max(0,setback-talentRank('Conditioned'));if(skill==='Athletics'||skill==='Resilience')boost+=talentRank('Physical Training');
    if(skill==='Vigilance')boost+=talentRank('Uncanny Reactions');
    if(skill==='Stealth')boost+=talentRank('Sleight of Mind');
    if((skill==='Charm'||skill==='Coercion'||skill==='Deception')&&hasTalent('Sense Emotions'))boost+=1;
    if(skill==='Deception'||skill==='Skulduggery')setback=Math.max(0,setback-talentRank('Convincing Demeanor'));
    if(skill==='Cool'||skill==='Skulduggery')setback=Math.max(0,setback-talentRank('Steady Nerves'));
    if(skill==='Streetwise'||skill==='Knowledge (Underworld)')setback=Math.max(0,setback-talentRank('Street Smarts'));
    if(skill==='Charm'||skill==='Leadership')setback=Math.max(0,setback-talentRank('Kill with Kindness'));
    if(skill==='Leadership'||skill==='Cool')setback=Math.max(0,setback-talentRank('Commanding Presence'));
    if(skill==='Coercion'||skill==='Deception')setback=Math.max(0,setback-talentRank('Plausible Deniability'));
    if(skill.startsWith('Knowledge ('))setback=Math.max(0,setback-talentRank('Researcher'));
    if(skill==='Perception'||skill==='Vigilance')setback=Math.max(0,setback-talentRank('Keen Eyed'));
    if(ctx.track)setback=Math.max(0,setback-talentRank('Expert Tracker'));
    if((skill==='Piloting (Space)'||skill==='Piloting (Planetary)'))setback=Math.max(0,setback-talentRank('Skilled Jockey'));
    if(skill==='Astrogation')setback=Math.max(0,setback-talentRank('Galaxy Mapper'));
    if(skill==='Leadership')boost+=talentRank('Command');if(ctx.initiative&&(skill==='Cool'||skill==='Vigilance'))setback=Math.max(0,setback-talentRank('Ready for Anything'));
    if(ctx.beast)boost+=talentRank('Hunter')+talentRank('Beast Wrangler');if(ctx.riding&&skill==='Survival')setback=Math.max(0,setback-talentRank('Expert Handler'));
    if(skill==='Mechanics')setback=Math.max(0,setback-talentRank('Gearhead'));
    if(skill==='Mechanics'&&ctx.cybernetic)setback=Math.max(0,setback-talentRank('Cyberneticist'));
    if(skill==='Mechanics'&&ctx.droid)setback=Math.max(0,setback-talentRank('Deft Maker'));
    if(skill==='Coordination'||skill==='Resilience')setback=Math.max(0,setback-talentRank('Iron Body'));
    if(skill==='Mechanics'&&(ctx.construct||ctx.modify)&&talentRank('Inventor')){
      let inv=talentRank('Inventor'),removed=Math.min(setback,inv);setback-=removed;boost+=inv-removed
    }
    if(ctx.forage&&hasTalent('Forager'))setback=Math.max(0,setback-2);
    if(ctx.security)setback=Math.max(0,setback-talentRank('Bypass Security'));
    if(ctx.decrypt&&talentRank('Codebreaker')){setback=Math.max(0,setback-talentRank('Codebreaker'));diff=Math.max(1,diff-1)}
    if(skill==='Coercion'&&ctx.commit&&talentRank('Intimidating')&&canVoluntarilySufferStrain('pc')){
      let max=Math.min(talentRank('Intimidating'),Math.max(0,strainThreshold()-S.strain));
      if(max>0&&confirm(`Use Intimidating? Suffer up to ${max} strain to reduce Coercion difficulty by the same amount.`)){
        let n=Math.max(0,Math.min(max,Number(prompt('Strain to suffer for Intimidating',String(max)))||0));
        if(n){S.strain+=n;diff=Math.max(0,diff-n)}
      }
    }
    if((skill==='Stealth'||skill==='Skulduggery')&&hasTalent('Master of Shadows')&&ctx.commit&&canVoluntarilySufferStrain('pc')&&S.strain+2<=strainThreshold()&&confirm('Use Master of Shadows? Suffer 2 strain to reduce difficulty by 1.')){S.strain+=2;diff=Math.max(1,diff-1)}
  }
  return{boost,setback,diff}
}
function actorPool(actor,skill,ctx={}){
  let ch=skillCharacteristic(actor,skill,ctx),rank=actor.sk[skill]||0,val=effectiveCharacteristic(actor,ch),
      m=talentCheckMods(actor,skill,ctx),id=partyActorForCharacteristic(actor),st=id?actorState(id):null,cm=id?criticalCheckMods(id,skill,ch):{diff:0,setback:0,upgrade:0,removeBoost:false},
      pendingUpgrade=st?.conditions.nextUpgrade||0,pendingDifficulty=st?.conditions.nextDifficulty||0,
      diff=m.diff+(id?crippledDifficulty(id,skill):0)+pendingDifficulty+cm.diff,
      speciesBoost=id==='pc'?((S.species==='mikkian'&&skill==='Perception')||(S.species==='zabrak'&&skill==='Coercion')?1:0):0,
      boost=m.boost+approvalBoost(actor,skill)+crewRoleBoost(actor,skill)+(id==='pc'&&S.foreseeBoost?1:0)+speciesBoost,
      setback=m.setback+(st?.conditions.disoriented>0?1:0)+(st?.conditions.nextSetback||0)+cm.setback,
      p=makePool(val,rank,diff,cm.removeBoost?0:boost,setback,(ctx.upgrade||0)+pendingUpgrade+cm.upgrade);
  let up=ctx.abilityUpgrade||0;upgradePositivePool(p,up);
  if(ctx.difficultyDowngrade)while(ctx.difficultyDowngrade-->0){if((p.challenge||0)>0){p.challenge--;p.difficulty=(p.difficulty||0)+1}}
  if(ctx.commit&&id){st.conditions.nextUpgrade=0;st.conditions.nextDifficulty=0;st.conditions.nextSetback=0;if(id==='pc'&&S.foreseeBoost)S.foreseeBoost=0}
  return{actor,skill,ch,rank,val,p,mods:{...m,diff,boost,setback}}
}
function poolScore(q){return q.p.proficiency*100+q.p.ability*10+q.p.boost*2-q.p.setback*2-q.p.challenge*3}
function bestActor(skill,ctx={}){return actors().map(a=>actorPool(a,skill,ctx)).sort((a,b)=>poolScore(b)-poolScore(a))[0]}
function enhanceSupports(skill){let set=S.forceOwned.Enhance;if(!set.has('e-basic'))return false;if(skill==='Athletics')return true;if(skill==='Coordination'&&set.has('e-coord'))return true;if(skill==='Resilience'&&set.has('e-res'))return true;if(skill==='Brawl'&&set.has('e-brawl'))return true;if(skill==='Piloting (Planetary)'&&set.has('e-planet'))return true;if(skill==='Piloting (Space)'&&set.has('e-space'))return true;return false}
function naturalReroll(skill,q,r){
  if(q.actor.id!=='pc'||r.ok)return r;
  const options=[
    {name:'Natural Programmer',key:'naturalProgrammer',skills:['Computers','Astrogation']},
    {name:'Natural Charmer',key:'naturalCharmer',skills:['Charm','Deception']},
    {name:'Natural Doctor',key:'naturalDoctor',skills:['Medicine']},
    {name:'Natural Negotiator',key:'naturalNegotiator',skills:['Cool','Negotiation']},
    {name:'Natural Leader',key:'naturalLeader',skills:['Cool','Leadership']},
    {name:'Natural Hunter',key:'naturalHunter',skills:['Perception','Vigilance']},
    {name:'Natural Outdoorsman',key:'naturalOutdoorsman',skills:['Resilience','Survival']},
    {name:'Natural Tinkerer',key:'naturalTinkerer',skills:['Mechanics']},
    {name:'Natural Rogue',key:'naturalRogue',skills:['Skulduggery','Stealth']},
    {name:'Natural Brawler',key:'naturalBrawler',skills:['Brawl','Melee']},
    {name:'Natural Marksman',key:'naturalMarksman',skills:['Ranged (Light)','Ranged (Heavy)']},
    {name:'Natural Enforcer',key:'naturalEnforcer',skills:['Coercion','Streetwise']},
    {name:'Natural Merchant',key:'naturalMerchant',skills:['Streetwise','Negotiation']},
    {name:'Natural Athlete',key:'naturalAthlete',skills:['Athletics','Coordination']},
    {name:'Natural Driver',key:'naturalDriver',skills:['Piloting (Planetary)','Gunnery']},
    {name:'Natural Instructor',key:'naturalInstructor',skills:['Discipline','Leadership']},
    {name:'Natural Pilot',key:'naturalPilot',skills:['Piloting (Space)','Gunnery']}
  ];
  let o=options.find(x=>x.skills.includes(skill)&&hasTalent(x.name)&&!S.sessionUsed[x.key]);
  if(o&&confirm(`Use ${o.name} to reroll this failed ${skill} check?`)){S.sessionUsed[o.key]=true;return rollNarr(q.p)}
  return r
}
function useFortuneFavorsBold(){
  if(!hasTalent('Fortune Favors the Bold')||S.sessionUsed.fortuneFavorsBold)return;
  if(S.destiny.dark<1){bLog('Fortune Favors the Bold needs at least one dark Destiny Point.');return}
  if(!canVoluntarilySufferStrain('pc')||S.strain+2>strainThreshold()){bLog('Not enough strain capacity for Fortune Favors the Bold.');return}
  S.strain+=2;S.destiny.dark--;S.destiny.light++;S.sessionUsed.fortuneFavorsBold=true;
  bLog('Fortune Favors the Bold: suffered 2 strain and flipped one dark Destiny Point to light.');renderAll()
}
function useIntensePresence(){
  if(!hasTalent('Intense Presence')||S.destiny.light<1||S.strain<1)return;
  S.destiny.light--;S.destiny.dark++;
  let healed=Math.min(S.strain,S.chars.Presence||1);S.strain-=healed;
  bLog(`Intense Presence: spent 1 light Destiny Point and recovered ${healed} strain.`);renderAll()
}
function chooseDeadlyAccuracySkill(){
  if(!hasTalent('Deadly Accuracy'))return;
  let allowed=['Brawl','Melee','Ranged (Light)','Ranged (Heavy)','Gunnery','Lightsaber'],
      pick=prompt(`Deadly Accuracy: choose one combat skill (${allowed.join(', ')})`,S.deadlyAccuracySkill||'Ranged (Light)');
  if(!allowed.includes(pick)){bLog('Deadly Accuracy selection unchanged.');return}
  S.deadlyAccuracySkill=pick;bLog(`Deadly Accuracy is keyed to ${pick}.`);renderAll()
}
function performBest(skill,ctx={}){
  let preview=bestActor(skill,ctx),live={...ctx,commit:true};
  if(preview.actor.id!=='pc'){
    let pc=actorById('pc'),override=false;
    if(hasTalent('Force of Will')&&!S.sessionUsed.forceOfWill&&confirm(`${preview.actor.name} is currently the recommended character. Use Force of Will so ${S.name} makes this check with Willpower instead?`)){
      live.useWillpower=true;S.sessionUsed.forceOfWill=true;override=true
    }else if(hasTalent('Works Like a Charm')&&!S.sessionUsed.worksLikeACharm&&confirm(`${preview.actor.name} is currently the recommended character. Use Works Like a Charm so ${S.name} makes this check with Presence instead?`)){
      live.usePresence=true;S.sessionUsed.worksLikeACharm=true;override=true
    }else if(hasTalent('Clever Solution')&&!S.sessionUsed.cleverSolution&&confirm(`${preview.actor.name} is currently the recommended character. Use Clever Solution so ${S.name} makes this check with Cunning instead?`)){
      live.useCunning=true;S.sessionUsed.cleverSolution=true;override=true
    }
    if(override)preview={...preview,actor:pc}
  }
  if(preview.actor.id==='pc'){
    if(hasTalent('Sense Danger')&&!S.sessionUsed.senseDanger&&(ctx.setback||0)>0&&confirm('Use Sense Danger to remove up to 2 setback dice from this check?')){
      live.setback=Math.max(0,(ctx.setback||0)-2);S.sessionUsed.senseDanger=true
    }
    if(hasTalent('Touch of Fate')&&!S.sessionUsed.touchOfFate&&confirm('Use Touch of Fate to add 2 boost dice to this check?')){
      live.boost=(live.boost||0)+2;S.sessionUsed.touchOfFate=true
    }
    if(!live.usePresence&&!live.useCunning&&hasTalent('Force of Will')&&!S.sessionUsed.forceOfWill&&confirm('Use Force of Will to make this check with Willpower?')){
      live.useWillpower=true;S.sessionUsed.forceOfWill=true
    }
    if(!live.useWillpower&&hasTalent('Works Like a Charm')&&!S.sessionUsed.worksLikeACharm&&confirm('Use Works Like a Charm to make this check with Presence?')){
      live.usePresence=true;S.sessionUsed.worksLikeACharm=true
    }
    if(!live.useWillpower&&!live.usePresence&&hasTalent('Clever Solution')&&!S.sessionUsed.cleverSolution&&confirm('Use Clever Solution to make this check with Cunning?')){
      live.useCunning=true;S.sessionUsed.cleverSolution=true
    }
    if(['Charm','Negotiation'].includes(skill)&&talentRank('Congenial')&&canVoluntarilySufferStrain('pc')){
      let max=Math.min(talentRank('Congenial'),Math.max(0,strainThreshold()-S.strain));
      if(max>0&&confirm(`Use Congenial? Suffer up to ${max} strain to downgrade that many challenge dice on this ${skill} check.`)){
        let n=Math.max(0,Math.min(max,Number(prompt('Congenial strain to suffer',String(max)))||0));
        if(n){S.strain+=n;live.difficultyDowngrade=(live.difficultyDowngrade||0)+n}
      }
    }
    if(hasTalent('Intense Focus')&&canVoluntarilySufferStrain('pc')&&S.strain<strainThreshold()&&confirm('Use Intense Focus? Suffer 1 strain to upgrade this check once.')){
      S.strain++;live.abilityUpgrade=(live.abilityUpgrade||0)+1
    }
  }
  let q=actorPool(preview.actor,skill,live),usedLight=applyQueuedAllyDestiny(q.p,true),usedDark=maybeGMDarkDifficulty(q.p,`${q.actor.name}'s ${skill} check`),r=rollNarr(q.p),force=null;
  if(q.actor.id==='pc'&&skill==='Leadership'&&hasTalent('Enhanced Leader')&&forceAvailable()>0&&confirm('Use Enhanced Leader and add Force dice to this Leadership check?')){
    let ef=rollForce(forceAvailable()),preferred=preferredForcePips(ef),opposite=oppositeForcePips(ef),want=preferred;
    if(opposite>0&&canUseOppositePips()&&confirm(`Enhanced Leader rolled ${opposite} opposite-alignment Force point${opposite===1?'':'s'}. Use them too?`)){
      let paid=useForcePoints(ef,preferred+opposite);if(paid.ok)want=preferred+opposite
    }
    if(want>0){
      let succ=Math.max(0,Math.min(want,Number(prompt(`Enhanced Leader has ${want} usable Force point${want===1?'':'s'}. How many become automatic Success? The rest become Advantage.`,String(want)))||0)),
          adv=want-succ;r.ns+=succ;r.na+=adv;r.ok=r.ns>0;force=ef;
      bLog(`Enhanced Leader converts ${want} Force point${want===1?'':'s'} into ${succ} Success and ${adv} Advantage.`)
    }
  }
  if(q.actor.id==='pc'&&S.forceOwned.Influence.has('i-social')&&['Charm','Coercion','Deception','Leadership','Negotiation'].includes(skill)&&forceAvailable()>0&&confirm(`Use Influence with this ${skill} check?`)){
    let inf=rollForce(forceAvailable()),preferred=preferredForcePips(inf),opposite=oppositeForcePips(inf),want=preferred;
    if(opposite>0&&canUseOppositePips()&&confirm(`Influence rolled ${opposite} opposite-alignment Force point${opposite===1?'':'s'}. Use them too?`)){
      let paid=useForcePoints(inf,preferred+opposite);if(paid.ok)want=preferred+opposite
    }
    if(want>0){
      let succ=Math.max(0,Math.min(want,Number(prompt(`Influence has ${want} usable Force point${want===1?'':'s'}. How many become automatic Success? The rest become Advantage.`,String(want)))||0)),
          adv=want-succ;r.ns+=succ;r.na+=adv;r.ok=r.ns>0;force=inf;
      bLog(`Influence converts ${want} Force point${want===1?'':'s'} into ${succ} Success and ${adv} Advantage on ${skill}.`)
    }
  }
  if(q.actor.id==='pc'&&hasTalent('Overwhelm Emotions')&&['Charm','Coercion','Deception'].includes(skill)&&forceAvailable()>0&&confirm('Use Overwhelm Emotions and roll Force dice with this social check?')){
    let of=rollForce(forceAvailable()),dark=isDarkSide(),fav=dark?of.dark:of.light,opp=dark?of.light:of.dark;
    r.ns+=fav-opp;r.ok=r.ns>0;force=of
  }
  if(q.actor.id==='pc'&&enhanceSupports(skill)&&forceAvailable()>0&&confirm(`Use Enhance with this ${skill} check?`)){
    force=rollForce(forceAvailable());let use=preferredForcePips(force),opp=oppositeForcePips(force);
    if(opp>0&&canUseOppositePips()&&confirm(`Enhance rolled ${opp} opposite-alignment Force point${opp===1?'':'s'}. Use them too?`)){
      let f=useForcePoints(force,use+opp);if(f.ok)use+=opp
    }
    if(use>0){
      let succ=Math.max(0,Math.min(use,Number(prompt(`Enhance has ${use} usable Force point${use===1?'':'s'}. How many become automatic Success? The rest become Advantage.`,String(use)))||0)),
          adv=use-succ;r.ns+=succ;r.na+=adv;r.ok=r.ns>0;
      bLog(`Enhance converts ${use} Force point${use===1?'':'s'} into ${succ} Success and ${adv} Advantage.`)
    }
  }
  r=naturalReroll(skill,q,r);
  if(q.actor.id==='pc'&&['Mechanics','Computers'].includes(skill)&&talentRank('Eye for Detail')&&r.ns>0&&canVoluntarilySufferStrain('pc')){
    let max=Math.min(talentRank('Eye for Detail'),r.ns,Math.max(0,strainThreshold()-S.strain));
    if(max>0&&confirm(`Use Eye for Detail? Suffer up to ${max} strain to convert that many Successes into Advantages.`)){
      let n=Math.max(0,Math.min(max,Number(prompt('Eye for Detail conversions',String(max)))||0));
      if(n){S.strain+=n;r.ns-=n;r.na+=n;r.ok=r.ns>0;bLog(`Eye for Detail converts ${n} Success${n===1?'':'es'} into ${n} Advantage.`)}
    }
  }
  if(usedLight)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  S.last={q,r,force,ctx:live};renderLast();renderFramework();renderAdventureDestiny();return{q,r,force}
}

/* Phase 17: character UI, navigation, save/load/import/export. */
function renderNavTab(id){
  let el=$(id);if(!el)return;document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.tab===id));document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));el.classList.remove('hidden');
  if(id==='guide')renderGuide();if(id==='adventure')renderAdventure();if(id==='ship')renderShip()
}
function renderIdentity(){let sp=SPECIES[S.species];let chooser=sp.freeChoice?.length?`<label style="display:block;margin-top:10px">Species skill rank<select id="speciesSkillPick">${sp.freeChoice.map(x=>`<option ${x===S.speciesSkillChoice?'selected':''}>${x}</option>`).join('')}</select></label>`:'';$('speciesInfo').innerHTML=`<div class="row"><div><b>${sp.name}</b><div class="small">${sp.note}</div><div class="tiny">${sp.source||''}</div></div><span class="pill">Starting XP ${sp.xp}</span></div><div class="pills" style="margin-top:9px">${Object.entries(sp.c).map(([k,v])=>`<span class="pill">${k} ${v}</span>`).join('')}</div>${chooser}`;if($('speciesSkillPick'))$('speciesSkillPick').onchange=()=>{S.speciesSkillChoice=$('speciesSkillPick').value;resetCreationPurchases();bLog(`Species skill set to ${S.speciesSkillChoice}.`);renderAll()}}
function renderCareer(){let c=CAREERS[S.career],spec=c.specs[S.spec],cap=careerPickCap();if($('careerFreeLabel'))$('careerFreeLabel').textContent=`Choose ${cap} free career-skill ranks`;$('careerInfo').innerHTML=`<b>${S.career} / ${S.spec}</b> <span class="tag">${c.line||'Star Wars RPG'}</span><div class="small">Career skills: ${c.skills.join(', ')}</div><div class="small" style="margin-top:4px">Specialization skills: ${spec.join(', ')}</div><div class="small" style="margin-top:4px">Free ranks: choose ${cap} career skills + 2 specialization skills.${c.forceStart?' This career begins with Force Rating 1.':''}</div>`;$('careerPicks').innerHTML=c.skills.map(sk=>`<button class="chip ${S.freeCareer.includes(sk)?'on':''}" data-cp="${sk}">${sk}</button>`).join('');$('specPicks').innerHTML=spec.map(sk=>`<button class="chip ${S.freeSpec.includes(sk)?'on':''}" data-sp="${sk}">${sk}</button>`).join('');document.querySelectorAll('[data-cp]').forEach(b=>b.onclick=()=>toggleFree('career',b.dataset.cp));document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>toggleFree('spec',b.dataset.sp))}
function renderSkills(){let cs=careerSkills();$('skillList').innerHTML=Object.keys(SKILL_CHAR).sort((a,b)=>(cs.has(b)?1:0)-(cs.has(a)?1:0)||a.localeCompare(b)).map(sk=>{let r=S.skills[sk]||0;return`<div class="skill"><div class="${cs.has(sk)?'career':''}"><b>${sk}</b>${cs.has(sk)?' ★':''}<div class="tiny">${SKILL_CHAR[sk]}</div></div><div>Rank <b>${r}</b></div><div>${skillCost(sk)} XP</div><div><button data-bs="${sk}">+</button> <button data-us="${sk}" ${r>freeFloor(sk)?'':'disabled'}>−</button></div></div>`}).join('');document.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>buySkill(b.dataset.bs));document.querySelectorAll('[data-us]').forEach(b=>b.onclick=()=>undoSkill(b.dataset.us))}
function renderChars(){$('charGrid').innerHTML=Object.entries(S.chars).map(([ch,v])=>`<div class="char"><div class="tiny">${ch}</div><div class="v">${v}</div><div class="tiny">Next ${v<5?(v+1)*10+' XP':'MAX'}</div><button data-bc="${ch}" ${S.finalized?'disabled':''}>Increase</button><button data-uc="${ch}" ${(S.charSpend[ch]||[]).length&&!S.finalized?'':'disabled'}>Undo</button></div>`).join('');document.querySelectorAll('[data-bc]').forEach(b=>b.onclick=()=>buyChar(b.dataset.bc));document.querySelectorAll('[data-uc]').forEach(b=>b.onclick=()=>undoChar(b.dataset.uc))}
function renderTalents(){
  ensurePhase9State();let spec=S.talentView,t=treeForSpec(spec),set=viewedTalentSet(),exact=!!EXACT_TREES[spec]||FULL_SOURCE_TREES.has(spec),standardized=PHASE37_STANDARD_SPECS.has(spec),partial=!!FORM_TREES[spec]&&!FULL_SOURCE_TREES.has(spec);
  let source=SPECIALIZATION_TREE_SOURCE?.[spec]||'Project rules reference';
  let statusHtml=exact?`<span class="good">Source-grounded 20-node tree:</span> ${spec} · ${source}. Individual talent cards state whether their mechanics are fully or partially automated.`:standardized?`<span class="gold">Phase 37 standardized 20-node tree:</span> ${spec} · ${source}. Career/spec skills are source-grounded; talent cards and prerequisite geometry are a playable standardized bridge pending exact tree transcription.`:partial?`<span class="good">Source-based partial tree:</span> ${spec}. Connected purchases are active; full-tree extraction is still pending.`:`<span class="gold">Prototype tree:</span> ${spec}. Exact data pass still pending.`;
  let utility=[];
  if(hasTalent('Fortune Favors the Bold')&&!S.sessionUsed.fortuneFavorsBold)utility.push(`<button class="btn" id="talFortune">Fortune Favors the Bold</button>`);
  if(hasTalent('Intense Presence')&&S.destiny.light>0&&S.strain>0)utility.push(`<button class="btn" id="talIntensePresence">Intense Presence</button>`);
  if(hasTalent('Deadly Accuracy'))utility.push(`<button class="btn" id="talDeadlyAccuracy">Deadly Accuracy: ${S.deadlyAccuracySkill||'choose skill'}</button>`);
  $('treeStatus').innerHTML=statusHtml+(utility.length?`<div class="pills" style="margin-top:8px">${utility.join('')}</div>`:'');
  $('ownedSpecs').innerHTML=S.ownedSpecs.map(x=>`<span class="pill">${x}${x===S.spec?' · starting':''}</span>`).join('');
  $('talentSpecView').innerHTML=S.ownedSpecs.map(x=>`<option ${x===spec?'selected':''}>${x}</option>`).join('');
  let avail=allSpecializationChoices().filter(x=>!S.ownedSpecs.includes(x.spec)).sort((a,b)=>(b.inCareer-a.inCareer)||a.career.localeCompare(b.career)||a.spec.localeCompare(b.spec));
  $('buySpecSelect').innerHTML=avail.length?avail.map(x=>`<option value="${x.spec}">${x.inCareer?'IN-CAREER':'NON-CAREER'} · ${x.career} · ${x.spec} · ${additionalSpecCost(x.spec)} XP</option>`).join(''):'<option value="">All indexed specializations owned</option>';
  const refreshSpecCost=()=>{let sp=$('buySpecSelect').value,career=specializationCareer(sp);$('buySpecBtn').textContent=sp?`Buy ${sp} — ${additionalSpecCost(sp)} XP${career&&career!==S.career?' · non-career':''}`:'No specialization available'};
  refreshSpecCost();$('buySpecBtn').disabled=!avail.length;$('buySpecSelect').onchange=refreshSpecCost;
  $('talentTree').innerHTML=t.map(n=>{let owned=set.has(n.id),ok=eligibleSpecTalent(spec,n),blurb=talentBlurb(n.name,n.effect),status=talentEngineStatus(n.name);return `<div class="tal ${owned?'owned':''} ${!ok&&!owned?'lock':''}" style="grid-row:${n.row+1};grid-column:${n.col+1}"><div class="cost">${n.cost} XP</div><div class="type">${n.type}</div><b>${n.name}</b><div class="small" style="margin-top:8px;line-height:1.38"><b>What it does:</b> ${blurb}</div><div class="tiny" style="margin-top:7px"><b>Game status:</b> ${status}</div><button data-tal="${n.id}" ${owned||!ok?'disabled':''}>${owned?'Purchased':ok?'Buy':'Locked'}</button></div>`}).join('');
  document.querySelectorAll('[data-tal]').forEach(b=>b.onclick=()=>buyViewedTalent(b.dataset.tal));
  $('talentSpecView').onchange=()=>{S.talentView=$('talentSpecView').value;renderTalents()};
  $('buySpecBtn').onclick=buyAdditionalSpec;
  if($('talFortune'))$('talFortune').onclick=useFortuneFavorsBold;
  if($('talIntensePresence'))$('talIntensePresence').onclick=useIntensePresence;
  if($('talDeadlyAccuracy'))$('talDeadlyAccuracy').onclick=chooseDeadlyAccuracySkill
}
function renderUniversal(){
  $('universalSelect').value=S.universalView;
  const spec=S.universalView,owned=S.universalSpecs.includes(spec),cost=universalSpecCost();
  $('universalOwned').innerHTML=S.universalSpecs.length?S.universalSpecs.map(x=>`<span class="pill">${x}</span>`).join(''):'<span class="small">No universal specializations owned.</span>';
  $('buyUniversal').textContent=owned?'Owned':`Buy ${spec} — ${cost} XP`;$('buyUniversal').disabled=owned;
  $('universalTreeSelect').innerHTML=Object.keys(UNIVERSAL_TREES).map(x=>`<option ${x===spec?'selected':''}>${x}</option>`).join('');
  const set=S.universalTalents[spec]||new Set(),t=universalTree(spec);
  $('universalTreeTitle').textContent=spec;
  $('universalTreeStatus').innerHTML=owned?'<span class="good">Specialization owned.</span> Talent purchases are active.':'<span class="gold">Preview only.</span> Buy this specialization to unlock the tree.';
  $('universalTree').innerHTML=t.map(n=>{let got=set.has(n.id),ok=owned&&universalEligible(spec,n),blurb=talentBlurb(n.name,n.effect),status=talentEngineStatus(n.name);return`<div class="tal ${got?'owned':''} ${!ok&&!got?'lock':''}" style="grid-row:${n.row+1};grid-column:${n.col+1}"><div class="cost">${n.cost} XP</div><div class="type">${n.type}</div><b>${n.name}</b><div class="small" style="margin-top:8px;line-height:1.38"><b>What it does:</b> ${blurb}</div><div class="tiny" style="margin-top:7px"><b>Game status:</b> ${status}</div><button data-utal="${n.id}" ${got||!ok?'disabled':''}>${got?'Purchased':ok?'Buy':'Locked'}</button></div>`}).join('');
  document.querySelectorAll('[data-utal]').forEach(b=>b.onclick=()=>buyUniversalTalent(spec,b.dataset.utal))
}
function renderForce(){
  ensurePhase9State();renderUniversal();let d=forceTreeData(),set=forceSet(S.forceTab);
  $('fr').textContent=effectiveForceRating()===S.forceRating?S.forceRating:`${S.forceRating} → ${effectiveForceRating()}`;$('frAvail').textContent=forceAvailable();$('conflict').textContent=`${S.conflict}${S.conflictReduction?` (−${S.conflictReduction} pending)`:''}`;$('moralityNow').textContent=S.morality;
  document.querySelectorAll('[data-power-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.powerTab===S.forceTab));
  let basicOwned=set.has(d.basic.id);
  let basic=`<div class="fnode ${basicOwned?'owned':''}" style="grid-column:1/5"><div class="cost">${d.basic.cost} XP</div><b>${d.basic.name}</b><div class="tiny" style="margin-top:6px">${d.basic.effect}</div><button data-force-node="${d.basic.id}" ${basicOwned||S.forceRating<1?'disabled':''}>${basicOwned?'Purchased':'Buy basic'}</button></div>`;
  let nodes=d.nodes.map(n=>{let got=set.has(n.id),ok=forceEligible(n);return`<div class="fnode ${got?'owned':''} ${!ok&&!got?'lock':''}" style="grid-row:${n.row+2};grid-column:${n.col+1}"><div class="cost">${n.cost} XP</div><b>${n.name}</b><div class="tiny" style="margin-top:6px">${n.effect}</div><button data-force-node="${n.id}" ${got||!ok||S.forceRating<1?'disabled':''}>${got?'Purchased':ok?'Buy':'Locked'}</button></div>`}).join('');
  $('forceTree').innerHTML=basic+nodes;
  document.querySelectorAll('[data-force-node]').forEach(b=>b.onclick=()=>buyForce(b.dataset.forceNode));
  let acts=[];
  if(S.forceOwned.Enhance.has('e-brawn'))acts.push(`<button class="btn ${S.forceCommitted.brawn?'good':''}" id="commitBrawn">${S.forceCommitted.brawn?'Uncommit':'Commit'} Enhance: Brawn</button>`);
  if(S.forceOwned.Enhance.has('e-agility'))acts.push(`<button class="btn ${S.forceCommitted.agility?'good':''}" id="commitAgility">${S.forceCommitted.agility?'Uncommit':'Commit'} Enhance: Agility</button>`);
  if(S.forceOwned.Influence.has('i-basic'))acts.push(`<button class="btn" id="useInfluence">Test Influence basic power</button>`);
  if(S.forceOwned.Foresee.has('f-basic'))acts.push(`<button class="btn" id="useForesee">Meditate with Foresee</button>`);
  $('forceActions').innerHTML=`<b>Owned Force abilities</b><div class="small" style="margin:5px 0 8px">Source: ${FORCE_TREE_SOURCE[S.forceTab]||'Force and Destiny Core'}. The current build uses source-grounded Move, Sense, Enhance, Influence, and Foresee trees; automation includes Influence social checks, Sense Range/Magnitude, and Foresee Initiative/opening defense.</div><div class="pills">${acts.join('')||'<span class="small">Purchase Force upgrades to unlock actions here.</span>'}</div>`;
  if($('commitBrawn'))$('commitBrawn').onclick=()=>toggleEnhanceCommit('Brawn');if($('commitAgility'))$('commitAgility').onclick=()=>toggleEnhanceCommit('Agility');if($('useInfluence'))$('useInfluence').onclick=useInfluenceBasic;if($('useForesee'))$('useForesee').onclick=useForesee
}
function renderFramework(){
  ensurePhase8State();let fw=$('framework').value;S.framework=fw;let options=FRAME[fw];
  if(!options.includes(S.frameworkType))S.frameworkType=options[0];
  $('frameworkType').innerHTML=options.map(x=>`<option ${x===S.frameworkType?'selected':''}>${x}</option>`).join('');
  $('lightDestiny').textContent=S.destiny.light;$('darkDestiny').textContent=S.destiny.dark;$('heldDestiny').textContent=S.destinyHeld.light+S.destinyHeld.dark;
  $('gmDestinyMode').value=S.gmDestinyMode;
  $('destinyAlly').disabled=S.destiny.light<1||!!S.destinyPending.allyUpgrade;$('destinyNpc').disabled=S.destiny.light<1||!!S.destinyPending.npcDifficulty;$('destinyFact').disabled=S.destiny.light<1;
  $('destinyCancel').disabled=!(S.destinyPending.allyUpgrade||S.destinyPending.npcDifficulty);
  $('destinyStatus').innerHTML=`Queued: <b>${S.destinyPending.allyUpgrade?'next allied upgrade':''}${S.destinyPending.allyUpgrade&&S.destinyPending.npcDifficulty?' + ':''}${S.destinyPending.npcDifficulty?'next NPC difficulty upgrade':''}${!S.destinyPending.allyUpgrade&&!S.destinyPending.npcDifficulty?'none':''}</b>. Reserved points flip only when their roll resolves.`;
  $('narrativeFacts').innerHTML=S.narrativeFacts.length?`<b>Introduced facts:</b> ${S.narrativeFacts.map(x=>`“${x}”`).join(' · ')}`:'No Destiny-created narrative facts yet.';
  let state=S.morality<30?'Dark Side':S.morality>=70?'Light Side Paragon':'Balanced';
  $('moralityStatus').innerHTML=`Morality <b>${S.morality}</b> · ${state} · Current Conflict <b>${S.conflict}</b>`;
  renderAdventureDestiny()
}
function renderReview(){let sp=SPECIES[S.species],cap=careerPickCap(),freeDone=S.freeCareer.length===cap&&S.freeSpec.length===2;$('reviewBody').innerHTML=`<div class="grid g2"><div class="card"><b>${S.name}</b><div class="small">${sp.name} · ${S.career} / ${S.spec} · Specs: ${S.ownedSpecs.join(', ')}</div><div class="pills" style="margin-top:8px">${Object.entries(S.chars).map(([k,v])=>`<span class="pill">${k} ${v}</span>`).join('')}</div><div class="small" style="margin-top:8px">WT ${woundThreshold()} · ST ${strainThreshold()} · Force Rating ${S.forceRating}</div></div><div class="card"><b>XP</b><div>Starting ${S.xpStart} · Spent ${S.xpSpent} · Remaining <span class="gold">${S.xpStart-S.xpSpent}</span></div><div class="small" style="margin-top:6px">${freeDone?'Free skill picks complete.':`Finish ${cap} career + 2 specialization free ranks.`}</div></div></div><div class="card" style="margin-top:10px"><b>Trained skills</b><div class="small">${Object.entries(S.skills).filter(x=>x[1]).map(([k,v])=>`${k} ${v}`).join(' · ')||'None'}</div></div><div class="card" style="margin-top:10px"><b>Talents</b><div class="small">${allOwnedSpecNodes().map(n=>n.name).join(' · ')||'None'}</div></div><div class="card" style="margin-top:10px"><b>Universal specializations</b><div class="small">${S.universalSpecs.join(' · ')||'None'}</div></div><div class="card" style="margin-top:10px"><b>Force</b><div class="small">FR ${S.forceRating} · ${Object.entries(S.forceOwned).map(([p,set])=>`${p}: ${set.size}`).join(' · ')} · Morality ${S.morality} · Conflict ${S.conflict}</div></div>`;$('finalize').disabled=S.finalized||!freeDone}
function renderHud(){
  $('xpHud').innerHTML=S.finalized?`Earned XP available: <b>${S.earnedXp}</b><div class="tiny">${S.name} · ${S.career}/${S.spec}</div>`:`Starting XP <b>${S.xpStart}</b> · Spent <b>${S.xpSpent}</b> · Remaining <b>${S.xpStart-S.xpSpent}</b>`;
  $('adventureTab').disabled=!S.finalized;if($('shipTab'))$('shipTab').disabled=!S.ship?.owned;updateGlobalStatus();renderQuickHud();applyVisualSettings()
}
function renderLogs(){$('buildLog').innerHTML=S.buildLog.map(x=>`<div>${x}</div>`).join('')||'<div class="small">No build events yet.</div>';$('gameLog').innerHTML=S.gameLog.map(x=>`<div>${x}</div>`).join('')||'<div class="small">No session events yet.</div>'}
function finalize(){let cap=careerPickCap();if(S.freeCareer.length!==cap||S.freeSpec.length!==2){bLog('Complete your free skill selections first.');return}S.name=$('name').value.trim()||'Unnamed Drifter';let carry=Math.max(0,S.xpStart-S.xpSpent);S.earnedXp+=carry;S.finalized=true;let forms=['Niman Disciple','Soresu Defender','Makashi Duelist','Ataru Striker','Shien Expert','Shii-Cho Knight'];S.weapon=forms.includes(S.spec)?'lightsaber':S.career==='Bounty Hunter'||S.career==='Hired Gun'?'carbine':S.career==='Smuggler'?'pistol':'holdout';S.armor=S.armor||'heavyClothing';S.ep15={initialized:true,location:'cantina',mainStage:0,dungeonStage:0,quests:{},rep:{Rebels:0,Hutts:0,Empire:0,Guild:0,Local:0},intel:0,salvage:0,visited:{},flags:{},loot:{},completed:[],lastNpc:null};ensurePhase15State();ensureInventory();bLog(`Character finalized. ${carry} unspent creation XP carried into advancement. Episode 0 unlocked.`);renderAll();renderNavTab('adventure')}
function serializableState(){
  ensurePhase9State();ensurePhase16State();return {...S,schemaVersion:52,talents:[...S.talents],specTalents:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,[...v]])),forceOwned:Object.fromEntries(Object.entries(S.forceOwned).map(([k,v])=>[k,[...v]])),
    universalTalents:Object.fromEntries(Object.entries(S.universalTalents).map(([k,v])=>[k,[...v]]))}
}
function save(){
  try{
    let current=localStorage.getItem(RC_SAVE_KEY);if(current)localStorage.setItem(RC_BACKUP_KEY,current);
    S.lastSaved=new Date().toISOString();localStorage.setItem(RC_SAVE_KEY,JSON.stringify(serializableState()));bLog('Saved Phase 52 Exploration & Mobile build. Previous manual save preserved as backup.');updateGlobalStatus();renderGuide()
  }catch(err){showRuntimeError(`Save failed: ${err.message}`)}
}
function load(){
  let candidates=saveCandidates();if(!candidates.length){bLog('No local save found.');return}
  let failures=[];
  for(const pick of candidates){
    try{
      let label=pick.key===RC_SAVE_KEY?'manual save':pick.key===RC_AUTO_KEY?'autosave':pick.key===RC_BACKUP_KEY?'backup save':`migrated ${pick.key}`;
      hydrateState(JSON.parse(pick.raw),label);if(failures.length)bLog(`Recovered after skipping ${failures.length} unreadable save slot(s).`);return
    }catch(err){failures.push(`${pick.key}: ${err.message}`)}
  }
  showRuntimeError(`No readable save could be loaded. ${failures.join(' | ')}`)
}
function exportJSON(){
  try{let data=JSON.stringify(serializableState(),null,2),blob=new Blob([data],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${(S.name||'Sable_Reach').replace(/[^a-z0-9]+/gi,'_')}_Sable_Reach_v1_2_Save.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);bLog('Full save exported.')}catch(err){showRuntimeError(`Export failed: ${err.message}`)}
}
function reset(){newGame()}

/* Phase 17: adventure presentation, Episode 0 scenes and faction resolution. */
function crewRender(){
  ensurePhase13State();updateQuestLocks();
  $('crew').innerHTML=CREW.map(c=>{let tier=approvalTier(S.approval[c.id]||0),st=actorState(c.id),p=crewProgress(c.id);
    return`<button class="choice" data-crew="${c.id}"><b>${c.name}</b> ${S.crew.includes(c.id)?'<span class="tag">ACTIVE</span>':''}<div class="tiny">${c.role} · ${COMPANION_ROLES[p.role].name} · XP ${p.xp} · <span class="approval ${tier.cls}">${S.approval[c.id]} ${tier.label}</span> · W ${st.wounds}/${actorWT(c.id)} · Quest ${p.quest.status}</div></button>`}).join('');
  document.querySelectorAll('[data-crew]').forEach(b=>b.onclick=()=>toggleCrewActive(b.dataset.crew));renderAdventureDestiny()
}
function subFor(skill,ctx={}){
  let q=bestActor(skill,ctx);
  return `<span class="choice-meta"><b>${q.actor.name}</b> · ${skill} ${q.rank} · ${q.ch} ${q.val}</span><div style="margin-top:5px">${dicePoolHTML(q.p)}</div>${S.destinyPending.allyUpgrade?'<span class="gold">Light Destiny upgrade queued</span>':''}${q.actor.id==='pc'&&enhanceSupports(skill)&&forceAvailable()>0?' <span class="good">Enhance available</span>':''}`
}
function addChoice(label,sub,fn){
  let b=document.createElement('button'),idx=$('choices').children.length+1;
  b.className='choice';b.dataset.choiceIndex=idx;
  b.innerHTML=`<b>${label}</b><div class="tiny" style="margin-top:5px">${sub}</div>`;
  b.onclick=fn;$('choices').appendChild(b)
}
function resolveSceneCheck(skill,ctx,next,failCombat=null){
  let x=performBest(skill,ctx);
  if(x.r.ok){
    S.scene=next;S.earnedXp+=5;awardCrewXP(2,'field experience');
    if(x.q.actor.id!=='pc')changeApproval(x.q.actor.id,1,'trusted to handle a key check');
    gLog(`${x.q.actor.name} succeeds with ${skill}. +5 XP.`);updateQuestLocks();renderAdventure()
  }else if(failCombat){gLog(`${x.q.actor.name} fails ${skill}; encounter begins.`);startCombat(failCombat)}
  else{let loss=Math.max(1,1-talentRank('Resolve'));S.strain=Math.min(strainThreshold(),S.strain+loss);gLog(`${x.q.actor.name} fails ${skill}. +${loss} strain.`);renderAdventure()}
}
function renderAdventure(){
  ensurePhase15State();
  $('wounds').textContent=`${S.wounds}/${woundThreshold()}`;$('strain').textContent=`${S.strain}/${strainThreshold()}`;$('soak').textContent=playerSoak();$('earnedXp').textContent=S.earnedXp;$('adventureCredits').textContent=Number(S.credits||0).toLocaleString();$('choices').innerHTML='';
  $('adventureWoundBar').innerHTML=meterHTML('Wounds',S.wounds,woundThreshold(),'wound');$('adventureStrainBar').innerHTML=meterHTML('Strain',S.strain,strainThreshold(),'strain');
  let e=S.ep15,loc=EP15_LOCATIONS[e.location]||EP15_LOCATIONS.cantina,p=loc.zone,t=loc.name,story=[],choice=(a,b,f)=>addChoice(a,b,f);
  e.visited[e.location]=true;

  if(e.location==='cantina'){
    story=['The Cinder Spire is the social heart of Sable Reach: bounty hunters at one wall, freighter crews at another, and Rhea Sol pretending she cannot hear half the deals made under her roof.'];
    if(e.mainStage===0){
      story.push('Rumors are spreading that an Imperial courier came down somewhere beyond the eastern ash ridge.');
      choice('Work the room for crash-site rumors · Average',subFor('Streetwise',{diff:2}),()=>epMainLead('Streetwise',{diff:2}));
      choice('Ask Rhea directly · Easy',subFor('Charm',{diff:1}),()=>epMainLead('Charm',{diff:1}));
      choice('Pose as an Imperial recovery contractor · Average',subFor('Deception',{diff:2,setback:1}),()=>epMainLead('Deception',{diff:2,setback:1}));
    }else{
      choice('Talk with Rhea Sol','Local rumors and settlement information',()=>epTalk('rhea'));
      if(epQuest('bounty').status!=='complete')choice('Meet bounty broker Vesk Anlow',epQuest('bounty').status==='available'?'New side quest available':`Bounty status: ${epQuest('bounty').status}`,()=>epBountyLocate());
      if(e.mainStage>=4&&!S.flags.faction)choice('Ask who is buying Imperial intelligence','Points toward the Underworks',()=>epGo('underworks'));
    }
  }else if(e.location==='market'){
    story=['Dustline Market is a maze of welded awnings, repulsor carts, repair stalls, and goods whose serial numbers have conveniently worn away.'];
    choice('Open Equipment / Market tab','Buy gear, attachments, reloads, and supplies',()=>renderNavTab('equipment'));
    if(epQuest('meds').status!=='complete')choice('Investigate the missing clinic shipment',subFor('Streetwise',{diff:2}),epMedsQuest);
    choice('Listen for faction chatter · Average',subFor('Streetwise',{diff:2}),()=>epCheck('Streetwise',{diff:2},()=>{e.intel++;gLog('You collect another useful thread of local intelligence.')} ,null,'Market intelligence'));
  }else if(e.location==='clinic'){
    story=['Rinn Clinic is too small, too crowded, and somehow still open. Its power flickers whenever the settlement condenser coughs.'];
    choice('Talk with Dr. Meela Rinn','Clinic services and local problems',()=>epTalk('meela'));
    if(epQuest('water').status!=='complete')choice('Repair the failing water condenser · Average',subFor('Mechanics',{diff:2}),epWaterQuest);
    if(epQuest('missing').status!=='complete')choice('Ask about the missing scout','Unlock or continue The Missing Scout',()=>{if(epQuest('missing').status==='available')epStartQuest('missing');epGo('ash')});
    choice('Use the Recovery tab','Medicine, strain recovery, Critical Injury treatment',()=>renderNavTab('recovery'));
  }else if(e.location==='underworks'){
    story=['Beneath Sable Reach, abandoned utility galleries have become neutral ground for couriers, fixers, and people who do not want the Empire noticing their business.'];
    if(e.mainStage>=4&&e.flags.cipherCore&&!S.flags.faction){
      story.push('Four buyers have surfaced for the Cipher Core: Sila Tor for the Rebellion, Garr Vesh for a Hutt kajidic, an Imperial intermediary, and Vesk’s independent Guild channel.');
      choice('Give the Cipher Core to Sila Tor — Rebels','Rebel reputation; help with Imperial access codes',()=>faction('Rebels'));
      choice('Sell the Cipher Core through Garr Vesh — Hutts','Highest immediate cash payout',()=>faction('Hutts'));
      choice('Deal with the Imperial intermediary','Imperial reputation; dangerous consequences',()=>faction('Empire'));
      choice('Keep a copy and route it through the Guild','Guild reputation; balanced payout',()=>faction('Guild'));
    }else{
      choice('Speak with Sila Tor',`Rebel courier · reputation ${e.rep.Rebels}`,()=>epTalk('sila'));
      choice('Speak with Garr Vesh',`Hutt fixer · reputation ${e.rep.Hutts}`,()=>epTalk('garr'));
      if(epQuest('ledger').status!=='complete'&&e.mainStage>=4)choice('Take Garr’s Black Ledger job',subFor('Skulduggery',{diff:3}),epLedgerQuest);
      if(S.flags.faction&&e.mainStage<6)choice('Plan the strike on the Imperial listening post','Begin the dungeon / base sequence',epEnterOutpost);
    }
  }else if(e.location==='ash'){
    story=['The Ash Flats are a wind-scoured sea of black glass, basalt ridges, dead machinery, and sudden storms that erase tracks in minutes.'];
    if(e.mainStage===1)choice('Navigate to the courier wreck · Average',subFor('Survival',{diff:2}),epNavigateAsh);
    if(epQuest('missing').status==='available'||epQuest('missing').status==='active')choice('Track the missing scout · Average',subFor('Survival',{diff:2}),epMissingScoutSearch);
    if(e.mainStage>=2)choice('Travel to the crash site','Main quest location',()=>epGo('crash'));
    if(e.mainStage>=2&&epQuest('signal').status!=='complete')choice('Investigate the dead sensor mast','Ghost Signal side quest',()=>epGo('sensor'));
  }else if(e.location==='crash'){
    story=['The courier lies split across a basalt shelf. Its forward section still burns; the armored data vault survived almost untouched.'];
    if(e.mainStage===2||e.mainStage===3){
      if(!e.flags.cipherCore){
        choice('Slice the vault · Hard',subFor('Computers',{diff:3,setback:1,security:true}),()=>epOpenVault('Computers',{diff:3,setback:1,security:true}));
        choice('Bypass the lock actuators · Average',subFor('Mechanics',{diff:2,setback:1,security:true}),()=>epOpenVault('Mechanics',{diff:2,setback:1,security:true}));
        choice('Force the damaged hatch · Hard',subFor('Athletics',{diff:3}),()=>epOpenVault('Athletics',{diff:3}));
      }else if(e.mainStage===3){
        story.push('A patrol beacon begins chirping inside the wreck. Imperial recovery troops are almost on top of you.');
        choice('Ambush the Imperial recovery patrol','Structured combat; stormtrooper minion group and officer',epStartPatrol);
        choice('Attempt a hard bluff before they deploy',subFor('Deception',{diff:3,setback:1}),()=>epCheck('Deception',{diff:3,setback:1},()=>{mainAdvance(4,'underworks');S.earnedXp+=8;gLog('The patrol buys the forged recovery story long enough for the crew to disappear. +8 XP.')},()=>startCombat('ep15Patrol'),'Bluffing the recovery patrol'));
      }
    }else{
      choice('Scavenge the debris field · Average',subFor('Perception',{diff:2}),()=>epCheck('Perception',{diff:2},()=>{if(!e.flags.extraSalvage){e.flags.extraSalvage=true;e.salvage++;S.credits+=75;gLog('Useful salvage recovered: +75 credits.')}else gLog('The easy salvage has already been stripped.')},null,'Searching the crash debris'));
      choice('Return to the Ash Flats','Wilderness hub',()=>epGo('ash'));
    }
  }else if(e.location==='camp'){
    story=['Korda Venn’s scavenger camp sits inside a ring of wrecked crawler hulls. Spotters watch every approach with macrobinoculars and rifles.'];
    if(epQuest('bounty').status!=='complete'){
      choice('Demand Korda surrender · Hard',subFor('Coercion',{diff:3}),epBountyTalkDown);
      choice('Take Korda by force','Bounty combat',()=>startCombat('ep15Bounty'));
    }else choice('Search the abandoned camp · Average',subFor('Perception',{diff:2}),()=>epCheck('Perception',{diff:2},()=>{if(!e.flags.campLoot){e.flags.campLoot=true;S.credits+=100;S.reloads++;gLog('The camp yields 100 credits and an extra reload.')}},null,'Searching Korda’s camp'));
  }else if(e.location==='sensor'){
    story=['The broken sensor mast should be dead, but one battered transmitter continues sending a repeating Imperial authentication burst toward the northern escarpment.'];
    if(epQuest('signal').status!=='complete'){
      choice('Decode the transmission · Average',subFor('Computers',{diff:2}),epSignalQuest);
      choice('Interpret the military handshake · Average',subFor('Knowledge (Warfare)',{diff:2}),()=>epCheck('Knowledge (Warfare)',{diff:2},()=>{e.intel+=2;epRewardLoot('sensorParts');epCompleteQuest('signal',6,0);epRep('Rebels',1,'identified the listening-post channel')},null,'Analyzing the ghost signal'));
    }else choice('Use the mast as a lookout · Easy',subFor('Perception',{diff:1}),()=>epCheck('Perception',{diff:1},()=>{e.flags.outpostRecon=true;gLog('The listening post’s exterior patrol pattern is mapped. Future infiltration checks gain better positioning.')},null,'Reconnaissance'));
  }else if(e.location==='outpostGate'){
    story=['The Imperial listening post is cut directly into the escarpment. Sensor dishes turn above a checkpoint, and a service trench disappears beneath the main wall.'];
    if(e.dungeonStage===0){
      choice('Ghost through the service trench',subFor('Stealth',{diff:3,setback:e.flags.outpostRecon?0:1}),()=>epOutpostGate('Stealth',{diff:3,setback:e.flags.outpostRecon?0:1}));
      choice('Use faction-provided codes',subFor('Deception',{diff:S.flags.faction==='Empire'?1:S.flags.faction==='Rebels'?2:3}),()=>epOutpostGate('Deception',{diff:S.flags.faction==='Empire'?1:S.flags.faction==='Rebels'?2:3}));
      choice('Hit the checkpoint head-on','Combat against security troops',()=>startCombat('ep15Outpost'));
    }else choice('Proceed to the service level','Dungeon stage 2',()=>epGo('outpostService'));
  }else if(e.location==='outpostService'){
    story=['Coolant pipes, maintenance gantries, and droid charging alcoves fill the service level. The hangar lifts are above, but the command deck controls their locks.'];
    if(e.dungeonStage<2){
      choice('Loop the security cameras · Hard',subFor('Computers',{diff:3,security:true}),()=>epOutpostService('Computers',{diff:3,security:true}));
      choice('Reroute power around the blast doors · Average',subFor('Mechanics',{diff:2}),()=>epOutpostService('Mechanics',{diff:2}));
      choice('Raid the armory cage · Hard',subFor('Skulduggery',{diff:3}),()=>epOutpostService('Skulduggery',{diff:3}));
    }else choice('Take the turbolift to the command deck','Dungeon stage 3',()=>epGo('outpostCommand'));
  }else if(e.location==='outpostCommand'){
    story=['The command deck overlooks a tactical holotable showing the courier crash, Sable Reach, and a freighter impounded in Hangar Twelve. Chief Varrik has been using the post to erase witnesses and redirect patrols.'];
    if(e.dungeonStage<3){
      choice('Slice the launch-control network · Hard',subFor('Computers',{diff:3,security:true}),()=>epOutpostCommand('Computers',{diff:3,security:true}));
      choice('Forge a hangar evacuation order · Hard',subFor('Deception',{diff:3}),()=>epOutpostCommand('Deception',{diff:3}));
      choice('Physically override the hangar relays · Hard',subFor('Mechanics',{diff:3}),()=>epOutpostCommand('Mechanics',{diff:3}));
    }else choice('Descend to Hangar Twelve','Finale',()=>epGo('hangar'));
  }else if(e.location==='hangar'){
    story=['A battered light freighter sits fueled on the launch pad. Chief Varrik waits between you and the boarding ramp, surrounded by the survivors of the listening-post security force.'];
    if(e.mainStage<9){
      choice('Confront Chief Varrik','Final boss encounter',()=>startCombat('ep15Boss'));
      if(S.forceOwned.Move.has('m-basic'))choice('Turn the hangar machinery against Varrik','Force shortcut; dangerous if it fails',()=>forceSceneMove());
    }else choice('Board the freighter','Episode 0 is complete',()=>epGo('orbit'));
  }else{
    S.ship.owned=true;story=[`The ${S.ship.name} clears the atmosphere with Sable Reach shrinking behind it.`,`${e.completed.length} side quest(s) completed · Intel ${e.intel} · final reputation: Rebels ${e.rep.Rebels}, Hutts ${e.rep.Hutts}, Empire ${e.rep.Empire}, Guild ${e.rep.Guild}.`,'Episode 0 remains open for free-roam side content, companion missions, advancement, equipment work, and the ship systems.'];
    choice('Open the Ship hub','Crew stations, upgrades, travel, starship combat',()=>renderNavTab('ship'));
    choice('Return to Sable Reach','Free-roam unfinished side quests',()=>epGo('cantina'));
  }

  $('place').textContent=p;$('sceneTitle').textContent=t;$('story').innerHTML=story.map(x=>`<p>${x}</p>`).join('');
  $('sceneHero').dataset.scene=e.location;$('sceneIcon').textContent=locationIcon(e.location);$('sceneObjective').textContent=objectiveText();
  let ah=contextualAdventureHint();$('adventureHint').classList.toggle('hidden',!ah);$('adventureHint').textContent=ah;
  crewRender();renderLast();renderEpisodeMap();renderQuestTracker();renderLogs();safeAutosave()
}
function faction(f){
  ensurePhase15State();if(S.flags.faction)return;
  S.flags.faction=f;mainAdvance(5,'underworks');S.earnedXp+=10;
  const shifts={Rebels:{kira:3,lena:6,tavo:1},Hutts:{kira:-2,lena:-1,tavo:3},Empire:{kira:-8,lena:-8,tavo:-4},Guild:{kira:1,lena:1,tavo:5}};
  const rewards={Rebels:{credits:150,rep:3,intel:2},Hutts:{credits:450,rep:3,intel:1},Empire:{credits:300,rep:3,intel:2},Guild:{credits:250,rep:3,intel:1}};
  let rw=rewards[f];S.credits+=rw.credits;S.ep15.intel+=rw.intel;epRep(f,rw.rep,'Cipher Core decision');
  Object.entries(shifts[f]||{}).forEach(([id,d])=>changeApproval(id,d,`${f} Cipher Core decision`));
  awardCrewXP(4,'Cipher Core decision',CREW.map(c=>c.id));for(const c of CREW)crewProgress(c.id).lastLine=factionReaction(c.id);
  if(f==='Rebels')S.ep15.flags.rebelCodes=true;if(f==='Empire')S.ep15.flags.imperialCodes=true;if(f==='Guild')S.ep15.flags.guildTracker=true;if(f==='Hutts')S.ep15.flags.huttRoute=true;
  gLog(`Cipher Core outcome: ${f}. +10 XP, +${rw.credits} credits. The Imperial listening-post route is now known.`);updateQuestLocks();renderAll()
}

function forceSceneMove(){
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);S.last={forceOnly:true,force:fr,label:'Move'};
  if(use.ok){mainAdvance(9,'orbit');S.ship.owned=true;S.earnedXp+=20;awardCrewXP(8,'Force-assisted escape');epRewardLoot('bossLocker');gLog(`Move succeeds (${fr.faces.join(' ')}). Hangar machinery tears open Varrik’s blockade and the crew escapes. +20 XP.`)}
  else{S.ep15.flags.bossReinforced=true;gLog(`Move fails to generate a usable Force point (${fr.faces.join(' ')}). Varrik orders the remaining guards into the hangar.`)}
  renderAdventure()
}
function renderLast(){
  if(!S.last){$('lastCheck').innerHTML='<span class="tiny">No roll yet.</span>';return}
  if(S.last.forceOnly){
    $('lastCheck').innerHTML=`<b>${S.last.label}</b><div style="margin-top:6px">${S.last.force.faces.join(' ')} · Light ${S.last.force.light} · Dark ${S.last.force.dark}</div>`;
    return
  }
  let x=S.last;
  $('lastCheck').innerHTML=`<b>${x.q.actor.name}</b><div class="tiny">${x.q.skill} ${x.q.rank} · ${x.q.ch} ${x.q.val}</div><div style="margin-top:7px">${dicePoolHTML(x.q.p)}</div>${resultHTML(x.r)}${x.force?`<div class="tiny" style="margin-top:6px">Force: ${x.force.faces.join(' ')} · Light ${x.force.light} / Dark ${x.force.dark}</div>`:''}`
}

const RANGE_NAMES=['Engaged','Short','Medium','Long','Extreme'];

function rangeIndex(name){
  const i=RANGE_NAMES.indexOf(name);
  return i<0?0:i
}

/* Phase 17: tactical combat, criticals, qualities and encounter resolution. */
function weaponRangeIndex(w){return rangeIndex(w.range)}
function rangeDifficulty(skill,range){
  if(skill==='Brawl'||skill==='Melee'||skill==='Lightsaber')return range===0?2:99;
  if(range===0)return skill==='Ranged (Heavy)'?3:2;
  return [0,1,2,3,4][range];
}
function quality(w,k){
  let q=w?.qualities||{},v=q[k];
  if(v===true)return 1;if(Number.isFinite(Number(v)))return Number(v)||0;
  let list=Array.isArray(q)?q:(typeof q==='string'?q.split(','):[]);
  let hit=list.find(x=>String(x).toLowerCase().startsWith(k.toLowerCase()));
  if(!hit)return 0;let m=String(hit).match(/(\d+)/);return m?Number(m[1]):1
}
function hasQuality(w,k){return quality(w,k)>0||w?.qualities?.[k]===true}
function squadActors(){ensureCrewState();ensurePhase13State();return [{id:'pc',name:S.name,c:S.chars,sk:S.skills,weapon:S.weapon,armor:S.armor,wt:woundThreshold(),st:strainThreshold(),soak:playerSoak(),def:playerDefense('ranged')},...S.crew.map(id=>{let c=effectiveCrew(id);return c?({...c,state:S.crewState[id]}):null}).filter(Boolean)]}
function actorWeapon(a){return effectiveWeapon(a.weapon||S.weapon)}
function unarmedWeapon(){
  let base=COMBAT_SPECIAL_WEAPONS.unarmed,crit=Math.max(1,(base.crit||5)-talentRank('Iron Body')),
      pierce=hasTalent("Acklay's Scything Strike")?effectiveForceRating():0;
  return{...base,crit,qualities:{...(base.qualities||{}),...(pierce?{pierce}: {})}}
}
function downgradeDifficultyPool(p,n=1){
  while(n-->0){
    if((p.challenge||0)>0){p.challenge--;p.difficulty=(p.difficulty||0)+1}
  }
  return p
}
function spendTalentDestiny(label){
  if(S.destiny.light<1){cLog(`${label} requires a light Destiny Point.`);return false}
  S.destiny.light--;S.destiny.dark++;cLog(`${label}: 1 light Destiny Point flips to dark.`);return true
}
function pcCriticalBonus(w,target=null){
  let bonus=10*talentRank('Lethal Blows');
  if(w?.skill==='Lightsaber'&&hasTalent('Juyo Savagery'))bonus+=5*(S.destiny.dark||0);
  if(target?.beast)bonus+=10*talentRank('Hunter');
  return bonus
}
function effectiveCritRating(w,target,actorId='pc'){
  if(!w?.crit)return 99;
  let crit=w.crit;
  if(actorId==='pc'&&target&&!target.hasActedEncounter&&hasTalent('Sorry About the Mess'))crit=Math.max(1,crit-1);
  return crit
}
function deadlyAccuracyDamage(skill){
  return hasTalent('Deadly Accuracy')&&S.deadlyAccuracySkill===skill?(S.skills[skill]||0):0
}
function combatNaturalReroll(skill,p,r){
  if(r.ok)return r;
  let o=null;
  if(['Brawl','Melee'].includes(skill)&&hasTalent('Natural Brawler')&&!S.sessionUsed.naturalBrawler)o={name:'Natural Brawler',key:'naturalBrawler'};
  if(['Ranged (Light)','Ranged (Heavy)'].includes(skill)&&hasTalent('Natural Marksman')&&!S.sessionUsed.naturalMarksman)o={name:'Natural Marksman',key:'naturalMarksman'};
  if(o&&confirm(`Use ${o.name} to reroll this failed ${skill} check?`)){S.sessionUsed[o.key]=true;return rollNarr({...p})}
  return r
}
function initiativeRoll(actor,skill){
  const ch=SKILL_CHAR[skill]||'Willpower';
  let rank=0;
  if(actor.sk) rank=actor.sk[skill]||0;
  else if(actor.type==='minion'&&actor.groupSkills?.includes(skill)) rank=Math.max(0,(actor.members||1)-1);
  else if(actor.skill===skill) rank=actor.rank||0;
  else rank=actor[skill==='Cool'?'coolRank':'vigilanceRank']||0;

  const p=makePool(effectiveCharacteristic(actor,ch),rank,0);
  if(actor.id==='pc'&&skill==='Vigilance')p.boost=(p.boost||0)+talentRank('Uncanny Reactions');
  const r=rollNarr(p);let autoAdv=0,foresee=null;
  if(actor.id==='pc'){
    let rr=talentRank('Rapid Reaction'),capacity=Math.max(0,strainThreshold()-S.strain),max=Math.min(rr,capacity);
    if(max>0&&confirm(`Use Rapid Reaction? Suffer up to ${max} strain to add the same number of Successes to Initiative.`)){
      let n=Math.max(0,Math.min(max,Number(prompt('Rapid Reaction strain to suffer',String(max)))||0));
      if(n){S.strain+=n;r.ns+=n;r.ok=r.ns>0}
    }
  }
  if(actor.id==='pc'&&hasAttachment(S.armor,'threatMonitor'))autoAdv=1;
  if(actor.id==='pc'&&S.forceOwned.Foresee.has('f-ctl-init')&&forceAvailable()>0&&confirm('Use Foresee with this Initiative check?')){
    let fr=rollForce(forceAvailable()),usable=preferredForcePips(fr),opp=oppositeForcePips(fr);
    if(opp>0&&canUseOppositePips()&&confirm(`Foresee rolled ${opp} opposite-alignment Force point${opp===1?'':'s'}. Use them too?`)){
      let paid=useForcePoints(fr,usable+opp);if(paid.ok)usable+=opp
    }
    if(usable>0){
      r.ns+=usable;
      let magnitude=[...S.forceOwned.Foresee].filter(x=>x.startsWith('f-mag')).length;
      foresee={faces:fr.faces,usable,targets:1+magnitude,defense:S.forceOwned.Foresee.has('f-ctl-defense'),maneuver:S.forceOwned.Foresee.has('f-ctl-maneuver')};
      S.pendingForeseeCombat=foresee;
      cLog?.(`Foresee adds ${usable} automatic Initiative success${usable===1?'':'es'}. Force ${fr.faces.join(' ')}`)
    }
  }
  r.na+=autoAdv;
  return {side:actor.side,id:actor.id,name:actor.name,success:r.ns,adv:r.na,raw:r,skill,rank,foresee};
}
function buildInitiative(enemies,prepared){
  let slots=[];
  squadActors().filter(a=>!actorIsIncapacitated(a.id)).forEach(a=>slots.push(initiativeRoll({...a,side:'PC'},prepared?'Cool':'Vigilance')));
  enemies.forEach(e=>slots.push(initiativeRoll({...e,side:'NPC'},'Vigilance')));
  slots.sort((a,b)=>b.success-a.success||b.adv-a.adv||(a.side==='PC'?-1:1));
  return slots.map((x,i)=>({side:x.side,success:x.success,adv:x.adv,index:i}));
}
function enemyDefeated(e){
  if(e.fled)return true;
  if(e.type==='minion')return e.members<=0;
  if(e.type==='nemesis'&&Number.isFinite(e.strainNow)&&e.strainNow>(e.st||e.wt))return true;
  return e.w>e.wt
}
function activeEnemies(){
  return S.combat ? S.combat.enemies.filter(e=>!enemyDefeated(e)) : [];
}
function currentSlot(){
  return S.combat?.slots?.[S.combat.slotIndex]||null;
}

/* Phase 21: abstract per-unit tactical positions. Position steps map directly to narrative range bands. */
function clampTacticalPos(v){return Math.max(0,Math.min(8,Math.round(Number(v)||0)))}
function enemyAIRole(e){
  if(e.aiRole)return e.aiRole;
  let n=(e.name||'').toLowerCase(),skill=e.skill||'Ranged (Heavy)',wr=rangeIndex(e.range||'Medium');
  if(['Brawl','Melee','Lightsaber'].includes(skill))return'melee';
  if(n.includes('officer')||n.includes('agent'))return'officer';
  if(e.type==='nemesis')return'commander';
  if(skill==='Ranged (Heavy)'&&(wr>=3||(e.rank||0)>=3))return'sniper';
  if(skill==='Ranged (Light)')return'skirmisher';
  return'rifle'
}
function applyEncounterTacticalPreset(C){
  if(C.phase22Preset)return;C.phase22Preset=true;
  const set=(id,pos,cover=false)=>{if(C.positions[id]!=null)C.positions[id]=clampTacticalPos(pos);let e=C.enemies.find(x=>x.id===id);if(e)e.cover=cover};
  if(C.kind==='patrol'||C.kind==='ep15Patrol'){set('trooper-group',5,true);set('officer',6,true)}
  if(C.kind==='ep15Beasts'){set('ash-pack',4,false);set('ash-alpha',6,false)}
  if(C.kind==='ep15Bounty'){set('korda',7,true);set('raiders',5,true);let k=C.enemies.find(e=>e.id==='korda');if(k)k.highGround=true}
  if(C.kind==='ep15Outpost'){set('security-droids',4,true);set('ia-agent',6,true)}
  if(C.kind==='ep15Boss'){set('varrik',6,true);set('trooper-group',5,true);set('hangar-droids',7,true);C.markedTarget='pc';C.markedUntil=2}
  if(C.kind==='boss'){set('varrik',6,true);set('security-group',5,true);C.markedTarget='pc';C.markedUntil=2}
}
function initializeTacticalState(C){
  C.positions=C.positions||{};C.overwatch=C.overwatch||{};C.setTriggerUsed=C.setTriggerUsed||{};C.suppressionLog=C.suppressionLog||[];
  const squad=squadActors();
  squad.forEach((a,i)=>{if(C.positions[a.id]==null)C.positions[a.id]=2-(i%2)});
  C.enemies.forEach((e,i)=>{
    e.aiRole=enemyAIRole(e);e.cover=!!e.cover;e.nextBoost=e.nextBoost||0;e.tacticalManeuverRound=e.tacticalManeuverRound||0;
    e.suppressed=e.suppressed||0;e.moraleCheckedRound=e.moraleCheckedRound||0;e.grenades=e.grenades||{};e.initialMembers=e.initialMembers||e.members||0;e.fled=!!e.fled;
    if(C.positions[e.id]==null){
      const roleBase={melee:4,skirmisher:5,rifle:5,sniper:6,officer:5,commander:5}[e.aiRole]??5;
      C.positions[e.id]=clampTacticalPos(roleBase+(i%2));
    }
  });
  applyEncounterTacticalPreset(C);
  C.lastAIIntent=C.lastAIIntent||'Enemy AI is evaluating positions and roles.';
}

function unitPosition(id){let C=S.combat;return C?.positions?.[id]??(id==='pc'?2:5)}
function setUnitPosition(id,pos){if(!S.combat)return;S.combat.positions=S.combat.positions||{};S.combat.positions[id]=clampTacticalPos(pos)}
function rangeBandBetween(aid,bid){return Math.min(4,Math.abs(unitPosition(aid)-unitPosition(bid)))}
function selectedEnemy(){
  let C=S.combat;if(!C)return null;
  let idx=Number($('target')?.value);return Number.isFinite(idx)?C.enemies[idx]:activeEnemies()[0]
}
function selectedCombatRange(actorId=null,target=null){
  let C=S.combat;if(!C)return 2;let aid=actorId||C.turn?.actorId||'pc',t=target||selectedEnemy();return t?rangeBandBetween(aid,t.id):2
}
function moveUnitToward(id,targetId,bands=1){
  let from=unitPosition(id),to=unitPosition(targetId),step=Math.sign(to-from);if(step===0)return false;
  setUnitPosition(id,from+step*Math.max(1,bands));return true
}
function moveUnitAway(id,targetId,bands=1){
  let from=unitPosition(id),to=unitPosition(targetId),step=Math.sign(from-to);
  if(step===0)step=from<=4?-1:1;
  let next=clampTacticalPos(from+step*Math.max(1,bands));
  if(next===from)return false;setUnitPosition(id,next);return true
}
function enemyPreferredRange(e){return({melee:0,skirmisher:1,rifle:2,sniper:3,officer:2,commander:2})[enemyAIRole(e)]??2}
function enemyTargetScore(e,a){
  let r=rangeBandBetween(e.id,a.id),st=actorState(a.id),woundPressure=actorWT(a.id)?st.wounds/actorWT(a.id):0,
      coverPenalty=st.conditions.cover?1.4:0,soakPenalty=actorSoak(a.id)*.16,role=enemyAIRole(e),score=woundPressure*4-coverPenalty-soakPenalty;
  if(role==='melee')score+=(4-r)*1.5;
  else if(role==='sniper')score+=Math.max(0,3-Math.abs(r-3))*1.1;
  else score+=Math.max(0,2-Math.abs(r-2))*.6;
  if(a.id==='pc'&&(role==='commander'||role==='officer'))score+=.7;
  return score
}
function chooseEnemyTarget(e=null){
  let options=squadActors().filter(a=>!actorIsIncapacitated(a.id));if(!options.length)return null;
  if(!e)return options[0];
  return options.sort((a,b)=>enemyTargetScore(e,b)-enemyTargetScore(e,a))[0]
}
function tacticalBandLabel(pos){
  if(pos<=1)return'Near flank';if(pos<=3)return'Forward';if(pos<=5)return'Center';if(pos<=7)return'Far flank';return'Rear'
}
function enemyTacticalIntent(e){
  let target=chooseEnemyTarget(e);if(!target)return{target:null,text:`${e.name}: no viable target.`};
  let role=enemyAIRole(e),r=rangeBandBetween(e.id,target.id),pref=enemyPreferredRange(e),max=rangeIndex(e.range||'Medium');
  let text=`${e.name} [${role}] targets ${target.name} at ${RANGE_NAMES[r]}. `;
  if(role==='melee'&&r>0)text+=r>1?'Will close aggressively, spending its action on movement if necessary.':'Will close and strike.';
  else if(role==='sniper'&&r<=1)text+='Will disengage to rebuild distance before firing.';
  else if(r>max)text+='Will move into weapon range.';
  else if((role==='rifle'||role==='skirmisher'||role==='sniper')&&!e.cover&&r>0)text+='Will take cover, then attack.';
  else if(role==='officer')text+='Will coordinate an ally, then attack if able.';
  else text+='Will aim or attack from its current position.';
  return{target,role,range:r,preferred:pref,text}
}

function enemyMoralePressure(e){
  if(e.moraleImmune||e.noRetreat)return 0;
  let woundRatio=e.type==='minion'?(e.initialMembers?1-(e.members/e.initialMembers):0):(e.wt?e.w/e.wt:0);
  let allyLoss=(S.combat?.enemies||[]).filter(x=>x.id!==e.id&&enemyDefeated(x)).length;
  let leaderDown=(S.combat?.enemies||[]).some(x=>(enemyAIRole(x)==='officer'||enemyAIRole(x)==='commander')&&enemyDefeated(x));
  return Math.min(1,woundRatio+allyLoss*.18+(leaderDown?0.18:0))
}
function enemyMoraleLabel(e){
  if(e.moraleImmune||e.noRetreat)return'Unshaken';
  if(e.retreating)return'Broken';
  let p=enemyMoralePressure(e);if(p>=.65)return'Wavering';if(p>=.35)return'Strained';return'Steady'
}
function checkEnemyMorale(e){
  let C=S.combat;if(!C||e.moraleImmune||e.noRetreat||e.retreating||e.moraleCheckedRound===C.round)return false;
  let pressure=enemyMoralePressure(e);if(pressure<.5)return false;
  e.moraleCheckedRound=C.round;
  let rank=e.disciplineRank||0;
  if(e.type==='minion'&&e.groupSkills?.includes('Discipline'))rank=Math.max(0,(e.members||1)-1);
  let diff=pressure>=.8?2:1,p=makePool(e.c?.Willpower||2,rank,diff),r=rollNarr(p);
  if(!r.ok){e.retreating=true;cLog(`${e.name} breaks under pressure and begins retreating. ${rtxt(r)}`);return true}
  cLog(`${e.name} holds its ground despite mounting losses. ${rtxt(r)}`);return false
}
function retreatStep(e){
  let pos=unitPosition(e.id),edge=pos<=4?0:8;
  if(pos===edge){e.fled=true;cLog(`${e.name} escapes the battlefield.`);return true}
  setUnitPosition(e.id,pos+(edge>pos?1:-1));e.cover=false;
  cLog(`${e.name} falls back toward the ${edge===0?'near':'far'} edge (P${unitPosition(e.id)}).`);
  if(triggerOverwatch(e))return true;
  return false
}
function enemyRetreatTurn(e){
  if(retreatStep(e)||enemyDefeated(e))return;
  retreatStep(e)
}
function enemyOfficerRally(e){
  let broken=activeEnemies().filter(x=>x.id!==e.id&&x.retreating&&!x.moraleImmune);if(!broken.length)return false;
  let p=makePool(e.c?.Presence||2,e.leadershipRank||0,2),r=rollNarr(p);
  if(r.ok){
    broken.forEach(x=>{x.retreating=false;x.moraleCheckedRound=S.combat.round;x.nextBoost=(x.nextBoost||0)+1});
    cLog(`${e.name} rallies ${broken.map(x=>x.name).join(', ')} back into the fight. ${rtxt(r)}`)
  }else cLog(`${e.name} tries to rally the line, but the order fails. ${rtxt(r)}`);
  return true
}
function partyAtPosition(pos){return squadActors().filter(a=>!actorIsIncapacitated(a.id)&&unitPosition(a.id)===pos)}
function enemiesAtPosition(pos){return activeEnemies().filter(e=>unitPosition(e.id)===pos)}
function bestPartyCluster(){
  let best=[];for(let pos=0;pos<=8;pos++){let g=partyAtPosition(pos);if(g.length>best.length)best=g}return best
}
function enemyGrenadeChoice(e){
  let cluster=bestPartyCluster();if(cluster.length<2)return null;
  for(const id of ['stun','frag','miniThermal']){
    if((e.grenades?.[id]||0)>0&&rangeBandBetween(e.id,cluster[0].id)<=1)return{id,target:cluster[0],cluster}
  }
  return null
}
function grenadePoolForActor(actor,target,g,commit=false){
  let id=actor.id,st=actorState(id),ri=rangeBandBetween(id,target.id);
  if(ri>1)return{invalid:true,reason:`${g.name} can only be thrown to Short range.`,actor,target,g,range:ri};
  let ch='Agility',rank=actor.sk?.['Ranged (Light)']||0,cm=criticalCheckMods(id,'Ranged (Light)',ch),
      diff=rangeDifficulty('Ranged (Light)',ri)+crippledDifficulty(id,'Ranged (Light)')+(st.conditions.nextDifficulty||0)+cm.diff,
      setback=(target.def||0)+(target.cover?1:0)+(st.conditions.disoriented>0?1:0)+(st.conditions.suppressed||0)*2+(st.conditions.nextSetback||0)+cm.setback,
      boost=approvalBoost(actor,'Ranged (Light)')+crewRoleBoost(actor,'Ranged (Light)',target)+(S.combat?.nextAllyBoost||0)+(id==='pc'&&S.foreseeBoost?1:0);
  if(cm.removeBoost)boost=0;
  let p=makePool(effectiveCharacteristic(actor,ch),rank,diff,boost,setback,(target.adversary||0)+(st.conditions.nextUpgrade||0)+cm.upgrade);
  if(commit){st.conditions.nextUpgrade=0;st.conditions.nextDifficulty=0;st.conditions.nextSetback=0}
  return{actor,target,g,range:ri,p,invalid:false}
}
function applyGrenadeDamage(target,g,r,label='Grenade'){
  let raw=g.damage+(r?.ns||0),dmg=Math.max(0,raw-target.soak);
  if(g.qualities?.stunDamage)applyEnemyStrain(target,dmg);else{target.w+=dmg;syncMinions(target)}
  cLog(`${label} hits ${target.name} for ${dmg}${g.qualities?.stunDamage?' strain-equivalent':''} damage.`);
  return dmg
}
function throwGrenade(id){
  let C=S.combat,T=C?.turn;if(!T||C.pendingSpend)return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let g=ORDNANCE[id],count=S.ordnance?.[id]||0,target=selectedEnemy(),actor=squadActors().find(a=>a.id===T.actorId);
  if(!g||!count||!target||!actor)return;
  let q=grenadePoolForActor(actor,target,g,true);if(q.invalid){cLog(q.reason);renderCombat();return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  S.ordnance[id]--;T.actionUsed=true;beforeCombatAction(actor.id);
  let usedLight=applyQueuedAllyDestiny(q.p,true),usedDark=maybeGMDarkDifficulty(q.p,`${actor.name}'s ${g.name} throw`),r=rollNarr(q.p),dmg=0;
  if(r.ok)dmg=applyGrenadeDamage(target,g,r,`${actor.name}'s ${g.name}`);else cLog(`${actor.name}'s ${g.name} misses ${target.name}. ${rtxt(r)}`);
  if(usedLight)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,g,r,dmg,q.p);C.nextAllyBoost=0;
  if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function enemyThrowGrenade(e,choice){
  let g=ORDNANCE[choice.id],target=choice.target,ri=rangeBandBetween(e.id,target.id);if(!g||ri>1)return false;
  e.grenades[choice.id]--;let rank=e.rank||0;if(e.type==='minion'&&e.groupSkills?.includes('Ranged (Light)'))rank=Math.max(0,(e.members||1)-1);
  let tc=actorState(target.id).conditions,setback=(tc.cover?1:0)+actorDefense(target.id,'ranged')+(e.suppressed||0)*2,
      p=makePool(e.c?.Agility||2,rank,rangeDifficulty('Ranged (Light)',ri),e.nextBoost||0,setback,target.id==='pc'?(S.combat.defUpgrade||0):0),r=rollNarr(p);
  e.nextBoost=0;
  cLog(`${e.name} throws a ${g.name} at ${target.name}. ${rtxt(r)}`);
  if(r.ok){
    let dmg=Math.max(0,g.damage+r.ns-actorSoak(target.id)-(target.id==='pc'?(S.combat.indomitableCommitted||0):0));if(g.qualities?.stunDamage)actorStrain(target.id,dmg);else actorDamage(target.id,dmg);
    cLog(`${target.name} suffers ${dmg}${g.qualities?.stunDamage?' strain':''} from the direct hit.`)
  }
  let blastCost=r.ok?2:3;if(r.na>=blastCost){
    let radius=g.blastRadius||0,origin=unitPosition(target.id);
    choice.cluster.filter(a=>a.id!==target.id&&Math.min(4,Math.abs(unitPosition(a.id)-origin))<=radius).forEach(a=>{
      let dmg=Math.max(0,(g.qualities?.blast||0)-actorSoak(a.id)-(a.id==='pc'?(S.combat.indomitableCommitted||0):0));if(g.qualities?.stunDamage)actorStrain(a.id,dmg);else actorDamage(a.id,dmg);
      cLog(`${a.name} is caught in the blast for ${dmg}${g.qualities?.stunDamage?' strain':''}.`)
    })
  }
  if(g.qualities?.disorient&&r.na>=2)choice.cluster.forEach(a=>{let st=actorState(a.id);st.conditions.disoriented=Math.max(st.conditions.disoriented||0,g.qualities.disorient)});
  return true
}
function suppressiveFire(){
  let C=S.combat,T=C?.turn;if(!T||C.pendingSpend)return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let actor=squadActors().find(a=>a.id===T.actorId),target=selectedEnemy(),w=actor&&actorWeapon(actor);if(!actor||!target||!w||['Brawl','Melee','Lightsaber'].includes(w.skill))return;
  let q=combatPool(actor,target,T.aim,0,true);if(q.invalid){cLog(q.reason);renderCombat();return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  q.p.difficulty=(q.p.difficulty||0)+1;T.actionUsed=true;beforeCombatAction(actor.id);
  let usedDark=maybeGMDarkDifficulty(q.p,`${actor.name}'s suppressive fire`),r=rollNarr(q.p);C.nextAllyBoost=0;
  if(r.ok){
    let affected=enemiesAtPosition(unitPosition(target.id));affected.forEach(e=>e.suppressed=Math.max(e.suppressed||0,r.tr?2:1));
    cLog(`${actor.name} suppresses ${affected.map(e=>e.name).join(', ')}. Their next combat check suffers 2 Setback dice. ${rtxt(r)}`)
  }else cLog(`${actor.name}'s suppressive fire fails to pin the target position. ${rtxt(r)}`);
  if(r.de&&actor.id==='pc'){C.outOfAmmo=C.outOfAmmo||{};C.outOfAmmo[S.weapon]=true;cLog(`${w.name} runs dry during suppressive fire.`)}
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);renderCombat()
}
function enemySuppressiveFire(e,target){
  let ri=rangeBandBetween(e.id,target.id),skill=e.skill||'Ranged (Heavy)',max=rangeIndex(e.range||'Medium');if(ri>max||rangeDifficulty(skill,ri)===99)return false;
  let rank=e.type==='minion'?(e.groupSkills?.includes(skill)?Math.max(0,e.members-1):0):(e.rank||0),p=makePool(e.c?.[SKILL_CHAR[skill]]||3,rank,rangeDifficulty(skill,ri)+1,0,actorState(target.id).conditions.cover?1:0,0),r=rollNarr(p);
  if(r.ok){
    let group=partyAtPosition(unitPosition(target.id));group.forEach(a=>{let st=actorState(a.id);st.conditions.suppressed=Math.max(st.conditions.suppressed||0,r.tr?2:1)});
    cLog(`${e.name} lays down suppressive fire on P${unitPosition(target.id)}, pinning ${group.map(a=>a.name).join(', ')}. ${rtxt(r)}`)
  }else cLog(`${e.name}'s suppressive fire fails to pin the squad. ${rtxt(r)}`);
  e.suppressionUsedRound=S.combat.round;return true
}
function applyEnemySpecial(e,target){
  let C=S.combat;if(e.special==='howl'&&!e.specialUsed){
    e.specialUsed=true;activeEnemies().filter(x=>x.beast).forEach(x=>x.nextBoost=(x.nextBoost||0)+1);
    cLog(`${e.name} unleashes a hunting howl; the ash stalkers gain a Boost on their next attacks.`)
  }
  if(e.special==='flanker'&&!e.specialUsed&&target){
    e.specialUsed=true;e.ignoreCoverOnce=true;e.nextBoost=(e.nextBoost||0)+1;
    cLog(`${e.name} uses a service corridor to flank ${target.name}, gaining a Boost and ignoring cover on the next attack.`)
  }
  if(e.special==='varrik'&&!e.surgeUsed&&e.w>=Math.ceil(e.wt/2)){
    e.surgeUsed=true;e.cover=true;e.nextBoost=(e.nextBoost||0)+2;C.markedTarget=target?.id||'pc';C.markedUntil=C.round+1;
    cLog(`${e.name} shifts to a hardened firing position and marks ${actorById(C.markedTarget)?.name||'the target'} for concentrated fire.`)
  }
}
function isLastNpcSlot(){let C=S.combat;if(!C)return true;return !C.slots.slice(C.slotIndex+1).some(s=>s.side==='NPC')}
function availableSideActors(side){
  if(!S.combat)return[];
  if(side==='PC') return squadActors().filter(a=>!S.combat.actedPC.includes(a.id)&&!actorIsIncapacitated(a.id)&&(!(actorState(a.id).conditions.slowedRound===S.combat.round)||isLastPcSlot()));
  return activeEnemies().filter(e=>!S.combat.actedNPC.includes(e.id)&&(!(e.slowedRound===S.combat.round)||isLastNpcSlot()));
}

function enemySet(kind){
  const stormGroup=(members=3)=>({id:'trooper-group',name:'Stormtrooper Fire Team',memberName:'Stormtrooper',type:'minion',members,initialMembers:members,perWt:5,w:0,wt:members*5,soak:5,def:0,c:{Brawn:3,Agility:3,Intellect:2,Cunning:2,Willpower:3,Presence:1},groupSkills:['Athletics','Discipline','Ranged (Heavy)','Vigilance'],skill:'Ranged (Heavy)',damage:9,crit:3,range:'Long',aiRole:'rifle'});
  if(kind==='patrol'||kind==='ep15Patrol')return[
    stormGroup(3),
    {id:'officer',name:'Imperial Recovery Officer',type:'rival',w:0,wt:11,soak:3,def:0,c:{Brawn:2,Agility:3,Intellect:3,Cunning:3,Willpower:3,Presence:3},skill:'Ranged (Light)',rank:2,vigilanceRank:1,coolRank:1,leadershipRank:2,damage:7,crit:3,range:'Medium',aiRole:'officer',grenades:{frag:1}}
  ];
  if(kind==='ep15Beasts')return[
    {id:'ash-pack',name:'Ash Stalker Pack',memberName:'Ash Stalker',type:'minion',members:3,initialMembers:3,perWt:4,w:0,wt:12,soak:3,def:0,c:{Brawn:3,Agility:3,Intellect:1,Cunning:2,Willpower:2,Presence:1},groupSkills:['Brawl','Perception','Vigilance'],skill:'Brawl',damage:6,crit:4,range:'Engaged',aiRole:'melee',beast:true},
    {id:'ash-alpha',name:'Ash Stalker Alpha',type:'rival',w:0,wt:12,soak:4,def:0,c:{Brawn:4,Agility:3,Intellect:1,Cunning:3,Willpower:2,Presence:1},skill:'Brawl',rank:2,vigilanceRank:2,damage:7,crit:3,range:'Engaged',aiRole:'melee',beast:true,special:'howl'}
  ];
  if(kind==='ep15Bounty')return[
    {id:'korda',name:'Korda Venn',type:'rival',w:0,wt:14,soak:4,def:1,adversary:1,c:{Brawn:2,Agility:4,Intellect:2,Cunning:3,Willpower:3,Presence:2},skill:'Ranged (Heavy)',rank:3,vigilanceRank:2,coolRank:2,damage:9,crit:3,range:'Long',criticals:[],aiRole:'sniper',grenades:{frag:1},special:'hunter',noRetreat:true},
    {id:'raiders',name:'Scavenger Gunhands',memberName:'Scavenger',type:'minion',members:3,initialMembers:3,perWt:5,w:0,wt:15,soak:3,def:0,c:{Brawn:2,Agility:3,Intellect:2,Cunning:2,Willpower:2,Presence:2},groupSkills:['Ranged (Light)','Vigilance'],skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',aiRole:'skirmisher'}
  ];
  if(kind==='ep15Outpost')return[
    {id:'security-droids',name:'501-Z Security Droid Pair',memberName:'Security Droid',type:'minion',members:2,initialMembers:2,perWt:6,w:0,wt:12,soak:4,def:0,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:1,Presence:1},groupSkills:['Ranged (Light)','Vigilance'],skill:'Ranged (Light)',damage:5,crit:4,range:'Medium',aiRole:'rifle',droid:true,moraleImmune:true},
    {id:'ia-agent',name:'Imperial Security Agent',type:'rival',w:0,wt:13,soak:4,def:0,adversary:1,c:{Brawn:2,Agility:3,Intellect:3,Cunning:3,Willpower:3,Presence:2},skill:'Ranged (Light)',rank:3,vigilanceRank:2,coolRank:2,damage:6,crit:3,range:'Medium',aiRole:'skirmisher',grenades:{stun:1},special:'flanker'}
  ];
  if(kind==='ep15Boss'){
    let reinforced=S.ep15?.flags?.bossReinforced;
    let arr=[
      {id:'varrik',name:'Chief Varrik',type:'nemesis',w:0,wt:20,st:16,soak:5,def:1,adversary:2,c:{Brawn:3,Agility:4,Intellect:3,Cunning:3,Willpower:4,Presence:3},skill:'Ranged (Light)',rank:4,vigilanceRank:3,coolRank:3,leadershipRank:3,damage:8,crit:3,range:'Medium',criticals:[],aiRole:'commander',grenades:{frag:1},special:'varrik',noRetreat:true},
      stormGroup(reinforced?4:2)
    ];
    if(reinforced)arr.push({id:'hangar-droids',name:'Hangar Security Droids',memberName:'Security Droid',type:'minion',members:2,initialMembers:2,perWt:6,w:0,wt:12,soak:4,def:0,c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:1,Presence:1},groupSkills:['Ranged (Light)','Vigilance'],skill:'Ranged (Light)',damage:5,crit:4,range:'Medium',aiRole:'rifle',droid:true,moraleImmune:true});
    return arr
  }
  return[
    {id:'varrik',name:'Chief Varrik',type:'nemesis',w:0,wt:18,st:14,soak:4,def:1,adversary:1,c:{Brawn:3,Agility:3,Intellect:2,Cunning:3,Willpower:3,Presence:2},skill:'Ranged (Light)',rank:3,vigilanceRank:2,coolRank:2,leadershipRank:2,damage:7,crit:3,range:'Medium',criticals:[],aiRole:'commander',special:'varrik',noRetreat:true},
    {id:'security-group',name:'Security Trooper Team',memberName:'Security Trooper',type:'minion',members:2,initialMembers:2,perWt:5,w:0,wt:10,soak:3,def:0,c:{Brawn:2,Agility:3,Intellect:2,Cunning:2,Willpower:2,Presence:1},groupSkills:['Ranged (Heavy)','Vigilance'],skill:'Ranged (Heavy)',damage:8,crit:3,range:'Medium',aiRole:'rifle'}
  ]
}
function startCombat(kind){
  ensurePhase12State();
  let prepared=confirm('Were you prepared for this encounter? OK = Cool for your squad. Cancel = Vigilance.');
  let enemies=enemySet(kind),rr=talentRank('Rapid Reaction'),rrUsed=0;
  let slots=buildInitiative(enemies,prepared);
  if(rr&&S.strain<strainThreshold()){
    let v=Number(prompt(`Rapid Reaction rank ${rr}. Spend strain to add automatic successes to your initiative result?`,'0'))||0;
    rrUsed=canVoluntarilySufferStrain('pc')?Math.max(0,Math.min(rr,v,strainThreshold()-S.strain)):0;S.strain+=rrUsed;
    if(rrUsed&&slots.length){let firstPc=slots.find(x=>x.side==='PC');if(firstPc)firstPc.success+=rrUsed;slots.sort((a,b)=>b.success-a.success||b.adv-a.adv||(a.side==='PC'?-1:1))}
  }
  S.combat={kind,enemies,round:1,slots,slotIndex:0,actedPC:[],actedNPC:[],range:2,turn:null,cover:false,defUpgrade:0,log:[],prepared,critPending:null,pendingSpend:null,nextAllyBoost:0,nextAllyUpgrade:0,tempDefense:0,outOfAmmo:{},setTriggerUsed:{},overwatch:{},positions:{},lastAIIntent:'Enemy AI is evaluating positions and roles.'};
  initializeTacticalState(S.combat);
  if(S.pendingForeseeCombat){
    let f=S.pendingForeseeCombat,ids=['pc',...S.crew].slice(0,Math.max(1,f.targets||1));
    if(f.defense){S.combat.foreseeDefenseIds=ids;cLog(`Foresee grants +2 melee and ranged defense during round 1 to ${ids.map(id=>actorById(id).name).join(', ')}.`)}
    if(f.maneuver&&confirm('Foresee reveals the opening moments. Use the pre-combat maneuver for affected allies to Take Cover?')){
      ids.forEach(id=>actorState(id).conditions.cover=true);cLog(`Foresee lets ${ids.map(id=>actorById(id).name).join(', ')} take cover before round 1 begins.`)
    }
    S.pendingForeseeCombat=null
  }
  cLog(`Initiative generated with ${prepared?'Cool':'Vigilance'} for the squad. Tactical positions initialized.`);
  $('adventure').classList.add('hidden');$('combat').classList.remove('hidden');
  beginSlot()
}
function resolveEndIsNigh(round){
  for(const a of squadActors()){
    let st=actorState(a.id),c=st.conditions;
    if(c.endIsNighRound&&c.endIsNighRound<=round){if(a.id==='pc')S.dead=true;else st.incapacitated=true;c.endIsNigh=0;c.endIsNighRound=0;cLog(`${a.name} succumbs to The End is Nigh after the final initiative slot.`)}
  }
  for(const e of (S.combat?.enemies||[])){
    if(e.endIsNighRound&&e.endIsNighRound<=round){e.w=e.wt+1;e.endIsNighRound=0;cLog(`${e.name} succumbs to The End is Nigh after the final initiative slot.`)}
  }
}

function processPartyBleeding(id){
  let C=S.combat,st=actorState(id),c=st.conditions;if(!C||!c.bleedingOut||c.lastBleedRound===C.round)return;
  c.lastBleedRound=C.round;
  let wt=actorWT(id),before=Math.max(0,st.wounds-wt),beforeBand=Math.floor(before/5);
  actorDamage(id,1);actorStrain(id,1);
  let after=Math.max(0,st.wounds-wt),afterBand=Math.floor(after/5);
  if(afterBand>beforeBand)inflictPartyCritical(id,false,'Bleeding Out');
  cLog(`${actorById(id).name} suffers 1 wound and 1 strain from Bleeding Out.${afterBand>beforeBand?' The accumulating wounds cause another Critical Injury.':''}`)
}

function beginSlot(){
  let C=S.combat;if(!C)return;
  if(C.bleedSweepRound!==C.round){
    C.bleedSweepRound=C.round;
    for(const a of squadActors())if(actorIsIncapacitated(a.id))processPartyBleeding(a.id)
  }
  if(activeEnemies().length===0){combatWin();return}
  if(C.slotIndex>=C.slots.length){
    resolveEndIsNigh(C.round);
    if(S.dead){cLog(`${S.name} is dead.`);renderCombat();return}
    C.round++;C.slotIndex=0;C.actedPC=[];C.actedNPC=[];C.defUpgrade=0;C.meleeDefUpgrade=0;
    C.bleedSweepRound=C.round;for(const a of squadActors())if(actorIsIncapacitated(a.id))processPartyBleeding(a.id);
    cLog(`Round ${C.round} begins.`)
  }
  let slot=currentSlot();
  let avail=availableSideActors(slot.side);
  if(!avail.length){C.slotIndex++;beginSlot();return}
  if(slot.side==='NPC'){enemySlotTurn(avail[0]);return}
  let aid=avail[0].id,ast=actorState(aid);
  C.turn={actorId:aid,started:false,maneuvers:0,actionUsed:false,aim:0,cover:ast.conditions.cover};
  renderCombat()
}
function startTurnActor(){
  let C=S.combat,T=C?.turn;if(!T)return false;if(T.started)return !actorIsIncapacitated(T.actorId);
  let id=T.actorId,st=actorState(id);T.started=true;T.cover=st.conditions.cover;
  if(C.overwatch?.[id])delete C.overwatch[id];
  if(id==='pc'&&(C.indomitableCommitted||0)>0){
    actorStrain('pc',1);cLog(`Indomitable Will costs 1 strain to sustain ${C.indomitableCommitted} committed Force die/dice.`);
    if(actorIsIncapacitated('pc')){C.indomitableCommitted=0;cLog('Indomitable Will collapses as the character exceeds strain threshold.')}
  }
  if(st.conditions.bleedingOut)processPartyBleeding(id);
  if(actorIsIncapacitated(id)){
    cLog(`${actorById(id).name} is incapacitated before acting.`);
    if(!C.actedPC.includes(id))C.actedPC.push(id);C.turn=null;C.slotIndex++;beginSlot();return false
  }
  if(st.conditions.staggered>0||st.conditions.knockedSenseless){
    T.actionUsed=true;cLog(`${actorById(id).name} is staggered and cannot perform an action this turn.`)
  }
  return true
}
function endPCSlot(){
  let C=S.combat,a=C.turn?.actorId;if(a&&!C.actedPC.includes(a))C.actedPC.push(a);
  if(a){let st=actorState(a),c=st.conditions;if(c.disoriented>0)c.disoriented--;if(c.immobilized>0)c.immobilized--;if(c.staggered>0)c.staggered--;if(c.suppressed>0)c.suppressed--;if(c.noFreeManeuver>0)c.noFreeManeuver--;}
  C.turn=null;C.slotIndex++;beginSlot()
}
function spendManeuver(count=1,label='maneuver'){
  let C=S.combat,T=C.turn;if(!T||!startTurnActor())return false;T=C.turn;if(!T)return false;let id=T.actorId,st=actorState(id),name=actorById(id)?.name||id;
  if(st.conditions.immobilized>0){cLog(`${name} is immobilized and cannot perform maneuvers.`);return false}
  for(let i=0;i<count;i++){
    if(st.conditions.temporarilyLame&&T.maneuvers>=1){cLog(`${name} is Temporarily Lame and cannot perform more than one maneuver this turn.`);return false}
    let freeBlocked=st.conditions.hamstrung||st.conditions.noFreeManeuver>0;
    if(T.maneuvers===0&&!freeBlocked){T.maneuvers++}
    else if(T.maneuvers<2){
      if(st.conditions.winded){if(!T.actionUsed){T.actionUsed=true;T.maneuvers++}else{cLog(`${name} is Winded and cannot voluntarily suffer strain for another maneuver.`);return false}}
      else if(!T.actionUsed&&confirm(`${label} needs another maneuver. OK = suffer 2 strain. Cancel = trade your action for the maneuver.`)){
        if(st.strain+2>actorST(id)){cLog(`${name} cannot safely suffer 2 more strain.`);return false}actorStrain(id,2);T.maneuvers++
      }else if(!T.actionUsed){T.actionUsed=true;T.maneuvers++}
      else{
        if(st.strain+2>actorST(id)){cLog(`No maneuver available for ${name}.`);return false}actorStrain(id,2);T.maneuvers++
      }
    }else return false
  }
  cLog(`${name} performs ${label}.`);return true
}


function recoverDroppedWeapon(){
  let C=S.combat,T=C?.turn;if(!T)return;let st=actorState(T.actorId);if(!st.conditions.droppedWeapon)return;
  if(T.actorId==='pc'&&hasAttachment(S.weapon,'weaponTether')){st.conditions.droppedWeapon=false;delete C.droppedWeaponPos;cLog(`${S.name} snaps the tethered weapon back into hand as an incidental.`);renderCombat();return}
  if(T.actorId==='pc'&&Number.isFinite(C.droppedWeaponPos)&&unitPosition('pc')!==C.droppedWeaponPos){cLog(`The dropped weapon is at P${C.droppedWeaponPos}; move there before recovering it.`);return}
  if(spendManeuver(1,'Recover dropped weapon')){st.conditions.droppedWeapon=false;if(T.actorId==='pc')delete C.droppedWeaponPos;cLog(`${actorById(T.actorId).name} recovers their weapon.`);renderCombat()}
}

function standUp(){
  let T=S.combat?.turn;if(!T)return;let st=actorState(T.actorId);
  if(!st.conditions.prone)return;
  if(spendManeuver(1,'Stand from prone')){st.conditions.prone=false;renderCombat()}
}

function moveRange(dir){
  let C=S.combat,T=C.turn;if(!T)return;let target=selectedEnemy();if(!target)return;
  let id=T.actorId,from=unitPosition(id),to=unitPosition(target.id),current=rangeBandBetween(id,target.id),step;
  if(dir<0){step=Math.sign(to-from);if(step===0)return}
  else{step=Math.sign(from-to);if(step===0)step=from<=4?-1:1}
  let nextPos=clampTacticalPos(from+step);
  if(nextPos===from)return;
  let next=Math.min(4,Math.abs(nextPos-to)),cost=Math.max(current,next)>=3?2:1;
  if(spendManeuver(cost,`Move ${dir<0?'toward':'away from'} ${target.name} (${RANGE_NAMES[current]} → ${RANGE_NAMES[next]})`)){
    setUnitPosition(id,nextPos);actorState(id).conditions.cover=false;C.range=next;renderCombat()
  }
}
function aimManeuver(){
  if(spendManeuver(1,'Aim')){S.combat.turn.aim=Math.min(2,S.combat.turn.aim+1);renderCombat()}
}
function takeCover(){
  if(spendManeuver(1,'Take Cover')){let id=S.combat.turn.actorId;actorState(id).conditions.cover=true;S.combat.turn.cover=true;renderCombat()}
}
function canOverwatch(actor){
  let sk=actorWeapon(actor)?.skill;return !!sk&&!['Brawl','Melee','Lightsaber'].includes(sk)
}
function setOverwatch(){
  let C=S.combat,T=C?.turn;if(!T||!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let actor=squadActors().find(a=>a.id===T.actorId);if(!actor||!canOverwatch(actor))return;
  C.overwatch=C.overwatch||{};C.overwatch[actor.id]={round:C.round};T.actionUsed=true;
  cLog(`${actor.name} enters Overwatch. The first enemy that moves within weapon range can trigger a reaction attack.`);renderCombat()
}
function triggerOverwatch(enemy){
  let C=S.combat;if(!C||enemyDefeated(enemy))return false;C.overwatch=C.overwatch||{};
  for(const a of squadActors()){
    if(!C.overwatch[a.id]||actorIsIncapacitated(a.id))continue;
    let w=actorWeapon(a),ri=rangeBandBetween(a.id,enemy.id);
    if(!canOverwatch(a)||ri>weaponRangeIndex(w)||rangeDifficulty(w.skill,ri)===99)continue;
    let q=combatPool(a,enemy,0,0,false);delete C.overwatch[a.id];
    if(q.invalid)continue;
    q.p.setback=(q.p.setback||0)+1;
    let r=rollNarr(q.p),dmg=0;
    if(r.ok){
      dmg=applyDamage(enemy,q.w,r);
      cLog(`OVERWATCH: ${a.name} catches ${enemy.name} moving at ${RANGE_NAMES[ri]} range for ${dmg}. ${rtxt(r)}`);
      let critCost=effectiveCritRating(q.w,enemy,a.id);if(q.w.crit&&r.na>=critCost&&dmg>0)inflictCritical(enemy,q.w,a.id==='pc'?pcCriticalBonus(q.w,enemy):0)
    }else cLog(`OVERWATCH: ${a.name} fires on ${enemy.name} but misses. ${rtxt(r)}`);
    if(C.nextAllyBoost)C.nextAllyBoost=0;
    if(enemyDefeated(enemy))return true
  }
  return enemyDefeated(enemy)
}
function sideStepManeuver(){
  let ranks=talentRank('Side Step');if(!ranks||S.combat.turn?.actorId!=='pc')return;
  if(!spendManeuver(1,'Side Step'))return;
  let max=Math.min(ranks,strainThreshold()-S.strain),n=Number(prompt(`Side Step rank ${ranks}: suffer how much strain to upgrade incoming ranged attacks?`,String(max)))||0;
  n=Math.max(0,Math.min(max,n));S.strain+=n;S.combat.defUpgrade=Math.max(S.combat.defUpgrade,n);renderCombat()
}
function defensiveStanceManeuver(){
  let ranks=talentRank('Defensive Stance');if(!ranks||S.combat.turn?.actorId!=='pc')return;
  if(!spendManeuver(1,'Defensive Stance'))return;
  let max=Math.min(ranks,strainThreshold()-S.strain),n=Number(prompt(`Defensive Stance rank ${ranks}: suffer how much strain?`,String(max)))||0;
  n=Math.max(0,Math.min(max,n));S.strain+=n;S.combat.meleeDefUpgrade=Math.max(S.combat.meleeDefUpgrade||0,n);renderCombat()
}
function toggleStun(){let w=WEAPONS[S.weapon];if(!w.qualities?.stun)return;S.stunMode=!S.stunMode;cLog(`Blaster set to ${S.stunMode?'STUN':'KILL'}.`);renderCombat()}
function combatTalentBoost(actor,target){
  let b=0,ri=target?rangeBandBetween(actor.id,target.id):2,engaged=activeEnemies().filter(e=>rangeBandBetween(actor.id,e.id)===0).length;
  if(actor.id==='pc'&&target&&!target.hasActedEncounter)b+=talentRank('Quick Strike');
  if(actor.id==='pc'&&actorWeapon(actor).skill==='Lightsaber'&&ri===0&&engaged===1)b+=talentRank("Duelist's Training")?1:0;
  if(actor.id==='pc'&&ri===0&&engaged>1)b+=talentRank('Multiple Opponents')?1:0;
  return b
}
function combatPool(actor,target,extraBoost=0,ignoreDef=0,commit=false){
  let w=actorWeapon(actor),skill=w.skill,ch=skillCharacteristic(actor,skill),rank=actor.sk[skill]||0,ri=rangeBandBetween(actor.id,target.id),diff=rangeDifficulty(skill,ri),id=actor.id;
  let ast=actorState(id);
  if(ast.conditions.droppedWeapon)return{invalid:true,reason:`${actor.name} dropped their weapon and must recover it first.`,w,actor,target,ch,rank};
  if(diff===99)return{invalid:true,reason:`${w.name} requires Engaged range.`,w,actor,target,ch,rank};
  if(ri>weaponRangeIndex(w))return{invalid:true,reason:`${w.name} cannot reach ${RANGE_NAMES[ri]} range.`,w,actor,target,ch,rank};
  if(actor.id==='pc'&&S.stunMode&&hasQuality(w,'stun')&&ri>1)return{invalid:true,reason:`${w.name}'s stun setting can only be used at Short range or closer.`,w,actor,target,ch,rank};
  let def=Math.max(0,(target?.def||0)+(target?.cover?1:0)-ignoreDef),upgrade=(target?.adversary||0)+(ast.conditions.nextUpgrade||0);
  if(hasQuality(w,'autoFire')&&S.combat?.autoFireMode)diff+=1;
  let cm=criticalCheckMods(id,skill,ch);
  diff+=crippledDifficulty(id,skill)+(ast.conditions.nextDifficulty||0)+cm.diff;
  let cumb=quality(w,'cumbersome'),unw=quality(w,'unwieldy');
  if(cumb){let br=effectiveCharacteristic(actor,'Brawn');if(br<cumb)diff+=cumb-br}
  if(unw){let ag=effectiveCharacteristic(actor,'Agility');if(ag<unw)diff+=unw-ag}
  let boost=extraBoost+combatTalentBoost(actor,target)+quality(w,'accurate')+(S.combat?.nextAllyBoost||0)+approvalBoost(actor,skill)+crewRoleBoost(actor,skill,target)+(actor.id==='pc'&&S.foreseeBoost?1:0);
  if(cm.removeBoost)boost=0;
  let setback=def+(ast.conditions.disoriented>0?1:0)+(ast.conditions.suppressed||0)*2+(ast.conditions.nextSetback||0)+cm.setback+(actor.id==='pc'?Math.min(2,S.itemDamage?.[S.weapon]||0):0);
  if(ast.conditions.compromised)diff+=1;
  if(target?.prone){if(['Brawl','Melee','Lightsaber'].includes(skill))boost+=1;else setback+=1}
  if(actor.id==='pc'&&currentEnc()>encThreshold())setback+=1;
  let p=makePool(effectiveCharacteristic(actor,ch),rank,diff,boost,setback,upgrade+cm.upgrade);
  if(actor.id==='pc'&&S.forceCommitted.sense&&S.forceOwned.Sense.has('sn-off')){
    let times=S.forceOwned.Sense.has('sn-strength')?2:1;upgradePositivePool(p,times)
  }
  let destinyPreview=!!S.destinyPending.allyUpgrade;
  if(commit&&destinyPreview){applyQueuedAllyDestiny(p,true)}
  if(commit){ast.conditions.nextUpgrade=0;ast.conditions.nextDifficulty=0;ast.conditions.nextSetback=0;if(actor.id==='pc'&&S.foreseeBoost)S.foreseeBoost=0}
  return{w,skill,ch,rank,p,target,actor,range:ri,invalid:false,destinyUsed:commit&&destinyPreview}
}
function critResult(roll){
  if(roll<=5)return{sev:'Easy',name:'Minor Nick',effect:'Suffer 1 strain.'};
  if(roll<=10)return{sev:'Easy',name:'Slowed Down',effect:'Next turn, act only in the last allied initiative slot.'};
  if(roll<=15)return{sev:'Easy',name:'Sudden Jolt',effect:'Drop whatever is being held.'};
  if(roll<=20)return{sev:'Easy',name:'Distracted',effect:'No free maneuver during the next turn.'};
  if(roll<=25)return{sev:'Easy',name:'Off-Balance',effect:'Add 1 Setback to the next skill check.'};
  if(roll<=30)return{sev:'Easy',name:'Discouraging Wound',effect:'Flip one light Destiny point to dark (reverse for NPCs).'};
  if(roll<=35)return{sev:'Easy',name:'Stunned',effect:'Staggered until the end of the next turn.'};
  if(roll<=40)return{sev:'Easy',name:'Stinger',effect:'Increase the difficulty of the next check by one.'};
  if(roll<=45)return{sev:'Average',name:'Bowled Over',effect:'Knocked prone and suffer 1 strain.'};
  if(roll<=50)return{sev:'Average',name:'Head Ringer',effect:'Increase difficulty of Intellect and Cunning checks by one until encounter end.'};
  if(roll<=55)return{sev:'Average',name:'Fearsome Wound',effect:'Increase difficulty of Presence and Willpower checks by one until encounter end.'};
  if(roll<=60)return{sev:'Average',name:'Agonizing Wound',effect:'Increase difficulty of Brawn and Agility checks by one until encounter end.'};
  if(roll<=65)return{sev:'Average',name:'Slightly Dazed',effect:'Add 1 Setback to all skill checks until encounter end.'};
  if(roll<=70)return{sev:'Average',name:'Scattered Senses',effect:'Remove all Boost dice from skill checks until encounter end.'};
  if(roll<=75)return{sev:'Average',name:'Hamstrung',effect:'Lose the free maneuver until encounter end.'};
  if(roll<=80)return{sev:'Average',name:'Overpowered',effect:'The attacker may immediately make another attack with the same pool.'};
  if(roll<=85)return{sev:'Average',name:'Winded',effect:'Cannot voluntarily suffer strain for abilities or extra maneuvers until encounter end.'};
  if(roll<=90)return{sev:'Average',name:'Compromised',effect:'Increase difficulty of all skill checks by one until encounter end.'};
  if(roll<=95)return{sev:'Hard',name:'At the Brink',effect:'Suffer 1 strain whenever performing an action until healed.'};
  if(roll<=100)return{sev:'Hard',name:'Crippled',effect:'One limb is impaired; increase difficulty of checks requiring it until healed or replaced.'};
  if(roll<=105)return{sev:'Hard',name:'Maimed',effect:'One limb is permanently lost. Other actions gain 1 Setback until replacement.'};
  if(roll<=110)return{sev:'Hard',name:'Horrific Injury',effect:'A random characteristic counts as one lower until healed.'};
  if(roll<=115)return{sev:'Hard',name:'Temporarily Lame',effect:'Cannot perform more than one maneuver per turn until healed.'};
  if(roll<=120)return{sev:'Hard',name:'Blinded',effect:'Upgrade all checks twice; Perception and Vigilance three times until healed.'};
  if(roll<=125)return{sev:'Hard',name:'Knocked Senseless',effect:'Staggered for the remainder of the encounter.'};
  if(roll<=130)return{sev:'Daunting',name:'Gruesome Injury',effect:'Permanently reduce a random characteristic by one, minimum 1.'};
  if(roll<=140)return{sev:'Daunting',name:'Bleeding Out',effect:'At the start of each turn suffer 1 wound and 1 strain; each 5 wounds beyond threshold causes another Critical Injury.'};
  if(roll<=150)return{sev:'Daunting',name:'The End is Nigh',effect:'Die after the last initiative slot during the next round unless healed.'};
  return{sev:'Dead',name:'Dead',effect:'Complete death.'}
}
function randomCritCharacteristic(){
  let d=1+Math.floor(Math.random()*10);
  if(d<=3)return'Brawn';if(d<=6)return'Agility';if(d===7)return'Intellect';if(d===8)return'Cunning';if(d===9)return'Presence';return'Willpower'
}
function applyCritEffect(id,cr){
  let st=actorState(id),c=st.conditions;
  if(cr.name==='Minor Nick')actorStrain(id,1);
  if(cr.name==='Slowed Down')c.slowedRound=(S.combat?.round||0)+1;
  if(cr.name==='Sudden Jolt')c.droppedWeapon=true;
  if(cr.name==='Distracted')c.noFreeManeuver=Math.max(c.noFreeManeuver||0,1);
  if(cr.name==='Off-Balance')c.nextSetback=(c.nextSetback||0)+1;
  if(cr.name==='Discouraging Wound'){if(S.destiny.light>0){S.destiny.light--;S.destiny.dark++}}
  if(cr.name==='Stunned')c.staggered=Math.max(c.staggered||0,1);
  if(cr.name==='Stinger')c.nextDifficulty=(c.nextDifficulty||0)+1;
  if(cr.name==='Bowled Over'){c.prone=true;actorStrain(id,1)}
  if(cr.name==='Head Ringer')c.headRinger=true;
  if(cr.name==='Fearsome Wound')c.fearsomeWound=true;
  if(cr.name==='Agonizing Wound')c.agonizingWound=true;
  if(cr.name==='Slightly Dazed')c.slightlyDazed=true;
  if(cr.name==='Scattered Senses')c.scatteredSenses=true;
  if(cr.name==='Hamstrung')c.hamstrung=true;
  if(cr.name==='Winded')c.winded=true;
  if(cr.name==='Compromised')c.compromised=true;
  if(cr.name==='At the Brink')c.atBrink=true;
  if(cr.name==='Crippled')cr.limb=Math.random()<.5?'arm':'leg';
  if(cr.name==='Maimed'){cr.limb=Math.random()<.5?'arm':'leg';if(cr.limb==='arm')c.lostArm=(c.lostArm||0)+1;else c.lostLeg=(c.lostLeg||0)+1}
  if(cr.name==='Horrific Injury')cr.affectedChar=randomCritCharacteristic();
  if(cr.name==='Temporarily Lame')c.temporarilyLame=true;
  if(cr.name==='Blinded')c.blinded=true;
  if(cr.name==='Knocked Senseless')c.knockedSenseless=true;
  if(cr.name==='Gruesome Injury'){
    cr.affectedChar=randomCritCharacteristic();cr.permanent=true;
    if(id==='pc')S.permanentCharLoss[cr.affectedChar]=(S.permanentCharLoss[cr.affectedChar]||0)+1;
    else{S.crewState[id].permanentCharLoss=S.crewState[id].permanentCharLoss||{};S.crewState[id].permanentCharLoss[cr.affectedChar]=(S.crewState[id].permanentCharLoss[cr.affectedChar]||0)+1}
  }
  if(cr.name==='Bleeding Out')c.bleedingOut=true;
  if(cr.name==='The End is Nigh'){c.endIsNigh=1;c.endIsNighRound=(S.combat?.round||0)+1}
  if(cr.name==='Dead'){if(id==='pc')S.dead=true;else st.incapacitated=true}
}
function inflictPartyCritical(id,thresholdExceeded=false,rerollName=null){
  let st=actorState(id),durable=id==='pc'?talentRank('Durable'):0,roll,cr,guard=0;
  do{roll=Math.max(1,1+Math.floor(Math.random()*100)+10*st.criticals.length-10*durable);cr=critResult(roll);guard++}while(rerollName&&cr.name===rerollName&&guard<20);
  if(id==='pc'&&S.combat&&hasTalent('Supreme Armor Master')&&S.combat.supremeArmorRound!==S.combat.round&&canVoluntarilySufferStrain('pc')&&S.strain+3<=strainThreshold()){
    if(confirm(`Use Supreme Armor Master? Suffer 3 strain to reduce this Critical result by ${10*playerSoak()} (${roll} → ${Math.max(1,roll-10*playerSoak())}).`)){
      S.strain+=3;S.combat.supremeArmorRound=S.combat.round;roll=Math.max(1,roll-10*playerSoak());cr=critResult(roll);cLog(`Supreme Armor Master reduces the Critical Injury result to ${roll}.`)
    }
  }
  if(id==='pc'&&roll===1&&hasTalent('Unstoppable')){cLog('Unstoppable: the Critical Injury result was reduced to 1 and is ignored.');return{name:'Unstoppable',sev:'ignored',roll:1}}
  let saved={uid:`${id}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,roll,...cr};st.criticals.push(saved);applyCritEffect(id,saved);
  cLog(`${actorById(id)?.name||id} suffers Critical ${roll}: ${cr.name} (${cr.sev}).${thresholdExceeded?' Wound threshold exceeded.':''}`);
  return cr
}
const PRECISION_EASY_CRITS=[
  [1,'Minor Nick'],[6,'Slowed Down'],[11,'Sudden Jolt'],[16,'Distracted'],
  [21,'Off-Balance'],[26,'Discouraging Wound'],[31,'Stunned'],[36,'Stinger']
];
const PRECISION_AVERAGE_CRITS=[
  [41,'Bowled Over'],[46,'Head Ringer'],[51,'Fearsome Wound'],[56,'Agonizing Wound'],[61,'Slightly Dazed'],
  [66,'Scattered Senses'],[71,'Hamstrung'],[76,'Overpowered'],[81,'Winded'],[86,'Compromised']
];
function choosePrecisionCritical(w){
  let skill=w?.skill,C=S.combat;if(!C||!['Brawl','Melee','Lightsaber'].includes(skill))return null;
  let improved=hasTalent('Improved Precision Strike')&&['Brawl','Melee'].includes(skill)&&C.precisionImprovedRound!==C.round,
      basic=hasTalent('Precision Strike');
  if(!basic&&!improved)return null;
  let useImproved=improved&&canVoluntarilySufferStrain('pc')&&S.strain+2<=strainThreshold()&&confirm('Use Improved Precision Strike? Suffer 2 strain to choose any Average Critical Injury result for this Brawl/Melee Critical.');
  let list,cost;
  if(useImproved){list=PRECISION_AVERAGE_CRITS;cost=2;C.precisionImprovedRound=C.round}
  else{
    if(!basic||!canVoluntarilySufferStrain('pc')||S.strain+1>strainThreshold()||!confirm('Use Precision Strike? Suffer 1 strain to choose any Easy Critical Injury result.'))return null;
    list=PRECISION_EASY_CRITS;cost=1
  }
  let menu=list.map((x,i)=>`${i+1}. ${x[1]}`).join('\n'),pick=Math.max(1,Math.min(list.length,Number(prompt(`Choose Critical Injury:\n${menu}`,'1'))||1));
  S.strain+=cost;let chosen=list[pick-1];cLog(`${useImproved?'Improved ':''}Precision Strike selects ${chosen[1]}.`);return chosen[0]
}
function inflictCritical(target,w,bonus=0,forcedRoll=null){
  if(target.type==='minion'){
    target.members=Math.max(0,target.members-1);target.w=Math.min(target.wt,target.w+target.perWt);
    cLog(`Critical hit removes one ${target.memberName||'minion'} from the group.`);return
  }
  target.criticals=target.criticals||[];
  let roll=forcedRoll??(1+Math.floor(Math.random()*100)+10*target.criticals.length+10*quality(w,'vicious')+bonus);
  let cr=critResult(roll),saved={uid:`npc-${target.id}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,roll,...cr};target.criticals.push(saved);
  if(cr.name==='Minor Nick')applyEnemyStrain(target,1);
  if(cr.name==='Slowed Down')target.slowedRound=(S.combat?.round||0)+1;
  if(cr.name==='Sudden Jolt')target.disarmed=true;
  if(cr.name==='Off-Balance')target.nextSetback=(target.nextSetback||0)+1;
  if(cr.name==='Discouraging Wound'&&S.destiny.dark>0){S.destiny.dark--;S.destiny.light++}
  if(cr.name==='Stunned')target.staggered=Math.max(target.staggered||0,1);
  if(cr.name==='Stinger')target.nextDifficulty=(target.nextDifficulty||0)+1;
  if(cr.name==='Bowled Over'){target.prone=true;applyEnemyStrain(target,1)}
  if(cr.name==='Head Ringer')target.headRinger=true;if(cr.name==='Fearsome Wound')target.fearsomeWound=true;if(cr.name==='Agonizing Wound')target.agonizingWound=true;
  if(cr.name==='Slightly Dazed')target.slightlyDazed=true;if(cr.name==='Scattered Senses')target.scatteredSenses=true;
  if(cr.name==='Hamstrung')target.hamstrung=true;if(cr.name==='Winded')target.winded=true;if(cr.name==='Compromised')target.compromised=true;if(cr.name==='At the Brink')target.atBrink=true;
  if(cr.name==='Crippled')target.crippledLimb=Math.random()<.5?'arm':'leg';
  if(cr.name==='Maimed')target.maimedLimb=Math.random()<.5?'arm':'leg';
  if(cr.name==='Horrific Injury'){let ch=randomCritCharacteristic();saved.affectedChar=ch;target.horrificChar=target.horrificChar||{};target.horrificChar[ch]=(target.horrificChar[ch]||0)+1}
  if(cr.name==='Temporarily Lame')target.temporarilyLame=true;
  if(cr.name==='Blinded')target.blinded=true;
  if(cr.name==='Knocked Senseless')target.knockedSenseless=true;
  if(cr.name==='Gruesome Injury'){let ch=randomCritCharacteristic();saved.affectedChar=ch;saved.permanent=true;target.c[ch]=Math.max(1,(target.c[ch]||1)-1)}
  if(cr.name==='Bleeding Out')target.bleedingOut=true;
  if(cr.name==='The End is Nigh')target.endIsNighRound=(S.combat?.round||0)+1;if(cr.name==='Dead')target.w=target.wt+1;
  cLog(`CRITICAL ${roll}: ${cr.name} (${cr.sev}) — ${cr.effect}`);return cr
}
function maybeCritical(actor,target,w,r){
  let cost=effectiveCritRating(w,target,actor.id);if(!r.ok||!w.crit||r.na<cost)return;
  if(actor.id==='pc'&&confirm(`Spend ${cost} Advantage to inflict a Critical Injury?`)){
    let forced=target.type==='minion'?null:choosePrecisionCritical(w);inflictCritical(target,w,pcCriticalBonus(w,target),forced)
  }
}
function applyEnemyStrain(target,amount){
  amount=Math.max(0,amount);
  if(target.type==='nemesis'){
    if(!Number.isFinite(target.strainNow))target.strainNow=0;
    if(!Number.isFinite(target.st))target.st=target.wt;
    target.strainNow+=amount
  }else{
    target.w+=amount;
    if(target.type==='minion'){target.members=Math.max(0,Math.ceil((target.wt-target.w)/target.perWt))}
  }
}
function applyDamage(target,w,r){
  let pierce=quality(w,'pierce')+quality(w,'breach')*10;
  let dmg=Math.max(0,w.damage+r.ns-Math.max(0,target.soak-pierce));
  if(target.type==='minion'){
    target.w=Math.min(target.wt,target.w+dmg);
    target.members=Math.max(0,Math.ceil((target.wt-target.w)/target.perWt));
  }else target.w+=dmg;
  return dmg
}

function pendingSpend(){return S.combat?.pendingSpend||null}
function startSymbolSpend(actor,target,w,r,baseDamage,pool=null){
  let C=S.combat;
  C.pendingSpend={actorId:actor.id,targetId:target.id,weaponId:w.id||S.weapon,hit:r.ok,
    advantage:Math.max(0,r.na),threat:Math.max(0,-r.na),triumph:r.tr||0,despair:r.de||0,
    baseDamage,originalSuccess:r.ns,pool:pool?{...pool}:null,extraHits:0,spentQualities:{}};
  if(C.nextAllyBoost)C.nextAllyBoost=0
}
function spendAdv(cost,label,fn){
  let P=pendingSpend();if(!P||P.advantage<cost)return;
  P.advantage-=cost;fn?.();cLog(`${label} (${cost} Advantage).`);renderCombat()
}
function spendTriumph(label,fn){
  let P=pendingSpend();if(!P||P.triumph<1)return;
  P.triumph--;fn?.();cLog(`${label} (Triumph).`);renderCombat()
}
function targetFromPending(){let P=pendingSpend();return P?S.combat.enemies.find(e=>e.id===P.targetId):null}
function weaponFromPending(){let P=pendingSpend();if(!P)return null;if(P.weaponId==='unarmed')return unarmedWeapon();return WEAPONS[P.weaponId]||ORDNANCE[P.weaponId]||COMBAT_SPECIAL_WEAPONS[P.weaponId]||null}
function syncMinions(t){if(t?.type==='minion')t.members=Math.max(0,Math.ceil((t.wt-t.w)/t.perWt))}
function dealPendingHit(t,w,damage,label){
  if(!t||enemyDefeated(t))return;t.w+=damage;syncMinions(t);cLog(`${label} deals ${damage} damage to ${t.name}.`)
}
function extraHit(){
  let P=pendingSpend(),t=targetFromPending(),w=weaponFromPending();if(!P?.hit||!t||!w||enemyDefeated(t))return;
  let linked=quality(w,'linked'),auto=hasQuality(w,'autoFire')&&S.combat.autoFireMode,max=auto?999:linked;
  if(!max||P.extraHits>=max)return;
  spendAdv(2,auto?'Auto-Fire additional hit':'Linked additional hit',()=>{dealPendingHit(t,w,P.baseDamage,auto?'Auto-Fire':'Linked');P.extraHits++})
}
function activateBlast(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'blast')+((P?.actorId==='pc')?talentRank('Powerful Blast'):0);if(!P||!rating)return;
  let cost=P.hit?2:3;if(P.advantage<cost)return;
  spendAdv(cost,`Blast ${rating}`,()=>{
    let radius=w.blastRadius||0;
    S.combat.enemies.filter(e=>!enemyDefeated(e)&&(P.hit?e.id!==t?.id:true)&&(!t||rangeBandBetween(e.id,t.id)<=radius)).forEach(e=>{
      let dmg=Math.max(0,rating-e.soak);
      if(w.qualities?.stunDamage)applyEnemyStrain(e,dmg);else{e.w+=dmg;syncMinions(e)}
      cLog(`Blast catches ${e.name} for ${dmg}${w.qualities?.stunDamage?' strain-equivalent':''} damage.`)
    })
  })
}
function activateBurn(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'burn');if(!P?.hit||!rating)return;
  spendAdv(2,`Burn ${rating}`,()=>{t.burn={rounds:rating,damage:w.damage}})
}
function activateConcussive(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'concussive');if(!P?.hit||!rating)return;
  spendAdv(2,`Concussive ${rating}`,()=>{t.staggered=Math.max(t.staggered||0,rating)})
}
function activateDisorient(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'disorient');if(!P?.hit||!rating)return;
  spendAdv(2,`Disorient ${rating}`,()=>{t.disoriented=Math.max(t.disoriented||0,rating)})
}
function activateEnsnare(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'ensnare');if(!P?.hit||!rating)return;
  spendAdv(2,`Ensnare ${rating}`,()=>{t.ensnared=Math.max(t.ensnared||0,rating)})
}
function activateKnockdown(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending();if(!P?.hit||!hasQuality(w,'knockdown'))return;
  let sil=Math.max(1,t.silhouette||1),cost=2+Math.max(0,sil-1);spendAdv(cost,'Knockdown',()=>{t.prone=true})
}
function activateStun(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending(),rating=quality(w,'stun');if(!P?.hit||!rating)return;
  spendAdv(2,`Stun ${rating}`,()=>{applyEnemyStrain(t,rating);cLog(`${t.name} suffers ${rating} strain-equivalent damage.`)})
}
function activateSunder(){
  let P=pendingSpend(),w=weaponFromPending(),t=targetFromPending();if(!P?.hit||!hasQuality(w,'sunder'))return;
  spendAdv(1,'Sunder',()=>{t.weaponDamage=(t.weaponDamage||0)+1;t.weaponDamaged=true})
}
function activateCrit(useTriumph=false){
  let P=pendingSpend(),t=targetFromPending(),w=weaponFromPending();if(!P?.hit||!t||!w)return;
  let go=()=>{
    let forced=t.type==='minion'?null:choosePrecisionCritical(w),cr=inflictCritical(t,w,pcCriticalBonus(w,t),forced);
    if(cr?.name==='Overpowered'&&P.pool){
      let follow=rollNarr({...P.pool});
      if(follow.ok){
        let dmg=Math.max(0,P.baseDamage+(follow.ns-P.originalSuccess));dealPendingHit(t,w,dmg,'Overpowered follow-up');
        cLog(`Overpowered grants an immediate same-pool attack: ${rtxt(follow)}`)
      }else cLog(`Overpowered grants an immediate same-pool attack, but it misses: ${rtxt(follow)}`)
    }
  };
  if(useTriumph)spendTriumph('Critical Injury',go);else spendAdv(effectiveCritRating(w,t,P.actorId),'Critical Injury',go)
}
function advantageFreeManeuver(){
  let P=pendingSpend(),T=S.combat?.turn;if(!P||!T||T.maneuvers>=2)return;
  spendAdv(2,'Immediate free maneuver',()=>{T.maneuvers++})
}
function finishSymbolSpend(){
  let P=pendingSpend();if(!P)return;
  if(P.threat){
    let st=actorState(P.actorId),remaining=P.threat;
    if(remaining>=3){st.conditions.prone=true;remaining-=3;cLog('Threat: the active character falls prone.')}
    else if(remaining>=2){st.conditions.nextSetback=(st.conditions.nextSetback||0)+1;remaining-=2;cLog('Threat: the active character suffers 1 Setback on the next action.')}
    while(remaining>0){
      let loss=Math.max(1,1-(P.actorId==='pc'?talentRank('Resolve'):0));actorStrain(P.actorId,loss);remaining--;cLog(`Threat inflicts ${loss} strain on ${actorById(P.actorId).name}.`)
    }
  }
  if(P.despair){
    for(let n=0;n<P.despair;n++){
      let w=weaponFromPending();
      if(w?.type==='ordnance'){
        let ast=actorState(P.actorId);ast.conditions.nextUpgrade=(ast.conditions.nextUpgrade||0)+1;
        cLog(`Despair: the ${w.name} throw creates a serious tactical complication; the thrower’s next check is upgraded in difficulty.`)
      }else if(w&&['Ranged (Light)','Ranged (Heavy)','Gunnery'].includes(w.skill)){
        S.combat.outOfAmmo=S.combat.outOfAmmo||{};let wid=w.id||S.weapon;
        if(P.actorId==='pc'&&hasTalent('Spare Clip'))cLog(`Spare Clip prevents ${w.name} from running out of ammunition.`);
        else if(S.combat.outOfAmmo[wid]){S.itemDamage[wid]=(S.itemDamage[wid]||0)+1;cLog(`Despair: ${w.name} is already dry and suffers equipment damage (${S.itemDamage[wid]}).`)}
        else{S.combat.outOfAmmo[wid]=true;cLog(`Despair: ${w.name} runs dry or suffers a serious ammunition complication.`)}
      }else{let ast=actorState(P.actorId);ast.conditions.nextUpgrade=(ast.conditions.nextUpgrade||0)+1;cLog('Despair: the active character’s next check is upgraded in difficulty.')}
    }
  }
  S.combat.pendingSpend=null;if(activeEnemies().length===0){combatWin();return}renderCombat()
}
function renderSpendPanel(){
  let box=$('spendPanel'),P=pendingSpend();if(!box)return;
  if(!P){box.classList.add('hidden');box.innerHTML='';return}
  box.classList.remove('hidden');let t=targetFromPending(),w=weaponFromPending(),parts=[];
  parts.push(`<div class="row"><div><b>Resolve narrative symbols</b><div class="small">Advantage ${P.advantage} · Triumph ${P.triumph} · Threat ${P.threat} · Despair ${P.despair}</div><div class="tiny">${P.hit?'Successful hit: offensive qualities and Critical Injuries may be activated.':'Miss: narrative benefits remain available; Blast can still be triggered at increased cost when sufficient Advantage remains.'}</div></div><button class="btn good" id="finishSpend">Resolve remainder</button></div>`);
  parts.push('<div class="pills" style="margin-top:8px">');
  if(P.advantage>=1&&actorState(P.actorId).strain>0)parts.push(`<button class="btn" id="spRecover">1A Recover 1 strain</button>`);
  if(P.advantage>=1)parts.push(`<button class="btn" id="spBoost">1A Boost next ally</button>`);
  if(P.advantage>=2)parts.push(`<button class="btn" id="spSetback">2A Setback target</button>`);
  if(P.advantage>=2&&S.combat.turn?.maneuvers<2)parts.push(`<button class="btn" id="spMove">2A Free maneuver</button>`);
  if(P.advantage>=3)parts.push(`<button class="btn" id="spDefense">3A +1 defense until next turn</button>`);
  if(P.advantage>=3&&P.hit)parts.push(`<button class="btn" id="spDisarm">3A Disarm target</button>`);
  let critCost=effectiveCritRating(w,t,P.actorId);
  if(P.hit&&w?.crit&&P.advantage>=critCost)parts.push(`<button class="btn" id="spCrit">${critCost}A Critical${critCost<w.crit?' · Sorry About the Mess':''}</button>`);
  if(P.hit&&P.triumph>=1)parts.push(`<button class="btn" id="spTriCrit">Triumph: Critical</button>`);
  if(P.triumph>=1)parts.push(`<button class="btn" id="spTriUp">Triumph: upgrade next ally</button>`);
  if(P.hit&&((hasQuality(w,'autoFire')&&S.combat.autoFireMode)||quality(w,'linked'))&&P.advantage>=2)parts.push(`<button class="btn" id="spExtra">2A ${hasQuality(w,'autoFire')&&S.combat.autoFireMode?'Auto-Fire':'Linked'} hit</button>`);
  if(quality(w,'blast')&&P.advantage>=(P.hit?2:3))parts.push(`<button class="btn" id="spBlast">${P.hit?2:3}A Blast ${quality(w,'blast')}</button>`);
  if(P.hit&&quality(w,'burn')&&P.advantage>=2)parts.push(`<button class="btn" id="spBurn">2A Burn ${quality(w,'burn')}</button>`);
  if(P.hit&&quality(w,'concussive')&&P.advantage>=2)parts.push(`<button class="btn" id="spConcussive">2A Concussive ${quality(w,'concussive')}</button>`);
  if(P.hit&&quality(w,'disorient')&&P.advantage>=2)parts.push(`<button class="btn" id="spDisorient">2A Disorient ${quality(w,'disorient')}</button>`);
  if(P.hit&&quality(w,'ensnare')&&P.advantage>=2)parts.push(`<button class="btn" id="spEnsnare">2A Ensnare ${quality(w,'ensnare')}</button>`);
  if(P.hit&&quality(w,'stun')&&P.advantage>=2)parts.push(`<button class="btn" id="spStun">2A Stun ${quality(w,'stun')}</button>`);
  if(P.hit&&hasQuality(w,'knockdown')){let kc=2+Math.max(0,(t?.silhouette||1)-1);if(P.advantage>=kc)parts.push(`<button class="btn" id="spKnock">${kc}A Knockdown</button>`)}
  if(P.hit&&hasQuality(w,'sunder')&&P.advantage>=1)parts.push(`<button class="btn" id="spSunder">1A Sunder</button>`);
  parts.push('</div>');
  if(P.threat||P.despair)parts.push(`<div class="tiny" style="margin-top:8px">Uncancelled Threat and Despair are resolved after your positive-symbol choices. This solo implementation uses a compact tactical interpretation for their GM-side consequences.</div>`);
  box.innerHTML=parts.join('');
  $('finishSpend').onclick=finishSymbolSpend;
  if($('spRecover'))$('spRecover').onclick=()=>spendAdv(1,'Recover strain',()=>actorHealStrain(P.actorId,1));
  if($('spBoost'))$('spBoost').onclick=()=>spendAdv(1,'Boost next ally',()=>S.combat.nextAllyBoost=(S.combat.nextAllyBoost||0)+1);
  if($('spSetback'))$('spSetback').onclick=()=>spendAdv(2,'Setback target',()=>{if(t)t.nextSetback=(t.nextSetback||0)+1});
  if($('spMove'))$('spMove').onclick=advantageFreeManeuver;
  if($('spDefense'))$('spDefense').onclick=()=>spendAdv(3,'Defensive advantage',()=>S.combat.tempDefenseActor={...(S.combat.tempDefenseActor||{}),[P.actorId]:1});
  if($('spDisarm'))$('spDisarm').onclick=()=>spendAdv(3,'Disarm target',()=>{t.disarmed=true});
  if($('spCrit'))$('spCrit').onclick=()=>activateCrit(false);if($('spTriCrit'))$('spTriCrit').onclick=()=>activateCrit(true);
  if($('spTriUp'))$('spTriUp').onclick=()=>spendTriumph('Upgrade next allied check',()=>S.combat.nextAllyUpgrade=(S.combat.nextAllyUpgrade||0)+1);
  if($('spExtra'))$('spExtra').onclick=extraHit;if($('spBlast'))$('spBlast').onclick=activateBlast;if($('spBurn'))$('spBurn').onclick=activateBurn;
  if($('spConcussive'))$('spConcussive').onclick=activateConcussive;if($('spDisorient'))$('spDisorient').onclick=activateDisorient;if($('spEnsnare'))$('spEnsnare').onclick=activateEnsnare;
  if($('spStun'))$('spStun').onclick=activateStun;if($('spKnock'))$('spKnock').onclick=activateKnockdown;if($('spSunder'))$('spSunder').onclick=activateSunder
}
function applyOngoing(e){
  if(e.burn?.rounds>0){let dmg=Math.max(0,e.burn.damage-e.soak);e.w+=dmg;e.burn.rounds--;syncMinions(e);cLog(`${e.name} suffers ${dmg} Burn damage.`)}
  if(e.disoriented>0)e.disoriented--;
  if(e.ensnared>0)e.ensnared--
}

function specialCombatPool(actor,target,w,ri,commit=false){
  let skill=w.skill,ch=skillCharacteristic(actor,skill),rank=actor.sk?.[skill]||0,id=actor.id,st=actorState(id),
      diff=(skill==='Brawl'||skill==='Lightsaber')&&ri>0?ri:rangeDifficulty(skill,ri),cm=criticalCheckMods(id,skill,ch);
  if((skill==='Brawl'||skill==='Lightsaber')&&ri===0)diff=2;
  if(diff===99)return{invalid:true,reason:`${w.name} cannot be used at ${RANGE_NAMES[ri]} range.`};
  diff+=crippledDifficulty(id,skill)+(st.conditions.nextDifficulty||0)+cm.diff;
  let engaged=activeEnemies().filter(e=>rangeBandBetween(actor.id,e.id)===0).length,talentBoost=0;
  if(actor.id==='pc'&&target&&!target.hasActedEncounter)talentBoost+=talentRank('Quick Strike');
  if(actor.id==='pc'&&skill==='Lightsaber'&&ri===0&&engaged===1)talentBoost+=talentRank("Duelist's Training")?1:0;
  if(actor.id==='pc'&&['Brawl','Melee','Lightsaber'].includes(skill)&&ri===0&&engaged>1)talentBoost+=talentRank('Multiple Opponents')?1:0;
  let boost=talentBoost+approvalBoost(actor,skill)+crewRoleBoost(actor,skill,target)+(S.combat?.nextAllyBoost||0)+(actor.id==='pc'&&S.foreseeBoost?1:0),
      setback=(target.def||0)+(target.cover&&ri>0?1:0)+(st.conditions.disoriented>0?1:0)+(st.conditions.suppressed||0)*2+(st.conditions.nextSetback||0)+cm.setback,
      p=makePool(effectiveCharacteristic(actor,ch),rank,diff,cm.removeBoost?0:boost,setback,(target.adversary||0)+(st.conditions.nextUpgrade||0)+cm.upgrade);
  if(actor.id==='pc'&&S.forceCommitted.sense&&S.forceOwned.Sense.has('sn-off'))upgradePositivePool(p,S.forceOwned.Sense.has('sn-strength')?2:1);
  let destinyUsed=false;if(commit&&S.destinyPending.allyUpgrade){destinyUsed=applyQueuedAllyDestiny(p,true)}
  if(commit){st.conditions.nextUpgrade=0;st.conditions.nextDifficulty=0;st.conditions.nextSetback=0;if(actor.id==='pc'&&S.foreseeBoost)S.foreseeBoost=0}
  return{actor,target,w,skill,ch,rank,range:ri,p,invalid:false,destinyUsed}
}
function maybeMartialGrace(){
  let C=S.combat;if(!hasTalent('Martial Grace')||C.martialGraceRound===C.round||!canVoluntarilySufferStrain('pc')||S.strain+2>strainThreshold())return 0;
  if(!confirm(`Use Martial Grace? Suffer 2 strain to add Coordination ${S.skills.Coordination||0} damage to this Brawl hit.`))return 0;
  S.strain+=2;C.martialGraceRound=C.round;let n=S.skills.Coordination||0;cLog(`Martial Grace adds ${n} damage.`);return n
}
function unarmedAttack(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||C.pendingSpend)return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let actor=actorById('pc'),target=selectedEnemy();if(!target)return;let w=unarmedWeapon(),ri=rangeBandBetween('pc',target.id);
  if(ri!==0){cLog('Unarmed Strike requires Engaged range.');return}
  let q=specialCombatPool(actor,target,w,ri,true);if(q.invalid){cLog(q.reason);return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  let usedDark=maybeGMDarkDifficulty(q.p,`${actor.name}'s unarmed attack`);T.actionUsed=true;beforeCombatAction('pc');C.unarmedReady=true;
  let r=combatNaturalReroll('Brawl',q.p,rollNarr(q.p)),dmg=0;
  if(r.ok){
    let deadly=deadlyAccuracyDamage('Brawl'),bonus=maybeMartialGrace()+maybeEmbraceYourHate('Brawl')+deadly,pierce=quality(w,'pierce'),
        raw=effectiveCharacteristic(actor,'Brawn')+w.damage+r.ns+bonus;
    if(deadly)cLog(`Deadly Accuracy adds ${deadly} damage from Brawl ranks.`);
    dmg=Math.max(0,raw-Math.max(0,target.soak-pierce));target.w+=dmg;syncMinions(target);
    cLog(`${S.name} lands an unarmed strike on ${target.name} for ${dmg}. ${rtxt(r)}`)
  }else cLog(`${S.name}'s unarmed strike misses ${target.name}. ${rtxt(r)}`);
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,w,r,dmg,q.p);if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function farStrikeTalent(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||C.pendingSpend||!hasTalent('Far Strike'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let actor=actorById('pc'),target=selectedEnemy();if(!target)return;let ri=rangeBandBetween('pc',target.id);
  if(ri<1||ri>3){cLog('Far Strike targets an enemy from Short through Long range.');return}
  let need=Math.max(0,ri-1),fr=rollForce(forceAvailable()),forceUse=need?useForcePoints(fr,need):{ok:true};
  if(!forceUse.ok){cLog(`Far Strike cannot generate enough usable Force points to reach ${RANGE_NAMES[ri]}. Force ${fr.faces.join(' ')}`);return}
  let w=unarmedWeapon(),q=specialCombatPool(actor,target,w,ri,true);if(q.invalid){cLog(q.reason);return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  let usedDark=maybeGMDarkDifficulty(q.p,'Far Strike');T.actionUsed=true;beforeCombatAction('pc');C.unarmedReady=true;
  let r=combatNaturalReroll('Brawl',q.p,rollNarr(q.p)),dmg=0;
  if(r.ok){
    let deadly=deadlyAccuracyDamage('Brawl'),bonus=maybeMartialGrace()+maybeEmbraceYourHate('Brawl')+deadly,pierce=quality(w,'pierce'),
        raw=effectiveCharacteristic(actor,'Brawn')+r.ns+bonus;
    if(deadly)cLog(`Deadly Accuracy adds ${deadly} damage from Brawl ranks.`);
    dmg=Math.max(0,raw-Math.max(0,target.soak-pierce));target.w+=dmg;syncMinions(target);
    cLog(`Far Strike hits ${target.name} at ${RANGE_NAMES[ri]} for ${dmg}. Force ${fr.faces.join(' ')} · ${rtxt(r)}`)
  }else cLog(`Far Strike misses ${target.name}. Force ${fr.faces.join(' ')} · ${rtxt(r)}`);
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,w,r,dmg,q.p);if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function saberThrowTalent(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||C.pendingSpend||!hasTalent('Saber Throw'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let actor=actorById('pc'),target=selectedEnemy(),w=effectiveWeapon(S.weapon);C.unarmedReady=false;
  if(actorState('pc').conditions.droppedWeapon){cLog('Saber Throw cannot be used while the lightsaber is already dropped.');return}
  if(!target||w?.skill!=='Lightsaber'){cLog('Saber Throw requires an equipped lightsaber.');return}
  let ri=rangeBandBetween('pc',target.id);if(ri>2){cLog('Saber Throw can target up to Medium range.');return}
  let dice=forceAvailable();if(dice<1){cLog('Saber Throw needs an available Force die.');return}
  let fr=rollForce(dice),wantReturn=confirm('Saber Throw: OK = try to spend 2 Force points to hit and return the saber. Cancel = spend 1 Force point to hit and leave it at the target if it cannot return.'),
      use=useForcePoints(fr,wantReturn?2:1),returns=wantReturn&&use.ok;
  if(!use.ok&&wantReturn){use=useForcePoints(fr,1);returns=false}
  if(!use.ok){cLog(`Saber Throw fails to generate a usable Force point. Force ${fr.faces.join(' ')}`);return}
  let q=specialCombatPool(actor,target,w,Math.max(1,ri),true);if(q.invalid){cLog(q.reason);return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  maybeUseVaapadControl(q.p,'Lightsaber');let usedDark=maybeGMDarkDifficulty(q.p,'Saber Throw');
  T.actionUsed=true;beforeCombatAction('pc');let r=rollNarr(q.p),dmg=0;
  if(r.ok){
    let bonus=maybeFallingAvalanche('Lightsaber')+maybeEmbraceYourHate('Lightsaber'),pierce=quality(w,'pierce')+quality(w,'breach')*10,
        raw=w.damage+r.ns+bonus;dmg=Math.max(0,raw-Math.max(0,target.soak-pierce));target.w+=dmg;syncMinions(target);
    cLog(`Saber Throw hits ${target.name} for ${dmg}. Force ${fr.faces.join(' ')} · ${rtxt(r)}`)
  }else cLog(`Saber Throw misses ${target.name}. Force ${fr.faces.join(' ')} · ${rtxt(r)}`);
  if(!returns){actorState('pc').conditions.droppedWeapon=true;C.droppedWeaponPos=unitPosition(target.id);cLog(`The lightsaber remains at ${target.name}'s position (P${C.droppedWeaponPos}).`)}
  else cLog('The lightsaber returns to hand.');
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,w,r,dmg,q.p);if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function maybeUseVaapadControl(pool,skill){
  if(skill!=='Lightsaber'||!hasTalent('Vaapad Control')||(pool.challenge||0)<1||(S.destiny.light||0)<1)return 0;
  if(!canVoluntarilySufferStrain('pc')||S.strain+1>strainThreshold())return 0;
  let max=Math.min(S.destiny.light,pool.challenge||0);
  if(max<1||!confirm(`Use Vaapad Control? Suffer 1 strain to downgrade up to ${max} red difficulty ${max===1?'die':'dice'} on this Lightsaber check.`))return 0;
  S.strain+=1;downgradeDifficultyPool(pool,max);cLog(`Vaapad Control downgrades ${max} challenge ${max===1?'die':'dice'}.`);return max
}
function maybeEmbraceYourHate(skill){
  let C=S.combat,r=talentRank('Embrace Your Hate');if(!C||!r||!['Brawl','Melee','Lightsaber'].includes(skill))return 0;
  C.embraceUses=C.embraceUses||0;if(C.embraceUses>=r||S.destiny.light<1)return 0;
  if(!confirm(`Use Embrace Your Hate? Spend 1 light Destiny Point; after it flips, gain Conflict and bonus damage equal to the dark Destiny pool.`))return 0;
  if(!spendTalentDestiny('Embrace Your Hate'))return 0;
  let amount=S.destiny.dark||0;S.conflict+=amount;C.embraceUses++;
  cLog(`Embrace Your Hate adds ${amount} damage and ${amount} Conflict (${C.embraceUses}/${r} use${r===1?'':'s'} this encounter).`);
  return amount
}
function maybeFallingAvalanche(skill){
  if(skill!=='Lightsaber'||!hasTalent('Falling Avalanche')||!canVoluntarilySufferStrain('pc')||S.strain+2>strainThreshold())return 0;
  if(!confirm(`Use Falling Avalanche? Suffer 2 strain to add Brawn ${effectiveCharacteristic(actorById('pc'),'Brawn')} to this successful Lightsaber hit.`))return 0;
  S.strain+=2;let bonus=effectiveCharacteristic(actorById('pc'),'Brawn');cLog(`Falling Avalanche adds ${bonus} damage.`);return bonus
}

function pointBlankDamage(skill,range){
  return (['Ranged (Light)','Ranged (Heavy)'].includes(skill)&&range<=1)?talentRank('Point Blank'):0
}
function maybeBringItDown(target){
  if(!hasTalent('Bring It Down')||!target||S.destiny.light<1)return 0;
  if(!confirm(`Use Bring It Down? Spend 1 light Destiny Point to add ${target.c?.Brawn||target.brawn||2} damage against ${target.name}.`))return 0;
  S.destiny.light--;S.destiny.dark++;
  let bonus=target.c?.Brawn||target.brawn||2;cLog(`Bring It Down adds ${bonus} damage and flips one light Destiny Point.`);return bonus
}

function pcAttack(kind='normal'){
  let C=S.combat,T=C.turn;if(!T||C.pendingSpend)return;if(!startTurnActor())return;T=C.turn;if(!T||T.actorId!=='pc'||T.actionUsed)return;
  let actor=squadActors().find(a=>a.id==='pc'),target=C.enemies[Number($('target').value)||0];if(!target||enemyDefeated(target))return;
  let w=WEAPONS[S.weapon];C.unarmedReady=false;if(C.outOfAmmo?.[w.id]){cLog(`${w.name} is out of ammunition for this encounter.`);renderCombat();return}
  let precise=kind==='precise'&&canVoluntarilySufferStrain('pc')?Math.min(talentRank('Precise Aim'),Math.max(0,strainThreshold()-S.strain)):0;if(precise)S.strain+=precise;
  let q=combatPool(actor,target,T.aim,precise,true);if(q.invalid){cLog(q.reason);renderCombat();return}
  if(C.nextAllyUpgrade){let up=C.nextAllyUpgrade;upgradePositivePool(q.p,up);C.nextAllyUpgrade=0}
  maybeUseVaapadControl(q.p,q.skill);
  let usedDark=maybeGMDarkDifficulty(q.p,`${actor.name}'s attack`);
  T.actionUsed=true;beforeCombatAction(actor.id);let r=rollNarr(q.p),dmg=0;
  r=combatNaturalReroll(q.skill,q.p,r);
  if(hasAttachment(S.weapon,'setTrigger')&&!C.setTriggerUsed[S.weapon]){r.ns+=1;r.na-=1;r.ok=r.ns>0;C.setTriggerUsed[S.weapon]=true;cLog('Set Trigger: +1 Success and +1 Threat on this weapon’s first combat check of the encounter.')}
  if(r.ok){
    let pierce=quality(q.w,'pierce')+quality(q.w,'breach')*10,
        prey=(target.disoriented||0)>0?talentRank('Prey on the Weak'):0;
    let deadly=deadlyAccuracyDamage(q.skill),
        barrage=(['Ranged (Heavy)','Gunnery'].includes(q.skill)&&q.range>=3)?talentRank('Barrage'):0,
        pointBlank=pointBlankDamage(q.skill,q.range),
        bringItDown=maybeBringItDown(target),
        talentDamage=maybeFallingAvalanche(q.skill)+maybeEmbraceYourHate(q.skill)+prey+deadly+barrage+pointBlank+bringItDown,
        raw=(q.w.addBrawn?effectiveCharacteristic(actor,'Brawn'):0)+q.w.damage+r.ns+talentDamage;
    if(prey)cLog(`Prey on the Weak adds ${prey} damage against the disoriented target.`);
    if(deadly)cLog(`Deadly Accuracy adds ${deadly} damage from ${q.skill} ranks.`);
    if(barrage)cLog(`Barrage adds ${barrage} damage at ${RANGE_NAMES[q.range]} range.`);
    if(pointBlank)cLog(`Point Blank adds ${pointBlank} damage at ${RANGE_NAMES[q.range]} range.`);
    dmg=Math.max(0,raw-Math.max(0,target.soak-pierce));
    if(S.stunMode&&hasQuality(q.w,'stun')&&q.range<=1){applyEnemyStrain(target,dmg);cLog(`${S.name} stuns ${target.name} for ${dmg} strain-equivalent damage. ${rtxt(r)}`)}
    else{target.w+=dmg;if(target.type==='minion')target.members=Math.max(0,Math.ceil((target.wt-target.w)/target.perWt));cLog(`${S.name} hits ${target.name} for ${dmg}. ${rtxt(r)}`)}
  }else cLog(`${S.name} misses ${target.name}. ${rtxt(r)}`);
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,q.w,r,dmg,q.p);
  if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function crewAttack(){
  let C=S.combat,T=C.turn;if(!T||C.pendingSpend)return;if(!startTurnActor())return;T=C.turn;if(!T||T.actionUsed)return;
  let actor=squadActors().find(a=>a.id===T.actorId);if(!actor||actor.id==='pc')return;
  let target=C.enemies[Number($('target').value)||0]||activeEnemies()[0],q=combatPool(actor,target,T.aim,0,true);
  if(q.invalid){cLog(`${actor.name}: ${q.reason}`);T.actionUsed=true;renderCombat();return}
  if(C.nextAllyUpgrade){upgradePositivePool(q.p,C.nextAllyUpgrade);C.nextAllyUpgrade=0}
  let usedDark=maybeGMDarkDifficulty(q.p,`${actor.name}'s attack`);
  T.actionUsed=true;beforeCombatAction(actor.id);let r=rollNarr(q.p),dmg=0;
  if(r.ok){dmg=applyDamage(target,q.w,r);cLog(`${actor.name} hits ${target.name} for ${dmg}. ${rtxt(r)}`)}
  else cLog(`${actor.name} misses ${target.name}. ${rtxt(r)}`);
  if(q.destinyUsed)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  startSymbolSpend(actor,target,q.w,r,dmg,q.p);
  if((r.na<=0&&!r.tr)&&!r.de){finishSymbolSpend();return}renderCombat()
}
function forceHurl(){
  let C=S.combat,T=C.turn;if(!T||T.actorId!=='pc'||!S.forceOwned.Move.has('m-hurl'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let target=C.enemies[Number($('target').value)||0];if(!target)return;
  let maxSil=0+[...S.forceOwned.Move].filter(x=>x.startsWith('m-str')).length;
  let sil=Number(prompt(`Move: Hurl object silhouette (0–${maxSil}). Silhouette 0 deals 5 base damage; larger objects deal 10 × silhouette.`,'0'));
  if(!Number.isFinite(sil))return;sil=Math.max(0,Math.min(maxSil,Math.floor(sil)));
  let rangeUps=[...S.forceOwned.Move].filter(x=>x.startsWith('m-rng')).length,maxRange=1+rangeUps,ri=rangeBandBetween('pc',target.id);
  if(ri>maxRange){cLog(`Move cannot reach ${RANGE_NAMES[ri]}; current Hurl range reaches ${RANGE_NAMES[maxRange]}.`);return}
  let need=1+(sil>0?1:0),rank=S.skills.Discipline||0,diff=Math.max(1,sil),p=makePool(effectiveCharacteristic(actorById('pc'),'Willpower'),rank,diff,0,target.def,target.adversary);
  let usedLight=applyQueuedAllyDestiny(p,true),usedDark=maybeGMDarkDifficulty(p,'the Move: Hurl check'),r=rollNarr(p),fr=rollForce(forceAvailable()),use=useForcePoints(fr,need);
  T.actionUsed=true;beforeCombatAction('pc');
  if(r.ok&&use.ok){let base=sil===0?5:sil*10,dmg=Math.max(0,base+r.ns-target.soak);target.w+=dmg;cLog(`Move: Hurl launches a silhouette ${sil} object into ${target.name} for ${dmg} wounds after soak. Force ${fr.faces.join(' ')} · ${rtxt(r)}`)}
  else cLog(`Move: Hurl fails. Required ${need} Force point(s). Force ${fr.faces.join(' ')} · ${rtxt(r)}`);
  if(usedLight)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  if(activeEnemies().length===0){combatWin();return}renderCombat()
}
function forceLeap(dir){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||!S.forceOwned.Enhance.has('e-leap'))return;if(!startTurnActor())return;T=C.turn;
  let target=selectedEnemy();if(!target)return;
  let maneuver=S.forceOwned.Enhance.has('e-maneuver'),vertical=S.forceOwned.Enhance.has('e-vertical'),rangeUps=[...S.forceOwned.Enhance].filter(x=>x.startsWith('e-range')).length;
  let maxBands=1+rangeUps,from=unitPosition('pc'),to=unitPosition(target.id),step=dir<0?Math.sign(to-from):Math.sign(from-to);
  if(step===0)step=dir<0?0:(from<=4?-1:1);if(step===0)return;
  let nextPos=clampTacticalPos(from+step*maxBands);if(nextPos===from)return;
  let oldRange=rangeBandBetween('pc',target.id),newRange=Math.min(4,Math.abs(nextPos-to));
  if(maneuver){if(!spendManeuver(1,'Force Leap'))return}else if(T.actionUsed){cLog('Force Leap requires your action until its maneuver upgrade is purchased.');return}
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);
  if(!use.ok){cLog(`Force Leap fails to generate a usable Force point. ${fr.faces.join(' ')}`);renderCombat();return}
  if(!maneuver){T.actionUsed=true;beforeCombatAction('pc')}
  setUnitPosition('pc',nextPos);C.range=newRange;actorState('pc').conditions.cover=false;
  cLog(`Force Leap carries ${S.name} ${dir<0?'toward':'away from'} ${target.name}: ${RANGE_NAMES[oldRange]} → ${RANGE_NAMES[newRange]}${vertical?' with vertical movement available':''}. Force ${fr.faces.join(' ')}`);renderCombat()
}
function forceSenseEncounter(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||!S.forceOwned.Sense.has('sn-basic'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);T.actionUsed=true;beforeCombatAction('pc');
  if(use.ok){
    let range=1+[...S.forceOwned.Sense].filter(x=>x.startsWith('sn-range')).length,
        magnitude=1+[...S.forceOwned.Sense].filter(x=>x.startsWith('sn-mag')).length,
        detected=activeEnemies().filter(e=>rangeBandBetween('pc',e.id)<=Math.min(4,range)).slice(0,magnitude);
    C.forceSenseScan={round:C.round,range,magnitude,ids:detected.map(e=>e.id)};
    cLog(`Sense detects ${detected.length?detected.map(e=>`${e.name} (${RANGE_NAMES[rangeBandBetween('pc',e.id)]})`).join(', '):'no living targets in range'}; capacity ${magnitude}, maximum ${RANGE_NAMES[Math.min(4,range)]}. Force ${fr.faces.join(' ')}`)
  } else cLog(`Sense fails to generate a usable Force point. ${fr.faces.join(' ')}`);renderCombat()
}
function forceInfluenceCombat(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||!S.forceOwned.Influence.has('i-basic'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let target=C.enemies[Number($('target').value)||0];if(!target)return;
  let rangeUps=[...S.forceOwned.Influence].filter(x=>x.startsWith('i-rng')).length,maxRange=rangeUps,ri=rangeBandBetween('pc',target.id);
  if(ri>maxRange){cLog(`Influence is out of range. Target is at ${RANGE_NAMES[ri]}; current maximum is ${RANGE_NAMES[maxRange]}.`);return}
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1);T.actionUsed=true;beforeCombatAction('pc');
  if(!use.ok){cLog(`Influence fails to generate a usable Force point. ${fr.faces.join(' ')}`);renderCombat();return}
  if(S.forceOwned.Influence.has('i-ctl-emotion')){
    let tr=target.disciplineRank||target.rank||0,tc=target.c?.Willpower||2,p=makePool(effectiveCharacteristic(actorById('pc'),'Willpower'),S.skills.Discipline||0,Math.max(tc,tr),0,0,0),r=rollNarr(p);
    if(r.ok){target.influenced=true;target.nextSetback=(target.nextSetback||0)+1;cLog(`Influence overcomes ${target.name}'s discipline. Its emotional state/belief is altered briefly; the tactical abstraction adds 1 Setback to its next check. ${rtxt(r)} · Force ${fr.faces.join(' ')}`)}
    else cLog(`Influence reaches ${target.name}, but the opposed Discipline attempt fails. ${rtxt(r)} · Force ${fr.faces.join(' ')}`)
  }else{
    let dmg=S.forceOwned.Influence.has('i-str1')?2:1;applyEnemyStrain(target,dmg);cLog(`Influence inflicts ${dmg} strain-equivalent damage ignoring soak on ${target.name}. Force ${fr.faces.join(' ')}`)
  }
  if(activeEnemies().length===0){combatWin();return}renderCombat()
}
function forceMoveObject(){
  let C=S.combat,T=C?.turn;if(!T||T.actorId!=='pc'||!S.forceOwned.Move.has('m-basic'))return;if(!startTurnActor())return;T=C.turn;if(T.actionUsed)return;
  let maxSil=[...S.forceOwned.Move].filter(x=>x.startsWith('m-str')).length,range=1+[...S.forceOwned.Move].filter(x=>x.startsWith('m-rng')).length;
  let sil=Number(prompt(`Move an object, silhouette 0–${maxSil}`,'0'));if(!Number.isFinite(sil))return;sil=Math.max(0,Math.min(maxSil,Math.floor(sil)));
  let fr=rollForce(forceAvailable()),use=useForcePoints(fr,1+(sil>0?1:0));T.actionUsed=true;beforeCombatAction('pc');
  cLog(use.ok?`Move shifts a silhouette ${sil} object within ${RANGE_NAMES[Math.min(4,range)]} range. Use this narratively for cover, obstacles, switches, or positioning. Force ${fr.faces.join(' ')}`:`Move fails to generate enough usable Force points. ${fr.faces.join(' ')}`);renderCombat()
}
function reduceIncomingWithSaber(dmg,ranged){
  let rank=talentRank(ranged?'Reflect':'Parry');if(!rank)return dmg;
  let w=effectiveWeapon(S.weapon),unarmed=!ranged&&S.combat?.unarmedReady&&hasTalent('Unarmed Parry'),
      compatible=ranged?true:(['Melee','Lightsaber'].includes(w.skill)||unarmed);if(!compatible)return dmg;
  let reflex=!unarmed&&hasAttachment(S.weapon,'reflexGrip'),strainCost=Math.max(1,3+(reflex?1:0)-(unarmed?1:0)),effectiveRank=rank+(reflex?1:0);
  if(!canVoluntarilySufferStrain('pc')||S.strain+strainCost>strainThreshold())return dmg;
  if(confirm(`${ranged?'Reflect':'Parry'} ${effectiveRank}: suffer ${strainCost} strain to reduce damage by ${2+effectiveRank}?`)){S.strain+=strainCost;return Math.max(0,dmg-(2+effectiveRank))}
  return dmg
}
function enemyOfficerSupport(e){
  let allies=activeEnemies().filter(x=>x.id!==e.id);
  if(!allies.length)return false;
  let ally=allies.sort((a,b)=>enemyTargetScore(b,chooseEnemyTarget(b))-enemyTargetScore(a,chooseEnemyTarget(a)))[0]||allies[0];
  ally.nextBoost=(ally.nextBoost||0)+1;
  cLog(`${e.name} coordinates ${ally.name}, granting 1 Boost to its next attack.`);
  return true
}
function enemyAttack(e,target=null,extraBoost=0){
  let C=S.combat;target=target||chooseEnemyTarget(e);if(!target)return false;
  let skill=e.skill||'Ranged (Heavy)',ri=rangeBandBetween(e.id,target.id),diff=rangeDifficulty(skill,ri),melee=['Melee','Brawl','Lightsaber'].includes(skill);
  if(e.weaponDamage)diff+=Math.min(2,e.weaponDamage);
  if(diff===99||ri>rangeIndex(e.range||'Medium')){cLog(`${e.name} cannot attack ${target.name} effectively at ${RANGE_NAMES[ri]} range.`);return false}
  let rank=e.type==='minion'?(e.groupSkills?.includes(skill)?Math.max(0,e.members-1):0):(e.rank||0),tc=actorState(target.id).conditions,chName=SKILL_CHAR[skill]||'Agility';
  let ch=Math.max(1,(e.c?.[chName]??3)-(e.horrificChar?.[chName]||0)),
      coverSetback=(tc.cover&&!e.ignoreCoverOnce)?1:0,
      setback=coverSetback+actorDefense(target.id,melee?'melee':'ranged')+(e.disoriented?1:0)+(e.slightlyDazed?1:0)+(e.maimedLimb?1:0)+(e.suppressed||0)*2+(e.nextSetback||0),
      upgrade=target.id==='pc'?(C.defUpgrade||0):0;
  e.nextSetback=0;diff+=e.nextDifficulty||0;e.nextDifficulty=0;
  if(e.compromised)diff++;if(e.headRinger&&['Intellect','Cunning'].includes(chName))diff++;if(e.fearsomeWound&&['Presence','Willpower'].includes(chName))diff++;if(e.agonizingWound&&['Brawn','Agility'].includes(chName))diff++;
  if(e.crippledLimb==='arm'&&['Brawl','Melee','Lightsaber','Ranged (Light)','Ranged (Heavy)','Gunnery'].includes(skill))diff++;
  if(e.blinded)upgrade+=2;
  let situationalBoost=extraBoost+(e.nextBoost||0)+(e.highGround?1:0)+((C.markedTarget===target.id&&C.markedUntil>=C.round)?1:0);e.nextBoost=0;
  if(tc.prone){if(melee)situationalBoost+=1;else setback+=1}
  if(melee&&target.id==='pc')upgrade+=C.meleeDefUpgrade||0;
  if(C.tempDefenseActor?.[target.id])setback+=C.tempDefenseActor[target.id];
  let dm=DIFFICULTY[S.settings?.difficulty||'standard'];
  let p=makePool(ch,rank,diff,e.scatteredSenses?0:dm.enemyBoost+situationalBoost,setback+dm.enemySetback,upgrade),
      usedLight=applyQueuedNpcDestiny(p,true),usedDark=maybeGMDarkAbility(p,`${e.name}'s attack`),r=rollNarr(p);
  if(r.ok){
    let raw=Math.max(0,(e.damage||6)+r.ns+dm.damage);
    if(target.id==='pc')raw=reduceIncomingWithSaber(raw,!melee);
    let dmg=Math.max(0,raw-actorSoak(target.id)-(target.id==='pc'?(C.indomitableCommitted||0):0));
    actorDamage(target.id,dmg);cLog(`${e.name} hits ${target.name} from ${RANGE_NAMES[ri]} range for ${dmg}${target.id==='pc'&&C.indomitableCommitted?` after Indomitable Will ${C.indomitableCommitted}`:''}. ${rtxt(r)}`);
    if(e.crit&&r.na>=e.crit&&dmg>0){
      let cr=inflictPartyCritical(target.id,false);
      if(cr?.name==='Overpowered'&&!actorIsIncapacitated(target.id)){
        let follow=rollNarr({...p});
        if(follow.ok){
          let raw2=Math.max(0,(e.damage||6)+follow.ns+dm.damage);
          if(target.id==='pc')raw2=reduceIncomingWithSaber(raw2,!melee);
          let dmg2=Math.max(0,raw2-actorSoak(target.id)-(target.id==='pc'?(C.indomitableCommitted||0):0));actorDamage(target.id,dmg2);
          cLog(`Overpowered grants ${e.name} an immediate same-pool attack for ${dmg2}. ${rtxt(follow)}`)
        }else cLog(`Overpowered grants ${e.name} an immediate same-pool attack, but it misses. ${rtxt(follow)}`)
      }
    }
  }else cLog(`${e.name} misses ${target.name} from ${RANGE_NAMES[ri]} range. ${rtxt(r)}`);
  if(r.na>=2){let tst=actorState(target.id);tst.conditions.nextSetback=(tst.conditions.nextSetback||0)+1}
  if(usedLight)settleHeldDestiny('light',1);if(usedDark)settleHeldDestiny('dark',1);
  e.ignoreCoverOnce=false;
  return true
}
function enemyFinishSlot(e){
  if(e.suppressed>0)e.suppressed--;e.hasActedEncounter=true;
  S.combat.actedNPC.push(e.id);
  if(squadActors().every(a=>actorIsIncapacitated(a.id))){
    let kind=S.combat.kind;S.combat=null;$('combat').classList.add('hidden');$('adventure').classList.remove('hidden');
    for(const id of ['pc',...S.crew]){let st=actorState(id);st.wounds=Math.min(st.wounds,Math.max(0,actorWT(id)-1));st.strain=Math.min(st.strain,Math.max(0,actorST(id)-1));st.conditions.cover=false;if(id!=='pc')st.incapacitated=false}
    if(kind==='ep15Boss')S.ep15.location='outpostCommand';
    else if(kind==='ep15Bounty')S.ep15.location='camp';
    else if(kind==='ep15Beasts')S.ep15.location='ash';
    else if(kind==='ep15Outpost')S.ep15.location='outpostGate';
    else if(kind==='ep15Patrol')S.ep15.location='crash';
    gLog('The squad is incapacitated and forced to withdraw. After emergency recovery, the encounter can be attempted again.');renderAdventure();renderRecovery();return
  }
  S.combat.slotIndex++;beginSlot()
}
function enemySlotTurn(e){
  if(!e)return;let C=S.combat;initializeTacticalState(C);
  applyOngoing(e);if(enemyDefeated(e)){C.actedNPC.push(e.id);C.slotIndex++;beginSlot();return}
  if(e.bleedingOut){let before=Math.max(0,e.w-e.wt),band=Math.floor(before/5);e.w++;applyEnemyStrain(e,1);let after=Math.max(0,e.w-e.wt);if(Math.floor(after/5)>band)inflictCritical(e,{qualities:{},crit:99},0);cLog(`${e.name} suffers Bleeding Out.`);if(enemyDefeated(e)){C.actedNPC.push(e.id);C.slotIndex++;beginSlot();return}}
  if(e.knockedSenseless){cLog(`${e.name} is Knocked Senseless and cannot act.`);enemyFinishSlot(e);return}
  if(e.atBrink){applyEnemyStrain(e,1);cLog(`${e.name} suffers 1 strain from At the Brink.`);if(enemyDefeated(e)){enemyFinishSlot(e);return}}
  if(e.ensnared>0){let p=makePool(e.c?.Brawn||2,e.type==='minion'?0:(e.athleticsRank||0),3),r=rollNarr(p);if(r.ok){e.ensnared=0;cLog(`${e.name} breaks free of Ensnare. ${rtxt(r)}`)}else cLog(`${e.name} struggles against Ensnare. ${rtxt(r)}`);enemyFinishSlot(e);return}
  if(e.staggered>0){cLog(`${e.name} is staggered and loses its action.`);e.staggered--;enemyFinishSlot(e);return}

  checkEnemyMorale(e);
  if(e.retreating){C.lastAIIntent=`${e.name} is broken and retreating toward the battlefield edge.`;cLog(`AI: ${C.lastAIIntent}`);enemyRetreatTurn(e);enemyFinishSlot(e);return}

  if(['officer','commander'].includes(enemyAIRole(e))&&enemyOfficerRally(e)){C.lastAIIntent=`${e.name} spends its action trying to rally broken allies.`;enemyFinishSlot(e);return}

  let intent=enemyTacticalIntent(e),target=intent.target;if(!target){enemyFinishSlot(e);return}
  applyEnemySpecial(e,target);
  let grenade=enemyGrenadeChoice(e);
  if(grenade){
    C.lastAIIntent=`${e.name} sees ${grenade.cluster.length} squad members clustered at P${unitPosition(grenade.target.id)} and uses ${ORDNANCE[grenade.id].name}.`;
    cLog(`AI: ${C.lastAIIntent}`);enemyThrowGrenade(e,grenade);enemyFinishSlot(e);return
  }

  C.lastAIIntent=intent.text;cLog(`AI: ${intent.text}`);
  let role=intent.role,usedManeuver=false,actionSpent=false,r=rangeBandBetween(e.id,target.id),max=rangeIndex(e.range||'Medium');

  if(e.disarmed){e.disarmed=false;usedManeuver=true;cLog(`${e.name} recovers its dropped weapon as a maneuver.`)}

  /* Close combatants aggressively close distance. */
  if(role==='melee'&&r>0&&!usedManeuver){
    moveUnitToward(e.id,target.id,1);e.cover=false;usedManeuver=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} closes on ${target.name}: now ${RANGE_NAMES[r]}.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }
  if(role==='melee'&&r>0){
    moveUnitToward(e.id,target.id,1);e.cover=false;actionSpent=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} trades its action for a second movement maneuver: now ${RANGE_NAMES[r]}.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }

  /* Snipers disengage when crowded; skirmishers try to maintain Short range. */
  if(!actionSpent&&role==='sniper'&&r<=1&&!usedManeuver){
    moveUnitAway(e.id,target.id,1);e.cover=false;usedManeuver=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} falls back to ${RANGE_NAMES[r]} range.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }
  if(!actionSpent&&role==='skirmisher'&&r===0&&!usedManeuver){
    moveUnitAway(e.id,target.id,1);e.cover=false;usedManeuver=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} opens space to ${RANGE_NAMES[r]} range.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }

  /* Any ranged unit outside its weapon envelope closes before acting. */
  if(!actionSpent&&r>max&&!usedManeuver){
    moveUnitToward(e.id,target.id,1);e.cover=false;usedManeuver=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} advances into ${RANGE_NAMES[r]} range.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }
  if(!actionSpent&&r>max){
    moveUnitToward(e.id,target.id,1);e.cover=false;actionSpent=true;r=rangeBandBetween(e.id,target.id);
    cLog(`${e.name} uses its action for additional movement to ${RANGE_NAMES[r]} range.`);if(triggerOverwatch(e)){enemyFinishSlot(e);return}
  }

  if(!actionSpent){
    r=rangeBandBetween(e.id,target.id);
    let cluster=partyAtPosition(unitPosition(target.id));
    if(['rifle','officer','commander'].includes(role)&&cluster.length>=2&&e.suppressionUsedRound!==C.round&&r<=max){
      C.lastAIIntent=`${e.name} suppresses the clustered squad at P${unitPosition(target.id)} instead of making a damaging attack.`;
      cLog(`AI: ${C.lastAIIntent}`);enemySuppressiveFire(e,target);actionSpent=true
    }
  }

  let attackBoost=0;
  if(!actionSpent&&role==='officer'&&!usedManeuver&&r<=max)usedManeuver=enemyOfficerSupport(e);
  if(!actionSpent&&!usedManeuver&&role!=='melee'&&r>0){
    if(!e.cover&&(role==='rifle'||role==='skirmisher'||role==='sniper'||role==='commander')){
      e.cover=true;usedManeuver=true;cLog(`${e.name} takes cover before firing.`)
    }else{
      attackBoost++;usedManeuver=true;cLog(`${e.name} aims before attacking.`)
    }
  }

  if(!actionSpent){
    r=rangeBandBetween(e.id,target.id);
    if(rangeDifficulty(e.skill||'Ranged (Heavy)',r)!==99&&r<=max)enemyAttack(e,target,attackBoost);
    else cLog(`${e.name} cannot bring its weapon to bear this turn.`)
  }

  enemyFinishSlot(e)
}
function endTurn(){
  if(!S.combat?.turn)return;
  if(!startTurnActor())return;
  endPCSlot()
}
function commitSense(){if(S.forceCommitted.sense){S.forceCommitted.sense=false;cLog('Sense die uncommitted.')}else if(forceAvailable()>0&&S.forceRating>0&&S.forceOwned.Sense.has('sn-def')){S.forceCommitted.sense=true;cLog('One Force die committed to Sense.')}renderCombat()}
function secondWind(){
  if(!startTurnActor())return;
  let r=talentRank('Second Wind');if(!r||S.combat.turn?.actorId!=='pc'||S.combat.secondWindRound===S.combat.round)return;
  S.strain=Math.max(0,S.strain-r);S.combat.secondWindRound=S.combat.round;cLog(`Second Wind recovers ${r} strain.`);renderCombat()
}

function improvedToughenedTalent(){
  if(!hasTalent('Improved Toughened')||S.sessionUsed.improvedToughened)return;
  let heal=talentRank('Toughened'),before=S.wounds;if(heal<1)return;
  S.wounds=Math.max(0,S.wounds-heal);S.sessionUsed.improvedToughened=true;
  cLog(`Improved Toughened heals ${before-S.wounds} wound(s) from ${talentRank('Toughened')} Toughened rank(s).`);renderCombat()
}
function innerPeaceTalent(){
  let C=S.combat,ranks=talentRank('Inner Peace');if(!C||!ranks||C.innerPeaceUsed)return;
  let max=Math.min(ranks,S.destiny.dark);if(max<1){cLog('Inner Peace has no dark Destiny Point available to convert.');return}
  let n=Math.max(1,Math.min(max,Number(prompt(`Inner Peace rank ${ranks}: convert how many dark Destiny Points to light? Maximum ${max}.`,String(max)))||0));if(n<1)return;
  S.destiny.dark-=n;S.destiny.light+=n;S.conflictReduction=(S.conflictReduction||0)+1+n;C.innerPeaceUsed=true;
  cLog(`Inner Peace converts ${n} dark Destiny Point(s) to light and prepares ${1+n} Conflict reduction for this session.`);renderCombat()
}
function heroicFortitudeTalent(){
  let C=S.combat;if(!C||!hasTalent('Heroic Fortitude')||C.heroicFortitude)return;
  if(!spendTalentDestiny('Heroic Fortitude'))return;C.heroicFortitude=true;
  cLog('Heroic Fortitude: Critical Injury effects are ignored on Brawn and Agility checks until this encounter ends.');renderCombat()
}
function powerFromPainTalent(){
  let C=S.combat;if(!C||!hasTalent('Power From Pain')||S.sessionUsed.powerFromPain)return;
  let n=actorState('pc').criticals.length;if(n<1){cLog('Power From Pain needs at least one current Critical Injury.');return}
  if(!spendTalentDestiny('Power From Pain'))return;S.sessionUsed.powerFromPain=true;C.powerFromPainFR=n;
  cLog(`Power From Pain increases Force Rating by ${n} for this encounter (effective Force Rating ${effectiveForceRating()}).`);renderCombat();renderForce()
}
function indomitableWillTalent(){
  let C=S.combat,T=C?.turn;if(!C||!T||T.actorId!=='pc'||!hasTalent('Indomitable Will')||C.indomitableUsed)return;
  if(!canVoluntarilySufferStrain('pc')||S.strain+3>strainThreshold()){cLog('Not enough strain capacity for Indomitable Will.');return}
  if(!spendManeuver(1,'Indomitable Will'))return;
  let max=forceAvailable();if(max<1){cLog('No uncommitted Force dice are available for Indomitable Will.');return}
  let n=Math.max(1,Math.min(max,Number(prompt(`Commit how many Force dice to Indomitable Will? Maximum ${max}.`,String(max)))||0));if(n<1)return;
  S.strain+=3;C.indomitableCommitted=n;C.indomitableUsed=true;
  cLog(`Indomitable Will commits ${n} Force die/dice. Incoming damage is reduced by ${n}; sustaining it costs 1 strain at the start of each turn.`);renderCombat();renderForce()
}
function releaseIndomitableWill(){
  let C=S.combat;if(!C?.indomitableCommitted)return;let n=C.indomitableCommitted;C.indomitableCommitted=0;cLog(`Released ${n} Force die/dice from Indomitable Will.`);renderCombat();renderForce()
}
function headbuttTalent(){
  let C=S.combat,T=C?.turn;if(!C||!T||T.actorId!=='pc'||!hasTalent('Headbutt')||C.headbuttUsed)return;
  if(!startTurnActor())return;let target=selectedEnemy();if(!target||rangeBandBetween('pc',target.id)!==0){cLog('Headbutt requires an engaged target.');return}
  actorDamage('pc',2);target.prone=true;target.disoriented=Math.max(target.disoriented||0,2);C.headbuttUsed=true;
  cLog(`${S.name} uses Headbutt, suffering 2 wounds. ${target.name} is knocked prone and disoriented.`);renderCombat()
}
function hardHeadedTalent(){
  let C=S.combat,T=C?.turn;if(!C||!T||T.actorId!=='pc'||!hasTalent('Hard Headed'))return;
  let st=actorState('pc'),affected=st.conditions.staggered>0||st.conditions.disoriented>0;if(!affected){cLog('Hard Headed has no staggered or disoriented condition to clear.');return}
  if(!startTurnActor())return;T=C.turn;if(!T)return;
  let diff=Math.max(1,5-talentRank('Hard Headed')),q=actorPool(actorById('pc'),'Discipline',{diff,commit:true}),r=rollNarr(q.p);T.actionUsed=true;
  if(r.ok){st.conditions.staggered=0;st.conditions.disoriented=0;cLog(`Hard Headed clears staggered/disoriented. ${rtxt(r)}`)}
  else cLog(`Hard Headed fails to clear the condition. ${rtxt(r)}`);renderCombat()
}
function combatWin(){
  let kind=S.combat.kind;recoverBalance();S.combat=null;S.medical.encounter++;
  for(const id of ['pc',...S.crew]){let c=actorState(id).conditions;c.disoriented=0;c.immobilized=0;c.staggered=0;c.suppressed=0;c.hamstrung=false;c.winded=false;c.compromised=false;c.headRinger=false;c.fearsomeWound=false;c.agonizingWound=false;c.slightlyDazed=false;c.scatteredSenses=false;c.knockedSenseless=false;c.cover=false;c.noFreeManeuver=0;c.nextSetback=0;c.nextUpgrade=0;c.nextDifficulty=0}
  $('combat').classList.add('hidden');$('adventure').classList.remove('hidden');
  if(kind==='ep15Patrol'){mainAdvance(4,'underworks');S.earnedXp+=12;awardCrewXP(5,'Imperial recovery patrol victory');gLog('Imperial recovery patrol defeated. +12 XP.')}
  else if(kind==='ep15Beasts'){S.ep15.flags.scoutRescued=true;epRewardLoot('scoutPack');epCompleteQuest('missing',7,150);S.ep15.rep.Local+=2;changeApproval('kira',1,'rescued the missing scout');epGo('clinic');return}
  else if(kind==='ep15Bounty'){S.ep15.flags.kordaResolved=true;epCompleteQuest('bounty',8,300);epRep('Guild',2,'Korda Venn bounty completed');changeApproval('tavo',2,'successful hunt');epGo('cantina');return}
  else if(kind==='ep15Outpost'){S.ep15.flags.outpostAlarm=true;S.ep15.dungeonStage=1;mainAdvance(7,'outpostService');S.earnedXp+=8;awardCrewXP(3,'listening-post breach');gLog('The checkpoint is cleared, but the post is on alert. +8 XP.')}
  else if(kind==='ep15Boss'){mainAdvance(9,'orbit');S.ship.owned=true;S.earnedXp+=30;awardCrewXP(10,'Chief Varrik defeated');epRewardLoot('bossLocker');epRep(S.flags.faction||'Local',1,'survived Hangar Twelve');gLog('Chief Varrik falls and Hangar Twelve is secured. The crew launches in the captured freighter. +30 XP.')}
  else if(kind==='patrol'){mainAdvance(4,'underworks');S.earnedXp+=15;awardCrewXP(6,'Imperial patrol victory');gLog('Patrol defeated. +15 XP.')}
  else{mainAdvance(9,'orbit');S.ship.owned=true;S.earnedXp+=35;awardCrewXP(10,'Hangar victory');gLog('Hangar secured and ship acquired. +35 XP.')}
  updateQuestLocks();renderAdventure();renderCrewManagement();renderShip()
}
function cLog(x){if(!S.combat)return;S.combat.log.unshift(x);S.combat.log=S.combat.log.slice(0,18)}
function recoverBalance(){
  if(!hasTalent('Balance')||effectiveForceRating()<1)return;
  if(!confirm('Use Balance at the end of the encounter to recover additional strain?'))return;
  let fr=rollForce(effectiveForceRating()),recover=isDarkSide()?fr.dark:fr.light;
  S.strain=Math.max(0,S.strain-recover);
  if(S.combat)cLog(`Balance: ${fr.faces.join(' ')} · recovered ${recover} strain.`)
}
function automaticDarkTalentConflict(){
  return ['Embrace Your Hate','Juyo Savagery','Power From Pain'].reduce((n,name)=>n+(hasTalent(name)?1:0),0)
}
function resolveMoralitySession(){
  let automatic=automaticDarkTalentConflict(),gross=S.conflict+automatic,reduction=Math.min(gross,S.conflictReduction||0),used=Math.max(0,gross-reduction),
      d10=1+Math.floor(Math.random()*10),delta=d10-used,old=S.morality;
  S.morality=Math.max(1,Math.min(100,S.morality+delta));S.conflict=0;S.conflictReduction=0;
  S.sessionUsed={naturalProgrammer:false,naturalCharmer:false,naturalDoctor:false,naturalNegotiator:false,naturalLeader:false,naturalHunter:false,naturalOutdoorsman:false,naturalTinkerer:false,naturalMystic:false,naturalBrawler:false,naturalRogue:false,naturalMarksman:false,naturalEnforcer:false,naturalMerchant:false,naturalAthlete:false,naturalDriver:false,naturalInstructor:false,naturalPilot:false,worksLikeACharm:false,cleverSolution:false,fortuneFavorsBold:false,senseDanger:false,touchOfFate:false,forceOfWill:false,powerFromPain:false,improvedToughened:false};
  let investmentIncome=100*talentRank('Sound Investments');if(investmentIncome){S.credits+=investmentIncome;bLog(`Sound Investments: the new session generates ${investmentIncome} credits.`)}
  bLog(`Morality: d10 ${d10} − Conflict ${used} = ${delta>=0?'+':''}${delta}. ${old} → ${S.morality}.${automatic?` Dark-side talents contributed ${automatic} automatic Conflict.`:''}${reduction?` Inner Peace reduced session Conflict by ${reduction}.`:''}`);
  renderAll()
}

function renderBattlefield(){
  let C=S.combat;if(!C||!$('battlefield'))return;
  let selected=selectedEnemy(),active=C.turn?.actorId;
  let cells=[];
  for(let pos=0;pos<=8;pos++){
    let tokens=[];
    for(const a of squadActors()){
      if(unitPosition(a.id)!==pos)continue;
      let cls=`tactical-token pc ${active===a.id?'active':''} ${actorState(a.id).conditions.cover?'covered':''}`;
      tokens.push(`<span class="${cls}"><b>${a.name}</b><br><span class="ai-role">${a.id==='pc'?'player':COMPANION_ROLES[crewProgress(a.id).role].name}</span></span>`)
    }
    C.enemies.forEach((e,i)=>{
      if(unitPosition(e.id)!==pos)return;
      let cls=`tactical-token enemy ${selected?.id===e.id?'active':''} ${e.cover?'covered':''} ${e.retreating?'retreating':''}`;
      tokens.push(`<button class="${cls}" data-battle-target="${i}" ${enemyDefeated(e)?'disabled':''}><b>${e.name}</b><br><span class="ai-role">${enemyAIRole(e)}</span></button>`)
    });
    cells.push(`<div class="tactical-cell"><div class="band">P${pos} · ${tacticalBandLabel(pos)}</div>${tokens.join('')||'<span class="tiny">—</span>'}</div>`)
  }
  $('battlefield').innerHTML=cells.join('');
  document.querySelectorAll('[data-battle-target]').forEach(b=>b.onclick=()=>{$('target').value=b.dataset.battleTarget;renderCombat()});
  $('aiIntent').innerHTML=`<b>Enemy AI:</b> ${C.lastAIIntent||'No enemy action yet.'}`
}

function renderCombat(){
  let C=S.combat;if(!C)return;initializeTacticalState(C);
  let slot=currentSlot(),pcSlot=slot?.side==='PC',avail=availableSideActors('PC'),priorTarget=selectedEnemy()?.id;
  const titles={patrol:'Imperial Patrol',ep15Patrol:'Imperial Recovery Patrol',ep15Beasts:'Ash Stalker Ravine',ep15Bounty:'Korda Venn Bounty',ep15Outpost:'Listening Post Security',ep15Boss:'Chief Varrik — Hangar Twelve',boss:'Hangar Blockade'};
  $('combatTitle').textContent=titles[C.kind]||'Structured Encounter';$('round').textContent=C.round;$('slotNow').textContent=`${C.slotIndex+1}/${C.slots.length} ${slot?.side||''}`;$('initiativeMode').textContent=C.prepared?'Squad: Cool':'Squad: Vigilance';
  $('initiativeStrip').innerHTML=C.slots.map((s,i)=>`<span class="pill ${i===C.slotIndex?'current-slot':''}">${s.side} <b>${s.success}</b>/<span>${s.adv}</span></span>`).join('');

  $('target').innerHTML=C.enemies.map((e,i)=>!enemyDefeated(e)?`<option value="${i}">${e.name} · ${enemyAIRole(e)}</option>`:'').join('');
  if(priorTarget){let idx=C.enemies.findIndex(e=>e.id===priorTarget&&!enemyDefeated(e));if(idx>=0)$('target').value=String(idx)}
  $('target').onchange=renderCombat;

  let T=C.turn,actor=pcSlot?squadActors().find(a=>a.id===T?.actorId):null,target=selectedEnemy();
  let ri=actor&&target?rangeBandBetween(actor.id,target.id):2;C.range=ri;
  let q=actor&&target?combatPool(actor,target,T?.aim||0,0,false):null;

  $('party').innerHTML=squadActors().map(a=>{
    let st=actorState(a.id),active=T?.actorId===a.id,ar=target?rangeBandBetween(a.id,target.id):null;
    return`<div class="unit ${active?'active-unit':''} ${C.actedPC.includes(a.id)||actorIsIncapacitated(a.id)?'down':''}"><div class="row"><b>${a.name}</b><span class="tag">${a.id==='pc'?'PLAYER':COMPANION_ROLES[crewProgress(a.id).role].name.toUpperCase()}</span></div><div class="vital-row" style="margin-top:7px">${meterHTML('Wounds',st.wounds,actorWT(a.id),'wound')}${meterHTML('Strain',st.strain,actorST(a.id),'strain')}</div><div class="tiny" style="margin-top:7px">${a.id==='pc'?'':`XP ${crewProgress(a.id).xp} · `}Soak ${actorSoak(a.id)} · Def ${actorDefense(a.id)} · ${WEAPONS[a.weapon].name}</div><div class="tiny">Position P${unitPosition(a.id)}${ar!=null?` · ${RANGE_NAMES[ar]} to selected target`:''} · Conditions: ${conditionsText(a.id)}${C.overwatch?.[a.id]?' · OVERWATCH':''}${actorIsIncapacitated(a.id)?' · INCAPACITATED':''}</div></div>`
  }).join('');

  $('enemies').innerHTML=C.enemies.map(e=>{
    let cond=[e.prone?'Prone':'',e.disoriented?'Disoriented':'',e.ensnared?'Ensnared':'',e.staggered?'Staggered':'',e.disarmed?'Disarmed':'',e.cover?'Cover':''].filter(Boolean).join(', ')||'None',
        ar=actor?rangeBandBetween(actor.id,e.id):null;
    let gren=Object.entries(e.grenades||{}).filter(([,n])=>n>0).map(([id,n])=>`${ORDNANCE[id]?.name||id} ×${n}`).join(', ');
    return`<div class="unit ${enemyDefeated(e)?'down':''} ${e.retreating?'retreating':''}"><div class="row"><b>${e.name}</b><span class="tag">${(e.type||'Rival').toUpperCase()} · ${enemyAIRole(e).toUpperCase()}</span></div>${meterHTML('Wounds',e.w,e.wt,'enemy')}<div class="tiny" style="margin-top:7px">${e.type==='minion'?`${e.members} minion(s) remaining · `:''}Soak ${e.soak}${e.adversary?' · Adversary '+e.adversary:''} · Morale ${enemyMoraleLabel(e)}${e.suppressed?` · Suppressed ${e.suppressed}`:''}${e.highGround?' · High Ground':''}</div><div class="tiny">Position P${unitPosition(e.id)}${ar!=null?` · ${RANGE_NAMES[ar]} from active actor`:''} · Conditions: ${cond}${e.retreating?' · RETREATING':''}${e.fled?' · FLED':''}${gren?` · Ordnance: ${gren}`:''}</div></div>`
  }).join('');

  $('activeActor').innerHTML=avail.map(a=>`<option value="${a.id}" ${T?.actorId===a.id?'selected':''}>${a.name}</option>`).join('');
  $('activeActor').disabled=!pcSlot||!!T?.started;
  $('activeActor').onchange=()=>{
    if(!C.turn)return;
    if(C.turn.started){renderCombat();return}
    C.turn.actorId=$('activeActor').value;C.turn.cover=actorState(C.turn.actorId).conditions.cover;renderCombat()
  };

  $('rangeBand').textContent=target&&actor?`${RANGE_NAMES[ri]} · P${unitPosition(actor.id)} ↔ P${unitPosition(target.id)}`:'—';
  $('maneuverState').textContent=pcSlot&&T&&actor?`${actor.name}: Force ${forceAvailable()}/${S.forceRating} available · ${T.maneuvers}/2 maneuvers used · action ${T.actionUsed?'used':'available'} · Position P${unitPosition(actor.id)} · Conditions: ${conditionsText(actor.id)}${T.aim?` · Aim +${T.aim} Boost`:''}${actorState(actor.id).conditions.cover?' · in cover':''} · Ordnance F${S.ordnance?.frag||0}/S${S.ordnance?.stun||0}/T${S.ordnance?.miniThermal||0}${C.powerFromPainFR?` · Power From Pain +${C.powerFromPainFR} FR`:''}${C.indomitableCommitted?` · Indomitable ${C.indomitableCommitted}`:''}${C.heroicFortitude?' · Heroic Fortitude':''}`:'Waiting for NPC slot…';

  let mb=[];
  if(pcSlot&&T&&actor&&target){
    if(actorState(T.actorId).conditions.prone)mb.push(`<button class="btn" id="mStand">Stand up</button>`);
    if(actorState(T.actorId).conditions.droppedWeapon)mb.push(`<button class="btn" id="mRecoverWeapon">Recover weapon</button>`);
    mb.push(`<button class="btn" id="mCloser" ${ri===0?'disabled':''}>Move toward ${target.name}</button>`,`<button class="btn" id="mFarther">Move away</button>`,`<button class="btn" id="mAim">Aim</button>`,`<button class="btn" id="mCover">Take Cover</button>`);
    if(T.actorId==='pc'&&talentRank('Side Step'))mb.push(`<button class="btn" id="mSide">Side Step</button>`);
    if(T.actorId==='pc'&&talentRank('Defensive Stance'))mb.push(`<button class="btn" id="mStance">Defensive Stance</button>`);
    if(T.actorId==='pc'&&talentRank('Second Wind'))mb.push(`<button class="btn" id="mWind">Second Wind</button>`);
    if(T.actorId==='pc'&&WEAPONS[S.weapon].qualities?.stun)mb.push(`<button class="btn" id="mStun">Mode: ${S.stunMode?'STUN':'KILL'}</button>`);
    if(S.stimpacks>0)mb.push(`<button class="btn" id="mStim">Stimpack (${S.stimpacks})</button>`);
    if(T.actorId==='pc'&&C.outOfAmmo?.[S.weapon]&&S.reloads>0)mb.push(`<button class="btn" id="mReload">Reload (${S.reloads})</button>`)
  }
  $('maneuverButtons').innerHTML=mb.join('');
  if($('mStand'))$('mStand').onclick=standUp;if($('mRecoverWeapon'))$('mRecoverWeapon').onclick=recoverDroppedWeapon;if($('mCloser'))$('mCloser').onclick=()=>moveRange(-1);if($('mStim'))$('mStim').onclick=useStimpack;if($('mReload'))$('mReload').onclick=reloadCurrentWeapon;if($('mFarther'))$('mFarther').onclick=()=>moveRange(1);if($('mAim'))$('mAim').onclick=aimManeuver;if($('mCover'))$('mCover').onclick=takeCover;if($('mSide'))$('mSide').onclick=sideStepManeuver;if($('mStance'))$('mStance').onclick=defensiveStanceManeuver;if($('mWind'))$('mWind').onclick=secondWind;if($('mStun'))$('mStun').onclick=toggleStun;

  if(q){
    $('combatPreview').innerHTML=q.invalid?`<span class="bad">${q.reason}</span>`:`<div class="row"><div><b>${actor.name}</b> with <b>${q.w.name}</b><div class="tiny">${q.skill} ${q.rank} · ${q.ch} ${effectiveCharacteristic(actor,q.ch)} · ${RANGE_NAMES[q.range]} range · ${target.name}${target.cover?' in cover':''}</div></div><span class="tag">Damage ${q.w.damage} · Crit ${q.w.crit?effectiveCritRating(q.w,target,actor.id):'—'}</span></div><div style="margin-top:8px">${dicePoolHTML(q.p)}</div>${S.destinyPending.allyUpgrade?'<div class="gold tiny" style="margin-top:6px">Light Destiny upgrade queued</div>':''}<div class="tiny" style="margin-top:6px">Qualities: ${Object.keys(q.w.qualities||{}).join(', ')||'none'} · Target defense includes tactical cover automatically. ${enemiesAtPosition(unitPosition(target.id)).length>1?`${enemiesAtPosition(unitPosition(target.id)).length} enemies share the target position — Blast and suppression can exploit the cluster.`:'Target position is not clustered.'}</div>`
  }else $('combatPreview').textContent='NPC turn resolving…';

  let ab=[];
  if(pcSlot&&T&&actor){
    if(T.actorId==='pc'){
      ab.push(`<button class="btn primary" id="cAttack" ${T.actionUsed?'disabled':''}>Attack</button>`);
      if(hasQuality(actorWeapon(actor),'autoFire'))ab.push(`<button class="btn ${C.autoFireMode?'gold':''}" id="cAutoFire">Auto-Fire: ${C.autoFireMode?'ON':'OFF'}</button>`);
      if(talentRank('Precise Aim'))ab.push(`<button class="btn" id="cPrecise" ${T.actionUsed?'disabled':''}>Precise Aim Attack</button>`);
      if(S.forceOwned.Move.has('m-basic')&&forceAvailable()>0)ab.push(`<button class="btn" id="cMoveObj" ${T.actionUsed?'disabled':''}>Move Object</button>`);
      if(S.forceOwned.Move.has('m-hurl')&&forceAvailable()>0)ab.push(`<button class="btn" id="cHurl" ${T.actionUsed?'disabled':''}>Move: Hurl</button>`);
      if(S.forceOwned.Enhance.has('e-leap')&&forceAvailable()>0){ab.push(`<button class="btn" id="cLeapIn">Force Leap Toward</button>`);ab.push(`<button class="btn" id="cLeapOut">Force Leap Away</button>`)}
      if(S.forceOwned.Sense.has('sn-basic')&&forceAvailable()>0)ab.push(`<button class="btn" id="cSenseScan" ${T.actionUsed?'disabled':''}>Sense</button>`);
      if(S.forceOwned.Sense.has('sn-def')&&S.forceRating>0)ab.push(`<button class="btn" id="cSense">${S.forceCommitted.sense?'Uncommit':'Commit'} Sense Defense</button>`);
      if(S.forceOwned.Influence.has('i-basic')&&forceAvailable()>0)ab.push(`<button class="btn" id="cInfluence" ${T.actionUsed?'disabled':''}>Influence</button>`);
      ab.push(`<button class="btn" id="cUnarmed" ${T.actionUsed?'disabled':''}>Unarmed Strike</button>`);
      if(hasTalent('Far Strike')&&forceAvailable()>0)ab.push(`<button class="btn" id="cFarStrike" ${T.actionUsed?'disabled':''}>Far Strike</button>`);
      if(hasTalent('Saber Throw')&&effectiveWeapon(S.weapon)?.skill==='Lightsaber'&&forceAvailable()>0)ab.push(`<button class="btn" id="cSaberThrow" ${T.actionUsed?'disabled':''}>Saber Throw</button>`);
      if(hasTalent('Headbutt')&&!C.headbuttUsed)ab.push(`<button class="btn" id="cHeadbutt">Headbutt</button>`);
      if(hasTalent('Hard Headed')&&(actorState('pc').conditions.staggered||actorState('pc').conditions.disoriented))ab.push(`<button class="btn" id="cHardHeaded">Hard Headed</button>`);
      if(hasTalent('Inner Peace')&&!C.innerPeaceUsed&&S.destiny.dark>0)ab.push(`<button class="btn" id="cInnerPeace">Inner Peace</button>`);
      if(hasTalent('Heroic Fortitude')&&!C.heroicFortitude&&S.destiny.light>0)ab.push(`<button class="btn" id="cHeroic">Heroic Fortitude</button>`);
      if(hasTalent('Power From Pain')&&!S.sessionUsed.powerFromPain&&actorState('pc').criticals.length&&S.destiny.light>0)ab.push(`<button class="btn" id="cPowerPain">Power From Pain</button>`);
      if(hasTalent('Improved Toughened')&&!S.sessionUsed.improvedToughened&&S.wounds>0)ab.push(`<button class="btn" id="cImpTough">Improved Toughened</button>`);
      if(hasTalent('Indomitable Will')){
        if(C.indomitableCommitted)ab.push(`<button class="btn good" id="cReleaseWill">Release Indomitable (${C.indomitableCommitted})</button>`);
        else if(!C.indomitableUsed&&forceAvailable()>0)ab.push(`<button class="btn" id="cIndomitable">Indomitable Will</button>`)
      }
    }else{
      ab.push(`<button class="btn primary" id="cCrew" ${T.actionUsed?'disabled':''}>${actor.name}: Attack</button>`);
      if(crewProgress(actor.id).role==='support')ab.push(`<button class="btn" id="cCrewSupport" ${T.actionUsed?'disabled':''}>${actor.name}: Support Ally</button>`)
    }
    if(canOverwatch(actor)){
      ab.push(`<button class="btn" id="cOverwatch" ${T.actionUsed?'disabled':''}>Overwatch</button>`);
      ab.push(`<button class="btn" id="cSuppress" ${T.actionUsed?'disabled':''}>Suppress Position</button>`)
    }
    if((S.ordnance?.frag||0)>0)ab.push(`<button class="btn" id="cGrenFrag" ${T.actionUsed?'disabled':''}>Frag ×${S.ordnance.frag}</button>`);
    if((S.ordnance?.stun||0)>0)ab.push(`<button class="btn" id="cGrenStun" ${T.actionUsed?'disabled':''}>Stun Grenade ×${S.ordnance.stun}</button>`);
    if((S.ordnance?.miniThermal||0)>0)ab.push(`<button class="btn bad" id="cGrenThermal" ${T.actionUsed?'disabled':''}>Mini Thermal ×${S.ordnance.miniThermal}</button>`);
    ab.push(`<button class="btn good" id="cEnd" ${C.pendingSpend?'disabled':''}>End Turn</button>`)
  }
  $('combatButtons').classList.add('combat-actions');$('combatButtons').innerHTML=ab.join('');
  if($('cAttack'))$('cAttack').onclick=()=>pcAttack('normal');if($('cUnarmed'))$('cUnarmed').onclick=unarmedAttack;if($('cFarStrike'))$('cFarStrike').onclick=farStrikeTalent;if($('cSaberThrow'))$('cSaberThrow').onclick=saberThrowTalent;if($('cHeadbutt'))$('cHeadbutt').onclick=headbuttTalent;if($('cHardHeaded'))$('cHardHeaded').onclick=hardHeadedTalent;if($('cInnerPeace'))$('cInnerPeace').onclick=innerPeaceTalent;if($('cHeroic'))$('cHeroic').onclick=heroicFortitudeTalent;if($('cPowerPain'))$('cPowerPain').onclick=powerFromPainTalent;if($('cImpTough'))$('cImpTough').onclick=improvedToughenedTalent;if($('cIndomitable'))$('cIndomitable').onclick=indomitableWillTalent;if($('cReleaseWill'))$('cReleaseWill').onclick=releaseIndomitableWill;if($('cOverwatch'))$('cOverwatch').onclick=setOverwatch;if($('cSuppress'))$('cSuppress').onclick=suppressiveFire;if($('cGrenFrag'))$('cGrenFrag').onclick=()=>throwGrenade('frag');if($('cGrenStun'))$('cGrenStun').onclick=()=>throwGrenade('stun');if($('cGrenThermal'))$('cGrenThermal').onclick=()=>throwGrenade('miniThermal');if($('cAutoFire'))$('cAutoFire').onclick=()=>{S.combat.autoFireMode=!S.combat.autoFireMode;renderCombat()};if($('cPrecise'))$('cPrecise').onclick=()=>pcAttack('precise');if($('cCrew'))$('cCrew').onclick=crewAttack;if($('cCrewSupport'))$('cCrewSupport').onclick=crewSupportAction;if($('cMoveObj'))$('cMoveObj').onclick=forceMoveObject;if($('cHurl'))$('cHurl').onclick=forceHurl;if($('cLeapIn'))$('cLeapIn').onclick=()=>forceLeap(-1);if($('cLeapOut'))$('cLeapOut').onclick=()=>forceLeap(1);if($('cSenseScan'))$('cSenseScan').onclick=forceSenseEncounter;if($('cInfluence'))$('cInfluence').onclick=forceInfluenceCombat;if($('cSense'))$('cSense').onclick=commitSense;if($('cEnd'))$('cEnd').onclick=endTurn;

  renderBattlefield();
  renderCombatDestiny();let chint=combatTutorialHint();$('combatHint').classList.toggle('hidden',!chint);$('combatHint').textContent=chint;renderSpendPanel();$('criticalPanel').innerHTML=`<b>Party Critical Injuries</b><div class="small" style="margin-top:5px">${squadActors().map(a=>{let cs=actorState(a.id).criticals;return `<b>${a.name}:</b> ${cs.length?cs.map(c=>`${c.roll} ${c.name} (${c.sev})${criticalExtra(c)}`).join(' · '):'None'}`}).join('<br>')}</div>`;
  $('combatLog').innerHTML=C.log.map(x=>`<div>${x}</div>`).join('');safeAutosave()
}

/* Phase 18: application render loop, visual settings, shortcuts and startup. */
function renderAll(){ensurePhase15State();ensurePhase16State();S.name=$('name')?.value?.trim()||S.name;renderHud();renderGuide();renderIdentity();renderCareer();renderSkills();renderChars();renderTalents();renderForce();renderFramework();renderEquipment();renderCrewManagement();renderShip();renderRecovery();renderDatabase();renderRulesAudit();renderReview();renderLogs();if(S.finalized)renderAdventure();safeAutosave()}
window.addEventListener('error',e=>showRuntimeError(`${e.message}${e.lineno?` · line ${e.lineno}`:''}`));
window.addEventListener('unhandledrejection',e=>showRuntimeError(`Unhandled promise rejection: ${e.reason?.message||e.reason}`));
function init(){ensurePhase9State();ensurePhase12State();ensurePhase13State();ensurePhase14State();ensurePhase15State();ensurePhase16State();ensureCrewState();S.universalSpecs=S.universalSpecs||[];S.universalTalents=S.universalTalents||{'Force Sensitive Exile':new Set(),'Force-Sensitive Emergent':new Set()};S.universalView=S.universalView||'Force Sensitive Exile';S.morality=Number.isFinite(S.morality)?S.morality:50;$('species').innerHTML=Object.entries(SPECIES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');$('careerSelect').innerHTML=Object.keys(CAREERS).map(x=>`<option>${x}</option>`).join('');$('species').value=S.species;$('careerSelect').value=S.career;let specs=Object.keys(CAREERS[S.career].specs);$('specSelect').innerHTML=specs.map(x=>`<option>${x}</option>`).join('');$('specSelect').value=S.spec;let sp=SPECIES[S.species];S.base={...sp.c};S.chars={...sp.c};S.skills={...(sp.free||{})};S.xpStart=sp.xp;renderFramework();renderAll()}
document.querySelectorAll('#nav button[data-tab]').forEach(b=>b.onclick=()=>{if(b.disabled)return;renderNavTab(b.dataset.tab)});$('species').onchange=()=>selectSpecies();$('careerSelect').onchange=()=>selectCareer();$('specSelect').onchange=selectSpec;$('name').oninput=()=>{S.name=$('name').value;renderReview()};document.querySelectorAll('[data-power-tab]').forEach(b=>b.onclick=()=>{S.forceTab=b.dataset.powerTab;renderForce()});$('forceRoll').onclick=()=>{let fr=rollForce(forceAvailable());$('forceTest').textContent=fr.faces.length?`${fr.faces.join(' ')} — Light ${fr.light}, Dark ${fr.dark}`:'No uncommitted Force dice.'};$('universalSelect').onchange=()=>{S.universalView=$('universalSelect').value;renderForce()};
$('universalTreeSelect').onchange=()=>{S.universalView=$('universalTreeSelect').value;$('universalSelect').value=S.universalView;renderForce()};
$('buyUniversal').onclick=buyUniversalSpec;
$('resolveMorality').onclick=resolveMoralitySession;$('destinyAlly').onclick=()=>reserveLightDestiny('allyUpgrade');$('destinyNpc').onclick=()=>reserveLightDestiny('npcDifficulty');$('destinyFact').onclick=spendNarrativeDestiny;$('destinyCancel').onclick=cancelQueuedDestiny;$('gmDestinyMode').onchange=()=>{S.gmDestinyMode=$('gmDestinyMode').value;renderFramework()};$('framework').onchange=()=>{S.framework=$('framework').value;renderFramework();renderReview()};$('frameworkType').onchange=()=>{S.frameworkType=$('frameworkType').value;renderReview()};$('frameworkValue').oninput=()=>{S.frameworkValue=Number($('frameworkValue').value)||0};$('finalize').onclick=finalize;$('save').onclick=save;$('load').onclick=load;$('export').onclick=exportJSON;$('import').onclick=()=>$('importSaveFile').click();$('reset').onclick=reset;
$('continueGame').onclick=()=>renderNavTab(recommendedTab());$('difficultySelect').onchange=()=>{S.settings.difficulty=$('difficultySelect').value;renderAll()};$('tutorialSelect').onchange=()=>{S.settings.tutorial=$('tutorialSelect').value==='on';renderAll()};$('autosaveSelect').onchange=()=>{S.settings.autosave=$('autosaveSelect').value==='on';renderAll()};$('uiScaleSelect').onchange=()=>{S.settings.uiScale=$('uiScaleSelect').value;applyVisualSettings();safeAutosave()};$('motionSelect').onchange=()=>{S.settings.reducedMotion=$('motionSelect').value==='off';applyVisualSettings();safeAutosave()};
$('guideSave').onclick=save;$('guideLoad').onclick=load;$('guideExport').onclick=exportJSON;$('guideImport').onclick=()=>$('importSaveFile').click();$('guideNewGame').onclick=newGame;$('runDiagnostics').onclick=runDiagnostics;$('importSaveFile').onchange=e=>{importSaveFile(e.target.files?.[0]);e.target.value=''};$('shopFilter').onchange=renderEquipment;if($('shopSearch'))$('shopSearch').oninput=renderEquipment;$('craftTemplate').onchange=updateCraftPreview;$('craftBuyMaterials').onclick=craftMaterials;$('craftBuild').onclick=craftBuild;$('repairEquipped').onclick=repairEquippedItem;$('dbCategory').onchange=renderDatabase;$('dbImplementation').onchange=renderDatabase;$('dbSearch').oninput=renderDatabase;$('auditFilter').onchange=renderRulesAudit;$('auditSearch').oninput=renderRulesAudit;$('healerSelect').onchange=updateRecoveryPreview;$('patientSelect').onchange=updateRecoveryPreview;$('recoveryAction').onchange=updateRecoveryPreview;$('criticalSelect').onchange=updateRecoveryPreview;$('performRecovery').onclick=performRecovery;$('newDay').onclick=startNewDay;$('advDestinyAlly').onclick=()=>reserveLightDestiny('allyUpgrade');$('advDestinyNpc').onclick=()=>reserveLightDestiny('npcDifficulty');$('target').onchange=renderCombat;
window.addEventListener('keydown',e=>{
  let tag=(e.target?.tagName||'').toLowerCase();if(['input','select','textarea'].includes(tag)||e.ctrlKey||e.metaKey||e.altKey)return;
  if(document.body.classList.contains('world-play94'))return;
  let map={g:'guide',a:'adventure',e:'equipment',c:'crewmgmt',r:'recovery',h:'ship',t:'talents',f:'force',o:'gm',u:'rulesaudit'};
  let tab=map[e.key.toLowerCase()];if(!tab)return;
  let button=document.querySelector(`#nav button[data-tab="${tab}"]`);if(button?.disabled)return;
  e.preventDefault();renderNavTab(tab)
});

/* =========================
   PHASES 41–43 MEGA UPDATE
   Droid/crafting systems · adversary encounter builder · campaign frameworks
   ========================= */

/* Phase 41: source-grounded Special Modifications crafting templates. */
Object.assign(CRAFT_TEMPLATES,{
  craftFist:{id:'craftFist',category:'weapon',name:'Fist Weapon',materialPrice:10,rarity:0,diff:2,time:'4 hours',timeHours:4,itemId:'craftFist',desc:'Special Modifications brawl/melee template.'},
  craftBlunt:{id:'craftBlunt',category:'weapon',name:'Blunt Weapon',materialPrice:5,rarity:0,diff:1,time:'6 hours',timeHours:6,itemId:'craftBlunt',desc:'Special Modifications brawl/melee template.'},
  craftShield:{id:'craftShield',category:'weapon',name:'Shield',materialPrice:10,rarity:0,diff:2,time:'8 hours',timeHours:8,itemId:'craftShield',desc:'Special Modifications brawl/melee template.'},
  craftBlade:{id:'craftBlade',category:'weapon',name:'Bladed Weapon',materialPrice:10,rarity:0,diff:2,time:'16 hours',timeHours:16,itemId:'craftBlade',desc:'Special Modifications brawl/melee template.'},
  craftVibro:{id:'craftVibro',category:'weapon',name:'Vibro-weapon',materialPrice:200,rarity:3,diff:3,time:'24 hours',timeHours:24,itemId:'craftVibro',desc:'Special Modifications brawl/melee template.'},
  craftPowered:{id:'craftPowered',category:'weapon',name:'Powered Melee Weapon',materialPrice:400,rarity:4,diff:4,time:'48 hours',timeHours:48,itemId:'craftPowered',desc:'Special Modifications brawl/melee template.'},
  craftSimpleProjectile:{id:'craftSimpleProjectile',category:'weapon',name:'Simple Projectile Weapon',materialPrice:10,rarity:0,diff:2,time:'4 hours',timeHours:4,itemId:'craftSimpleProjectile',desc:'Special Modifications ranged template.'},
  craftSlugPistol:{id:'craftSlugPistol',category:'weapon',name:'Solid Projectile Pistol',materialPrice:50,rarity:2,diff:2,time:'8 hours',timeHours:8,itemId:'craftSlugPistol',desc:'Special Modifications ranged template.'},
  craftSlugRifle:{id:'craftSlugRifle',category:'weapon',name:'Solid Projectile Rifle',materialPrice:125,rarity:2,diff:3,time:'8 hours',timeHours:8,itemId:'craftSlugRifle',desc:'Special Modifications ranged template.'},
  craftEnergyPistol:{id:'craftEnergyPistol',category:'weapon',name:'Energy Pistol',materialPrice:200,rarity:3,diff:3,time:'12 hours',timeHours:12,itemId:'craftEnergyPistol',desc:'Special Modifications ranged template.'},
  craftEnergyRifle:{id:'craftEnergyRifle',category:'weapon',name:'Energy Rifle',materialPrice:450,rarity:4,diff:3,time:'16 hours',timeHours:16,itemId:'craftEnergyRifle',desc:'Special Modifications ranged template.'},
  craftHeavyEnergy:{id:'craftHeavyEnergy',category:'weapon',name:'Heavy Energy Rifle',materialPrice:1000,rarity:6,diff:4,time:'24 hours',timeHours:24,itemId:'craftHeavyEnergy',desc:'Special Modifications ranged template; Restricted materials.'},
  craftMissile:{id:'craftMissile',category:'weapon',name:'Missile',materialPrice:100,rarity:3,diff:3,time:'4 hours',timeHours:4,itemId:'craftMissile',desc:'Special Modifications missile template.'},
  craftGrenade:{id:'craftGrenade',category:'weapon',name:'Grenade',materialPrice:35,rarity:4,diff:3,time:'2 hours',timeHours:2,itemId:'craftGrenade',desc:'Special Modifications grenade template.'},
  craftMine:{id:'craftMine',category:'weapon',name:'Mine',materialPrice:425,rarity:5,diff:3,time:'4 hours',timeHours:4,itemId:'craftMine',desc:'Special Modifications mine template; Restricted materials.'},
  gadgetSimple:{id:'gadgetSimple',category:'gadget',name:'Simple Tool',materialPrice:50,rarity:1,diff:1,time:'2 hours',timeHours:2,desc:'Choose a General skill; counts as the right tool for the job when appropriate.'},
  gadgetSpecialist:{id:'gadgetSpecialist',category:'gadget',name:'Specialist Tool',materialPrice:400,rarity:4,diff:2,time:'10 hours',timeHours:10,desc:'Choose a General skill; grants an automatic Success on checks using that skill.'},
  gadgetPrecision:{id:'gadgetPrecision',category:'gadget',name:'Precision Instrument',materialPrice:150,rarity:3,diff:3,time:'16 hours',timeHours:16,desc:'Choose a General skill; removes two Setback dice from checks using that skill.'},
  droidMonotask:{id:'droidMonotask',category:'droid',name:'Monotask Chassis',materialPrice:600,rarity:2,diff:2,time:'24 hours',timeHours:24,chassis:'monotask',desc:'Special Modifications droid chassis template.'},
  droidLabor:{id:'droidLabor',category:'droid',name:'Labor Chassis',materialPrice:3500,rarity:3,diff:2,time:'48 hours',timeHours:48,chassis:'labor',desc:'Special Modifications droid chassis template.'},
  droidCombat:{id:'droidCombat',category:'droid',name:'Combat Chassis',materialPrice:3250,rarity:4,diff:3,time:'48 hours',timeHours:48,chassis:'combat',desc:'Special Modifications droid chassis template; Restricted materials.'},
  droidSpecialist:{id:'droidSpecialist',category:'droid',name:'Specialist Chassis',materialPrice:4500,rarity:3,diff:4,time:'56 hours',timeHours:56,chassis:'specialist',desc:'Special Modifications droid chassis template.'},
  droidAdvanced:{id:'droidAdvanced',category:'droid',name:'Advanced Combat Chassis',materialPrice:32500,rarity:7,diff:5,time:'240 hours',timeHours:240,chassis:'advanced',desc:'Special Modifications droid chassis template; Restricted materials.'}
});

const PH43_CRAFTED_WEAPONS={
  craftFist:{id:'craftFist',type:'weapon',name:'Crafted Fist Weapon',skill:'Brawl',damage:1,addBrawn:true,crit:4,range:'Engaged',enc:1,hp:0,price:0,rarity:0,qualities:{disorient:3},source:'Special Modifications · Crafting pp.76–77'},
  craftBlunt:{id:'craftBlunt',type:'weapon',name:'Crafted Blunt Weapon',skill:'Melee',damage:2,addBrawn:true,crit:5,range:'Engaged',enc:3,hp:1,price:0,rarity:0,qualities:{disorient:2},source:'Special Modifications · Crafting pp.76–77'},
  craftShield:{id:'craftShield',type:'weapon',name:'Crafted Shield',skill:'Melee',damage:0,addBrawn:true,crit:5,range:'Engaged',enc:1,hp:4,price:0,rarity:0,qualities:{defensive:1},source:'Special Modifications · Crafting pp.76–77'},
  craftBlade:{id:'craftBlade',type:'weapon',name:'Crafted Bladed Weapon',skill:'Melee',damage:1,addBrawn:true,crit:3,range:'Engaged',enc:2,hp:1,price:0,rarity:0,qualities:{},source:'Special Modifications · Crafting pp.76–77'},
  craftVibro:{id:'craftVibro',type:'weapon',name:'Crafted Vibro-weapon',skill:'Melee',damage:1,addBrawn:true,crit:2,range:'Engaged',enc:2,hp:3,price:0,rarity:0,qualities:{pierce:2,vicious:1},source:'Special Modifications · Crafting pp.76–77'},
  craftPowered:{id:'craftPowered',type:'weapon',name:'Crafted Powered Melee Weapon',skill:'Melee',damage:2,addBrawn:true,crit:3,range:'Engaged',enc:3,hp:5,price:0,rarity:0,qualities:{stun:3},source:'Special Modifications · Crafting pp.76–77'},
  craftSimpleProjectile:{id:'craftSimpleProjectile',type:'weapon',name:'Crafted Simple Projectile Weapon',skill:'Ranged (Light)',damage:4,crit:5,range:'Short',enc:3,hp:0,price:0,rarity:0,qualities:{limitedAmmo:1},source:'Special Modifications · Crafting pp.78–79'},
  craftSlugPistol:{id:'craftSlugPistol',type:'weapon',name:'Crafted Solid Projectile Pistol',skill:'Ranged (Light)',damage:4,crit:5,range:'Short',enc:1,hp:0,price:0,rarity:0,qualities:{},source:'Special Modifications · Crafting pp.78–79'},
  craftSlugRifle:{id:'craftSlugRifle',type:'weapon',name:'Crafted Solid Projectile Rifle',skill:'Ranged (Heavy)',damage:7,crit:5,range:'Medium',enc:5,hp:1,price:0,rarity:0,qualities:{cumbersome:2},source:'Special Modifications · Crafting pp.78–79'},
  craftEnergyPistol:{id:'craftEnergyPistol',type:'weapon',name:'Crafted Energy Pistol',skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',enc:1,hp:3,price:0,rarity:0,qualities:{},source:'Special Modifications · Crafting pp.78–79'},
  craftEnergyRifle:{id:'craftEnergyRifle',type:'weapon',name:'Crafted Energy Rifle',skill:'Ranged (Heavy)',damage:9,crit:3,range:'Long',enc:4,hp:4,price:0,rarity:0,qualities:{},source:'Special Modifications · Crafting pp.78–79'},
  craftHeavyEnergy:{id:'craftHeavyEnergy',type:'weapon',name:'Crafted Heavy Energy Rifle',skill:'Gunnery',damage:10,crit:3,range:'Long',enc:6,hp:4,price:0,rarity:0,qualities:{cumbersome:3},source:'Special Modifications · Crafting pp.78–79'},
  craftMissile:{id:'craftMissile',type:'weapon',name:'Crafted Missile',skill:'Gunnery',damage:20,crit:2,range:'Extreme',enc:7,hp:4,price:0,rarity:0,qualities:{blast:10,breach:1,cumbersome:3,guided:3,prepare:1,limitedAmmo:1},source:'Special Modifications · Crafting pp.78–79'},
  craftGrenade:{id:'craftGrenade',type:'weapon',name:'Crafted Grenade',skill:'Ranged (Light)',damage:8,crit:4,range:'Short',enc:1,hp:0,price:0,rarity:0,qualities:{blast:6,limitedAmmo:1},source:'Special Modifications · Crafting pp.78–79'},
  craftMine:{id:'craftMine',type:'weapon',name:'Crafted Mine',skill:'Mechanics',damage:12,crit:3,range:'Engaged',enc:3,hp:0,price:0,rarity:0,qualities:{blast:4,limitedAmmo:1},source:'Special Modifications · Crafting pp.78–79'}
};
Object.assign(WEAPONS,PH43_CRAFTED_WEAPONS);Object.assign(ITEMS,PH43_CRAFTED_WEAPONS);

const DROID_CHASSIS={
  monotask:{name:'Monotask Chassis',type:'minion',c:{Brawn:1,Agility:1,Intellect:1,Cunning:1,Willpower:1,Presence:1},soak:2,wt:3,st:null,def:0,sil:0},
  labor:{name:'Labor Chassis',type:'minion',c:{Brawn:3,Agility:1,Intellect:2,Cunning:1,Willpower:1,Presence:1},soak:4,wt:7,st:null,def:0,sil:1},
  combat:{name:'Combat Chassis',type:'minion',c:{Brawn:2,Agility:2,Intellect:1,Cunning:1,Willpower:1,Presence:1},soak:4,wt:4,st:null,def:0,sil:1},
  specialist:{name:'Specialist Chassis',type:'rival',c:{Brawn:1,Agility:1,Intellect:2,Cunning:2,Willpower:2,Presence:2},soak:3,wt:11,st:null,def:0,sil:1},
  advanced:{name:'Advanced Combat Chassis',type:'nemesis',c:{Brawn:4,Agility:3,Intellect:3,Cunning:3,Willpower:1,Presence:1},soak:7,wt:19,st:10,def:1,sil:1}
};
const DROID_DIRECTIVES={
  labor:{name:'Labor Directives',diff:1,timeHours:8,skills:{},pickGeneral:2,desc:'2 ranks in one General skill; on a minion chassis it becomes a group skill.'},
  combat:{name:'Combat Directives',diff:2,timeHours:16,skills:{},pickCombat:3,desc:'1 rank in three Combat skills; Body Guard 1.'},
  translation:{name:'Translation Directives',diff:3,timeHours:24,skills:{Charm:1},pickKnowledge:3,desc:'Three Knowledge skills + Charm 1; Convincing Demeanor 1 and Kill with Kindness 1.'},
  repair:{name:'Repair Directives',diff:3,timeHours:24,skills:{Computers:1,Mechanics:2},desc:'Computers 1, Mechanics 2; Gearhead 1 and Solid Repairs 1.'},
  navigation:{name:'Navigation Directives',diff:3,timeHours:72,skills:{Astrogation:2,Computers:1,'Piloting (Space)':1},desc:'Astrogation 2, Computers 1, Piloting (Space) 1; Galaxy Mapper 1 and Technical Aptitude 1.'},
  healing:{name:'Healing Directives',diff:4,timeHours:72,skills:{'Knowledge (Xenology)':1,Medicine:2},desc:'Xenology 1, Medicine 2; Bacta Specialist 1 and Surgeon 1.'},
  elimination:{name:'Elimination Directives',diff:5,timeHours:168,skills:{Cool:2,'Knowledge (Xenology)':1,Mechanics:2,Stealth:2},desc:'Advanced elimination package; non-Nemesis chassis becomes a Nemesis. Combat skills and Adversary/Lethal Blows are represented in combat metadata.'}
};
const GENERAL_SKILLS=Object.keys(SKILL_CHAR).filter(s=>!['Brawl','Melee','Lightsaber','Ranged (Light)','Ranged (Heavy)','Gunnery'].includes(s));
const COMBAT_SKILLS=['Brawl','Melee','Lightsaber','Ranged (Light)','Ranged (Heavy)','Gunnery'];
const KNOWLEDGE_SKILLS=Object.keys(SKILL_CHAR).filter(s=>s.startsWith('Knowledge ('));

/* Phase 42: playable adversary records for custom encounters. */
const PLAYABLE_ADVERSARIES={
  navyTrooper:{id:'navyTrooper',name:'Imperial Navy Trooper',type:'minion',c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},soak:3,perWt:5,def:0,groupSkills:['Perception','Ranged (Light)'],skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',aiRole:'rifle',source:'Allies and Adversaries · p.55'},
  navyGunner:{id:'navyGunner',name:'Imperial Navy Gunner',type:'minion',c:{Brawn:2,Agility:2,Intellect:2,Cunning:2,Willpower:2,Presence:2},soak:3,perWt:5,def:0,groupSkills:['Gunnery','Mechanics','Resilience'],skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',aiRole:'rifle',source:'Allies and Adversaries · p.55'},
  navyOfficer:{id:'navyOfficer',name:'Imperial Navy Officer',type:'rival',c:{Brawn:2,Agility:3,Intellect:2,Cunning:3,Willpower:2,Presence:2},soak:3,wt:11,def:0,adversary:1,skill:'Ranged (Light)',rank:2,vigilanceRank:2,coolRank:2,leadershipRank:2,damage:6,crit:3,range:'Medium',aiRole:'officer',source:'Allies and Adversaries · p.55'},
  informant:{id:'informant',name:'Military Informant',type:'rival',c:{Brawn:1,Agility:2,Intellect:2,Cunning:3,Willpower:3,Presence:2},soak:1,wt:11,def:0,skill:'Ranged (Light)',rank:1,vigilanceRank:1,coolRank:1,damage:5,crit:4,range:'Short',aiRole:'skirmisher',source:'Allies and Adversaries · p.58'},
  stormtrooper:{id:'stormtrooper',name:'Stormtrooper Squad',memberName:'Stormtrooper',type:'minion',c:{Brawn:3,Agility:3,Intellect:2,Cunning:2,Willpower:3,Presence:1},soak:5,perWt:5,def:0,groupSkills:['Athletics','Discipline','Melee','Ranged (Heavy)'],skill:'Ranged (Heavy)',damage:9,crit:3,range:'Long',aiRole:'rifle',grenades:{frag:2},source:'Allies and Adversaries · pp.60–61'},
  stormSergeant:{id:'stormSergeant',name:'Stormtrooper Sergeant',type:'rival',c:{Brawn:3,Agility:3,Intellect:2,Cunning:2,Willpower:3,Presence:1},soak:5,wt:15,def:0,adversary:1,skill:'Ranged (Heavy)',rank:2,vigilanceRank:2,coolRank:2,leadershipRank:3,damage:9,crit:3,range:'Long',aiRole:'officer',grenades:{frag:2},source:'Allies and Adversaries · p.61'},
  royalGuard:{id:'royalGuard',name:'Imperial Royal Guard',type:'nemesis',c:{Brawn:3,Agility:3,Intellect:3,Cunning:2,Willpower:2,Presence:2},soak:5,wt:16,st:12,def:1,adversary:2,skill:'Melee',rank:4,vigilanceRank:4,coolRank:3,damage:6,crit:2,range:'Engaged',aiRole:'melee',noRetreat:true,source:'Allies and Adversaries · p.56'}
};
Object.values(PLAYABLE_ADVERSARIES).forEach(p=>{
  if(!ADVERSARY_DB.some(x=>x.name===p.name))ADVERSARY_DB.push({name:p.name,type:p.type[0].toUpperCase()+p.type.slice(1),source:p.source,implementation:'Playable combat profile',summary:`Brawn ${p.c.Brawn} · Agility ${p.c.Agility} · Soak ${p.soak} · ${p.type==='minion'?`WT ${p.perWt} each`:`WT ${p.wt}`}${p.adversary?` · Adversary ${p.adversary}`:''} · ${p.skill} · Damage ${p.damage} · Crit ${p.crit} · ${p.range}.`});
});
[
 {name:'Interrogation Droid',type:'Rival',source:'Allies and Adversaries · p.57',summary:'Droid interrogator with Coercion, Medicine, Perception and Ranged (Light); built-in interrogation arm and hypodermic injectors.'},
 {name:'Planetary Governor',type:'Nemesis',source:'Allies and Adversaries · p.59',summary:'High-Presence political adversary built around Charm, Coercion, Deception, Negotiation and leadership talents.'},
 {name:'Scout Trooper',type:'Minion',source:'Allies and Adversaries · p.62',summary:'Stormtrooper scout variant with Athletics, Discipline, Melee, Ranged (Light), and Vigilance as group skills.'},
 {name:'Snowtrooper',type:'Minion',source:'Allies and Adversaries · p.61',summary:'Cold-weather stormtrooper variant with the standard Imperial minion chassis and environment-specific equipment.'}
].forEach(x=>{if(!ADVERSARY_DB.some(y=>y.name===x.name))ADVERSARY_DB.push(x)});

FRAME.Duty=['Combat Victory','Counter Intelligence','Intelligence','Internal Security','Political Support','Personnel','Recruiting','Resource Acquisition','Sabotage','Space Superiority','Support','Tech Procurement'];

RULE_AUDIT.unshift(
 {id:'campaign43',name:'Phase 43 campaign-framework integration',status:'adapted',source:'Force and Destiny Core pp.48–52; Onslaught at Arda I; The Enemy of my Enemy',detail:'Morality’s end-of-session d10 minus Conflict resolution and threshold display are source-grounded. Obligation and Duty session hooks use the supplied adventure examples; the single-PC trigger presentation, faction reputation tiers, ledger, and downtime jobs are explicit Sable Reach solo adaptations.'},
 {id:'adversaries42',name:'Phase 42 adversary encounter builder',status:'adapted',source:'Allies and Adversaries pp.55–62',detail:'Core characteristics, soak/wounds, group skills, Adversary ranks and principal weapons for the playable Imperial profiles are transcribed from the supplied source pages. Encounter assembly, enemy counts, tactical AI and XP payout are videogame adaptations.'},
 {id:'crafting41',name:'Phase 41 source crafting & droid construction',status:'verified',source:'Special Modifications pp.74–85',detail:'Weapon, gadget, chassis, directive material prices, rarity, construction difficulties, time, and base profiles come from the supplied crafting tables. Automated Advantage spending is conservative and labeled as a Sable Reach choice policy.'},
 {id:'droidOptions41',name:'Expanded droid design reference',status:'verified',source:'Memory Cores and Motivators pp.1–6',detail:'The project now surfaces custom droid construction and utility assignment alongside the supplement’s locomotion/hardware/programming model. Full starting-XP species customization remains a later dedicated character-creation pass.'}
);

function ensurePhase43State(){
  S.schemaVersion=52;
  S.crafting=S.crafting||{};S.crafting.materials=S.crafting.materials||{};S.crafting.crafted=S.crafting.crafted||{};S.crafting.mods=S.crafting.mods||{};S.crafting.gadgets=S.crafting.gadgets||[];S.crafting.pendingDroids=S.crafting.pendingDroids||[];
  S.droids=Array.isArray(S.droids)?S.droids:[];S.activeDroidId=S.activeDroidId||null;
  S.customEncounter=Array.isArray(S.customEncounter)?S.customEncounter:[];
  S.campaign=S.campaign||{};
  S.campaign.session={number:0,active:false,roll:null,triggered:false,note:'No campaign session started.',...(S.campaign.session||{})};
  S.campaign.contributionRank=Number.isFinite(S.campaign.contributionRank)?S.campaign.contributionRank:0;
  S.campaign.obligationStrainPenalty=Number.isFinite(S.campaign.obligationStrainPenalty)?S.campaign.obligationStrainPenalty:0;
  S.campaign.ledger=Array.isArray(S.campaign.ledger)?S.campaign.ledger:[];
  S.ep15=S.ep15||{};S.ep15.rep={Rebels:0,Hutts:0,Empire:0,Guild:0,Local:0,...(S.ep15.rep||{})};
}
const _p43Ensure16=ensurePhase16State;
ensurePhase16State=function(){_p43Ensure16();ensurePhase43State()};

function ledgerEntry(amount,label){ensurePhase43State();S.campaign.ledger.unshift({at:new Date().toISOString(),amount,label});S.campaign.ledger=S.campaign.ledger.slice(0,30)}

const _p43AttemptPurchase=attemptPurchase;
attemptPurchase=function(id){let before=S.credits;_p43AttemptPurchase(id);if(S.credits!==before)ledgerEntry(S.credits-before,`Purchased ${ITEMS[id]?.name||id}`)};
const _p43BuyOrdnance=buyOrdnance;
buyOrdnance=function(id){let before=S.credits;_p43BuyOrdnance(id);if(S.credits!==before)ledgerEntry(S.credits-before,`Ordnance: ${ORDNANCE_RESUPPLY[id]?.label||id}`)};
const _p43ShipPurchase=purchaseShipModel;
purchaseShipModel=function(id){let before=S.credits;_p43ShipPurchase(id);if(S.credits!==before)ledgerEntry(S.credits-before,`Ship acquisition: ${SHIP_MODELS[id]?.name||id}`)};

const _p43EffectiveWeapon=effectiveWeapon;
effectiveWeapon=function(id){let w=_p43EffectiveWeapon(id);if(!w)return w;let m=S.crafting?.mods?.[id];if(!m)return w;w={...w,qualities:{...(w.qualities||{})}};w.damage+=(m.damage||0);if(w.crit!=null)w.crit=Math.max(1,w.crit-(m.crit||0));w.enc=Math.max(0,(w.enc||0)-(m.enc||0));w.hp=(w.hp||0)+(m.hp||0);if(m.accurate)w.qualities.accurate=(w.qualities.accurate||0)+m.accurate;if(m.pierce)w.qualities.pierce=(w.qualities.pierce||0)+m.pierce;return w};

const _p43StrainThreshold=strainThreshold;
strainThreshold=function(){ensurePhase43State();return Math.max(1,_p43StrainThreshold()-(S.campaign.obligationStrainPenalty||0))};

function activeDroidActor(){ensurePhase43State();let d=S.droids.find(x=>x.id===S.activeDroidId&&x.status==='active');return d?{id:`utility-${d.id}`,name:d.name,c:d.c,sk:d.skills||{},droid:true}:null}
const _p43BestActor=bestActor;
bestActor=function(skill,ctx={}){let pool=actors().map(a=>actorPool(a,skill,ctx)),d=activeDroidActor();if(d)pool.push(actorPool(d,skill,ctx));return pool.sort((a,b)=>poolScore(b)-poolScore(a))[0]||_p43BestActor(skill,ctx)};

function craftFocusSelection(){return $('craftFocus')?.value||'balanced'}
function craftSkillSelection(){return $('craftSkill')?.value||'Mechanics'}
function sourceCraftTemplates(){return Object.values(CRAFT_TEMPLATES).filter(t=>['weapon','gadget','droid'].includes(t.category))}
function applyCraftAdvantage(id,t,r){
  let focus=craftFocusSelection(),m=S.crafting.mods[id]||(S.crafting.mods[id]={});
  if(t.category==='weapon'){
    if(focus==='lightweight'&&r.na>=1)m.enc=(m.enc||0)+1;
    else if(focus==='customizable'&&r.na>=2)m.hp=(m.hp||0)+1;
    else if(focus==='damage'&&r.na>=3)m.damage=(m.damage||0)+1;
    else if(focus==='accuracy'&&r.na>=4)m.accurate=(m.accurate||0)+1;
    else if(focus==='lethal'&&r.na>=4)m.crit=(m.crit||0)+1;
    else if(focus==='economy'&&r.na>=3){let refund=Math.floor(t.materialPrice/2);S.credits+=refund;ledgerEntry(refund,`Crafting material reclaimed: ${t.name}`)}
  }
  return m
}
function phase43CraftMaterials(){
  ensurePhase43State();let id=$('craftTemplate')?.value,t=CRAFT_TEMPLATES[id];if(!t)return;
  if(S.crafting.materials[id]){bLog('Materials already acquired for that project.');return}
  if(S.credits<t.materialPrice){bLog('Not enough credits for crafting materials.');return}
  let ap=acquisitionProfile(t.rarity),r=performBest(t.restricted?'Streetwise':'Negotiation',{diff:ap.diff,upgrade:ap.upgrade});if(!r.r.ok){bLog(`Could not acquire the materials for ${t.name}.`);return}
  S.credits-=t.materialPrice;ledgerEntry(-t.materialPrice,`Crafting materials: ${t.name}`);S.crafting.materials[id]=true;bLog(`Materials acquired for ${t.name} (${t.materialPrice} cr).`);renderAll()
}
function phase43CraftBuild(){
  ensurePhase43State();let id=$('craftTemplate')?.value,t=CRAFT_TEMPLATES[id];if(!t)return;if(!S.crafting.materials[id]){bLog('Acquire the materials first.');return}
  let q=actorPool(actorById('pc'),'Mechanics',{diff:t.diff,construct:true,commit:true}),r=rollNarr(q.p);S.crafting.materials[id]=false;
  if(!r.ok){bLog(`${t.name} construction fails; the materials are lost. ${rtxt(r)}`);renderAll();return}
  let hours=Math.max(1,(t.timeHours||1)-2*Math.max(0,r.ns));S.crafting.crafted[id]=(S.crafting.crafted[id]||0)+1;
  if(t.category==='weapon'){
    applyCraftAdvantage(id,t,r);if(!S.inventory.includes(t.itemId))S.inventory.push(t.itemId);
    bLog(`${t.name} completed in about ${hours} hour(s). ${rtxt(r)} ${craftFocusSelection()!=='balanced'?'Crafting focus applied where the rolled Advantage allowed.':''}`)
  }else if(t.category==='gadget'){
    let skill=craftSkillSelection(),effect=t.id==='gadgetSpecialist'?'success':t.id==='gadgetPrecision'?'setback':'tools';
    S.crafting.gadgets.push({id:`g-${Date.now()}-${Math.floor(Math.random()*9999)}`,name:t.name,skill,effect,enc:t.id==='gadgetSpecialist'?8:t.id==='gadgetPrecision'?5:4,source:'Special Modifications · p.84'});
    bLog(`${t.name} completed for ${skill} in about ${hours} hour(s). ${rtxt(r)}`)
  }else if(t.category==='droid'){
    let ch=DROID_CHASSIS[t.chassis],d={id:`d-${Date.now()}-${Math.floor(Math.random()*9999)}`,name:`Custom ${ch.name.replace(' Chassis','')} Droid`,chassis:t.chassis,status:'unprogrammed',c:{...ch.c},soak:ch.soak,wt:ch.wt,st:ch.st,def:ch.def,sil:ch.sil,type:ch.type,skills:{},groupSkills:[],source:'Special Modifications · Droid Crafting'};
    if(r.na>=1)d.wt+=1;if(r.na>=3)d.soak+=1;S.droids.push(d);S.crafting.pendingDroids.push(d.id);bLog(`${ch.name} constructed in about ${hours} hour(s). It still requires directive programming. ${rtxt(r)}`)
  }
  renderAll()
}
function selectedDroidForProgramming(){ensurePhase43State();return S.droids.find(d=>d.id===($('droidPending')?.value||S.crafting.pendingDroids[0]))}
function programCraftedDroid(){
  let d=selectedDroidForProgramming(),key=$('droidDirective')?.value,dir=DROID_DIRECTIVES[key];if(!d||!dir)return;
  let q=actorPool(actorById('pc'),'Computers',{diff:dir.diff,commit:true}),r=rollNarr(q.p);if(!r.ok){bLog(`${d.name} programming fails; the chassis remains intact for another attempt. ${rtxt(r)}`);return}
  d.directive=key;d.status='active';d.skills={...(dir.skills||{})};d.groupSkills=[];
  let chosen=craftSkillSelection();
  if(dir.pickGeneral){if(d.type==='minion')d.groupSkills.push(chosen);else d.skills[chosen]=dir.pickGeneral}
  if(dir.pickCombat){let picks=['Ranged (Heavy)','Ranged (Light)','Melee'];picks.forEach(s=>{if(d.type==='minion')d.groupSkills.push(s);else d.skills[s]=1})}
  if(dir.pickKnowledge){['Knowledge (Education)','Knowledge (Xenology)','Knowledge (Lore)'].forEach(s=>{if(d.type==='minion')d.groupSkills.push(s);else d.skills[s]=1})}
  if(key==='elimination'){
    d.type='nemesis';d.st=d.st||d.wt;['Ranged (Heavy)','Ranged (Light)','Melee'].forEach(s=>d.skills[s]=4);d.adversary=2;d.lethalBlows=3
  }
  S.crafting.pendingDroids=S.crafting.pendingDroids.filter(x=>x!==d.id);if(!S.activeDroidId)S.activeDroidId=d.id;
  let hours=Math.max(1,dir.timeHours-2*Math.max(0,r.ns));bLog(`${d.name} programmed with ${dir.name} in about ${hours} hour(s). ${rtxt(r)}`);renderAll()
}
function gadgetModsFor(skill){ensurePhase43State();let boost=0,setback=0,success=0;for(const g of S.crafting.gadgets){if(g.skill!==skill)continue;if(g.effect==='success')success++;if(g.effect==='setback')setback+=2;if(g.effect==='tools')boost++}return{boost,setback,success}}
const _p43ActorPool=actorPool;
actorPool=function(actor,skill,ctx={}){let q=_p43ActorPool(actor,skill,ctx);if(actor.id==='pc'){let g=gadgetModsFor(skill);q.p.boost=(q.p.boost||0)+g.boost;q.p.setback=Math.max(0,(q.p.setback||0)-g.setback);q.craftedAutoSuccess=g.success||0}return q};
const _p43PerformBest=performBest;
performBest=function(skill,ctx={}){let out=_p43PerformBest(skill,ctx);let g=out?.q?.craftedAutoSuccess||0;if(g&&out.r){out.r.ns+=g;out.r.ok=out.r.ns>0;if(S.last){S.last.r=out.r;S.last.text=rtxt(out.r)}}return out};

/* Phase 42 encounter builder. */
function customEnemyFromProfile(p,n=1,idx=0){
  if(p.type==='minion')return{id:`custom-${p.id}-${idx}`,name:p.name,memberName:p.memberName||p.name,type:'minion',members:n,initialMembers:n,perWt:p.perWt,w:0,wt:p.perWt*n,soak:p.soak,def:p.def||0,c:{...p.c},groupSkills:[...(p.groupSkills||[])],skill:p.skill,damage:p.damage,crit:p.crit,range:p.range,aiRole:p.aiRole||'rifle',grenades:{...(p.grenades||{})},droid:!!p.droid,moraleImmune:!!p.droid};
  return{id:`custom-${p.id}-${idx}`,name:n>1?`${p.name} ${idx+1}`:p.name,type:p.type,w:0,wt:p.wt,st:p.st,soak:p.soak,def:p.def||0,adversary:p.adversary||0,c:{...p.c},skill:p.skill,rank:p.rank||2,vigilanceRank:p.vigilanceRank||1,coolRank:p.coolRank||1,leadershipRank:p.leadershipRank||0,damage:p.damage,crit:p.crit,range:p.range,criticals:[],aiRole:p.aiRole||'skirmisher',grenades:{...(p.grenades||{})},noRetreat:!!p.noRetreat}
}
function addEncounterAdversary(){ensurePhase43State();let id=$('encounterAdversary')?.value,p=PLAYABLE_ADVERSARIES[id],count=Math.max(1,Math.min(6,Number($('encounterCount')?.value)||1));if(!p)return;S.customEncounter.push({id,count});renderEncounterBuilder()}
function clearEncounterBuilder(){S.customEncounter=[];renderEncounterBuilder()}
function startCustomEncounter(){
  ensurePhase43State();if(!S.customEncounter.length){bLog('Add at least one adversary to the encounter.');return}
  let enemies=[];S.customEncounter.forEach((e,ri)=>{let p=PLAYABLE_ADVERSARIES[e.id];if(!p)return;if(p.type==='minion')enemies.push(customEnemyFromProfile(p,e.count,ri));else for(let i=0;i<e.count;i++)enemies.push(customEnemyFromProfile(p,1,ri*10+i))});
  let prepared=confirm('Were you prepared for this encounter? OK = Cool. Cancel = Vigilance.'),slots=buildInitiative(enemies,prepared);
  S.combat={kind:'customEncounter',enemies,round:1,slots,slotIndex:0,actedPC:[],actedNPC:[],range:2,turn:null,cover:false,defUpgrade:0,log:[],prepared,critPending:null,pendingSpend:null,nextAllyBoost:0,nextAllyUpgrade:0,tempDefense:0,outOfAmmo:{},setTriggerUsed:{},overwatch:{},positions:{},lastAIIntent:'Custom encounter AI is evaluating positions and roles.'};
  initializeTacticalState(S.combat);cLog('Custom adversary encounter launched from the Phase 42 database builder.');document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));$('combat').classList.remove('hidden');beginSlot()
}
function renderEncounterBuilder(){
  let box=$('encounterBuilder');if(!box)return;ensurePhase43State();
  box.innerHTML=`<div class="row"><div><b>Encounter Builder</b><div class="small">Build a tactical fight from source-grounded adversary profiles. Minion count forms one group; rivals and nemeses are added individually.</div></div><span class="tag">PHASE 42</span></div>
  <div class="grid g3" style="margin-top:10px"><label>Adversary<select id="encounterAdversary">${Object.values(PLAYABLE_ADVERSARIES).map(p=>`<option value="${p.id}">${p.name} — ${p.type}</option>`).join('')}</select></label><label>Count<input id="encounterCount" type="number" min="1" max="6" value="1"></label><div style="align-self:end"><button id="encounterAdd" class="btn">Add to encounter</button></div></div>
  <div class="itemgrid" style="margin-top:10px">${S.customEncounter.map((e,i)=>{let p=PLAYABLE_ADVERSARIES[e.id];return`<div class="item"><b>${p.name}</b><div class="small">${p.type} · count ${e.count} · ${p.source}</div><button class="btn danger" data-enc-remove="${i}">Remove</button></div>`}).join('')||'<div class="small">No adversaries selected.</div>'}</div>
  <div class="pills" style="margin-top:10px"><button id="encounterStart" class="btn primary" ${S.customEncounter.length?'':'disabled'}>Start Encounter</button><button id="encounterClear" class="btn danger" ${S.customEncounter.length?'':'disabled'}>Clear</button></div>`;
  $('encounterAdd').onclick=addEncounterAdversary;$('encounterStart').onclick=startCustomEncounter;$('encounterClear').onclick=clearEncounterBuilder;document.querySelectorAll('[data-enc-remove]').forEach(b=>b.onclick=()=>{S.customEncounter.splice(Number(b.dataset.encRemove),1);renderEncounterBuilder()})
}
const _p43CombatWin=combatWin;
combatWin=function(){
  if(S.combat?.kind!=='customEncounter')return _p43CombatWin();
  let enemies=S.combat.enemies||[],xp=enemies.reduce((n,e)=>n+(e.type==='minion'?Math.max(1,e.initialMembers||1)*2:e.type==='nemesis'?10:6),0);recoverBalance();S.combat=null;S.medical.encounter++;S.earnedXp+=xp;
  for(const id of ['pc',...S.crew]){let c=actorState(id).conditions;c.disoriented=0;c.immobilized=0;c.staggered=0;c.suppressed=0;c.cover=false;c.nextSetback=0;c.nextUpgrade=0;c.nextDifficulty=0}
  gLog(`Custom adversary encounter won. +${xp} XP (Sable Reach encounter reward).`);$('combat').classList.add('hidden');$('database').classList.remove('hidden');renderAll()
};

/* Phase 43 campaign framework + downtime. */
function repTier(v){return v>=20?'Allied':v>=10?'Trusted':v>=5?'Friendly':v<=-20?'Hunted':v<=-10?'Hostile':v<=-5?'Wary':'Neutral'}
function adjustFactionRep(f,delta){ensurePhase43State();S.ep15.rep[f]=(S.ep15.rep[f]||0)+delta;gLog(`${f} reputation ${delta>=0?'+':''}${delta}.`);renderFramework()}
const _p43EpRep=epRep;
epRep=function(faction,amount,reason=''){_p43EpRep(faction,amount,reason);ensurePhase43State()};
function dutyAward(n){ensurePhase43State();if(S.framework!=='Duty')return;S.frameworkValue=Math.max(0,S.frameworkValue+n);while(S.frameworkValue>=100){S.frameworkValue-=100;S.campaign.contributionRank++;bLog(`Duty reaches 100: Contribution Rank increases to ${S.campaign.contributionRank}.`)}$('frameworkValue').value=S.frameworkValue;renderFramework()}
function obligationAdjust(n){if(S.framework!=='Obligation')return;S.frameworkValue=Math.max(0,Math.min(100,S.frameworkValue+n));$('frameworkValue').value=S.frameworkValue;renderFramework()}
function startCampaignSession(){
  ensurePhase43State();let ses=S.campaign.session;ses.number++;ses.active=true;ses.roll=1+Math.floor(Math.random()*100);ses.triggered=false;S.campaign.obligationStrainPenalty=0;
  if(S.framework==='Obligation'){
    ses.triggered=ses.roll<=S.frameworkValue;if(ses.triggered){S.campaign.obligationStrainPenalty=2;ses.note=`Obligation triggered (${S.frameworkType}). Solo adaptation: the PC suffers −2 strain threshold this session, representing the group −1 plus the triggering character’s additional −1.`}else ses.note=`Obligation did not trigger (${ses.roll} > ${S.frameworkValue}).`;
  }else if(S.framework==='Duty'){
    ses.triggered=ses.roll<=S.frameworkValue;ses.note=ses.triggered?`Duty triggered: ${S.frameworkType}. The source adventures use triggered Duty to introduce matching objectives and bonus Duty opportunities; Sable Reach leaves the exact mission consequence to the current scene.`:`Duty did not trigger (${ses.roll} > ${S.frameworkValue}).`;
  }else{
    ses.triggered=true;ses.note=`Morality focus roll ${ses.roll}. Bring ${S.frameworkType} into the session when a meaningful choice appears; track Conflict and resolve Morality at session end with d10 − Conflict.`;
  }
  bLog(`Campaign session ${ses.number} started. ${ses.note}`);renderAll()
}
function endCampaignSession(){ensurePhase43State();if(S.framework==='Morality'){resolveMoralitySession();return}S.campaign.session.active=false;S.campaign.obligationStrainPenalty=0;bLog(`Campaign session ${S.campaign.session.number} ended.`);renderAll()}
const _p43ResolveMorality=resolveMoralitySession;
resolveMoralitySession=function(){_p43ResolveMorality();ensurePhase43State();S.campaign.session.active=false;S.campaign.obligationStrainPenalty=0};
function downtimeJob(){let skill=$('downtimeSkill')?.value||'Mechanics',r=performBest(skill,{diff:2});if(r.r.ok){let pay=75+25*Math.max(0,r.r.ns)+10*Math.max(0,r.r.na);S.credits+=pay;ledgerEntry(pay,`Downtime job — ${skill}`);gLog(`Downtime job succeeds: +${pay} credits.`)}else gLog(`Downtime job fails to pay out. ${rtxt(r.r)}`);renderAll()}
function campaignRest(){startNewDay();ensurePhase43State();ledgerEntry(0,'Downtime rest / new day');renderFramework()}

function injectPhase43UI(){
  if(!$('campaignSystems43')){
    let c=document.createElement('div');c.id='campaignSystems43';c.innerHTML=`<div class="grid g2" style="margin-top:12px"><div class="card"><div class="row"><div><b>Session Framework</b><div class="small">Roll the selected campaign engine at session start and carry its consequences until session end.</div></div><span class="tag">PHASE 43</span></div><div id="campaignSessionStatus" class="check" style="margin-top:9px"></div><div class="pills" style="margin-top:9px"><button id="campaignStartSession" class="btn primary">Start Session / Roll Trigger</button><button id="campaignEndSession" class="btn">End Session</button></div><div id="frameworkActions" class="pills" style="margin-top:9px"></div></div><div class="card"><b>Faction Reputation</b><div id="campaignRep" class="itemgrid" style="margin-top:8px"></div></div></div><div class="grid g2" style="margin-top:12px"><div class="card"><b>Downtime</b><div class="small">A compact solo-game layer for paid work and recovery between operations.</div><label style="display:block;margin-top:8px">Work skill<select id="downtimeSkill">${GENERAL_SKILLS.map(s=>`<option>${s}</option>`).join('')}</select></label><div class="pills" style="margin-top:8px"><button id="downtimeJob" class="btn">Work a Job</button><button id="campaignRest" class="btn">Rest / New Day</button></div></div><div class="card"><b>Credit Ledger</b><div id="campaignLedger" class="log" style="margin-top:8px;max-height:180px"></div></div></div>`;$('campaign').appendChild(c)
  }
  if(!$('droidWorkshop43')){
    let c=document.createElement('div');c.id='droidWorkshop43';c.className='card';c.style.marginTop='12px';c.innerHTML=`<div class="row"><div><b>Droid Programming & Utility Assignment</b><div class="small">Construct a chassis in the Workshop, then program its directives. One completed droid can assist noncombat party skill checks.</div></div><span class="tag">PHASE 41</span></div><div class="grid g3" style="margin-top:10px"><label>Unprogrammed chassis<select id="droidPending"></select></label><label>Directive<select id="droidDirective"></select></label><label>Chosen skill for flexible directives<select id="droidFlexSkill"></select></label></div><div class="pills" style="margin-top:9px"><button id="programDroid" class="btn primary">Program Droid</button></div><div id="droidRoster" class="itemgrid" style="margin-top:10px"></div>`;$('equipment').appendChild(c)
  }
  if(!$('encounterBuilder')){let c=document.createElement('div');c.id='encounterBuilder';c.className='card';c.style.marginTop='12px';$('database').appendChild(c)}
  if(!$('craftFocus')){
    let preview=$('craftPreview')?.parentElement;if(preview){let l=document.createElement('label');l.innerHTML=`Craft result focus<select id="craftFocus"><option value="balanced">Balanced / no auto-spend</option><option value="lightweight">Lightweight (1 Advantage)</option><option value="customizable">Customizable +1 HP (2 Advantage)</option><option value="damage">Destructive +1 damage (3 Advantage)</option><option value="accuracy">Accurate +1 (4 Advantage)</option><option value="lethal">Lethal −1 Crit (4 Advantage)</option><option value="economy">Efficient construction (3 Advantage)</option></select>`;preview.parentElement.insertBefore(l,preview.nextSibling);let s=document.createElement('label');s.innerHTML=`Gadget / flexible-directive skill<select id="craftSkill"></select>`;preview.parentElement.insertBefore(s,l.nextSibling)}
  }
}
function renderDroidWorkshop(){
  if(!$('droidRoster'))return;ensurePhase43State();$('droidPending').innerHTML=S.crafting.pendingDroids.map(id=>{let d=S.droids.find(x=>x.id===id);return d?`<option value="${id}">${d.name}</option>`:''}).join('');$('droidDirective').innerHTML=Object.entries(DROID_DIRECTIVES).map(([k,d])=>`<option value="${k}">${d.name} — ${acquisitionLabel(d.diff)}</option>`).join('');$('droidFlexSkill').innerHTML=GENERAL_SKILLS.map(s=>`<option>${s}</option>`).join('');
  $('programDroid').disabled=!S.crafting.pendingDroids.length;$('programDroid').onclick=()=>{if($('droidFlexSkill'))$('craftSkill').value=$('droidFlexSkill').value;programCraftedDroid()};
  $('droidRoster').innerHTML=S.droids.map(d=>`<div class="item"><div class="row"><div><b>${d.name}</b> ${S.activeDroidId===d.id?'<span class="tag good">UTILITY ACTIVE</span>':''}<div class="small">${DROID_CHASSIS[d.chassis]?.name||d.chassis} · ${d.directive?DROID_DIRECTIVES[d.directive]?.name:'Unprogrammed'} · Soak ${d.soak} · WT ${d.wt}${d.st?` · ST ${d.st}`:''}</div><div class="tiny">Skills: ${Object.entries(d.skills||{}).map(([s,r])=>`${s} ${r}`).join(' · ')||d.groupSkills?.join(', ')||'none yet'} · ${d.source}</div></div>${d.status==='active'?`<button class="btn" data-active-droid="${d.id}" ${S.activeDroidId===d.id?'disabled':''}>Assign Utility</button>`:''}</div></div>`).join('')||'<div class="small">No custom droids built yet.</div>';document.querySelectorAll('[data-active-droid]').forEach(b=>b.onclick=()=>{S.activeDroidId=b.dataset.activeDroid;renderAll()})
}
function renderCampaign43(){
  if(!$('campaignSessionStatus'))return;ensurePhase43State();let s=S.campaign.session,fw=S.framework;
  $('campaignSessionStatus').innerHTML=`Session <b>${s.number}</b> · ${s.active?'<span class="good">ACTIVE</span>':'inactive'}${s.roll?` · d100 <b>${s.roll}</b>`:''}<div class="small" style="margin-top:5px">${s.note}</div>${fw==='Duty'?`<div class="tiny">Contribution Rank ${S.campaign.contributionRank} · current Duty ${S.frameworkValue}/100</div>`:''}${fw==='Obligation'&&S.campaign.obligationStrainPenalty?`<div class="bad">Current solo-session strain-threshold penalty: −${S.campaign.obligationStrainPenalty}</div>`:''}`;
  $('campaignStartSession').disabled=s.active;$('campaignEndSession').disabled=!s.active;$('campaignStartSession').onclick=startCampaignSession;$('campaignEndSession').onclick=endCampaignSession;
  $('frameworkActions').innerHTML=fw==='Duty'?`<button class="btn" data-duty="1">+1 Duty</button><button class="btn" data-duty="3">+3 Duty</button><button class="btn" data-duty="5">+5 Duty</button><button class="btn" data-duty="10">+10 Duty</button>`:fw==='Obligation'?`<button class="btn good" data-ob="-5">Pay down 5</button><button class="btn" data-ob="5">Add 5</button>`:`<span class="tiny">Conflict ${S.conflict}; use Resolve Session or End Session to apply d10 − Conflict.</span>`;document.querySelectorAll('[data-duty]').forEach(b=>b.onclick=()=>dutyAward(Number(b.dataset.duty)));document.querySelectorAll('[data-ob]').forEach(b=>b.onclick=()=>obligationAdjust(Number(b.dataset.ob)));
  $('campaignRep').innerHTML=Object.entries(S.ep15.rep).map(([f,v])=>`<div class="item"><div class="row"><div><b>${f}</b><div class="tiny">${repTier(v)} · ${v>=0?'+':''}${v}</div></div><div class="pills"><button class="btn" data-rep="${f}|1">+1</button><button class="btn" data-rep="${f}|-1">−1</button></div></div></div>`).join('');document.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{let [f,n]=b.dataset.rep.split('|');adjustFactionRep(f,Number(n))});
  $('downtimeJob').onclick=downtimeJob;$('campaignRest').onclick=campaignRest;$('campaignLedger').innerHTML=S.campaign.ledger.map(x=>`<div>${x.amount>0?'+':''}${x.amount} cr · ${x.label}</div>`).join('')||'<div class="small">No transactions recorded by the Phase 43 ledger yet.</div>'
}

const _p43RenderFramework=renderFramework;
renderFramework=function(){_p43RenderFramework();injectPhase43UI();renderCampaign43()};
const _p43RenderEquipment=renderEquipment;
renderEquipment=function(){_p43RenderEquipment();injectPhase43UI();ensurePhase43State();let sel=$('craftTemplate'),current=sel?.value;sel.innerHTML=sourceCraftTemplates().map(t=>`<option value="${t.id}">${t.category==='droid'?'DROID · ':t.category==='gadget'?'GADGET · ':''}${t.name}</option>`).join('');if(current&&CRAFT_TEMPLATES[current]?.category)sel.value=current;if(!sel.value)sel.value=sourceCraftTemplates()[0]?.id||'';if($('craftSkill')){$('craftSkill').innerHTML=GENERAL_SKILLS.map(s=>`<option>${s}</option>`).join('')}$('craftBuyMaterials').onclick=phase43CraftMaterials;$('craftBuild').onclick=phase43CraftBuild;$('craftTemplate').onchange=updateCraftPreview;$('workshopStatus').textContent='Phase 41 uses source-grounded Special Modifications weapon, gadget, chassis, and directive templates. Result-focus automation spends only a conservative subset of available Advantage options.';updateCraftPreview();renderDroidWorkshop()};
const _p43UpdateCraftPreview=updateCraftPreview;
updateCraftPreview=function(){if(!$('craftPreview'))return;ensurePhase43State();let t=CRAFT_TEMPLATES[$('craftTemplate')?.value]||sourceCraftTemplates()[0];if(!t)return;$('craftPreview').innerHTML=`<b>${t.name}</b><br>Materials ${t.materialPrice.toLocaleString()} cr · rarity ${t.rarity} · Mechanics ${acquisitionLabel(t.diff)} · base time ${t.time}<div class="tiny" style="margin-top:5px">${t.desc}<br>Materials acquired: ${S.crafting.materials[t.id]?'yes':'no'} · completed: ${S.crafting.crafted[t.id]||0}</div>`;$('craftBuyMaterials').disabled=!!S.crafting.materials[t.id]||S.credits<t.materialPrice;$('craftBuild').disabled=!S.crafting.materials[t.id]};
const _p43RenderDatabase=renderDatabase;
renderDatabase=function(){_p43RenderDatabase();injectPhase43UI();$('dbAdvCount').textContent=ADVERSARY_DB.length;$('dbCoverage').innerHTML=`<b>Curated coverage:</b> ${Object.keys(SPECIES).length} playable species · ${Object.keys(CAREERS).length} careers · ${Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs).length,0)} specialization placements · ${ADVERSARY_DB.length} adversary records (${Object.keys(PLAYABLE_ADVERSARIES).length} encounter-ready) · ${STARSHIP_DB.length} starship + ${VEHICLE_DB.length} vehicle records. Coverage remains curated rather than a claim that every source-book entry is imported.`;renderEncounterBuilder()};

const _p43DatabaseRecords=databaseRecords;
databaseRecords=function(cat){let list=_p43DatabaseRecords(cat);if(cat==='adversary')return ADVERSARY_DB.map(x=>({...x,implementation:x.implementation||'Reference record'}));return list};

const _p43RenderAll=renderAll;
renderAll=function(){ensurePhase43State();_p43RenderAll();injectPhase43UI();renderCampaign43();renderDroidWorkshop();renderEncounterBuilder()};


/* =========================
   PHASES 44–45 RELEASE CANDIDATE
   Procedural Operations Director · environmental set pieces · final integration audit
   ========================= */

/* Additional encounter-ready set-piece opposition. These are compact combat implementations
   based on the supplied Environmental Set Pieces profiles. */
Object.assign(PLAYABLE_ADVERSARIES,{
  borderThugs:{id:'borderThugs',name:'Border Town Thugs',memberName:'Thug',type:'minion',c:{Brawn:3,Agility:2,Intellect:2,Cunning:1,Willpower:2,Presence:1},soak:3,perWt:5,def:0,groupSkills:['Brawl','Melee','Ranged (Light)'],skill:'Ranged (Light)',damage:6,crit:3,range:'Medium',aiRole:'skirmisher',source:'Environmental Set Pieces · Border Town Cantina'},
  securityDroid:{id:'securityDroid',name:'Security Droid',type:'rival',c:{Brawn:2,Agility:1,Intellect:4,Cunning:2,Willpower:1,Presence:1},soak:5,wt:14,def:0,skill:'Ranged (Light)',rank:2,vigilanceRank:1,coolRank:1,damage:6,crit:3,range:'Medium',aiRole:'rifle',droid:true,source:'Environmental Set Pieces · Detention Block Entry Room'}
});
Object.values({borderThugs:PLAYABLE_ADVERSARIES.borderThugs,securityDroid:PLAYABLE_ADVERSARIES.securityDroid}).forEach(p=>{
  if(!ADVERSARY_DB.some(x=>x.name===p.name))ADVERSARY_DB.push({name:p.name,type:p.type[0].toUpperCase()+p.type.slice(1),source:p.source,implementation:'Playable set-piece profile',summary:`Soak ${p.soak} · ${p.type==='minion'?`WT ${p.perWt} each`:`WT ${p.wt}`} · ${p.skill} · Damage ${p.damage} · Crit ${p.crit} · ${p.range}.`})
});

const OPERATION_SETPIECES={
  arctic:{name:'Arctic Snowfield',skill:'Resilience',diff:2,setback:1,summary:'Extreme cold, deep snow, sudden blizzards, and dangerous crevasses.',source:'Environmental Set Pieces · Arctic Snowfield'},
  asteroid:{name:'Asteroid Field',skill:'Piloting (Space)',diff:3,setback:1,summary:'Broken rock fields force evasive piloting and threaten collisions.',source:'Environmental Set Pieces · Asteroid Field'},
  battlefield:{name:'Active Battlefield',skill:'Vigilance',diff:2,setback:1,summary:'Stray fire, explosions, smoke, and rapidly changing cover complicate every move.',source:'Environmental Set Pieces · Battlefield'},
  cantina:{name:'Border Town Cantina',skill:'Cool',diff:2,setback:0,summary:'A tense social space can become a brawl with almost no warning.',source:'Environmental Set Pieces · Border Town Cantina'},
  desert:{name:'Desert Sand Dune',skill:'Resilience',diff:2,setback:1,summary:'Heat, shifting sand, storms, and sinkholes punish careless movement.',source:'Environmental Set Pieces · Desert Sand Dune'},
  detention:{name:'Detention Block Entry Room',skill:'Computers',diff:3,setback:1,summary:'Automated defenses, security consoles, and reinforcement routes protect the block.',source:'Environmental Set Pieces · Detention Block Entry Room'},
  chase:{name:'Urban Foot Chase',skill:'Athletics',diff:2,setback:1,summary:'Opposed movement, crowds, obstacles, and changing distance turn pursuit into a running encounter.',source:'Environmental Set Pieces · Foot Chase'},
  icecave:{name:'Frozen Ice Cave',skill:'Coordination',diff:2,setback:1,summary:'Cold, slick footing, thin ice, and falling debris make every movement hazardous.',source:'Environmental Set Pieces · Frozen Ice Cave'},
  hangar:{name:'Busy Hangar',skill:'Vigilance',diff:2,setback:1,summary:'Vehicles, service droids, stacked cargo, and volatile equipment create moving hazards.',source:'Environmental Set Pieces · Hangar'},
  junkyard:{name:'Junkyard',skill:'Mechanics',diff:2,setback:1,summary:'Cranes, scrap piles, unstable machinery, and scavenger creatures fill the field.',source:'Environmental Set Pieces · Junkyard'},
  crash:{name:'Starship Crash Site',skill:'Survival',diff:3,setback:1,summary:'A broken hull, fire, unstable systems, and salvage opportunities surround the objective.',source:'Environmental Set Pieces · Starship Crash'},
  grassland:{name:'Infested Grassland',skill:'Perception',diff:2,setback:1,summary:'Tall grass conceals movement while swarming predators threaten anyone who lingers.',source:'Environmental Set Pieces · Infested Grassland'},
  ionized:{name:'Ionized Atmosphere',skill:'Resilience',diff:3,setback:1,summary:'Electrical storms threaten electronics and expose travelers to lightning strikes.',source:'Environmental Set Pieces · Ionized Atmosphere'},
  jungle:{name:'Dense Jungle',skill:'Survival',diff:2,setback:1,summary:'Concealment, difficult terrain, biting insects, and predatory flora slow progress.',source:'Environmental Set Pieces · Jungle'},
  lab:{name:'Research Laboratory',skill:'Computers',diff:3,setback:1,summary:'Lab fires, damaged consoles, experimental hazards, and containment failures can cascade quickly.',source:'Environmental Set Pieces · Research Laboratory'},
  mountain:{name:'Rocky Mountainside',skill:'Athletics',diff:3,setback:1,summary:'Elevation, narrow footing, rockslides, and falling debris make vertical movement dangerous.',source:'Environmental Set Pieces · Rocky Mountainside'},
  passage:{name:'Damaged Starship Passage',skill:'Mechanics',diff:2,setback:1,summary:'Cramped corridors, ruptured coolant, electrical faults, and failed ship systems complicate movement.',source:'Environmental Set Pieces · Starship Passage'},
  mudflat:{name:'Toxic Mud Flat',skill:'Resilience',diff:3,setback:1,summary:'Thick mud, choking gas, sudden storms, and buried predators create a draining crossing.',source:'Environmental Set Pieces · Toxic Mud Flat'}
};

const OPERATION_TYPES={
  bounty:{name:'Bounty Hunt',source:'Mask of the Pirate Queen',patrons:['Guild broker','crime syndicate fixer','local magistrate','private security chief'],factions:['Guild','Hutts','Local'],titles:['False Face','Ash Trail','Vanishing Mark','Broken Chain','Last Known Vector'],hooks:['A lucrative target has disappeared behind a chain of intermediaries.','A wanted operative is using decoys and paid muscle to stay ahead of hunters.','A seemingly simple capture contract conceals a larger identity problem.'],skills:['Streetwise','Perception','Deception'],combatLabel:'Corner the target and their protectors',finalLabels:['Bring the mark in alive','Prove the target’s identity','Negotiate the handoff'],twists:['The first target is a decoy.','A rival hunter reaches the site first.','The patron omitted a crucial detail about the mark.','The target offers evidence that changes the job.'],baseCredits:900},
  heist:{name:'Heist',source:'The Jewel of Yavin',patrons:['wealthy financier','underworld slicer','disgraced noble','Rebel quartermaster'],factions:['Hutts','Rebels','Local'],titles:['Glass Vault','Midnight Transfer','Silent Auction','Ghost Account','Unstealable Prize'],hooks:['A valuable target is protected by layered physical and digital security.','The crew must case a secure site, prepare an entry plan, and execute before a hard deadline.','A client wants the prize and the money trail altered before anyone notices.'],skills:['Perception','Computers','Skulduggery'],combatLabel:'Survive the security response',finalLabels:['Complete the extraction before lockdown','Erase the crew’s trail','Escape with the prize'],twists:['Security changes shifts earlier than expected.','A third party begins the same theft.','The client plans to betray the crew after the job.','The prize is not what the briefing claimed.'],baseCredits:1300},
  rebel:{name:'Rebel Operation',source:'Onslaught at Arda I',patrons:['Alliance intelligence officer','sector commander','cell quartermaster','Rebel field agent'],factions:['Rebels'],titles:['Broken Beacon','Quiet Sabotage','Red Corridor','Hidden Cell','Cold Signal'],hooks:['The Alliance needs a small team to achieve an objective the main force cannot approach openly.','A local Rebel cell has identified a narrow opportunity for sabotage, rescue, or intelligence recovery.','A Duty-linked side objective may alter the outcome of a larger operation.'],skills:['Knowledge (Warfare)','Stealth','Mechanics'],combatLabel:'Break through the Imperial response',finalLabels:['Transmit the intelligence','Sabotage the objective and withdraw','Extract before reinforcements arrive'],twists:['An Imperial mole has compromised part of the plan.','Civilians are caught inside the operational area.','The target is more strategically important than expected.','A friendly unit needs immediate assistance.'],baseCredits:500},
  salvage:{name:'Salvage & Exploration',source:'Beyond the Rim',patrons:['salvage broker','archaeologist','exploration guild','independent captain'],factions:['Local','Guild'],titles:['Forgotten Vector','Dead Beacon','Lost Hull','Black Orbit','Buried Signal'],hooks:['An old signal points toward wreckage that may still contain valuable technology.','The job begins as exploration but competing interests are already moving toward the same site.','A remote location promises salvage, lost data, or something older than the current conflict.'],skills:['Astrogation','Survival','Mechanics'],combatLabel:'Secure the site from hostile scavengers',finalLabels:['Recover the priority salvage','Map a safe return route','Extract the surviving data core'],twists:['The wreck is not as abandoned as expected.','The most valuable object carries an Imperial locator.','A survivor changes the mission priorities.','Removing the prize destabilizes the site.'],baseCredits:1100},
  rescue:{name:'Rescue / Extraction',source:'Onslaught at Arda I',patrons:['Rebel handler','concerned family','Guild contact','local resistance leader'],factions:['Rebels','Guild','Local'],titles:['No One Left Behind','Locked Deck','Vanishing Prisoner','Last Shuttle','Cell Block Echo'],hooks:['Someone important has been captured and transfer orders are already moving.','The crew must locate a prisoner, breach a secure area, and get out before the response closes in.','The extraction target knows something valuable enough that several factions want them first.'],skills:['Streetwise','Skulduggery','Medicine'],combatLabel:'Hold the extraction corridor',finalLabels:['Stabilize and extract the prisoner','Reach the evac point','Lose the pursuit'],twists:['The prisoner refuses to leave without another captive.','The target has been moved to a different block.','The rescue was anticipated and the exit route is trapped.','The prisoner is badly wounded and cannot move quickly.'],baseCredits:800},
  smuggling:{name:'Smuggling Run',source:'Edge of the Empire adventure structure',patrons:['freight broker','Hutt factor','Rebel quartermaster','independent merchant'],factions:['Hutts','Guild','Rebels'],titles:['Quiet Cargo','False Manifest','Outer Rim Express','Cold Hold','One Clean Jump'],hooks:['A cargo looks ordinary until the route passes through an unexpected inspection zone.','The client pays well because the shipment cannot survive official scrutiny.','A routine delivery becomes complicated when another faction learns what is aboard.'],skills:['Negotiation','Deception','Piloting (Space)'],combatLabel:'Fight through the interdiction team',finalLabels:['Deliver the cargo intact','Reach the jump point','Talk the receiving party into honoring the deal'],twists:['The manifest does not match the cargo.','The buyer changes the rendezvous at the last minute.','Imperial customs already has the ship description.','A passenger is hidden inside the shipment.'],baseCredits:1200},
  force:{name:'Force Mystery',source:'Force and Destiny campaign structure',patrons:['wandering scholar','Force-sensitive refugee','ancient recording','mysterious vision'],factions:['Local','Rebels'],titles:['Echo in Stone','Ashen Vergence','The Silent Holocron','Shadow of Memory','Broken Temple'],hooks:['A faint Force echo points toward a place where something unresolved still lingers.','An old relic draws attention from both seekers and hunters.','A vision offers incomplete guidance and a dangerous choice.'],skills:['Knowledge (Lore)','Discipline','Vigilance'],combatLabel:'Defend the site from those seeking the relic',finalLabels:['Interpret the final vision','Choose what happens to the relic','Leave without surrendering to the temptation'],twists:['The apparent threat is guarding the site rather than exploiting it.','The relic offers power at a moral cost.','Another Force-sensitive has been following the same trail.','The vision was deliberately incomplete.'],baseCredits:400}
};

function opEsc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function opPick(a){return a[Math.floor(Math.random()*a.length)]}
function opClamp(v,a,b){return Math.max(a,Math.min(b,v))}
function opThreatName(n){return ['','Routine','Risky','Dangerous','Severe','Extreme'][n]||`Threat ${n}`}
function opDifficulty(n){return opClamp(1+Math.floor(n/1.35),1,5)}
function operationOpposition(type,threat){
  const underworld={1:[{id:'borderThugs',count:2}],2:[{id:'borderThugs',count:3}],3:[{id:'borderThugs',count:4},{id:'informant',count:1}],4:[{id:'borderThugs',count:5},{id:'stormSergeant',count:1}],5:[{id:'borderThugs',count:5},{id:'royalGuard',count:1}]};
  const security={1:[{id:'securityDroid',count:1}],2:[{id:'navyTrooper',count:3}],3:[{id:'stormtrooper',count:3},{id:'navyOfficer',count:1}],4:[{id:'stormtrooper',count:4},{id:'stormSergeant',count:1}],5:[{id:'stormtrooper',count:5},{id:'royalGuard',count:1}]};
  return JSON.parse(JSON.stringify(['bounty','smuggling','salvage'].includes(type)?underworld[threat]:security[threat]));
}
function operationLocationFor(type){
  const map={bounty:['cantina','desert','junkyard','hangar','chase'],heist:['lab','hangar','detention','passage','chase'],rebel:['battlefield','detention','hangar','mountain','jungle'],salvage:['crash','junkyard','asteroid','arctic','jungle','mudflat'],rescue:['detention','passage','hangar','battlefield','chase'],smuggling:['hangar','asteroid','cantina','ionized','passage'],force:['mountain','icecave','jungle','arctic','crash']};
  return opPick(map[type]||Object.keys(OPERATION_SETPIECES))
}
function buildOperation(typeChoice='any',threatChoice='any',envChoice='any'){
  ensurePhase45State();
  let type=typeChoice==='any'?opPick(Object.keys(OPERATION_TYPES)):typeChoice,t=OPERATION_TYPES[type];
  let threat=threatChoice==='any'?1+Math.floor(Math.random()*5):Number(threatChoice),baseDiff=opDifficulty(threat);
  let envKey=envChoice==='any'?operationLocationFor(type):envChoice,env=OPERATION_SETPIECES[envKey]||OPERATION_SETPIECES.cantina;
  let patron=opPick(t.patrons),title=`${opPick(t.titles)} · ${env.name}`,twist=opPick(t.twists),repFaction=opPick(t.factions),credits=t.baseCredits+threat*(250+Math.floor(Math.random()*151));
  let objectives=[
    {id:'lead',label:`Establish the lead for ${title.split(' · ')[0]}`,kind:'check',skill:t.skills[0],diff:baseDiff,setback:0,done:false},
    {id:'approach',label:`Cross or exploit the ${env.name}`,kind:'check',skill:env.skill,diff:opClamp(Math.max(baseDiff,env.diff),1,5),setback:env.setback||0,done:false},
    {id:'opposition',label:t.combatLabel,kind:'combat',done:false},
    {id:'resolution',label:opPick(t.finalLabels),kind:'check',skill:t.skills[1],diff:opClamp(baseDiff+(threat>=4?1:0),1,5),setback:0,done:false}
  ];
  return {id:`op-${Date.now()}-${Math.floor(Math.random()*100000)}`,type,kind:t.name,title,patron,hook:opPick(t.hooks),threat,environment:envKey,twist,repFaction,credits,xp:10+threat*5,source:t.source,environmentSource:env.source,objectives,opposition:operationOpposition(type,threat),status:'offered',complicationActive:false,rewarded:false,createdAt:new Date().toISOString()}
}
function ensurePhase45State(){
  ensurePhase43State();S.schemaVersion=52;
  S.gmOps=S.gmOps||{};S.gmOps.board=Array.isArray(S.gmOps.board)?S.gmOps.board:[];S.gmOps.current=S.gmOps.current||null;S.gmOps.history=Array.isArray(S.gmOps.history)?S.gmOps.history:[];S.gmOps.combatLink=S.gmOps.combatLink||null;
  S.releaseValidation=S.releaseValidation||{at:null,passed:0,failed:0,issues:[]};
}
const _p45Ensure16=ensurePhase16State;
ensurePhase16State=function(){_p45Ensure16();ensurePhase45State()};

function archiveCurrentOperation(status){ensurePhase45State();let op=S.gmOps.current;if(!op)return;op.status=status||op.status||'archived';S.gmOps.history.unshift(JSON.parse(JSON.stringify(op)));S.gmOps.history=S.gmOps.history.slice(0,20);S.gmOps.current=null;S.gmOps.combatLink=null}
function generateOperationOffers(count=3){ensurePhase45State();let tc=$('opType')?.value||'any',th=$('opThreat')?.value||'any',ev=$('opEnvironment')?.value||'any';for(let i=0;i<count;i++)S.gmOps.board.unshift(buildOperation(tc,th,ev));S.gmOps.board=S.gmOps.board.slice(0,12);renderOperations();safeAutosave()}
function acceptOperation(id){ensurePhase45State();let idx=S.gmOps.board.findIndex(x=>x.id===id);if(idx<0)return;if(S.gmOps.current&&S.gmOps.current.status==='active'&&!confirm('Abandon the current operation and accept this one?'))return;if(S.gmOps.current)archiveCurrentOperation(S.gmOps.current.rewarded?'completed':'abandoned');let [op]=S.gmOps.board.splice(idx,1);op.status='active';S.gmOps.current=op;gLog(`Operation accepted: ${op.title}.`);renderOperations();safeAutosave()}
function abandonOperation(){if(!S.gmOps.current)return;if(!confirm('Abandon the active operation?'))return;gLog(`Operation abandoned: ${S.gmOps.current.title}.`);archiveCurrentOperation('abandoned');renderOperations();safeAutosave()}
function operationAllDone(op){return !!op&&op.objectives.every(x=>x.done)}
function triggerOperationComplication(auto=false){let op=S.gmOps.current;if(!op||op.complicationActive)return;op.complicationActive=true;gLog(`${auto?'A failed check triggers':'You trigger'} the operation complication: ${op.twist}`);renderOperations();safeAutosave()}
function resolveOperationObjective(index){ensurePhase45State();let op=S.gmOps.current,obj=op?.objectives?.[index];if(!op||!obj||obj.done||obj.kind!=='check')return;let ctx={diff:obj.diff,setback:(obj.setback||0)+(op.complicationActive?1:0)},out=performBest(obj.skill,ctx);if(out.r.ok){obj.done=true;gLog(`${out.q.actor.name} completes “${obj.label}” with ${obj.skill}.`)}else{let pain=Math.max(1,Math.min(3,obj.diff-1));S.strain=Math.min(strainThreshold(),S.strain+pain);gLog(`${out.q.actor.name} fails “${obj.label}.” +${pain} strain.`);if(!op.complicationActive)triggerOperationComplication(true)}renderOperations();renderHud();safeAutosave()}
function launchOperationCombat(index){ensurePhase45State();let op=S.gmOps.current,obj=op?.objectives?.[index];if(!op||!obj||obj.done||obj.kind!=='combat')return;S.customEncounter=JSON.parse(JSON.stringify(op.opposition));S.gmOps.combatLink={opId:op.id,objIndex:index};startCustomEncounter()}
function claimOperationReward(){ensurePhase45State();let op=S.gmOps.current;if(!op||op.rewarded||!operationAllDone(op))return;let bonus=op.complicationActive?5:0;op.rewarded=true;op.status='completed';S.credits+=op.credits;S.earnedXp+=op.xp+bonus;ledgerEntry(op.credits,`Operation payout: ${op.title}`);adjustFactionRep(op.repFaction,op.threat>=4?2:1);if(S.framework==='Duty')dutyAward(Math.max(2,op.threat+1));if(S.framework==='Obligation')obligationAdjust(-Math.max(1,Math.ceil(op.threat/2)));gLog(`Operation complete: ${op.title}. +${op.xp+bonus} XP, +${op.credits} credits.`);renderAll();renderNavTab('gm');safeAutosave()}

const _p45CombatWin=combatWin;
combatWin=function(){
  let link=(S.combat?.kind==='customEncounter'&&S.gmOps?.combatLink)?{...S.gmOps.combatLink}:null;
  _p45CombatWin();
  if(link){ensurePhase45State();let op=S.gmOps.current;if(op&&op.id===link.opId&&op.objectives?.[link.objIndex]){op.objectives[link.objIndex].done=true;gLog(`Operation combat objective completed: ${op.objectives[link.objIndex].label}.`)}S.gmOps.combatLink=null;renderOperations();renderNavTab('gm');safeAutosave()}
};

function opObjectiveHTML(op,o,i){
  let status=o.done?'<span class="tag good">DONE</span>':`<span class="tag">${o.kind==='combat'?'COMBAT':acquisitionLabel(o.diff)}</span>`;
  let action='';
  if(!o.done&&o.kind==='check'){let q=bestActor(o.skill,{diff:o.diff,setback:(o.setback||0)+(op.complicationActive?1:0)});action=`<div class="tiny" style="margin-top:6px">Best roller: <b>${opEsc(q.actor.name)}</b> · ${opEsc(o.skill)} ${q.rank} · ${opEsc(q.ch)} ${q.val}</div><button class="btn" data-op-check="${i}" style="margin-top:7px">Resolve Check</button>`}
  if(!o.done&&o.kind==='combat')action=`<div class="tiny" style="margin-top:6px">Opposition: ${op.opposition.map(x=>`${PLAYABLE_ADVERSARIES[x.id]?.name||x.id} ×${x.count}`).join(' · ')}</div><button class="btn danger" data-op-combat="${i}" style="margin-top:7px">Launch Tactical Encounter</button>`;
  return `<div class="item"><div class="row"><div><b>${i+1}. ${opEsc(o.label)}</b>${o.skill?`<div class="small">${opEsc(o.skill)}${o.setback?' · environmental Setback':''}${op.complicationActive?' · complication Setback':''}</div>`:''}</div>${status}</div>${action}</div>`
}
function renderOperations(){
  if(!$('operationBoard'))return;ensurePhase45State();
  if(!$('opType').dataset.ready){$('opType').innerHTML='<option value="any">Any</option>'+Object.entries(OPERATION_TYPES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');$('opEnvironment').innerHTML='<option value="any">Any</option>'+Object.entries(OPERATION_SETPIECES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');$('opType').dataset.ready='1'}
  let op=S.gmOps.current;
  $('operationCurrent').innerHTML=op?`<div class="card"><div class="row"><div><div class="tiny">ACTIVE OPERATION · ${opEsc(op.kind)} · ${opThreatName(op.threat)}</div><h3 style="margin:.2rem 0">${opEsc(op.title)}</h3><div class="small">Patron: ${opEsc(op.patron)} · Faction reward: ${opEsc(op.repFaction)}</div></div><span class="pill">${op.objectives.filter(x=>x.done).length}/${op.objectives.length} objectives</span></div><p class="small">${opEsc(op.hook)}</p><div class="check"><b>Environment — ${opEsc(OPERATION_SETPIECES[op.environment]?.name||op.environment)}</b><div class="small">${opEsc(OPERATION_SETPIECES[op.environment]?.summary||'')}</div></div><div class="${op.complicationActive?'warnbox':'check'}" style="margin-top:8px"><b>Complication:</b> ${opEsc(op.twist)} ${op.complicationActive?'<span class="bad">ACTIVE — remaining checks add 1 Setback.</span>':'<span class="tiny">Dormant until triggered or a check fails.</span>'}</div><div class="itemgrid" style="margin-top:10px">${op.objectives.map((o,i)=>opObjectiveHTML(op,o,i)).join('')}</div><div class="row" style="margin-top:10px"><div class="small">Reward: ${op.xp}${op.complicationActive?' +5':''} XP · ${op.credits.toLocaleString()} cr · ${op.repFaction} reputation${S.framework==='Duty'?' · Duty':S.framework==='Obligation'?' · Obligation reduction':''}<div class="tiny">Structure source: ${opEsc(op.source)} · environment source: ${opEsc(op.environmentSource)}</div></div><div class="pills"><button id="opComplicate" class="btn" ${op.complicationActive||op.rewarded?'disabled':''}>Trigger Complication</button><button id="opClaim" class="btn primary" ${operationAllDone(op)&&!op.rewarded?'':'disabled'}>${op.rewarded?'Reward Claimed':'Complete Operation'}</button><button id="opAbandon" class="btn danger">${op.rewarded?'Archive Operation':'Abandon'}</button></div></div></div>`:'<div class="card"><b>No active operation.</b><div class="small">Generate offers below and accept one to create a persistent multi-scene mission.</div></div>';
  $('operationBoard').innerHTML=S.gmOps.board.map(x=>`<div class="item"><div class="row"><div><div class="tiny">${opEsc(x.kind)} · ${opThreatName(x.threat)}</div><b>${opEsc(x.title)}</b></div><span class="tag">${x.credits.toLocaleString()} cr</span></div><div class="small" style="margin-top:6px">${opEsc(x.hook)}</div><div class="tiny" style="margin-top:6px">${opEsc(x.patron)} · ${opEsc(OPERATION_SETPIECES[x.environment]?.name||x.environment)} · ${x.xp} XP · ${opEsc(x.source)}</div><button class="btn primary" data-op-accept="${x.id}" style="margin-top:8px">Accept Operation</button></div>`).join('')||'<div class="small">The board is empty. Generate a few offers.</div>';
  $('operationHistory').innerHTML=S.gmOps.history.map(x=>`<div><b>${opEsc(x.title)}</b> · ${opEsc(x.status)} · ${x.objectives?.filter(o=>o.done).length||0}/${x.objectives?.length||0} objectives</div>`).join('')||'<div class="small">No archived operations yet.</div>';
  $('generateOperations').onclick=()=>generateOperationOffers(3);$('refreshOperation').onclick=()=>generateOperationOffers(1);$('clearOperations').onclick=()=>{S.gmOps.board=[];renderOperations();safeAutosave()};document.querySelectorAll('[data-op-accept]').forEach(b=>b.onclick=()=>acceptOperation(b.dataset.opAccept));document.querySelectorAll('[data-op-check]').forEach(b=>b.onclick=()=>resolveOperationObjective(Number(b.dataset.opCheck)));document.querySelectorAll('[data-op-combat]').forEach(b=>b.onclick=()=>launchOperationCombat(Number(b.dataset.opCombat)));if($('opComplicate'))$('opComplicate').onclick=()=>triggerOperationComplication(false);if($('opClaim'))$('opClaim').onclick=claimOperationReward;if($('opAbandon'))$('opAbandon').onclick=()=>{if(op?.rewarded){archiveCurrentOperation('completed');renderOperations()}else abandonOperation()}
}

RULE_AUDIT.unshift(
 {id:'release45',name:'Phase 45 release-candidate integration',status:'adapted',source:'Whole-project regression pass',detail:'Adds non-destructive release diagnostics, schema-45 migration, operation-state persistence, cross-system reward hooks, UI readiness reporting, and a larger automated browser regression suite. This is a release candidate, not a claim that every source-book talent or catalog entry has been transcribed.'},
 {id:'operations44',name:'Phase 44 procedural Operations Director',status:'adapted',source:'Mask of the Pirate Queen; The Jewel of Yavin; Beyond the Rim; Onslaught at Arda I; Environmental Set Pieces',detail:'Operation templates combine source-inspired adventure structures—leads, preparation, environmental complications, opposition, twists, and persistent rewards—into original randomized missions. Published adventure text and encounter scripts are not reproduced.'}
);

function phase45Diagnostics(){
  ensurePhase45State();let rows=[];const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});
  add('Save schema',S.schemaVersion===52&&BUILD_INFO.saveSchema===52,`state ${S.schemaVersion} · build ${BUILD_INFO.saveSchema}`);
  add('Career matrix',Object.keys(CAREERS).length===18&&Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs||{}).length,0)===108,`${Object.keys(CAREERS).length} careers · ${Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs||{}).length,0)} placements`);
  add('Species roster',Object.keys(SPECIES).length>=34,`${Object.keys(SPECIES).length} playable species`);
  add('Equipment catalogs',Object.keys(WEAPONS).length>=36&&Object.keys(ARMOR).length>=16,`${Object.keys(WEAPONS).length} weapons · ${Object.keys(ARMOR).length} armor`);
  add('Playable ship chassis',Object.values(SHIP_MODELS).filter(x=>x.implementation==='Playable').length>=6,`${Object.values(SHIP_MODELS).filter(x=>x.implementation==='Playable').length} playable ships`);
  add('Encounter roster',Object.keys(PLAYABLE_ADVERSARIES).length>=9,`${Object.keys(PLAYABLE_ADVERSARIES).length} encounter-ready profiles`);
  add('Operation templates',Object.keys(OPERATION_TYPES).length>=7&&Object.keys(OPERATION_SETPIECES).length>=18,`${Object.keys(OPERATION_TYPES).length} mission frames · ${Object.keys(OPERATION_SETPIECES).length} environments`);
  add('Operation profile integrity',Object.values(OPERATION_TYPES).every(t=>t.skills?.length>=2&&t.titles?.length&&t.twists?.length), 'mission generators have skills, titles, and complications');
  add('Set-piece integrity',Object.values(OPERATION_SETPIECES).every(x=>SKILL_CHAR[x.skill]&&x.diff>=1&&x.diff<=5), 'all environments point to valid skills and difficulties');
  add('Current operation integrity',!S.gmOps.current||S.gmOps.current.objectives?.every(o=>o.kind==='combat'||SKILL_CHAR[o.skill]),S.gmOps.current?.title||'no active operation');
  let broken=[];for(const [name,tree] of Object.entries({...EXACT_TREES,...PHASE37_TREES,...UNIVERSAL_TREES})){let ids=new Set((tree||[]).map(n=>n.id));for(const n of tree||[])for(const l of n.links||[])if(!ids.has(l))broken.push(`${name}:${n.id}->${l}`)}add('Talent-tree links',broken.length===0,broken.slice(0,3).join(', ')||'no orphan links');
  let domIds=[...document.querySelectorAll('[id]')].map(x=>x.id),dup=domIds.filter((x,i)=>domIds.indexOf(x)!==i);add('DOM IDs',dup.length===0,dup.length?`duplicates: ${[...new Set(dup)].join(', ')}`:'all unique');
  let stateIssues=rcStateIssues();add('Runtime state diagnostics',stateIssues.length===0,stateIssues.join(' · ')||'no state issues');
  try{let x=JSON.parse(JSON.stringify(serializableState()));add('Save serialization',x.schemaVersion===52&&typeof x==='object','JSON round-trip succeeded')}catch(e){add('Save serialization',false,e.message)}
  return rows
}
function runReleaseValidation(){let rows=phase45Diagnostics(),issues=rows.filter(x=>!x.ok);S.releaseValidation={at:new Date().toISOString(),passed:rows.length-issues.length,failed:issues.length,issues:issues.map(x=>`${x.name}: ${x.detail}`)};renderReleaseReadiness();safeAutosave();return rows}
function injectPhase45UI(){
  if(!$('guideReleasePanel')){let c=document.createElement('div');c.id='guideReleasePanel';c.className='card';c.style.marginTop='12px';let g=$('guide');g.appendChild(c)}
  if(!$('releasePanel')){let c=document.createElement('div');c.id='releasePanel';c.className='card';c.style.marginTop='12px';$('rulesaudit').appendChild(c)}
}
function renderReleaseReadiness(){
  injectPhase45UI();ensurePhase45State();let rows=phase45Diagnostics(),ok=rows.filter(x=>x.ok).length,fail=rows.length-ok,last=S.releaseValidation;
  $('guideReleasePanel').innerHTML=`<div class="row"><div><b>Release Candidate Readiness</b><div class="small">Phase 46 extends the release candidate with selectable origins, custom recruits, downtime study progression, and the repaired droid-programming workflow.</div></div><span class="pill ${fail?'bad':'good'}">${ok}/${rows.length} live checks</span></div><div class="tiny" style="margin-top:7px">Save schema 46 · ${Object.keys(SPECIES).length} species · ${Object.values(CAREERS).reduce((n,c)=>n+Object.keys(c.specs).length,0)} career/spec placements · ${Object.keys(PLAYABLE_ADVERSARIES).length} encounter-ready adversaries · ${Object.keys(OPERATION_SETPIECES).length} environment set pieces.</div>`;
  $('releasePanel').innerHTML=`<div class="row"><div><b>Release-Candidate Diagnostics</b><div class="small">Non-destructive structural checks. The browser smoke suite remains available through the build's test mode.</div></div><button id="releaseValidate" class="btn primary">Run Validation</button></div><div class="itemgrid" style="margin-top:10px">${rows.map(x=>`<div class="item"><span class="statusdot ${x.ok?'ok':'bad'}"></span><b>${opEsc(x.name)}</b><div class="tiny">${opEsc(x.detail)}</div></div>`).join('')}</div><div class="small" style="margin-top:8px">${last.at?`Last saved validation: ${last.passed} passed, ${last.failed} failed · ${new Date(last.at).toLocaleString()}`:'No validation snapshot saved yet.'}</div>`;$('releaseValidate').onclick=runReleaseValidation
}

const _p45RenderNavTab=renderNavTab;
renderNavTab=function(id){_p45RenderNavTab(id);if(id==='gm')renderOperations();if(id==='rulesaudit')renderReleaseReadiness()};
const _p45RenderRulesAudit=renderRulesAudit;
renderRulesAudit=function(){_p45RenderRulesAudit();renderReleaseReadiness()};
const _p45RenderGuide=renderGuide;
renderGuide=function(){_p45RenderGuide();renderReleaseReadiness()};
const _p45RenderAll=renderAll;
renderAll=function(){ensurePhase45State();_p45RenderAll();injectPhase45UI();renderOperations();renderReleaseReadiness()};

const _p45SmokeBase=runSableReachSmoke;
runSableReachSmoke=async function(){
  let report=await _p45SmokeBase();const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  test('Phase 44 has seven operation archetypes',()=>Object.keys(OPERATION_TYPES).length===7);
  test('Phase 44 has eighteen environmental set pieces',()=>Object.keys(OPERATION_SETPIECES).length===18);
  test('Phase 44 set pieces reference valid skills',()=>Object.values(OPERATION_SETPIECES).every(x=>!!SKILL_CHAR[x.skill]));
  test('Phase 44 operation generation yields four valid objectives',()=>{let o=buildOperation('heist','3','detention');return o.objectives.length===4&&o.objectives.some(x=>x.kind==='combat')&&o.objectives.filter(x=>x.kind==='check').every(x=>!!SKILL_CHAR[x.skill])});
  test('Phase 44 operation opposition uses encounter-ready profiles',()=>{let o=buildOperation('rebel','4','battlefield');return o.opposition.every(x=>!!PLAYABLE_ADVERSARIES[x.id])});
  test('Phase 44 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='operations44'&&x.status==='adapted'));
  test('Phase 45 schema migration target',()=>S.schemaVersion===52&&serializableState().schemaVersion===52);
  test('Phase 45 release diagnostics pass structurally',()=>phase45Diagnostics().every(x=>x.ok));
  test('Phase 45 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='release45'&&x.status==='adapted'));
  let pre=document.getElementById('smokeReport');document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;if(pre)pre.textContent=JSON.stringify(report,null,2);return report
};


/* =========================
   PHASE 46 — ORIGINS & CREW
   Droid UI repair · downtime study · custom crew · selectable starts
   ========================= */

const CUSTOM_CREW_ARCHETYPES={
  vanguard:{name:'Vanguard',desc:'Tough close-range fighter and bodyguard.',mods:{Brawn:1,Willpower:1},skills:{Athletics:2,Brawl:2,Discipline:1},weapon:'carbine',armor:'paddedArmor',defaults:['Athletics','Brawl']},
  gunslinger:{name:'Gunslinger',desc:'Fast sidearm specialist with strong reflexes.',mods:{Agility:1,Cunning:1},skills:{'Ranged (Light)':2,Cool:1,Vigilance:1},weapon:'pistol',armor:'armoredClothing',defaults:['Ranged (Light)','Cool']},
  technician:{name:'Technician',desc:'Slicer, mechanic, and technical problem solver.',mods:{Intellect:2},skills:{Computers:2,Mechanics:2,Perception:1},weapon:'holdout',armor:'heavyClothing',defaults:['Mechanics','Computers']},
  medic:{name:'Medic',desc:'Field healer with a steady nerve under pressure.',mods:{Intellect:1,Willpower:1},skills:{Medicine:2,Discipline:1,Resilience:1},weapon:'holdout',armor:'heavyClothing',defaults:['Medicine','Discipline']},
  scout:{name:'Scout',desc:'Tracker, infiltrator, and wilderness specialist.',mods:{Cunning:1,Agility:1},skills:{Perception:2,Survival:2,Stealth:1},weapon:'carbine',armor:'paddedArmor',defaults:['Survival','Perception']},
  pilot:{name:'Pilot',desc:'Space pilot, navigator, and emergency gunner.',mods:{Agility:1,Intellect:1},skills:{'Piloting (Space)':2,Astrogation:2,Gunnery:1},weapon:'pistol',armor:'heavyClothing',defaults:['Piloting (Space)','Astrogation']},
  face:{name:'Face',desc:'Negotiator, con artist, and social operator.',mods:{Presence:1,Cunning:1},skills:{Charm:2,Negotiation:2,Deception:1},weapon:'pistol',armor:'heavyClothing',defaults:['Negotiation','Charm']}
};

const STARTING_ORIGINS={
  sable:{name:'Stranded on Sable Reach',tag:'Handcrafted prologue',summary:'Begin broke and grounded in the Cinder Spire Cantina. Follow the existing Episode 0 investigation through the ash flats, Imperial listening post, and Hangar Twelve to earn your first ship.',credits:500,ship:false,framework:null,rep:{},scenarios:{hangarTwelve:{name:'Hangar Twelve',summary:'The original Sable Reach Episode 0 campaign opening.',type:null,env:null,threat:2}}},
  guild:{name:'Guild Hunter',tag:'Bounty-hunting start',summary:'Begin as a licensed independent hunter with a small ship, a little Guild standing, and a live contract already waiting.',credits:750,ship:true,shipName:"Hunter's Wake",framework:'Obligation',frameworkType:'Bounty',frameworkValue:10,rep:{Guild:5},scenarios:{falseFace:{name:'The False Face',summary:'A wanted target is moving through a frontier port under a borrowed identity.',type:'bounty',env:'cantina',threat:2},rivalHunter:{name:'Two Hunters, One Mark',summary:'A rival hunter has the same contract and is willing to sabotage the competition.',type:'bounty',env:'junkyard',threat:3},liveCapture:{name:'Alive Means Alive',summary:'The client needs a dangerous fugitive breathing, conscious, and able to answer questions.',type:'bounty',env:'desert',threat:3}}},
  rebel:{name:'Rebel Field Operative',tag:'Alliance start',summary:'Begin attached to a Rebel cell with a courier ship, established trust, and a mission that matters to a larger campaign.',credits:450,ship:true,shipName:'Vanguard Courier',framework:'Duty',frameworkType:'Intelligence',frameworkValue:10,rep:{Rebels:10},scenarios:{quietSabotage:{name:'Quiet Sabotage',summary:'Slip into an Imperial support site, cripple a strategic system, and disappear before the garrison understands what happened.',type:'rebel',env:'battlefield',threat:2},prisoner:{name:'No One Left Behind',summary:'A captured Rebel asset is being transferred out of reach unless the crew acts now.',type:'rescue',env:'detention',threat:3},intelGrab:{name:'Cold Signal',summary:'Recover intelligence from a research facility before Imperial Intelligence burns the entire network.',type:'rebel',env:'lab',threat:3}}},
  trader:{name:'Independent Free Trader',tag:'Ship-first start',summary:'Begin with a freighter, more cash, a debt hanging over the crew, and a cargo run that can become much more complicated.',credits:1000,ship:true,shipName:'Wayward Star',framework:'Obligation',frameworkType:'Debt',frameworkValue:15,rep:{Local:2},scenarios:{hotCargo:{name:'Hot Cargo',summary:'A routine shipment becomes dangerous when someone else decides the cargo belongs to them.',type:'smuggling',env:'hangar',threat:2},blockade:{name:'Needle the Blockade',summary:'Move contraband through an active inspection cordon without losing the cargo or the ship.',type:'smuggling',env:'asteroid',threat:3},wrongBuyer:{name:'The Wrong Buyer',summary:'The buyer is missing, the replacement is suspicious, and the cargo is suddenly worth killing for.',type:'smuggling',env:'cantina',threat:2}}},
  salvager:{name:'Outer Rim Salvager',tag:'Exploration start',summary:'Begin with a battered scout ship, a scanner, and a lead on a wreck that may pay for months of repairs—or attract the wrong attention.',credits:600,ship:true,shipName:'Rustwing',framework:'Obligation',frameworkType:'Responsibility',frameworkValue:10,rep:{Local:3},starterGear:['scanner'],scenarios:{deadBeacon:{name:'Dead Beacon',summary:'A weak distress signal points toward a recently exposed wreck site.',type:'salvage',env:'crash',threat:2},derelict:{name:'The Silent Derelict',summary:'A drifting vessel still has power in places, but nobody answers hails.',type:'salvage',env:'passage',threat:3},buriedSignal:{name:'Buried Signal',summary:'A scanner echo beneath shifting dunes suggests something valuable survived below.',type:'salvage',env:'desert',threat:3}}},
  force:{name:'Force-Touched Wanderer',tag:'Mystery start',summary:'Begin with a small ship and a disturbing Force vision. If the character is not already Force-sensitive, this start grants the Force Sensitive Exile universal specialization and Force Rating 1.',credits:250,ship:true,shipName:"Pilgrim's Lantern",framework:'Morality',frameworkType:'Compassion / Hatred',frameworkValue:50,rep:{},grantForce:true,scenarios:{ruinedShrine:{name:'The Ruined Shrine',summary:'A recurring vision draws the crew toward a forgotten shrine above a dangerous mountain pass.',type:'force',env:'mountain',threat:2},darkEcho:{name:'Echo Beneath the Ice',summary:'Something beneath a frozen cavern answers the character’s dreams with a presence that feels aware.',type:'force',env:'icecave',threat:3},missingAdept:{name:'The Missing Adept',summary:'Rumors of another untrained Force-sensitive lead into a jungle where Imperial hunters are already searching.',type:'force',env:'jungle',threat:3}}}
};

function startingOrigin(){return STARTING_ORIGINS[S.origin]||STARTING_ORIGINS.sable}
function startingScenario(){let o=startingOrigin();return o.scenarios[S.startScenario]||Object.values(o.scenarios)[0]}
function trainingTarget(rank){return 2+Math.max(0,Math.min(4,rank||0))}

function syncCustomCrew(){
  S.customCrew=Array.isArray(S.customCrew)?S.customCrew:[];
  let wanted=new Set(S.customCrew.map(c=>c.id));
  for(let i=CREW.length-1;i>=0;i--)if(CREW[i].custom&&!wanted.has(CREW[i].id))CREW.splice(i,1);
  S.crewLoadout=S.crewLoadout||{};S.approval=S.approval||{};S.crewProgress=S.crewProgress||{};S.crewState=S.crewState||{};
  for(const rec of S.customCrew){
    rec.custom=true;rec.c={...rec.c};rec.sk={...rec.sk};rec.specialties=Array.isArray(rec.specialties)?rec.specialties:Object.keys(rec.sk||{}).slice(0,5);
    let existing=CREW.find(c=>c.id===rec.id);if(existing)Object.assign(existing,rec);else CREW.push(rec);
    CREW_SPECIALTIES[rec.id]=rec.specialties;
    COMPANION_PERKS[rec.id]=[
      {id:'customExpert',name:'Signature Expertise',cost:10,desc:'Gain 1 Boost when using one of this recruit’s specialty skills.',effect:'customExpert'},
      {id:'customHardened',name:'Hardened Crew',cost:15,desc:'Increase this recruit’s wound threshold by 2.',effect:'customHardened'}
    ];
    COMPANION_DIALOGUE[rec.id]={
      intro:`${rec.name} checks their kit and waits for the next order. “I signed on because this crew looked like it was going somewhere.”`,
      past:`“I had a life before this ship. I’m not hiding it. I’m just deciding how much of it I want following me.”`,
      trusted:`“You’ve made room for me to matter here. I notice things like that.”`,
      loyal:`“This stopped being just a berth and a paycheck a while ago. I’m with the crew.”`,
      wary:`“I’ll do my part. Just don’t ask me to pretend trust comes free.”`
    };
    let p=rec.specialties[0]||'Vigilance',q=rec.specialties[1]||p;
    COMPANION_QUESTS[rec.id]={name:'A Place in the Crew',summary:`${rec.name} has unfinished business connected to their life before joining the crew.`,stages:[{skill:p,diff:2,text:`Use ${p} to follow the first lead.`},{skill:q,diff:3,text:`Use ${q} to settle the matter on the crew’s terms.`}],reward:`${rec.name} decides that this crew is where they belong.`};
    S.crewLoadout[rec.id]={weapon:null,armor:null,...(S.crewLoadout[rec.id]||{})};
    if(!Number.isFinite(S.approval[rec.id]))S.approval[rec.id]=0;
    if(!S.crewProgress[rec.id])S.crewProgress[rec.id]={xp:0,skillBonus:{},perks:[],role:rec.defaultRole||'assault',talked:{},quest:{status:'locked',stage:0}};
  }
  S.crew=Array.isArray(S.crew)?S.crew.filter(id=>CREW.some(c=>c.id===id)):['kira','lena'];
  if(!S.crew.length&&CREW.some(c=>c.id==='kira'))S.crew=['kira'];
}

function ensurePhase46State(){
  ensurePhase45State();S.schemaVersion=52;
  if(!S.origin)S.origin=S.finalized?'legacy':'sable';
  if(S.origin!=='legacy'&&!STARTING_ORIGINS[S.origin])S.origin='sable';
  if(S.origin==='legacy')S.originApplied=true;
  if(S.origin!=='legacy'){let o=STARTING_ORIGINS[S.origin];if(!S.startScenario||!o.scenarios[S.startScenario])S.startScenario=Object.keys(o.scenarios)[0]}
  if(S.originApplied===undefined)S.originApplied=!!S.finalized;
  S.training=S.training||{};S.training.skills=S.training.skills||{};S.training.sessions=Number.isFinite(S.training.sessions)?S.training.sessions:0;
  S.customCrew=Array.isArray(S.customCrew)?S.customCrew:[];
  syncCustomCrew();
}
const _p46Ensure16=ensurePhase16State;
ensurePhase16State=function(){_p46Ensure16();ensurePhase46State()};

function injectPhase46UI(){
  if(!$('originSetup46')){let c=document.createElement('div');c.id='originSetup46';c.className='card';c.style.marginTop='12px';$('identity').appendChild(c)}
  if(!$('studyDowntime46')&&$('campaignSystems43')){
    let grids=$('campaignSystems43').querySelectorAll('.grid.g2'),grid=grids[1];
    if(grid){let c=document.createElement('div');c.id='studyDowntime46';c.className='card';let ledger=$('campaignLedger')?.closest('.card');if(ledger)grid.insertBefore(c,ledger);else grid.appendChild(c)}
  }
  if(!$('customCrewBuilder46')){
    let c=document.createElement('div');c.id='customCrewBuilder46';c.className='card';c.style.marginTop='12px';$('crewCards').parentNode.insertBefore(c,$('crewCards'))
  }
  if(!$('droidProgramStatus')&&$('droidWorkshop43')){let d=document.createElement('div');d.id='droidProgramStatus';d.className='check';d.style.marginTop='9px';$('droidRoster').parentNode.insertBefore(d,$('droidRoster'))}
}

function setStartingOrigin(id){
  if(S.finalized||!STARTING_ORIGINS[id])return;S.origin=id;S.startScenario=Object.keys(STARTING_ORIGINS[id].scenarios)[0];let o=STARTING_ORIGINS[id];
  if(o.framework){S.framework=o.framework;S.frameworkType=o.frameworkType;S.frameworkValue=o.frameworkValue}
  renderAll()
}
function renderOriginChooser(){
  injectPhase46UI();ensurePhase46State();let box=$('originSetup46');
  if(S.origin==='legacy'){box.innerHTML=`<div class="row"><div><b>Campaign Beginning</b><div class="small">This is an existing save migrated from Phase 45. Its original starting state is preserved.</div></div><span class="tag">LEGACY SAVE</span></div>`;return}
  let o=startingOrigin(),sc=startingScenario();
  box.innerHTML=`<div class="row"><div><b>Choose Your Beginning</b><div class="small">Your beginning changes starting resources and the opening scenario. It does not change species, career, or XP creation rules.</div></div><span class="tag">PHASE 46</span></div>
    <div class="grid g2" style="margin-top:10px"><label>Campaign beginning<select id="startOriginSelect" ${S.finalized?'disabled':''}>${Object.entries(STARTING_ORIGINS).map(([k,v])=>`<option value="${k}" ${k===S.origin?'selected':''}>${v.name}</option>`).join('')}</select></label><label>Opening scenario<select id="startScenarioSelect" ${S.finalized?'disabled':''}>${Object.entries(o.scenarios).map(([k,v])=>`<option value="${k}" ${k===S.startScenario?'selected':''}>${v.name}</option>`).join('')}</select></label></div>
    <div class="phase46-preview" style="margin-top:10px"><div class="row"><div><b>${o.name}</b><div class="tiny">${o.tag}</div></div><span class="pill">${o.ship?'Starter ship':'No ship yet'}</span></div><div class="small" style="margin-top:6px">${o.summary}</div><hr><b>${sc.name}</b><div class="small">${sc.summary}</div><div class="tiny" style="margin-top:7px">Start: ${o.credits} cr${o.framework?` · ${o.framework}: ${o.frameworkType} ${o.frameworkValue}`:''}${o.ship?` · ${o.shipName}`:''}${o.grantForce?' · grants Force Sensitive Exile / FR 1 if needed':''}</div></div>`;
  $('startOriginSelect').onchange=()=>setStartingOrigin($('startOriginSelect').value);
  $('startScenarioSelect').onchange=()=>{S.startScenario=$('startScenarioSelect').value;renderReview();renderOriginChooser()};
}
const _p46RenderIdentity=renderIdentity;
renderIdentity=function(){ensurePhase46State();injectPhase46UI();_p46RenderIdentity();renderOriginChooser()};

function applyStartingOrigin(){
  ensurePhase46State();if(S.originApplied||S.origin==='legacy')return;let o=startingOrigin(),sc=startingScenario();S.originApplied=true;S.credits=o.credits;
  if(o.framework){S.framework=o.framework;S.frameworkType=o.frameworkType;S.frameworkValue=o.frameworkValue}
  ensureInventory();for(const id of o.starterGear||[])if(ITEMS[id]&&!S.inventory.includes(id))S.inventory.push(id);
  if(o.grantForce&&S.forceRating<1){if(!S.universalSpecs.includes('Force Sensitive Exile'))S.universalSpecs.push('Force Sensitive Exile');S.universalTalents['Force Sensitive Exile']=S.universalTalents['Force Sensitive Exile']||new Set();S.forceRating=1}
  if(o.ship){
    S.scene=5;S.ep15.initialized=false;ensurePhase15State();for(const [id,q] of Object.entries(S.ep15.quests||{}))if(id!=='main')q.status='complete';S.ep15.flags.originSkipped=true;S.ep15.location='orbit';
    S.ship.owned=true;S.ship.model='hwk290';ensurePhase14State();S.ship.name=o.shipName||S.ship.name;S.ship.location='sable';
    for(const [f,n] of Object.entries(o.rep||{}))S.ep15.rep[f]=(S.ep15.rep[f]||0)+n;
    if(sc.type){let op=buildOperation(sc.type,sc.threat,sc.env);op.title=sc.name;op.hook=sc.summary;op.source=`Sable Reach original start · ${o.name}`;op.status='active';S.gmOps.current=op;S.gmOps.board=[];gLog(`Opening scenario: ${sc.name}. ${sc.summary}`)}
  }else gLog(`Opening scenario: ${sc.name}. ${sc.summary}`);
  bLog(`Campaign beginning applied: ${o.name}.`);safeAutosave()
}
const _p46Finalize=finalize;
finalize=function(){let was=S.finalized;_p46Finalize();if(!was&&S.finalized){applyStartingOrigin();renderAll();renderNavTab(S.origin==='sable'?'adventure':'gm')}};
if($('finalize'))$('finalize').onclick=finalize;

const _p46RenderReview=renderReview;
renderReview=function(){_p46RenderReview();ensurePhase46State();if(!$('reviewBody'))return;let o=S.origin==='legacy'?null:startingOrigin(),sc=S.origin==='legacy'?null:startingScenario();let d=document.createElement('div');d.className='card';d.style.marginTop='10px';d.innerHTML=S.origin==='legacy'?'<b>Beginning</b><div class="small">Existing migrated campaign — starting state preserved.</div>':`<b>Beginning</b><div class="small">${o.name} · ${sc.name}</div><div class="tiny" style="margin-top:5px">${sc.summary}</div>`;$('reviewBody').appendChild(d);if(!S.finalized)$('finalize').textContent=S.origin==='sable'?'Finalize Character & Start Episode 0':'Finalize Character & Start Scenario'};

function studySkillSession(){
  ensurePhase46State();let skill=$('studySkill46')?.value||GENERAL_SKILLS[0],rank=S.skills[skill]||0;if(rank>=5){bLog(`${skill} is already rank 5.`);return}
  let diff=Math.min(5,rank+1),q=actorPool(actorById('pc'),skill,{diff,commit:false}),r=rollNarr(q.p),rec=S.training.skills[skill]||(S.training.skills[skill]={progress:0});
  let gain=r.ok?1+Math.floor(Math.max(0,r.na)/2)+(r.tr?1:0):(r.na>=3?1:0),target=trainingTarget(rank);rec.progress+=gain;S.training.sessions++;
  if(rec.progress>=target){rec.progress-=target;S.skills[skill]=rank+1;bLog(`Study breakthrough: ${skill} increases to rank ${rank+1}. ${rtxt(r)}`)}
  else bLog(`Study session — ${skill}: ${gain?`+${gain} training progress`:'no progress'} (${rec.progress}/${target}). ${rtxt(r)}`);
  ledgerEntry(0,`Study session — ${skill}`);renderAll()
}
function renderStudyDowntime(){
  injectPhase46UI();ensurePhase46State();let box=$('studyDowntime46');if(!box)return;let current=$('studySkill46')?.value||GENERAL_SKILLS[0];
  box.innerHTML=`<b>Study / Training</b><div class="small">Spend downtime practicing a skill instead of taking paid work. Repeated successful study sessions can directly increase the PC’s skill rank. This is an original Sable Reach long-form progression option, separate from FFG XP advancement.</div><label style="display:block;margin-top:8px">Skill to study<select id="studySkill46">${GENERAL_SKILLS.map(s=>`<option ${s===current?'selected':''}>${s}</option>`).join('')}</select></label><div id="studyProgress46" class="check" style="margin-top:8px"></div><button id="studyButton46" class="btn primary" style="margin-top:8px">Study Session</button>`;
  function update(){let skill=$('studySkill46').value,rank=S.skills[skill]||0,rec=S.training.skills[skill]||{progress:0},target=trainingTarget(rank);$('studyProgress46').innerHTML=rank>=5?`<span class="good"><b>${skill} 5</b> — mastered.</span>`:`<b>${skill} ${rank} → ${rank+1}</b><div class="small">Training progress ${rec.progress}/${target} · practice difficulty ${acquisitionLabel(Math.min(5,rank+1))}</div>`;$('studyButton46').disabled=rank>=5}
  $('studySkill46').onchange=update;$('studyButton46').onclick=studySkillSession;update();
  let dt=$('downtimeSkill')?.closest('.card')?.querySelector('.small');if(dt)dt.textContent='A compact solo-game layer for paid work, training, and recovery between operations.'
}
const _p46RenderCampaign43=renderCampaign43;
renderCampaign43=function(){_p46RenderCampaign43();renderStudyDowntime()};

function customCrewDraft(){
  let species=$('customCrewSpecies46')?.value||'human',archId=$('customCrewArchetype46')?.value||'vanguard',arch=CUSTOM_CREW_ARCHETYPES[archId],sp=SPECIES[species]||SPECIES.human,c={...sp.c};
  for(const [k,v] of Object.entries(arch.mods||{}))c[k]=Math.min(4,(c[k]||1)+v);
  let sk={...(sp.free||{}),...(arch.skills||{})},primary=$('customCrewPrimary46')?.value||arch.defaults[0],secondary=$('customCrewSecondary46')?.value||arch.defaults[1];sk[primary]=Math.max(sk[primary]||0,2);sk[secondary]=Math.max(sk[secondary]||0,1);
  return{species,archId,arch,sp,c,sk,primary,secondary}
}
function createCustomCrew(){
  ensurePhase46State();if(S.customCrew.length>=8){bLog('Custom crew limit reached (8).');return}let name=($('customCrewName46')?.value||'').trim();if(!name){bLog('Give the recruit a name first.');return}let d=customCrewDraft(),id=`crew-${Date.now()}-${Math.floor(Math.random()*10000)}`,specialties=[d.primary,d.secondary,...Object.keys(d.arch.skills||{})].filter((x,i,a)=>x&&a.indexOf(x)===i).slice(0,6);
  let rec={id,name,custom:true,species:d.species,archetype:d.archId,role:`${d.sp.name} ${d.arch.name}`,c:d.c,sk:d.sk,weapon:d.arch.weapon,armor:d.arch.armor,wt:d.sp.wt+d.c.Brawn,st:d.sp.st+d.c.Willpower,def:0,specialties,defaultRole:d.archId==='technician'||d.archId==='medic'||d.archId==='face'?'support':d.archId==='vanguard'?'guard':'assault'};
  S.customCrew.push(rec);syncCustomCrew();$('customCrewName46').value='';bLog(`${name} joined the roster as a custom ${d.arch.name}.`);renderAll()
}
function renameCustomCrew(id){let c=S.customCrew.find(x=>x.id===id);if(!c)return;let n=prompt('Rename crew member',c.name);if(!n?.trim())return;c.name=n.trim();syncCustomCrew();renderAll()}
function dismissCustomCrew(id){let c=S.customCrew.find(x=>x.id===id);if(!c||!confirm(`Dismiss ${c.name} from the roster?`))return;S.customCrew=S.customCrew.filter(x=>x.id!==id);S.crew=S.crew.filter(x=>x!==id);if(!S.crew.length)S.crew=['kira'];for(const st of Object.keys(S.ship?.stations||{}))if(S.ship.stations[st]===id)S.ship.stations[st]='pc';if(S.crewConversation===id)S.crewConversation='kira';syncCustomCrew();bLog(`${c.name} left the crew.`);renderAll()}
function renderCustomCrewBuilder(){
  injectPhase46UI();ensurePhase46State();let box=$('customCrewBuilder46');if(!box)return;
  if(!box.dataset.ready){box.innerHTML=`<div class="row"><div><b>Custom Crew Builder</b><div class="small">Create original recruits that use the same party skill checks, combat roles, equipment assignment, ship stations, approval, and companion XP systems as the built-in crew.</div></div><span class="tag">ORIGINAL CREW</span></div><div class="grid g3" style="margin-top:10px"><label>Name<input id="customCrewName46" placeholder="Recruit name"></label><label>Species<select id="customCrewSpecies46"></select></label><label>Archetype<select id="customCrewArchetype46"></select></label><label>Primary specialty<select id="customCrewPrimary46"></select></label><label>Secondary specialty<select id="customCrewSecondary46"></select></label><div><button id="createCustomCrew46" class="btn primary" style="width:100%;margin-top:24px">Add Recruit</button></div></div><div id="customCrewPreview46" class="phase46-preview" style="margin-top:10px"></div><div id="customCrewRoster46" class="phase46-roster" style="margin-top:10px"></div><div class="source-note">Custom recruits are an original Sable Reach videogame system. Species characteristics seed the template; species narrative abilities and unique published NPC stat blocks are not silently added.</div>`;box.dataset.ready='1';$('customCrewSpecies46').innerHTML=Object.entries(SPECIES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');$('customCrewArchetype46').innerHTML=Object.entries(CUSTOM_CREW_ARCHETYPES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('');$('customCrewPrimary46').innerHTML=GENERAL_SKILLS.map(s=>`<option>${s}</option>`).join('');$('customCrewSecondary46').innerHTML=GENERAL_SKILLS.map(s=>`<option>${s}</option>`).join('');let setDefaults=()=>{let a=CUSTOM_CREW_ARCHETYPES[$('customCrewArchetype46').value];$('customCrewPrimary46').value=a.defaults[0];$('customCrewSecondary46').value=a.defaults[1];updatePreview()};let updatePreview=()=>{let d=customCrewDraft();$('customCrewPreview46').innerHTML=`<div class="row"><div><b>${d.sp.name} ${d.arch.name}</b><div class="small">${d.arch.desc}</div></div><span class="pill">WT ${d.sp.wt+d.c.Brawn} · ST ${d.sp.st+d.c.Willpower}</span></div><div class="pills" style="margin-top:7px">${Object.entries(d.c).map(([k,v])=>`<span class="pill">${k} ${v}</span>`).join('')}</div><div class="tiny" style="margin-top:7px">Skills: ${Object.entries(d.sk).filter(x=>x[1]).map(([k,v])=>`${k} ${v}`).join(' · ')} · ${WEAPONS[d.arch.weapon]?.name||d.arch.weapon} · ${ARMOR[d.arch.armor]?.name||d.arch.armor}</div>`};$('customCrewArchetype46').onchange=setDefaults;$('customCrewSpecies46').onchange=updatePreview;$('customCrewPrimary46').onchange=updatePreview;$('customCrewSecondary46').onchange=updatePreview;$('createCustomCrew46').onclick=createCustomCrew;setDefaults()}
  let roster=$('customCrewRoster46');roster.innerHTML=S.customCrew.map(c=>`<div class="item"><div class="row"><div><b>${opEsc(c.name)}</b><div class="tiny">${opEsc(c.role)} · ${S.crew.includes(c.id)?'ACTIVE':'reserve'}</div></div><div class="pills"><button class="btn" data-custom-rename="${c.id}">Rename</button><button class="btn danger" data-custom-dismiss="${c.id}">Dismiss</button></div></div></div>`).join('')||'<div class="small">No custom recruits yet. Built-in companions remain available below.</div>';document.querySelectorAll('[data-custom-rename]').forEach(b=>b.onclick=()=>renameCustomCrew(b.dataset.customRename));document.querySelectorAll('[data-custom-dismiss]').forEach(b=>b.onclick=()=>dismissCustomCrew(b.dataset.customDismiss));$('createCustomCrew46').disabled=S.customCrew.length>=8
}
const _p46RenderCrewManagement=renderCrewManagement;
renderCrewManagement=function(){ensurePhase46State();injectPhase46UI();_p46RenderCrewManagement();renderCustomCrewBuilder()};
const _p46ActorWT=actorWT;actorWT=function(id){let n=_p46ActorWT(id),c=CREW.find(x=>x.id===id);return c?.custom&&crewHasPerk(id,'customHardened')?n+2:n};
const _p46CrewRoleBoost=crewRoleBoost;crewRoleBoost=function(actor,skill,target=null){let b=_p46CrewRoleBoost(actor,skill,target),c=CREW.find(x=>x.id===actor?.id);if(c?.custom&&crewHasPerk(c.id,'customExpert')&&(CREW_SPECIALTIES[c.id]||[]).includes(skill))b++;return b};
const _p46FactionReaction=factionReaction;factionReaction=function(id){let base=_p46FactionReaction(id);if(base)return base;let c=CREW.find(x=>x.id===id);return S.flags.faction&&c?.custom?`${c.name} considers the decision to work with ${S.flags.faction}. “I joined the crew to have a say in where we stand. I can live with this—for now.”`:'The Cipher Core decision has not been made yet.'};

const _p46RenderDroidWorkshop=renderDroidWorkshop;
renderDroidWorkshop=function(){let oldPending=$('droidPending')?.value,oldDirective=$('droidDirective')?.value,oldSkill=$('droidFlexSkill')?.value;_p46RenderDroidWorkshop();injectPhase46UI();ensurePhase46State();S.crafting.pendingDroids=S.crafting.pendingDroids.filter(id=>S.droids.some(d=>d.id===id&&d.status==='unprogrammed'));let sel=$('droidPending'),dir=$('droidDirective'),skill=$('droidFlexSkill'),btn=$('programDroid'),status=$('droidProgramStatus');if(!sel)return;if(!S.crafting.pendingDroids.length){sel.innerHTML='<option value="">No unprogrammed chassis — construct one in the Workshop first</option>';sel.disabled=true;dir.disabled=true;skill.disabled=true;btn.disabled=true;status.innerHTML='<b>No chassis awaiting programming.</b><div class="small">Choose a droid chassis in the Workshop, acquire its materials, and construct it. The finished chassis will appear here automatically.</div>'}else{sel.disabled=false;dir.disabled=false;skill.disabled=false;sel.innerHTML=S.crafting.pendingDroids.map(id=>{let d=S.droids.find(x=>x.id===id);return `<option value="${id}">${d?.name||id}</option>`}).join('');if(oldPending&&S.crafting.pendingDroids.includes(oldPending))sel.value=oldPending;if(oldDirective&&[...dir.options].some(o=>o.value===oldDirective))dir.value=oldDirective;if(oldSkill&&[...skill.options].some(o=>o.value===oldSkill))skill.value=oldSkill;btn.disabled=false;let d=S.droids.find(x=>x.id===sel.value);status.innerHTML=`<b>${d?.name||'Chassis ready'}</b><div class="small">Select a directive and program the chassis. Failed programming leaves the chassis intact for another attempt.</div>`}};

const _p46RenderGuide=renderGuide;renderGuide=function(){_p46RenderGuide();ensurePhase46State();if(S.finalized&&S.origin!=='sable'&&S.origin!=='legacy'&&S.gmOps?.current&&$('guideObjective'))$('guideObjective').innerHTML=`<b>Opening scenario: ${opEsc(S.gmOps.current.title)}</b><div class="tiny" style="margin-top:4px">${opEsc(S.gmOps.current.hook)} · Continue in Operations Director.</div>`};

RULE_AUDIT.unshift(
 {id:'origins46',name:'Selectable campaign beginnings',status:'adapted',source:'Original Sable Reach campaign layer',detail:'Six beginnings alter starting resources, campaign framework, reputation, ship access, and an opening scenario. Alternate openings feed the existing procedural Operations Director rather than reproducing published adventures.'},
 {id:'study46',name:'Downtime study progression',status:'adapted',source:'Original Sable Reach downtime system',detail:'Repeated study checks build training progress and can increase a PC skill without spending XP. This is an optional videogame progression layer, not an FFG tabletop advancement rule.'},
 {id:'customCrew46',name:'Custom recruit builder',status:'adapted',source:'Original Sable Reach companion system',detail:'Custom recruits use species-based characteristic seeds plus original archetype templates and participate in party checks, combat roles, equipment, ship stations, approval, companion XP, and generic loyalty content.'}
);

const _p46Phase45Diagnostics=phase45Diagnostics;
phase45Diagnostics=function(){let rows=_p46Phase45Diagnostics();const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});add('Phase 46 origins',Object.keys(STARTING_ORIGINS).length>=6&&Object.values(STARTING_ORIGINS).every(o=>Object.keys(o.scenarios||{}).length>=1),`${Object.keys(STARTING_ORIGINS).length} beginnings`);add('Phase 46 custom crew templates',Object.keys(CUSTOM_CREW_ARCHETYPES).length>=7,`${Object.keys(CUSTOM_CREW_ARCHETYPES).length} archetypes`);add('Phase 46 training state',!!S.training&&!!S.training.skills,'study progression initialized');add('Droid programming empty state',!!$('droidPending')&&$('droidPending').options.length>=1,'selector always renders a usable placeholder or chassis');return rows};

const _p46RenderAll=renderAll;
renderAll=function(){ensurePhase46State();injectPhase46UI();_p46RenderAll();renderStudyDowntime();renderCustomCrewBuilder();renderOriginChooser()};

const _p46SmokeBase=runSableReachSmoke;
runSableReachSmoke=async function(){let report=await _p46SmokeBase();const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};test('Phase 46 schema target',()=>BUILD_INFO.saveSchema===52&&S.schemaVersion===52&&serializableState().schemaVersion===52);test('Phase 46 has six selectable beginnings',()=>Object.keys(STARTING_ORIGINS).length===6);test('Phase 46 alternate starts have scenario choices',()=>['guild','rebel','trader','salvager','force'].every(k=>Object.keys(STARTING_ORIGINS[k].scenarios).length>=3));test('Phase 46 has seven custom crew archetypes',()=>Object.keys(CUSTOM_CREW_ARCHETYPES).length===7);test('Phase 46 study target scales with rank',()=>trainingTarget(0)===2&&trainingTarget(4)===6);renderEquipment();test('Phase 46 droid selector never renders empty/broken',()=>!!$('droidPending')&&$('droidPending').options.length>=1);document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report};


/* =========================
   PHASES 47–48 — LIVING ORIGINS & DEEP CREW
   Linked origin mini-campaigns · branching consequences · recruit opportunities
   Advanced custom crew profiles · career/spec identity · personalized loyalty hooks
   ========================= */

const CREW_MOTIVATIONS_48=['Belonging','Credits','Duty','Freedom','Knowledge','Justice','Revenge','Survival','Family','Adventure','Power','Redemption'];
const CREW_PERSONALITIES_48=['Calm and precise','Dry and observant','Warm but guarded','Idealistic','Pragmatic','Reckless','Suspicious','Protective','Curious','Stoic','Charming','Intense'];

const ORIGIN_RECRUITS_47={
  guild:{name:'Kess Var',callsign:'Latch',species:'duros',archetype:'scout',career:'Bounty Hunter',specialization:'Skip Tracer',motivation:'Justice',personality:'Dry and observant',background:'A freelance tracker who learned that guild paperwork can hide as much truth as it reveals.',goal:'Build a reputation without becoming somebody else’s weapon.'},
  rebel:{name:'Mira Dane',callsign:'Patch',species:'human',archetype:'medic',career:'Soldier',specialization:'Medic',motivation:'Duty',personality:'Protective',background:'A field medic who has moved between isolated Rebel cells and knows what happens when command forgets the people behind the objective.',goal:'Keep the cell alive long enough to matter.'},
  trader:{name:'Bex Ralo',callsign:'Ledger',species:'twilek',archetype:'face',career:'Smuggler',specialization:'Charmer',motivation:'Freedom',personality:'Charming',background:'A broker and occasional fence who can read a bad contract before the first signature dries.',goal:'Buy out every debt that ever owned a piece of their life.'},
  salvager:{name:'Daro Venn',callsign:'Sparks',species:'sullustan',archetype:'technician',career:'Engineer',specialization:'Mechanic',motivation:'Knowledge',personality:'Curious',background:'A wreck-diver who treats broken ships like crime scenes and keeps a private catalog of strange salvage.',goal:'Find one discovery important enough to put their name on a star chart.'},
  force:{name:'Nia Sol',callsign:'Hush',species:'mirialan',archetype:'scout',career:'Seeker',specialization:'Pathfinder',motivation:'Redemption',personality:'Warm but guarded',background:'A wanderer who has survived too many coincidences to dismiss the Force, but fears anyone who claims to understand it completely.',goal:'Learn what the Force is asking without surrendering the right to choose.'}
};

const ORIGIN_ARCS_47={
  guild:{
    title:'The Writ and the Lie',contact:'Guild Factor Vessa Rook',rival:'Hunter Jorad Keln',summary:'A routine contract exposes falsified guild records, rival hunters, and a client who expects obedience more than results.',
    stages:{
      opening:{label:'Opening Contract',useOpening:true,next:'ledger',recruitStage:true,choices:[
        {id:'writ',label:'Honor the writ',text:'Treat the posted contract as binding unless hard evidence proves otherwise.',effects:{rep:{Guild:2}},flag:'guildCode'},
        {id:'truth',label:'Follow the lie',text:'Prioritize the hidden truth even if it embarrasses the Guild.',effects:{rep:{Local:2}},flag:'guildTruth'}]},
      ledger:{title:"The Broker's Ledger",hook:'A hidden broker kept duplicate contracts showing who changed the bounty terms and when.',type:'bounty',env:'cantina',threat:3,patron:'Vessa Rook',next:'crossfire'},
      crossfire:{title:'Crossfire at Kestrel Yard',hook:'The rival hunter corners the same evidence in a salvage yard full of witnesses and loaded weapons.',type:'bounty',env:'junkyard',threat:3,patron:'Guild Arbitration Office',choices:[
        {id:'takeAlive',label:'Take the rival alive',text:'Bring Jorad in and force the Guild to hear the whole story.',next:'finaleLaw',effects:{rep:{Guild:2},approval:1}},
        {id:'burnNetwork',label:'Burn the network',text:'Destroy the falsified contract pipeline and let the rival run.',next:'finaleTruth',effects:{rep:{Local:2},approval:-1}}]},
      finaleLaw:{title:'Terms of the Contract',hook:'The final hearing becomes a live operation when the client attempts to erase every witness to the forged bounty.',type:'bounty',env:'detention',threat:4,patron:'Guild Arbitration Office',complete:true},
      finaleTruth:{title:'The Burn Notice',hook:'Exposing the contract network puts the crew on a private kill list. The only way out is to hit the sponsor before the sponsor hits first.',type:'bounty',env:'hangar',threat:4,patron:'Anonymous Guild Dissidents',complete:true}
    },finalReward:{credits:750,xp:10,rep:{Guild:2}}
  },
  rebel:{
    title:'Ghosts in the Chain',contact:'Commander Elya Venn',rival:'ISB Lieutenant Corven Daal',summary:'A field assignment grows into a hunt for the leak compromising an entire Rebel network.',
    stages:{
      opening:{label:'Opening Mission',useOpening:true,next:'relay',recruitStage:true,choices:[
        {id:'people',label:'Protect the people first',text:'Keep operatives and civilians alive even if intelligence slips away.',effects:{rep:{Rebels:2},duty:1,approval:1},flag:'rebelPeople'},
        {id:'intel',label:'Protect the network first',text:'Preserve the intelligence chain even if extraction becomes harder.',effects:{rep:{Rebels:2},duty:2},flag:'rebelIntel'}]},
      relay:{title:'Ghost Relay',hook:'A burst transmitter is still calling dead drop sites that should have been abandoned months ago.',type:'rebel',env:'lab',threat:3,patron:'Commander Elya Venn',next:'mole'},
      mole:{title:'A Name in the Static',hook:'The leak is not a single traitor but a compromised chain of couriers. One can still be extracted before the ISB closes in.',type:'rescue',env:'detention',threat:3,patron:'Alliance Intelligence',choices:[
        {id:'extract',label:'Extract the compromised courier',text:'Risk the cell to save the operative and learn what the ISB knows.',next:'finalePeople',effects:{rep:{Rebels:2},approval:1}},
        {id:'cutLine',label:'Cut the line cleanly',text:'Destroy the network before the Empire can use it again.',next:'finaleIntel',effects:{rep:{Rebels:1},duty:2}}]},
      finalePeople:{title:'No Names Left Behind',hook:'The rescued courier identifies the ISB strike team. The crew gets one chance to turn an extraction into a counter-ambush.',type:'rebel',env:'battlefield',threat:4,patron:'Commander Elya Venn',complete:true},
      finaleIntel:{title:'The Quiet Victory',hook:'With the network burned, the crew must plant a false replacement chain and lure the ISB into believing its operation succeeded.',type:'heist',env:'lab',threat:4,patron:'Alliance Intelligence',complete:true}
    },finalReward:{credits:500,xp:10,rep:{Rebels:3},duty:3}
  },
  trader:{
    title:'A Cargo Worth Owing',contact:'Factor Sela Vorn',rival:'Collector Brann Sesk',summary:'One shipment ties the crew’s debt to a much larger smuggling arrangement and forces a decision about what kind of traders they intend to become.',
    stages:{
      opening:{label:'Opening Run',useOpening:true,next:'manifest',recruitStage:true,choices:[
        {id:'clean',label:'Keep the books clean',text:'Deliver what was agreed and document every change to the cargo.',effects:{rep:{Local:2},approval:1},flag:'traderClean'},
        {id:'side',label:'Take the side deal',text:'Accept a second buyer and use the extra margin to attack the debt.',effects:{rep:{Hutts:1},obligation:-1},flag:'traderSide'}]},
      manifest:{title:'The Broken Manifest',hook:'The cargo numbers do not match the shipment. Somebody has hidden a second consignment inside the first.',type:'smuggling',env:'hangar',threat:3,patron:'Factor Sela Vorn',next:'passage'},
      passage:{title:'Terms of Passage',hook:'A collector offers safe transit in exchange for taking control of the crew’s debt contract.',type:'smuggling',env:'asteroid',threat:3,patron:'Collector Brann Sesk',choices:[
        {id:'buyout',label:'Buy your freedom',text:'Use the run to force a clean debt settlement.',next:'finaleFree',effects:{obligation:-3,rep:{Local:2}}},
        {id:'leverage',label:'Keep the leverage',text:'Keep the debt alive long enough to turn it against the people who own it.',next:'finaleLeverage',effects:{rep:{Hutts:2}}}]},
      finaleFree:{title:'Free and Clear',hook:'The creditor agrees to a final settlement—then sends armed collectors to change the terms.',type:'smuggling',env:'cantina',threat:4,patron:'Factor Sela Vorn',complete:true},
      finaleLeverage:{title:'Debt Comes Due',hook:'The crew follows the paper trail to the syndicate clearinghouse where dozens of predatory contracts are stored.',type:'heist',env:'detention',threat:4,patron:'Bex Ralo',complete:true}
    },finalReward:{credits:1000,xp:10,obligation:-3,rep:{Local:2}}
  },
  salvager:{
    title:'What the Wreck Remembered',contact:'Surveyor Pell Tannis',rival:'Claim-Jumper Rake Morn',summary:'A valuable wreck points toward something deliberately erased from the charts, and every piece of salvage makes the secret more dangerous.',
    stages:{
      opening:{label:'First Claim',useOpening:true,next:'blackbox',recruitStage:true,choices:[
        {id:'rescue',label:'Search for survivors first',text:'Treat distress signals as people before profit.',effects:{rep:{Local:2},approval:1},flag:'salvageRescue'},
        {id:'claim',label:'Secure the claim first',text:'Lock down the site before scavengers strip it bare.',effects:{rep:{Guild:1}},flag:'salvageClaim'}]},
      blackbox:{title:'The Black Box',hook:'The wreck’s recorder references a route that does not exist on public charts and a cargo marked only with an old survey code.',type:'salvage',env:'crash',threat:3,patron:'Surveyor Pell Tannis',next:'jumpers'},
      jumpers:{title:'Claim Jumpers',hook:'Rake Morn arrives with forged salvage rights and enough hired muscle to make the paperwork feel optional.',type:'salvage',env:'junkyard',threat:3,patron:'Outer Rim Survey Cooperative',choices:[
        {id:'share',label:'Share the coordinates',text:'Cut Rake in and keep the expedition from becoming a blood feud.',next:'finaleMemory',effects:{rep:{Local:2},approval:1}},
        {id:'race',label:'Race them to the source',text:'Keep the route secret and reach the hidden site first.',next:'finaleVault',effects:{rep:{Guild:2}}}]},
      finaleMemory:{title:'What We Leave Behind',hook:'The hidden site contains evidence of a lost survey team and enough salvage to tempt everyone involved to forget the dead.',type:'salvage',env:'passage',threat:4,patron:'Surveyor Pell Tannis',complete:true},
      finaleVault:{title:'The Deep Vault',hook:'The route ends at a sealed facility built into a mountain and already being opened from the other side.',type:'salvage',env:'mountain',threat:4,patron:'Outer Rim Survey Cooperative',complete:true}
    },finalReward:{credits:900,xp:10,rep:{Local:3}}
  },
  force:{
    title:'The Voice Between Choices',contact:'Archivist Teren Vaal',rival:'Imperial Seeker Veris Kade',summary:'A Force vision becomes a trail of relics, hunted adepts, and lessons that refuse to say whether power or compassion is the safer path.',
    stages:{
      opening:{label:'First Vision',useOpening:true,next:'glass',recruitStage:true,choices:[
        {id:'compassion',label:'Answer with compassion',text:'Treat the vision as a warning about someone who needs help.',effects:{morality:2,approval:1},flag:'forceCompassion'},
        {id:'power',label:'Answer with resolve',text:'Treat the vision as a challenge meant to test strength and control.',effects:{morality:-1,conflict:1},flag:'forcePower'}]},
      glass:{title:'Whispers in Glass',hook:'A fractured archive prism repeats the same image in different eras, each time with one person missing from the scene.',type:'force',env:'lab',threat:3,patron:'Archivist Teren Vaal',next:'hunter'},
      hunter:{title:'The Hunter in Gray',hook:'An Imperial seeker has begun tracing the same visions and believes the crew already possesses the missing piece.',type:'force',env:'jungle',threat:3,patron:'Nia Sol',choices:[
        {id:'spare',label:'Spare the hunter',text:'Break the cycle and leave Veris Kade alive with the truth.',next:'finaleLight',effects:{morality:3,approval:1}},
        {id:'break',label:'Break the hunt permanently',text:'Destroy the seeker’s network and accept the consequences of certainty.',next:'finaleShadow',effects:{morality:-2,conflict:2}}]},
      finaleLight:{title:'The Choice at the Threshold',hook:'The final site opens only when the crew refuses the simple answer offered by the relic’s guardian.',type:'force',env:'mountain',threat:4,patron:'Archivist Teren Vaal',complete:true},
      finaleShadow:{title:'Ashes of the Lesson',hook:'The final site reacts violently to the crew’s certainty, forcing a confrontation with what power has already cost.',type:'force',env:'icecave',threat:4,patron:'The Echo',complete:true}
    },finalReward:{credits:350,xp:12,morality:1}
  }
};

function customCrewRecordFromProfile(profile={}){
  let species=profile.species&&SPECIES[profile.species]?profile.species:'human',archId=profile.archetype&&CUSTOM_CREW_ARCHETYPES[profile.archetype]?profile.archetype:'scout',sp=SPECIES[species]||SPECIES.human,arch=CUSTOM_CREW_ARCHETYPES[archId],c={...sp.c};
  for(const [k,v] of Object.entries(arch.mods||{}))c[k]=Math.min(4,(c[k]||1)+v);
  let career=profile.career&&CAREERS[profile.career]?profile.career:'Explorer',specList=Object.keys(CAREERS[career].specs||{}),specialization=profile.specialization&&specList.includes(profile.specialization)?profile.specialization:specList[0],specSkills=CAREERS[career].specs[specialization]||[];
  let sk={...(sp.free||{}),...(arch.skills||{})};for(const s of specSkills.slice(0,2))sk[s]=Math.max(sk[s]||0,1);
  let specialties=[...(profile.specialties||[]),...specSkills,...Object.keys(arch.skills||{})].filter((x,i,a)=>x&&a.indexOf(x)===i).slice(0,8);
  return {id:profile.id||`crew-${Date.now()}-${Math.floor(Math.random()*100000)}`,name:profile.name||'Unnamed Recruit',custom:true,species,archetype:archId,career,specialization,callsign:profile.callsign||'',motivation:profile.motivation||'Belonging',personality:profile.personality||'Pragmatic',background:profile.background||'An independent spacer looking for a berth and a reason to stay.',goal:profile.goal||'Earn a permanent place in the crew.',role:`${sp.name} ${arch.name}`,c,sk,weapon:arch.weapon,armor:arch.armor,wt:sp.wt+c.Brawn,st:sp.st+c.Willpower,def:0,specialties,defaultRole:archId==='technician'||archId==='medic'||archId==='face'?'support':archId==='vanguard'?'guard':'assault'};
}

function enhanceCustomCrew48(){
  S.customCrew=Array.isArray(S.customCrew)?S.customCrew:[];
  for(const rec of S.customCrew){
    let career=rec.career&&CAREERS[rec.career]?rec.career:'Explorer',specs=Object.keys(CAREERS[career].specs||{});rec.career=career;rec.specialization=specs.includes(rec.specialization)?rec.specialization:specs[0];rec.callsign=rec.callsign||'';rec.motivation=rec.motivation||'Belonging';rec.personality=rec.personality||'Pragmatic';rec.background=rec.background||'An independent spacer with unfinished business.';rec.goal=rec.goal||'Earn a permanent place in the crew.';
    let specSkills=CAREERS[career].specs[rec.specialization]||[];rec.specialties=[...(rec.specialties||[]),...specSkills].filter((x,i,a)=>x&&a.indexOf(x)===i).slice(0,8);
    let sp=SPECIES[rec.species]||SPECIES.human,arch=CUSTOM_CREW_ARCHETYPES[rec.archetype]||CUSTOM_CREW_ARCHETYPES.scout;rec.role=`${sp.name} ${arch.name}${rec.callsign?` · “${rec.callsign}”`:''}`;
    CREW_SPECIALTIES[rec.id]=rec.specialties;
    COMPANION_DIALOGUE[rec.id]={
      intro:`${rec.name}${rec.callsign?` (“${rec.callsign}”)`:''} settles into the berth. “${rec.goal}”`,
      past:`“${rec.background}”`,
      trusted:`“You know what drives me: ${rec.motivation.toLowerCase()}. I’m starting to believe this crew understands that.”`,
      loyal:`“I came aboard chasing ${rec.motivation.toLowerCase()}. I stayed because this became my crew.”`,
      wary:`“I’m ${rec.personality.toLowerCase()}, not blind. Give me a reason to trust the next call.”`
    };
    let p=rec.specialties[0]||'Vigilance',q=rec.specialties[1]||p;
    COMPANION_QUESTS[rec.id]={name:rec.goal||'A Place in the Crew',summary:`${rec.name}'s past catches up with the crew. ${rec.background}`,stages:[{skill:p,diff:2,text:`Use ${p} to uncover the first lead tied to ${rec.motivation.toLowerCase()}.`},{skill:q,diff:3,text:`Use ${q} to resolve the matter in a way ${rec.name} can live with.`}],reward:`${rec.name} resolves a piece of the past and commits to the crew.`};
  }
}

const _p48SyncCustomCrew=syncCustomCrew;
syncCustomCrew=function(){_p48SyncCustomCrew();enhanceCustomCrew48()};

function ensurePhase48State(){
  ensurePhase45State();
  S.schemaVersion=52;
  S.originArc=S.originArc||null;
  S.customCrewEditing=S.customCrewEditing||null;
  S.originArcRecruit=S.originArcRecruit||null;
  syncCustomCrew();
  if(S.finalized&&S.origin&&ORIGIN_ARCS_47[S.origin]&&S.originApplied&&!S.originArc)initOriginArc47();
}
const _p48EnsurePhase46=ensurePhase46State;
ensurePhase46State=function(){_p48EnsurePhase46();S.schemaVersion=52;if(!S.customCrewEditing)S.customCrewEditing=null;syncCustomCrew()};

function arcDef47(){return ORIGIN_ARCS_47[S.origin]||null}
function arcStage47(key){return arcDef47()?.stages?.[key]||null}
function initOriginArc47(){
  let def=arcDef47();if(!def||S.origin==='sable'||S.origin==='legacy')return null;
  if(!S.originArc||S.originArc.origin!==S.origin)S.originArc={origin:S.origin,title:def.title,status:'active',stageKey:'opening',completed:[],choices:{},flags:{},awaitingChoice:false,readyNext:false,nextStage:null,recruitStatus:'locked'};
  let arc=S.originArc;if(S.gmOps?.current&&!S.gmOps.current.originArcKey&&!arc.completed.includes('opening')){S.gmOps.current.originArcKey='opening';S.gmOps.current.originArcOrigin=S.origin;S.gmOps.current.source=`Sable Reach Living Campaign · ${def.title}`;S.gmOps.current.patron=def.contact;}
  return arc
}

function applyArcEffects47(e={}){
  if(e.rep)for(const [f,n] of Object.entries(e.rep))adjustFactionRep(f,n);
  if(e.duty)dutyAward(e.duty);
  if(e.obligation)obligationAdjust(e.obligation);
  if(e.morality){S.morality=Math.max(0,Math.min(100,S.morality+e.morality));gLog(`Morality ${e.morality>=0?'+':''}${e.morality}.`)}
  if(e.conflict){S.conflict=Math.max(0,S.conflict+e.conflict);gLog(`Conflict +${e.conflict}.`)}
  if(e.approval)for(const id of S.crew||[])if(Number.isFinite(S.approval?.[id]))S.approval[id]+=e.approval;
}

function buildOriginArcOperation47(stageKey){
  let def=arcDef47(),stage=def?.stages?.[stageKey];if(!def||!stage||stage.useOpening)return null;
  let op=buildOperation(stage.type||'any',stage.threat||3,stage.env||'any');op.title=stage.title;op.hook=stage.hook;op.patron=stage.patron||def.contact;op.source=`Sable Reach Living Campaign · ${def.title}`;op.originArcKey=stageKey;op.originArcOrigin=S.origin;op.status='active';op.credits=Math.max(op.credits,350+(stage.threat||3)*125);op.xp=Math.max(op.xp,8+(stage.threat||3)*2);return op
}

function offerOriginRecruit47(){
  let arc=S.originArc,profile=ORIGIN_RECRUITS_47[S.origin];if(!arc||!profile||arc.recruitStatus!=='locked')return;arc.recruitStatus='offered';S.originArcRecruit={...profile};gLog(`${profile.name} is willing to discuss joining the crew.`)
}
function recruitOriginCandidate47(accept){
  let arc=S.originArc,profile=S.originArcRecruit;if(!arc||arc.recruitStatus!=='offered'||!profile)return;
  if(accept){let rec=customCrewRecordFromProfile(profile);S.customCrew.push(rec);syncCustomCrew();S.approval[rec.id]=3;arc.recruitStatus='joined';arc.recruitId=rec.id;S.customCrewEditing=rec.id;gLog(`${rec.name}${rec.callsign?` (“${rec.callsign}”)`:''} joins the roster.`)}else{arc.recruitStatus='declined';gLog(`${profile.name} stays a contact rather than joining the crew.`)}
  S.originArcRecruit=null;renderAll();renderNavTab('gm');safeAutosave()
}

function completeOriginArcStage47(op){
  let arc=initOriginArc47(),def=arcDef47();if(!arc||arc.status!=='active'||op.originArcOrigin!==S.origin||!op.originArcKey)return;let key=op.originArcKey;if(arc.completed.includes(key))return;let stage=def.stages[key];arc.completed.push(key);arc.stageKey=key;
  if(stage.recruitStage)offerOriginRecruit47();
  if(stage.complete){arc.status='completed';arc.awaitingChoice=false;arc.readyNext=false;applyArcEffects47(def.finalReward||{});let r=def.finalReward||{};if(r.credits){S.credits+=r.credits;ledgerEntry(r.credits,`Origin arc finale: ${def.title}`)}if(r.xp)S.earnedXp+=r.xp;gLog(`Origin mini-campaign complete: ${def.title}.${r.xp?` +${r.xp} XP.`:''}${r.credits?` +${r.credits} credits.`:''}`);return}
  if(stage.choices?.length){arc.awaitingChoice=true;arc.pendingChoices=stage.choices.map(x=>x.id);arc.readyNext=false}
  else{arc.nextStage=stage.next;arc.readyNext=!!stage.next;arc.awaitingChoice=false}
}
function chooseOriginArc47(choiceId){
  let arc=initOriginArc47(),stage=arcStage47(arc.stageKey);if(!arc||!stage||!arc.awaitingChoice)return;let choice=(stage.choices||[]).find(x=>x.id===choiceId);if(!choice)return;arc.choices[arc.stageKey]=choice.id;if(choice.flag)arc.flags[choice.flag]=true;applyArcEffects47(choice.effects||{});arc.nextStage=choice.next||stage.next;arc.awaitingChoice=false;arc.readyNext=!!arc.nextStage;gLog(`Origin choice — ${choice.label}: ${choice.text}`);renderOperations();safeAutosave()
}
function launchNextOriginArc47(){
  let arc=initOriginArc47();if(!arc||arc.status!=='active'||!arc.readyNext||!arc.nextStage)return;let next=arc.nextStage,stage=arcStage47(next);if(!stage)return;
  if(S.gmOps.current&&S.gmOps.current.status==='active'&&!S.gmOps.current.rewarded&&!confirm('Abandon the current operation and continue the origin campaign?'))return;
  if(S.gmOps.current)archiveCurrentOperation(S.gmOps.current.rewarded?'completed':'abandoned');let op=buildOriginArcOperation47(next);if(!op)return;S.gmOps.current=op;arc.stageKey=next;arc.nextStage=null;arc.readyNext=false;arc.awaitingChoice=false;gLog(`Origin campaign continues: ${op.title}.`);renderAll();renderNavTab('gm');safeAutosave()
}

function injectPhase48UI(){
  if(!$('phase48Style')){let st=document.createElement('style');st.id='phase48Style';st.textContent='.origin-arc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.origin-arc-step{border:1px solid #31405a;border-radius:8px;padding:8px;background:#0e1724}.origin-arc-step.done{border-color:#386b52}.origin-arc-step.now{border-color:#b89042}.profile-grid48{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.profile-grid48 .wide{grid-column:1/-1}@media(max-width:900px){.origin-arc-grid,.profile-grid48{grid-template-columns:1fr}.profile-grid48 .wide{grid-column:auto}}';document.head.appendChild(st)}
  if(!$('originArcPanel47')&&$('operationCurrent')){let c=document.createElement('div');c.id='originArcPanel47';c.style.marginTop='10px';$('operationCurrent').insertAdjacentElement('afterend',c)}
  if(!$('crewProfileStudio48')&&$('customCrewBuilder46')){let c=document.createElement('div');c.id='crewProfileStudio48';c.className='card';c.style.marginTop='12px';$('customCrewBuilder46').insertAdjacentElement('afterend',c)}
}

function renderOriginArcPanel47(){
  injectPhase48UI();let box=$('originArcPanel47');if(!box)return;ensurePhase48State();let def=arcDef47(),arc=S.originArc;if(!def||!arc){box.innerHTML='';return}
  let stage=arcStage47(arc.stageKey),keys=Object.keys(def.stages).filter(k=>!k.startsWith('finale')||k===arc.stageKey||arc.completed.includes(k));let progress=Math.min(4,arc.completed.length);
  let steps=['opening','ledger','relay','manifest','blackbox','glass','crossfire','mole','passage','jumpers','hunter'].filter(k=>def.stages[k]).concat(Object.keys(def.stages).filter(k=>k.startsWith('finale')&&(k===arc.stageKey||arc.completed.includes(k))));
  let choices='';if(arc.awaitingChoice&&stage?.choices?.length)choices=`<div class="check" style="margin-top:9px"><b>Decision point</b><div class="small">This choice changes the rest of the origin arc.</div><div class="itemgrid" style="margin-top:7px">${stage.choices.map(c=>`<div class="item"><b>${opEsc(c.label)}</b><div class="small">${opEsc(c.text)}</div><button class="btn primary" data-arc-choice="${c.id}" style="margin-top:7px">Choose</button></div>`).join('')}</div></div>`;
  let recruit='';if(arc.recruitStatus==='offered'&&S.originArcRecruit){let r=S.originArcRecruit;recruit=`<div class="check" style="margin-top:9px"><b>Recruitment opportunity — ${opEsc(r.name)}${r.callsign?` “${opEsc(r.callsign)}”`:''}</b><div class="small">${opEsc(r.background)} ${opEsc(r.goal)}</div><div class="pills" style="margin-top:7px"><button id="originRecruitYes47" class="btn primary">Invite aboard</button><button id="originRecruitNo47" class="btn">Keep as a contact</button></div></div>`}
  let continueBtn=arc.readyNext?`<button id="originArcContinue47" class="btn primary">Continue Origin Campaign</button>`:'';
  let completed=arc.status==='completed'?`<div class="check good" style="margin-top:9px"><b>Origin arc complete.</b><div class="small">${opEsc(def.title)} is now part of this campaign’s history. Future Operations remain open-ended.</div></div>`:'';
  box.innerHTML=`<div class="card"><div class="row"><div><div class="tiny">LIVING ORIGIN · ${opEsc(startingOrigin()?.name||S.origin)}</div><h3 style="margin:.2rem 0">${opEsc(def.title)}</h3><div class="small">Contact: ${opEsc(def.contact)} · Rival: ${opEsc(def.rival)}</div></div><span class="pill">${progress}/4 chapters</span></div><p class="small">${opEsc(def.summary)}</p><div class="origin-arc-grid">${steps.map(k=>{let s=def.stages[k],done=arc.completed.includes(k),now=arc.stageKey===k&&!done;return `<div class="origin-arc-step ${done?'done':now?'now':''}"><div class="tiny">${done?'COMPLETE':now?'CURRENT':'UPCOMING'}</div><b>${opEsc(s.title||s.label||k)}</b></div>`}).join('')}</div>${choices}${recruit}${completed}<div class="pills" style="margin-top:9px">${continueBtn}</div></div>`;
  document.querySelectorAll('[data-arc-choice]').forEach(b=>b.onclick=()=>chooseOriginArc47(b.dataset.arcChoice));if($('originArcContinue47'))$('originArcContinue47').onclick=launchNextOriginArc47;if($('originRecruitYes47'))$('originRecruitYes47').onclick=()=>recruitOriginCandidate47(true);if($('originRecruitNo47'))$('originRecruitNo47').onclick=()=>recruitOriginCandidate47(false)
}

function renderCrewProfileStudio48(){
  injectPhase48UI();ensurePhase48State();let box=$('crewProfileStudio48');if(!box)return;if(!S.customCrew.length){box.innerHTML='<div class="row"><div><b>Deep Crew Profiles</b><div class="small">Add a custom recruit above—or recruit someone through a Living Origin—to edit callsign, career, specialization, motivation, personality, background, and personal goal.</div></div><span class="tag">PHASE 48</span></div>';return}
  let id=S.customCrewEditing&&S.customCrew.some(c=>c.id===S.customCrewEditing)?S.customCrewEditing:S.customCrew[0].id;S.customCrewEditing=id;let rec=S.customCrew.find(c=>c.id===id),career=rec.career&&CAREERS[rec.career]?rec.career:'Explorer',specs=Object.keys(CAREERS[career].specs||{}),spec=specs.includes(rec.specialization)?rec.specialization:specs[0],p=crewProgress(rec.id),tier=approvalTier(S.approval[rec.id]||0);
  box.innerHTML=`<div class="row"><div><b>Deep Crew Profile Studio</b><div class="small">Customize identity and long-term character hooks without rebuilding the recruit’s combat chassis.</div></div><span class="tag">PHASE 48</span></div><label style="display:block;margin-top:8px">Crew member<select id="crewProfileSelect48">${S.customCrew.map(c=>`<option value="${c.id}" ${c.id===id?'selected':''}>${opEsc(c.name)}${c.callsign?` — ${opEsc(c.callsign)}`:''}</option>`).join('')}</select></label><div class="profile-grid48" style="margin-top:9px"><label>Name<input id="crewProfileName48" value="${opEsc(rec.name)}"></label><label>Callsign<input id="crewProfileCallsign48" value="${opEsc(rec.callsign||'')}" placeholder="Optional"></label><label>Career<select id="crewProfileCareer48">${Object.keys(CAREERS).map(c=>`<option ${c===career?'selected':''}>${c}</option>`).join('')}</select></label><label>Specialization<select id="crewProfileSpec48">${specs.map(s=>`<option ${s===spec?'selected':''}>${s}</option>`).join('')}</select></label><label>Motivation<select id="crewProfileMotivation48">${CREW_MOTIVATIONS_48.map(x=>`<option ${x===rec.motivation?'selected':''}>${x}</option>`).join('')}</select></label><label>Personality<select id="crewProfilePersonality48">${CREW_PERSONALITIES_48.map(x=>`<option ${x===rec.personality?'selected':''}>${x}</option>`).join('')}</select></label><label class="wide">Background<textarea id="crewProfileBackground48" rows="3">${opEsc(rec.background||'')}</textarea></label><label class="wide">Personal goal<textarea id="crewProfileGoal48" rows="2">${opEsc(rec.goal||'')}</textarea></label></div><div class="check" style="margin-top:9px"><b>${opEsc(rec.name)} · ${opEsc(CAREERS[career].line)} · ${opEsc(career)} / ${opEsc(spec)}</b><div class="small">${rec.species&&SPECIES[rec.species]?SPECIES[rec.species].name:'Human'} · ${CUSTOM_CREW_ARCHETYPES[rec.archetype]?.name||'Crew'} · ${COMPANION_ROLES[p.role]?.name||p.role} · approval <span class="approval ${tier.cls}">${S.approval[rec.id]||0} ${tier.label}</span> · loyalty quest ${p.quest.status}</div><div class="tiny" style="margin-top:5px">Career/spec skills become eligible specialty skills for this recruit’s companion XP progression.</div></div><div class="pills" style="margin-top:9px"><button id="saveCrewProfile48" class="btn primary">Save Profile</button><button id="toggleCrewProfile48" class="btn">${S.crew.includes(rec.id)?'Move to Reserve':'Deploy to Active Crew'}</button></div>`;
  $('crewProfileSelect48').onchange=()=>{S.customCrewEditing=$('crewProfileSelect48').value;renderCrewProfileStudio48()};$('crewProfileCareer48').onchange=()=>{let c=$('crewProfileCareer48').value,opts=Object.keys(CAREERS[c].specs||{});$('crewProfileSpec48').innerHTML=opts.map(s=>`<option>${s}</option>`).join('')};$('saveCrewProfile48').onclick=saveCrewProfile48;$('toggleCrewProfile48').onclick=()=>{toggleCrewActive(rec.id);renderCrewProfileStudio48()}
}
function saveCrewProfile48(){
  let rec=S.customCrew.find(c=>c.id===S.customCrewEditing);if(!rec)return;let career=$('crewProfileCareer48').value,spec=$('crewProfileSpec48').value,name=$('crewProfileName48').value.trim();if(name)rec.name=name;rec.callsign=$('crewProfileCallsign48').value.trim();rec.career=CAREERS[career]?career:rec.career;rec.specialization=CAREERS[rec.career]?.specs?.[spec]?spec:Object.keys(CAREERS[rec.career].specs)[0];rec.motivation=$('crewProfileMotivation48').value;rec.personality=$('crewProfilePersonality48').value;rec.background=$('crewProfileBackground48').value.trim()||rec.background;rec.goal=$('crewProfileGoal48').value.trim()||rec.goal;syncCustomCrew();bLog(`${rec.name}'s crew profile updated: ${rec.career} / ${rec.specialization}.`);renderAll();safeAutosave()
}

const _p48RenderCustomCrewBuilder=renderCustomCrewBuilder;
renderCustomCrewBuilder=function(){_p48RenderCustomCrewBuilder();ensurePhase48State();let roster=$('customCrewRoster46');if(roster){roster.innerHTML=S.customCrew.map(c=>{let tier=approvalTier(S.approval[c.id]||0);return `<div class="item"><div class="row"><div><b>${opEsc(c.name)}${c.callsign?` “${opEsc(c.callsign)}”`:''}</b><div class="tiny">${opEsc(c.career||'Explorer')} / ${opEsc(c.specialization||'')} · ${S.crew.includes(c.id)?'ACTIVE':'reserve'} · <span class="approval ${tier.cls}">${S.approval[c.id]||0} ${tier.label}</span></div></div><div class="pills"><button class="btn" data-custom-profile="${c.id}">Profile</button><button class="btn" data-custom-rename="${c.id}">Rename</button><button class="btn danger" data-custom-dismiss="${c.id}">Dismiss</button></div></div><div class="small" style="margin-top:5px">${opEsc(c.motivation||'Belonging')} · ${opEsc(c.personality||'Pragmatic')} · ${opEsc(c.goal||'Find a place in the crew.')}</div></div>`}).join('')||'<div class="small">No custom recruits yet. Built-in companions remain available below.</div>';document.querySelectorAll('[data-custom-profile]').forEach(b=>b.onclick=()=>{S.customCrewEditing=b.dataset.customProfile;renderCrewProfileStudio48()});document.querySelectorAll('[data-custom-rename]').forEach(b=>b.onclick=()=>renameCustomCrew(b.dataset.customRename));document.querySelectorAll('[data-custom-dismiss]').forEach(b=>b.onclick=()=>dismissCustomCrew(b.dataset.customDismiss))}renderCrewProfileStudio48()};

const _p47ApplyOrigin=applyStartingOrigin;
applyStartingOrigin=function(){_p47ApplyOrigin();if(S.finalized&&ORIGIN_ARCS_47[S.origin])initOriginArc47();renderOriginArcPanel47()};

const _p47ClaimOperationReward=claimOperationReward;
claimOperationReward=function(){let op=S.gmOps?.current,was=!!op?.rewarded;_p47ClaimOperationReward();if(op&&!was&&op.rewarded&&op.originArcKey)completeOriginArcStage47(op);renderOperations();safeAutosave()};

const _p47RenderOperations=renderOperations;
renderOperations=function(){_p47RenderOperations();renderOriginArcPanel47()};

const _p48RenderCrewManagement=renderCrewManagement;
renderCrewManagement=function(){_p48RenderCrewManagement();renderCrewProfileStudio48()};

const _p48RenderAll=renderAll;
renderAll=function(){ensurePhase48State();_p48RenderAll();injectPhase48UI();renderOriginArcPanel47();renderCrewProfileStudio48()};

const _p48RenderGuide=renderGuide;
renderGuide=function(){_p48RenderGuide();ensurePhase48State();let def=arcDef47(),arc=S.originArc;if(S.finalized&&def&&arc&&arc.status==='active'&&$('guideObjective')){let stage=arcStage47(arc.stageKey);let text=arc.awaitingChoice?'Make the origin-arc decision in Operations Director.':arc.readyNext?'Continue the linked origin campaign in Operations Director.':S.gmOps?.current?.originArcKey?`Complete “${S.gmOps.current.title}” in Operations Director.`:`Continue ${def.title}.`;$('guideObjective').innerHTML=`<b>${opEsc(text)}</b><div class="tiny" style="margin-top:4px">Living Origin: ${opEsc(def.title)} · ${arc.completed.length}/4 chapters complete.</div>`}};

RULE_AUDIT.unshift(
  {id:'livingOrigins47',name:'Phase 47 linked origin mini-campaigns',status:'adapted',source:'Original Sable Reach campaign layer',detail:'Alternate beginnings now continue through linked multi-operation arcs with recurring contacts, rivals, branch decisions, consequences, recruit opportunities, and finale rewards. The missions are original game content using the existing Operations Director rules.'},
  {id:'deepCrew48',name:'Phase 48 deep custom crew profiles',status:'adapted',source:'Original Sable Reach companion system + existing career skill packages',detail:'Custom recruits can now carry callsigns, careers, specializations, motivations, personalities, backgrounds, personal goals, and personalized loyalty hooks. Career/spec skill packages extend companion specialty progression without turning recruits into full PC talent-tree characters.'}
);

const _p48Diagnostics=phase45Diagnostics;
phase45Diagnostics=function(){let rows=_p48Diagnostics();const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});add('Phase 47 origin arcs',Object.keys(ORIGIN_ARCS_47).length===5&&Object.values(ORIGIN_ARCS_47).every(a=>Object.keys(a.stages).length>=5),'5 linked alternate-start arcs');add('Phase 47 recruit opportunities',Object.keys(ORIGIN_RECRUITS_47).length===5,'one recruit lead per alternate origin');add('Phase 48 crew metadata',S.customCrew.every(c=>c.career&&c.specialization&&c.motivation&&c.personality),'custom crew profiles normalized');add('Phase 48 save schema',S.schemaVersion===52&&BUILD_INFO.saveSchema===52,'schema 52');return rows};

const _p48SmokeBase=runSableReachSmoke;
runSableReachSmoke=async function(){let report=await _p48SmokeBase();const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};test('Phase 47 has five linked alternate-origin arcs',()=>Object.keys(ORIGIN_ARCS_47).length===5&&Object.values(ORIGIN_ARCS_47).every(a=>Object.keys(a.stages).length>=5));test('Phase 47 origin stages generate tagged operations',()=>{let oldOrigin=S.origin;S.origin='guild';let o=buildOriginArcOperation47('ledger');S.origin=oldOrigin;return o?.originArcKey==='ledger'&&o?.objectives?.length===4});test('Phase 47 recruit templates map to valid species and careers',()=>Object.values(ORIGIN_RECRUITS_47).every(r=>!!SPECIES[r.species]&&!!CAREERS[r.career]&&!!CAREERS[r.career].specs[r.specialization]));test('Phase 48 advanced profile choices exist',()=>CREW_MOTIVATIONS_48.length>=10&&CREW_PERSONALITIES_48.length>=10);test('Phase 48 schema target',()=>BUILD_INFO.saveSchema===52&&S.schemaVersion===52&&serializableState().schemaVersion===52);injectPhase48UI();test('Phase 48 crew profile studio renders',()=>!!$('crewProfileStudio48')&&!!$('originArcPanel47'));document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report};



init();

/* Automated browser smoke test. Runs only with ?smoke=1. */
async function runSableReachSmoke(){
  const report={version:BUILD_INFO.version,passed:[],failed:[]};
  const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};
  window.confirm=()=>true;
  window.prompt=(msg,def)=>def??'0';

  test('startup guide exists',()=>!!$('guide') && !$('guide').classList.contains('hidden'));
  test('build metadata',()=>BUILD_INFO.version==='52.0.0-exploration-mobile'&&BUILD_INFO.saveSchema===52);
  test('required systems',()=>['renderAdventure','renderCombat','renderShip','renderCrewManagement','renderEquipment','renderRecovery'].every(n=>typeof window[n]==='function'));
  test('visual HUD exists',()=>!!$('quickHud') && !!$('globalProgress'));
  test('accessibility controls exist',()=>!!$('uiScaleSelect') && !!$('motionSelect'));
  test('rules audit exists',()=>!!$('rulesaudit') && typeof renderRulesAudit==='function');
  test('expanded content database',()=>Object.keys(SPECIES).length>=22&&STARSHIP_DB.length>=7&&ADVERSARY_DB.length>=17);
  test('new playable specializations',()=>!!CAREERS.Guardian.specs.Armorer&&!!CAREERS.Warrior.specs['Juyo Berserker']&&!!CAREERS.Engineer.specs.Shipwright);
  test('source reference attachments',()=>ATTACHMENT_REFERENCE_DB.some(x=>x.name==='Droid Targeting System')&&ATTACHMENT_REFERENCE_DB.some(x=>x.name==='Automated Weapon Mounting'));
  test('database categories render',()=>{let old=$('dbCategory').value;$('dbCategory').value='ship';renderDatabase();let ok=$('dbList').children.length>=STARSHIP_DB.length;$('dbCategory').value=old;renderDatabase();return ok});

  test('HWK-290 audited profile',()=>SHIP_BASE.armor===2 && SHIP_BASE.hull===18 && SHIP_BASE.strain===18 && SHIP_BASE.hp===5);
  test('rarity table + Outer Rim modifier',()=>{let a=acquisitionProfile(0),b=acquisitionProfile(10);return a.effective===2&&a.diff===1&&b.effective===12&&b.diff===5&&b.upgrade===2});
  test('standard week is five days',()=>{let d=S.medical.day;S.medical.day=1;let a=medicalWeek();S.medical.day=6;let b=medicalWeek();S.medical.day=d;return a===1&&b===2});
  test('full critical table loaded',()=>critResult(3).name==='Minor Nick'&&critResult(23).name==='Off-Balance'&&critResult(103).name==='Maimed'&&critResult(128).name==='Gruesome Injury'&&critResult(145).name==='The End is Nigh');
  test('source ordnance profiles loaded',()=>ORDNANCE.frag.damage===8&&ORDNANCE.frag.qualities.blast===6&&ORDNANCE.stun.damage===8&&ORDNANCE.stun.qualities.stunDamage===true&&ORDNANCE.miniThermal.damage===12&&ORDNANCE.miniThermal.qualities.blast===10);
  test('Phase 26 ordnance state persists',()=>S.ordnance&&Number.isFinite(S.ordnance.frag)&&Number.isFinite(S.ordnance.stun)&&Number.isFinite(S.ordnance.miniThermal));
  test('condition state keeps stable object identity',()=>{ensureCrewState();let ref=S.conditions;ensureCrewState();return S.conditions===ref});
  test('four advanced source trees have 20 nodes',()=>['Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].every(sp=>EXACT_TREES[sp]?.length===20));
  test('advanced source trees use 5/10/15/20/25 XP tiers',()=>['Armorer','Colossus','Juyo Berserker','Steel Hand Adept'].every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('advanced tree provenance is recorded',()=>SPECIALIZATION_TREE_SOURCE.Armorer.includes('Keeping the Peace')&&SPECIALIZATION_TREE_SOURCE['Juyo Berserker'].includes('Knights of Fate'));
  test('special unarmed profile exists',()=>COMBAT_SPECIAL_WEAPONS.unarmed.skill==='Brawl'&&COMBAT_SPECIAL_WEAPONS.unarmed.crit===5&&COMBAT_SPECIAL_WEAPONS.unarmed.qualities.knockdown===true);
  test('six core lightsaber form trees are complete',()=>['Niman Disciple','Soresu Defender','Makashi Duelist','Ataru Striker','Shien Expert','Shii-Cho Knight'].every(sp=>FULL_SOURCE_TREES.has(sp)&&FORM_TREES[sp]?.length===20));
  test('form trees preserve 5/10/15/20/25 XP tiers',()=>['Niman Disciple','Soresu Defender','Makashi Duelist','Ataru Striker','Shien Expert','Shii-Cho Knight'].every(sp=>FORM_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('form source provenance is recorded',()=>SPECIALIZATION_TREE_SOURCE['Niman Disciple'].includes('Force and Destiny Core')&&SPECIALIZATION_TREE_SOURCE['Shii-Cho Knight'].includes('Force and Destiny Core'));
  test('five Force trees have source-grounded upgrade counts',()=>FORCE_TREES.Move.nodes.length===14&&FORCE_TREES.Sense.nodes.length===11&&FORCE_TREES.Enhance.nodes.length===11&&FORCE_TREES.Influence.nodes.length===13&&FORCE_TREES.Foresee.nodes.length===12);
  test('Influence source controls exist',()=>FORCE_TREES.Influence.nodes.some(n=>n.id==='i-social')&&FORCE_TREES.Influence.nodes.some(n=>n.id==='i-str1'));
  test('Foresee combat controls exist',()=>FORCE_TREES.Foresee.nodes.some(n=>n.id==='f-ctl-init')&&FORCE_TREES.Foresee.nodes.some(n=>n.id==='f-ctl-defense')&&FORCE_TREES.Foresee.nodes.some(n=>n.id==='f-ctl-maneuver'));
  const coreFadSpecs=['Healer','Niman Disciple','Sage','Peacekeeper','Protector','Soresu Defender','Advisor','Makashi Duelist','Seer','Ataru Striker','Hunter','Pathfinder','Artisan','Shadow','Shien Expert','Aggressor','Shii-Cho Knight','Starfighter Ace'];
  test('all 18 Force and Destiny Core specializations are complete',()=>coreFadSpecs.every(sp=>FULL_SOURCE_TREES.has(sp)&&treeForSpec(sp)?.length===20));
  test('all 18 core trees preserve XP tiers',()=>coreFadSpecs.every(sp=>treeForSpec(sp).every(n=>n.cost===(n.row+1)*5)));
  test('all 18 core trees record source provenance',()=>coreFadSpecs.every(sp=>(SPECIALIZATION_TREE_SOURCE[sp]||'').includes('Force and Destiny Core')));
  test('all 18 core trees have valid internal links',()=>coreFadSpecs.every(sp=>{let t=treeForSpec(sp),ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 25 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='coreSpecs25'&&x.status==='verified'));
  const edge26Specs=['Martial Artist','Operator','Skip Tracer','Charmer','Gambler','Gunslinger'];
  test('six Phase 26 career-book trees have 20 nodes',()=>edge26Specs.every(sp=>EXACT_TREES[sp]?.length===20));
  test('Phase 26 trees preserve 5/10/15/20/25 XP tiers',()=>edge26Specs.every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 26 trees have valid internal links',()=>edge26Specs.every(sp=>{let t=EXACT_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 26 source provenance is recorded',()=>edge26Specs.every(sp=>['No Disintegrations','Fly Casual'].some(src=>(SPECIALIZATION_TREE_SOURCE[sp]||'').includes(src))));
  test('Phase 26 bonus career skills are correct',()=>
    JSON.stringify(CAREERS['Bounty Hunter'].specs['Martial Artist'])===JSON.stringify(['Athletics','Brawl','Coordination','Discipline'])&&
    JSON.stringify(CAREERS['Bounty Hunter'].specs.Operator)===JSON.stringify(['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'])&&
    JSON.stringify(CAREERS['Bounty Hunter'].specs['Skip Tracer'])===JSON.stringify(['Cool','Knowledge (Underworld)','Negotiation','Skulduggery'])&&
    JSON.stringify(CAREERS.Smuggler.specs.Charmer)===JSON.stringify(['Charm','Cool','Leadership','Negotiation'])&&
    JSON.stringify(CAREERS.Smuggler.specs.Gambler)===JSON.stringify(['Computers','Cool','Deception','Skulduggery'])&&
    JSON.stringify(CAREERS.Smuggler.specs.Gunslinger)===JSON.stringify(['Coercion','Cool','Knowledge (Outer Rim)','Ranged (Light)'])
  );
  test('Phase 26 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='edgeBooks26'&&x.status==='verified'));
  const edge27Specs=['Cyber Tech','Droid Tech','Modder','Demolitionist','Enforcer','Heavy'];
  test('six Phase 27 career-book trees have 20 nodes',()=>edge27Specs.every(sp=>EXACT_TREES[sp]?.length===20));
  test('Phase 27 trees preserve XP tiers',()=>edge27Specs.every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 27 trees have valid internal links',()=>edge27Specs.every(sp=>{let t=EXACT_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 27 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='edgeBooks27'&&x.status==='verified'));
  const edge28Specs=['Entrepreneur','Marshal','Performer','Archaeologist','Big-Game Hunter','Driver'];
  test('six Phase 28 career-book trees have 20 nodes',()=>edge28Specs.every(sp=>EXACT_TREES[sp]?.length===20));
  test('Phase 28 trees preserve XP tiers',()=>edge28Specs.every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 28 trees have valid internal links',()=>edge28Specs.every(sp=>{let t=EXACT_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 28 source provenance is recorded',()=>edge28Specs.every(sp=>['Far Horizons','Enter the Unknown'].some(src=>(SPECIALIZATION_TREE_SOURCE[sp]||'').includes(src))));
  test('Phase 28 bonus career skills are correct',()=>
    JSON.stringify(CAREERS.Colonist.specs.Entrepreneur)===JSON.stringify(['Discipline','Knowledge (Education)','Knowledge (Underworld)','Negotiation'])&&
    JSON.stringify(CAREERS.Colonist.specs.Marshal)===JSON.stringify(['Coercion','Knowledge (Underworld)','Ranged (Light)','Vigilance'])&&
    JSON.stringify(CAREERS.Colonist.specs.Performer)===JSON.stringify(['Charm','Coordination','Deception','Melee'])&&
    JSON.stringify(CAREERS.Explorer.specs.Archaeologist)===JSON.stringify(['Athletics','Discipline','Knowledge (Education)','Knowledge (Lore)'])&&
    JSON.stringify(CAREERS.Explorer.specs['Big-Game Hunter'])===JSON.stringify(['Knowledge (Xenology)','Ranged (Heavy)','Stealth','Survival'])&&
    JSON.stringify(CAREERS.Explorer.specs.Driver)===JSON.stringify(['Cool','Gunnery','Mechanics','Piloting (Planetary)'])
  );
  test('Phase 28 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='edgeBooks28'&&x.status==='verified'));
  const aor29Specs=['Figurehead','Instructor','Strategist','Beast Rider','Hotshot','Rigger'];
  test('six Phase 29 career-book trees have 20 nodes',()=>aor29Specs.every(sp=>EXACT_TREES[sp]?.length===20));
  test('Phase 29 trees preserve XP tiers',()=>aor29Specs.every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 29 trees have valid internal links',()=>aor29Specs.every(sp=>{let t=EXACT_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 29 trees are fully reachable from first-tier nodes',()=>aor29Specs.every(sp=>{let t=EXACT_TREES[sp],owned=new Set(t.filter(n=>n.row===0).map(n=>n.id)),changed=true;while(changed){changed=false;for(const n of t)if(!owned.has(n.id)&&(n.links||[]).some(id=>owned.has(id))){owned.add(n.id);changed=true}}return owned.size===20}));
  test('Phase 29 source provenance is recorded',()=>aor29Specs.every(sp=>['Lead by Example','Stay on Target'].some(src=>(SPECIALIZATION_TREE_SOURCE[sp]||'').includes(src))));
  test('Phase 29 Commander and Ace career skills are correct',()=>
    JSON.stringify(CAREERS.Commander.skills)===JSON.stringify(['Coercion','Cool','Discipline','Knowledge (Warfare)','Leadership','Perception','Ranged (Light)','Vigilance'])&&
    JSON.stringify(CAREERS.Ace.skills)===JSON.stringify(['Astrogation','Cool','Gunnery','Mechanics','Perception','Piloting (Planetary)','Piloting (Space)','Ranged (Light)'])
  );
  test('Phase 29 bonus career skills are correct',()=>
    JSON.stringify(CAREERS.Commander.specs.Figurehead)===JSON.stringify(['Cool','Leadership','Negotiation','Knowledge (Core Worlds)'])&&
    JSON.stringify(CAREERS.Commander.specs.Instructor)===JSON.stringify(['Discipline','Medicine','Ranged (Heavy)','Knowledge (Education)'])&&
    JSON.stringify(CAREERS.Commander.specs.Strategist)===JSON.stringify(['Computers','Cool','Vigilance','Knowledge (Warfare)'])&&
    JSON.stringify(CAREERS.Ace.specs['Beast Rider'])===JSON.stringify(['Athletics','Knowledge (Xenology)','Perception','Survival'])&&
    JSON.stringify(CAREERS.Ace.specs.Hotshot)===JSON.stringify(['Cool','Coordination','Piloting (Planetary)','Piloting (Space)'])&&
    JSON.stringify(CAREERS.Ace.specs.Rigger)===JSON.stringify(['Gunnery','Knowledge (Underworld)','Mechanics','Resilience'])
  );
  test('Phase 29 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='aorBooks29'&&x.status==='verified'));
  const aor30Specs=['Commodore','Squadron Leader','Tactician','Driver','Gunner','Pilot'];
  test('six Phase 30 AoR core specializations are playable',()=>aor30Specs.every(sp=>CAREERS.Commander.specs[sp]||CAREERS.Ace.specs[sp]));
  test('six Phase 30 AoR core trees have 20 nodes',()=>aor30Specs.every(sp=>EXACT_TREES[sp]?.length===20));
  test('Phase 30 trees preserve XP tiers',()=>aor30Specs.every(sp=>EXACT_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 30 trees have valid internal links',()=>aor30Specs.every(sp=>{let t=EXACT_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 30 trees are fully reachable from first-tier nodes',()=>aor30Specs.every(sp=>{let t=EXACT_TREES[sp],owned=new Set(t.filter(n=>n.row===0).map(n=>n.id)),changed=true;while(changed){changed=false;for(const n of t)if(!owned.has(n.id)&&(n.links||[]).some(id=>owned.has(id))){owned.add(n.id);changed=true}}return owned.size===20}));
  test('Phase 30 source provenance is recorded',()=>aor30Specs.every(sp=>(SPECIALIZATION_TREE_SOURCE[sp]||'').includes('Age of Rebellion Core')));
  test('Phase 30 Commander core bonus skills are correct',()=>
    JSON.stringify(CAREERS.Commander.specs.Commodore)===JSON.stringify(['Astrogation','Computers','Knowledge (Education)','Knowledge (Outer Rim)'])&&
    JSON.stringify(CAREERS.Commander.specs['Squadron Leader'])===JSON.stringify(['Gunnery','Mechanics','Piloting (Planetary)','Piloting (Space)'])&&
    JSON.stringify(CAREERS.Commander.specs.Tactician)===JSON.stringify(['Brawl','Discipline','Leadership','Ranged (Heavy)'])
  );
  test('Phase 30 Ace core bonus skills are correct',()=>
    JSON.stringify(CAREERS.Ace.specs.Driver)===JSON.stringify(['Cool','Gunnery','Mechanics','Piloting (Planetary)'])&&
    JSON.stringify(CAREERS.Ace.specs.Gunner)===JSON.stringify(['Discipline','Gunnery','Ranged (Heavy)','Resilience'])&&
    JSON.stringify(CAREERS.Ace.specs.Pilot)===JSON.stringify(['Astrogation','Gunnery','Piloting (Planetary)','Piloting (Space)'])
  );
  test('Phase 30 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='aorCore30'&&x.status==='verified'));

  const phase37Careers=['Bounty Hunter','Smuggler','Technician','Hired Gun','Explorer','Colonist','Commander','Ace','Diplomat','Soldier','Engineer','Spy','Consular','Guardian','Mystic','Seeker','Sentinel','Warrior'];
  const phase37NewSpecs=['Agitator','Ambassador','Quartermaster','Advocate','Analyst','Propagandist','Commando','Medic','Sharpshooter','Trailblazer','Vanguard','Saboteur','Scientist','Droid Specialist','Sapper','Infiltrator','Courier','Interrogator','Sleeper Agent','Arbiter','Ascetic','Teacher','Warden','Warleader','Alchemist','Magus','Prophet','Executioner','Hermit','Navigator','Investigator','Racer','Sentry','Mechanic','Scout','Shipwright'];
  test('Phase 37 completes all 18 careers to six specialization placements',()=>phase37Careers.every(c=>Object.keys(CAREERS[c]?.specs||{}).length===6));
  test('Phase 37 supplies 36 standardized specialization trees',()=>phase37NewSpecs.every(sp=>PHASE37_STANDARD_SPECS.has(sp)&&PHASE37_TREES[sp]?.length===20));
  test('Phase 37 standardized trees preserve 5/10/15/20/25 XP tiers',()=>phase37NewSpecs.every(sp=>PHASE37_TREES[sp].every(n=>n.cost===(n.row+1)*5)));
  test('Phase 37 standardized trees have valid links',()=>phase37NewSpecs.every(sp=>{let t=PHASE37_TREES[sp],ids=new Set(t.map(n=>n.id));return t.every(n=>(n.links||[]).every(id=>ids.has(id)))}));
  test('Phase 37 standardized trees are fully reachable',()=>phase37NewSpecs.every(sp=>{let t=PHASE37_TREES[sp],owned=new Set(t.filter(n=>n.row===0).map(n=>n.id)),changed=true;while(changed){changed=false;for(const n of t)if(!owned.has(n.id)&&(n.links||[]).some(id=>owned.has(id))){owned.add(n.id);changed=true}}return owned.size===20}));
  test('Phase 37 source provenance exists for every new standardized tree',()=>phase37NewSpecs.every(sp=>!!SPECIALIZATION_TREE_SOURCE[sp]));
  test('shared specialization careers resolve in favor of current career',()=>{let old=S.career;S.career='Soldier';let a=specializationCareer('Heavy')==='Soldier';S.career='Engineer';let b=specializationCareer('Mechanic')==='Engineer';S.career='Spy';let c=specializationCareer('Slicer')==='Spy'&&specializationCareer('Scout')==='Spy';S.career=old;return a&&b&&c});
  test('specialization picker deduplicates shared specialization names',()=>{let old=S.career;S.career='Spy';let a=allSpecializationChoices(),names=a.map(x=>x.spec);S.career=old;return names.length===new Set(names).size});
  test('Phase 37 career skill packages are present',()=>CAREERS.Diplomat.skills.includes('Negotiation')&&CAREERS.Soldier.skills.includes('Ranged (Heavy)')&&CAREERS.Engineer.skills.includes('Mechanics')&&CAREERS.Spy.skills.includes('Skulduggery'));
  test('Phase 37 Force career book specs are present',()=>['Arbiter','Warden','Alchemist','Navigator','Sentry'].every(sp=>Object.values(CAREERS).some(c=>Object.prototype.hasOwnProperty.call(c.specs,sp))));
  test('Phase 37 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='careerCompletion37'&&x.status==='adapted'));

  const phase40Species=['chiss','duros','gand','gungan','jawa','keldor','miraluka','pantoran','sullustan','toydarian','weequay','wookiee'];
  test('Phase 38 adds twelve source-labeled species profiles',()=>phase40Species.every(id=>SPECIES[id]&&SPECIES[id].source.includes('Complete Species Guide v6.0')));
  test('Phase 38 species characteristic arrays are complete',()=>phase40Species.every(id=>Object.keys(SPECIES[id].c||{}).length===6&&Number.isFinite(SPECIES[id].xp)&&Number.isFinite(SPECIES[id].wt)&&Number.isFinite(SPECIES[id].st)));
  const gng40=['a280cfe','a280c','stingbeam','br219','c10','cs14','dhx','dh17','disruptorPistol','disruptorRifle','dls12','dl19c','dr45','duelingPistol','e5','e11s','elg3a','glx'];
  test('Phase 39 imports eighteen Gadgets and Gear blasters',()=>gng40.every(id=>WEAPONS[id]&&WEAPONS[id].source.includes('Gadgets and Gear')));
  test('Phase 39 exact weapon-card spot checks',()=>WEAPONS.e11s.damage===10&&WEAPONS.e11s.range==='Extreme'&&WEAPONS.e11s.qualities.pierce===3&&WEAPONS.disruptorPistol.crit===2&&WEAPONS.disruptorPistol.qualities.vicious===4&&WEAPONS.a280c.qualities.cumbersome===3);
  const armor40=['adverseGear','allianceStealth','armoredDrop','armoredHalfVest','beastHide','catchVest','climbsuit','cloakingCoat','creshLuck'];
  test('Phase 39 adds nine Gadgets and Gear armor profiles',()=>armor40.every(id=>ARMOR[id]&&ARMOR[id].source.includes('Gadgets and Gear')));
  test('Phase 39 attachment reference library expanded',()=>['Shortened Barrel','Integrated Holsters','Ion Shielding','Reflec Adaptive Skin','Cortosis Weave','Biofeedback System'].every(n=>ATTACHMENT_REFERENCE_DB.some(x=>x.name===n)));
  const playableShips40=['hwk290','jumpmaster','fang','yt2400','lambda','firespray'];
  test('Phase 40 has six playable ship chassis',()=>playableShips40.every(id=>SHIP_MODELS[id]?.implementation==='Playable'&&SHIP_MODELS[id].weapon));
  test('Phase 40 ship profile spot checks',()=>SHIP_MODELS.fang.speed===6&&SHIP_MODELS.fang.handling===3&&SHIP_MODELS.yt2400.hull===25&&SHIP_MODELS.lambda.passengers===20&&SHIP_MODELS.jumpmaster.sensor==='Extreme');
  test('Phase 40 ground vehicle references are indexed',()=>VEHICLE_DB.some(x=>x.name==='M-68 Landspeeder'&&x.price===9200)&&VEHICLE_DB.some(x=>x.name==='X-34 Landspeeder'&&x.price===4500));
  test('Phase 40 rules audit entry exists',()=>RULE_AUDIT.some(x=>x.id==='galaxyEquipment40'&&x.status==='verified'));

  try{
    // Build/finalize a default character through the real finalize path.
    S.freeCareer=(CAREERS[S.career].skills||[]).slice(0,careerPickCap());
    S.freeSpec=(CAREERS[S.career].specs[S.spec]||[]).slice(0,2);
    finalize();
    test('character finalizes',()=>S.finalized===true);
    test('adventure unlocks',()=>!$('adventureTab').disabled);
    test('characteristic substitution hooks work',()=>skillCharacteristic(actorById('pc'),'Mechanics',{usePresence:true})==='Presence'&&skillCharacteristic(actorById('pc'),'Mechanics',{useCunning:true})==='Cunning');
    test('Sorry About the Mess lowers pre-action Critical cost',()=>{
      let snap={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView};
      try{
        if(!S.ownedSpecs.includes('Gunslinger'))S.ownedSpecs.push('Gunslinger');S.specTalents.Gunslinger=new Set(['gs23']);
        return effectiveCritRating(WEAPONS.pistol,{hasActedEncounter:false},'pc')===Math.max(1,WEAPONS.pistol.crit-1)&&effectiveCritRating(WEAPONS.pistol,{hasActedEncounter:true},'pc')===WEAPONS.pistol.crit
      }finally{S.ownedSpecs=snap.owned;S.specTalents=snap.sets;S.talentView=snap.view;ensurePhase9State()}
    });
    test('Deadly Accuracy uses the configured combat skill',()=>{
      let snap={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView,skill:S.deadlyAccuracySkill,rank:S.skills['Ranged (Light)']||0};
      try{
        if(!S.ownedSpecs.includes('Gunslinger'))S.ownedSpecs.push('Gunslinger');S.specTalents.Gunslinger=new Set(['gs43']);S.deadlyAccuracySkill='Ranged (Light)';S.skills['Ranged (Light)']=3;
        return deadlyAccuracyDamage('Ranged (Light)')===3&&deadlyAccuracyDamage('Melee')===0
      }finally{S.ownedSpecs=snap.owned;S.specTalents=snap.sets;S.talentView=snap.view;S.deadlyAccuracySkill=snap.skill;S.skills['Ranged (Light)']=snap.rank;ensurePhase9State()}
    });
    test('Phase 25 passive talent modifiers reach real pools',()=>{
      let snap={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView};
      let ok=false;
      try{
        if(!S.ownedSpecs.includes('Peacekeeper'))S.ownedSpecs.push('Peacekeeper');
        S.specTalents.Peacekeeper=new Set(['pk00','pk03']);
        let lead=actorPool(actorById('pc'),'Leadership',{diff:2,setback:2});
        ok=lead.p.boost>=1&&lead.p.setback<=1
      }finally{
        S.ownedSpecs=snap.owned;S.specTalents=snap.sets;S.talentView=snap.view;ensurePhase9State()
      }
      return ok
    });
    test('Hunter improves Critical bonus against beasts',()=>{
      let snap={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView};
      let ok=false;
      try{
        if(!S.ownedSpecs.includes('Hunter'))S.ownedSpecs.push('Hunter');S.specTalents.Hunter=new Set(['hu01','hu12']);
        ok=pcCriticalBonus(WEAPONS.pistol,{beast:true})>=20
      }finally{S.ownedSpecs=snap.owned;S.specTalents=snap.sets;S.talentView=snap.view;ensurePhase9State()}
      return ok
    });
    test('Influence social Control changes a real PC social check',()=>{
      let snap={presence:S.chars.Presence,charm:S.skills.Charm||0,fr:S.forceRating,force:new Set(S.forceOwned.Influence),dark:S.destiny.dark,light:S.destiny.light,mode:S.gmDestinyMode,last:S.last};
      let oldForce=rollForce,oldNarr=rollNarr,ok=false;
      try{
        S.chars.Presence=6;S.skills.Charm=5;S.forceRating=2;S.forceOwned.Influence=new Set(['i-basic','i-social']);S.destiny.dark=0;S.gmDestinyMode='off';
        rollForce=()=>({light:2,dark:0,faces:['LL']});rollNarr=()=>({ok:false,ns:0,na:0,tr:0,de:0,faces:[]});
        let result=performBest('Charm',{diff:1});
        ok=result.q.actor.id==='pc'&&result.r.ns===2&&result.r.ok===true
      }finally{
        rollForce=oldForce;rollNarr=oldNarr;S.chars.Presence=snap.presence;S.skills.Charm=snap.charm;S.forceRating=snap.fr;S.forceOwned.Influence=snap.force;S.destiny.dark=snap.dark;S.destiny.light=snap.light;S.gmDestinyMode=snap.mode;S.last=snap.last
      }
      return ok
    });
    test('Foresee Initiative Control creates opening-combat effects',()=>{
      let snap={fr:S.forceRating,force:new Set(S.forceOwned.Foresee),pending:S.pendingForeseeCombat};
      let oldForce=rollForce,oldNarr=rollNarr,ok=false;
      try{
        S.forceRating=2;S.forceOwned.Foresee=new Set(['f-basic','f-ctl-init','f-mag1','f-ctl-defense','f-ctl-maneuver']);
        rollForce=()=>({light:2,dark:0,faces:['LL']});rollNarr=()=>({ok:true,ns:1,na:0,tr:0,de:0,faces:[]});
        let r=initiativeRoll({...actorById('pc'),side:'PC'},'Vigilance'),f=S.pendingForeseeCombat;
        ok=r.success===3&&f?.targets===2&&f.defense===true&&f.maneuver===true
      }finally{
        rollForce=oldForce;rollNarr=oldNarr;S.forceRating=snap.fr;S.forceOwned.Foresee=snap.force;S.pendingForeseeCombat=snap.pending
      }
      return ok
    });
    let originalSpecies=S.species;
    S.species='zabrak';let zpool=actorPool(actorById('pc'),'Coercion',{diff:1});
    test('Zabrak Fearsome Countenance bonus',()=>zpool.p.boost>=1);
    S.species='mikkian';let mpool=actorPool(actorById('pc'),'Perception',{diff:1});
    test('Mikkian sensory tendril bonus',()=>mpool.p.boost>=1);
    S.species=originalSpecies;

    let baseCond={...actorState('pc').conditions};
    actorState('pc').conditions.nextDifficulty=1;
    let stingerPool=actorPool(actorById('pc'),'Perception',{diff:1});
    test('Stinger increases difficulty, not upgrades',()=>stingerPool.p.difficulty+stingerPool.p.challenge>=2);
    S.conditions={...baseCond};

    // Phase 23 progression-mechanics checks with temporary owned nodes.
    const specSnapshot={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView,fr:S.forceRating,xp:S.earnedXp,armor:S.armor,dark:S.destiny.dark};
    const setTempNodes=(spec,ids)=>{if(!S.ownedSpecs.includes(spec))S.ownedSpecs.push(spec);S.specTalents[spec]=new Set(ids);S.talentView=spec};
    const restoreSpecs=()=>{S.ownedSpecs=[...specSnapshot.owned];S.specTalents=Object.fromEntries(Object.entries(specSnapshot.sets).map(([k,v])=>[k,new Set(v)]));S.talentView=specSnapshot.view;S.forceRating=specSnapshot.fr;S.earnedXp=specSnapshot.xp;S.armor=specSnapshot.armor;S.destiny.dark=specSnapshot.dark;ensurePhase9State()};

    setTempNodes('Armorer',['ar11']);let soak0=S.chars.Brawn+(armorObj()?.soak||0);
    test('Armor Master adds soak',()=>playerSoak()===soak0+1);
    setTempNodes('Armorer',['ar11','ar21']);S.armor='paddedArmor';
    test('Improved Armor Master adds defense on soak-2 armor',()=>playerDefense('ranged')>=(effectiveArmor('paddedArmor').defense||0)+1);
    S.specTalents.Armorer=new Set();setTempNodes('Colossus',['co23']);
    test('Enduring adds soak',()=>playerSoak()===(S.chars.Brawn+(armorObj()?.soak||0)+1));
    setTempNodes('Steel Hand Adept',['sha01','sha02','sha11']);S.forceRating=Math.max(1,S.forceRating);
    let uw=unarmedWeapon();
    test('Iron Body and Acklay modify unarmed profile',()=>uw.crit===3&&quality(uw,'pierce')===effectiveForceRating());
    setTempNodes('Juyo Berserker',['ju32']);S.destiny.dark=2;
    test('Juyo Savagery raises lightsaber Critical bonus',()=>pcCriticalBonus(WEAPONS.lightsaber)===10);
    restoreSpecs();

    test('non-career specialization pricing adds 10 XP',()=>additionalSpecCost('Juyo Berserker')===additionalSpecCost('Gadgeteer')+10);
    test('cross-career specialization skills are recognized',()=>{
      let oldOwned=[...S.ownedSpecs],oldSets=Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)]));
      if(!S.ownedSpecs.includes('Steel Hand Adept'))S.ownedSpecs.push('Steel Hand Adept');S.specTalents['Steel Hand Adept']=new Set();
      let ok=careerSkills().has('Discipline')&&careerSkills().has('Coordination');
      S.ownedSpecs=oldOwned;S.specTalents=oldSets;ensurePhase9State();return ok
    });
    test('Talents UI offers non-career advanced specs',()=>{renderTalents();return [...$('buySpecSelect').options].some(o=>o.value==='Juyo Berserker'&&o.textContent.includes('NON-CAREER'))});

    // Purchasing a specialization Force Rating node must change the actual Force Rating.
    let buySnapshot={owned:[...S.ownedSpecs],sets:Object.fromEntries(Object.entries(S.specTalents).map(([k,v])=>[k,new Set(v)])),view:S.talentView,fr:S.forceRating,xp:S.earnedXp};
    if(!S.ownedSpecs.includes('Armorer'))S.ownedSpecs.push('Armorer');S.specTalents.Armorer=new Set(['ar30']);S.talentView='Armorer';S.earnedXp=Math.max(S.earnedXp,100);
    let frBefore=S.forceRating;buyViewedTalent('ar40');
    test('specialization Force Rating purchase is functional',()=>S.specTalents.Armorer.has('ar40')&&S.forceRating===frBefore+1);
    S.ownedSpecs=[...buySnapshot.owned];S.specTalents=Object.fromEntries(Object.entries(buySnapshot.sets).map(([k,v])=>[k,new Set(v)]));S.talentView=buySnapshot.view;S.forceRating=buySnapshot.fr;S.earnedXp=buySnapshot.xp;ensurePhase9State();


    // Phases 41–43 systems checks.
    test('Phase 41 source crafting templates loaded',()=>sourceCraftTemplates().length>=23&&CRAFT_TEMPLATES.craftEnergyRifle.materialPrice===450&&CRAFT_TEMPLATES.gadgetPrecision.diff===3);
    test('Phase 41 crafted weapon profiles loaded',()=>WEAPONS.craftEnergyRifle.damage===9&&WEAPONS.craftVibro.qualities.pierce===2&&WEAPONS.craftMissile.qualities.guided===3);
    test('Phase 41 droid chassis data loaded',()=>DROID_CHASSIS.advanced.wt===19&&DROID_CHASSIS.advanced.st===10&&DROID_CHASSIS.monotask.sil===0);
    test('Phase 41 droid directive data loaded',()=>DROID_DIRECTIVES.repair.skills.Mechanics===2&&DROID_DIRECTIVES.navigation.skills.Astrogation===2&&DROID_DIRECTIVES.elimination.diff===5);
    test('Phase 42 encounter-ready adversaries loaded',()=>Object.keys(PLAYABLE_ADVERSARIES).length>=7&&PLAYABLE_ADVERSARIES.stormtrooper.soak===5&&PLAYABLE_ADVERSARIES.navyTrooper.damage===6);
    test('Phase 42 encounter builder renders',()=>{renderDatabase();return !!$('encounterBuilder')&&!!$('encounterAdversary')});
    test('Phase 43 Duty list includes adventure duties',()=>FRAME.Duty.includes('Resource Acquisition')&&FRAME.Duty.includes('Counter Intelligence')&&FRAME.Duty.length>=12);
    test('Phase 43 campaign state initializes',()=>{ensurePhase43State();return S.schemaVersion===52&&Array.isArray(S.campaign.ledger)&&Number.isFinite(S.campaign.contributionRank)});
    test('Phase 43 Obligation session trigger applies solo penalty',()=>{let snap={fw:S.framework,val:S.frameworkValue,type:S.frameworkType,session:{...S.campaign.session},pen:S.campaign.obligationStrainPenalty};S.framework='Obligation';S.frameworkValue=100;startCampaignSession();let ok=S.campaign.session.triggered&&S.campaign.obligationStrainPenalty===2;S.framework=snap.fw;S.frameworkValue=snap.val;S.frameworkType=snap.type;S.campaign.session=snap.session;S.campaign.obligationStrainPenalty=snap.pen;renderFramework();return ok});
    test('Phase 43 faction reputation tiers',()=>repTier(20)==='Allied'&&repTier(-10)==='Hostile'&&repTier(0)==='Neutral');

    // Save/load round trip when the browser test origin permits Web Storage.
    let storageAvailable=true;
    try{
      localStorage.setItem('__sr17_smoke__','1');
      localStorage.removeItem('__sr17_smoke__');
    }catch(e){storageAvailable=false}
    if(storageAvailable){
      const savedName=S.name;
      save();
      S.name='__SMOKE_MUTATION__';
      load();
      test('save/load round trip',()=>S.name===savedName);
    }else{
      report.passed.push('save/load skipped: test origin has no Web Storage');
    }

    // Adventure rendering.
    S.ep15.location='crash';S.ep15.mainStage=3;S.ep15.flags.cipherCore=true;
    renderAdventure();
    test('adventure renders crash site',()=>$('sceneTitle').textContent.length>0 && $('choices').children.length>0);
    test('scene hero updates',()=>$('sceneHero').dataset.scene==='crash' && $('sceneIcon').textContent.length>0);

    // Ground combat initialization/render.
    startCombat('ep15Patrol');
    test('combat initializes',()=>!!S.combat && !$('combat').classList.contains('hidden'));
    test('combat has initiative',()=>Array.isArray(S.combat.slots)&&S.combat.slots.length>0);
    renderCombat();
    test('combat renders enemies',()=>$('enemies').children.length>0);
    test('combat meters render',()=>!!$('party').querySelector('.meter') && !!$('enemies').querySelector('.meter'));
    test('per-unit tactical positions initialize',()=>!!S.combat.positions&&squadActors().every(a=>Number.isFinite(S.combat.positions[a.id]))&&S.combat.enemies.every(e=>Number.isFinite(S.combat.positions[e.id])));
    test('battlefield renders nine abstract positions',()=>{renderCombat();return $('battlefield').children.length===9});
    test('enemy roles classify',()=>S.combat.enemies.some(e=>['officer','rifle','sniper','skirmisher','melee','commander'].includes(enemyAIRole(e))));
    test('individual ranges can differ',()=>{
      let target=S.combat.enemies[0],pc=unitPosition('pc'),kira=unitPosition('kira');
      setUnitPosition('pc',1);setUnitPosition('kira',3);setUnitPosition(target.id,5);
      let a=rangeBandBetween('pc',target.id),b=rangeBandBetween('kira',target.id);
      setUnitPosition('pc',pc);setUnitPosition('kira',kira);
      return a!==b
    });
    test('enemy cover affects attack pool',()=>{
      let a=squadActors().find(x=>x.id==='pc'),t=S.combat.enemies[0],oldCover=t.cover,oldA=unitPosition(a.id),oldT=unitPosition(t.id);
      setUnitPosition(a.id,2);setUnitPosition(t.id,4);
      t.cover=false;let q1=combatPool(a,t,0,0,false);
      t.cover=true;let q2=combatPool(a,t,0,0,false);
      t.cover=oldCover;setUnitPosition(a.id,oldA);setUnitPosition(t.id,oldT);
      return !q1.invalid&&!q2.invalid&&q2.p.setback===q1.p.setback+1
    });
    test('AI intent names target and role',()=>{let e=S.combat.enemies[0],x=enemyTacticalIntent(e);return !!x.target&&x.text.includes(e.name)&&x.text.includes(x.role)});
    test('Phase 26 inherited combat talent actions exist',()=>['unarmedAttack','farStrikeTalent','saberThrowTalent','innerPeaceTalent','heroicFortitudeTalent','powerFromPainTalent','indomitableWillTalent'].every(n=>typeof window[n]==='function'));
    test('temporary Power From Pain Force Rating is reflected',()=>{let old=S.combat.powerFromPainFR||0,base=S.forceRating;S.combat.powerFromPainFR=2;let ok=effectiveForceRating()===base+2;S.combat.powerFromPainFR=old;return ok});
    test('encounter tactical preset applies',()=>{
      let live=S.combat,enemies=enemySet('ep15Patrol');
      S.combat={kind:'ep15Patrol',enemies,round:1,positions:{},overwatch:{},setTriggerUsed:{},log:[]};initializeTacticalState(S.combat);
      let troopers=enemies.find(e=>e.id==='trooper-group'),officer=enemies.find(e=>e.id==='officer'),
          ok=unitPosition(troopers.id)===5&&troopers.cover===true&&unitPosition(officer.id)===6&&officer.cover===true;
      S.combat=live;return ok
    });
    test('suppression adds two Setback dice',()=>{
      let a=squadActors().find(x=>x.id==='pc'),t=S.combat.enemies[0],oldA=unitPosition(a.id),oldT=unitPosition(t.id),old=actorState('pc').conditions.suppressed;
      setUnitPosition(a.id,2);setUnitPosition(t.id,4);actorState('pc').conditions.suppressed=0;let q1=combatPool(a,t,0,0,false);
      actorState('pc').conditions.suppressed=1;let q2=combatPool(a,t,0,0,false);
      actorState('pc').conditions.suppressed=old;setUnitPosition(a.id,oldA);setUnitPosition(t.id,oldT);
      return !q1.invalid&&!q2.invalid&&q2.p.setback===q1.p.setback+2
    });
    test('morale pressure reacts to minion losses',()=>{
      let e=S.combat.enemies.find(x=>x.id==='trooper-group'),oldMembers=e.members,oldInitial=e.initialMembers;
      e.initialMembers=3;e.members=1;let pressure=enemyMoralePressure(e);e.members=oldMembers;e.initialMembers=oldInitial;return pressure>=.5
    });
    test('grenade pool uses target-specific Short range',()=>{
      let a=squadActors().find(x=>x.id==='pc'),t=S.combat.enemies[0],oldA=unitPosition(a.id),oldT=unitPosition(t.id);
      setUnitPosition(a.id,2);setUnitPosition(t.id,3);let q=grenadePoolForActor(a,t,ORDNANCE.frag,false);
      setUnitPosition(a.id,oldA);setUnitPosition(t.id,oldT);return !q.invalid&&q.range===1
    });
    test('real attack uses tactical range',()=>{
      let t=S.combat.enemies.find(e=>!enemyDefeated(e)),ti=S.combat.enemies.indexOf(t);
      S.combat.turn={actorId:'pc',started:false,maneuvers:0,actionUsed:false,aim:0,cover:false};
      setUnitPosition('pc',2);setUnitPosition(t.id,4);t.cover=false;$('target').value=String(ti);
      pcAttack('normal');let used=!!S.combat?.turn?.actionUsed;
      if(S.combat?.pendingSpend)finishSymbolSpend();
      return used
    });
    test('Overwatch arms and reacts to movement',()=>{
      let t=S.combat.enemies.find(e=>!enemyDefeated(e));if(!t)return false;
      S.combat.turn={actorId:'pc',started:false,maneuvers:0,actionUsed:false,aim:0,cover:false};
      setUnitPosition('pc',2);setUnitPosition(t.id,4);setOverwatch();
      let armed=!!S.combat.overwatch.pc;triggerOverwatch(t);
      return armed&&!S.combat.overwatch.pc
    });
    test('grenade action consumes shared ordnance',()=>{
      let t=S.combat.enemies.find(e=>!enemyDefeated(e));if(!t)return false;
      let ti=S.combat.enemies.indexOf(t),before=S.ordnance.frag;
      S.ordnance.frag=Math.max(1,before);S.combat.turn={actorId:'pc',started:false,maneuvers:0,actionUsed:false,aim:0,cover:false};
      setUnitPosition('pc',2);setUnitPosition(t.id,3);$('target').value=String(ti);
      let countBefore=S.ordnance.frag;throwGrenade('frag');let consumed=S.ordnance.frag===countBefore-1;
      if(S.combat?.pendingSpend)finishSymbolSpend();
      S.ordnance.frag=before;return consumed
    });

    // Exit combat without mutating story further.
    S.combat=null;$('combat').classList.add('hidden');$('adventure').classList.remove('hidden');

    // Ship hub + starship encounter.
    S.ep15.mainStage=9;S.ship.owned=true;ensurePhase14State();renderShip();
    test('ship unlocks',()=>!$('shipTab').disabled && !$('shipOwned').classList.contains('hidden'));
    startShipCombat();
    test('ship combat initializes',()=>!!S.ship.combat && S.ship.combat.enemies.length===2);
    renderShip();
    test('ship combat renders',()=>!$('shipCombat').classList.contains('hidden'));

    test('RC diagnostics',()=>rcStateIssues().length===0);
  }catch(e){
    report.failed.push(`smoke sequence: ${e.stack||e.message}`);
  }

  const status=report.failed.length?'FAIL':'PASS';
  document.body.dataset.smokeStatus=status;
  document.body.dataset.smokePassed=String(report.passed.length);
  document.body.dataset.smokeFailed=String(report.failed.length);
  window.__SABLE_REACH_SMOKE__=report;
  let pre=document.createElement('pre');
  pre.id='smokeReport';
  pre.textContent=JSON.stringify(report,null,2);
  pre.style.cssText='white-space:pre-wrap;background:#05070b;color:#fff;padding:12px;border:1px solid #444;margin:12px';
  document.body.appendChild(pre);
  return report;
}
window.__SABLE_REACH__={
  version:BUILD_INFO.version,
  diagnostics:()=>rcStateIssues(),
  smoke:runSableReachSmoke,
  state:()=>S
};
if(new URLSearchParams(location.search).get('smoke')==='1'){
  setTimeout(()=>runSableReachSmoke(),100);
}



/* =========================
   PHASES 49–50 — LIVING GALAXY & PERSISTENT WORLD
   Planetary hubs · location-aware markets · travel · heat · faction reactions · rivals
   ========================= */
const GALAXY_HUBS_50={
  sable:{id:'sable',name:'Sable Reach',world:'Vardos Minor',region:'Outer Rim frontier',summary:'The crew’s original frontier refuge: cheap berths, improvised repair bays, local brokers, and enough distance from major authorities to disappear for a while.',source:'Original Sable Reach setting',security:1,rarityMod:2,priceMod:1.00,restrictedPrice:1.00,restrictedRarity:0,nav:1,route:0,primaryFaction:'Local',factions:['Local','Guild'],env:['cantina','junkyard','crash','hangar'],jobs:['bounty','salvage','smuggling'],services:['lodging','clinic','shipyard','cantina','market']},
  tatooine:{id:'tatooine',name:'Mos Eisley',world:'Tatooine',region:'Outer Rim',summary:'A harsh Hutt-influenced spaceport where legal trade and criminal work overlap, making it useful for hunters, smugglers, and anyone avoiding questions.',source:'Rise of the Separatists · Tatooine profile',security:1,rarityMod:2,priceMod:1.02,restrictedPrice:.94,restrictedRarity:-1,nav:2,route:1,primaryFaction:'Hutts',factions:['Hutts','Guild'],env:['desert','cantina','hangar','chase'],jobs:['bounty','smuggling','salvage'],services:['lodging','clinic','shipyard','cantina','market','blackmarket','guild']},
  saleucami:{id:'saleucami',name:'Taleucema',world:'Saleucami',region:'Outer Rim',summary:'A rough frontier capital surrounded by dangerous terrain, independent operators, and enough criminal traffic to keep a bounty board busy.',source:'Mask of the Pirate Queen · Saleucami',security:2,rarityMod:2,priceMod:1.05,restrictedPrice:1.00,restrictedRarity:0,nav:2,route:1,primaryFaction:'Guild',factions:['Guild','Local'],env:['desert','grassland','cantina','jungle'],jobs:['bounty','salvage','rescue'],services:['lodging','clinic','shipyard','cantina','market','guild']},
  ordMantell:{id:'ordMantell',name:'Worlport',world:'Ord Mantell',region:'Mid Rim',summary:'A busy criminal crossroads where casinos, fixers, bounty contacts, and competing underworld interests turn information into currency.',source:'Mask of the Pirate Queen · Ord Mantell',security:2,rarityMod:1,priceMod:1.00,restrictedPrice:.95,restrictedRarity:-1,nav:2,route:2,primaryFaction:'Guild',factions:['Guild','Hutts','Local'],env:['cantina','chase','junkyard','hangar'],jobs:['bounty','heist','smuggling'],services:['lodging','clinic','shipyard','cantina','market','blackmarket','guild']},
  narShaddaa:{id:'narShaddaa',name:'Nar Shaddaa',world:'Nal Hutta moon',region:'Hutt Space',summary:'The Smuggler’s Moon: a dense trade world where black markets and illegal business are ordinary, but every favor has an owner.',source:'Lords of Nal Hutta · Nar Shaddaa',security:1,rarityMod:1,priceMod:1.06,restrictedPrice:.88,restrictedRarity:-2,nav:3,route:3,primaryFaction:'Hutts',factions:['Hutts','Guild'],env:['cantina','chase','hangar','lab'],jobs:['heist','smuggling','bounty'],services:['lodging','clinic','shipyard','cantina','market','blackmarket','guild','fixer']},
  bespin:{id:'bespin',name:'Cloud City',world:'Bespin',region:'Outer Rim',summary:'A polished cloudborne hub with wealthy visitors, tightly watched high-value commerce, casinos, industrial levels, and a shadowport underneath the glamour.',source:'The Jewel of Yavin · Cloud City',security:3,rarityMod:1,priceMod:1.10,restrictedPrice:1.20,restrictedRarity:1,nav:3,route:3,primaryFaction:'Local',factions:['Local','Empire'],env:['cantina','chase','hangar','lab'],jobs:['heist','smuggling','bounty'],services:['lodging','clinic','shipyard','cantina','market']},
  lothal:{id:'lothal',name:'Capital City',world:'Lothal',region:'Outer Rim',summary:'An Imperial-controlled population center with useful trade, active surveillance, and opportunities for crews willing to work with or against the occupation.',source:'Star Wars Encyclopedia · Lothal',security:4,rarityMod:2,priceMod:1.05,restrictedPrice:1.25,restrictedRarity:1,nav:3,route:4,primaryFaction:'Empire',factions:['Empire','Rebels','Local'],env:['battlefield','chase','hangar','grassland'],jobs:['rebel','rescue','smuggling'],services:['lodging','clinic','shipyard','cantina','market','rebel']},
  corellia:{id:'corellia',name:'Coronet City',world:'Corellia',region:'Core Worlds',summary:'A major manufacturing and starship center where excellent legal markets and ship services come with stronger Imperial scrutiny.',source:'Suns of Fortune · Corellia / Coronet City',security:4,rarityMod:0,priceMod:.95,restrictedPrice:1.28,restrictedRarity:2,nav:4,route:5,primaryFaction:'Empire',factions:['Empire','Local','Rebels'],env:['chase','junkyard','hangar','lab'],jobs:['heist','smuggling','rebel'],services:['lodging','clinic','shipyard','cantina','market']}
};
const ORIGIN_START_HUB_50={sable:'sable',guild:'ordMantell',rebel:'lothal',trader:'corellia',salvager:'saleucami',force:'tatooine'};
const RIVAL_TEMPLATES_50={
  Empire:{name:'Lt. Corda Venn',title:'Imperial Pursuit Officer',grudge:'Your crew has become a recurring name in restricted traffic reports.'},
  Guild:{name:'Rax Korda',title:'Rival Contract Hunter',grudge:'A competing hunter believes your crew has been taking contracts that should have been theirs.'},
  Hutts:{name:'Vexa’s Collector',title:'Kajidic Enforcer',grudge:'A Hutt account now lists your crew as an unresolved liability.'},
  Local:{name:'Daro Pell',title:'Local Fixer',grudge:'A local broker has lost money and face because of your crew.'}
};
Object.assign(SHIP_DESTINATIONS,Object.fromEntries(Object.entries(GALAXY_HUBS_50).map(([id,h])=>[id,{name:`${h.name} — ${h.world}`,diff:h.nav,desc:`${h.region}. ${h.summary}`}])));

function ensurePhase50State(){
  ensurePhase48State();S.schemaVersion=52;
  S.world=S.world||{};let W=S.world;
  W.day=Number.isFinite(W.day)?W.day:1;W.imperialHeat=Number.isFinite(W.imperialHeat)?W.imperialHeat:0;
  W.sectorHeat=W.sectorHeat&&typeof W.sectorHeat==='object'?W.sectorHeat:{};W.visited=W.visited&&typeof W.visited==='object'?W.visited:{};
  W.rivals=Array.isArray(W.rivals)?W.rivals:[];W.consequences=Array.isArray(W.consequences)?W.consequences:[];W.travelLog=Array.isArray(W.travelLog)?W.travelLog:[];
  W.contacts=W.contacts&&typeof W.contacts==='object'?W.contacts:{};W.localOffers=Array.isArray(W.localOffers)?W.localOffers:[];W.pendingEvent=W.pendingEvent||null;
  W.completedOps=Number.isFinite(W.completedOps)?W.completedOps:0;W.safehouses=W.safehouses&&typeof W.safehouses==='object'?W.safehouses:{};
  let loc=(S.ship?.location&&GALAXY_HUBS_50[S.ship.location])?S.ship.location:(W.currentHub&&GALAXY_HUBS_50[W.currentHub]?W.currentHub:'sable');
  W.currentHub=loc;W.visited[loc]=true;if(S.ship?.owned&&!GALAXY_HUBS_50[S.ship.location])S.ship.location=loc;
  for(const id of Object.keys(GALAXY_HUBS_50))if(!Number.isFinite(W.sectorHeat[id]))W.sectorHeat[id]=0;
}
const _p50Ensure16=ensurePhase16State;ensurePhase16State=function(){_p50Ensure16();ensurePhase50State()};
function hub50(id=null){ensurePhase50State();return GALAXY_HUBS_50[id||S.world.currentHub]||GALAXY_HUBS_50.sable}
function factionRep50(f){ensurePhase15State();return Number(S.ep15.rep?.[f]||0)}
function localHeat50(id=null){ensurePhase50State();return Number(S.world.sectorHeat[id||S.world.currentHub]||0)}
function heatLabel50(v){return v>=8?'HUNTED':v>=6?'WANTED':v>=4?'HOT':v>=2?'WATCHED':'CLEAR'}
function addWorldConsequence50(text,kind='world'){ensurePhase50State();S.world.consequences.unshift({day:S.world.day,text,kind});S.world.consequences=S.world.consequences.slice(0,30);gLog(text)}
function adjustHeat50(amount,reason='',hubId=null){ensurePhase50State();let id=hubId||S.world.currentHub;S.world.imperialHeat=Math.max(0,Math.min(10,S.world.imperialHeat+amount));S.world.sectorHeat[id]=Math.max(0,Math.min(10,(S.world.sectorHeat[id]||0)+amount));if(reason)addWorldConsequence50(`${amount>=0?'Heat rises':'Heat falls'} ${Math.abs(amount)} at ${hub50(id).name}: ${reason}.`,'heat')}
function hubPriceMod50(item){let h=hub50(),rep=factionRep50(h.primaryFaction),m=item?.restricted?h.restrictedPrice:h.priceMod;if(rep>=10)m*=.95;if(rep<=-10)m*=1.10;if(localHeat50()>=5)m*=1.05;return Math.max(.7,Math.min(1.6,m))}
function previewMarketTerms50(item){let h=hub50(),rarity=Math.max(0,(item?.rarity||0)+(item?.restricted?(h.restrictedRarity||0):0)),price=Math.max(1,Math.round((item?.price||0)*hubPriceMod50(item))),effective=Math.max(0,rarity+h.rarityMod+Math.floor(localHeat50()/5));let diff=effective<=1?0:effective<=3?1:effective<=5?2:effective<=7?3:effective<=9?4:5,upgrade=Math.max(0,effective-10);return{rarity,price,effective,diff,upgrade,modifier:effective-(item?.rarity||0)}}
marketRarityModifier=function(){let h=hub50();return h.rarityMod+Math.floor(localHeat50()/5)};
blackMarketTerms=function(item){let h=hub50(),rarity=Math.max(0,(item.rarity||0)+(item.restricted?(h.restrictedRarity||0):0)),price=Math.max(1,Math.round((item.price||0)*hubPriceMod50(item))),used=0,max=talentRank('Black Market Contacts');if(item.restricted&&max>0&&confirm(`Use Black Market Contacts for ${item.name}? Reduce rarity by up to ${max}; each rank used raises the locally adjusted price by 50%.`)){used=Math.max(0,Math.min(max,Number(prompt('Black Market Contacts ranks to use',String(max)))||0));rarity=Math.max(0,rarity-used);price=Math.round(price*(1+0.5*used))}return{rarity,price,used}};

function routeDifficulty50(from,to){let a=hub50(from),b=hub50(to);return Math.max(1,Math.min(5,1+Math.ceil(Math.abs((a.route||0)-(b.route||0))/2)+(b.nav>=4?1:0)))}
function routeDays50(from,to){let a=hub50(from),b=hub50(to);return Math.max(1,1+Math.abs((a.route||0)-(b.route||0)))}
function spawnRival50(faction,reason='',hubId=null){ensurePhase50State();let existing=S.world.rivals.find(r=>r.faction===faction&&r.status==='active');if(existing){existing.threat=Math.min(5,existing.threat+1);existing.hub=hubId||S.world.currentHub;existing.grudge=reason||existing.grudge;addWorldConsequence50(`${existing.name} escalates pursuit to threat ${existing.threat}.`,'rival');return existing}let t=RIVAL_TEMPLATES_50[faction]||RIVAL_TEMPLATES_50.Local,r={id:`rival-${Date.now()}-${Math.floor(Math.random()*9999)}`,name:t.name,title:t.title,faction,threat:1,status:'active',hub:hubId||S.world.currentHub,grudge:reason||t.grudge,encounters:0};S.world.rivals.push(r);addWorldConsequence50(`${r.name}, ${r.title}, enters the campaign as a recurring rival.`,'rival');return r}
function rivalPressure50(){ensurePhase50State();for(const r of S.world.rivals.filter(x=>x.status==='active'))if(S.world.completedOps>0&&S.world.completedOps%3===0){r.threat=Math.min(5,r.threat+1);r.hub=S.world.currentHub}}
function arrivalEvent50(dest){ensurePhase50State();let h=hub50(dest),pressure=S.world.imperialHeat+localHeat50(dest)+h.security;if(pressure>=8&&h.security>=3){S.world.pendingEvent={type:'checkpoint',hub:dest,title:`Inspection at ${h.name}`,text:'Local security has your transponder flagged for a secondary inspection. The crew must talk through it, find a fixer, or post an expensive bond.',diff:Math.min(5,h.security)};return}let rival=S.world.rivals.find(r=>r.status==='active'&&r.hub===dest&&r.threat>=2);if(rival)S.world.pendingEvent={type:'rival',hub:dest,rivalId:rival.id,title:`${rival.name} is waiting`,text:`${rival.grudge} The rival has tracked the crew to ${h.name}.`,diff:Math.min(5,1+rival.threat)}
}
function resolveArrival50(mode){ensurePhase50State();let e=S.world.pendingEvent;if(!e)return;if(e.type==='checkpoint'){let h=hub50(e.hub);if(mode==='bond'){let cost=250*h.security;if(S.credits<cost){bLog(`Inspection bond requires ${cost} credits.`);return}S.credits-=cost;ledgerEntry(-cost,`Inspection bond — ${h.name}`);addWorldConsequence50(`Paid a ${cost}-credit inspection bond at ${h.name}.`,'heat');S.world.pendingEvent=null}else{let skill=mode==='fixer'?'Streetwise':'Deception',q=performBest(skill,{diff:e.diff});if(q.r.ok){if(mode==='fixer'){let cost=100*h.security;if(S.credits>=cost){S.credits-=cost;ledgerEntry(-cost,`Fixer fee — ${h.name}`)}}S.world.sectorHeat[e.hub]=Math.max(0,localHeat50(e.hub)-1);addWorldConsequence50(`${q.q.actor.name} clears the ${h.name} inspection using ${skill}.`,'heat');S.world.pendingEvent=null}else{adjustHeat50(1,`failed ${skill} check at a security inspection`,e.hub);S.strain=Math.min(strainThreshold(),S.strain+2);S.world.pendingEvent=null}}}
  else if(e.type==='rival'){let r=S.world.rivals.find(x=>x.id===e.rivalId);if(mode==='evade'){let q=performBest('Stealth',{diff:e.diff});if(q.r.ok){addWorldConsequence50(`The crew loses ${r.name} in the crowds of ${hub50(e.hub).name}.`,'rival');r.hub=Object.keys(GALAXY_HUBS_50).find(x=>x!==e.hub)||'sable'}else{r.threat=Math.min(5,r.threat+1);adjustHeat50(1,`${r.name} forces the crew into a visible escape`,e.hub)}}else{let type=r.faction==='Empire'?'rebel':'bounty',op=buildOperation(type,Math.min(5,Math.max(2,r.threat)),opPick(hub50(e.hub).env));op.title=`Settle the Score · ${r.name}`;op.hook=`${r.grudge} This operation directly confronts the recurring rival.`;op.source='Sable Reach persistent rival system';op.worldRivalId=r.id;S.gmOps.board.unshift(op);addWorldConsequence50(`A direct operation against ${r.name} is added to the Operations board.`,'rival')}S.world.pendingEvent=null}
  renderAll();safeAutosave()
}
function travelGalaxy50(dest){ensurePhase50State();if(!S.ship?.owned){bLog('A hyperspace-capable ship is required to travel between hubs.');return}if(!GALAXY_HUBS_50[dest])return;let from=S.world.currentHub;if(dest===from){bLog(`The crew is already at ${hub50(dest).name}.`);return}let nav=stationActor('navigator'),diff=routeDifficulty50(from,dest),q=shipSkillPool(nav,'Astrogation',diff),r=rollNarr(q.p);if(!r.ok){let strain=Math.max(1,-r.na);S.ship.strain=Math.min(shipStats().strain+1,S.ship.strain+strain);shipLog(`Route to ${hub50(dest).name} fails. ${rtxt(r)} · +${strain} system strain.`);renderAll();return}let days=routeDays50(from,dest),recovery=Math.max(0,r.na);S.world.day+=days;S.world.currentHub=dest;S.world.visited[dest]=true;S.ship.location=dest;S.ship.strain=Math.max(0,S.ship.strain-recovery);let msg=`Day ${S.world.day}: ${nav.name} completes the jump from ${hub50(from).name} to ${hub50(dest).name} (${days} day${days===1?'':'s'}).`;S.world.travelLog.unshift(msg);S.world.travelLog=S.world.travelLog.slice(0,24);shipLog(`${msg} ${rtxt(r)}${recovery?` · recovered ${recovery} system strain`:''}`);arrivalEvent50(dest);renderAll();renderNavTab('galaxy');safeAutosave()}
plotShipCourse=function(){let dest=$('shipDestination')?.value;if(GALAXY_HUBS_50[dest])return travelGalaxy50(dest);return bLog('Select a recognized galactic hub.')};

function localOperation50(){let h=hub50(),type=opPick(h.jobs),env=opPick(h.env),threat=Math.max(1,Math.min(5,1+Math.floor(Math.random()*4)+Math.floor((localHeat50()+h.security)/5))),op=buildOperation(type,threat,env);op.hub=S.world.currentHub;op.location=h.name;op.source=`${op.source} · Localized at ${h.name}`;if(h.factions.length){let f=opPick(h.factions);op.repFaction=f;if(f==='Empire'&&type==='rebel')op.repFaction='Rebels'}let rep=factionRep50(h.primaryFaction);op.credits=Math.max(100,Math.round(op.credits*(1+(rep>=10?.08:rep<=-10?.15:0))));return op}
function refreshLocalJobs50(){ensurePhase50State();S.world.localOffers=[localOperation50(),localOperation50(),localOperation50()];renderGalaxy50();safeAutosave()}
function acceptLocalJob50(id){let i=S.world.localOffers.findIndex(x=>x.id===id);if(i<0)return;let op=S.world.localOffers[i];S.world.localOffers.splice(i,1);S.gmOps.board.unshift(op);acceptOperation(op.id);renderAll();renderNavTab('gm')}
function useHubService50(service){ensurePhase50State();let h=hub50();if(!h.services.includes(service))return;if(service==='lodging'){let cost=Math.round(40*h.priceMod);if(S.credits<cost){bLog(`A secure berth costs ${cost} credits.`);return}S.credits-=cost;ledgerEntry(-cost,`Secure lodging — ${h.name}`);startNewDay();S.world.day++;S.world.sectorHeat[h.id]=Math.max(0,localHeat50(h.id)-1);if(S.world.imperialHeat>0&&h.security<=2)S.world.imperialHeat--;addWorldConsequence50(`The crew lays low for a day at ${h.name}; local attention cools.`,'heat')}
  if(service==='clinic'){let cost=Math.max(75,Math.round((75+S.wounds*30+S.criticals.length*175)*h.priceMod));if(S.credits<cost){bLog(`Clinic treatment costs ${cost} credits.`);return}S.credits-=cost;ledgerEntry(-cost,`Clinic treatment — ${h.name}`);S.wounds=Math.max(0,S.wounds-5);S.strain=0;addWorldConsequence50(`Clinic treatment at ${h.name} restores the crew leader and stabilizes the campaign between jobs.`,'service')}
  if(service==='shipyard'){dockyardRepair()}
  if(service==='cantina'){refreshLocalJobs50()}
  if(service==='guild'){let rep=factionRep50('Guild');if(rep<0){bLog('Guild contacts are not interested while Guild reputation is negative.');return}adjustFactionRep('Guild',1);addWorldConsequence50(`A Guild contact at ${h.name} trades leads with the crew. Guild reputation +1.`,'faction')}
  if(service==='rebel'){let rep=factionRep50('Rebels');if(rep<5&&S.origin!=='rebel'){bLog('No trusted Rebel cell will expose itself to the crew yet.');return}S.world.safehouses[h.id]=true;adjustHeat50(-1,'Rebel contacts help alter the crew’s trail',h.id);addWorldConsequence50(`The crew gains access to a Rebel safehouse at ${h.name}.`,'faction')}
  if(service==='fixer'){let cost=250+localHeat50()*100;if(S.credits<cost){bLog(`A local fixer wants ${cost} credits.`);return}let q=performBest('Streetwise',{diff:Math.max(1,h.security-1)});if(q.r.ok){S.credits-=cost;ledgerEntry(-cost,`Fixer payment — ${h.name}`);S.world.sectorHeat[h.id]=Math.max(0,localHeat50()-2);if(S.world.imperialHeat>0)S.world.imperialHeat--;addWorldConsequence50(`A fixer scrubs local records and reroutes questions away from the crew.`,'heat')}else adjustHeat50(1,'the wrong fixer was approached',h.id)}
  renderAll();safeAutosave()
}
function generateOperationOffers(count=3){ensurePhase50State();let tc=$('opType')?.value||'any',th=$('opThreat')?.value||'any',ev=$('opEnvironment')?.value||'any',h=hub50();for(let i=0;i<count;i++){let type=tc==='any'?opPick(h.jobs):tc,env=ev==='any'?opPick(h.env):ev,op=buildOperation(type,th,env);op.hub=h.id;op.location=h.name;op.source=`${op.source} · ${h.name}`;S.gmOps.board.unshift(op)}S.gmOps.board=S.gmOps.board.slice(0,12);renderOperations();safeAutosave()}
const _p50BuildOperation=buildOperation;buildOperation=function(typeChoice='any',threatChoice='any',envChoice='any'){let h=hub50(),type=typeChoice==='any'?opPick(h.jobs):typeChoice,env=envChoice==='any'?opPick(h.env):envChoice,op=_p50BuildOperation(type,threatChoice,env);op.hub=h.id;op.location=h.name;let rival=S.world.rivals.find(r=>r.status==='active'&&r.hub===h.id&&r.threat>=3);if(rival){op.twist+=` Recurring rival ${rival.name} is also active in this system.`;op.rivalPressure=rival.id}return op};
const _p50ClaimOperationReward=claimOperationReward;claimOperationReward=function(){let op=S.gmOps?.current?S.gmOps.current:null;if(!op)return;let type=op.type,comp=op.complicationActive,rivalId=op.worldRivalId||op.rivalPressure;_p50ClaimOperationReward();ensurePhase50State();S.world.completedOps++;let delta={heist:2,smuggling:2,rebel:3,rescue:2,bounty:1,salvage:0,force:1}[type]??1;if(comp)delta++;if(delta)adjustHeat50(delta,`${op.title} drew attention`,op.hub||S.world.currentHub);else if(S.world.completedOps%2===0)adjustHeat50(-1,'a quiet operation lets attention drift elsewhere',op.hub||S.world.currentHub);if(rivalId){let r=S.world.rivals.find(x=>x.id===rivalId);if(r&&op.worldRivalId){r.status='defeated';addWorldConsequence50(`${r.name} is removed as an active rival after ${op.title}.`,'rival')}else if(r)r.threat=Math.min(5,r.threat+1)}if(S.world.imperialHeat>=5&&!S.world.rivals.some(r=>r.faction==='Empire'&&r.status==='active'))spawnRival50('Empire','Repeated operations have created an Imperial pursuit file.',S.world.currentHub);if(factionRep50('Hutts')<=-5&&!S.world.rivals.some(r=>r.faction==='Hutts'&&r.status==='active'))spawnRival50('Hutts','Negative Hutt reputation has become a collection problem.',S.world.currentHub);if(factionRep50('Guild')<=-5&&!S.world.rivals.some(r=>r.faction==='Guild'&&r.status==='active'))spawnRival50('Guild','The Guild considers the crew unreliable and a rival hunter has been encouraged to interfere.',S.world.currentHub);rivalPressure50();renderAll();safeAutosave()};

const _p50ApplyOrigin=applyStartingOrigin;applyStartingOrigin=function(){let before=!!S.originApplied;_p50ApplyOrigin();ensurePhase50State();if(!before&&S.originApplied&&S.origin!=='legacy'){let id=ORIGIN_START_HUB_50[S.origin]||'sable';S.world.currentHub=id;S.world.visited[id]=true;if(S.ship?.owned)S.ship.location=id;addWorldConsequence50(`Campaign begins at ${hub50(id).name} on ${hub50(id).world}.`,'origin')}safeAutosave()};

function renderGalaxy50(){if(!$('galaxy'))return;ensurePhase50State();let h=hub50(),lh=localHeat50();$('galaxyDay50').textContent=S.world.day;$('galaxyHeat50').textContent=S.world.imperialHeat;$('galaxyLocation50').textContent=h.name;$('galaxyHeatTag50').textContent=`${heatLabel50(lh)} · Local Heat ${lh}`;$('galaxyHeatTag50').className=`tag ${lh>=6?'bad':lh>=3?'gold':'good'}`;
  $('galaxyCurrent50').innerHTML=`<b>${opEsc(h.name)}</b> · ${opEsc(h.world)}<div class="small" style="margin-top:5px">${opEsc(h.summary)}</div><div class="pills" style="margin-top:8px"><span class="pill">${opEsc(h.region)}</span><span class="pill">Security ${h.security}/5</span><span class="pill">Market rarity +${h.rarityMod+Math.floor(lh/5)}</span><span class="pill">Primary ${opEsc(h.primaryFaction)} rep ${factionRep50(h.primaryFaction)}</span></div><div class="tiny" style="margin-top:7px">Source: ${opEsc(h.source)}</div>`;
  const labels={lodging:'Secure Lodging / Lay Low',clinic:'Clinic Treatment',shipyard:'Dockyard Service',cantina:'Cantina / Job Leads',market:'Local Market',blackmarket:'Black-Market Access',guild:'Guild Contact',rebel:'Rebel Safehouse',fixer:'Records Fixer'};$('galaxyServices50').innerHTML=h.services.filter(x=>x!=='market'&&x!=='blackmarket').map(s=>`<button class="btn" data-hubservice50="${s}">${labels[s]||s}</button>`).join('')+`<button class="btn" data-hubmarket50>Open ${h.services.includes('blackmarket')?'Market / Black Market':'Market'}</button>`;document.querySelectorAll('[data-hubservice50]').forEach(b=>b.onclick=()=>useHubService50(b.dataset.hubservice50));document.querySelectorAll('[data-hubmarket50]').forEach(b=>b.onclick=()=>renderNavTab('equipment'));
  if(!$('galaxyJobs50').dataset.bound){$('galaxyJobs50').onclick=refreshLocalJobs50;$('galaxyJobs50').dataset.bound='1'}if(!S.world.localOffers.length)S.world.localOffers=[localOperation50(),localOperation50(),localOperation50()];$('galaxyJobsList50').innerHTML=S.world.localOffers.map(o=>`<div class="item"><div class="row"><div><b>${opEsc(o.title)}</b><div class="tiny">${opEsc(o.kind)} · ${opThreatName(o.threat)} · ${opEsc(o.patron)}</div></div><button class="btn" data-localop50="${o.id}">Take Job</button></div><div class="small" style="margin-top:5px">${opEsc(o.hook)}</div><div class="tiny" style="margin-top:6px">${o.credits.toLocaleString()} cr · ${o.xp} XP · ${opEsc(o.location||h.name)}</div></div>`).join('');document.querySelectorAll('[data-localop50]').forEach(b=>b.onclick=()=>acceptLocalJob50(b.dataset.localop50));
  $('galaxyDestinations50').innerHTML=Object.values(GALAXY_HUBS_50).map(d=>{let here=d.id===h.id,diff=routeDifficulty50(h.id,d.id),days=routeDays50(h.id,d.id),visited=!!S.world.visited[d.id];return`<div class="item"><div class="row"><div><b>${opEsc(d.name)}</b><div class="small">${opEsc(d.world)} · ${opEsc(d.region)}</div></div><span class="tag ${here?'good':''}">${here?'CURRENT':visited?'VISITED':'UNVISITED'}</span></div><div class="small" style="margin-top:6px">${opEsc(d.summary)}</div><div class="tiny" style="margin-top:7px">Astrogation ${acquisitionLabel(diff)} · ~${days} day${days===1?'':'s'} · Security ${d.security}/5 · Market +${d.rarityMod}</div><button class="btn primary" data-galaxytravel50="${d.id}" style="margin-top:8px" ${here||!S.ship?.owned?'disabled':''}>${S.ship?.owned?'Plot Course':'Ship Required'}</button></div>`}).join('');document.querySelectorAll('[data-galaxytravel50]').forEach(b=>b.onclick=()=>travelGalaxy50(b.dataset.galaxytravel50));
  $('galaxyRivals50').innerHTML=S.world.rivals.length?S.world.rivals.map(r=>`<div class="item"><div class="row"><div><b>${opEsc(r.name)}</b><div class="tiny">${opEsc(r.title)} · ${opEsc(r.faction)}</div></div><span class="tag ${r.status==='active'?'bad':'good'}">${r.status.toUpperCase()}</span></div><div class="small" style="margin-top:5px">${opEsc(r.grudge)}</div><div class="tiny" style="margin-top:6px">Threat ${r.threat}/5 · Last known: ${opEsc(hub50(r.hub).name)}</div></div>`).join(''):'<div class="small">No recurring rivals are actively pursuing the crew.</div>';
  $('galaxyConsequences50').innerHTML=S.world.consequences.length?S.world.consequences.slice(0,16).map(x=>`<div><span class="tiny">Day ${x.day}</span> · ${opEsc(x.text)}</div>`).join(''):'<div class="small">Major campaign consequences will appear here as the crew makes enemies, allies, and noise.</div>';$('galaxyTravelLog50').innerHTML=S.world.travelLog.length?S.world.travelLog.map(x=>`<div>${opEsc(x)}</div>`).join(''):'<div class="small">No interstellar travel logged yet.</div>';
  let e=S.world.pendingEvent,box=$('galaxyArrival50');box.classList.toggle('hidden',!e);if(e){if(e.type==='checkpoint')box.innerHTML=`<div class="row"><div><b>${opEsc(e.title)}</b><div class="small">${opEsc(e.text)}</div></div><span class="tag bad">ARRIVAL EVENT</span></div><div class="pills" style="margin-top:8px"><button class="btn" data-arrival50="bluff">Bluff Inspection</button><button class="btn" data-arrival50="fixer">Find a Fixer</button><button class="btn" data-arrival50="bond">Post Inspection Bond</button></div>`;else{let r=S.world.rivals.find(x=>x.id===e.rivalId);box.innerHTML=`<div class="row"><div><b>${opEsc(e.title)}</b><div class="small">${opEsc(e.text)}</div></div><span class="tag bad">RIVAL</span></div><div class="pills" style="margin-top:8px"><button class="btn" data-arrival50="evade">Evade ${opEsc(r?.name||'Rival')}</button><button class="btn danger" data-arrival50="confront">Generate Confrontation</button></div>`}document.querySelectorAll('[data-arrival50]').forEach(b=>b.onclick=()=>resolveArrival50(b.dataset.arrival50))}
}

const _p50RenderEquipment=renderEquipment;renderEquipment=function(){ensurePhase50State();_p50RenderEquipment();if(!$('shopList'))return;let h=hub50(),filter=$('shopFilter')?.value||'all',q=($('shopSearch')?.value||'').trim().toLowerCase(),list=Object.values(ITEMS).filter(i=>['weapon','armor','gear'].includes(i.type));if(filter!=='all')list=list.filter(i=>i.type===filter);if(q)list=list.filter(i=>`${i.name} ${itemSummary(i)} ${i.source||''}`.toLowerCase().includes(q));let heading=$('shopList').closest('.card')?.querySelector('b');if(heading)heading.textContent=`${h.name} Market`;let help=$('shopList').closest('.card')?.querySelector('.small');if(help)help.textContent=`Local availability uses ${h.name}'s market modifier (+${h.rarityMod}), security, heat, and faction reputation. Restricted goods may be easier or harder depending on the hub.`;$('shopList').innerHTML=list.map(i=>{let p=previewMarketTerms50(i),skill=i.restricted?'Streetwise':'Negotiation',owned=i.id!=='stimpack'&&i.id!=='extraReload'&&S.inventory.includes(i.id);return`<div class="item"><div class="row"><div><b>${i.name}</b><div class="small">${itemSummary(i)}</div><div class="tiny">${p.price.toLocaleString()} local cr · base Rarity ${i.rarity??0}${i.restricted?' · Restricted':''} · effective Rarity ${p.effective} · ${skill} ${acquisitionLabel(p.diff)}${p.upgrade?` + ${p.upgrade} upgrade(s)`:''} · ${i.source||''}</div></div><button class="btn" data-buy="${i.id}" ${S.credits<p.price||owned?'disabled':''}>${owned?'Owned':'Locate & Buy'}</button></div></div>`}).join('');document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>attemptPurchase(b.dataset.buy))};
const _p50RenderShip=renderShip;renderShip=function(){ensurePhase50State();_p50RenderShip();if(!S.ship?.owned)return;let h=hub50();$('shipLocation').textContent=`${h.name} · ${h.world}`;$('shipDestination').innerHTML=Object.values(GALAXY_HUBS_50).map(d=>`<option value="${d.id}" ${d.id===S.world.currentHub?'selected':''}>${d.name} — ${d.world}</option>`).join('');let dest=$('shipDestination').value,diff=routeDifficulty50(S.world.currentHub,dest),nav=stationActor('navigator'),q=shipSkillPool(nav,'Astrogation',diff);$('shipTravelPreview').innerHTML=`${hub50(dest).summary}<br><b>${nav.name}</b>: Astrogation ${q.rank} · ${ptxt(q.p)} · approximately ${routeDays50(S.world.currentHub,dest)} day(s).`;$('shipDestination').onchange=renderShip;$('shipTravelBtn').onclick=plotShipCourse;if($('shipMarket')){$('shipMarket').innerHTML=Object.values(SHIP_MODELS).filter(m=>!S.ship.ownedModels.includes(m.id)).map(m=>{let p=previewMarketTerms50(m),skill=m.restricted?'Streetwise':'Negotiation';return`<div class="item"><div class="row"><div><b>${m.name}</b><div class="small">${m.class} · Sil ${m.silhouette} · Speed ${m.speed} · Handling ${m.handling>=0?'+':''}${m.handling} · Defense ${m.defense} · Armor ${m.armor} · Hull ${m.hull} · Strain ${m.strain}</div><div class="tiny">${p.price.toLocaleString()} local cr · Rarity ${m.rarity}${m.restricted?' · Restricted':''} · ${skill} ${acquisitionLabel(p.diff)} at ${h.name} · ${m.source}</div></div><button class="btn" data-shipbuy="${m.id}" ${S.credits<p.price?'disabled':''}>Locate & Buy</button></div></div>`}).join('')||'<div class="small">Every currently playable ship chassis is already in your hangar.</div>';document.querySelectorAll('[data-shipbuy]').forEach(b=>b.onclick=()=>purchaseShipModel(b.dataset.shipbuy))}};

const _p50RenderGuide=renderGuide;renderGuide=function(){ensurePhase50State();_p50RenderGuide();if(S.finalized&&$('globalObjective')){let h=hub50();$('globalObjective').innerHTML=`${$('globalObjective').innerHTML}<div class="tiny" style="margin-top:4px">Galaxy: ${opEsc(h.name)} · Imperial Heat ${S.world.imperialHeat}/10 · ${S.world.rivals.filter(r=>r.status==='active').length} active rival(s).</div>`}};
const _p50RenderAll=renderAll;renderAll=function(){ensurePhase50State();_p50RenderAll();renderGalaxy50()};
document.querySelectorAll('#nav button[data-tab]').forEach(b=>b.onclick=()=>{if(b.disabled)return;renderNavTab(b.dataset.tab)});
window.addEventListener('keydown',e=>{let tag=(e.target?.tagName||'').toLowerCase();if(['input','select','textarea'].includes(tag)||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key.toLowerCase()==='x'){e.preventDefault();renderNavTab('galaxy')}});

RULE_AUDIT.unshift(
 {id:'galaxy49',name:'Phase 49 galactic hubs and travel',status:'adapted',source:'Suns of Fortune; Lords of Nal Hutta; The Jewel of Yavin; Mask of the Pirate Queen; Rise of the Separatists; Star Wars Encyclopedia',detail:'Named hubs and broad setting identities are source-grounded. Route difficulty, travel duration, services, local market modifiers, and hub-specific job weighting are transparent Sable Reach solo-game abstractions.'},
 {id:'world50',name:'Phase 50 persistent world consequences',status:'adapted',source:'Original Sable Reach campaign layer informed by published adventure consequence structures',detail:'Operations can now raise or lower Imperial/local heat, create arrival inspections, generate recurring rivals, react to faction reputation, unlock safehouse/fixer interactions, and preserve a consequence/travel history across saves.'}
);
const _p50Diagnostics=phase45Diagnostics;phase45Diagnostics=function(){let rows=_p50Diagnostics();const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});ensurePhase50State();add('Phase 49 galaxy hubs',Object.keys(GALAXY_HUBS_50).length>=8,`${Object.keys(GALAXY_HUBS_50).length} travel hubs`);add('Phase 49 location market',Number.isFinite(previewMarketTerms50(WEAPONS.carbine||Object.values(WEAPONS)[0]).price),'location-aware price/rarity preview');add('Phase 50 persistent world state',!!S.world&&Array.isArray(S.world.rivals)&&Array.isArray(S.world.consequences),'heat/rivals/consequences initialized');add('Phase 50 save schema',S.schemaVersion===52&&BUILD_INFO.saveSchema===52,'schema 52');return rows};
const _p50Smoke=runSableReachSmoke;runSableReachSmoke=async function(){let report=await _p50Smoke();const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};ensurePhase50State();test('Phase 49 exposes eight galactic hubs',()=>Object.keys(GALAXY_HUBS_50).length===8);test('Phase 49 all hubs provide environment and jobs',()=>Object.values(GALAXY_HUBS_50).every(h=>h.env.length&&h.jobs.length&&h.services.length));test('Phase 49 route model varies by destination',()=>routeDifficulty50('sable','corellia')>routeDifficulty50('sable','tatooine'));test('Phase 50 heat is clamped',()=>{let a=S.world.imperialHeat;S.world.imperialHeat=9;adjustHeat50(5);let ok=S.world.imperialHeat===10;S.world.imperialHeat=a;return ok});test('Phase 50 rival template spawns',()=>{let oldRivals=JSON.parse(JSON.stringify(S.world.rivals)),oldConsequences=JSON.parse(JSON.stringify(S.world.consequences));let r=spawnRival50('Guild','smoke test','sable'),ok=!!r&&r.faction==='Guild';S.world.rivals=oldRivals;S.world.consequences=oldConsequences;return ok});test('Phase 50 schema target',()=>BUILD_INFO.saveSchema===52&&S.schemaVersion===52&&serializableState().schemaVersion===52);renderGalaxy50();test('Phase 49 galaxy UI renders',()=>!!$('galaxyCurrent50')&&$('galaxyDestinations50').children.length===8);document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report};


/* =========================
   PHASES 51–52 — PLANETARY EXPLORATION + MOBILE UX
   District maps · local NPCs · discoveries · touch navigation · iPhone-friendly layout
   ========================= */
const DISTRICTS_51={
  sable:[
    {id:'landing',name:'Frontier Landing Pad',kind:'spaceport',skill:'Perception',diff:1,desc:'A patched-together landing field where captains trade route gossip beside coolant carts and cargo pallets.',source:'Original Sable Reach setting',services:['shipyard','market'],npcs:[['Mira Venn','Dockmaster','Local','Perception'],['Orrik Dane','Freight Broker','Guild','Negotiation']]},
    {id:'brokers',name:"Broker's Row",kind:'market',skill:'Streetwise',diff:2,desc:'A cramped strip of brokers, pawn counters, message booths, and private contract rooms.',source:'Original Sable Reach setting',services:['market','cantina'],npcs:[['Talo Brinn','Information Broker','Local','Streetwise'],['Kesh Ardo','Contract Clerk','Guild','Knowledge (Underworld)']]},
    {id:'salvage',name:'Salvage Yards',kind:'junkyard',skill:'Mechanics',diff:2,desc:'Old hull plates, stripped droids, engine housings, and forgotten cargo make the yard dangerous but profitable to search.',source:'Original Sable Reach setting',services:['shipyard'],npcs:[['Bexa Tor','Salvage Foreman','Local','Mechanics']]},
    {id:'relay',name:'Old Relay Ridge',kind:'outskirts',skill:'Computers',diff:2,desc:'A weather-beaten communications relay overlooks the settlement. Most arrays are dead; a few still whisper into space.',source:'Original Sable Reach setting',services:[],npcs:[['N4-VI','Relay Maintenance Droid','Local','Computers']]}
  ],
  tatooine:[
    {id:'spaceport',name:'Mos Eisley Spaceport',kind:'spaceport',skill:'Streetwise',diff:2,desc:'Docking bays, freight yards, customs desks, and hired security make this the fastest place to arrive—and the easiest place to be noticed.',source:'Rise of the Separatists · Tatooine / Sable Reach adaptation',services:['shipyard','market'],npcs:[['Daro Kint','Docking Agent','Local','Negotiation'],['Vexa Ruun','Freight Fixer','Hutts','Streetwise']]},
    {id:'cantina',name:'Cantina Quarter',kind:'cantina',skill:'Streetwise',diff:2,desc:'Music, pilots, mercenaries, rumor sellers, and beings avoiding official attention crowd the drinking houses around the port.',source:'Tatooine setting · Sable Reach district abstraction',services:['cantina','guild'],npcs:[['Pavo Tern','Guild Spotter','Guild','Knowledge (Underworld)'],['Rinna Vos','Cantina Keeper','Local','Charm']]},
    {id:'bazaar',name:'Central Bazaar',kind:'market',skill:'Negotiation',diff:2,desc:'Shaded stalls sell water, machine parts, scavenged electronics, survival supplies, and goods whose ownership is negotiable.',source:'Tatooine setting · Sable Reach district abstraction',services:['market','blackmarket'],npcs:[['Jek Tavo','Parts Merchant','Local','Negotiation']]},
    {id:'outskirts',name:'Dune Outskirts',kind:'wilderness',skill:'Survival',diff:3,desc:'Beyond the dense port, the city gives way quickly to hardpan, dunes, scavenger trails, and very little help.',source:'Rise of the Separatists · Tatooine terrain',services:[],npcs:[['Ari Nemm','Desert Guide','Local','Survival']]}
  ],
  saleucami:[
    {id:'spaceport',name:'Taleucema Spaceport',kind:'spaceport',skill:'Perception',diff:2,desc:'Freighters, bounty hunters, and expedition craft come and go beneath the dust of Saleucami’s frontier capital.',source:'Mask of the Pirate Queen · Taleucema',services:['shipyard','market'],npcs:[['Seri Vann','Landing Coordinator','Local','Perception']]},
    {id:'paradise',name:'The Paradise',kind:'cantina',skill:'Streetwise',diff:2,desc:'A cantina where contracts can be concluded behind closed doors and careful people avoid discussing business over open comms.',source:'Mask of the Pirate Queen · The Paradise',services:['cantina','guild'],npcs:[['Nira Pell','Contract Host','Guild','Negotiation'],['Tesk Mora','Bounty Regular','Guild','Streetwise']]},
    {id:'trade',name:'Trade Quarter',kind:'market',skill:'Negotiation',diff:2,desc:'Warehouses, small merchants, public terminals, expedition outfitters, and quiet criminal middlemen share the same streets.',source:'Mask of the Pirate Queen · Taleucema adaptation',services:['market'],npcs:[['Kreel Odo','Fence','Guild','Knowledge (Underworld)']]},
    {id:'saleuquest',name:'SaleuQuest Offices',kind:'office',skill:'Computers',diff:3,desc:'A legitimate overland-tour company occupies an unremarkable office here; the public network gives persistent slicers something to investigate.',source:'Mask of the Pirate Queen · SaleuQuest Overland Adventures',services:[],npcs:[['L4-ND','Public Kiosk Droid','Local','Computers']]}
  ],
  ordMantell:[
    {id:'morro',name:'Morro Spaceport',kind:'spaceport',skill:'Streetwise',diff:2,desc:'Worlport’s central hub is busy with freighters and pleasure craft. Captains who value their ships arrange their own ground security.',source:'Mask of the Pirate Queen · Morro Spaceport',services:['shipyard','market'],npcs:[['Jani Rell','Bay Security Broker','Local','Negotiation']]},
    {id:'coins',name:'Path of Coins',kind:'casino',skill:'Cool',diff:2,desc:'Casinos and gambling halls run from the spaceport toward Government Circle, keeping the district active at every hour.',source:'Mask of the Pirate Queen · Path of Coins',services:['cantina','market','guild'],npcs:[['Mara Jinn','Casino Host','Local','Charm'],['Toll Vesk','Odds Runner','Guild','Streetwise']]},
    {id:'breakwater',name:'Breakwater',kind:'waterfront',skill:'Streetwise',diff:2,desc:'A rough neighborhood near Worlport Bay where clean flophouses sit close to docks, smugglers, and people who prefer discretion.',source:'Mask of the Pirate Queen · Breakwater',services:['lodging','cantina'],npcs:[['Jessa Marr','Flophouse Keeper','Local','Charm']]},
    {id:'industrial',name:'Industrial District',kind:'industrial',skill:'Skulduggery',diff:3,desc:'Warehouses and loading bays hide ordinary commerce and more secretive operations. Lifts and service corridors disappear underground.',source:'Mask of the Pirate Queen · Industrial District',services:['blackmarket'],npcs:[['Corl Dain','Warehouse Foreman','Local','Skulduggery']]},
    {id:'whitezone',name:'The White Zone',kind:'imperial',skill:'Deception',diff:4,desc:'The former Republic garrison is now an Imperial enclave whose stormtrooper patrols increasingly spill into the surrounding city.',source:'Mask of the Pirate Queen · White Zone',services:[],npcs:[['Lt. Serren','Imperial Liaison','Empire','Discipline']]}
  ],
  narShaddaa:[
    {id:'landing',name:'Landing Towers',kind:'spaceport',skill:'Streetwise',diff:2,desc:'Landing bays stack between towers, warehouses, refueling spires, and traffic lanes where every service has three prices.',source:'Lords of Nal Hutta · Nar Shaddaa / Sable Reach abstraction',services:['shipyard','market'],npcs:[['Ruvo Pell','Dock Fixer','Hutts','Streetwise']]},
    {id:'promenade',name:'Upper Promenade',kind:'market',skill:'Negotiation',diff:2,desc:'Bright signs and expensive fronts make illegal commerce look almost respectable—until someone asks who owns the block.',source:'Lords of Nal Hutta · Nar Shaddaa adaptation',services:['market','cantina','guild'],npcs:[['Soola Venn','Deal Broker','Hutts','Negotiation'],['Krix Tal','Hunter Liaison','Guild','Knowledge (Underworld)']]},
    {id:'blackmarket',name:'Black-Market Spine',kind:'blackmarket',skill:'Knowledge (Underworld)',diff:3,desc:'Restricted weapons, illicit cybernetics, falsified documents, and contraband change hands behind layers of intermediaries.',source:'Lords of Nal Hutta · black-market identity / Sable Reach abstraction',services:['blackmarket','fixer'],npcs:[['Varko Nill','Contraband Factor','Hutts','Knowledge (Underworld)']]},
    {id:'depths',name:'Lower Levels',kind:'underlevels',skill:'Vigilance',diff:3,desc:'The deeper city is darker, more toxic, and less governed. People disappear here without generating paperwork.',source:'Lords of Nal Hutta · Nar Shaddaa lower levels',services:[],npcs:[['Eli Voss','Underlevel Guide','Local','Vigilance']]}
  ],
  bespin:[
    {id:'porttown',name:'Port Town / Market Row',kind:'shadowport',skill:'Streetwise',diff:2,desc:'Cloud City’s seedier arrival district mixes shadowport traffic, back-alley meetings, and market stalls below the polished tourist levels.',source:'The Jewel of Yavin · Port Town / Market Row',services:['shipyard','market','cantina'],npcs:[['Pira Seln','Shadowport Broker','Local','Streetwise']]},
    {id:'tourist',name:'Tourist District',kind:'tourist',skill:'Charm',diff:2,desc:'Hotels, galleries, fine dining, casinos, and carefully managed views cater to visitors with money to spend.',source:'The Jewel of Yavin · Tourist District',services:['lodging','clinic','market'],npcs:[['Lysa Venn','Guest Concierge','Local','Charm']]},
    {id:'industrial',name:'Industrial Levels',kind:'industrial',skill:'Mechanics',diff:3,desc:'Processing infrastructure, maintenance corridors, and service lifts keep Cloud City alive far from the glamorous promenades.',source:'The Jewel of Yavin · Industrial Levels',services:['shipyard'],npcs:[['M4-K7','Maintenance Foreman Droid','Local','Mechanics']]},
    {id:'museum',name:'Figg Museum District',kind:'secure',skill:'Perception',diff:3,desc:'Private security, wealthy patrons, and cultural institutions make this a tempting district for crews who enjoy impossible jobs.',source:'The Jewel of Yavin · Figg & Associates Art Museum',services:[],npcs:[['Cala Bren','Museum Researcher','Local','Knowledge (Core Worlds)']]}
  ],
  lothal:[
    {id:'spaceport',name:'Capital City Spaceport',kind:'spaceport',skill:'Deception',diff:3,desc:'Cargo and passenger traffic move beneath increasingly watchful Imperial administration.',source:'Lothal setting · Sable Reach district abstraction',services:['shipyard','market'],npcs:[['Nell Daro','Cargo Clerk','Local','Negotiation']]},
    {id:'market',name:'Market District',kind:'market',skill:'Streetwise',diff:2,desc:'Farm goods, imported machinery, and quiet resistance sympathies circulate beneath ordinary commerce.',source:'Lothal Capital City · Sable Reach abstraction',services:['market','cantina'],npcs:[['Kira Pell','Market Organizer','Local','Streetwise']]},
    {id:'industrial',name:'Industrial Zone',kind:'industrial',skill:'Mechanics',diff:3,desc:'Imperial extraction and manufacturing have tightened security around freight lines and industrial yards.',source:'Lothal occupation · Sable Reach abstraction',services:[],npcs:[['Bren Tar','Factory Technician','Local','Mechanics'],['Sgt. Varo','Imperial Patrol NCO','Empire','Vigilance']]},
    {id:'outskirts',name:'Old Communications Outskirts',kind:'outskirts',skill:'Stealth',diff:3,desc:'Abandoned infrastructure beyond the dense city offers observation points, hidden meetings, and routes that avoid official gates.',source:'Star Wars Encyclopedia · Lothal communications tower / Sable Reach abstraction',services:['rebel'],npcs:[['Nara Senn','Rebel Courier','Rebels','Stealth']]}
  ],
  corellia:[
    {id:'spaceport',name:'Coronet Spaceport',kind:'spaceport',skill:'Deception',diff:3,desc:'Major travel funnels through heavily administered docks where documentation and Imperial scrutiny matter.',source:'Corellia setting · Coronet Spaceport',services:['shipyard','market'],npcs:[['Teren Vale','Emigration Clerk','Empire','Discipline'],['Bo Krail','Independent Captain','Local','Piloting (Space)']]},
    {id:'blue',name:'Blue Sector / Treasure Ship Row',kind:'market',skill:'Negotiation',diff:2,desc:'A lively commercial district built around spacers, specialty shops, entertainment, and generations of Corellian traffic.',source:'Suns of Fortune · Blue Sector / Treasure Ship Row',services:['market','cantina','guild'],npcs:[['Sela Marr','Ship Parts Dealer','Local','Negotiation']]},
    {id:'pit',name:'The Pit',kind:'junkyard',skill:'Mechanics',diff:3,desc:'The ancient Coronet waste crater is a treasure field of industrial scrap and starship hulls—and territory its scrappers guard fiercely.',source:'Suns of Fortune · The Pit',services:['blackmarket'],npcs:[['Korr Bex','Scrapper Boss','Local','Mechanics']]},
    {id:'selonia',name:'Selonia Town',kind:'undercity',skill:'Knowledge (Core Worlds)',diff:2,desc:'A vast subterranean community beneath Coronet is linked intimately to the surface while retaining its own rhythms and loyalties.',source:'Suns of Fortune · Selonia Town',services:['lodging','clinic'],npcs:[['Ressa Dorr','Tunnel Guide','Local','Knowledge (Core Worlds)']]}
  ]
};
const DISTRICT_KIND_ICON_52={spaceport:'▲',market:'◇',cantina:'♪',junkyard:'⚙',outskirts:'✦',wilderness:'⌁',office:'▣',casino:'◆',waterfront:'≈',industrial:'⚙',imperial:'▰',blackmarket:'◈',underlevels:'▽',shadowport:'▲',tourist:'✧',secure:'▣',undercity:'▽'};
function districts52(hubId=null){return DISTRICTS_51[hubId||S.world.currentHub]||DISTRICTS_51.sable}
function ensurePhase52State(){ensurePhase50State();S.schemaVersion=52;let W=S.world;W.explore=W.explore&&typeof W.explore==='object'?W.explore:{};let E=W.explore;E.currentByHub=E.currentByHub&&typeof E.currentByHub==='object'?E.currentByHub:{};E.visited=E.visited&&typeof E.visited==='object'?E.visited:{};E.discoveries=E.discoveries&&typeof E.discoveries==='object'?E.discoveries:{};E.contacts=E.contacts&&typeof E.contacts==='object'?E.contacts:{};E.journal=Array.isArray(E.journal)?E.journal:[];E.activeNpc=E.activeNpc||null;E.notice=E.notice||'';for(const hid of Object.keys(DISTRICTS_51)){let ds=districts52(hid);if(!E.currentByHub[hid]||!ds.some(d=>d.id===E.currentByHub[hid]))E.currentByHub[hid]=ds[0].id;E.visited[`${hid}:${E.currentByHub[hid]}`]=true}}
function currentDistrict52(){ensurePhase52State();let hid=S.world.currentHub,id=S.world.explore.currentByHub[hid];return districts52(hid).find(d=>d.id===id)||districts52(hid)[0]}
function exploreLog52(text){ensurePhase52State();S.world.explore.journal.unshift({day:S.world.day,hub:S.world.currentHub,district:currentDistrict52().name,text});S.world.explore.journal=S.world.explore.journal.slice(0,40);S.world.explore.notice=text;gLog(text)}
function visitDistrict52(id){ensurePhase52State();let ds=districts52(),d=ds.find(x=>x.id===id);if(!d)return;S.world.explore.currentByHub[S.world.currentHub]=id;let key=`${S.world.currentHub}:${id}`,first=!S.world.explore.visited[key];S.world.explore.visited[key]=true;S.world.explore.activeNpc=null;if(first){exploreLog52(`First visit to ${d.name}, ${hub50().name}.`);if(localHeat50()>=6&&Math.random()<.22){adjustHeat50(0,'security patrols are visibly active nearby');S.world.explore.notice='A security patrol passes close enough to make the crew keep moving.'}}renderExplore52();safeAutosave()}
function npcList52(d=null){d=d||currentDistrict52();return (d.npcs||[]).map((x,i)=>({id:`${S.world.currentHub}:${d.id}:npc${i}`,name:x[0],role:x[1],faction:x[2],skill:x[3]}))}
function talkNpc52(id){ensurePhase52State();let npc=npcList52().find(n=>n.id===id);if(!npc)return;S.world.explore.activeNpc=id;S.world.explore.notice='';renderExplore52()}
function npcInitial52(n){return n.name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()}
function contactNpc52(id){ensurePhase52State();let npc=npcList52().find(n=>n.id===id);if(!npc)return;let existing=S.world.explore.contacts[id];if(existing){S.world.explore.notice=`${npc.name} is already one of your local contacts.`;renderExplore52();return}let skill=['Hutts','Guild'].includes(npc.faction)?'Streetwise':'Charm',out=performBest(skill,{diff:2});if(out.r.ok){S.world.explore.contacts[id]={name:npc.name,role:npc.role,faction:npc.faction,hub:S.world.currentHub,district:currentDistrict52().id};S.world.contacts[id]=S.world.explore.contacts[id];adjustFactionRep(npc.faction==='Local'?'Local':npc.faction,1);exploreLog52(`${out.q.actor.name} makes a useful contact: ${npc.name}, ${npc.role}.`)}else{S.strain=Math.min(strainThreshold(),S.strain+1);S.world.explore.notice=`${npc.name} keeps the relationship strictly transactional. ${out.q.actor.name} suffers 1 strain.`}renderAll();renderNavTab('explore');safeAutosave()}
function npcRumor52(id){ensurePhase52State();let npc=npcList52().find(n=>n.id===id);if(!npc)return;let out=performBest(npc.skill,{diff:Math.max(1,currentDistrict52().diff-1)});if(out.r.ok){let h=hub50(),rumors=[`A shipment with inconsistent manifests is moving through ${currentDistrict52().name}.`,`Someone is quietly paying for information about recent traffic at ${h.name}.`,`A local crew abandoned a job after discovering its patron was not who they claimed to be.`,`Security schedules have changed since the last major incident in ${h.name}.`,`A buyer is looking for discreet operators who already know this district.`];let rumor=rumors[Math.floor(Math.random()*rumors.length)];S.ep15.intel=(S.ep15.intel||0)+1;exploreLog52(`${npc.name} shares a rumor: ${rumor} (+1 Intel)`)}else{S.world.explore.notice=`${npc.name} has nothing useful to share today.`}renderExplore52();safeAutosave()}
function npcWork52(id){ensurePhase52State();let npc=npcList52().find(n=>n.id===id);if(!npc)return;let op=localOperation50();op.patron=npc.name;op.location=`${currentDistrict52().name}, ${hub50().name}`;op.source=`${op.source} · Lead from ${npc.name}`;S.world.localOffers.unshift(op);S.world.localOffers=S.world.localOffers.slice(0,5);exploreLog52(`${npc.name} puts a local operation on the board: ${op.title}.`);renderAll();renderNavTab('explore');safeAutosave()}
function acceptNpcWork52(id){npcWork52(id);renderNavTab('galaxy')}
function scoutDistrict52(){ensurePhase52State();let d=currentDistrict52(),key=`${S.world.currentHub}:${d.id}:day${S.world.day}`;if(S.world.explore.discoveries[key]){S.world.explore.notice='You have already made a focused search of this district today.';renderExplore52();return}let out=performBest(d.skill,{diff:d.diff,setback:localHeat50()>=5?1:0});S.world.explore.discoveries[key]={ok:out.r.ok,day:S.world.day};if(out.r.ok){let creds=20+d.diff*15+Math.max(0,out.r.na)*10;S.credits+=creds;ledgerEntry(creds,`District lead — ${d.name}`);S.ep15.intel=(S.ep15.intel||0)+1;exploreLog52(`${out.q.actor.name} searches ${d.name} with ${d.skill} and turns up a useful lead, +1 Intel and ${creds} credits in salvage/finder value.`)}else{S.strain=Math.min(strainThreshold(),S.strain+1);if(out.r.nt>=2)adjustHeat50(1,`an awkward search in ${d.name} draws attention`);S.world.explore.notice=`The search comes up thin. ${out.q.actor.name} suffers 1 strain${out.r.nt>=2?' and attracts local attention':''}.`}renderAll();renderNavTab('explore');safeAutosave()}
function observeDistrict52(){ensurePhase52State();let d=currentDistrict52(),out=performBest('Perception',{diff:Math.max(1,d.diff-1)});if(out.r.ok){let hidden=npcList52(d)[Math.floor(Math.random()*Math.max(1,npcList52(d).length))];S.world.explore.notice=hidden?`${out.q.actor.name} notices ${hidden.name} watching traffic carefully; they may know more than their job title suggests.`:`${out.q.actor.name} identifies a quiet route through ${d.name} that avoids the busiest traffic.`}else S.world.explore.notice=`Nothing stands out beyond the normal noise of ${d.name}.`;renderExplore52()}
function districtService52(service){let h=hub50();if(service==='market'){renderNavTab('equipment');return}if(service==='blackmarket'){renderNavTab('equipment');S.world.explore.notice=`Restricted acquisition at ${currentDistrict52().name} uses ${h.name}'s black-market terms.`;return}if(service==='shipyard'){renderNavTab('ship');return}if(service==='cantina'||service==='guild'){refreshLocalJobs50();renderNavTab('galaxy');return}if(service==='clinic'||service==='lodging'){renderNavTab('recovery');return}if(service==='rebel'){adjustFactionRep('Rebels',1);exploreLog52(`A discreet local Rebel contact shares a safe communication channel. Rebels reputation +1.`);renderExplore52();safeAutosave();return}if(service==='fixer'){S.world.sectorHeat[S.world.currentHub]=Math.max(0,localHeat50()-1);exploreLog52(`A fixer rearranges local records. Local heat falls by 1.`);renderExplore52();safeAutosave();return}}
function renderExplore52(){if(!$('explore'))return;ensurePhase52State();let h=hub50(),d=currentDistrict52(),E=S.world.explore,ds=districts52();$('exploreHub52').textContent=h.name;$('exploreDistrict52').textContent=d.name;$('exploreDay52').textContent=S.world.day;$('districtMap52').innerHTML=ds.map(x=>{let key=`${S.world.currentHub}:${x.id}`,cur=x.id===d.id,vis=!!E.visited[key];return`<button class="district-node52 ${cur?'current':''} ${vis?'visited':''}" data-district52="${x.id}"><b>${DISTRICT_KIND_ICON_52[x.kind]||'•'} ${opEsc(x.name)}</b><div class="tiny">${opEsc(x.kind)} · ${opEsc(x.skill)} ${acquisitionLabel(x.diff)}</div></button>`}).join('');document.querySelectorAll('[data-district52]').forEach(b=>b.onclick=()=>visitDistrict52(b.dataset.district52));$('districtScene52').innerHTML=`<div class="district-hero52"><div class="district-kicker52">${opEsc(h.world)} · ${opEsc(d.kind)}</div><h3>${opEsc(d.name)}</h3><p>${opEsc(d.desc)}</p><div class="district-meta52"><span class="pill">Search: ${opEsc(d.skill)} ${acquisitionLabel(d.diff)}</span><span class="pill">Local Heat ${localHeat50()}</span><span class="pill">${E.visited[`${S.world.currentHub}:${d.id}`]?'Visited':'New'}</span></div><div class="tiny" style="margin-top:9px">Basis: ${opEsc(d.source)}</div></div>`;
  let npcs=npcList52(d);$('districtNpc52').innerHTML=npcs.length?npcs.map(n=>`<div class="npc-card52"><div class="npc-head52"><div class="npc-face52">${npcInitial52(n)}</div><div><b>${opEsc(n.name)}</b><div class="tiny">${opEsc(n.role)} · ${opEsc(n.faction)}</div></div></div><div class="pills"><button class="btn" data-talknpc52="${n.id}">Talk</button>${E.contacts[n.id]?'<span class="tag good">CONTACT</span>':''}</div></div>`).join(''):'<div class="small">No obvious contacts are waiting here.</div>';document.querySelectorAll('[data-talknpc52]').forEach(b=>b.onclick=()=>talkNpc52(b.dataset.talknpc52));
  let services=(d.services||[]).map(s=>`<button class="btn" data-service52="${s}">${s==='blackmarket'?'Black Market':s[0].toUpperCase()+s.slice(1)}</button>`).join('');$('districtActions52').innerHTML=`<button id="districtScout52" class="btn primary">Search District</button><button id="districtObserve52" class="btn">Observe Crowd</button>${services}`;if($('districtScout52'))$('districtScout52').onclick=scoutDistrict52;if($('districtObserve52'))$('districtObserve52').onclick=observeDistrict52;document.querySelectorAll('[data-service52]').forEach(b=>b.onclick=()=>districtService52(b.dataset.service52));$('districtResult52').innerHTML=E.notice?opEsc(E.notice):`Move through ${opEsc(d.name)}, speak to locals, or make a focused ${opEsc(d.skill)} search. The strongest qualified party member handles checks automatically.`;
  let active=npcs.find(n=>n.id===E.activeNpc),dialog=$('npcDialogue52');dialog.classList.toggle('hidden',!active);if(active){dialog.innerHTML=`<div class="row"><div class="npc-head52"><div class="npc-face52">${npcInitial52(active)}</div><div><b>${opEsc(active.name)}</b><div class="small">${opEsc(active.role)} · ${opEsc(active.faction)}</div></div></div><button class="btn" id="closeNpc52">Close</button></div><div class="story-copy" style="margin-top:10px">${opEsc(active.name)} gives the crew a measured look. Around ${opEsc(d.name)}, information is rarely free, but competent operators are useful to know.</div><div class="pills" style="margin-top:10px"><button class="btn" data-npcact52="contact|${active.id}" ${E.contacts[active.id]?'disabled':''}>${E.contacts[active.id]?'Contact Established':'Build Rapport'}</button><button class="btn" data-npcact52="rumor|${active.id}">Ask for Rumors</button><button class="btn primary" data-npcact52="work|${active.id}">Ask for Work</button></div>`;$('closeNpc52').onclick=()=>{E.activeNpc=null;renderExplore52()};document.querySelectorAll('[data-npcact52]').forEach(b=>b.onclick=()=>{let [a,id]=b.dataset.npcact52.split('|');if(a==='contact')contactNpc52(id);if(a==='rumor')npcRumor52(id);if(a==='work')npcWork52(id)})}
  $('exploreJournal52').innerHTML=E.journal.length?E.journal.map(x=>`<div><span class="tiny">Day ${x.day} · ${opEsc(hub50(x.hub).name)} · ${opEsc(x.district)}</span><br>${opEsc(x.text)}</div>`).join(''):'<div class="small">No street-level discoveries logged yet.</div>';$('clearExploreNotice52').onclick=()=>{E.notice='';renderExplore52()};if($('galaxyExplore52'))$('galaxyExplore52').onclick=()=>renderNavTab('explore');
}

function refreshMobileAllTabs52(){let sheet=$('mobileSheet52');if(!$('mobileAllTabs52'))return;let tabs=[...document.querySelectorAll('#nav button[data-tab]')];$('mobileAllTabs52').innerHTML=tabs.map(b=>`<button class="btn" data-mobileall52="${b.dataset.tab}" ${b.disabled?'disabled':''}>${opEsc(b.textContent)}</button>`).join('');document.querySelectorAll('[data-mobileall52]').forEach(b=>b.onclick=()=>{renderNavTab(b.dataset.mobileall52);sheet?.classList.add('hidden')})}
function initMobile52(){let dock=$('mobileDock52'),sheet=$('mobileSheet52');if(!dock||dock.dataset.ready)return;dock.dataset.ready='1';document.querySelectorAll('[data-mobiletab52]').forEach(b=>b.onclick=()=>{renderNavTab(b.dataset.mobiletab52);sheet.classList.add('hidden')});$('mobileMore52').onclick=()=>{refreshMobileAllTabs52();sheet.classList.remove('hidden')};$('mobileClose52').onclick=()=>sheet.classList.add('hidden');sheet.onclick=e=>{if(e.target===sheet)sheet.classList.add('hidden')};refreshMobileAllTabs52()}
function syncMobileNav52(id){document.querySelectorAll('#mobileDock52 [data-mobiletab52]').forEach(b=>b.classList.toggle('on',b.dataset.mobiletab52===id))}
const _p52RenderNavTab=renderNavTab;renderNavTab=function(id){_p52RenderNavTab(id);if(id==='explore')renderExplore52();initMobile52();syncMobileNav52(id)};
const _p52TravelGalaxy=travelGalaxy50;travelGalaxy50=function(dest){let before=S.world?.currentHub;let r=_p52TravelGalaxy(dest);ensurePhase52State();if(S.world.currentHub!==before){let ds=districts52();S.world.explore.currentByHub[S.world.currentHub]=ds[0].id;S.world.explore.visited[`${S.world.currentHub}:${ds[0].id}`]=true;S.world.explore.activeNpc=null;S.world.explore.notice=`The crew arrives at ${ds[0].name}.`;}renderExplore52();return r};
const _p52RenderAll=renderAll;renderAll=function(){ensurePhase52State();_p52RenderAll();renderExplore52();initMobile52()};
const _p52RenderGuide=renderGuide;renderGuide=function(){ensurePhase52State();_p52RenderGuide();if($('guide')&&!$('mobileGuide52')){let card=document.createElement('div');card.id='mobileGuide52';card.className='card mobile-only52';card.style.marginTop='12px';card.innerHTML=`<b>iPhone / Mobile Play</b><div class="small" style="margin-top:6px">This build now has a touch-first bottom dock, larger controls, safe-area support, and one-column layouts. For the most app-like iPhone experience, host the PWA bundle over HTTPS, open it in Safari, then choose Share → Add to Home Screen.</div>`;$('guide').appendChild(card)}};

RULE_AUDIT.unshift(
 {id:'explore51',name:'Phase 51 planetary district exploration',status:'adapted',source:'The Jewel of Yavin; Mask of the Pirate Queen; Suns of Fortune; Lords of Nal Hutta; Rise of the Separatists; Lothal setting references',detail:'Source-named places are used when available; district layout, NPCs, dialogue, search rewards, local contacts, and point-to-point exploration are original Sable Reach videogame systems.'},
 {id:'mobile52',name:'Phase 52 responsive mobile/iPhone interface',status:'adapted',source:'Original Sable Reach interface layer',detail:'Adds touch-sized controls, safe-area padding, phone layouts, a five-button mobile dock, all-section sheet, and packaging support for an installable hosted PWA.'}
);
const _p52Diagnostics=phase45Diagnostics;phase45Diagnostics=function(){let rows=_p52Diagnostics();const add=(name,ok,detail='')=>rows.push({name,ok:!!ok,detail});ensurePhase52State();add('Phase 51 district coverage',Object.keys(DISTRICTS_51).length===Object.keys(GALAXY_HUBS_50).length&&Object.values(DISTRICTS_51).every(x=>x.length>=4),'8 hubs with 4+ districts each');add('Phase 51 exploration state',!!S.world.explore&&Array.isArray(S.world.explore.journal),'district state initialized');add('Phase 52 mobile dock',!!$('mobileDock52')&&!!$('mobileSheet52'),'responsive mobile navigation present');add('Phase 52 save schema',S.schemaVersion===52&&BUILD_INFO.saveSchema===52,'schema 52');return rows};
const _p52Smoke=runSableReachSmoke;runSableReachSmoke=async function(){let report=await _p52Smoke();const test=(name,fn)=>{try{if(fn()===false)throw new Error('returned false');report.passed.push(name)}catch(e){report.failed.push(`${name}: ${e.message}`)}};ensurePhase52State();test('Phase 51 covers every Phase 50 hub with districts',()=>Object.keys(GALAXY_HUBS_50).every(k=>DISTRICTS_51[k]?.length>=4));test('Phase 51 all districts have search skills',()=>Object.values(DISTRICTS_51).flat().every(d=>SKILL_CHAR[d.skill]&&Number.isFinite(d.diff)));test('Phase 51 district NPCs normalize',()=>Object.values(DISTRICTS_51).flat().every(d=>(d.npcs||[]).every(n=>n.length===4&&SKILL_CHAR[n[3]])));test('Phase 51 explore renderer populates district map',()=>{renderExplore52();return $('districtMap52').children.length===districts52().length});test('Phase 52 mobile controls exist',()=>!!$('mobileDock52')&&document.querySelectorAll('#mobileDock52 button').length===5);test('Phase 52 schema target',()=>BUILD_INFO.saveSchema===52&&S.schemaVersion===52&&serializableState().schemaVersion===52);document.body.dataset.smokeStatus=report.failed.length?'FAIL':'PASS';document.body.dataset.smokePassed=String(report.passed.length);document.body.dataset.smokeFailed=String(report.failed.length);window.__SABLE_REACH_SMOKE__=report;let pre=$('smokeReport');if(pre)pre.textContent=JSON.stringify(report,null,2);return report};
ensurePhase52State();renderAll();initMobile52();

window.__SABLE_REACH__={version:BUILD_INFO.version,diagnostics:()=>rcStateIssues(),smoke:runSableReachSmoke,state:()=>S};
