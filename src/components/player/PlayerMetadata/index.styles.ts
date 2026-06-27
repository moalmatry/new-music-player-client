import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";
import { fontsSize } from "@/constants/tokens";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
  });
