import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Race, CoursePoint } from '../types';

interface CourseMapProps {
  race: Race;
  spectatorPoints?: Array<{ id: string; mile: number; latitude: number; longitude: number; name: string }>;
  onMarkerPress?: (point: CoursePoint) => void;
}

export const CourseMap: React.FC<CourseMapProps> = ({ race, spectatorPoints, onMarkerPress }) => {
  const coordinates = race.course.map((point) => ({
    latitude: point.latitude,
    longitude: point.longitude,
  }));

  // Calculate center and region
  const avgLat = coordinates.reduce((sum, coord) => sum + coord.latitude, 0) / coordinates.length;
  const avgLng = coordinates.reduce((sum, coord) => sum + coord.longitude, 0) / coordinates.length;

  const region = {
    latitude: avgLat,
    longitude: avgLng,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF6B35"
          strokeWidth={4}
          lineDashPattern={[5, 5]}
        />
        {race.course.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.name || `Mile ${point.mile}`}
            pinColor="#FF6B35"
          />
        ))}
        {spectatorPoints?.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.name}
            pinColor="#4ECDC4"
            onPress={() => onMarkerPress?.(point as CoursePoint)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  map: {
    flex: 1,
  },
});

