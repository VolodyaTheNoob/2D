export class ColorImageData{
    constructor(_RGBA = undefined,_SizeY = undefined,_SizeX = undefined,_ImageData = undefined){
        this.RGBA = _RGBA; //RGBA Class
        this.SizeX = _SizeX;
        this.SizeY = _SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.Data = this.Size; //set Data - new Uint8ClampedArray(this.Size...);
        this.ImageData = _ImageData;
        this.IsLoaded = false;
        if(this.ImageData === undefined){
            this.CreateImageData();
        }else{
            this.ImageData = new ImageData(this.ImageData.data,this.SizeX);
            this.IsLoaded = true;
        }
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
    async Clone(_RGBA = this.RGBA,_SizeY = this.SizeY,_SizeX = this.SizeX,_ImageData = this.ImageData){
        return new ColorImageData(_RGBA,_SizeY,_SizeX,_ImageData);
    }
    async CreateImageData(){
        if(this.RGBA !== undefined){
            let Data = this.Data;
            for (let i = 0; i < Data.length; i += 4) {
                Data[i] = this.RGBA.R; 
                Data[i + 1] = this.RGBA.G;
                Data[i + 2] = this.RGBA.B; 
                Data[i + 3] = this.RGBA.A; 
            }
            this.ImageData = new ImageData(Data,this.SizeX); // this.SizeX - width of ImageData
            this.IsLoaded = true;
        }
    }
    GetImageData(){
        return this.ImageData;
    }
}

export class StoredImageData{
    constructor(ImgSrc = undefined,SizeX = undefined,SizeY = undefined,_ImageData = undefined){
        this.SizeX = SizeX;
        this.SizeY = SizeY;
        this.Size = this.SizeX * this.SizeY;
        this.ImageData = _ImageData;
        this.IsLoaded = false;
        if(this.ImageData === undefined){
            if(ImgSrc !== undefined){
                this.CreateImageData(ImgSrc);
            }
        }else{
            this.ImageData = new ImageData(this.ImageData.data,this.SizeX);
            this.IsLoaded = true;
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
    async Clone(_ImgSrc = undefined,_SizeX = this.SizeX,_SizeY = this.SizeY,_ImageData = this.ImageData){
        return new StoredImageData(_ImgSrc,_SizeX,_SizeY,_ImageData);
    }
    async CreateImageData(Img,ImageWidth = this.SizeX,ImageHeight = this.SizeY){
            //ImageWidth - use this to scale by width
            //ImageHeight - use this to scale by hegiht
            this.BackBufferContext.drawImage(Img,0,0,ImageWidth,ImageHeight);
            this.ImageData = this.BackBufferContext.getImageData(0, 0, this.SizeX, this.SizeY);
            this.BackBufferContext.clearRect(0,0,this.SizeX, this.SizeY);
            this.IsLoaded = true;;
    }
    GetImageData(){
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