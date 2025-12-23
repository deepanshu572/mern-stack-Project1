// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ytlogin-abe9c.firebaseapp.com",
  projectId: "ytlogin-abe9c",
  storageBucket: "ytlogin-abe9c.firebasestorage.app",
  messagingSenderId: "481495938044",
  appId: "1:481495938044:web:bf5bf847e4844c24027879"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };