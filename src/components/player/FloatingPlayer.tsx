import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/store/usePlayerStore';
import { unKnownTrackImage } from '@/constants/images';
import { styles } from './FloatingPlayer.styles';

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
