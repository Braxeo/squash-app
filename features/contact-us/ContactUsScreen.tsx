import React from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useContactUsViewModel } from "./hooks/useContactUsViewModel";
import { useContactUsStyle } from "./hooks/useContactUsStyle";

function ContactUsScreen() {
  const {
    name,
    setName,
    nameError,
    email,
    setEmail,
    emailError,
    message,
    setMessage,
    messageError,
    handleSubmit,
  } = useContactUsViewModel();

  const styles = useContactUsStyle();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        persistentScrollbar={false}
        style={styles.scrollView}
      >
        <Text style={[styles.label, nameError && styles.errorText]}>Name</Text>
        <TextInput
          style={[styles.input, nameError && styles.errorInput]}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}

        <Text style={[styles.label, emailError && styles.errorText]}>
          Email
        </Text>
        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="you@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <Text style={[styles.label, messageError && styles.errorText]}>
          Message
        </Text>
        <TextInput
          style={[
            styles.input,
            styles.multilineInput,
            messageError && styles.errorInput,
          ]}
          placeholder="Your message..."
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
        {messageError && <Text style={styles.errorText}>{messageError}</Text>}
      </ScrollView>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default ContactUsScreen;
