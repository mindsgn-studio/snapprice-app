import {useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSearch } from '@/store/search';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from "@/schema";
import { useChannel } from 'ably/react';
import { useAbly } from "ably/react";
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export default function SearchInput() {
    const router = useRouter();
    const client = useAbly();
    const clientId = client.auth.clientId;
    
    const { publish } = useChannel("items", (data) => {
    });

    useChannel(`private:${clientId}`, (response) => {
        const { data } = response;
        router.navigate({
            pathname: "/add",
            params: { 
                uuid: data.uuid,
                title: data.title,
                image: data.image,
                price: data.current_price,
                source: data.source_name,
                link: data.link,
                brand: data.brand
            }
        })
        setLoading(false)
    });

    const { setSearch, search:SearchText, loading, setItems, setPagination, setLoading, clearSearch, page, limit, setToast } = useSearch();
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, {schema});
        
    const search = async() => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setLoading(true);

        if (SearchText === ""){ 
            const text = await Clipboard.getStringAsync();
            setSearch(text)
            setLoading(false);
            return;
        }
        
        try {
            new URL(SearchText);
            searchLink(SearchText)
        } catch (e) {
            setLoading(false);
        }      
    };


    const searchLink = async(link: string) => {
        setLoading(true)

        publish("items", link).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    return (
        <View style={styles.view}>
            <TextInput
                testID={"search-input"}
                style={styles.textInput}
                value={SearchText}
                placeholder='Paste link'
                onChangeText={(text) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    setSearch(text)
                }}
            />
            <TouchableOpacity
                testID={"search-button"}
                style={styles.button}
                onPress={search}
            >
                {
                    loading?
                        <ActivityIndicator />
                    :
                        <Text style={styles.text}>{SearchText==""? "PASTE LINK": "SEARCH LINK"}</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: "90%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 20,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#008FE7"
        
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
        fontWeight: "bold",
        fontSize: 21
    },
    button:{
        backgroundColor: "#008FE7",
        height: 40,
        width: 100,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontFamily: "bold"
    }
});