import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
// FontAwesome5 is an external library; using the correct import here
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 

interface DailyForecastProps {
  day: string;
  icon: string; // FontAwesome5 icon name
  temp: string;
  condition: string;
}

// --- Component: DailyForecast ---
const DailyForecast: FC<DailyForecastProps> = ({ day, icon, temp, condition }) => {
  return (
    <View style={styles.forecastCard}>
      <Text style={styles.dayText}>{day}</Text>
      {/* Use FontAwesome5 for the icons */}
      <FontAwesome5 name={icon} size={30} color="#2e7d32" style={styles.forecastIcon} />
      <Text style={styles.tempText}>{temp}</Text>
      <Text style={styles.conditionText}>{condition}</Text>
    </View>
  );
};

// --- Component: WeatherReport ---
const WeatherReport: FC = () => {
  // Dummy data for the next 7 days' weather forecast
  const weatherData = [
    { day: 'Mon', icon: 'sun', temp: '28°C', condition: 'Sunny' },
    { day: 'Tue', icon: 'cloud-sun', temp: '26°C', condition: 'Partly Cloudy' },
    { day: 'Wed', icon: 'cloud-showers-heavy', temp: '24°C', condition: 'Heavy Rain' },
    { day: 'Thu', icon: 'cloud', temp: '25°C', condition: 'Cloudy' },
    { day: 'Fri', icon: 'sun', temp: '27°C', condition: 'Sunny' },
    { day: 'Sat', icon: 'cloud-sun', temp: '26°C', condition: 'Partly Cloudy' },
    { day: 'Sun', icon: 'cloud-showers-heavy', temp: '23°C', condition: 'Rain' },
  ];

  return (
    <View style={styles.container}>
      {/* Header: Deep Green background */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Report</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Current Weather Card: Blue/Vibrant color for weather focus */}
        <View style={styles.currentWeatherCard}>
            {/* Using MaterialCommunityIcons for a modern look */}
          <MaterialCommunityIcons name="weather-partly-cloudy" size={80} color="#4fc3f7" /> 
          <Text style={styles.currentTemp}>25°C</Text>
          <Text style={styles.locationText}>Hyderabad, India</Text>
          <Text style={styles.currentCondition}>Partly Cloudy</Text>
        </View>

        <Text style={styles.sevenDayForecastTitle}>Next 7 Days Forecast</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {weatherData.map((day, index) => (
            <DailyForecast 
              key={index}
              day={day.day}
              icon={day.icon}
              temp={day.temp}
              condition={day.condition}
            />
          ))}
        </ScrollView>
        {/* Add padding at the bottom for the floating tab bar */}
        <View style={{ height: 100 }} /> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background
  },
  header: {
    backgroundColor: '#2e7d32', // Deep Green Theme
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900', // Extra bold
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    padding: 15,
  },
  currentWeatherCard: {
    backgroundColor: '#fff',
    borderRadius: 20, // More rounded corners
    padding: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 8, // Better shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
    marginTop: 10,
  },
  currentTemp: {
    fontSize: 70, // Larger temperature
    fontWeight: '200',
    color: '#333',
    marginVertical: 5,
  },
  currentCondition: {
    fontSize: 20,
    color: '#424242',
    fontWeight: '500',
  },
  sevenDayForecastTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e7d32', // Theme color
    marginBottom: 15,
    marginLeft: 5,
  },
  horizontalScroll: {
    // flexGrow: 0 is fine, but sometimes needs to be handled by contentContainerStyle
  },
  forecastCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 110, // Fixed width for horizontal scroll
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'space-between',
    height: 150,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32', // Theme color
  },
  forecastIcon: {
    marginVertical: 10,
  },
  tempText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  conditionText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default WeatherReport;
