// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfJ0J0L1Jtv8fAxOa7I4FcPMeKSWe3G1w",
  authDomain: "ecommerce-d-choco.firebaseapp.com",
  projectId: "ecommerce-d-choco",
  storageBucket: "ecommerce-d-choco.firebasestorage.app",
  messagingSenderId: "934786905818",
  appId: "1:934786905818:web:cf631deb0686d5909557e3",
  measurementId: "G-JDR0D3TC5Y"
};

// Singleton para não inicializar várias vezes
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };