import { screenPadding } from "@/constants/tokens";
import { useTheme } from "@/hooks/use-theme";
import { createStyles } from "@/styles/screens/player.styles";
// 1. استدعاء الـ Store الصحيح اللي بنيناه
import MovingText from "@/components/common/MovingText";
import { unKnownTrackImage } from "@/constants/images";
import { useExpandFloatingPlayer } from "@/hooks/useExpandFloatingPlayer";
import { useImageColors } from "@/hooks/useImageColors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PlayerVolumeBar from "@/components/PlayerVolumeBar";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useAudioPlayerStatus } from "expo-audio";

// Helper to mutate Reanimated SharedValue. Defined outside of the component scope
// to bypass React Compiler's strict mutation checks on hook-allocated values.
const updateSharedValue = (sv: SharedValue<number>, val: number) => {
  sv.value = val;
};

// دالة مساعدة سريعة لتحويل الثواني لصيغة دقائق:ثواني (مثال: 3:45)
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const useLiquidGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();

export default function PlayerScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const { pan, animatedStyle } = useExpandFloatingPlayer();
  const { top, bottom } = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const player = usePlayerStore((state) => state.player);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const skipToNext = usePlayerStore((state) => state.skipToNext);
  const skipToPrevious = usePlayerStore((state) => state.skipToPrevious);

  const { imageColors } = useImageColors(
    currentTrack?.artwork || unKnownTrackImage,
  );

  const status = useAudioPlayerStatus(player!);
  const currentTime = status?.currentTime || 0;
  const duration = status?.duration || 1;

  const seekTo = usePlayerStore((state) => state.seekTo);

  const [displayedTime, setDisplayedTime] = React.useState<number | null>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const isSliding = React.useRef(false);
  const startRelativeX = React.useRef(0);
  const startPageX = React.useRef(0);

  const trackProgress = useSharedValue(currentTime);

  // Sync track position during normal playback
  React.useEffect(() => {
    if (!isSliding.current) {
      updateSharedValue(trackProgress, currentTime);
    }
  }, [currentTime, trackProgress]);

  const updateValue = (relativeX: number, isComplete = false) => {
    if (containerWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, relativeX / containerWidth));
    const newValue = ratio * duration;

    updateSharedValue(trackProgress, newValue);
    setDisplayedTime(newValue);

    if (isComplete) {
      isSliding.current = false;
      setDisplayedTime(null);
      seekTo(newValue);
    }
  };

  const handleResponderGrant = (evt: GestureResponderEvent) => {
    isSliding.current = true;
    startRelativeX.current = evt.nativeEvent.locationX;
    startPageX.current = evt.nativeEvent.pageX;
    updateValue(startRelativeX.current);
  };

  const handleResponderMove = (evt: GestureResponderEvent) => {
    const dx = evt.nativeEvent.pageX - startPageX.current;
    const currentRelativeX = startRelativeX.current + dx;
    updateValue(currentRelativeX);
  };

  const handleResponderRelease = (evt: GestureResponderEvent) => {
    const dx = evt.nativeEvent.pageX - startPageX.current;
    const currentRelativeX = startRelativeX.current + dx;
    updateValue(currentRelativeX, true);
  };

  const animatedFillStyle = useAnimatedStyle(() => {
    const percent = duration > 0 ? (trackProgress.value / duration) * 100 : 0;
    return {
      width: `${percent}%`,
    };
  }, [duration]);

  const animatedHandleStyle = useAnimatedStyle(() => {
    const percent = duration > 0 ? (trackProgress.value / duration) * 100 : 0;
    return {
      left: `${percent}%`,
    };
  }, [duration]);

  if (!currentTrack) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
            <View style={styles.artworkImageContainer}>
              <Image
                source={{ uri: currentTrack.artwork || unKnownTrackImage }}
                contentFit="cover"
                style={styles.artworkImage}
                transition={300}
              />
            </View>

            {/* Metadata, Controls & Progress Glass Card */}
            <View style={styles.glassCard}>
              {useLiquidGlass ? (
                <GlassView
                  glassEffectStyle="clear"
                  colorScheme={scheme === 'dark' ? 'dark' : 'light'}
                  style={styles.cardGlassView}
                />
              ) : (
                <BlurView
                  intensity={60}
                  tint={scheme === 'dark' ? 'dark' : 'light'}
                  style={styles.cardBlurView}
                />
              )}

              <View style={styles.cardContent}>
                {/* Metadata Row */}
                <View style={styles.metaRow}>
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      style={styles.trackTitleText}
                      animationThreshold={30}
                    >
                      {currentTrack.title}
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
                  {currentTrack.artist || "Unknown Artist"}
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponder={() => true}
                    onResponderGrant={handleResponderGrant}
                    onResponderMove={handleResponderMove}
                    onResponderRelease={handleResponderRelease}
                    onLayout={(e) => {
                      setContainerWidth(e.nativeEvent.layout.width);
                    }}
                    style={{
                      height: 40,
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <View style={styles.progressBarBg} pointerEvents="none">
                      <Animated.View
                        style={[styles.progressBarFill, animatedFillStyle]}
                      />
                      <Animated.View
                        style={[styles.progressHandle, animatedHandleStyle]}
                      />
                    </View>
                  </View>
                  <View style={styles.timeRow}>
                    <Text style={styles.timeText}>
                      {formatTime(
                        displayedTime !== null ? displayedTime : currentTime,
                      )}
                    </Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                  </View>
                </View>

                {/* Playback Controls */}
                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="shuffle"
                      size={24}
                      color={theme.textSecondary}
                    />
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

                  <TouchableOpacity
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="repeat"
                      size={24}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

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
