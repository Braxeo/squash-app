import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MatchCreationScreen from "../../features/match-creation/presentation/MatchCreationScreen";
import WarmupScreen from "../../features/warmup/presentation/WarmupScreen";
import GameScreen from "../../features/game/presentation/GameScreen";
import { MatchDetails } from "../models/MatchDetails";

export type AppStackParamList = {
  MatchCreation: undefined; // No params for MatchCreationScreen
  Warmup: {
    matchDetails: MatchDetails;
  };
  GameScreen: {
    matchDetails: MatchDetails;
  };
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="MatchCreation">
      <Stack.Screen
        name="MatchCreation"
        component={MatchCreationScreen}
        options={{ title: "Match Creation" }}
      />
      <Stack.Screen
        name="Warmup"
        component={WarmupScreen}
        options={{ title: "Warm-Up" }}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        options={{ title: "Game" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
