import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";
import {CONST} from "../EngineImports.mjs";
import * as ENGINE from "../EngineImports.mjs";
import { ChessPiece } from "./ChessPiece.mjs";

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

export let FirstTile; //ChessBoardTile - 1
export let SecondTile; //ChessBoardTile - 2
export const ChessBoardSize = 8; //ChessBoardSize by X and Y - they Equal in this cases
export let Tiles; //Array of Tiles
export let TileMap; //TileMap class - contains Tiles

export let GamePieces; //Array of PlayblePeaces
export let GamePiecesTileMap; //TileMap class - contains GamePieces

//Pieaces textures(images) folder path
const ChessTexturesFolderPath = "../../../../../Textures/ChessPeaces/"; //cant rename now ChessPeaces->ChessPieces
//White Pieces
//White King
const WhiteKingFileName = "w-king.png";
const WhiteKingSRC = ChessTexturesFolderPath + WhiteKingFileName; //SRC 
export const WhiteKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image class
export const WhiteKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhiteKing = new ChessPiece(undefined,0,0,0); //ChessPiece class
//White Queen
const WhiteQueenFileName = "w-queen.png";
const WhiteQueenSRC = ChessTexturesFolderPath + WhiteQueenFileName; //SRC
export const WhiteQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const WhiteQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhiteQueen = new ChessPiece(undefined,0,0,0); //ChessPiece class
//White Rook
const WhiteRookFileName = "w-rook.png";
const WhiteRookSRC = ChessTexturesFolderPath + WhiteRookFileName; //SRC
export const WhiteRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const WhiteRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhiteRook = new ChessPiece(undefined,0,0,0); //ChessPiece class
//White Bishop
const WhiteBishopFileName = "w-bishop.png"
const WhiteBishopSRC = ChessTexturesFolderPath + WhiteBishopFileName; //SRC
export const WhiteBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const WhiteBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhiteBishop = new ChessPiece(undefined,0,0,0); //ChessPiece class
//White Knight
const WhiteKnightFileName = "w-knight.png"
const WhiteKnightSRC = ChessTexturesFolderPath + WhiteKnightFileName; //SRC
export const WhiteKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const WhiteKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhiteKnight = new ChessPiece(undefined,0,0,0); //ChessPiece class
//White Pawn
const WhitePawnFileName = "w-pawn.png"
const WhitePawnSRC = ChessTexturesFolderPath + WhitePawnFileName; //SRC
export const WhitePawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const WhitePawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const WhitePawn = new ChessPiece(undefined,0,0,0); //ChessPiece class
//Black Pieces
//Black King
const BlackKingFileName = "b-king.png"
const BlackKingSRC = ChessTexturesFolderPath + BlackKingFileName; //SRC
export const BlackKingImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackKingTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackKing = new ChessPiece(undefined,0,0,1); //ChessPiece class
//Black Queen
const BlackQueenFileName = "b-queen.png";
const BlackQueenSRC = ChessTexturesFolderPath + BlackQueenFileName; //SRC
export const BlackQueenImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackQueenTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackQueen = new ChessPiece(undefined,0,0,1); //ChessPiece class
//Black Rook
const BlackRookFileName = "b-rook.png";
const BlackRookSRC = ChessTexturesFolderPath + BlackRookFileName; //SRC
export const BlackRookImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackRookTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackRook = new ChessPiece(undefined,0,0,1); //ChessPiece class
//Black Bishop
const BlackBishopFileName = "b-bishop.png";
const BlackBishopSRC = ChessTexturesFolderPath + BlackBishopFileName; //SRC
export const BlackBishopImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackBishopTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackBishop = new ChessPiece(undefined,0,0,1); //ChessPiece class
//Black Knight
const BlackKnightFileName = "b-knight.png"
const BlackKnightSRC = ChessTexturesFolderPath + BlackKnightFileName; //SRC
export const BlackKnightImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackKnightTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackKnight = new ChessPiece(undefined,0,0,1); //ChessPiece class
//Black Pawn
const BlackPawnFileName = "b-pawn.png"
const BlackPawnSRC = ChessTexturesFolderPath + BlackPawnFileName; //SRC
export const BlackPawnImage = new ENGINE.DeffaultImage(undefined,SizeX,SizeY); //Image
export const BlackPawnTexture = new ENGINE.Texture(undefined,SizeX,SizeY); //Texture class
export const BlackPawn = new ChessPiece(undefined,0,0,1); //ChessPiece class
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
    TileMap = new ENGINE.TileMap([SizeX,SizeY],[ChessBoardSize,ChessBoardSize],Tiles);
}
//Creating/Loading ChessPieces Textures
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
    await WhiteKnight.SetTexture(WhiteKnightTexture);
    //Pawn
    await WhitePawnImage.CreateImage(await ENGINE.LoadImage(WhitePawnSRC));
    await WhitePawnTexture.SetTexture(WhitePawnImage);
    await WhitePawn.SetTexture(WhitePawnTexture);
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

//Setting up ChessPieces
export async function CreateChessPieces(){
    GamePieces = [
        [BlackRook.Clone(),BlackKnight.Clone(),BlackBishop.Clone(),BlackQueen.Clone(),BlackKing.Clone(),BlackBishop.Clone(),BlackKnight.Clone(),BlackRook.Clone()],
            [BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone(),BlackPawn.Clone()],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone(),WhitePawn.Clone()],
        [WhiteRook.Clone(),WhiteKnight.Clone(),WhiteBishop.Clone(),WhiteQueen.Clone(),WhiteKing.Clone(),WhiteBishop.Clone(),WhiteKnight.Clone(),WhiteRook.Clone()],
    ]
    //SettingPositions
    for(let y = 0; y < ChessBoardSize;y++){
        for(let x = 0; x < ChessBoardSize;x++){
            if(GamePieces[y][x] !== undefined){
                GamePieces[y][x].SetPosition(x,y);
            }
        }
    }
    GamePiecesTileMap = new ENGINE.TileMap([SizeX,SizeY],[ChessBoardSize,ChessBoardSize],GamePieces);
}

export const ConstantsModulePromise = ConstantsLoader.LoadModule;

//Loaders wrap
export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();
        await CreateChessBoardData();
        await LoadChessTextures();
        await CreateChessPieces();
    }catch(error){
        console.log(error);
    }
}