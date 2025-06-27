import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';

type Details = {
    id: string
}

export default function Details(
    {
        id
    }: Details
) {
    const [  ] = useState<null>(null);

    const getDetails = async () => {
        try{
            const response = await fetch(`https://api.takealot.com/rest/v-1-14-0/product-details/PLID${id}?platform=desktop&offer_opt=true&display_credit=true`);
            const data = await response.json();
            const {} = data;
        } catch(error){
        } finally {
        }
    };

    useEffect(() => {
        getDetails()
    },[]);

    return (
        <View
            style={styles.container}
        >

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor:"#FFF",
    }
});