import * as ENGINE from "./EngineImports.mjs"
import * as CONST from "./GameJS/LOCAL.mjs"

//Starting Game When All Loaded
document.addEventListener('DOMContentLoaded', async ()=> {
    //Loading our Constants
    await CONST.LoadAllDynamicConstants();

    class Camera{
        constructor(PosY,PosX,_ViewHeight,_ViewWidth,ToFollow){
            this.PositionY = PosY;
            this.PositionX = PosX;
            this.DeadZoneY = 0;
            this.DeadZoneX = 0;
            this.ViewHeight = _ViewHeight;
            this.ViewWidth = _ViewWidth;
            this.AXIS = {
                NONE: 1,
                HORIZONTAL: 2,
                VERTICAL: 3,
                BOTH: 4
            };
            this.Followed = ToFollow;
            this.viewportRect ={
                PosX: this.PositionX, 
                PosY: this.PositionY,
                ViewX: this.ViewHeight, 
                ViewY: this.ViewWidth
            }
	        // rectangle that represents the world's boundary (room's boundary)
	        this.worldRect = new Game.Rectangle(0, 0, worldWidth, worldHeight);
        }
    }

}, false);