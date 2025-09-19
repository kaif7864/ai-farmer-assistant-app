import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons'; // Example icon library
import { green } from 'react-native-reanimated/lib/typescript/Colors';

export default function TabLayout() {
  return (
    <Tabs>
      {/* Home Screen */}
      <Tabs.Screen
        name="home" // Corresponds to the file `home.tsx`
        options={{
          title: 'Home',
          tabBarActiveTintColor: 'green',
          headerShown: false, // Hides the default header if you have one in `home.tsx`
          tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Services Screen */}
      <Tabs.Screen
        name="services" // Corresponds to the file `services.tsx`
        options={{
          title: 'Services',
          headerShown: false,
          tabBarActiveTintColor: 'green',
          tabBarIcon: ({ color, size }) => (
            <Feather name="tool" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aichatbot" // Corresponds to the file `services.tsx`
        options={{
          title: 'Aichatbot',
          headerShown: false,
          tabBarActiveTintColor: 'green',
          tabBarIcon: ({ color, size }) => (
            <Feather name="code" size={size} color={color} />
          ),
        }}
      />
      
     
    </Tabs>
  );
}