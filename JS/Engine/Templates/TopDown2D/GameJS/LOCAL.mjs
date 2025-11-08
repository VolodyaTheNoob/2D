import * as ENGINE from "../EngineImports.mjs";
import {PlayerInput,PlayerKeyboardDown,PlayerKeyboardUP} from "./Player/PlayerInput.mjs"
import { Player } from "./Player/Player.mjs";
import * as _Map from "./World/Map.mjs";
import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";

export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",ENGINE.CONST.CreateGraphicsConstants);
export const ConstantsModulePromise = ConstantsLoader.LoadModule;

export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();
        await CreateWorldData();
    }catch(error){
        console.log(error);
    }
}

export const [CanvasSizeY, CanvasSizeX] = [400,600];//Canvas height/width
export const [PlayerStartPositionY,PlayerStartPositionX] = [CanvasSizeY/2,CanvasSizeX/2]
export const [MapSizeY,MapSizeX] = [_Map.MapSizeY, _Map.MapSizeX];
export const MapSizeLength = MapSizeY * MapSizeX;
export const [ScaleY,ScaleX] = [1,1];
export const [PlayerViewportDistanceY,PlayerViewportDistanceX] = [CanvasSizeY/2,CanvasSizeX/2];
export const [TileSizeY,TileSizeX] = [_Map.TileSizeY, _Map.TileSizeX];//Default Size Of Everything
export const Map = _Map;

export const MainContext = ENGINE.CONST.MainSceneContext;
export const BackContext = ENGINE.CONST.MainSceneBackBufferContext;
export const BackCanvas = ENGINE.CONST.MainSceneBackBufferDOM;
MainContext.width = TileSizeX * MapSizeX;
MainContext.height = MapSizeY * TileSizeY;
BackContext.width = TileSizeX * MapSizeX;
BackContext.height = MapSizeY * TileSizeY;

export const PlayerViewPortRect = new ENGINE.Rectangle(0,0,PlayerViewportDistanceX,PlayerViewportDistanceY);
export const PlayerViewPort = new ENGINE.ViewPort(PlayerViewPortRect);

export const PlayerMapBorderRect = new ENGINE.Rectangle(0,0,
    MapSizeY * TileSizeY -PlayerViewportDistanceY - TileSizeY,
    MapSizeX * TileSizeX-PlayerViewportDistanceX - TileSizeX);

//Colors
//Green
export let GreenColor;
export let GreenImageData;
export let GreenImage;
export let GreenTexture;
//Black
export let BlackColor;
export let BlackImageData;
export let BlackImage;
export let BlackTexture;
//White
export let WhiteColor;
export let WhiteImageData;
export let WhiteImage;
export let WhiteTexture;
//Red
export let RedColor;
export let RedImageData;
export let RedImage;
export let RedTexture;
//Blue
export let BlueColor;
export let BlueImageData;
export let BlueImage;
export let BlueTexture;
//Player
export let PlayerTexture;
export let PlayerObject;
export let Player1Input;
export let Player1;
export let Player1Camera;
export let BackgroundRender;
export async function BackgroundRenderFunction(Background,Player){
    let PlayerObject = Player.Obj;
    let StartX = PlayerObject.PositionX;    
    let StartY = PlayerObject.PositionY;
    let Width = CanvasSizeX;
    let Height = CanvasSizeY;
    MainContext.drawImage(Background.StaticImage.Image,
        StartX,
        StartY,
        Width,
        Height,
        0,
        0,
        Width * ScaleX,
        Height * ScaleY
    );
}	

export async function CreatePlayerData(){
    PlayerTexture = new ENGINE.Graphics.Texture(GreenImage,GreenImage.Image.width,GreenImage.Image.height)
    PlayerObject = new ENGINE.Object(PlayerTexture,PlayerStartPositionY,PlayerStartPositionX,0,0);
    Player1Input = new PlayerInput();
	Player1Input.AddEventFunction("keydown",PlayerKeyboardDown,Player1Input);
	Player1Input.AddEventFunction("keyup",PlayerKeyboardUP,Player1Input);
    Player1 = new Player(PlayerObject,PlayerViewPort,undefined,Player1Input,PlayerMapBorderRect);
    Player1Camera = new ENGINE.Camera(MainContext,PlayerViewPort,Player1,PlayerMapBorderRect,[ScaleY,ScaleX]);
    Player1.Cam = Player1Camera;
}

export async function CreateMapData() {
    await Map.CreateMapTiles();
    await Map.Background.CreateStatic();
    BackgroundRender = new ENGINE.Render(Map.Background,BackgroundRenderFunction,[Player1]);
}

export async function CreateWorldData(){
    await CreateGameColoredTextures();
    await CreatePlayerData();
    await CreateMapData();
}

export async function CreateGameColoredTextures(){
    //Black
    BlackColor = ENGINE.CONST.BlackColor;
    BlackImageData = new ENGINE.Graphics.ColorImageData(BlackColor,TileSizeX,TileSizeY);
    BlackImage = new ENGINE.Graphics.StoredImage(TileSizeX,TileSizeY);
    await BlackImage.LoadFromColorImageData(BlackImageData);
    BlackTexture = new ENGINE.Graphics.Texture(BlackImage,TileSizeX,TileSizeY);
    //White
    WhiteColor = ENGINE.CONST.WhiteColor;
    WhiteImageData = new ENGINE.Graphics.ColorImageData(WhiteColor,TileSizeX,TileSizeY);
    WhiteImage = new ENGINE.Graphics.StoredImage(TileSizeX,TileSizeY);
    await WhiteImage.LoadFromColorImageData(WhiteImageData);
    WhiteTexture = new ENGINE.Graphics.Texture(WhiteImage,TileSizeX,TileSizeY);
    //Red
    RedColor = ENGINE.CONST.RedColor;
    RedImageData = new ENGINE.Graphics.ColorImageData(RedColor,TileSizeX,TileSizeY);
    RedImage = new ENGINE.Graphics.StoredImage(TileSizeX,TileSizeY);
    await RedImage.LoadFromColorImageData(RedImageData);
    RedTexture = new ENGINE.Graphics.Texture(RedImage,TileSizeX,TileSizeY);
    //Green
    GreenColor = ENGINE.CONST.GreenColor;
    GreenImageData = new ENGINE.Graphics.ColorImageData(GreenColor,TileSizeX,TileSizeY);
    GreenImage = new ENGINE.Graphics.StoredImage(TileSizeX,TileSizeY);
    await GreenImage.LoadFromColorImageData(GreenImageData);
    GreenTexture = new ENGINE.Graphics.Texture(GreenImage,TileSizeX,TileSizeY);
    //Blue
    BlueColor = ENGINE.CONST.BlueColor;
    BlueImageData = new ENGINE.Graphics.ColorImageData(BlueColor,TileSizeX,TileSizeY);
    BlueImage = new ENGINE.Graphics.StoredImage(TileSizeX,TileSizeY);
    await BlueImage.LoadFromColorImageData(BlueImageData);
    BlueTexture = new ENGINE.Graphics.Texture(BlueImage,TileSizeX,TileSizeY);
}


