import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import homeFeed from "@/data/home_feed.json";
import tracksData from "@/data/tracks.json";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";
import { createStyles } from "@/styles/screens/index.styles";

export default function HomeScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const playTrack = usePlayerStore((state) => state.playTrack);

  // Background Blob Shared Values
  const blob1X = useSharedValue(-30);
  const blob1Y = useSharedValue(100);
  const blob2X = useSharedValue(200);
  const blob2Y = useSharedValue(400);

  useEffect(() => {
    // Floating animations for background glows
    blob1X.value = withRepeat(
      withSequence(
        withTiming(120, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-30, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
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

    blob2X.value = withRepeat(
      withSequence(
        withTiming(40, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(200, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(600, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
        withTiming(400, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [{ translateX: blob1X.value }, { translateY: blob1Y.value }],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [{ translateX: blob2X.value }, { translateY: blob2Y.value }],
  }));

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const handlePlayRecentlyPlayed = (
    item: (typeof homeFeed.recentlyPlayed)[0],
  ) => {
    const matchedTrack =
      (tracksData as Track[]).find(
        (t) => t.title.toLowerCase() === item.title.toLowerCase(),
      ) || (tracksData as Track[])[0];

    playTrack(matchedTrack);
  };

  return (
    <View style={styles.container}>
      {/* Background Gradients & Aura Blobs */}
      <LinearGradient
        colors={scheme === "dark" ? ["#0A0216", "#05000A"] : ["#F0F2FF", "#F4F5FF"]}
        style={styles.backgroundGradient}
      />

      <Animated.View style={[styles.blob1, animatedBlob1]} />
      <Animated.View style={[styles.blob2, animatedBlob2]} />

      <BlurView
        intensity={scheme === "dark" ? 70 : 50}
        tint={scheme === "dark" ? "dark" : "light"}
        style={styles.blurView}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.subGreeting}>Welcome back to Aura.</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: homeFeed.user.avatar }}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>
          </View>

          {/* Recently Played Grid */}
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <View style={styles.gridContainer}>
            {homeFeed.recentlyPlayed.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => handlePlayRecentlyPlayed(item)}
                style={styles.recentCard}
              >
                <Image source={{ uri: item.artwork }} style={styles.recentArt} />
                <View style={styles.recentTextContainer}>
                  <Text numberOfLines={2} style={styles.recentTitle}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Made For You Carousel */}
          <Text style={styles.sectionTitle}>Made For You</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {homeFeed.madeForYou.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={styles.madeForCard}
              >
                <Image source={{ uri: item.artwork }} style={styles.madeForArt} />
                <Text numberOfLines={1} style={styles.madeForTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} style={styles.madeForDescription}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
