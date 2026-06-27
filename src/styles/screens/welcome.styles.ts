import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    contentContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    logoSection: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    logoCircle: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: theme.text + "08",
      borderWidth: 1,
      borderColor: theme.text + "15",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: `0px 12px 16px ${theme.primary}`,
    },
    logoText: {
      fontSize: 36,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: 3,
      marginTop: 24,
      textTransform: "uppercase",
    },
    logoTagline: {
      fontSize: 15,
      color: theme.textSecondary,
      opacity: 0.7,
      textAlign: "center",
      marginTop: 8,
      letterSpacing: 0.5,
    },
    bottomSection: {
      width: "100%",
      paddingBottom: 20,
    },
    glassCard: {
      width: "100%",
      borderRadius: 28,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.textSecondary + "15",
      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
    },
    cardBlur: {
      ...StyleSheet.absoluteFill,
    },
    cardContent: {
      padding: 24,
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      marginBottom: 6,
    },
    cardSubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 24,
      opacity: 0.8,
    },
    buttonContainer: {
      gap: 12,
    },
    btnPrimary: {
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      boxShadow: `0px 4px 6px ${theme.primary}`,
    },
    btnPrimaryText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff",
    },
    btnSecondary: {
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.text + "05",
      borderWidth: 1,
      borderColor: theme.text + "12",
      justifyContent: "center",
      alignItems: "center",
    },
    btnSecondaryText: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
    },
    guestButton: {
      alignSelf: "center",
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginTop: 8,
    },
    guestText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: "600",
      letterSpacing: 0.2,
    },
  });
