'use client';

import { useState, useEffect, useRef } from "react";
import './styles.css';

export const Renderer = ({ city }) => {
    const [businesses, setBusinesses] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null); // Create a ref for the map container


    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                console.log("User's Location:", { latitude, longitude });
            },
            (error) => console.error("Error fetching location", error),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        // Fetch businesses based on city prop change
        fetch(`http://127.0.0.1:5000/?location=${city}`)
            .then((response) => response.json())
            .then((response) => {
                console.log("Yelp API Response", response);
                //setBusinesses(response.businesses);

                // Sort businesses by review count in descending order
                const sortedBusinesses = response.businesses.sort((a, b) => b.rating - a.rating);

                if (userLocation) {
                    sortedBusinesses.forEach(business => {
                        if (business.coordinates) {
                            business.distance = calculateDistance(
                                userLocation.lat,
                                userLocation.lng,
                                business.coordinates.latitude,
                                business.coordinates.longitude
                            );
                        }
                    });
                }

                setBusinesses(sortedBusinesses);
            });
    }, [city, userLocation]);

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

    useEffect(() => {
        // Load Google Maps API script dynamically
        const loadGoogleMaps = () => {
            const existingScript = document.querySelector(`script[src*="https://maps.googleapis.com/maps/api/js"]`);
            if (existingScript) {
                initializeMap(); // If script exists, directly initialize map
                return;
            }

            const script = document.createElement("script");
            const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            script.onerror = () => console.error("The Google Maps JavaScript API could not load.");
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            // Ensure the map div and Google Maps API are available
            if (!mapRef.current || !window.google) return;

            const mapCenter = userLocation || 
                              { lat: businesses[0]?.coordinates.latitude || 37.7749, lng: businesses[0]?.coordinates.longitude || -122.4194 };


            // Initialize the Google Map
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: businesses[0]?.coordinates.latitude || 37.7749, lng: businesses[0]?.coordinates.longitude || -122.4194 },
                zoom: 12,
            });

            if (userLocation) {
                new window.google.maps.Marker({
                    position: userLocation,
                    map,
                    title: "You are here",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Use a distinct icon for user's location
                });
            }

            // Add markers for each business
            businesses.forEach((business) => {
                if (business.coordinates) {
                    new window.google.maps.Marker({
                        position: {
                            lat: business.coordinates.latitude,
                            lng: business.coordinates.longitude,
                        },
                        map,
                        title: business.name,
                    });
                }
            });
        };

        // Only load Google Maps if businesses have loaded
        if (businesses.length > 0) {
            loadGoogleMaps();
        }
    }, [businesses, userLocation]);

    return (
        <div>
        
        <p className = "pageTitle">Check out these hikes near you!</p>
        <div ref={mapRef} id="map" className="map"></div>
        <div className="container">
        
            {businesses.map((e) => (
                <div className="card" key={e.id}>
                    <p className = "trailName">{e.name}</p>
                    {e.rating && <p>Rating: {e.rating} &#11088;</p>}
                    {e.distance && <p>Only {e.distance.toFixed(2)} miles away</p>}
                    {e.image_url && (
                        <img className="image" src={e.image_url} alt={`${e.name} image`} />
                    )}
                    {/* <p>Latitude: {e.coordinates.latitude}</p>
                    <p>Longitude: {e.coordinates.longitude}</p> */}
                </div>
            ))}
            
            
        </div>
        <button className = "backButton">Back </button>

        </div>
    );
};

export default Renderer;
