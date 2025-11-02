export class Sprite{
    constructor(SpriteTexture = undefined, PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined){
        this.Texture = SpriteTexture;
        if(SpriteTexture !== undefined){
            this.SizeX = SpriteTexture.SizeX;
            this.SizeY = SpriteTexture.SizeY;
        }else{
            this.SizeX = undefined;
            this.SizeY = undefined;
        }
        this.CoordinatesX = CoordX;
        this.CoordinatesY = CoordY;
        this.PositionX = PosX;
        this.PositionY = PosY;
    }
    //Copy constructor
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX) {
        return new Sprite(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX);
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
    get PositionY(){
        return this._PositionY;
    }
    //CoorinatesX set/get
    set CoordinatesX(NewCoordinatesX){
        this._CoordinatesX = NewCoordinatesX;
    }
    get CoordinatesX(){
        return this._CoordinatesX;
    }
    //CoorinatesY set/get
    set CoorinatesY(NewCoordinatesY){
        this._CoordinatesY = NewCoordinatesY;
    }
    get CoorinatesY(){
        return this._CoordinatesY;
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
        return [this.PositionY,this.PositionX];
    }
    SetPosition(Y,X){
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
    GetCoordinates(){
        return [this.CoordinatesY,this.CoordinatesX];
    }
    SetCoordinates(Y,X){
        this.CoordinatesY = Y;
        this.CoordinatesX = X;
    }
    GetCoordinatesX(){
        return this.CoordinatesX;
    }
    GetCoordinatesY(){
        return this.CoordinatesY;
    }
    SetCoordinatesX(X){
        this.CoordinatesX = X;
    }
    SetCoordinatesY(Y){
        this.CoordinatesY = Y;
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