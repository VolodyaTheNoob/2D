import * as ENGINE from "../../EngineImports.mjs"; 
import * as LOCALCONST from "../GameData/LocalConstants.mjs";

export class ChessPiece extends ENGINE.Sprite{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX);
        this.Team = _Team;
        this.Type = _Type;
    }
        //Texture set/get
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
        //CoorinatesX set/get
    set CoordinatesX(NewCoordinatesX){
        super.CoordinatesX = NewCoordinatesX;
    }
    get CoordinatesX(){
        return super.CoordinatesX;
    }
    //CoorinatesY set/get
    set CoorinatesY(NewCoordinatesY){
        super.CoordinatesY = NewCoordinatesY;
    }
    get CoorinatesY(){
        return super.CoordinatesY;
    }
    //Team set/get
    set Team(NewTeam){
        this._Team = NewTeam;
    }
    get Team(){
        return this._Team;
    }
    //Type set/get
    set Type(NewType){
        this._Type = NewType;
    }
    get Type(){
        return this._Type;
    }
    //Functions
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new ChessPiece(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
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
    GetCoordinatesX(){
        return super.GetCoordinatesX();
    }
    GetCoordinatesY(){
        return super.GetCoordinatesY();
    }
    SetCoordinatesX(X){
        super.SetCoordinatesX(X);
    }
    SetCoordinatesY(Y){
        super.SetCoordinatesY(Y);
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
    GetType(){
        return this.Type;
    }
    SetType(NewType){
        this.Type = NewType;
    }
    async Move(NewPosY,NewPosX){
        if(this.IsCanMove()){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            this.CoordinatesX = this.GetSizeX() * NewPosX;
            this.CoordinatesY = this.GetSizeY() * NewPosY;
            return true;
        }   
        return false;
    }
    async IsCanMove(){
        return true;
    }
    async IsAttacking(){
        return await this.IsCanMove();
    }
}

export async function IsLineEmpty(StartY,StartX,EndY,EndX,OffsetY,OffsetX){
    let TilesData = LOCALCONST.GamePiecesTileMap.GetTiles();
    let CurrentY = StartY;
    let CurrentX = StartX;
    if(OffsetY === 0){
        while(CurrentX != EndX){
            CurrentX += OffsetX;
            if(TilesData[CurrentY][CurrentX] !== undefined){
                return false;
            }
        }
    }
    if(OffsetX === 0){
        while(CurrentY != EndY){
            CurrentY += OffsetY;
            if(TilesData[CurrentY][CurrentX] !== undefined){
                return false;
            }
        }
    }
    if(OffsetX !== 0 && OffsetY !== 0){
        while(CurrentY != EndY && CurrentX != EndX){
            CurrentY += OffsetY;
            CurrentX += OffsetX
            if(TilesData[CurrentY][CurrentX] !== undefined){
                return false;
            }
        }
    }
    return true;
}