import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MandiPrice {
  id: string;
  crop: string;
  mandi: string;
  price: string;
  date: string;
}

const DUMMY_PRICES: MandiPrice[] = [
  { id: '1', crop: 'Wheat', mandi: 'Indore', price: '₹2,500/quintal', date: '2024-09-15' },
  { id: '2', crop: 'Rice', mandi: 'Bhopal', price: '₹3,200/quintal', date: '2024-09-15' },
  { id: '3', crop: 'Maize', mandi: 'Jaipur', price: '₹1,800/quintal', date: '2024-09-14' },
  { id: '4', crop: 'Mustard', mandi: 'Jodhpur', price: '₹5,800/quintal', date: '2024-09-14' },
  { id: '5', crop: 'Onion', mandi: 'Nasik', price: '₹2,200/quintal', date: '2024-09-15' },
  { id: '6', crop: 'Potato', mandi: 'Agra', price: '₹1,500/quintal', date: '2024-09-15' },
  { id: '7', crop: 'Tomato', mandi: 'Hyderabad', price: '₹1,000/quintal', date: '2024-09-14' },
];

const MandiPrices: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMandi, setSelectedMandi] = useState<string>('All Mandis');

  const filteredPrices = DUMMY_PRICES.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedMandi === 'All Mandis' || item.mandi === selectedMandi)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Mandi Prices</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search and Filter Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Find Latest Market Prices</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for a crop..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>
              <Ionicons name="location-outline" size={16} /> Filter by Mandi (Coming Soon)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Prices List */}
        {filteredPrices.length > 0 ? (
          filteredPrices.map((item) => (
            <View key={item.id} style={styles.priceCard}>
              <View style={styles.priceHeader}>
                <Text style={styles.cropName}>{item.crop}</Text>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
              <View style={styles.priceDetails}>
                <Text style={styles.detailText}>
                  <Ionicons name="cube-outline" size={14} color="#888" /> Mandi: {item.mandi}
                </Text>
                <Text style={styles.detailText}>
                  <Ionicons name="calendar-outline" size={14} color="#888" /> Date: {item.date}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResultsCard}>
            <Text style={styles.noResultsText}>No results found for "{searchQuery}".</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf4ea',
  },
  header: {
    backgroundColor: '#8bc34a',
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noResultsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default MandiPrices;
