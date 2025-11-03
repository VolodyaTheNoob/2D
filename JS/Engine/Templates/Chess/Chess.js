import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/GameGlobalData/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/GameGlobalData/Visual.mjs";
import {PlayerInput, UserInput} from "./LogicJS/GameGlobalData/UserInput.mjs"
import { RenderTileMap, SmartRender} from "./LogicJS/GameGlobalData/GameRender.mjs";
import { GetClickedCheesPiece,MoveLogic,MovePieceWithClick } from "./LogicJS/GameLogic.mjs";
import { Pawn } from "./LogicJS/ChessPieces/Pawn.mjs";

let lastTimestamp = 0;

export async function Chess(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    //Start of Game Loop - all magic do here
    async function GameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        let IsMoved = await MoveLogic();
        //Graphic Render
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        LOCALCONST.ChessBoardRender.Render();
        LOCALCONST.ChessPiecesRender.Render();
        setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
        
    }
    requestAnimationFrame(GameLoop);//first call of loop
}
Chess();




