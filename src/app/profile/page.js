"use client";
import { useState } from "react";
import { auth, db } from '../controllers/firebase'
import { doc, setDoc } from "firebase/firestore";

export default function Profile() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // console.log(auth, "HEY THIS IS AUTH")

  async function submit() {
    if (!auth.currentUser.uid) {
      alert('hey! stop! u gotta sign in!!!');
      return;
    }

    const data = {
      "name": name,
      "city": city,
      "state": state,
      "hiked": [],
      "uid": auth.currentUser.uid
    }
    
    await setDoc(doc(db, "users", auth.currentUser.uid), data);
  }

  return (
    <div>
      <input placeholder="name" value={name} onChange={function (e) {
        setName(e.target.value)
      }}></input>
      <input id="city" placeholder="city" value={city} onChange={function (e) {
        setCity(e.target.value);
      }}></input>
      <input placeholder="state" value={state} onChange={function (e) {
        setState(e.target.value)
      }}></input>
      <button onClick={submit}>Submit</button>
      <Search city={city} />
    </div>

  );
}