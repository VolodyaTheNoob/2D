import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";
   
export function RenderTileMap(TileMap){
    let _TileMap = TileMap.GetTiles();
    for(let y = 0; y < TileMap.SizeY;y++){
        for(let x = 0; x < TileMap.SizeY;x++){
             ENGINE.CONST.MainSceneContext.putImageData(_TileMap[x][y].GetTexture(),x * TileMap.TileSizeX, y * TileMap.TileSizeY);
        }
    }
}