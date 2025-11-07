import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

interface Price {
  item_id: string,
  price: number,
  date: Date
}

type ItemCard = {
    uuid: string,
    image: string,
    title: string,
    source: string
    prices: [Price]
    link: string
}

export default function ItemCard(
    {
        uuid,
        image,
        title,
        source,
        prices,
        link
    }: ItemCard
) {
    const router = useRouter();

    return (
        <TouchableOpacity 
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push({
                    pathname: '/item',
                    params: { 
                        uuid, 
                        title,
                        image,
                        price: prices[0].price,
                        source,
                        link
                    }
                })
            }}
            style={styles.view}>
            <Image
                style={styles.image}
                source={{
                    uri: `${image}`,
                }}
            />
             <View>
                <Text  
                    style={{
                        width: 200,
                        fontSize: 25,
                        color: "black"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{title}
                </Text>
                <Text style={styles.textPrice}>
                    R{prices[0].price}
                </Text>
             </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginTop: 10,
        minWidth: "90%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 20,
    },
    image: {
        width: 70,
        height: 70,
        marginHorizontal: 10,
    },
    textPrice:{
        fontSize:20,
        fontWeight:'bold'
    }
});