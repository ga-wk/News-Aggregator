import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { NewsScreen } from "./screens/NewsScreen";
import { FavoriteScreen } from "./screens/FavoriteScreen";

const Stack = createStackNavigator();

export const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        {/* <Stack.Screen name="City" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
