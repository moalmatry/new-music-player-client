import { useAudioPlayerStatus } from "expo-audio";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";

import { createStyles } from "./index.styles";

// Helper to mutate Reanimated SharedValue. Defined outside of the component scope
// to bypass React Compiler's strict mutation checks on hook-allocated values.
const updateSharedValue = (sv: SharedValue<number>, val: number) => {
  sv.value = val;
};

// Helper function to format seconds to mm:ss format
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export function PlayerProgressBar() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const player = usePlayerStore((state) => state.player);
  const status = useAudioPlayerStatus(player!);
  const currentTime = status?.currentTime || 0;
  const duration = status?.duration || 1;
  const seekTo = usePlayerStore((state) => state.seekTo);

  const [displayedTime, setDisplayedTime] = React.useState<number | null>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const isSliding = React.useRef(false);
  const startRelativeX = React.useRef(0);
  const startPageX = React.useRef(0);

  const trackProgress = useSharedValue(currentTime);

  // Sync track position during normal playback
  React.useEffect(() => {
    if (!isSliding.current) {
      updateSharedValue(trackProgress, currentTime);
    }
  }, [currentTime, trackProgress]);

  const updateValue = (relativeX: number, isComplete = false) => {
    if (containerWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, relativeX / containerWidth));
    const newValue = ratio * duration;

    updateSharedValue(trackProgress, newValue);
    setDisplayedTime(newValue);

    if (isComplete) {
      isSliding.current = false;
      setDisplayedTime(null);
      seekTo(newValue);
    }
  };

  const handleResponderGrant = (evt: GestureResponderEvent) => {
    isSliding.current = true;
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

  const animatedFillStyle = useAnimatedStyle(() => {
    const percent = duration > 0 ? (trackProgress.value / duration) * 100 : 0;
    return {
      width: `${percent}%`,
    };
  }, [duration]);

  const animatedHandleStyle = useAnimatedStyle(() => {
    const percent = duration > 0 ? (trackProgress.value / duration) * 100 : 0;
    return {
      left: `${percent}%`,
    };
  }, [duration]);

  return (
    <View style={styles.progressContainer}>
      <View
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleResponderGrant}
        onResponderMove={handleResponderMove}
        onResponderRelease={handleResponderRelease}
        onLayout={(e) => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}
        style={{
          height: 40,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View style={styles.progressBarBg} pointerEvents="none">
          <Animated.View style={[styles.progressBarFill, animatedFillStyle]} />
          <Animated.View style={[styles.progressHandle, animatedHandleStyle]} />
        </View>
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>
          {formatTime(displayedTime !== null ? displayedTime : currentTime)}
        </Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
