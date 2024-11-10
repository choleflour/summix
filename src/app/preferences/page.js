"use client";
import styles from "./preferences.css";
import { useState } from "react";
import { auth, db } from '../controllers/firebase';
import { doc, setDoc } from "firebase/firestore";
import { redirect } from 'next/navigation';
export default function PreferencesPage() {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    // console.log(auth, "HEY THIS IS AUTH")

    async function submit() {
        console.log(auth.currentUser)
        if (!auth.currentUser?.uid) {
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
        redirect('/search/'+ city);
    }
    return (
        <div className="page">

            <div className="centeredContainer">
                <h1>Welcome to Summix!</h1>
                <h2>Let&apos;s get to know you first</h2>
                <p>
                    <br /><br />
                    What should we call you?
                    <br />
                    <input type="text" placeholder="Enter your name" className="inputBar" onChange={(e) =>
                        setName(e.target.value)} />
                    <br /><br />
                    What are your pronouns?
                    <br />
                    <select className="inputBar" defaultValue="">
                        <option value="" disabled hidden>Select your pronouns</option>
                        <option value='She/her'>She/her</option>
                        <option value='He/him'>He/him</option>
                        <option value='They/them'>They/them</option>
                    </select>

                    <br /><br />
                    Where are you hiking?
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your city"
                        className="inputBar"
                        onChange={function (e) {
                            setCity(e.target.value);
                        }}
                    />

                    <br />
                    <select onChange={function (e) {
                        setState(e.target.value);
                    }} className="inputBar" defaultValue="">
                        <option value="" disabled hidden>Select a state</option>
                        <option value='Alabama'>Alabama</option>
                        <option value='Alaska'>Alaska</option>
                        <option value='Arizona'>Arizona</option>
                        <option value='Arkansas'>Arkansas</option>
                        <option value='California'>California</option>
                        <option value='Colorado'>Colorado</option>
                        <option value='Connecticut'>Connecticut</option>
                        <option value='Delaware'>Delaware</option>
                        <option value='Florida'>Florida</option>
                        <option value='Georgia'>Georgia</option>
                        <option value='Hawaii'>Hawaii</option>
                        <option value='Idaho'>Idaho</option>
                        <option value='Illinois'>Illinois</option>
                        <option value='Indiana'>Indiana</option>
                        <option value='Iowa'>Iowa</option>
                        <option value='Kansas'>Kansas</option>
                        <option value='Kentucky'>Kentucky</option>
                        <option value='Louisiana'>Louisiana</option>
                        <option value='Maine'>Maine</option>
                        <option value='Maryland'>Maryland</option>
                        <option value='Massachusetts'>Massachusetts</option>
                        <option value='Michigan'>Michigan</option>
                        <option value='Minnesota'>Minnesota</option>
                        <option value='Mississippi'>Mississippi</option>
                        <option value='Missouri'>Missouri</option>
                        <option value='Montana'>Montana</option>
                        <option value='Nebraska'>Nebraska</option>
                        <option value='Nevada'>Nevada</option>
                        <option value='New Hampshire'>New Hampshire</option>
                        <option value='New Jersey'>New Jersey</option>
                        <option value='New Mexico'>New Mexico</option>
                        <option value='New York'>New York</option>
                        <option value='North Carolina'>North Carolina</option>
                        <option value='North Dakota'>North Dakota</option>
                        <option value='Ohio'>Ohio</option>
                        <option value='Oklahoma'>Oklahoma</option>
                        <option value='Oregon'>Oregon</option>
                        <option value='Pennsylvania'>Pennsylvania</option>
                        <option value='Rhode Island'>Rhode Island</option>
                        <option value='South Carolina'>South Carolina</option>
                        <option value='South Dakota'>South Dakota</option>
                        <option value='Tennessee'>Tennessee</option>
                        <option value='Texas'>Texas</option>
                        <option value='Utah'>Utah</option>
                        <option value='Vermont'>Vermont</option>
                        <option value='Virginia'>Virginia</option>
                        <option value='Washington'>Washington</option>
                        <option value='West Virginia'>West Virginia</option>
                        <option value='Wisconsin'>Wisconsin</option>
                        <option value='Wyoming'>Wyoming</option>
                    </select>
                </p>
                <button className="submit-button" onClick={submit}>Submit</button>
                
            </div>

        </div>
    )
}
