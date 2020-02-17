import React from "react";
import "./carousel.css";

function Carousel(props) {
    return (
        <div class="carousel carousel-slider">
            <a class="carousel-item"><img src="../../images/Volunteers1.jpg"></img></a>
            <a class="carousel-item"><img src="../../images/Volunteers2.jpg"></img></a>
            <a class="carousel-item"><img src="../../images/Volunteers3.jpg"></img></a>
            <a class="carousel-item"><img src="../../images/Volunteers4.jpg"></img></a>
        </div>
    )
};

export default Carousel;