import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Link, useRouter, Stack } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons"; // FontAwesome added for Google icon
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  // Load users from AsyncStorage on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("@users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.log("Error loading users:", error);
      }
    };
    loadUsers();
  }, []);

  // Handle email/password registration
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are mandatory!");
      return;
    }

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      Alert.alert("User Exists", "This email is already registered!");
      return;
    }

    const newUser: User = { name, email, password };
    const updatedUsers = [...users, newUser];

    try {
      await AsyncStorage.setItem("@users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      Alert.alert("Success", "Account created successfully! Please log in.", [
        {
          text: "OK",
          onPress: () => {
            setName("");
            setEmail("");
            setPassword("");
            router.push("/login");
          },
        },
      ]);
    } catch (error) {
      console.log("Error saving user:", error);
      Alert.alert("Error", "Failed to save user. Try again.");
    }
  };
  
  // --- NEW FUNCTION: Mock Google Registration ---
  const handleGoogleRegister = () => {
    // NOTE: For a real app, you must implement the Google Sign-In SDK here.
    // For now, we simulate success and redirection.
    Alert.alert("Google Sign-Up", "Registering with Google will automatically create your account and redirect you to the home screen.", [
      {
        text: "Simulate Success",
        onPress: () => router.replace("/home"), // Redirect to home after successful registration
      },
      {
        text: "Cancel",
        style: 'cancel',
      }
    ]);
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Stack Header */}
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/startscreen")}>
              <Ionicons name="home" size={26} color="#2e7d32" style={styles.hicon} />
            </TouchableOpacity>
          ),
        }}
      />

      <Text style={styles.title}>Register</Text>
      
      {/* --- GOOGLE REGISTRATION BUTTON (New) --- */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleRegister}>
        <FontAwesome name="google" size={20} color="#DB4437" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Register with Google</Text>
      </TouchableOpacity>
      
      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>


      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Link href="/login" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 40,
  },
  hicon:{
    paddingRight: 25
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
    alignItems: "center",
    justifyContent: "center",
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