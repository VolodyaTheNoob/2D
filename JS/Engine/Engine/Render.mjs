export class Render{
    constructor(ObjectsToRender = [],RenderFunction = undefined, RenderArgs = undefined){
        this._Objects = ObjectsToRender;
        this.RenderFunction = RenderFunction;
        this.RenderArgs = RenderArgs;
    }
    Start(){
        this.RenderFunction(this._Objects,this.RenderArgs);
    }
    AttachRenderFunction(FuncToAttach, FuncArgs){
        this.RenderFunction = FuncToAttach;
        this.RenderArgs = FuncArgs;
    }
    AddObject(Obj){
        this._Objects.push(Obj);
    }
    ChangeObject(NewObj,PosY,PosX = undefined){
        if(PosX === undefined){
            this._Objects[PosY] = NewObj;
        }else{
            this._Objects[PosY][PosX] = NewObj;
        }
    }
    DeleteObject(PosY,PosX = undefined){
        if(PosX === undefined){
            this._Objects[PosY] = undefined;
        }else{
            this._Objects[PosY][PosX] = undefined;
        }
    }
}