import React, { useState, useEffect } from "react";
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

import MapView from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
export const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedCountry}
        onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
      >
        <Picker.Item label="Россия" value="ru" />
        <Picker.Item label="الإمارات العربية المتحدة‎" value="ae" />
        <Picker.Item label="Argentina" value="ar" />
        <Picker.Item label="Österreich" value="at" />
        <Picker.Item label="Australia" value="au" />
        <Picker.Item label="België" value="be" />
        <Picker.Item label="България" value="bg" />
        <Picker.Item label="Brasil" value="br" />
        <Picker.Item label="Canada" value="ca" />
        <Picker.Item label="die Schweiz" value="ch" />
        <Picker.Item label="中華人民共和國" value="cn" />
        <Picker.Item label="Colombia" value="co" />
        <Picker.Item label="Cuba" value="cu" />
        <Picker.Item label="Deutschland" value="de" />
        <Picker.Item label="مصر‎ " value="eg" />
        <Picker.Item label="France" value="fr" />
      </Picker>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
  picker: {
    flex: 1,
    width: 200,
    height:50,
    borderWidth: 1,
    borderColor: "#c4c4c4ff",
  },
  map: {
    flex: 9,
    width: '100%',
    backgroundColor: "#c4c4c4ff",
  },
});
