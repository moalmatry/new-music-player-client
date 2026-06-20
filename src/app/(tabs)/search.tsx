import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import searchCategories from '@/data/search_categories.json';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32 - 16) / 2; // Two columns with padding and gaps

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Add bottom padding to account for FloatingPlayer
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 95,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
