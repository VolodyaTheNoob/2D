export class GameData{
    constructor(_Team,_MovesCount,_IsCanMove) {
        this.Team = _Team;
        this.MovesCount = _MovesCount;
        this.IsCanMove = _IsCanMove;
        this.DestroyedPieces = Array();
    }
}