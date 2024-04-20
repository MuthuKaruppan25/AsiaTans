// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxI0eqR8lMVWXkOa6VhUy_-qRJgsuwV7I",
  authDomain: "consultancy-958a5.firebaseapp.com",
  projectId: "consultancy-958a5",
  storageBucket: "consultancy-958a5.appspot.com",
  messagingSenderId: "796410835690",
  appId: "1:796410835690:web:dbcbc3811addb078e39d93",
  measurementId: "G-VFL67HLY4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);