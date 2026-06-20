import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import homeFeed from '@/data/home_feed.json';
import tracksData from '@/data/tracks.json';
import { colors } from '@/constants/tokens';
import TrackList from '@/components/TrackList';

export default function LibraryScreen() {
  const [activeFilter, setActiveFilter] = useState<'playlists' | 'songs' | 'artists'>('playlists');
  const playlists = homeFeed.madeForYou;

  const renderPlaylistRow = ({ item }: { item: typeof playlists[0] }) => (
    <TouchableOpacity style={styles.playlistRow} activeOpacity={0.7}>
      <Image source={{ uri: item.artwork }} style={styles.playlistArt} />
      <View style={styles.playlistText}>
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Text style={styles.playlistSub}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <Image source={{ uri: homeFeed.user.avatar }} style={styles.avatar} />
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setActiveFilter('playlists')}
          style={activeFilter === 'playlists' ? styles.filterChipActive : styles.filterChip}
        >
          <Text style={activeFilter === 'playlists' ? styles.filterChipTextActive : styles.filterChipText}>
            Playlists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter('songs')}
          style={activeFilter === 'songs' ? styles.filterChipActive : styles.filterChip}
        >
          <Text style={activeFilter === 'songs' ? styles.filterChipTextActive : styles.filterChipText}>
            Songs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter('artists')}
          style={activeFilter === 'artists' ? styles.filterChipActive : styles.filterChip}
        >
          <Text style={activeFilter === 'artists' ? styles.filterChipTextActive : styles.filterChipText}>
            Artists
          </Text>
        </TouchableOpacity>
      </View>

      {activeFilter === 'playlists' && (
        <FlatList
          data={playlists}
          renderItem={renderPlaylistRow}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeFilter === 'songs' && (
        <TrackList list={tracksData} />
      )}

      {activeFilter === 'artists' && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No artists followed yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  addButton: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipTextActive: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  filterChip: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 13,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  playlistArt: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: '#1C1C1E',
  },
  playlistText: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  playlistTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  playlistSub: {
    color: '#B3B3B3',
    fontSize: 13,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
  },
});
