export class Player{
    constructor(_GameData,_Input,_GameObjects) {
        this.GameData = _GameData;
        this.Input = _Input;
        this.GameObjects = _GameObjects;
    }
    GetObjects(){
        return this.GameObjects;
    }
}