import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

type ItemCard = {
    title: string,
    image?: string,
    price?: number,
    id?: string,
}

export default function ItemCard(
    {
        title,
        image,
        price,
    }: ItemCard
) {
    console.log(title)

    return (
        <TouchableOpacity style={styles.view}>
            {
                /*
                <Image
                style={styles.image}
                source={{
                uri: `${image}`,
            }} />
                */
            }
            
            <View>
                <Text  
                    style={{
                        width: 150,
                        color: "black"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{title}</Text>
                    {
                        /*
                         <Text style={styles.textPrice}>{price}</Text>
                        */
                    }
               
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
        flexDirection: "row"
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