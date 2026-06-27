import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import searchCategories from "@/data/search_categories.json";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { createStyles } from "@/styles/screens/search.styles";

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function SearchScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);

  // Background Blob Shared Values
  const blob1X = useSharedValue(200);
  const blob1Y = useSharedValue(150);
  const blob2X = useSharedValue(-50);
  const blob2Y = useSharedValue(500);

  useEffect(() => {
    // Floating animations for background glows
    blob1X.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(200, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(300, { duration: 13000, easing: Easing.inOut(Easing.ease) }),
        withTiming(150, { duration: 13000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    blob2X.value = withRepeat(
      withSequence(
        withTiming(120, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(350, { duration: 14000, easing: Easing.inOut(Easing.ease) }),
        withTiming(500, { duration: 14000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [{ translateX: blob1X.value }, { translateY: blob1Y.value }],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [{ translateX: blob2X.value }, { translateY: blob2Y.value }],
  }));

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: item.color }]}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background Gradients & Aura Blobs */}
      <LinearGradient
        colors={scheme === "dark" ? ["#0D0221", "#05000A"] : ["#E8EAFF", "#F4F5FF"]}
        style={styles.backgroundGradient}
      />

      <Animated.View style={[styles.blob1, animatedBlob1]} />
      <Animated.View style={[styles.blob2, animatedBlob2]} />

      <BlurView
        intensity={scheme === "dark" ? 75 : 55}
        tint={scheme === "dark" ? "dark" : "light"}
        style={styles.blurView}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color={theme.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="What do you want to listen to?"
            placeholderTextColor={theme.textSecondary + "90"}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Browse all</Text>

        <FlatList
          data={searchCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
