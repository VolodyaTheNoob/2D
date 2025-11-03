import * as LOCALCONST from "./LocalConstants.mjs"

export async function GetClickedCheesPiece(ClickedBoardTile){
    return LOCALCONST.GamePiecesTileMap.GetTiles()[ClickedBoardTile["Y"]][ClickedBoardTile["X"]];
}

export async function IsTileAttacked(PosY,PosX,AttackingTeam) {
    let AttackingPiaces = await GetPiacesByTeam(AttackingTeam);
    for(let x = 0; x < LOCALCONST.ChessBoardSize;x++){
        if(await AttackingPiaces[x].IsCanMove(PosY,PosX) == true){
            return true;
        }
    }
    return false;
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