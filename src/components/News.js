import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export const News = (props) => {
  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "#6922ee",
    alignItems: "center",
    justifyContent: "center",
  },
});
