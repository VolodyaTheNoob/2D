import { Rectangle } from "../Graphics/Rectangle.mjs";
import { Render } from "../Templates/TopDown2D/EngineImports.mjs";

export class Camera{
        constructor(_CTX = ENGINE.MainContext,_ObjViewPort,_Obj,_MapBorders){
            this.CTX = _CTX;
            this.ObjectViewPort = _ObjViewPort;
            this.ObjectToFollow = _Obj;
            this.Borders = _MapBorders
            this.ObjectRender = new Render(this.ObjectToFollow,this.ObjectRenderFunction,[this.CTX,this.Borders]);
        }

        async Follow(){
            await this.ObjectRender.Render();
        }
        async ObjectRenderFunction(ObjectToFollow,CTX,Borders){
            let IsFollowX = false;
            let IsFollowY = false;
            let DistX = ObjectToFollow.ViewPort.Rect.Width / 2;
            let DistY = ObjectToFollow.ViewPort.Rect.Height / 2;
            let LeftCheck = ObjectToFollow.Obj.PositionX - DistX;
            let RightCheck = ObjectToFollow.Obj.PositionX + DistX;
            let TopCheck = ObjectToFollow.Obj.PositionY - DistY;
            let BottomCheck = ObjectToFollow.Obj.PositionY + DistY;
            //X
            if(LeftCheck >= Borders.Left || RightCheck >=  Borders.Right){
                IsFollowX = true;
            }
            //Y
            if(TopCheck >= Borders.Top || BottomCheck >= Borders.Bottom){
                IsFollowY = true;
            }
            let RenderPosX = ObjectToFollow.Obj.PositionX;
            let RenderPosY = ObjectToFollow.Obj.PositionY;
            if(IsFollowX === true){
                RenderPosX = DistX;
            }
            if(IsFollowY === true){
                RenderPosY = DistY;
            }

            CTX.drawImage(ObjectToFollow.GetTexture(),
            0,
            0,
            ObjectToFollow.Obj.SizeX,
            ObjectToFollow.Obj.SizeY,
            RenderPosX,
            RenderPosY,
            ObjectToFollow.Obj.SizeX, //Scale
            ObjectToFollow.Obj.SizeY //Scale
            );		
        }
    }