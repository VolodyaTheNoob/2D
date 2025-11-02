
//Basic TileMapClass - in future its will be base class for Advanced TileMaps

export class TileMap{
    constructor(TileSize,TileMapSize, Tiles){
        [this.TileSizeY,this.TileSizeX] = TileSize;
        [this.SizeY,this.SizeX] = TileMapSize;
        this.Tiles = Tiles;
    }
    GetTiles(){
        return this.Tiles;
    }
    GetTileByIndex(Y,X){
        return this.Tiles[Y][X];
    }
    SetTileMap(NewTileMap){
        this.Tiles = NewTileMap;
    }
    SetTileByIndex(Y,X,NewTile){
        this.Tiles[Y][X] = NewTile;
    }
}