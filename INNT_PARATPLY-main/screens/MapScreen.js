import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { globalStyles } from "../styles/globalStyles";

const MapScreen = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // For Rental Prices Pop-up
  const mapRef = useRef(null); // Reference to MapView

  useEffect(() => { //  // Funktion til at hente paraplystationer fra Firestore
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "umbrella_stations")); // Henter alle dokumenter fra kollektionen "umbrella_stations" i Firestore
        const stationsList = querySnapshot.docs.map((doc) => ({ // Mapper hvert dokument til et objekt med dets ID og øvrige data
          id: doc.id, // Dokumentets unikke ID
          ...doc.data(), // Dokumentets øvrige datafelter
        }));
        setStations(stationsList); // Opdaterer state med listen af paraplystationer
      } catch (error) {
        console.error("Error fetching stations:", error); // Logger fejl, hvis der opstår problemer med at hente data
      } finally {
        setLoading(false); // Stopper indlæsningsindikatoren, uanset om datahentningen lykkes eller fejler
      }
    };

    const getUserLocation = async () => {
        // Anmoder om tilladelse til at få adgang til brugerens placering
        let { status } = await Location.requestForegroundPermissionsAsync();
      
        // Tjekker om tilladelse blev givet
        if (status !== "granted") {
          // Logger en fejl, hvis brugeren afviser tilladelsen
          console.error("Permission to access location was denied");
          return; // Afslutter funktionen tidligt, hvis tilladelse ikke gives
        }
      
        // Henter brugerens aktuelle placering
        const location = await Location.getCurrentPositionAsync({});
      
        // Gemmer placeringen i state som latitude og longitude
        setUserLocation({
          latitude: location.coords.latitude, // Brugerens breddegrad
          longitude: location.coords.longitude, // Brugerens længdegrad
        });
      };      
    fetchStations();
    getUserLocation();
  }, []);

  const centerToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      {loading || !userLocation ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          {/* Top Buttons */}
          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.button} onPress={centerToUserLocation}>
              <Text style={styles.buttonText}>YOUR LOCATION</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>NEAREST STATION</Text>
            </TouchableOpacity>
          </View>

          {/* MapView */}
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true}
          >
            {stations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                onPress={() => setSelectedStation(station)}
              >
                <Image
                  source={require("../assets/umbrella-icon.png")}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </Marker>
            ))}
          </MapView>

          {/* Bottom Info Panel */}
          {selectedStation && (
            <View style={styles.stationInfo}>
              <Text style={styles.stationTitle}>{selectedStation.location}</Text>
              <View style={styles.stationStats}>
                <View style={styles.statsColumn}>
                  <Text style={styles.statsValue}>{selectedStation.availableUmbrellas ?? 0}</Text>
                  <Text style={styles.statsLabel}>TOTAL UMBRELLAS</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.statsColumn}>
                  <Text style={styles.statsValue}>
                    {Math.max(
                      (selectedStation.totalSlots ?? 0) - (selectedStation.availableUmbrellas ?? 0),
                      0
                    )}
                  </Text>
                  <Text style={styles.statsLabel}>FREE SLOTS</Text>
                </View>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={require("../assets/info-icon.png")}
                    style={styles.infoIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rentButton}>
                  <Text style={styles.rentButtonText}>RENT AN UMBRELLA</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      {/* Rental Prices Pop-up */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rental Prices</Text>
            <Text>1 hour rental: Free</Text>
            <Text>24 hour rental: DKK20,00</Text>
            <Text>48 hour rentale: DKK50,00</Text>
            <Text>72 hour rental: DKK100,00</Text>
            <Text style={{ marginBottom: 10 }}></Text>
            <Text>For more than 72 hour rental you can buy the umbrella for a total amount of: DKK230,00</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  topButtons: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: { fontWeight: "bold", color: "#333" },
  stationInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stationTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  stationSubtitle: { fontSize: 14, color: "#888", marginBottom: 10 },
  stationStats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  statsColumn: { alignItems: "center", width: "50%" },
  statsValue: { fontSize: 32, fontWeight: "bold", color: "#555" },
  statsLabel: { fontSize: 12, color: "#999" },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  infoButton: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoIcon: { 
    width: 24, 
    height: 24, 
    resizeMode: "contain",
  },
  rentButton: {
    backgroundColor: "#00C6A9",
    borderRadius: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  rentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#00C6A9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});

export default MapScreen;

