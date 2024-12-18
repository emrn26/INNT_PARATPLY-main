import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import LogInComponent from "../components/LogInComponent";
import SignUpComponent from "../components/SignUpComponent";
import { globalStyles } from "../styles/globalStyles";

// Overordnet Auth-screen med login og sign-up funktionalitet
const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false); // State der styrer om vi viser login- eller sign-up-komponenten

    return (
        <View style={globalStyles.container}>
            {/* Overskrift til autentificeringssiden */}
            <Text style={globalStyles.sectionTitle}>Welcome to ParatPly!</Text>

            {/* Indpakning af kort, hvor login eller sign-up komponenten vises baseret på state */}
            <View style={globalStyles.card}>
                {isSignUp ? <SignUpComponent /> : <LogInComponent />}
            </View>

            {/* Knap til at skifte mellem login og sign-up */}
            <TouchableOpacity 
                style={globalStyles.button} 
                onPress={() => setIsSignUp(!isSignUp)} // Skifter tilstanden for at vise det modsatte skærmbillede
            >
                <Text style={globalStyles.buttonText}>
                    {isSignUp 
                        ? "Already have an account? Log In"  // Tekst til knappen, hvis sign-up vises
                        : "Don't have an account? Sign Up"  // Tekst til knappen, hvis login vises
                    } 
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthScreen; // Eksporterer AuthScreen-komponenten, så den kan bruges andre steder i projektet
