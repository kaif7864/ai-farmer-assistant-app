// SeedVarietyRecommendation.tsx

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock Data (Replace with your actual lists)
const MOCK_REGIONS = [
    'North India (Plains)', 'South India (Coastal)', 'Central India (Plateau)', 
    'Western India (Arid)', 'Himalayan Region'
];

// --- Component ---
const SeedVarietyRecommendation: FC = () => {
    // --- Soil Data States ---
    const [nitrogen, setNitrogen] = useState<string>('');
    const [phosphorus, setPhosphorus] = useState<string>('');
    const [potassium, setPotassium] = useState<string>('');
    
    // --- Weather Data States ---
    const [ph, setPh] = useState<string>('');
    const [avgTemperature, setAvgTemperature] = useState<string>('');
    
    // --- Region State ---
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [recommendedVariety, setRecommendedVariety] = useState<string | null>(null);

    const handleRecommend = () => {
        // 1. Validation Check
        if (!nitrogen || !phosphorus || !potassium || !ph || !avgTemperature || !selectedRegion) {
            Alert.alert('Error', 'Please fill all soil, weather, and region details.');
            return;
        }

        // 2. Data Conversion and Validation
        const N = parseFloat(nitrogen);
        const P = parseFloat(phosphorus);
        const K = parseFloat(potassium);
        const pHValue = parseFloat(ph);
        const Temp = parseFloat(avgTemperature);

        if (isNaN(N) || isNaN(P) || isNaN(K) || isNaN(pHValue) || isNaN(Temp)) {
            Alert.alert('Error', 'Please enter valid numerical values.');
            return;
        }

        setLoading(true);
        setRecommendedVariety(null);

        // 3. Mock Prediction Logic (XGBoost/Neural Net Simulation)
        setTimeout(() => {
            let variety = 'Wheat - High-Yield Hybrid (Suitable for Plains)'; 

            // Region-based logic
            if (selectedRegion.includes('Himalayan')) {
                variety = 'Paddy - Cold Resistant Variety (e.g., Katrain Basmati)';
            } else if (selectedRegion.includes('Arid')) {
                variety = 'Millet - Drought Tolerant Variety (e.g., Bajra)';
            } else if (pHValue < 5.5) {
                // Soil-based adjustment
                variety = 'Rice - Acidic Soil Tolerant Variety';
            } else if (Temp > 35) {
                // Temperature-based adjustment
                 variety = 'Maize - Heat Stress Tolerant Variety';
            }
            
            setRecommendedVariety(variety);
            setLoading(false);
        }, 2000); // 2 seconds delay
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
                <Text style={styles.title}>Seed Variety Recommendation</Text>
                <Text style={styles.subtitle}>Find the best seed variety for your specific region and conditions.</Text>
            </View>

            {/* --- 1. Region Selection Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Ionicons name="location-outline" size={18} /> Select Farming Region</Text>
                <View style={styles.regionPillContainer}>
                    {MOCK_REGIONS.map((region, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.regionPill, 
                                selectedRegion === region ? styles.regionPillActive : styles.regionPillInactive
                            ]}
                            onPress={() => setSelectedRegion(region)}
                        >
                            <Text style={[
                                styles.regionPillText, 
                                selectedRegion === region ? styles.regionPillTextActive : styles.regionPillTextInactive
                            ]}>
                                {region.split('(')[0].trim()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                 <Text style={styles.selectedRegionText}>Selected Region: {selectedRegion || 'None Selected'}</Text>
            </View>

            {/* --- 2. Soil & Weather Data Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><MaterialCommunityIcons name="shovel" size={18} /> Soil & Weather Inputs</Text>
                {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'atom-variant', 'e.g., 50 (mg/kg)')}
                {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'atom-variant', 'e.g., 28 (mg/kg)')}
                {renderInputCard('Potassium (K)', potassium, setPotassium, 'atom-variant', 'e.g., 22 (mg/kg)')}
                {renderInputCard('pH Value', ph, setPh, 'beaker-outline', 'e.g., 6.5')}
                {renderInputCard('Avg. Temperature (°C)', avgTemperature, setAvgTemperature, 'temperature-celsius', 'e.g., 28')}
            </View>

            {/* --- Recommend Button --- */}
            <TouchableOpacity
                style={[styles.recommendButton, loading && styles.recommendButtonDisabled]}
                onPress={handleRecommend}
                disabled={loading}
            >
                <Text style={styles.recommendButtonText}>
                    {loading ? 'Analyzing...' : 'Recommend Best Seed Variety'}
                </Text>
            </TouchableOpacity>

            {/* --- Results Section --- */}
            <View style={styles.resultsSection}>
                {loading && (
                    <Text style={styles.statusText}>🧠 Running Neural Network... Please wait.</Text>
                )}

                {recommendedVariety !== null && !loading && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Top Recommended Seed Variety:</Text>
                        <Text style={styles.resultVarietyName}>{recommendedVariety}</Text>
                        <Text style={styles.resultNote}>
                            This variety is best suited for the **{selectedRegion.split('(')[0].trim()}** region's conditions.
                        </Text>
                    </View>
                )}
                
                {recommendedVariety === null && !loading && (
                    <Text style={{...styles.statusText, color: '#607D8B'}}>
                        Fill all details to get the expert seed recommendation.
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
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#388E3C',
        marginBottom: 10,
        paddingLeft: 5,
    },
    // Input Styles
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
    // Region Pill Styles
    regionPillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    regionPill: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    regionPillInactive: {
        backgroundColor: '#E8F5E9',
        borderColor: '#A5D6A7',
    },
    regionPillActive: {
        backgroundColor: '#388E3C',
        borderColor: '#2E7D32',
    },
    regionPillText: {
        fontSize: 14,
        fontWeight: '500',
    },
    regionPillTextInactive: {
        color: '#2E7D32',
    },
    regionPillTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    selectedRegionText: {
        fontSize: 14,
        color: '#455A64',
        marginTop: 5,
        paddingLeft: 5,
        fontWeight: '500',
    },
    // Button Styles
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
    // Results Styles
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
        borderLeftWidth: 5,
        borderLeftColor: '#388E3C',
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
        marginBottom: 10,
    },
    resultVarietyName: {
        fontSize: 26,
        fontWeight: '900',
        color: '#2E7D32',
        textAlign: 'center',
        marginBottom: 10,
    },
    resultNote: {
        fontSize: 13,
        color: '#607D8B',
        textAlign: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#CFD8DC',
        paddingTop: 10,
        width: '100%',
    }
});

export default SeedVarietyRecommendation;