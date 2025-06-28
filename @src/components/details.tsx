import { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

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

    const getDetails = async () => {
        if(!id) router.replace("/");

        try{
            const response = await fetch(`https://api.takealot.com/rest/v-1-14-0/product-details/PLID${id}?platform=desktop&offer_opt=true&display_credit=true`);
            const data = await response.json();
            const { description } = data;
            const { html } = description

            SetDetails({
                html
            })
        } catch(error){
        } finally {
        }
    };

    const getData = async() => {
        try {
            const response = await fetch(`https://www.servaltracker.com/products/PLID${id}/`);
            const data = await response.text();
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
            <Text numberOfLines={1} style={styles.price}>{price}</Text>
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
    price: {
        fontSize: 28,
        fontWeight: "bold"
    }
});