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
  const [selectedCountry, setSelectedCountry] = useState("");

  const region = {
    ru: { latitude: 55.746513383602625, longitude: 37.61064077788447 },
    ae: { latitude: 25.20243, longitude: 55.27132 },
    ar: { latitude: -34.60987001878505, longitude: -58.441540368303 },
    at: { latitude: 48.2023, longitude: 16.34915 },
    au: { latitude: -35.30942, longitude: 149.12497 },
    be: { latitude: 50.84037635520694, longitude: 4.350317002982715 },
    bg: { latitude: 42.71156089044351, longitude: 23.332995989077563 },
    br: { latitude: -15.784771523163393, longitude: -47.85510597043906 },
    ca: { latitude: 45.42341719959744, longitude: -75.7291218238505 },
    ch: { latitude: 46.9504, longitude: 7.45468 },
    cn: { latitude: 39.85785, longitude: 116.37073 },
    co: { latitude: 4.719303823324279, longitude: -74.03776810056404 },
    cu: { latitude: 23.085956697877286, longitude: -82.34561924656916 },
    de: { latitude: 52.47627, longitude: 13.3724 },
    eg: { latitude: 30.06064510668068, longitude: 31.194036647794377 },
    fr: { latitude: 48.80419, longitude: 2.28745 },
  };

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
          latitude: 55.746513383602625,
          longitude: 37.61064077788447,
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
    height: 50,
    borderWidth: 1,
    borderColor: "#c4c4c4ff",
  },
  map: {
    flex: 9,
    width: "100%",
    backgroundColor: "#c4c4c4ff",
  },
});
