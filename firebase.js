// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACLSPDpsbO6-vE4hlvgdgfQZ1pPe0ssxU',
  authDomain: 'evotracker-c4fd4.firebaseapp.com',
  projectId: 'evotracker-c4fd4',
  storageBucket: 'evotracker-c4fd4.appspot.com',
  messagingSenderId: '890182936442',
  appId: '1:890182936442:web:ede3c72516947ba2c098c3',
  measurementId: 'G-DPZW7EK0N8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = app.firestore();
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile };

// const analytics = getAnalytics(app);
