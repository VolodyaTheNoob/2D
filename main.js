import { RGBA,ColorImage,DeffaultImage,Texture } from "./JS/Engine/Graphics/Graphics.mjs";
import { Sprite } from "./JS/Engine/Graphics/Sprite.mjs";
const MainSceneID = "Scene";
const MainSceneBackBufferID = "SceneBackBuffer";
let MainScene = document.getElementById(MainSceneID);
let MainSceneContext = MainScene.getContext("2d");
let MainSceneBackBuffer = document.getElementById(MainSceneBackBufferID);
let MainSceneBackBufferContext = MainSceneBackBuffer.getContext("2d");

const SizeX = 16;
const SizeY = 16;

class Tile extends Sprite{
    constructor(TileTexture,PosX,PosY) {
        super(TileTexture,PosX,PosY);
    }
}

const BlackColor = new RGBA(255,255,255,255);
let BlackImage = new ColorImage(BlackColor,SizeX,SizeY);
let BlackTexture = new Texture(BlackImage,SizeX,SizeY);
let BlackTile = new Tile(BlackTexture,32,32);

MainSceneContext.putImageData(BlackTile.GetTexture(),BlackTile.GetX(),BlackTile.GetY());


