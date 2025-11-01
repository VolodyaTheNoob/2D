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