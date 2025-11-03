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
        this.CurrentTeamMove = this.Teams[0];
        this.CurrentPlayerMove = this.Player1;
    }
    async Render(){
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        this.BackgroundRender.Render();
        this.ObjectsRender.Render();
    }


    async ProcessPlayerMove(){
        if(await this.IsPlayerMakeMove() == true){
            await this.ChangeCurrentTeamMove();
        }
    }

    async IsPlayerMakeMove(){
        if(this.CurrentPlayerMove.Input.IsMouseDown === true){
                let ClickedTileCoordinates = this.CurrentPlayerMove.Input.ClickedBoardTile;
                if(this.CurrentPlayerMove.Input.FocusedPiece === undefined){
                    this.CurrentPlayerMove.Input.FocusedPiece = await GameLogic.GetClickedCheesPiece(ClickedTileCoordinates);   
                }else{
                    let ClickedPiece= await GameLogic.GetClickedCheesPiece(ClickedTileCoordinates);
                    if(this.CurrentPlayerMove.Input.FocusedPiece != ClickedPiece){
                        if(ClickedPiece !== undefined){
                            if(this.CurrentPlayerMove.Input.FocusedPiece.Team == ClickedPiece.Team){
                                this.CurrentPlayerMove.Input.FocusedPiece = ClickedPiece;
                            }else{
                                let IsMoved =  await GameLogic.MovePieceWithClick(this.CurrentPlayerMove.Input.FocusedPiece,ClickedTileCoordinates);
                                if(IsMoved == true){
                                    this.CurrentPlayerMove.Input.FocusedPiece = undefined;
                                    return true;
                                } 
                            }
                        }else{
                            let IsMoved =  await GameLogic.MovePieceWithClick(this.CurrentPlayerMove.Input.FocusedPiece,ClickedTileCoordinates);
                            if(IsMoved == true){
                               this.CurrentPlayerMove.Input.FocusedPiece = undefined;
                                return true;
                            } 
                        }  
                    }    
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
    }

}