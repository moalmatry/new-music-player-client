import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import searchCategories from '@/data/search_categories.json';
import { styles } from '@/styles/screens/search.styles';

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function SearchScreen() {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: item.color }]}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="What do you want to listen to?"
          placeholderTextColor="#666"
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
  );
}

