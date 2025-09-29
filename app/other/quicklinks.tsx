import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Quick Link Data Structure
interface QuickLink {
  icon: string;
  name: string;
  route: string;
  color: string; // Background color for the link button
}

// 5 Most Important, Direct Links (Fertilizer link सहित)
const QUICK_LINKS: QuickLink[] = [
  {
    icon: "chatbubbles-outline",
    name: "AI Chat",
    route: "/aichatbot",
    color: "#00bfa5", // Teal
  },
  {
    icon: "leaf-outline",
    name: "Soil Check",
    route: "/soil/soildetection",
    color: "#689f38", // Green
  },
  {
    icon: "scan-circle-outline",
    name: "Detect Disease",
    route: "/crop/diseasedetection",
    color: "#fbc02d", // Yellow
  },
  {
    icon: "cash-outline",
    name: "Mandi Prices",
    route: "/crop/mandiprice",
    color: "#455a64", // Blue Gray
  },
  {
    icon: "water-outline", 
    name: "Fertilizer",
    route: "/crop/fertilizer",
    color: "#1e88e5", // Blue
  },
];

const QuickLinks: FC = () => {
  const router = useRouter();

  const handlePress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/* Centered Heading */}
      <Text style={styles.sectionTitle}>🔗 Quick Services</Text>
      <View style={styles.gridContainer}>
        
        {QUICK_LINKS.map((link, index) => (
          <TouchableOpacity 
            key={index} 
            // Setting the width and background color
            style={[styles.linkButton, { backgroundColor: link.color }]}
            onPress={() => handlePress(link.route)}
          >
            <Ionicons name={link.icon} size={35} color="#fff" />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  // Style for the Centered Heading
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700', 
    color: '#2e7d32', 
    marginBottom: 15,
    textAlign: 'center', // Center the text
  },
  // Flex container for the 2-column grid (RESTORED)
  gridContainer: {
    flexDirection: 'row', // Horizontal alignment
    flexWrap: 'wrap', // Wrap to next row
    justifyContent: 'space-between', // Space between the two columns
    paddingHorizontal: 0, 
  },
  linkButton: {
    // Calculate width for 2 items with spacing (RESTORED)
    width: '48%', 
    height: 120, // Taller card size
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Vertical spacing
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  linkText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default QuickLinks;
