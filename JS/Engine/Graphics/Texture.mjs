export class Texture{
    constructor(Image = undefined,SizeY = undefined,SizeX = undefined){
        this.Image = Image;
        this.SizeX = SizeX;
        this.SizeY = SizeY;
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
    //Image set/get
    set Image(NewImage){
        this._Image = NewImage;
    }
    get Image(){
        return this._Image
    }
    //Functions
    GetTexture(){
        if(this.Image !== undefined){
            return this.Image.GetImage();
        }
    }
    async SetTexture(NewImage){
        this.Image = NewImage;
    }
    GetSizeX(){
        return this.SizeX;
    }
    GetSizeY(){
        return this.SizeY;
    }
    GetSize(){
        return this.SizeX * this.SizeY * 4;
    }
}
