// YieldPrediction.tsx

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock Data (Replace with your actual lists)
const MOCK_CROP_VARIETIES = [
    'Wheat - HD2967', 'Paddy - Pusa 1121', 'Maize - Hybrid Pioneer', 'Mustard - Pusa Bold'
];

// --- Component ---
const YieldPrediction: FC = () => {
    // --- Soil Data States (from previous step) ---
    const [nitrogen, setNitrogen] = useState<string>('');
    const [phosphorus, setPhosphorus] = useState<string>('');
    const [potassium, setPotassium] = useState<string>('');
    
    // --- Weather Data States ---
    const [avgRainfall, setAvgRainfall] = useState<string>('');
    const [avgTemperature, setAvgTemperature] = useState<string>('');
    
    // --- Crop Data States ---
    const [cropVariety, setCropVariety] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [predictedYield, setPredictedYield] = useState<number | null>(null);

    const handlePredict = () => {
        // 1. Validation Check
        if (!nitrogen || !phosphorus || !potassium || !avgRainfall || !avgTemperature || !cropVariety) {
            Alert.alert('Error', 'Please fill all soil, weather, and crop details.');
            return;
        }

        // 2. Data Conversion and Validation (Simplified for UI)
        const N = parseFloat(nitrogen);
        const P = parseFloat(phosphorus);
        const K = parseFloat(potassium);
        const Rain = parseFloat(avgRainfall);
        const Temp = parseFloat(avgTemperature);

        if (isNaN(N) || isNaN(P) || isNaN(K) || isNaN(Rain) || isNaN(Temp)) {
            Alert.alert('Error', 'Please enter valid numerical values.');
            return;
        }

        setLoading(true);
        setPredictedYield(null);

        // 3. Mock Prediction Logic (Replace this with your actual API call or ML model inference)
        setTimeout(() => {
            // Simplified Mock Regression: Higher NPK and ideal temp/rain give better yield.
            let mockYield = 3000; // Base Yield

            if (N > 50 && P > 30) mockYield += 500;
            if (Temp > 20 && Temp < 35) mockYield += 300;
            if (cropVariety.includes('Hybrid')) mockYield += 700;
            
            // Round the result
            const finalYield = Math.round(mockYield + Math.random() * 200); 

            setPredictedYield(finalYield);
            setLoading(false);
        }, 2000); // 2 seconds delay for better UX
    };

    const renderInputCard = (label: string, value: string, setValue: (v: string) => void, iconName: string, placeholder: string) => (
        <View style={styles.inputCard}>
            <MaterialCommunityIcons name={iconName} size={24} color="#388E3C" style={styles.inputIcon} />
            <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>{label}</Text>
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
                <Text style={styles.title}>Crop Yield Prediction</Text>
                <Text style={styles.subtitle}>Estimate the expected harvest yield (kg/ha) using machine learning.</Text>
            </View>

            {/* --- 1. Soil Data Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><MaterialCommunityIcons name="earth" size={18} /> Soil Nutrient Levels</Text>
                {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'atom-variant', 'e.g., 50 (mg/kg)')}
                {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'atom-variant', 'e.g., 28 (mg/kg)')}
                {renderInputCard('Potassium (K)', potassium, setPotassium, 'atom-variant', 'e.g., 22 (mg/kg)')}
            </View>

            {/* --- 2. Weather Data Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Ionicons name="cloud-outline" size={18} /> Weather Inputs</Text>
                {renderInputCard('Avg. Rainfall', avgRainfall, setAvgRainfall, 'weather-rainy', 'e.g., 1000 (mm)')}
                {renderInputCard('Avg. Temperature', avgTemperature, setAvgTemperature, 'temperature-celsius', 'e.g., 28 (°C)')}
            </View>

            {/* --- 3. Crop Variety Section (Simple Selector) --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Ionicons name="leaf-outline" size={18} /> Select Crop Variety</Text>
                <View style={styles.varietyContainer}>
                    {MOCK_CROP_VARIETIES.map((variety, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.varietyPill, 
                                cropVariety === variety ? styles.varietyPillActive : styles.varietyPillInactive
                            ]}
                            onPress={() => setCropVariety(variety)}
                        >
                            <Text style={[
                                styles.varietyPillText, 
                                cropVariety === variety ? styles.varietyPillTextActive : styles.varietyPillTextInactive
                            ]}>
                                {variety.split(' - ')[0]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                 <Text style={styles.selectedCropText}>Variety: {cropVariety || 'None Selected'}</Text>
            </View>

            {/* --- Predict Button --- */}
            <TouchableOpacity
                style={[styles.predictButton, loading && styles.predictButtonDisabled]}
                onPress={handlePredict}
                disabled={loading}
            >
                <Text style={styles.predictButtonText}>
                    {loading ? 'Predicting Yield...' : 'Predict Expected Yield'}
                </Text>
            </TouchableOpacity>

            {/* --- Results Section --- */}
            <View style={styles.resultsSection}>
                {loading && (
                    <Text style={styles.statusText}>⚙️ Running Regression Model... Please wait.</Text>
                )}

                {predictedYield !== null && !loading && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Expected Yield (Per Hectare):</Text>
                        <Text style={styles.resultYieldValue}>{predictedYield.toLocaleString()}</Text>
                        <Text style={styles.resultUnit}>kg / ha</Text>
                        <Text style={styles.resultNote}>
                            This is an AI-based forecast and may vary based on unforeseen field conditions.
                        </Text>
                    </View>
                )}
                
                {predictedYield === null && !loading && (
                    <Text style={{...styles.statusText, color: '#607D8B'}}>
                        Fill all inputs and press 'Predict Expected Yield'.
                    </Text>
                )}
            </View>

        </ScrollView>
    );
};

// --- Styles (Matching the attractive green/clean theme) ---
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
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#388E3C',
        marginBottom: 10,
        paddingLeft: 5,
    },
    inputCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
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
    varietyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    varietyPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    varietyPillInactive: {
        backgroundColor: '#E8F5E9',
        borderColor: '#A5D6A7',
    },
    varietyPillActive: {
        backgroundColor: '#388E3C',
        borderColor: '#2E7D32',
    },
    varietyPillText: {
        fontSize: 14,
        fontWeight: '500',
    },
    varietyPillTextInactive: {
        color: '#2E7D32',
    },
    varietyPillTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    selectedCropText: {
        fontSize: 14,
        color: '#455A64',
        marginTop: 5,
        paddingLeft: 5,
        fontWeight: '500',
    },
    predictButton: {
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
    predictButtonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    predictButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsSection: {
        marginBottom: 50,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#4CAF50',
    },
    resultCard: {
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        borderTopWidth: 5,
        borderTopColor: '#388E3C',
        marginTop: 10,
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    resultLabel: {
        fontSize: 16,
        color: '#455A64',
        marginBottom: 5,
    },
    resultYieldValue: {
        fontSize: 48,
        fontWeight: '900',
        color: '#2E7D32',
    },
    resultUnit: {
        fontSize: 18,
        fontWeight: '600',
        color: '#607D8B',
        marginBottom: 10,
    },
    resultNote: {
        fontSize: 12,
        color: '#607D8B',
        textAlign: 'center',
        marginTop: 10,
    }
});

export default YieldPrediction;