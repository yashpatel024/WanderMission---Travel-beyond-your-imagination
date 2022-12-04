import "../styles/Home.scss";
import React from "react";
import "../styles/_commonFiles.scss";
import { eth_logo } from "../links";
import { gold_star } from "../links";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { convertToYear } from "./Generic/convertToYear";

function Trip(props) {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        //const key = button.target.value;
        navigate("/Product", {
            state: {
                tripimageURL: props.tripimageURL,
                agencyLogo: props.agencyLogo,
                tripName: props.tripName,
                agencyName: props.agencyName,
                description: props.description,
                stars: props.stars,
                travelTime: props.travelTime,
                stayTime: props.stayTime,
                price: props.price,
                userComments: props.userComments,
                id: props.id
            },
        });
    };

    
    return (

        <div className="main-container">
            <div className="column-container">
                <img className="trip-image" src={props.tripimageURL} />
                <div className="first-container">
                    <span className="trip-name-container">
                        <img
                            className="travelPartner-logo"
                            src={props.agencyLogo}
                        />
                        <h2 className="destination-name">{props.tripName}</h2>
                    </span>
                    <span className="star-container">
                        <img className="gold-star" src={gold_star} />
                        <h3 className="review-star">{props.stars}</h3>
                    </span>
                </div>
                <div className="second-container">
                    <h3 className="trip-description">{props.comment}</h3>
                </div>
                <div className="third-container">
                    <div className="travel-info">
                        <div className="time-container">
                            <h4 className="travel-text">Travel</h4>
                            <h4 className="travel-time">{convertToYear(props.travelTime)}</h4>
                        </div>
                        <div className="stay-container">
                            <h4 className="stay-text">Stay</h4>
                            <h4 className="stay-time">{convertToYear(props.stayTime)}</h4>
                        </div>
                    </div>
                    <div className="fourth-container">
                        <div className="price-container">
                            <h4 className="price-text">/Person</h4>
                            <div className="price-sub-container">
                                <h4 className="trip-price">{props.price}</h4>
                                <img className="eth-logo" src={eth_logo} />
                            </div>
                        </div>
                        <div className="addToCart-button">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleAddToCart();
                                }}
                                className="addToCart"
                            >
                                Learn more
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const shortlink ='http://localhost:5000/wandermission/service/shortTrips';
export const longlink ='http://localhost:5000/wandermission/service/longTrips';
export default Trip;




