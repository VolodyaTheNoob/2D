import * as LOCALCONST from "./LocalConstants.mjs";
import { PlayerInput } from "./Player/PlayerInput.mjs";

export async function GetClickedCheesPiece(ClickedBoardTile){
    return LOCALCONST.GamePiecesTileMap.GetTiles()[ClickedBoardTile["Y"]][ClickedBoardTile["X"]];
}

export async function IsTileAttacked(PosY,PosX,AttackingTeam) {
    let AttackingPiaces = await GetPiacesByTeam(AttackingTeam);
    for(let x = 0; x < AttackingPiaces.length;x++){
        if(await AttackingPiaces[x].IsCanMove(PosY,PosX) == true){
            return true;
        }
    }
    return false;
}

export async function GetKingByTeam(Team) {
    let PiacesOfTeam = await GetPiacesByTeam(Team);
    for(let x = 0; x < PiacesOfTeam.length;x++){
        if(PiacesOfTeam[x].Type == "King"){
            return PiacesOfTeam[x];
        }
    }
    return undefined;
}

export async function IsKingAttacked(Team) {
    let King = GetKingByTeam(Team);
    if(await IsTileAttacked(King.PositionY,King.PositionX,await GetEnemyTeam(King.Team)) == true){
        return true
    }
    return false;
}

export async function GetEnemyTeam(Team){
    if(Team == 0){
        return 1;
    }else{
        return 0;
    }
}

export async function GetPiacesByTeam(Team){
    let AllBoardPiaces = LOCALCONST.GamePiecesTileMap.GetTiles();
    let PiacesByTeam = new Array();
    for(let y = 0; y < LOCALCONST.ChessBoardSize;y++){
       for(let x = 0; x < LOCALCONST.ChessBoardSize;x++){ 
            if(AllBoardPiaces[y][x] !== undefined){
                if(AllBoardPiaces[y][x].Team == Team){
                    PiacesByTeam.push(AllBoardPiaces[y][x]);
                }
            }
       }
    }
    return PiacesByTeam;
} 

//For now will be used by default
export async function MovePieceWithClick(FocusedPiece,ClickedTile){
    let PrevPosX = FocusedPiece.GetX();
    let PrevPosY = FocusedPiece.GetY();
    if(FocusedPiece.IsCanMove(ClickedTile["Y"],ClickedTile["X"])){
        FocusedPiece.Move(ClickedTile["Y"],ClickedTile["X"]);
        LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
        LOCALCONST.GamePiecesTileMap.SetTileByIndex(ClickedTile["Y"],ClickedTile["X"],FocusedPiece);
        return true;
    }
    return false;
}

export async function MoveLogic(){
    if(PlayerInput.IsMouseDown === true){
        let ClickedTileCoordinates = PlayerInput.ClickedBoardTile;
        if(PlayerInput.FocusedPiece === undefined){
            PlayerInput.FocusedPiece = await GetClickedCheesPiece(ClickedTileCoordinates);   
        }else{
            let ClickedPiece= await GetClickedCheesPiece(ClickedTileCoordinates);
            if(PlayerInput.FocusedPiece != ClickedPiece){
                if(ClickedPiece !== undefined){
                    if(PlayerInput.FocusedPiece.Team == ClickedPiece.Team){
                        PlayerInput.FocusedPiece = ClickedPiece;
                    }else{
                        let IsMoved =  await MovePieceWithClick(PlayerInput.FocusedPiece,ClickedTileCoordinates);
                        if(IsMoved == true){
                            PlayerInput.FocusedPiece = undefined;
                            return true;
                        } 
                    }
                }else{
                    let IsMoved =  await MovePieceWithClick(PlayerInput.FocusedPiece,ClickedTileCoordinates);
                    if(IsMoved == true){
                        PlayerInput.FocusedPiece = undefined;
                        return true;
                    } 
                }  
            }    
        }
    }
    return false;
}