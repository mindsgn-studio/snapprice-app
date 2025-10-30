import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

interface Price {
  ItemID: string,
  Price: number,
  Date: Date
}

type ItemCard = {
    id: string,
    title: string,
    price: any,
    images: [string]
}

export default function ItemCard(
    {
        id,
        title,
        images,
        price
    }: ItemCard
) {
    const router = useRouter();

    return (    
        <TouchableOpacity 
            onPress={() => {
                router.push({
                    pathname: '/item',
                    params: { 
                        id, 
                        title,
                        price: price.Price,
                        image: images[0] 
                     }
                })
            }}
            style={styles.view}>
            <Image
                style={styles.image}
                source={{
                    uri: `${images[0]}`,
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
                    ellipsizeMode={"tail"}>{title}</Text>     
                <Text style={styles.textPrice}>R{price.Price}</Text>
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
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
    textPrice:{
        fontSize:20,
        fontWeight:'bold'
    }
});