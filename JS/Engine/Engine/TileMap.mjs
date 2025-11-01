
//Basic TileMapClass - in future its will be base class for Advanced TileMaps

export class TileMap{
    constructor(TileSize,TileMapSize, Tiles){
        [this.TileSizeX,this.TileSizeY] = TileSize;
        [this.SizeX,this.SizeY] = TileMapSize;
        this.Tiles = Tiles;
    }
    GetTiles(){
        return this.Tiles;
    }
    GetTileByIndex(X,Y){
        return this.Tiles[Y][X];
    }
    SetTileMap(NewTileMap){
        this.Tiles = NewTileMap;
    }
    SetTileByIndex(X,Y,NewTile){
        this.Tiles[Y][X] = NewTile;
    }
}