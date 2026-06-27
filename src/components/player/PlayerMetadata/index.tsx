import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import MovingText from "@/components/common/MovingText";
import { useTheme } from "@/hooks/use-theme";

import { createStyles } from "./index.styles";

interface PlayerMetadataProps {
  title: string;
  artist?: string | null;
}

export function PlayerMetadata({ title, artist }: PlayerMetadataProps) {
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
            {title}
          </MovingText>
        </View>
        <FontAwesome
          onPress={toggleFavorite}
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? theme.primary : theme.icon}
        />
      </View>
      <Text numberOfLines={1} style={styles.trackArtistText}>
        {artist || "Unknown Artist"}
      </Text>
    </View>
  );
}
