'use strict'

import {INDIVIDUAL, TRAITS} from '../scripts/constants.js';
import './upgradeCard.js';

export default class UpgradeModal extends HTMLElement {
    constructor(){
        super();

        this.shadow = this.attachShadow({
            mode: "open"
        });

        this.onClick = this.onClick.bind(this);
    }

    connectedCallback() {
        this.shadow.addEventListener('click', this.onClick);
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this.onClick);
    }


    set upgrades(upgrades){
        this._upgrades = upgrades;
    }

    open(unit) {
        this._unit = unit;  
        this.render();
        this.style.display = "block";
    }

    hide(){
        this.style.display = "none";
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #overlay{
                    position: fixed;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0.5, 0.5, 0.5, 0.5);
                    z-index: 9999;
                }
                
                #modal{
                    width: 80%;
                    background: white;
                }

                #upgradesContainer{
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    overflow-y: scroll;
                    max-height: 90vh;
                }

                #closeModalButton{
                    position: absolute;
                    right: 3px;
                    top: 3px;
                }
             }
            </style>
            <div id="overlay">
            <div id="modal">
            <h2>Upgrades</h2>
            <div id="upgradesContainer"></div>
            <button id="closeModalButton">X</div>
            </div>
            </div>
        `;

        const upgradesContainer = this.shadow.querySelector('#upgradesContainer');
        for(let i = 0; i < this._upgrades.length; i++){
            let upgrade = this._upgrades[i];
            if(upgrade.keyword === this._unit.stats.keyword || upgrade.keyword === INDIVIDUAL && this._unit.stats.specialRules.includes(TRAITS.individual)){ //TODO: Ugly way of handling individual upgrades being available for units that do not have individual keyword but ability. Might need to chagne this later anyway if there are other edge cases like it.
                let upgradeItem = document.createElement('upgrade-card');
                upgradeItem.upgrade = upgrade;
                upgradesContainer.append(upgradeItem);
            }
        }

    }

    onClick(event){
        if (event.target.matches('#closeModalButton')) {
            this.hide();
        }
        if (event.target.matches('upgrade-card')){
            event.target.upgrade.assignedUnit = this._unit;
            this.hide();
        }
    }
}

customElements.define("upgrade-modal", UpgradeModal);