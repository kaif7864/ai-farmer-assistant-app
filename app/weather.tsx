import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

interface DailyForecastProps {
  day: string;
  icon: string;
  temp: string;
  condition: string;
}

const DailyForecast: FC<DailyForecastProps> = ({ day, icon, temp, condition }) => {
  return (
    <View style={styles.forecastCard}>
      <Text style={styles.dayText}>{day}</Text>
      <FontAwesome5 name={icon} size={30} color="#8bc34a" style={styles.forecastIcon} />
      <Text style={styles.tempText}>{temp}</Text>
      <Text style={styles.conditionText}>{condition}</Text>
    </View>
  );
};

const WeatherReport: FC = () => {
  // Dummy data for the next 7 days' weather forecast
  const weatherData = [
    { day: 'Monday', icon: 'sun', temp: '28°C', condition: 'Sunny' },
    { day: 'Tuesday', icon: 'cloud-sun', temp: '26°C', condition: 'Partly Cloudy' },
    { day: 'Wednesday', icon: 'cloud-showers-heavy', temp: '24°C', condition: 'Heavy Rain' },
    { day: 'Thursday', icon: 'cloud', temp: '25°C', condition: 'Cloudy' },
    { day: 'Friday', icon: 'sun', temp: '27°C', condition: 'Sunny' },
    { day: 'Saturday', icon: 'cloud-sun', temp: '26°C', condition: 'Partly Cloudy' },
    { day: 'Sunday', icon: 'cloud-showers-heavy', temp: '23°C', condition: 'Rain' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>☁️ Weather Report</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.currentWeatherCard}>
          <Text style={styles.locationText}>Your Location</Text>
          <Text style={styles.currentTemp}>25°C</Text>
          <Ionicons name="sunny-outline" size={80} color="#ffeb3b" />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf4ea',
  },
  header: {
    backgroundColor: '#8bc34a',
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 15,
  },
  currentWeatherCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  currentTemp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  currentCondition: {
    fontSize: 18,
    color: '#555',
  },
  sevenDayForecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
  },
  horizontalScroll: {
    flexGrow: 0,
  },
  forecastCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 120,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  forecastIcon: {
    marginVertical: 10,
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  conditionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default WeatherReport;
