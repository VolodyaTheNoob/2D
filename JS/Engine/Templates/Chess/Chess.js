import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/Visual.mjs";
import {PlayerInput, UserInput} from "./LogicJS/UserInput.mjs"
import { RenderTileMap, SmartRender, MovePieceWithClick} from "./LogicJS/GameRender.mjs";
import { GetClickedCheesPiece } from "./LogicJS/GameLogic.mjs";

let lastTimestamp = 0;

export async function Chess(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    let FocusedPiece = undefined; // used for getting current clicked piece
    //Start of Game Loop - all magic do here
    async function GameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        if(PlayerInput.IsMouseDown === true){
            console.log(1);
            let ClickedTile = PlayerInput.ClickedBoardTile;
            if(FocusedPiece === undefined){
                FocusedPiece = await GetClickedCheesPiece(ClickedTile);   
            }else{
                await MovePieceWithClick(FocusedPiece,ClickedTile);
                FocusedPiece = undefined;
            } 
        }
        //Graphic Render
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        LOCALCONST.ChessBoardRender.Render();
        LOCALCONST.ChessPiecesRender.Render();
        setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
        
    }
    requestAnimationFrame(GameLoop);//first call of loop
}
Chess();




