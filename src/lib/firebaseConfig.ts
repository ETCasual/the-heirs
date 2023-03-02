import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCE7olXYZ2zQd5c8ePMn0flaxDk7t_OlFM",
  authDomain: "the-heirs-2023.firebaseapp.com",
  projectId: "the-heirs-2023",
  databaseURL:
    "https://the-heirs-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "the-heirs-2023.appspot.com",
  messagingSenderId: "154533081736",
  appId: "1:154533081736:web:e1da4d03760571ce7de53d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;
