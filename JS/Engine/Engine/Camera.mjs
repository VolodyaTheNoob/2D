import { Rectangle } from "../Graphics/Rectangle.mjs";
import { Render } from "../Templates/TopDown2D/EngineImports.mjs";

export class Camera{
        constructor(_CTX = ENGINE.MainContext,_ObjViewPort,_Obj,_MapBorders, [_ScaleY = 1,_ScaleX = 1]){
            [this.ScaleY,this.ScaleX] = [_ScaleY,_ScaleX];
            this.CTX = _CTX;
            this.ObjectViewPort = _ObjViewPort;
            this.ObjectToFollow = _Obj;
            this.Borders = _MapBorders
            this.ObjectRender = new Render(this.ObjectToFollow,this.ObjectRenderFunction,[this.CTX,this.Borders,this.ObjectViewPort,this.ScaleY,this.ScaleX]);
        }

        async Follow(){
            await this.ObjectRender.Render();
        }
        async ObjectRenderFunction(ObjectToFollow,CTX,Borders,ObjectViewPort,ScaleY,ScaleX){
            let IsFollowX = false;
            let IsFollowY = false;
            //X
            if(ObjectToFollow.Obj.PositionX >= ObjectViewPort.Rect.Right || ObjectToFollow.Obj.PositionX  <=  ObjectViewPort.Rect.Right - Borders.Right ){
                IsFollowX = true;
            }
            //Y
            if(ObjectToFollow.Obj.PositionY >= ObjectViewPort.Rect.Bottom || ObjectToFollow.Obj.PositionX  <=  ObjectViewPort.Rect.Bottom - Borders.Bottom ){
                IsFollowY = true;
            }
            let RenderPosX = ObjectToFollow.Obj.PositionX;
            let RenderPosY = ObjectToFollow.Obj.PositionY;
            if(IsFollowX === true){
                RenderPosX = ObjectViewPort.Rect.Right;
            }
            if(IsFollowY === true){
                RenderPosY = ObjectViewPort.Rect.Bottom;
            }

            CTX.drawImage(ObjectToFollow.GetTexture(),
            0,
            0,
            ObjectToFollow.Obj.SizeX,
            ObjectToFollow.Obj.SizeY,
            RenderPosX,
            RenderPosY,
            ObjectToFollow.Obj.SizeX * ScaleX, //Scale
            ObjectToFollow.Obj.SizeY * ScaleY,//Scale
            );		
        }
    }