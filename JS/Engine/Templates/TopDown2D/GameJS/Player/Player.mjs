export class Player{
		constructor(_Obj,_ViewPort= undefined,_Cam = undefined,_Input,_WorldBorders){
			this.Obj = _Obj;
			this.Speed = 1280; //1 sec speed in Pixels
			this.ViewPort = _ViewPort
			this.WorldBorders =_WorldBorders;
			this.Cam = _Cam;
			this.Input = _Input;
		}
		GetTexture(){
			return this.Obj.GetTexture();
		}
		Move(Time){
			Time = Time / 1000; //To secconds
			if(this.Input.IsKeyDown){
				if(this.Input.LastKey === "A"){
					this.Obj.PositionX -= this.Speed * Time;
					if(this.Obj.PositionX < this.WorldBorders.Left){
						this.Obj.PositionX = 0;
					}
				}
				if(this.Input.LastKey === "D"){
					this.Obj.PositionX += this.Speed * Time;
					if(this.Obj.PositionX > this.WorldBorders.Right){
						this.Obj.PositionX = this.WorldBorders.Right;
					}
				}
				if(this.Input.LastKey === "W"){
					this.Obj.PositionY -= this.Speed * Time;
					if(this.Obj.PositionY < this.WorldBorders.Top){
						this.Obj.PositionY = 0;
					}
				}
				if(this.Input.LastKey === "S"){
					this.Obj.PositionY += this.Speed * Time;
					console.log(this.Obj.PositionY,this.WorldBorders.Bottom)
					if(this.Obj.PositionY >= this.WorldBorders.Bottom){
						this.Obj.PositionY = this.WorldBorders.Bottom;
					}
				}
			}
		}
	}