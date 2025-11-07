import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { width } from '../constants/dimensions';

type Button = {
    title: string,
    onPress: () => void,
    outline?: boolean
    loading?: boolean
}

export default function Button(
    {
        title,
        onPress,
        outline = false,
        loading = false
    }: Button
) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.container, outline? styles.outline : null]}
        >
            {
                loading?
                <ActivityIndicator />
                :
                <Text  style={[styles.text, outline? styles.outlineText : null]}>{title}</Text>
            }
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 40,
        backgroundColor: "blue",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    outline: {
        backgroundColor: "none",
        borderColor: "blue",
        borderRadius: 5,
    },
    outlineText: {
        color: "blue"
    },
    text: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 28
    }
});