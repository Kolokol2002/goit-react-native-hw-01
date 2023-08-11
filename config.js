import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyGz-FO3ey9bMj0Q-WJLfevVed1GLOnp8",
  authDomain: "react-native-goit-13b10.firebaseapp.com",
  databaseURL: "https://react-native-goit-13b10-default-rtdb.firebaseio.com",
  projectId: "react-native-goit-13b10",
  storageBucket: "react-native-goit-13b10.appspot.com",
  messagingSenderId: "880686011184",
  appId: "1:880686011184:web:32ec1bda1214b07047aef5",
  measurementId: "G-HZF7B7VES3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
