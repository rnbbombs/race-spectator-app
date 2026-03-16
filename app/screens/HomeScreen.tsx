import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { raceService } from '../services/raceService';
import { Race } from '../types';
import { RaceCard } from '../components/RaceCard';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const { currentGroup } = useGroup();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRaces();
  }, []);

  const loadRaces = async () => {
    try {
      const data = await raceService.getAllRaces();
      setRaces(data);
    } catch (error) {
      console.error('Error loading races:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRaces();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Spectator'}!</Text>
          <Text style={styles.subtitle}>
            {currentGroup
              ? `Supporting: ${currentGroup.name}`
              : 'Find a race to support'}
          </Text>
        </View>
      </View>

      {currentGroup && (
        <TouchableOpacity
          style={styles.groupCard}
          onPress={() => navigation.navigate('GroupManagement')}
        >
          <Text style={styles.groupCardTitle}>Active Group</Text>
          <Text style={styles.groupCardName}>{currentGroup.name}</Text>
          <Text style={styles.groupCardMembers}>
            {currentGroup.members.length} member{currentGroup.members.length !== 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Races</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading races...</Text>
        ) : races.length === 0 ? (
          <Text style={styles.emptyText}>No races found</Text>
        ) : (
          races.map((race) => (
            <RaceCard
              key={race.id}
              race={race}
              onPress={() => navigation.navigate('RaceDetail', { raceId: race.id })}
            />
          ))
        )}
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('RaceSearch')}
        >
          <Text style={styles.actionButtonText}>Search Races</Text>
        </TouchableOpacity>
        {!currentGroup && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('GroupManagement')}
          >
            <Text style={styles.actionButtonText}>Create Group</Text>
          </TouchableOpacity>
        )}
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  groupCard: {
    backgroundColor: '#FF6B35',
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  groupCardTitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  groupCardName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  groupCardMembers: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  quickActions: {
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});

