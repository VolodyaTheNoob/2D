import {TileMap} from "./TileMap.mjs"
import { MainSceneBackBufferContext } from "../Constants.mjs";
import { MainSceneBackBufferDOM } from "../Constants.mjs";
import { StoredImage } from "../Graphics/Graphics.mjs";

export class TileMapStatic extends TileMap{
    constructor(TileSize,TileMapSize, Tiles){
        super(TileSize,TileMapSize, Tiles);
        this.StaticImage;
    }
    async CreateStatic(){
        //Creating static background
        let PrevCtxWidth = MainSceneBackBufferContext.width;
        let PrevCtxHeight = MainSceneBackBufferContext.height;
        let PrevDOMWidth = MainSceneBackBufferDOM.width ;
        let PrevDOMHeight = MainSceneBackBufferDOM.height;
        MainSceneBackBufferContext.width = this.TileSizeX * this.SizeX;
        MainSceneBackBufferContext.height = this.TileSizeY * this.SizeY;
        MainSceneBackBufferDOM.width = this.TileSizeX * this.SizeX;
        MainSceneBackBufferDOM.height = this.TileSizeY * this.SizeY;
        for(let y = 0; y < this.SizeY;y++){
            for(let x = 0; x < this.SizeX;x++){
                MainSceneBackBufferContext.drawImage(this.Tiles[y][x].GetTexture(),this.Tiles[y][x].SizeX * x,this.Tiles[y][x].SizeY * y)
            }
        }
        this.StaticImage = new StoredImage(this.TileSizeX * this.SizeX,this.TileSizeY * this.SizeY,MainSceneBackBufferDOM.toDataURL("image/png"));
        MainSceneBackBufferContext.clearRect(0,0,this.TileSizeX * this.SizeX, this.TileSizeY * this.SizeY);
        MainSceneBackBufferContext.width = PrevCtxWidth;
        MainSceneBackBufferContext.height = PrevCtxHeight;
        MainSceneBackBufferDOM.width = PrevDOMWidth;
        MainSceneBackBufferDOM.height = PrevDOMHeight;
    }
} 