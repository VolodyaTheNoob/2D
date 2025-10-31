import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";
import {CONST} from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs";
import { ChessPeace } from "./ChessPeace.mjs";

//Constants
export const [SizeX,SizeY] = [CONST.SizeX,CONST.SizeY];
export let BlackTile;
export let WhiteTile;
export const ChessBoardSize = 8;
export let Tiles;
export let BlackWihteTileMap;
//WhitePeaces
export const WhiteKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteKing = new ChessPeace(undefined,0,0,0);

export const WhiteQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteQueen = new ChessPeace(undefined,0,0,0);

export const WhiteRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteRook = new ChessPeace(undefined,0,0,0);

export const WhiteBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteBishop = new ChessPeace(undefined,0,0,0);

export const WhiteKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteKnight = new ChessPeace(undefined,0,0,0);

export const WhitePawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhitePawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhitePawn = new ChessPeace(undefined,0,0,0);
//BlackPeaces
export const BlackKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackKing = new ChessPeace(undefined,0,0,0);

export const BlackQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackQueen = new ChessPeace(undefined,0,0,0);

export const BlackRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackRook = new ChessPeace(undefined,0,0,0);

export const BlackBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackBishop = new ChessPeace(undefined,0,0,0);

export const BlackKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackKnight = new ChessPeace(undefined,0,0,0);

export const BlackPawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackPawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackPawn = new ChessPeace(undefined,0,0,0);
//Loaders
export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",CONST.CreateGraphicsConstants);
export const LocalConstLoader = new ModuleLoader("./Templates/Chess/LogicJS/LocalConstants.mjs",CreateLocalConstants);

//Dynamic constants
export async function CreateLocalConstants(){
    //CreatingChessBoard
    BlackTile = new ENGINE.Tile(CONST.BlackTexture,CONST.SizeX,CONST.SizeY);
    WhiteTile = new ENGINE.Tile(CONST.WhiteTexture,CONST.SizeX,CONST.SizeY);
    Tiles = [
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile],
        [BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile],
        [WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile,WhiteTile,BlackTile]
    ];
    BlackWihteTileMap = new ENGINE.TileMap([CONST.SizeX,CONST.SizeY],[ChessBoardSize,ChessBoardSize],Tiles);
}

export async function LoadChessTextures(){
    //WhitePeaces
    //King
    await WhiteKingImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhiteKing.png"));
    await WhiteKingTexture.SetTexture(WhiteKingImage);
    await WhiteKing.SetTexture(WhiteKingTexture);
    console.log(WhiteKing);
    //Queen
    await WhiteQueenImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhiteQueen.png"));
    await WhiteQueenTexture.SetTexture(WhiteQueenImage);
    //Rook
    await WhiteRookImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhiteRook.png"));
    await WhiteRookTexture.SetTexture(WhiteRookImage);
    //Bishop
    await WhiteBishopImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhiteBishop.png"));
    await WhiteBishopTexture.SetTexture(WhiteBishopImage);
    //Knight
    await WhiteKnightImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhiteKnight.png"));
    await WhiteKnightTexture.SetTexture(WhiteKnightImage);
    //Pawn
    await WhitePawnImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/WhitePawn.png"));
    await WhitePawnTexture.SetTexture(WhitePawnImage);
    //BlackPeaces
    //King
    await BlackKingImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackKing.png"));
    await BlackKingTexture.SetTexture(BlackKingImage);
    //Queen
    await BlackQueenImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackQueen.png"));
    await BlackQueenTexture.SetTexture(BlackQueenImage);
    //Rook
    await BlackRookImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackRook.png"));
    await BlackRookTexture.SetTexture(BlackRookImage);
    //Bishop
    await BlackBishopImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackBishop.png"));
    await BlackBishopTexture.SetTexture(BlackBishopImage);
    //Knight
    await BlackKnightImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackKnight.png"));
    await BlackKnightTexture.SetTexture(BlackKnightImage);
    //Pawn
    await BlackPawnImage.CreateImage(await ENGINE.LoadImage("../../../../../Textures/ChessPeaces/BlackPawn.png"));
    await BlackPawnTexture.SetTexture(BlackPawnImage);
}

export const ConstantsModulePromise = ConstantsLoader.LoadModule;
export const LocalConstantsModulePromise = LocalConstLoader.LoadModule;

//Loaders wrap
export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();
        await LocalConstLoader.LoadModule();
        await LoadChessTextures();
    }catch(error){
        console.log(error);
    }
}