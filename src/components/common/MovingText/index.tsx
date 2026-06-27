import { useEffect } from "react";
import { StyleProp, TextStyle } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export interface MovingTextProps {
  children: string;
  animationThreshold: number;
  style?: StyleProp<TextStyle>;
}

const MovingText = ({
  children,
  animationThreshold,
  style,
}: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = children.length > animationThreshold;
  const textWidth = children.length * 8; // Estimate character width at ~16px font size

  useEffect(() => {
    if (!shouldAnimate) {
      translateX.value = 0;
      return;
    }

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 15000,
          easing: Easing.linear,
        }),
        -1, // Infinite loop
        true, // Reverse (scroll back and forth)
      ),
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [shouldAnimate, textWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.Text
      style={[
        style,
        animatedStyle,
        shouldAnimate && { width: 9999, paddingLeft: 16 },
      ]}
      numberOfLines={1}
    >
      {children}
    </Animated.Text>
  );
};

export default MovingText;
