import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/PlayerContext';
import { unKnownTrackImage } from '@/constants/images';

interface FloatingPlayerProps {
  style?: StyleProp<ViewStyle>;
}

export default function FloatingPlayer({ style }: FloatingPlayerProps) {
  const router = useRouter();
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayer();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push('/player')}
      style={[styles.container, style]}
    >
      <Image
        source={{ uri: currentTrack.artwork || unKnownTrackImage }}
        style={styles.trackArtWorkImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.trackTitleContainer}>
        <Text numberOfLines={1} style={styles.trackTitle}>
          {currentTrack.title}
        </Text>
      </View>
      <View style={styles.trackControlsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={togglePlay}
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? 'pause-sharp' : 'play-sharp'}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={playNext}
          style={styles.controlButton}
        >
          <Ionicons name="play-forward-sharp" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 8,
    borderRadius: 50,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  trackArtWorkImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#121212',
  },
  trackTitleContainer: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  trackTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
  controlButton: {
    padding: 4,
  },
});
