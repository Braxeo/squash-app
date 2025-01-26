import { MatchRules } from "../../rules/MatchRules"
import { GameLog } from "./GameLog"

export class MatchDetails {
    private player1: string
    private player2: string
    private matchRules: MatchRules
    private player1Games: number
    private player2Games: number
    private gameLog: GameLog

    constructor(
        player1: string,
        player2: string,
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
          - Player 1: ${this.player1}
          - Player 2: ${this.player2}
          - Match Rules: ${this.matchRules.describe()} 
          - Player 1 Games Won: ${this.player1Games}
          - Player 2 Games Won: ${this.player2Games}
          - Game Log: ${this.gameLog.describe()}
        `;
      }
}