import { Input } from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";

export class UserInput extends Input{
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

export let PlayerInput = new UserInput(ENGINE.CONST.MainSceneDOM);  

PlayerInput.AddEventFunction("mousemove",GetUserMouseCoordinates,PlayerInput);
        function GetUserMouseCoordinates(InputClass){
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
    PlayerInput.AddEventFunction("mousemove",SetIsUserMouseDown,PlayerInput);
        function SetIsUserMouseDown(InputClass){
        let MouseDownEventName = "mousedown";
        let MouseUpEventName = "mouseup";
        InputClass.DOM.addEventListener(MouseDownEventName,  (e) =>{
            InputClass.ClickedBoardRawCoordinates = InputClass.CurrentBoardRawCoordinates
            InputClass.ClickedBoardCalculatedCoordinates = InputClass.CurrentBoardCalculatedCoordinates;
            InputClass.ClickedBoardTile = InputClass.CurrentBoardTile;
            console.log(InputClass.ClickedBoardTile);
            InputClass.IsMouseDown= true;
        });
        InputClass.DOM.addEventListener(MouseUpEventName,  (e) =>{
            console.log(InputClass.CurrentBoardTile);
            InputClass.IsMouseDown= false;
        });
    }