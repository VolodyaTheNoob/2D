import * as ENGINE from "../../EngineImports.mjs";   
import * as LOCAL from "../LOCAL.mjs"

export const [MapSizeY,MapSizeX] = [16,16];
export const [TileSizeY,TileSizeX] = [64,64];
export let Tiles;
export let Background;

export let BlackTexture;
export let WhiteTexture;
export async function CreateMapTiles(){
    Tiles = new Array(MapSizeY);
    Background = new ENGINE.TileMapStatic([TileSizeY,TileSizeX],[MapSizeY,MapSizeX],Tiles);
    BlackTexture = new ENGINE.Graphics.Texture(LOCAL.BlackImage,TileSizeY,TileSizeX);
    WhiteTexture = new ENGINE.Graphics.Texture(LOCAL.WhiteImage,TileSizeY,TileSizeX);
    for(let y = 0; y < MapSizeY;y++){
        Tiles[y] = new Array(MapSizeX);
    }
    for(let y = 0; y < MapSizeY;y++){
        for(let x = 0; x < MapSizeX;x++){
            if(y % 2 == 0){
                if(x % 2 == 0){
                    Tiles[y][x] = new ENGINE.Tile(LOCAL.BlackTexture,TileSizeY * y,TileSizeX * x,y,x);
                }else{
                    Tiles[y][x] = new ENGINE.Tile(LOCAL.WhiteTexture,TileSizeY * y,TileSizeX * x,y,x);
                }
            }else{
                if(x % 2 == 0){
                    Tiles[y][x] = new ENGINE.Tile(LOCAL.WhiteTexture,TileSizeY * y,TileSizeX * x,y,x);
                }else{
                    Tiles[y][x] = new ENGINE.Tile(LOCAL.BlackTexture,TileSizeY * y,TileSizeX * x,y,x);
                }
            }
        }
    }
};

