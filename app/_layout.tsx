import { Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider } from "expo-sqlite"
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from '@/drizzle/migrations';
import { AblyProvider, ChannelProvider } from 'ably/react';
import * as Ably from "ably";
import * as Crypto from "expo-crypto";
import { startBackgroundTask, stopBackgroundTask } from '@/lib/utils';
import { AppState } from "react-native";
import * as BackgroundTask from 'expo-background-task';

export const DATABASE_NAME = 'snapprice';
const clientId = Crypto.randomUUID();

const realtimeClient = new Ably.Realtime({
  key: process.env.EXPO_PUBLIC_ABLY,
  clientId
});

export default function RootLayout() {  
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  useMigrations(db, migrations);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background") {
        console.log("➡️ App moved to BACKGROUND");
        BackgroundTask.triggerTaskWorkerForTestingAsync();
      }

      if (nextState === "active") {
        console.log("⬅️ App moved to FOREGROUND");
      }
    });

    return () => subscription.remove();
  }, []);
  
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
          <AblyProvider client={realtimeClient}>
            <ChannelProvider channelName="items">
               <ChannelProvider channelName={`private:${clientId}`}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="item" options={{ headerShown: false }} />
                <Stack.Screen name="add" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="list" options={{ headerShown: false }} />
              </Stack>
              </ChannelProvider>
            </ChannelProvider>
          </AblyProvider>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
