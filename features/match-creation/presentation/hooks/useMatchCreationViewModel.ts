import { useMatchSettings } from "../../../../core/hooks/useMatchSettings";
import { MatchRules } from "@/core/models/MatchRules";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { GameConfigurationError } from "@/core/errors/GameConfigurationError";
import { PointsBy, WinningRequirement } from "@/core/constants/Enums";
import { MatchDetails } from "@/core/models/MatchDetails";
import { Player } from "@/core/models/Player";

export const useMatchCreationViewModel = () => {
  type MatchCreationScreenNavigationProp = StackNavigationProp<
    AppStackParamList,
    "MatchCreation"
  >;
  const navigation = useNavigation<MatchCreationScreenNavigationProp>();

  const { settings, updateSettings } = useMatchSettings();

  const {
    player1,
    player2,
    gamesPerMatch,
    pointsPerGame,
    warmupMinutes,
    pointsBy,
    winningRequirement,
  } = settings;

  const [player1Error, setPlayer1Error] = useState<string | undefined>();
  const [player2Error, setPlayer2Error] = useState<string | undefined>();
  const [gamesPerMatchError, setGamesPerMatchError] = useState<
    string | undefined
  >();

  const setPlayer1 = (value: string) => {
    setPlayer1Error(undefined);
    updateSettings("player1", value);
  };
  const setPlayer2 = (value: string) => {
    setPlayer2Error(undefined);
    updateSettings("player2", value);
  };
  const setGamesPerMatch = (value: number) =>
    updateSettings("gamesPerMatch", value);
  const setPointsPerGame = (value: number) =>
    updateSettings("pointsPerGame", value);
  const setWarmupMinutes = (value: number) =>
    updateSettings("warmupMinutes", value);
  const setPointsBy = (value: PointsBy) => updateSettings("pointsBy", value);
  const setWinningRequirement = (value: WinningRequirement) =>
    updateSettings("winningRequirement", value);

  const sanitizePlayerName = (value: string | undefined) => {
    if (!value) return false;
    if (!value.trim()) return false;
    return value;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!sanitizePlayerName(player1)) {
      setPlayer1Error("Player name cannot be empty");
      return;
    }

    if (!sanitizePlayerName(player2)) {
      setPlayer2Error("Player name cannot be empty");
      return;
    }

    if (gamesPerMatch % 2 !== 1) {
      setGamesPerMatchError("Amount should be odd");
      return;
    }

    try {
      const matchRules = new MatchRules(
        gamesPerMatch,
        pointsPerGame,
        pointsBy,
        winningRequirement,
        warmupMinutes
      );

      const p1 = new Player(sanitizePlayerName(player1) as string, 1);

      const p2 = new Player(sanitizePlayerName(player2) as string, 2);

      const matchDetails = new MatchDetails(p1, p2, matchRules);

      // Clear errors before leaving the page
      setPlayer1Error(undefined);
      setPlayer2Error(undefined);
      setGamesPerMatchError(undefined);

      navigation.navigate("Warmup", { matchDetails });
    } catch (error) {
      if (error instanceof GameConfigurationError) {
        console.error("Game Configuration Error", error.message);
      } else {
        console.error("An unexpected error occured", error);
      }
    }
  };

  return {
    handleSubmit,
    player1,
    setPlayer1,
    player1Error,
    player2,
    setPlayer2,
    player2Error,
    gamesPerMatch,
    setGamesPerMatch,
    gamesPerMatchError,
    pointsPerGame,
    setPointsPerGame,
    warmupMinutes,
    setWarmupMinutes,
    pointsBy,
    setPointsBy,
    winningRequirement,
    setWinningRequirement,
  };
};
