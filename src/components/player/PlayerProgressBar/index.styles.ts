import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
      fontSize: 12,
      color: theme.textSecondary,
      opacity: 0.8,
      letterSpacing: 0.4,
    },
  });
