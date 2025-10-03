import { router } from 'expo-router';
import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Camera, CameraView } from 'expo-camera'; // Import both Camera and CameraView

const QRScannerScreen: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // 1. Camera Permission Request
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      // Use Camera (module) for permissions, not CameraView
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // 2. Handle Scanned QR Code
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;

    setScanned(true);

    Alert.alert(
      'Scan Complete',
      `Bar code of type ${type} with data ${data} has been scanned at ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST.`,
      [
        {
          text: 'Check Genuinity',
          onPress: () => router.back(),
        },
        {
          text: 'Scan Again',
          onPress: () => setScanned(false),
        },
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
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        facing="back"
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.focusBox} />
        <Text style={styles.overlayText}>Center the QR Code in the box</Text>
      </View>
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
  overlay: {
    flex: 1,
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
  },
});

export default QRScannerScreen;