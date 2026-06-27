import { StyleSheet } from "react-native";

import { AppTheme } from "@/constants/theme";

export const createStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    artworkImageContainer: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 11.0,
      flexDirection: "row",
      justifyContent: "center",
      height: "45%",
      marginVertical: 16,
    },
    artworkImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 12,
    },
  });
