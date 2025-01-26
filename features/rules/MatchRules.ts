import { GameConfigurationError } from "../errors/GameConfigurationError"

export class MatchRules {
    private gamesPerMatch: number
    private pointsPerGame: number
    private pointPerRally: boolean
    private pointOnServe: boolean
    private winByTwo: boolean
    private firstToGamePoint: boolean
    private warmupMinutes: number

    constructor(
        gamesPerMatch: number,
        pointsPerGame: number,
        pointPerRally: boolean,
        pointOnServe: boolean,
        winByTwo: boolean,
        firstToGamePoint: boolean,
        warmupMinutes: number
    ) {
        // Validate point rules
        if(pointPerRally && pointOnServe) {
            throw new GameConfigurationError("pointPerRally and pointOnServe cannot both be true")
        }

        // Validate winner rules
        if(winByTwo && firstToGamePoint) {
            throw new GameConfigurationError("winByTwo and firstToGamePoint cannot both be true")
        }

        if(warmupMinutes <= 0) {
            throw new GameConfigurationError("Warmup minutes must be > 0")
        }

        this.gamesPerMatch = gamesPerMatch
        this.pointsPerGame = pointsPerGame
        this.pointPerRally = pointPerRally
        this.pointOnServe = pointOnServe
        this.winByTwo = winByTwo
        this.firstToGamePoint = firstToGamePoint
        this.warmupMinutes = warmupMinutes
    }

    // Method to return a description of the class instance
    public describe(): string {
        return `
        Match Configuration:
        - Games Per Match: ${this.gamesPerMatch}
        - Points Per Game: ${this.pointsPerGame}
        - Warmup minutes: ${this.warmupMinutes}
        - Point Per Rally: ${this.pointPerRally ? "Yes" : "No"}
        - Point On Serve: ${this.pointOnServe ? "Yes" : "No"}
        - Win By Two: ${this.winByTwo ? "Yes" : "No"}
        - First To Game Point: ${this.firstToGamePoint ? "Yes" : "No"}
        `;
    }
}