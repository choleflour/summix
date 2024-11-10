
'use client';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
// const [userEmail, setUserEmail] = useState('');
// const [userPass, setUserPass] = useState('');
  // const userEmail = useState(''); // => [value of variable, function to set that variable]

export function signUp() {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    console.log(userEmail);

    if(!userEmail.length) {
      return;
    }

    createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      // ...
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  export function authInfo() {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
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