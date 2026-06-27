import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@/constants/theme';

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.backgroundElement,
  },
  headerTitle: {
    color: theme.text,
    fontSize: 22,
    fontWeight: '700',
  },
  addButton: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterChipActive: {
    backgroundColor: theme.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipTextActive: {
    color: '#FFF', // Keep active filter text white on primary color background
    fontWeight: '600',
    fontSize: 13,
  },
  filterChip: {
    backgroundColor: theme.backgroundElement,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.textSecondary + '10',
  },
  filterChipText: {
    color: theme.text,
    fontWeight: '500',
    fontSize: 13,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  playlistArt: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: theme.backgroundElement,
  },
  playlistText: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  playlistTitle: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '600',
  },
  playlistSub: {
    color: theme.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: theme.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});
