import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GenuinityCheck: FC = () => {
  const router = useRouter();

  const handleScan = () => {
    // IMPORTANT: Expo Router convention के अनुसार छोटे अक्षरों में (lowercase) रूट का उपयोग करें
    // यह मानते हुए कि QRScannerScreen.tsx, GenuinityCheck.tsx के समान 'other' फ़ोल्डर में है।
    router.push('/other/qrscannerscreen'); 
    console.log("Navigating to QR Code Scanner.");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Genuinity Check</Text>
      </View>

      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name="qrcode-scan" size={100} color="#2e7d32" style={styles.icon} />
        <Text style={styles.mainText}>
          Scan the QR code on the product to verify its authenticity.
        </Text>
        <Text style={styles.descriptionText}>
          यह सुनिश्चित करने के लिए कि आपका उत्पाद असली है, पैकेट पर दिए गए QR कोड को स्कैन करें।
        </Text>

        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
          <Ionicons name="camera-outline" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8bc34a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default GenuinityCheck;
