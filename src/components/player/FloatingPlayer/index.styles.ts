import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "transparent",
      padding: 8,
      borderRadius: 50,
      paddingVertical: 10,
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
      borderWidth: 1,
      borderColor: theme.textSecondary + "20", // subtle translucent border
      overflow: "hidden",
    },
    blurView: {
      ...StyleSheet.absoluteFill,
      borderRadius: 50,
      backgroundColor: "transparent",
    },
    glassView: {
      ...StyleSheet.absoluteFill,
      borderRadius: 50,
    },
    trackArtWorkImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.backgroundSelected,
    },
    trackTitleContainer: {
      flex: 1,
      marginLeft: 10,
      overflow: "hidden",
    },
    trackTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "600",
      paddingLeft: 10,
    },
    trackControlsContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 20,
      marginRight: 16,
      paddingLeft: 16,
    },
    controlButton: {
      padding: 4,
    },
  });
