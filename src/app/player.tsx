import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { usePlayer } from '@/context/PlayerContext';

const { width, height } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const { currentTrack, isPlaying, togglePlay, playNext, playPrevious } = usePlayer();
  const translateY = useSharedValue(0);

  if (!currentTrack) return null;

  // Custom Pan Gesture for dragging down to dismiss
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Track downward swipes (translationY > 0)
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      // Dismiss if pulled down past 150 or flicked down rapidly (velocityY > 1000)
      if (event.translationY > 150 || event.velocityY > 1000) {
        translateY.value = withTiming(height, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(router.back)();
          }
        });
      } else {
        // Otherwise, spring back to top
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Drag Indicator */}
          <View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicator} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-down" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerSub}>PLAYING FROM MUSIC CLIENT</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Album Art */}
          <View style={styles.artworkContainer}>
            <Image
              source={{ uri: currentTrack.artwork }}
              style={styles.artwork}
              contentFit="cover"
              transition={300}
            />
          </View>

          {/* Title & Artist & Heart */}
          <View style={styles.metaContainer}>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {currentTrack.title}
              </Text>
              <Text numberOfLines={1} style={styles.artist}>
                {currentTrack.artist}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Scrub Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '38%' }]} />
              <View style={[styles.progressHandle, { left: '38%' }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>1:24</Text>
              <Text style={styles.timeText}>3:40</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlIcon} activeOpacity={0.7}>
              <Ionicons name="shuffle" size={24} color="#B3B3B3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={playPrevious} style={styles.controlIcon} activeOpacity={0.7}>
              <Ionicons name="play-skip-back-sharp" size={32} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlay} style={styles.playButton} activeOpacity={0.9}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={30}
                color="#000"
                style={{ marginLeft: isPlaying ? 0 : 4 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={playNext} style={styles.controlIcon} activeOpacity={0.7}>
              <Ionicons name="play-skip-forward-sharp" size={32} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlIcon} activeOpacity={0.7}>
              <Ionicons name="repeat" size={24} color="#B3B3B3" />
            </TouchableOpacity>
          </View>

          {/* Bottom Toolbar */}
          <View style={styles.bottomToolbar}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="laptop-outline" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="share-social-outline" size={20} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  headerSub: {
    color: '#B3B3B3',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  iconButton: {
    padding: 4,
  },
  artworkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 16,
  },
  artwork: {
    width: width - 48,
    height: width - 48,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 15,
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  progressHandle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    position: 'absolute',
    top: -4,
    transform: [{ translateX: -6 }],
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#B3B3B3',
    fontSize: 11,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  controlIcon: {
    padding: 8,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
