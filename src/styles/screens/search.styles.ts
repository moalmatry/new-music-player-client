import { Dimensions, Platform, StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 32 - 16) / 2; // Two columns with padding and gaps

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
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: theme.primary,
      opacity: 0.1,
    },
    blob2: {
      position: "absolute",
      width: 250,
      height: 250,
      borderRadius: 125,
      backgroundColor: "#00f0ff",
      opacity: 0.08,
    },
    blurView: {
      ...StyleSheet.absoluteFill,
    },
    header: {
      paddingHorizontal: 20,
      marginVertical: 16,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "800",
      letterSpacing: 0.3,
    },
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.text + "05",
      borderRadius: 16,
      marginHorizontal: 20,
      paddingHorizontal: 16,
      height: 52,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.textSecondary + "15",
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      color: theme.text,
      fontSize: 15,
      fontWeight: "500",
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "800",
      marginHorizontal: 20,
      marginBottom: 14,
      letterSpacing: 0.2,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 140, // Add bottom padding to account for FloatingPlayer
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 16,
    },
    card: {
      width: CARD_WIDTH,
      height: 100,
      borderRadius: 16,
      padding: 16,
      justifyContent: "flex-start",
      overflow: "hidden",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    cardTitle: {
      color: "#FFF",
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.1,
    },
  });
