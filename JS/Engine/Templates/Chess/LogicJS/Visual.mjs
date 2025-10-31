import { CONST } from "../EngineImports.mjs"; 

export function ResizeCanvasToChessBoard(ChessBoardSize,ChessBoardTileSizeX,ChessBoardTileSizeY){
    let Width = ChessBoardTileSizeX * ChessBoardSize;
    let Height = ChessBoardTileSizeY * ChessBoardSize;
    CONST.MainSceneDOM.width = Width;
    CONST.MainSceneDOM.height = Height;
}
