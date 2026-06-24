import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import { usePlayer, Track } from '@/store/usePlayerStore';
import { colors } from '@/constants/tokens';
import { MiniPlayerEqualizer } from '@/components/player/MiniPlayerEqualizer/MiniPlayerEqualizer';
import { unKnownTrackImage } from '@/constants/images';
import { styles } from './TrackListItem.styles';

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
