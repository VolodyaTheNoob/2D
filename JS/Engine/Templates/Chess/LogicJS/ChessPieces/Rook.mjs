import * as ENGINE from "../../../Chess/EngineImports.mjs";
import * as LOCALCONST from ".././LocalConstants.mjs";
import { ChessPiece } from "../ChessPiece.mjs";
import { IsLineEmpty } from "../ChessPiece.mjs";

export class Rook extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new Rook(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
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
        if((OffsetX == 0 && OffsetY != 0) || (OffsetX != 0 && OffsetY == 0)){
            if(OffsetX > 1 || OffsetY > 1){
                if(this.PositionY - NewPosY != 0){
                    if(this.PositionY - NewPosY > 0){
                        OffsetY = -1;
                    }else{
                        OffsetY = 1
                    }       
                    OffsetX = 0;
                }else{
                    if(this.PositionX - NewPosX > 0){
                        OffsetX = -1;
                    }else{ 
                        OffsetX = 1;
                    }
                    OffsetY = 0;
                }
                if(NewTileData == undefined){
                    if(await IsLineEmpty(this.PositionY,this.PositionX,NewPosY + (OffsetY * -1),NewPosX + (OffsetX * -1),OffsetY,OffsetX)){
                        return true;
                    }
                }else{
                    if(NewTileData.Team != this.Team){
                        if(NewTileData.Type != "King"){
                            if(await IsLineEmpty(this.PositionY,this.PositionX,NewPosY + (OffsetY * -1),NewPosX + (OffsetX * -1),OffsetY,OffsetX)){
                                return true; 
                            }
                        }
                    }
                }
            }else{
                if(NewTileData == undefined){
                    return true;
                }else{
                    if(NewTileData.Team != this.Team){
                        if(NewTileData.Type != "King"){
                            return true;
                        }
                    }
                }
            }
        }
            
        return false;
    }
}
