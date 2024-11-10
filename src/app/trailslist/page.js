import styles from "./trailslist.css";
import Image from "next/image";



export default function PreferencesPage() {
    return (
        <div className = "page">
            <div className = "card">
            <img src="/trail_img.jpg" alt="trail_image" className = "imageContainer"/>
            <div className = "textBos">
                <h2>TRAIL NAME</h2>
                <p>
                    Difficulty Rating
                    <br/>
                    Description of Trail: the trail is so nice and beautiful and amazing
                </p>
            </div>
        </div>
        </div>
    )
}