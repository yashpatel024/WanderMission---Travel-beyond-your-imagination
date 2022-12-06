import React from 'react';
import "../styles/_commonFiles.scss";
import "../styles/cart.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartServices = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setLoading] = useState(false);

    //Redux session varaible
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    let navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const getImagURLByID = async (serviceId) => {
        try {
            const response = await fetch('/wandermission/service/get/' + serviceId);

            const resp = await response.json();
            return resp.trip_logo;
        } catch (error) {
            console.log('Error while fetching getImagURLByID ', error);
            return "";
        }
    }

    return (
        <>
            {
                services.length == 0
                    ?
                    <>
                        <div className="row-1">
                            <div className="chekout-image">
                                <img
                                    className="product-image"
                                    src=""
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
                                        "Destination not found"
                                    </h4>
                                </div>
                            </div>
                            <div className="quantitty">
                                <h4 className="product-name-main">1 Person</h4>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {
                            services.forEach(element => {
                                {
                                    console.log(element);
                                }
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
                            })
                        }
                    </>
            }
        </>
    );
}

export default CartServices;