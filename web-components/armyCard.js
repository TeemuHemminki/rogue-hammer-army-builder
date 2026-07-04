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
                #units{
                    display: flex;
                    max-width: 95%;
                    flex-wrap: wrap;
                }
            </style>
            <h2>Army: ${this._army.name ? this._army.name + " (" + this._army.armyList.name + ")" : this._army.armyList.name} <button id="editNameButton">📝</button></h2>
            <button id="addUnitButton">Add Unit</button>
            <button id="deleteArmyButton">🗑️</button>
            <button id="closeArmyButton">X</button>
            <p>Total points: <span id="points"></span></p>
            <details id="validation"}><summary id="validationSummary"></summary></details>
            ${this._army.armyList.armySpecialRules ?
                "<div id='armySpecialRules'></div>" : ""
            }
            ${this._army.armyList.psionicPowers ?
                "<details id='psionics'><summary id='psionicsSummary'>Psionic power lists</summary></details>" : ""
            }
            <p id="armySpecialRules"></p>
            <div id="units"></div>
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
        const points = this.shadow.querySelector('#points');
        points.innerText = this._army.calculateTotalPoints();
        for (const unit of this._army.units) {
            let unitCard = document.createElement("unit-card");
            unitCard.unit = unit;
            container.append(unitCard);
        }

        if(this._army.armyList.armySpecialRules){
            const armySpecialRulesElement = this.shadow.querySelector('#armySpecialRules');
            for(let specialRule of Object.entries(this._army.armyList.armySpecialRules)){
                let specialRuleElement = document.createElement('p');
                specialRuleElement.innerText = `${specialRule[1].name}: ${specialRule[1].description}`
                armySpecialRulesElement.append(specialRuleElement);
            }
        }

        if(this._army.armyList.psionicPowers){
            const psionicsElement = this.shadow.querySelector('#psionics');
            psionicsElement.open = this._army.psionicDetails;
            for(let psionicsList of Object.entries(this._army.armyList.psionicPowers)){
                let listName = document.createElement('h4');
                listName.innerText = psionicsList[1].name;
                psionicsElement.append(listName);
                let list = document.createElement('ul');
                for(let psionicPower of Object.entries(psionicsList[1].powers)){
                    let listEntry = document.createElement('li');
                    listEntry.innerText = `${psionicPower[1].roll}: ${psionicPower[1].name} - ${psionicPower[1].description}`;
                    list.append(listEntry);
                }
                psionicsElement.append(list);
            }
        }

        const upgradeModal = this.shadow.querySelector('#upgradeModal');
        upgradeModal.upgrades = this._army.upgrades;

        const selectUnitModal = this.shadow.querySelector('#selectUnitModal');
        selectUnitModal.army = this._army;
    }
}

customElements.define("army-card", ArmyCard);