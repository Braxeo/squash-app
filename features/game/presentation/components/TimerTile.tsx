import React, { useEffect } from "react";
import { Side } from "../../domain/Enums";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTimer } from "@/core/hooks/useTimer";

type TimerTileProps = {
  title: string;
  seconds: number;
  iconSide: Side;
};

export const TimerTile: React.FC<TimerTileProps> = ({
  title,
  seconds,
  iconSide,
}) => {
  const onTimerFinished = () => {};

  const { timerText, updateTimer, setIsTimerRunning } = useTimer({
    seconds: seconds,
    direction: Side.UP,
    onTimerFinished: onTimerFinished,
  });

  useEffect(updateTimer, [updateTimer]);

  useEffect(() => {
    setIsTimerRunning(true);
  }, [setIsTimerRunning]);

  return (
    <View style={styles.tileContainer}>
      <View
        style={[
          styles.contentContainer,
          iconSide === Side.RIGHT ? styles.reverseOrder : null,
        ]}
      >
        {iconSide === Side.LEFT && (
          <MaterialIcons
            name={"alarm"}
            size={24}
            color="black"
            style={styles.icon}
          />
        )}
        <View
          style={[
            styles.textContainer,
            iconSide === Side.RIGHT ? styles.textContainerReverse : null,
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.number}>{timerText}</Text>
        </View>
        {iconSide === Side.RIGHT && (
          <MaterialIcons
            name={"alarm"}
            size={24}
            color="black"
            style={styles.icon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginStart: 0,
    marginEnd: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "200",
  },
  number: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    marginStart: 5,
    marginEnd: 5,
  },
  reverseOrder: {
    flexDirection: "row",
  },
  textContainerReverse: {
    marginStart: 10,
    marginEnd: 0,
    alignItems: "center",
  },
});
