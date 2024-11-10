'use client';

import { useState, useEffect } from "react";
import './styles.css';
export const Renderer = ({city}) => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        // the code we WANT to run when INPUT changes
        // destroys itself everytime inputCity is updated
        // let inputCity = document.getElementById("city").value
        fetch("http://127.0.0.1:5000/?location=" + city)
            .then((response) => response.json())
            .then((response) => {
                console.log("Yelp API Response", response);
                let trails = response.businesses;
                setBusinesses(trails);
            });
    }, [city]);

    return <div className="container">{businesses && businesses.map(e => <div  className="card" key=
        {e.id}>
        <h1>{e.name}</h1>
        {e.image_url && (
                    <img className="image" src={e.image_url} alt={`${e.name} image`} />
                )}
       {e.rating && (
        <p>
            Rating: {e.rating}
        </p>
        )}
        <p>Latitude: {e.coordinates.latitude}</p>
        <p>Longitude: {e.coordinates.longitude}</p>
       
    </div>)}</div>
}