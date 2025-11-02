import { Sprite } from "../Graphics/Graphics.mjs";

//Just base class for Tiles

export class Tile extends Sprite{
    constructor(TileTexture,PosY = undefined,PosX = undefined) {
        super(TileTexture,PosY,PosX);
    }
    set Texture(NewTexture){
        super.Texture = NewTexture;
    }
    get Texture(){
        return super.Texture;
    }
    //SizeX set/get
    set SizeX(NewSizeX){
        super.SizeX = NewSizeX;
    }
    get SizeX(){
        return super.SizeX;
    }
    //SizeY set/get
    set SizeY(NewSizeY){
        super.SizeY = NewSizeY;
    }
    get SizeY(){
        return super.SizeY;
    }
    //PositionX set/get
    set PositionX(NewPositionX){
        super.PositionX = NewPositionX;
    }
    get PositionX(){
        return super.PositionX;
    }
    //PositionY set/get
    set PositionY(NewPositionY){
        super.PositionY = NewPositionY;
    }
    get PositionY(){
        return super.PositionY;
    }
    Clone(NewPosY = this.PositionX,NewPosX = this.PositionY){
        return new Tile(this.Texture,NewPosY,NewPosX);
    }
    GetTexture(){
        return super.GetTexture();
    }
    async SetTexture(NewTexture){
        await super.SetTexture(NewTexture);
    }
    GetPosition(){
        return super.GetPosition();
    }
    SetPosition(Y,X){
        super.SetPosition(Y,X);
    }
    GetX(){
       return super.GetX();
    }
    GetY(){
        return super.GetY();
    }
    SetX(X){
        super.SetX(X);
    }
    SetY(Y){
        super.SetY(Y);
    }
    GetSize(){
       return super.GetSize();
    }
    GetSizeX(){
        return super.GetSizeX();
    }
    GetSizeY(){
        return super.GetSizeY();
    }
}