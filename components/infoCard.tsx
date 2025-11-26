import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

interface inforCard {
    title: string,
    value: number,
    color?: string,
    backgroundColor?: string
}


export default function InfoCard(
    {
        title,
        value,
        color = "#4285F4",
        backgroundColor = "#E8F0FD"
    }: inforCard
) {
    return(
        <View style={
            [
                styles.container, 
                {
                    backgroundColor,
                }
            ]}>
            <Text style={[
                {
                    fontFamily: "heavy",
                    color,
                    fontSize: 21
                }
            ]}>R {value}</Text>
            <Text style={[
                {
                    fontFamily:"meduim",
                    color,
                    fontSize: 12
                }
            ]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        margin: 5,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
});