//Denne side er meningen skal hænge sammen med vores QRScannerScreen.js, men da den ikke er fuld implementeret, har vi heller ikke udarbejdet denne side yderligere
//Pointen er at når man scanner med sin bruger, bliver reservationsID'et linket på den bruger der har scannet og deved lejet paraplyen. 
//Dette skal refleksteres i databasen så man også kan holdeøje med hvilke brugere der har lejet hvilke paraplyer på de forskellige lokationer. Dette er data som kan analyseres til fremtidig brug og udvikling.

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const ReservationScreen = ({ route, navigation }) => {
    const { umbrellaId } = route.params; // Paraplyens ID bliver modtaget via navigationens parametre
    const [umbrella, setUmbrella] = useState(null); // State til at holde paraplyens data
    const [loading, setLoading] = useState(true); // Indlæsningsindikator

    // useEffect: Henter paraplydata fra Firestore, når komponenten mountes
    useEffect(() => {
        const fetchUmbrella = async () => {
            try {
                // Henter dokumentet for paraplyen fra Firestore
                const umbrellaDoc = await getDoc(doc(db, "umbrella_stations", umbrellaId));
                if (umbrellaDoc.exists()) {
                    setUmbrella(umbrellaDoc.data()); // Gemmer paraplyens data i state
                } else {
                    // Hvis paraplyen ikke findes, vis en fejl og gå tilbage
                    Alert.alert("Error", "Umbrella not found.");
                    navigation.goBack();
                }
                setLoading(false); // Stopper indlæsningsindikatoren
            } catch (error) {
                // Logger og håndterer fejl, hvis data ikke kan hentes
                console.error("Error fetching umbrella:", error);
                Alert.alert("Error", "Could not fetch umbrella information.");
                setLoading(false);
            }
        };

        fetchUmbrella(); // Kalder funktionen for at hente paraplydata
    }, [umbrellaId]); // Kører, når `umbrellaId` ændres

    // Funktion til at reservere paraplyen
    const handleReserve = async () => {
        try {
            const user = auth.currentUser; // Henter den aktuelle bruger
            if (!user) {
                return Alert.alert("Error", "You need to be logged in."); // Tjekker, om brugeren er logget ind
            }

            // Opdaterer antal tilgængelige paraplyer i Firestore
            const umbrellaRef = doc(db, "umbrella_stations", umbrellaId);
            await updateDoc(umbrellaRef, {
                availableUmbrellas: umbrella.availableUmbrellas - 1, // Reducerer antallet med 1
            });

            // Opretter en ny reservation i Firestore
            await addDoc(collection(db, "reservations"), {
                userId: user.uid, // ID på den bruger, der reserverer
                qrData: umbrellaId, // ID for den reserverede paraply
                location: umbrella.location, // Paraplyens placering
                reservedAt: new Date(), // Tidspunkt for reservation
                status: "active", // Status for reservationen
            });

            // Viser succesmeddelelse og navigerer til hovedskærmen
            Alert.alert("Success", "Umbrella reserved successfully!");
            navigation.navigate("Main");
        } catch (error) {
            // Logger og håndterer fejl, hvis reservationen fejler
            console.error("Error reserving umbrella:", error);
            Alert.alert("Error", "Could not reserve umbrella.");
        }
    };

    // Viser en indlæsningsindikator, mens data bliver hentet
    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    // Returnerer brugergrænsefladen for reservationsskærmen
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Reserve Umbrella</Text>
            <View style={globalStyles.card}>
                <Text style={globalStyles.cardTitle}>Location: {umbrella.location}</Text>
                <Text>Available Umbrellas: {umbrella.availableUmbrellas}</Text>
            </View>
            <TouchableOpacity style={globalStyles.button} onPress={handleReserve}>
                <Text style={globalStyles.buttonText}>Reserve Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReservationScreen;
