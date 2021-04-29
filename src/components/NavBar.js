import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Modal, FlatList } from "react-native";

export const NavBar = (props) => {
  const menuClick = (e) => {
    props.navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <Button style={[styles.btn]} title={"Menu"} onPress={menuClick} />
      <Text style={styles.text} >{props.screen}</Text>
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
    paddingTop: 10,
    paddingLeft: 20,
  },

  btn: {
    height: "100%",
    width: 150,
    flexGrow:0
  },

  text: {
    fontFamily: 'Roboto',
    fontSize: 22,
    flexGrow: 1,

    width: "100%",

    textAlign:'center'
  },
});
