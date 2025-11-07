import { Rectangle } from "../Graphics/Rectangle.mjs";
    export const AXIS = {
        NONE: 1,
        HORIZONTAL: 2,
        VERTICAL: 3,
        BOTH: 4
    };
    export class Camera{
        constructor(PosY,PosX,_ViewHeight,_ViewWidth,ToFollow,WorldHeight,WorldWidth){
            this.PositionY = PosY;
            this.PositionX = PosX;
            this.DeadZoneY = 0;
            this.DeadZoneX = 0;
            this.ViewHeight = _ViewHeight;
            this.ViewWidth = _ViewWidth;
            this.Axis = AXIS.BOTH;
            this.Followed = ToFollow;
            this.ViewportRect = new Rectangle(this.PositionX,this.PositionY,this.ViewWidth,this.ViewHeight)
	        // rectangle that represents the world's boundary (room's boundary)
	       
        } 
}