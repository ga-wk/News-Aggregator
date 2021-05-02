import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  TextInput,
  Button,
} from "react-native";

export const allSources = [
  "rbc.ru",
  "news.google.com",
  "lenta.ru",
  "russian.rt.com",
  "www.rbc.ru",
  "meduza.io",
  "tvrain.ru",
];

const sources = {
  ru: [
    {
      source: "rbc.ru",
      isEnabled: true,
    },
    {
      source: "news.google.com",
      isEnabled: true,
    },
    {
      source: "lenta.ru",
      isEnabled: true,
    },
    {
      source: "russian.rt.com",
      isEnabled: true,
    },
    {
      source: "www.rbc.ru",
      isEnabled: true,
    },
    {
      source: "meduza.io",
      isEnabled: true,
    },
    {
      source: "tvrain.ru",
      isEnabled: true,
    },
  ],
  en: [],
};

const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

const Item = ({ source, isEnabled }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{source}</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
    <Button title={"Удалить"} />
  </View>
);

const renderItem = ({ item }) => (
  <Item source={item.source} isEnabled={item.isEnabled} />
);

export const Favorite = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.addForm}>
        <TextInput
          onChangeText={(text) => setInput(text)}
          style={styles.addInput}
        />
        <Button title={"Добавить"} />
      </View>
      <FlatList
        data={sources["ru"]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 22,
    color: "#000",
  },
  addForm: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addInput: {
    width: "80%",

    borderWidth: 1,
    borderColor: "#c4c4c4ff",
    borderRadius: 5,
  },
});
