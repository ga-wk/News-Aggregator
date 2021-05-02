import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const NavBar = (props) => {
  const menuClick = (e) => {
    props.navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <Button style={[styles.btn]} title={"Menu"} onPress={menuClick} />
      <Text style={styles.text}>{props.screen}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#6922ee",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",

    paddingTop: 15,
    paddingLeft: 10,
  },

  btn: {
    height: "100%",
    width: 150,
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 22,
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
});
