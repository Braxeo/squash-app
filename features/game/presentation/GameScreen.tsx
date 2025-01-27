import React, { useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";
import { styles } from "./GameScreenStyle";
import { useGameScreenViewModel } from "./hooks/useGameScreenViewModel";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "@/features/navigation/AppNavigator";
import { PlayerTile } from "./components/PlayerTile";
import { GameScoreTile } from "./components/GameScoreTile";

type GameScreenRouteProp = RouteProp<AppStackParamList, "GameScreen">;
type Props = { route: GameScreenRouteProp; };

const GameScreen: React.FC<Props> = ({ route }) => {

  const {
    player1,
    player2,
    score_p1,
    score_p2,
    games_p1,
    games_p2,
    servingSide,
    servingPlayer,
    gameOrMatchBallText,
    winnerText,
    handlePointWin,
    handleToggleServingSide,
    handleUndo
} = useGameScreenViewModel(route.params.matchDetails)

  const player1TileProps = {
    name: player1.getPlayerName(),
    score: score_p1,
    side: servingPlayer === player1.getPlayerId() ? servingSide : undefined,
    handlePointWin: () => { handlePointWin(player1.getPlayerId()) },
    handleOnPress: () => { servingPlayer === player1.getPlayerId() && handleToggleServingSide() }
  }

  const player2TileProps = {
    name: player2.getPlayerName(),
    score: score_p2,
    side: servingPlayer === player2.getPlayerId() ? servingSide : undefined,
    handlePointWin: () => { handlePointWin(player2.getPlayerId()) },
    handleOnPress: () => { servingPlayer === player2.getPlayerId() && handleToggleServingSide() }
  }

  const gameScoreTileProps = {
    player1Games: games_p1,
    player2Games: games_p2,
  }

  useEffect(() => {
    console.log(`Playing effect with winner text: ${winnerText}`)
    if(winnerText) {
      Alert.alert(
        "Winner!",
        `${winnerText}`,
        [
          { text: "Finish", onPress: () => {} },
          { text: "Undo", onPress: () => handleUndo(), style:"cancel" },
        ]
      )
    }
  }, [winnerText])


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Squash Scoring</Text>
      {gameOrMatchBallText && <Text style={styles.gameOrMatchBall}>{gameOrMatchBallText}</Text>}
      <View style={styles.scoreboard}>
        <PlayerTile {...player1TileProps} />
        <GameScoreTile {...gameScoreTileProps} />
        <PlayerTile {...player2TileProps} />
      </View>
      <Button title="undo" onPress={handleUndo}/>
    </View>
  );
}

export default GameScreen