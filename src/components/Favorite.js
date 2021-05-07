import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { db, resetDB } from "../localdb/db";
import {
  dbCountries,
  dbDefaultCountry,
  dbSetting,
  sourceIsEnabled,
  sourceName,
} from "../consts/db";

export const Favorite = (props) => {
  const [sources, setSources] = useState({});
  const [setting, setSetting] = useState("");
  const [rerender, setRerender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      db.findOne({ db: dbSetting }, function (err, doc) {
        if (doc !== null) {
          setSetting(doc);
          setSources(doc[dbCountries]);
          setIsLoaded(true);
        }
      });
    }
  }, [isLoaded]);

  //update
  const toggleSwitch = (value, source) => {
    let tmpSetting = setting;

    let tmpSources = sources[setting[dbDefaultCountry]].map((el) => {
      if (el.source === source) {
        return {
          source: el.source,
          isEnabled: value,
        };
      }
      return {
        source: el.source,
        isEnabled: el.isEnabled,
      };
    });

    tmpSetting[dbCountries][setting[dbDefaultCountry]] = tmpSources;
    db.update(
      { db: dbSetting },
      tmpSetting,
      {},
      function (err, numReplaced) {},
    );
    setSetting(tmpSetting);
    setSources(tmpSetting[dbCountries]);
    setRerender(!rerender);
  };

  //add
  const [input, setInput] = useState(undefined);
  const addSource = () => {
    let tmpSetting = setting;
    let tmpSources = sources["ru"];
    tmpSources.push({ source: input, isEnabled: true });

    tmpSetting[dbCountries][setting[dbDefaultCountry]] = tmpSources;
    db.update(
      { db: dbSetting },
      tmpSetting,
      {},
      function (err, numReplaced) {},
    );
    setSetting(tmpSetting);
    setSources(tmpSetting[dbCountries]);
    setRerender(!rerender);
  };

  //remove
  const removeSource = (index) => {
    let tmpSetting = setting;
    let tmpSources = sources["ru"];
    tmpSources.splice(index, 1);

    tmpSetting[dbCountries][setting[dbDefaultCountry]] = tmpSources;

    setSetting(tmpSetting);
    setSources(tmpSetting[dbCountries]);

    setRerender(!rerender);
    db.update(
      { db: dbSetting },
      tmpSetting,
      {},
      function (err, numReplaced) {},
    );
  };

  const Item = ({ source, isEnabled, index }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{source}</Text>
      {isEnabled !== "error" ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => toggleSwitch.apply(null, [value, source])}
          value={isEnabled}
        />
      ) : null}
      {isEnabled !== "error" ? (
        <Button onPress={removeSource.bind(null, index)} title={"Удалить"} />
      ) : null}
    </View>
  );

  const renderItem = ({ item, index }) => {
    console.log("sources", sources[setting[dbDefaultCountry]]);
    return (
      <Item index={index} source={item.source} isEnabled={item.isEnabled} />
    );
  };
  const [refreshing, setRefreshing] = useState(false);
  //Обновление новостей
  const onRefresh = useCallback(() => {
    console.log("refresh");
    setRefreshing(true);

    db.findOne({ db: dbSetting }, function (err, doc) {
      if (doc !== null) {
        setSetting(doc);
        setSources(doc[dbCountries]);
      }
      setRefreshing(false);
    });
  }, [refreshing]);
  const plug = [
    {
      source: "источников нет, выберете другую страну",
      isEnabled: "error",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.addForm}>
        <TextInput
          onChangeText={(text) => setInput(text)}
          style={styles.addInput}
        />
        <Button onPress={addSource} title={"Добавить"} />
      </View>
      {isLoaded &&
      sources &&
      setting &&
      sources[setting[dbDefaultCountry]].length ? (
        <FlatList
          data={sources[setting[dbDefaultCountry]]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          data={plug}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
    width: 200,
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
