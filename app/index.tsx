import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ContactUsScreen from "@/features/contact-us/ContactUsScreen";
import AppNavigator from "@/core/navigation/AppNavigator";

const Drawer = createDrawerNavigator();

/* eslint-disable import/no-unused-modules */
const AppEntry: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Navigator initialRouteName="New Match">
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
