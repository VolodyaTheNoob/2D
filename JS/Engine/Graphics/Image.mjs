import { RGBA } from "./RGBA.mjs";
import { MainSceneBackBufferID,MainSceneBackBufferDOM,MainSceneBackBufferContext} from "../Constants.mjs";

export class ColorImage{
    constructor(_RGBA,SizeX,SizeY){
        this.RGBA = _RGBA; //RGBA Class
        this.SizeX = SizeX;
        this.SizeY = SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.Data = new Uint8ClampedArray(this.SizeX * this.SizeY * 4);
        this.ImageData;
        this.CreateImage();
    }
    async CreateImage(){
        let Data = this.Data;
        for (let i = 0; i < Data.length; i += 4) {
            Data[i] = this.RGBA.R; 
            Data[i + 1] = this.RGBA.G;
            Data[i + 2] = this.RGBA.B; 
            Data[i + 3] = this.RGBA.A; 
        }
        this.ImageData = new ImageData(Data,this.SizeX); // this.SizeX - width of ImageData
    }
    GetImage(){
        return this.ImageData;
    }
}
export class DeffaultImage{
    constructor(ImgSrc = undefined,SizeX = undefined,SizeY = undefined){
        this.SizeX = SizeX;
        this.SizeY = SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.ImageData;
        this.IsLoaded = false;
        if(ImgSrc !== undefined){
            this.CreateImage(ImgSrc);
        }
    }

    async CreateImage(Img){
            MainSceneBackBufferContext.drawImage(Img,0,0);
            this.ImageData = MainSceneBackBufferContext.getImageData(0, 0, this.SizeX, this.SizeY);
            MainSceneBackBufferContext.clearRect(0,0,this.SizeX, this.SizeY);
            this.IsLoaded = true;;
    }
    GetImage(){
        if(this.IsLoaded){
            return this.ImageData;
        }else{
            return "not loaded";
        }
    }
}

export async function LoadImage(url) {
        return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
    }