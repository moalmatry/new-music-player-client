import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import MovingText from "@/components/common/MovingText";
import { unKnownTrackImage } from "@/constants/images";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { usePlayerStore } from "@/store/usePlayerStore";

import { createStyles } from "./index.styles";

interface FloatingPlayerProps {
  style?: StyleProp<ViewStyle>;
}

const useLiquidGlass = Platform.OS === "ios" && isGlassEffectAPIAvailable();

export default function FloatingPlayer({ style }: FloatingPlayerProps) {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = createStyles(theme);

  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const skipToNext = usePlayerStore((state) => state.skipToNext);
  const skipToPrevious = usePlayerStore((state) => state.skipToPrevious);

  if (!currentTrack) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/player")}
      style={[styles.container, style]}
    >
      {useLiquidGlass ? (
        <GlassView
          glassEffectStyle="clear"
          colorScheme={scheme === "dark" ? "dark" : "light"}
          style={styles.glassView}
        />
      ) : (
        <BlurView
          intensity={80}
          tint={scheme === "dark" ? "dark" : "light"}
          style={styles.blurView}
        />
      )}
      <Image
        source={{ uri: currentTrack.artwork || unKnownTrackImage }}
        style={styles.trackArtWorkImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.trackTitleContainer}>
        <MovingText style={styles.trackTitle} animationThreshold={15}>
          {currentTrack.title ?? ""}
        </MovingText>
      </View>
      <View style={styles.trackControlsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={skipToPrevious} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons
            name="play-back-sharp"
            size={22}
            color={theme.iconControl}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={togglePlayPause} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? "pause-sharp" : "play-sharp"}
            size={24}
            color={theme.iconControl}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={skipToNext} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons
            name="play-forward-sharp"
            size={22}
            color={theme.iconControl}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
