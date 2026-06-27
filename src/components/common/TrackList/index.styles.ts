import { StyleSheet } from 'react-native';

import { AppTheme } from '@/constants/theme';

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderBottomColor: theme.textSecondary + '20', // subtle translucent separator border
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
