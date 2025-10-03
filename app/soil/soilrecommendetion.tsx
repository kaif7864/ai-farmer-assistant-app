import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, router } from "expo-router";

const { width } = Dimensions.get('window');

interface CropRecommendation {
  id: number;
  name: string;
  matchScore: number;
  imagePlaceholder: 'wheat' | 'maize' | 'mustard';
}

const mockRecommendations: CropRecommendation[] = [
  { id: 1, name: 'Wheat (Rabi)', matchScore: 92, imagePlaceholder: 'wheat' },
  { id: 2, name: 'Maize (Kharif)', matchScore: 78, imagePlaceholder: 'maize' },
  { id: 3, name: 'Mustard (Rabi)', matchScore: 65, imagePlaceholder: 'mustard' },
];

const CropRecommendationScreen: FC = () => {
  const params = useLocalSearchParams();
  const [results, setResults] = useState<CropRecommendation[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { nitrogen, phosphorus, potassium, ph, temperature, rainfall } = params;

  const getValidatedParams = () => {
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature || !rainfall) return null;
    return {
      N: parseFloat(String(nitrogen)),
      P: parseFloat(String(phosphorus)),
      K: parseFloat(String(potassium)),
      pH: parseFloat(String(ph)),
      Temp: parseFloat(String(temperature)),
      Rain: parseFloat(String(rainfall)),
    };
  };

  useEffect(() => {
    const validatedParams = getValidatedParams();
    if (validatedParams) {
      setTimeout(() => {
        // Compute matchScore dynamically
        const computedResults = mockRecommendations.map(crop => ({
          ...crop,
          matchScore: Math.floor(Math.random() * (95 - 65 + 1)) + 65 // dynamic placeholder
        }));
        setResults(computedResults);
        setLoading(false);
      }, 1500);
    } else {
      Alert.alert('Error', 'Missing soil parameters!');
      router.back();
    }
  }, []);

  if (loading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#2E7D32" />
      <Text style={{ marginTop: 10, fontSize: 16, color: '#2E7D32' }}>Calculating Recommendations...</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recommended Crops 🌾</Text>
      <View style={styles.resultsContainer}>
        {results?.map(crop => (
          <View key={crop.id} style={styles.cropCard}>
            <Image source={{ uri: `https://via.placeholder.com/120x80?text=${crop.imagePlaceholder}` }} style={styles.cropImage} />
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.matchScore}>Match: {crop.matchScore}%</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 16 },
  header: { fontSize: 24, fontWeight: '700', color: '#2E7D32', marginBottom: 20 },
  resultsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cropCard: { width: width / 2 - 24, backgroundColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3 },
  cropImage: { width: 120, height: 80, borderRadius: 8, marginBottom: 10 },
  cropName: { fontWeight: '600', fontSize: 16, color: '#263238', textAlign: 'center' },
  matchScore: { fontSize: 14, color: '#388E3C', marginTop: 5 },
});

export default CropRecommendationScreen;
