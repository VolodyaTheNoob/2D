import * as ENGINE from "./EngineImports.mjs"
import * as CONST from "./GameJS/LOCAL.mjs"

//Starting Game When All Loaded
document.addEventListener('DOMContentLoaded', async ()=> {
    //Loading our Constants
	await ENGINE.CONST.CreateGraphicsConstants();
	const PlayerTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.GreenImage,ENGINE.CONST.GreenImage.Image.width,ENGINE.CONST.GreenImage.height);
	let PlayerObject = new ENGINE.Object(PlayerTexture,0,0,0,0);
	
	class PlayerInput extends ENGINE.Input{
		constructor(){
			super();
			this.IsKeyDown = undefined;
			this.LastKey = undefined;
		}
	}

	let Input = new PlayerInput();
	Input.AddEventFunction("keydown",PlayerKeyboardDown,Input);
	Input.AddEventFunction("keyup",PlayerKeyboardUP,Input);
	function PlayerKeyboardDown(InputClass){
		document.addEventListener("keydown", (e) =>{
			InputClass.IsKeyDown = true;
			InputClass.LastKey = e.key;
		});
	}
	function PlayerKeyboardUP(InputClass){
		document.addEventListener("keyup", (e) =>{
			InputClass.LastKey = undefined;
			InputClass.IsKeyDown = false;
		});
	}
	
	class Player{
		constructor(_Obj,_Cam = undefined,_Input){
			this.Obj = _Obj;
			this.Speed = 128; //1 sec speed in Pixels
			this.Cam = _Cam;
			this.Input = _Input;
		}
		Move(Time){
			Time = Time / 1000; //To secconds
			if(this.Input.IsKeyDown){
				if(this.Input.LastKey === "A"){
					this.Obj.PositionX -= this.Speed * Time;
				}
				if(this.Input.LastKey === "D"){
					this.Obj.PositionX += this.Speed * Time;
					console.log(Time)
				}
				if(this.Input.LastKey === "W"){
					this.Obj.PositionY -= this.Speed * Time;
				}
				if(this.Input.LastKey === "S"){
					this.Obj.PositionY += this.Speed * Time;
				}
			}
		}
	}

	const [SizeY,SizeX] = [64,64];
	const Tiles = new Array(SizeY);
	await(async ()=>{
		let BlackTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.BlackImage,ENGINE.CONST.BlackImage.SizeY,ENGINE.CONST.BlackImage.SizeX);
		let WhiteTexture = new ENGINE.Graphics.Texture(ENGINE.CONST.WhiteImage,ENGINE.CONST.WhiteImage.SizeY,ENGINE.CONST.WhiteImage.SizeX);
		for(let y = 0; y < SizeY;y++){
			Tiles[y] = new Array(SizeX);
		}
		for(let y = 0; y < SizeY;y++){
			for(let x = 0; x < SizeX;x++){
				if(y % 2 == 0){
					if(x % 2 == 0){
						Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.BlackTexture,SizeY * y,SizeX * x,y,x);
					}else{
						Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.WhiteTexture,SizeY * y,SizeX * x,y,x);
					}
				}else{
					if(x % 2 == 0){
						Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.WhiteTexture,SizeY * y,SizeX * x,y,x);
					}else{
						Tiles[y][x] = new ENGINE.Tile(ENGINE.CONST.BlackTexture,SizeY * y,SizeX * x,y,x);
					}
				}
			}
		}
	})();
	class ViewPort{
		constructor(_Rect){
			this.Rect = _Rect;
		}
	}
	const MainContext = ENGINE.CONST.MainSceneContext;
	const BackContext = ENGINE.CONST.MainSceneBackBufferContext;
	const BackCanvas = ENGINE.CONST.MainSceneBackBufferDOM;
	MainContext.width = 4096;
	MainContext.height = 4096;
	BackContext.width = 4096;
	BackContext.height = 4096;
	const PlayerViewPort = new ViewPort(new ENGINE.Rectangle(0,0,300,300));
	const MapRect = new ENGINE.Rectangle(0,0,4096,4096);
	let DomDifY = MainContext.canvas.height / PlayerViewPort.Rect.Height;
	let DomDifX = MainContext.canvas.width / PlayerViewPort.Rect.Width;
	let Background = new ENGINE.TileMapStatic([SizeY,SizeX],[SizeY,SizeX],Tiles);
	let BackgroundRender = new ENGINE.Render(Background,BackgroundRenderFunction,PlayerObject);
	async function BackgroundRenderFunction(Background,PlayerObject){
		MainContext.drawImage(Background.StaticImage.Image);
	}
	await Background.Create();
	let Player1 = new Player(PlayerObject,PlayerViewPort,Input);


	let TimeStamp = 0;
	let LastTimestamp =  0;
	async function GameLoop(Timestamp) {
		const deltaTime = Timestamp - LastTimestamp;
		LastTimestamp = Timestamp;
		//GameLogic
		Player1.Move(deltaTime);
		//Graphic Render
		const angleInDegrees = 45; // or your desired angle
		//MainContext.rotate((45 * Math.PI) / 180);
		await BackgroundRender.Render();
		MainContext.drawImage(Player1.Obj.GetTexture(),0,0);
		Timestamp = new Date().getTime();
		setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
	}
	
	requestAnimationFrame(GameLoop);//first call of loop

}, false);