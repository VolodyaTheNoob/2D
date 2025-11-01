import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";
import {CONST} from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs";
import { ChessPeace } from "./ChessPeace.mjs";

//Constants
//GameDeffaultSizes
export const [SizeX,SizeY] = [CONST.SizeX,CONST.SizeY];
//Default board colors
const FirstColor = new ENGINE.RGBA(50,50,50,255);
export let FirstColorImage;
export let FirstColorTexture;
const SecondColor = new ENGINE.RGBA(200,200,200,255);
export let SecondColorImage;
export let SecondColorTexture;

export let FirstTile;
export let SecondTile;
export const ChessBoardSize = 8;
export let Tiles;
export let TileMap;
//White Peaces
//White King
const WhiteKingSRC = "../../../../../Textures/ChessPeaces/w-king.png";
export const WhiteKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteKing = new ChessPeace(undefined,0,0,0);
//White Queen
const WhiteQueenSRC = "../../../../../Textures/ChessPeaces/w-queen.png";
export const WhiteQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteQueen = new ChessPeace(undefined,0,0,0);
//White Rook
const WhiteRookSRC = "../../../../../Textures/ChessPeaces/w-rook.png";
export const WhiteRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteRook = new ChessPeace(undefined,0,0,0);
//White Bishop
const WhiteBishopSRC = "../../../../../Textures/ChessPeaces/w-bishop.png" ;
export const WhiteBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteBishop = new ChessPeace(undefined,0,0,0);
//White Knight
const WhiteKnightSRC = "../../../../../Textures/ChessPeaces/w-knight.png";
export const WhiteKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhiteKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhiteKnight = new ChessPeace(undefined,0,0,0);
//White Pawn
const WhitePawnSRC = "../../../../../Textures/ChessPeaces/w-pawn.png";
export const WhitePawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const WhitePawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const WhitePawn = new ChessPeace(undefined,0,0,0);
//Black Peaces
//Black King
const BlackKingSRC = "../../../../../Textures/ChessPeaces/b-king.png";
export const BlackKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackKing = new ChessPeace(undefined,0,0,0);
//Black Queen
const BlackQueenSRC = "../../../../../Textures/ChessPeaces/b-queen.png";
export const BlackQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackQueen = new ChessPeace(undefined,0,0,0);
//Black Rook
const BlackRookSRC = "../../../../../Textures/ChessPeaces/b-rook.png";
export const BlackRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackRook = new ChessPeace(undefined,0,0,0);
//Black Bishop
const BlackBishopSRC = "../../../../../Textures/ChessPeaces/b-bishop.png";
export const BlackBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackBishop = new ChessPeace(undefined,0,0,0);
//Black Knight
const BlackKnightSRC = "../../../../../Textures/ChessPeaces/b-knight.png"
export const BlackKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackKnight = new ChessPeace(undefined,0,0,0);
//Black Pawn
const BlackPawnSRC = "../../../../../Textures/ChessPeaces/b-pawn.png"
export const BlackPawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY);
export const BlackPawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY);
export const BlackPawn = new ChessPeace(undefined,0,0,0);
//Loaders
export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",CONST.CreateGraphicsConstants);
//Dynamic constants
export async function CreateChessBoardData(){
    //CreatingChessBoard
    FirstColorImage = new ENGINE.ColorImage(FirstColor,SizeX,SizeY)
    FirstColorTexture = new ENGINE.Texture(FirstColorImage,SizeX,SizeY);
    FirstTile = new ENGINE.Tile(FirstColorTexture,SizeX,SizeY);
    SecondColorImage = new ENGINE.ColorImage(SecondColor,SizeX,SizeY)
    SecondColorTexture = new ENGINE.Texture(SecondColorImage,SizeX,SizeY);
    SecondTile = new ENGINE.Tile(SecondColorTexture,SizeX,SizeY);
    Tiles = [
        [FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile],
        [SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile],
        [FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile],
        [SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile],
        [FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile],
        [SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile],
        [FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile],
        [SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile,SecondTile,FirstTile]
    ];
    TileMap = new ENGINE.TileMap([CONST.SizeX,CONST.SizeY],[ChessBoardSize,ChessBoardSize],Tiles);
}

export async function LoadChessTextures(){
    //WhitePeaces
    //King
    await WhiteKingImage.CreateImage(await ENGINE.LoadImage(WhiteKingSRC));
    await WhiteKingTexture.SetTexture(WhiteKingImage);
    await WhiteKing.SetTexture(WhiteKingTexture);
    //Queen
    await WhiteQueenImage.CreateImage(await ENGINE.LoadImage(WhiteQueenSRC));
    await WhiteQueenTexture.SetTexture(WhiteQueenImage);
    await WhiteQueen.SetTexture(WhiteQueenTexture);
    //Rook
    await WhiteRookImage.CreateImage(await ENGINE.LoadImage(WhiteRookSRC));
    await WhiteRookTexture.SetTexture(WhiteRookImage);
    await WhiteRook.SetTexture(WhiteRookTexture);
    //Bishop
    await WhiteBishopImage.CreateImage(await ENGINE.LoadImage(WhiteBishopSRC));
    await WhiteBishopTexture.SetTexture(WhiteBishopImage);
    await WhiteBishop.SetTexture(WhiteBishopTexture);
    //Knight
    await WhiteKnightImage.CreateImage(await ENGINE.LoadImage(WhiteKnightSRC));
    await WhiteKnightTexture.SetTexture(WhiteKnightImage);
    await WhiteKnight.SetTexture(WhiteKnightImage);
    //Pawn
    await WhitePawnImage.CreateImage(await ENGINE.LoadImage(WhitePawnSRC));
    await WhitePawnTexture.SetTexture(WhitePawnImage);
    await WhitePawn.SetTexture(WhitePawnImage);
    //BlackPeaces
    //King
    await BlackKingImage.CreateImage(await ENGINE.LoadImage(BlackKingSRC));
    await BlackKingTexture.SetTexture(BlackKingImage);
    await BlackKing.SetTexture(BlackKingTexture);
    //Queen
    await BlackQueenImage.CreateImage(await ENGINE.LoadImage(BlackQueenSRC));
    await BlackQueenTexture.SetTexture(BlackQueenImage);
    await BlackQueen.SetTexture(BlackQueenTexture);
    //Rook
    await BlackRookImage.CreateImage(await ENGINE.LoadImage(BlackRookSRC));
    await BlackRookTexture.SetTexture(BlackRookImage);
    await BlackRook.SetTexture(BlackRookTexture);
    //Bishop
    await BlackBishopImage.CreateImage(await ENGINE.LoadImage(BlackBishopSRC));
    await BlackBishopTexture.SetTexture(BlackBishopImage);
    await BlackBishop.SetTexture(BlackBishopTexture);
    //Knight
    await BlackKnightImage.CreateImage(await ENGINE.LoadImage(BlackKnightSRC));
    await BlackKnightTexture.SetTexture(BlackKnightImage);
    await BlackKnight.SetTexture(BlackKnightTexture);
    //Pawn
    await BlackPawnImage.CreateImage(await ENGINE.LoadImage(BlackPawnSRC));
    await BlackPawnTexture.SetTexture(BlackPawnImage);
    await BlackPawn.SetTexture(BlackPawnTexture);
}

export const ConstantsModulePromise = ConstantsLoader.LoadModule;

//Loaders wrap
export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();
        await CreateChessBoardData();
        await LoadChessTextures();
    }catch(error){
        console.log(error);
    }
}