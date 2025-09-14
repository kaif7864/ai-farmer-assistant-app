import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
}

const userProfilePlaceholder = 'https://i.ibb.co/6P6Xq4x/placeholder-profile.png';

const Header: FC<HeaderProps> = ({ onMenuPress, onProfilePress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" style={styles.headerIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Farmer Connect</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Ionicons name="notifications" style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <Image 
            source={{ uri: userProfilePlaceholder }}
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8bc34a',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    elevation: 3,
  },
  headerIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
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
