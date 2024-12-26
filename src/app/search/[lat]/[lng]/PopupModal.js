import React from "react";
import './styles.css'
const PopupModal = ({ isVisible, onClose, result }) => {
    if (!isVisible) return null;

    return (
        <div className="modal">
            {result.image && (
                <img src={result.image} alt={`${result.name} image`} />
            )}
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>{result.name}</h2>
                {result.rating && <p>Rating: {result.rating} &#11088;</p>}
                {result.distance && (
                    <p>Only {result.distance.toFixed(2)} miles away</p>
                )}
                <button onClick={() => window.open(result.url, "_blank")}>
                    View More
                </button>
            </div>
        </div>
    );
};

export default PopupModal;
