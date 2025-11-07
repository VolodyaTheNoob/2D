import { ModuleLoader } from "../../../AsyncModuleLoader.mjs";
import * as ENGINE from "../EngineImports.mjs";

export const ConstantsLoader = new ModuleLoader("./Graphics/Graphics.mjs",ENGINE.CONST.CreateGraphicsConstants);
export const ConstantsModulePromise = ConstantsLoader.LoadModule;

export async function LoadAllDynamicConstants(){
    try{
        await ConstantsLoader.LoadModule();

    }catch(error){
        console.log(error);
    }
}