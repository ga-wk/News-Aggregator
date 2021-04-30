import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Card } from "react-native-elements";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Button title={title} style={styles.title} />
  </View>
);

const NewsItem = ({ title, urlToImage, description }) => (

  <Card>
    <Card.Title>{title}</Card.Title>
    <Card.Divider/>
    <Card.Image  source={{uri:urlToImage}}/>
    <Card.Divider/>
    <Text style={{ marginBottom: 10 }}>{description}</Text>
  </Card>
);

const renderNewsItem = ({ item }) => (
  <NewsItem
    title={item["title"]}
    urlToImage={item["urlToImage"]}
    description={item["description"]}
  />
);
const renderItem = ({ item }) => <Item title={item.title} />;

export const News = (props) => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState(null);

  const url =
    "https://newsapi.org/v2/top-headlines?country=ru&pageSize=10&apiKey=1c0f29e3b4504430822fb18fd64d6988";
  const req = new Request(url);

  useEffect(() => {
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      })
      .then(setIsLoaded(true));
  }, [isLoaded]);

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
        {isLoaded && news ? (
          <FlatList
            data={news["articles"]}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item["title"]}
          />
        ) : (
          <Text>Загрузка</Text>
        )}
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
