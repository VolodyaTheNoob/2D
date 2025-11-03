import * as ENGINE from "../../../Chess/EngineImports.mjs";
import * as LOCALCONST from ".././LocalConstants.mjs";
import { ChessPiece } from "../ChessPiece.mjs";

export class Knight extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new Knight(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
    }
    async Move(NewPosY,NewPosX){
        if(await this.IsCanMove(NewPosY,NewPosX)){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            this.CoordinatesX = this.GetSizeX() * NewPosX;
            this.CoordinatesY = this.GetSizeY() * NewPosY;
            return true;
        }   
        return false;
    }
    async IsCanMove(NewPosY,NewPosX){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let OffsetY = Math.abs(this.PositionY - NewPosY);
        let OffsetX = Math.abs(this.PositionX - NewPosX);
        if((OffsetX == 1 && OffsetY == 2) || (OffsetX == 2 && OffsetY == 1)){
            if(NewTileData === undefined){
                 return true;
            }
            if(NewTileData.Team != this.Team){
                if(NewTileData.Type != "King"){
                    return true;
                }
            }
        }
        
        return false;
    }
}