import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { width } from '../constants/dimensions';

type Button = {
    title: string,
    onPress: () => void
}

export default function Button(
    {
        title,
        onPress
    }: Button
) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}
        >
            <Text  style={styles.text}>{title}</Text>
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
    },
    text: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 28
    }
});