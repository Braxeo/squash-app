import React, { useState } from "react";
import { Text, TextInput, View, Button, Switch, Alert } from "react-native";
import { styles } from "./MatchCreationScreenStyle";
import { MatchDetails } from "./MatchDetails";
import { MatchRules } from "../rules/MatchRules";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

type MatchCreationScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "MatchCreation"
>;

const MatchCreationScreen: React.FC = () => {
    const navigation = useNavigation<MatchCreationScreenNavigationProp>();

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [gamesPerMatch, setGamesPerMatch] = useState(5);
    const [pointsPerGame, setPointsPerGame] = useState(11);
    const [warmupMinutes, setWarmupMinutes] = useState(5);
    const [pointPerRally, setPointPerRally] = useState(true);
    const [pointOnServe, setPointOnServe] = useState(false);
    const [winByTwo, setWinByTwo] = useState(true);
    const [firstToGamePoint, setFirstToGamePoint] = useState(false);
  
    // Function to handle form submission
    const handleSubmit = () => {
      if (!player1 || !player2) {
        Alert.alert("Error", "Both Player 1 and Player 2 names are required.");
        return;
      }
  
      const matchRules = new MatchRules(
        gamesPerMatch,
        pointsPerGame,
        pointPerRally,
        pointOnServe,
        winByTwo,
        firstToGamePoint,
        warmupMinutes
      );
  
      const matchDetails = new MatchDetails(player1, player2, matchRules);
  
      console.log("Match Created:", matchDetails);

      navigation.navigate("Warmup", {
        player1,
        player2,
        warmupMinutes,
      });
  
      Alert.alert(
        "Match Created",
        `Player 1: ${player1}\nPlayer 2: ${player2}\nGames Per Match: ${gamesPerMatch}\nPoints Per Game: ${pointsPerGame}`
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create a Match</Text>
  
        <Text style={styles.label}>Player 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Player 1 Name"
          value={player1}
          onChangeText={setPlayer1}
        />
  
        <Text style={styles.label}>Player 2</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Player 2 Name"
          value={player2}
          onChangeText={setPlayer2}
        />
  
        <Text style={styles.label}>Games Per Match</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(gamesPerMatch)}
          onChangeText={(text) => setGamesPerMatch(Number(text))}
        />
  
        <Text style={styles.label}>Points Per Game</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(pointsPerGame)}
          onChangeText={(text) => setPointsPerGame(Number(text))}
        />

        <Text style={styles.label}>Warmup Minutes</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(warmupMinutes)}
          onChangeText={(text) => setWarmupMinutes(Number(text))}
        />
  
        <View style={styles.switchRow}>
          <Text>Point Per Rally</Text>
          <Switch value={pointPerRally} onValueChange={setPointPerRally} />
        </View>
  
        <View style={styles.switchRow}>
          <Text>Point On Serve</Text>
          <Switch value={pointOnServe} onValueChange={setPointOnServe} />
        </View>
  
        <View style={styles.switchRow}>
          <Text>Win By Two</Text>
          <Switch value={winByTwo} onValueChange={setWinByTwo} />
        </View>
  
        <View style={styles.switchRow}>
          <Text>First To Game Point</Text>
          <Switch value={firstToGamePoint} onValueChange={setFirstToGamePoint} />
        </View>
  
        <Button title="Create Match" onPress={handleSubmit} />
      </View>
    );
  };

export default MatchCreationScreen;