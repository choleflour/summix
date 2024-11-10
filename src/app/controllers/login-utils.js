
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

    createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = '/preferences';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }


  export function signIn(userEmail, userPass) {

    signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      window.location.href = '/preferences';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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