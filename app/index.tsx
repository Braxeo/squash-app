import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ContactUsScreen from "@/features/contact-us/ContactUsScreen";
import AppNavigator from "@/core/navigation/AppNavigator";
import MatchListScreen from "@/features/match-list/presentation/MatchListScreen";

const Drawer = createDrawerNavigator();

/* eslint-disable import/no-unused-modules */
const AppEntry: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Navigator initialRouteName="Match List">
        <Drawer.Screen name="Match List" component={MatchListScreen} />
        <Drawer.Screen name="New Match" component={AppNavigator} />
        <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
      </Drawer.Navigator>
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
