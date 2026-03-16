import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './app/context/AuthContext';
import { GroupProvider } from './app/context/GroupContext';
import { AppNavigator } from './app/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <GroupProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </GroupProvider>
    </AuthProvider>
  );
}
