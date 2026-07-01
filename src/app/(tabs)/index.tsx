import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmbientBackground } from "@/components/common/AmbientBackground";
import homeFeed from "@/data/home_feed.json";
import tracksData from "@/data/tracks.json";
import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";
import { createStyles } from "@/styles/screens/index.styles";

export default function HomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const playTrack = usePlayerStore((state) => state.playTrack);

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
      {/* Reusable Premium Background */}
      <AmbientBackground />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
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
                <Image
                  source={{ uri: item.artwork }}
                  style={styles.recentArt}
                />
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
                <Image
                  source={{ uri: item.artwork }}
                  style={styles.madeForArt}
                />
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
