import { MatchRules } from "@/core/models/MatchRules";
import { WinningRequirement } from "@/core/constants/Enums";
import { GameLog } from "@/core/models/GameLog";
import { gameLogUtils } from "./GameLogUtils";

export const gameUtils = (gameLog: GameLog, matchRules: MatchRules) => {
  const { getPointsForPlayer } = gameLogUtils(gameLog);
  /**
   * @param gameLog GameLog for the Match
   * @param matchRules MatchRules for the Match
   * @returns If either of the players is currently on Game-Ball
   * Will return false if a player has already won.
   */
  const isOnGameBall = (): boolean => {
    const pointsPerGame = matchRules.getPointsPerGame();
    const winningRequirement = matchRules.getWinningRequirement();

    // Get distinct list of playerIds
    const playerIds = Array.from(
      new Set(gameLog.getEntries().flatMap((entry) => entry.getPlayerId()))
    );

    switch (winningRequirement) {
      case WinningRequirement.FirstToGamePoint: {
        // Return if either of the players are on game point
        return playerIds.some(
          (playerId) => getPointsForPlayer(playerId ?? -1) === pointsPerGame - 1
        );
      }
      case WinningRequirement.WinByTwo: {
        const player1Points = getPointsForPlayer(playerIds.at(0) ?? -1);
        const player2Points = getPointsForPlayer(playerIds.at(1) ?? -1);

        // Calculate the point difference
        const pointDifference = Math.abs(player1Points - player2Points);

        // Check we have a lead
        if (pointDifference > 0) {
          return (
            player1Points >= pointsPerGame - 1 ||
            player2Points >= pointsPerGame - 1
          );
        } else {
          return false;
        }
      }
      default:
        throw Error(`Winning Requirement not checked: ${winningRequirement}`);
    }
  };

  /**
   *
   * @param gameLog Game Log for the match
   * @param matchRules Match rules for the match
   * @returns The PlayerId if a player has won the game. (Not match)
   */
  const gameWinner = (): number | undefined => {
    const pointsPerGame = matchRules.getPointsPerGame();
    const winningRequirement = matchRules.getWinningRequirement();

    // Get distinct list of playerIds
    const playerIds = Array.from(
      new Set(gameLog.getEntries().flatMap((entry) => entry.getPlayerId()))
    );

    switch (winningRequirement) {
      case WinningRequirement.FirstToGamePoint: {
        // Check if P1 is winner
        const player1Points = getPointsForPlayer(playerIds.at(0) ?? -1);
        if (player1Points === pointsPerGame) return playerIds.at(0);

        // Check if P2 is winner
        const player2Points = getPointsForPlayer(playerIds.at(1) ?? -1);
        if (player2Points === pointsPerGame) return playerIds.at(1);

        // No winner
        return undefined;
      }
      case WinningRequirement.WinByTwo: {
        const player1Points = getPointsForPlayer(playerIds.at(0) ?? -1);
        const player2Points = getPointsForPlayer(playerIds.at(1) ?? -1);

        // Calculate the point difference
        const pointDifference = Math.abs(player1Points - player2Points);

        // Check we have a lead of at least 2
        if (pointDifference >= 2) {
          // Check if P1 is winner
          if (player1Points > player2Points && player1Points >= pointsPerGame)
            return playerIds.at(0);
          // Check if P2 is winner
          if (player2Points > player1Points && player2Points >= pointsPerGame)
            return playerIds.at(1);
        }

        // No winner
        return undefined;
      }
      default:
        throw Error(`Winning Requirement not checked: ${winningRequirement}`);
    }
  };

  return { isOnGameBall, gameWinner };
};
