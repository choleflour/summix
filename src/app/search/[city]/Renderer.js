'use client';

import { useState, useEffect } from "react";

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

    return <div>{businesses && businesses.map(e => <div key=
        {e.id}>
        <h1>{e.name}</h1>
        <img className="image" src={e.image_url}/>
    </div>)}</div>
}