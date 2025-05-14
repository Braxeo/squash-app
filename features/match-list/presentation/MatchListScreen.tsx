import React from "react";
import { View, ScrollView } from "react-native";
import { MatchCard } from "./MatchCard";
import { useMatchListStyle } from "./useMatchListStyle";
import { mockMatchList } from "../data/mockMatchList";

export default function MatchListScreen() {
  const styles = useMatchListStyle();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mockMatchList.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </ScrollView>
    </View>
  );
}
