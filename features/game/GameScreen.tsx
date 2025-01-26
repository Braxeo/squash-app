import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { styles } from "./GameScreenStyle";

const GameScreen: React.FC = () => {

    // State for player scores and games won
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Games, setPlayer1Games] = useState(0);
    const [player2Games, setPlayer2Games] = useState(0);
    
    // Function to handle point win
  const handlePointWin = (player: "player1" | "player2") => {
    if (player === "player1") {
      if (player1Score === 10) {
        setPlayer1Games(player1Games + 1); // Player 1 wins the game
        resetScores();
      } else {
        setPlayer1Score(player1Score + 1);
      }
    } else if (player === "player2") {
      if (player2Score === 10) {
        setPlayer2Games(player2Games + 1); // Player 2 wins the game
        resetScores();
      } else {
        setPlayer2Score(player2Score + 1);
      }
    }
  };

   // Function to reset the scores for a new game
   const resetScores = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Squash Scoring</Text>
      
      <View style={styles.scoreboard}>
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Player 1</Text>
          <Text style={styles.score}>{player1Score}</Text>
          <Text style={styles.games}>Games Won: {player1Games}</Text>
          <Button title="Win Point" onPress={() => handlePointWin("player1")} />
        </View>
        
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Player 2</Text>
          <Text style={styles.score}>{player2Score}</Text>
          <Text style={styles.games}>Games Won: {player2Games}</Text>
          <Button title="Win Point" onPress={() => handlePointWin("player2")} />
        </View>
      </View>
      
      <Button title="Reset Game" onPress={resetScores} color="#d9534f" />
    </View>
  );
}

export default GameScreen