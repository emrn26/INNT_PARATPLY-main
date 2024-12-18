import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { updateEmail, updatePassword } from "firebase/auth";

// Skærm til redigering af brugerprofil
const EditProfileScreen = ({ navigation }) => {
  const user = auth.currentUser; // Henter den aktuelt loggede bruger fra Firebase

  const [name, setName] = useState("Alex Johnson"); // Standardnavn til navn-input
  const [email, setEmail] = useState(user?.email || ""); // Indlæser brugerens aktuelle email fra Firebase
  const [password, setPassword] = useState(""); // State til nyt password

  // Funktion til at gemme ændringer i brugerprofilen
  const handleSave = async () => {
    try {
      // Opdatering af email, hvis den er ændret
      if (email !== user.email) {
        await updateEmail(user, email);
        Alert.alert("Success", "Email updated successfully!");
      }
      // Opdatering af password, hvis der er indtastet et nyt
      if (password.length > 0) {
        await updatePassword(user, password);
        Alert.alert("Success", "Password updated successfully!");
      }
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack(); // Navigerer tilbage efter succesfuld opdatering
    } catch (error) {
      Alert.alert("Error", error.message); // Fejlhåndtering med en alert
    }
  };

  return (
    <View style={styles.container}>
      {/* Overskrift til siden */}
      <Text style={styles.header}>Edit Profile</Text>

      {/* Sektion til redigering af navn */}
      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} // Opdaterer navnet i state
      />

      {/* Sektion til redigering af email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail} // Opdaterer emailen i state
        keyboardType="email-address" // Sikrer at brugeren får en email-specifik tastaturtype
      />

      {/* Sektion til ændring af password */}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password" // Pladsholder for password-input
        secureTextEntry // Gør inputtet skjult for øget sikkerhed
        value={password}
        onChangeText={setPassword} // Opdaterer password i state
      />

      {/* Knap til at gemme ændringer */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stilarter til komponentens layout og elementer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Lys baggrundsfarve for at give et rent udseende
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20, // Plads under overskriften
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Plads mellem label og input
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", // Grå kant om inputfelter
    padding: 10,
    borderRadius: 5, // Runde hjørner for bedre æstetik
    marginBottom: 15, // Plads mellem inputfelterne
  },
  saveButton: {
    backgroundColor: "#28a745", // Grøn farve for at signalere en gemmefunktion
    padding: 15,
    borderRadius: 5,
    alignItems: "center", // Centerer knaptekst
  },
  buttonText: {
    color: "#fff", // Hvid tekst for kontrast mod den grønne knap
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfileScreen; // Eksporterer EditProfileScreen-komponenten til brug i andre dele af projektet

