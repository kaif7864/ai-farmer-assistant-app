// DiseaseDetails.tsx
import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data (आपके इमेज के अनुसार)
const diseaseData = {
  name: "Leaf Spot Disease (पत्ती धब्बा रोग)",
  severity: "Medium",
  imageUri: "https://i.imgur.com/your-leaf-image-url.jpg", // ⚠️ इस URL को अपनी इमेज URL से बदलें
  description: "It is a common fungal disease that can severely harm the plant.",
  cause: "Usually caused by fungal pathogens (e.g., Alternaria, Cercospora). Favorable conditions are warm, wet, and humid weather. Spread occurs by water splash, wind, and contaminated tools.",
  symptoms: [
    "Small brown or black spots on leaves.",
    "Yellow halo surrounding spots.",
    "Premature leaf yellowing and defoliation.",
  ],
  treatment: [
    { step: 1, title: "Sanitation – remove infected tissue", detail: "Carefully remove and dispose (far off compost) heavily infected leaves and plant debris to reduce the source of spores." },
    { step: 2, title: "Improve microclimate", detail: "Increase spacing between plants, prune lower leaves, and improve airflow on leaf surfaces dry faster after rain or irrigation." },
    { step: 3, title: "Change watering practices", detail: "Avoid overhead watering that wets the foliage. Use drip irrigation or water at the base early in the morning." },
    { step: 4, title: "Apply appropriate fungicide", detail: "Use copper-based fungicide or a registered product for your crop – follow dose rates and rotate modes of action to avoid resistance." },
    { step: 5, title: "Monitor and repeat", detail: "Inspect regularly, re-treat according to product label and remove new infected tissue promptly." },
  ],
  prevention: [
    "Rotate crops to non-host plants",
    "Use disease-resistant seeds/varieties when available.",
    "Seed and seedling health: buy verified seed.",
    "Sanitize tools between plants.",
  ]
};

// --- Component ---
const DiseaseDetails: FC = () => {
  
  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return { backgroundColor: '#F44336', color: '#FFFFFF' }; // Red
      case 'medium': return { backgroundColor: '#FFC900', color: '#333333' }; // Yellow/Amber
      case 'low': return { backgroundColor: '#4CAF50', color: '#FFFFFF' }; // Green
      default: return { backgroundColor: '#B0BEC5', color: '#333333' };
    }
  };

  const severityStyle = getSeverityStyle(diseaseData.severity);

  const renderTreatmentStep = (item: typeof diseaseData.treatment[0]) => (
    <View key={item.step} style={styles.treatmentStep}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumberContainer}>
          <Text style={styles.stepNumber}>{item.step}</Text>
        </View>
        <Text style={styles.stepTitle}>{item.title}</Text>
      </View>
      <Text style={styles.stepDetail}>{item.detail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Disease Title and Severity */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{diseaseData.name}</Text>
          <View style={[styles.severityTag, { backgroundColor: severityStyle.backgroundColor }]}>
            <Text style={[styles.severityText, { color: severityStyle.color }]}>Severity: {diseaseData.severity}</Text>
          </View>
        </View>

        {/* Image Card */}
        <View style={styles.imageCard}>
          <Image 
            source={{ uri: diseaseData.imageUri }} 
            style={styles.leafImage} 
            accessibilityLabel="Image of infected leaf"
          />
          <Text style={styles.imageCaption}>AI-Detected Sample</Text>
        </View>

        {/* Cause, Symptoms, and Treatment Section */}
        <View style={styles.detailSection}>

          {/* Cause */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cause</Text>
            <Text style={styles.sectionDetail}>{diseaseData.cause}</Text>
          </View>

          {/* Symptoms */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            {diseaseData.symptoms.map((symptom, index) => (
              <View key={index} style={styles.listItem}>
                <MaterialCommunityIcons name="circle-small" size={20} color="#388E3C" />
                <Text style={styles.listItemText}>{symptom}</Text>
              </View>
            ))}
          </View>

          {/* Treatment Steps */}
          <View style={styles.treatmentCard}>
            <Text style={styles.sectionTitle}>Treatment - Step by Step</Text>
            {diseaseData.treatment.map(renderTreatmentStep)}
          </View>

          {/* Prevention */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Prevention</Text>
            {diseaseData.prevention.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="shield-checkmark" size={16} color="#388E3C" />
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

// --- Styles (Matching the Green/Clean Theme) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light background
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E7D32', // Deep Green
    flexShrink: 1, // Allows text to wrap
    marginRight: 10,
  },
  severityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: 90,
    alignItems: 'center',
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leafImage: {
    width: '100%',
    height: 180, 
    borderRadius: 10,
    resizeMode: 'contain',
  },
  imageCaption: {
    marginTop: 10,
    fontSize: 12,
    color: '#607D8B',
  },
  detailSection: {
    gap: 15, // Space between different detail cards
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  treatmentCard: {
    backgroundColor: '#E8F5E9', // Light Green background for Treatment
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#388E3C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C', // Primary Green
    marginBottom: 10,
  },
  sectionDetail: {
    fontSize: 14,
    lineHeight: 22,
    color: '#455A64',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  listItemText: {
    fontSize: 14,
    color: '#455A64',
    marginLeft: 5,
    flexShrink: 1,
  },
  // Treatment Specific Styles
  treatmentStep: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  stepNumberContainer: {
    backgroundColor: '#388E3C',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    flexShrink: 1,
  },
  stepDetail: {
    fontSize: 13,
    color: '#455A64',
    marginLeft: 28, // Aligns detail text with the title text
    marginTop: 2,
  },
});

export default DiseaseDetails;