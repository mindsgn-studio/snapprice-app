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
import { eq } from 'drizzle-orm';
import { useToast } from '@/store/toast';

export default function SearchInput() {
    const {setToast} = useToast()
    const router = useRouter();
    const client = useAbly();
    const clientId = client.auth.clientId;
    
    const { publish } = useChannel("items", (data) => {});

    useChannel(`private:${clientId}`, (response: any) => {
        const { data } = response;
        const { status, detail } = data;

        if (status !== "ok" || !detail) {
            console.log(response);
            setToast({
                title: "Error fetching item",
                message: "Unable to retrieve item details. Please try again."
            });
            setLoading(false);
            return;
        }

        router.navigate({
            pathname: "/add",
            params: { 
                uuid: detail.uuid,
                title: detail.title,
                image: detail.image,
                price: detail.current_price,
                source: detail.source_name,
                link: detail.link,
                brand: detail.brand
            }
        });

        setLoading(false);
    });

    const { setSearch, search:SearchText, loading, setLoading } = useSearch();
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, {schema});
    
        
    const search = async() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setLoading(true);

        if (SearchText === ""){ 
            try {
                const text = await Clipboard.getStringAsync();
                if (text == null) throw Error();
                
                setSearch(text);
                setLoading(false);

            } catch(error) {
                console.log(error)
                setToast({
                    title: "No Link Found",
                    message: "Clipboard does not contain a valid link."
                });
            } finally {
                setLoading(false);
                return;
            }
        }
        
        try {
            const parsed = new URL(SearchText);

            if (!parsed.hostname.includes("takealot.com")) {
                throw new Error("not takealot link");
            }

            if (/PLID\d+/i.test(parsed.pathname) == false) {
                throw new Error("not takealot link");
            }

            searchLink(SearchText);

        } catch (e) {
            setToast({
                title: "Invalid Link",
                message: "Please paste a valid Takealot product link."
            });
            setLoading(false);
        }
    };

    const searchLink = async(link: string) => {
        setLoading(true);

        const items = await drizzleDb.select().from(schema.items).where(eq(schema.items.link, link));
        
        if (items.length != 0) {
            const item = items[0];
            router.push({
                pathname: "/item",
                params: { ...item }
            });
            setLoading(false);
            return;
        }

        try {
            publish("items", link).catch(error => {
                console.log(error);
                setToast({
                    title: "Network Error",
                    message: "Unable to send request. Please try again."
                });
                setLoading(false);
            });

        } catch(error) {
            console.log(error);
            setToast({
                title: "Unexpected Error",
                message: "Something went wrong while searching. Please try again."
            });
            setLoading(false);
        }
    };

    return (
        <View style={styles.view}>
            <TextInput
                testID={"search-input"}
                style={styles.textInput}
                value={SearchText}
                placeholder='Paste link'
                onChangeText={(text) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSearch(text);
                }}
            />
            <TouchableOpacity
                testID={"search-button"}
                style={styles.button}
                onPress={search}
            >
                {
                    loading ?
                        <ActivityIndicator /> :
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
        fontFamily: "heavy"
    }
});
