import { Race, CoursePoint, SpectatorPoint } from '../types';

// Mock race data - replace with actual API calls
const mockRaces: Race[] = [
  {
    id: '1',
    name: 'Boston Marathon',
    date: '2024-04-15',
    location: 'Boston, MA',
    distance: 26.2,
    startTime: '09:00',
    type: 'marathon',
    course: [
      { id: '1', mile: 0, latitude: 42.3521, longitude: -71.0756, name: 'Start Line' },
      { id: '2', mile: 5, latitude: 42.3600, longitude: -71.0700, name: 'Mile 5' },
      { id: '3', mile: 10, latitude: 42.3700, longitude: -71.0650, name: 'Mile 10' },
      { id: '4', mile: 13.1, latitude: 42.3800, longitude: -71.0600, name: 'Halfway Point' },
      { id: '5', mile: 20, latitude: 42.3900, longitude: -71.0550, name: 'Mile 20' },
      { id: '6', mile: 26.2, latitude: 42.4000, longitude: -71.0500, name: 'Finish Line' },
    ],
  },
  {
    id: '2',
    name: 'NYC Half Marathon',
    date: '2024-03-17',
    location: 'New York, NY',
    distance: 13.1,
    startTime: '07:00',
    type: 'half-marathon',
    course: [
      { id: '1', mile: 0, latitude: 40.7580, longitude: -73.9855, name: 'Start Line' },
      { id: '2', mile: 5, latitude: 40.7500, longitude: -73.9800, name: 'Mile 5' },
      { id: '3', mile: 10, latitude: 40.7400, longitude: -73.9750, name: 'Mile 10' },
      { id: '4', mile: 13.1, latitude: 40.7300, longitude: -73.9700, name: 'Finish Line' },
    ],
  },
];

const mockSpectatorPoints: SpectatorPoint[] = [
  {
    id: '1',
    raceId: '1',
    mile: 5,
    latitude: 42.3600,
    longitude: -71.0700,
    name: 'Wellesley Square',
    description: 'Great spectator spot with parking nearby',
    parkingAvailable: true,
    estimatedTravelTime: 15,
  },
  {
    id: '2',
    raceId: '1',
    mile: 13.1,
    latitude: 42.3800,
    longitude: -71.0600,
    name: 'Halfway Point',
    description: 'Perfect spot to see runners at the midpoint',
    parkingAvailable: true,
    estimatedTravelTime: 20,
  },
  {
    id: '3',
    raceId: '1',
    mile: 20,
    latitude: 42.3900,
    longitude: -71.0550,
    name: 'Heartbreak Hill',
    description: 'Famous challenging section - great for support',
    parkingAvailable: false,
    estimatedTravelTime: 25,
  },
];

export const raceService = {
  searchRaces: async (query: string): Promise<Race[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!query) return mockRaces;
    return mockRaces.filter(
      (race) =>
        race.name.toLowerCase().includes(query.toLowerCase()) ||
        race.location.toLowerCase().includes(query.toLowerCase())
    );
  },

  getRaceById: async (id: string): Promise<Race | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockRaces.find((race) => race.id === id) || null;
  },

  getAllRaces: async (): Promise<Race[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockRaces;
  },

  getSpectatorPoints: async (raceId: string): Promise<SpectatorPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSpectatorPoints.filter((point) => point.raceId === raceId);
  },

  getOptimalSpectatorRoute: async (
    raceId: string,
    startLocation?: { latitude: number; longitude: number }
  ): Promise<SpectatorPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const points = await raceService.getSpectatorPoints(raceId);
    // Sort by mile marker for optimal route
    return points.sort((a, b) => a.mile - b.mile);
  },
};

