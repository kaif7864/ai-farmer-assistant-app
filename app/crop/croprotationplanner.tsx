// CropRotationPlanner.tsx

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock Data (Replace with your actual lists)
const MOCK_PAST_CROPS = [
    'Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Lentil'
];

// --- Component ---
const CropRotationPlanner: FC = () => {
    // --- Past Crop History State ---
    const [pastCrop, setPastCrop] = useState<string>(''); // Last crop grown
    
    // --- Soil Data States ---
    const [nitrogen, setNitrogen] = useState<string>('');
    const [phosphorus, setPhosphorus] = useState<string>('');
    const [potassium, setPotassium] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [nextCropRecommendation, setNextCropRecommendation] = useState<string | null>(null);

    const handlePlanRotation = () => {
        // 1. Validation Check
        if (!pastCrop || !nitrogen || !phosphorus || !potassium) {
            Alert.alert('Error', 'Please select the past crop and fill all soil nutrient details.');
            return;
        }

        // 2. Data Conversion and Validation
        const N = parseFloat(nitrogen);
        const P = parseFloat(phosphorus);
        const K = parseFloat(potassium);

        if (isNaN(N) || isNaN(P) || isNaN(K)) {
            Alert.alert('Error', 'Please enter valid numerical values for NPK.');
            return;
        }

        setLoading(true);
        setNextCropRecommendation(null);

        // 3. Mock Prediction Logic (Rule + ML Hybrid Simulation)
        setTimeout(() => {
            let recommendedCrop = 'Maize (High Yielding)'; // Default recommendation

            // Rule-based logic (e.g., Don't plant same crop, follow legumes after cereals)
            if (pastCrop === 'Paddy' || pastCrop === 'Wheat') {
                // After cereals, suggest a legume (nitrogen fixer)
                recommendedCrop = 'Lentil (Nitrogen Fixer)'; 
            } else if (pastCrop === 'Lentil') {
                // After legume, suggest a high-nutrient demanding crop
                recommendedCrop = 'Sugarcane';
            }

            // ML/NPK adjustment (Hybrid)
            if (K < 15) {
                 // If Potassium is low, recommend a crop that demands less K or a K-rich fertilizer
                 recommendedCrop += ' + (Needs Potash Supplement)';
            }
            
            setNextCropRecommendation(recommendedCrop);
            setLoading(false);
        }, 1800); 
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
                <Text style={styles.title}>Crop Rotation Planner</Text>
                <Text style={styles.subtitle}>Plan your next crop for better soil health and maximum yield.</Text>
            </View>

            {/* --- 1. Past Crop History Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Ionicons name="reload-circle-outline" size={18} /> Last Crop Grown</Text>
                <View style={styles.cropPillContainer}>
                    {MOCK_PAST_CROPS.map((crop, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.cropPill, 
                                pastCrop === crop ? styles.cropPillActive : styles.cropPillInactive
                            ]}
                            onPress={() => setPastCrop(crop)}
                        >
                            <Text style={[
                                styles.cropPillText, 
                                pastCrop === crop ? styles.cropPillTextActive : styles.cropPillTextInactive
                            ]}>
                                {crop}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.selectedCropText}>Selected Past Crop: {pastCrop || 'None'}</Text>
            </View>


            {/* --- 2. Soil Nutrient Section --- */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><MaterialCommunityIcons name="seed-outline" size={18} /> Current Soil Nutrients</Text>
                {renderInputCard('Nitrogen (N)', nitrogen, setNitrogen, 'atom-variant', 'e.g., 50')}
                {renderInputCard('Phosphorus (P)', phosphorus, setPhosphorus, 'atom-variant', 'e.g., 28')}
                {renderInputCard('Potassium (K)', potassium, setPotassium, 'atom-variant', 'e.g., 22')}
            </View>

            {/* --- Plan Button --- */}
            <TouchableOpacity
                style={[styles.planButton, loading && styles.planButtonDisabled]}
                onPress={handlePlanRotation}
                disabled={loading}
            >
                <Text style={styles.planButtonText}>
                    {loading ? 'Analyzing Rotation...' : 'Plan Next Crop Rotation'}
                </Text>
            </TouchableOpacity>

            {/* --- Results Section --- */}
            <View style={styles.resultsSection}>
                {loading && (
                    <Text style={styles.statusText}>🔄 Running Hybrid Model... Please wait.</Text>
                )}

                {nextCropRecommendation !== null && !loading && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Next Recommended Crop:</Text>
                        <Text style={styles.resultCropName}>{nextCropRecommendation}</Text>
                        <Text style={styles.resultNote}>
                            This crop helps maintain soil balance after growing **{pastCrop}**.
                        </Text>
                    </View>
                )}
                
                {nextCropRecommendation === null && !loading && (
                    <Text style={{...styles.statusText, color: '#607D8B'}}>
                        Select past crop and enter NPK values to plan rotation.
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
        backgroundColor: '#FAFAFA', 
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
    // NPK Input Styles
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
    // Crop Pill Styles
    cropPillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    cropPill: {
        paddingHorizontal: 12,
        paddingVertical: 8,
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
        marginTop: 5,
        paddingLeft: 5,
        fontWeight: '500',
    },
    // Button Styles
    planButton: {
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
    planButtonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    planButtonText: {
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
    resultCropName: {
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

export default CropRotationPlanner;