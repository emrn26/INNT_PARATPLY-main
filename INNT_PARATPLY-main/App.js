// Denne fil fungerer sandsynligvis som udgangspunkt for at opsætte navigation i appen.
import React from 'react';
// Importerer nødvendige navigationselementer fra React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Til stack-baseret navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Til bundbaseret navigation
import { Ionicons } from '@expo/vector-icons'; // Ikoner fra Expo, ofte brugt til tab-bar ikoner

// Importerer skærmkomponenter fra projektets "screens"-mappe
import AuthScreen from './screens/AuthScreen'; // Skærm til login eller autentificering
import MainScreen from './screens/MainScreen'; // Hovedskærmen efter login
import MapScreen from './screens/MapScreen'; // Skærm til at vise kort
import ProfileScreen from './screens/ProfileScreen'; // Brugerens profilskærm
import QRScannerScreen from './screens/QRScannerScreen'; // Skærm til QR-scanning
import ReservationScreen from './screens/ReservationScreen'; // Skærm til reservationer
import WeatherForecastScreen from './screens/WeatherForecastScreen'; // Skærm til vejrudsigt
import EditProfileScreen from './screens/EditProfileScreen'; // Skærm til redigering af brugerprofil
import UmbrellaDetailsScreen from './screens/UmbrellaDetailsScreen'; // Skærm med detaljer om en paraply
import UmbrellaListScreen from './screens/UmbrellaListScreen'; // Liste over paraplyer

// Stack Navigator
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Bottom Tabs Component
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          height: 60,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Map Tab */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Umbrella List Tab */}
      <Tab.Screen
        name="UmbrellaList"
        component={UmbrellaListScreen}
        options={{
          tabBarLabel: "Umbrellas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="umbrella-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Weather Forecast Tab */}
      <Tab.Screen
        name="Weather"
        component={WeatherForecastScreen}
        options={{
          tabBarLabel: "Weather",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Authentication Screen */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Authentication", headerShown: false }}
        />

        {/* Bottom Tabs */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ title: "ParatPly", headerShown: false }}
        />

        {/* Additional Screens */}
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{ title: "Scan QR Code" }}
        />

        <Stack.Screen
          name="Reservation"
          component={ReservationScreen}
          options={{ title: "Reservation" }}
        />

        <Stack.Screen
          name="WeatherForecast"
          component={WeatherForecastScreen}
          options={{ title: "Weather Forecast" }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: "Edit Profile" }}
        />

        {/* Umbrella Details Screen */}
        <Stack.Screen
          name="UmbrellaDetails"
          component={UmbrellaDetailsScreen}
          options={{ title: "Umbrella Details" }}
        />

        {/* Umbrella List Screen */}
        <Stack.Screen
          name="UmbrellaList"
          component={UmbrellaListScreen}
          options={{ title: "Umbrella List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

