import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/useAuthStore";
import { createStyles } from "@/styles/screens/welcome.styles";

export default function WelcomeScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const signIn = useAuthStore((state) => state.signIn);

  // Reanimated Shared Values for Floating Aura Blobs
  const blob1X = useSharedValue(-50);
  const blob1Y = useSharedValue(-50);
  const blob1Scale = useSharedValue(1);

  const blob2X = useSharedValue(250);
  const blob2Y = useSharedValue(300);
  const blob2Scale = useSharedValue(1.1);

  const blob3X = useSharedValue(50);
  const blob3Y = useSharedValue(600);

  // Logo Pulse Anim
  const logoScale = useSharedValue(1);
  const logoOpacity = useSharedValue(0);

  // Entrance Text & Card Anim
  const textTranslateY = useSharedValue(40);
  const textOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(60);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Floating animations for Aurora blobs
    blob1X.value = withRepeat(
      withSequence(
        withTiming(150, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
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

    blob2X.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(250, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(550, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(300, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
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

    blob3X.value = withRepeat(
      withSequence(
        withTiming(200, { duration: 8500, easing: Easing.inOut(Easing.ease) }),
        withTiming(50, { duration: 8500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob3Y.value = withRepeat(
      withSequence(
        withTiming(450, { duration: 9500, easing: Easing.inOut(Easing.ease) }),
        withTiming(600, { duration: 9500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    // 2. Logo Pulsing
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    logoOpacity.value = withTiming(1, { duration: 800 });

    // 3. Entrance Fades
    textTranslateY.value = withDelay(
      300,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
    );
    textOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));

    cardTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }),
    );
    cardOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedText = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
    opacity: cardOpacity.value,
  }));

  const handleGuestEntry = () => {
    signIn("guest@aura.music");
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Background Gradients */}
      <LinearGradient
        colors={scheme === "dark" ? ["#0D0221", "#05000A"] : ["#E8EAFF", "#F4F5FF"]}
        style={styles.backgroundGradient}
      />

      {/* Floating Animated Blob Auras */}
      <Animated.View style={[styles.blob1, animatedBlob1]} />
      <Animated.View style={[styles.blob2, animatedBlob2]} />
      <Animated.View style={[styles.blob3, animatedBlob3]} />

      {/* Screen blur layer to blend blobs */}
      <BlurView
        intensity={scheme === "dark" ? 80 : 60}
        tint={scheme === "dark" ? "dark" : "light"}
        style={styles.blurView}
      />

      {/* Interactive content layer */}
      <View
        style={[
          styles.contentContainer,
          { paddingTop: top, paddingBottom: bottom + 10 },
        ]}
      >
        {/* Animated Headphone Logo */}
        <View style={styles.logoSection}>
          <Animated.View style={[styles.logoCircle, animatedLogo]}>
            <Image
              source={require("@/assets/images/app-logo.png")}
              style={{ width: "90%", height: "90%", borderRadius: 50 }}
              contentFit="cover"
            />
          </Animated.View>
          <Animated.View style={animatedText}>
            <Text style={styles.logoText}>Aura Music</Text>
            <Text style={styles.logoTagline}>
              Escape into sound. Anytime. Anywhere.
            </Text>
          </Animated.View>
        </View>

        {/* Action card */}
        <Animated.View style={[styles.bottomSection, animatedCard]}>
          <View style={styles.glassCard}>
            <BlurView
              intensity={20}
              tint={scheme === "dark" ? "dark" : "light"}
              style={styles.cardBlur}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Feel The Rhythm</Text>
              <Text style={styles.cardSubtitle}>
                Join millions of music lovers and curate your perfect soundtracks.
              </Text>

              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => router.push("/signup")}
                  style={({ pressed }) => [
                    styles.btnPrimary,
                    { opacity: pressed ? 0.9 : 1 },
                  ]}
                >
                  <Text style={styles.btnPrimaryText}>Create Account</Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push("/signin")}
                  style={({ pressed }) => [
                    styles.btnSecondary,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={styles.btnSecondaryText}>Sign In</Text>
                </Pressable>
              </View>

              <Pressable onPress={handleGuestEntry} style={styles.guestButton}>
                <Text style={styles.guestText}>Continue as Guest</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
