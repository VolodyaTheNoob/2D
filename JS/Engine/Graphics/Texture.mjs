export class Texture{
    constructor(Image,SizeX = 16,SizeY = 16){
        this.Image = Image;
        this.SizeX = SizeX;
        this.SizeY = SizeY;
    }
    GetTexture(){
        return this.Image.GetImage();
    }
    SetTeture(NewImage){
        this.Image = NewImage;
    }
}
