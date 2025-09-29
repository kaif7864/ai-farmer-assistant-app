import { Tabs } from 'expo-router';
import React from 'react';
// MaterialCommunityIcons को भी जोड़ा गया है क्योंकि इसका उपयोग AI Chatbot टैब में हो रहा है।
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 

// Define the main theme color
const THEME_GREEN = '#2e7d32'; // Deep Green, matching Organic Card

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Hide the default header since most screens hide it individually
        headerShown: false,
        // Custom Tab Bar Style for the Floating/Hover look
        tabBarShowLabel: true, 
        tabBarActiveTintColor: THEME_GREEN,
        tabBarInactiveTintColor: '#9e9e9e', // Light Gray for inactive tabs
        tabBarStyle: {
          // Floating/Hover look:
          position: 'absolute', // Makes it float over content
          bottom: 15,
          marginHorizontal: 20, // Add horizontal margin
          height: 65, // Slightly taller height
          borderRadius: 20, // Rounded corners for the floating effect
          backgroundColor: '#fff', // White background
          borderTopWidth: 0,
          elevation: 15, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },
        // Style for the individual tab containers
        tabBarItemStyle: {
          paddingTop: 5,
        },
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Services Screen */}
      <Tabs.Screen
        name="services" 
        options={{
          title: 'Services',
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} /> 
          ),
        }}
      />

      {/* AI Chatbot Screen */}
      <Tabs.Screen
        name="aichatbot" 
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
