import * as LOCALCONST from "../GameData/LocalConstants.mjs";
import { ChessPiece } from "./ChessPiece.mjs";
import { IsLineEmpty } from "./ChessPiece.mjs";

export class Queen extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new Queen(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
    }
    async Move(NewPosY,NewPosX){
        if(await this.IsCanMove(NewPosY,NewPosX) === true){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            this.CoordinatesX = this.GetSizeX() * NewPosX;
            this.CoordinatesY = this.GetSizeY() * NewPosY;
            return true;
        }   
        return false;
    }    
    async Place(PosY,PosX){
        super.Place(PosY,PosX);
    }
    async IsCanMove(NewPosY,NewPosX){
        if((await this.IsCanMoveStraight(NewPosY,NewPosX) === true) || (await this.IsCanMoveDiagonal(NewPosY,NewPosX) === true)){
            return true;
        }
        return false;
    }
    async IsCanMoveStraight(NewPosY,NewPosX){
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
    async IsCanMoveDiagonal(NewPosY, NewPosX){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let OffsetY = Math.abs(this.PositionY - NewPosY);
        let OffsetX = Math.abs(this.PositionX - NewPosX);
        if(OffsetX == OffsetY){
            if(OffsetX != 0 && OffsetY != 0){ // One parameter - is enough
                if(OffsetX == 1 && OffsetY == 1){
                    if(NewTileData == undefined){
                        return true;
                    }else{
                        if(NewTileData.Team != this.Team){
                            if(NewTileData.Type != "King"){
                                return true;
                            }
                        }
                    }
                }else{
                    OffsetY = this.PositionY - NewPosY;
                    OffsetX = this.PositionX - NewPosX;
                    if(OffsetY < 0){
                        OffsetY = 1;
                    }else{
                        OffsetY = -1;
                    }
                    if(OffsetX < 0){
                        OffsetX = 1;
                    }else{
                        OffsetX = -1;
                    }
                    if(NewTileData === undefined){
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
                }
            }
        }
        return false;
    }
    async IsAttacking(PosY,PosX){
        if((await this.IsAttackingStraight(PosY,PosX)) || (await this.IsAttackingDiagonal(PosY,PosX)) == true){
            return true;
        }
        return false;
    }

    async IsAttackingStraight(PosY,PosX){
        let OffsetY = Math.abs(this.PositionY - PosY);
        let OffsetX = Math.abs(this.PositionX - PosX);
        if((OffsetX == 0 && OffsetY != 0) || (OffsetX != 0 && OffsetY == 0)){
            if(OffsetX > 1 || OffsetY > 1){
                if(this.PositionY - PosY != 0){
                    if(this.PositionY - PosY > 0){
                        OffsetY = -1;
                    }else{
                        OffsetY = 1
                    }       
                    OffsetX = 0;
                }else{
                    if(this.PositionX - PosX > 0){
                        OffsetX = -1;
                    }else{ 
                        OffsetX = 1;
                    }
                    OffsetY = 0;
                }
                if(await IsLineEmpty(this.PositionY,this.PositionX,PosY + (OffsetY * -1),PosX + (OffsetX * -1),OffsetY,OffsetX)){
                    return true;
                }
            }else{
                    return true; 
            }
        }     
        return false;
    }
    async IsAttackingDiagonal(PosY,PosX){
        let OffsetY = Math.abs(this.PositionY - PosY);
        let OffsetX = Math.abs(this.PositionX - PosX);
        if(OffsetX == OffsetY){
            if(OffsetX != 0 && OffsetY != 0){ // One parameter - is enough
                if(OffsetX == 1 && OffsetY == 1){
                    return true;
                }else{
                    OffsetY = this.PositionY - PosY;
                    OffsetX = this.PositionX - PosX;
                    if(OffsetY < 0){
                        OffsetY = 1;
                    }else{
                        OffsetY = -1;
                    }
                    if(OffsetX < 0){
                        OffsetX = 1;
                    }else{
                        OffsetX = -1;
                    }
                    if(await IsLineEmpty(this.PositionY,this.PositionX,PosY + (OffsetY * -1),PosX + (OffsetX * -1),OffsetY,OffsetX)){
                        return true;
                    }else{
                        if(await IsLineEmpty(this.PositionY,this.PositionX,PosY + (OffsetY * -1),PosX + (OffsetX * -1),OffsetY,OffsetX)){
                            return true;
                        }                            
                    }
                }
            }
        }
        return false;
    }
}

