import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { styles } from "./WarmupScreenStyle";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../../navigation/AppNavigator";
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
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer reference

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [time, setTime] = useState(warmupMinutes * 60);
  
  const handleTimerStart = () => {
    setIsTimerRunning(!isTimerRunning); // Toggle for pause / start
    setIsTimerFinished(false);
  };

  const handleTimerSkip = () => {
    setIsTimerRunning(false);
    setIsTimerFinished(true);
    Alert.alert("Warm-Up Skipped", "The warmup period has been skipped.");
  };

  const handleStartGame = () => {
    navigation.navigate("GameScreen", { player1, player2 });
  };

  // Convert time in seconds to minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  

  // Effect to handle the timer logic
  useEffect(() => {

    const handleTimerFinish = () => {
      setIsTimerRunning(false);
      setIsTimerFinished(true);
      Alert.alert("Warm-Up Complete", "The warmup period has ended.");
    };

    if (isTimerRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrement the time
      }, 1000);
    } else if (time === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (isTimerRunning) {
        Alert.alert("Warm-Up Complete", "The warmup period has ended.");
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
  }, [isTimerRunning, time]);
    
  return (
    <View style={styles.container}>
      {/* Player Names */}
      <View style={styles.header}>
        <Text style={styles.playerName}>{player1}</Text>
        <Text style={styles.playerName}>{player2}</Text>
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.buttonContainer}>
        {!isTimerFinished && (
          <Button
            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
            onPress={handleTimerStart}
          />
        )}
        {!isTimerFinished && (<Button title="Skip Timer" onPress={handleTimerSkip} color="#f0ad4e" />)} 
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
