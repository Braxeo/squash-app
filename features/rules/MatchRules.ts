import { GameConfigurationError } from "../errors/GameConfigurationError";
import { PointsBy } from "./constants/Enums";
import { WinningRequirement } from "./constants/Enums";

export class MatchRules {
  private gamesPerMatch: number;
  private pointsPerGame: number;
  private pointsBy: PointsBy;
  private winningRequirement: WinningRequirement;
  public warmupMinutes: number;

  constructor(
    gamesPerMatch: number,
    pointsPerGame: number,
    pointsBy: PointsBy,
    winningRequirement: WinningRequirement,
    warmupMinutes: number
  ) {
    if (warmupMinutes <= 0) {
      throw new GameConfigurationError("Warmup minutes must be > 0");
    }

    if (gamesPerMatch % 2 !== 1) {
      throw new GameConfigurationError(
        "Games in a match should be odd numbered"
      );
    }

    this.gamesPerMatch = gamesPerMatch;
    this.pointsPerGame = pointsPerGame;
    this.pointsBy = pointsBy;
    this.winningRequirement = winningRequirement;
    this.warmupMinutes = warmupMinutes;
  }

  public getGamesPerMatch(): number {
    return this.gamesPerMatch;
  }

  public getPointsPerGame(): number {
    return this.pointsPerGame;
  }

  public getPointsBy(): PointsBy {
    return this.pointsBy;
  }

  public getWinningRequirement(): WinningRequirement {
    return this.winningRequirement;
  }

  public getWarmupMinutes(): number {
    return this.warmupMinutes;
  }

  // Method to return a description of the class instance
  public describe(): string {
    return `
        Match Configuration:
        - Games Per Match: ${this.gamesPerMatch}
        - Points Per Game: ${this.pointsPerGame}
        - Warmup minutes: ${this.warmupMinutes}
        - Points By: ${this.pointsBy}
        - Winning Requirements: ${this.winningRequirement}
        `;
  }
}
