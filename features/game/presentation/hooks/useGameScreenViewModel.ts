import { Entry } from "@/features/match-creation/domain/GameLog";
import { MatchDetails } from "@/features/match-creation/domain/MatchDetails"
import { PointsBy } from "@/features/rules/constants/Enums";
import { useState } from "react";
import { Side } from "../../domain/Enums";
import { toggleSide } from "../../domain/util/SlideUtil";
import { getPointsForPlayer, getServingPlayer, getServingPlayerSide } from "../../domain/util/GameLogUtils";

export const useGameScreenViewModel = (matchDetails: MatchDetails) => {


    const {player1, player2, player1Games, player2Games, gameLog, matchRules} = matchDetails
    
    const [score_p1, setPlayer1Score] = useState(getPointsForPlayer(player1.getPlayerId(), gameLog));
    const [score_p2, setPlayer2Score] = useState(getPointsForPlayer(player2.getPlayerId(), gameLog));
    const [games_p1, setPlayer1Games] = useState(player1Games);
    const [games_p2, setPlayer2Games] = useState(player2Games);

    // Get stored serving side from gameLog, otherwise default to Right side
    const [servingSide, setServingSide] = useState<Side>(getServingPlayerSide(gameLog) ?? Side.RIGHT)

    // Get stored serving player from gameLog, otherwise default to player 1
    const [servingPlayer, setServingPlayer] = useState<number>(getServingPlayer(gameLog) ?? player1.getPlayerId())

    // Function to handle point win
    const handlePointWin = (playerId: number) => {
        switch(matchRules.pointsBy) {
            case PointsBy.PointOnServe: {
                // Check if they were already serving
                if(servingPlayer === playerId) {
                    // Yes, gain a point
                    incrementPlayerScore(playerId)

                    // Continue serving and change sides
                    handleToggleServingSide()
                    
                    // TODO Check if they've won
                } else {
                    // Set as serving player
                    setServingPlayer(playerId)
                    // Default serving side to RIGHT
                    setServingSide(Side.RIGHT)
                }
                break;
            }
            case PointsBy.PointPerRally: {
                // Add a point to the players score
                incrementPlayerScore(playerId)

                // Check if player was not serving
                if(servingPlayer !== playerId) {
                    // Set as serving player
                    setServingPlayer(playerId)
                    // Default serving side to RIGHT
                    setServingSide(Side.RIGHT)
                } else {
                    // Continue serving and change sides
                    handleToggleServingSide()
                }
                break;

                // TODO Check if they've won
            }
            default: {
                console.log("Unknown PointsBy value: ", matchRules.pointsBy)
                break;
            }
        }
    };

    const handleToggleServingSide = () => {
        setServingSide(toggleSide(servingSide))
    }

    const incrementPlayerScore = (playerId: number) => { 
        // TODO change to a Player object with PlayerID
        gameLog.addEntry(new Entry(playerId, servingSide, 1))
        if(playerId === player1.getPlayerId()) {
            setPlayer1Score(score_p1+1)
            return;
        }

        if(playerId === player2.getPlayerId()) {
            setPlayer2Score(score_p2+1)
            return;
        }
    }

    return {
        player1,
        player2,
        score_p1,
        score_p2,
        games_p1,
        games_p2,
        servingSide,
        servingPlayer,
        handlePointWin,
        handleToggleServingSide
    }
}