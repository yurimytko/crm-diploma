import React from "react";


import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';




import "./dist/card.css"
export function TruckDashCard({truck}){


    return(
        <div className="card">
            <div className="img_con_d">
                {truck && (
                    <LazyLoadImage
                    src={`http://localhost:8000//${truck.picture}`}
                    alt=""
                    className="truck_img_d"
                    effect="blur" 
                    />
                )}
            </div>
            <div className="line"></div>
            <div className="brand_con">
                {truck.brand}
            </div>
            <div className="line"></div>
            <div className="brand_con">
                {truck.model}
            </div>
            <div className="line"></div>
            <div className="brand_con">
                {truck.license}
            </div>
            <div className="line"></div>
            <div className="brand_con">
                {truck.status}
            </div>
               
        </div>
    )
}