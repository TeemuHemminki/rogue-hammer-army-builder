export default class ArmyModal extends HTMLElement {
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

    open(armies) {
        this._armies = armies;
        this.render();
        this.style.display = "block";
    }

    hide() {
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

                #armiesContainer{
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                }

                #closeModalButton{
                    position: absolute;
                    right: 3px;
                    top: 3px;
                }

                .army{
                    margin: 3px;
                    padding: 3px;
                    border: 1px solid black;
                }
             }
            </style>
            <div id="overlay">
            <div id="modal">
            <h2>Select Army</h2>
            <div id="armiesContainer"></div>
            <button id="closeModalButton">X</div>
            </div>
            </div>
        `;

        const armiesContainer = this.shadow.querySelector('#armiesContainer');
        for (let i = 0; i < this._armies.length; i++) {
            let army = this._armies[i];
            let armyItem = document.createElement('div');
            armyItem.classList.add('army');
            armyItem.army = army;
            armyItem.innerText = `${army.name}${army.points ? ' - ' + army.points + 'pts' : ''}`;
            armiesContainer.append(armyItem);
        }

    }

    onClick(event) {
        if (event.target.matches('#closeModalButton')) {
            this.hide();
        }
        if (event.target.matches('.army')) {
            this.dispatchEvent(
                new CustomEvent('addArmy', {
                    detail: { army: event.target.army },
                    bubbles: true,
                    composed: true
                })
            );
            this.hide();
        }
    }
}

customElements.define("army-modal", ArmyModal);