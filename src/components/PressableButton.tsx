import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type PressableButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
  scaleValue?: number;
};

const duration = 80;

const PressableButton: React.FC<PressableButtonProps> = ({
  children,
  onPress,
  style,
  disabled,
  scaleValue = 0.95,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        if (!disabled) {
          scale.value = withTiming(scaleValue, { duration });
        }
      }}
      onPressOut={() => {
        if (!disabled) {
          scale.value = withTiming(1, { duration });
        }
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

export default PressableButton;
