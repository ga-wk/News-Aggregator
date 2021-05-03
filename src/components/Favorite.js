import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { db } from "../localdb/db";

export const allSources = [
  "rbc.ru",
  "news.google.com",
  "lenta.ru",
  "russian.rt.com",
  "www.rbc.ru",
  "meduza.io",
  "tvrain.ru",
];

export const Favorite = (props) => {
  const [sources, setSources] = useState(undefined);
  const [setting, setSetting] = useState();
  const [rerender, setRerender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      db.findOne({ db: "setting" }, function (err, doc) {
        if (doc !== null) {
          setSetting(doc);
          setSources(doc["countries"]);
          setRerender(!rerender);
          setIsLoaded(true);
        }
      });
    }
  }, [isLoaded]);

  //update
  const toggleSwitch = (value, source) => {
    let tmpSetting = setting;
    let tmpSources = sources["ru"].map((el) => {
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

    tmpSetting["countries"][setting["defaultCountry"]] = tmpSources;
    db.update(
      { db: "setting" },
      tmpSetting,
      {},
      function (err, numReplaced) {}
    );
    setSetting(tmpSetting);
    setSources(tmpSetting["countries"]);
    setRerender(!rerender);
  };

  //add
  const [input, setInput] = useState(undefined);
  const addSource = () => {
    let tmpSetting = setting;
    let tmpSources = sources["ru"];
    tmpSources.push({ source: input, isEnabled: true });

    tmpSetting["countries"][tmpSetting["defaultCountry"]] = tmpSources;
    db.update(
      { db: "setting" },
      tmpSetting,
      {},
      function (err, numReplaced) {}
    );
    setSetting(tmpSetting);
    setSources(tmpSetting["countries"]);
    setRerender(!rerender);
  };

  //remove
  const removeSource = (index) => {
    let tmpSetting = setting;
    let tmpSources = sources["ru"];
    tmpSources.splice(index, 1);

    tmpSetting["countries"][tmpSetting["defaultCountry"]] = tmpSources;

    setSetting(tmpSetting);
    setSources(tmpSetting["countries"]);

    setRerender(!rerender);
    db.update(
      { db: "setting" },
      tmpSetting,
      {},
      function (err, numReplaced) {}
    );
  };

  const Item = ({ source, isEnabled, index }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{source}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => toggleSwitch.apply(null, [value, source])}
        value={isEnabled}
      />
      <Button onPress={removeSource.bind(null, index)} title={"Удалить"} />
    </View>
  );

  const renderItem = ({ item, index }) => (
    <Item index={index} source={item.source} isEnabled={item.isEnabled} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.addForm}>
        <TextInput
          onChangeText={(text) => setInput(text)}
          style={styles.addInput}
        />
        <Button onPress={addSource} title={"Добавить"} />
      </View>
      {sources && isLoaded ? (
        <FlatList
          data={sources["ru"]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ActivityIndicator />
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
