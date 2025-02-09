import React, { ReactElement } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

type ModalProps = {
  visible: boolean;
  title: string;
  message: string;
  content: () => ReactElement;
};

const BasicModal = ({ visible, title, message, content }: ModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>{content()}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default BasicModal;
