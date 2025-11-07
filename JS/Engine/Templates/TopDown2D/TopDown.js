import * as ENGINE from "./EngineImports.mjs"
import * as CONST from "./GameJS/LOCAL.mjs"

//Starting Game When All Loaded
document.addEventListener('DOMContentLoaded', async ()=> {
    //Loading our Constants
    await CONST.LoadAllDynamicConstants();

    

}, false);