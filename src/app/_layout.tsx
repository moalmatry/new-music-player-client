import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen/AnimatedSplashScreen";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={DarkTheme}
      >
        <StatusBar style="light" />
        <Stack>
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
    </GestureHandlerRootView>
  );
}
