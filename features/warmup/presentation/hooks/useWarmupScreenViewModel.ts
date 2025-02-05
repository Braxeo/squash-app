import { useTimer } from "@/core/hooks/useTimer";
import { Side } from "@/core/constants/Enums";
import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MatchDetails } from "@/core/models/MatchDetails";

export const useWarmupScreenViewModel = (matchDetails: MatchDetails) => {
  type WarmupScreenNavigationProp = StackNavigationProp<
    AppStackParamList,
    "Warmup"
  >;

  const { player1, player2, matchRules } = matchDetails;
  const { warmupMinutes } = matchRules;
  const navigation = useNavigation<WarmupScreenNavigationProp>();

  const handleTimerStart = () => {
    setIsTimerRunning(!isTimerRunning); // Toggle for pause / start
    setIsTimerFinished(false);
  };

  const handleTimerSkip = () => {
    setIsTimerRunning(false);
    setIsTimerFinished(true);
  };

  const handleTimerFinish = () => {
    setIsTimerRunning(false);
    setIsTimerFinished(true);
  };

  const handleStartGame = () => {
    navigation.navigate("GameScreen", { matchDetails });
  };

  const {
    timerText,
    updateTimer,
    isTimerRunning,
    setIsTimerRunning,
    isTimerFinished,
    setIsTimerFinished,
  } = useTimer({
    seconds: warmupMinutes * 60,
    direction: Side.DOWN,
    onTimerFinished: handleTimerFinish,
  });

  return {
    handleTimerStart,
    handleTimerSkip,
    handleStartGame,
    updateTimer,
    player1: player1.getPlayerName(),
    player2: player2.getPlayerName(),
    timerText,
    isTimerRunning,
    isTimerFinished,
  };
};
