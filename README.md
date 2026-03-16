# Race Spectator App

A mobile app that helps supporters and spectators of races (marathons, ultra marathons, half marathons) manage their groups, coordinate logistics around the course, and determine optimal spectator locations to support their runners.

## Features

### Core Features
- **Group Management**: Create and join spectator groups, manage members, assign roles (organizer, spectator, runner)
- **Race Information**: Search and view race details, course maps, mile markers, and aid stations
- **Communication**: Group chat with location sharing capabilities
- **Navigation**: Optimal spectator point identification and navigation routing

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **State Management**: React Context API
- **Maps**: React Native Maps
- **Storage**: AsyncStorage
- **UI**: Custom components with modern/minimalist design (Evite + Strava aesthetic)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Google Maps API Key:
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Update `app.json` with your API key:
     ```json
     "plugins": [
       [
         "react-native-maps",
         {
           "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
         }
       ]
     ]
     ```

### Running the App

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

## Project Structure

```
/app
  /screens          # Screen components
  /components       # Reusable UI components
  /navigation       # Navigation configuration
  /services         # API and business logic
  /context          # React Context providers
  /types            # TypeScript type definitions
  /utils            # Utility functions and theme
```

## Key Screens

1. **Auth Screen**: Login/Signup
2. **Home Screen**: Dashboard with active race and group info
3. **Race Detail Screen**: Race information and course map
4. **Group Management Screen**: Create/manage spectator groups
5. **Chat Screen**: Group messaging with location sharing
6. **Map Navigation Screen**: Spectator point routes and navigation
7. **Profile Screen**: User settings and account management

## Design System

- **Primary Color**: #FF6B35 (Athletic orange/red)
- **Secondary Color**: #4ECDC4 (Clean teal)
- **Style**: Modern/Minimalist (Evite + Strava aesthetic)
- **Typography**: Clean, readable sans-serif
- **Components**: Card-based layouts with rounded corners

## Development Notes

### Mock Data
Currently, the app uses mock data for races and groups. To connect to a real backend:

1. Update `app/services/raceService.ts` with actual API calls
2. Update `app/services/groupService.ts` with real-time messaging (Firebase/Supabase)
3. Update `app/context/AuthContext.tsx` with real authentication

### Location Services
The app is configured for location services but requires:
- Google Maps API key for maps functionality
- Location permissions (already configured in app.json)

## Future Enhancements

- Real-time runner tracking integration
- Push notifications
- Advanced route optimization
- Parking availability updates
- Weather integration for race day
- Social features (share photos, cheer messages)

## License

MIT

