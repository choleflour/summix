
'use client';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import {auth} from "./firebase";
import { redirect, useRouter } from 'next/navigation';
// const [userEmail, setUserEmail] = useState('');
// const [userPass, setUserPass] = useState('');
  // const userEmail = useState(''); // => [value of variable, function to set that variable]

export function signUp(userEmail, userPass) {
    console.log(userEmail);

    if(!userEmail.length) {
      return;
    }
    if (userPass.length < 8) {
      console.error("Password must be at least 8 characters long");
      alert("Password must be at least 8 characters long");
      return;
    }
    createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = '/preferences';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Failed to Create an Account: ${errorMessage}`);

    });
  }


  export function signIn(userEmail, userPass) {
    if(!userEmail.length) {
      return;
    }
    if (userPass.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      window.location.href = '/preferences';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Sign-in failed: ${errorMessage}`);
    });
  }
  export function authInfo(userEmail, userPass) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }