
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { useEffect } from 'react';
import List from '@/components/list';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema});

  const getItems = async() => {
    try {
      const result = await drizzleDb.select().from(schema.items);
      console.log(result)
    } catch(error) {
    }
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
