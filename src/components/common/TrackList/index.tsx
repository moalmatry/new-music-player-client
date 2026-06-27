import { screenPadding } from "@/constants/tokens";
import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";
import { defaultStyles, utilsStyles } from "@/styles";
import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "../TrackListItem";
import { createStyles } from "./index.styles";

type TrackListProps = Partial<FlatListProps<Track>> & {
  list: Track[];
};

export default function TrackList({ list, ...props }: TrackListProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const loadPlaylist = usePlayerStore((state) => state.loadPlaylist);

  const ItemDivider = () => (
    <View style={[styles.separator, { marginVertical: 9, marginLeft: 64 }]} />
  );

  const handleTrackSelect = (track: Track) => {
    loadPlaylist(list, list.indexOf(track));
  };

  return (
    <FlatList
      data={list}
      style={[defaultStyles.container, { backgroundColor: theme.background }]}
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
