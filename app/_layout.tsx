import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider } from "expo-sqlite"
import 'react-native-reanimated';

export const DATABASE_NAME = 'snapprice';

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider 
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="item" options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
