import { Platform, StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: Platform.OS === "android" ? 40 : 0,
    },
    backgroundGradient: {
      ...StyleSheet.absoluteFill,
    },
    blob1: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: "#ff007f",
      opacity: 0.08,
    },
    blob2: {
      position: "absolute",
      width: 240,
      height: 240,
      borderRadius: 120,
      backgroundColor: theme.primary,
      opacity: 0.1,
    },
    blurView: {
      ...StyleSheet.absoluteFill,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginVertical: 16,
    },
    avatarRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
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
    headerTitle: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: 0.3,
    },
    addButton: {
      padding: 4,
    },
    filterRow: {
      flexDirection: "row",
      paddingHorizontal: 20,
      gap: 8,
      marginBottom: 20,
    },
    filterChipActive: {
      backgroundColor: theme.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      boxShadow: `0px 3px 4px ${theme.primary}`,
    },
    filterChipTextActive: {
      color: "#FFF",
      fontWeight: "700",
      fontSize: 13,
    },
    filterChip: {
      backgroundColor: theme.text + "05",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.textSecondary + "15",
    },
    filterChipText: {
      color: theme.text,
      fontWeight: "600",
      fontSize: 13,
      opacity: 0.8,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 160,
    },
    playlistRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      marginBottom: 12,
    },
    playlistArt: {
      width: 64,
      height: 64,
      borderRadius: 12,
      backgroundColor: theme.backgroundElement,
      boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.1)",
    },
    playlistText: {
      flex: 1,
      marginLeft: 12,
      justifyContent: "center",
    },
    playlistTitle: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "700",
    },
    playlistSub: {
      color: theme.textSecondary,
      fontSize: 13,
      marginTop: 3,
      opacity: 0.8,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    emptyText: {
      color: theme.textSecondary,
      fontSize: 16,
      textAlign: "center",
      opacity: 0.7,
    },
  });
