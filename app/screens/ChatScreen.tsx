import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { groupService } from '../services/groupService';
import { Message } from '../types';

export const ChatScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const { currentGroup } = useGroup();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (currentGroup) {
      loadMessages();
      // In a real app, you would set up real-time listeners here
    }
  }, [currentGroup]);

  const loadMessages = async () => {
    if (!currentGroup) return;

    try {
      const data = await groupService.getMessages(currentGroup.id);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !currentGroup || !user) return;

    try {
      const newMessage = await groupService.sendMessage(
        currentGroup.id,
        user.id,
        inputText.trim()
      );
      setMessages([...messages, { ...newMessage, user }]);
      setInputText('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleShareLocation = async () => {
    if (!currentGroup || !user) return;

    // In a real app, you would get the user's current location
    const mockLocation = {
      latitude: 42.3600,
      longitude: -71.0700,
      mile: 5,
    };

    try {
      const newMessage = await groupService.sendLocationMessage(
        currentGroup.id,
        user.id,
        mockLocation
      );
      setMessages([...messages, { ...newMessage, user }]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.userId === user?.id;
    const displayName = item.user?.name || 'Unknown User';

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        {!isCurrentUser && (
          <Text style={styles.messageSender}>{displayName}</Text>
        )}
        {item.location ? (
          <View style={styles.locationMessage}>
            <Text style={styles.locationText}>📍 {item.text}</Text>
            {item.location.mile && (
              <Text style={styles.locationMile}>Mile {item.location.mile}</Text>
            )}
          </View>
        ) : (
          <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
            {item.text}
          </Text>
        )}
        <Text style={styles.messageTime}>
          {new Date(item.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  if (!currentGroup) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No active group</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentGroup.name}</Text>
        <Text style={styles.headerSubtitle}>Group Chat</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.locationButton} onPress={handleShareLocation}>
          <Text style={styles.locationButtonText}>📍</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '75%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B35',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  currentUserText: {
    color: '#fff',
    fontSize: 15,
  },
  otherUserText: {
    color: '#1a1a1a',
    fontSize: 15,
  },
  locationMessage: {
    marginBottom: 4,
  },
  locationText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  locationMile: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  locationButton: {
    padding: 8,
    marginRight: 8,
  },
  locationButtonText: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
});

