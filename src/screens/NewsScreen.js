import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "../components/NavBar";
import { News } from "../components/News";
import DropDownPicker from "react-native-dropdown-picker";

export const NewsScreen = (props) => {
  return (
    <View style={styles.container}>
      <NavBar screen={"Новости"} navigation={props.navigation}/>
      <News />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
});
