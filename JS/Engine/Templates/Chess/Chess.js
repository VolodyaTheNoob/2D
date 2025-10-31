import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/Visual.mjs";
import {PlayerInput} from "./LogicJS/UserInput.mjs"
import { RenderTileMap } from "./LogicJS/GameRender.mjs";

export async function Chess(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    //creating chessboard render
    const ChessBoardRender = new ENGINE.Render(LOCALCONST.BlackWihteTileMap,RenderTileMap,LOCALCONST.BlackWihteTileMap);
    ChessBoardRender.Render();

    //Test
    ENGINE.CONST.MainSceneContext.putImageData(LOCALCONST.WhiteKing.GetTexture(),0,0);
}
Chess();