import React from 'react';
import { StyleSheet, FlatList, FlatListProps, Text, View } from 'react-native';
import { usePlayer, Track } from '@/store/usePlayerStore';
import { defaultStyles, utilsStyles } from '@/styles';
import { screenPadding } from '@/constants/tokens';
import TrackListItem from './TrackListItem';

const ItemDivider = () => (
  <View style={[styles.separator, { marginVertical: 9, marginLeft: 64 }]} />
);

type TrackListProps = Partial<FlatListProps<Track>> & {
  list: Track[];
};

export default function TrackList({ list, ...props }: TrackListProps) {
  const { playTrack } = usePlayer();

  const handleTrackSelect = (track: Track) => {
    playTrack(track);
  };

  return (
    <FlatList
      data={list}
      style={defaultStyles.container}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
        </View>
      }
      contentContainerStyle={[
        {
          paddingTop: 10,
          paddingHorizontal: screenPadding.horizontal,
          paddingBottom: 160, // Account for floating players and tab bars
        },
        props.contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: track }) => (
        <TrackListItem onTrackSelect={handleTrackSelect} track={track} />
      )}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
