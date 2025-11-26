import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from "@/schema"
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker';
import { eq } from 'drizzle-orm';

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

/*
async function registerForPushNotificationsAsync() {
    let token;

        if (Platform.OS === 'android') {
            return "null"
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
*/

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
    const category  = drizzleDb.select().from(schema.category);
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const [ priceData, setPriceData ] = useState<any>({
        current: 0,
        highest: 0,
        lowest: 0
    });
    const [ prices, setPrices ] = useState<number []>([])
    const [ trackPriceDrop, setTrackPriceDrop ] = useState<boolean>(true);
    const [ trackStock, setTrackStock ] = useState<boolean>(true);
    const [ enableNotification, SetEnableNotification ] = useState<boolean>(false);
    const [ tracked, setTracked ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(true);
    const [ expoPushToken, setExpoPushToken ] = useState('');
    const [ channels, setChannels ] = useState<Notifications.NotificationChannel[]>([]);
    const [ notification, setNotification ] = useState<Notifications.Notification | undefined>(undefined);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const getStatus = async () => {
        const category = await drizzleDb.select().from(schema.category);
        //@ts-expect-error type
        setItems(category);

        const userData  = await drizzleDb.select().from(schema.user)
        if(!uuid || !title) router.replace("/home");

        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`, {
                method: "GET"
            });
            const data = await response.json();
            const {added} = data;

            if(added){
                setTracked(true)
            }
            setLoading(false)
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
            // let token = "null"
            let url = `${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}`
            
            /*
                if(token!="null"){
                    const device = Platform.OS
                    Notifications.requestPermissionsAsync();
                    token = (await Notifications.getDevicePushTokenAsync()).data;
                    link = `${process.env.EXPO_PUBLIC_API}/track/${uuid}/${userData[0].uuid}/${token}/${device}`
                }
            */
            
            const response = await fetch(url, {
                method: "POST"
            });
            const data = await response.json();
            const {added} = data;
            
            if (added) {
                setTracked(true)
                const category_id = await drizzleDb.select().from(schema.category).where(eq(schema.category.value, value)).limit(1)
                
                const nowDate = Date.now()

                await drizzleDb.insert(schema.items).values({
                    uuid,
                    image,
                    title,
                    link,
                    source,
                    brand,
                    category_id: category_id[0].id,
                    created_at: nowDate,
                    updated_at: nowDate,
                });

                await drizzleDb.insert(schema.statistics).values({
                    item_uuid: uuid,
                    current: price,
                    average: price,
                    change: 0,
                    highest: price,
                    lowest: price,
                    created_at: nowDate,
                    updated_at: nowDate,
                });
            }   

            router.replace({
                pathname: "/item", 
                params:{
                    uuid,
                    image,
                    title,
                    link,
                    source,
                    brand,
                }
            })
        } catch (error) {
           console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStatus();    
    },[]); 

    return (
        <View
            style={styles.container}
        >
            <Text numberOfLines={3} style={styles.title}>{title}</Text>
            <Text numberOfLines={1}>{brand}</Text>
            <Text numberOfLines={1} style={styles.price}>R {price}</Text>
            <View style={styles.column}>
                <DropDownPicker
                    testID='select-category'
                    placeholder='Select a category'
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    //@ts-expect-error
                    setItems={setItems}
                />
            </View>

            <View>
                <Button
                    disabled={false}
                    testID='add-button'
                    loading={loading}
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
    label: {
        fontFamily: "meduim",
        fontSize: 18,
    },
    title: {
        fontFamily: "heavy",
        fontSize: 28,
    },
    graph: {
        height: 200,
    },
    column:{
        paddingVertical: 10,
    },
    row:{
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    price: {
        fontSize: 28,
        fontFamily: "bold",
        color: "#008FE7",
    }
});