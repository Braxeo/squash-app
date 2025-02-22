import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { useGameScreenStyle } from "../hooks/useGameScreenStyle";

type GameScoreTileProps = {
  player1Games: number;
  player2Games: number;
};

export const GameScoreTile: React.FC<GameScoreTileProps> = ({
  player1Games,
  player2Games,
}) => {
  const styles = useGameScreenStyle();
  return (
    <View>
      <Text style={styles.games}>
        {player1Games} - {player2Games}
      </Text>
    </View>
  );
};
