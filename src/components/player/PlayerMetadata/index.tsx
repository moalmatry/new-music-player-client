import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import MovingText from "@/components/common/MovingText";
import DownloadButton from "@/components/ui/DownloadButton";
import { useTheme } from "@/hooks/use-theme";

import { createStyles } from "./index.styles";

interface PlayerMetadataProps {
  track: Track;
  isDownloaded: boolean;
}

export function PlayerMetadata({ track, isDownloaded }: PlayerMetadataProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View>
      <View style={styles.metaRow}>
        <View style={styles.trackTitleContainer}>
          <MovingText style={styles.trackTitleText} animationThreshold={30}>
            {track.title}
          </MovingText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <DownloadButton track={track} isDownloaded={isDownloaded} />
          <FontAwesome
            onPress={toggleFavorite}
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? theme.primary : theme.icon}
          />
        </View>
      </View>
      <Text numberOfLines={1} style={styles.trackArtistText}>
        {track.artist || "Unknown Artist"}
      </Text>
    </View>
  );
}
