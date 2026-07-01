import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
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

import { AmbientBackground } from "@/components/common/AmbientBackground";
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

  // Logo Pulse Anim
  const logoScale = useSharedValue(1);
  const logoOpacity = useSharedValue(0);

  // Entrance Text & Card Anim
  const textTranslateY = useSharedValue(40);
  const textOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(60);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // Logo Pulsing
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    logoOpacity.value = withTiming(1, { duration: 800 });

    // Entrance Fades
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
      {/* Reusable Premium Background */}
      <AmbientBackground showExtraBlob />

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
                Join millions of music lovers and curate your perfect
                soundtracks.
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
