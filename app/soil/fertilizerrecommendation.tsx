// FertilizerRecommendation.tsx

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data for Crop Type Selection (Replace with your actual list)
const CROP_TYPES = [
  'Paddy', 'Maize', 'Chickpea', 'KidneyBeans', 'MothBeans', 'MungBean',
  'Blackgram', 'Lentil', 'PigeonPeas', 'Cotton', 'Jute', 'Coffee', 'Tea'
];

// --- Component ---
const FertilizerRecommendation: FC = () => {
  const [nitrogen, setNitrogen] = useState<string>('');
  const [phosphorus, setPhosphorus] = useState<string>('');
  const [potassium, setPotassium] = useState<string>('');
  const [cropType, setCropType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendedFertilizer, setRecommendedFertilizer] = useState<string | null>(null);

  const handleRecommend = () => {
    // 1. Validation Check
    if (!nitrogen || !phosphorus || !potassium || !cropType) {
      Alert.alert('Error', 'Please fill all soil nutrients and select a crop type.');
      return;
    }

    // Convert NPK to numbers for logic
    const N = parseFloat(nitrogen);
    const P = parseFloat(phosphorus);
    const K = parseFloat(potassium);

    if (isNaN(N) || isNaN(P) || isNaN(K)) {
         Alert.alert('Error', 'Please enter valid numerical values for NPK.');
         return;
    }

    setLoading(true);
    setRecommendedFertilizer(null);

    // 2. Mock Prediction Logic (Replace this with your actual API call or ML model inference)
    setTimeout(() => {
      let result = 'General NPK Fertilizer (10:26:26)';

      if (cropType.toLowerCase() === 'paddy') {
          if (N < 40) result = 'Urea (High Nitrogen)';
          else if (P < 20) result = 'DAP (Diammonium Phosphate)';
          else result = 'Potash + Urea Blend';
      } else if (cropType.toLowerCase() === 'maize') {
          if (K < 15) result = 'MOP (Muriate of Potash)';
          else result = 'Complex NPK (12:32:16)';
      }
      // You would use the soil data (N, P, K) and crop type to run your actual XGBoost model here.

      setRecommendedFertilizer(result);
      setLoading(false);
    }, 1500);
  };

  const renderInputCard = (label: string, value: string, setValue: (v: string) => void, iconName: string, placeholder: string) => (
    <View style={styles.inputCard}>
      <MaterialCommunityIcons name={iconName} size={24} color="#388E3C" style={styles.inputIcon} />
      <View style={styles.inputContent}>
        <Text style={styles.inputLabel}>{label} (mg/kg)</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#90A4AE"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Text style={styles.title}>Fertilizer Recommendation</Text>
        <Text style={styles.subtitle}>Get the best fertilizer based on soil nutrients and crop type.</Text>
      </View>

      {/* --- Input Section: Soil Nutrients (N P K) --- */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Soil Nutrient Levels</Text>
        {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'atom-variant', 'e.g., 50')}
        {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'atom-variant', 'e.g., 28')}
        {renderInputCard('Potassium (K)', potassium, setPotassium, 'atom-variant', 'e.g., 22')}
      </View>

      {/* --- Crop Type Selection --- */}
      <View style={styles.cropSelectSection}>
         <Text style={styles.sectionTitle}>Select Crop Type</Text>
         <View style={styles.cropPillContainer}>
            {CROP_TYPES.map((crop, index) => (
                <TouchableOpacity 
                    key={index}
                    style={[
                        styles.cropPill, 
                        cropType === crop ? styles.cropPillActive : styles.cropPillInactive
                    ]}
                    onPress={() => setCropType(crop)}
                >
                    <Text style={[
                        styles.cropPillText, 
                        cropType === crop ? styles.cropPillTextActive : styles.cropPillTextInactive
                    ]}>
                        {crop}
                    </Text>
                </TouchableOpacity>
            ))}
         </View>
         <Text style={styles.selectedCropText}>Selected Crop: {cropType || 'None'}</Text>
      </View>


      {/* --- Predict Button --- */}
      <TouchableOpacity
        style={[styles.recommendButton, loading && styles.recommendButtonDisabled]}
        onPress={handleRecommend}
        disabled={loading}
      >
        <Text style={styles.recommendButtonText}>
          {loading ? 'Analyzing...' : 'Get Fertilizer Recommendation'}
        </Text>
      </TouchableOpacity>

      {/* --- Results Section --- */}
      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>Best Fertilizer</Text>
        
        {loading && (
          <Text style={styles.statusText}>🔍 Running XGBoost Model... Please wait.</Text>
        )}

        {recommendedFertilizer && !loading && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Recommended Fertilizer Name:</Text>
            <Text style={styles.resultFertilizerName}>{recommendedFertilizer}</Text>
            <Text style={styles.resultNote}>
                This recommendation is based on your soil and crop inputs.
            </Text>
          </View>
        )}
        
        {!recommendedFertilizer && !loading && (
            <Text style={{...styles.statusText, color: '#607D8B'}}>
                Enter soil data and crop type to get a personalized recommendation.
            </Text>
        )}
      </View>

    </ScrollView>
  );
};

// --- Styles (Matching the Green/Clean Theme) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA', // Light background
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32', // Deep Green
  },
  subtitle: {
    fontSize: 16,
    color: '#607D8B', 
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455A64',
    marginBottom: 2,
  },
  textInput: {
    paddingVertical: 4,
    fontSize: 16,
    color: '#263238',
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
  },
  cropSelectSection: {
      marginBottom: 30,
  },
  cropPillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  cropPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  cropPillInactive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A5D6A7',
  },
  cropPillActive: {
    backgroundColor: '#388E3C',
    borderColor: '#2E7D32',
  },
  cropPillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cropPillTextInactive: {
    color: '#2E7D32',
  },
  cropPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedCropText: {
    fontSize: 14,
    color: '#455A64',
    marginTop: 10,
    fontWeight: '500',
  },
  recommendButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  recommendButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  recommendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginBottom: 50,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#4CAF50',
  },
  resultCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#388E3C',
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 16,
    color: '#455A64',
    marginBottom: 5,
  },
  resultFertilizerName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultNote: {
    fontSize: 12,
    color: '#607D8B',
    textAlign: 'center',
  }
});

export default FertilizerRecommendation;