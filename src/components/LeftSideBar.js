import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";


export const LeftSidebar = () => {
  <View >
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
  </View>;
};
