import { AppTheme } from "@/constants/theme";
import { fontsSize } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.background,
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
    backgroundColor: theme.textSecondary + '30',
  },
  artworkImageContainer: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
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
    color: theme.text,
  },
  trackArtistText: {
    fontSize: fontsSize.base,
    color: theme.textSecondary,
    opacity: 0.8,
    maxWidth: "90%",
    marginTop: 6,
  },
  progressContainer: {
    marginTop: 32,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: theme.maximumTrackTintColor,
    borderRadius: 2,
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.minimumTrackTintColor,
    borderRadius: 2,
  },
  progressHandle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.minimumTrackTintColor,
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
    color: theme.textSecondary,
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
    backgroundColor: theme.playButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  volumeContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 30,
    paddingHorizontal: 8,
  },

  volumeBarFill: {
    height: "100%",
    backgroundColor: theme.minimumTrackTintColor,
    borderRadius: 2,
  },
  glassCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.textSecondary + '15',
    marginTop: "auto",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardGlassView: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
  },
  cardBlurView: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
  },
  cardContent: {
    padding: 20,
    width: "100%",
  },
});
