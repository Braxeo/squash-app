import { useMatchSettings } from "../../domain/hooks/useMatchSettings";
import { MatchRules } from "@/features/rules/MatchRules";
import { MatchDetails } from "../../domain/MatchDetails";
import { PointsBy } from "@/features/rules/constants/Enums";
import { WinningRequirement } from "@/features/rules/constants/Enums";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "@/features/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";



export const useMatchCreationViewModel = () => {
  type MatchCreationScreenNavigationProp = StackNavigationProp<AppStackParamList,"MatchCreation">;
  const navigation = useNavigation<MatchCreationScreenNavigationProp>();


    const { settings, updateSettings } = useMatchSettings()

    const { 
          player1,
          player2,
          gamesPerMatch,
          pointsPerGame,
          warmupMinutes,
          pointsBy,
          winningRequirement
    } = settings
    
    const [player1Error, setPlayer1Error] = useState<string | undefined>();
    const [player2Error, setPlayer2Error] = useState<string | undefined>();

    const setPlayer1 = (value: string) => {
      setPlayer1Error(undefined)
      updateSettings("player1", value)
    }
    const setPlayer2 = (value: string) => {
      setPlayer2Error(undefined)
      updateSettings("player2", value)
    }
    const setGamesPerMatch = (value: number) => updateSettings("gamesPerMatch", value)
    const setPointsPerGame = (value: number) => updateSettings("pointsPerGame", value)
    const setWarmupMinutes = (value: number) => updateSettings("warmupMinutes", value)
    const setPointsBy = (value: PointsBy) => updateSettings("pointsBy", value)
    const setWinningRequirement = (value: WinningRequirement) => updateSettings("winningRequirement", value)

    const sanitizePlayerName = (value: string | undefined) => {
      if(!value) return false;
      if(!(value.trim())) return false;
      return value;
    }

    // Function to handle form submission
    const handleSubmit = () => {
      if(!sanitizePlayerName(player1)) {
        setPlayer1Error("Player name cannot be empty")
        return;
      }

      if(!sanitizePlayerName(player2)) {
        setPlayer2Error("Player name cannot be empty")
        return;
      }
    
      const matchRules = new MatchRules(
        gamesPerMatch,
        pointsPerGame,
        pointsBy,
        winningRequirement,
        warmupMinutes
      );
    
      const matchDetails = new MatchDetails(
        sanitizePlayerName(player1) as string,
        sanitizePlayerName(player2) as string, 
        matchRules
      );
    
      console.log(matchDetails.describe())

      navigation.navigate(
        "Warmup", {
          player1: sanitizePlayerName(player1) as string,
          player2: sanitizePlayerName(player2) as string,
          warmupMinutes: warmupMinutes
        }, 
      )
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
        pointsPerGame,
        setPointsPerGame,
        warmupMinutes,
        setWarmupMinutes,
        pointsBy,
        setPointsBy,
        winningRequirement,
        setWinningRequirement
    }
}