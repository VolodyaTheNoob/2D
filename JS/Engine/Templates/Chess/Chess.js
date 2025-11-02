import * as ENGINE from "./EngineImports.mjs";
import * as LOCALCONST from "./LogicJS/LocalConstants.mjs";
import { ResizeCanvasToChessBoard } from "./LogicJS/Visual.mjs";
import {PlayerInput, UserInput} from "./LogicJS/UserInput.mjs"
import { RenderTileMap, SmartRender } from "./LogicJS/GameRender.mjs";

let lastTimestamp = 0;

export async function Chess(){
    //Loading all dynamic constants
    await LOCALCONST.LoadAllDynamicConstants();
    //creating visual
    ResizeCanvasToChessBoard(LOCALCONST.ChessBoardSize,ENGINE.CONST.SizeX,ENGINE.CONST.SizeY);
    //creating chessboard render
    const ChessBoardRender = new ENGINE.Render(LOCALCONST.TileMap,RenderTileMap);
    const ChessPiecesRender = new ENGINE.Render(LOCALCONST.GamePiecesTileMap,SmartRender,LOCALCONST.TileMap);
    let FocusedPiece
    async function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        if(PlayerInput.IsMouseDown){
            let ClickedTile = PlayerInput.ClickedBoardTile;
            if(FocusedPiece === undefined){
                FocusedPiece = await GetClickedCheesPiece(ClickedTile);   
                console.log(1)
            }else{
                await MovePieceWithClick(FocusedPiece,ClickedTile);
                FocusedPiece = undefined;
                console.log(2)
            }
           
        }
        //
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);

        ChessBoardRender.Render();
        ChessPiecesRender.Render();
        setTimeout(()=>{requestAnimationFrame(gameLoop)},100);
        
    }

    requestAnimationFrame(gameLoop);
}
Chess();

async function GetClickedCheesPiece(ClickedBoardTile){
    return LOCALCONST.GamePiecesTileMap.GetTiles()[ClickedBoardTile["Y"]][ClickedBoardTile["X"]];
}
async function MovePieceWithClick(FocusedPiece,ClickedTile){
    let PrevPosX = FocusedPiece.GetX();
    let PrevPosY = FocusedPiece.GetY();
    console.log(PrevPosY,PrevPosX)
    console.log(FocusedPiece);
    FocusedPiece.Move(ClickedTile["Y"],ClickedTile["X"]);
    LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
    LOCALCONST.GamePiecesTileMap.SetTileByIndex(ClickedTile["Y"],ClickedTile["X"],FocusedPiece);
    console.log(ClickedTile["Y"],ClickedTile["X"]);
    console.log(FocusedPiece);
}
async function MovePieceWithFocus(FocusedPiece){
    
}

