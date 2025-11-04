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
        this.CurrentPlayerFocusedTile = undefined;//ProcessPlayerClickData
    }
    async Render(){
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        this.BackgroundRender.Render();
        this.ObjectsRender.Render();
    }


    async ProcessPlayerInput(){
        await this.ProcessClick();
        
    }

    async ProcessClick(){
        if(this.CurrentPlayerMove.Input.IsMouseDown){
            let [ClickedTileCoordsY,ClickedTileCoordsX] = [this.CurrentPlayerMove.Input.ClickedBoardTile["Y"],this.CurrentPlayerMove.Input.ClickedBoardTile["X"]];
            let CurrentPlayerClickedTile = await this.GetClickedTile(ClickedTileCoordsY,ClickedTileCoordsX);
            if(this.CurrentPlayerFocusedTile === undefined){
                if(CurrentPlayerClickedTile !== undefined){
                    //Player can only focuse self piece - if piece not chosen
                    if(this.CurrentTeamMove === CurrentPlayerClickedTile.Team){
                        this.CurrentPlayerFocusedTile = CurrentPlayerClickedTile;
                    }
                }
            }else{
                if(CurrentPlayerClickedTile !== undefined){
                    if(CurrentPlayerClickedTile.Team === this.CurrentPlayerFocusedTile.Team){
                        //If Player chose self piece - just change
                        this.CurrentPlayerFocusedTile = CurrentPlayerClickedTile;
                    }else{
                        //Else Player want move
                        if((await this.CurrentPlayerFocusedTile.IsCanMove(ClickedTileCoordsY,ClickedTileCoordsX)) === true){
                            await this.ProcessPieceMove(ClickedTileCoordsY,ClickedTileCoordsX);
                        }
                    }
                }else{
                    //Player want move also on Empty(undefined) Tile
                    if((await this.CurrentPlayerFocusedTile.IsCanMove(ClickedTileCoordsY,ClickedTileCoordsX)) === true){
                        await this.ProcessPieceMove(ClickedTileCoordsY,ClickedTileCoordsX);
                    }
                }
            }
        }
    }

    async ProcessPieceMove(ClickedY,ClickedX){
        let PrevTilePrevState = this.CurrentPlayerFocusedTile.Clone();
        let NewTilePrevState = await this.GetClickedTile(ClickedY,ClickedX);
        if(NewTilePrevState !== undefined){
            NewTilePrevState = NewTilePrevState.Clone();
        }
        this.AllObjectsTileMap.SetTileByIndex(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX,undefined);
        this.AllObjectsTileMap.SetTileByIndex(ClickedY,ClickedX,this.CurrentPlayerFocusedTile);
        await this.CurrentPlayerFocusedTile.Place(ClickedY,ClickedX);
        if((await GameLogic.IsKingAttacked(this.CurrentPlayerFocusedTile.Team)) === true){
            this.AllObjectsTileMap.SetTileByIndex(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX,this.CurrentPlayerFocusedTile);
            await this.CurrentPlayerFocusedTile.Place(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
            if(NewTilePrevState !== undefined){
                this.AllObjectsTileMap.SetTileByIndex(ClickedY,ClickedX,NewTilePrevState.Clone());
            }
            this.AllObjectsTileMap.SetTileByIndex(ClickedY,ClickedX,NewTilePrevState);
        }else{
            await this.ChangeCurrentTeamMove();
        }
    }

    async GetClickedTile(PosY,PosX){
        return this.AllObjectsTileMap.GetTileByIndex(PosY,PosX);
    }


    async ChangeCurrentTeamMove(){
        if(this.CurrentTeamMove == this.Teams[0]){
            this.CurrentTeamMove = this.Teams[1];
            this.CurrentPlayerMove = this.Player2;
        }else{
            this.CurrentTeamMove = this.Teams[0];
            this.CurrentPlayerMove = this.Player1;
        }
        this.CurrentPlayerFocusedTile = undefined;
    }

}