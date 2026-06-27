import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { styles } from './index.styles';

export default function AnimatedSplashScreen() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  
  // Animation state values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // 1. Smoothly fade in the app logo and scale it to normal size
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    
    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });

    // 2. Wait, then scale up the logo dramatically (zoom-out transition) and fade out the splash container
    containerOpacity.value = withDelay(
      1200,
      withTiming(0, { duration: 1400, easing: Easing.out(Easing.ease) }, (finished) => {
        if (finished) {
          runOnJS(setIsAnimationFinished)(true);
        }
      })
    );

    scale.value = withDelay(
      1200,
      withTiming(1.8, { duration: 1400, easing: Easing.out(Easing.ease) })
    );
  }, [containerOpacity, opacity, scale]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  if (isAnimationFinished) return null;

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Animated.View style={animatedLogoStyle}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </Animated.View>
  );
}
