import { GameLog } from "@/features/match-creation/domain/GameLog"
import { Side } from "../Enums";

export const getPointsForPlayer = (playerId: number, gameLog: GameLog): number => {
    return gameLog
        .getEntries()
        .filter((entry) => 
            entry.getPlayerId() === playerId && 
            entry.getPoint() !== undefined
        ).length;
}

export const getServingPlayer = (gameLog: GameLog): number | undefined => {
    return gameLog.getEntries().at(gameLog.getEntries().length)?.getPlayerId()
}

export const getServingPlayerSide = (gameLog: GameLog): Side | undefined => {
    return gameLog.getEntries().at(gameLog.getEntries().length)?.getSide()
}

