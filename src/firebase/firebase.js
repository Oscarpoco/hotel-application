// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk5AKIhZoeTKfAV-yOXFAiK-iQXOGuaAs",
  authDomain: "hotel-application-79f01.firebaseapp.com",
  projectId: "hotel-application-79f01",
  storageBucket: "hotel-application-79f01.appspot.com",
  messagingSenderId: "14539111292",
  appId: "1:14539111292:web:69d44f098f6be605aa82f9",
  measurementId: "G-WNZEJ3R685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
