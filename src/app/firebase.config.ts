// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe9lqPMeh09gUIrfEWnEqvOisqmhtMD34",
  authDomain: "portfolio-contact-sas.firebaseapp.com",
  projectId: "portfolio-contact-sas",
  storageBucket: "portfolio-contact-sas.firebasestorage.app",
  messagingSenderId: "368268966078",
  appId: "1:368268966078:web:9bfcd1818af9d0c6ca06ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
