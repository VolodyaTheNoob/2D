import { RGBA,ColorImage,DeffaultImage,Texture, Sprite} from "../Graphics/Graphics.mjs";
import {Tile} from "../Engine/Tile.mjs";
import { TileMap } from "../Engine/TileMap.mjs";
import * as CONST from "../Constants.mjs";
import { Render } from "../Engine/Render.mjs";

export function Chess(){
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
        ResizeCanvasToChessBoard(ChessBoardSize,CONST.SizeX,CONST.SizeY);
        RenderTileMap(BlackWihteTileMap);
        let ChessBoardRender = new Render(BlackWihteTileMap,RenderTileMap);
        ChessBoardRender.Render();
    });   
    function RenderTileMap(TileMap){
        let _TileMap = TileMap.GetTiles();
        for(let y = 0; y < TileMap.SizeY;y++){
            for(let x = 0; x < TileMap.SizeY;x++){
                CONST.MainSceneContext.putImageData(_TileMap[x][y].GetTexture(),x * TileMap.TileSizeX, y * TileMap.TileSizeY);
            }
        }
    } 
    function ResizeCanvasToChessBoard(ChessBoardSize,ChessBoardTileSizeX,ChessBoardTileSizeY){
        let Width = ChessBoardTileSizeX * ChessBoardSize;
        let Height = ChessBoardTileSizeY * ChessBoardSize;
        CONST.MainSceneDOM.width = Width;
        CONST.MainSceneDOM.height = Height;
    }
}
Chess();