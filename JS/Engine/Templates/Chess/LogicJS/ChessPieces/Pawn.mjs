import * as LOCALCONST from "../GameData/LocalConstants.mjs";
import { ChessPiece } from "./ChessPiece.mjs";
import { IsLineEmpty } from "./ChessPiece.mjs";

export class Pawn extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
        this.AlreadyMoved = false;
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new Pawn(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
    }
    async Move(NewPosY,NewPosX){
        if(await this.IsCanMove(NewPosY,NewPosX)){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            this.CoordinatesX = this.GetSizeX() * NewPosX;
            this.CoordinatesY = this.GetSizeY() * NewPosY;
            this.AlreadyMoved = true;
            return true;
        }   
        return false;
    }
    async Place(PosY,PosX){
        super.Place(PosY,PosX);
    }
    async IsCanMove(NewPosY,NewPosX){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let OffsetY = this.PositionY - NewPosY;
        let OffsetX = this.PositionX - NewPosX;
        if((Math.abs(OffsetY) == 1 || Math.abs(OffsetY) == 2) && (OffsetX == 0 || Math.abs(OffsetX) == 1)){
            if(Math.abs(OffsetY) == 2){
                if(OffsetX == 0){
                    if(this.AlreadyMoved == false){
                        if(NewTileData !== undefined){
                            if(NewTileData.Team !== this.Team){
                                if(NewTileData.Type != "King"){
                                    return true;
                                }
                            }
                        }else{
                            return true;
                        }
                    }
                }
            }else{
                if(OffsetX == 0){
                    if(NewTileData === undefined){
                        return true;
                    }
                }else{
                    if(NewTileData !== undefined){
                        if(NewTileData.Team !== this.Team){
                            if(NewTileData.Type != "King"){
                                return true;
                            }
                        }
                    }
                }
            }
        }
    return false;
    }
    async IsAttacking(PosY,PosX){
        let OffsetY = this.PositionY - PosY;
        let OffsetX = this.PositionX - PosX;
        if((Math.abs(OffsetY) == 1) && (Math.abs(OffsetX) == 1)){
            if(Math.abs(OffsetX) == 1){
                return true; 
            }
        }
    return false;
    }
}