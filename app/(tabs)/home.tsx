import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { router, Stack } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../header';
import BottomNav from '../bottomnav';
import SideMenu from '../sidemenu';
import ProfileModal from '../profile';
import ProductGrid from '../Product';
import Service from './services'; // सर्विस कंपोनेंट को इम्पोर्ट करें

// Placeholder for a generic user profile image
const userProfilePlaceholder = 'https://i.ibb.co/6P6Xq4x/placeholder-profile.png';

const Home: FC = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleProfileVisible = () => {
    setProfileVisible(!isProfileVisible);
  };
  
  const toggleMenuVisible = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    router.push("/startscreen");
  };

  const handleweather = () => {
    setMenuVisible(false);
    router.push("/weather");
  };

  const handleChatbot = () => {
    router.push("/aichatbot");
  };

  return (
    <>
      {/* Header को छुपाने के लिए */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        {/* नए कंपोनेंट्स का उपयोग */}
        <Header 
          onMenuPress={toggleMenuVisible} 
          onProfilePress={toggleProfileVisible} 
        />

        {/* Main Content Area */}
        <ScrollView style={styles.content}>
          {/* Organic Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Organic</Text>
            <Text style={styles.cardDescription}>
              For this 50% off salvinia and 50% of cow dung flurry are mixed; 20% waste decomposer, a product of National Project on Organic Farming (NPOF), Ghaziabad, is mixed with 200 ml water
            </Text>
          </View>

          {/* Weather Card */}
          <TouchableOpacity onPress={handleweather}>
            <View style={[styles.card, styles.weatherCard]} >
              <View style={styles.weatherInfo} >
                <View style={styles.weatherLeft} >
                  <Text style={styles.weatherTitle} >Weather</Text>
                  <View style={styles.weatherTemp}>
                    <Ionicons name="cloudy" size={40} color="#2e7d32" />
                    <Text style={styles.weatherDegrees}>27°</Text>
                  </View>
                  <Text style={styles.weatherCondition}>Drizzle</Text>
                </View>
                <View style={styles.weatherRight}>
                  <Text style={styles.weatherCity}>Hyderabad</Text>
                  <Text style={styles.weatherDescription}>light intensity drizzle</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Products Section */}
          <Text style={styles.sectionTitle}>Products</Text>
          <ProductGrid />

          {/* Services Section */}
          <Text style={styles.sectionTitle}>Services</Text>
          <Service />
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={handleChatbot}>
          <Ionicons name="chatbubbles" style={styles.fabIcon} />
        </TouchableOpacity>
      </View>
      
      {/* नए कंपोनेंट्स का उपयोग */}
      <ProfileModal 
        isVisible={isProfileVisible} 
        onClose={toggleProfileVisible}
      />
      
      <SideMenu 
        isVisible={isMenuVisible} 
        onClose={toggleMenuVisible} 
        onLogout={handleLogout}
      />
      
      {/* <BottomNav /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf4ea',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
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
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  weatherCard: {
    backgroundColor: '#e8f5e9',
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherLeft: {
    alignItems: 'flex-start',
  },
  weatherTitle: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: 'bold',
  },
  weatherTemp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  weatherDegrees: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  weatherCondition: {
    fontSize: 14,
    color: '#555',
  },
  weatherRight: {
    alignItems: 'flex-end',
  },
  weatherCity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  weatherDescription: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 1,
    right: 30,
    backgroundColor: '#007aff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: '#fff',
  },
});

export default Home;
