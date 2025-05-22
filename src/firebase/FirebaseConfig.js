import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgS4vjp7l5w3kJZymI0rLd7eAkXRv68qg",
    authDomain: "tge-app-d6c00.firebaseapp.com",
    projectId: "tge-app-d6c00",
    storageBucket: "tge-app-d6c00.firebasestorage.app",
    messagingSenderId: "375138509496",
    appId: "1:375138509496:web:f2ed231e25cc513398ca4d"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

