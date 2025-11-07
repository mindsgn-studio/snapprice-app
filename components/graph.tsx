import { type FC, memo } from 'react';

import {
  Canvas,
  CornerPathEffect,
  DashPathEffect,
  Line,
  Path,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, View, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type GraphProps = {
  prices: number[];
  canvasWidth: number;
  canvasHeight: number;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  lineScore?: number;
  maxValue?: number;
};

const Palette = {
  baseGray05: '#E5E2DC',
  baseGray80: '#30302E',
  primary: '#8A40FF',
  background: '#F1EEE8',
};

const Graph: FC<GraphProps> = memo(
  ({
    prices,
    canvasHeight: height,
    canvasWidth: width,
    style,
    padding = 0,
    lineScore = -10,
    maxValue = 100,
  }) => {
    const canvasWidth = width - padding * 2;

    const refactoredMax = maxValue + 10;

    const dashedLineScore = lineScore;

    const lineY = (1 - dashedLineScore / refactoredMax) * height;

    const rRawScores = useDerivedValue(() => {
      return withSpring(prices);
    }, [prices]);

    const rScores = useDerivedValue(() => {
      return rRawScores.value.map(prices => prices / refactoredMax);
    }, []);

    const rGraphPath = useDerivedValue(() => {
      const distance = canvasWidth / (rScores.value.length - 1);

      const path = Skia.Path.Make();

      path.moveTo(padding, (1 - rScores.value[0]) * height);
      for (let i = 0; i < rScores.value.length; i++) {
        const score = rScores.value[i];

        path.lineTo(padding + distance * i, height * (1 - score));
      }
      return path;
    }, [padding, rScores, prices]);

    if(prices.length===0){
      return(
         <View style={[
          styles.container, 
          {
            height
          }]}>
          <Text>Not enough Data</Text>
        </View>
      )
    }

    return (
      <Canvas
        style={[
          {
            width: width,
            height: height,
          },
          style,
        ]}>
        <Line
          p1={vec(0, lineY)}
          p2={vec(width, lineY)}
          color={'rgba(0,0,0,0.1)'}
          style="stroke"
          strokeWidth={2}>
          <DashPathEffect intervals={[4, 4]} />
        </Line>
        <Path
          path={rGraphPath}
          color={Palette.primary}
          strokeWidth={3}
          style={'stroke'}
          strokeCap={'round'}>
          <CornerPathEffect r={20} />
        </Path>
      </Canvas>
    );
  },
);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems:"center",
    justifyContent: "center",
    backgroundColor: "#BCBCBC",
    width: "100%",
    height:"100%"
  }
})

export { Graph };