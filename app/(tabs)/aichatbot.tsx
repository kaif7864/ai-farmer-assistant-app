import React, { FC, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Note: Since this file is being created outside of the Service.tsx context,
// we are making it a complete, standalone AIChatbot component.

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// Define theme colors for consistency
const THEME_GREEN = '#2e7d32'; // Deep Green
const LIGHT_BACKGROUND = '#f5f5f5'; // Light Background
const USER_BUBBLE_COLOR = '#e1ffc7'; // Light Green/User Bubble Color

const AIChatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "नमस्ते! मैं आपका कृषि सहायक AI हूँ। मैं आपकी खेती से जुड़ी समस्याओं, मौसम, या पौधों की बीमारियों के बारे में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?", 
      sender: 'bot' 
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '' || isLoading) {
      return;
    }

    const userMessageText = inputText;
    const newUserMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
    };

    setMessages(currentMessages => [...currentMessages, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate a delay for bot processing
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `आपने पूछा: "${userMessageText}"। मैं इस पर जल्द ही जवाब दूंगा।`,
        sender: 'bot',
      };
      setMessages(currentMessages => [...currentMessages, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageBubble,
        message.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={[
        styles.messageText,
        message.sender === 'user' ? styles.userMessageText : styles.botMessageText,
      ]}>{message.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // Adjusting offset to account for the header height and prevent overlap
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 AI Chatbot</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        // Added paddingBottom to ensure the last message is visible above the input
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        {isLoading && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.botMessageText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="अपना प्रश्न यहाँ टाइप करें..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline={true}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: inputText.trim() === '' || isLoading ? 0.6 : 1 }]} 
          onPress={handleSend}
          disabled={inputText.trim() === '' || isLoading}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  header: {
    backgroundColor: THEME_GREEN, // Deep Green
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
    fontWeight: '700',
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageBubble: {
    maxWidth: '85%', // Slightly wider max width
    padding: 12,
    borderRadius: 20, // More rounded
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessage: {
    backgroundColor: USER_BUBBLE_COLOR, // Light Green bubble
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5, // Pointed corner towards user
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  botMessage: {
    backgroundColor: '#fff', // White bubble for bot
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5, // Pointed corner towards bot
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#333', // Dark text on light green
  },
  botMessageText: {
    color: '#333', // Dark text on white
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // This ensures all items are vertically aligned
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 0, // Fixed: This was causing an error if it was a string
    paddingBottom: Platform.OS === 'ios' ? 35 : 10, // Added padding for iOS safe area
  },
  textInput: {
    flex: 1, // This is key: it takes up available space
    backgroundColor: '#f5f5f5',
    borderRadius: 25, // More rounded input field
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100, // Limit height for multiline
    minHeight: 45, // Set minimum height
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sendButton: {
    backgroundColor: THEME_GREEN, // Deep Green
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AIChatbot;
