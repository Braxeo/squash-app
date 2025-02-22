import React from "react";
import AppNavigator from "../core/navigation/AppNavigator";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const { height } = Dimensions.get("window"); // Get screen height

/* eslint-disable import/no-unused-modules */
const AppEntry: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppNavigator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppEntry;
/* eslint-enable import/no-unused-modules */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    minHeight: height, // Ensures scrolling when needed
  },
});
