import React, { useEffect, useState } from 'react';
import { StyleProp, TextStyle, View, StyleSheet, Text } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface MovingTextProps {
  children: string;
  animationThreshold?: number;
  style?: StyleProp<TextStyle>;
}

const MovingText = ({ children, style }: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  const shouldAnimate = textWidth > containerWidth && containerWidth > 0;

  useEffect(() => {
    if (!shouldAnimate) {
      translateX.value = 0;
      return;
    }

    const scrollDistance = textWidth - containerWidth + 24; // 24px extra padding at the end

    // Reset position before starting
    translateX.value = 0;

    translateX.value = withDelay(
      1000, // Wait 1 second before starting the scroll
      withRepeat(
        withTiming(-scrollDistance, {
          duration: Math.max(3000, scrollDistance * 30), // Constant speed (30ms per pixel)
          easing: Easing.linear,
        }),
        -1, // Infinite loops
        true // Reverse (scroll back and forth)
      )
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [shouldAnimate, textWidth, containerWidth, children, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Hidden text component to measure the true unconstrained text width */}
      <Text
        style={[style, { position: 'absolute', opacity: 0, left: -9999 }]}
        numberOfLines={1}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
      >
        {children}
      </Text>

      {/* Visible animated text component */}
      <Animated.Text
        style={[
          style,
          animatedStyle,
          { alignSelf: 'flex-start' },
          shouldAnimate && { width: textWidth + 50 } // Allows layout space for scrolling
        ]}
        numberOfLines={1}
      >
        {children}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
});

export default MovingText;
