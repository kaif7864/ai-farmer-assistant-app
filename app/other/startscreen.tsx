import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ImageSourcePropType } from "react-native";
import { Link, Stack } from "expo-router";

// ध्यान दें: अब इमेजेस URL से लोड हो रही हैं।
const backgroundImage = 'https://img.freepik.com/premium-photo/fresh-organic-healthy-vegetables-fruits-with-white-background-ai-generated_775825-1413.jpg'; // अपनी बैकग्राउंड इमेज का URL दें
const logoImage = 'https://tse2.mm.bing.net/th/id/OIP.FOvf1KLsjAkPkcxlrCn6wwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3'; // अपने नए लोगो का URL दें
const leaf1 = 'https://static.vecteezy.com/system/resources/previews/035/576/128/non_2x/ai-generated-3d-rendering-of-a-green-leaf-on-transparent-background-ai-generated-free-png.png'; // पत्ती 1 का URL
const leaf2 = 'https://clipartcraft.com/images/leaf-clipart-transparent-background-7.png'; // पत्ती 2 का URL

const StartScreen: FC = () => {
  return (
    <>
      {/* Header को छुपाने के लिए */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* बैकग्राउंड इमेज */}
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
      >
        {/* फ्लोटिंग पत्तियां */}

        {/* ऊपरी ब्रांडिंग */}
        <View style={styles.topBrandingContainer}>
          {/* <Text style={styles.topTitle}>Farmers Ai</Text> */}
          {/* <Text style={styles.topSubtitle}>मेरा नज़दीकी किसान</Text> */}
          <Text style={styles.topTitle}>Easy Log In and Register</Text>
        </View>

        {/* मुख्य सफेद कार्ड */}
        <View style={styles.cardContainer}>
          {/* कार्ड के अंदर फ्लोटिंग पत्तियां */}
        <Image source={{ uri: leaf1 }} style={[styles.leaf, styles.leafTopRight]} />
          <Image source={{ uri: leaf2 }} style={[styles.leaf, styles.cardLeafTop]} />
          <Image source={{ uri: leaf2 }} style={[styles.leaf, styles.cardLeafBottom]} />
        <Image source={{ uri: leaf1 }} style={[styles.leaf, styles.leafBottomLeft]} />
          
          <Image source={{ uri: logoImage }} style={styles.logo} />
          <Text style={styles.title}>Farmers Ai</Text>
          <Text style={styles.subtitle}></Text>

          {/* Login button */}
          <Link href="/account/login" asChild>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </Link>

          {/* Register button */}
          <Link href="/account/register" asChild>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </Link>

           {/* Skip for now button */}
          <Link href="/home" asChild>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </Link>

        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  topBrandingContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  topTitle: {
    marginTop:20,
    fontSize: 35,
    fontWeight: "bold",
    color: "#0f0330ff",
  },
  topSubtitle: {
    fontSize: 12,
    color: "#fff",
  },
  easyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
    marginTop: 20,
    marginBottom: 50,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    position: 'relative',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize:44,
    fontWeight: "bold",
    color: "#0a0a0aff",
    
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: -30
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#a5d6a7",
    paddingVertical: 15,
    borderRadius: 50,
  },
  registerText: {
    color: "#2e7d32",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  skipButton: {
    marginTop: 10,
    paddingVertical: 12,
    width: "100%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#2e7d32",
  },
  skipText: {
    color: "#2e7d32",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  leaf: {
    width: 50,
    height: 50,
    position: 'absolute',
    resizeMode: 'contain',
  },
  leafTopRight: {
    top: 10,
    right: 30,
    transform: [{ rotate: '20deg' }],
  },
  leafBottomLeft: {
    bottom:- 20,
    left: 40,
    transform: [{ rotate: '-30deg' }],
  },
  cardLeafTop: {
    top: -20,
    left: 20,
    width: 60,
    height: 60,
    transform: [{ rotate: '-15deg' }],
  },
  cardLeafBottom: {
    bottom: 20,
    right: -10,
    width: 70,
    height: 70,
    transform: [{ rotate: '45deg' }],
  },
});

export default StartScreen;
