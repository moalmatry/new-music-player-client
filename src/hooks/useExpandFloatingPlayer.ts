import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const useExpandFloatingPlayer = () => {
  const router = useRouter();
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 150 || event.velocityY > 1000) {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, () => {
          scheduleOnRN(router.back);
        });
      } else {
        translateY.value = withSpring(0, { damping: 40 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return {
    pan: panGesture,
    animatedStyle,
  };
};
