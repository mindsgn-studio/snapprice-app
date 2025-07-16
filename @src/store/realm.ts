import { create } from 'zustand'
import Realm from 'realm';


interface RealmInterface {
  realm: Realm | null,
  setRealm: (realm: Realm) => void,
}

const useRealm = create<RealmInterface>((set, get) => ({
  realm: null,
  setRealm: (realm: Realm) => {
    set({ realm });
  }
}));


export {
    useRealm
}
