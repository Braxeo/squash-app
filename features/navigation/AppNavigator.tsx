import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MatchCreationScreen from "../match-creation/MatchCreationScreen";
import WarmupScreen from "../warmup/WarmupScreen";
import GameScreen from "../game/GameScreen";

export type AppStackParamList = {
  MatchCreation: undefined; // No params for MatchCreationScreen
  Warmup: {
    player1: string;
    player2: string;
    warmupMinutes: number;
  }; // Params for WarmupScreen
  GameScreen: {
    player1: string;
    player2: string;
  }
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
