import React from "react";
import { Text, TextInput, View, Button } from "react-native";
import { styles } from "./MatchCreationScreenStyle";
import { useMatchCreationViewModel } from "./hooks/useMatchCreationViewModel";
import { Picker } from "@react-native-picker/picker";
import { PointsBy } from "@/features/rules/constants/Enums";
import { WinningRequirement } from "@/features/rules/constants/Enums";

const MatchCreationScreen: React.FC = () => {
    
    const { 
      handleSubmit, 
      player1,
      setPlayer1,
      player1Error,
      player2,
      setPlayer2,
      player2Error,
      gamesPerMatch,
      setGamesPerMatch,
      pointsPerGame,
      setPointsPerGame,
      warmupMinutes,
      setWarmupMinutes,
      pointsBy,
      setPointsBy,
      winningRequirement,
      setWinningRequirement
    } = useMatchCreationViewModel()

    console.log(player1Error, player2Error)
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Setup Match</Text>
  
        <Text style={[styles.label, player1Error ? styles.errorText : null]}>Player 1</Text>
        <TextInput
          style={[styles.input, player1Error ? styles.errorText : null]}
          placeholder="Enter Player 1 Name"
          value={player1}
          onChangeText={setPlayer1}
        />
        {player1Error && (<Text style={[styles.label, styles.errorText]}>{player1Error}</Text>)}
  
        <Text style={[styles.label, player2Error ? styles.errorText : null]}>Player 2</Text>
        <TextInput
          style={[styles.input, player2Error ? styles.errorText : null]}
          placeholder="Enter Player 2 Name"
          value={player2}
          onChangeText={setPlayer2}
        />
        {player2Error && (<Text style={[styles.label, styles.errorText]}>{player2Error}</Text>)}
  
        <Text style={styles.label}>Best Of</Text>
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

      <Text style={styles.label}>Win Each Point By</Text>
      <Picker
        selectedValue={pointsBy}
        onValueChange={(itemValue) => setPointsBy(itemValue as PointsBy)}
        style={styles.picker}
      >
        {Object.values(PointsBy).map((value) => (
          <Picker.Item key={value} label={value.toString()} value={value} />
        ))}
      </Picker>

      <Text style={styles.label}>Win Match By</Text>
      <Picker
        selectedValue={winningRequirement}
        onValueChange={(itemValue) => setWinningRequirement(itemValue as WinningRequirement)}
        style={styles.picker}
      >
        {Object.values(WinningRequirement).map((value) => (
          <Picker.Item key={value} label={value.toString()} value={value} />
        ))}
      </Picker>
      
      <View style={{height: 25}}/>
      <Button title="Begin Warmup" onPress={handleSubmit} />
      </View>
    );
  };

export default MatchCreationScreen;