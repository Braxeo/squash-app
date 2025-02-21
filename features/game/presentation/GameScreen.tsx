import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./GameScreenStyle";
import { useGameScreenViewModel } from "./hooks/useGameScreenViewModel";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { PlayerTile } from "./components/PlayerTile";
import { GameScoreTile } from "./components/GameScoreTile";
import { BasicButton, basicButtonStyle } from "@/core/components/BasicButton";
import { TimerTile } from "./components/TimerTile";
import { Side } from "../../../core/constants/Enums";
import BasicModal from "@/core/components/BasicModal";

type GameScreenRouteProp = RouteProp<AppStackParamList, "GameScreen">;
type Props = { route: GameScreenRouteProp };

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
    handleUndo,
    handleFinish,
    gameDuration,
    matchDuration,
  } = useGameScreenViewModel(route.params.matchDetails);

  const player1TileProps = {
    name: player1.getPlayerName(),
    score: score_p1,
    side: servingPlayer === player1.getPlayerId() ? servingSide : undefined,
    handlePointWin: () => {
      handlePointWin(player1.getPlayerId());
    },
    handleOnPress: () => {
      servingPlayer === player1.getPlayerId() && handleToggleServingSide();
    },
  };

  const player2TileProps = {
    name: player2.getPlayerName(),
    score: score_p2,
    side: servingPlayer === player2.getPlayerId() ? servingSide : undefined,
    handlePointWin: () => {
      handlePointWin(player2.getPlayerId());
    },
    handleOnPress: () => {
      servingPlayer === player2.getPlayerId() && handleToggleServingSide();
    },
  };

  const gameScoreTileProps = {
    player1Games: games_p1,
    player2Games: games_p2,
  };

  useEffect(() => {
    console.log(gameDuration);
  }, [gameDuration]);

  return (
    <View style={styles.container}>
      {winnerText && (
        <BasicModal
          title="Winner!"
          visible={true}
          message={`${winnerText}`}
          content={() => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <BasicButton
                  buttonStyle={basicButtonStyle.button}
                  textStyle={undefined}
                  title="Finish"
                  onPress={handleFinish}
                />

                <BasicButton
                  buttonStyle={basicButtonStyle.button}
                  textStyle={undefined}
                  title="Undo"
                  onPress={handleUndo}
                />
              </View>
            );
          }}
        />
      )}
      <View style={styles.header}>
        <Text
          style={[
            styles.gameOrMatchBall,
            { opacity: gameOrMatchBallText !== undefined ? 1 : 0 },
          ]}
        >
          {gameOrMatchBallText}
        </Text>
        <View style={styles.scoreboard}>
          <PlayerTile {...player1TileProps} />
          <GameScoreTile {...gameScoreTileProps} />
          <PlayerTile {...player2TileProps} />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.timerBox}>
          <TimerTile
            title="Match Time"
            seconds={matchDuration}
            iconSide={Side.LEFT}
          />
          <TimerTile
            title="Game Time"
            seconds={gameDuration}
            iconSide={Side.RIGHT}
          />
        </View>
        <BasicButton
          buttonStyle={{ width: "100%" }}
          textStyle={undefined}
          title="UNDO"
          onPress={handleUndo}
        />
      </View>
    </View>
  );
};

export default GameScreen;
