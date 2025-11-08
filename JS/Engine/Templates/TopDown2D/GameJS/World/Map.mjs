import * as ENGINE from "../../EngineImports.mjs";   

export const [SizeY,SizeX] = [64,64];
export let Tiles;
export let Background;

export let BlackTexture;
export let WhiteTexture;
export async function CreateMapTiles(){
    Tiles = new Array(SizeY);
    Background = new ENGINE.TileMapStatic([SizeY,SizeX],[SizeY,SizeX],Tiles);
    BlackTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.BlackImage,SizeY,SizeX);
    WhiteTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.WhiteImage,SizeY,SizeX);
    for(let y = 0; y < SizeY;y++){
        Tiles[y] = new Array(SizeX);
    }
    for(let y = 0; y < SizeY;y++){
        for(let x = 0; x < SizeX;x++){
            if(y % 2 == 0){
                if(x % 2 == 0){
                    Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.BlackTexture,SizeY * y,SizeX * x,y,x);
                }else{
                    Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.WhiteTexture,SizeY * y,SizeX * x,y,x);
                }
            }else{
                if(x % 2 == 0){
                    Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.WhiteTexture,SizeY * y,SizeX * x,y,x);
                }else{
                    Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.BlackTexture,SizeY * y,SizeX * x,y,x);
                }
            }
        }
    }
};

