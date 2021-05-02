import React from "react";

import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FavoriteScreen } from "./screens/FavoriteScreen";
import { NewsScreen } from "./screens/NewsScreen";
const Drawer = createDrawerNavigator();

export const Index = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Избранные">
        <Drawer.Screen name="Новости" component={NewsScreen} />
        <Drawer.Screen name="Избранные" component={FavoriteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
