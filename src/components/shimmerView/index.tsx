import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../utils/colorUtils';

const SHIMMER_WIDTH = 200;
const SHIMMER_HEIGHT = 20;

export const ShimmerView: React.FC<{
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: any;
}> = ({
  width: shimmerWidth = SHIMMER_WIDTH,
  height: shimmerHeight = SHIMMER_HEIGHT,
  borderRadius = 8,
  style,
}) => {
  const translateX = useSharedValue(-shimmerWidth);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(shimmerWidth * 2, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [shimmerWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          width: shimmerWidth,
          height: shimmerHeight,
          borderRadius,
        },
        style,
      ]}
    >
      <View style={styles.inner} />
      <Animated.View
        style={[
          styles.shimmer,
          {
            width: shimmerWidth / 2,
            height: shimmerHeight,
            borderRadius,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.BORDER_GRAY,
    position: 'relative',
  },
  inner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.BORDER_GRAY,
  },
  shimmer: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 0.8,
  },
});

export default ShimmerView;
