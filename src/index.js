import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" />
        <Stack.Screen name="Favorite" />
        <Stack.Screen name="City" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
