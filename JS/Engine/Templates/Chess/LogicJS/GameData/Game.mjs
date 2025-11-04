import * as ENGINE from "../../EngineImports.mjs";
import * as LOCALCONST from "./LocalConstants.mjs"
import * as RenderFunctions from "./GameRender.mjs";
import * as GameLogic from "./GameLogic.mjs";

class Board{
    constructor(_ChessBoardTiles,_ChessBoardObjects){
        this.BoardTileMap = _ChessBoardTiles;
        this.ObjectsTileMap = _ChessBoardObjects;
        this.PrevState = {};
    }
    async Push(PosY,PosX,Object){
        this.PrevState[PosY + " " + PosX] =  this.ObjectsTileMap.GetTileByIndex(PosY,PosX);
        this.ObjectsTileMap.SetTileByIndex(PosY,PosX,Object);
    }
    async Pop(PosY,PosX){
        this.ObjectsTileMap.SetTileByIndex(PosY,PosX,this.PrevState[PosY + " " + PosX]);
        delete this.PrevState[PosY + " " + PosX];
    }
    async Flush(){
        this.PrevState = {};
    }
}

export class Game{
    constructor(Player1,Player2,BackgroundTileMap, GameObjectsTileMap) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.ChessBoard = new Board(BackgroundTileMap,GameObjectsTileMap);
        this.BackgroundRender = new ENGINE.Render(this.ChessBoard.BoardTileMap,RenderFunctions.RenderTileMap,undefined);
        this.ObjectsRender = new ENGINE.Render(this.ChessBoard.ObjectsTileMap,RenderFunctions.SmartRender,this.ChessBoard.BoardTileMap);
        this.Teams = [Player1.GameData.Team,Player2.GameData.Team];
        /*
            I guess if I will go further - I will add new abstractions here
        */
        this.CurrentTeamMove = this.Teams[0];//ProcessPlayerMoveData
        this.CurrentPlayerMove = this.Player1;//ProcessPlayerMoveData
        this.CurrentPlayerFocusedTile = undefined;//ProcessPlayerClickData
        this.LastMovedPiece = undefined; // for passant
        [this.LastMovedPiecePrevPosY,this.LastMovedPiecePrevPosX] = [undefined,undefined];
    }
    async Render(){
        ENGINE.CONST.MainSceneContext.clearRect(0, 0, ENGINE.CONST.MainSceneContext.width, ENGINE.CONST.MainSceneContext.height);
        this.BackgroundRender.Render();
        this.ObjectsRender.Render();
        //Add dynamic visual
        if(this.CurrentPlayerFocusedTile !== undefined){
            await this.AddVisualToInput();
        }
    }

    async ProcessGame(){
        if(await this.IsGameEnded() === false){
            await this.ProcessPlayerInput();
        }
    }

    async IsGameEnded(){
        let CountOfAviableMoves = await this.GetCountOfPlayerMoves();
        if(CountOfAviableMoves == 0){
            return true;
        }
        return false;
    }

    async GetCountOfPlayerMoves(){
        let CountOfMoves = 0;
        let CurrentPlayerPieces = await this.GetPiecesByTeam(this.CurrentTeamMove);
        
        return CountOfMoves;
    }

    async GetPiecesByTeam(Team){
        let AllBoardPieces = LOCALCONST.GamePiecesTileMap.GetTiles();
        let PiecesByTeam = new Array();
        for(let y = 0; y < LOCALCONST.ChessBoardSize;y++){
           for(let x = 0; x < LOCALCONST.ChessBoardSize;x++){ 
                if(AllBoardPiaces[y][x] !== undefined){
                    if(AllBoardPieces[y][x].Team == Team){
                        PiecesByTeam.push(AllBoardPieces[y][x]);
                    }
                }
           }
        }
        return PiecesByTeam;
    } 

    async ProcessPlayerInput(){
        let IsPlayerMovePiece = await this.ProcessClick();
        if(IsPlayerMovePiece === true){
            let [ClickedTileCoordsY,ClickedTileCoordsX] = [this.CurrentPlayerMove.Input.ClickedBoardTile["Y"],this.CurrentPlayerMove.Input.ClickedBoardTile["X"]];
            await this.ProcessPieceMove(ClickedTileCoordsY,ClickedTileCoordsX);
        }
        
    }

    async AddVisualToInput(){
        const PickedPieceBackgroundColor = [238,232,170,128];
        let PieceImageData = RenderFunctions.BackgroundChanger(PickedPieceBackgroundColor,await this.CurrentPlayerFocusedTile.GetTexture(),[this.CurrentPlayerFocusedTile.SizeX,this.CurrentPlayerFocusedTile.SizeY]);
        ENGINE.CONST.MainSceneContext.putImageData(PieceImageData,this.CurrentPlayerFocusedTile.CoordinatesX, this.CurrentPlayerFocusedTile.CoordinatesY);
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
                            return true;
                        }
                    }
                }else{
                    //Player want move also on Empty(undefined) Tile
                    if((await this.CurrentPlayerFocusedTile.IsCanMove(ClickedTileCoordsY,ClickedTileCoordsX)) === true){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    async ProcessPieceMove(ClickedY,ClickedX){
        let PrevTilePrevState = this.CurrentPlayerFocusedTile.Clone();
        let NewTilePrevState = await this.GetClickedTile(ClickedY,ClickedX);
        if(NewTilePrevState !== undefined){
            NewTilePrevState = NewTilePrevState;
        }
        //Check for special events
        if(this.CurrentPlayerFocusedTile.Type === "King" || this.CurrentPlayerFocusedTile.Type === "Pawn"){
            if(this.CurrentPlayerFocusedTile.Type === "Pawn"){
                 await this.ProcessPawnMove(ClickedY,ClickedX);
            }else{
                //King events - roquete
                await this.ProcessKingMove(ClickedY,ClickedX);
            }
        }else{
            //Default move
            await this.PieceMove(PrevTilePrevState,NewTilePrevState,ClickedY,ClickedX);
        }
    }
    async PieceMove(PrevTilePrevState,NewTilePrevState,ClickedY,ClickedX) {
        const ChessBoard = this.ChessBoard;
        await ChessBoard.Push(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX,undefined);
        await ChessBoard.Push(ClickedY,ClickedX,this.CurrentPlayerFocusedTile);
        await this.CurrentPlayerFocusedTile.Place(ClickedY,ClickedX);
        if((await GameLogic.IsKingAttacked(this.CurrentPlayerFocusedTile.Team)) === true){
            await ChessBoard.Pop(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
            await this.CurrentPlayerFocusedTile.Place(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
            await ChessBoard.Pop(ClickedY,ClickedX);
        }else{
            await this.SaveLastMovedPieceData(this.CurrentPlayerFocusedTile,PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
            await this.ChangeCurrentTeamMove();
        }
    }
    async SaveLastMovedPieceData(Piece,PieceY,PieceX){
        this.LastMovedPiece = Piece; // Saving Last Moved Piece
        [this.LastMovedPiecePrevPosY,this.LastMovedPiecePrevPosX] = [PieceY,PieceX];
    }
    async ProcessPawnMove(ClickedY,ClickedX){
        if(await this.CurrentPlayerFocusedTile.IsCanMove(ClickedY,ClickedX) === true){
            let PrevTilePrevState = this.CurrentPlayerFocusedTile.Clone();
            let NewTilePrevState = await this.GetClickedTile(ClickedY,ClickedX);
            if(await this.CurrentPlayerFocusedTile.IsPassant(ClickedY,ClickedX) === true){
                //Passant
                NewTilePrevState = this.LastMovedPiece
                await this.ChessBoard.Push(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX,undefined);
                await this.ChessBoard.Push(NewTilePrevState.PositionY,NewTilePrevState.PositionX,undefined);
                await this.ChessBoard.Push(ClickedY,ClickedX,this.CurrentPlayerFocusedTile);
                await this.CurrentPlayerFocusedTile.Place(ClickedY,ClickedX);
                if((await GameLogic.IsKingAttacked(this.CurrentPlayerFocusedTile.Team)) === true){
                    await this.ChessBoard.Pop(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
                    await this.CurrentPlayerFocusedTile.Place(PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
                    await this.ChessBoard.Pop(NewTilePrevState.PositionY,NewTilePrevState.PositionX);
                    await this.ChessBoard.Pop(ClickedY,ClickedX);
                }else{
                    await this.SaveLastMovedPieceData(this.CurrentPlayerFocusedTile,PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
                    await this.ChangeCurrentTeamMove();
                }
            }else{
                //Default move
                await this.PieceMove(PrevTilePrevState,NewTilePrevState,ClickedY,ClickedX);
            }
        }
    }

    async GetClickedTile(PosY,PosX){
        return this.ChessBoard.ObjectsTileMap.GetTileByIndex(PosY,PosX);
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
        this.ChessBoard.Flush();
    }
    //GameProcessingSpecificPiecesMoves
    //KingMoveProcess
    async ProcessKingMove(ClickedY,ClickedX){
        if(await this.CurrentPlayerFocusedTile.IsCanMove(ClickedY,ClickedX) === true){
            let PrevTilePrevState = this.CurrentPlayerFocusedTile.Clone();
            let NewTilePrevState = await this.GetClickedTile(ClickedY,ClickedX);
            //Roquete
            if(await this.CurrentPlayerFocusedTile.IsCanRoquete(ClickedY,ClickedX) === true){
                if(await this.ProcessKingRoquete(ClickedY,ClickedX) === true){
                    await this.SaveLastMovedPieceData(this.CurrentPlayerFocusedTile,PrevTilePrevState.PositionY,PrevTilePrevState.PositionX);
                    await this.ChangeCurrentTeamMove();
                }
            }else{
                //Default move
                await this.PieceMove(PrevTilePrevState,NewTilePrevState,ClickedY,ClickedX);
            }
        }
    }
    async ProcessKingRoquete(PosY,PosX){
        let [KingPositionY,KingPositionX] = [this.CurrentPlayerFocusedTile.PositionY,this.CurrentPlayerFocusedTile.PositionX];
        let OffsetX = KingPositionX - PosX;
        let Rook;
        //Getting Rook
        if(OffsetX > 0){
            //QueeSide
            Rook = await this.GetClickedTile(KingPositionY,0);
        }else{
            //KingSide
            Rook = await this.GetClickedTile(KingPositionY,7);
        }
        if(Rook !== undefined){
            if(Rook.Team === this.CurrentTeamMove){
                if(Rook.AlreadyMoved === false){
                    if(OffsetX > 0){
                        //QueeSide
                        this.CurrentPlayerFocusedTile.Place(KingPositionY,PosX);
                        await this.ChessBoard.Push(KingPositionY,PosX,this.CurrentPlayerFocusedTile);
                        Rook.Place(KingPositionY,PosX+1)
                        await this.ChessBoard.Push(KingPositionY,PosX+1,Rook);
                        await this.ChessBoard.Push(KingPositionY,KingPositionX,undefined);
                        await this.ChessBoard.Push(KingPositionY,0,undefined);
                    }else{
                        //KingSide
                        this.CurrentPlayerFocusedTile.Place(KingPositionY,PosX);
                        await this.ChessBoard.Push(KingPositionY,PosX,this.CurrentPlayerFocusedTile);
                        Rook.Place(KingPositionY,PosX-1)
                        await this.ChessBoard.Push(KingPositionY,PosX-1,Rook);
                        await this.ChessBoard.Push(KingPositionY,KingPositionX,undefined);
                        await this.ChessBoard.Push(KingPositionY,7,undefined);
                    }
                    return true;
                }
            }
        }
        return false;
    }
}