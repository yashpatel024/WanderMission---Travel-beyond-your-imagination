import "../styles/_commonFiles.scss";
import "../styles/Product.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { gold_star, arrow_cart, eth_logo, star_url } from "../links";
import TextField from "@mui/material/Input";
import Button from "@mui/material/Button";
import CounterBtn from "./Generic/CounterBtn";
import { convertToYear } from "./Generic/convertToYear";
import { GetAgencyURL } from "./Generic/getAgencyURL";

export function Product() {
    const location = useLocation();
    const navigation = useNavigate();
    var quantityNumber
    // var quantityNumber = document.getElementByClassName('counter');
    // var quantityNumber = 'MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root'.getAttribute('value');
    // var quantityNumber = counter.value;
    const moveToCart = (e) => {
        

            var serviceData = {
                "service_id": location.state.service_id,
                "quantity" : quantityNumber,
                "service_name" : location.state.tripName,
                "price": location.state.price
            }

         console.log(quantityNumber);

        fetch('http://localhost:5000/wandermission/user/cart/update',{
            method: 'POST',
            body: serviceData
        })

        e.preventDefault();

        localStorage.setItem("cart_product", location.state.id);
        navigation(
            "/cart"
            , {
                state: {
                    tripimageURL: location.state.tripimageURL,
                    agencyLogo: location.state.agencyLogo,
                    tripName: location.state.tripName,
                    agencyName: location.state.agencyName,
                    description: location.state.description,
                    stars: location.state.stars,
                    travelTime: location.state.travelTime,
                    stayTime: location.state.stayTime,
                    userComments: location.state.userComments,
                    agency_id: location.state.agency_id,
                    price: location.state.price,
                    service_id: location.state.service_id,
                }
            }
        );
    };

    return (
        <div className="container">
            <div className="section-1">
                <div className="content-container">
                    <div className="column-left">
                        <div className="trip-image">
                            <img
                                className="trip-image-main"
                                src={location.state.tripimageURL}
                            ></img>
                        </div>
                    </div>
                    <div className="column-right">
                        <div className="first-row">
                            <div className="partner-logo">
                                {GetAgencyURL(location.state.agency_id)}
                            </div>
                            <div className="trip-name">
                                <h1 className="trip-name-main">
                                    {location.state.tripName}
                                </h1>
                            </div>
                            <div className="stars">
                                <img className="gold-star" src={gold_star} />
                                <h4 className="stars-main">
                                    {location.state.stars}
                                </h4>
                            </div>
                        </div>
                        <div className="second-row">
                            <div className="description">
                                <h3 className="description-main">
                                    {location.state.description}
                                </h3>
                            </div>
                        </div>
                        <div className="third-row">
                            <div className="time-info">
                                <div className="travel-time">
                                    <h4 className="travel-text">Travel</h4>
                                    <h4 className="travel-time-main">
                                        {convertToYear(location.state.travelTime)}
                                    </h4>
                                </div>
                                <div className="stay-time">
                                    <h4 className="stay-text">Stay</h4>
                                    <h4 className="stay-time-main">
                                        {convertToYear(location.state.stayTime)}
                                    </h4>
                                </div>
                                <div>
                                    <div className="personNumber">
                                        <h4 className="quantity">Quantity</h4>
                                    </div>
                                    <div class="dropdown">
                                        <CounterBtn />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="fifth-row">
                            <div className="price" onClick={moveToCart}>
                                <div className="price-container">
                                    <h4 className="price-main">
                                        {location.state.price}
                                    </h4>
                                    <img
                                        className="eth-logo"
                                        src={eth_logo}
                                    ></img>
                                </div>
                                <div className="cart-container">
                                    <img
                                        className="arrow-cart"
                                        src={arrow_cart}
                                    ></img>
                                    <h4 className="cart-text">Cart</h4>
                                </div>
                            </div>
                        </div>
                        <div className="sixth-row">
                            <div className="quantity"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="left-side-container">
                    <div className="left-container-1">
                        <div className="visitors">
                            <div className="number">
                                <h4 className="number-main">5000+</h4>
                            </div>
                            <div className="text">
                                <h4 className="text-main">Visitors</h4>
                            </div>

                        </div>
                        <div className="rating">
                            <div className="gold-star">
                                <img className="gold-star-main" src={gold_star} />
                            </div>
                            <div className="rating">
                                <h4 className="rating-main">{location.state.stars}</h4>
                            </div>

                        </div>
                    </div>
                    <div className="left-container-2">

                        <div className="trip-container">
                            <h4 className="number-of-trips">4 Trips</h4>
                            <h4 className="frequency">Every Year</h4>
                        </div>

                        <div className="rocket-container">
                            <h4 className="rocket-name">BFR 2</h4>
                            <h4 className="rocket-name-2">S Shuttle</h4>
                        </div>
                    </div>
                </div>
                <div className="right-side-container">
                    <div className="right-container-1">
                        <div className="heading">
                            <img className="heading-star" src={star_url}></img>
                            <h3 className="heading-text"> Reviews</h3>
                        </div>
                        <div className="comment-container">
                            {location.state.userComments.map(
                                comments => {
                                    return (
                                        <div className="comment" key={comments._id}>
                                            <h3 className="Person-name">{comments.user_name}</h3>
                                            <h3 className="comment-text">{comments.content} </h3>
                                        </div>

                                    )
                                }
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="comment-input">
                            <TextField
                                id="filled-basic"
                                className="input-field-comment"
                                label="Filled"
                                variant="filled"
                            />
                            <Button
                                variant="contained"

                                className="comment"
                            >
                                Comment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
