import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    playerName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    timerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    finishedText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "green",
      textAlign: "center",
    },
  });