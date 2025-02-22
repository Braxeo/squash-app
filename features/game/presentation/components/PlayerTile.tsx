import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import React from "react";
import { Side } from "../../../../core/constants/Enums";
import { useGameScreenStyle } from "../hooks/useGameScreenStyle";
import { BasicButton } from "@/core/components/BasicButton";
import typography from "@/core/typography/Typography";

type PlayerTileProps = {
  name: string;
  score: number;
  side: Side | undefined;
  handlePointWin: () => void;
  handleOnPress: () => void;
};

export const PlayerTile: React.FC<PlayerTileProps> = ({
  name,
  score,
  side,
  handlePointWin,
  handleOnPress,
}: PlayerTileProps) => {
  const styles = useGameScreenStyle();

  const servingIcon = side ? (
    side === Side.LEFT ? (
      <Text>L</Text>
    ) : side === Side.RIGHT ? (
      <Text>R</Text>
    ) : undefined
  ) : undefined;

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[
        styles.playerSection,
        side !== undefined ? styles.playerActive : undefined,
      ]}
    >
      <Text style={styles.playerName}>{name}</Text>
      {servingIcon}
      <Text style={styles.score}>{score}</Text>
      <BasicButton
        buttonStyle={{ minWidth: "auto" }}
        textStyle={[typography.buttonText1, { textAlign: "center" }]}
        title="Win Point"
        onPress={handlePointWin}
      />
    </TouchableOpacity>
  );
};
