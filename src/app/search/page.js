"use client";
import { useState, useEffect } from "react";
import Profile from "../profile/page";
export default function Search({city}) {
    useEffect(()=>{
        // the code we WANT to run when INPUT changes
        // destroys itself everytime inputCity is updated
        // let inputCity = document.getElementById("city").value
        fetch("http://127.0.0.1:5000/?location=" + city)
        .then((response) => response.json())
        .then((response) => {
            console.log("Yelp API Response", response);
            let trails = response.businesses;

            for (let i = 0; i < trails.length; i++) {
                document.getElementById("displayResult").innerHTML += `
                <div>
                    <h1>${trails[i].name}</h1>
                    <img class="image" src="${trails[i].image_url}" />
                </div>
                `;
            }
        });
    }, [city]);
    // <Profile city={city}/>
    
    return(
        <div>
            Results
        </div>
    );
}

