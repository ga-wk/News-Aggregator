import Datastore from "react-native-local-mongodb";

export const db = new Datastore({ filename: "asyncStorageKey" });
db.loadDatabase(function (err) {
  // Callback is optional
  // Now commands will be executed
});
