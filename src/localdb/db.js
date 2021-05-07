import Datastore from "react-native-local-mongodb";

export const db = new Datastore({ filename: "asyncStorageKey" });
db.loadDatabase(function (err) {
  // Callback is optional
  // Now commands will be executed
});
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

export const resetDB = () => {
  db.update(
    {  db: "setting" },
    setting,
    {},
    function (err, numReplaced) {},
  );
  // db.findOne({ _id: "uuVuOCI1sylsnXzR"}, function (err, doc) {
  //   if (doc === null) {
  //     db.update(
  //       {  _id: "uuVuOCI1sylsnXzR" },
  //       setting,
  //       {},
  //       function (err, numReplaced) {},
  //     );
  //   }
  // });
}