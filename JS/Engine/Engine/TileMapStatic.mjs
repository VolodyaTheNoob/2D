import {TileMap} from "./TileMap.mjs"
import { MainSceneBackBufferContext } from "../Constants.mjs";

export class TileMapStatic extends TileMap{
    constructor(TileSize,TileMapSize, Tiles){
        super(TileSize,TileMapSize, Tiles);
        this.StaticImage = new ImageData(this.SizeX * this.TileSizeX,this.SizeY * this.TileSizeY);
    }
    async Create(){
        //Creating static background
        for(let y = 0; y < this.SizeY;y++){
            for(let x = 0; x < this.SizeX;x++){
                MainSceneBackBufferContext.putImageData(this.Tiles[y][x].GetTexture(),this.Tiles[y][x].SizeX * x,this.Tiles[y][x].SizeY * y)
            }
        }
        let StaticImageData = MainSceneBackBufferContext.getImageData(0,0,this.TileSizeX * this.SizeX, this.TileSizeY * this.SizeY);
        for(let i = 0;i < this.TileSizeY * this.SizeY * this.TileSizeX * this.SizeX * 4;i+=4){
            this.StaticImage.data[i] = StaticImageData.data[i];
            this.StaticImage.data[i+1] = StaticImageData.data[i+1];
            this.StaticImage.data[i+2] = StaticImageData.data[i+2];
            this.StaticImage.data[i+3] = StaticImageData.data[i+3];
        }
        MainSceneBackBufferContext.clearRect(0,0,this.TileSizeX * this.SizeX, this.TileSizeY * this.SizeY);
    }
} 