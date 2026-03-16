import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GroupMember } from '../types';

interface GroupMemberCardProps {
  member: GroupMember;
  isCurrentUser?: boolean;
}

export const GroupMemberCard: React.FC<GroupMemberCardProps> = ({ member, isCurrentUser }) => {
  const getRoleColor = (role: GroupMember['role']) => {
    switch (role) {
      case 'organizer':
        return '#FF6B35';
      case 'runner':
        return '#4ECDC4';
      default:
        return '#95A5A6';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {member.user?.name?.[0]?.toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {member.user?.name || 'Unknown User'} {isCurrentUser && '(You)'}
        </Text>
        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(member.role) }]}>
          <Text style={styles.roleText}>{member.role}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

