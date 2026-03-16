import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Platform } from 'react-native';
import { navigationService } from '../services/navigationService';

interface NavigationButtonProps {
  destination: { latitude: number; longitude: number };
  label?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  destination,
  label = 'Navigate',
}) => {
  const handlePress = async () => {
    const url = navigationService.getDirectionsUrl(destination);
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Fallback to Apple Maps on iOS or Google Maps on Android
        const fallbackUrl =
          Platform.OS === 'ios'
            ? `http://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`
            : `google.navigation:q=${destination.latitude},${destination.longitude}`;
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error('Error opening navigation:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

