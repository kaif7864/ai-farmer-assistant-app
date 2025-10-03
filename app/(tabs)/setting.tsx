import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ESP32_IP = "http://192.168.1.100"; // <-- apna ESP32 ka IP address dalna

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifications, setIsNotifications] = useState(true);
  const [isMotorOn, setIsMotorOn] = useState(false);

  // 🚀 Motor toggle function (ESP32 call)
  const API_URL = "http://192.168.1.19:8000"; // FastAPI server ka IP

// Motor control via FastAPI
const toggleMotor = async (val: boolean) => {
  try {
    const url = `${API_URL}/iot/pump/${val ? "start" : "stop"}`;
    const response = await fetch(url, { method: "POST" });
    const json = await response.json();

    if (json.status === "success") {
      setIsMotorOn(val);
      Alert.alert("✅ Success", val ? "Motor Turned ON" : "Motor Turned OFF");
    } else {
      throw new Error(json.message);
    }
  } catch (error) {
    Alert.alert("❌ Error", "Failed to connect FastAPI");
    console.error(error);
    setIsMotorOn(!val); // rollback toggle
  }
};

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150", // Dummy profile image
          }}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@gmail.com</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={(val) => setIsDarkMode(val)}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Notifications</Text>
          <Switch
            value={isNotifications}
            onValueChange={(val) => setIsNotifications(val)}
          />
        </View>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Motor Control Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motor Control</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>
            Motor Status: {isMotorOn ? "ON" : "OFF"}
          </Text>
          <Switch
            value={isMotorOn}
            onValueChange={(val) => toggleMotor(val)}
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
  },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
