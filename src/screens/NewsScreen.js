import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavBar } from "../components/NavBar";
import { News } from "../components/News";
import { db } from "../localdb/db";

export const NewsScreen = (props) => {
  
  return (
    <View style={styles.container}>
      <NavBar screen={"Новости"} navigation={props.navigation} />
       <News />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
