import React, { useState, useContext, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "./firebase";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   sign in  with email
  const auth = getAuth();
  const signIn = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        setUser(user);
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode);
        setLoading(false);
        // ..
      });
  };

  //   sign in with google

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setLoading(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setEmail,
        user,
        error,
        setPassword,
        signIn,
        signInWithGoogle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
