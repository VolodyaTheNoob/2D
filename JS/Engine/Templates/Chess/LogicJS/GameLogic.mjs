import * as LOCALCONST from "./LocalConstants.mjs"

export async function GetClickedCheesPiece(ClickedBoardTile){
    return LOCALCONST.GamePiecesTileMap.GetTiles()[ClickedBoardTile["Y"]][ClickedBoardTile["X"]];
}

