import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Google Icon from a popular library (e.g., FontAwesome or MaterialCommunityIcons)
import { FontAwesome } from "@expo/vector-icons"; 

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are mandatory!");
      return;
    }

    // Dummy login logic (replace with Firebase / Backend API)
    if (email === "test@gmail.com" && password === "123456") {
      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => router.replace("/home"), 
        },
      ]);
    } else {
      Alert.alert("Failed", "Invalid email or password!");
    }
  };

  // --- NEW FUNCTION: Mock Google Sign-in ---
  const handleGoogleLogin = () => {
    // NOTE: For a real app, you must implement the Google Sign-In SDK here.
    // For now, we simulate success and redirection.
    Alert.alert("Google Sign-In", "Attempting to sign in with Google...", [
      {
        text: "Simulate Success",
        onPress: () => router.replace("/home"),
      },
      {
        text: "Cancel",
        style: 'cancel',
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/other/startscreen")}>
              <Ionicons name="home" size={26} color="#2e7d32"  style={styles.hicon} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <Text style={styles.title}>Login</Text>

      {/* --- GOOGLE LOGIN BUTTON (New) --- */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <FontAwesome name="google" size={20} color="#DB4437" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      
      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>


      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Link href="/account/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf7ec",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  hicon:{
    paddingRight: 25
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 40,
  },
  
  // --- NEW STYLES FOR GOOGLE BUTTON ---
  googleButton: {
    width: "90%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff", // White background for Google button
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd", // Light border
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#4285F4", // Google Blue
    fontSize: 18,
    fontWeight: "bold",
  },
  
  // --- NEW STYLES FOR SEPARATOR ---
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    width: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },

  // Existing Styles
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%",
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#2e7d32",
    marginTop: 10,
  },
});