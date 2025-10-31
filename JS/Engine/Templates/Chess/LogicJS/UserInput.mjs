import { Input } from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";

export class UserInput extends Input{
    constructor(DOM){
        super();
        this.DOM = DOM;
    }
}

export let PlayerInput = new UserInput(ENGINE.CONST.MainSceneDOM);  

PlayerInput.AddEventFunction("mousemove",GetUserMouseCoordinates,PlayerInput);
        function GetUserMouseCoordinates(InputClass){
            let MouseCoordinatesObjects = new Object();
            let EventName = "mousemove"
            InputClass.DOM.addEventListener(EventName,  (e) =>{
                MouseCoordinatesObjects["X"] = e.clientX;
                MouseCoordinatesObjects["Y"] = e.clientY;
                InputClass.EventCallbackResult[EventName] = MouseCoordinatesObjects;
            });
        }
    PlayerInput.AddEventFunction("mousemove",SetIsUserMouseDown,PlayerInput);
        function SetIsUserMouseDown(InputClass){
        let IsMouseDown = new Object();
        let MouseDownEventName = "mousedown";
        let MouseUpEventName = "mouseup";
        InputClass.DOM.addEventListener(MouseDownEventName,  (e) =>{
            IsMouseDown["IsMouseDown"] = true;
            InputClass.EventCallbackResult[MouseDownEventName] = IsMouseDown;
        });
        InputClass.DOM.addEventListener(MouseUpEventName,  (e) =>{
            IsMouseDown["IsMouseDown"] = false;
            InputClass.EventCallbackResult["IsMouseDown"] = IsMouseDown;
        });
    }