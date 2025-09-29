import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
// Note: Assuming 'expo-router' is available in the environment
import { router } from 'expo-router'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define Theme Colors
const THEME_PRIMARY = '#2e7d32'; // Deep Green
const THEME_ACCENT = '#66bb6a'; // Light Green for highlights
const LIGHT_GREY = '#f0f0f0';
const DARK_TEXT = '#333333';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface MenuItemProps {
  iconName: string;
  title: string;
  onPress: () => void;
}

// Dummy profile image URL
const drawerProfileImage = 'https://placehold.co/100x100/2e7d32/ffffff?text=F';

const MenuItem: FC<MenuItemProps> = ({ iconName, title, onPress }) => (
  <TouchableOpacity 
    style={styles.menuItem} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name={iconName} size={22} color={THEME_PRIMARY} style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const SideMenu: FC<SideMenuProps> = ({ isVisible, onClose, onLogout }) => {

  // --- Navigation Handlers ---

  const handleNavigation = (path: string) => {
    onClose(); 
    router.push(path); 
  };

  // --- Menu Items List ---
  const menuItems = [
    { 
      icon: 'cash-outline', 
      title: 'Mandi Prices (बाजार भाव)', 
      path: '/crop/mandiprice' 
    },
    { 
      icon: 'leaf-outline', 
      title: 'Soil Health Check (मिट्टी की जाँच)', 
      path: '/soil/soildetection' 
    },
    { 
      icon: 'chatbubbles-outline', 
      title: 'AI Chatbot (कृषि सहायक AI)', 
      path: '/aichatbot' 
    },
    { 
      icon: 'bug-outline', 
      title: 'Disease Detection (रोग पहचान)', 
      path: '/crop/diseasedetection' 
    },
    { 
      icon: 'flask-outline', 
      title: 'Fertilization (खाद सलाह)', 
      path: '/soil/fertilizerrecommendation' 
    },
    { 
      icon: 'analytics-outline', 
      title: 'Yield Prediction (फसल उपज अनुमान)', 
      path: '/crop/yieldprediction' 
    },
    { 
      icon: 'reload-circle-outline', 
      title: 'Crop Rotation (फसल चक्रण योजना)', 
      path: '/crop/croprotationplanner' 
    },
  ];


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.menuOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.drawerContainer}>
          {/* Drawer Header */}
          <View style={styles.drawerHeader}>
            <Image 
              source={{ uri: drawerProfileImage }}
              style={styles.drawerProfileImage} 
            />
            <View>
              <Text style={styles.drawerHeaderText}>Hello, Farmer (नमस्ते, किसान)</Text>
              <Text style={styles.drawerSubText}>Empower Tech ID: 12345</Text>
            </View>
          </View>
          <ScrollView style={styles.drawerContent} showsVerticalScrollIndicator={false}>
            {/* Menu Items */}
            <Text style={styles.title}>Farming Services (कृषि सेवाएँ)</Text>
            
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                iconName={item.icon}
                title={item.title}
                onPress={() => handleNavigation(item.path)}
              />
            ))}

            <View style={styles.separator} />
            
            {/* Settings and Help */}
            <Text style={styles.title}>Settings & Info (सेटिंग्स और जानकारी)</Text>
            <MenuItem
              iconName='lock-closed-outline'
              title='Privacy Policy (गोपनीयता नीति)'
              onPress={() => console.log("Navigate to Privacy Policy")}
            />
            <MenuItem
              iconName='help-circle-outline'
              title='Help & Support (मदद और समर्थन)'
              onPress={() => console.log("Navigate to Help")}
            />

          </ScrollView>
          {/* Footer */}
          <View style={styles.drawerFooter}>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Log Out (लॉग आउट करें)</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>App Version: 6.3.2</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    flexDirection: 'row',
  },
  drawerContainer: {
    width: '85%', // Slightly wider drawer
    backgroundColor: '#fff',
    height: '100%',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  drawerHeader: {
    backgroundColor: THEME_PRIMARY, // Deep Green
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 20, // Rounded corner
    paddingBottom: 20,
    paddingTop: 60, // Space for status bar
  },
  drawerProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  drawerSubText: {
    color: LIGHT_GREY,
    fontSize: 13,
    marginTop: 4,
  },
  drawerContent: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 14, // Smaller title
    fontWeight: "bold",
    color: THEME_PRIMARY,
    paddingVertical: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    marginRight: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    marginRight: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: DARK_TEXT,
    fontWeight: '500',
  },
  separator: {
    height: 10,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: LIGHT_GREY,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f', // Red button for log out
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SideMenu;
