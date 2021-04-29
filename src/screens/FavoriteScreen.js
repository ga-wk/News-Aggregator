import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { NavBar } from "../components/NavBar";
import { Favorite } from "../components/Favorite";

export const FavoriteScreen = (props) => {
  return (
    <View style={styles.container}>
      <NavBar screen={"Избранные"} navigation={props.navigation}/>
      <Favorite />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
