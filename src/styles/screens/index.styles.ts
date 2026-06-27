import { Dimensions, Platform,StyleSheet } from 'react-native';

import { AppTheme } from '@/constants/theme';

const { width } = Dimensions.get('window');
const RECENT_CARD_WIDTH = (width - 32 - 8) / 2; // 2 columns with gaps

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  scrollContent: {
    paddingBottom: 140, // Ensure content isn't hidden under FloatingPlayer
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  greeting: {
    color: theme.text,
    fontSize: 22,
    fontWeight: '700',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.backgroundElement,
  },
  sectionTitle: {
    color: theme.text,
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  recentCard: {
    width: RECENT_CARD_WIDTH,
    height: 56,
    backgroundColor: theme.backgroundElement,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  recentArt: {
    width: 56,
    height: 56,
    backgroundColor: theme.backgroundElement,
    opacity: 0.8,
  },
  recentTextContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  recentTitle: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  madeForCard: {
    width: 145,
    marginRight: 16,
  },
  madeForArt: {
    width: 145,
    height: 145,
    borderRadius: 6,
    backgroundColor: theme.backgroundElement,
    marginBottom: 8,
  },
  madeForTitle: {
    color: theme.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  madeForDescription: {
    color: theme.textSecondary,
    fontSize: 11,
    lineHeight: 14,
  },
});
