import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';

interface ServiceItemProps {
  icon: string;
  name: string;
  description: string;
  onPress: () => void;
}

const ServiceItem: FC<ServiceItemProps> = ({ icon, name, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={30} color="#2e7d32" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.serviceName}>{name}</Text>
        <Text style={styles.serviceDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Service: FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services</Text>
      </View>
      <ScrollView contentContainerStyle={styles.serviceList}>
        <Text style={styles.pageTitle}>Explore Our Services</Text>

        {/* Soil Health page ko redirect karega */}
        <ServiceItem
          icon="leaf-outline"
          name="Soil Health"
          description="Analyze your soil's health and get personalized recommendations."
          onPress={() => router.push("/soildetection")}
        />

        {/* Mandi Prices page ko redirect karega */}
        <ServiceItem
          icon="cash-outline"
          name="Mandi Prices"
          description="Check live market prices for your crops across various mandis."
          onPress={() => router.push("/mandiprice")}
        />

        {/* Crop Protection page ko redirect karega */}
        <ServiceItem
          icon="bug-outline"
          name="Crop Protection"
          description="Identify and find solutions for common crop pests and diseases."
          onPress={() => router.push("/cropprotection")}
        />

        {/* AI Chatbot page ko redirect karega */}
        <ServiceItem
          icon="chatbubbles-outline"
          name="AI Chatbot"
          description="Get instant answers and advice from our AI agricultural expert."
          onPress={() => router.push("/aichatbot")}
        />

        {/* Disease Detection page ko redirect karega */}
        <ServiceItem
          icon="scan-circle-outline"
          name="Disease Detection"
          description="Upload a photo to instantly detect plant diseases."
          onPress={() => router.push("/diseasedetection")}
        />
        
        {/* Other Services page ko redirect karega (agar aisi file hai) */}
        <ServiceItem
          icon="grid-outline"
          name="Other Services"
          description="Explore more tools and services to boost your farming."
          onPress={() => router.push("/")}
        />
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
    paddingTop: 25,
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  backButtonHeader: {
    position: 'absolute',
    left: 15,
    top: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  serviceList: {
    padding: 15,
    alignItems: 'center',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default Service;