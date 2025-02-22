import { StyleSheet } from "react-native";

export const useGameSummaryStyle = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#f5f5f5",
      padding: 20,
      height: "100%",
    },
    header: {
      alignItems: "center",
    },
    footer: {
      width: "100%",
    },
    bestOfText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    scoreboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      width: "100%",
    },
    timerBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      padding: 5,
    },
  });
};
