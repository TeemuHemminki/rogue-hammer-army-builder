'use strict'

import Unit from './unit.js';
import Upgrade from './upgrade.js';
import { CAMPAIGN_REWARDS as campaignRewards } from './constants.js';

export default class Army extends EventTarget {
    constructor({ armyListIdentifier, armyList, saveData }) {
        super();
        this._armyListIdentifier = armyListIdentifier;
        this._armyList = armyList;
        this._upgrades = [];
        this._units = [];
        this._name = "";
        
        //Used for storing status of details elements in view
        this._validationDetails = false;
        this._psionicDetails = false;

        this.saveChangedUnit = this.saveChangedUnit.bind(this);

        for (let upgrade of Object.entries(armyList.upgrades)) {
            this._upgrades.push(new Upgrade({ identifier: upgrade[0], values: upgrade[1] }));
        };

        if (saveData) {
            this.load(saveData);
        } else {
            this._uuid = "army:"+crypto.randomUUID();
            //To prevent that really miniscule change of collision
            while (localStorage.getItem(this._uuid)) {
                this._uuid = "army:"+crypto.randomUUID();
            }
        }
    }

    get validationDetails(){
        return this._validationDetails;
    }

    set validationDetails(vd){
        this._validationDetails = vd;
        this.save();
    }

    get psionicDetails(){
        return this._psionicDetails;
    }

    set psionicDetails(pd){
        this._psionicDetails = pd;
        this.save();
    }

    save() {
        let savedUnitsArray = [];
        for (let unit of this._units) {
            savedUnitsArray.push(unit.save())
        }
        let armyData = {
            uuid: this._uuid,
            armyListIdentifier: this._armyListIdentifier,
            name: this._name,
            validationDetails: this.validationDetails,
            psionicDetails: this.psionicDetails,
            units: savedUnitsArray };
        localStorage.setItem(this._uuid, JSON.stringify(armyData));

        let savedArmiesMetadata = JSON.parse(localStorage.getItem("savedArmies"));
        savedArmiesMetadata[this._uuid] = {name: this._name ? this._name + " (" + this._armyList.name + ")" : this._armyList.name, points: this.calculateTotalPoints()};
        localStorage.setItem('savedArmies', JSON.stringify(savedArmiesMetadata));
    }

    load(saveData) {
        this._uuid = saveData.uuid;
        this._name = saveData.name;
        this._validationDetails = saveData.validationDetails;
        this._psionicDetails = saveData.psionicDetails;
        for (let unitSave of saveData.units) {
            if (this._armyList.units[unitSave.identifier]) {
                this.addUnit(unitSave.identifier, unitSave);
            }
        }
    }

    calculateTotalPoints(){
        let points = 0;
        for(let unit of this._units){
            points += unit.stats.points;
            if(unit.upgrade){
                points += unit.upgrade.statBonuses.points;
            }
        }
        return points;
    }

    calculateActivePoints() {
        let points = 0;
        for (let unit of this._units) {
            if(unit.inactive){
                continue;
            }
            points += unit.stats.points;
            if (unit.upgrade) {
                points += unit.upgrade.statBonuses.points;
            }
        }
        return points;
    }

    numberOfActiveUnits(){
        let activeUnits = 0;
        this.units.forEach(unit => {
            activeUnits += unit.inactive ? 0 : 1;
        })
        return activeUnits;
    }
    
    numberOfUnits(){
        return this.units.length;
    }

    addUnit(identifier, unitSave) {
        let unit;
        if (unitSave) {
            unit = new Unit({ identifier: unitSave.identifier, stats: this._armyList.units[unitSave.identifier] });
            unit.load(unitSave);
            if (unitSave.upgrade) {
                for (let upgrade of this._upgrades) {
                    if (upgrade.identifier === unitSave.upgrade) {
                        upgrade.assignedUnit = unit;
                    }
                }
            }
        } else {
            unit = new Unit({ identifier: identifier, stats: this._armyList.units[identifier] });
        }
        unit.addEventListener('change', this.saveChangedUnit);
        this._units.push(unit);
        this.dispatchEvent(new Event("change"));
        this.save();
    }

    validate(){
        let valid = true;
        let results = [];
        this._armyList.validator.forEach(rule => {
            let result = rule.validate(this._units);
            if(!result){
                valid = false;
            }
            results.push({description: rule.description, result: result});
        });
        return {valid: valid, results: results};
    }

    removeUnit(unit) {
        unit.unassignUpgrade();
        unit.removeEventListener('change', this.saveChangedUnit);
        this._units.splice(this._units.indexOf(unit), 1);
        this.dispatchEvent(new Event("change"));
        this.save();
    }

    saveChangedUnit() {
        this.dispatchEvent(new Event("change"));
        this.save();
    }

    //TODO: Remove need for alert and prompt, create information web component instead
    rollAndAssignCampaignReward(){
        let rewards = Object.entries(campaignRewards);
        let roll = Math.floor(Math.random()*rewards.length);
        let reward = rewards[roll];

        let eligibleUnits = this._units.filter(unit => unit.campaignUnit);
        if(eligibleUnits.length <= 0){
            alert("No campaign units available, can't assign reward. And it would have been " + reward[1].name + ", think of what you missed :(");
            return;
        }
        let choice = -1;
        let promptText = `Reward is ${reward[1].name}: ${reward[1].description}. Input index of unit to receive the reward.\n`;
        for(let i = 0; i < eligibleUnits.length; i++){
            promptText += i + ": " + eligibleUnits[i].name + ". ";
        }
        while(!eligibleUnits[choice]){
            choice = prompt(promptText);
        }
        let chosenUnit = eligibleUnits[choice];
        this._units[this._units.indexOf(chosenUnit)].addCampaignReward({key: reward[0], reward: reward[1]});
    }

    get units() {
        return this._units;
    }

    get upgrades() {
        return this._upgrades;
    }

    get name(){
        return this._name;
    }

    set name(newName){
        this._name = newName;
        this.save();
    }

    get armyList(){
        return this._armyList;
    }

    get uuid(){
        return this._uuid;
    }
}

