import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    backgroundGradient: {
      ...StyleSheet.absoluteFill,
    },
    blurView: {
      ...StyleSheet.absoluteFill,
    },
    blobTop: {
      position: "absolute",
      top: -100,
      right: -50,
      width: 250,
      height: 250,
      borderRadius: 125,
      backgroundColor: theme.primary,
      opacity: 0.12,
    },
    blobBottom: {
      position: "absolute",
      bottom: -100,
      left: -50,
      width: 300,
      height: 300,
      borderRadius: 150,
      backgroundColor: "#ff007f",
      opacity: 0.1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    backButton: {
      position: "absolute",
      left: 24,
      zIndex: 10,
    },
    backButtonCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.text + "08",
      borderWidth: 1,
      borderColor: theme.text + "15",
      justifyContent: "center",
      alignItems: "center",
    },
    formCard: {
      width: "100%",
      borderRadius: 28,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.textSecondary + "15",
      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.15)",
    },
    cardBlur: {
      ...StyleSheet.absoluteFill,
    },
    cardContent: {
      padding: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 28,
      opacity: 0.8,
    },
    inputGroup: {
      gap: 16,
      marginBottom: 24,
    },
    inputContainer: {
      height: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.text + "15",
      backgroundColor: theme.text + "04",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    inputIcon: {
      marginRight: 12,
    },
    inputText: {
      flex: 1,
      height: "100%",
      color: theme.text,
      fontSize: 16,
    },
    btnSubmit: {
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
      boxShadow: `0px 4px 6px ${theme.primary}`,
    },
    btnSubmitText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff",
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    footerText: {
      fontSize: 14,
      color: theme.textSecondary,
      opacity: 0.8,
    },
    footerLink: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: "600",
      marginLeft: 4,
    },
    errorText: {
      color: "#ff3b30",
      fontSize: 12,
      marginTop: -8,
      marginLeft: 4,
      marginBottom: 4,
    },
  });
