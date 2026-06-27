import homeFeed from "@/data/home_feed.json";
import tracksData from "@/data/tracks.json";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TrackList from "@/components/common/TrackList/TrackList";
import { useTheme } from "@/hooks/use-theme";
import { createStyles } from "@/styles/screens/library.styles";

export default function LibraryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [activeFilter, setActiveFilter] = useState<
    "playlists" | "songs" | "artists"
  >("playlists");
  const playlists = homeFeed.madeForYou;

  const renderPlaylistRow = ({ item }: { item: (typeof playlists)[0] }) => (
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
          <Ionicons name="add" size={26} color={theme.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setActiveFilter("playlists")}
          style={
            activeFilter === "playlists"
              ? styles.filterChipActive
              : styles.filterChip
          }
        >
          <Text
            style={
              activeFilter === "playlists"
                ? styles.filterChipTextActive
                : styles.filterChipText
            }
          >
            Playlists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter("songs")}
          style={
            activeFilter === "songs"
              ? styles.filterChipActive
              : styles.filterChip
          }
        >
          <Text
            style={
              activeFilter === "songs"
                ? styles.filterChipTextActive
                : styles.filterChipText
            }
          >
            Songs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter("artists")}
          style={
            activeFilter === "artists"
              ? styles.filterChipActive
              : styles.filterChip
          }
        >
          <Text
            style={
              activeFilter === "artists"
                ? styles.filterChipTextActive
                : styles.filterChipText
            }
          >
            Artists
          </Text>
        </TouchableOpacity>
      </View>

      {activeFilter === "playlists" && (
        <FlatList
          data={playlists}
          renderItem={renderPlaylistRow}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeFilter === "songs" && <TrackList list={tracksData} />}

      {activeFilter === "artists" && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No artists followed yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
