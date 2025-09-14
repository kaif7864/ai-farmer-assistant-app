import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SoilDetection: FC = () => {
  const [nitrogen, setNitrogen] = useState<string>('');
  const [phosphorus, setPhosphorus] = useState<string>('');
  const [potassium, setPotassium] = useState<string>('');
  const [ph, setPh] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [soilHealthResult, setSoilHealthResult] = useState<string | null>(null);

  const handleDetect = () => {
    // Check if all fields are filled
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature) {
      Alert.alert('Error', 'Please fill all parameters.');
      return;
    }

    // Dummy detection logic (replace with actual API call)
    const n = parseFloat(nitrogen);
    const p = parseFloat(phosphorus);
    const k = parseFloat(potassium);
    const phValue = parseFloat(ph);
    const temp = parseFloat(temperature);

    let result = '';
    if (n > 50 && p > 20 && k > 20 && phValue >= 6.0 && phValue <= 7.5) {
      result = 'Soil health is excellent!';
    } else if (n > 30 && p > 10 && k > 10) {
      result = 'Soil health is normal. Some improvements may be needed.';
    } else {
      result = 'Soil health requires improvement. Please consult an expert.';
    }

    setSoilHealthResult(result);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌿 Soil Health Detection</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Enter Soil Parameters</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nitrogen (N)</Text>
              <TextInput
                style={styles.input}
                placeholder="Value in mg/kg"
                keyboardType="numeric"
                value={nitrogen}
                onChangeText={setNitrogen}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phosphorus (P)</Text>
              <TextInput
                style={styles.input}
                placeholder="Value in mg/kg"
                keyboardType="numeric"
                value={phosphorus}
                onChangeText={setPhosphorus}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Potassium (K)</Text>
              <TextInput
                style={styles.input}
                placeholder="Value in mg/kg"
                keyboardType="numeric"
                value={potassium}
                onChangeText={setPotassium}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>pH Value</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 6.5"
                keyboardType="numeric"
                value={ph}
                onChangeText={setPh}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Temperature (°C)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 25"
                keyboardType="numeric"
                value={temperature}
                onChangeText={setTemperature}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.detectButton} onPress={handleDetect}>
            <Text style={styles.detectButtonText}>Detect Soil Health</Text>
          </TouchableOpacity>
        </View>

        {soilHealthResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultText}>{soilHealthResult}</Text>
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
  formContainer: {
    gap: 16,
  },
  inputGroup: {},
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
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
  detectButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  detectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SoilDetection;
