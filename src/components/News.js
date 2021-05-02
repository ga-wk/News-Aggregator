import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { Card } from "react-native-elements";
import {
  everything,
  sources,
  topHeadlines,
  categories,
  general,
  all,
  btnCategories,
} from "../strings/stringNew";
import { key } from "../strings/public";

export const News = (props) => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState(false);
  const [page, setPage] = useState(1);
  const [curCategory, setCurCategory] = useState(all);
  const [curEndpoint, setCurEndpoint] = useState(everything);
  const newsList = useRef(null);

  const size = 10;
  const country = "ru";

  const createUrl = ({
    endpoint,
    q,
    domains,
    category,
    page,
    pageSize,
    country,
    apiKey,
  }) => {
    switch (endpoint) {
      case everything:
        return `https://newsapi.org/v2/${everything}?domains=${domains}&page=${page}&pageSize=${pageSize}&language=${country}&apiKey=${apiKey}`;
      case topHeadlines:
        return `https://newsapi.org/v2/${topHeadlines}?category=${category}&page=${page}&pageSize=${pageSize}&country=${country}&apiKey=${apiKey}`;
      case sources:
        break;
      default:
        break;
    }
  };

  const createPromis = (url) => {
    const req = new Request(url);
    return fetch(req);
  };

  const Item = ({ nameCategory, category }) => (
    <View style={styles.item}>
      <Button
        title={nameCategory}
        style={styles.title}
        onPress={setNewCategory.bind(null, category)}
      />
    </View>
  );

  const NewsItem = ({ title, urlToImage, description }) => (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: urlToImage }} />
      <Card.Divider />
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

  const renderItem = ({ item }) => (
    <Item nameCategory={item.nameCategory} category={item.category} />
  );

  const categoriesClick = (e) => {
    setCategoriesVisible(!categoriesVisible);
  };

  const visibleClass = categoriesVisible ? styles.open : styles.close;

  const getNews = async (
    endpoint = everything,
    q = "",
    category = general,
    page = 1,
    pageSize = 10,
    country = "ru",
    apiKey = key
  ) => {
    console.log("req");
    const url = createUrl(
      endpoint,
      q,
      category,
      page,
      pageSize,
      country,
      apiKey
    );

    const promisNews = createPromis(url);
    const res = await promisNews;
    const data = await res.json();
    return data;
  };

  const setNewCategory = (newCategory) => {
    categoriesClick();
    setCurCategory(newCategory);
    setPage(1);
    const size = 10;
    const country = "ru";
    const page = 1;
    if (newCategory === "all") {
      getNews({
        endpoint: everything,
        category: curCategory,
        domains: ["tvrain.ru"],
        page: page,
        pageSize: size,
        country: country,
        apiKey: key,
      }).then((data) => setNews(data));
      setCurEndpoint(everything);
    } else {
      getNews({
        endpoint: topHeadlines,
        category: newCategory,
        page: page,
        pageSize: size,
        country: country,
        apiKey: key,
      }).then((data) => setNews(data));
      setCurEndpoint(topHeadlines);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      const size = 10;
      const country = "ru";
      const promis = getNews({
        endpoint: curEndpoint,
        category: curCategory,
        domains: ["tvrain.ru"],
        page: page,
        pageSize: size,
        country: country,
        apiKey: key,
      });
      promis.then((data) => {
        setNews(data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <FlatList
        style={[styles.menu, visibleClass]}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.filter}>
        <TextInput />
        <Button title={"поиск"} />
        <Text>
          {categories.filter((v) => v.category === curCategory)[0].nameCategory}
        </Text>
        <Button title={btnCategories} onPress={categoriesClick} />
      </View>
      <View style={styles.content}>
        {isLoaded && news ? (
          <FlatList
            ref={newsList}
            data={news["articles"]}
            renderItem={renderNewsItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              if (news.totalResults > page * size) {
                getNews({
                  endpoint: curEndpoint,
                  category: curCategory,
                  domains: ["tvrain.ru"],
                  page: page + 1,
                  pageSize: size,
                  country: country,
                  apiKey: key,
                }).then((data) => {
                  const newNews = news;
                  newNews["articles"].push(...data["articles"]);
                  setNews(newNews);
                  setPage(page + 1);
                  newsList.current.scrollToIndex({
                    animated: false,
                    index: page * 7,
                  });
                });
              }
            }}
          />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    zIndex: 1,
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
    width: 200,
    top: 35,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  content: {
    zIndex: 1,
  },
  loading: {
    justifyContent: "center",
  },
});
