import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform, useWindowDimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import FloatingPlayer from '@/components/player/FloatingPlayer/FloatingPlayer';
import { fontsSize } from '@/constants/tokens';
import { useTheme } from '@/hooks/use-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createStyles } from '@/styles/screens/layout.styles';

const useLiquidGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();

export default function TabsLayout() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = createStyles(theme);

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
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: scheme === 'dark' ? '#999' : '#666',
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
                  colorScheme={scheme === 'dark' ? 'dark' : 'light'}
                  style={styles.glassView}
                />
              );
            }
            return (
              <BlurView intensity={80} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.blurView} />
            );
          },
          tabBarButton: ({ style, onPress, children }: {
            style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
            onPress?: (event: import('react-native').GestureResponderEvent) => void;
            children?: React.ReactNode;
          }) => (
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
