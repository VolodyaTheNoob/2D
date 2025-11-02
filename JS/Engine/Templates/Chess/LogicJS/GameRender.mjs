import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";
   
export function RenderTileMap(TileMap){
    let _TileMap = TileMap.GetTiles();
    for(let y = 0; y < TileMap.SizeY;y++){
        for(let x = 0; x < TileMap.SizeX;x++){
            if(_TileMap[y][x] !== undefined){
                ENGINE.CONST.MainSceneContext.putImageData(_TileMap[y][x].GetTexture(),x * TileMap.TileSizeX, y * TileMap.TileSizeY);
            }
        }
    }
}

export function SmartRender(ChessPieces,TileMap){
    let _TileMap = TileMap.GetTiles();
    let _ChessPieces = ChessPieces.GetTiles();
    for(let y = 0; y < ChessPieces.SizeY;y++){
        for(let x = 0; x < ChessPieces.SizeX;x++){
            if(_ChessPieces[y][x] !== undefined){
                let CurrentTileImageData = _TileMap[y][x].GetTexture();
                let CurrentTileColor = [CurrentTileImageData.data[0],CurrentTileImageData.data[1],CurrentTileImageData.data[2],CurrentTileImageData.data[3]];
                let PieceImageData = _ChessPieces[y][x].GetTexture();
                PieceImageData = BackgroundChanger(CurrentTileColor,PieceImageData,[_ChessPieces[y][x].SizeX,_ChessPieces[y][x].SizeY]);
                ENGINE.CONST.MainSceneContext.putImageData(PieceImageData,x * ChessPieces.TileSizeX, y * ChessPieces.TileSizeY);
            }
        }
    }
}

function BackgroundChanger(CurrentTileColor,PieceImageData,[SizeX,SizeY]){
    const PieceColor1= [0,0,0,255];
    const PieceColor2 = [244,244,244,255];
    for(let y = 0; y < SizeY;y+=1){
        for(let x = y * SizeX * 4;x < y * SizeX * 4 + SizeX * 4;x+=4){
           if((PieceImageData.data[x] != PieceColor1[0] &&
            PieceImageData.data[x+1] != PieceColor1[1] &&
            PieceImageData.data[x+2] != PieceColor1[2]) && 
            (PieceImageData.data[x] != PieceColor2[0] &&
            PieceImageData.data[x+1] != PieceColor2[1] &&
            PieceImageData.data[x+2] != PieceColor2[2]))
            {
            PieceImageData.data[x] = CurrentTileColor[0];
            PieceImageData.data[x+1] = CurrentTileColor[1];
            PieceImageData.data[x+2] = CurrentTileColor[2];
            PieceImageData.data[x+3] = CurrentTileColor[3];
           }
           
        }
    }
    return PieceImageData;
}