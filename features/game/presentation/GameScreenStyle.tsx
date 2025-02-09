import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  timerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 5,
  },
  scoreboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  playerSection: {
    alignItems: "center",
    minHeight: "auto",
    flex: 1,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  score: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  games: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gameOrMatchBall: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
