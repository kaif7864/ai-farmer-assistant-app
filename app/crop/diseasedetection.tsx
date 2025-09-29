import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'; // ImagePicker को इंपोर्ट किया गया है
import { router } from "expo-router";

const DiseaseDetection: FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // गैलरी से तस्वीर चुनने की अनुमति का अनुरोध करें
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // कैमरे का उपयोग करने की अनुमति का अनुरोध करें
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 Plant Disease Detection</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("upload")}
            style={[
              styles.tabButton,
              styles.tabLeft,
              activeTab === "upload" && styles.activeTab,
            ]}
          >
            <Text style={[styles.tabText, activeTab === "upload" && styles.activeTabText]}>
              Upload Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("form")}
            style={[
              styles.tabButton,
              styles.tabRight,
              activeTab === "form" && styles.activeTab,
            ]}
          >
            <Text style={[styles.tabText, activeTab === "form" && styles.activeTabText]}>
              Enter Data
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upload Image Section */}
        {activeTab === "upload" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Upload plant leaf image for detection
            </Text>
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
              {selectedImage && (
                <TouchableOpacity style={styles.detectButton} onPress={() => router.push("/crop/diseasedetail")}>
                  <Text style={styles.detectButtonText}>Detect Disease</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Form Section */}
        {activeTab === "form" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Enter plant symptoms manually
            </Text>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Leaf Color</Text>
                <TextInput
                  placeholder="e.g., Yellow, Brown"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Spots on Leaves</Text>
                <TextInput
                  placeholder="e.g., Black spots, White patches"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Other Symptoms</Text>
                <TextInput
                  multiline
                  placeholder="Describe the plant condition"
                  style={[styles.input, styles.textarea]}
                />
              </View>
              <TouchableOpacity style={styles.detectButton} onPress={() => router.push("/crop/diseasedetail")}>
                <Text style={styles.detectButtonText}>Detect Disease</Text>
              </TouchableOpacity>
            </View>
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  tabRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a5d6a7',
  },
  activeTabText: {
    color: '#fff',
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
  uploadBox: {
    borderWidth: 2,
    borderColor: '#a5d6a7',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    justifyContent: 'center',
    flex: 1,
    gap: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detectButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
  },
  detectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    // No additional styling needed for the container itself
  },
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
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default DiseaseDetection;
