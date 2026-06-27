import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";

import { createStyles } from "./index.styles";

export function PlayerControls() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const skipToNext = usePlayerStore((state) => state.skipToNext);
  const skipToPrevious = usePlayerStore((state) => state.skipToPrevious);

  return (
    <View style={styles.controlsRow}>
      <TouchableOpacity style={styles.controlIcon} activeOpacity={0.7}>
        <Ionicons name="shuffle" size={24} color={theme.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={skipToPrevious}
        style={styles.controlIcon}
        activeOpacity={0.7}
      >
        <Ionicons
          name="play-skip-back-sharp"
          size={32}
          color={theme.iconControl}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={togglePlayPause}
        style={styles.playButton}
        activeOpacity={0.9}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={30}
          color={theme.background}
          style={{ marginLeft: isPlaying ? 0 : 4 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={skipToNext}
        style={styles.controlIcon}
        activeOpacity={0.7}
      >
        <Ionicons
          name="play-skip-forward-sharp"
          size={32}
          color={theme.iconControl}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlIcon} activeOpacity={0.7}>
        <Ionicons name="repeat" size={24} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
