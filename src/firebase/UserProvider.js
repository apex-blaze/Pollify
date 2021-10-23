import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const UserContext = React.createContext();
const UserProvider = (props) => {
  const [session, setSession] = useState({ user: null, loading: true });
  useEffect(() => {
    setSession({ ...session, loading: true });
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setSession({ loading: false, user });
    });
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={session}>
      {props.children}
    </UserContext.Provider>
  );
};

export const UserSession = () => {
  const session = useContext(UserContext);
  return session;
};

export default UserProvider;
