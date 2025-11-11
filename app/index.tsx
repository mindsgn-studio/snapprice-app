
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';

export default function HomeScreen() {
  const router = useRouter()
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema});

  const createNewUser = async() => {
    const data  = await drizzleDb.select().from(schema.user)
    try {
      if(data.length===0){
        const uuid = await Crypto.randomUUID()
        await drizzleDb.insert(schema.user).values({
          uuid,
        });
      }else{
         router.push("/home")
      }
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
     createNewUser()
  },[])

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
