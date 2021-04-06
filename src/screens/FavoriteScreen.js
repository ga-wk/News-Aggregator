import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "../components/NavBar";
import { Favorite } from "../components/Favorite";

export const FavoriteScreen = (props) => {
  return (
    <View style={styles.container}>
      <NavBar screen={"News"} navigation={props.navigation}/>
      <Favorite />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6922ee",
    alignItems: "center",
    justifyContent: "center",
  },
});
