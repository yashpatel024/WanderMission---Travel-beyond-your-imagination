import "../styles/Celebration.scss";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mainlogo from "./Generic/mainlogo";
import Button from "@mui/material/Button";

export function Celebration() {

    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [isLoading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }

        const fetchServiceDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch("wandermission/user/cart/get");

                const resp = await response.json();

                setServices(resp.services);

                setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log('Error while fetching fetchServiceDetails ', error);
                return;
            }
        }

        fetchServiceDetails();
    });

    return (
        <div className="container-celebration">
            <div className="row1">
                <div className="congratulations">
                    <h3 className="congratulations-text">
                        Congratulations
                    </h3>
                </div>
                <div className="username">
                    <h3 className="username-text">
                        {user.username}
                    </h3>
                </div>
            </div>
            <div className="row2">
                <div className="top">
                    <h3 className="top-text">
                        You are going to change your world (Literally)
                    </h3>
                </div>
                <div className="bottum">
                    <h3 className="bottum-text">
                        You bought
                    </h3>
                </div>
            </div>

            <div className="row3">
                <>
                    {
                        services.map(element => {
                            return (
                                <div className="row-1">
                                    <div className="chekout-image">
                                        <img
                                            className="product-image"
                                            src={element.service_image}
                                        ></img>
                                    </div>
                                    <div className="product-name">
                                        <div className="agency-logo">
                                            <img
                                                className="agency-logo-main"
                                                src=""
                                            ></img>
                                        </div>
                                        <div className="product-name">
                                            <h4 className="product-name-main">
                                                {element.service_name
                                                    ? element.service_name
                                                    : "Destination not found"}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="quantitty">
                                        <h4 className="product-name-main">{element.quantity} Person</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </>
            </div>
            <div className="row4">

                <div className="email">
                    <h3 className="email-text">
                        You will  be receiving an email with information for your next step
                    </h3>
                </div>
            </div>
        </div >
    );
}
