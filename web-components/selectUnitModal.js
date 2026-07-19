'use strict'

import './unitCard.js';
import './upgradeModal.js';

export default class SelectUnitModal extends HTMLElement {
    constructor() {
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

    onClick(event){
        if (event.target.matches('#closeModalButton')){
            this.hide();
        }
        if (event.target.matches('.unit')) {
            this._army.addUnit(event.target._unit[0]);
            this.hide();
        }
    }

    open(army) {
        this._army = army;  
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
                }

                #closeModalButton{
                    position: absolute;
                    right: 3px;
                    top: 3px;
                }

                #units{
                    display: flex;
                    max-width: 95%;
                    flex-wrap: wrap;
                }

                .unit{
                    padding: 5px;
                    margin: 3px;
                    border: 1px solid black;
                }
            </style>
            <div id="overlay">
            <div id="modal">
            <button id="closeModalButton">X</button>
            <h2>Army</h2>
            <div id="units"></div>
            </div>
            </div>
        `;

        const container = this.shadow.querySelector('#units');
        for (let unit of Object.entries(this._army._armyList.units)) {
            //TODO: Did not work with unit-card because it excepts unit object instead of just data representation.
            //Have to think about making unit-card more reusable or making this more expressive (which would be against DRY)
            let unitElement = document.createElement('div');
            unitElement.classList.add('unit');
            unitElement._unit = unit;
            unitElement.innerText += `${unit[1].keyword.icon} ${unit[1].name} - ${unit[1].points}pts`;
            container.append(unitElement);
        }
    }
}

customElements.define("select-unit-modal", SelectUnitModal);