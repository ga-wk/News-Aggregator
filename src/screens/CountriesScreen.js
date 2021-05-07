
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { NavBar } from "../components/NavBar";
import { Countries } from "../components/Countries";

export const CountriesScreen = (props) => {
  return (
    <View style={styles.container}>
      <NavBar screen={"Страны"} navigation={props.navigation}/>
      <Countries />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
