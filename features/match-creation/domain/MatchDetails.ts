import { MatchRules } from "../../rules/MatchRules"
import { GameLog } from "./GameLog"
import { Player } from "./Player"

export class MatchDetails {
    public player1: Player
    public player2: Player
    public player1Games: number
    public player2Games: number
    public gameLog: GameLog
    public matchRules: MatchRules

    constructor(
        player1: Player,
        player2: Player,
        matchRules: MatchRules,
        player1Games: number = 0,
        player2Games: number = 0,
        gameLog: GameLog = new GameLog()
    ) {
        this.player1 = player1
        this.player2 = player2
        this.matchRules = matchRules
        this.player1Games = player1Games
        this.player2Games = player2Games
        this.gameLog = gameLog
    }

    public describe(): string {
        return `
          Match Details:
          - Player 1: ${this.player1.describe()}
          - Player 2: ${this.player2.describe()}
          - Match Rules: ${this.matchRules.describe()} 
          - Player 1 Games Won: ${this.player1Games}
          - Player 2 Games Won: ${this.player2Games}
          - Game Log: ${this.gameLog.describe()}
        `;
      }
}