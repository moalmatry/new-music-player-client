import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // Render on top of navigation layouts
  },
  logo: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: 45, // Match rounded icon edges
  },
});
