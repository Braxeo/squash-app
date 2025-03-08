import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

const EmailPrompt = ({
  visible,
  onComplete,
}: {
  visible: boolean;
  onComplete: (email: string | undefined) => void;
}) => {
  const [email, setEmail] = useState("");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text>Enter Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => onComplete(undefined)} />
            <Button
              title="Submit"
              onPress={() => {
                if (email.trim()) {
                  onComplete(email);
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  input: { borderBottomWidth: 1, marginVertical: 10, padding: 5 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default EmailPrompt;
