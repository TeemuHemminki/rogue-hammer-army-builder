'use strict'

import { VEHICLE } from '../scripts/constants.js';

class UnitCard extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({
            mode: "open"
        });

        //So that onClick has context of whole element, not just shadow
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    connectedCallback() {
        this.shadow.addEventListener('click', this.onClick);
        this.shadow.addEventListener('change', this.onChange);
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this.onClick);
        this.shadow.removeEventListener('change', this.onChange);
        this._unit.removeEventListener('change', this.render);
    }

    set unit(unit) {
        this._unit = unit;
        this._unit.addEventListener("change", this.render);
        this.render();
    }

    //Calculates stat, potential bonus to it and returns it in needed form
    getStat({ stat, substat, index, isModifier, isMovement, isCohesion }) {
        let base;
        let bonus;
        let experienceUpgrade;
        let campaignRewardBonus;

        if (Array.isArray(this._unit.stats[stat])) {
            base = !substat ? this._unit.stats[stat]?.[index] ?? null : this._unit.stats[stat]?.[index]?.[substat] ?? null;
        } else {
            base = !substat ? this._unit.stats[stat] ?? null : this._unit.stats[stat]?.[substat] ?? null;
        }
        bonus = !substat ? this._unit.upgrade?.statBonuses[stat] ?? null : this._unit.upgrade?.statBonuses?.[stat]?.[substat] ?? null;

        experienceUpgrade = 0;
        campaignRewardBonus = 0;
        for (let eu of this._unit.experienceUpgrades) {
            experienceUpgrade += !substat ? eu.statBonuses[stat] ?? null : eu.statBonuses?.[stat]?.[substat] ?? null;
        }
        for (let cr of this._unit.campaignRewards) {
            if (!cr.activated) {
                continue;
            }
            let reward = this._unit.getCampaignReward(cr);
            campaignRewardBonus += !substat ? reward.statBonuses?.[stat] ?? null : reward.statbonuses?.[stat]?.[substat] ?? null;
        }

        if (isMovement) {
            return bonus || experienceUpgrade || campaignRewardBonus ? (base + bonus + experienceUpgrade + campaignRewardBonus) + '" (' + base + '")' : base + '"';
        } else if (isModifier) {
            let baseValue = base != null ? base >= 0 ? '+' + base : base : '-';
            let modifiedValue = bonus || experienceUpgrade || campaignRewardBonus ? base + bonus + experienceUpgrade + campaignRewardBonus >= 0 ? '+' + (base + bonus + experienceUpgrade + campaignRewardBonus) : base + bonus + experienceUpgrade + campaignRewardBonus : null;
            return modifiedValue ? modifiedValue + ' (' + baseValue + ')' : baseValue;
        } else if (isCohesion) {
            return bonus || this._unit.rank.totalCohesionBonus > 0 || campaignRewardBonus ? (base + bonus + this._unit.rank.totalCohesionBonus + campaignRewardBonus) + " (" + base + ")" : base;
        }
        return bonus ? (base + bonus) + " (" + base + ")" : base;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #cardFrame {
                    --p:5px;
                    padding-left: var(--p);
                    padding-top: var(--p);
                    padding-right: var(--p);
                    padding-bottom: var(--p);
                    width: 600px;
                    clip-path: polygon( 30% 0%, 70% 0%, 100% 15%, 100% 85%, 70% 100%, 30% 100%, 0% 85%, 0% 15% );
                    margin: 5px;
                    background-color: #17324d;
                    position: relative;
                }
                #card{
                    margin: 5px;
                    background-color: #cfe3f5;
                    color: #17324d;
                    clip-path: inherit;
                }
                #content{
                    margin-top: 5%;
                    margin-bottom: 5%;
                }
                #deleteUnitButton {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                }
                p{
                    margin: 1px;
                }
                h3,h4{
                    margin: 1px;
                }
                ul{
                    list-style-type: none;
                    margin: 5px;
                    padding: 0 0 0 20px;
                }
            </style>
            <div id="cardFrame">
            <div id="card">
                <button id="deleteUnitButton">🗑️</button>
                <h3>${this._unit.name}<button id="editNameButton">📝</button></h3>
                <div id="content">
                ${this._unit.stats.keyword != VEHICLE ? '<p>Campaign Unit: <input type="checkbox" id="campaignUnit"}/></p>' : ''}
                ${this._unit.campaignUnit ? '<p>Inactive: <input type="checkbox" id="inactive"/> Skip next battle: <input type="checkbox" id="skipBattle"/>' : ''}
                ${this._unit.campaignUnit ? '<p><button id="experienceButton">Add experience point</button><ul id="rankUpgrades"></ul> Experience points: ' + this._unit.experience + '. Rank: ' + this._unit.rank.rank + '</p>' : ''}
                <p>Move: ${this.getStat({ stat: "move", isMovement: true })}</p>
                ${this._unit.stats.firepower != null
                ? '<p>Firepower 9” / 24” / long<ul id="firepower"></ul></p>'
                : ''
            }
                ${this._unit.stats.assault != null
                ? '<p>Assault:<ul><li id="assault"></li></ul></p>'
                : ''
            }
                ${this._unit.stats.cohesion != null
                ? '<p>Cohesion: ' + this.getStat({ stat: "cohesion", isCohesion: true }) + '</p>'
                : ''
            }
                ${this._unit.stats.armour != null
                ? '<p>Armour:<ul><li>Front: ' + this.getStat({ stat: "armour", substat: "front" }) + '</li><li>Side: ' + this.getStat({ stat: "armour", substat: "side" }) + '</li><li>Rear: ' + this.getStat({ stat: "armour", substat: "rear" }) + '</li></ul></p>'
                : ''
            }
                <p>Points: ${this.getStat({ stat: "points" })}</p>
                <p>Composition: ${this._unit.stats.composition}</p>
                ${this._unit.stats.specialRules != null
                ? '<p><h4>Special Rules</h4><ul id="specialRules"></ul></p>'
                : ''
            }
            ${this._unit.stats.psionicLevel != null ? '<p>Psionic Level: ' + this._unit.stats.psionicLevel + '. Powers list: <select id="selectPsionicPowerList"></select></p>' : ''}
                ${this._unit.upgrade != null
                ? '<p id="upgradeContainer"></p>' : ''
            }
                ${this._unit.experienceUpgrades.length > 0 ? '<p>Experience upgrades: <ul id="experienceUpgrades"></ul></p>' : ''}
                ${this._unit.campaignRewards.length > 0 ? '<p>Campaign rewards: <ul id="campaignRewards"></ul></p>' : ''}
                <button id="upgradeButton">Select upgrade</button>
                </div>
            </div>
            </div>
        `;

        if (this._unit.stats.firepower != null) {
            const firepowerContainer = this.shadow.querySelector('#firepower');
            for (let i = 0; i < this._unit.stats.firepower.length; i++) {
                let fireMode = this._unit.stats.firepower[i];
                let firepowerItem = document.createElement('li');
                firepowerItem.innerText += fireMode.name != null ? fireMode.name + " - " : "";
                firepowerItem.innerText += this.getStat({ stat: "firepower", substat: "firefight", index: i, isModifier: true }) + " | ";
                firepowerItem.innerText += this.getStat({ stat: "firepower", substat: "battle", index: i, isModifier: true }) + " | ";
                firepowerItem.innerText += this.getStat({ stat: "firepower", substat: "long", index: i, isModifier: true }) + " | ";
                firepowerItem.innerText += this.getStat({ stat: "firepower", substat: "antiTank", index: i, isModifier: true });
                firepowerContainer.append(firepowerItem);
            }
        }

        if (this._unit.stats.assault != null) {
            const assaultContainer = this.shadow.querySelector('#assault');
            assaultContainer.innerText += `Modifier: ${this.getStat({ stat: "assault", substat: "modifier", isModifier: true })} |`
            assaultContainer.innerText += ` Anti-Tank: ${this.getStat({ stat: "assault", substat: "antiTank", isModifier: true })}`;
        }

        if (this._unit.stats.specialRules != null) {
            const specialRulesContainer = this.shadow.querySelector('#specialRules');
            for (const specialRule of this._unit.stats.specialRules) {
                let specialRuleItem = document.createElement('li');
                let specialRuleElement = document.createElement('span');
                let specialRuleItemHeader = document.createElement('strong');
                specialRuleItemHeader.innerText = specialRule.name;
                specialRuleItem.append(specialRuleItemHeader);
                specialRuleElement.innerText = ": " + specialRule.description;
                specialRuleItem.append(specialRuleElement);
                specialRulesContainer.append(specialRuleItem);
            }
        }

        if (this._unit.experienceUpgrades.length > 0) {
            const experienceUpgradesContainer = this.shadow.querySelector('#experienceUpgrades');
            for (const upgrade of this._unit.experienceUpgrades) {
                let upgradeItem = document.createElement('li');
                upgradeItem.innerText = upgrade.name + ": " + upgrade.description;
                experienceUpgradesContainer.append(upgradeItem);
            }
        }

        if (this._unit.campaignRewards.length > 0) {
            const campaignRewardsContainer = this.shadow.querySelector('#campaignRewards');
            for (const reward of this._unit.campaignRewards) {
                let rewardItem = document.createElement('li');
                let rewardData = this._unit.getCampaignReward(reward);
                rewardItem.innerText = `${rewardData.name}: ${rewardData.description}`;
                campaignRewardsContainer.append(rewardItem);

                if (rewardData.activateable) {
                    rewardItem.innerText += " Activated:";
                    let activateCampaignRewardCheckbox = document.createElement('input');
                    activateCampaignRewardCheckbox.type = 'checkbox';
                    activateCampaignRewardCheckbox.classList.add("activateCampaignReward");
                    activateCampaignRewardCheckbox.checked = reward.activated;
                    activateCampaignRewardCheckbox.reward = reward;
                    rewardItem.append(activateCampaignRewardCheckbox);
                }

                let deleteCampaignRewardButton = document.createElement('button');
                deleteCampaignRewardButton.innerText = "🗑️";
                deleteCampaignRewardButton.classList.add("deleteCampaignReward");
                deleteCampaignRewardButton.reward = reward;
                rewardItem.append(deleteCampaignRewardButton);
            }
        }

        if (this._unit.campaignUnit) {
            this.shadow.querySelector('#campaignUnit').checked = this._unit.campaignUnit;
            this.shadow.querySelector('#inactive').checked = this._unit.inactive;
            this.shadow.querySelector('#skipBattle').checked = this._unit.skipNextBattle;
        }

        if (this._unit.stats.psionicLists != null) {
            let selectPsionicPowerList = this.shadow.querySelector('#selectPsionicPowerList');
            for (let i = 0; i < this._unit.stats.psionicLists.length; i++) {
                let powerList = this._unit.stats.psionicLists[i];
                let listOption = document.createElement('option');
                listOption.innerText = powerList.name;
                listOption.value = i;
                if (i === this._unit.psionicPowerListIndex) {
                    listOption.selected = true;
                }
                selectPsionicPowerList.append(listOption);
            }
        }

        if (this._unit.upgrade != null) {
            const upgradeContainer = this.shadow.querySelector('#upgradeContainer');
            upgradeContainer.innerText += this._unit.upgrade.name + ':' + this._unit.upgrade.description;
        }
    }

    //We use single onClick to handle click events, this helps preventing duplicate eventListeners.
    onClick(event) {
        if (event.target.matches('#editNameButton')) {
            this._unit.name = prompt("", this._unit.name ? this._unit.name : this._unit.stats.name);
        }

        if (event.target.matches('#experienceButton')) {
            this._unit.addExperiencePoints(1);
        }

        if (event.target.matches('#upgradeButton')) {
            this.dispatchEvent(
                new CustomEvent('select-upgrade', {
                    detail: {
                        unit: this._unit
                    },
                    bubbles: true,
                    composed: true
                })
            )
        }

        if (event.target.matches('#deleteUnitButton')) {
            if (!confirm("Delete unit?")) {
                return;
            }
            this.dispatchEvent(
                new CustomEvent('delete-unit', {
                    detail: {
                        unit: this._unit
                    },
                    bubbles: true,
                    composed: true
                })
            )
        }

        if (event.target.matches('.deleteCampaignReward')) {
            if (confirm("Delete this campaign reward?")) {
                this._unit.removeCampaignReward(event.target.reward);
            }
        }
    }

    onChange(event) {
        if (event.target.matches('#selectPsionicPowerList')) {
            this._unit.psionicPowerListIndex = Number(event.target.value);
        }

        if (event.target.matches('#campaignUnit')) {
            if (this._unit.campaignUnit && !event.target.checked) {
                if (!confirm("Are you sure you want to disable campaign from this unit? It will lose all experience and upgrades.")) {
                    //If confirm result was cancel, then we do not remove campaign status from unit.
                    event.target.checked = true;
                    return;
                };
            }
            this._unit.campaignUnit = event.target.checked;
        }

        if (event.target.matches('#inactive')) {
            this._unit.inactive = event.target.checked;
        }

        if (event.target.matches('#skipBattle')) {
            this._unit.skipNextBattle = event.target.checked;
        }

        if (event.target.matches('.activateCampaignReward')) {
            this._unit.toggleCampaignRewardActivated(event.target.reward);
        }
    }
}

customElements.define("unit-card", UnitCard);