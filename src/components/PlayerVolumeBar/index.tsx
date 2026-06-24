import { colors } from "@/constants/tokens";
import { usePlayerStore } from "@/store/usePlayerStore";
import { utilsStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import CustomProgressBar from "../CustomProgressBar";

export interface PlayerVolumeBarProps {
  style?: ViewStyle;
}

// Helper to mutate Reanimated SharedValue. Defined outside of the component scope
// to bypass React Compiler's strict mutation checks on hook-allocated values.
const updateProgress = (sv: SharedValue<number>, val: number) => {
  sv.value = val;
};

const PlayerVolumeBar = ({ style }: PlayerVolumeBarProps) => {
  const volume = usePlayerStore((state) => state.volume);
  const isMuted = usePlayerStore((state) => state.isMuted);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const toggleMute = usePlayerStore((state) => state.toggleMute);

  const progress = useSharedValue(isMuted ? 0 : volume);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  useEffect(() => {
    updateProgress(progress, isMuted ? 0 : volume);
  }, [volume, isMuted, progress]);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  return (
    <View style={[{ width: "100%" }, style]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          width: "100%",
        }}
      >
        {/* زرار كتم الصوت */}
        <TouchableOpacity onPress={toggleMute} activeOpacity={0.7}>
          <Ionicons
            name={isMuted || volume === 0 ? "volume-mute" : "volume-low"}
            size={20}
            color={isMuted ? colors.primary : colors.icon}
            style={{ opacity: isMuted ? 1 : 0.5 }}
          />
        </TouchableOpacity>

        <CustomProgressBar
          progress={progress}
          minValue={min}
          maxValue={max}
          maximumTrackTintColor={colors.maximumTrackTintColor}
          minimumTrackTintColor={colors.minimumTrackTintColor}
          containerStyle={[utilsStyles.slider, { flex: 1 }]}
          onValueChange={(value) => {
            updateProgress(progress, value);
            handleVolumeChange(value);
          }}
        />

        <TouchableOpacity onPress={() => setVolume(1)} activeOpacity={0.7}>
          <Ionicons
            name="volume-high"
            size={20}
            color={volume === 1 && !isMuted ? "white" : colors.icon}
            style={{ opacity: volume === 1 && !isMuted ? 1 : 0.5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerVolumeBar;
