// CropRecommendation.tsx (Form Hide/Show Logic Added)

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Alert, ActivityIndicator, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// --- Component Data ---
interface SoilParameter {
  name: string;
  yourValue: number | string;
  optimalMin: number;
  optimalMax: number;
  unit: string;
}

interface CropRecommendation {
  id: number;
  name: string;
  matchScore: number; 
  imagePlaceholder: 'wheat' | 'maize' | 'mustard'; 
}

// Updated Mock Recommendations with image placeholders
const mockRecommendations: CropRecommendation[] = [
  { id: 1, name: 'Wheat (Rabi)', matchScore: 92, imagePlaceholder: 'wheat' },
  { id: 2, name: 'Maize (Kharif)', matchScore: 78, imagePlaceholder: 'maize' },
  { id: 3, name: 'Mustard (Rabi)', matchScore: 65, imagePlaceholder: 'mustard' },
];

// Mock IoT Data (Simulating reading from backend)
const mockIotData = {
  N: 85, 
  P: 42, 
  K: 35, 
  pH: 6.2,
  temperature: 28.5, 
  rainfall: 1100,
};

// Optimal Ranges for Comparison (Example Data)
const optimalRanges = {
  N: { min: 60, max: 90 },
  P: { min: 30, max: 55 },
  K: { min: 30, max: 50 },
  pH: { min: 5.5, max: 7.0 },
};
// ------------------------------------------

const CropRecommendation: FC = () => {
  // --- NEW STATE FOR UI CONTROL ---
  const [showForm, setShowForm] = useState(true); // Control visibility of input form

  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [ph, setPh] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [iotDataLoaded, setIotDataLoaded] = useState(false); // Kept for tracking data source

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CropRecommendation[] | null>(null);

  // --- Helper for Mock Images ---
  const getCropImageSource = (placeholder: 'wheat' | 'maize' | 'mustard') => {
    switch (placeholder) {
      case 'wheat':
        return { uri: 'https://cdn.pixabay.com/photo/2017/08/21/04/45/grain-2663953_960_720.jpg' };
      case 'maize':
        return { uri: 'https://cdn.pixabay.com/photo/2014/05/29/18/08/corn-358055_960_720.jpg' };
      case 'mustard':
        return { uri: 'https://cdn.pixabay.com/photo/2016/06/13/20/43/mustard-field-1454655_960_720.jpg' };
      default:
        return { uri: 'https://via.placeholder.com/150/90EE90/FFFFFF?text=Crop' };
    }
  };

  // --- Function to fetch/load IoT data ---
  const fetchIotData = () => {
    setLoading(true);
    setResults(null); 
    setShowForm(true); // Ensure form is visible during input/load

    // Simulate API call
    setTimeout(() => {
      setNitrogen(String(mockIotData.N));
      setPhosphorus(String(mockIotData.P));
      setPotassium(String(mockIotData.K));
      setPh(String(mockIotData.pH));
      setTemperature(String(mockIotData.temperature));
      setRainfall(String(mockIotData.rainfall));
      
      setIotDataLoaded(true);
      setLoading(false);
      Alert.alert('Success', 'IoT data successfully loaded and filled. Press "Get Crop Prediction" to analyze.');
    }, 1500); 
  };

  const handlePredict = () => {
    // Validation
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature || !rainfall) {
      Alert.alert('Error', 'Please fill all parameters.');
      return;
    }
    
    setLoading(true);
    setResults(null); // Clear previous results while loading

    // Simulate AI/ML Logic
    setTimeout(() => {
      setResults(mockRecommendations);
      setLoading(false);
      setShowForm(false); // <<< HIDE THE FORM after successful prediction >>>
      Alert.alert('Prediction Complete', 'Your personalized crop recommendations are ready!');
    }, 2000); 
  };

  // --- NEW FUNCTION TO UNHIDE FORM AND HIDE RESULTS ---
  const handleEditForm = () => {
    setShowForm(true); 
    setResults(null); 
    Alert.alert('Form Visible', 'You can now edit the input parameters.');
  };

  // --- Comparison Logic ---
  const getSoilComparisonData = (): SoilParameter[] => {
    return [
      { name: 'Nitrogen (N)', yourValue: nitrogen, optimalMin: optimalRanges.N.min, optimalMax: optimalRanges.N.max, unit: 'kg/ha' },
      { name: 'Phosphorus (P)', yourValue: phosphorus, optimalMin: optimalRanges.P.min, optimalMax: optimalRanges.P.max, unit: 'kg/ha' },
      { name: 'Potassium (K)', yourValue: potassium, optimalMin: optimalRanges.K.min, optimalMax: optimalRanges.K.max, unit: 'kg/ha' },
      { name: 'pH Level', yourValue: ph, optimalMin: optimalRanges.pH.min, optimalMax: optimalRanges.pH.max, unit: '' },
    ];
  };

  const getMatchStatus = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return { text: 'Perfect', color: '#4CAF50' }; 
    if (value < min) return { text: 'Low', color: '#FF9800' }; 
    return { text: 'High', color: '#E53935' }; 
  };

  // --- Renderer Functions ---

  const renderInputCard = (label: string, value: string, setValue: (v: string) => void, placeholder: string, icon: string, isNumeric: boolean = true) => (
    <View style={styles.inputCard}>
      <MaterialCommunityIcons name={icon} size={20} color={styles.themeColor.color} style={styles.inputIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#90A4AE"
          keyboardType={isNumeric ? 'numeric' : 'default'}
        />
      </View>
    </View>
  );

  const renderSoilComparison = (data: SoilParameter[]) => (
    <View style={styles.comparisonTable}>
      <Text style={styles.comparisonTitle}>Soil Parameter Comparison</Text>
      <View style={styles.comparisonHeader}>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 2 }]}>Parameter</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Your Soil</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Optimal</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Match</Text>
      </View>
      {data.map((param, index) => {
        const value = parseFloat(String(param.yourValue));
        const status = getMatchStatus(value, param.optimalMin, param.optimalMax);
        return (
          <View key={index} style={styles.comparisonRow}>
            <Text style={[styles.comparisonCell, { flex: 2 }]}>{param.name}</Text>
            <Text style={[styles.comparisonCell, { flex: 1 }]}>{param.yourValue} {param.unit ? `(${param.unit})` : ''}</Text>
            <Text style={[styles.comparisonCell, { flex: 1 }]}>{param.optimalMin}-{param.optimalMax}</Text>
            <Text style={[styles.comparisonCell, { flex: 1, color: status.color, fontWeight: '600' }]}>{status.text}</Text>
          </View>
        );
      })}
    </View>
  );

  const renderRecommendationCard = (crop: CropRecommendation, index: number) => (
    <View key={crop.id} style={styles.imageResultCard}>
      {/* Crop Image/Placeholder */}
      <Image
        source={getCropImageSource(crop.imagePlaceholder)}
        style={styles.cropImage}
        resizeMode="cover"
      />

      <View style={styles.resultDetailsContainer}>
        {/* Rank and Name */}
        <View style={styles.rankContainer}>
          <Text style={styles.cropRank}>TOP #{index + 1}</Text>
          <Text style={styles.cropName}>{crop.name}</Text>
        </View>

        {/* Progress Bar for Match Score */}
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${crop.matchScore}%` }]}>
              <Text style={styles.progressBarText}>{crop.matchScore}% Match</Text>
            </View>
          </View>
        </View>
        
        {/* Action Button */}
        <TouchableOpacity style={styles.viewDetailButton}>
          <Text style={styles.viewDetailButtonText}>View Details</Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#2E7D32" style={{marginLeft: 5}}/>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Crop Recommendation</Text>
        <Text style={styles.subtitle}>Enter the parameters or fetch IoT data to get the best crop suggestion.</Text>
      </View>

      {/* --- EDIT FORM BUTTON (Visible only after results are shown) --- */}
      {results && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditForm}
          disabled={loading}
        >
          <MaterialCommunityIcons name="pencil" size={18} color="#2E7D32" style={{marginRight: 8}}/>
          <Text style={styles.editButtonText}>Edit Parameters / Re-analyze</Text>
        </TouchableOpacity>
      )}

      {/* --- Input Section (Conditionally Rendered) --- */}
      {showForm && (
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Required Soil & Environment Parameters</Text>
          
          {/* Input Fields */}
          <View style={{marginTop: 15}}>
            {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'Enter N level (kg/ha)', 'atom-variant', true)}
            {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'Enter P level (kg/ha)', 'atom-variant', true)}
            {renderInputCard('Potassium (K)', potassium, setPotassium, 'Enter K level (kg/ha)', 'atom-variant', true)}
            {renderInputCard('pH Level', ph, setPh, 'Enter pH value (5.5 - 7.0)', 'water', true)}
            {renderInputCard('Temperature (°C)', temperature, setTemperature, 'Enter average temp (e.g., 28.5)', 'thermometer', true)}
            {renderInputCard('Rainfall (mm)', rainfall, setRainfall, 'Enter annual rainfall (e.g., 1100)', 'weather-rainy', true)}
          </View>

          {/* IoT Load Button (Placed below input fields) */}
          <TouchableOpacity 
            style={[styles.iotLoadButton, loading && { opacity: 0.6 }]} 
            onPress={fetchIotData}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.iotLoadButtonText}>Load Latest Data from IoT Device 📡</Text>
            )}
          </TouchableOpacity>
        
          {/* Predict Button */}
          <TouchableOpacity
            style={[styles.predictButton, loading && { opacity: 0.6 }]}
            onPress={handlePredict}
            disabled={loading}
          >
            <Text style={styles.predictButtonText}>
              {loading ? 'Analyzing...' : 'Get Crop Prediction'}
            </Text>
          </TouchableOpacity>
        </View>
      )}


      {/* --- Results Section (Conditionally Rendered) --- */}
      {results && (
        <View style={styles.resultsSection}>
          
          {/* 1. Recommended Crops */}
          <Text style={styles.sectionTitle}>Top Recommended Crops</Text>
          <View style={styles.resultsGrid}>
            {results.map(renderRecommendationCard)}
          </View>

          {/* 2. Soil Comparison */}
          {renderSoilComparison(getSoilComparisonData())}

        </View>
      )}
      
      {(!results && !loading && showForm) && (
        <Text style={{...styles.statusText, color: '#607D8B'}}>Fill the form or load IoT data to view personalized crop recommendations.</Text>
      )}
      
      {/* Space at the bottom */}
      <View style={{height: 50}}/> 

    </ScrollView>
  );
};

// --- Styles (Updated) ---
const styles = StyleSheet.create({
  // Theme Colors
  themeColor: { color: '#388E3C' }, 
  lightThemeColor: { color: '#4CAF50' }, 
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#607D8B', 
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 15,
    marginTop: 10,
  },

  // NEW EDIT BUTTON STYLE
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9', // Very light green
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A5D6A7', // Light border
  },
  editButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },


  // IoT Load Button 
  iotLoadButton: {
    backgroundColor: '#388E3C', 
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 6,
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iotLoadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Input Cards
  inputSection: {
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#757575', 
  },
  textInput: {
    paddingVertical: 4,
    fontSize: 16,
    color: '#263238',
  },

  // Predict Button 
  predictButton: {
    backgroundColor: '#2E7D32', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8, 
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  predictButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Results Section
  resultsSection: {
    marginBottom: 50,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  resultsGrid: {
    marginBottom: 20,
    gap: 15, 
  },

  // Recommendation Cards (Unchanged styles)
  imageResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 6, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, 
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0', 
  },
  cropImage: {
    width: width * 0.35, 
    height: 'auto',
    minHeight: 130,
  },
  resultDetailsContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  rankContainer: {
    marginBottom: 5,
  },
  cropRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  cropName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2E7D32',
  },
  progressBarWrapper: {
    paddingVertical: 5,
  },
  progressBarContainer: {
    height: 22,
    backgroundColor: '#E0E0E0',
    borderRadius: 11, 
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50', 
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  progressBarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', 
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  viewDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#E8F5E9',
  },
  viewDetailButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 14,
  },

  // Comparison Table (Unchanged styles)
  comparisonTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  comparisonHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#388E3C',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 5,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  comparisonHeaderText: {
    fontWeight: 'bold',
    color: '#388E3C',
    fontSize: 14,
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 5,
  },
  comparisonCell: {
    fontSize: 13,
    color: '#455A64',
    textAlign: 'center',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
});

export default CropRecommendation;