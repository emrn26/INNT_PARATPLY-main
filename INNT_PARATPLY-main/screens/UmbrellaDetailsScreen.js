import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UmbrellaDetailsScreen = ({ route }) => {
  // Modtager data om stationen fra navigationens parametre
  const { station } = route.params;

  // Beregner antal ledige pladser (slots)
  const slotsLeft = station.totalSlots - station.availableUmbrellas; 
  // 'totalSlots' er det samlede antal pladser, og 'availableUmbrellas' er antallet af paraplyer, der stadig er tilgængelige.

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Umbrella Station Details</Text>
      
      <View style={styles.detailBox}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{station.location}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Total Slots:</Text>
        <Text style={styles.value}>{station.totalSlots}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Available Umbrellas:</Text>
        <Text style={styles.value}>{station.availableUmbrellas}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Slots Left:</Text>
        <Text style={styles.value}>{slotsLeft}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  detailBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
});

export default UmbrellaDetailsScreen;
