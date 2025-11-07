import { Sprite } from "../Graphics/Graphics.mjs";
import { Rectangle } from "../Graphics/Rectangle.mjs";

class Object extends Sprite{
    constructor(_Texture,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined){
        this.Rectangle = new Rectangle(PosX,PosY,this.SizeX,this.SizeY);
        super(_Texture,PosY,PosX,CoordY,CoordX);
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