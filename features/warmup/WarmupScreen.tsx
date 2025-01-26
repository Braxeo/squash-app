import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import TimerScreen from "../timer/TimerScreen";
import { styles } from "./WarmupScreenStyle";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type WarmupScreenRouteProp = RouteProp<AppStackParamList, "Warmup">;

type Props = {
  route: WarmupScreenRouteProp;
};

type WarmupScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "Warmup"
>;

const WarmupScreen: React.FC<Props> = ({ route }) => {
  const { player1, player2, warmupMinutes } = route.params;
  const navigation = useNavigation<WarmupScreenNavigationProp>();

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

  const handleStartGame = () => {
    navigation.navigate("GameScreen", { player1, player2 });
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
