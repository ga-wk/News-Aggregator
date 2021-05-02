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
import { key , allSources } from "../strings/public";
import DateTimePicker from "@react-native-community/datetimepicker";

export const News = (props) => {
  //style
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const newsList = useRef(null);

  //news
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState(false);
  const [page, setPage] = useState(1);
  const [curCategory, setCurCategory] = useState(all);
  const [curEndpoint, setCurEndpoint] = useState(everything);

  //пока так
  const size = 10;
  const country = "ru";

  // date
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //search
  const searchInput = useRef(null);
  const [input, setInput] = useState(undefined);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const createUrl = ({
    endpoint,
    q,
    from,
    to,
    domains,
    category,
    page,
    pageSize,
    country,
    apiKey,
  }) => {
    switch (endpoint) {
      case everything:
        console.log("qqqqqqqqqqqqqqq", q);
        if (q) {
          console.log("qqqqqqqqqqqqqqq", q);
          return `https://newsapi.org/v2/${everything}?q=${q}&from=${from}to=${to}&&domains=${domains}&page=${page}&pageSize=${pageSize}&language=${country}&apiKey=${apiKey}`;
        }
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
    console.log("req", data.status);
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
        domains: allSources,
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

  const searching = () => {
    setCurCategory("all");
    setPage(1);
    getNews({
      endpoint: everything,
      category: curCategory,
      q: input,
      from: fromDate,
      to: toDate,
      domains: allSources,
      page: page,
      pageSize: size,
      country: country,
      apiKey: key,
    }).then((data) => setNews(data));
    setCurEndpoint(everything);
  };

  useEffect(() => {
    if (!isLoaded) {
      const size = 10;
      const country = "ru";
      const promis = getNews({
        endpoint: curEndpoint,
        category: curCategory,
        domains: allSources,
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

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.filter}>
        <View style={styles.categories}>
          <Text>
            {
              categories.filter((v) => v.category === curCategory)[0]
                .nameCategory
            }
          </Text>
          <Button title={btnCategories} onPress={categoriesClick} />
        </View>

        <View style={styles.searchForm}>
          <TextInput
            ref={searchInput}
            onChangeText={(text) => setInput(text)}
            value={input}
            style={styles.searchInput}
          />
          <Button
            onPress={showDatepicker}
            title={`от ${fromDate.getDate()}-${fromDate.getMonth()}`}
          />
          <Button
            onPress={showDatepicker}
            title={`до ${toDate.getDate()}-${toDate.getMonth()}`}
          />
          <Button onPress={searching} title={"поиск"} />
        </View>
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
                  q: input,
                  from: fromDate,
                  to: toDate,
                  domains: allSources,
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
    flexDirection: "column",
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
  searchForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
  },
  searchInput: {
    width: "50%",
  },
  categories: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
