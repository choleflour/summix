'use client';

import { useState, useEffect, useRef } from "react";
import './styles.css';
// named export uses {name} doesn't have default just export name
// import default from the file
import PopupModal  from "./PopupModal";
export const Renderer = ({userLocation }) => {
    const [results, setResults] = useState([]);

    const mapRef = useRef(null); // Create a ref for the map container
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedResults, setSelectedResults] = useState(null);

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

            const map = new window.google.maps.Map(mapRef.current, {
                center: userLocation || { lat: 37.7749, lng: -122.4194 },
                zoom: 12,
            });

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

                    // Open modal on marker click
                    google.maps.event.addListener(marker, "click", () => {
                        setSelectedResults(result);
                        setIsModalVisible(true);
                    });
                }
            });
        };

        if (results.length > 0) {
            loadGoogleMaps();
        }
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
                </a>
            ))}
            
            
            </div>
            <a href='/preferences' className="backButton" >Back </a>
            

        </div>
    );
};

export default Renderer;
