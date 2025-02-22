import React from "react";
import AppNavigator from "../core/navigation/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";

/* eslint-disable import/no-unused-modules */
const AppEntry: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default AppEntry;
/* eslint-enable import/no-unused-modules */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
