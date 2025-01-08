'use client';
import PopupModal from "./PopupModal";
import { useState, useEffect, useRef } from "react";
import './styles.css';

export const Renderer = ({ city }) => {
    const [businesses, setBusinesses] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null); // Create a ref for the map container
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

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
        fetch(`http://127.0.0.1:5000/?location=${city}`)
          .then((response) => response.json())
          .then((response) => {
            console.log('Yelp API Response', response);
            const filteredBusinesses = response.businesses.filter((business) =>
                !business.categories.some((category) => category.alias.includes('gym') || category.alias.includes('museum') || category.alias.includes('rental'))
            );
            console.log(filteredBusinesses);
            // Preprocess the data to include distance if userLocation is available
            const businessesWithDistance = filteredBusinesses.map((business) => {
              if (userLocation && business.coordinates) {
                business.distance = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  business.coordinates.latitude,
                  business.coordinates.longitude
                );
              }
              return business;
            });
    
            // Initially sort by rating (default behavior)
            const sortedByDistance = businessesWithDistance.sort((a, b) => a.distance - b.distance);
            setBusinesses(sortedByDistance);
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

    // Sort by Rating
    const sortByRating = () => {
        const sorted = [...businesses].sort((a, b) => b.rating - a.rating);
        setBusinesses(sorted);
    };

    // Sort by Distance
    const sortByDistance = () => {
        const sorted = [...businesses].sort((a, b) => a.distance - b.distance);
        setBusinesses(sorted);
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

            businesses.forEach((business) => {
                if (business.coordinates) {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: business.coordinates.latitude,
                            lng: business.coordinates.longitude,
                        },
                        map,
                        title: business.name,
                    });

                    // Open modal on marker click
                    google.maps.event.addListener(marker, "click", () => {
                        setSelectedBusiness(business);
                        setIsModalVisible(true);
                    });
                }
            });
        };

        if (businesses.length > 0) {
            loadGoogleMaps();
        }
    }, [businesses, userLocation]);
    

    return (
        <div>

<       div style={{ height: "100vh", width: "100%" }} ref={mapRef}>
            <PopupModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                business={selectedBusiness || {}}
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
        
            {businesses.map((e) => (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="card" key={e.id}>
                    <p className = "trailName">{e.name}</p>
                    {e.rating && <p>Rating: {e.rating} &#11088;</p>}
                    {e.distance && <p>Only {e.distance.toFixed(2)} miles away</p>}
                    {e.image_url && (
                        <img className="image" src={e.image_url} alt={`${e.name} image`} />
                    )}
                    {/* <p>Latitude: {e.coordinates.latitude}</p>
                    <p>Longitude: {e.coordinates.longitude}</p> */}
                </a>
            ))}
            
            
            </div>
            <a href='/preferences' className="backButton" >Back </a>
            

        </div>
    );
};

export default Renderer;
