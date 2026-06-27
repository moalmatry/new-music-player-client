import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import TrackList from "@/components/common/TrackList";
import homeFeed from "@/data/home_feed.json";
import tracksData from "@/data/tracks.json";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/useAuthStore";
import { createStyles } from "@/styles/screens/library.styles";

export default function LibraryScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);

  // Background Blob Shared Values
  const blob1X = useSharedValue(-50);
  const blob1Y = useSharedValue(400);
  const blob2X = useSharedValue(200);
  const blob2Y = useSharedValue(150);

  useEffect(() => {
    // Floating animations for background glows
    blob1X.value = withRepeat(
      withSequence(
        withTiming(150, { duration: 13000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 13000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(200, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
        withTiming(400, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    blob2X.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(200, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(400, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(150, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
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

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/welcome");
  };

  const [activeFilter, setActiveFilter] = useState<
    "playlists" | "songs" | "artists"
  >("playlists");
  const playlists = homeFeed.madeForYou;

  const renderPlaylistRow = ({ item }: { item: (typeof playlists)[0] }) => (
    <TouchableOpacity style={styles.playlistRow} activeOpacity={0.7}>
      <Image source={{ uri: item.artwork }} style={styles.playlistArt} />
      <View style={styles.playlistText}>
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Text style={styles.playlistSub}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={styles.header}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: homeFeed.user.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.headerTitle}>Your Library</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={26} color={theme.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.addButton}>
              <Ionicons name="log-out-outline" size={26} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setActiveFilter("playlists")}
            style={
              activeFilter === "playlists"
                ? styles.filterChipActive
                : styles.filterChip
            }
          >
            <Text
              style={
                activeFilter === "playlists"
                  ? styles.filterChipTextActive
                  : styles.filterChipText
              }
            >
              Playlists
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter("songs")}
            style={
              activeFilter === "songs"
                ? styles.filterChipActive
                : styles.filterChip
            }
          >
            <Text
              style={
                activeFilter === "songs"
                  ? styles.filterChipTextActive
                  : styles.filterChipText
              }
            >
              Songs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter("artists")}
            style={
              activeFilter === "artists"
                ? styles.filterChipActive
                : styles.filterChip
            }
          >
            <Text
              style={
                activeFilter === "artists"
                  ? styles.filterChipTextActive
                  : styles.filterChipText
              }
            >
              Artists
            </Text>
          </TouchableOpacity>
        </View>

        {activeFilter === "playlists" && (
          <FlatList
            data={playlists}
            renderItem={renderPlaylistRow}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {activeFilter === "songs" && <TrackList list={tracksData} />}

        {activeFilter === "artists" && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No artists followed yet.</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
