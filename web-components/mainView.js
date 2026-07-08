'use strict'

import './armyModal.js';
import './armyCard.js';

export default class MainView extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({
            mode: "open"
        });

        this.onClick = this.onClick.bind(this);
        this.addArmy = this.addArmy.bind(this);
        this.deleteArmy = this.deleteArmy.bind(this);
        this.closeArmy = this.closeArmy.bind(this);
    }

    addArmy(event){
        this._main.addArmy(event.detail.army);
        this.render();
    }

    deleteArmy(event){
        this._main.deleteArmy(event.detail.army);
        this.render();
    }

    closeArmy(event){
        this._main.closeArmy(event.detail.army);
        this.render();
    }

    set main(main){
        this._main = main;
        this.render();
    }

    connectedCallback() {
        this.shadow.addEventListener('click', this.onClick);
        this.shadow.addEventListener('addArmy', this.addArmy);
        this.shadow.addEventListener('deleteArmy', this.deleteArmy);
        this.shadow.addEventListener('closeArmy', this.closeArmy);
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', this.onClick);
        this.shadow.removeEventListener('addArmy', this.addArmy);
        this.shadow.removeEventListener('deleteArmy', this.deleteArmy);
        this.shadow.removeEventListener('closeArmy', this.closeArmy);
    }

    onClick(event){
        if (event.target.matches('#addArmyButton')){
            const armyModal = this.shadow.querySelector('#armyModal');
            armyModal.open(this._main.getListOfNewArmies());
        }
        if (event.target.matches('.armyButton')){
            this._main.switchArmy(event.target.army);
            this.render();
        }
        if (event.target.matches('#loadArmyButton')){
            const armyModal = this.shadow.querySelector('#armyModal');
            armyModal.open(this._main.getListOfSavedArmies());
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                h1{
                    margin: 5px;
                }
                p{
                    margin: 5px;
                }
            </style>
            <army-modal id="armyModal"></army-modal>
            <h1>Rogue Hammer Army Builder</h1>
            <details>
                <summary>Boring stuff</summary>
                <p>This is a fan made army builder for <a href="https://www.wargamevault.com/product_reviews.php?products_id=418767">Rogue Hammer</a> by Ivan Sorensen / Nordic Weasel Games. Army list data used with permission.</p>
                <p>Code repository is available at <a href="https://github.com/TeemuHemminki/rogue-hammer-army-builder">Github</a> and contributions (especially to army lists) are welcome.</p>
                <p>On the use of LLM (or "AI"): Project doesn't use LLM generated code, but LLM coding assistant has been used for autofilling. LLM has also been used for evaluating ideas, design patterns and generally to get information of code. In short, this project is not "vibe coded", but it's creation is assisted by LLM</p>
            </details>
            <p> <button id="addArmyButton">Add New Army</button><button id="loadArmyButton">Load Saved Army</button> </p>
            <p id="openArmyTabs">Loaded Army Lists: </p>
            <div id="armyCardHolder"></div>
        `;

        if(this._main?.armies){
            const openArmyTabs = this.shadow.querySelector('#openArmyTabs');
            for(let i = 0; i < this._main.armies.length; i++){
                let army = this._main.armies[i];
                let armyButton = document.createElement('button');
                armyButton.classList.add('armyButton');
                armyButton.innerText = army.name ? army.name : army.armyList.name;
                armyButton.army = army;
                openArmyTabs.append(armyButton);
            }
        }

        if(this._main?.curArmy){
            const armyCardHolder = this.shadow.querySelector('#armyCardHolder');
            let armyCard = document.createElement('army-card');
            armyCard.army = this._main.curArmy;
            armyCardHolder.append(armyCard);
        }
    }
}

customElements.define("main-view", MainView);