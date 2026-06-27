import { Dimensions, Platform, StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

const { width } = Dimensions.get("window");
const RECENT_CARD_WIDTH = (width - 40 - 10) / 2; // 2 columns with 10px gap, 20px padding left/right

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: Platform.OS === "android" ? 40 : 0,
    },

    scrollContent: {
      paddingBottom: 140, // Ensure content isn't hidden under FloatingPlayer
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginTop: 20,
      marginBottom: 16,
    },
    greetingContainer: {
      flex: 1,
    },
    greeting: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "800",
      letterSpacing: 0.3,
    },
    subGreeting: {
      color: theme.textSecondary,
      fontSize: 13,
      opacity: 0.7,
      marginTop: 4,
      letterSpacing: 0.2,
    },
    avatarContainer: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1.5,
      borderColor: theme.primary + "80",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: `0px 4px 6px ${theme.primary}`,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "800",
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 14,
      letterSpacing: 0.3,
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
    recentCard: {
      width: RECENT_CARD_WIDTH,
      height: 60,
      backgroundColor: theme.text + "04",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.textSecondary + "12",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      overflow: "hidden",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    },
    recentArt: {
      width: 60,
      height: 60,
      backgroundColor: theme.backgroundElement,
    },
    recentTextContainer: {
      flex: 1,
      paddingHorizontal: 12,
      justifyContent: "center",
    },
    recentTitle: {
      color: theme.text,
      fontSize: 13,
      fontWeight: "700",
      letterSpacing: 0.1,
    },
    horizontalScrollContent: {
      paddingLeft: 20,
      paddingRight: 10,
    },
    madeForCard: {
      width: 150,
      marginRight: 16,
    },
    madeForArt: {
      width: 150,
      height: 150,
      borderRadius: 16,
      backgroundColor: theme.backgroundElement,
      marginBottom: 10,
      boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
    },
    madeForTitle: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 4,
      letterSpacing: 0.2,
    },
    madeForDescription: {
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 14,
      opacity: 0.8,
    },
  });
