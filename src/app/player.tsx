import { colors, screenPadding } from "@/constants/tokens";
// 1. استدعاء الـ Store الصحيح اللي بنيناه
import MovingText from "@/components/common/MovingText";
import { unKnownTrackImage } from "@/constants/images";
import { useExpandFloatingPlayer } from "@/hooks/useExpandFloatingPlayer";
import { useImageColors } from "@/hooks/useImageColors";
import { utilsStyles } from "@/styles";
import { styles } from "@/styles/screens/player.styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useAudioPlayerStatus } from "expo-audio";

// دالة مساعدة سريعة لتحويل الثواني لصيغة دقائق:ثواني (مثال: 3:45)
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function PlayerScreen() {
  const { pan, animatedStyle } = useExpandFloatingPlayer();
  const { top, bottom } = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // 3. استدعاء الحالة والدوال بأسماء الـ Zustand الفعالة
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const player = usePlayerStore((state) => state.player); // استدعاء نسخة المشغل
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const skipToNext = usePlayerStore((state) => state.skipToNext);
  const skipToPrevious = usePlayerStore((state) => state.skipToPrevious);

  const { imageColors } = useImageColors(
    currentTrack?.artwork || unKnownTrackImage,
  );

  // 4. قراءة تقدم الأغنية الحقيقي
  const status = useAudioPlayerStatus(player!);
  const currentTime = status?.currentTime || 0;
  // نتأكد إن المدة مش صفر عشان نتجنب قسمة على صفر
  const duration = status?.duration || 1;
  // حساب النسبة المئوية لشريط التقدم (من 0 لـ 100)
  const progressPercent = Math.min((currentTime / duration) * 100, 100);

  if (!currentTrack) return null;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.overlayContainer, animatedStyle]}>
        <LinearGradient
          style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }}
          colors={[imageColors.background, "#000000"]}
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
                      color={isFavorite ? colors.primary : colors.icon}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.trackArtistText}>
                    {currentTrack.artist || "Unknown Artist"}
                  </Text>
                </View>

                {/* 5. شريط التقدم الديناميكي (Dynamic Progress Bar) */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progressPercent}%` },
                      ]}
                    />
                    <View
                      style={[
                        styles.progressHandle,
                        { left: `${progressPercent}%` },
                      ]}
                    />
                  </View>
                  <View style={styles.timeRow}>
                    <Text style={styles.timeText}>
                      {formatTime(currentTime)}
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
                    <Ionicons name="shuffle" size={24} color="#B3B3B3" />
                  </TouchableOpacity>

                  {/* زرار الأغنية السابقة */}
                  <TouchableOpacity
                    onPress={skipToPrevious}
                    style={styles.controlIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="play-skip-back-sharp"
                      size={32}
                      color="#FFF"
                    />
                  </TouchableOpacity>

                  {/* زرار التشغيل والإيقاف */}
                  <TouchableOpacity
                    onPress={togglePlayPause}
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

                  {/* زرار الأغنية التالية */}
                  <TouchableOpacity
                    onPress={skipToNext}
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
