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

export const Map = _Map;

export const MainContext = ENGINE.CONST.MainSceneContext;
export const BackContext = ENGINE.CONST.MainSceneBackBufferContext;
export const BackCanvas = ENGINE.CONST.MainSceneBackBufferDOM;
MainContext.width = 4096;
MainContext.height = 4096;
BackContext.width = 4096;
BackContext.height = 4096;

export const PlayerViewPort = new ENGINE.ViewPort(new ENGINE.Rectangle(0,0,600,400));
export const MapRect = new ENGINE.Rectangle(0,0,4096-364,4096-264);
export const [SizeY,SizeX] = [_Map.SizeY,_Map.SizeX];

export let GreenColor;
export let GreenImageData;
export let GreenImage;
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
    let Width = 600;
    let Height = 400;
    MainContext.drawImage(Background.StaticImage.Image,
        StartX,
        StartY,
        600,
        400,
        0,
        0,
        600,
        400
    );
}	

export async function CreatePlayerData(){
    PlayerTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.GreenImage,ENGINE.CONST.GreenImage.Image.width,ENGINE.CONST.GreenImage.Image.height)
    PlayerObject = new ENGINE.Object(PlayerTexture,0,0,0,0);
    Player1Input = new PlayerInput();
	Player1Input.AddEventFunction("keydown",PlayerKeyboardDown,Player1Input);
	Player1Input.AddEventFunction("keyup",PlayerKeyboardUP,Player1Input);
    Player1 = new Player(PlayerObject,PlayerViewPort,undefined,Player1Input,MapRect);
    Player1Camera = new ENGINE.Camera(MainContext,PlayerViewPort,Player1,MapRect);
    Player1.Cam = Player1Camera;
}

export async function CreateMapData() {
    await Map.CreateMapTiles();
    await Map.Background.CreateStatic();
    BackgroundRender = new ENGINE.Render(Map.Background,BackgroundRenderFunction,[Player1]);
}

export async function CreateWorldData(){
    await CreatePlayerData();
    await CreateMapData();
}


