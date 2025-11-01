export class RGBA{
    constructor(R = undefined,G = undefined, B = undefined,A = undefined){
        this.RGBA = [R,G,B,A];
    }
    //RGA set/get
    set RGBA([R,G,B,A]){
        [this._R,this._G,this._B,this._A] = [R,G,B,A];
    }
    get RGBA(){
        return [this._R,this._G,this._B,this._A];
    }
    //R set/get
    set R(r){
        this._R = r;
    }
    get R(){
        return this._R;
    }
    //G set/get
    set G(g){
        this._G = g;
    }
    get G(){
        return this._G;
    } 
    //B set/get
    set B(b){
        this._B = b;
    }
    get B(){
        return this._B;
    }
    //A set/get
    set A(a){
        this._A = a;
    }
    get A(){
        return this._A;
    }
}