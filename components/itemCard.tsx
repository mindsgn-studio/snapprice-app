import { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import { useUser } from '@/context';

type ItemCard = {
    title: string,
    image: string,
    price: number,
    id: string,
}

export default function ItemCard(
    {
        title,
        image,
        price,
    }: ItemCard
) {
    return (
        <View style={styles.view}>
            <Image
                style={styles.image}
                source={{
                uri: `${image}`,
            }} />
            <View>
                <Text  
                    style={{
                        width: 150
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{title}</Text>
                <Text>{price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginTop: 10,
        minWidth: "90%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row"
    },
    image: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    }
});
