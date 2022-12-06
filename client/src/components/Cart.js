import "../styles/_commonFiles.scss";
import "../styles/cart.scss";
import {
    star_url,
    eth_logo
} from "../links";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    FilledInput,
    FormControl,
    FormHelperText
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { selectUser } from "../Features/userSlice";

//Initial data for state
const initialFormData = {
    walletHash: "",
    firstName: "",
    lastName: "",
    passportNumber: "",
    citizenship: "",
    dateOfBirth: "",
    noOfPerson: "",
};

const initialErrorText = {
    walletHashError: "",
    firstNameError: "",
    lastNameError: "",
    passportNumberError: "",
    citizenshipError: "",
    dateOfBirthError: "",
};

const taxPercentage = 5;
const gasFees = 0.005;

export function Cart() {
    //Redux session varaible
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    
    let navigate = useNavigate();

    const location = useLocation();

    //State initialization for form data and error messages
    const [formData, setFormData] = useState({ ...initialFormData });
    const [errorText, setErrorText] = useState({ ...initialErrorText });

    //On change of inputfield
    const changeFormData = (prop) => (e) => {
        setFormData({ ...formData, [prop]: e.target.value });
    };

    //To prevent default action on press of mouse down button
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    //To check whether user is logged in or not
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        // if (localStorage.getItem("cart_product") == null) {
        //     navigate("/home");
        // }
    });

    //On Click of Pay
    const sendPurchaseRequest = (e) => {};

    return (
        <div className="container">
            <div className="outer-container">
                <div className="left-side-container">
                    <div className="payment-details">
                        <div className="heading">
                            <img className="heading-star" src={star_url}></img>
                            <h3 className="heading-text">Payment Details</h3>
                        </div>
                        <div className="hash-title">
                            <h3 className="hash-title-main">
                                Enter Wallet hash
                            </h3>
                        </div>
                        <div className="input-section">
                            <div className="input-hash">
                                <FormControl
                                    error={!!errorText.walletHashError}
                                    className="formcontrol_field input-eth"
                                    variant="filled"
                                >
                                    <FilledInput
                                        id="cart-form-walletHash"
                                        type="text"
                                        label="walletHash"
                                        value={formData.walletHash}
                                        onChange={changeFormData("walletHash")}
                                    />
                                    <FormHelperText className="helper-text">
                                        {errorText.walletHashError}
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <div className="eth-btn">
                                <img className="eth-logo" src={eth_logo}></img>
                            </div>
                        </div>
                    </div>
                    <div className="personinfo-section">
                        <div className="heading">
                            <img className="heading-star" src={star_url}></img>
                            <h3 className="heading-text"> Your Information</h3>
                        </div>
                        <div className="information-form">
                            <div className="form-row-1">
                                <div className="first-name">
                                    <h3 className="fname-title-main">
                                        First Name
                                    </h3>
                                    <div className="input-fname">
                                        <FormControl
                                            error={!!errorText.firstNameError}
                                            className="formcontrol_field input-field-fname"
                                            variant="filled"
                                        >
                                            <FilledInput
                                                id="cart-form-firstName"
                                                type="text"
                                                label="firstName"
                                                value={formData.firstName}
                                                onChange={changeFormData(
                                                    "firstName"
                                                )}
                                            />
                                            <FormHelperText className="helper-text">
                                                {errorText.firstNameError}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="last-name">
                                    <h3 className="lname-title-main">
                                        Last Name
                                    </h3>
                                    <div className="input-lname">
                                        <FormControl
                                            error={!!errorText.lastNameError}
                                            className="formcontrol_field input-field-lname"
                                            variant="filled"
                                        >
                                            <FilledInput
                                                id="cart-form-lastName"
                                                type="text"
                                                label="lastName"
                                                value={formData.lastName}
                                                onChange={changeFormData(
                                                    "lastName"
                                                )}
                                            />
                                            <FormHelperText className="helper-text">
                                                {errorText.lastNameError}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-2">
                                <div className="passport-number">
                                    <h3 className="passport-title-main">
                                        Passport Number
                                    </h3>
                                    <div className="input-passport">
                                        <FormControl
                                            error={
                                                !!errorText.passportNumberError
                                            }
                                            className="formcontrol_field input-field-passport"
                                            variant="filled"
                                        >
                                            <FilledInput
                                                id="cart-form-passportNumber"
                                                type="text"
                                                label="passportNumber"
                                                value={formData.passportNumber}
                                                onChange={changeFormData(
                                                    "passportNumber"
                                                )}
                                            />
                                            <FormHelperText className="helper-text">
                                                {errorText.passportNumberError}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-3">
                                <div className="citizen">
                                    <h3 className="citizen-title-main">
                                        Citizenship
                                    </h3>
                                    <div className="input-citizen">
                                        <FormControl
                                            error={!!errorText.citizenshipError}
                                            className="formcontrol_field input-field-citizen"
                                            variant="filled"
                                        >
                                            <FilledInput
                                                id="cart-form-citizenship"
                                                type="text"
                                                label="citizenship"
                                                value={formData.citizenship}
                                                onChange={changeFormData(
                                                    "citizenship"
                                                )}
                                            />
                                            <FormHelperText className="helper-text">
                                                {errorText.citizenshipError}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="date">
                                    <h3 className="date-title-main">
                                        Date of birth
                                    </h3>
                                    <div className="input-date">
                                        <FormControl
                                            error={!!errorText.dateOfBirthError}
                                            className="formcontrol_field input-field-date"
                                            variant="filled"
                                        >
                                            <FilledInput
                                                id="cart-form-dateOfBirth"
                                                type="date"
                                                label="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={changeFormData(
                                                    "dateOfBirth"
                                                )}
                                            />
                                            <FormHelperText className="helper-text">
                                                {errorText.dateOfBirthError}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-side-container">
                    <div className="chekout-container">
                        <div className="heading">
                            <img className="heading-star" src={star_url}></img>
                            <h3 className="heading-text">Checkout</h3>
                        </div>
                        <div className="row-1">
                            <div className="chekout-image">
                                <img
                                    className="product-image"
                                    src={
                                        location.state
                                            ? location.state.tripimageURL
                                            : ""
                                    }
                                ></img>
                            </div>
                            <div className="product-name">
                                <div className="agency-logo">
                                    <img
                                        className="agency-logo-main"
                                        src={
                                            location.state
                                                ? location.state.agencyLogo
                                                : ""
                                        }
                                    ></img>
                                </div>
                                <div className="product-name">
                                    <h4 className="product-name-main">
                                        {location.state
                                            ? location.state.tripName
                                            : "Destination not found"}
                                    </h4>
                                </div>
                            </div>
                            <div className="quantitty">
                                <h4 className="product-name-main">1 Person</h4>
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="heading">
                                <h3 className="heading-text"> Select date</h3>
                            </div>
                            <div className="dates">
                                <div className="date-col-1">
                                    <div className="date1">
                                        <h4>15th july 2023</h4>
                                    </div>
                                    <div className="date2">
                                        <h4>15th Nov 2023</h4>
                                    </div>
                                </div>
                                <div className="date-col-2">
                                    <div className="date3">
                                        <h4>1st Aug 2023</h4>
                                    </div>
                                    <div className="date4">
                                        <h4>1st Jan 2023</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-container">
                        <div className="heading">
                            <img className="heading-star" src={star_url}></img>
                            <h3 className="heading-text"> Payment</h3>
                        </div>
                        <div className="row-1">
                            <h3 className="trip-name">
                                {" "}
                                {location.state
                                    ? location.state.agencyName +
                                      " " +
                                      location.state.tripName +
                                      " | 1 Person"
                                    : "Destination not selected"}
                                {""}
                            </h3>
                            <h3 className="actual-price">
                                {location.state ? location.state.price : "***"}
                                {" ETH"}
                            </h3>
                        </div>
                        <div className="row-2">
                            <h3 className="international-tax">
                                {" "}
                                International Tax 5%{" "}
                            </h3>
                            <h3 className="tax-number">
                                {" "}
                                {"+"}
                                {location.state
                                    ? location.state.price * taxPercentage
                                    : "***"}{" "}
                                {" ETH"}
                            </h3>
                        </div>
                        <div className="row-3">
                            <h3 className="gas-fees"> Gas Fees </h3>
                            <h3 className="gas-fees-number">
                                {"+"} {gasFees} {" ETH"}
                            </h3>
                        </div>
                        <div className="divider"></div>
                        <div className="final-output">
                            <h3 className="grand-total"> Grand Total </h3>
                            <h3 className="final-price-number">
                                {" "}
                                {location.state
                                    ? location.state.price +
                                      location.state.price * taxPercentage
                                    : "***"}
                                {" ETH"}
                            </h3>
                        </div>
                        <div className="pay-btn">
                            <Button
                                variant="contained"
                                className="pay"
                                onClick={sendPurchaseRequest}
                            >
                                Pay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
