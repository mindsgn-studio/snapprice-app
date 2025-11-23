import { StyleSheet,  Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { width } from '../constants/dimensions';

type Button = {
    title: string,
    onPress: () => void,
    outline?: boolean,
    loading?: boolean,
    type?: "normal",
    testID: string
}

export default function Button(
    {
        title,
        onPress,
        outline = false,
        loading = false,
        type = "normal",
        testID="button"
    }: Button
) {
    return (
        <TouchableOpacity 
            testID={testID}
            onPress={onPress}
            style={[
                styles.container, 
                outline? styles.outline : null,
            ]}
        >
            {
                loading?
                <ActivityIndicator />
                :
                <Text style={[styles.text, outline? styles.outlineText : null]}>{title}</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 40,
        backgroundColor: "#008FE7",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    outline: {
        backgroundColor: "none",
        borderColor: "#FF5050",
        borderRadius: 5,
    },
    outlineText: {
        color: "#FF5050"
    },
    text: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 28
    }
});