import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { version } from "expo/package.json";
import { styles } from "./index.styles";

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="code"
        themeColor="textSecondary"
        style={styles.versionText}
      >
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === "dark"
            ? require("@/assets/images/expo-badge-white.png")
            : require("@/assets/images/expo-badge.png")
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}
