import { StyleSheet } from 'react-native';
import { colors, fontsSize } from '@/constants/tokens';
import { defaultStyles } from '@/styles';

export const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingVertical: 4,
  },
  artworkContainer: {
    position: 'relative',
    width: 50,
    height: 50,
  },
  trackWorkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
    backgroundColor: '#1C1C1E',
  },
  trackDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontsSize.sm,
    fontWeight: '600',
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
});
