import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// 'router' के उपयोग के लिए इसे यहाँ इंपोर्ट करना अनिवार्य है।
import { router } from "expo-router"; 

// Data structure for product items including color and icons
interface ProductItem {
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
  // 'name' के टाइप को string रखा गया है ताकि वह किसी भी valid icon string को ले सके।
  iconName: string; 
  text: string;
  route: string;
  color: string;
}

// Define theme color for items
const PRODUCT_DATA: ProductItem[] = [
  {
    iconType: 'Ionicons',
    iconName: "cart",
    text: "Buy Products",
    route: "/market/buy", 
    color: '#FF6F61', // Coral Red - Represents market/commerce
  },
  {
    iconType: 'MaterialCommunityIcons',
    iconName: "seedling",
    text: "Seed Variety",
    route: '/other/seedvariety',
    color: '#8BC34A', // Light Green - Represents life/growth
  },
  {
    iconType: 'Ionicons',
    iconName: "leaf",
    text: "Crop Protection",
    route: "/crop/cropprotection",
    color: '#00BCD4', // Cyan - Represents water/protection/cleanliness
  },
  {
    iconType: 'Ionicons',
    iconName: "qr-code",
    text: "Genuinity Check",
    route: "/other/genuinitycheck",
    color: '#FFCA28', // Amber - Represents caution/verification/quality
  },
];

const ProductGrid: FC = () => {
  return (
    <View style={styles.productsGrid}>
      {PRODUCT_DATA.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.productItem, { backgroundColor: item.color }]} 
          // 'router.push' का उपयोग बिना किसी एरर के यहाँ सही है
          onPress={() => router.push(item.route)} 
        >
          {/* Dynamically render Ionicons or MaterialCommunityIcons */}
          {item.iconType === 'Ionicons' ? (
            // Type assertion हटाई गई और 'name' prop को सीधे string पास किया गया।
            <Ionicons name={item.iconName as string} style={styles.productIcon} />
          ) : (
            <MaterialCommunityIcons name={item.iconName as string} style={styles.productIcon} />
          )}
          <Text style={styles.productText}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5, // थोड़ी पैडिंग जोड़ी गई
  },
  productItem: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 15,
    width: '48%',
    aspectRatio: 1,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, 
    shadowRadius: 4,
  },
  productIcon: {
    fontSize: 45,
    marginBottom: 10,
    color: '#fff', // White color for contrast
    fontWeight: 'bold',
  },
  productText: {
    textAlign: 'center', 
    fontSize: 14,
    color: '#fff', // White color for contrast
    fontWeight: 'bold',
  },
});

export default ProductGrid;
