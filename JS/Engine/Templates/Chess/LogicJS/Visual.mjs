import { CONST } from "../EngineImports.mjs"; 

export function ResizeCanvasToChessBoard(ChessBoardSize,ChessBoardTileSizeX,ChessBoardTileSizeY){
    let Width = ChessBoardTileSizeX * ChessBoardSize;
    let Height = ChessBoardTileSizeY * ChessBoardSize;
    CONST.MainSceneDOM.width = Width;
    CONST.MainSceneDOM.height = Height;
}
export function RenderTileMap(TileMap){
    let _TileMap = TileMap.GetTiles();
    for(let y = 0; y < TileMap.SizeY;y++){
        for(let x = 0; x < TileMap.SizeY;x++){
            CONST.MainSceneContext.putImageData(_TileMap[x][y].GetTexture(),x * TileMap.TileSizeX, y * TileMap.TileSizeY);
        }
    }
}