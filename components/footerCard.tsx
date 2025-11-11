import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSearch } from '@/store/search';
import Button from './button';
import * as Haptics from "expo-haptics"
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/schema';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';

const FooterCard = () => {
    const router = useRouter();
    const bottom = useSharedValue(100);
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema});
    const { data } = useLiveQuery(drizzleDb.select().from(schema.items))
    console.log(data)

    return (
        <Animated.View style={[
                styles.container,
            ]}>
            <Button
                title={"View My List"}
                onPress={() => {
                    try {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        router.push("/list")
                    } catch (error){

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
        bottom: 50,
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