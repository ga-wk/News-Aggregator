import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
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
  let visibleClass = (categoriesVisible ? styles.open : styles.close)
  return (
    <View style={styles.container}>
      <Button title={"Категории"} onPress={categoriesClick} />

      <FlatList
        // hidden={categoriesVisible})
        style={[styles.menu,  visibleClass]}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

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
  open: {
    position: "absolute",
    display: "flex",
  },
  close: {
    display: "none",
  },
  menu: {
    width: 100,
    top: 0,
    right:0,
    backgroundColor: "#fff",
  },
});
