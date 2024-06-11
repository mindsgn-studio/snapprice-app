import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useUser } from '@/context';

export default function SearchInput() {
    const {} = useUser()

    return (
        <View style={styles.view}>
            <TextInput style={styles.textInput}
                placeholder='Search any item'/>        
            <Button title={"Search"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: "90%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        padding: 2,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
    },
    button:{
        backgroundColor: ""
    }   
});
