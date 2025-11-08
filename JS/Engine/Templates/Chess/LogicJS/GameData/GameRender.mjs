import * as ENGINE from "../../EngineImports.mjs"; 
import * as LOCALCONST from "./LocalConstants.mjs";

export function RenderTileMap(TileMap){
    let _TileMap = TileMap.GetTiles();
    for(let y = 0; y < TileMap.SizeY;y++){
        for(let x = 0; x < TileMap.SizeX;x++){
            ENGINE.CONST.MainSceneContext.putImageData(_TileMap[y][x].Texture.Image.ImageData,_TileMap[y][x].CoordinatesX, _TileMap[y][x].CoordinatesY);
        }
    }
}

export function SmartRender(ChessPieces,TileMap){
    let _TileMap = TileMap.GetTiles();
    let _ChessPieces = ChessPieces.GetTiles();
    for(let y = 0; y < ChessPieces.SizeY;y++){
        for(let x = 0; x < ChessPieces.SizeX;x++){
            if(_ChessPieces[y][x] !== undefined){
                let CurrentTileImageData = _TileMap[y][x].Texture.Image.ImageData;
                let CurrentTileColor = [CurrentTileImageData.data[0],CurrentTileImageData.data[1],CurrentTileImageData.data[2],CurrentTileImageData.data[3]];
                let PieceImageData = _ChessPieces[y][x].Texture.Image.ImageData;
                PieceImageData = BackgroundChanger(CurrentTileColor,PieceImageData,[_ChessPieces[y][x].SizeX,_ChessPieces[y][x].SizeY]);
                ENGINE.CONST.MainSceneContext.putImageData(PieceImageData,_ChessPieces[y][x].CoordinatesX, _ChessPieces[y][x].CoordinatesY);
            }
        }
    }
}

export function BackgroundChanger(TileColor,PieceImageData,[SizeX,SizeY]){
    const PieceColor1= [0,0,0,255]; //for now like constants
    const PieceColor2 = [244,244,244,255]; //for now like constants
    for(let y = 0; y < SizeY;y+=1){
        for(let x = y * SizeX * 4;x < y * SizeX * 4 + SizeX * 4;x+=4){
           if((PieceImageData.data[x] != PieceColor1[0] &&
            PieceImageData.data[x+1] != PieceColor1[1] &&
            PieceImageData.data[x+2] != PieceColor1[2]) && 
            (PieceImageData.data[x] != PieceColor2[0] &&
            PieceImageData.data[x+1] != PieceColor2[1] &&
            PieceImageData.data[x+2] != PieceColor2[2]))
            {
            PieceImageData.data[x] = TileColor[0];
            PieceImageData.data[x+1] = TileColor[1];
            PieceImageData.data[x+2] = TileColor[2];
            PieceImageData.data[x+3] = TileColor[3];
           }
           
        }
    }
    return PieceImageData;
}

//I just will put it in back burner and not use for now - becouse I need more expirience and want to make MVP of this Chess app
//MVP - I mean minimum valiable product, I do it for me just call it like this
export async function MovePieceWithFocus(FocusedPiece){
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
