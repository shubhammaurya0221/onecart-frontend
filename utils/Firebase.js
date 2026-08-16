import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "loginonecart-ef5bf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "loginonecart-ef5bf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "loginonecart-ef5bf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "105446562430",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:105446562430:web:cdb0565d77d562f448962f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

