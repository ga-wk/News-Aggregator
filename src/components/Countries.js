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

import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { db } from "../localdb/db";
import { dbCountries, dbDefaultCountry, dbSetting } from "../consts/db";
import { categories } from "../consts/new";
import { key } from "../consts/public";

import URL from "url";

export const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const regions = {
    ru: {
      name: "Россия",
      latitude: 55.746513383602625,
      longitude: 37.61064077788447,
    },
    ae: {
      name: "الإمارات العربية المتحدة‎",
      latitude: 25.20243,
      longitude: 55.27132,
    },
    ar: {
      name: "Argentina",
      latitude: -34.60987001878505,
      longitude: -58.441540368303,
    },
    at: { name: "Österreich", latitude: 48.2023, longitude: 16.34915 },
    au: { name: "Australia", latitude: -35.30942, longitude: 149.12497 },
    be: {
      name: "België",
      latitude: 50.84037635520694,
      longitude: 4.350317002982715,
    },
    bg: {
      name: "България",
      latitude: 42.71156089044351,
      longitude: 23.332995989077563,
    },
    br: {
      name: "Brasil",
      latitude: -15.784771523163393,
      longitude: -47.85510597043906,
    },
    ca: {
      name: "Canada",
      latitude: 45.42341719959744,
      longitude: -75.7291218238505,
    },
    ch: { name: "Schweiz", latitude: 46.9504, longitude: 7.45468 },
    cn: { name: "中華", latitude: 39.85785, longitude: 116.37073 },
    co: {
      name: "Colombia",
      latitude: 4.719303823324279,
      longitude: -74.03776810056404,
    },
    cu: {
      name: "Cuba",
      latitude: 23.085956697877286,
      longitude: -82.34561924656916,
    },
    de: { name: "Deutschland", latitude: 52.47627, longitude: 13.3724 },
    eg: {
      name: "مصر‎",
      latitude: 30.06064510668068,
      longitude: 31.194036647794377,
    },
    fr: { name: "France", latitude: 48.80419, longitude: 2.28745 },
  };

  const RenderMarkers = () => {
    const markers = [];
    let index = 0;
    for (let region in regions) {
      markers.push(
        <Marker
          key={index}
          coordinate={{
            latitude: regions[region].latitude,
            longitude: regions[region].longitude,
          }}
          title={regions[region].name}
        />,
      );
      index++;
    }

    return markers;
  };

  const [region, setRegion] = useState("false");
  const [isLoaded, setIsLoaded] = useState(false);
  const [setting, setSetting] = useState({});

  //update
  const switchCountry = (country) => {
      console.log(country)
    let url = `https://newsapi.org/v2/sources?country=${country}&apiKey=${key}`;
    const req = new Request(url);
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        let sources = [];
        for (let i = 0; i < data["sources"].length; i++) {

          let hostName = URL.parse((data["sources"][i]["url"]),false,true)["hostname"];
        //   console.log(hostName)
          sources.push({
            source: hostName,
            isEnabled: true,
          });
        }
        return sources;
      })
      .then((sources) => {
        let tmpSetting = setting;
        tmpSetting[dbDefaultCountry] = country;
        tmpSetting[dbCountries][country] = sources.filter(
          (v, i, a) =>
            a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
        );

        db.update(
          { db: dbSetting },
          tmpSetting,
          {},
          function (err, numReplaced) {},
        );
      });
  };

  const onRegionChange = (country) => {
    setRegion({
      ...regions[country],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    if (!isLoaded) {
      db.findOne({ db: dbSetting }, function (err, doc) {
        if (doc !== null) {
            console.log(doc[dbDefaultCountry])
          setSetting(doc);
          setRegion({
            ...regions[doc[dbDefaultCountry]],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setSelectedCountry(doc[dbDefaultCountry])
          setIsLoaded(true);
        }
      });
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Загрузка</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCountry(itemValue);
            onRegionChange(itemValue);
            switchCountry(itemValue);
          }}
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
          <Picker.Item label="Schweiz" value="ch" />
          <Picker.Item label="中華" value="cn" />
          <Picker.Item label="Colombia" value="co" />
          <Picker.Item label="Cuba" value="cu" />
          <Picker.Item label="Deutschland" value="de" />
          <Picker.Item label="مصر‎ " value="eg" />
          <Picker.Item label="France" value="fr" />
        </Picker>

        <MapView style={styles.map} region={region}>
          <RenderMarkers />
        </MapView>
      </View>
    );
  }
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
