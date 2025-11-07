import { Sprite } from "../Graphics/Graphics.mjs";
import { Rectangle } from "../Graphics/Rectangle.mjs";

export class Object extends Sprite{
    constructor(_Texture,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined){
        super(_Texture,PosY,PosX,CoordY,CoordX);
        this.Rectangle = new Rectangle(PosX,PosY,this.SizeX,this.SizeY);
    }
    Clone(){
        return new Object(this.Texture,this.PositionY,this.PositionX,this.CoordinatesY,this.CoordinatesX);
    }
    GetRectangle(){
        return this.Rectangle;
    }
    SetRectangle(NewRect){
        this.Rectangle = NewRect.Clone();
    }
}