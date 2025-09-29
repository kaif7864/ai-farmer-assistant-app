import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";

// Mock IoT Data 
const mockIotData = {
  N: 85, 
  P: 42, 
  K: 35, 
  pH: 6.2,
  temperature: 28.5, 
  rainfall: 1100,
};

const SoilInputForm: FC = () => {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [ph, setPh] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  
  const [loading, setLoading] = useState(false);

  // --- Renderer for single input field ---
  const renderInputCard = (label: string, value: string, setValue: (v: string) => void, placeholder: string, icon: string) => (
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
          keyboardType={'numeric'}
        />
      </View>
    </View>
  );

  // --- Function to fetch/load IoT data ---
  const fetchIotData = () => {
    setLoading(true);

    setTimeout(() => {
      setNitrogen(String(mockIotData.N));
      setPhosphorus(String(mockIotData.P));
      setPotassium(String(mockIotData.K));
      setPh(String(mockIotData.pH));
      setTemperature(String(mockIotData.temperature));
      setRainfall(String(mockIotData.rainfall));
      
      setLoading(false);
      Alert.alert('Success', 'IoT data successfully loaded and filled.');
    }, 1500); 
  };

  const handlePredict = () => {
    // Validation
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature || !rainfall) {
      Alert.alert('Error', 'Please fill all parameters.');
      return;
    }
    
    // Data Object ready for Navigation
    const params = {
      nitrogen,
      phosphorus,
      potassium,
      ph,
      temperature,
      rainfall,
    };

    // Navigate to the results page, passing parameters via query string
    // NOTE: Ensure your file structure matches the path: /soil/CropRecommendation
    router.push({
      pathname: "/soil/soilrecommendetion", 
      params: params 
    });
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Crop Recommendation</Text>
        <Text style={styles.subtitle}>Enter the parameters or fetch IoT data to get the best crop suggestion.</Text>
      </View>
      
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Required Soil & Environment Parameters</Text>
        
        <View style={{marginTop: 15}}>
          {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'Enter N level (kg/ha)', 'atom-variant')}
          {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'Enter P level (kg/ha)', 'atom-variant')}
          {renderInputCard('Potassium (K)', potassium, setPotassium, 'Enter K level (kg/ha)', 'atom-variant')}
          {renderInputCard('pH Level', ph, setPh, 'Enter pH value (5.5 - 7.0)', 'water')}
          {renderInputCard('Temperature (°C)', temperature, setTemperature, 'Enter average temp (e.g., 28.5)', 'thermometer')}
          {renderInputCard('Rainfall (mm)', rainfall, setRainfall, 'Enter annual rainfall (e.g., 1100)', 'weather-rainy')}
        </View>

        {/* IoT Load Button */}
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
      
        {/* Predict Button: Triggers Navigation */}
        <TouchableOpacity
          style={[styles.predictButton, loading && { opacity: 0.6 }]}
          onPress={handlePredict}
          disabled={loading}
        >
          <Text style={styles.predictButtonText}>
            {'Get Crop Prediction'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={{height: 50}}/> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  themeColor: { color: '#388E3C' }, 
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
});

export default SoilInputForm;