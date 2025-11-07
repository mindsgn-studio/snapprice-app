import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
import { Graph } from '@/components/graph';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';

type Details = {
    uuid: string,
    price: string,
    title: string,
    source: string,
    link: string
};

export default function Details(
    {
        uuid,
        price,
        title = "",
        source,
        link
    }: Details
) {
    const router = useRouter()
    const [ prices, setPrice ] = useState<number | null>(null);
    const [ priceData, setPriceData ] = useState<any>({
        highest: 0,
        lowest: 0
    });
    const [ priceHistoryList,setPriceHistoryListList ] = useState<number []>([]);
    const [ url, setUrl ] = useState<string>("");
    const [ added, setAdd ] = useState(true);
    const [ loadding, setLoading ] = useState(true);

    const priceHistory = useMemo(() => {
        return priceHistoryList;
    }, [priceHistoryList]);

    const getDetails = async () => {
        if(!uuid) router.replace("/");
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/item/${uuid}`);
            const data = await response.json();
            const{ highest, lowest } = data
            setPriceData({
                highest,
                lowest
            })
            const list: number [] = []
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        } catch(error){
            
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    };

    const trackProduct = async() => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/track/${uuid}`, {
                method: "POST"
            });
            const data = await response.json();
        }   
        catch (error) {
           
        }
    }
    
    useEffect(() => {
        getDetails();
    },[]); 

    return (
        <View
            style={styles.container}
        >
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
           
            <View style={styles.row}>
                <View>
                    <Text numberOfLines={1} style={styles.price}>R {price}</Text>
                </View>
                <View>
                    <Text>Lowest: R {priceData.lowest}</Text>
                    <Text>Highest: R {priceData.highest}</Text>
                </View>
            </View>
            <Graph 
                prices={[]}
                canvasHeight={200}
                canvasWidth={100}
            />
            <View>
                {
                    /*
                    <Button title={'Track Product'} onPress={trackProduct} />
                    */
                }
                <Button title={`View On ${source}`} onPress={async() => {
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