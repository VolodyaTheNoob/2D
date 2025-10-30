import { Sprite } from "../Graphics/Graphics.mjs";

export class Tile extends Sprite{
    constructor(TileTexture,PosX = undefined,PosY = undefined) {
        super(TileTexture,PosX,PosY);
    }
}