// App.tsx
// Configurazione Android-specific per tab bar

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/Colors';
import { WineProvider } from './contexts/WineContext';

// Import schermate
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecipesScreen from './screens/RecipesScreen';
import WineDetailScreen from './screens/WineDetailScreen';
import AddWineScreen from './screens/AddWineScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator per Collection
function CollectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CollectionMain" component={CollectionScreen} />
      <Stack.Screen name="WineDetail" component={WineDetailScreen} />
      <Stack.Screen name="AddWine" component={AddWineScreen} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 25,
            paddingTop: 8,
            elevation: 0,
          },
          android: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 6,
            paddingTop: 6,
            elevation: 8,
          },
        }),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarHideOnKeyboard: Platform.OS === 'android',
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
        component={CollectionStack}
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
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <WineProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </WineProvider>
    </SafeAreaProvider>
  );
}
