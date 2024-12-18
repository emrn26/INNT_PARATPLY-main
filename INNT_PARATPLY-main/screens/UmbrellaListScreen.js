import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Importér din Firebase config

const UmbrellaListScreen = () => {
  const [umbrellaStations, setUmbrellaStations] = useState([]); // State til at holde listen over paraplystationer
  const [loading, setLoading] = useState(true); // State til at indikere, om data indlæses

  useEffect(() => {
    // Asynkron funktion til at hente paraplystationer fra Firestore
    const fetchStations = async () => {
      try {
        // Henter alle dokumenter fra Firestore-samlingen "umbrella_stations"
        const querySnapshot = await getDocs(collection(db, "umbrella_stations"));
        const stations = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Dokumentets unikke ID
          ...doc.data(), // De resterende data i dokumentet
        }));
        // Opdaterer state med listen af paraplystationer
        setUmbrellaStations(stations);
      } catch (error) {
        // Logger fejl, hvis der opstår problemer med datahentningen
        console.error("Error fetching umbrella stations:", error);
      } finally {
        // Stopper indlæsningsindikatoren, når data er hentet eller fejlet
        setLoading(false);
      }
    };
    fetchStations(); // Kalder funktionen til at hente data
  }, []); // Tom afhængighedsliste sikrer, at dette kun kører ved komponentens første render


// Loader-indikator: Viser en indlæsningsskærm, mens data behandles
if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Aktivitetindikator for at vise, at data hentes */}
        <ActivityIndicator size="large" color="#4db8ff" />
        {/* Tekst, der informerer brugeren om, at data er under indlæsning */}
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Umbrella List</Text>
      <FlatList
        data={umbrellaStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.location}>{item.location}</Text>
              <TouchableOpacity style={[styles.statusButton, { backgroundColor: getStatusColor(item.available) }]}>
                <Text style={styles.statusText}>Rent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.count}>{item.available}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Funktion til at bestemme farve
const getStatusColor = (available) => {
  if (available > 3) return "green";
  if (available > 0) return "yellow";
  return "red";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginRight: 10,
  },
  statusButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UmbrellaListScreen;
