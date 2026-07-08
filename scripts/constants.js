//Localstorage save names
export const SAVED_ARMIES = 'savedArmies';
export const LAST_OPENED_ARMIES = 'openedArmies';

//Dunno if these are useful anymore so I don't export them. These are initial data representation for different attributes.
const FIREPOWER = { "firefight": null, "battle": null, "long": null, "antiTank": null }
const ASSAULT = { "modifier": null, "antiTank": null };
const ARMOUR = { "front": null, "side": null, "rear": null };

//Keywords for linking what upgrades are available to what unit types
export const SQUAD = { icon: '🪖', order: 1 };
export const INDIVIDUAL = { icon: '🎖️', order: 2 };
export const COMMAND = { icon: '📡', order: 3 };
export const VEHICLE = { icon: '🛡️', order: 4 };
export const FIELD_ARTILLERY = { icon: '💥', order: 5 };

//Campaign stuff
export const RANKS = {
    0: { rank: 0, experience: 0, totalUpgrades: 0, totalCohesionBonus: 0 },
    1: { rank: 1, experience: 3, totalUpgrades: 0, totalCohesionBonus: 1 },
    2: { rank: 2, experience: 6, totalUpgrades: 1, totalCohesionBonus: 1 },
    3: { rank: 3, experience: 10, totalUpgrades: 1, totalCohesionBonus: 2 },
    4: { rank: 4, experience: 15, totalUpgrades: 2, totalCohesionBonus: 2 },
    5: { rank: 5, experience: 20, totalUpgrades: 2, totalCohesionBonus: 3 },
    6: { rank: 6, experience: 25, totalUpgrades: 2, totalCohesionBonus: 4 },
    7: { rank: 7, experience: 30, totalUpgrades: 3, totalCohesionBonus: 4 }
};

const RANK_UPGRADES = {
    speed: { roll: 1, name: "Speed", statBonuses: { move: 2 }, description: "Increase Move by +2" },
    firepower: { roll: '2-3', name: "Firepower", statBonuses: { firepower: '?' }, description: "Increase Firepower at one range band of choice by +1." },
    antiTank: { roll: 4, name: "Anti Tank", statBonuses: { antiTank: '?' }, description: "Increase choice of ranged or assault Anti Tank by +1 (if not currently NA)" },
    assault: { roll: '5-6', name: "Assault", statBonuses: { assault: { modifier: 1 } }, description: "Increase Assault bonus by +1" }
};

export const RANK_ROLLS = {
    1: RANK_UPGRADES.speed,
    2: RANK_UPGRADES.firepower,
    3: RANK_UPGRADES.firepower,
    4: RANK_UPGRADES.antiTank,
    5: RANK_UPGRADES.assault,
    6: RANK_UPGRADES.assault
};

export const CAMPAIGN_REWARDS = {
    fightingFury: { roll: 1, name: "Fighting Fury", description: "The unit can make two attacks in one activation, adding +1 to both rolls." },
    takeInitiative: { roll: 2, name: "Take initiative", description: "The unit may take a Full Activation without counting against your activation count for the turn." },
    battleExperience: { roll: 3, name: "Battle Experience", instantExperience: 3, description: "Unit receives +3 XP" },
    willPower: { roll: 4, name: "Willpower", description: "When destroyed, restore Cohesion to 1D6 points and remain in place." },
    battleFortune: { roll: 5, name: "Battle Fortune", description: "Unit may ignore one post battle Kill Check without rolling." },
    determination: { roll: 6, name: "Determination", activateable: true, statBonuses: { cohesion: 2 }, description: "Increase Cohesion by +2 for one battle." }
};

//Special rules
export const TRAITS = {
    agile: { name: "Agile", description: "The unit is not affected by Bad Going when moving." },
    antiPersonnel: { name: "Anti Personnel", description: "When firing at infantry targets, add +1 to hit." },
    armoured: { name: "Armoured", description: "The unit has an Armour value instead of Cohesion and follows the rules for Anti Tank fire." },
    bypassCover: { name: "Bypass Cover", description: "Targets in Hard cover are counted as Soft cover." },
    cavalry: { name: "Cavalry", description: "Cavalry count Hard cover as Soft cover when fired upon. When attacking in Close Combat roll 2D6 and pick the highest die. Cavalry units are still considered Infantry for all other rules purposes." },
    damageMitigation: { name: "Damage Mitigation", description: "The unit reduces all sources of damage by 1 point unless it is Penetrating  Damage." },
    environmentSuit: { name: "Environment Suit", description: "The unit is not affected by Dangerous Terrain." },
    erratic: { name: "Erratic", description: "Roll two random direction dice each time the unit actives. The unit must move in one of the two directions." },
    fieldArtillery: { name: "Field Artillery", description: "The unit follows the rules in the Field Artillery chapter." },
    flameWeapon: { name: "Flame Weapon", description: "When shooting at Infantry within 9” roll two damage dice and pick the highest score." },
    forwardFiring: { name: "Forward Firing", description: "Can only shoot within the front 90 degrees." },
    hero: { name: "Hero", description: "The unit follows the rules for Heroes." },
    highExplosive: { name: "High Explosive", description: "When shooting at infantry, any hit roll of doubles inflicts 1 point of damage even if the attack misses and +1 damage if the attack hits." },
    hover: { name: "Hover", description: "The vehicle follows the terrain rules for Hover vehicles." },
    indirectFire: { name: "Indirect Fire", description: "The unit can fire using the rules for Indirect Fire." },
    individual: { name: "Individual", description: "Follows the rules for individual models." },
    infiltration: { name: "Infiltration", description: "May deploy in any terrain feature on the friendly half of the table." },
    jump: { name: "Jump", description: "The unit moves using the rules for Jump units." },
    leadership: { name: "Leadership", description: "Squads within 6” roll 2D6 in Close Combat and pick the highest die. Squads Regrouping within 6” regain an additional point of Cohesion. This benefit only applies to units from the same army list, except for Imperial troops." },
    lightVehicle: { name: "Light Vehicle", description: "Incoming fire is -1 to hit." },
    limitedIntelligence: { name: "Limited Intelligence", description: "The unit must fire at the closest infantry OR the closest vehicle target." },
    mechanical: { name: "Mechanical", description: "Cannot regain Cohesion during the battle." },
    mobileArtillery: { name: "Mobile Artillery", description: "The unit follows the rules for Field Artillery but may move." },
    open: { name: "Open", description: "The vehicle has Cohesion instead of Armour and follows the combat rules for Open vehicles." },
    penetratingDamage: { name: "Penetrating Damage", description: "Damage inflicted by this unit, including Combat Shock cannot be Mitigated." },
    ponderous: { name: "Ponderous", description: "Cannot double move." },
    psionic: { name: "Psionic", description: "The unit has Psionic abilities. The number in parenthesis is the Psionic Level." },
    regenerate: { name: "Regenerate", description: "Each time the unit completes an activation and did not take damage during that activation, it regains 1 point of lost Cohesion." },
    repair: { name: "Repair", description: "Take a Carry Out Action while within 3” of a vehicle. Roll 1D6. On a roll of a 5-6 you can repair one damage result the vehicle has suffered other than Knocked Out." },
    robot: { name: "Robot", description: "When taking a Move Action the unit can either turn in place OR move straight ahead." },
    siegeGun: { name: "Siege Gun", description: "Add +1 to Anti Tank and damage rolls against buildings." },
    simpleMinded: { name: "Simple Minded", description: "The unit cannot choose the Carry Out Action. It cannot claim or complete any Objectives." },
    sniping: { name: "Sniping", description: "Ranged attacks against Individuals are +1 damage." },
    specialist: { name: "Specialist", description: "The unit cannot be given Squad Upgrades." },
    terror: { name: "Terror", description: "+1 to Assault rolls against Squads. Does not apply if the Squad has one of Simple Minded, Robot or Mechanical." },
    tracked: { name: "Tracked", description: "The vehicle follows the terrain rules for Tracked vehicles." },
    wheeled: { name: "Wheeled", description: "The vehicle follows the terrain rules for Wheeled vehicles." },
    transportCapacity: { name: "Transport Capacity (x)", description: "The unit is a transport. The number in parenthesis is the number of unit points that can be loaded." }, //TODO: handling transport capacity parenthesis value in army building
    unique: { name: "Unique", description: "You can include only one of each Unique unit in an army." }, //TODO: Handling unique in army building
    walker: { name: "Walker", description: "The vehicle follows the terrain rules for Walkers." }
}

export const GENERIC_INDIVIDUAL_UPGRADES = {
    combatDrugs: { name: "Combat Drugs", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "Usable once. Regain 2 Cohesion but each future activation roll 1D6. On a 1 lose 2 Cohesion." },
    cybernetics: { name: "Cybernetics", keyword: INDIVIDUAL, statBonuses: { cohesion: 1, points: 3 }, description: "+1 Cohesion." },
    forceScreen: { name: "Force Screen", keyword: INDIVIDUAL, statBonuses: { points: 4 }, description: "May be activated any time a ranged attack inflicts damage on the Individual. If activated roll 1D6. If the roll equals or exceeds the damage dealt, the attack is negated. A roll of a 1 causes the screen to burn out and it is not usable for the rest of the game." },
    jumpJets: { name: "Jump jets", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "A backpack unit allowing the wearer to leap across the battlefield. The Individual moves using the Jump rules: " + TRAITS.jump.description },
    minorPsionics: { name: "Minor Psionics", keyword: INDIVIDUAL, statBonuses: { points: 5 }, description: "The Individual gains Psionic (1). Not available to Coalition and Kill Bot figures. Use the General Psionic Abilities even in armies where this list is not used normally. Psionic: " + TRAITS.psionic.description }, //TODO: also add generic psionics list here?
    psionicScreen: { name: "Psionic Screen", keyword: INDIVIDUAL, statBonuses: { points: 4 }, description: "If directly targeted by a hostile psionic roll 1D6: On a 5+ the power has no effect." },
    stasisDevice: { name: "Stasis Device", keyword: INDIVIDUAL, statBonuses: { points: 5 }, description: "Single use item. Used at any point during an activation. They cannot move or take any actions but cannot be attacked or influenced in any way until their next activation." },
    techWeapon: { name: "Tech-Fist or Tech-axe", keyword: INDIVIDUAL, statBonuses: { assault: { antiTank: 1 }, points: 1 }, description: "Assault Anti-Tank factor is increased by 1. If it is normally NA, it becomes +0." }, //TODO: Needs to be able to turn NA to +0
    teleportBeacon: { name: "Teleport beacon", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "A unit trying to aim a teleporter within 6” applies an additional -1 modifier to the deviation roll. The beacon also disrupts enemy teleport beams adding +2 to the deviation roll within 6”." },
    psiRod: { name: "Psi-Rod", keyword: INDIVIDUAL, statBonuses: { points: 3 }, description: "+1 bonus to Psionic Duel rolls." }
}

export const GENERIC_SQUAD_UPGRADES = {
    antiTankGrenades: { name: "Anti-tank grenades", keyword: SQUAD, statBonuses: { assault: { antiTank: 1 }, points: 1 }, description: "If close combat anti-tank is -, it becomes +0, otherwise increase by 1 point." }, //TODO: implement upgrade granting ability not existing yet
    fusionWeapons: { name: "Fusion weapons", keyword: SQUAD, statBonuses: { points: 2 }, description: "When firing at 9” or closer, add +1 to Anti Tank." },
    medic: { name: "Medic", keyword: SQUAD, statBonuses: { points: 3 }, description: "If the unit activates at below maximum Cohesion and does not have a Medic counter already, put a Medic counter on them. If they take any damage while a Medic counter is on them, remove the counter. If the unit activates with a Medic counter, regain 1 point of Cohesion." },
    fearsomeReputation: { name: "Fearsome reputation", keyword: SQUAD, statBonuses: { points: 2 }, description: "Unit gains Terror: " + TRAITS.terror.description },
    oversizedUnit: { name: "Over-sized unit", keyword: SQUAD, statBonuses: { cohesion: 1, points: 3 }, description: "+1 Cohesion. Add +1 figure to the unit." },
    plasmaWeapons: { name: "Plasma weapons", keyword: SQUAD, statBonuses: { points: 2 }, description: "A ranged attack may be overcharged: The firing unit loses 1 Cohesion. Increase Firepower and attack damage by +1." },
    veteranSergeant: { name: "Veteran sergeant", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, points: 3 }, description: "Unit adds +1 to the Assault value." },
    hardenedTroopers: { name: "Hardened troopers", keyword: SQUAD, statBonuses: { points: 1 }, description: "The unit is not affected by enemies with the Terror Trait." }
}

export const GENERIC_VEHICLE_UPGRADES = {
    boostedEngine: { name: "Boosted Engine", keyword: VEHICLE, statBonuses: { move: 1, points: 2 }, description: "Increase speed by +1” (Armoured) or +2” (Open). Not available to Walkers." }, //TODO: implement upgrade restriction for vehicle types and varying upgrades depending on type (thought about just copying this, but it would broke "same upgrade can appear only once" rule)
    personalWeapons: { name: "Personal Weapons", keyword: VEHICLE, statBonuses: { assault: { modifier: 1 }, points: 2 }, description: "+1 to Assault combat. Open Vehicle only." },
    pintleMountedWeapon: { name: "Pintle Mounted weapon", keyword: VEHICLE, statBonuses: { points: 1 }, description: "Gain Anti Personnel within 9”: " + TRAITS.antiPersonnel.description },
    emergencyRepairs: { name: "Emergency repairs", keyword: VEHICLE, statBonuses: { points: 3 }, description: "If the vehicle activates and has suffered damage, roll 1D6 before taking any Actions. On a roll of a 6, one damage result of choice is repaired." },
    layeredArmour: { name: "Layered armour", keyword: VEHICLE, statBonuses: { points: 3 }, description: "Anti Tank hits above +2 are counted as +2." }
}

export const GENERIC_UPGRADES = {
    ...GENERIC_INDIVIDUAL_UPGRADES, ...GENERIC_SQUAD_UPGRADES, ...GENERIC_VEHICLE_UPGRADES
}

const ARMY_SPECIAL_RULES = {
    crawlerHorde: {
        acidSpray: { name: "Acid Spray", description: "Any unit drawing or losing an assault against Crawlers loses 1 additional point of Cohesion." },
        alienAnatomy: { name: "Alien Anatomy", description: "Crawlers ignore terrain hazards. In special scenarios, no poison, gas or virus can affect them." },
        inhuman: { name: "Inhuman", description: "Crawlers can only use Crawler unit upgrades, never the General tables." },
    },
    imperials: {
        imperials: { name: "Imperials", description: "All units from this army list are considered Imperial units." }
    },
    imperialLegion: {
        holdTheGround: { name: "Hold the ground", description: "At the end of your turn, select one Legion unit that is in a building or fortification or which is holding a Scenario Objective. The selected unit recovers 1 lost point of Cohesion" }
    },
    killBots: {
        selfRepair: { name: "Self Repair", description: "At the end of your player Phase, select any one Kill Bot squad and restore up to 2 points of lost Cohesion. Kill Bots cannot regain Cohesion in any other way, including by taking the Regroup Action." },
        distortionField: { name: "Distortion Field", description: "Non Kill Bot units within 6” of 1 or more Kill Bot units suffer a -1 penalty to hit when firing. The penalty is not cumulative" }
    },
    spaceElves: {
        elusive: { name: "Elusive", description: "When applying ranged attack damage to Elf infantry and cavalry, if the final attack damage exceeds 4 points, the unit suffers 4 points of damage instead." },
        psionicPower: { name: "Psionic Power", description: "Elf Psionics increase the range of all abilities by +3” (to 18”) and do not suffer Psionic Strain." },
        warCult: {name: "War Cult", description: "Each turn you may take a free move with one War Cult unit. The move does not count against your activations and may be combined with a Limited Activation (but not a Full Activation)."},
        turningOnADime: {name: "Turning on a Dime", description: "Space Elf Light vehicles can turn twice per move action. Each turn can be up to 90 degrees. You can take both turns simultaneously."}
    },
    spaceOrcs: {
        disregardForPlanning: { name: "Disregard for Planning", description: "The army must assign 2 of their activations to units within 9” of enemy troops. Any remaining activations can then be used as the player sees fit." },
        boostedEngine: { name: "Boosted Engine", description: "Light vehicles are given a random movement speed, rolled each time the vehicle moves. If the die is a 4, 5 or 6 the smoke and erratic movement causes the vehicle to shoot at a -1 hit penalty during the current activation. If the vehicle is intending to move twice, roll once and double the distance" },
        ramshackle: { name: "Ramshackle", description: "Whenever an Orc Armoured vehicle attempts to move it must roll 1D6. On a roll of a 1 it is unable to move during that activation. This does not affect any other activities. If the unit wants to double move, roll for each move separately which can result in the unit moving once, twice or not at all. This rule does not apply to Walkers (Orcs are good at building walkers since they already understand how legs work) and Light Vehicles (Orcs appreciate speed)" },
        goblinMalfunction: { name: "Goblin Malfunction", description: "Orc Field artillery rolling a double 1 to hit when firing is destroyed with no effect on the target. This effect cannot be prevented or avoided." }
    },
    starKnights: {
        tacticalCoordination: { name: "Tactical Coordination", description: "Star Knights convert one partial activation to a full activation. For example in a normal game instead of 2 full and 2 limited activations, Star Knights would receive 3 full and 1 limited activation. The conversion can only be used in a turn where at least 2 Star Knight units are being activated." },
        environmentSuit: { name: "Environment Suit", description: "Not affected by Dangerous Terrain." }
    }
}

const PSIONIC_POWERS_LIST = {
    crawlerHorde: {
        name: "Crawler Horde Psionic Abilities",
        powers: {
            hordeRush: { roll: 1, name: "Horde rush", description: "Target brood immediately moves 1D6” towards the nearest visible enemy." },
            infestation: { roll: 2, name: "Infestation", description: "The target unit gains Erratic (" + TRAITS.erratic.description + ") until the end of the following enemy turn." },
            bolsterTheHorde: { roll: 3, name: "Bolster the Horde", description: "Select 2 Broods. Each regains 1 point of Cohesion." },
            primordialMind: { roll: 4, name: "Primordial Mind", description: "Initiate a psychic duel against a Psionic in sight. The Crawler takes no damage on a tie or loss." },
            hordeRage: { roll: 5, name: "Horde Rage", description: "Until the end of the following Crawler turn, the target brood gains Penetrating Damage (" + TRAITS.penetratingDamage.description + ") and Regenerate (" + TRAITS.regenerate.description + ") but cannot fire." },
            wavesOfHorror: { roll: 6, name: "Waves of Horror", description: "Select a target infantry squad and roll 3D6. For each die that rolls above the Cohesion of the unit the unit loses 1 point of Cohesion. The unit cannot initiate close combat if it is activated in the players next turn." }
        }
    },
    generic: {
        name: "Generic Psionic Abilities",
        powers: {
            psionicPush: { roll: 1, name: "Psionic Push", description: "The target unit is pushed directly away from the Psionic. Roll 2D6 and use either die as the distance pushed. This can be used on either a friendly or a hostile unit" },
            psionicPin: { roll: 2, name: "Psionic Pin", description: "The target unit cannot Move if it is activated in the next enemy turn. It can perform other actions." },
            psionicBolt: { roll: 3, name: "Psionic Bolt", description: "The target rolls 3D6. For each 4+ inflict 1 point of Penetrating Damage. (+0 AT for vehicles)." },
            psionicTeleport: { roll: 4, name: "Psionic Teleport", description: "1 friendly unit (which may be the Psionic unit itself) can move to any location within 6” of its location. The new location must visible to the Psionic unit. Does not affect vehicles." },
            psionicBolster: { roll: 5, name: "Psionic Bolster", description: "Until the end of the following enemy turn, the target unit (which may be the Psionic unit itself) adds +1 to all fire and close combat rolls." },
            psionicDisorder: { roll: 6, name: "Psionic Disorder", description: "Until the end of the following enemy turn, the target unit cannot inflict Combat Shock, regain Cohesion or receive any type of repair." }
        }
    },
    imperialLegion: {
        name: "Imperial Legion Psionic Abilities",
        powers: {
            rallyingImpulse: { roll: 1, name: "Rallying impulse", description: "The target unit (other than the Psionic) regains 1 Cohesion." },
            concealingFog: { roll: 2, name: "Concealing fog", description: "The target unit (which may be the Psionic) is clouded until the end of the next enemy turn. All ranged attacks against the unit are -2 to hit." },
            destroyTheMachines: { roll: 3, name: "Destroy the machines", description: "The target vehicle is immobilised. At the end of each activation of the target vehicle roll 1D6. On a 4-6 it regains mobility. It can also be repaired normally." },
            displacement: { roll: 4, name: "Displacement", description: "Move the target unit (which may be the Psionic) 2D6”. The destination must be visible to the Psionic. On a double, the unit moved suffers 1 point of Penetrating Damage." },
            illuminateTarget: { roll: 5, name: "Illuminate target", description: "Until the end of the following enemy turn, all attacks against the target unit receive +1 to hit, +1 to Close Combat rolls and +1 to Anti Tank rolls." },
            roilingAssassin: { roll: 6, name: "Roiling Assassin", description: "Select a target Individual and roll 2D6. The target rolls 2D6. For each point the Psionic rolls higher, the target takes 1 point of damage." }
        }
    },
    spaceElves: {
        name: "Space Elves Psionic Abilities",
        powers: {
            counterSpells: { roll: 1, name: "Counter Spells", description: "Target Psionic cannot use Psionics or initiate a psionic duel during their next activation." },
            arcaneGale: { roll: 2, name: "Arcane Gale", description: "When next activated, the target unit can only move if it ends the move further away from the Psionic." },
            mindBurn: { roll: 3, name: "Mind Burn", description: "Target Individual takes 1D6 points of damage. Does not work against Psionics and Demons." },
            weaveFortune: { roll: 4, name: "Weave Fortune", description: `Target unit receives Damage Mitigation (${TRAITS.damageMitigation.description}) until the end of the following enemy turn.` },
            mindsEye: { roll: 5, name: "Minds Eye", description: "Target unit immediately fires as a bonus action. Firepower is treated +0, the unit can only fire at ranges it is normally capable of firing at." },
            essenceOfWind: { roll: 6, name: "Essence of Wind", description: "Target unit ignores bad going and hazardous terrain during its next activation." }
        }
    },
    spaceOrcs: {
        name: "Space Orc Psionic Abilities",
        powers: {
            powerShove: { roll: 1, name: "Power Shove", description: "Target unit is knocked directly away 1D6”. A vehicle is spun to face in a random direction instead. Infantry takes 1 point of damage." },
            energyDissipation: { roll: 2, name: "Energy Dissipation", description: "The Psionic takes 1 point of damage. All non-Orc Psionics within line of sight (regardless of range) take 1 point of damage and cannot use any powers or duels in the players next turn." },
            powerBolt: { roll: 3, name: "Power Bolt", description: "Roll to hit on 2D6 requiring a 6+. No hit modifiers are applied. Continue rolling to hit the same unit until you miss. Inflict 1 point of damage per hit scored. Vehicles take one AT+0 hit each time." },
            brainEruption: { roll: 4, name: "Brain Eruption", description: "Roll 2D6. The lowest die is applied as damage to the Psionic, the highest die to the target." },
            struggleToThink: { roll: 5, name: "Struggle to think", description: "The Psionic and the target Unit cannot activate during their respective next turns." },
            waveOfEnergy: { roll: 6, name: "Wave of Energy", description: "Roll 2D6. Every enemy within this distance in inches takes 2 points of damage (AT +1 versus vehicles)." }
        }
    },
    starKnights: {
        name: "Star Knight Psionic Abilities",
        powers: {
            mentalFortress: { roll: 1, name: "Mental Fortress", description: "Until the end of the following enemy turn, the Psionic cannot engage or be engaged in Psionic Duels, nor targeted by Psionic Powers. Imperial Units within 9” are not affected by Terror: " + TRAITS.terror.description },
            ritesOfWar: { roll: 2, name: "Rites of War", description: `Target unit gains Terror (${TRAITS.terror.description}) and Agile (${TRAITS.agile.description}) until the end of the following enemy turn.` },
            flameSummon: { roll: 3, name: "Flame Summon", description: "Draw a straight line up to 9”. Any unit that the line passes through (friend or foe) is attacked with +1 Firepower, AT +0." },
            personalTeleport: { roll: 4, name: "Personal Teleport", description: "The Psionic can move to any location within 9”. Destination does not have to be visible." },
            psionicAugmentatio: { roll: 5, name: "Psionic Augmentation", description: `Until the end of the following enemy turn, the Psionic gains Damage Mitigation (${TRAITS.damageMitigation.description}) and Penetrating Damage (${TRAITS.penetratingDamage.description}).` },
            mentalShock: { roll: 6, name: "Mental Shock", description: `Roll 2D6. If the roll exceeds the Cohesion of the target unit, it takes 2 points of Penetrating Damage (${TRAITS.penetratingDamage.description}).` }
        }
    }
}

export const ARMY_LISTS = {
    imperialLegion: {
        name: "Imperial Legion (Grimdark)",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.imperialLegion, imperials: ARMY_SPECIAL_RULES.imperials.imperials },
        psionicPowers: { generic: PSIONIC_POWERS_LIST.generic, imperialLegion: PSIONIC_POWERS_LIST.imperialLegion },
        upgrades: {
            ...GENERIC_UPGRADES,
            antiTankSpecialists: { name: "Anti Tank specialists", keyword: SQUAD, statBonuses: { points: 1 }, description: "Close Combat Anti Tank becomes +2 regardless of prior score." }, //TODO: Overwriting stat with statbonus value
            humanBomb: { name: "Human Bomb", keyword: SQUAD, statBonuses: { points: 5 }, description: "Add 1 figure to the unit. At any point when the unit is active, remove the figure and select an enemy squad or vehicle (but not Individual) within 6”. Line of sight is not required. Roll 1D6: On a 1-3 the attack fails. On a 4-6 a squad takes 2 points of damage while a vehicle takes a +1 AT hit." },
            indoctrinationOfficer: { name: "Indoctrination officer", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, cohesion: 1, points: 5 }, description: "Add +1 to Cohesion and Assault values. If the squad is on an objective of any kind, it may not move from that position." },
            preacher: { name: "Preacher", keyword: SQUAD, statBonuses: { points: 3 }, description: "When taking the Regroup action regain 1 additional point of Cohesion." },
            veteranSergeant2: { name: "Veteran sergeant", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, points: 3 }, description: "Increase Assault factor by +1." },
            swagger: { name: "Swagger", keyword: COMMAND, statBonuses: { points: 2 }, description: "When the unit is eliminated, it receives a Lucky Escape roll exactly as it was a Hero. If it is already a Hero, you can roll two dice for Lucky Escapes. Once the Unit has been saved once, the ability is lost for the rest of the game." },
            plasmaPistol: { name: "Plasma Pistol", keyword: COMMAND, statBonuses: { points: 1 }, description: "When shooting at 9” range or less, you may choose to overcharge the pistol. Add +1 to Firepower and gain Penetrating Damage. If the hit roll is doubles, the shooter takes 1 point of damage." },
            urbanWarfare: { name: "Urban Warfare", keyword: COMMAND, statBonuses: { points: 1 }, description: "The unit gains the Anti Personnel Trait:" + TRAITS.antiPersonnel.description },
            rallying: { name: "Rallying", keyword: COMMAND, statBonuses: { points: 3 }, description: "When activated, the unit can give up an Action to recover 1 Cohesion to an Imperial infantry unit within 6” and sight. This can be done with both Actions during a Full Activation. The same target unit can be selected twice." },
            antiTankGrenades: { name: "Anti tank grenades", keyword: COMMAND, statBonuses: { points: 1 }, description: "Close Combat Anti Tank becomes +1 regardless of current value." }, //TODO: Implement value overriding
            trackGuards: { name: "Track guards", keyword: VEHICLE, statBonuses: { points: 2 }, description: "If the vehicle is immobilised due to an attack, the Track guards are destroyed instead. A second immobilising hit takes effect normally. Tracked vehicle only. Single use." },
            flameThrower: { name: "Flame thrower", keyword: VEHICLE, statBonuses: { points: 3 }, description: "When shooting at infantry within 6”, attacks Bypass Cover." },
            smokeDischarger: { name: "Smoke discharger", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Can be discharged at the end of a Move Action. The vehicle receives Soft Cover until the end of the next enemy Phase but cannot fire this activation. Single Use." },
            urbanWarfareUpgrade: { name: "Urban Warfare Upgrade", keyword: VEHICLE, statBonuses: { armour: { rear: 1 }, points: 2 }, description: "Add +1 to Rear Armour value." },
            adverseTerrainUpgrade: { name: "Adverse Terrain Upgrade", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Can move up to 6” when moving in Bad Going. Tracked vehicle only." }
        },
        units: {
            conscriptSquad: { name: "Conscript Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 6, points: 7, composition: "6 figures", specialRules: [] },
            tacticalSquad: { name: "Tactical Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 10, composition: "6 figures with 1 heavy weapon", specialRules: [] },
            penalSquad: { name: "Penal squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 9, composition: "6 figures", specialRules: [{ name: "Redemption", desription: "If assaulting a unit with an Assault factor of +2 or higher, the unit inflicts 1 additional point of Combat Shock" }, TRAITS.specialist, { name: "Do or die", description: "Penal squads cannot take the Regroup action" }] },
            unmarkedTrooperSquad: { name: "Unmarked Trooper Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 10, composition: "6 figures", specialRules: [{ name: "Enthusiasm", description: " When unmarked troopers lose a close combat, the player can choose to have them fight again immediately instead of retreating. You can do this once per close combat. The final result determines retreats" }, TRAITS.specialist] },
            veteranSquad: { name: "Veteran Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 13, composition: "5 figures", specialRules: [] },
            shockTroopers: { name: "Shock Troopers", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 1 }, cohesion: 9, points: 14, composition: " figures with 1 heavy weapon", specialRules: [] },
            assaultSquad: { name: "Assault Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 1 }, cohesion: 8, points: 8, composition: "6 figures", specialRules: [] },
            jumpAssaultSquad: { name: "Jump Assault Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 1 }, cohesion: 8, points: 10, composition: "6 figures", specialRules: [TRAITS.jump] }, //NOTE: this handles optional jump trait for assault squad. Might have some problem in campaign play if options can be taken ber game basis.
            semiHumanSquad: { name: "Semi-human Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 0 }, cohesion: 8, points: 10, composition: "6 figures", specialRules: [TRAITS.specialist] },
            ogreAssaultSquad: { name: "Ogre Assault Squad", keyword: SQUAD, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 1 }, cohesion: 10, points: 12, composition: "3 large humanoids", specialRules: [TRAITS.specialist, TRAITS.simpleMinded] },
            tacticalCavalrySection: { name: "Tactical Cavalry Section", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 7, points: 9, composition: "4 mounted figures", specialRules: [TRAITS.cavalry] },
            shockCavalrySection: { name: "Shock Cavalry Section", keyword: SQUAD, move: 7, firepower: [{ firefight: null, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 2 }, cohesion: 7, points: 12, composition: "4 mounted figures", specialRules: [TRAITS.cavalry, { name: "Punishing", description: " If the unit wins a round of close combat, the enemy takes 1 additional point of damage" }] },
            halflingSniperTeam: { name: "Halfling Sniper Team", keyword: SQUAD, move: 4, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: null }], assault: { modifier: 0, antiTank: null }, cohesion: 7, points: 10, composition: "4 figures", specialRules: [TRAITS.sniping, TRAITS.specialist] },
            heavyWeaponTeam: { name: "Heavy Weapon Team", keyword: SQUAD, move: 4, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 2 }], assault: { modifier: 0, antiTank: null }, cohesion: 8, points: 15, composition: "6 figures with 2 heavy weapons", specialRules: [] },
            sanctionedPsionic: { name: "Sanctioned Psionic", keyword: COMMAND, move: 6, firepower: [{ firefight: null, battle: null, long: null, antiTank: null }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 11, composition: "1 figure", specialRules: [{ name: "Unstable psionics", description: "Each time the unit uses a Psionic Power, lose 1 cohesion" }, TRAITS.individual, TRAITS.psionic], psionicLevel: 1, psionicLists: [PSIONIC_POWERS_LIST.generic, PSIONIC_POWERS_LIST.imperialLegion] },
            battlePsionic: { name: "Battle Psionic", keyword: COMMAND, move: 6, firepower: [{ firefight: null, battle: null, long: null, antiTank: null }], assault: { modifier: 0, antiTank: null }, cohesion: 7, points: 18, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.psionic], psionicLevel: 2, psionicLists: [PSIONIC_POWERS_LIST.generic, PSIONIC_POWERS_LIST.imperialLegion] },
            commandSquad: { name: "Command Squad", keyword: COMMAND, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 10, composition: "3 figures", specialRules: [TRAITS.leadership] },
            cavalryCommandSquad: { name: "Cavalry Command Squad", keyword: COMMAND, move: 8, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 10, composition: "3 mounted figures", specialRules: [TRAITS.leadership, TRAITS.cavalry] },
            officer: { name: "Officer", keyword: COMMAND, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 10, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.leadership] },
            scoutWalker: { name: "Scout Walker", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 0, antiTank: null }, armour: { front: 8, side: 7, rear: 7 }, points: 15, composition: "1 walker", specialRules: [TRAITS.walker, TRAITS.armoured, { name: "Poor Protection", description: "Assault attacks against the scout walker get +1 to anti-tank" }] },
            frontlineTank: { name: "Frontline Tank", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 2, antiTank: null }, { firefight: 1, battle: 1, long: 1, antiTank: 2 }], armour: { front: 11, side: 10, rear: 8 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.highExplosive] },
            frontlineTankVanquish: { name: "Frontline Tank - Vangquish", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 2, antiTank: null }, { firefight: 0, battle: 2, long: 2, antiTank: 2 }], armour: { front: 11, side: 10, rear: 8 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured] }, //TODO: Handles vanquish upgrade
            frontlineTankAutocannon: { name: "Frontline Tank - Autocannon", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 2, antiTank: null }, { firefight: 1, battle: 1, long: 1, antiTank: 0 }], armour: { front: 11, side: 10, rear: 8 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured] },
            siegeTank: { name: "Siege Tank", keyword: VEHICLE, move: 5, firepower: [{ firefight: 3, battle: 3, long: null, antiTank: null }, { firefight: 2, battle: 0, long: null, antiTank: 3 }], armour: { front: 12, side: 10, rear: 8 }, points: 28, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.highExplosive, TRAITS.siegeGun] },
            assaultArtillery: { name: "Assault Artillery", keyword: VEHICLE, move: 6, firepower: [{ firefight: 2, battle: null, long: 2, antiTank: 3 }, { firefight: 0, battle: 0, long: 0, antiTank: 1 }], armour: { front: 10, side: 8, rear: 7 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.highExplosive, TRAITS.forwardFiring] },
            hippogriffMortarTank: { name: "Hippogriff Mortar Tank", keyword: VEHICLE, move: 6, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: null }], armour: { front: 10, side: 8, rear: 7 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.indirectFire, { name: "Shrapnel", description: "When firing indirectly, targets in hard cover are counted as soft cover." }] },
            flameTank: { name: "Flame Tank", keyword: VEHICLE, move: 9, firepower: [{ firefight: 3, battle: 0, long: null, antiTank: null }, { firefight: 2, battle: null, long: null, antiTank: 0 }], armour: { front: 10, side: 8, rear: 8 }, points: 19, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.flameWeapon, TRAITS.bypassCover, { name: "Fuel tanks", decriptio: "When hit from the sides, treat minor damage as major" }] },
            pegasusAmphibiousAssaultVehicle: { name: "Pegasus Amphibioius Assault Vehicle", keyword: VEHICLE, move: 9, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 0 }], armour: { front: 10, side: 8, rear: 7 }, points: 15, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: "Transport Capacity (4)", description: TRAITS.transportCapacity.description + ". Can transport only Imperial Legion troops" }, { name: "Amphibious", description: "", }] },
            centaurReconVehicle: { name: "Centaur Recon Vehicle", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 0 }], armour: { front: 10, side: 8, rear: 8 }, points: 12, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.wheeled] },
            infantryFightingVehicle: { name: "Infantry Fighting Vehicle", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 0 }], armour: { front: 10, side: 8, rear: 8 }, points: 1, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: "Transport Capacity (4)", description: TRAITS.transportCapacity.description + ". Can transport only Imperial Legion troops." }] },
            strikeSpeeder: { name: "Strike Speeder", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 1 }], assault: { modifier: -1, antiTank: null }, cohesion: 6, points: 14, composition: "1 grav vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.hover] },
            mortarTeam: { name: "Mortar team", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: null, battle: 0, long: 0, antiTank: null }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 15, composition: "1 artillery weapon with crew", specialRules: [TRAITS.indirectFire, TRAITS.fieldArtillery] },
            quadGun: { name: "Quad Gun", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: null, battle: 1, long: 1, antiTank: null }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 17, composition: "1 artillery weapon with crew", specialRules: [TRAITS.indirectFire, TRAITS.fieldArtillery, { name: "Conventional fire", description: "When fired directly, firepower is NA / +0 / +0" }] },
            tunnelMortar: { name: "Tunnel Mortar", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: null, battle: 0, long: 0, antiTank: null }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 18, composition: "1 artillery weapon with crew", specialRules: [TRAITS.indirectFire, TRAITS.fieldArtillery, TRAITS.bypassCover] },
            scorpionHeavyWeaponsPlatform: { name: "MK1 Scorpion Heavy Weapons Platform", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: 1, battle: 2, long: 1, antiTank: 2 }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 14, composition: "1 artillery weapon with crew", specialRules: [TRAITS.fieldArtillery] },
            fencerGunCarrier: { name: "MK1 Fencer Gun Carrier", keyword: FIELD_ARTILLERY, move: 3, firepower: [{ firefight: 2, battle: 2, long: 0, antiTank: 0 }], assault: { modifier: -1, antiTank: null }, cohesion: 8, points: 14, composition: "1 tracked artillery weapon with crew figures", specialRules: [TRAITS.mobileArtillery] }
        },
        validator: [
            {
                description: "Each Squad allows you to select up to 1 Armoured Vehicle.",
                validate: units => {
                    let vehicles = units.filter(unit => (unit.stats.keyword === VEHICLE && unit.stats.armour != null));
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);
                    return vehicles <= squads;
                }
            },
            {
                description: "Each Squad allows you to select either 1 Field Artillery or 1 Unarmoured Vehicle.",
                validate: units => {
                    let vehiclesOrArtillery = units.filter(unit => (unit.stats.keyword === VEHICLE && unit.stats.cohesion != null) || (unit.stats.keyword === FIELD_ARTILLERY));
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return vehiclesOrArtillery <= squads;
                }
            },
            {
                description: "Each Squad allows you to select up to 1 Command Rank unit.",
                validate: units => {
                    let commanders = units.filter(unit => unit.stats.keyword === COMMAND);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return commanders <= squads;
                }
            },
            {
                description: "The army must include at least one unit with the Leadership trait.",
                validate: units => {
                    return units.some(
                        unit => unit.stats.specialRules?.includes(TRAITS.leadership)
                    )
                }
            }
        ]
    },
    crawlerHorde: {
        name: "The Crawler Hordes (Grimdark)",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.crawlerHorde },
        psionicPowers: { crawlerHorde: PSIONIC_POWERS_LIST.crawlerHorde },
        upgrades: {
            searingChemicals: { name: "Searing Chemicals", keyword: SQUAD, statBonuses: { points: 2 }, description: "Gain the Flame Weapon Trait up to 9”: " + TRAITS.flameWeapon.description + " No effect if the unit lacks ranged attacks." },
            acidBlood: { name: "Acid Blood", keyword: SQUAD, statBonuses: { points: 2 }, description: "When the unit takes damage in close combat (except from Combat Shock) roll 1D6 per point of Cohesion lost. Every 6 inflicts 1 point of Penetrating Damage (" + TRAITS.penetratingDamage.description + ") on the enemy unit" },
            psiChannel: { name: "Psi Channel", keyword: SQUAD, statBonuses: { points: 1 }, description: "The unit counts as Psionic for the purpose of unit vulnerabilities. It adds +1 to hit and assault rolls against Psionic units" },
            bugChampion: { name: "Bug Champion", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, cohesion: 2, points: 2 }, description: "Add +2 to Cohesion. Assaults gain +1 and Penetrating Damage (" + TRAITS.penetratingDamage.description + "). The assault bonus is lost if an enemy rolls a natural 6 in close combat against the unit." },
            razorClaws: { name: "Razor Claws", keyword: SQUAD, statBonuses: { assault: { modifier: 1, antiTank: 1 }, points: 1 }, description: "+1 to Assault and Assault Anti-Tank (becomes +0 if currently -)" }, //TODO: handle granting of factor
            bioPlasma: { name: "Bio-Plasma", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "Gain Bypass Cover: " + TRAITS.bypassCover.description },
            crushingGrip: { name: "Crushing Grip", keyword: INDIVIDUAL, statBonuses: { assault: { antiTank: 1 }, points: 1 }, description: "Assault Anti-Tank +1" },
            spineLauncher: { name: "Spine Launcher", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "Not subject to Combat Shock" },
            waveShield: { name: "Wave Shield", keyword: INDIVIDUAL, statBonuses: { points: 3 }, description: "Gain Damage Mitigation except against Psionic units. Damage Mitigation: " + TRAITS.damageMitigation.description },
            berserker: { name: "Berserker", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "If the unit loses or ties a close combat, fight another round again immediately." }
        },
        units: {
            crawlerWarriors: { name: "Crawler Warriors", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null }], assault: { modifier: 5, antiTank: 0 }, cohesion: 8, points: 13, composition: "3 large bugs", specialRules: [] },
            crawlerWarriorsAcidCannon: { name: "Crawler Warriors - Acid Cannon", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: 1, long: null, antiTank: 0 }], assault: { modifier: 4, antiTank: 0 }, cohesion: 8, points: 15, composition: "3 large bugs with 1 heavy weapon", specialRules: [] },
            mindSlaves: { name: "Mind Slaves", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 9, composition: "4-5 figures", specialRules: [{ name: "Mind Control", description: "Mind Slaves must always remain within 6” of another Crawler unit. Each time the unit is activated while more than 6” from other Crawlers, it immediately loses 2 Cohesion." }, { name: "Captives", description: " Mind Slave units do not count as Crawlers and do not benefit from any Crawler rules. They do not benefit from any army special rules regardless of what army the unit originally was part of." }] },
            centaurSquad: { name: "Centaur Squad", keyword: SQUAD, move: 6, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 1 }], assault: { modifier: 3, antiTank: 1 }, cohesion: 9, points: 15, composition: "2 bulky figures", specialRules: [] },
            huntingBrood: { name: "Hunting Brood", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null }], assault: { modifier: 2, antiTank: null }, cohesion: 7, points: 8, composition: "5 figures", specialRules: [TRAITS.agile] },
            clawedHorrors: { name: "Clawed Horrors", keyword: SQUAD, move: 7, assault: { modifier: 3, antiTank: 0 }, cohesion: 7, points: 9, composition: "5 figures", specialRules: [TRAITS.agile, { name: "Charge", description: "+1 to Assault when initiating combat." }] },
            wingedBrood: { name: "Winged Brood", keyword: SQUAD, move: 7, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: null }], assault: { modifier: 1, antiTank: null }, cohesion: 7, points: 10, composition: "5 figures", specialRules: [{ name: "Descent", description: "Instead of setting up normally, at the end of the first game turn roll 2D6 and place them anywhere within that many inches of your table edge." }, TRAITS.jump] },
            critters: { name: "Critters", keyword: SQUAD, move: 7, assault: { modifier: 1, antiTank: null }, cohesion: 6, points: 6, composition: "1 Swarm", specialRules: [{ name: "Chomp chomp", description: "Automatically regain 1 Cohesion each time they engage in assault combat. This is applied before resolving the combat. Not subject to Combat Shock." }, { name: "Fresh salad", description: "Critters do not count plant features as Bad Going and will clear a path as wide as the unit as they move through." }] },
            mindBlaster: { name: "Mind Blaster", keyword: INDIVIDUAL, move: 3, firepower: [{ firefight: 0, battle: 1, long: 2, antiTank: 2 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 7, points: 15, composition: "1 big bug", specialRules: [TRAITS.individual, { name: "Psionic bolts", description: "Attack is considered to be psionic for the purpose of units specially affected by this" }, { name: "Psionic shield", description: " 1 point of Damage Mitigation (" + TRAITS.damageMitigation.description + "), unless the attacking unit is Psionic." }] },
            sneakerKiller: { name: "Sneaker Killer", keyword: INDIVIDUAL, move: 6, assault: { modifier: 4, antiTank: 1 }, cohesion: 8, points: 15, composition: "1 big bug", specialRules: [TRAITS.individual, TRAITS.agile, { name: "Evasive", description: "All incoming attacks are -1 to hit" }, { name: "Hunter", description: "Enemy Heroes that lose a round of close combat take +1 damage." }] },
            bioArtillery: { name: "Bio Artillery", keyword: INDIVIDUAL, move: 3, firepower: [{ firefight: null, battle: 0, long: 0, antiTank: 1 }], assault: { modifier: 0, antiTank: null }, cohesion: 7, points: 15, composition: "1 big bug", specialRules: [TRAITS.individual, TRAITS.indirectFire, TRAITS.ponderous] },
            screamer: { name: "Screamer", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: 0, long: 2, antiTank: 2 }], assault: { modifier: 5, antiTank: 3 }, cohesion: 12, points: 29, composition: "1 big bug", specialRules: [TRAITS.individual, TRAITS.damageMitigation, TRAITS.terror, TRAITS.simpleMinded, { name: "Monster", description: "Size 3" }] },
            crawlerOverseer: { name: "Crawler Overseer", keyword: INDIVIDUAL, move: 7, firepower: [{ firefight: 2, battle: 1, long: null, antiTank: 0 }], assault: { modifier: 6, antiTank: 2 }, cohesion: 9, points: 25, composition: "1 big bug", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.terror, TRAITS.regenerate, TRAITS.psionic], psionicLevel: 1, psionicLists: [PSIONIC_POWERS_LIST.crawlerHorde] },
            crawlerOverseerAcidCannon: { name: "Crawler Overseer - Acid Cannon", keyword: INDIVIDUAL, move: 7, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: 2 }], assault: { modifier: 6, antiTank: 2 }, cohesion: 9, points: 25, composition: "1 big bug", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.terror, TRAITS.regenerate, TRAITS.psionic], psionicLevel: 1, psionicLists: [PSIONIC_POWERS_LIST.crawlerHorde] }, //Handles acid cannon option
        },
        validator: [
            {
                description: "The number of Individuals taken must be less than the number of Broods.",
                validate: units => {
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return individuals < squads;
                }
            }
        ]
    },
    killBots: {
        name: "Killbots (Grimdark)",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.killBots, noPsionics: { name: "No psionics", description: "Kill Bots cannot use Psionics under any circumstances" } },
        psionicPowers: {},
        upgrades: {
            repeatingGaussRifle: { name: "Repeating Gauss Rifle", keyword: SQUAD, statBonuses: { points: 1 }, description: "Add Anti Personnel trait: " + TRAITS.antiPersonnel.description },
            heavyGaussBeam: { name: "Heavy Gauss Beam", keyword: SQUAD, statBonuses: { firepower: { antiTank: 1 }, points: 2 }, description: "Ranged Anti Tank is increased by 1. Units with ranged attacks only." },
            heavyCorrosiveVibrations: { name: "Heavy Corrosive Vibrations", keyword: SQUAD, statBonuses: { assault: { antiTank: 1 }, points: 1 }, description: "Assault Anti Tank becomes +1 if currently - and is increased by 1 otherwise." },
            sinisterAura: { name: "Sinister Aura", keyword: SQUAD, statBonuses: { points: 1 }, description: "Gain Terror trait: " + TRAITS.terror.description },
            anointedByTheAncient: { name: "Anointed by the Ancient", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, cohesion: 1, points: 2 }, description: "Increase Close Combat and Cohesion by +1." },
            timeDistortionSphere: { name: "Time Distortion Sphere", keyword: INDIVIDUAL, statBonuses: { points: 5 }, description: "Single Use. Receive one less Limited Activations this turn. Next turn, receive one more Full Activations." },
            gaussScatterBeam: { name: "Gauss Scatter Beam", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "Gain Anti Personnel trait: " + TRAITS.antiPersonnel.description },
            liquidMetal: { name: "Liquid Metal", keyword: INDIVIDUAL, statBonuses: { cohesion: 1, points: 4 }, description: "+1 to Cohesion and Damage Mitigation: " + TRAITS.damageMitigation.description },
            phaseBlade: { name: "Phase Blade", keyword: INDIVIDUAL, statBonuses: { assault: { modifier: 1 }, points: 3 }, description: "Gain Penetrating Damage in close Combat (" + TRAITS.penetratingDamage.description + "). +1 to Assault." },
            phaseNullificationBeacon: { name: "Phase Nullification Beacon", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "Distortion Field extends to 9” instead of 6”." }
        },
        units: {
            raiderBots: { name: "Raider-Bots", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 1 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 15, composition: "4 figures", specialRules: [] },
            heavyGunBots: { name: "Heavy Gun Bots", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 2, long: 1, antiTank: 1 }], assault: { modifier: 1, antiTank: null }, cohesion: 8, points: 18, composition: "3 figures", specialRules: [] },
            slaughterBots: { name: "Slaughter Bots", keyword: SQUAD, move: 6, assault: { modifier: 3, antiTank: 0 }, cohesion: 8, points: 14, composition: "4 figures", specialRules: [TRAITS.agile] },
            cursedBots: { name: "Cursed Bots", keyword: SQUAD, move: 6, firepower: [{ firefight: 2, battle: 1, long: 0, antiTank: 1 }], assault: { modifier: 3, antiTank: 3 }, cohesion: 8, points: 20, composition: "4 figures", specialRules: [{ name: "Anti Psionic", description: "+1 to hit and close combat against Psionic units" }, TRAITS.penetratingDamage] },
            skitterBots: { name: "Skitter Bots", keyword: SQUAD, move: 7, assault: { modifier: 0, antiTank: 0 }, cohesion: 6, points: 8, composition: "4-6 small figures", specialRules: [TRAITS.agile, { name: "Disruption", description: "Attacks against units within 6” of Skitter Bots receive a +1 bonus to hit/close combat." }] },
            ghostBots: { name: "Ghost Bots", keyword: SQUAD, move: 6, assault: { modifier: 4, antiTank: 0 }, cohesion: 8, points: 16, composition: "2 large figures", specialRules: [{ name: "Phase", description: "Ghosts can move through units and terrain. They cannot end a move within a solid terrain feature" }] },
            hoverGunBots: { name: "Hover Gun Bots", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: 2, long: 2, antiTank: 2 }], assault: { modifier: 0, antiTank: null }, cohesion: 8, points: 23, composition: "2 figures", specialRules: [TRAITS.hover] },
            killBotLord: { name: "Kill Bot Lord", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: 1 }], assault: { modifier: 1, antiTank: 2 }, cohesion: 10, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, { name: "Energy Weapon", description: "Close Combat damage is Penetrating: " + TRAITS.penetratingDamage.description }] },
            killBotAssassin: { name: "Kill Bot Assassin", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: 0 }], assault: { modifier: 3, antiTank: 1 }, cohesion: 10, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.antiPersonnel, { name: "Hunter", description: "Enemy Heroes that lose a round of close combat take +1 damage." }] },
            gunBotPlatform: { name: "Gun Bot Platform", keyword: VEHICLE, move: 7, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: 3 }], armour: { front: 8, side: 7, rear: 7 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.hover, TRAITS.armoured] },
            killStrider: { name: "Kill Strider", keyword: VEHICLE, move: 6, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 1 }], assault: { modifier: 1, antiTank: null }, armour: { front: 9, side: 8, rear: 7 }, points: 16, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, TRAITS.flameWeapon, TRAITS.siegeGun] },
            skullCrawler: { name: "Skull Crawler", keyword: VEHICLE, move: 4, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 2 }], assault: { modifier: 1, antiTank: null }, armour: { front: 10, side: 10, rear: 10 }, points: 30, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, TRAITS.ponderous, TRAITS.forwardFiring, { name: "Two shots", description: "May shoot twice. Decare both targets before rolling. Targets must be within 6” of each other." }] },
            deathPyramid: { name: "Death Pyramid", keyword: VEHICLE, move: 6, firepower: [{ firefight: 2, battle: 2, long: null, antiTank: 1 }], armour: { front: 11, side: 11, rear: 11 }, points: 30, composition: "1 vehicle", specialRules: [TRAITS.hover, TRAITS.armoured, TRAITS.ponderous, { name: "Arc weapon", description: "May attack 2 different units each turn. Must always target the closest visible enemies." }] }
        },
        validator: [
            {
                description: "You may take up to 1 support unit and 1 individual for every 2 squads. Every 5 squads allow selecting 1 additional support unit OR individual.",
                validate: units => {
                    let support = units.filter(unit => unit.stats.keyword === VEHICLE);
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);
                    let extraSupportOrIndividuals = Math.floor(squads.length / 5);
                    let allowedSupportOrIndividuals = Math.floor(squads.length / 2);
                    let excessSupport = support.length - allowedSupportOrIndividuals;
                    excessSupport = excessSupport < 0 ? 0 : excessSupport;
                    let excessIndividuals = individuals.length - allowedSupportOrIndividuals;
                    excessIndividuals = excessIndividuals < 0 ? 0 : excessIndividuals;
                    return excessSupport + excessIndividuals > extraSupportOrIndividuals ? false : true;
                }
            }
        ]
    },
    spaceElves: {
        name: "Space Elves",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.spaceElves },
        psionicPowers: { spaceElves: PSIONIC_POWERS_LIST.spaceElves },
        upgrades: {
            ...GENERIC_INDIVIDUAL_UPGRADES, ...GENERIC_VEHICLE_UPGRADES,
            ancientWarAxe: { name: "Ancient War Axe", keyword: INDIVIDUAL, statBonuses: { assault: {modifier: 1}, points: 2 }, description: "+1 to Assault" },
            duellingBlades: { name: "Duelling Blades", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "When fighting Individuals in Close Combat, add +1 to Assault and +1 to any damage inflicted." },
            psionicAssail: { name: "Psionic Assail", keyword: INDIVIDUAL, statBonuses: { points: 3 }, description: "Whenever the unit would inflict Combat Shock, inflict 1 additional point. Unit counts as Psionic for the purpose of traits and vulnerabilities." },
            runeCasting: { name: "Rune Casting", keyword: INDIVIDUAL, statBonuses: { points: 3 }, description: "Twice per battle you can reroll a failed die roll for this character and use either result." },
            searingPistol: { name: "Searing Pistol", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "Gain +1 Anti Tank when firing at Firefight range." },
            psionicLinkCrystal: { name: "Psionic Link Crystal", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Walkers only. If within 9” of a friendly Psionic, add +1 to hit rolls when firing."},
            flameGuns: { name: "Flame Guns", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Walkers only. Gain Flame Weapon Trait at Firefight range."}, //TODO: unit type restriction
            hyperReactiveEngines: { name: "Hyper Reactive Engines", keyword: VEHICLE, statBonuses: { points: 1 }, description: "Armoured vehicles only. . The vehicle can turn 45 degrees for free when it is activated."}, //TODO: unit type restriction
            diffusionField: { name: "Diffusion Field", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Armoured vehicles only. Every time the vehicle is hit by a ranged attack roll 1D6. On a 6 the hit has no effect."}, //TODO: unit type restriction
            psiShockEmitter: { name: "Psi-Shock Emitter", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Armoured vehicles only. Close assaulting infantry that fail to destroy the vehicle take 1 point of damage."}, //TODO: unit type restriction
            psionicDisarrayCaster: { name: "Psionic Disarray Caster", keyword: VEHICLE, statBonuses: { assault: {modifier: 1}, points: 1 }, description: "Light vehicles only. +1 to Assault"}, //TODO: unit type restriction
            adaptiveTerrainEvasion: { name: "Adaptive Terrain Evasion", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Light vehicles only. When placed on top of terrain features, all incoming fire is -1 to hit."}, //TODO: unit type restriction
            crystalTargetingArray: { name: "Crystal Targeting Array", keyword: VEHICLE, statBonuses: { firepower:{firefight: 1, battle: 1, long: 1}, points: 3 }, description: "Light vehicles only. +1 Firepower at all ranges."} //TODO: unit type restriction
        },
        units: {
            roverSquad: { name: "Rover Squad", keyword: SQUAD, move: 6, firepower: [{ firefight: 0, battle: 2, long: 2, antiTank: null }], assault: { modifier: 1, antiTank: null }, cohesion: 6, points: 15, composition: "3 figures", specialRules: [TRAITS.infiltration, TRAITS.agile] },
            homeDefenceSquad: { name: "Home Defence Squad", keyword: SQUAD, move: 6, firepower: [{ firefight: 1, battle: 1, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 7, points: 10, composition: "4 figures", specialRules: [] },
            homeDefenceAssaultSquad: { name: "Home Defence Assault Squad", keyword: SQUAD, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: 0 }], assault: { modifier: 2, antiTank: 1 }, cohesion: 7, points: 9, composition: "4 figures", specialRules: [] },
            homeDefenceAssaultSquadFlamer: { name: "Home Defence Assault Squad - Flamer", keyword: SQUAD, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: 0 }], assault: { modifier: 2, antiTank: 1 }, cohesion: 7, points: 11, composition: "4 figures", specialRules: [TRAITS.flameWeapon] },
            vengeanceWarCult: { name: "Vengeance War Cult", keyword: SQUAD, move: 7, firepower: [{ firefight: 2, battle: 0, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 1 }, cohesion: 7, points: 15, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name:"Intense Firefight", description: "Fires simultaneously with attacker when being attacked in firefights."}] },
            deathTollWarCult: { name: "Death-Toll War Cult", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 2, long: 2, antiTank: 3 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 7, points: 23, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name:"Accurate", description:"Ignore Light Vehicle hit penalty."}] },
            killBirdWarCult: { name: "Kill Bird War Cult", keyword: SQUAD, move: 9, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 1 }, cohesion: 7, points: 12, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, TRAITS.jump, {name:"Redeploy", description:"When taking a double move the unit can be placed anywhere within 24”."}] },
            venomStingWarCult: { name: "Venom-Sting War Cult", keyword: SQUAD, move: 7, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 0 }, cohesion: 7, points: 14, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name:"Punishing", description:"If the unit wins a round of close combat, the enemy takes 1 additional point of damage."}] },
            graveScreamWarCult: { name: "Grave-Scream War Cult", keyword: SQUAD, move: 8, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 0 }, cohesion: 7, points: 15, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name:"Psionic Charge", description:"When initiating Close Combat, inflict an additional point of Combat Shock."}] },
            voidLeapWarCult: { name: "Void-Leap War Cult", keyword: SQUAD, move: 4, firepower: [{ firefight: 2, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 7, points: 16, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name: "Void Movement", description: " When the unit activates, it may move to any location within 9”. This does NOT use a Move action but the unit cannot use Void movement and regular Movement in the same activation."}] },
            fireLashWarCult: { name: "Fire-Lash War Cult", keyword: SQUAD, move: 4, firepower: [{ firefight: 2, battle: 0, long: null, antiTank: 2 }], assault: { modifier: 2, antiTank: 2 }, cohesion: 7, points: 15, composition: "3 figures", specialRules: [ARMY_SPECIAL_RULES.spaceElves.warCult, {name: "Fusion Weapons", description: "+1 to Anti Tank within 9”."} ]},
            elvenWarDemon: { name: "Elven War Demon", keyword: INDIVIDUAL, move: 6, assault: { modifier: 8, antiTank: 4 }, cohesion: 15, points: 30, composition: "1 figure", specialRules: [TRAITS.unique, TRAITS.leadership, TRAITS.individual, TRAITS.specialist, {name:"Extra Dimensional", description:"Considered to be a Demon for the purpose of unit abilities. Is not affected by Hazardous Terrain and is unaffected by any virus or poison."}] },
            grandSeer: { name: "Grand Seer", keyword: INDIVIDUAL, move: 4, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 1 }, cohesion: 8, points: 25, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.unique, TRAITS.damageMitigation, TRAITS.leadership, TRAITS.psionic], psionicLevel: 4, psionicLists: [PSIONIC_POWERS_LIST.spaceElves] },
            elfSorcerer: { name: "Elf Sorcerer", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: 0 }], assault: { modifier: 1, antiTank: 1 }, cohesion: 8, points: 20, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.damageMitigation, TRAITS.psionic], psionicLevel: 2, psionicLists: [PSIONIC_POWERS_LIST.spaceElves] },
            wraithSeer: { name: "Wraith Seer", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: 0 }], assault: { modifier: 1, antiTank: 1 }, cohesion: 8, points: 16, composition: "1 figure", specialRules: [TRAITS.individual, {name:"Repair (Elf vehicles only)", description: TRAITS.repair.description}, {name:"Psionic aptitude", description:"Can engage and defend in Psionic Duels (L2) and count as Psionic, but cannot use powers."}] },
            adventurer: { name: "Adventurer", keyword: INDIVIDUAL, move: 7, firepower: [{ firefight: 1, battle: null, long: null, antiTank: 1 }], assault: { modifier: 3, antiTank: 2 }, cohesion: 8, points: 19, composition: "1 figure", specialRules: [TRAITS.hero, TRAITS.individual, {name:"Premonition", description:"After both sides finish deploying, you may move the Adventurer to anywhere within your deployment zone."}] },
            warCultChampion: { name: "War Cult Champion", keyword: INDIVIDUAL, move: 7, firepower: [{ firefight: 2, battle: 0, long: null, antiTank: 0 }], assault: { modifier: 5, antiTank: 1 }, cohesion: 9, points: 24, composition: "1 figure", specialRules: [TRAITS.hero, TRAITS.individual, {name:"Arcane Weapons", description:"If an assault ends in a Draw, the Champion takes no damage and the enemy takes an additional point of damage."}] },
            soulStrider: { name: "Soul Strider", keyword: VEHICLE, move: 8, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 2 }], assault:{modifier: 3, antiTank: 1}, armour: { front: 8, side: 8, rear: 8 }, points: 24, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, {name:"Scything Fire", description:"In firefights, damage against infantry targets is +1."}] },
            scoutStrider: { name: "Scout Strider", keyword: VEHICLE, move: 9, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: 2 }], assault:{modifier: 0, antiTank: null}, armour: { front: 8, side: 8, rear: 8 }, points: 21, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, {name:"Duplicate targeting array", description:"The Strider may fire twice per turn, but may not target the same unit twice."},{name:"Power screened crew", description:"Each time the Strider is hit by any attack roll 2D6. On a total of 11 or 12, the pilot is killed and the Strider is destroyed."},{name:"Poor protection", description:"Assault attacks against the scout walker get +1 to anti-tank."}] },
            deathWalkers: { name: "Death Walkers", keyword: VEHICLE, move: 6, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: 3 }], assault:{modifier: 1, antiTank: 2}, armour: { front: 8, side: 8, rear: 8 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, TRAITS.ponderous, {name:"Kill Beam", description:"Ranged attacks that penetrate vehicle armour roll twice on the damage table and pick the highest result."}] },
            firehawkGravTank: { name: "Firehawk Grav Tank", keyword: VEHICLE, move: 12, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 1 }], armour: { front: 10, side: 9, rear: 9 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.hover, TRAITS.armoured, {name:"Transport Capacity (3)", desription: TRAITS.transportCapacity}] },
            fireChannel: { name: "Fire Channel", keyword: VEHICLE, move: 12, firepower: [{ firefight: 0, battle: 1, long: 2, antiTank: 2 }], armour: { front: 10, side: 9, rear: 9 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.hover, TRAITS.armoured] },
            serpent: { name: "Serpent", keyword: VEHICLE, move: 12, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null },{ firefight: 1, battle: 1, long: 1, antiTank: 2 }], assault: { modifier: -1, antiTank: null }, cohesion: 6, points: 15, composition: "1 vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.hover, TRAITS.open] },
            hyperBike: { name: "Hyper Bike", keyword: VEHICLE, move: 14, firepower: [{ firefight: 0, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 6, points: 14, composition: "1 vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.hover, TRAITS.open, TRAITS.forwardFiring, TRAITS.antiPersonnel] },
            displacerCannon: { name: "Displacer Cannon", keyword: FIELD_ARTILLERY, move: 4, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 2 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 20, composition: "1 artillery and 2 crew", specialRules: [TRAITS.mobileArtillery, {name:"Destructive", description:"A double 5 or double 6 to hit reduces the target to 0 Cohesion regardless of Damage Mitigation or current Cohesion."}, {name:"Slow build up",description:"The unit cannot move and fire."}] },
            laserPlatform: { name: "Laser Platform", keyword: FIELD_ARTILLERY, move: 4, firepower: [{ firefight: 2, battle: 2, long: 0, antiTank: null },{ firefight: 1, battle: 1, long: 1, antiTank: 2 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 15, composition: "1 artillery and 2 crew", specialRules: [TRAITS.mobileArtillery] },
            plasmaPlatform: { name: "Plasma Platform", keyword: FIELD_ARTILLERY, move: 4, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 1 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 16, composition: "1 artillery and 2 crew", specialRules: [TRAITS.mobileArtillery, {name:"Charge Up", description:" If the unit does not move, Firepower is +2 / +2 / +2 and AT is +2."}] },
            vibrationCannon: { name: "Vibration Cannon", keyword: FIELD_ARTILLERY, move: 4, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 1 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 16, composition: "1 artillery and 2 crew", specialRules: [TRAITS.mobileArtillery, TRAITS.siegeGun, {name:"Beam Weapon", description:"When firing draw a line that stops when blocked by terrain. All units under the line are attacked, including friendlies."}] }
        },
        validator: [
            {
                description: "You may take up to 1 vehicle per Squad.",
                validate: units => {
                    let vehicles = units.filter(unit => unit.stats.keyword === VEHICLE);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return vehicles.length <= squads.length;
                }
            },
            {
                description: "You may take up to 1 Field Artillery for every 2 Squads.",
                validate: units => {
                    let fieldArtillery = units.filter(unit => unit.stats.keyword === FIELD_ARTILLERY);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return fieldArtillery.length * 2 <= squads.length;
                }
            },
            {
                description: "You may take up to 1 Individual per Squad.",
                validate: units => {
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return individuals.length <= squads.length;
                }
            }
        ]
    },
    spaceOrcs: {
        name: "Space Orcs (Grimdark)",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.spaceOrcs, orcishOrganisation: { name: "Orcish organisation", description: "Players who prefer a more “horde” look to their orcs can add 0-2 figures to each squad as they see fit. This does not modify the stats of the unit in any way." }, spaceOrcPsionics: { name: "Space Orc Psionics", description: "Space Orcs MUST use Space Orcs psionic table, they cannot use general psionic abilities. All Space Orc Psionic damage is Penetrating Damage (" + TRAITS.penetratingDamage.description + "). Orc Psionics always target the closest enemy unit and must use a power if an enemy is visible. You are not required to activate Psionic units however." } },
        psionicPowers: { spaceOrcs: PSIONIC_POWERS_LIST.spaceOrcs },
        upgrades: {
            ...GENERIC_UPGRADES,
            bigOrc: { name: "Big Orc", keyword: SQUAD, statBonuses: { points: 2 }, description: "The squad adds +1 to Assault rolls when it is attacking (but not when defending)." },
            ardLadz: { name: "Ard Ladz", keyword: SQUAD, statBonuses: { points: 1 }, description: "The squad gains Damage Mitigation: " + TRAITS.damageMitigation.description },
            mek: { name: "Mek", keyword: SQUAD, statBonuses: { assault: { antiTank: 1 }, points: 2 }, description: "If the squad does not have an assault anti tank value, it receives a +0. If it has an assault anti tank value, it is increased by 1." }, //TODO: Handle granting of stat
            bigBanner: { name: "bigBanner", keyword: SQUAD, statBonuses: { points: 5 }, description: "The Unit gains the Leadership trait: " + TRAITS.leadership.description },
            extraShooty: { name: "Extra Shooty", keyword: SQUAD, statBonuses: { points: 2 }, description: "The squad gains Anti Personnel up to 24” range: " + TRAITS.antiPersonnel.description },
            goblinAssistant: { name: "Goblin Assistant", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "Each time the character shoots or fights in Close Combat roll 1D6. On a 1 the character rolls at a -1 penalty, on a 5-6 roll at a +1 bonus. If the character loses a Close Combat round, the Assistants are killed." },
            megaCrushArm: { name: "Mega Crush Arm", keyword: INDIVIDUAL, statBonuses: { assault: { antiTank: 1 }, points: 2 }, description: "Add +1 to Close Combat Anti Tank. Close Combat attacks are Penetrating Damage: " + TRAITS.penetratingDamage.description },
            customGun: { name: "Custom Gun", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: "You may reroll one die each time you shoot, however if a hit roll is a double 1 before or after rerolling, the weapon explodes: The character takes 2 points of damage and cannot shoot for the rest of the game." },
            stateOfTheOrcCybernetics: { name: "State of the Orc Cybernetics", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: `Gain Damage Mitigation (${TRAITS.damageMitigation.description}), Limited Intelligence (${TRAITS.limitedIntelligence.description}) and Simple Minded (${TRAITS.simpleMinded.description}).` },
            bigOleBomb: { name: "Big Ole Bomb", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: `Usable once per battle as a ranged attack. Requires a Fire action. Attacks up to 9” with +2 Firepower, High Explosive (${TRAITS.highExplosive.description}) and +3 Anti Tank.` },
            superFastGuns: { name: "Super Fast Guns", keyword: VEHICLE, statBonuses: { firepower: { firefight: 1, battle: -1, long: -1 }, assault: { modifier: 1 }, points: 1 }, description: "Light Vehicles only. Increase 9” Firepower by 1. Reduce 24” and Long Firepower by 1. Close Combat is increased by +1" }, //TODO: Make upgrade available only for light vehicles
            somewhatArmouredCompartment: { name: "Somewhat Armoured Compartment", keyword: VEHICLE, statBonuses: { cohesion: 1, points: 2 }, description: "Light vehicles only. Cohesion +1" }, //TODO: Make upgrade available only for light vehicles 
            goblinRiders: { name: "Goblin Riders", keyword: VEHICLE, statBonuses: { points: 3 }, description: "Light vehicles only. If the vehicle is destroyed, replace it with a Goblin Squad." },//TODO: Make upgrade available only for light vehicles 
            extraBigGrabbyClaw: { name: "Extra Big Grabby Claw", keyword: VEHICLE, statBonuses: { assault: { antiTank: 2 }, points: 2 }, description: "Walkers only. Close Combat Anti Tank is increased by 2." }, //TODO Make upgrade available only for walkers
            powerShield: { name: "Power Shield", keyword: VEHICLE, statBonuses: { points: 2 }, description: "Walkers only. Activates when taking a hit with AT +0 or greater. Roll 1D6 for each hit. On a 5-6 the hit is negated completely. On a 2-4 nothing happens. On a 1 the walker is paralysed and cannot be activated next Orc turn." },//TODO Make upgrade available only for walkers
            overchargedLaser: { name: "Overcharged Laser", keyword: VEHICLE, statBonuses: { points: 2 }, description: "When shooting at Armoured vehicles, add 2 to Anti Tank but reduce Firepower by 1." },//TODO Make upgrade available only for walkers
            boltedOnJunk: { name: "Bolted On Junk", keyword: VEHICLE, statBonuses: { points: 3 }, description: "Armoured vehicles only. The first damage result the vehicle suffers from any source is ignored." }, //Make upgrade available only for armoured vehicles
            slimmedDownArmour: { name: "Slimmed Down Armour", keyword: VEHICLE, statBonuses: { move: 3, armour: { side: -1, rear: -1 }, points: 1 }, description: "Armoured vehicles only. Reduce Flank and Side Armour by 1 point each. Increase Speed by +3”." },//Make upgrade available only for armoured vehicles
            hugePileOfAmmo: { name: "Huge Pile Of Ammo", keyword: VEHICLE, statBonuses: { points: 2 }, description: `Armoured vehicles only. Gain Anti Personnel (${TRAITS.antiPersonnel.description}). If the vehicle is Knocked Out, it is always treated as Catastrophic Damage.` }//Make upgrade available only for armoured vehicles
        },
        units: {
            goblins: { name: "Goblins", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 0, antiTank: null }, cohesion: 5, points: 5, composition: "8 figures", specialRules: [{ name: "Distracting", description: "Enemies withn 9” of goblins cannot fire at a more distant target." }, TRAITS.agile] },
            venomBitesSquad: { name: "Venom Bites Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 9, composition: "6 figures", specialRules: [] },
            angrySunSquad: { name: "Angry Sun Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: 0 }], assault: { modifier: 2, antiTank: 1 }, cohesion: 8, points: 8, composition: "6 figures", specialRules: [] },
            goreHammerSquad: { name: "Gore Hammer Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 10, composition: "6 figures", specialRules: [{ name: "Cunning", description: "Gore Hammer and Kommando units are not counted for the purpose of the Disregard for Planning army rule." }] },
            gruntzSquad: { name: "Gruntz Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: null, long: null, antiTank: 0 }], assault: { modifier: 3, antiTank: 0 }, cohesion: 8, points: 10, composition: "6 figures", specialRules: [] },
            primitiveWarband: { name: "Primitive Warband", keyword: SQUAD, move: 6, assault: { modifier: 3, antiTank: null }, cohesion: 8, points: 8, composition: "6 figures", specialRules: [] },
            goreHammerKommandos: { name: "Gore Hammer Kommandos", keyword: SQUAD, move: 6, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 2 }, cohesion: 9, points: 11, composition: "5 figures", specialRules: [TRAITS.infiltration, { name: "Cunning", description: "Gore Hammer and Kommando units are not counted for the purpose of the Disregard for Planning army rule." }] },
            tankBreakies: { name: "Tank Breakies", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: -1, antiTank: +1 }], assault: { modifier: 2, antiTank: 2 }, cohesion: 8, points: 10, composition: "5 figures with 2 heavy weapons", specialRules: [] },
            burners: { name: "Burners", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 1 }, cohesion: 8, points: 10, composition: "5 figures with 2 flame weapons", specialRules: [TRAITS.flameWeapon] },
            stormSquad: { name: "Storm Squad", keyword: SQUAD, move: 8, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 11, composition: "5 figures", specialRules: [TRAITS.jump, { name: "Temperamental equipment", description: "Each time the unit activates roll 1D6. On a 1 they lose 1 Cohesion." }] },
            orcatics: { name: "Orcatics", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 7, composition: "6 figures", specialRules: [TRAITS.erratic, TRAITS.specialist] },
            bombBeasts: { name: "Bomb beasts", keyword: SQUAD, move: "random", assault: { modifier: 1, antiTank: null }, cohesion: 6, points: 7, composition: "???", specialRules: [{ name: "Bomb run", description: "When activated, squad can only take a move action. Roll 1D6. On any roll but a 1 they move that many inches towards the closest visible enemy unit. On a 1 they instead move 1D6” towards the nearest unit regardless of sides." }, { name: "Blow up", description: "If at any point during the bomb beasts activation they are within 2” of an enemy they are destroyed. The enemy takes damage equal to the remaining Cohesion of the beast. Vehicles take one hit per Cohesion point with +0 AT" }] },
            oinkers: { name: "Oinkers", keyword: SQUAD, move: 8, firepower: [{ firefight: 0, battle: null, long: null, antiTank: 0 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 10, composition: "5 mounted figures", specialRules: [TRAITS.cavalry] },
            grimMoonSquad: { name: "Grim Moon Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 1 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 12, composition: "5 figures with 2 heavy weapons", specialRules: [] },
            doomSkullzSquad: { name: "Doom Skullz Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 2, long: 0, antiTank: 2 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 14, composition: "5 figures with 3 heavy weapons", specialRules: [{ name: "Custom Guns", description: "Any hit roll that rolls doubles inflicts 1 point of Penetrating Damage (" + TRAITS.penetratingDamage.description + ") on both firer and target. This is in addition to any damage inflicted by the attack otherwise and applies even if the shot missed" }] },
            orcElites: { name: "Orc Elites", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: 1 }], assault: { modifier: 3, antiTank: 0 }, cohesion: 8, points: 12, composition: "5 figures", specialRules: [] },
            megaSquad: { name: "Mega Squad", keyword: SQUAD, move: 4, firepower: [{ firefight: 1, battle: 1, long: null, antiTank: 0 }], assault: { modifier: 3, antiTank: 1 }, cohesion: 8, points: 14, composition: "3 figures", specialRules: [TRAITS.damageMitigation, TRAITS.specialist] },
            boss: { name: "Boss", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 1 }, cohesion: 8, points: 10, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero] },
            gunBoss: { name: "Gun Boss", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 1, battle: -1, long: null, antiTank: +1 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 8, points: 12, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero] },
            bannerBearer: { name: "Banner Bearer", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 8, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.leadership, TRAITS.unique] },
            psiOrc: { name: "Psi-Orc", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 8, points: 13, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.psionic, { name: "Unstable", description: " Each time the Psi-orc is activated roll 2D6. On a double 1 the unit is destroyed as the Psi-orc has a fatal meltdown." }], psionicLevel: 2, psionicLists: [PSIONIC_POWERS_LIST.spaceOrcs] },
            chiefMek: { name: "Chief Mek", keyword: INDIVIDUAL, move: 4, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 1 }], assault: { modifier: 1, antiTank: 2 }, cohesion: 7, points: 10, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.unique, { name: "Prototype", description: "If the attack roll is doubles, roll another shot against the same target. This can trigger multiple times. The weapon cannot be fired for the rest of the battle. If the roll is a double 1 the weapon explodes, killing the Mek." }] },
            hugeBoss: { name: "Huge Boss", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 1 }, cohesion: 9, points: 16, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.leadership, TRAITS.unique] },
            gunBike: { name: "Gun Bike", keyword: VEHICLE, move: 7, firepower: [{ firefight: 3, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: null }, cohesion: 6, points: 12, composition: "1 vehicle", specialRules: [TRAITS.open, TRAITS.wheeled, TRAITS.lightVehicle, ARMY_SPECIAL_RULES.spaceOrcs.boostedEngine, TRAITS.forwardFiring, { name: "Short range AT", description: "Firepower Anti-Tank is +0 at 9”, but otherwise -." }] }, //TODO: How to handle random movement
            gunTrack: { name: "Gun Track", keyword: VEHICLE, move: 4, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 2 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 6, points: 14, composition: "1 vehicle", specialRules: [TRAITS.open, TRAITS.tracked, TRAITS.lightVehicle, ARMY_SPECIAL_RULES.spaceOrcs.boostedEngine] }, //TODO: How to handle random movement
            burnTruck: { name: "Burn Truck", keyword: VEHICLE, move: 5, firepower: [{ firefight: 2, battle: 0, long: null, antiTank: null }], assault: { modifier: 2, antiTank: null }, cohesion: 6, points: 12, composition: "1 vehicle", specialRules: [TRAITS.open, TRAITS.wheeled, ARMY_SPECIAL_RULES.spaceOrcs.boostedEngine, TRAITS.flameWeapon, TRAITS.bypassCover, { name: "Big ole fuel tank", description: "If an incoming shot rolls a double 6 to hit, the vehicle is destroyed automatically" }] }, //TODO: How to handle random movement
            gunBuggy: { name: "Gun Buggy", keyword: VEHICLE, move: 5, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 1 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 6, points: 13, composition: "1 vehicle", specialRules: [TRAITS.open, TRAITS.wheeled, TRAITS.lightVehicle, ARMY_SPECIAL_RULES.spaceOrcs.boostedEngine] }, //TODO: How to handle random movement
            orcabot: { name: "Orcabot", keyword: VEHICLE, move: 4, firepower: [{ firefight: 2, battle: 0, long: null, antiTank: 0 }], assault: { modifier: 2, antiTank: 2 }, armour: { front: 10, side: 8, rear: 8 }, points: 14, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, { name: "Orcish programming", description: "The first time the unit is activated, it functions normally. Afterwards, it must turn in a random direction each time it is activated and must fire at the closest enemy target to its front 90 degrees. If it moves, it must move in the direction it is facing at full speed." }] },
            killStomper: { name: "Kill Stomper", keyword: VEHICLE, move: 6, firepower: [{ firefight: 2, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 1 }, armour: { front: 8, side: 7, rear: 7 }, points: 16, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured] },
            superKillStomper: { name: "Super Kill Stomper", keyword: VEHICLE, move: 5, firepower: [{ firefight: 2, battle: 1, long: 0, antiTank: null }, { firefight: 1, battle: 0, long: 0, antiTank: 1 }], assault: { modifier: 4, antiTank: 1 }, armour: { front: 9, side: 7, rear: 7 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured] },
            battleTransport: { name: "Battle Transport", keyword: VEHICLE, move: 12, armour: { front: 9, side: 8, rear: 8 }, points: 8, composition: "1 vehicle", specialRules: [TRAITS.wheeled, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, { name: "Readily Available", description: "The Battle Transport only counts as 1 vehicle when building your army." }, { name: "Transport Capacity (6)", description: TRAITS.transportCapacity }] },
            crushSmasher: { name: "Crush Smasher", keyword: VEHICLE, move: 10, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 1 }], armour: { front: 9, side: 8, rear: 8 }, points: 14, composition: "1 vehicle", specialRules: [TRAITS.wheeled, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, TRAITS.forwardFiring] },
            clawTank: { name: "Claw Tank", keyword: VEHICLE, move: 10, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 1 }], armour: { front: 9, side: 9, rear: 8 }, points: 16, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, { name: "Clawed Grabbers", description: "Infantry that assault the tank take 2 points of damage if they fail to destroy the tank." }] },
            crushRoller: { name: "Crush Roller", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 0 }], armour: { front: 9, side: 9, rear: 8 }, points: 18, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, { name: "Spiked Roller", description: "The tank can move through enemy Squads. Roll 3D6. For each 4+ the squad takes 1 Penetrating Damage: " + TRAITS.penetratingDamage.description }] },
            burnerTank: { name: "Burner Tank", keyword: VEHICLE, move: 10, firepower: [{ firefight: 2, battle: null, long: null, antiTank: 0 }], armour: { front: 9, side: 9, rear: 8 }, points: 15, composition: "1 vehicle", specialRules: [TRAITS.wheeled, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, TRAITS.flameWeapon, TRAITS.bypassCover] },
            smashTank: { name: "Smash Tank", keyword: VEHICLE, move: 8, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 2 }], armour: { front: 10, side: 9, rear: 8 }, points: 18, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, ARMY_SPECIAL_RULES.spaceOrcs.ramshackle, TRAITS.highExplosive, TRAITS.forwardFiring] },
            pullBeamCannon: { name: "Pull Beam Cannon", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: null }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 15, composition: "1 artillery weapon with 3 crew", specialRules: [{ name: "Pull Beam", description: "Can only target vehicles and buildings. On a hit, a building is struck with +4 AT. Vehicles are struck with +2 AT and pulled 1D6” towards the gun. Light vehicles are damaged normally." }, TRAITS.fieldArtillery, ARMY_SPECIAL_RULES.spaceOrcs.goblinMalfunction] },
            pestCatapult: { name: "Pest Catapult", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: null, battle: 0, long: 0, antiTank: 1 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 14, composition: "1 artillery weapon with 3 crew", specialRules: [TRAITS.indirectFire, TRAITS.fieldArtillery, ARMY_SPECIAL_RULES.spaceOrcs.goblinMalfunction] },
            crashCannon: { name: "Crash Cannon", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: -1, antiTank: null }, cohesion: 7, points: 15, composition: "1 artillery weapon with 3 crew", specialRules: [{ name: "Scatter", description: "If the hit roll is a double, roll to hit against the closest unit (either side) within 6”, even if not in sight. This can occur multiple times." }, TRAITS.fieldArtillery, ARMY_SPECIAL_RULES.spaceOrcs.goblinMalfunction] }
        },
        validator: [
            {
                description: "You must take at least one Individual with Boss in their title.",
                validate: units => {
                    for (let i = 0; i < units.length; i++) {
                        let unit = units[i];
                        if (unit.stats.keyword === INDIVIDUAL && unit.stats.name.includes("Boss")) {
                            return true;
                        }
                    }
                    return false;
                }
            },
            {
                description: "You may take up to 1 Individual per Squad.",
                validate: units => {
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return individuals.length <= squads.length;
                }
            },
            {
                description: "For every Squad you may take up to 1 supporting unit (a Light Vehicle, Walker or Field Artillery unit). Armoured Vehicles count as 2 supporting units.",
                validate: units => {
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);
                    let armoredVehicles = units.filter(unit => unit.stats.keyword === VEHICLE && unit.stats.armour != null && !unit.stats.specialRules.includes(TRAITS.walker) && unit.stats.name != "Battle Transport");
                    let battleTransports = units.filter(unit => unit.stats.name === "Battle Transport"); //Handles battle transport being edge case in armoured vehicles 
                    let otherSupportUnits = units.filter(unit => unit.stats.keyword === VEHICLE && unit.stats.cohesion != null || unit.stats.specialRules.includes(TRAITS.walker) || unit.stats.keyword === FIELD_ARTILLERY);
                    let totalSupportUnits = armoredVehicles.length * 2 + battleTransports.length + otherSupportUnits.length;

                    return totalSupportUnits <= squads.length;
                }
            }
        ]
    },
    starKnights: {
        name: "Star Knights (Grimdark)",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.starKnights, imperials: ARMY_SPECIAL_RULES.imperials.imperials }, //TODO: How to handle Star Knight variants
        psionicPowers: { generic: PSIONIC_POWERS_LIST.generic, starKnights: PSIONIC_POWERS_LIST.starKnights },
        upgrades: {
            ...GENERIC_UPGRADES,
            antiTankGrenades: { name: "Anti Tank Grenades", keyword: SQUAD, statBonuses: { assault: { antiTank: 1 }, points: 1 }, description: "Increase Assault Anti Tank by +1." },
            stormRounds: { name: "Storm Rounds", keyword: SQUAD, statBonuses: { firepower: { firefight: 1, battle: 0, long: -1 }, points: 2 }, description: "Only available to units with Firepower at all three range bands. Modify existing Firepower by +1 / +0 / -1" }, //TODO: handle restriction
            gravSuspendedWeapons: { name: "Grav Suspended Weapons", keyword: SQUAD, statBonuses: { move: 1, points: 2 }, description: "If Move is 4”, increase to 5”." },
            fusionRifle: { name: "Fusion Rifle", keyword: SQUAD, statBonuses: { points: 3 }, description: "Add +1 to Anti Tank shooting within 9”." },
            honouredVeteran: { name: "Honoured Veteran", keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, cohesion: 1, points: 3 }, description: "Increase Close Combat and Cohesion by +1." },
            multiWeapon: { name: "Multi-Weapon", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "Each time the unit shoots it may use its standard fire option or fire with +0/+0/- Firepower and +0 Anti Tank factors." }, //TODO: Maybe add as another firepower element?
            venerableBlade: { name: "Venerable Blade", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: `In Close Combat, the character gains Penetrating Damage (${TRAITS.penetratingDamage.description}). If fighting an opposing Individual, inflict 1 additional point of damage on a tie or win.` },
            masterCraftedPistol: { name: "Master Crafted Pistol", keyword: INDIVIDUAL, statBonuses: { points: 1 }, description: `Gain Anti Personnel (${TRAITS.antiPersonnel.description}) within 9”.` },
            warRelic: { name: "War Relic", keyword: INDIVIDUAL, statBonuses: { points: 4 }, description: `At the start of each Star Knight turn, the closest Imperial unit within 9” and sight gain Damage Mitigation (${TRAITS.damageMitigation.description}) until the start of the next Star Knight turn The Character does not have to be activated for this to take effect.` },
            vowsOfVengeance: { name: "Vows of Vengeance", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: `The Individual gains Limited Intelligence (${TRAITS.limitedIntelligence.description}). Add +1 to Close Combat against Individuals.` },
            assaultGrenadeLaunchers: { name: "Assault Grenade Launchers", keyword: VEHICLE, statBonuses: { points: 3 }, description: `For Armoured Vehicles only. Single use. Select an Infantry unit within 6” and roll 3D6. Inflict 1 damage per die showing a 4+.` }, //TODO: Handle requirement of vehicle being armoured
            defenceSystem: { name: "Defence System", keyword: VEHICLE, statBonuses: { points: 3 }, description: `For Armoured Vehicles only. Each time the vehicle suffers damage roll 1D6. On a 5-6 the damage is negated and the Defence System is unavailable for the rest of the battle.` }, //TODO: Handle requirement of vehicle being armoured
            assaultTransport: { name: "Assault Transport", keyword: VEHICLE, statBonuses: { points: 3 }, description: `For Armoured Vehicles only. Transport only. Units that disembark receive +1 to Close Combat rolls for the rest of the current and all of the following enemy turn.` }, //TODO: Handle requirement of vehicle being armoured
            reconLink: { name: "Recon Link", keyword: VEHICLE, statBonuses: { points: 3 }, description: `For Light Vehicles only. All Star Knight units gain +1 to hit when firing at targets within 12” and sight of the vehicle with the Recon Link.` }, //TODO: Handle requirement of vehicle being light
            optimisedSteering: { name: "Optimised Steering", keyword: VEHICLE, statBonuses: { points: 1 }, description: `For Light Vehicles only. The vehicle can turn one additional time per Activation.` } //TODO: Handle requirement of vehicle being light
        },
        units: {
            tacticalSquad: { name: "Tactical Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 2, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 15, composition: "3 figures with 1 heavy weapon", specialRules: [] },
            assaultSquad: { name: "Assault Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 2, battle: null, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 1 }, cohesion: 9, points: 14, composition: "3 figures", specialRules: [] },
            jumpSquad: { name: "Jump Squad", keyword: SQUAD, move: 8, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 3, antiTank: 1 }, cohesion: 9, points: 16, composition: "3 figures", specialRules: [TRAITS.jump] },
            heavyWeaponSquadVersatile: { name: "Heavy Weapon Squad - Versatile", keyword: SQUAD, move: 4, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: 2 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 20, composition: "3 figures with 2 heavy weapons", specialRules: [] },
            heavyWeaponSquadRapidFire: { name: "Heavy Weapon Squad - Rapid Fire", keyword: SQUAD, move: 4, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 20, composition: "3 figures with 2 heavy weapons", specialRules: [TRAITS.antiPersonnel, { name: "Split Fire", description: "May fire at two different targets. Each attack is conducted as +0 / +0 / +0 without Anti Personnel. Select both targets before rolling." }] },
            reconSquad: { name: "Recon Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 15, composition: "3 figures", specialRules: [TRAITS.infiltration, TRAITS.specialist, { name: "Recon Armour", description: "Does not benefit from Environmental Suit rule." }] },
            reconSnipers: { name: "Recon Snipers", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 1, long: 1, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 15, composition: "3 figures", specialRules: [TRAITS.infiltration, TRAITS.specialist, TRAITS.sniping, { name: "Recon Armour", description: "Does not benefit from Environmental Suit rule." }] },
            breachSquad: { name: "Breach Squad", keyword: SQUAD, move: 4, firepower: [{ firefight: 2, battle: 1, long: null, antiTank: 0 }], assault: { modifier: 5, antiTank: 3 }, cohesion: 9, points: 15, composition: "3 figures", specialRules: [TRAITS.damageMitigation, TRAITS.specialist] },
            breachAssaultSquad: { name: "Breach Assault Squad", keyword: SQUAD, move: 4, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 6, antiTank: 4 }, cohesion: 9, points: 13, composition: "3 figures", specialRules: [TRAITS.damageMitigation, TRAITS.specialist] },
            officer: { name: "Officer", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.leadership] },
            reciter: { name: "Reciter", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 10, points: 20, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, { name: "Litanies", description: "Knight units within 6” add +1 to close combat rolls." }] },
            bannerBearer: { name: "Banner Bearer", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, { name: "Banner", description: "Imperial units that Regroup within 6” regain 1 additional point of Cohesion." }] },
            medicalSpecialist: { name: "Medical Specialist", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, { name: "Healer", description: "Take a Carry Out Action. One Imperial squad within 3” regains 1 point of Cohesion." }] },
            technicalSpecialist: { name: "Technical Specialist", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 0, battle: null, long: null, antiTank: null }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 15, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.repair] },
            psionicKnight: { name: "Psionic Knight", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 9, points: 21, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.psionic], psionicLevel: 3, psionicLists: [PSIONIC_POWERS_LIST.generic, PSIONIC_POWERS_LIST.starKnights] },
            captain: { name: "Captain", keyword: INDIVIDUAL, move: 6, firepower: [{ firefight: 1, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 1 }, cohesion: 10, points: 18, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.leadership, TRAITS.unique] },
            battleRobot: { name: "Battle Robot", keyword: VEHICLE, move: 6, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 2 }], assault: { modifier: 2, antiTank: null }, armour: { front: 8, side: 7, rear: 7 }, points: 15, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured, TRAITS.robot] },
            tacticalCombatArmourTactical: { name: "Tactical Combat Armour - Tactical", keyword: VEHICLE, move: 6, firepower: [{ firefight: 2, battle: 1, long: 0, antiTank: 0 }], assault: { modifier: 3, antiTank: 2 }, armour: { front: 9, side: 8, rear: 7 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured] },
            tacticalCombatArmourSupport: { name: "Tactical Combat Armour - Support", keyword: VEHICLE, move: 6, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: null }, { firefight: 1, battle: 1, long: 0, antiTank: 2 }], assault: { modifier: 1, antiTank: 0 }, armour: { front: 9, side: 8, rear: 7 }, points: 21, composition: "1 vehicle", specialRules: [TRAITS.walker, TRAITS.armoured] },
            landCrusherAssaultTank: { name: "Land Crusher Assault Tank", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 0, antiTank: null }, { firefight: 1, battle: 1, long: 1, antiTank: 3 }], armour: { front: 11, side: 10, rear: 8 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: "Transport Capacity (3)", description: TRAITS.transportCapacity.description }] },
            assailantMediumTank: { name: "Assailant Medium Tank", keyword: VEHICLE, move: 10, firepower: [{ firefight: 2, battle: 2, long: 1, antiTank: null }, { firefight: 0, battle: 1, long: 1, antiTank: 2 }], armour: { front: 10, side: 10, rear: 8 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured] },
            punisherAssaultGun: { name: "Punisher Assault Gun", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 0, antiTank: 2 }], armour: { front: 10, side: 10, rear: 9 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.highExplosive, TRAITS.siegeGun, TRAITS.forwardFiring] },
            firestormMissileTank: { name: "Firestorm Missile Tank", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: null }, { firefight: 0, battle: 0, long: 0, antiTank: 0 }], armour: { front: 10, side: 8, rear: 8 }, points: 20, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: TRAITS.indirectFire, description: TRAITS.indirectFire.description + " (above 9” only)" }] },
            chargerTroopCarrier: { name: "Charger Troop Carrier", keyword: VEHICLE, move: 10, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null }], armour: { front: 10, side: 8, rear: 8 }, points: 10, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: "Transport Capacity (4)", description: TRAITS.transportCapacity.description }] },
            stingerTroopCarrier: { name: "Stinger Troop Carrier", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], armour: { front: 10, side: 8, rear: 8 }, points: 15, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, { name: "Transport Capacity (3)", description: TRAITS.transportCapacity.description }] },
            claymoreTankHunter: { name: "Claymore Tank Hunter", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 1 }], armour: { front: 10, side: 8, rear: 8 }, points: 18, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured, TRAITS.forwardFiring] },
            strikeSpeeder: { name: "Strike Speeder", keyword: VEHICLE, move: 10, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: 4 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 7, points: 15, composition: "1 vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.hover, TRAITS.forwardFiring] },
            strikeSpeederMonsoonRockets: { name: "Strike Speeder - Monsoon Rockets", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 1, long: 1, antiTank: 0 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 7, points: 15, composition: "1 vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.hover, TRAITS.forwardFiring] }, //Handles monsoon rockets variant
            lightSpeeder: { name: "Light Speeder", keyword: VEHICLE, move: 10, firepower: [{ firefight: 1, battle: 0, long: 0, antiTank: 0 }], assault: { modifier: 0, antiTank: 0 }, cohesion: 7, points: 10, composition: "1 vehicle", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.hover, TRAITS.forwardFiring] },
            bikeSquad: { name: "Bike Squad", keyword: VEHICLE, move: 12, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 7, points: 14, composition: "2 figures", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.wheeled, TRAITS.forwardFiring] },
            bikeSquadHover: { name: "Bike Squad - Hover", keyword: VEHICLE, move: 12, firepower: [{ firefight: 1, battle: 0, long: null, antiTank: null }], assault: { modifier: 2, antiTank: 0 }, cohesion: 7, points: 16, composition: "2 figures", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.hover, TRAITS.forwardFiring] },
            gunMotorcycl: { name: "Gun Motorcycle", keyword: VEHICLE, move: 8, firepower: [{ firefight: 1, battle: 1, long: 0, antiTank: 2 }], assault: { modifier: 0, antiTank: null }, cohesion: 7, points: 15, composition: "1 figure", specialRules: [TRAITS.lightVehicle, TRAITS.open, TRAITS.wheeled] },
            scorpionHeavyWeaponsPlatform: { name: "MK1 Scorpion Heavy Weapons Platform", keyword: FIELD_ARTILLERY, move: 0, firepower: [{ firefight: 1, battle: 2, long: 1, antiTank: 2 }], assault: { modifier: -1, antiTank: null }, cohesion: 9, points: 14, composition: "1 artillery weapon with crew", specialRules: [TRAITS.fieldArtillery, TRAITS.limitedIntelligence] },
            fencerAntiTankPlatform: { name: "MK2 Fencer Anti-Tank platform", keyword: FIELD_ARTILLERY, move: 3, firepower: [{ firefight: 0, battle: 0, long: 0, antiTank: 4 }], assault: { modifier: -1, antiTank: null }, cohesion: 9, points: 14, composition: "1 tracked artillery weapon with crew figures", specialRules: [TRAITS.mobileArtillery, TRAITS.limitedIntelligence] }
        },
        validator: [
            {
                description: "If all Vehicles selected are Unarmoured Vehicles and you do not select any Field Artillery, you may take as many Vehicles as you have Squads. Otherwise the total number of Vehicles and Field Artillery must be less than the number of Squads.",
                validate: units => {
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);
                    let armoredVehicles = units.filter(unit => unit.stats.keyword === VEHICLE && unit.stats.armour != null);
                    let unarmouredVehicles = units.filter(unit => unit.stats.keyword === VEHICLE && unit.stats.cohesion != null);
                    let fieldArtillery = units.filter(unit => unit.stats.keyword === FIELD_ARTILLERY);
                    let vehiclesAndFieldArtillery = armoredVehicles.length + unarmouredVehicles.length + fieldArtillery.length;

                    if (unarmouredVehicles.length > 0 || fieldArtillery.length > 0) {
                        return vehiclesAndFieldArtillery < squads.length;
                    }
                    return armoredVehicles.length <= squads.length;
                }
            },
            {
                description: "You may select up to 1 Character for every Squad.",
                validate: units => {
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return individuals <= squads;
                }
            }
        ]
    }
    /*
    Template for army lists.
        template: {
        name: "",
        armySpecialRules: { ...ARMY_SPECIAL_RULES.armyName, {name:"", description:""} },
        psionicPowers: { foo: PSIONIC_POWERS_LIST.foo },
        upgrades: {
            ...GENERIC_UPGRADES,
            upgrade: { name: "foo", keyword: SQUAD, statBonuses: { points: 1 }, description: "foo" },
        },
        units: {
            squad: { name: "foo", keyword: SQUAD, move: 5, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: null }], assault: { modifier: 0, antiTank: null }, cohesion: 8, points: 10, composition: "5 figures", specialRules: [] },
            psyker: { name: "bar", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 0, battle: 0, long: null, antiTank: 0 }], assault: { modifier: 1, antiTank: 0 }, cohesion: 9, points: 20, composition: "1 figure", specialRules: [TRAITS.individual, TRAITS.hero, TRAITS.psionic], psionicLevel: 1, psionicLists: [PSIONIC_POWERS_LIST.generic, PSIONIC_POWERS_LIST.foo] },
            tank: { name: "baz", keyword: VEHICLE, move: 8, firepower: [{ firefight: 2, battle: 2, long: 2, antiTank: null }, { firefight: 1, battle: 1, long: 1, antiTank: 2 }], armour: { front: 11, side: 10, rear: 8 }, points: 25, composition: "1 vehicle", specialRules: [TRAITS.tracked, TRAITS.armoured] }
        },
        validator: [
            {
                description: "The number of Individuals taken must be less than the number of Squads.",
                validate: units => {
                    let individuals = units.filter(unit => unit.stats.keyword === INDIVIDUAL);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return individuals.length < squads.length;
                }
            }
        ]
    }
    */
}