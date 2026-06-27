import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmbientBackground } from "@/components/common/AmbientBackground";
import searchCategories from "@/data/search_categories.json";
import { useTheme } from "@/hooks/use-theme";
import { createStyles } from "@/styles/screens/search.styles";

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

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
      {/* Reusable Premium Background */}
      <AmbientBackground />

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
