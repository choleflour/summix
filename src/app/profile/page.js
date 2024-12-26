"use client";
import { useState } from "react";
import { auth, db } from '../controllers/firebase'
import { doc, setDoc } from "firebase/firestore";
import { redirect } from 'next/navigation'
import Search from "../search/page";

export default function Profile() {
//   const [name, setName] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');

//   // console.log(auth, "HEY THIS IS AUTH")

//   async function submit() {
//     if (!auth.currentUser.uid) {
//       alert('hey! stop! u gotta sign in!!!');
//       return;
//     }

//     const data = {
//       "name": name,
//       "city": city,
//       "state": state,
//       "hiked": [],
//       "uid": auth.currentUser.uid
//     }
    
//     await setDoc(doc(db, "users", auth.currentUser.uid), data);
//   }
// 
  return (
    <div>
        <h2>Name</h2>
        <p>email/social</p>
        <h2>Past Hikes</h2>
        <div>
            <ol>hike1 name</ol>
            <ol>hike2 name</ol>
        </div>
       
    </div>

  );
}