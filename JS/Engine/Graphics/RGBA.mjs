export class RGBA{
    constructor(R,G,B,A = 255){
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
    Get(){
        return [this.R,this.G,this.B,this.A];
    }
    Set(R,G,B,A){
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
}