import { GameLog } from "./GameLog";
import { MatchRules } from "./MatchRules";
import { Player } from "./Player";

export class MatchDetails {
  public player1: Player;
  public player2: Player;
  public player1Games: number;
  public player2Games: number;
  public currentGame: GameLog | undefined = undefined;
  public gameLogs: GameLog[] = [];
  public matchRules: MatchRules;

  constructor(
    player1: Player,
    player2: Player,
    matchRules: MatchRules,
    currentGame: GameLog | undefined = undefined,
    player1Games: number = 0,
    player2Games: number = 0,
    gameLogs: GameLog[] = []
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.matchRules = matchRules;
    this.player1Games = player1Games;
    this.player2Games = player2Games;
    this.gameLogs = gameLogs;
    this.currentGame = currentGame;
  }

  public describe(): string {
    return `
          Match Details:
          - Player 1: ${this.player1.describe()}
          - Player 2: ${this.player2.describe()}
          - Match Rules: ${this.matchRules.describe()} 
          - Player 1 Games Won: ${this.player1Games}
          - Player 2 Games Won: ${this.player2Games}
          - Current Game: ${this.currentGame?.describe()}
          - Game Logs: ${
            "\n" + this.gameLogs.map((log) => log.describe()).join("\n")
          }
        `;
  }
}
