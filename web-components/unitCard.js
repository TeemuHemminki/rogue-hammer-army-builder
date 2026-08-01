'use strict'

import { ANTI_INFANTRY, ANTI_TANK, VEHICLE, TRAITS } from '../scripts/constants.js';

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
    getStat({ stat, substat, index, isModifier, isMovement, isCohesion, isArmour }) {
        let base;
        let bonus;
        let experienceUpgrade = 0;
        let campaignRewardBonus = 0;
        let vehicleDamagePenalty = 0;

        if (Array.isArray(this._unit.stats[stat])) {
            base = !substat ? this._unit.stats[stat]?.[index] ?? null : this._unit.stats[stat]?.[index]?.[substat] ?? null;
        } else {
            base = !substat ? this._unit.stats[stat] ?? null : this._unit.stats[stat]?.[substat] ?? null;
        }
        bonus = !substat ? this._unit.upgrade?.statBonuses[stat] ?? null : this._unit.upgrade?.statBonuses?.[stat]?.[substat] ?? null;

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

        if(this._unit.vehicleDamage.length > 0){
            for(let vd of this._unit.vehicleDamage){
                if(vd.statBonuses?.[stat]){
                    vehicleDamagePenalty += !substat ? vd.statBonuses[stat] ?? null : vd.statBonuses?.[stat]?.[substat] ?? null;
                }
           }
        }

        if (isMovement) {
            if (this._unit.vehicleDamage.length > 0){
                let movement = (base + bonus + experienceUpgrade + campaignRewardBonus);
                if(this._unit.vehicleDamage.some(damage => damage.stopsMovement)){
                    return 0 + '" <span class="originalStat">(' + base + '")</span>';
                }
                let movementHalvings = this._unit.vehicleDamage.filter(damage => damage.halvesMovement).length;
                for(let i = 0; i < movementHalvings; i++){
                    movement = Math.floor(movement / 2);
                }
                return movement != base ? movement + '" <span class="originalStat">(' + base + '")</span>' : base + '"';
            } else {
                return bonus || experienceUpgrade || campaignRewardBonus ? (base + bonus + experienceUpgrade + campaignRewardBonus) + '" <span class="originalStat">(' + base + '")' : base + '"';
            }
        } else if (isModifier) {
            let baseValue = base != null ? base >= 0 ? '+' + base : base : '-';
            let modifiedValue = bonus || experienceUpgrade || campaignRewardBonus || vehicleDamagePenalty ? base + bonus + experienceUpgrade + campaignRewardBonus + vehicleDamagePenalty >= 0 ? '+' + (base + bonus + experienceUpgrade + campaignRewardBonus + vehicleDamagePenalty) : base + bonus + experienceUpgrade + campaignRewardBonus + vehicleDamagePenalty : null;
            return modifiedValue ? modifiedValue + ' <span class="originalStat">(' + baseValue + ')</span>' : baseValue;
        } else if (isCohesion) {
            return bonus || this._unit.rank.totalCohesionBonus > 0 || campaignRewardBonus ? (base + bonus + this._unit.rank.totalCohesionBonus + campaignRewardBonus) + " <span class='originalStat'>(" + base + ")</span>" : base;
        } else if (isArmour) {
            return vehicleDamagePenalty ? (base + vehicleDamagePenalty) + " <span class='originalStat'>(" + base + ")</span>" : base;
        }
        return bonus ? (base + bonus) + " <span class='originalStat'>(" + base + ")</span>" : base;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #card {
                    position: relative;
                    border: 1px solid black;
                    padding: 5px;
                    background-color: white;
                }
                #card p{
                    margin: 10px;
                }
                
                #card ul{
                    margin: 5px;
                    padding: 0 0 0 20px;
                }
                #cloneUnitButton {
                    position: absolute;
                    right: 50px;
                    top: 5px;
                }
                #deleteUnitButton {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                }
                #upgradeContainer{
                    border: 1px solid black;
                }
                #statLine{
                }
                #statLine tr{
                    background-color: white;
                }
                #statLine > tbody > tr > td{
                    border: none;
                    padding: 0;
                    vertical-align: top;
                }
                .originalStat{
                    font-size: x-small;
                    color: grey;
                }
                .specialRule{
                    text-align: left;
                }
                .hidden{
                    visibility: hidden;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                caption{
                    border: 1px solid black;
                    color: #fefefe;
                    background-color: #161616;
                    margin-top:1px;
                }
                th, td {
                    border: 1px solid black;
                    text-align: center;
                }
                th {
                    font-weight: bold;
                    background-color: #aaaaaa !important;
                }
                table tr:nth-child(even) {
                    background-color: #bbbbbb;
                }
            </style>
            <div id="card">
                <button id="cloneUnitButton">👥</button>
                <button id="deleteUnitButton">🗑️</button>
                <h3>${this._unit.stats.keyword.icon} ${this._unit.name}<button id="editNameButton">📝</button></h3>
                ${this._unit.stats.keyword != VEHICLE ?
                `<table>
                        <caption>Campaign Unit <input type="checkbox" id="campaignUnit"/></caption>
                        ${this._unit.campaignUnit
                    ? `<tr>
                                <td>Inactive <input type="checkbox" id="inactive"/>
                                </td><td>Skip battle <input type="checkbox" id="skipBattle"/></td>
                            </tr>
                            <tr>
                                <td>${this._unit.experience}xp <button id="experienceButton">Add XP</button></td>
                                <td>Rank: ${this._unit.rank.rank}</td>
                            </tr>` : ''}
                        </tbody>
                    </table>` : ''}
                <table id="statLine">
                    <tr>
                    <td>
                    <table>
                        <caption class="hidden">...</caption>
                        <tbody>
                            <tr>
                                <th>Mov</th>
                            </tr>
                            <tr>
                                <td>${this.getStat({ stat: "move", isMovement: true })}</td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                    ${this._unit.stats.firepower != null
                ? '<td><table id="firepower"></table></td>'
                : ''
            }
                ${this._unit.stats.assault != null
                ? `<td><table>
                        <caption>Assault</caption>
                        <tbody>
                            <tr>
                                <th>Mod</th>
                                <th>A-T</th>
                            </tr>
                            <tr>
                                <td>${this.getStat({ stat: "assault", substat: "modifier", isModifier: true })}</td>
                                <td>${this.getStat({ stat: "assault", substat: "antiTank", isModifier: true })}</td>
                            </tr>
                        </tbody>
                    </table></td>`
                : ''
            }
                    ${this._unit.stats.armour != null
                ? `<td><table>
                        <caption>Armour</caption>
                        <tbody>
                            <tr>
                                <th>Fr</th>
                                <th>Si</th>
                                <th>Re</th>
                            </tr>
                            <tr>
                                <td>${this.getStat({ stat: "armour", substat: "front", isArmour: true })}</td>
                                <td>${this.getStat({ stat: "armour", substat: "side", isArmour: true })}</td>
                                <td>${this.getStat({ stat: "armour", substat: "rear", isArmour: true })}</td>
                            </tr>
                        </tbody>
                    </table></td>`
                : ''
            }
                <td>
                    <table>
                        <caption class="hidden">...</caption>
                        <tbody>
                            <tr>
                                ${this._unit.stats.cohesion != null ? '<th>Coh</th>' : ''}
                                <th>Pts</th>
                            </tr>
                            <tr>
                                ${this._unit.stats.cohesion != null ? '<td>' + this.getStat({ stat: "cohesion", isCohesion: true }) + '</td>' : ''}
                                <td>${this.getStat({ stat: "points" })}</td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                    </tr>
                </table>
               

                ${this._unit.stats.specialRules.length > 0
                ? '<table id="specialRules"><caption>Special Rules</caption></table>'
                : ''
                }
                ${this._unit.stats.armour ? '<table id="vehicleDamage"><Caption>Vehicle Damage</caption><tr><td><button id="rollMinorVehicleDamage">Roll Minor Damage</button><button id="rollMajorVehicleDamage">Roll Major Damage</button><button id="clearVehicleDamage">Clear Damage</button></td></tr></table>' : ''}
                ${this._unit.stats.psionicLevel != null
                ? '<table><caption>Psionic Level ' + this._unit.stats.psionicLevel + '</caption><tr><td><select id="selectPsionicPowerList"></select></td></tr></table>' : ''}
                ${this._unit.experienceUpgrades.length > 0 ? '<table id="experienceUpgrades"><caption>Experience upgrades</caption></table>' : ''}
                ${this._unit.campaignRewards.length > 0 ? '<table id="campaignRewards"><caption>Campaign rewards</caption></table>' : ''}
                <table id="upgradeContainer">
                <caption>Upgrade</caption>
                ${this._unit.upgrade ? `<tr><td><strong>${this._unit.upgrade.name}</strong>: ${this._unit.upgrade.description} <button id="removeUpgradeButton">🗑️</button></td></tr>` : ''}
                ${!this._unit.stats.specialRules.includes(TRAITS.specialist) ? '<tr><td><button id="upgradeButton">Select upgrade</button></td></tr>' : ''}
                </table>
                <p>Composition: <i>${this._unit.stats.composition}</i></p>

            </div>
        `;

        if (this._unit.stats.firepower != null) {
            const firepowerContainer = this.shadow.querySelector('#firepower');
            const header = firepowerContainer.createCaption().textContent = "Firepower";
            const rowHeader = firepowerContainer.insertRow();
            if (this._unit.stats.firepower[0].type) {
                const typeElement = document.createElement('th');
                typeElement.textContent = "Typ";
                rowHeader.append(typeElement);
            }
            const fireFightElement = document.createElement('th');
            fireFightElement.textContent = "9”";
            rowHeader.append(fireFightElement);
            const battleElement = document.createElement('th');
            battleElement.textContent = "24”";
            rowHeader.append(battleElement);
            const longElement = document.createElement('th');
            longElement.textContent = "Lng";
            rowHeader.append(longElement);
            const antiTankElement = document.createElement('th');
            antiTankElement.textContent = "A-T";
            rowHeader.append(antiTankElement);
            for (let i = 0; i < this._unit.stats.firepower.length; i++) {
                let rowFireMode = firepowerContainer.insertRow();
                if (this._unit.stats.firepower[i].type) {
                    let typeCell = rowFireMode.insertCell().textContent = this._unit.stats.firepower[i].type;
                }
                let firefightCell = rowFireMode.insertCell();
                firefightCell.innerHTML = this.getStat({ stat: "firepower", substat: "firefight", index: i, isModifier: true });
                let battleCell = rowFireMode.insertCell();
                battleCell.innerHTML = this.getStat({ stat: "firepower", substat: "battle", index: i, isModifier: true });
                let longCell = rowFireMode.insertCell();
                longCell.innerHTML = this.getStat({ stat: "firepower", substat: "long", index: i, isModifier: true });
                let antiTankCell = rowFireMode.insertCell();
                antiTankCell.innerHTML = this.getStat({ stat: "firepower", substat: "antiTank", index: i, isModifier: true });
            }
        }

        if (this._unit.stats.specialRules != null) {
            const specialRulesContainer = this.shadow.querySelector('#specialRules');
            for (const specialRule of this._unit.stats.specialRules) {
                let cell = specialRulesContainer.insertRow().insertCell();
                cell.classList.add("specialRule");
                let strong = document.createElement('strong');
                strong.innerText = specialRule.name;
                cell.append(strong);
                cell.innerHTML += ": " + specialRule.description;
            }
        }

        if (this._unit.stats.armour && this._unit.vehicleDamage.length > 0) {
            const vehicleDamageContainer = this.shadow.querySelector('#vehicleDamage');
            for (const vehicleDamage of this._unit.vehicleDamage) {
                let cell = vehicleDamageContainer.insertRow().insertCell();
                cell.classList.add("specialRule");
                let strong = document.createElement('strong');
                strong.innerText = vehicleDamage.name;
                cell.append(strong);
                cell.innerHTML += ": " + vehicleDamage.description;
                let deleteVehicleDamageButton = document.createElement('button');
                deleteVehicleDamageButton.innerText = "🗑️";
                deleteVehicleDamageButton.classList.add("deleteVehicleDamage");
                deleteVehicleDamageButton.vehicleDamage = vehicleDamage;
                cell.append(deleteVehicleDamageButton);
            }
        }

        if (this._unit.experienceUpgrades.length > 0) {
            const experienceUpgradesContainer = this.shadow.querySelector('#experienceUpgrades');
            for (const upgrade of this._unit.experienceUpgrades) {
                let cell = experienceUpgradesContainer.insertRow().insertCell();
                cell.classList.add("specialRule");
                let strong = document.createElement('strong');
                strong.innerText = upgrade.name;
                cell.append(strong);
                cell.innerHTML += ": " + upgrade.description;
            }
        }

        if (this._unit.campaignRewards.length > 0) {
            const campaignRewardsContainer = this.shadow.querySelector('#campaignRewards');
            for (const reward of this._unit.campaignRewards) {
                let cell = campaignRewardsContainer.insertRow().insertCell();
                let rewardData = this._unit.getCampaignReward(reward);
                cell.innerHTML = `<strong>${rewardData.name}</strong>: ${rewardData.description}`;
                if (rewardData.activateable) {
                    cell.innerHTML += " <strong>Activated</strong>";
                    let activateCampaignRewardCheckbox = document.createElement('input');
                    activateCampaignRewardCheckbox.type = 'checkbox';
                    activateCampaignRewardCheckbox.classList.add("activateCampaignReward");
                    activateCampaignRewardCheckbox.checked = reward.activated;
                    activateCampaignRewardCheckbox.reward = reward;
                    cell.append(activateCampaignRewardCheckbox);
                    cell.innerHTML += " | ";
                }

                let deleteCampaignRewardButton = document.createElement('button');
                deleteCampaignRewardButton.innerText = "🗑️";
                deleteCampaignRewardButton.classList.add("deleteCampaignReward");
                deleteCampaignRewardButton.reward = reward;
                cell.append(deleteCampaignRewardButton);
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
    }

    //We use single onClick to handle click events, this helps preventing duplicate eventListeners.
    onClick(event) {
        if (event.target.matches('#editNameButton')) {
            this._unit.name = prompt("", this._unit.nickName ? this._unit.nickName : this._unit.stats.name);
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

        if (event.target.matches('#removeUpgradeButton')) {
            if (confirm("Remove upgrade from this unit?")) {
                this._unit.unassignUpgrade();
            }
        }

        if (event.target.matches('#cloneUnitButton')) {
            if (confirm("Duplicate this unit?")) {
                this.dispatchEvent(
                    new CustomEvent('clone-unit', {
                        detail: {
                            unit: this._unit
                        },
                        bubbles: true,
                        composed: true
                    })
                )
            }
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

        if (event.target.matches('#rollMinorVehicleDamage')) {
            this._unit.rollMinorVehicleDamage();
        }

        if (event.target.matches('#rollMajorVehicleDamage')) {
            this._unit.rollMajorVehicleDamage();
        }

        if (event.target.matches('#clearVehicleDamage')) {
            if (confirm("Clear all vehicle damage?")) {
                this._unit.clearVehicleDamage();
            }
        }

        if (event.target.matches('.deleteVehicleDamage')) {
            if (confirm(`Remove ${event.target.vehicleDamage.name}?`)) {
                this._unit.removeSingleVehicleDamage(event.target.vehicleDamage);
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