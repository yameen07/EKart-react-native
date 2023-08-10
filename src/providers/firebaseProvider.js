import React, {useState, useContext, useEffect, createContext} from 'react';
import firebase from 'firebase/compat';
import {firebaseConfig} from '../environment/Firebase';

import {signIn, signOut, signUp} from '../services/authUtils';

firebase.initializeApp(firebaseConfig);
const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

const FirebaseProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authChange = firebase.auth().onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    return () => authChange();
  }, []);

  const contextValue = {
    firebase,
    user,
    signUp,
    signOut,
    signIn,
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
