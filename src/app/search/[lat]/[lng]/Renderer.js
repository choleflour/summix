'use client';
import { useState, useEffect, useRef } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from '../../../controllers/firebase'
import LikeIcon from '../../../../../public/like.svg';
import SaveIcon from '../../../../../public/save.svg';

import './styles.css';
// named export uses {name} doesn't have default just export name
// import default from the file
import PopupModal  from "./PopupModal";
export const Renderer = ({userLocation }) => {
    const [results, setResults] = useState([]);
    // const [liked, setLiked] = useState(false);
    // const [hiked, setHiked] = useState(false);
    const mapRef = useRef(null); // Create a ref for the map container
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedResults, setSelectedResults] = useState(null);

    async function populateData() {
        if (!auth.currentUser?.uid) {
            alert("hey! stop! u gotta sign in!!!");
            window.location.href = '/';
        }

    }
    async function addLike(hike) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        // setLiked((prevLiked) => [...prevLiked, hike]);
        await updateDoc(docRef, {
            liked: arrayUnion(hike)
        });

    }

    async function addHike(hike) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
            hiked: arrayUnion(hike)
        });

    }

        

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        if (selectedOption === 'distance') {
            // console.log("sort by distance");
            sortByDistance();
        } else if (selectedOption === 'rating') {
            sortByRating();
            // console.log("sort by rating");
        }
    };


    useEffect(() => {
        if (userLocation == {}) {
            console.error("userLocation is missing!");
            return;
        }

        fetch(`http://127.0.0.1:5000/?lat=${userLocation.lat}&lng=${userLocation.lng}`)
          .then((response) => response.json())
          .then((response) => {
            console.log('GoogleMaps API Response', response);

            const resultsWithDistance = response.results.map((result) => {
              if (userLocation && result.geometry.location) {
                result.distance = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  result.geometry.location.lat,
                  result.geometry.location.lng,
                );
              }
              return result;
            });
    
            const sortedByDistance = resultsWithDistance.sort((a, b) => a.distance - b.distance);
            setResults(sortedByDistance);
          });
      }, [userLocation]);
    //   watched userLocation for changes, if either changes, the code inside this useEffect will run again

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 3958.8; // Radius of Earth in miles
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Sort by Rating
    const sortByRating = () => {
        const sorted = [...results].sort((a, b) => b.rating - a.rating);
        setResults(sorted);
    };

    // Sort by Distance
    const sortByDistance = () => {
        const sorted = [...results].sort((a, b) => a.distance - b.distance);
        setResults(sorted);
    };

    useEffect(() => {
        const mapInstanceRef = { current: null }; // Reference for map instance
        const markersRef = []; // Keep track of markers to clean them up
    
        const loadGoogleMaps = () => {
            const existingScript = document.querySelector(
                `script[src*="https://maps.googleapis.com/maps/api/js"]`
            );
            if (existingScript) {
                initializeMap();
                return;
            }
    
            const script = document.createElement("script");
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };
    
        const initializeMap = () => {
            if (!mapRef.current || !window.google) return;
    
            // Initialize the map instance
            const map = new window.google.maps.Map(mapRef.current, {
                center: userLocation || { lat: 37.7749, lng: -122.4194 },
                zoom: 12,
            });
    
            // Save map instance for cleanup
            mapInstanceRef.current = map;
    
            results.forEach((result) => {
                if (result.geometry.location) {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: result.geometry.location.lat,
                            lng: result.geometry.location.lng,
                        },
                        map,
                        title: result.name,
                    });
    
                    // Save marker for cleanup
                    markersRef.push(marker);
    
                    // Open modal on marker click
                    const handleMarkerClick = () => {
                        setSelectedResults(result);
                        setIsModalVisible(true);
                    };
                    marker.addListener("click", handleMarkerClick);
    
                    // Save the listener for cleanup
                    marker.listener = handleMarkerClick;
                }
            });
        };
    
        if (results.length > 0) {
            loadGoogleMaps();
            populateData(); // init
        }
    
        // Cleanup function
        return () => {
            // Remove markers and their listeners
            markersRef.forEach((marker) => {
                if (marker.listener) {
                    google.maps.event.clearInstanceListeners(marker);
                }
                marker.setMap(null); // Remove the marker from the map
            });
    
            // Clear the map instance
            if (mapInstanceRef.current) {
                google.maps.event.clearInstanceListeners(mapInstanceRef.current);
                mapInstanceRef.current = null;
            }
    
            // Remove the script if dynamically loaded
            const existingScript = document.querySelector(
                `script[src*="https://maps.googleapis.com/maps/api/js"]`
            );
            if (existingScript && !document.querySelectorAll('script[src*="https://maps.googleapis.com"]').length) {
                existingScript.remove();
            }
        };
    }, [results, userLocation]);
    
    return (
        <div>

<div ref={mapRef}>
            <PopupModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                result={selectedResults || {}}
            />
        </div>
        
        <p className = "pageTitle">Check out these hikes near you!</p>
        <div ref={mapRef} id="map" className="map"></div>
        <div className="dropdown">
                <div className="dropdown-container">
                    {/* <label htmlFor="sortDropdown">Sort by </label> */}
                    <select id="sortDropdown" onChange={handleSortChange}>
                        <option value="distance">Distance</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
        </div>
        <div className="container">
        
            {results.map((e) => (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="card" key={e.place_id}>
                    <p className = "trailName">{e.name}</p>
                    {e.rating && <p>Rating: {e.rating} &#11088;</p>}
                    {e.distance && <p>Only {e.distance.toFixed(2)} miles away</p>}
                    {e.image && (
                        <img className="image" src={e.image} alt={`${e.name} image`} />
                    )}
                    <button className="like-button" onClick={() => addLike(e.name)} >
                    {/* <img src="/like.png" alt="like" /> */}
                    <LikeIcon width={24} height={24} />


                    </button>
                    <button className="save-button" onClick={()=>addHike(e.name)}> 
                    {/* <img src="/save.png" alt="save" /> */}
                    <SaveIcon width={24} height={24} />

                    </button>
                </a>
            ))}
            
            
            </div>
            {/* <a href='/preferences' className="backButton" >Back </a> */}
            

        </div>
    );
};

export default Renderer;
