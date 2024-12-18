import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Velkomsttekst */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Welcome to ParatPly</Text>
      </View>

      {/* Fire ikoner i grid */}
      <View style={styles.iconGrid}>
        {/* Weather */}
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => navigation.navigate("WeatherForecast")}
        >
          <FontAwesome name="cloud" size={40} color="white" />
          <Text style={styles.iconText}>Weather</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome name="user" size={40} color="white" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>

        {/* Map */}
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => navigation.navigate("Map")}
        >
          <Entypo name="map" size={40} color="white" />
          <Text style={styles.iconText}>Map</Text>
        </TouchableOpacity>

        {/* Umbrella List */}
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => navigation.navigate("UmbrellaList")}
        >
          <FontAwesome name="umbrella" size={40} color="white" />
          <Text style={styles.iconText}>Umbrella List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stil til layoutet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconBox: {
    width: 100,
    height: 100,
    backgroundColor: "#4db8ff",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default MainScreen;

