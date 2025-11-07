import { RGBA } from "./RGBA.mjs";
import { MainSceneBackBufferID,MainSceneBackBufferDOM,MainSceneBackBufferContext} from "../Constants.mjs";

export class StoredImage{
    constructor(_Width = 0, _Height = 0,Src = undefined,_Image= undefined){    
        this.Image = _Image;
        this.Loaded = false;
        if(this.Image === undefined){
            this.Image = new Image(_Width,_Height);
            if(Src !== undefined){
                this.Load(Src);
            }
        }else{
            this.Image = new Image(this.Image.width,this.Image.height);
            this.Load(_Image.src);
        }
    }
    async Clone(_Width = this.Image.width,_Height = this.Image.height,_Src = this.Image.src, _Image = this.Image){
        return new StoredImage(_Width,_Height,_Src, _Image);
    }
    async Load(Src){
        await( async ()=>{
            this.Image.onload = () =>{
            }
            this.Image.src = Src;
        })();
    }
    async LoadFromColorImageData(ColorImageData){
        //Resizing to make sure we take only our image
        let PrevDomWidth = MainSceneBackBufferDOM.width;
        let PrevDomHeight = MainSceneBackBufferDOM.height;
        let PrevCTXWidth = MainSceneBackBufferContext.width;
        let PrevCTXHeight = MainSceneBackBufferContext.height;
        MainSceneBackBufferDOM.width = ColorImageData.SizeX;
        MainSceneBackBufferDOM.height = ColorImageData.SizeY;
        MainSceneBackBufferContext.width = ColorImageData.SizeX;
        MainSceneBackBufferContext.height = ColorImageData.SizeY;
        //Start copy
        MainSceneBackBufferContext.putImageData(ColorImageData.GetImageData(),0,0);
        this.Image = new Image(ColorImageData.SizeX,ColorImageData.SizeY);
        this.Image.onload = () =>{
            this.Loaded = true;
        }
        this.Image.src = MainSceneBackBufferDOM.toDataURL('image/png');

        MainSceneBackBufferDOM.width = PrevDomWidth;
        MainSceneBackBufferDOM.height = PrevDomHeight;
        MainSceneBackBufferContext.width = PrevCTXWidth;
        MainSceneBackBufferContext.height = PrevCTXHeight;
    }
    GetImage(){
        return this.Image;
    }
}

//External function - used to support async load of images
export async function LoadImage(url) {
        return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
    }