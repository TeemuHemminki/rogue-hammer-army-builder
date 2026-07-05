'use strict'

export default class Unit extends EventTarget{
    constructor({identifier, stats, nickname, upgrade, campaignUnit, inactive, skipNextBattle, experience, rank, experienceUpgrades, psionicPowerListIndex}){
        super();
        this._identifier = identifier; 
        this._stats = stats;
        this._nickname = nickname || null;
        this._upgrade = upgrade || null;
        this._campaignUnit = campaignUnit || null;
        this._inactive = inactive || null;
        this._skipNextBattle = skipNextBattle || null;
        this._experience = experience || 0;
        this._rank = rank || ranks[0];
        this._experienceUpgrades = experienceUpgrades || [];
        this._psionicPowerListIndex = psionicPowerListIndex || null;
    }

    save(){
        return {
            identifier: this._identifier,
            nickname: this._nickname,
            upgrade: this.upgrade ? this._upgrade.identifier : null,
            campaignUnit: this._campaignUnit,
            inactive: this._inactive,
            skipNextBattle: this._skipNextBattle,
            experience: this._experience,
            experienceUpgrades: this._experienceUpgrades,
            psionicPowerListIndex: this._psionicPowerListIndex
        };
    }

    load(unitSave){
        //NOTE: identifier is used on constructor at army class. upgrade is also handled there.
        this._nickname = unitSave.nickname;
        this._campaignUnit = unitSave.campaignUnit;
        this._inactive = unitSave.inactive;
        this._skipNextBattle = unitSave.skipNextBattle;
        this._experience = unitSave.experience;
        this._rank = this.checkRank();
        this._experienceUpgrades = unitSave.experienceUpgrades;
        this._psionicPowerListIndex = unitSave.psionicPowerListIndex;
    }

    get stats(){
        return this._stats;
    }

    set name(newName){
        this._nickname = newName;
        this.dispatchEvent(new Event("change"));
    }

    get name(){
        if(this._nickname){
            return this._nickname + " (" + this.stats.name + ")";
        }
        return this._stats.name;
    }

    set upgrade(upgrade){
        if(this._upgrade != null){
            this._upgrade.unassign(); //To remove existing upgrade
        }
        this._upgrade = upgrade;
        this.dispatchEvent(new Event("change"));
    }

    get upgrade(){
        return this._upgrade;
    }

    unassignUpgrade(){
        if(this._upgrade != null){
            this._upgrade.unassign();
            this._upgrade = null;
            this.dispatchEvent(new Event("change"));
        }
    }

    get campaignUnit(){
        return this._campaignUnit;
    }

    set campaignUnit(value){
        //If campaign unit is set to non campaign unit, we remove all campaign stuff from it
        if(this._campaignUnit && !value){
            this._inactive = false;
            this._skipNextBattle = false;
            this._experience = 0;
            this._rank = ranks[0];
            this._experienceUpgrades = [];
        }
        this._campaignUnit = value;

        this.dispatchEvent(new Event("change"));
    }

    get inactive(){
        return this._inactive;
    }

    set inactive(value){
        this._inactive = value;
        this.dispatchEvent(new Event("change"));
    }

    get skipNextBattle(){
        return this._skipNextBattle;
    }

    set skipNextBattle(value){
        this._skipNextBattle = value;
        this.dispatchEvent(new Event("change"));
    }

    get psionicPowerListIndex(){
        return this._psionicPowerListIndex;
    }

    set psionicPowerListIndex(index){
        this._psionicPowerListIndex = index;
        this.dispatchEvent(new Event("change"));
    }

    get experience(){
        return this._experience;
    }

    get rank(){
        return this._rank;
    }

    get experienceUpgrades(){
        return this._experienceUpgrades;
    }

    addExperiencePoints(points){
        this._experience += points;
        this._rank = this.checkRank();
        this.checkUpgrades();
        this.dispatchEvent(new Event("change"));
    }

    checkRank(){
        for(let i = 0; i < Object.entries(ranks).length; i++){
            let rank = ranks[i];
            if(rank.experience > this._experience){
                return ranks[i-1];
            } else if (i === Object.entries(ranks).length -1){
                return ranks[i];
            }
        }
    };

    checkUpgrades(){
        if(this._experienceUpgrades.length < this._rank.totalUpgrades){
            for(let i = this._experienceUpgrades.length; i < this._rank.totalUpgrades; i++){
                this._experienceUpgrades.push(this.addRankUpgrade());
            }
        }
    }

    //TODO: This is kind of horrible implementation. Should rewrite it to be more cleaner and use selection component instead of prompt or confirm
    addRankUpgrade(){
        let roll = Math.floor(Math.random()*6 + 1);
        let upgrade = rankRolls[roll];
        if(upgrade.statBonuses.firepower){
            if(this._stats.firepower === null){
                //If not applicable, let's just roll again by recursing this function
                return this.addRankUpgrade();
            }
            let possibleChoices = [false, false, false];
            possibleChoices[0] = this._stats.firepower?.some(fp => fp.firefight !== null) ? 1 : 0;
            possibleChoices[1] = this._stats.firepower?.some(fp => fp.battle !== null) ? 1 : 0;
            possibleChoices[2] = this._stats.firepower?.some(fp => fp.long !== null) ? 1 : 0;
            let promptText = `Select to which range band firepower increase is added. ${possibleChoices[0] ? '0: firefight ' : ''}${possibleChoices[1] ? '1: battle ':''}${possibleChoices[2] ? '2: long' : ''}`;
            let answer = -1;
            while((answer != 0 && answer != 1 && answer != 2) || possibleChoices[answer] != 1){
                answer = Number(prompt(promptText));
            }
            return {name: upgrade.name, statBonuses: {firepower: {firefight: answer === 0 ? 1 : 0, battle: answer === 1 ? 1 : 0, long: answer === 2 ? 1 : 0}}, description: `Increase Firepower at ${answer === 0 ? 'firefight' : answer === 1 ? 'battle' : 'long'} range band by +1`};
        } else if(upgrade.statBonuses.antiTank){
            let shootBonusPossible = this._stats.firepower?.some(fp => fp.antiTank !== null) ? true : false;
            let assaultBonusPossible = this._stats.assault?.antiTank !== null;
            console.log(shootBonusPossible);
            console.log(assaultBonusPossible);
            if(shootBonusPossible && assaultBonusPossible){
                let choice = confirm("Ranged (confirm) or melee (cancel)?");
                if(choice){
                    return {name: upgrade.name, statBonuses: { firepower: {antiTank: 1}}, description: 'Increase ranged Anti Tank by +1'}
                } else {
                    return {name: upgrade.name, statBonuses: { assault: {antiTank: 1}}, description: 'Increase assault Anti Tank by +1'}
                }
            } else if (shootBonusPossible){
                return {name: upgrade.name, statBonuses: { firepower: {antiTank: 1}}, description: 'Increase ranged Anti Tank by +1'}
            } else if (assaultBonusPossible){
                return {name: upgrade.name, statBonuses: { assault: {antiTank: 1}}, description: 'Increase assault Anti Tank by +1'}
            } else {
                //If not applicable at all, let's just roll again by recursing this function
                return this.addRankUpgrade();
            }
        }
        return upgrade;
    }

}

const ranks = {
    0: {rank: 0, experience: 0, totalUpgrades: 0, totalCohesionBonus: 0},
    1: {rank: 1, experience: 3, totalUpgrades: 0, totalCohesionBonus: 1},
    2: {rank: 2, experience: 6, totalUpgrades: 1, totalCohesionBonus: 1},
    3: {rank: 3, experience: 10, totalUpgrades: 1, totalCohesionBonus: 2},
    4: {rank: 4, experience: 15, totalUpgrades: 2, totalCohesionBonus: 2},
    5: {rank: 5, experience: 20, totalUpgrades: 2, totalCohesionBonus: 3},
    6: {rank: 6, experience: 25, totalUpgrades: 2, totalCohesionBonus: 4},
    7: {rank: 7, experience: 30, totalUpgrades: 3, totalCohesionBonus: 4}
}

const rankUpgrades = {
    speed: {roll: 1, name: "Speed", statBonuses: {speed: 2}, description: "Increase Speed by +2"},
    firepower: {roll: '2-3', name: "Firepower", statBonuses: { firepower: '?'}, description: "Increase Firepower at one range band of choice by +1."},
    antiTank: {roll: 4, name: "Anti Tank", statBonuses: { antiTank: '?'}, description: "Increase choice of ranged or assault Anti Tank by +1 (if not currently NA)"},
    assault: {roll: '5-6', name: "Assault", statBonuses: { assault: {modifier: 1}}, description: "Increase Assault bonus by +1"}
}

const rankRolls = {
    1: rankUpgrades.speed,
    2: rankUpgrades.firepower,
    3: rankUpgrades.firepower,
    4: rankUpgrades.antiTank,
    5: rankUpgrades.assault,
    6: rankUpgrades.assault
}

const campaignRewards = {
    fightingFury: {roll: 1, name: "Fighting Fury", description: "The unit can make two attacks in one activation, adding +1 to both rolls."},
    takeInitiative: {roll: 2, name: "Take initiative", description: "The unit may take a Full Activation without counting against your activation count for the turn."},
    battleExperience: {roll: 3, name: "Battle Experience", description: "Unit receives +3 XP"},
    willPower: {roll: 4, name: "Willpower", description: "When destroyed, restore Cohesion to 1D6 points and remain in place."},
    battleFortune: {roll: 5, name: "Battle Fortune", description: "Unit may ignore one post battle Kill Check without rolling."},
    determination: {roll: 6, name: "Determination", statBonuses: { cohesion: 2 }, description: "Increase Cohesion by +2 for one battle."}
}