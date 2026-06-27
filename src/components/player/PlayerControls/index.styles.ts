import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    },
  });
