import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";

interface AmbientBackgroundProps {
  showExtraBlob?: boolean;
}

export function AmbientBackground({ showExtraBlob = false }: AmbientBackgroundProps) {
  const theme = useTheme();
  const scheme = useColorScheme();

  // Floating Shared Values
  const blob1X = useSharedValue(-50);
  const blob1Y = useSharedValue(100);
  const blob1Scale = useSharedValue(1);

  const blob2X = useSharedValue(200);
  const blob2Y = useSharedValue(300);
  const blob2Scale = useSharedValue(1);

  const blob3X = useSharedValue(50);
  const blob3Y = useSharedValue(600);

  useEffect(() => {
    // Blob 1 Animation
    blob1X.value = withRepeat(
      withSequence(
        withTiming(150, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(250, { duration: 14000, easing: Easing.inOut(Easing.ease) }),
        withTiming(100, { duration: 14000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob1Scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    // Blob 2 Animation
    blob2X.value = withRepeat(
      withSequence(
        withTiming(40, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(200, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(550, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
        withTiming(300, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.2, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    // Optional Blob 3 Animation
    if (showExtraBlob) {
      blob3X.value = withRepeat(
        withSequence(
          withTiming(200, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
          withTiming(50, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      );
      blob3Y.value = withRepeat(
        withSequence(
          withTiming(450, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
          withTiming(600, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExtraBlob]);

  // Animated Styles
  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob1X.value },
      { translateY: blob1Y.value },
      { scale: blob1Scale.value },
    ],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob2X.value },
      { translateY: blob2Y.value },
      { scale: blob2Scale.value },
    ],
  }));

  const animatedBlob3 = useAnimatedStyle(() => ({
    transform: [{ translateX: blob3X.value }, { translateY: blob3Y.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Background Linear Gradient */}
      <LinearGradient
        colors={scheme === "dark" ? ["#0A0216", "#05000A"] : ["#F0F2FF", "#F4F5FF"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Animated Blob Auras */}
      <Animated.View
        style={[
          styles.blob,
          {
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: theme.primary,
            opacity: 0.1,
          },
          animatedBlob1,
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          {
            width: 260,
            height: 260,
            borderRadius: 130,
            backgroundColor: "#ff007f",
            opacity: 0.08,
          },
          animatedBlob2,
        ]}
      />

      {showExtraBlob && (
        <Animated.View
          style={[
            styles.blob,
            {
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#00f0ff",
              opacity: 0.08,
            },
            animatedBlob3,
          ]}
        />
      )}

      {/* Screen blur layer to blend blobs */}
      <BlurView
        intensity={scheme === "dark" ? 75 : 55}
        tint={scheme === "dark" ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
  },
});
