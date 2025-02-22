import { useTimer } from "@/core/hooks/useTimer";
import { Side } from "@/core/constants/Enums";
import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MatchDetails } from "@/core/models/MatchDetails";
import { Alert } from "react-native";
import { Player } from "@/core/models/Player";
import { matchUtils } from "@/core/utils/MatchUtils";

export const useWarmupScreenViewModel = (matchDetails: MatchDetails) => {
  type WarmupScreenNavigationProp = StackNavigationProp<
    AppStackParamList,
    "Warmup"
  >;

  const { player1, player2, matchRules } = matchDetails;
  const { warmupMinutes } = matchRules;
  const navigation = useNavigation<WarmupScreenNavigationProp>();
  const { startNextGame } = matchUtils(matchDetails);

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

  const startNewGame = (server: Player) => {
    startNextGame(server, Side.RIGHT);
  };

  const promptForServer = (onComplete: () => void) => {
    Alert.alert(
      `Select Player to Serve`,
      `Please choose a Player`,
      [
        {
          text: `${matchDetails.player1.getPlayerName()}`,
          onPress: () => {
            startNewGame(matchDetails.player1);
            onComplete();
          },
        },
        {
          text: `${matchDetails.player2.getPlayerName()}`,
          onPress: () => {
            startNewGame(matchDetails.player2);
            onComplete();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleStartGame = () => {
    promptForServer(() => {
      navigation.replace("GameScreen", { matchDetails });
    });
  };

  const {
    timerText,
    startTimer,
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
    startTimer,
    player1: player1.getPlayerName(),
    player2: player2.getPlayerName(),
    timerText,
    isTimerRunning,
    isTimerFinished,
  };
};
