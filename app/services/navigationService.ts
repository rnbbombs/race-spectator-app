import { SpectatorPoint } from '../types';

export interface NavigationRoute {
  points: SpectatorPoint[];
  totalTravelTime: number; // in minutes
  estimatedArrivalTimes: { pointId: string; arrivalTime: string }[];
}

export const navigationService = {
  calculateRoute: async (
    spectatorPoints: SpectatorPoint[],
    startLocation?: { latitude: number; longitude: number }
  ): Promise<NavigationRoute> => {
    // Simulate route calculation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Sort points by mile marker
    const sortedPoints = [...spectatorPoints].sort((a, b) => a.mile - b.mile);

    // Calculate cumulative travel time
    let totalTime = 0;
    const arrivalTimes = sortedPoints.map((point) => {
      totalTime += point.estimatedTravelTime || 15;
      const arrivalTime = new Date();
      arrivalTime.setMinutes(arrivalTime.getMinutes() + totalTime);
      return {
        pointId: point.id,
        arrivalTime: arrivalTime.toISOString(),
      };
    });

    return {
      points: sortedPoints,
      totalTravelTime: totalTime,
      estimatedArrivalTimes: arrivalTimes,
    };
  },

  getDirectionsUrl: (destination: { latitude: number; longitude: number }): string => {
    // Generate Google Maps directions URL
    return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
  },
};

