import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useGameSummaryStyle } from "./hooks/useGameSummaryStyle";
import { PlayerTile } from "../game/presentation/components/PlayerTile";
import { useGameSummaryViewModel } from "./hooks/useGameScreenViewModel";
import { TimerTile } from "../game/presentation/components/TimerTile";
import { Side } from "@/core/constants/Enums";
import { BasicButton } from "@/core/components/BasicButton";
import { GameScoreTile } from "../game/presentation/components/GameScoreTile";

type GameSummaryRouteProp = RouteProp<AppStackParamList, "GameSummary">;
type Props = { route: GameSummaryRouteProp };

const GameSummary: React.FC<Props> = ({ route }) => {
  const styles = useGameSummaryStyle();

  const {
    player1,
    player2,
    score_p1,
    score_p2,
    games_p1,
    games_p2,
    bestOfText,
    ctaButtonText,
    handleCtaButtonClick,
    breakDuration,
    matchDuration,
  } = useGameSummaryViewModel(route.params.matchDetails);

  const player1TileProps = {
    name: player1.getPlayerName(),
    score: score_p1,
    side: undefined,
    handlePointWin: undefined,
    handleOnPress: undefined,
  };

  const player2TileProps = {
    name: player2.getPlayerName(),
    score: score_p2,
    side: undefined,
    handlePointWin: undefined,
    handleOnPress: undefined,
  };

  const gameScoreTileProps = {
    player1Games: games_p1,
    player2Games: games_p2,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bestOfText}>{bestOfText}</Text>
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
            title="Break Time"
            seconds={breakDuration}
            iconSide={Side.RIGHT}
          />
        </View>
        <BasicButton
          buttonStyle={{ width: "100%" }}
          textStyle={undefined}
          title={ctaButtonText}
          onPress={handleCtaButtonClick}
        />
      </View>
    </View>
  );
};

export default GameSummary;
