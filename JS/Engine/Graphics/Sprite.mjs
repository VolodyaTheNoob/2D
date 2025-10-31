export class Sprite{
    constructor(SpriteTexture = undefined, PosX = undefined,PosY = undefined){
        this.Texture = SpriteTexture;
        if(SpriteTexture !== undefined){
            this.SizeX = SpriteTexture.SizeX;
            this.SizeY = SpriteTexture.SizeY;
        }
        this.PositionX = PosX;
        this.PositionY = PosY;
    }
    GetTexture(){
        if(this.Texture !== undefined){
            return this.Texture.GetTexture();
        }
    }
    async SetTexture(NewTexture){
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