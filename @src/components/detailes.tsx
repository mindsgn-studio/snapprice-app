import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { width } from '../constants/dimensions';
import { useEffect } from 'react';

type Details = {
    
}

export default function Details(
    {}: Details
) {
    const getDetails = () => {
        try{
        } catch(error){
        } finally {
        }
    }

    return (
        <View
            style={styles.container}
        >
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 200,
        backgroundColor:"#FFF",
    }
});