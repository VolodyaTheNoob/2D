import * as ENGINE from "./EngineImports.mjs"
import * as LOCAL from "./GameJS/LOCAL.mjs"

await ENGINE.CONST.CreateGraphicsConstants();

//Starting Game When All Loaded
document.addEventListener('DOMContentLoaded', async ()=> {

	await LOCAL.LoadAllDynamicConstants();

	let TimeStamp = 0;
	let LastTimestamp =  0;
	async function GameLoop(Timestamp) {
		const deltaTime = Timestamp - LastTimestamp;
		LastTimestamp = Timestamp;
		//GameLogic
		LOCAL.Player1.Move(deltaTime);
		//Graphic Render
		LOCAL.MainContext.clearRect(0,0,600,400)
		LOCAL.MainContext.save();
		await LOCAL.BackgroundRender.Render();
		await LOCAL.Player1.Cam.Follow();
		LOCAL.MainContext.restore();
		Timestamp = new Date().getTime();
		setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
	}
	
	requestAnimationFrame(GameLoop);//first call of loop

}, false);