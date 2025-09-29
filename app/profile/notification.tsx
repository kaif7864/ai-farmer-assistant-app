import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define Theme Colors based on previous components
const THEME_PRIMARY = '#2e7d32'; // Deep Green
const LIGHT_BACKGROUND = '#f5f5f5'; // Light Background
const CARD_BACKGROUND = '#ffffff';
const DARK_TEXT = '#333333';
const ACCENT_RED = '#d32f2f'; // For urgent notifications

interface Notification {
  id: number;
  type: 'mandi' | 'disease' | 'weather' | 'update';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  isArchived: boolean;
}

// Dummy Data for Notifications
const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'mandi',
    title: 'मंडी भाव अपडेट: गेहूँ',
    message: 'आज आपके क्षेत्र में गेहूँ का अधिकतम मूल्य ₹2450/क्विंटल दर्ज किया गया है।',
    time: '2 घंटे पहले',
    isRead: false,
    isArchived: false,
  },
  {
    id: 2,
    type: 'weather',
    title: '⚠️ भारी वर्षा की चेतावनी',
    message: 'अगले 24 घंटों में भारी वर्षा का अनुमान है। अपनी फसल की सुरक्षा के लिए आवश्यक कदम उठाएँ।',
    time: 'आज सुबह 8:00 बजे',
    isRead: false,
    isArchived: false,
  },
  {
    id: 3,
    type: 'disease',
    title: 'फसल रोग अलर्ट',
    message: 'टमाटर की फसल में पत्ती धब्बा रोग के शुरुआती लक्षण देखे गए हैं। निवारण के लिए क्लिक करें।',
    time: 'कल शाम 5:30 बजे',
    isRead: true,
    isArchived: false,
  },
  {
    id: 4,
    type: 'update',
    title: 'ऐप अपडेट उपलब्ध',
    message: 'नया खाद सिफारिश मॉडल लॉन्च हो गया है।',
    time: '3 दिन पहले',
    isRead: true,
    isArchived: true,
  },
  {
    id: 5,
    type: 'mandi',
    title: 'आलू के दाम सामान्य',
    message: 'आलू का औसत मूल्य ₹1800/क्विंटल पर स्थिर है।',
    time: '5 दिन पहले',
    isRead: true,
    isArchived: true,
  },
];

const NotificationScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'archived'>('recent');
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);

  // Function to get the Ionicons name based on notification type
  const getIconDetails = (type: Notification['type']) => {
    switch (type) {
      case 'mandi':
        return { name: 'cash-outline', color: THEME_PRIMARY };
      case 'disease':
        return { name: 'bug-outline', color: ACCENT_RED };
      case 'weather':
        return { name: 'cloud-outline', color: '#ffc107' };
      case 'update':
        return { name: 'information-circle-outline', color: '#1e88e5' };
      default:
        return { name: 'notifications-outline', color: '#888' };
    }
  };

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(notif => 
    activeTab === 'recent' ? !notif.isArchived : notif.isArchived
  );

  // Handle notification press (e.g., mark as read, navigate)
  const handleNotificationPress = (id: number) => {
    setNotifications(currentNotifs => 
      currentNotifs.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    // Add navigation logic here if needed (e.g., router.push('/details/' + id))
    console.log(`Notification ${id} clicked.`);
  };

  // Render a single notification card
  const renderNotificationCard = (notif: Notification) => {
    const icon = getIconDetails(notif.type);
    const isUnread = !notif.isRead;

    return (
      <TouchableOpacity 
        key={notif.id}
        style={[styles.card, isUnread && styles.unreadCard]}
        onPress={() => handleNotificationPress(notif.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: icon.color + '1a' }]}>
          <Ionicons name={icon.name} size={24} color={icon.color} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.cardTitle, isUnread && styles.unreadTitle]} numberOfLines={1}>
            {notif.title}
          </Text>
          <Text style={styles.cardMessage} numberOfLines={2}>
            {notif.message}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{notif.time}</Text>
          {isUnread && <View style={styles.unreadDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  // Empty state component
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
      <Text style={styles.emptyTitle}>No Notifications (कोई सूचना नहीं)</Text>
      <Text style={styles.emptyMessage}>
        {activeTab === 'recent'
          ? 'You currently have no new or recent notifications. (आपके पास अभी कोई नई या हालिया सूचना नहीं है।)'
          : 'You do not have any notifications in your archived folder. (आपके संग्रहीत फ़ोल्डर में कोई सूचना नहीं है।)'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications (सूचनाएँ)</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
            Recent (हालिया)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'archived' && styles.activeTab]}
          onPress={() => setActiveTab('archived')}
        >
          <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]}>
            Archived (संग्रहीत)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredNotifications.length > 0
          ? filteredNotifications.map(renderNotificationCard)
          : renderEmptyState()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
// ... (Styles remain the same)
  container: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  header: {
    backgroundColor: THEME_PRIMARY, // Deep Green
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: CARD_BACKGROUND,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: THEME_PRIMARY,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: CARD_BACKGROUND,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#eee', // Default border color
  },
  unreadCard: {
    borderLeftColor: THEME_PRIMARY, // Highlight unread cards
    backgroundColor: '#fff', 
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: DARK_TEXT,
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '700',
    color: THEME_PRIMARY,
  },
  cardMessage: {
    fontSize: 14,
    color: '#666',
  },
  timeContainer: {
    alignItems: 'flex-end',
    width: 70, // Fixed width for time
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME_PRIMARY,
  },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
    marginTop: 15,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#bbb',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 22,
  },
});

export default NotificationScreen;
