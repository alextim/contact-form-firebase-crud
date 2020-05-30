import firebase from 'firebase/app'; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// const settings = { timestampsInSnapshots: true };

// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const firebaseDb = firebase.firestore(); // .settings(settings);

export default firebaseDb;
