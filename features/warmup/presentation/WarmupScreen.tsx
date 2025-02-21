import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./WarmupScreenStyle";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../../../core/navigation/AppNavigator";
import { useWarmupScreenViewModel } from "./hooks/useWarmupScreenViewModel";

type WarmupScreenRouteProp = RouteProp<AppStackParamList, "Warmup">;
type Props = { route: WarmupScreenRouteProp };

const WarmupScreen: React.FC<Props> = ({ route }) => {
  const {
    handleTimerStart,
    handleTimerSkip,
    handleStartGame,
    startTimer,
    player1,
    player2,
    timerText,
    isTimerRunning,
    isTimerFinished,
  } = useWarmupScreenViewModel(route.params.matchDetails);

  // Effect to handle the timer logic
  useEffect(startTimer, [startTimer]);

  return (
    <View style={styles.container}>
      {/* Player Names */}
      <View style={styles.header}>
        <Text style={styles.playerName}>{player1}</Text>
        <Text style={styles.playerName}>{player2}</Text>
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{timerText}</Text>
      </View>

      {/* Controls */}
      <View style={styles.buttonContainer}>
        {!isTimerFinished && (
          <Button
            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
            onPress={handleTimerStart}
          />
        )}
        {!isTimerFinished && (
          <Button
            title="Skip Timer"
            onPress={handleTimerSkip}
            color="#f0ad4e"
          />
        )}
        {isTimerFinished && (
          <>
            <Text style={styles.finishedText}>Warm-Up Completed</Text>
            <Button
              title="Start Game"
              onPress={handleStartGame}
              color="#5cb85c"
            />
          </>
        )}
      </View>
    </View>
  );
};

export default WarmupScreen;
