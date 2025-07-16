import Realm, { BSON } from "realm";


interface FavouriteInterface {
    _id: BSON.ObjectId;
}

class Favourite extends Realm.Object<FavouriteInterface> {
  //@ts-expect-error
  _id: BSON.ObjectId;
  
  static schema = {
    name: "Favourite",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
    },
  };
}

const SCHEMA_VERSION = 1;

export { Favourite, SCHEMA_VERSION };
