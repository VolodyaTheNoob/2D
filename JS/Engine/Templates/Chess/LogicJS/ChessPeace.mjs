import * as ENGINE from "../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";

export class ChessPeace extends ENGINE.Sprite{
    constructor(SpriteTexture = undefined,PosX = undefined,PosY = undefined,Team = undefined){
        super(SpriteTexture,PosX,PosY);
        this.Team = this.Team;
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
    SetPosition(X,Y){
        super.SetPosition(X,Y);
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