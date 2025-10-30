import { RGBA } from "./RGBA.mjs";

export class ColorImage{
    constructor(_RGBA,SizeX,SizeY){
        this.RGBA = new RGBA([_RGBA.Get()]); //RGBA Class
        this.SizeX = SizeX;
        this.SizeY = SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.Data = new Uint8ClampedArray(this.SizeX * this.SizeY * 4);
        this.ImageData;
        this.CreateImage();
    }
    CreateImage(){
        let Data = this.Data;
        for (let i = 0; i < Data.length; i += 4) {
            Data[i] = this.RGBA.R; 
            Data[i + 1] = this.RGBA.G;
            Data[i + 2] = this.RGBA.B; 
            Data[i + 3] = this.RGBA.A; 
        }
        this.ImageData = new ImageData(this.Data,this.SizeX); // this.SizeX - width of ImageData
    }
    GetImage(){
        return this.ImageData;
    }
}
export class DeffaultImage{
    constructor(ImgSrc,SizeX,SizeY){
        this.SizeX = SizeX;
        this.SizeY = SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.ImageData;
        this.CreateImage(ImgSrc);
        this.IsLoaded = false;
    }
    CreateImage(ImgSrc){
        let Img = new Image();
        Img.src = ImgSrc;
        Img.onload = () =>{
            MainSceneBackBufferContext.drawImage(Img,0,0);
            this.ImageData = MainSceneBackBufferContext.getImageData(0, 0, this.SizeX, this.SizeY);
            this.IsLoaded = true;
        }    
    }
    GetImage(){
        if(this.IsLoaded){
            return this.ImageData;
        }
    }
}