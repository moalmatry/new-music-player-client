import { colors, screenPadding } from "@/constants/tokens";
import { usePlayer } from "@/store/usePlayerStore";
import { useImageColors } from "@/hooks/useImageColors";
import { utilsStyles } from "@/styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useExpandFloatingPlayer } from "@/hooks/useExpandFloatingPlayer";
import { unKnownTrackImage } from "@/constants/images";
import { styles } from "@/styles/screens/player.styles";

export default function PlayerScreen() {
  const { pan, animatedStyle } = useExpandFloatingPlayer();
  const { currentTrack, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayer();
  const { top, bottom } = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { imageColors } = useImageColors(currentTrack?.artwork || unKnownTrackImage);

  if (!currentTrack) return null;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.overlayContainer, animatedStyle]}>
        <LinearGradient
          style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }}
          colors={[imageColors.background, '#000000']}
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

            {/* Metadata, Controls & Progress */}
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: "auto" }}>
                <View style={{ height: 60 }}>
                  <View style={styles.metaRow}>
                    <View style={styles.trackTitleContainer}>
                      <Text numberOfLines={1} style={styles.trackTitleText}>
                        {currentTrack.title}
                      </Text>
                    </View>
                    <FontAwesome
                      onPress={toggleFavorite}
                      name={isFavorite ? "heart" : "heart-o"}
                      size={24}
                      color={isFavorite ? colors.primary : colors.icon}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.trackArtistText}>
                    {currentTrack.artist || 'Unknown Artist'}
                  </Text>
                </View>

                {/* Progress Bar Slider Placeholder */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: "38%" }]} />
                    <View style={[styles.progressHandle, { left: "38%" }]} />
                  </View>
                  <View style={styles.timeRow}>
                    <Text style={styles.timeText}>1:24</Text>
                    <Text style={styles.timeText}>3:40</Text>
                  </View>
                </View>

                {/* Playback Controls */}
                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="shuffle" size={24} color="#B3B3B3" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={playPrevious}
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="play-skip-back-sharp"
                      size={32}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={togglePlay}
                    style={styles.playButton}
                    activeOpacity={0.9}
                  >
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={30}
                      color="#000"
                      style={{ marginLeft: isPlaying ? 0 : 4 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={playNext}
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="play-skip-forward-sharp"
                      size={32}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="repeat" size={24} color="#B3B3B3" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Volume Bar Placeholder */}
              <View style={styles.volumeContainer}>
                <Ionicons
                  name="volume-mute"
                  size={20}
                  color={colors.textMuted}
                />
                <View style={styles.volumeBarBg}>
                  <View style={[styles.volumeBarFill, { width: "70%" }]} />
                </View>
                <Ionicons
                  name="volume-high"
                  size={20}
                  color={colors.textMuted}
                />
              </View>

              <View style={[utilsStyles.centeredRow, { paddingBottom: "5%" }]}>
                <Ionicons
                  name="repeat-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}


