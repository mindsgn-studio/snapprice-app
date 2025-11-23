import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
import * as Haptics from 'expo-haptics';
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from "@/schema"
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

interface Price {
    date: Date,
    item_id: string,
    price: number
}

type Details = {
    uuid: string,
    title: string,
    brand: string,
    source: string,
    image: string,
    link: string,
    price: number
};


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('myNotificationChannel', {
            name: 'A channel is needed for the permissions prompt to appear',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return "null";
        }
        
        try {

            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            
            token = (
                await Notifications.getExpoPushTokenAsync({projectId})
            ).data;

        } catch (e) {
            token = `${e}`;
        }
  return token;
}

export default function Details(
    {
        uuid,
        image,
        title = "",
        source,
        link,
        price,
        brand
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
    const [ prices, setPrices ] = useState<number []>([])
    const [ priceHistoryList,setPriceHistoryListList ] = useState<Price []>([]);
    const [ tracked, setTracked ] = useState<boolean>(false);
    const [ loadding, setLoading ] = useState(true);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    const priceHistory = useMemo(() => {
        return priceHistoryList;
    }, [priceHistoryList]);

    const getDetails = async () => {
        if(!uuid) router.replace("/");
        try{            
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/item/${uuid}`);
            const data = await response.json();
            
            const{ highest, lowest, pricesHistory, current, previous, change } = data
            setPriceHistoryListList(pricesHistory)
            setPriceData({
                current,
                highest,
                lowest,
                pricesHistory
            });
            const list: number [] = [];
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch(error){
            console.log(error)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            //router.back();
        }
    };

    const getStatus = async () => {
        const userData  = await drizzleDb.select().from(schema.user)
        // if(!uuid) router.replace("/");
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
        setLoading(true);       
        try {
            let token = await registerForPushNotificationsAsync()
            let link = `${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`
            
            if(token!="null"){
                const device = Platform.OS
                Notifications.requestPermissionsAsync();
                token = (await Notifications.getDevicePushTokenAsync()).data;
                link = `${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}/${token}/${device}`
            }
            
            const response = await fetch(link, {
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
                    source,
                    brand
                });

                router.replace("/item")
            }
        } catch (error) {
           console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        let data: number [] = []

        priceHistory.map((item) => {
            data.push(item.price)    
        })

        setPrices(data)

    },[priceHistory]); 

    useEffect(() => {
        getDetails();
        getStatus();    
    },[]); 

    return (
        <View
            style={styles.container}
        >
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text numberOfLines={1}>{brand}</Text>
           
            <View style={styles.row}> 
                <Text numberOfLines={1} style={styles.price}>R {price}</Text>
            </View>
 
            <View>
                <Button
                    testID='add-button'
                    loading={loadding}
                    title={'Track Product'} 
                    onPress={trackProduct}
                />
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