import "firebase/firestore";

import firebase from "firebase";

const firebaseConfig = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "virusnake-f78a2.firebaseapp.com",
  databaseURL: "https://virusnake-f78a2.firebaseio.com",
  projectId: "virusnake-f78a2",
  storageBucket: "virusnake-f78a2.appspot.com",
  messagingSenderId: "888051625379",
  appId: "1:888051625379:web:ed1e41ba948f7569c83e16",
  measurementId: "G-QJ5HV93T2Y",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const COLLECTION_NAME =
  process.env.NODE_ENV === "development" ? "tests" : "scores";

export default firebaseApp.firestore();
