import { GameConfigurationError } from "../errors/GameConfigurationError"
import { PointsBy } from "./constants/Enums"
import { WinningRequirement } from "./constants/Enums"

export class MatchRules {
    private gamesPerMatch: number
    private pointsPerGame: number
    private pointsBy: PointsBy
    private winningRequirement: WinningRequirement
    public warmupMinutes: number

    constructor(
        gamesPerMatch: number,
        pointsPerGame: number,
        pointsBy: PointsBy,
        winningRequirement: WinningRequirement,
        warmupMinutes: number
    ) {
        if(warmupMinutes <= 0) {
            throw new GameConfigurationError("Warmup minutes must be > 0")
        }

        this.gamesPerMatch = gamesPerMatch
        this.pointsPerGame = pointsPerGame
        this.pointsBy = pointsBy
        this.winningRequirement = winningRequirement
        this.warmupMinutes = warmupMinutes
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