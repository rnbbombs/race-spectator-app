export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  raceId: string;
  members: GroupMember[];
  createdAt: string;
  createdBy: string;
}

export interface GroupMember {
  userId: string;
  role: 'organizer' | 'spectator' | 'runner';
  joinedAt: string;
  user?: User;
}

export interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
  distance: number; // in miles
  startTime: string;
  course: CoursePoint[];
  elevation?: ElevationPoint[];
  type: 'marathon' | 'half-marathon' | 'ultra-marathon';
}

export interface CoursePoint {
  id: string;
  mile: number;
  latitude: number;
  longitude: number;
  name?: string;
  type?: 'aid-station' | 'spectator-point' | 'checkpoint';
}

export interface ElevationPoint {
  mile: number;
  elevation: number; // in feet
}

export interface Message {
  id: string;
  groupId: string;
  userId: string;
  text: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    mile?: number;
  };
  user?: User;
}

export interface SpectatorPoint {
  id: string;
  raceId: string;
  mile: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  parkingAvailable?: boolean;
  estimatedTravelTime?: number; // minutes from previous point
}

