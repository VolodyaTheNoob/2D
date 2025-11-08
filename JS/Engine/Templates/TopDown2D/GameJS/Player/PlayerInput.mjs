import * as ENGINE from "../../EngineImports.mjs";

export class PlayerInput extends ENGINE.Input{
	constructor(){
		super();
		this.IsKeyDown = undefined;
		this.LastKey = undefined;
	}
}

export function PlayerKeyboardDown(InputClass){
    document.addEventListener("keydown", (e) =>{
        InputClass.IsKeyDown = true;
        InputClass.LastKey = e.key;
    });
}
export function PlayerKeyboardUP(InputClass){
    document.addEventListener("keyup", (e) =>{
        InputClass.LastKey = undefined;
        InputClass.IsKeyDown = false;
    });
}