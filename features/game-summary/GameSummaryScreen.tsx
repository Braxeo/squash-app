import { AppStackParamList } from "@/core/navigation/AppNavigator";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useGameSummaryStyle } from "./hooks/useGameSummaryStyle";
import { PlayerTile } from "../game/presentation/components/PlayerTile";
import { useGameSummaryViewModel } from "./hooks/useGameScreenViewModel";
import { TimerTile } from "../game/presentation/components/TimerTile";
import { Side } from "@/core/constants/Enums";
import { BasicButton } from "@/core/components/BasicButton";
import { GameScoreTile } from "../game/presentation/components/GameScoreTile";
import { useCallback, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import sendEmail from "react-native-email";
import EmailPrompt from "./components/EmailPrompt";

type GameSummaryRouteProp = RouteProp<AppStackParamList, "GameSummary">;
type Props = { route: GameSummaryRouteProp };

const GameSummary: React.FC<Props> = ({ route }) => {
  const styles = useGameSummaryStyle();
  const navigator = useNavigation();

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
    emailBody,
    getEmail,
    setEmail,
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

  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  const emailResults = useCallback(
    (email: string) => {
      sendEmail(email, {
        subject: "Game Summary",
        body: emailBody,
      }).catch(console.error);
    },
    [emailBody]
  );

  const handleEmail = useCallback(async () => {
    const sendToEmail = await getEmail();
    if (sendToEmail) {
      emailResults(sendToEmail);
    } else {
      setShowEmailPrompt(true);
    }
  }, [getEmail, emailResults]);

  useLayoutEffect(() => {
    navigator.setOptions({
      headerRight: () => (
        <Ionicons
          name="share" // Change this to the icon you want
          size={24}
          style={{ marginRight: 15, backgroundColor: "Black" }}
          onPress={() => handleEmail()}
        />
      ),
    });
  }, [navigator, handleEmail]);

  const onEmailEntered = (email: string | undefined) => {
    setShowEmailPrompt(false);
    if (email) {
      setEmail(email);
      handleEmail();
    }
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

      <EmailPrompt visible={showEmailPrompt} onComplete={onEmailEntered} />
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
