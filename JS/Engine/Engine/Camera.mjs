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
            this.ViewportRect = new ENGINE.Rectangle(this.PositionX,this.PositionY,this.ViewWidth,this.ViewHeight)
	        // rectangle that represents the world's boundary (room's boundary)
	        this.WorldRect = new ENGINE.Rectangle(0, 0, WorldWidth, WorldHeight);
        }
        Follow(GameObject, DeadZoneY, DeadZoneX) {
            this.Followed = GameObject;
            this.DeadZoneY = DeadZoneY;
            this.DeadZoneX = DeadZoneX;
	    }

	    Update(){
	    // keep following the player (or other desired object)
	    if (this.Followed != null) {
	      if (this.Axis == AXIS.HORIZONTAL || this.Axis == AXIS.BOTH) {
	        // moves camera on horizontal axis based on followed object position
	        if (this.Followed.PositionX - this.PositionX + this.DeadZoneX > this.ViewWidth)
	          this.PositionX = this.Followed.PositionX - (this.ViewWidth - this.DeadZoneX);
	        else if (this.Followed.PositionX - this.DeadZoneX < this.PositionX)
	          this.PositionX = this.Followed.PositionX - this.DeadZoneX;

	      }
	      if (this.Axis == AXIS.VERTICAL || this.Axis == AXIS.BOTH) {
	        // moves camera on vertical axis based on followed object position
	        if (this.Followed.PositionY - this.PositionY + this.DeadZoneY > this.ViewHeight)
	          this.PositionY = this.Followed.PositionY - (this.ViewHeight - this.DeadZoneY);
	        else if (this.Followed.PositionY - this.DeadZoneY < this.PositionY)
	          this.PositionY = this.Followed.PositionY - this.DeadZoneY;
	      }
	    }
	    // update viewportRect
	    this.ViewportRect.set(this.PositionX, this.PositionY);

	    // don't let camera leaves the world's boundary
	    if (!this.ViewportRect.within(this.WorldRect)) {
	      if (this.ViewportRect.Left < this.WorldRect.Left)
	        this.PositionX = this.WorldRect.Left;
	      if (this.ViewportRect.Top < this.WorldRect.Top)
	        this.PositionY = this.WorldRect.Top;
	      if (this.ViewportRect.RIGHT > this.WorldRect.Right)
	        this.PositionX = this.WorldRect.Right - this.PositionX;
	      if (this.ViewportRect.Bottom > this.WorldRect.Bottom)
	        this.PositionY = this.WorldRect.Bottom - this.PositionY;
	    }
    }
}