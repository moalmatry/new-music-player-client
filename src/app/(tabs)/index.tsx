import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { usePlayer, Track } from '@/context/PlayerContext';
import homeFeed from '@/data/home_feed.json';

const { width } = Dimensions.get('window');
const RECENT_CARD_WIDTH = (width - 32 - 8) / 2; // 2 columns with gaps

export default function HomeScreen() {
  const { playTrack } = usePlayer();

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handlePlayRecentlyPlayed = (item: typeof homeFeed.recentlyPlayed[0]) => {
    // Map recently played object to Track context model
    const trackToPlay: Track = {
      id: item.id,
      title: item.title,
      artist: item.artist,
      artwork: item.artwork,
      url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${item.id}.mp3`, // Mock track URL matching ID
    };
    playTrack(trackToPlay);
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
            <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.madeForCard}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  scrollContent: {
    paddingBottom: 140, // Ensure content isn't hidden under FloatingPlayer
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  greeting: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3E3E3E',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  recentCard: {
    width: RECENT_CARD_WIDTH,
    height: 56,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  recentArt: {
    width: 56,
    height: 56,
    backgroundColor: '#1E1E1E',
  },
  recentTextContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  recentTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  madeForCard: {
    width: 145,
    marginRight: 16,
  },
  madeForArt: {
    width: 145,
    height: 145,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
    marginBottom: 8,
  },
  madeForTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  madeForDescription: {
    color: '#B3B3B3',
    fontSize: 11,
    lineHeight: 14,
  },
});
