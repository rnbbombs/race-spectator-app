import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Group, GroupMember } from '../types';
import { useAuth } from './AuthContext';

interface GroupContextType {
  currentGroup: Group | null;
  groups: Group[];
  isLoading: boolean;
  createGroup: (name: string, raceId: string) => Promise<Group>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: () => Promise<void>;
  addMember: (userId: string, role: GroupMember['role']) => Promise<void>;
  removeMember: (userId: string) => Promise<void>;
  setCurrentGroup: (group: Group | null) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const groupsData = await AsyncStorage.getItem('groups');
      if (groupsData) {
        const parsedGroups = JSON.parse(groupsData);
        setGroups(parsedGroups);
        const currentGroupData = await AsyncStorage.getItem('currentGroup');
        if (currentGroupData) {
          const group = parsedGroups.find((g: Group) => g.id === JSON.parse(currentGroupData));
          setCurrentGroup(group || null);
        }
      }
    } catch (error) {
      console.error('Error loading groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async (name: string, raceId: string): Promise<Group> => {
    if (!user) throw new Error('User must be logged in');

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      raceId,
      members: [
        {
          userId: user.id,
          role: 'organizer',
          joinedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setCurrentGroup(newGroup);
    await AsyncStorage.setItem('groups', JSON.stringify(updatedGroups));
    await AsyncStorage.setItem('currentGroup', JSON.stringify(newGroup.id));

    return newGroup;
  };

  const joinGroup = async (groupId: string) => {
    if (!user) throw new Error('User must be logged in');

    const group = groups.find((g) => g.id === groupId);
    if (!group) throw new Error('Group not found');

    const memberExists = group.members.some((m) => m.userId === user.id);
    if (memberExists) {
      setCurrentGroup(group);
      await AsyncStorage.setItem('currentGroup', JSON.stringify(group.id));
      return;
    }

    const newMember: GroupMember = {
      userId: user.id,
      role: 'spectator',
      joinedAt: new Date().toISOString(),
    };

    const updatedGroup = {
      ...group,
      members: [...group.members, newMember],
    };

    const updatedGroups = groups.map((g) => (g.id === groupId ? updatedGroup : g));
    setGroups(updatedGroups);
    setCurrentGroup(updatedGroup);
    await AsyncStorage.setItem('groups', JSON.stringify(updatedGroups));
    await AsyncStorage.setItem('currentGroup', JSON.stringify(groupId));
  };

  const leaveGroup = async () => {
    if (!user || !currentGroup) return;

    const updatedMembers = currentGroup.members.filter((m) => m.userId !== user.id);
    const updatedGroup = { ...currentGroup, members: updatedMembers };
    const updatedGroups = groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g));

    setGroups(updatedGroups);
    setCurrentGroup(null);
    await AsyncStorage.setItem('groups', JSON.stringify(updatedGroups));
    await AsyncStorage.removeItem('currentGroup');
  };

  const addMember = async (userId: string, role: GroupMember['role']) => {
    if (!currentGroup) return;

    const newMember: GroupMember = {
      userId,
      role,
      joinedAt: new Date().toISOString(),
    };

    const updatedGroup = {
      ...currentGroup,
      members: [...currentGroup.members, newMember],
    };

    const updatedGroups = groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g));
    setGroups(updatedGroups);
    setCurrentGroup(updatedGroup);
    await AsyncStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const removeMember = async (userId: string) => {
    if (!currentGroup) return;

    const updatedMembers = currentGroup.members.filter((m) => m.userId !== userId);
    const updatedGroup = { ...currentGroup, members: updatedMembers };
    const updatedGroups = groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g));

    setGroups(updatedGroups);
    setCurrentGroup(updatedGroup);
    await AsyncStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  return (
    <GroupContext.Provider
      value={{
        currentGroup,
        groups,
        isLoading,
        createGroup,
        joinGroup,
        leaveGroup,
        addMember,
        removeMember,
        setCurrentGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};

