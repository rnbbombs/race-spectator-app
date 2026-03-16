import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { raceService } from '../services/raceService';
import { navigationService } from '../services/navigationService';
import { CourseMap } from '../components/CourseMap';
import { NavigationButton } from '../components/NavigationButton';
import { Race, SpectatorPoint } from '../types';

export const MapNavigationScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { raceId } = route.params;
  const [race, setRace] = useState<Race | null>(null);
  const [spectatorPoints, setSpectatorPoints] = useState<SpectatorPoint[]>([]);
  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNavigationData();
  }, [raceId]);

  const loadNavigationData = async () => {
    try {
      const [raceData, points] = await Promise.all([
        raceService.getRaceById(raceId),
        raceService.getOptimalSpectatorRoute(raceId),
      ]);

      setRace(raceData);
      setSpectatorPoints(points);

      if (points.length > 0) {
        const route = await navigationService.calculateRoute(points);
        setRouteData(route);
      }
    } catch (error) {
      console.error('Error loading navigation data:', error);
    } finally {
      setLoading(false);
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigation Routes</Text>
        <Text style={styles.subtitle}>
          Optimal spectator points for {race.name}
        </Text>
      </View>

      {race && (
        <View style={styles.mapSection}>
          <CourseMap race={race} spectatorPoints={spectatorPoints} />
        </View>
      )}

      {routeData && (
        <View style={styles.routeInfo}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeTitle}>Recommended Route</Text>
            <Text style={styles.routeTime}>
              Total: ~{routeData.totalTravelTime} minutes
            </Text>
          </View>

          <View style={styles.pointsList}>
            {routeData.points.map((point: SpectatorPoint, index: number) => {
              const arrivalTime = routeData.estimatedArrivalTimes.find(
                (et: any) => et.pointId === point.id
              );
              return (
                <View key={point.id} style={styles.pointCard}>
                  <View style={styles.pointHeader}>
                    <View style={styles.pointNumber}>
                      <Text style={styles.pointNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.pointInfo}>
                      <Text style={styles.pointName}>{point.name}</Text>
                      <Text style={styles.pointMile}>Mile {point.mile}</Text>
                    </View>
                  </View>

                  {point.description && (
                    <Text style={styles.pointDescription}>{point.description}</Text>
                  )}

                  <View style={styles.pointMeta}>
                    {point.parkingAvailable && (
                      <Text style={styles.metaBadge}>🅿️ Parking</Text>
                    )}
                    {point.estimatedTravelTime && (
                      <Text style={styles.metaText}>
                        {point.estimatedTravelTime} min travel
                      </Text>
                    )}
                    {arrivalTime && (
                      <Text style={styles.metaText}>
                        Arrive: {new Date(arrivalTime.arrivalTime).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </Text>
                    )}
                  </View>

                  <NavigationButton
                    destination={{ latitude: point.latitude, longitude: point.longitude }}
                    label="Navigate Here"
                  />
                </View>
              );
            })}
          </View>
        </View>
      )}

      {spectatorPoints.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No spectator points available for this race</Text>
        </View>
      )}
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
  mapSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  routeInfo: {
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  routeTime: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  pointsList: {
    gap: 12,
  },
  pointCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pointNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pointInfo: {
    flex: 1,
  },
  pointName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  pointMile: {
    fontSize: 14,
    color: '#666',
  },
  pointDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  pointMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metaBadge: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

