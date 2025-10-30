export class Input{
    constructor(){
        this.EventCallbackResult = new Object();
        this.EventFunctions = new Object();
    }
    AddEventFunction(event,func){
        this.EventFunctions[event]= func;
        this.EventCallbackResult[event] = new Object();
        this.EventFunctions[event](this);
    }
}