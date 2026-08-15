import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-ef5bf.firebaseapp.com",
  projectId: "loginonecart-ef5bf",
  storageBucket: "loginonecart-ef5bf.firebasestorage.app",
  messagingSenderId: "105446562430",
  appId: "1:105446562430:web:cdb0565d77d562f448962f"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

