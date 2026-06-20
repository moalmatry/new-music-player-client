import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/PlayerContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FloatingPlayer() {
  const router = useRouter();
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayer();
  const insets = useSafeAreaInsets();

  if (!currentTrack) return null;

  // Position the player dynamically above the tab bar (approx 49dp) + safe area bottom inset
  const bottomOffset = 49 + insets.bottom + 8;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push('/player')}
      style={[styles.container, { bottom: bottomOffset }]}
    >
      <Image
        source={{ uri: currentTrack.artwork }}
        style={styles.artwork}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {currentTrack.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {currentTrack.artist}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={togglePlay} 
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? 'pause-sharp' : 'play-sharp'}
            size={22}
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
    position: 'absolute',
    left: 8,
    right: 8,
    height: 56,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3E3E3E',
  },
  artwork: {
    width: 38,
    height: 38,
    borderRadius: 4,
    backgroundColor: '#121212',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 12,
    marginTop: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 4,
  },
});
