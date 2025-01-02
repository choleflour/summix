"use client";
import { useState, useEffect } from "react";
import { auth, db } from '../controllers/firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from 'next/navigation';
import './styles.css'



export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: "",
        city: "",
        state: "",
        hiked: [],
        liked: [],
        image: "wolf.png",
    });

    const [editingFields, setEditingFields] = useState({}); // Tracks which fields are being edited

    const handleEditClick = (field) => {
        setEditingFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputChange = (field, value) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputBlur = (field) => {
        setEditingFields((prev) => ({ ...prev, [field]: false }));
    };

    const handleDeleteHike = (index) => {
        setProfileData((prev) => ({
            ...prev,
            hiked: prev.hiked.filter((_, i) => i !== index),
        }));
    };
    const handleDeleteLike = (index) => {
        setProfileData((prev) => ({
            ...prev,
            liked: prev.liked.filter((_, i) => i !== index),
        }));
    };

    async function fetchData() {
        if (!auth.currentUser?.uid) {
            alert("hey! stop! u gotta sign in!!!");
            return;
        }

        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data();

            setProfileData({
                name: user.name,
                city: user.city,
                state: user.state,
                hiked: user.hiked,
                liked: user.liked,
                image: user.image,
            });
        } else {
            alert("no user info!");
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchData(); // Fetch data only when user logs in
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    async function saveChanges() {
        const { name, city, state, hiked, liked, image } = profileData;

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name,
            city,
            state,
            hiked,
            liked,
            image,
        });

        let redirectUrl = "/profile";
        redirect(redirectUrl);
    }

    return (
        <div className="profile-container">
            <div className="profile-left">
                <img className="profile-avatar" src={profileData.image} alt="Avatar" />
                <div className="profile-info">
                    <div className="profile-header">
                        {editingFields.name ? (
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                onBlur={() => handleInputBlur("name")}
                                autoFocus
                                className="profile-input"
                            />
                        ) : (
                            <h2 className="profile-name">{profileData.name}</h2>
                        )}
                        <button
                            className="edit-button"
                            onClick={() => handleEditClick("name")}
                        >
                            <img src="edit.png" alt="edit" />
                        </button>
                    </div>
                    <div className="profile-field">
                        {editingFields.city ? (
                            <input
                                type="text"
                                value={profileData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                onBlur={() => handleInputBlur("city")}
                                autoFocus
                                className="profile-input"
                            />
                        ) : (
                            <p>{profileData.city}</p>
                        )}
                        <button
                            className="edit-button"
                            onClick={() => handleEditClick("city")}
                        >
                            <img src="edit.png" alt="edit" />
                        </button>
                    </div>
                    <div className="profile-field">
                        {editingFields.state ? (
                            <input
                                type="text"
                                value={profileData.state}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                onBlur={() => handleInputBlur("state")}
                                autoFocus
                                className="profile-input"
                            />
                        ) : (
                            <p>{profileData.state}</p>
                        )}
                        <button
                            className="edit-button"
                            onClick={() => handleEditClick("state")}
                        >
                            <img src="edit.png" alt="edit" />
                        </button>
                    </div>
                </div>
            </div>
    
            <div className="profile-right">
                <div className="profile-hikes">
                    <h3>Past Hikes</h3>
                    <ol>
                        {profileData.hiked.map((hike, index) => (
                            <li key={index} className="hike-item">
                                {editingFields[`hiked-${index}`] ? (
                                    <input
                                        type="text"
                                        value={hike}
                                        onChange={(e) => handleInputChange("hiked", e.target.value, index)}
                                        onBlur={() => handleInputBlur(`hiked-${index}`)}
                                        autoFocus
                                        className="profile-input"
                                    />
                                ) : (
                                    <>
                                        <span>{hike}</span>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteHike(index)}
                                        >
                                            <img src="delete.png" alt="delete" />
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="profile-hikes">
                    <h3>Want to Go</h3>
                    <ol>
                        {profileData.liked.map((like, index) => (
                            <li key={index} className="like-item">
                                {editingFields[`like-${index}`] ? (
                                    <input
                                        type="text"
                                        value={like}
                                        onChange={(e) => handleInputChange("liked", e.target.value, index)}
                                        onBlur={() => handleInputBlur(`like-${index}`)}
                                        autoFocus
                                        className="profile-input"
                                    />
                                ) : (
                                    <>
                                        <span>{like}</span>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteLike(index)}
                                        >
                                            <img src="delete.png" alt="delete" />
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}