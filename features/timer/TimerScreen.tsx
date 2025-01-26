import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Alert } from "react-native";
import { styles } from "./TimerScreenStyle";

interface TimerScreenProps {
  warmupMinutes: number; // Number of minutes to count down
  onComplete: () => void;
}

const TimerScreen: React.FC<TimerScreenProps> = ({ warmupMinutes, onComplete }) => {
  const [time, setTime] = useState(warmupMinutes * 60); // Initialize with warmupMinutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer reference

  // Effect to handle the timer logic
  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrement the time
      }, 1000);
    } else if (time === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (isRunning) {
        Alert.alert("Warm-Up Complete", "The warmup period has ended.");
        setIsRunning(false);
        onComplete();
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
  }, [isRunning, time, onComplete]);

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTime(warmupMinutes * 60); // Reset to the initial warmup time
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Convert time in seconds to minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isRunning ? "Pause" : "Start"}
          onPress={() => setIsRunning(!isRunning)}
        />
        <Button title="Reset" onPress={resetTimer} color="#d9534f" />
      </View>
    </View>
  );
};

export default TimerScreen;
