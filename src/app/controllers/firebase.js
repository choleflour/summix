

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADgWsMVr2ET62sAnXM8mvUUKQbXBXoXoQ",
    authDomain: "summix-9eff0.firebaseapp.com",
    projectId: "summix-9eff0",
    storageBucket: "summix-9eff0.firebasestorage.app",
    messagingSenderId: "468955979293",
    appId: "1:468955979293:web:1683a181ad3e96f1ba30f4",
    measurementId: "G-H4RBT56T2R"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
