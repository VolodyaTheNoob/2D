import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/GameData/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/GameData/Visual.mjs";
import {PlayerInput} from "./LogicJS/GameData/Player/PlayerInput.mjs"
import { RenderTileMap, SmartRender} from "./LogicJS/GameData/GameRender.mjs";
import { GetClickedCheesPiece,MoveLogic,MovePieceWithClick } from "./LogicJS/GameData/GameLogic.mjs";

let lastTimestamp = 0;

export async function StartGame(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    //Start of Game Loop - all magic do here
    async function GameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        await LOCALCONST.Chess.ProcessPlayerInput();
        //Graphic Render
        await LOCALCONST.Chess.Render();
        setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
    }
    requestAnimationFrame(GameLoop);//first call of loop
}
StartGame();




