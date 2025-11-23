
import { Text, ImageBackground, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams  } from "expo-router";
import { width } from '@/constants/dimensions';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import LineChart from '@/components/graph';
import { useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import AnimatedText from '@/components/animated-text';
import { useFont } from '@shopify/react-native-skia';
import Button from '@/components/button';
import * as schema from "@/schema";
import { useSQLiteContext } from 'expo-sqlite';
import { eq } from 'drizzle-orm';
import { useRouter } from 'expo-router';
import * as Haptics from "expo-haptics";

export type DataType = {
  item_id: string;
  date: string;
  price: number;
};

const CHART_MARGIN = 0;
const CHART_HEIGHT = 350;

export default function ItemScreen() {
  const router = useRouter()
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});
  const [ loadding, setLoading ] = useState<boolean>(false);
  const font = useFont(require('../assets/fonts/bold.otf'), 22);
  const { width: CHART_WIDTH } = useWindowDimensions(); 
  const [ selectedDate, setSelectedDate ] = useState<string>('Total');
  const selectedValue = useSharedValue(0);
  const [lineData, setLineData] = useState<DataType[]>([]) ;

  const data = useLocalSearchParams<any>();
  const {
    uuid,
    title,
    image,
    brand,
    source,
    link,
  } = data

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
          router.back()
      } catch (error){
          console.log("start", error)
      } finally {
          setLoading(false)
      }
  }

  const getDetails = async () => {
    if(!uuid) router.replace("/");
      try {            
        const response = await fetch(`${process.env.EXPO_PUBLIC_API}/item/${uuid}`);
        const data = await response.json();
              
        const{ highest, lowest, pricesHistory, current, previous, change } = data
        setLineData(pricesHistory)
              // setPriceHistoryListList(pricesHistory)
              // setPriceData({
              //    current,
              //    highest,
              //    lowest,
              //    pricesHistory
              //});
          const list: number [] = [];
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch(error) {
          console.log(error)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              //router.back();
      }
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
    <AnimatedText selectedValue={selectedValue} font={font}/>
    {
      lineData.length == 0?
      <View
        style={{
          height: CHART_HEIGHT
        }}/>
      :
      <LineChart
        data={lineData}
        chartHeight={CHART_HEIGHT}
        chartWidth={CHART_WIDTH}
        chartMargin={CHART_MARGIN}
        setSelectedDate={setSelectedDate}
        selectedValue={selectedValue}
      />
    }
    
    <View style={{
      paddingTop: 40
    }}>
      <Button
        outline={true}
        testID='add-button'
        loading={loadding}
        title={'Remove Product'} 
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
    fontSize: 28,
  },
  container: {
    flex: 1,
  },
  indicator: {
    alignSelf: "center",
  },
  image: {
      width,
      height: 350
    },
});
