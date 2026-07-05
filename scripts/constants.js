//Localstorage save names
export const SAVED_ARMIES = 'savedArmies';
export const LAST_OPENED_ARMIES = 'openedArmies';

//Dunno if these are useful anymore so I don't export them. These are initial data representation for different attributes.
const FIREPOWER = {"firefight": null, "battle": null, "long": null, "antiTank": null}
const ASSAULT = {"modifier": null, "antiTank": null};
const ARMOUR = {"front": null, "side": null, "rear": null};

//Keywords for linking what upgrades are available to what unit types
export const SQUAD = 'squad';
export const INDIVIDUAL = 'individual;'
export const VEHICLE = 'vehicle';

export const RANKS = {
    0: {rank: 0, experience: 0, totalUpgrades: 0, totalCohesionBonus: 0},
    1: {rank: 1, experience: 3, totalUpgrades: 0, totalCohesionBonus: 1},
    2: {rank: 2, experience: 6, totalUpgrades: 1, totalCohesionBonus: 1},
    3: {rank: 3, experience: 10, totalUpgrades: 1, totalCohesionBonus: 2},
    4: {rank: 4, experience: 15, totalUpgrades: 2, totalCohesionBonus: 2},
    5: {rank: 5, experience: 20, totalUpgrades: 2, totalCohesionBonus: 3},
    6: {rank: 6, experience: 25, totalUpgrades: 2, totalCohesionBonus: 4},
    7: {rank: 7, experience: 30, totalUpgrades: 3, totalCohesionBonus: 4}
};

const RANK_UPGRADES = {
    speed: {roll: 1, name: "Speed", statBonuses: {move: 2}, description: "Increase Move by +2"},
    firepower: {roll: '2-3', name: "Firepower", statBonuses: { firepower: '?'}, description: "Increase Firepower at one range band of choice by +1."},
    antiTank: {roll: 4, name: "Anti Tank", statBonuses: { antiTank: '?'}, description: "Increase choice of ranged or assault Anti Tank by +1 (if not currently NA)"},
    assault: {roll: '5-6', name: "Assault", statBonuses: { assault: {modifier: 1}}, description: "Increase Assault bonus by +1"}
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
    fightingFury: {roll: 1, name: "Fighting Fury", description: "The unit can make two attacks in one activation, adding +1 to both rolls."},
    takeInitiative: {roll: 2, name: "Take initiative", description: "The unit may take a Full Activation without counting against your activation count for the turn."},
    battleExperience: {roll: 3, name: "Battle Experience", instantExperience: 3, description: "Unit receives +3 XP"},
    willPower: {roll: 4, name: "Willpower", description: "When destroyed, restore Cohesion to 1D6 points and remain in place."},
    battleFortune: {roll: 5, name: "Battle Fortune", description: "Unit may ignore one post battle Kill Check without rolling."},
    determination: {roll: 6, name: "Determination", activateable: true, statBonuses: { cohesion: 2 }, description: "Increase Cohesion by +2 for one battle."}
};