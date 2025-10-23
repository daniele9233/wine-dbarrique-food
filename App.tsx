// App.tsx
// Configurazione finale navigazione completa con Safe Area

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from './constants/Colors';

// Import schermate
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecipesScreen from './screens/RecipesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: Colors.background,
              borderTopColor: Colors.border,
              borderTopWidth: 1,
              height: Platform.OS === 'ios' ? 85 : 70, // Più spazio su Android
              paddingBottom: Platform.OS === 'ios' ? 25 : 12, // Padding extra per safe area
              paddingTop: 8,
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textMuted,
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarIconStyle: {
              marginTop: 4,
            },
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Collezione" 
            component={CollectionScreen}
            options={{
              tabBarLabel: 'Collezione',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="wine-bar" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="dashboard" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen 
            name="Ricette" 
            component={RecipesScreen}
            options={{
              tabBarLabel: 'Ricette',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="restaurant-menu" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}