import { RGBA,ColorImage,DeffaultImage,Texture, Sprite} from "./JS/Engine/Graphics/Graphics.mjs";
import {Tile} from "./JS/Engine/Engine/Tile.mjs";
import { TileMap } from "./JS/Engine/Engine/TileMap.mjs";
import * as CONST from "./JS/Engine/Constants.mjs";
import { Render } from "./JS/Engine/Engine/Render.mjs";

//I guess there will be start of main code - its will start works after loading all stuff - so in future i will refactor LoaderClass
const ConstantsModulePromise = CONST.ConstantsLoader.LoadModule();
ConstantsModulePromise.catch(() =>{
    console.log("Unable to load constants");
});
ConstantsModulePromise.then(()=>{

    const BlackTile = new Tile(CONST.BlackTexture,CONST.SizeX,CONST.SizeY);
    const WhiteTile = new Tile(CONST.WhiteTexture,CONST.SizeX,CONST.SizeY);
    const ChessBoardSize = 8;
    const Tiles = [
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile]
    ];
    const BlackWihteTileMap = new TileMap([CONST.SizeX,CONST.SizeY],[ChessBoardSize,ChessBoardSize],Tiles);
    RenderTileMap(BlackWihteTileMap);
    let ChessBoardRender = new Render(BlackWihteTileMap,RenderTileMap);
    ChessBoardRender.Start();
});   
function RenderTileMap(TileMap){
    let _TileMap = TileMap.GetTiles();
    for(let y = 0; y < TileMap.SizeY;y++){
        for(let x = 0; x < TileMap.SizeY;x++){
            console.log("x: " + x + " |  y: " + y + " |  TileMap[x][y]: " + _TileMap[x][y]);
            console.log("x * TileMap.TileSizeX = ", x * TileMap.TileSizeX + " |  y * TileMap.TileSizeY = " + y * TileMap.TileSizeY);
            console.log(_TileMap[x][y].GetTexture());
            CONST.MainSceneContext.putImageData(_TileMap[x][y].GetTexture(),x * TileMap.TileSizeX, y * TileMap.TileSizeY);
        }
    }
} 