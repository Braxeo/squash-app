import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../GameScreenStyle";

type GameScoreTileProps = {
    player1Games: number,
    player2Games: number
}

export const GameScoreTile: React.FC<GameScoreTileProps> = ({
    player1Games,
    player2Games
}) => {
    return (
        <View>
            <Text style={styles.games}>{player1Games} - {player2Games}</Text>
        </View>
    )
}