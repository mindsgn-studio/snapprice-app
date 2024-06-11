import { UserProvider } from '@/context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <UserProvider>
        <Stack
            screenOptions={{
                headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerShown: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="item" />
    </Stack>
    </UserProvider>
  );
}