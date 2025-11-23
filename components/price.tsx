import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

interface PriceInterface {
    uuid: string
}


export default function Price(
    {
       uuid
    }: PriceInterface
) {
    const router = useRouter();   

    return(
        <View style={styles.row}> 
            <Text numberOfLines={1} style={styles.price}>R {0.00}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        paddingHorizontal: 20,
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