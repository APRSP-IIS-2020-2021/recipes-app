import {firebase} from '@firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTwwhOjQnDIH6iK2g4NXHOqDkTqVTQfn8",
  authDomain: "aprsprecipesvueapp-8388a.firebaseapp.com",
  projectId: "aprsprecipesvueapp-8388a",
  storageBucket: "aprsprecipesvueapp-8388a.appspot.com",
  messagingSenderId: "729569554934",
  appId: "1:729569554934:web:a0dbd84807111be03557d7",
  measurementId: "G-9MF97GV180"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const storage = firebase.storage().ref();
const auth = firebase.auth();

// collections references
const usersCollection = db.collection('users');
const meatRecipesCollection = db.collection('meatRecipes');
const veggieRecipesCollection = db.collection('veggieRecipes');
const pastaRecipesCollection = db.collection('pastaRecipes');
const dessertRecipesCollection = db.collection('dessertRecipes');

// export utils/refs
export {
  db,
  storage,
  auth,
  usersCollection,
  meatRecipesCollection,
  veggieRecipesCollection,
  pastaRecipesCollection,
  dessertRecipesCollection
}
