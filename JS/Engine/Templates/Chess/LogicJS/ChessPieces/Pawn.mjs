import * as ENGINE from "../../../Chess/EngineImports.mjs";
import * as LOCALCONST from ".././LocalConstants.mjs";
import { ChessPiece } from "../ChessPiece.mjs";

export class Pawn extends ChessPiece{
    constructor(SpriteTexture = undefined,PosY = undefined,PosX = undefined,CoordY = undefined,CoordX = undefined,_Team = undefined,_Type = undefined){
        super(SpriteTexture,PosY,PosX,CoordY,CoordX,_Team,_Type);
        this.AlreadyMoved = false;
    }
    Clone(NewPosY = this.PositionY,NewPosX = this.PositionX,NewCoordY = this.CoordinatesY,NewCoordX = this.CoordinatesX){
        return new Pawn(this.Texture,NewPosY,NewPosX,NewCoordY,NewCoordX,this.Team,this.Type);
    }
    Move(NewPosY,NewPosX){
        if(this.IsCanMove(NewPosY,NewPosX)){
            this.PositionX = NewPosX;
            this.PositionY = NewPosY;
            this.CoordinatesX = this.GetSizeX() * NewPosX;
            this.CoordinatesY = this.GetSizeY() * NewPosY;
            this.AlreadyMoved = true;
            return true;
        }   
        return false;
    }
    IsCanMove(NewPosY,NewPosX){
        let NewTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY][NewPosX];
        let Direction = -1 * this.Team;
        if((this.PositionY - NewPosY > Direction && this.Team == 0) || (this.PositionY - NewPosY <= Direction && this.Team == 1)){
            if(Math.abs(this.PositionY - NewPosY) < 3 && Math.abs(this.PositionY - NewPosY) > 0){
                if((this.PositionY - NewPosY == 2 && this.Team == 0) || (this.PositionY - NewPosY == -2 && this.Team == 1)){
                //check for first move and if its something betwen current pos and new pos
                    if(this.PositionX - NewPosX == 0){
                        if(this.AlreadyMoved == false){
                            if(Direction == 0){
                                let BetwenTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY-1][NewPosX];
                                if(BetwenTileData == undefined){
                                    return true;
                                }
                            }else{
                                let BetwenTileData = LOCALCONST.GamePiecesTileMap.GetTiles()[NewPosY-1][NewPosX];
                                if(BetwenTileData == undefined){
                                    return true;
                                }
                            }
                        }
                    }
            }else{
                    if(Math.abs(this.PositionX- NewPosX) == 1){
                        if(NewTileData !== undefined){
                            if(NewTileData.Team != this.Team){
                                if(NewTileData.Type !== "King"){
                                    return true;
                                }
                            }
                        }
                    }
                    if(this.PositionX- NewPosX == 0){
                        if(NewTileData === undefined){
                            return true;
                        }
                    }           
                }
            }
            }
            return false;
    }
}