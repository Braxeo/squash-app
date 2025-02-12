import { useState } from "react";
import { PointsBy, Side } from "../../../../core/constants/Enums";
import { MatchValidationError } from "@/core/errors/MatchValidationError";
import { GameValidationError } from "@/core/errors/GameValidationError";
import { Entry } from "@/core/models/GameLog";
import { MatchDetails } from "@/core/models/MatchDetails";
import { toggleSide } from "@/core/utils/SideUtils";
import { GameConfigurationError } from "@/core/errors/GameConfigurationError";
import { gameLogUtils } from "@/core/utils/GameLogUtils";
import { matchUtils } from "@/core/utils/MatchUtils";
import { gameUtils } from "@/core/utils/GameUtils";

export const useGameScreenViewModel = (matchDetails: MatchDetails) => {
  const {
    player1,
    player2,
    player1Games,
    player2Games,
    currentGame,
    matchRules,
  } = matchDetails;

  if (currentGame === undefined) {
    throw new GameConfigurationError("Current game should not be undefined");
  }

  const {
    getPointsForPlayer,
    getServingPlayersLastSide,
    getServingPlayer,
    setServingPlayerAndSide,
    undo,
  } = gameLogUtils(currentGame);

  const { gameWinner, updateGameDuration } = gameUtils(currentGame, matchRules);

  const {
    calculateGameOrMatchBallText,
    calculateMatchWinningPlayer,
    getMatchDuration,
    getCurrentGameDuration,
    startNextGame,
    archiveCurrentGame,
  } = matchUtils(matchDetails);

  const [score_p1, setPlayer1Score] = useState(
    getPointsForPlayer(player1.getPlayerId())
  );
  const [score_p2, setPlayer2Score] = useState(
    getPointsForPlayer(player2.getPlayerId())
  );
  const [games_p1, setPlayer1Games] = useState(player1Games);
  const [games_p2, setPlayer2Games] = useState(player2Games);

  // Get stored last serving side from gameLog, toggle as this was where they scored their last point from,
  // otherwise default to Right side
  const lastServeSide = getServingPlayersLastSide();
  const startingServeSide = lastServeSide
    ? toggleSide(lastServeSide)
    : Side.RIGHT;
  const [servingSide, setServingSide] = useState<Side>(startingServeSide);

  // Get stored serving player from gameLog, otherwise default to player 1
  const [servingPlayer, setServingPlayer] = useState<number>(
    getServingPlayer() ?? player1.getPlayerId()
  );

  const [gameOrMatchBallText, setGameOrMatchBallText] = useState<
    string | undefined
  >(calculateGameOrMatchBallText());

  // Winner of the game
  const [winnerText, setWinnerText] = useState<string | undefined>();

  // Function to handle point win
  const handlePointWin = (playerId: number) => {
    switch (matchRules.getPointsBy()) {
      case PointsBy.PointOnServe: {
        // Check if they were already serving
        if (servingPlayer === playerId) {
          // Yes, gain a point
          incrementPlayerScore(playerId);

          // Update the game or match ball text
          updateGameOrMatchBall();

          // Continue serving and change sides
          setServingSide(toggleSide(servingSide));
        } else {
          // Add a new entry into the gameLog, so that we know they've won the last rally
          // no point was awarded, but the change of server still occurs
          currentGame.addEntry(new Entry(playerId, undefined, undefined));
          // Set as serving player
          setServingPlayer(playerId);
          // Default serving side to RIGHT
          setServingSide(Side.RIGHT);
        }
        break;
      }
      case PointsBy.PointPerRally: {
        // Add a point to the players score
        incrementPlayerScore(playerId);

        // Check if player was not serving
        if (servingPlayer !== playerId) {
          // Set as serving player
          setServingPlayer(playerId);
          // Default serving side to RIGHT
          setServingSide(Side.RIGHT);
        } else {
          // Continue serving and change sides
          setServingSide(toggleSide(servingSide));
        }
        break;
      }
      default: {
        break;
      }
    }

    // Update the game or match ball text
    updateGameOrMatchBall();

    // Check if the player has won!
    updatePlayerWonState();
  };

  const handleToggleServingSide = () => {
    const newServingSide = toggleSide(servingSide);
    // Update gamelog
    setServingPlayerAndSide(servingPlayer, newServingSide);
    // Update ui state
    setServingSide(newServingSide);
  };

  const incrementPlayerScore = (playerId: number) => {
    // TODO change to a Player object with PlayerID
    currentGame.addEntry(new Entry(playerId, servingSide, 1));
    if (playerId === player1.getPlayerId()) {
      setPlayer1Score(score_p1 + 1);
    }

    if (playerId === player2.getPlayerId()) {
      setPlayer2Score(score_p2 + 1);
    }
  };

  const setDuration = (newDuration: number) => {
    updateGameDuration(newDuration);
  };

  const handleFinish = () => {
    // Archive game
    archiveCurrentGame();
    // Move to match summary screen
  };

  const handleUndo = () => {
    undo();

    // Update scores
    setPlayer1Score(getPointsForPlayer(player1.getPlayerId()));
    setPlayer2Score(getPointsForPlayer(player2.getPlayerId()));

    // Update serving side
    const lastServeSide = getServingPlayersLastSide();
    const startingServeSide = lastServeSide
      ? toggleSide(lastServeSide)
      : Side.RIGHT;
    setServingSide(startingServeSide);

    // Update serving player
    setServingPlayer(getServingPlayer() ?? player1.getPlayerId());

    // Update the game / match ball text
    updateGameOrMatchBall();

    // Update the winner text
    updatePlayerWonState();
  };

  const updateGameOrMatchBall = () => {
    setGameOrMatchBallText(calculateGameOrMatchBallText());
  };

  const updatePlayerWonState = () => {
    // Check for a match winner
    const matchWinningPlayer = calculateMatchWinningPlayer();
    if (matchWinningPlayer) {
      if (matchWinningPlayer === player1.getPlayerId()) {
        setWinnerText(`${player1.getPlayerName()} has won the match`);
      } else if (matchWinningPlayer === player2.getPlayerId()) {
        setWinnerText(`${player2.getPlayerName()} has won the match`);
      } else {
        throw new MatchValidationError(
          `Unknown match winner. Winner PlayerID: ${matchWinningPlayer}`
        );
      }
      return;
    }

    // Check for a game winner
    const gameWinningPlayer = gameWinner();
    if (gameWinningPlayer) {
      if (gameWinningPlayer === player1.getPlayerId()) {
        setWinnerText(`${player1.getPlayerName()} has won the game`);
      } else if (gameWinningPlayer === player2.getPlayerId()) {
        setWinnerText(`${player2.getPlayerName()} has won the game`);
      } else {
        throw new GameValidationError(
          `Unknown game winner. Winner PlayerID: ${gameWinningPlayer}`
        );
      }
      return;
    }

    // No winner yet
    setWinnerText(undefined);
  };

  return {
    player1,
    player2,
    score_p1,
    score_p2,
    games_p1,
    games_p2,
    servingSide,
    servingPlayer,
    gameOrMatchBallText,
    winnerText,
    handlePointWin,
    handleToggleServingSide,
    handleUndo,
    handleFinish,
    duration: currentGame.getDuration() ?? 0,
    setDuration,
  };
};
