// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOEraTFv2JQHVwbHjRg1wL1lg8wTyTjqo",
  authDomain: "store-keeper-4b8d4.firebaseapp.com",
  projectId: "store-keeper-4b8d4",
  storageBucket: "store-keeper-4b8d4.appspot.com",
  messagingSenderId: "10673471019",
  appId: "1:10673471019:web:011f31cf25daff6cbbf46e",
  measurementId: "G-YND7XMBN21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
