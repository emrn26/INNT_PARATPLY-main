import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState("None"); // State til nuværende abonnement

  useEffect(() => { // useEffect til at overvåge ændringer i brugerens autentificeringstilstand
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // Lytter til ændringer i autentificeringstilstand (f.eks. login/log ud)
      setUser(currentUser ? currentUser : null); // Sætter brugerobjektet eller `null` hvis der ikke er logget ind
    });
    return unsubscribe;  // Returnerer unsubscribe-funktionen for at stoppe lytteren, når komponenten unmountes
  }, []); // Tom afhængighedsliste sikrer, at dette kun kører én gang ved mount

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Logger brugeren ud fra Firebase-authentifikation
      Alert.alert("Logged Out", "You have been logged out successfully.");
      navigation.replace("Auth"); // Navigerer brugeren tilbage til autentificeringsskærmen
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

//Tilføj subscriptopn
  const handleAddSubscription = (subscription) => {
    setCurrentSubscription(subscription);
    Alert.alert("Subscription Added", `You have selected the ${subscription} plan.`);
  };

  //Statisk visning af "Previous orders".
  const previousOrders = [
    { id: "12345", date: "July 15, 2024", location: "Copenhagen Central", status: "Returned" },
    { id: "12346", date: "August 22, 2024", location: "Nyhavn", status: "Returned" },
    { id: "12347", date: "September 10, 2024", location: "Tivoli Gardens", status: "Pending" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ParatPly Profile</Text>

      {/* Brugeroplysninger */}
      {user && (
        <View style={styles.card}>
          <Text style={styles.infoText}>Name: Alex Johnson</Text>
          <Text style={styles.infoText}>Email: {user.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Previous Orders */}
      <Text style={styles.sectionHeader}>Previous Orders</Text>
      {previousOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderText}>Order #{order.id}</Text>
          <Text>Date: {order.date}</Text>
          <Text>Location: {order.location}</Text>
          <Text>Status: {order.status}</Text>
        </View>
      ))}

      {/* Current Subscription */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Current Subscription</Text>
        <Text style={styles.currentSubscriptionText}>{currentSubscription}</Text>
      </View>

      {/* Subscription Options */}
      <View style={styles.combinedSubscriptionBox}>
        <Text style={styles.sectionHeader}>Subscription Options</Text>

        <View style={styles.singleSubscription}>
          <Text style={styles.planHeader}>Silver-Premium</Text>
          <Text style={styles.planText}>50% off on umbrella rentals</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddSubscription("Silver-Premium")}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.singleSubscription}>
          <Text style={styles.planHeader}>Gold-Premium</Text>
          <Text style={styles.planText}>50 DKK/month for unlimited rentals</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddSubscription("Gold-Premium")}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Log Out */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogOut}>
        <Text style={globalStyles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentSubscriptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4db8ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#4db8ff",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: "#d9f0ff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderText: {
    fontWeight: "bold",
  },
  combinedSubscriptionBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 15,
  },
  singleSubscription: {
    paddingVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  planHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  planText: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProfileScreen;

