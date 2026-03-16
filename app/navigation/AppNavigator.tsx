import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RaceDetailScreen } from '../screens/RaceDetailScreen';
import { RaceSearchScreen } from '../screens/RaceSearchScreen';
import { GroupManagementScreen } from '../screens/GroupManagementScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { MapNavigationScreen } from '../screens/MapNavigationScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={RaceSearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="RaceDetail"
              component={RaceDetailScreen}
              options={{ headerShown: true, title: 'Race Details' }}
            />
            <Stack.Screen
              name="RaceSearch"
              component={RaceSearchScreen}
              options={{ headerShown: true, title: 'Search Races' }}
            />
            <Stack.Screen
              name="GroupManagement"
              component={GroupManagementScreen}
              options={{ headerShown: true, title: 'Group Management' }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerShown: true, title: 'Group Chat' }}
            />
            <Stack.Screen
              name="MapNavigation"
              component={MapNavigationScreen}
              options={{ headerShown: true, title: 'Navigation' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

