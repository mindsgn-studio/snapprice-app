import {useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSearch } from '@/store/search';

export default function SearchInput() {
    const { setSearch, setItems, setPagination, setLoading, clearSearch, page, limit, setToast } = useSearch();
    const [ searchText, setsearchText ] = useState("");
    
    const search = async() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setLoading(true);

        if (searchText === ""){ 
            setLoading(false);
            setToast()
            return;
        }
        clearSearch()
        setSearch(searchText)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/search?search=${searchText}&page=${page}&limit=${limit}`);
            const data = await response.json();
            const { items, hasNext } = data;
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            if (items == null){
                clearSearch()
                return;
            } 
            setToast()
            setItems(items)
            setPagination({
                page, 
                hasNext
            })
        }catch (error){
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            clearSearch()
            setToast()
        }finally{
            setLoading(false);
        }
    };

    return (
        <View style={styles.view}>
            <TextInput
                testID={"search-input"}
                style={styles.textInput}
                placeholder='Search any item'
                onChangeText={(text) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    setsearchText(text)
                }}
            />
            <TouchableOpacity
                testID={"search-button"}
                style={styles.button}
                onPress={search}
            >
                <Text style={styles.text}>SEARCH</Text>
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
        paddingHorizontal: 2,
        marginBottom: 20,
        alignSelf: "center",
        height: 50,
        borderWidth: 2,
        borderColor: "blue"
        
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
        fontWeight: "bold",
        fontSize: 21
    },
    button:{
        backgroundColor: "blue",
        height: 40,
        width: 80,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }
});