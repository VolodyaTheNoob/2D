import { RGBA } from "./RGBA.mjs";
import { MainSceneBackBufferID,MainSceneBackBufferDOM,MainSceneBackBufferContext} from "../Constants.mjs";

export class ColorImage{
    constructor(_RGBA = undefined,_SizeY = undefined,_SizeX = undefined){
        this.RGBA = _RGBA; //RGBA Class
        this.SizeX = _SizeX;
        this.SizeY = _SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.Data = this.Size; //set Data - new Uint8ClampedArray(this.Size...);
        this.ImageData = undefined;
        this.CreateImage();
    }
    //RGBA set/get
    set RGBA(_rgba){
        this._RGBA = _rgba;
    }
    get RGBA(){
        return this._RGBA;
    }
    //SizeX set/get
    set SizeX(x){
        this._SizeX = x;
    }
    get SizeX(){
        return this._SizeX;
    }
    //SizeY set/get
    set SizeY(y){
        this._SizeY = y;
    }
    get SizeY(){
        return this._SizeY;
    }
    //Size set/get
    set Size([ValueX,ValueY]){
        if(ValueX != undefined && ValueY != undefined){
            this._Size = ValueX * ValueY;
        }else{
            this._Size = undefined;
        }
    }
    set Size(Value){
        if(Value != undefined){
            this._Size = Value;
        }
    }
    get Size(){
        return this._Size;
    }
    //DATA set/get
    set Data(DataSize){
        const CountOfRgbaForEachColor = 4;
        if(DataSize != undefined){
            this._Data = new Uint8ClampedArray(DataSize * CountOfRgbaForEachColor);
        }else{
            this._Data = undefined;
        }
    }
    get Data(){
        return this._Data;
    }
    //Functions
    async CreateImage(){
        if(this.RGBA !== undefined){
            let Data = this.Data;
            for (let i = 0; i < Data.length; i += 4) {
                Data[i] = this.RGBA.R; 
                Data[i + 1] = this.RGBA.G;
                Data[i + 2] = this.RGBA.B; 
                Data[i + 3] = this.RGBA.A; 
            }
            this.ImageData = new ImageData(Data,this.SizeX); // this.SizeX - width of ImageData
        }
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
    //SizeX set/get
    set SizeX(x){
        this._SizeX = x;
    }
    get SizeX(){
        return this._SizeX;
    }
    //SizeY set/get
    set SizeY(y){
        this._SizeY = y;
    }
    get SizeY(){
        return this._SizeY;
    }
    //Size set/get
    set Size([ValueX,ValueY]){
        if(ValueX != undefined && ValueY != undefined){
            this._Size = ValueX * ValueY;
        }else{
            this._Size = undefined;
        }
    }
    set Size(Value){
        if(Value != undefined){
            this._Size = Value;
        }
    }
    get Size(){
        return this._Size;
    }
    //ImageData set/get
    set ImageData(NewImageData){
        this._ImageData = NewImageData;
    }
    get ImageData(){
        return this._ImageData;
    }
    //IsLoaded set/get
    set IsLoaded(State){
        this._IsLoaded = State;
    }
    get IsLoaded(){
        return this._IsLoaded;
    }
    //Functions
    async CreateImage(Img,ImageWidth = this.SizeX,ImageHeight = this.SizeY){
            //ImageWidth - use this to scale by width
            //ImageHeight - use this to scale by hegiht
            MainSceneBackBufferContext.drawImage(Img,0,0,ImageWidth,ImageHeight);
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

//External function - used to support async load of images
export async function LoadImage(url) {
        return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
    }