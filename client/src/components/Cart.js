import "../styles/_commonFiles.scss";
import "../styles/cart.scss";
import { GetCartData } from "./Generic/getCartData";
import { GetImageURLbyID } from "./Generic/getImageURLbyID";
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
import CartServices from "./CartServices";

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

    const [services, setServices] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [totalAmount, setTotalAmount] = useState(0);

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

        const calculateCount = () => {
            services.forEach(element => {
                setTotalAmount(totalAmount + (element.quantity * element.price));
            });
        }

        fetchServiceDetails();

        if (totalAmount == 0) {
            calculateCount();
        }
    });

    //On Click of Pay
    const sendPurchaseRequest = (e) => { };

    //for selecting date
    const [style1, setStyle1] = useState("date1");
    const [style2, setStyle2] = useState("date2");
    const [style3, setStyle3] = useState("date3");
    const [style4, setStyle4] = useState("date4");
    const changeStyle1 = () => {
        if (style1 == "date1") {
            setStyle1("date1Active");
        } else {
            setStyle1("date1");
        }
    };
    const changeStyle2 = () => {
        if (style2 == "date2") {
            setStyle2("date2Active");
        } else {
            setStyle2("date2");
        }
    };
    const changeStyle3 = () => {
        if (style3 == "date3") {
            setStyle3("date3Active");
        } else {
            setStyle3("date3");
        }
    };
    const changeStyle4 = () => {
        if (style4 == "date4") {
            setStyle4("date4Active");
        } else {
            setStyle4("date4");
        }
    };

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
                        <div className="row-2">
                            <div className="heading">
                                <h3 className="heading-text"> Select date</h3>
                            </div>
                            <div className="dates">
                                <div className="date-col-1">
                                    <div className={style1} onClick={changeStyle1}>
                                        <h4>15th july 2023</h4>
                                    </div>
                                    <div className={style2} onClick={changeStyle2}>
                                        <h4>15th Nov 2023</h4>
                                    </div>
                                </div>
                                <div className="date-col-2">
                                    <div className={style3} onClick={changeStyle3}>
                                        <h4>1st Aug 2023</h4>
                                    </div>
                                    <div className={style4} onClick={changeStyle4}>
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
                                Total charge
                            </h3>
                            <h3 className="actual-price">
                                {totalAmount != 0 ? totalAmount : "***"}
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
                                {totalAmount != 0 ? (totalAmount * taxPercentage) / 100 : "***"}{" "}
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
                                {totalAmount != 0 ? totalAmount + (totalAmount * taxPercentage) / 100 : "***"}{" "}
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
