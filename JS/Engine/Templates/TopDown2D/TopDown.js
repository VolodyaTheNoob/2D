import * as ENGINE from "./EngineImports.mjs"
import * as CONST from "./GameJS/LOCAL.mjs"

await ENGINE.CONST.CreateGraphicsConstants();

//Starting Game When All Loaded
document.addEventListener('DOMContentLoaded', async ()=> {

	await CONST.LoadAllDynamicConstants();

	let TimeStamp = 0;
	let LastTimestamp =  0;
	async function GameLoop(Timestamp) {
		const deltaTime = Timestamp - LastTimestamp;
		LastTimestamp = Timestamp;
		//GameLogic
		CONST.Player1.Move(deltaTime);
		//Graphic Render
		CONST.MainContext.clearRect(0,0,600,400)
		CONST.MainContext.save();
		await CONST.BackgroundRender.Render();
		await CONST.Player1.Cam.Follow();
		CONST.MainContext.restore();
		Timestamp = new Date().getTime();
		setTimeout(()=>{requestAnimationFrame(GameLoop)},100); //Looping loop
	}
	
	requestAnimationFrame(GameLoop);//first call of loop

}, false);