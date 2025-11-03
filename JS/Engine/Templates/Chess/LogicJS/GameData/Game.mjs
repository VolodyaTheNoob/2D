import * as ENGINE from "../../EngineImports.mjs";
import * as LOCALCONST from "./LocalConstants.mjs"
import * as RenderFunctions from "./GameRender.mjs";
import * as GameLogic from "./GameLogic.mjs";

export class Game{
    constructor(Player1,Player2,BackgroundTileMap, GameObjectsTileMap) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.BackgroundTileMap = BackgroundTileMap;
        this.AllObjectsTileMap = GameObjectsTileMap;
        this.BackgroundRender = new ENGINE.Render(this.BackgroundTileMap,RenderFunctions.RenderTileMap,undefined);
        this.ObjectsRender = new ENGINE.Render(this.AllObjectsTileMap,RenderFunctions.SmartRender,this.BackgroundTileMap);
        this.Teams = [Player1.GameData.Team,Player2.GameData.Team];
        /*
            I guess if I will go further - I will add new abstractions here
        */
        this.CurrentTeamMove = this.Teams[0];//ProcessPlayerMoveData
        this.CurrentPlayerMove = this.Player1;//ProcessPlayerMoveData
        this.CurrentPlayerFocusedPiece = undefined;//ProcessPlayerClickData
        this.CurrentPlayerFocusedTile = undefined;//ProcessPlayerClickData
    }
    async Render(){
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        this.BackgroundRender.Render();
        this.ObjectsRender.Render();
    }


    async ProcessPlayerInput(){
        await this.ProcessPlayerClick();
        if(await this.ProcessPlayerMove() === true){

            await this.ChangeCurrentTeamMove();
        }
        
    }

    async ProcessPlayerClick(){
        if(this.CurrentPlayerMove.Input.IsMouseDown == true){
            let ClickedTile = this.CurrentPlayerMove.Input.ClickedBoardTile;
            if(this.CurrentPlayerFocusedPiece === undefined){
                this.CurrentPlayerFocusedPiece = this.AllObjectsTileMap.GetTileByIndex(ClickedTile["Y"],ClickedTile["X"]);
                //If Player trying to focus enemy piece to move it - decline
                if(this.CurrentPlayerFocusedPiece === undefined){
                    this.CurrentPlayerFocusedPiece = undefined;
                }else{
                    if(this.CurrentPlayerMove.GameData.Team != this.CurrentPlayerFocusedPiece.Team){
                        this.CurrentPlayerFocusedPiece = undefined;
                    }
                }
            }else{
                let ClickedObject = this.AllObjectsTileMap.GetTileByIndex(ClickedTile["Y"],ClickedTile["X"]);
                if(this.CurrentPlayerFocusedPiece !== ClickedObject){
                    if(ClickedObject !== undefined){
                        try{
                            if(this.CurrentPlayerFocusedPiece.Team === ClickedObject.Team){
                                //Just changing focused object
                                this.CurrentPlayerFocusedPiece = ClickedTile;
                            }else{
                                if(await this.CurrentPlayerFocusedPiece.IsCanMove(ClickedTile["Y"],ClickedTile["X"])){
                                    this.CurrentPlayerFocusedTile = ClickedTile;
                                }else{
                                    this.CurrentPlayerFocusedTile = undefined;
                                }
                            }
                        }catch(error){
                            console.log(error);
                        }
                    }else{
                        try{
                            if(await this.CurrentPlayerFocusedPiece.IsCanMove(ClickedTile["Y"],ClickedTile["X"])){
                                this.CurrentPlayerFocusedTile = ClickedTile;
                            }else{
                                this.CurrentPlayerFocusedTile = undefined;
                            }
                        }catch(error){
                            console.log(error);
                        }
                    }
                }else{
                    this.CurrentPlayerFocusedTile = undefined;
                }
            }
        }
    }
    async ProcessPlayerMove(){
        if(this.CurrentPlayerFocusedTile !== undefined){
            let PrevPosY = this.CurrentPlayerFocusedPiece.PositionY
            let PrevPosX = this.CurrentPlayerFocusedPiece.PositionX;
            let NewPosY = this.CurrentPlayerFocusedTile["Y"];
            let NewPosX = this.CurrentPlayerFocusedTile["X"];
            let PrevPosSavedPiece = this.AllObjectsTileMap.GetTileByIndex(PrevPosY,PrevPosX);
            let NewPosSavedPiece = this.AllObjectsTileMap.GetTileByIndex(NewPosY,NewPosX); 
            PrevPosSavedPiece = PrevPosSavedPiece.Clone();
            if(NewPosSavedPiece !== undefined){
                NewPosSavedPiece = NewPosSavedPiece.Clone();
            }            
            await this.CurrentPlayerFocusedPiece.Move(NewPosY,NewPosX);
            this.AllObjectsTileMap.SetTileByIndex(PrevPosY,PrevPosX,undefined);
            this.AllObjectsTileMap.SetTileByIndex(NewPosY,NewPosX,this.CurrentPlayerFocusedPiece); 
            if(await GameLogic.IsKingAttacked(PrevPosSavedPiece.Team) == false){
                return true;
            }else{
                await this.CurrentPlayerFocusedPiece.Move(PrevPosY,PrevPosX);
                this.AllObjectsTileMap.SetTileByIndex(PrevPosY,PrevPosX,this.CurrentPlayerFocusedPiece);
                this.AllObjectsTileMap.SetTileByIndex(NewPosY,NewPosX,NewPosSavedPiece);
                return false;
            }
        }
        return false;
    }
    async ChangeCurrentTeamMove(){
        if(this.CurrentTeamMove == this.Teams[0]){
            this.CurrentTeamMove = this.Teams[1];
            this.CurrentPlayerMove = this.Player2;
        }else{
            this.CurrentTeamMove = this.Teams[0];
            this.CurrentPlayerMove = this.Player1;
        }
        this.CurrentPlayerFocusedPiece = undefined;
        this.CurrentPlayerFocusedTile = undefined;
    }

}