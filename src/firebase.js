import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAfZu2LJ72tvUP4IjGXO1NtvMdPiL9C6w",
    authDomain: "pwa-epitech-ea164.firebaseapp.com",
    databaseURL: "https://pwa-epitech-ea164-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pwa-epitech-ea164",
    storageBucket: "pwa-epitech-ea164.appspot.com",
    messagingSenderId: "1033662870719",
    appId: "1:1033662870719:web:4192c05d891416791c020a",
    measurementId: "G-GBBX6ZGBRC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);

export { db, auth, app, realtimeDb };