# Quick Start Guide

## Setup Steps

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure Google Maps API Key**:
   - Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Update `app.json` line 38: Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

3. **Run the app**:
   ```bash
   npm start
   ```
   Then press `i` for iOS simulator or `a` for Android emulator

## Testing the App

### Mock Data Available

The app includes mock data for testing:

- **Races**: Boston Marathon, NYC Half Marathon
- **Authentication**: Any email/password will work (mock authentication)
- **Groups**: Create groups and add members
- **Messages**: Chat functionality with mock data

### Test Flow

1. **Sign Up/Login**: Use any email and password
2. **Browse Races**: Go to Search tab or Home screen
3. **View Race Details**: Tap on any race card
4. **Create Group**: From race detail screen or home screen
5. **Group Chat**: Navigate to Group Management → Group Chat
6. **Navigation**: View navigation routes from race detail screen

## Project Structure

```
app/
├── components/       # Reusable UI components
│   ├── CourseMap.tsx
│   ├── GroupMemberCard.tsx
│   ├── NavigationButton.tsx
│   └── RaceCard.tsx
├── context/          # React Context providers
│   ├── AuthContext.tsx
│   └── GroupContext.tsx
├── navigation/       # Navigation setup
│   └── AppNavigator.tsx
├── screens/          # Screen components
│   ├── AuthScreen.tsx
│   ├── ChatScreen.tsx
│   ├── GroupManagementScreen.tsx
│   ├── HomeScreen.tsx
│   ├── MapNavigationScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── RaceDetailScreen.tsx
│   └── RaceSearchScreen.tsx
├── services/         # Business logic & API calls
│   ├── groupService.ts
│   ├── navigationService.ts
│   └── raceService.ts
├── types/            # TypeScript definitions
│   └── index.ts
└── utils/            # Utilities
    └── theme.ts
```

## Next Steps

1. **Connect to Real Backend**:
   - Update services to use real API endpoints
   - Replace mock authentication with Firebase/Supabase
   - Add real-time messaging with Firebase Realtime DB or Supabase

2. **Add Location Services**:
   - Implement actual location tracking
   - Connect to Google Maps API for real navigation
   - Add geofencing for spectator points

3. **Enhance Features**:
   - Push notifications
   - Runner tracking integration
   - Photo sharing
   - Weather integration

## Troubleshooting

### Maps not showing?
- Make sure Google Maps API key is configured in `app.json`
- Check that API key has Maps SDK enabled in Google Cloud Console

### Navigation not working?
- Ensure location permissions are granted
- Check that device/simulator has location services enabled

### Build errors?
- Run `npm install` again
- Clear cache: `npx expo start -c`
- Delete `node_modules` and reinstall

