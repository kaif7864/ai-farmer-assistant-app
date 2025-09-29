import { Stack, useRouter } from 'expo-router';
import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the main theme color for consistency
const THEME_GREEN = '#2e7d32';
const LIGHT_BACKGROUND = '#ebf4ea';

interface ServiceItemProps {
  icon: string;
  name: string;
  description: string;
  onPress: () => void;
}

const ServiceItem: FC<ServiceItemProps> = ({ icon, name, description, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.serviceCard} 
      onPress={onPress}
      activeOpacity={0.85} // Add visual feedback on press
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={30} color={THEME_GREEN} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.serviceName}>{name}</Text>
        <Text style={styles.serviceDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#999" style={styles.forwardIcon} />
    </TouchableOpacity>
  );
};

const Service: FC = () => {
  // Assume expo-router setup is available, otherwise, this will throw an error
  // If not using expo-router, replace `useRouter` and `<Stack.Screen>` with React Navigation equivalents
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      {/** Header Setup for Expo Router */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButtonHeader}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Services (हमारी सेवाएँ)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.serviceList}>
        <Text style={styles.pageTitle}>Simplify Farming (खेती को आसान बनाएं)</Text>

        {/* Soil Health page ko redirect karega */}
        <ServiceItem
          icon="leaf-outline"
          name="Soil Health Check (मिट्टी की जाँच)"
          description="Know your soil's nutrients and get advice on the right fertilizer. (अपनी मिट्टी के पोषक तत्वों का हाल जानें और सही खाद की सलाह पाएँ।)"
          onPress={() => router.push("/soil/soildetection")}
        />

        {/* Mandi Prices page ko redirect karega */}
        <ServiceItem
          icon="cash-outline"
          name="Mandi Prices (बाजार भाव)"
          description="Instantly check the latest rates for your crop in markets across the country. (देशभर की मंडियों में अपनी फसल के ताज़ा रेट तुरंत चेक करें।)"
          onPress={() => router.push("/crop/mandiprice")}
        />

        {/* Crop Protection page ko redirect karega */}
        <ServiceItem
          icon="bug-outline"
          name="Pest & Disease Control (कीट एवं रोग नियंत्रण)"
          description="Identify pests and diseases and find traditional and modern treatments. (कीटों और बीमारियों की पहचान करें और देसी-विदेशी इलाज ढूंढें।)"
          onPress={() => router.push("/crop/cropprotection")}
        />

        {/* AI Chatbot page ko redirect karega */}
        <ServiceItem
          icon="chatbubbles-outline"
          name="Agriculture Assistant AI (कृषि सहायक AI)"
          description="Ask your questions instantly to our Artificial Intelligence expert. (अपने सभी सवालों का जवाब हमारे आर्टिफिशियल इंटेलिजेंस एक्सपर्ट से तुरंत पूछें।)"
          onPress={() => router.push("/aichatbot")}
        />

        {/* Disease Detection page ko redirect karega */}
        <ServiceItem
          icon="scan-circle-outline"
          name="Crop Disease Identification (फसल रोग पहचान)"
          description="Take a photo of the crop and instantly find out what disease it has. (फसल की फोटो खींचकर तुरंत पता करें कि कौन सी बीमारी लगी है।)"
          onPress={() => router.push("/crop/diseasedetection")}
        />
        
        {/* Other Services page ko redirect karega (agar aisi file hai) */}
        <ServiceItem
          icon="grid-outline"
          name="Other Useful Tools (अन्य उपयोगी उपकरण)"
          description="View the list of other essential and helpful tools for farming. (खेती के लिए अन्य ज़रूरी और सहायक उपकरणों की लिस्ट देखें।)"
          onPress={() => router.push("/")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  header: {
    backgroundColor: THEME_GREEN, // Deep Green
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingTop: 50, // For status bar
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  backButtonHeader: {
    position: 'absolute',
    left: 15,
    top: 50, // Aligned with the title
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  pageTitle: {
    fontSize: 26, // Slightly larger title
    fontWeight: '700',
    color: THEME_GREEN,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 20,
  },
  serviceList: {
    padding: 15,
    alignItems: 'center',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18, // Slightly reduced padding
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5, // Increased elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow
    shadowOpacity: 0.15, // More visible shadow
    shadowRadius: 5,
    width: '100%',
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#e8f5e9', // Very light green background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2, // Added border for highlight
    borderColor: THEME_GREEN, 
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: THEME_GREEN,
  },
  serviceDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  forwardIcon: {
    marginLeft: 10,
  },
});

export default Service;
