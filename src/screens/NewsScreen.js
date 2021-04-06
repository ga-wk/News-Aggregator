import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar} from "../components/NavBar";
import { News } from "../components/News";
export const NewsScreen = (props) => {
  return (
    <View>
      <NavBar />
      <News />
    </View>
  );
};
