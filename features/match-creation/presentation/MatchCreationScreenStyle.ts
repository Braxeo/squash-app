import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label_no_margin: {
    fontSize: 16,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    zIndex: 1,
  },
  errorText: {
    color: "red",
  },
});
