import { StyleSheet } from 'react-native';
import { AppTheme } from '@/constants/theme';
import { fontsSize } from '@/constants/tokens';
import { defaultStyles } from '@/styles';

export const createStyles = (theme: AppTheme) => StyleSheet.create({
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
    backgroundColor: theme.backgroundElement,
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
    color: theme.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
});
