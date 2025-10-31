import { RGBA,ColorImage,DeffaultImage,Texture, Sprite} from "./Graphics/Graphics.mjs";
import { ModuleLoader } from "./AsyncModuleLoader.mjs";

//Main scene
export const MainSceneID = "Scene";
export const MainSceneDOM = document.getElementById(MainSceneID);
export const MainSceneContext = MainSceneDOM.getContext("2d");

//MainScene BackBuffer for manipulations
export const MainSceneBackBufferID = "SceneBackBuffer";
export const MainSceneBackBufferDOM = document.getElementById(MainSceneBackBufferID);
export const MainSceneBackBufferContext = MainSceneBackBufferDOM.getContext("2d");

//DeffaultSize for Textures
export const SizeX = 64;
export const SizeY = 64;

//Creating WhiteSquareTexture
export let WhiteColor;
export let WhiteImage;
export let WhiteTexture;
//Creating BlackSquareTexture
export let BlackColor;
export let BlackImage;
export let BlackTexture;
//Creating RedSquareTexture
export let RedColor;
export let RedImage;
export let RedTexture;
//Creating GreenSquareTexture
export let GreenColor;
export let GreenImage;
export let GreenTexture;
//Creating BlueSquareTexture
export let BlueColor;
export let BlueImage;
export let BlueTexture;

export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",CreateGraphicsConstants);
export function CreateGraphicsConstants() {
    //Creating WhiteSquareTexture
    WhiteColor = new RGBA(255,255,255,255);
    WhiteImage = new ColorImage(WhiteColor,SizeX,SizeY);
    WhiteTexture = new Texture(WhiteImage,SizeX,SizeY);
    //Creating BlackSquareTexture
    BlackColor = new RGBA(0,0,0,255);
    BlackImage = new ColorImage(BlackColor,SizeX,SizeY);
    BlackTexture = new Texture(BlackImage,SizeX,SizeY);
    //Creating RedSquareTexture
    RedColor = new RGBA(255,0,0,255);
    RedImage = new ColorImage(RedColor,SizeX,SizeY);
    RedTexture = new Texture(RedImage,SizeX,SizeY);
//Creating GreenSquareTexture
    GreenColor = new RGBA(0,255,0,255);
    GreenImage = new ColorImage(GreenColor,SizeX,SizeY);
    GreenTexture = new Texture(GreenImage,SizeX,SizeY);
//Creating BlueSquareTexture
    BlueColor = new RGBA(0,0,255,255);
    BlueImage = new ColorImage(BlueColor,SizeX,SizeY);
    BlueTexture = new Texture(BlueImage,SizeX,SizeY);
}
