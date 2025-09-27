import React, { FC, useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Modal,
  Animated, // <<< New Import
} from "react-native";
import { router, Stack } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../header';
import BottomNav from '../bottomnav';
import SideMenu from '../sidemenu';
import ProfileModal from '../profile';
import ProductGrid from '../Product';
import Service from './services'; 

const GOOGLE_ICON_URL = 'https://i.ibb.co/6P6Xq4x/placeholder-profile.png';
const ORGANIC_ICON = 'seed-outline';

const Home: FC = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  
  // 1. Animated Value
  const scrollY = useRef(new Animated.Value(0)).current; 

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

  // 2. Scroll Handler
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true } 
  );

  // 3. Animation Logic for Products and Services
  // These are approximate offsets (adjust based on actual content height)
  const PRODUCT_OFFSET = 200; 
  const SERVICE_OFFSET = 500; 
  const ANIMATION_THRESHOLD = 300; 

  const getAnimationStyles = (offset: number) => {
    const inputRange = [offset - ANIMATION_THRESHOLD, offset];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [50, 0], 
      extrapolate: 'clamp',
    });

    return { opacity, transform: [{ translateY }] };
  };
  
  const productAnimation = getAnimationStyles(PRODUCT_OFFSET);
  const serviceAnimation = getAnimationStyles(SERVICE_OFFSET);


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Header 
          onMenuPress={toggleMenuVisible} 
          onProfilePress={toggleProfileVisible} 
        />

        {/* 4. Use Animated.ScrollView */}
        <Animated.ScrollView 
          style={styles.content}
          onScroll={handleScroll}
          scrollEventThrottle={16} 
        >
          {/* Organic Card (Static) */}
          <View style={[styles.card, styles.organicCard]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name={ORGANIC_ICON} size={30} color="#fff" style={styles.organicIcon} />
              <Text style={styles.organicCardTitle}>Organic Farming Tips</Text>
            </View>
            <Text style={styles.organicCardDescription}>
              50% Salvinia और 50% गाय के गोबर की घोल को मिलाएं, 20% वेस्ट डीकंपोजर (NPOF, गाजियाबाद का उत्पाद) को 200 ml पानी के साथ मिलाकर उपयोग करें।
            </Text>
            <TouchableOpacity style={styles.organicButton}>
              <Text style={styles.organicButtonText}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Weather Card (Static) */}
          <TouchableOpacity onPress={handleweather} style={styles.weatherCardTouchable}>
            <View style={[styles.card, styles.weatherCard]} >
              <View style={styles.weatherHeader}>
                <Text style={styles.weatherTitle} >Today's Weather</Text>
                <Text style={styles.weatherCity}>Hyderabad</Text>
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherTempSection}>
                  <Ionicons name="cloudy-outline" size={50} color="#fff" />
                  <Text style={styles.weatherDegrees}>27°C</Text>
                </View>
                <View style={styles.weatherConditionSection}>
                  <Text style={styles.weatherCondition}>Drizzle / Cloudy</Text>
                  <Text style={styles.weatherDescription}>light intensity drizzle</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Products Section - Animated */}
          <Animated.View style={productAnimation}>
            <Text style={styles.sectionTitle}>🛒 Recommended Products</Text>
            <ProductGrid />
          </Animated.View>

          {/* Services Section - Animated */}
          <Animated.View style={serviceAnimation}>
            <Text style={styles.sectionTitle}>🛠️ Our Services</Text>
            <Service />
          </Animated.View>
          
          <View style={{ height: 100 }} />
        </Animated.ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={handleChatbot}>
          <Ionicons name="chatbubbles" style={styles.fabIcon} />
        </TouchableOpacity>
        
{/*         <BottomNav /> */}
      </View>
      
      <ProfileModal 
        isVisible={isProfileVisible} 
        onClose={toggleProfileVisible}
      />
      
      <SideMenu 
        isVisible={isMenuVisible} 
        onClose={toggleMenuVisible} 
        onLogout={handleLogout}
      />
    </>
  );
};

// ... (Styles remain the same as the previous response)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Lighter background
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10, // Reduced top padding
  },
  
  // --- General Card Styling ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 12, // More rounded corners
    padding: 20,
    marginBottom: 15, // Reduced margin
    elevation: 5, // Deeper shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  // --- Enhanced Organic Card ---
  organicCard: {
    backgroundColor: '#2e7d32', // Darker, rich green background
    padding: 25,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  organicIcon: {
    marginRight: 10,
  },
  organicCardTitle: {
    fontSize: 20,
    fontWeight: '800', // Extra bold title
    color: '#fff',
  },
  organicCardDescription: {
    fontSize: 14,
    color: '#e8f5e9', // Very light green text
    marginBottom: 15,
    lineHeight: 22,
  },
  organicButton: {
    backgroundColor: '#a5d6a7', // Light green button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  organicButtonText: {
    color: '#1b5e20',
    fontWeight: '700',
    fontSize: 14,
  },

  // --- Enhanced Weather Card ---
  weatherCardTouchable: {
    marginBottom: 25,
  },
  weatherCard: {
    backgroundColor: '#42a5f5', // A vibrant blue for sky/weather theme
    padding: 20,
    borderRadius: 15,
    // Optional: Add a subtle gradient effect here if using a library
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  weatherTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  weatherCity: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  weatherTempSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDegrees: {
    fontSize: 50, // Larger temperature
    fontWeight: '800',
    color: '#fff',
    marginLeft: 5,
  },
  weatherConditionSection: {
    alignItems: 'flex-end',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  weatherDescription: {
    fontSize: 12,
    color: '#e0e0e0', // Slightly faded white
    marginTop: 2,
  },

  // --- Section Titles ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700', // Semi-bold for titles
    color: '#2e7d32', // Rich green title
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: 5,
    borderLeftWidth: 4, // Simple accent line
    borderLeftColor: '#4caf50',
  },

  // --- FAB ---
  fab: {
    position: 'absolute',
    bottom: 5, // Moved up to clear BottomNav
    right: 20,
    backgroundColor: '#ff9800', // Orange/Accent color
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabIcon: {
    fontSize: 28,
    color: '#fff',
  },
});

export default Home;