'use strict'

import Army from './scripts/army.js';
import './web-components/armyCard.js';
import './web-components/mainView.js';

import { SAVED_ARMIES, LAST_OPENED_ARMIES, ARMY_LISTS} from './scripts/constants.js';

if (!localStorage.getItem(SAVED_ARMIES)) {
    localStorage.setItem(SAVED_ARMIES, JSON.stringify({}))
}
if (!localStorage.getItem(LAST_OPENED_ARMIES)) {
    localStorage.setItem(LAST_OPENED_ARMIES, JSON.stringify({}))
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

let main = new Main(ARMY_LISTS);
let mainView = document.createElement('main-view');
mainView.main = main;
document.body.appendChild(mainView);