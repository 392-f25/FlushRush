// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpCK4TIWJ_jDAPt9-7oZIwk5Ig2Dd1RYA",
  authDomain: "flushrush-a2eaa.firebaseapp.com",
  projectId: "flushrush-a2eaa",
  storageBucket: "flushrush-a2eaa.firebasestorage.app",
  messagingSenderId: "170697941156",
  appId: "1:170697941156:web:c98d1754b12b68a8a70631",
  measurementId: "G-5DZ7CR5SD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
