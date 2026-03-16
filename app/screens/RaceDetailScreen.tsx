import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Race, SpectatorPoint } from '../types';
import { raceService } from '../services/raceService';
import { CourseMap } from '../components/CourseMap';
import { useGroup } from '../context/GroupContext';

export const RaceDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { raceId } = route.params;
  const { currentGroup, createGroup } = useGroup();
  const [race, setRace] = useState<Race | null>(null);
  const [spectatorPoints, setSpectatorPoints] = useState<SpectatorPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRaceDetails();
  }, [raceId]);

  const loadRaceDetails = async () => {
    try {
      const [raceData, points] = await Promise.all([
        raceService.getRaceById(raceId),
        raceService.getSpectatorPoints(raceId),
      ]);
      setRace(raceData);
      setSpectatorPoints(points);
    } catch (error) {
      console.error('Error loading race details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!race) return;
    try {
      await createGroup(`${race.name} Support Group`, race.id);
      navigation.navigate('GroupManagement');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (!race) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Race not found</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{race.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{race.distance} miles</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{formatDate(race.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{race.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time</Text>
          <Text style={styles.detailValue}>{race.startTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type</Text>
          <Text style={styles.detailValue}>{race.type.replace('-', ' ')}</Text>
        </View>
      </View>

      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Course Map</Text>
        <CourseMap race={race} spectatorPoints={spectatorPoints} />
      </View>

      {spectatorPoints.length > 0 && (
        <View style={styles.spectatorSection}>
          <Text style={styles.sectionTitle}>Recommended Spectator Points</Text>
          {spectatorPoints.map((point) => (
            <View key={point.id} style={styles.spectatorPoint}>
              <View style={styles.spectatorPointHeader}>
                <Text style={styles.spectatorPointName}>{point.name}</Text>
                <Text style={styles.spectatorPointMile}>Mile {point.mile}</Text>
              </View>
              {point.description && (
                <Text style={styles.spectatorPointDesc}>{point.description}</Text>
              )}
              <View style={styles.spectatorPointMeta}>
                {point.parkingAvailable && (
                  <Text style={styles.metaText}>🅿️ Parking Available</Text>
                )}
                {point.estimatedTravelTime && (
                  <Text style={styles.metaText}>
                    ⏱️ {point.estimatedTravelTime} min from previous
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {!currentGroup && (
        <TouchableOpacity style={styles.createGroupButton} onPress={handleCreateGroup}>
          <Text style={styles.createGroupButtonText}>Create Support Group</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate('MapNavigation', { raceId: race.id })}
      >
        <Text style={styles.navigationButtonText}>View Navigation Routes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  mapSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  spectatorSection: {
    padding: 16,
  },
  spectatorPoint: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  spectatorPointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spectatorPointName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  spectatorPointMile: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  spectatorPointDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  spectatorPointMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  createGroupButton: {
    backgroundColor: '#FF6B35',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createGroupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationButton: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  navigationButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});

