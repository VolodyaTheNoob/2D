import { Sprite } from "../Graphics/Graphics.mjs";

//Just base class for Tiles

export class Tile extends Sprite{
    constructor(TileTexture,PosX = undefined,PosY = undefined) {
        super(TileTexture,PosX,PosY);
    }
}