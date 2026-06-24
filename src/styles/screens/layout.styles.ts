import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  tabBar: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: '7%',
    left: 20,
    right: 20,
    height: 70,
    elevation: 5,
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingBottom: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  blurView: {
    ...StyleSheet.absoluteFill,
    borderRadius: 35,
    backgroundColor: 'transparent',
  },
  glassView: {
    ...StyleSheet.absoluteFill,
    borderRadius: 35,
  },
});
