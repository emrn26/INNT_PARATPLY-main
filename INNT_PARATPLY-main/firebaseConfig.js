// Importér de nødvendige Firebase-funktioner
import { initializeApp, getApps } from "firebase/app"; // Initialisering og kontrol af eksisterende Firebase-apps
import { getAuth } from "firebase/auth"; // Firebase Authentication til brugerhåndtering
import { getFirestore } from "firebase/firestore"; // Firebase Firestore Database til lagring af struktureret data
import { getStorage } from "firebase/storage"; // Firebase Storage til upload og lagring af filer som billeder

// Din web app's Firebase-konfiguration
// Denne konfiguration indeholder nøgleinformationer for at forbinde appen til Firebase-projektet
const firebaseConfig = {
  apiKey: "AIzaSyBYWJAIWNMDGXzshPi9zLZcEt_ynb4QkzM", // API-nøgle til autorisering
  authDomain: "innt-paratply.firebaseapp.com", // Domæne for Firebase Authentication
  projectId: "innt-paratply", // Unik identifikator for Firebase-projektet
  storageBucket: "innt-paratply.appspot.com", // Bucket til lagring af filer og medier
  messagingSenderId: "515540427091", // ID til Firebase Cloud Messaging
  appId: "1:515540427091:web:f55cf2a776b988da8381a6", // Appens unikke ID i Firebase
};

// Initialiser Firebase kun én gang
// Kontrollér, om der allerede findes en initialiseret Firebase-app for at undgå flere initialiseringer
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialiser tjenester og eksporter
// Eksporér Firebase-tjenesterne, så de kan bruges i resten af projektet
export const auth = getAuth(app); // Eksporter Firebase Authentication
export const db = getFirestore(app); // Eksporter Firestore Database
export const storage = getStorage(app); // Eksporter Firebase Storage

// Eksporter app-initialiseringen som standardeksport
export default app;


