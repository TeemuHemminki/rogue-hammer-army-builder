'use strict'

import './unitCard.js';
import './upgradeModal.js';
import './selectUnitModal.js';

export default class ArmyCard extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({
            mode: "open"
        });

        this.onClick = this.onClick.bind(this);
        this.selectUpgrade = this.selectUpgrade.bind(this);
        this.deleteUnit = this.deleteUnit.bind(this);
    }

    connectedCallback() {
        this.shadow.addEventListener('click', this.onClick);
        this.shadow.addEventListener('select-upgrade', this.selectUpgrade);
        this.shadow.addEventListener('delete-unit', this.deleteUnit);
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this.onClick);
        this.shadow.removeEventListener('select-upgrade', this.selectUpgrade);
        this.shadow.removeEventListener('delete-unit', this.deleteUnit);
    }

    onClick(event){
        if (event.target.matches('#editNameButton')) {
            this._army.name = prompt("", this._army.name ? this._army.name : this._army.armyList.name);
            this.render();
        }
        if (event.target.matches('#addUnitButton')){
            this.shadow.querySelector('#selectUnitModal').open(this._army);
        }
        if (event.target.matches('#deleteArmyButton')){
                if (!confirm("Delete army?")) {
                    return;
                }
                this.dispatchEvent(
                    new CustomEvent('deleteArmy', {
                        detail: {
                            army: this._army
                        },
                        bubbles: true,
                        composed: true
                    })
                )
        }
        if (event.target.matches('#closeArmyButton')){
            if (!confirm("Close this army? (Don't worry, it won't be deleted.)")){
                return;
            }
            this.dispatchEvent(
                new CustomEvent('closeArmy', {
                    detail: {
                        army: this._army
                    },
                    bubbles: true,
                    composed: true
                })
            )
        }
        if (event.target.matches('#validationSummary')){
            this._army.validationDetails = !event.target.parentNode.open;
        }
        if (event.target.matches('#psionicsSummary')    ){
            this._army.psionicDetails = !event.target.parentNode.open;
        }
        if(event.target.matches('#rollCampaignRewardButton')){
            this._army.rollAndAssignCampaignReward();
        }
    }

    selectUpgrade(event) {
        this.shadow.querySelector('#upgradeModal').open(event.detail.unit);
    };

    deleteUnit(event) {
        this._army.removeUnit(event.detail.unit);
        this.render();
    };

    set army(army) {
        this._army = army;
        army.addEventListener(
            "change",
            () => this.render()
        );
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <upgrade-modal id="upgradeModal"></upgrade-modal>
            <select-unit-modal id="selectUnitModal"></select-unit-modal>
            <style>
                #container{
                    background-color: #cccccc;
                }
                #units{
                    display: grid;
                    width: 97vw;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 1rem;
                }
                #armySpecialRules{
                    width: 97vw;
                }
                h2{
                    margin: 5px;
                    text-align: center;
                }
                details{
                    width: 97vw;
                    background-color: white;
                }
                details[open]{
                    border: 1px solid black;
                    margin: 3px;
                }
                summary {
                    background-color: black;
                    color: white;
                    padding: 5px;
                    margin: 3px;
                }
                details[open] summary {
                    margin: 0px;
                }
                table {
                    table-layout: fixed;
                    width: 99%;
                    border-collapse: collapse;
                    margin: auto;
                    background-color: white;
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
            <div id="container">
            <h2>${this._army.name ? this._army.name + " (" + this._army.armyList.name + ")" : this._army.armyList.name} <button id="editNameButton">📝</button>            <button id="deleteArmyButton">🗑️</button>
            <button id="closeArmyButton">X</button></h2>
            <details id="validation"}><summary id="validationSummary"></summary></details>
            ${this._army.armyList.psionicPowers ?
                "<details id='psionics'><summary id='psionicsSummary'>Psionic power lists</summary></details>" : ""
            }
            ${this._army.armyList.armySpecialRules ?
                "<table id='armySpecialRules'><caption>Army Special Rules</caption></table>" : ""
            }
            <p>Total points: <span id="totalPoints">0</span> | 
            Active units points: <span id="points">0</span> |
            Active units: <span id="activeUnits">${this._army.numberOfActiveUnits()}</span> / Total units: <span id="totalunits">${this._army.numberOfUnits()}</span> |
            <button id="addUnitButton">Add new Unit</button>
            <button id="rollCampaignRewardButton">Roll campaign reward</button> </p>
            <div id="units"></div>
            </div>
        `;

        const validationElement = this.shadow.querySelector('#validation');
        validationElement.open = this._army.validationDetails;
        const validationSummary = this.shadow.querySelector('#validationSummary');
        let validation = this._army.validate();
        validationSummary.innerText = validation.valid ? "Army is valid ✅" : "Army is invalid ❌";
        validation.results.forEach(result => {
            let resultP = document.createElement('p');
            resultP.innerText = result.description + ": " + (result.result ? "✅" : "❌");
            validationElement.append(resultP);
        });

        const container = this.shadow.querySelector('#units');

        const totalPoints = this.shadow.querySelector('#totalPoints');
        totalPoints.innerText = this._army.calculateTotalPoints();
        const points = this.shadow.querySelector('#points');
        points.innerText = this._army.calculateActivePoints();
        const displayUnits = this._army.units.sort((a, b) => a.stats.keyword.order - b.stats.keyword.order || a.name.localeCompare(b.name));
        for (const unit of displayUnits) {
            let unitCard = document.createElement("unit-card");
            unitCard.unit = unit;
            container.append(unitCard);
        }

        if(this._army.armyList.armySpecialRules){
            const armySpecialRulesElement = this.shadow.querySelector('#armySpecialRules');
            for(let specialRule of Object.entries(this._army.armyList.armySpecialRules)){
                let cell = armySpecialRulesElement.insertRow().insertCell();
                cell.innerHTML = `<strong>${specialRule[1].name}</strong>: ${specialRule[1].description}`;
            }
        }

        if(this._army.armyList.psionicPowers){
            const psionicsElement = this.shadow.querySelector('#psionics');
            psionicsElement.open = this._army.psionicDetails;
            for(let psionicsList of Object.entries(this._army.armyList.psionicPowers)){
                let listTable = document.createElement('table');
                let listCaption = document.createElement('caption');
                listCaption.innerText = psionicsList[1].name;
                listTable.append(listCaption);
                for(let psionicPower of Object.entries(psionicsList[1].powers)){
                    let cell = listTable.insertRow().insertCell();
                    cell.innerHTML = `${psionicPower[1].roll} - ${psionicPower[1].name} - ${psionicPower[1].description}`;
                }
                psionicsElement.append(listTable);
            }
        }

        const upgradeModal = this.shadow.querySelector('#upgradeModal');
        upgradeModal.upgrades = this._army.upgrades;

        const selectUnitModal = this.shadow.querySelector('#selectUnitModal');
        selectUnitModal.army = this._army;
    }
}

customElements.define("army-card", ArmyCard);