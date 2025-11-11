import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
import { Graph } from '@/components/graph';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from "@/schema"
import { eq } from 'drizzle-orm';

interface Price {
    date: Date,
    item_id: string,
    price: number
}

type Details = {
    uuid: string,
    title: string,
    source: string,
    image: string,
    link: string
};

export default function Details(
    {
        uuid,
        image,
        title = "",
        source,
        link
    }: Details
) {
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, {schema});
    
    const router = useRouter()
    const [ priceData, setPriceData ] = useState<any>({
        current: 0,
        highest: 0,
        lowest: 0
    });
    const [ priceHistoryList,setPriceHistoryListList ] = useState<Price []>([]);
    const [ tracked, setTracked ] = useState<boolean>(false);
    const [ loadding, setLoading ] = useState(true);

    const priceHistory = useMemo(() => {
        return priceHistoryList;
    }, [priceHistoryList]);

    const getDetails = async () => {
        if(!uuid) router.replace("/");
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/item/${uuid}`);
            const data = await response.json();
            const{ highest, lowest, pricesHistory, current } = data
            setPriceHistoryListList(pricesHistory)
            setPriceData({
                current,
                highest,
                lowest
            });
            const list: number [] = [];
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch(error){
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            router.back();
        }
    };

    const getStatus = async () => {
        const userData  = await drizzleDb.select().from(schema.user)
        if(!uuid) router.replace("/");
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`, {
                method: "GET"
            });
            const data = await response.json();
            const {added} = data;
            if(added){
                setTracked(true)
            }
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    };

    const trackProduct = async() => {
        const userData  = await drizzleDb.select().from(schema.user)
        setLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`, {
                method: "POST"
            });
            const data = await response.json();
            const {added} = data;
    
            if (added) {
                setTracked(true)
                await drizzleDb.insert(schema.items).values({
                    uuid,
                    image,
                    title,
                    link,
                    source
                });

                priceHistory.map(async(price: Price) => {
                    await drizzleDb.insert(schema.prices).values({
                        uuid: price.item_id,
                        date: `${price.date}`,
                        price: price.price
                    });
                })
            }
        } catch (error) {
           console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async() => {
        const userData  = await drizzleDb.select().from(schema.user)
         setLoading(true)
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`, {
                method: "DELETE"
            });

            await response.json();
            
            setTracked(false)
            await drizzleDb.delete(schema.items).where(eq(schema.items.uuid, uuid));
            await drizzleDb.delete(schema.prices).where(eq(schema.prices.uuid, uuid));

        } catch (error){
            console.log("start", error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getDetails();
        getStatus();
    },[]); 

    return (
        <View
            style={styles.container}
        >
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
           
            <View style={styles.row}> 
                <View>
                    <Text numberOfLines={1} style={styles.price}>R {priceData.current}</Text>
                </View>
                <View>
                    <Text>Lowest: R {priceData.lowest}</Text>
                    <Text>Average: R {priceData.highest}</Text>
                    <Text>Highest: R {priceData.highest}</Text>
                </View>
            </View>
            <Graph
                prices={[]}
                canvasHeight={200}
                canvasWidth={100}
            />
            <View>
                <Button
                    testID='add-button'
                    loading={loadding}
                    title={tracked? 'Remove Product' : 'Track Product'} 
                    onPress={tracked ? removeProduct : trackProduct}
                /> 
                <Button testID='browser-button' title={`View On ${source}`} onPress={async() => {
                    await WebBrowser.openBrowserAsync(link);
                }} outline={true}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor:"#FFF",
        padding: 20,
    },
    title: {
        fontSize: 28,
    },
    graph: {
        height: 200,
    },
    row:{
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    price: {
        fontSize: 28,
        fontWeight: "bold"
    }
});