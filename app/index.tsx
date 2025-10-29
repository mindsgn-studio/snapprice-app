
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import SearchInput from '@/components/search';
import Main from '@/components/main';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema});
  
  return (
    <View style={styles.container}>
      <SearchInput />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
