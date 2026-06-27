import { Dimensions, Platform,StyleSheet } from 'react-native';

import { AppTheme } from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32 - 16) / 2; // Two columns with padding and gaps

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  headerTitle: {
    color: theme.text,
    fontSize: 24,
    fontWeight: '700',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundElement,
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.textSecondary + '15',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: theme.text,
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Add bottom padding to account for FloatingPlayer
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 95,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFF', // Keep category card titles white since card background is colorful
    fontSize: 16,
    fontWeight: '700',
  },
});
