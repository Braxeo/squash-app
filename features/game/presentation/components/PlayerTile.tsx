import { TouchableOpacity, View } from "react-native"
import { styles } from "../GameScreenStyle"
import { Text } from "react-native"
import { Button } from "react-native"
import React from "react"
import { Side } from "../../domain/Enums"

type PlayerTileProps = {
    name: string;
    score: number;
    side: Side | undefined;
    handlePointWin: () => void;
    handleOnPress: () => void;
}

export const PlayerTile: React.FC<PlayerTileProps> = ({
    name,
    score,
    side,
    handlePointWin,
    handleOnPress,
}: PlayerTileProps) => {
    const servingIcon = side 
        ? (side === Side.LEFT ? <View>L</View> : side === Side.RIGHT ? <View>R</View> : undefined)
        : undefined;

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.playerSection}>
            <Text style={styles.playerName}>{name}</Text>
                {servingIcon}
                <Text style={styles.score}>{score}</Text>
                <Button title="Win Point" onPress={handlePointWin} />
            </View>
        </TouchableOpacity>
    )
}