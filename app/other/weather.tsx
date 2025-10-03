import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming expo for icons
// import { EXPO_PUBLIC_API_URL } from "@env";

// Assuming WeatherCard component in React Native
interface WeatherCardProps {
  name: string;
  value: string | number;
  image: string; // URL for icon
}

const WeatherCard: FC<WeatherCardProps> = ({ name, value, image }) => {
  return (
    <View style={styles.weatherCard}>
      <Image source={{ uri: image }} style={styles.cardIcon} />
      <Text style={styles.cardName}>{name}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

// Assuming WeatherDayCard component in React Native
interface WeatherDayCardProps {
  day: string;
  temp: number;
  humidity: number;
  wind: number;
  sunrise: string;
  sunset: string;
  icon: string; // URL for icon
}

const WeatherDayCard: FC<WeatherDayCardProps> = ({ day, temp, humidity, wind, sunrise, sunset, icon }) => {
  return (
    <View style={styles.dayCard}>
      <Text style={styles.dayText}>{day}</Text>
      <Image source={{ uri: icon }} style={styles.dayIcon} />
      <Text style={styles.dayTemp}>{temp}°C</Text>
      <Text style={styles.dayDetail}>Humidity: {humidity}%</Text>
      <Text style={styles.dayDetail}>Wind: {wind} Km/h</Text>
      <Text style={styles.dayDetail}>Sunrise: {sunrise}</Text>
      <Text style={styles.dayDetail}>Sunset: {sunset}</Text>
    </View>
  );
};



const Weather: FC = () => {
  const [next7Days, setNext7Days] = useState<any[]>([]);
  const [prev7Days, setPrev7Days] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const EXPO_PUBLIC_API_URL = "http://10.70.24.226:8000"

  useEffect(() => {
    const handleWeatherReport = async () => {
      try {
        setLoading(true);

        // Fetch next 7 days
        const response = await axios.get(
          `${EXPO_PUBLIC_API_URL}/weather/next/7days?city=haridwar` // Adjusted for RN, assuming env setup
        );
        if (response.status === 200) {
          setNext7Days(response.data.slice(0, 7));
        }

        // Fetch previous 7 days
        const res = await axios.get(
          `${EXPO_PUBLIC_API_URL}/weather/previous/7days?city=haridwar`
        );
        if (res.status === 200) {
          setPrev7Days(res.data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    handleWeatherReport();
  }, []);

  // Function to get day name
  const getDayName = (datetime: string, idx: number) => {
    if (idx === 0) return "Today";
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Function to get weather icon based on conditions
  const getWeatherIcon = (condition?: string) => {
    if (!condition) return "https://unpkg.com/lucide-static/icons/cloud.svg";
    const lower = condition.toLowerCase();

    if (lower.includes("rain"))
      return "https://unpkg.com/lucide-static/icons/cloud-rain.svg";
    if (lower.includes("cloud"))
      return "https://unpkg.com/lucide-static/icons/cloud.svg";
    if (lower.includes("sun") || lower.includes("clear"))
      return "https://unpkg.com/lucide-static/icons/sun.svg";
    if (lower.includes("snow"))
      return "https://unpkg.com/lucide-static/icons/cloud-snow.svg";
    if (lower.includes("storm") || lower.includes("thunder"))
      return "https://unpkg.com/lucide-static/icons/cloud-lightning.svg";

    return "https://unpkg.com/lucide-static/icons/cloud.svg";
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        next7Days.length > 0 && prev7Days.length > 0 && (
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.mainGrid}>
              {/* Left Section */}
              <View style={styles.leftSection}>
                {/* Current Weather */}
                <View style={styles.currentWeather}>
                  <View style={styles.currentIconContainer}>
                    <Image
                      source={{ uri: getWeatherIcon(next7Days[0]?.conditions) }}
                      style={styles.currentIcon}
                    />
                  </View>
                  <View>
                    <Text style={styles.currentTemp}>{next7Days[0]?.temp}°C</Text>
                    <Text style={styles.feelsLike}>Feels like {next7Days[0]?.temp}°C</Text>
                  </View>
                </View>

                {/* Weather Stats Grid */}
                <View style={styles.statsGrid}>
                  <WeatherCard
                    name="Humidity"
                    value={next7Days[0]?.humidity}
                    image="https://unpkg.com/lucide-static/icons/droplets.svg"
                  />
                  <WeatherCard
                    name="Wind"
                    value={`${next7Days[0]?.wind} Km/h`}
                    image="https://unpkg.com/lucide-static/icons/wind.svg"
                  />
                  <WeatherCard
                    name="Visibility"
                    value={`${next7Days[0]?.visibility} Km`}
                    image="https://unpkg.com/lucide-static/icons/eye.svg"
                  />
                  <WeatherCard
                    name="UV Index"
                    value={next7Days[0]?.uvindex}
                    image="https://unpkg.com/lucide-static/icons/sun.svg"
                  />
                  <WeatherCard
                    name="Pressure"
                    value={`${next7Days[0]?.pressure} hpa`}
                    image="https://unpkg.com/lucide-static/icons/gauge.svg"
                  />
                  <WeatherCard
                    name="Feels Like"
                    value={`${next7Days[0]?.temp} °C`}
                    image="https://unpkg.com/lucide-static/icons/thermometer.svg"
                  />
                  <WeatherCard
                    name="Sunrise"
                    value={next7Days[0]?.sunrise}
                    image="https://unpkg.com/lucide-static/icons/sunrise.svg"
                  />
                  <WeatherCard
                    name="Sunset"
                    value={next7Days[0]?.sunset}
                    image="https://unpkg.com/lucide-static/icons/sunset.svg"
                  />
                </View>
              </View>

              {/* Right Section */}
              <View style={styles.rightSection}>
                <Text style={styles.recommendationsTitle}>
                  <MaterialCommunityIcons name="leaf" size={24} color="#16a34a" /> Farming Recommendations
                </Text>
                <View style={styles.recommendationsContainer}>
                  <View style={styles.recommendationCard}>
                    <MaterialCommunityIcons name="alert" size={20} color="#eab308" />
                    <View style={styles.recommendationContent}>
                      <Text style={styles.recommendationHeader}>High humidity alert</Text>
                      <Text style={styles.recommendationText}>
                        Monitor crops for fungal diseases and improve ventilation
                      </Text>
                      <View style={styles.recommendationFooter}>
                        <Text style={styles.recommendationTip}>Check crops twice daily</Text>
                        <View style={styles.priorityBadge}>
                          <Text style={styles.priorityText}>medium priority</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* More recommendations can be added here */}
                </View>
              </View>
            </View>

            {/* Next 7 Days Forecast */}
            <View style={styles.forecastSection}>
              <Text style={styles.forecastHeader}>Next 7 Days Weather Report</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forecastGrid}>
                {next7Days.map((dayData, idx) => (
                  <WeatherDayCard
                    key={idx}
                    day={getDayName(dayData.date, idx)}
                    temp={dayData.temp}
                    humidity={dayData.humidity}
                    wind={dayData.wind}
                    sunrise={dayData.sunrise}
                    sunset={dayData.sunset}
                    icon={getWeatherIcon(dayData.condition)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Previous 7 Days Forecast */}
            <View style={styles.forecastSection}>
              <Text style={styles.forecastHeader}>Previous 7 Days Weather Report</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forecastGrid}>
                {prev7Days.map((dayData, idx) => (
                  <WeatherDayCard
                    key={idx}
                    day={getDayName(dayData.date, idx)}
                    temp={dayData.temp}
                    humidity={dayData.humidity}
                    wind={dayData.wind}
                    sunrise={dayData.sunrise}
                    sunset={dayData.sunset}
                    icon={getWeatherIcon(dayData.condition)}
                  />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 2,
    marginRight: 16,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentIconContainer: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  currentIcon: {
    width: 64,
    height: 64,
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
  },
  feelsLike: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weatherCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  cardValue: {
    fontSize: 16,
    color: '#111827',
  },
  rightSection: {
    flex: 1,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  recommendationsContainer: {
    flex: 1,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: '#fefce8',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#eab308',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 12,
  },
  recommendationHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  recommendationText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  recommendationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationTip: {
    fontSize: 12,
    color: '#6b7280',
  },
  priorityBadge: {
    backgroundColor: '#fef08a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  priorityText: {
    fontSize: 12,
    color: '#a16207',
    fontWeight: '500',
  },
  forecastSection: {
    backgroundColor: '#e0f2fe',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  forecastHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  forecastGrid: {
    flexDirection: 'row',
  },
  dayCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dayIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  dayTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayDetail: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
});

export default Weather;