import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { useDownloadTrack } from "@/hooks/useDownloadTrack";

interface DownloadButtonProps {
  track: Track;
  isDownloaded: boolean;
}

export default function DownloadButton({
  track,
  isDownloaded,
}: DownloadButtonProps) {
  const theme = useTheme();
  const { downloadTrack, isDownloading } = useDownloadTrack();

  if (isDownloaded) {
    return (
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={theme.primary}
        style={styles.icon}
      />
    );
  }

  if (isDownloading) {
    return (
      <ActivityIndicator
        size="small"
        color={theme.primary}
        style={styles.loader}
      />
    );
  }

  return (
    <Pressable
      onPress={() => downloadTrack(track)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
    >
      <Ionicons name="download-outline" size={24} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 4,
  },
  loader: {
    margin: 8,
  },
  button: {
    padding: 4,
  },
});
