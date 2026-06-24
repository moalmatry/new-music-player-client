import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text/themed-text';
import { ThemedView } from '@/components/themed-view/themed-view';
import { styles } from './web-badge.styles';

export function WebBadge() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={require('@/assets/images/expo-badge-white.png')}
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}
