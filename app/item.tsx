
import { Text, ImageBackground, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams  } from "expo-router";
import { width } from '@/constants/dimensions';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useState, useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useFont } from '@shopify/react-native-skia';
import Button from '@/components/button';
import * as schema from "@/schema";
import { useSQLiteContext } from 'expo-sqlite';
import { eq } from 'drizzle-orm';
import { useRouter } from 'expo-router';
import InfoCard from '@/components/infoCard';
import AnimatedText from '@/components/animated-text';

export type DataType = {
  item_id: string;
  date: string;
  price: number;
};

const CHART_MARGIN = 0;
const CHART_HEIGHT = 350;

export default function ItemScreen() {
  const router = useRouter()
  const data = useLocalSearchParams<any>();
  const {
    uuid,
    title,
    image,
    brand,
  } = data

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});
  const [ loading, setLoading ] = useState<boolean>(false);
  const font = useFont(require('../assets/fonts/bold.otf'), 22);
  const selectedValue = useSharedValue(0);
  const [ statistics, setStatistics] = useState({
    change: 0,
    average: 0,
    highest: 0,
    lowest: 0,
  }) ;

  const removeProduct = async() => {
    const userData  = await drizzleDb.select().from(schema.user)
    setLoading(true)
      try{
          const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`, {
            method: "DELETE"
          });
          
          await response.json();
          
          await drizzleDb.delete(schema.items).where(eq(schema.items.uuid, uuid));
          await drizzleDb.delete(schema.prices).where(eq(schema.prices.uuid, uuid));
          await drizzleDb.delete(schema.statistics).where(eq(schema.statistics.item_uuid, uuid));

          router.back()
      } catch (error){
          console.log("start", error)
      } finally {
          setLoading(false)
      }
  }

  const getDetails = async () => {
    const response = await drizzleDb.select().from(schema.statistics).where(eq(schema.statistics.item_uuid, uuid))
    
    if(response.length === 0){
      return null
    }

    setStatistics({
        current: response[0].current,
        //@ts-expect-error type null
        change: response[0].change,
        //@ts-expect-error type null
        average: response[0].average,
        //@ts-expect-error type null
        lowest: response[0].lowest,
        //@ts-expect-error type null
        highest: response[0].highest
    });

    //@ts-expect-error type null
    selectedValue.value = response[0].current
  };

  useEffect(() => {
    getDetails()
  },[])

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: `${image}`,
        }}
      />
    
      <View style={styles.row}> 
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.brand}>{brand}</Text>
      <AnimatedText
        selectedValue={selectedValue}
        font={font}
      />
      <View style={{
        flex:1
      }}>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: 20,
          paddingHorizontal: 30,
        }}>
          <InfoCard
            value={statistics.change}
            title={"Change"}
          />
          <InfoCard
            value={statistics.average}
            title={"Average"}
            color='#F29900'
            backgroundColor='#FDF3E0'
            
          />
          <InfoCard
            value={statistics.lowest}
            title={"Lowest"}
            color='#06BF9A'
            backgroundColor='#E1F7F3'
          />
          <InfoCard
            value={statistics.highest}
            title={"Highest"}
            color='#D93025'
            backgroundColor='#FAE6E5'
          />
        </View>
      </View>
      <View style={{
        paddingTop: 40
      }}>
        <Button
          disabled={loading || loading}
          outline={true}
          testID='add-button'
          loading={loading}
          title={'DELETE'} 
          onPress={removeProduct}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "heavy",
    fontSize: 28,
    paddingVertical: 10,
  },
  brand: {
    paddingHorizontal: 20,
    fontSize: 18,
    color: "black"
  },
  infoCard:{
    height: 100,
    margin: 20,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  indicator: {
    alignSelf: "center",
  },
  image: {
      width,
      height: 350
    },
});
