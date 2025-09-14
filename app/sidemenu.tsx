import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { router } from 'expo-router'; // 'router' को आयात किया गया है
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const drawerProfileImage = 'https://img.freepik.com/premium-photo/3d-cartoon-style-icon-person-avatar-with-blue-shirt-isolated-white-background-generative-ai_1033234-12499.jpg';

const SideMenu: FC<SideMenuProps> = ({ isVisible, onClose, onLogout }) => {
  const handleDiseaseDetectionPress = () => {
    onClose(); // मेनू बंद करें
    router.push('/diseasedetection'); // 'DiseaseDetection' स्क्रीन पर नेविगेट करें
  };
   const handleSoilDetectionPress = () => {
    onClose(); // मेनू बंद करें
    router.push('/soildetection'); // 'DiseaseDetection' स्क्रीन पर नेविगेट करें
  };

  const handleMandiPricePress = () => {
    onClose(); // मेनू बंद करें
    router.push('/mandiprice'); // 'DiseaseDetection' स्क्रीन पर नेविगेट करें
  };

  

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
            <Text style={styles.drawerHeaderText}>Hello Empower</Text>
          </View>
          <ScrollView style={styles.drawerContent}>
            {/* Menu Items */}
            <Text style={styles.title}>Services</Text>
            <TouchableOpacity style={styles.menuItem} onPress={handleMandiPricePress}>
              <Text style={styles.menuText}>Mandi Prices</Text>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.menuItem}  onPress={handleSoilDetectionPress}>
              <Text style={styles.menuText}>Soil Health </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Ai Chatbot</Text>
            </TouchableOpacity>
            
            {/* Navigates to the Disease Detection screen */}
            <TouchableOpacity style={styles.menuItem} onPress={handleDiseaseDetectionPress}>
              <Text style={styles.menuText} >Disease Detection</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>add option</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>new option</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>option 2</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Footer */}
          <View style={styles.drawerFooter}>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.footerText}>Log Out</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Version :6.3.2</Text>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  drawerContainer: {
    width: '80%', // Main content for the drawer
    backgroundColor: '#fff',
    height: '100%',
  },
  drawerHeader: {
    backgroundColor: '#8bc34a',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    
    // alignItems: 'center',
    marginBottom: 10
  },
  drawerProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    paddingLeft: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize:44,
    fontWeight: "bold",
    color: "#0a0a0aff",
  },
  menuText: {
    fontSize: 16,
    color: '#555',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  versionText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
});

export default SideMenu;
