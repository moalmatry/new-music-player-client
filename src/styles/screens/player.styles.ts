import { colors, fontsSize } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dismissIndicatorContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  dismissIndicator: {
    width: 50,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    opacity: 0.7,
  },
  artworkImageContainer: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
    marginVertical: 16,
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginRight: 16,
  },
  trackTitleText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
  },
  trackArtistText: {
    fontSize: fontsSize.base,
    color: colors.textMuted,
    opacity: 0.8,
    maxWidth: "90%",
    marginTop: 6,
  },
  progressContainer: {
    marginTop: 32,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.maximumTrackTintColor,
    borderRadius: 2,
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.minimumTrackTintColor,
    borderRadius: 2,
  },
  progressHandle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.minimumTrackTintColor,
    position: "absolute",
    top: -3,
    transform: [{ translateX: -5 }],
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  controlIcon: {
    padding: 8,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  volumeContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 30,
    paddingHorizontal: 8,
  },

  volumeBarFill: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
});
