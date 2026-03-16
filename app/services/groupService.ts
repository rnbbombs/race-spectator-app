import { Group, Message } from '../types';

// Mock data storage - replace with actual API calls
let mockMessages: Message[] = [];

export const groupService = {
  getMessages: async (groupId: string): Promise<Message[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockMessages.filter((msg) => msg.groupId === groupId);
  },

  sendMessage: async (groupId: string, userId: string, text: string): Promise<Message> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const newMessage: Message = {
      id: Date.now().toString(),
      groupId,
      userId,
      text,
      timestamp: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    return newMessage;
  },

  sendLocationMessage: async (
    groupId: string,
    userId: string,
    location: { latitude: number; longitude: number; mile?: number }
  ): Promise<Message> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const newMessage: Message = {
      id: Date.now().toString(),
      groupId,
      userId,
      text: `I'm at mile ${location.mile || '?'}`,
      timestamp: new Date().toISOString(),
      location,
    };
    mockMessages.push(newMessage);
    return newMessage;
  },
};

