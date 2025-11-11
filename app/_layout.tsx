import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider } from "expo-sqlite"
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import migrations from '@/drizzle/migrations';

export const DATABASE_NAME = 'snapprice';

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (  
    <GestureHandlerRootView>
      <Suspense fallback={
        <ActivityIndicator size="large" />}
      >
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="item" options={{ headerShown: false, presentation: "modal" }} />
            <Stack.Screen name="list" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
