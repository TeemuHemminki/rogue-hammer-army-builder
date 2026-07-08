'use strict'

import {RANKS as ranks, RANK_ROLLS as rankRolls, CAMPAIGN_REWARDS } from './constants.js';

export default class Unit extends EventTarget{
    constructor({identifier, stats, nickname, upgrade, campaignUnit, inactive, skipNextBattle, experience, rank, experienceUpgrades, campaignRewards, psionicPowerListIndex}){
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
        this._campaignRewards = campaignRewards || [];
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
            campaignRewards: this._campaignRewards,
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
        this._campaignRewards = unitSave.campaignRewards;
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
            if(!this._stats.firepower){
                //If not applicable, let's just roll again by recursing this function
                return this.addRankUpgrade();
            }
            let possibleChoices = [false, false, false];
            possibleChoices[0] = this._stats.firepower?.some(fp => fp.firefight !== null) ? 1 : 0;
            possibleChoices[1] = this._stats.firepower?.some(fp => fp.battle !== null) ? 1 : 0;
            possibleChoices[2] = this._stats.firepower?.some(fp => fp.long !== null) ? 1 : 0;
            let promptText = `Firepower upgrade! Select to which range band firepower increase is added. ${possibleChoices[0] ? '0: firefight ' : ''}${possibleChoices[1] ? '1: battle ':''}${possibleChoices[2] ? '2: long' : ''}`;
            let answer = -1;
            while((answer != 0 && answer != 1 && answer != 2) || possibleChoices[answer] != 1){
                answer = Number(prompt(promptText));
            }
            return {name: upgrade.name, statBonuses: {firepower: {firefight: answer === 0 ? 1 : 0, battle: answer === 1 ? 1 : 0, long: answer === 2 ? 1 : 0}}, description: `Increase Firepower at ${answer === 0 ? 'firefight' : answer === 1 ? 'battle' : 'long'} range band by +1`};
        } else if(upgrade.statBonuses.antiTank){
            let shootBonusPossible = this._stats.firepower?.some(fp => fp.antiTank !== null) ? true : false;
            let assaultBonusPossible = this._stats.assault?.antiTank !== null;
            if(shootBonusPossible && assaultBonusPossible){
                let choice = confirm("Anti-Tank upgrade! Add to ranged (confirm) or melee (cancel)?");
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

    get campaignRewards(){
        return this._campaignRewards;
    }

    getCampaignReward(reward){
        return CAMPAIGN_REWARDS[reward.key];
    }

    addCampaignReward({key, reward}){
        if(reward.instantExperience){
            this.addExperiencePoints(reward.instantExperience);
            alert("Reward assigned instantly.");
        } else {
            this._campaignRewards.push({key: key, activated: false});
            this.dispatchEvent(new Event("change"));
        }
    }

    removeCampaignReward(reward){
        this._campaignRewards.splice(this._campaignRewards.indexOf(reward), 1);
        this.dispatchEvent(new Event("change"));
    }

    toggleCampaignRewardActivated(reward){
        reward.activated = !reward.activated;
        this.dispatchEvent(new Event("change"));
    }


}

