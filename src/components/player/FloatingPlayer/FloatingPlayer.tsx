import MovingText from "@/components/common/MovingText";
import { unKnownTrackImage } from "@/constants/images";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./FloatingPlayer.styles";

interface FloatingPlayerProps {
  style?: StyleProp<ViewStyle>;
}

export default function FloatingPlayer({ style }: FloatingPlayerProps) {
  const router = useRouter();

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
      <Image
        source={{ uri: currentTrack.artwork || unKnownTrackImage }}
        style={styles.trackArtWorkImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.trackTitleContainer}>
        <MovingText style={styles.trackTitle} animationThreshold={100}>
          {currentTrack.title ?? ""}
        </MovingText>
      </View>
      <View style={styles.trackControlsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={skipToPrevious} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons name="play-back-sharp" size={22} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={togglePlayPause} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? "pause-sharp" : "play-sharp"}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={skipToNext} // استخدام الدالة المحدثة
          style={styles.controlButton}
        >
          <Ionicons name="play-forward-sharp" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
