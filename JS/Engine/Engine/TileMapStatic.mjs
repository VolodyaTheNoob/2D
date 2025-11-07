import {TileMap} from "./TileMap.mjs"

export class TileMapStatic extends TileMap{
    constructor(TileSize,TileMapSize, Tiles){
        super.constructor(TileSize,TileMapSize, Tiles);
        this.Background;
    }
    async Create(){
        this.Background;
    }
} 