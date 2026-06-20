import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const RECENT_CARD_WIDTH = (width - 32 - 8) / 2; // 2 columns with gaps

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
  },
  sectionTitle: {
    color: '#FFF',
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
    backgroundColor: '#1C1C1E',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  recentArt: {
    width: 56,
    height: 56,
    backgroundColor: '#2C2C2E',
  },
  recentTextContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  recentTitle: {
    color: '#FFF',
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
    backgroundColor: '#1C1C1E',
    marginBottom: 8,
  },
  madeForTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  madeForDescription: {
    color: '#B3B3B3',
    fontSize: 11,
    lineHeight: 14,
  },
});
