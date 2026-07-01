import { BlurView } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlayerArtwork } from "@/components/player/PlayerArtwork";
import { PlayerControls } from "@/components/player/PlayerControls";
import { PlayerMetadata } from "@/components/player/PlayerMetadata";
import { PlayerProgressBar } from "@/components/player/PlayerProgressBar";
import PlayerVolumeBar from "@/components/player/PlayerVolumeBar";
import { unKnownTrackImage } from "@/constants/images";
import { screenPadding } from "@/constants/tokens";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { useExpandFloatingPlayer } from "@/hooks/useExpandFloatingPlayer";
import { useImageColors } from "@/hooks/useImageColors";
import { getOfflineTracks } from "@/services/database";
import { usePlayerStore } from "@/store/usePlayerStore";
import { createStyles } from "@/styles/screens/player.styles";

const useLiquidGlass = Platform.OS === "ios" && isGlassEffectAPIAvailable();

export default function PlayerScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const { pan, animatedStyle } = useExpandFloatingPlayer();
  const { top, bottom } = useSafeAreaInsets();

  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (!currentTrack) return;
    const checkOffline = () => {
      const offlineTracks = getOfflineTracks();
      setIsDownloaded(offlineTracks.some((t) => t.id === currentTrack.id));
    };
    checkOffline();
    const interval = setInterval(checkOffline, 1000);
    return () => clearInterval(interval);
  }, [currentTrack]);

  const { imageColors } = useImageColors(
    currentTrack?.artwork || unKnownTrackImage,
  );

  if (!currentTrack) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.overlayContainer, animatedStyle]}>
        <LinearGradient
          style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }}
          colors={[imageColors.background, theme.background]}
        >
          {/* Top Dismiss Indicator Pill */}
          <View style={[styles.dismissIndicatorContainer, { top: top + 8 }]}>
            <View style={styles.dismissIndicator} />
          </View>

          <View style={{ flex: 1, marginTop: top + 60, marginBottom: bottom }}>
            {/* Album Artwork */}
            <PlayerArtwork artworkUrl={currentTrack.artwork} />

            {/* Metadata, Controls & Progress Glass Card */}
            <View style={styles.glassCard}>
              {useLiquidGlass ? (
                <GlassView
                  glassEffectStyle="clear"
                  colorScheme={scheme === "dark" ? "dark" : "light"}
                  style={styles.cardGlassView}
                />
              ) : (
                <BlurView
                  intensity={60}
                  tint={scheme === "dark" ? "dark" : "light"}
                  style={styles.cardBlurView}
                />
              )}

              <View style={styles.cardContent}>
                {/* Metadata */}
                <PlayerMetadata
                  track={currentTrack}
                  isDownloaded={isDownloaded}
                />

                {/* Progress Bar */}
                <PlayerProgressBar />

                {/* Playback Controls */}
                <PlayerControls />

                {/* Volume Bar */}
                <View style={styles.volumeContainer}>
                  <PlayerVolumeBar />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}
