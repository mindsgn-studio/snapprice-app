import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

type ListCard = {
    uuid: string,
    image: string,
    title: string,
    link: string,
    source: string,
    brand: string
}

export default function ListCard(
    {
        uuid,
        image,
        title,
        link,
        source,
        brand
    } : ListCard
) { 
    const router = useRouter();

    return (
        <TouchableOpacity 
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push(
                    {
                        pathname: '/item',
                        params: {
                            uuid, 
                            title,
                            image,
                            source,
                            link
                        }
                    }
                )
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
                        fontSize: 36,
                        color: "black",
                        fontFamily: "heavy"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{title}
                </Text>
                <Text  
                    style={{
                        width: 200,
                        fontSize: 18,
                        color: "#747474",
                        fontFamily: "bold"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{brand}
                </Text>
                <Text  
                    style={{
                        width: 200,
                        fontSize: 36,
                        color: "#008FE7",
                        fontFamily: "heavy"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>R 0.00
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