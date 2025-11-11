import { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Button from './button';
import * as Haptics from "expo-haptics"
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';

const FooterCard = () => {
    const router = useRouter();
    const bottom = useSharedValue(50);
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema});
    const { data } = useLiveQuery(drizzleDb.select().from(schema.items));
    
    const handlePress = () => {
        if(data.length === 0){
            bottom.value = -100;
        }else{
            bottom.value = 20;
        }
    };

    useEffect(() => {
        handlePress()
    },[data])

    return (
        <Animated.View style={[
                styles.container,
                {
                    bottom
                }
            ]}>
            <Button
                testID='list-button'
                title={"View My List"}
                onPress={() => {
                    try {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        router.push("/list");
                    } catch (error){
                        console.log(error);
                    }
                }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("screen").width - 20,
        backgroundColor: "",
        position: "absolute",
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    text: {
        fontWeight: "bold",
        fontSize: 21
    }
});


export default FooterCard;