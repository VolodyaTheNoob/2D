import { Input } from "../../../EngineImports.mjs";
import * as ENGINE from "../../../EngineImports.mjs"; 
import * as LOCALCONST from "../LocalConstants.mjs";

export class PlayerInput extends Input{
    constructor(_DOM){
        super();
        this.DOM = _DOM;
        this.CurrentBoardRawCoordinates = undefined;
        this.CurrentBoardCalculatedCoordinates = undefined;
        this.CurrentBoardTile = undefined;
        this.ClickedBoardRawCoordinates = undefined;
        this.ClickedBoardCalculatedCoordinates = undefined;
        this.ClickedBoardTile = undefined;
        this.IsMouseDown = false;
    }
}

export let _PlayerInput = new PlayerInput(ENGINE.CONST.MainSceneDOM);  

_PlayerInput.AddEventFunction("mousemove",GetUserMouseCoordinates,_PlayerInput);
export function GetUserMouseCoordinates(InputClass){
            const BoardSize = 64;
            let MouseRawCoordinatesObjects = new Object();
            let MouseCoordinatesObjects = new Object();
            let BoardTile = new Object();
            let EventName = "mousemove"
            InputClass.DOM.addEventListener(EventName,  (e) =>{
                let SceneRect = InputClass.DOM.getBoundingClientRect();
                MouseRawCoordinatesObjects["X"] = e.clientX;
                MouseRawCoordinatesObjects["Y"] = e.clientY;
                MouseCoordinatesObjects["X"] = e.clientX - SceneRect.left;
                MouseCoordinatesObjects["Y"] = e.clientY - SceneRect.top;
                BoardTile["X"] = parseInt(MouseCoordinatesObjects["X"] / BoardSize);
                BoardTile["Y"] = parseInt(MouseCoordinatesObjects["Y"] / BoardSize);
                InputClass.CurrentBoardRawCoordinates = MouseRawCoordinatesObjects;
                InputClass.CurrentBoardCalculatedCoordinates = MouseCoordinatesObjects;
                InputClass.CurrentBoardTile = BoardTile;
            });
        }
    _PlayerInput.AddEventFunction("mousemove",SetIsUserMouseDown,_PlayerInput);
export function SetIsUserMouseDown(InputClass){
        let MouseDownEventName = "mousedown";
        let MouseUpEventName = "mouseup";
        InputClass.DOM.addEventListener(MouseDownEventName,  (e) =>{
            InputClass.ClickedBoardRawCoordinates = InputClass.CurrentBoardRawCoordinates
            InputClass.ClickedBoardCalculatedCoordinates = InputClass.CurrentBoardCalculatedCoordinates;
            InputClass.ClickedBoardTile = InputClass.CurrentBoardTile;
            InputClass.IsMouseDown= true;
        });
        InputClass.DOM.addEventListener(MouseUpEventName,  (e) =>{
            InputClass.IsMouseDown= false;
        });
    }