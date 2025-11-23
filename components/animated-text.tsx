import {useWindowDimensions} from 'react-native';
import React from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Canvas, SkFont, Text} from '@shopify/react-native-skia';

type Props = {
  selectedValue: SharedValue<number>;
  font: SkFont | null;
};

const AnimatedText = ({selectedValue, font}: Props) => {
    const {width} = useWindowDimensions();
    const MARGIN_VERTICAL = 5;

    const animatedText = useDerivedValue(() => {
        return `R ${Math.round(selectedValue.value)}`;
    });

    const fontSize = font ? font.measureText('0') : { width: 0, height: 0 };

    const textX = useDerivedValue(() => {
        if (!font) return 0;
        const measured = font.measureText(animatedText.value);
        return width / 2 - measured.width / 2;
    });

    if (!font) {
        return null;
    }

    return (
        <Canvas style={{height: fontSize.height + MARGIN_VERTICAL}}>
            <Text
                text={animatedText}
                font={font}
                color={'black'}
                x={20}
                y={fontSize.height + MARGIN_VERTICAL / 2}
            />
        </Canvas>
  );
};

export default AnimatedText;
