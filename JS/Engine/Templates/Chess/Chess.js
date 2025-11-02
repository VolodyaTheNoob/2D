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

    let FocusedPiece = undefined;
    async function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        if(PlayerInput.IsMouseDown === true){
            let ClickedTile = PlayerInput.ClickedBoardTile;
            if(FocusedPiece === undefined){
                FocusedPiece = await GetClickedCheesPiece(ClickedTile);   
            }else{
                await MovePieceWithFocus(FocusedPiece);
                FocusedPiece = undefined;
            }
           
        }
        console.log(FocusedPiece)
        //
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        LOCALCONST.ChessBoardRender.Render();
        LOCALCONST.ChessPiecesRender.Render();
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
    if(FocusedPiece.Move(ClickedTile["Y"],ClickedTile["X"])){
        LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
        LOCALCONST.GamePiecesTileMap.SetTileByIndex(ClickedTile["Y"],ClickedTile["X"],FocusedPiece);
    }
}
async function MovePieceWithFocus(FocusedPiece){
    let PrevPosX = FocusedPiece.GetX();
    let PrevPosY = FocusedPiece.GetY();
    let NewPosX;
    let NewPosY;
    //LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
    let PrevAnimCoordX;
    let PrevAnimCoordY;
    let AnimationPieceCoordinatesX
    let AnimationPieceCoordinatesY  
    async function RenderMoveAnimation(FocusedPiece){
        PrevAnimCoordX = Math.round(PlayerInput.ClickedBoardCalculatedCoordinates["X"]);
        PrevAnimCoordY = Math.round(PlayerInput.ClickedBoardCalculatedCoordinates["Y"]);  
        await AnimateChessPieceMove(FocusedPiece);
        
    }

    async function AnimateChessPieceMove(FocusedPiece){
        AnimationPieceCoordinatesX = Math.round(PlayerInput.ClickedBoardCalculatedCoordinates["X"]);
        AnimationPieceCoordinatesY = Math.round(PlayerInput.ClickedBoardCalculatedCoordinates["Y"]); 
        if(AnimationPieceCoordinatesX != PrevAnimCoordX && AnimationPieceCoordinatesY != PrevAnimCoordY){
            FocusedPiece.SetCoordinates(AnimationPieceCoordinatesY,AnimationPieceCoordinatesX);
        }
        PrevAnimCoordY = AnimationPieceCoordinatesY;
        PrevAnimCoordX = AnimationPieceCoordinatesX;
        if(PlayerInput.IsMouseDown){
            setTimeout(()=>{AnimateChessPieceMove(FocusedPiece)},100);
        }else{
            if(FocusedPiece.Move(NewPosX,NewPosY)){  
                LOCALCONST.GamePiecesTileMap.SetTileByIndex(PlayerInput.CurrentBoardTile["Y"],PlayerInput.CurrentBoardTile["X"],FocusedPiece);
            }else{
                LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,FocusedPiece);
            }
        }
        

    }
    await RenderMoveAnimation(FocusedPiece);
}


