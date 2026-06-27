import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
      backgroundColor: theme.textSecondary + "30",
    },
    volumeContainer: {
      width: "100%",
      marginTop: "auto",
      marginBottom: 30,
      paddingHorizontal: 8,
    },
    glassCard: {
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.textSecondary + "15",
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
