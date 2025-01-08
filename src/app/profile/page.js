"use client";
import { useState, useEffect } from "react";
import { auth, db } from '../controllers/firebase'
import { doc, getDoc } from "firebase/firestore";
import { redirect } from 'next/navigation';
import './styles.css'
export default function Profile() {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [hiked, setHiked] = useState([]);
    const [liked, setLiked] = useState([]);
    const [image, setImage] = useState("wolf.png");
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState(null);

    async function fetchData() {
        console.log(auth.currentUser)
        if (!auth.currentUser?.uid) {
            alert('hey! stop! u gotta sign in!!!');
            return;
        }
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const user = docSnap.data()
            
            setName(user.name);
            setState(user.state);
            setCity(user.city);
            setHiked(user.hiked);
            setLiked(user.liked);
            setImage(user.image);
            setEmail(user.email);
            setLocation(user.location);

        } else {
            // docSnap.data() will be undefined in this case
            alert("no user info!");
        }
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User logged in:", user);
                fetchData(); // Fetch data only when user logs in
            } else {
                console.log("User not logged in");
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs only once

    
  

  return (
      <div className="profile-container">
          <div className="profile-left">
              <img className="profile-avatar" src={image} alt="Avatar" />
              <h2>{name}</h2>
              {email && <p>{email}</p>}
              {(city || state) && <p>{city}{city && state && ', '}{state}</p>}
            <div>
            <button className="button-edit" onClick={()=>{redirect("/settings");}}>Edit Profile</button>
            </div>

          </div>
          
          
          
          <div className="profile-right">
              <div className="profile-hikes">
                  <h3>Past Hikes</h3>
                  <ol>
                      {hiked.map((hike, index) => (
                          <li key={index}>{hike}</li>
                      ))}
                  </ol>
              </div>
            
              <div className="profile-hikes">
                  <h3>Want to Go</h3>
                  <ol>
                      {liked.map((like, index) => (
                          <li key={index}>{like}</li>
                      ))}
                  </ol>
              </div>
          </div>
          {/* <div className="bottom-buttons">
              <button className="button-edit" onClick={()=>{console.log("edit"); redirect("/settings");}}>Edit Profile</button>
              <button className="button-browse">Browse</button>
              <button className="button-search" onClick={()=>{location && redirect("/search/" + location.lat + "/" + location.lng);}}>Search</button>
          </div> */}
      </div>
  );
}