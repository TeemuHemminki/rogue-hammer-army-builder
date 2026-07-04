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
            </style>
            <army-modal id="armyModal"></army-modal>
            <h1>Rogue Hammer Army Builder</h1>
            <button id="addArmyButton">Add New Army</button>
            <button id="loadArmyButton">Load Saved Army</button>
            <div id="openArmyTabs"></div>
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