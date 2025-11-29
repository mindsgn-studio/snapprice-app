
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import * as BackgroundTask from 'expo-background-task';
import { useState } from 'react';
import { categoryTypes } from '@/constants/categories';

export default function HomeScreen() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [status, setStatus] = useState<BackgroundTask.BackgroundTaskStatus | null>(null);

  const router = useRouter()
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema});
  const [loaded, error] = useFonts({
    'heavy': require('../assets/fonts/heavy.otf'),
    'bold': require('../assets/fonts/bold.otf'),
    'meduim': require('../assets/fonts/meduim.otf'),
    'regular': require('../assets/fonts/regular.otf'),
  });
  
  const createNewUser = async() => {
    const data  = await drizzleDb.select().from(schema.user);
    try {
      if(data.length===0) {
        const uuid = await Crypto.randomUUID()
        await drizzleDb.insert(schema.user).values({
          uuid
        });
        router.replace("/home");
      } else {
        router.replace("/home");
      }
    } catch (error){
      console.log(error);
    }
  };

  const createCategory = async() => {
    const category  = await drizzleDb.select().from(schema.category);
    try {
      if(category.length === 0) {
        categoryTypes.map(async(item) => {
          await drizzleDb.insert(schema.category).values({
            title: item.title,
            description: item.description,
            background: item.background,
            color: item.color,
            label: item.label,
            value: item.value,
            created_at: Date.now(),
            updated_at: Date.now(),
          });
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      createNewUser();
    }
  };

  useEffect(() => {
    if (loaded || error) {
      createCategory();
    }
  },[loaded, error]);

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.indicator}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  indicator: {
    alignSelf: "center",
  }
});
