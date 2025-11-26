import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSearch } from '@/store/search';

const Tag = () => {
    return (
        <Animated.View
            style={[
                styles.commonToastStyle,
                styles.topToastStyle,
                animatedStyle,
            ]}
        >
            <Text>{title}</Text>
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
        backgroundColor: '#FFCCCB',
    },
    topToastStyle: {
        backgroundColor: '#FFCCCB',
        top: 0,
    },
    bottomToastStyle: {
        backgroundColor: '#FFCCCB',
        bottom: 0,
    },
}); 


export default Toast;