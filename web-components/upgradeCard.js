'use strict'

export default class UpgradeCard extends HTMLElement {
    constructor(){
        super();

        this.shadow = this.attachShadow({
            mode: "open"
        });
    }

    get upgrade(){
        return this._upgrade;
    }

    set upgrade(upgrade){
        this._upgrade = upgrade;
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                div{
                    border: 1px solid black;
                    padding: 3px;
                    margin: 3px;
                    width: 200px;
                }
            </style>
            <div>
                <h2>${this._upgrade.name}</h2>
                <p>Cost: ${this._upgrade.statBonuses.points}</p>
                <p>${this._upgrade.description}</p>
                ${this._upgrade.assignedUnit
                    ? "<p>Currently assigned to " + this._upgrade.assignedUnit.name + "</p>"
                    : ""
                }
            </div>
        `;
    }
}

customElements.define("upgrade-card", UpgradeCard);