export class Sprite{
    constructor(SpriteTexture = undefined, PosX = undefined,PosY = undefined){
        this.Texture = SpriteTexture;
        if(SpriteTexture !== undefined){
            this.SizeX = SpriteTexture.SizeX;
            this.SizeY = SpriteTexture.SizeY;
        }else{
            this.SizeX = undefined;
            this.SizeY = undefined;
        }
        this.PositionX = PosX;
        this.PositionY = PosY;
    }
    //Copy constructor
    Clone() {
        return new Sprite(this.Texture,this.PositionX,this.PositionY);
    }
    //Texture set/get
    set Texture(NewTexture){
        this._Texture = NewTexture;
    }
    get Texture(){
        return this._Texture;
    }
    //SizeX set/get
    set SizeX(NewSizeX){
        this._SizeX = NewSizeX;
    }
    get SizeX(){
        return this._SizeX;
    }
    //SizeY set/get
    set SizeY(NewSizeY){
        this._SizeY = NewSizeY;
    }
    get SizeY(){
        return this._SizeY;
    }
    //PositionX set/get
    set PositionX(NewPositionX){
        this._PositionX = NewPositionX;
    }
    get PositionX(){
        return this._PositionX;
    }
    //PositionY set/get
    set PositionY(NewPositionY){
        this._PositionY = NewPositionY;
    }
    //Functions
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