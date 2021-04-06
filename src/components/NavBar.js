import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const menuClick = (e) => {
    setOpen(!open);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.btn]}>
        <Button title={"Menu"} onPress={menuClick} />
      </View>
      <View style={[styles.menu, open ? styles.open : styles.close]}>
        <Button
          title={"Новости"}
          onPress={() => {
            props.navigation.navigate("News");
          }}
        />
        <Button
          title={"Избранные"}
          onPress={() => {
            props.navigation.navigate("Favorite");
          }}
        />
        {/* <Button title={"Menu"} onPress={this.props.navigation.navigate('City')} /> */}
      </View>
      {props.screen === "News" ? (
        <Button title={"Categories"} style={styles.btn} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#6922ee",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
  },
  btn: {
    height: 60,
    width: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  open: {
    display: "flex",
  },
  close: {
    display: "none",
  },
  menu: {
    position: "absolute",
    width: "70%",
    minHeight: "100%",
    backgroundColor: "#6922ee",
  },
});
