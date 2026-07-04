export default class Upgrade {
    constructor({identifier, values}){
        this._identifier = identifier;
        this._name = values.name;
        this._keyword = values.keyword;
        this._statBonuses = values.statBonuses || null;
        this._description = values.description;
        this._assignedUnit = null;
    }

    get identifier(){
        return this._identifier;
    }

    get name(){
        return this._name;
    }

    get keyword(){
        return this._keyword;
    }

    get statBonuses(){
        return this._statBonuses;
    }

    get description(){
        return this._description;
    }

    get assignedUnit(){
        return this._assignedUnit;
    }

    set assignedUnit(newUnit){
        if(this._assignedUnit != null){
            this._assignedUnit.upgrade = null;
        }
        this._assignedUnit = newUnit;
        newUnit.upgrade = this;
    }

    //Used to remove units existing upgrade when they choose another one, prevents recursive loop.
    unassign(){
        if(this._assignedUnit != null){
            this._assignedUnit = null;
        }
    }
}