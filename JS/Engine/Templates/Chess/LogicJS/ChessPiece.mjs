import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";

export class ChessPiece extends ENGINE.Sprite{
    constructor(SpriteTexture = undefined,PosX = undefined,PosY = undefined,Team = undefined){
        super(SpriteTexture,PosX,PosY);
        this.Team = this.Team;
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
    //Team set/get
    set Team(NewTeam){
        this._Team = NewTeam;
    }
    get Team(){
        return this._Team;
    }
    //Functions
    Clone(){
        return new ChessPiece(this.Texture,this.PositionX,this.PositionY,this.Team);
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
    Move(NewPosY,NewPosX){
        if(this.IsCanMove()){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            return true;
        }   
        return false;
    }
    IsCanMove(){
        return true;
    }
}