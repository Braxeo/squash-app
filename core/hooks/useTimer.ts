import { TimerConfigurationError } from "@/core/errors/TimerConfigurationError";
import { Side } from "@/core/constants/Enums";
import { useRef, useState } from "react";
import { formatTime } from "../utils/TimerUtils";

type TimerProps = {
  seconds: number;
  direction: Side;
  onTimerFinished: () => void;
};

export const useTimer = (props: TimerProps) => {
  const { seconds, direction, onTimerFinished } = props;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [time, setTime] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer reference

  const updateTimer = () => {
    if (direction === Side.UP) {
      if (isTimerRunning) {
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1); // Decrement the time
        }, 1000);
      }
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    } else if (direction === Side.DOWN) {
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
          onTimerFinished();
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
    } else {
      throw new TimerConfigurationError(
        "useTimer(direction) must be either UP or DOWN"
      );
    }
  };

  const timerText = formatTime(time);

  return {
    timerText,
    updateTimer,
    isTimerRunning,
    setIsTimerRunning,
    isTimerFinished,
    setIsTimerFinished,
  };
};
