import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import FormData from "form-data";
import Markdown from "react-native-markdown-display";
import { Audio } from "expo-av";

/* ------------------------------------------------------------------ */
/* -------------------------- TYPES & CONSTANTS --------------------- */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const BASE_URL = "http://10.70.24.226:8000"; // <-- adjust if needed

const THEME_GREEN = "#2e7d32";
const LIGHT_BACKGROUND = "#f5f5f5";
const USER_BUBBLE_COLOR = "#e1ffc7";

/* ------------------------------------------------------------------ */
/* --------------------------- COMPONENT ---------------------------- */
/* ------------------------------------------------------------------ */

const AIChatbot: FC = () => {
  /* -------------------------- STATE -------------------------- */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्ते! मैं आपका कृषि सहायक AI हूँ। मैं आपकी खेती से जुड़ी समस्याओं, मौसम, या पौधों की बीमारियों के बारे में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* Recording (speech-to-text) */
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  /* -------------------------- HELPERS -------------------------- */
  const scrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  /* -------------- 1. SEND TEXT MESSAGE (backend call) -------------- */
  const sendChatMessage = async (prompt: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/ai/chat`,{ prompt });
      console.log(res);
      
      return res.data.response || "No response from server";
    } catch (e: any) {
      console.error(e);
      return "Failed to get response";
    }
  };

  /* -------------- 2. HANDLE SEND BUTTON -------------- */
  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);
    scrollToEnd();

    const botResponseText = await sendChatMessage(inputText);
    const botMsg: Message = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
    scrollToEnd();
  };

  /* -------------- 3. SPEECH-TO-TEXT (mic) -------------- */
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error(err);
      Alert.alert("Mic error", "Unable to access microphone.");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);

    // ---------- upload to backend ----------
    const form = new FormData();
    // @ts-ignore – expo-asset type mismatch, but works at runtime
    form.append("file", {
      uri,
      name: "speech.wav",
      type: "audio/wav",
    });

    try {
      const res = await axios.post(`${BASE_URL}/nlp/text-to-speech`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const recognized = res.data.text?.trim();
      if (recognized) {
        setInputText(recognized);
        // auto-send after a short pause
        setTimeout(handleSend, 500);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("STT error", "Could not transcribe audio.");
    }
  };

  const toggleMic = () => (recording ? stopRecording() : startRecording());

  /* -------------- 4. TEXT-TO-SPEECH (speaker) -------------- */
  const speakText = async (text: string) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/nlp/text-to-speech`,
        new URLSearchParams({ text }).toString(),
        { responseType: "blob" }
      );

      // Convert Blob → temporary file URI (expo-av can play a Blob via FileSystem)
      const reader = new FileReader();
      reader.onload = async () => {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: reader.result as string });
        await sound.playAsync();
        // unload after playback
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      };
      reader.readAsDataURL(res.data);
    } catch (e) {
      console.error(e);
      Alert.alert("TTS error", "Could not play audio.");
    }
  };

  /* -------------- 5. EFFECTS ---------------- */
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  /* -------------- 6. RENDER MESSAGE ---------------- */
  const renderMessage = (msg: Message) => (
    <View
      key={msg.id}
      style={[
        styles.messageBubble,
        msg.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      {msg.sender === "bot" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Markdown style={markdownStyles}>{msg.text}</Markdown>

          {/* Speaker icon */}
          <TouchableOpacity
            onPress={() => speakText(msg.text)}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name="volume-medium-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={[
            styles.messageText,
            msg.sender === "user"
              ? styles.userMessageText
              : styles.botMessageText,
          ]}
        >
          {msg.text}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Chatbot</Text>
      </View>

      {/* Chat messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100 ,justifyContent: "flex-end",}}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        {isLoading && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.botMessageText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="अपना प्रश्न यहाँ टाइप करें..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              opacity: inputText.trim() === "" || isLoading ? 0.6 : 1,
            },
          ]}
          onPress={handleSend}
          disabled={inputText.trim() === "" || isLoading}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Mic button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: recording ? "#d32f2f" : "#90a4ae" },
          ]}
          onPress={toggleMic}
        >
          <Ionicons
            name={recording ? "stop-circle" : "mic"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

/* ------------------------------------------------------------------ */
/* ----------------------------- STYLES ----------------------------- */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BACKGROUND },
  header: {
    backgroundColor: THEME_GREEN,
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#fff" },
  chatContainer: { flex: 1, paddingHorizontal: 15 ,marginBottom: 10},
  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessage: {
    backgroundColor: USER_BUBBLE_COLOR,
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },
  botMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 5,
  },
  messageText: { fontSize: 15, lineHeight: 20 },
  userMessageText: { color: "#333" },
  botMessageText: { color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "ios" ? 35 : 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    minHeight: 45,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sendButton: {
    backgroundColor: THEME_GREEN,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

/* Markdown styling (react-native-markdown-display) */
const markdownStyles = StyleSheet.create({
  body: { fontSize: 15, color: "#333" },
  paragraph: { fontSize: 15, color: "#333", lineHeight: 20 },
  strong: { fontWeight: "bold" },
  em: { fontStyle: "italic" },
  code_inline: {
    backgroundColor: "#f0f0f0",
    padding: 2,
    borderRadius: 3,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});

export default AIChatbot;