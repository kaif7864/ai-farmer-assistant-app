import React, { FC, useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  ScrollView, Image, Alert 
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const DiseaseDetection: FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Select image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need gallery access to pick images");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Take photo from camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need camera access to take pictures");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 Plant Disease Detection</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("upload")}
            style={[styles.tabButton, activeTab === "upload" && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === "upload" && styles.activeTabText]}>
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upload Image Section */}
        {activeTab === "upload" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upload plant leaf image</Text>
            <View style={styles.uploadBox}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={60} color="#a5d6a7" />
                  <Text style={styles.uploadText}>Tap to select an image</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                      <Ionicons name="camera-outline" size={20} color="#fff" />
                      <Text style={styles.uploadButtonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                      <Ionicons name="image-outline" size={20} color="#fff" />
                      <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Styles (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ebf4ea" },
  header: { backgroundColor: "#8bc34a", paddingVertical: 20, paddingTop: 50, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  content: { flex: 1, padding: 15 },
  tabContainer: { flexDirection: "row", marginBottom: 20, borderRadius: 10, overflow: "hidden", backgroundColor: "#fff" },
  tabButton: { flex: 1, padding: 12, alignItems: "center" },
  activeTab: { backgroundColor: "#2e7d32" },
  tabText: { fontSize: 16, fontWeight: "bold", color: "#a5d6a7" },
  activeTabText: { color: "#fff" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 20, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#2e7d32", marginBottom: 15, textAlign: "center" },
  uploadBox: { borderWidth: 2, borderColor: "#a5d6a7", borderStyle: "dashed", borderRadius: 10, padding: 20, alignItems: "center" },
  uploadText: { fontSize: 16, color: "#555", marginTop: 10, marginBottom: 20 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", gap: 10 },
  uploadButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#2e7d32", padding: 10, borderRadius: 50, flex: 1, justifyContent: "center", gap: 5 },
  uploadButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  selectedImage: { width: "100%", height: 200, borderRadius: 10, resizeMode: "contain" },
});

export default DiseaseDetection;
