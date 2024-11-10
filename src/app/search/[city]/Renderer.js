'use client';

import { useState, useEffect, useRef } from "react";
import './styles.css';

export const Renderer = ({ city }) => {
    const [businesses, setBusinesses] = useState([]);
    const mapRef = useRef(null); // Create a ref for the map container

    useEffect(() => {
        // Fetch businesses based on city prop change
        fetch(`http://127.0.0.1:5000/?location=${city}`)
            .then((response) => response.json())
            .then((response) => {
                console.log("Yelp API Response", response);
                //setBusinesses(response.businesses);

                // Sort businesses by review count in descending order
                const sortedBusinesses = response.businesses.sort((a, b) => b.rating - a.rating);

                setBusinesses(sortedBusinesses);
            });
    }, [city]);

    useEffect(() => {
        // Load Google Maps API script dynamically
        const loadGoogleMaps = () => {
            const existingScript = document.querySelector(`script[src*="https://maps.googleapis.com/maps/api/js"]`);
            if (existingScript) {
                initializeMap(); // If script exists, directly initialize map
                return;
            }

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&v=weekly`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            script.onerror = () => console.error("The Google Maps JavaScript API could not load.");
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            // Ensure the map div and Google Maps API are available
            if (!mapRef.current || !window.google) return;

            // Initialize the Google Map
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: businesses[0]?.coordinates.latitude || 37.7749, lng: businesses[0]?.coordinates.longitude || -122.4194 },
                zoom: 12,
            });

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
    }, [businesses]);

    return (
        <div className="container">
            {businesses.map((e) => (
                <div className="card" key={e.id}>
                    <h1>{e.name}</h1>
                    {e.image_url && (
                        <img className="image" src={e.image_url} alt={`${e.name} image`} />
                    )}
                    {e.rating && <p>Rating: {e.rating}</p>}
                    <p>Latitude: {e.coordinates.latitude}</p>
                    <p>Longitude: {e.coordinates.longitude}</p>
                </div>
            ))}
            
            <div ref={mapRef} id="map" className="map"></div>
        </div>
    );
};

export default Renderer;
