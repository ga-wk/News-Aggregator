import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Button title={title} style={styles.title} />
  </View>
);
const renderItem = ({ item }) => <Item title={item.title} />;
export const News = (props) => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  const categoriesClick = (e) => {
    setCategoriesVisible(!categoriesVisible);
  };
  let visibleClass = categoriesVisible ? styles.open : styles.close;
  return (
    <View style={styles.container}>
      <FlatList
        style={[styles.menu, visibleClass]}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.filter}>
        <TextInput />
        <Button title={"поиск"} />
        <Text>Категории</Text>
        <Button title={"Категории"} onPress={categoriesClick} />
      </View>

      <View style={styles.content}>
        <Text>News</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
  },
  filter: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  open: {
    position: "absolute",
    display: "flex",
  },
  close: {
    display: "none",
  },
  menu: {
    width: 100,
    top: 35,
    right: 0,
    backgroundColor: "#fff",
  },
});
