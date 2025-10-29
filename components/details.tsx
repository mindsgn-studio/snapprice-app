import { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
import * as Linking from 'expo-linking';

type Details = {
    id: string,
    price: string,
    title: string,
}

type ItemDetails = {
    html?: string,

}

export default function Details(
    {
        id,
        price,
        title = "",
    }: Details
) {
    const router = useRouter()
    const [ details, SetDetails ] = useState<ItemDetails | null>(null);
    const [ html, setHTML ] = useState<string>("");
    const [ url, setUrl ] = useState<string>("");

    const getDetails = async () => {
        if(!id) router.replace("/");

        try{
            const response = await fetch(`https://api.takealot.com/rest/v-1-14-0/product-details/PLID${id}?platform=desktop&offer_opt=true&display_credit=true`);
            const data = await response.json();
            const { description, sharing } = data;
            const { url } = sharing;
            const { html } = description
            setUrl(url);
            SetDetails({
                html,
            })
        } catch(error){
        } finally {
        }
    };

    const goTo = async () => {
        try{
            Linking.openURL(url);
        } catch (error) {
        } finally {
        }
    }

    const getData = async() => {
        try {
            const response = await fetch(`https://api.buck.cheap/Product/GetAllBySku?sku=${id}&storeId=9`);
            const items = await response.json();
            const item = items[0];

            setHTML(item.id)
        } catch(error){
        } finally {
        }
    }

    useEffect(() => {
        getDetails();
        getData();
    },[]);

    return (
        <View
            style={styles.container}
        >
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            
            <Button title='View On TakeAlot' onPress={() => goTo()}/>
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
        height: 300,
    },
    price: {
        fontSize: 28,
        fontWeight: "bold"
    }
});