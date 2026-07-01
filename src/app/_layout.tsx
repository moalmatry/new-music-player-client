import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

import AnimatedSplashScreen from "@/components/common/AnimatedSplashScreen";
import AppInitializerProvider from "@/components/providers/AppInitializerProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppInitializerProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="player"
              options={{
                presentation: "transparentModal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
          </Stack>
          <AnimatedSplashScreen />
        </ThemeProvider>
      </AppInitializerProvider>
    </GestureHandlerRootView>
  );
}
