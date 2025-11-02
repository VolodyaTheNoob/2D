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

    let FocusedPiece
    async function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        //GameLogic
        if(PlayerInput.IsMouseDown){
            let ClickedTile = PlayerInput.ClickedBoardTile;
            if(FocusedPiece === undefined){
                FocusedPiece = await GetClickedCheesPiece(ClickedTile);   
            }else{
                await MovePieceWithFocus(FocusedPiece);
                FocusedPiece = undefined;
            }
           
        }
        //
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);

        setTimeout(()=>{requestAnimationFrame(gameLoop)},100);
        
    }
    LOCALCONST.ChessBoardRender.Render();
    LOCALCONST.ChessPiecesRender.Render();
   // requestAnimationFrame(gameLoop);
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
    LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
    let PrevAnimCoordX;
    let PrevAnimCoordY;
    let AnimationPieceCoordinatesX
    let AnimationPieceCoordinatesY  
    async function RenderMoveAnimation(FocusedPiece){
        PrevAnimCoordX = PlayerInput.ClickedBoardCalculatedCoordinates["X"];
        PrevAnimCoordY = PlayerInput.ClickedBoardCalculatedCoordinates["Y"];  
       await AnimateChessPieceMove(FocusedPiece);
    }

    async function AnimateChessPieceMove(FocusedPiece){
        let AnimationPieceCoordinatesX = PlayerInput.ClickedBoardCalculatedCoordinates["X"];
        let AnimationPieceCoordinatesY = PlayerInput.ClickedBoardCalculatedCoordinates["Y"]; 
        if(AnimationPieceCoordinatesX != PrevAnimCoordX && AnimationPieceCoordinatesY != PrevAnimCoordY){
            await ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
            await LOCALCONST.ChessBoardRender.Render();
            await LOCALCONST.ChessPiecesRender.Render(); 
        }
        await ENGINE.CONST.MainSceneContext.putImageData(FocusedPiece.GetTexture(),AnimationPieceCoordinatesX,AnimationPieceCoordinatesY);
        PrevAnimCoordY = AnimationPieceCoordinatesY;
        PrevAnimCoordX = AnimationPieceCoordinatesX;
        setTimeout(()=>{AnimateChessPieceMove(FocusedPiece)},100);
        

    }
    await RenderMoveAnimation(FocusedPiece);

    if(FocusedPiece.Move(NewPosX,NewPosY)){  
        //LOCALCONST.GamePiecesTileMap.SetTileByIndex(PlayerInput.CurrentBoardTile["Y"],PlayerInput.CurrentBoardTile["X"],FocusedPiece);
    }else{
       // LOCALCONST.GamePiecesTileMap.SetTileByIndex(PrevPosY,PrevPosX,FocusedPiece);
    }
}


