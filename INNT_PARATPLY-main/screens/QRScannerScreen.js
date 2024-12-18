//Dette var vores QR-scanner side som skulle bruges til når man klikker "RENT UMBRELLA" i Map og "rent" i "Umbrella List".
//Grundet nye opdateringer i React Native har Projektgruppen haft udfordringer med denne funktion og derfor ikke fuld implementeret. 
//Vi har siden med alligevel, for at demonstrere hvordan vi ville gøre det og tankegangen

import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

const QRScannerScreen = () => {
  // State til at holde styr på kamera-tilladelse
  const [hasPermission, setHasPermission] = useState(null);

  // Reference til kameraet (kan bruges til yderligere funktionalitet senere)
  const cameraRef = useRef(null);

  // useEffect til at anmode om kamera-tilladelse, når komponenten mountes
  useEffect(() => {
    const getPermissions = async () => {
      // Anmoder om kamera-tilladelse fra brugeren
      const { status } = await Camera.requestCameraPermissionsAsync();
      // Sætter tilladelsesstatus i state
      setHasPermission(status === "granted");
    };

    getPermissions(); // Kalder funktionen for at anmode om tilladelse
  }, []); // Tom afhængighedsliste sikrer, at dette kun kører én gang ved mount

  // Viser besked, mens der anmodes om tilladelse
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  // Viser besked, hvis brugeren har nægtet kameraadgang
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Returnerer kamera-visningen, hvis tilladelse er givet
  return (
    <View style={styles.container}>
      <Camera 
        style={StyleSheet.absoluteFillObject} // Fylder hele skærmen
        type={1} // '1' refererer normalt til den bageste kamera-linse
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Gør containeren fleksibel, så den fylder hele skærmen
  },
});

export default QRScannerScreen;


