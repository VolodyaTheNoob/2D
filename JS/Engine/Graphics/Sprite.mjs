export class Sprite{
    constructor(SpriteTexture, PosX = undefined,PosY = undefined){
        this.Texture = SpriteTexture;
        this.SizeX = SpriteTexture.SizeX;
        this.SizeY = SpriteTexture.SizeY;
        this.PositionX = PosX;
        this.PositionY = PosY;
    }
    GetTexture(){
        return this.Texture.GetTexture();
    }
    SetTexture(NewTexture){
        this.Texture = NewTexture;
    }
    GetPosition(){
        return [this.PositionX,this.PositionY];
    }
    SetPosition(X,Y){
        this.PositionX = X;
        this.PositionY = Y;
    }
    GetX(){
        return this.PositionX;
    }
    GetY(){
        return this.PositionY;
    }
    SetX(X){
        this.PositionX = X;
    }
    SetY(Y){
        this.PositionY = Y;
    }
    GetSize(){
        return this.Texture.GetSize();
    }
    GetSizeX(){
        return this.Texture.GetSizeX();
    }
    GetSizeY(){
        return this.Texture.GetSizeY();
    }
}