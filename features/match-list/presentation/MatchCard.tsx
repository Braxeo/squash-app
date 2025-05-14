import React from "react";
import { View, Text } from "react-native";
import { Match } from "../domain/types";
import { useMatchListStyle } from "./useMatchListStyle";

type Props = {
  match: Match;
};

export function MatchCard({ match }: Props) {
  const styles = useMatchListStyle();

  return (
    <View style={styles.card}>
      <Text style={styles.playerNames}>
        {match.player1} vs {match.player2}
      </Text>
      <Text style={styles.matchMeta}>Date: {match.date}</Text>
      <Text style={styles.matchMeta}>Result: {match.result}</Text>
    </View>
  );
}
