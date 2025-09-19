import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";

const handleCropProtection = () => {
  router.push("/cropprotection");
};

const ProductGrid: FC = () => {
  return (
    <View style={styles.productsGrid}>
      <TouchableOpacity style={styles.productItem}>
        <Ionicons name="cart" style={styles.productIcon} />
        <Text style={styles.productText}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.productItem}>
        <MaterialCommunityIcons name="seedling" style={styles.productIcon} />
        <Text style={styles.productText}>Hybrid Seeds</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.productItem} onPress={handleCropProtection}>
        <Ionicons name="leaf" style={styles.productIcon} />
        <Text style={styles.productText}>Crop Protection</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.productItem} onPress={() => router.push("/genuinitycheck")}>
        <Ionicons name="qr-code" style={styles.productIcon} />
        <Text style={styles.productText} >Genuinity Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', // यह आइकन और टेक्स्ट को लंबवत (vertically) केंद्र में लाता है।
    marginBottom: 15,
    width: '48%',
    aspectRatio: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productIcon: {
    fontSize: 45,
    marginBottom: 10,
    color: '#1a5223', // आइकन का रंग गहरा हरा किया गया है।
  },
  productText: {
    textAlign: 'center', // यह टेक्स्ट को क्षैतिज (horizontally) केंद्र में लाता है।
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ProductGrid;