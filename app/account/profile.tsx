import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

interface ProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const userProfilePlaceholder = 'https://i.ibb.co/6P6Xq4x/placeholder-profile.png';

const ProfileModal: FC<ProfileModalProps> = ({ isVisible, onClose }) => {
  const handleLoginRegister = () => {
    onClose();
    router.push("/startscreen");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.profileModalContainer}>
        <View style={styles.profileModalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Image 
            source={{ uri: userProfilePlaceholder }}
            style={styles.modalProfileImage} 
          />
          <Text style={styles.modalTitle}>Guest User</Text>
          <Text style={styles.modalSubtitle}>Profile information will appear here once you log in.</Text>
          <TouchableOpacity 
            style={styles.loginRegisterButton} 
            onPress={handleLoginRegister} 
          >
            <Text style={styles.loginRegisterText}>Log In / Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  profileModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  modalProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginRegisterButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginRegisterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileModal;
