import { Stack } from 'expo-router';
import { RealmProvider } from "@realm/react";
import { Favourite, SCHEMA_VERSION } from '@/@src/schema/favourite';

export default function RootLayout() {
  return (
    <RealmProvider
      schema={[ Favourite ]}
      schemaVersion={SCHEMA_VERSION}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="item" options={{ headerShown: false, presentation: "modal" }} />
      </Stack>
    </RealmProvider>
  );
}
