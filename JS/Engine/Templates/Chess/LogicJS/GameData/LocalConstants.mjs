import { ModuleLoader } from "../../../../AsyncModuleLoader.mjs";
import {CONST} from "../../EngineImports.mjs";
import * as ENGINE from "../../EngineImports.mjs";
import { ChessPiece } from "../ChessPieces/ChessPiece.mjs";
import { RenderTileMap,SmartRender } from "./GameRender.mjs";
import { Pawn } from "../ChessPieces/Pawn.mjs";
import { Knight } from "../ChessPieces/Knight.mjs";
import { Rook } from "../ChessPieces/Rook.mjs";
import { Bishop } from "../ChessPieces/Bishop.mjs";
import { Queen } from "../ChessPieces/Queen.mjs";
import { King } from "../ChessPieces/King.mjs";
import { Player } from "./Player/Player.mjs";
import { GameData } from "./GameData.mjs";
import { PlayerInput } from "./Player/PlayerInput.mjs";
import { MainSceneDOM } from "../../../../Constants.mjs";
import { Game } from "./Game.mjs";
import { GetUserMouseCoordinates } from "./Player/PlayerInput.mjs";
import { SetIsUserMouseDown } from "./Player/PlayerInput.mjs";

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

export let GamePieces; //Array of PlayeblePeaces
export let GamePiecesTileMap; //TileMap class - contains GamePieces

export let ChessBoardRender;
export let ChessPiecesRender;

export const Team1 = 0;
export const Team2 = 1;

export let Player1;
export let Player1Objects;
export let Player2;
export let Player2Objects;
export let Chess;

//Pieaces textures(images) folder path
const ChessTexturesFolderPath = "../../../../../Textures/ChessPeaces/"; //cant rename now ChessPeaces->ChessPieces
//White Pieces
//White King
const WhiteKingFileName = "w-king.png";
const WhiteKingSRC = ChessTexturesFolderPath + WhiteKingFileName; //SRC 
export const WhiteKingImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image class
export const WhiteKingTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhiteKing = new King(undefined,0,0,0,0,Team1,"King"); //ChessPiece class
//White Queen
const WhiteQueenFileName = "w-queen.png";
const WhiteQueenSRC = ChessTexturesFolderPath + WhiteQueenFileName; //SRC
export const WhiteQueenImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const WhiteQueenTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhiteQueen = new Queen(undefined,0,0,0,0,Team1,"Queen"); //ChessPiece class
//White Rook
const WhiteRookFileName = "w-rook.png";
const WhiteRookSRC = ChessTexturesFolderPath + WhiteRookFileName; //SRC
export const WhiteRookImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const WhiteRookTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhiteRook = new Rook(undefined,0,0,0,0,Team1,"Rook"); //ChessPiece class
//White Bishop
const WhiteBishopFileName = "w-bishop.png"
const WhiteBishopSRC = ChessTexturesFolderPath + WhiteBishopFileName; //SRC
export const WhiteBishopImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const WhiteBishopTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhiteBishop = new Bishop(undefined,0,0,0,0,Team1,"Bishop"); //ChessPiece class
//White Knight
const WhiteKnightFileName = "w-knight.png"
const WhiteKnightSRC = ChessTexturesFolderPath + WhiteKnightFileName; //SRC
export const WhiteKnightImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const WhiteKnightTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhiteKnight = new Knight(undefined,0,0,0,0,Team1,"Knight"); //ChessPiece class
//White Pawn
const WhitePawnFileName = "w-pawn.png"
const WhitePawnSRC = ChessTexturesFolderPath + WhitePawnFileName; //SRC
export const WhitePawnImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const WhitePawnTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const WhitePawn = new Pawn(undefined,0,0,0,0,Team1,"Pawn"); //ChessPiece class
//Black Pieces
//Black King
const BlackKingFileName = "b-king.png"
const BlackKingSRC = ChessTexturesFolderPath + BlackKingFileName; //SRC
export const BlackKingImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackKingTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackKing = new King(undefined,0,0,0,0,Team2,"King"); //ChessPiece class
//Black Queen
const BlackQueenFileName = "b-queen.png";
const BlackQueenSRC = ChessTexturesFolderPath + BlackQueenFileName; //SRC
export const BlackQueenImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackQueenTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackQueen = new Queen(undefined,0,0,0,0,Team2,"Queen"); //ChessPiece class
//Black Rook
const BlackRookFileName = "b-rook.png";
const BlackRookSRC = ChessTexturesFolderPath + BlackRookFileName; //SRC
export const BlackRookImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackRookTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackRook = new Rook(undefined,0,0,0,0,Team2,"Rook"); //ChessPiece class
//Black Bishop
const BlackBishopFileName = "b-bishop.png";
const BlackBishopSRC = ChessTexturesFolderPath + BlackBishopFileName; //SRC
export const BlackBishopImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackBishopTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackBishop = new Bishop(undefined,0,0,0,0,Team2,"Bishop"); //ChessPiece class
//Black Knight
const BlackKnightFileName = "b-knight.png"
const BlackKnightSRC = ChessTexturesFolderPath + BlackKnightFileName; //SRC
export const BlackKnightImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackKnightTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackKnight = new Knight(undefined,0,0,0,0,Team2,"Knight"); //ChessPiece class
//Black Pawn
const BlackPawnFileName = "b-pawn.png"
const BlackPawnSRC = ChessTexturesFolderPath + BlackPawnFileName; //SRC
export const BlackPawnImage = new ENGINE.DeffaultImage(undefined,SizeY,SizeX); //Image
export const BlackPawnTexture = new ENGINE.Texture(undefined,SizeY,SizeX); //Texture class
export const BlackPawn = new Pawn(undefined,0,0,0,0,Team2,"Pawn"); //ChessPiece class
//Loaders
export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",CONST.CreateGraphicsConstants);

//Dynamic constants
export async function CreateChessBoardData(){
    //CreatingChessBoard
    FirstColorImage = new ENGINE.ColorImage(FirstColor,SizeY,SizeX)
    FirstColorTexture = new ENGINE.Texture(FirstColorImage,SizeY,SizeX);
    FirstTile = new ENGINE.Tile(FirstColorTexture,0,0);
    SecondColorImage = new ENGINE.ColorImage(SecondColor,SizeY,SizeX)
    SecondColorTexture = new ENGINE.Texture(SecondColorImage,SizeY,SizeX);
    SecondTile = new ENGINE.Tile(SecondColorTexture,1,0);
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
    
    for(let y = 0; y < ChessBoardSize;y++){
        if(y % 2 == 0){
            for(let x = 0; x < ChessBoardSize; x++){
                if(x % 2 == 0){
                    Tiles[y][x] = FirstTile.Clone(y,x,y * SizeY,x * SizeX);
                }else{
                    Tiles[y][x] = SecondTile.Clone(y,x,y * SizeY,x * SizeX);
                }
            }
        }else{
            for(let x = 0; x < ChessBoardSize; x++){
                if(x % 2 == 0){
                    Tiles[y][x] = SecondTile.Clone(y,x,y * SizeY,x * SizeX);
                }else{
                    Tiles[y][x] = FirstTile.Clone(y,x,y * SizeY,x * SizeX);
                }
            }
        }
    }
        
    TileMap = new ENGINE.TileMap([SizeY,SizeX],[ChessBoardSize,ChessBoardSize],Tiles);
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
    Player2Objects = [BlackPawn.Clone(1,0),BlackPawn.Clone(1,1),BlackPawn.Clone(1,2),BlackPawn.Clone(1,3),BlackPawn.Clone(1,4),BlackPawn.Clone(1,5),BlackPawn.Clone(1,6),BlackPawn.Clone(1,7),
        BlackRook.Clone(0,0),BlackKnight.Clone(0,1),BlackBishop.Clone(0,2),BlackQueen.Clone(0,3),BlackKing.Clone(0,4),BlackBishop.Clone(0,5),BlackKnight.Clone(0,6),BlackRook.Clone(0,7)];
    Player1Objects = [WhiteRook.Clone(7,0),WhiteKnight.Clone(7,1),WhiteBishop.Clone(7,2),WhiteQueen.Clone(7,3),WhiteKing.Clone(7,4),WhiteBishop.Clone(7,5),WhiteKnight.Clone(7,6),WhiteRook.Clone(7,7),
        WhitePawn.Clone(6,0),WhitePawn.Clone(6,1),WhitePawn.Clone(6,2),WhitePawn.Clone(6,3),WhitePawn.Clone(6,4),WhitePawn.Clone(6,5),WhitePawn.Clone(6,6),WhitePawn.Clone(6,7)];
    GamePieces = [
       [Player2Objects[8],Player2Objects[9],Player2Objects[10],Player2Objects[11],Player2Objects[12],Player2Objects[13],Player2Objects[14],Player2Objects[15]],
       [Player2Objects[0],Player2Objects[1],Player2Objects[2],Player2Objects[3],Player2Objects[4],Player2Objects[5],Player2Objects[6],Player2Objects[7]],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
        [Player1Objects[8],Player1Objects[9],Player1Objects[10],Player1Objects[11],Player1Objects[12],Player1Objects[13],Player1Objects[14],Player1Objects[15]],
        [Player1Objects[0],Player1Objects[1],Player1Objects[2],Player1Objects[3],Player1Objects[4],Player1Objects[5],Player1Objects[6],Player1Objects[7]]]
    //SettingPositions
    for(let y = 0; y < ChessBoardSize;y++){
        for(let x = 0; x < ChessBoardSize;x++){
            if(GamePieces[y][x] !== undefined){
                GamePieces[y][x].SetPosition(y,x);
                GamePieces[y][x].SetCoordinates(y * SizeY, x * SizeX);
            }
        }
    }
    GamePiecesTileMap = new ENGINE.TileMap([SizeY,SizeX],[ChessBoardSize,ChessBoardSize],GamePieces);
}
export async function CreateGameRenders() {
    ChessBoardRender = new ENGINE.Render(TileMap,RenderTileMap);
    ChessPiecesRender = new ENGINE.Render(GamePiecesTileMap,SmartRender,TileMap);
}

export async function CreateGameData(){
    Player1 = new Player(new GameData(Team1,0,1),new PlayerInput(MainSceneDOM),Player1Objects);
    Player2 = new Player(new GameData(Team2,0,0),new PlayerInput(MainSceneDOM),Player2Objects);
    Chess = new Game(Player1,Player2,TileMap,GamePiecesTileMap);
}

export async function AddInputFunctions() {
    Player1.Input.AddEventFunction("mousemove",GetUserMouseCoordinates,Player1);
    Player1.Input.AddEventFunction("mousemove",SetIsUserMouseDown,Player1);
    Player2.Input.AddEventFunction("mousemove",GetUserMouseCoordinates,Player2);
    Player2.Input.AddEventFunction("mousemove",SetIsUserMouseDown,Player2);
}

export const ConstantsModulePromise = ConstantsLoader.LoadModule;

//Loaders wrap
export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();
        await CreateChessBoardData();
        await LoadChessTextures();
        await CreateChessPieces();
        await CreateGameRenders();
        await CreateGameData();
        await AddInputFunctions();
    }catch(error){
        console.log(error);
    }
}