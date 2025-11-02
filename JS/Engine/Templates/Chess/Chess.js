import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/Visual.mjs";
import {PlayerInput} from "./LogicJS/UserInput.mjs"
import { RenderTileMap, SmartRender } from "./LogicJS/GameRender.mjs";

export async function Chess(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    //creating chessboard render
    const ChessBoardRender = new ENGINE.Render(LOCALCONST.TileMap,RenderTileMap);
    const ChessPiecesRender = new ENGINE.Render(LOCALCONST.GamePiecesTileMap,SmartRender,LOCALCONST.TileMap);
    ChessBoardRender.Render();
    ChessPiecesRender.Render();
}
Chess();