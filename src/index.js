import React from "react";

import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FavoriteScreen } from "./screens/FavoriteScreen";
import { NewsScreen } from "./screens/NewsScreen";
import { CountriesScreen } from './screens/CountriesScreen'
import { db } from "./localdb/db";
const Drawer = createDrawerNavigator();

export const Index = () => {
  const setting = {
    db: "setting",
    defaultCountry: "ru",
    countries: {
      ru: [
        {
          source: "rbc.ru",
          isEnabled: true,
        },
        {
          source: "news.google.com",
          isEnabled: true,
        },
        {
          source: "lenta.ru",
          isEnabled: true,
        },
        {
          source: "russian.rt.com",
          isEnabled: true,
        },
        {
          source: "www.rbc.ru",
          isEnabled: true,
        },
        {
          source: "meduza.io",
          isEnabled: true,
        },
        {
          source: "tvrain.ru",
          isEnabled: true,
        },
      ],
      ae: [],
      ar: [],
      at: [],
      au: [],
      be: [],
      bg: [],
      br: [],
      ca: [],
      ch: [],
      cn: [],
      co: [],
      cu: [],
      de: [],
      eg: [],
      fr: [],
    },
  };

  db.findOne({ db: "setting" }, function (err, doc) {
    if (doc === null) {
      db.insert(setting);
    }
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Новости">
        <Drawer.Screen name="Новости" component={NewsScreen} />
        <Drawer.Screen name="Избранные" component={FavoriteScreen} />
        <Drawer.Screen name="Страны" component={CountriesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
