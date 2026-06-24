import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 8,
    borderRadius: 50,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  trackArtWorkImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#121212',
  },
  trackTitleContainer: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  trackTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
  controlButton: {
    padding: 4,
  },
});
