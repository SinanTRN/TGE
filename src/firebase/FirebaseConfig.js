import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "abc",
    authDomain: "abc",
    projectId: "abc",
    storageBucket: "abc",
    messagingSenderId: "abc",
    appId: "abc"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

