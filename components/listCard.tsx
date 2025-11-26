import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useEffect, useState } from 'react';

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
    const router = useRouter()
    const [price, setPrice] = useState<number>(0)
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });
    const { data } = useLiveQuery(drizzleDb.select().from(schema.statistics).where(eq(schema.statistics.item_uuid, uuid)).limit(1))
    
     useEffect(() => {
        if(data && data.length!=0){
            //@ts-expect-error type
            setPrice(data[0].current)
        }
    },[data])

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
                            link,
                            brand
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
                        fontFamily: "bold",
                        marginTop: Platform.OS == "ios" ? 0: -20 
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>{brand}
                </Text>
                <Text  
                    style={{
                        marginTop: Platform.OS == "ios" ? 0: -20,
                        width: 200,
                        fontSize: 36,
                        color: "#008FE7",
                        fontFamily: "heavy"
                    }}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}>R {price}
                </Text>
             </View>
        </TouchableOpacity>
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