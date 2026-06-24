import homeFeed from "@/data/home_feed.json";
import tracksData from "@/data/tracks.json";
import { usePlayerStore } from "@/store/usePlayerStore";
import { styles } from "@/styles/screens/index.styles";
import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // 2. استدعاء دالة التشغيل من Zustand (بدل usePlayer القديمة)
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

    // 3. تمرير الأغنية لـ Zustand عشان يشغلها في الخلفية
    playTrack(matchedTrack);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Image
            source={{ uri: homeFeed.user.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
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
  );
}
