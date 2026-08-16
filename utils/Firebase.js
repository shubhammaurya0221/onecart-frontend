import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyCsywbj51ooNtOUTxWcs9zYNNSDKuPPbdA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "onecart-8bf8d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "onecart-8bf8d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "onecart-8bf8d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "183076968970",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:183076968970:web:7290298f41dd99f0e2ddf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

