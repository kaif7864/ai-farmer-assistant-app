import { router } from 'expo-router';
import React, { FC, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
}

// <<< Local Logo Import (Adjust the path as needed) >>>
// सुनिश्चित करें कि आपका 'app_logo.png' इस पाथ पर मौजूद है।
const APP_LOGO = require('../../assets/images/logo.png'); 

const userProfilePlaceholder = 'https://i.ibb.co/6P6Xq4x/placeholder-profile.png';
const APP_NAME = "KisanMitra"; 

const Header: FC<HeaderProps> = ({ onMenuPress, onProfilePress }) => {
  const [profileImageError, setProfileImageError] = useState(false);

  const handleProfileImageError = () => {
    setProfileImageError(true);
  };

  return (
    <View style={styles.header}>
      
      {/* Left Side: Menu Icon */}
      <TouchableOpacity onPress={onMenuPress} style={styles.headerLeft}>
        <Ionicons name="menu" style={styles.headerIcon} />
      </TouchableOpacity>
      
      {/* Center: Logo and App Name */}
      <View style={styles.headerCenter}>
        <View style={styles.logoContainer}>
          <Image 
            source={APP_LOGO} 
            style={styles.headerLogo} 
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{APP_NAME}</Text>
        </View>
      </View>
      
      {/* Right Side: Notification and Profile */}
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={()=>router.push('../profile/notification')}>
          <Ionicons name="notifications-outline" style={[styles.headerIcon, styles.notificationIcon]} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onProfilePress}>
          {profileImageError ? (
            <Ionicons 
              name="person-circle-outline" 
              size={39} 
              color="#fff" 
            />
          ) : (
            <Image 
              source={{ uri: userProfilePlaceholder }}
              style={styles.profileImage} 
              onError={handleProfileImageError} 
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // अब हम space-between का उपयोग करेंगे ताकि तीनों भाग अपनी जगह लें
    justifyContent: 'space-between', 
    backgroundColor: '#2e7d32', 
    paddingHorizontal: 10, // Reduced horizontal padding for space
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    paddingBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    zIndex: 10,
  },
  headerIcon: {
    fontSize: 26, 
    color: '#fff',
  },

  // --- Mobile Layout Fixes ---
  headerLeft: {
    // Fixed width removed. Flexbox will handle space.
    // We will ensure minimal margin is used.
    paddingRight: 10, // Small space to the right of the menu icon
  },
  headerCenter: {
    flex: 1, // <<< Takes the maximum remaining space
    alignItems: 'center',
    // Ensure minimum side padding on the logo/text area
    marginHorizontal: 5, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // If the logo/text is too long, it will be centered within headerCenter
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    // text-overflow: ellipsis for web if needed
  },
  headerLogo: {
    width: 50, 
    height: 50, 
    marginRight: 8, 
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // Fixed width removed for more space
    justifyContent: 'space-between',
    paddingLeft: 10, // Small space to the left of the icons
  },
  notificationIcon: {
    marginRight: 15, // Space between notification and profile image
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Header;