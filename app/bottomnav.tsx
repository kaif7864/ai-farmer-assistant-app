import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomNav: FC = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" style={[styles.navIcon, styles.activeNavIcon]} />
        <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="options-outline" style={styles.navIcon} />
        <Text style={styles.navText}>Services</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="trophy" style={styles.navIcon} />
        <Text style={styles.navText}>Rewards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="ellipsis-horizontal-circle" style={styles.navIcon} />
        <Text style={styles.navText}>Others</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    height: 70,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: '#a5d6a7',
  },
  activeNavIcon: {
    color: '#2e7d32',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#a5d6a7',
  },
  activeNavText: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});

export default BottomNav;
