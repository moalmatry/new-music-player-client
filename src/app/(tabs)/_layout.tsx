import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, useWindowDimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import FloatingPlayer from '@/components/player/FloatingPlayer';
import { colors, fontsSize } from '@/constants/tokens';

const useLiquidGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();

export default function TabsLayout() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  return (
    <View style={styles.container}>
      <Tabs
        screenLayout={({ children }) => (
          <>
            {children}
            <FloatingPlayer
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: isSmallScreen ? '19%' : '16%',
              }}
            />
          </>
        )}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: {
            fontSize: fontsSize.xs,
            fontWeight: '500',
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            paddingTop: Platform.OS === 'android' ? 5 : 0,
          },
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => {
            if (useLiquidGlass) {
              return (
                <GlassView
                  glassEffectStyle="clear"
                  colorScheme="dark"
                  style={styles.glassView}
                />
              );
            }
            return (
              <BlurView intensity={80} tint="dark" style={styles.blurView} />
            );
          },
          tabBarButton: ({ style, onPress, children }: any) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={style}
              onPress={(e) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                if (onPress) onPress(e);
              }}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Your Library',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'library' : 'library-outline'}
                size={20}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(20, 20, 20, 0.8)',
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
