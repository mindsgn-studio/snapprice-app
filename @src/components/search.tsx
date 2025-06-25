import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function SearchInput() {
    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                placeholder='Search any item'
            /> 
            <Button title={"Search"} onPress={() => {}}/>
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
        marginTop: 80,
        alignSelf: "center"
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10,
    },
    button:{
        backgroundColor: ""
    }   
});