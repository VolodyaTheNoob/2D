export class Texture{
    constructor(Image = undefined,SizeX = undefined,SizeY = undefined){
        this.Image = Image;
        this.SizeX = SizeX;
        this.SizeY = SizeY;
    }
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
        return [this.SizeX,this.SizeY];
    }
}
