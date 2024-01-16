import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";

createApp(App).use(router).mount('#app')

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

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)