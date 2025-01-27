import { GameLog } from "@/features/match-creation/domain/GameLog"
import { MatchRules } from "@/features/rules/MatchRules"
import { getPointsForPlayer } from "./GameLogUtils";
import { WinningRequirement } from "@/features/rules/constants/Enums";

const isOnGameBall = (gameLog: GameLog, matchRules: MatchRules, ) => {
    const pointsPerGame = matchRules.getPointsPerGame();
    const winningRequirement = matchRules.getWinningRequirement();

    // Get distinct list of playerIds
    const playerIds = Array.from(new Set(gameLog.getEntries().flatMap((entry) => entry.getPlayerId()))) 
    
    switch(winningRequirement) {
        case WinningRequirement.FirstToGamePoint: {
            // Return if either of the players are on game point
            return playerIds.some(playerId => getPointsForPlayer(playerId ?? -1, gameLog) === (pointsPerGame - 1))
        }
        case WinningRequirement.WinByTwo: {
            const player1Points = getPointsForPlayer(playerIds.at(0) ?? -1, gameLog);
            const player2Points = getPointsForPlayer(playerIds.at(1) ?? -1, gameLog);

            // Calculate the point difference
            const pointDifference = Math.abs(player1Points - player2Points);

            console.log(`Player1Points:${player1Points} and PointsPerGame is ${pointsPerGame}`)

            // Check we have a lead
            if(pointDifference > 0) {
                return player1Points >= pointsPerGame - 1 || player2Points >= pointsPerGame - 1
            } else {
                return false
            }
        }
        default: throw Error(`Winning Requirement not checked: ${winningRequirement}`)
    }
}

const isOnMatchBall = (player1Games: number, player2Games: number, gameLog: GameLog, matchRules: MatchRules) => {
    const gamesPerMatch = matchRules.getGamesPerMatch();
    const gamesToBeOnMatchPoint = Math.floor(gamesPerMatch / 2)

    if(player1Games === gamesToBeOnMatchPoint || player2Games === gamesToBeOnMatchPoint) {
        return isOnGameBall(gameLog, matchRules)
    } else {
        return false;
    }
}

export const calculateGameOrMatchBallText = (gameLog: GameLog, matchRules: MatchRules, games_p1: number, games_p2: number) => {
        if(isOnGameBall(gameLog, matchRules)) {
            return "Game Ball"
        } else if (isOnMatchBall(games_p1, games_p2, gameLog, matchRules)) {
            return "Match Ball"
        } else {
            return undefined
        }
    }