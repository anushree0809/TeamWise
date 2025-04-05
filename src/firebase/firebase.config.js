// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcQbTyeTTG0tPDvU9miderATfgLq6w06M",
  authDomain: "project-management-b03a0.firebaseapp.com",
  projectId: "project-management-b03a0",
  storageBucket: "project-management-b03a0.firebasestorage.app",
  messagingSenderId: "811247533376",
  appId: "1:811247533376:web:b20083ac00a857311ccea5",
  measurementId: "G-6PFG9VF7N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);