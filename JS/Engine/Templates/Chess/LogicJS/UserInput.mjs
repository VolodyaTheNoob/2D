import { Input } from "../EngineImports.mjs";

export class UserInput extends Input{
    constructor(DOM){
        super();
        this.DOM = DOM;
    }
}