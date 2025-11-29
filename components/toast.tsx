import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useToast } from '@/store/toast';

const Toast = () => {
    const { show, title, message } = useToast()
    const positionY = useSharedValue(100);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(positionY.value) }],
        };
    });

    if (show) {
        positionY.value = 60;
    }

    if (!show) {
        positionY.value = -100;
    }

    return (
        <Animated.View
            style={[
                styles.commonToastStyle,
                animatedStyle,
            ]}
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    commonToastStyle: {
        height: 72,
        borderRadius: 8,
        margin: 8,
        padding: 16,
        elevation: 4,
        top: 0,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: '#FAE6E5',
    },
    title:{
        fontFamily: "bold",
        fontSize: 28,
        color: "#D93025",
    },
    message:{
        fontFamily: "meduim",
        fontSize: 16,
        color: "#D93025"
    }
}); 


export default Toast;