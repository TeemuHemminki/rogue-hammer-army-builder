'use strict'

import Army from './scripts/army.js';
import './web-components/armyCard.js';
import './web-components/mainView.js';

import { SAVED_ARMIES, LAST_OPENED_ARMIES, SQUAD, INDIVIDUAL, VEHICLE} from './scripts/constants.js';

if (!localStorage.getItem(SAVED_ARMIES)) {
    localStorage.setItem(SAVED_ARMIES, JSON.stringify({}))
}
if (!localStorage.getItem(LAST_OPENED_ARMIES)) {
    localStorage.setItem(LAST_OPENED_ARMIES, JSON.stringify({}))
}

//Common special rules go into this object
let commonSpecialRules = {
    jump: { name: 'Jump', description: 'Ignores terrain for movement purposes' },
    leadership: { name: 'Leadership', description: 'Leads in leaderly leading lead!' },
    psionic: { name: 'Psioinic', description: 'May use psionic powers!'}
}

//All army specific special rules go here so that they can be referenced in armyData
let armySpecialRules = {
    environmentalSuit: { name: 'Environmental Suit', description: 'Immune to dangerous terrain.' }
}

//All psyker power lists in master document to make them easier available
let psionicPowerLists = {
    genericPowers: {
        name: "Generic powers",
        powers: {
            psyke: { name: "Psyke", roll: 1, description: "Confuses opponent" },
            lowhand: { name: "Low Hand", roll: 2, description: "Confuses opponent even more!" }
        }
    },
    fellowPowers: {
        name: "Fellow powers",
        powers: {
            poke: { name: "Poke", roll: 1, description: "Pokes enemy in da eye!" },
            flip: { name: "Flip", roll: 2, description: "Flips enemy around!" }
        }
    },
    evilFellowPowers: {
        name: "Evil Fellow powers",
        powers: {
            poke: { name: "Stroke", roll: 1, description: "Strokes enemy in da eye!" },
            flip: { name: "Spin", roll: 2, description: "Spins enemy around!" }
        }
    }
}

//NOTE: Upgrade statBonuses are usually needed because of points field
//NOTE: Needs to be initialized AFTER psionicPowerLists
let testUpgrades = {
    speedBooster: { name: 'Speed Booster', keyword: SQUAD, statBonuses: { move: 2, points: 5 }, description: 'Add 2 to movemeent.' },
    largerUnit: { name: 'Larger unit', keyword: SQUAD, statBonuses: { cohesion: 1, points: 2 }, description: 'Add 1 model to unit and increase cohesion by 1' },
    veteranSergeant: { name: 'Veteran Sergeant', keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, points: 4 }, description: 'Squad is led by experienced veteran, increasing assault by 1' },
    jump: { name: 'Jump Packs', keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: 'Unit has "' + commonSpecialRules.jump.name + '": ' + commonSpecialRules.jump.description },
    extraArmor: { name: 'Extra Armor', keyword: VEHICLE, statBonuses: { armour: { front: 1 }, points: 2 }, description: 'Fitted with harder front armor, increases front armor by 1' },
    minorPsyker: { name: 'Minor Psionic', keyword: INDIVIDUAL, statBonuses: { points: 4 }, description: "Model has generic psionic powers, even if army doesn't usually use those.", psionicPowerList: psionicPowerLists.genericPowers}
}

const armyData = {
    emptyArmy: {
        name: "Empty Army",
        armySpecialRules: null,
        psionicPowers: null,
        upgrades: {
        },
        units: {
        },
        validator: []
    },
    testArmy: {
        name: "Fellows",
        armySpecialRules: {
            toughies: { name: 'Toughies', description: 'So tough bois that they ignore combat shock damage!' },
            environmentalSuit: armySpecialRules.environmentalSuit
        },
        psionicPowers: {
            generic: psionicPowerLists.genericPowers,
            unique: psionicPowerLists.fellowPowers
        },
        upgrades: {
            ...testUpgrades,
            veteranSergeant2: { name: 'Veteran Sergeant', keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, points: 3 }, description: 'Squad is led by experienced veteran, increasing assault by 1' },
            krakGrenades: { name: "Krak Grenades", keyword: SQUAD, statBonuses: { assault: { antiTank: 2 }, points: 4 }, description: "Unit is loaded with Krak Grenades, increasing it's assault Anti Tank ability by 1" },
            puritySeals: { name: "Purity Seals", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "When unit regroups, it regains 1 additional cohesion" },
            sightedGungs: { name: "Sighted Guns", keyword: VEHICLE, statBonuses: { firepower: { long: 1 }, points: 1 }, description: "Add +1 to long range firepower" }
        },
        units: {
            captain: { name: "Captain", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 2, battle: 1, long: null, antiTank: null }], assault: { modifier: +3, antiTank: 0 }, cohesion: 9, points: 18, composition: "1 hero with melee weapons", specialRules: [armySpecialRules.environmentalSuit, commonSpecialRules.leadership] },
            psionic: { name: "Psionic", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 1, battle: 2, long: null, antiTank: null }], assault: { modifier: +1, antiTank: null }, cohesion: 8, points: 15, composition: "1 person with staff", specialRuels: [commonSpecialRules.psionic], psionicLevel: 2, psionicLists: [psionicPowerLists.genericPowers, psionicPowerLists.fellowPowers] },
            failures: { name: "Unfortunate Failures", keyword: SQUAD, move: 5, firepower: [{ firefight: -1, battle: -2, long: -3, antiTank: -15 }], assault: { modifier: -2, antiTank: -400 }, cohesion: 1, points: 20, composition: "20 gangly characters", specialRules: [armySpecialRules.environmentalSuit, { name: "Utter failures", description: "Roll all rolls with one additional dice and discard highest results." }] },
            tacticalSquad: { name: "Tactical Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 2, battle: 1, long: 1, antiTank: 0 }], assault: { modifier: 2, antiTank: null }, cohesion: 9, points: 15, composition: "2 marines and 1 heavy weapon", specialRules: [armySpecialRules.environmentalSuit] },
            assaultSquad: { name: "Assault Squad", keyword: SQUAD, move: 8, firepower: [{ firefight: 2, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 0 }, cohesion: 9, points: 16, composition: "2 marines with jump packs and melee weapons", specialRules: [armySpecialRules.environmentalSuit, commonSpecialRules.jump, { name: "Death from Above", description: "If moved before assault action, add +1 to combat shock." }] },
            predator: { name: "Predator", keyword: VEHICLE, move: 6, firepower: [{ name: 'AI', firefight: 3, battle: 2, long: 1, antiTank: null }, { name: 'AT', firefight: 2, battle: 2, long: 1, antiTank: 2 }], armour: { front: 10, side: 10, rear: 8 }, points: 20, composition: "Main battle tank" }
        },
        validator: [
            {
                description: "There must be less tanks than there is infantry",
                validate: units => {
                    let vehicles = units.filter(unit => unit.stats.keyword === VEHICLE);
                    let squads = units.filter(unit => unit.stats.keyword === SQUAD);

                    return vehicles < squads;
                }
            },
            {
                description: "There must be at least one model with Leadership",
                validate: units => {
                    return units.some(
                        unit => unit.stats.specialRules?.includes(commonSpecialRules.leadership)
                    )
                }
            }
        ]
    },
    testArmy2: {
        name: "Evil Fellows",
        armySpecialRules: {
            baddies: { name: 'Baddies', description: 'So bad bois that they ignore ignoring of combat shock damage!' },
            environmentalSuit: armySpecialRules.environmentalSuit
        },
        psionicPowers: {
            unique: psionicPowerLists.evilFellowPowers
        },
        upgrades: {
            ...testUpgrades,
            veteranSergeant2: { name: 'Evil Veteran Sergeant', keyword: SQUAD, statBonuses: { assault: { modifier: 1 }, points: 3 }, description: 'Squad is led by experienced veteran, increasing assault by 1' },
            krakGrenades: { name: "Evil Krak Grenades", keyword: SQUAD, statBonuses: { assault: { antiTank: 2 }, points: 4 }, description: "Unit is loaded with Krak Grenades, increasing it's assault Anti Tank ability by 1" },
            puritySeals: { name: "Evil Purity Seals", keyword: INDIVIDUAL, statBonuses: { points: 2 }, description: "When unit regroups, it regains 1 additional cohesion" },
            sightedGungs: { name: "Evil Sighted Guns", keyword: VEHICLE, statBonuses: { firepower: { long: 1 }, points: 1 }, description: "Add +1 to long range firepower" }
        },
        units: {
            captain: { name: "Evil Captain", keyword: INDIVIDUAL, move: 5, firepower: [{ firefight: 2, battle: 1, long: null, antiTank: null }], assault: { modifier: +3, antiTank: 0 }, cohesion: 9, points: 18, composition: "1 hero with melee weapons", specialRules: [armySpecialRules.environmentalSuit] },
            psionic: { name: "Evil Psionic", keyword: INDIVIDUAL, move: 5, cohesion: 6, points: 12, composition: "1 sorcerer", specialRules: [commonSpecialRules.psionic], psionicLevel: 1, psionicLists: [psionicPowerLists.evilFellowPowers]},
            failures: { name: "Evil Unfortunate Failures", keyword: SQUAD, move: 5, firepower: [{ firefight: -1, battle: -2, long: -3, antiTank: -15 }], assault: { modifier: -2, antiTank: -400 }, cohesion: 1, points: 20, composition: "20 gangly characters", specialRules: [armySpecialRules.environmentalSuit, { name: "Utter failures", description: "Roll all rolls with one additional dice and discard highest results." }] },
            tacticalSquad: { name: "Evil Tactical Squad", keyword: SQUAD, move: 5, firepower: [{ firefight: 2, battle: 1, long: 1, antiTank: 0 }], assault: { modifier: 2, antiTank: null }, cohesion: 9, points: 15, composition: "2 marines and 1 heavy weapon", specialRules: [armySpecialRules.environmentalSuit] },
            assaultSquad: { name: "Evil Assault Squad", keyword: SQUAD, move: 8, firepower: [{ firefight: 2, battle: null, long: null, antiTank: null }], assault: { modifier: 4, antiTank: 0 }, cohesion: 9, points: 16, composition: "2 marines with jump packs and melee weapons", specialRules: [armySpecialRules.environmentalSuit, commonSpecialRules.jump, { name: "Death from Above", description: "If moved before assault action, add +1 to combat shock." }] },
            predator: { name: "Evil Predator", keyword: VEHICLE, move: 6, firepower: [{ name: 'AI', firefight: 3, battle: 2, long: 1, antiTank: null }, { name: 'AT', firefight: 2, battle: 2, long: 1, antiTank: 2 }], armour: { front: 10, side: 10, rear: 8 }, points: 20, composition: "Main battle tank" }
        },
        validator: []
    }
}

class Main {
    constructor(armyData) {
        this._armyData = armyData;
        this._armies = [];
        this._curArmy = null;
        this.loadOpenedArmies();
    }

    get armies() {
        return this._armies;
    }

    get curArmy() {
        return this._curArmy;
    }

    switchArmy(armyReference) {
        this._curArmy = armyReference;
        this.updateOpenedArmiesSave();
    }

    addArmy(armyReference) {
        let army;
        if (armyReference.savedArmy) {
            let armySave = JSON.parse(localStorage.getItem(armyReference.uuid));
            for (let i = 0; i < this._armies.length; i++) {
                let oldArmy = this._armies[i];
                if (oldArmy.uuid === armySave.uuid) {
                    this._curArmy = oldArmy;
                    return;
                }
            }
            army = new Army({ armyListIdentifier: armySave.armyListIdentifier, armyList: this._armyData[armySave.armyListIdentifier], saveData: armySave });
        } else {
            army = new Army({ armyListIdentifier: armyReference.identifier, armyList: this._armyData[armyReference.identifier] });
        }
        this._armies.push(army);
        this._curArmy = army;
        this.updateOpenedArmiesSave();
    }

    deleteArmy(armyReference) {
        this.closeArmy(armyReference);
        localStorage.removeItem(armyReference.uuid);
        let savedArmiesMetadata = JSON.parse(localStorage.getItem(SAVED_ARMIES));
        delete savedArmiesMetadata[armyReference.uuid];
        localStorage.setItem(SAVED_ARMIES, JSON.stringify(savedArmiesMetadata));
        this.updateOpenedArmiesSave();
    }

    closeArmy(armyReference) {
        this._armies.splice(this._armies.indexOf(armyReference), 1);
        this._curArmy = null;
        this.updateOpenedArmiesSave();
    }

    getListOfNewArmies() {
        let armies = [];
        for (let army of Object.entries(this._armyData)) {
            armies.push({ identifier: army[0], name: army[1].name, savedArmy: false });
        }
        return armies;
    }

    getListOfSavedArmies() {
        let armies = [];
        let savedArmies = JSON.parse(localStorage.getItem('savedArmies'));
        for (let army of Object.entries(savedArmies)) {
            armies.push({ uuid: army[0], name: army[1].name, points: army[1].points, savedArmy: true });
        }
        return armies;
    }

    updateOpenedArmiesSave() {
        let armies = [];
        for (let i = 0; i < this._armies.length; i++) {
            let army = this._armies[i];
            armies.push({ uuid: army.uuid });
        }
        let saveData = JSON.stringify({ armies: armies, curArmyUUID: this._curArmy?.uuid || null });
        localStorage.setItem(LAST_OPENED_ARMIES, saveData);
    }

    loadOpenedArmies() {
        let openedArmiesSave = JSON.parse(localStorage.getItem(LAST_OPENED_ARMIES));
        if (!openedArmiesSave.armies) {
            return;
        };
        for (let i = 0; i < openedArmiesSave.armies.length; i++) {
            let armyReference = openedArmiesSave.armies[i];
            let armySave = JSON.parse(localStorage.getItem(armyReference.uuid));
            let army = new Army({ armyListIdentifier: armySave.armyListIdentifier, armyList: this._armyData[armySave.armyListIdentifier], saveData: armySave });
            this._armies.push(army);
            if (armyReference.uuid === openedArmiesSave.curArmyUUID) {
                this._curArmy = army;
            }
        }
    }
}

let main = new Main(armyData);
let mainView = document.createElement('main-view');
mainView.main = main;
document.body.appendChild(mainView);