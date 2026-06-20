import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedBarProps {
  isPlaying: boolean;
  duration: number;
  maxHeight: number;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({ isPlaying, duration, maxHeight }) => {
  const height = useSharedValue<number>(4);

  useEffect(() => {
    if (isPlaying) {
      height.value = withRepeat(
        withSequence(
          withTiming(maxHeight, {
            duration: duration,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(4, {
            duration: duration,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      );
    } else {
      height.value = withTiming(4, { duration: 300 });
    }
  }, [isPlaying, duration, maxHeight, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return <Animated.View style={[styles.bar, animatedStyle]} />;
};

interface MiniPlayerEqualizerProps {
  isPlaying: boolean;
}

export const MiniPlayerEqualizer: React.FC<MiniPlayerEqualizerProps> = ({ isPlaying }) => {
  return (
    <View style={styles.container}>
      <AnimatedBar isPlaying={isPlaying} duration={350} maxHeight={16} />
      <AnimatedBar isPlaying={isPlaying} duration={450} maxHeight={24} />
      <AnimatedBar isPlaying={isPlaying} duration={300} maxHeight={18} />
      <AnimatedBar isPlaying={isPlaying} duration={500} maxHeight={22} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    gap: 3,
    position: 'absolute',
    left: 13,
    bottom: 13,
  },
  bar: {
    width: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});
