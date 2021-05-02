import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  ActivityIndicator,
  Linking,
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
import { key, allSources } from "../strings/public";
import DateTimePicker from "@react-native-community/datetimepicker";

export const News = (props) => {
  //style
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const newsList = useRef(null);

  //пока так
  const pageFirst = 1;
  const size = 10;
  const country = "ru";

  //news
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState(false);
  const [page, setPage] = useState(pageFirst);
  const [curCategory, setCurCategory] = useState(all);
  const [curEndpoint, setCurEndpoint] = useState(everything);

  // date
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [curDate, setCurDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //search
  const searchInput = useRef(null);
  const [input, setInput] = useState(undefined);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    switch (curDate) {
      case "from":
        setFromDate(currentDate);
        break;
      case "to":
        setToDate(currentDate);
        break;
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (date) => {
    switch (date) {
      case "from":
        setCurDate("from");
        break;
      case "to":
        setCurDate("to");
        break;
    }
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
    tmpfrom = from.toLocaleDateString().split("/");
    tmpfrom = `20${tmpfrom[2]}-${tmpfrom[0]}-${tmpfrom[1]}`;
    tmpto = to.toLocaleDateString().split("/");
    tmpto = `20${tmpto[2]}-${tmpto[0]}-${tmpto[1]}`;

    console.log("from", from, "to", to);
    switch (endpoint) {
      case everything:
        if (q) {
          return `https://newsapi.org/v2/${everything}?q=${q}&from=${tmpfrom}to=${tmpto}&domains=${domains}&page=${page}&pageSize=${pageSize}&language=${country}&apiKey=${apiKey}`;
        }
        return `https://newsapi.org/v2/${everything}?q=&from=${from.toUTCString()}to=${to.toUTCString()}&domains=${domains}&page=${page}&pageSize=${pageSize}&language=${country}&apiKey=${apiKey}`;
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

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  const NewsItem = ({ title, urlToImage, description, url, publishedAt }) => (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: urlToImage }} />
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{description}</Text>
      <Card.Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <OpenURLButton url={url}>Открыть</OpenURLButton>
        <Text>{publishedAt}</Text>
      </View>
    </Card>
  );

  const renderNewsItem = ({ item }) => (
    <NewsItem
      title={item["title"]}
      urlToImage={item["urlToImage"]}
      description={item["description"]}
      url={item["url"]}
      publishedAt={item["publishedAt"]}
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
    setPage(pageFirst);
    setInput(undefined);

    if (newCategory === "all") {
      getNews({
        endpoint: everything,
        category: curCategory,
        domains: allSources,
        from: new Date(),
        to: new Date(),
        page: pageFirst,
        pageSize: size,
        country: country,
        apiKey: key,
      }).then((data) => setNews(data));
      setCurEndpoint(everything);
      setFromDate(new Date());
      setToDate(new Date());
    } else {
      getNews({
        endpoint: topHeadlines,
        category: newCategory,
        from: fromDate,
        to: toDate,
        page: pageFirst,
        pageSize: size,
        country: country,
        apiKey: key,
      }).then((data) => setNews(data));
      setCurEndpoint(topHeadlines);
    }
  };

  const searching = () => {
    setCurCategory(all);
    setPage(pageFirst);
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
    }).then((data) => {
      // console.log(data);
      setNews(data);
    });
    setCurEndpoint(everything);
  };

  useEffect(() => {
    if (!isLoaded) {
      const promis = getNews({
        endpoint: curEndpoint,
        category: curCategory,
        domains: allSources,
        from: fromDate,
        to: toDate,
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
          value={curDate === "from" ? fromDate : toDate}
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
            onPress={showDatepicker.bind(null, "from")}
            title={`от ${fromDate.toLocaleDateString().split("/")[1]}-${
              fromDate.toLocaleDateString().split("/")[0]
            }`}
          />
          <Button
            onPress={showDatepicker.bind(null, "to")}
            title={`до ${toDate.toLocaleDateString().split("/")[1]}-${
              toDate.toLocaleDateString().split("/")[0]
            }`}
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
  },
  searchInput: {
    width: "50%",

    borderWidth: 1,
    borderColor: "#c4c4c4ff",
    borderRadius: 5,
  },
  categories: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
