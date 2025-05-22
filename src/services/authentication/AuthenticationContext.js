import React, { createContext, useState } from "react";
import { auth,db } from "../../firebase/FirebaseConfig";
import{doc,setDoc} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {getFirebaseErrorMessage} from "../../utils/FirebaseErrorMessages";


export const AuthenticationContext = createContext();

export default function AuthenticationContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoading(false);
      })
      .catch((err) => {
          const message = getFirebaseErrorMessage(err.code);
          setError(message);
          setIsLoading(false);
      });
  };

  const onRegister =  (email, password,name,surname,nickname) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user=userCredential.user;
        await setDoc(doc(db,"users",user.uid),{
           email:email,
            name:name,
            nickname:nickname,
            surname:surname,
            phone:"",
            adress:"",
            photoURL:"",
            totalDonations:0,
            createdAt: new Date()
        });
        setUser(userCredential.user);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
          const message = getFirebaseErrorMessage(err.code);
          setError(message);
          setIsLoading(false);
          setUser(null); // Eğer oturum sırasında bir hata oluştuysa user nesnesi oluşturma
      });
  };

  const onLogout = () => {
    setUser(null);
    signOut(auth);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
          setError,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
