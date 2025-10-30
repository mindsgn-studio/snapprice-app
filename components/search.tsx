import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useSearch } from '@/store/search';

export default function SearchInput() {
    const { setSearch, loading, setLoading, clearSearch } = useSearch();
    const [ searchText, setsearchText ] = useState("");

    const search = async() => {
        setLoading(true)

        if (searchText === ""){
            setLoading(false)
            return
        }
        
        clearSearch()
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API}/search?search=${searchText}&page=1&limit=10`);
            const data = await response.json();
            const { items } = data
            setSearch(items)
        }catch (error){
            console.log(error)
            clearSearch()
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        search()
    },[]);

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                placeholder='Search any item'
                onChangeText={(text) => {setsearchText(text)}}
            />
            <TouchableOpacity
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
        marginBottom: 20,
        alignSelf: "center",
        height: 50,
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
    },
    button:{
        backgroundColor: "blue",
        height: 40,
        width: 80,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }
});