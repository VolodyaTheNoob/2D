import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/LocalConstants.mjs";
import { ResizeCanvasToChessBoard,RenderTileMap } from "./LogicJS/Visual.mjs";
import {UserInput} from "./LogicJS/UserInput.mjs"

export function Chess(){
    //I guess there will be start of main code - its will start works after loading all stuff - so in future i will refactor LoaderClass
    LOCALCONST.ConstantsModulePromise.catch(() =>{
           return false;
        });
        LOCALCONST.ConstantsModulePromise.then(()=>{
            LOCALCONST.LocalConstantsModulePromise.catch(()=>{
                return false;
            });    
            LOCALCONST.LocalConstantsModulePromise.then(() =>{           

                let ChessBoardRender = new ENGINE.Render(LOCALCONST.BlackWihteTileMap,RenderTileMap);
                let PlayerInput = new UserInput(ENGINE.CONST.MainSceneDOM);  
                ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
                RenderTileMap(LOCALCONST.BlackWihteTileMap);
                
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
        });
    });
}
Chess();