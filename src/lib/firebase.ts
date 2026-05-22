import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJs0jZU06KHvUStEglcRZFjJcQvTQha2o",
  authDomain: "north-ecommerce.firebaseapp.com",
  projectId: "north-ecommerce",
  storageBucket: "north-ecommerce.firebasestorage.app",
  messagingSenderId: "1048089355307",
  appId: "1:1048089355307:web:36bbcadb0927e92ac3f66e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);