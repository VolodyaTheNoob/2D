import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";
import {CONST} from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs";
//Constants
export let BlackTile;
export let WhiteTile;
export const ChessBoardSize = 8;
export let Tiles;
export let BlackWihteTileMap;
//Loaders
export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",CONST.CreateGraphicsConstants);
export const LocalConstLoader = new ModuleLoader("./Templates/Chess/LogicJS/LocalConstants.mjs",CreateLocalConstants);

//Dynamic constants
export function CreateLocalConstants(){
    BlackTile = new ENGINE.Tile(CONST.BlackTexture,CONST.SizeX,CONST.SizeY);
    WhiteTile = new ENGINE.Tile(CONST.WhiteTexture,CONST.SizeX,CONST.SizeY);
    Tiles = [
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile]
    ];
    BlackWihteTileMap = new ENGINE.TileMap([CONST.SizeX,CONST.SizeY],[ChessBoardSize,ChessBoardSize],Tiles);
}

export const ConstantsModulePromise = ConstantsLoader.LoadModule();
export const LocalConstantsModulePromise = LocalConstLoader.LoadModule();

//Loaders wrap
export function LoadAllDynamicConstants(){

        ConstantsModulePromise.catch(() =>{
            return false;
        });
        ConstantsModulePromise.then(()=>{
            LocalConstantsModulePromise.catch(()=>{
                return false;
            });    
            LocalConstantsModulePromise.then(() =>{
                return true
            });
    });
}