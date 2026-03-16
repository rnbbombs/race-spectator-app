import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { GroupMemberCard } from '../components/GroupMemberCard';

export const GroupManagementScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const { currentGroup, createGroup, leaveGroup, removeMember } = useGroup();
  const [groupName, setGroupName] = useState('');
  const [raceId, setRaceId] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(!currentGroup);

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !raceId.trim()) {
      Alert.alert('Error', 'Please enter both group name and race ID');
      return;
    }

    try {
      await createGroup(groupName, raceId);
      setShowCreateForm(false);
      Alert.alert('Success', 'Group created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create group');
      console.error(error);
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert('Leave Group', 'Are you sure you want to leave this group?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave',
        style: 'destructive',
        onPress: async () => {
          try {
            await leaveGroup();
            navigation.navigate('Home');
          } catch (error) {
            Alert.alert('Error', 'Failed to leave group');
          }
        },
      },
    ]);
  };

  const handleRemoveMember = (memberId: string) => {
    if (memberId === user?.id) {
      handleLeaveGroup();
      return;
    }

    Alert.alert('Remove Member', 'Are you sure you want to remove this member?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeMember(memberId);
          } catch (error) {
            Alert.alert('Error', 'Failed to remove member');
          }
        },
      },
    ]);
  };

  if (showCreateForm) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Support Group</Text>
          <Text style={styles.subtitle}>
            Create a group to coordinate with other spectators
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Boston Marathon Support Team"
            value={groupName}
            onChangeText={setGroupName}
          />

          <Text style={styles.label}>Race ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter race ID"
            value={raceId}
            onChangeText={setRaceId}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
            <Text style={styles.createButtonText}>Create Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setShowCreateForm(false);
              navigation.goBack();
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (!currentGroup) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No active group</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateForm(true)}
        >
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isOrganizer = currentGroup.members.some(
    (m) => m.userId === user?.id && m.role === 'organizer'
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentGroup.name}</Text>
        <Text style={styles.subtitle}>
          {currentGroup.members.length} member{currentGroup.members.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Members</Text>
        {currentGroup.members.map((member) => (
          <GroupMemberCard
            key={member.userId}
            member={member}
            isCurrentUser={member.userId === user?.id}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.actionButtonText}>Group Chat</Text>
        </TouchableOpacity>

        {isOrganizer && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('InviteMembers')}
          >
            <Text style={styles.actionButtonText}>Invite Members</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.leaveButton]}
          onPress={handleLeaveGroup}
        >
          <Text style={[styles.actionButtonText, styles.leaveButtonText]}>Leave Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  createButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  leaveButton: {
    borderColor: '#FF6B35',
  },
  leaveButtonText: {
    color: '#FF6B35',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

