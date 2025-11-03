import * as LOCALCONST from "../GameData/LocalConstants.mjs";
import { ChessPiece } from "./ChessPiece.mjs";
import { IsLineEmpty } from "./ChessPiece.mjs";
import { IsTileAttacked } from "../GameData/GameLogic.mjs";

export class King extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
        this.AlreadyMoved = false;
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new King(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
    }
    async Move(NewPosY,NewPosX){
        this.PositionX = NewPosX;
        this.PositionY = NewPosY;
        this.CoordinatesX = this.GetSizeX() * NewPosX;
        this.CoordinatesY = this.GetSizeY() * NewPosY;
        this.AlreadyMoved = true;
    }
    async IsCanMove(NewPosY,NewPosX){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let OffsetY = this.PositionY - NewPosY;
        let OffsetX = this.PositionX - NewPosX;
        let OtherTeam = 0;
        if(this.Team == 0){
            OtherTeam = 1;
        }else{
            OtherTeam = 0;
        }
        if((Math.abs(OffsetY) <= 1) && (Math.abs(OffsetX) <= 1)){
            if(OffsetY != 0 || OffsetX != 0){
                if(await IsTileAttacked(NewPosY,NewPosX,OtherTeam) == false){
                    if(NewTileData === undefined){
                        return true;
                    }else{
                        if(NewTileData.Team != this.Team){
                            return true;
                        }
                    }
                }
            }
        }  
        return false;
    }
    async IsAttacking(){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let OffsetY = this.PositionY - NewPosY;
        let OffsetX = this.PositionX - NewPosX;
        if(Math.abs(OffsetY) == 1 || Math.abs(OffsetX) == 1){
            return true;
        }
    }
}