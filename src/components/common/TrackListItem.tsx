import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import { usePlayer, Track } from '@/store/usePlayerStore';
import { colors, fontsSize } from '@/constants/tokens';
import { defaultStyles } from '@/styles';
import { MiniPlayerEqualizer } from '../player/MiniPlayerEqualizer';
import { unKnownTrackImage } from '@/constants/images';

interface TrackListItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

export default function TrackListItem({ track, onTrackSelect }: TrackListItemProps) {
  const { currentTrack, isPlaying } = usePlayer();
  const isActiveTrack = currentTrack?.id === track.id;

  return (
    <TouchableOpacity onPress={() => onTrackSelect(track)} activeOpacity={0.7}>
      <View style={styles.trackItemContainer}>
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: track.artwork || unKnownTrackImage }}
            style={[styles.trackWorkImage, { opacity: isActiveTrack ? 0.6 : 1 }]}
            contentFit="cover"
            transition={200}
          />
          {isActiveTrack && <MiniPlayerEqualizer isPlaying={isPlaying} />}
        </View>

        <View style={styles.trackDetailsContainer}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.trackTitleText,
                { color: isActiveTrack ? colors.primary : colors.text },
              ]}
              numberOfLines={1}
            >
              {track.title}
            </Text>
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {track.artist || 'Unknown Artist'}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
            <Entypo name="dots-three-horizontal" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingVertical: 4,
  },
  artworkContainer: {
    position: 'relative',
    width: 50,
    height: 50,
  },
  trackWorkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
    backgroundColor: '#1C1C1E',
  },
  trackDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontsSize.sm,
    fontWeight: '600',
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
});
