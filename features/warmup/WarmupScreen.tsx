import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import TimerScreen from "../timer/TimerScreen";
import { styles } from "./WarmupScreenStyle";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../navigation/AppNavigator";

type WarmupScreenRouteProp = RouteProp<AppStackParamList, "Warmup">;

type Props = {
  route: WarmupScreenRouteProp;
};

const WarmupScreen: React.FC<Props> = ({ route }) => {
  const { player1, player2, warmupMinutes } = route.params;

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
  
    const handleTimerStart = () => {
      setIsTimerRunning(true);
      setIsTimerFinished(false);
    };
  
    const handleTimerSkip = () => {
      setIsTimerRunning(false);
      setIsTimerFinished(true);
      Alert.alert("Warm-Up Skipped", "The warmup period has been skipped.");
    };
  
    const handleTimerFinish = () => {
      setIsTimerRunning(false);
      setIsTimerFinished(true);
      Alert.alert("Warm-Up Complete", "The warmup period has ended.");
    };
  
    return (
      <View style={styles.container}>
        {/* Player Names */}
        <View style={styles.header}>
          <Text style={styles.playerName}>{player1}</Text>
          <Text style={styles.playerName}>{player2}</Text>
        </View>
  
        {/* Timer */}
        <View style={styles.timerContainer}>
          <TimerScreen
            warmupMinutes={warmupMinutes}
            onComplete={handleTimerFinish}
          />
        </View>
  
        {/* Controls */}
        <View style={styles.buttonContainer}>
          {!isTimerFinished && (
            <Button
              title={isTimerRunning ? "Pause Timer" : "Start Timer"}
              onPress={handleTimerStart}
            />
          )}
          <Button title="Skip Timer" onPress={handleTimerSkip} color="#f0ad4e" />
          {isTimerFinished && (
            <Text style={styles.finishedText}>Warm-Up Completed</Text>
          )}
        </View>
      </View>
    );
  };

export default WarmupScreen;
