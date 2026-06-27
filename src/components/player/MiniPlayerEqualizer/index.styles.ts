import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      height: 24,
      gap: 3,
      position: "absolute",
      left: 13,
      bottom: 13,
    },
    bar: {
      width: 4,
      backgroundColor: theme.primary,
      borderRadius: 2,
    },
  });
