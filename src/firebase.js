// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAfZu2LJ72tvUP4IjGXO1NtvMdPiL9C6w",
  authDomain: "pwa-epitech-ea164.firebaseapp.com",
  projectId: "pwa-epitech-ea164",
  storageBucket: "pwa-epitech-ea164.appspot.com",
  messagingSenderId: "1033662870719",
  appId: "1:1033662870719:web:4192c05d891416791c020a",
  measurementId: "G-GBBX6ZGBRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);