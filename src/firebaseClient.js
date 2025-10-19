import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzR8h3O_K8ckpkMQiV7E18Myh3bR_mh6o",
  authDomain: "registerclothes.firebaseapp.com",
  projectId: "registerclothes",
  storageBucket: "registerclothes.appspot.com",
  messagingSenderId: "373707636245",
  appId: "1:373707636245:web:962f3d7ded49fba2a0d81c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
