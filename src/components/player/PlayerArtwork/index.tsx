import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

import { unKnownTrackImage } from "@/constants/images";
import { useTheme } from "@/hooks/use-theme";

import { createStyles } from "./index.styles";

interface PlayerArtworkProps {
  artworkUrl?: string | null;
}

export function PlayerArtwork({ artworkUrl }: PlayerArtworkProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.artworkImageContainer}>
      <Image
        source={{ uri: artworkUrl || unKnownTrackImage }}
        contentFit="cover"
        style={styles.artworkImage}
        transition={300}
      />
    </View>
  );
}
