import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDoWMdgbud9uwsnL3MXp94CPdelk98WNjs",
  authDomain: "gammingtournamentapp.firebaseapp.com",
  projectId: "gammingtournamentapp",
  storageBucket: "gammingtournamentapp.firebasestorage.app",
  messagingSenderId: "227833148768",
  appId: "1:227833148768:web:888e1ca66645531f61da05",
  measurementId: "G-M3D08B4MEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Analytics (only on the client side)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  console.log("Firebase Analytics Initialized");
}

console.log("Firebase App Initialized:", app.name);

export default app;