import React, { useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle, GestureResponderEvent } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CustomProgressBarProps {
  progress: SharedValue<number>;
  minValue: SharedValue<number>;
  maxValue: SharedValue<number>;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onSlidingStart?: () => void;
  onValueChange?: (currentValue: number) => void;
  onSlidingComplete?: (finalValue: number) => void;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  minValue,
  maxValue,
  minimumTrackTintColor = "#ffffff",
  maximumTrackTintColor = "#cccccc",
  containerStyle,
  onSlidingStart,
  onValueChange,
  onSlidingComplete,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const startRelativeX = useRef(0);
  const startPageX = useRef(0);

  const updateValue = (relativeX: number, isComplete = false) => {
    if (containerWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, relativeX / containerWidth));
    const newValue = ratio * (maxValue.value - minValue.value) + minValue.value;

    if (onValueChange) onValueChange(newValue);
    if (isComplete && onSlidingComplete) onSlidingComplete(newValue);
  };

  const handleResponderGrant = (evt: GestureResponderEvent) => {
    if (onSlidingStart) onSlidingStart();
    startRelativeX.current = evt.nativeEvent.locationX;
    startPageX.current = evt.nativeEvent.pageX;
    updateValue(startRelativeX.current);
  };

  const handleResponderMove = (evt: GestureResponderEvent) => {
    const dx = evt.nativeEvent.pageX - startPageX.current;
    const currentRelativeX = startRelativeX.current + dx;
    updateValue(currentRelativeX);
  };

  const handleResponderRelease = (evt: GestureResponderEvent) => {
    const dx = evt.nativeEvent.pageX - startPageX.current;
    const currentRelativeX = startRelativeX.current + dx;
    updateValue(currentRelativeX, true);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const widthPercent = interpolate(
      progress.value,
      [minValue.value, maxValue.value],
      [0, 100],
      Extrapolation.CLAMP,
    );

    return {
      width: `${widthPercent}%`,
    };
  });

  return (
    <View
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={handleResponderGrant}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderRelease}
      onLayout={(e) => {
        setContainerWidth(e.nativeEvent.layout.width);
      }}
      style={[
        {
          justifyContent: "center",
          width: "100%",
        },
        containerStyle,
        { height: 40 },
      ]}
    >
      <View
        style={[styles.container, { backgroundColor: maximumTrackTintColor }]}
      >
        <Animated.View
          style={[
            styles.filler,
            animatedStyle,
            { backgroundColor: minimumTrackTintColor },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  filler: {
    height: "100%",
    borderRadius: 10,
  },
});

export default CustomProgressBar;
