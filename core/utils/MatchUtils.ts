import { MatchDetails } from "../models/MatchDetails";
import { gameUtils } from "./GameUtils";

export const matchUtils = (matchDetails: MatchDetails) => {
  const { currentGame, matchRules } = matchDetails;

  let isOnGameBall = () => false;
  /**
   * This is a terrible way to handle a nullable value for gameUtils, but
   * alas here we are.
   */
  if (currentGame) {
    const { isOnGameBall: _isOnGameBall } = gameUtils(currentGame, matchRules);
    isOnGameBall = _isOnGameBall;
  }

  /**
   *
   * @param player1Games Games won by Player 1
   * @param player2Games Games won by Player 2
   * @param gameLog GameLog for Match
   * @param matchRules Match Rules for Match
   * @returns If either player is currently on Match Ball
   * Will return false if either player has won the match.
   */
  const isOnMatchBall = () => {
    const { player1Games, player2Games } = matchDetails;
    const gamesPerMatch = matchRules.getGamesPerMatch();
    const gamesToBeOnMatchPoint = Math.floor(gamesPerMatch / 2);

    if (
      currentGame !== undefined &&
      (player1Games === gamesToBeOnMatchPoint ||
        player2Games === gamesToBeOnMatchPoint)
    ) {
      return isOnGameBall();
    } else {
      return false;
    }
  };

  /**
   *
   * @param gameLog GameLog for the Match
   * @param matchRules Match Rules for the Match
   * @param games_p1 Games won by Player 1
   * @param games_p2 Games won by Player 2
   * @returns Display text for if the match is currently on game or match ball
   */
  const calculateGameOrMatchBallText = () => {
    if (currentGame === undefined) {
      return undefined;
    } else if (isOnGameBall()) {
      return "Game Ball";
    } else if (isOnMatchBall()) {
      return "Match Ball";
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param matchDetails details of the match to assess
   * @returns The PlayerId of the winner of the match, undefined otherwise
   */
  const calculateMatchWinningPlayer = (): number | undefined => {
    const { player1, player1Games, player2, player2Games, matchRules } =
      matchDetails;
    const gamesPerMatch = matchRules.getGamesPerMatch();
    const gamesToHaveWon = Math.ceil(gamesPerMatch / 2);

    if (player1Games === gamesToHaveWon) {
      return player1.getPlayerId();
    } else if (player2Games === gamesToHaveWon) {
      return player2.getPlayerId();
    }

    return undefined;
  };

  return { calculateGameOrMatchBallText, calculateMatchWinningPlayer };
};
