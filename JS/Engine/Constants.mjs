import * as Graphics from "./Graphics/Graphics.mjs";
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
export let WhiteImageData;
export let WhiteImage;
export let WhiteTexture;
//Creating BlackSquareTexture
export let BlackColor;
export let BlackImageData;
export let BlackImage;
export let BlackTexture;
//Creating RedSquareTexture
export let RedColor;
export let RedImageData;
export let RedImage;
export let RedTexture;
//Creating GreenSquareTexture
export let GreenColor;
export let GreenImageData;
export let GreenImage;
export let GreenTexture;
//Creating BlueSquareTexture
export let BlueColor;
export let BlueImageData;
export let BlueImage;
export let BlueTexture;

export async function CreateGraphicsConstants() {
    //Creating WhiteSquareTexture
    WhiteColor = new Graphics.RGBA(255,255,255,255);
    WhiteImageData = new Graphics.ColorImageData(WhiteColor,SizeX,SizeY);
    WhiteImage = new Graphics.StoredImage(SizeX,SizeY);
    await WhiteImage.LoadFromColorImageData(WhiteImageData);
    WhiteTexture = new Graphics.Texture(WhiteImage,SizeX,SizeY);
    //Creating BlackSquareTexture
    BlackColor = new Graphics.RGBA(0,0,0,255);
    BlackImageData = new Graphics.ColorImageData(BlackColor,SizeX,SizeY);
    BlackImage = new Graphics.StoredImage(SizeX,SizeY);
    await BlackImage.LoadFromColorImageData(BlackImageData);
    BlackTexture = new Graphics.Texture(BlackImage,SizeX,SizeY);
    //Creating RedSquareTexture
    RedColor = new Graphics.RGBA(255,0,0,255);
    RedImageData = new Graphics.ColorImageData(RedColor,SizeX,SizeY);
    RedImage = new Graphics.StoredImage(SizeX,SizeY);
    await RedImage.LoadFromColorImageData(RedImageData);
    RedTexture = new Graphics.Texture(RedImage,SizeX,SizeY);
//Creating GreenSquareTexture
    GreenColor = new Graphics.RGBA(0,255,0,255);
    GreenImageData = new Graphics.ColorImageData(GreenColor,SizeX,SizeY);
    GreenImage = new Graphics.StoredImage(SizeX,SizeY);
    await GreenImage.LoadFromColorImageData(GreenImageData);
    GreenTexture = new Graphics.Texture(GreenImage,SizeX,SizeY);
//Creating BlueSquareTexture
    BlueColor = new Graphics.RGBA(0,0,255,255);
    BlueImageData = new Graphics.ColorImageData(BlueColor,SizeX,SizeY);
    BlueImage = new Graphics.StoredImage(SizeX,SizeY);
    await BlueImage.LoadFromColorImageData(BlueImageData);
    BlueTexture = new Graphics.Texture(BlueImage,SizeX,SizeY);
}
