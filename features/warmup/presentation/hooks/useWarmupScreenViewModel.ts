import { MatchDetails } from "@/features/match-creation/domain/MatchDetails";
import { AppStackParamList } from "@/features/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRef, useState } from "react";

export const useWarmupScreenViewModel = (matchDetails: MatchDetails) => {
  type WarmupScreenNavigationProp = StackNavigationProp<
    AppStackParamList,
    "Warmup"
  >;

  const { player1, player2, matchRules } = matchDetails;
  const { warmupMinutes } = matchRules;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [time, setTime] = useState(warmupMinutes * 60);
  const navigation = useNavigation<WarmupScreenNavigationProp>();
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer reference

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartGame = () => {
    navigation.navigate("GameScreen", { matchDetails });
  };

  const updateTimer = () => {
    if (isTimerRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrement the time
      }, 1000);
    } else if (time === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (isTimerRunning) {
        setIsTimerRunning(false);
        handleTimerFinish();
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  };

  const timerText = formatTime(time);

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
