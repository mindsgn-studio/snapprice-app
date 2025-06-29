import { Stack } from 'expo-router';
import { createStore } from 'tinybase';
import * as SQLite from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from 'tinybase/ui-react';
import 'react-native-reanimated';
import { DATABASE } from '@/@src/constants/database';

const useAndStartPersister = (store: any) =>
  useCreatePersister(
    store,
    (store) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(DATABASE)),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
);

export default function RootLayout() {
  const store = useCreateStore(createStore);
  useAndStartPersister(store);


  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="item" options={{ headerShown: false, presentation: "modal" }} />
      </Stack>
    </Provider>
  );
}
