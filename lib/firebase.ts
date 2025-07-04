// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFuArOPczkYvXqsrSBFIDth73wbPJvdU0",
  authDomain: "capgeminismartprojectbuilder.firebaseapp.com",
  projectId: "capgeminismartprojectbuilder",
  storageBucket: "capgeminismartprojectbuilder.firebasestorage.app",
  messagingSenderId: "233198799797",
  appId: "1:233198799797:web:98eb23f215308ba65367fc",
  measurementId: "G-RS75TE6SE4"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);