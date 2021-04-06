import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <Button title={"Menu"} />
      {props.screen === "News" ? <Button title={"Categories"} /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    backgroundColor: "#6922ee",
    alignItems: "center",
    justifyContent: "center",
  },
});
