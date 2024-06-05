import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';




export const AuthContext = createContext(null);

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    //  SocialProviders
    const goggleProvider = new GoogleAuthProvider();
    
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, goggleProvider); };

     











    // Email,passWord Log In

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };

      const logIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
      };
      const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
          })};
      const logOut=()=>{
      setUser(null);
      return  signOut(auth);
       

      }
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user', currentUser);
            setLoading(false);
          
            
        });
        return () => {
            return unsubscribe();
        }
    }, [])
       
    const allInfo = {
      
      googleLogin,
        updateUserProfile,
           loading,
          createUser,
          logIn,
          user,
          logOut ,   }
    return (
      <AuthContext.Provider value={allInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default Provider;