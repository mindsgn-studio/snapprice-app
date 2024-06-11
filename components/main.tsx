import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useUser } from '@/context';
import ItemCard from './itemCard';

export default function Main() {
    const { data } = useUser()

    return (
        <View style={styles.view}>
            {data.map((item: any)=> {
                return <ItemCard
                    key={item.id} 
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image} />
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
