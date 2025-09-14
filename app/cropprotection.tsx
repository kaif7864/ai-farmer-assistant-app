import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PestInfo {
  id: string;
  name: string;
  solution: string;
  image: string;
}

const DUMMY_PESTS: PestInfo[] = [
  {
    id: '1',
    name: 'Stem Borer',
    solution: 'Use Carbofuran 3G granules or spray Chlorantraniliprole 18.5% SC.',
    image: 'https://placehold.co/100x100/A5D6A7/2E7D32?text=Stem+Borer'
  },
  {
    id: '2',
    name: 'Leaf Miner',
    solution: 'Spray Neem oil or use Cyromazine 75% WP.',
    image: 'https://placehold.co/100x100/A5D6A7/2E7D32?text=Leaf+Miner'
  },
  {
    id: '3',
    name: 'Rice Blast',
    solution: 'Apply fungicides like Tricyclazole or a combination of Carbendazim and Mancozeb.',
    image: 'https://placehold.co/100x100/A5D6A7/2E7D32?text=Rice+Blast'
  },
  {
    id: '4',
    name: 'Aphids',
    solution: 'Spray a solution of insecticidal soap or use Imidacloprid 17.8% SL.',
    image: 'https://placehold.co/100x100/A5D6A7/2E7D32?text=Aphids'
  },
  {
    id: '5',
    name: 'Root Rot',
    solution: 'Improve soil drainage and use fungicides like Fosetyl-Al.',
    image: 'https://placehold.co/100x100/A5D6A7/2E7D32?text=Root+Rot'
  },
];

const CropProtection: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPests = DUMMY_PESTS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛡️ Crop Protection</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Find Solutions for Pests & Diseases</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for a pest or disease..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Results List */}
        {filteredPests.length > 0 ? (
          filteredPests.map((item) => (
            <View key={item.id} style={styles.pestCard}>
              <Image source={{ uri: item.image }} style={styles.pestImage} />
              <View style={styles.pestDetails}>
                <Text style={styles.pestName}>{item.name}</Text>
                <Text style={styles.pestSolution}>{item.solution}</Text>
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
  },
  pestCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pestImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  pestDetails: {
    flex: 1,
  },
  pestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  pestSolution: {
    fontSize: 14,
    color: '#555',
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

export default CropProtection;
