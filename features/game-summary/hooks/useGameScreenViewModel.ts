import { Side } from "@/core/constants/Enums";
import { GameConfigurationError } from "@/core/errors/GameConfigurationError";
import { MatchDetails } from "@/core/models/MatchDetails";
import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { gameLogUtils } from "@/core/utils/GameLogUtils";
import { matchUtils } from "@/core/utils/MatchUtils";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";

export const useGameSummaryViewModel = (matchDetails: MatchDetails) => {
  type GameSummaryNavigationProp = StackNavigationProp<
    AppStackParamList,
    "GameSummary"
  >;

  const { player1, player2, player1Games, player2Games } = matchDetails;

  const { getMatchDuration, calculateMatchWinningPlayer, startNextGame } =
    matchUtils(matchDetails);

  const lastGame = matchDetails.gameLogs.at(matchDetails.gameLogs.length - 1);

  if (lastGame === undefined) {
    throw new GameConfigurationError("Last game should not be undefined");
  }

  const { getPointsForPlayer, getServingPlayer } = gameLogUtils(lastGame);

  const ctaButtonText = calculateMatchWinningPlayer() ? "Exit" : "Next Game";

  const handleCtaButtonClick = () => {
    if (ctaButtonText === "Exit") {
      navigation.popTo("MatchCreation");
    } else {
      const server =
        getServingPlayer() === player1.getPlayerId() ? player1 : player2;
      startNextGame(server, Side.RIGHT);
      navigation.replace("GameScreen", { matchDetails });
    }
  };

  const navigation = useNavigation<GameSummaryNavigationProp>();

  return {
    player1,
    player2,
    score_p1: getPointsForPlayer(player1.getPlayerId()),
    score_p2: getPointsForPlayer(player2.getPlayerId()),
    games_p1: player1Games,
    games_p2: player2Games,
    bestOfText: `Best of ${matchDetails.matchRules.getGamesPerMatch()}`,
    ctaButtonText: ctaButtonText,
    handleCtaButtonClick: handleCtaButtonClick,
    breakDuration: 0,
    matchDuration: getMatchDuration(),
  };
};
