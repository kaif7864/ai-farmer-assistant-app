import { BarCodeScanner } from 'expo-barcode-scanner';
import { router } from 'expo-router';
import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const QRScannerScreen: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // 1. Camera Permission Request
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      // कैमरा एक्सेस की अनुमति मांगें
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // 2. Handle Scanned QR Code
  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    // यदि पहले से स्कैन नहीं हुआ है, तो ही आगे बढ़ें
    if (scanned) return; 

    setScanned(true);
    
    // यहाँ QR कोड डेटा (data) को सर्वर पर भेजकर Genuinity Check का Logic आएगा
    Alert.alert(
      'Scan Complete',
      `Bar code of type ${type} with data ${data} has been scanned.`,
      [
        { 
          text: 'Check Genuinity', 
          onPress: () => {
            // स्कैन के बाद वापस जाएं
            router.back(); 
          }
        },
        { 
          text: 'Scan Again', 
          onPress: () => setScanned(false) // स्कैनिंग रीसेट करें
        }
      ]
    );
  };

  // 3. Permission Status Check
  if (hasPermission === null) {
    return <View style={styles.permissionContainer}><Text style={styles.permissionText}>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionErrorText}>No access to camera. Please enable it in settings.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 4. Scanner View
  return (
    <View style={styles.container}>
      {/* BarCodeScanner पूरी स्क्रीन को कवर करता है */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay for focus */}
      <View style={styles.overlay}>
        <View style={styles.focusBox} />
        <Text style={styles.overlayText}>Center the QR Code in the box</Text>
      </View>

      {/* Custom Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButtonOverlay}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    color: '#8bc34a',
  },
  permissionErrorText: {
    fontSize: 18,
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#8bc34a',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Overlay Styles
  overlay: {
    flex: 1,
    // यह महत्वपूर्ण है कि background transparent हो ताकि कैमरा फीड दिख सके
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#8bc34a',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  overlayText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
  }
});

export default QRScannerScreen;
