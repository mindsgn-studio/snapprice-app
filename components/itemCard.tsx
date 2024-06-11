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
        id,
    }: ItemCard
) {
    const {} = useUser()

    return (
        <View style={styles.view}>
            <Image
                style={styles.image}
                source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }} />
            <View>
                <Text>{title}</Text>
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
