import Datastore from "react-native-local-mongodb";
import AsyncStorage from "@react-native-community/async-storage";

export const db = new Datastore({ filename: "asyncStorageKey" });
db.loadDatabase(function (err) {
  // Callback is optional
  // Now commands will be executed
});
