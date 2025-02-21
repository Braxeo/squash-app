import { Side } from "../constants/Enums";
import { Entry, GameLog } from "../models/GameLog";
import { MatchDetails } from "../models/MatchDetails";
import { Player } from "../models/Player";
import { gameUtils } from "./GameUtils";
import { toggleSide } from "./SideUtils";

export const matchUtils = (matchDetails: MatchDetails) => {
  const { matchRules, gameLogs } = matchDetails;

  const getCurrentGame = () => matchDetails.currentGame;

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
    const currentGame = getCurrentGame();

    if (
      currentGame !== undefined &&
      (player1Games === gamesToBeOnMatchPoint ||
        player2Games === gamesToBeOnMatchPoint)
    ) {
      return gameUtils(currentGame, matchRules).isOnGameBall();
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
    const currentGame = getCurrentGame();
    if (currentGame === undefined) {
      return undefined;
    } else if (isOnMatchBall()) {
      return "Match Ball";
    } else if (gameUtils(currentGame, matchRules).isOnGameBall()) {
      return "Game Ball";
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
    const {
      player1,
      player1Games,
      player2,
      player2Games,
      matchRules,
      currentGame,
    } = matchDetails;
    // The total games in a match
    const gamesPerMatch = matchRules.getGamesPerMatch();
    // The amount of games a player must win to win the match
    const gamesToHaveWon = Math.ceil(gamesPerMatch / 2);

    // Check if they have won based on won games
    if (player1Games === gamesToHaveWon) {
      return player1.getPlayerId();
    } else if (player2Games === gamesToHaveWon) {
      return player2.getPlayerId();
    }

    // Check if we're on the final game
    const isOnFinalGame = [player1Games, player2Games].includes(
      gamesToHaveWon - 1
    );

    // Check if they have won based on won games + the current game
    if (currentGame && isOnFinalGame) {
      // Check if we have an active game with a winner
      const { gameWinner } = gameUtils(currentGame, matchRules);
      const winnerOfCurrentGame = gameWinner();

      console.log(winnerOfCurrentGame);

      if (
        player1Games === gamesToHaveWon - 1 &&
        winnerOfCurrentGame === player1.getPlayerId()
      ) {
        return player1.getPlayerId();
      } else if (
        player2Games === gamesToHaveWon - 1 &&
        winnerOfCurrentGame === player2.getPlayerId()
      ) {
        return player2.getPlayerId();
      }
    }

    return undefined;
  };

  const archiveCurrentGame = () => {
    const currentGame = getCurrentGame();
    if (currentGame) {
      gameLogs.push(currentGame);
    }
    matchDetails.currentGame = undefined;
  };

  const startNextGame = (server: Player, side: Side) => {
    archiveCurrentGame();
    matchDetails.currentGame = new GameLog();
    getCurrentGame()?.setStartDate(new Date());
    getCurrentGame()?.addEntry(
      new Entry(
        server.getPlayerId(),
        // Toggle side so we start on the expected side
        toggleSide(side),
        undefined
      )
    );
  };

  const getCurrentGameDuration = (): number => {
    console.log(`Current Game Duration: ${getCurrentGame()?.getDuration()}`);
    return getCurrentGame()?.getDuration() ?? 0;
  };

  /**
   * Decision - Warmup is not counted in match duration.
   * @returns The total duration in seconds of the previous + current games.
   */
  const getMatchDuration = (): number => {
    return (
      gameLogs.reduce((total, log) => total + log.getDuration(), 0) +
      (getCurrentGame()?.getDuration() ?? 0)
    );
  };

  return {
    calculateGameOrMatchBallText,
    calculateMatchWinningPlayer,
    getMatchDuration,
    getCurrentGameDuration,
    startNextGame,
    archiveCurrentGame,
  };
};
