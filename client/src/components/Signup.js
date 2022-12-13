import "../styles/_commonFiles.scss";
import "../styles/Login.scss";
import { Link } from "react-router-dom";

import {
    hero_grad_url,
    spaceman_url,
} from "../links";
import { useEffect, useState } from "react";
import {
    Button,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function SignupForm() {
    //Redux session varaible
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    //navigate obj for navigation between predefined routes
    let navigate = useNavigate();

    //Initial data for state
    const initialFormData = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        showPassword: false,
    };

    const initialErrorText = {
        nameError: "",
        emailError: "",
        passwordError: "",
        fetchError: false,
        fetchErrorMessage: ""
    };

    //State initialization for form data and error messages
    const [formData, setFormData] = useState({ ...initialFormData });
    const [errorText, setErrorText] = useState({ ...initialErrorText });

    //On change of inputfield
    const changeFormData = (prop) => (e) => {
        setFormData({ ...formData, [prop]: e.target.value });
    };

    //Eye Icon handle for password field
    const handleClickShowPassword = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword,
        });
    };

    //To prevent default action on press of mouse down button
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    //To access userCredentials at mounting
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    });

    //On Click of Sign Up
    const sendLoginRequest = async (e) => {
        e.preventDefault();
        let emailError = "",
            passwordError = "",
            nameError = "";

        //Check for blank values
        nameError = !formData.password ? "Please enter name" : "";
        emailError = !formData.email ? "Please enter email" : "";
        passwordError = !formData.password ? "Please enter password" : "";

        setErrorText({
            emailError: emailError,
            passwordError: passwordError,
            nameError: nameError,
        });

        if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
            return;
        }

        try {
            const res = await fetch('/wandermission/user/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password
                }),
            })

            const resp = await res.json();

            if (!res.ok) {
                const error = resp;
                setErrorText({
                    nameError: nameError,
                    emailError: emailError,
                    passwordError: passwordError,
                    fetchError: true,
                    fetchErrorMessage: error.message
                });

                return;
            }

            //Navigate to login page
            navigate("/login");
        } catch (error) {
            setErrorText({
                nameError: nameError,
                emailError: emailError,
                passwordError: passwordError,
                fetchError: true,
                fetchErrorMessage: "Problem with server, Please try again!"
            });
            return console.log(error);
        }
    };

    return (
        <div className="login-area signup-area">
            <form className="form" method="POST" onSubmit={sendLoginRequest}>
                {/* First Name field */}
                <FormControl
                    error={!!errorText.nameError}
                    className="formcontrol_field"
                    variant="filled"
                >
                    <InputLabel htmlFor="login-form-email">First Name</InputLabel>
                    <FilledInput
                        id="login-form-email"
                        type="text"
                        label="first name"
                        value={formData.firstname}
                        onChange={changeFormData("firstname")}
                        endAdornment={
                            <IconButton
                                aria-label="user icon"
                                edge="end"
                                disabled
                            >
                                #
                            </IconButton>
                        }
                    />
                    {/* name error text */}
                    <FormHelperText className="helper-text">
                        {errorText.nameError}
                    </FormHelperText>
                </FormControl>
                
                {/* Last Name field */}
                <FormControl
                    error={!!errorText.nameError}
                    className="formcontrol_field"
                    variant="filled"
                >
                    <InputLabel htmlFor="login-form-email">Last Name</InputLabel>
                    <FilledInput
                        id="login-form-email"
                        type="text"
                        label="last name"
                        value={formData.lastname}
                        onChange={changeFormData("lastname")}
                        endAdornment={
                            <IconButton
                                aria-label="user icon"
                                edge="end"
                                disabled
                            >
                                #
                            </IconButton>
                        }
                    />
                    {/* name error text */}
                    <FormHelperText className="helper-text">
                        {errorText.nameError}
                    </FormHelperText>
                </FormControl>

                {/* email field */}
                <FormControl
                    error={!!errorText.emailError}
                    className="formcontrol_field"
                    variant="filled"
                >
                    <InputLabel htmlFor="login-form-email">Email</InputLabel>
                    <FilledInput
                        id="login-form-email"
                        type="text"
                        label="emailId"
                        value={formData.email}
                        onChange={changeFormData("email")}
                        endAdornment={
                            <IconButton
                                aria-label="email icon"
                                edge="end"
                                disabled
                            >
                                @
                            </IconButton>
                        }
                    />
                    {/* email error text */}
                    <FormHelperText className="helper-text">
                        {errorText.emailError}
                    </FormHelperText>
                </FormControl>

                {/* Password field */}
                <FormControl
                    error={!!errorText.passwordError}
                    className="formcontrol_field"
                    variant="filled"
                >
                    <InputLabel htmlFor="login-form-password">
                        Password
                    </InputLabel>
                    <FilledInput
                        id="login-form-password"
                        type={formData.showPassword ? "text" : "password"}
                        value={formData.password}
                        label="password"
                        onChange={changeFormData("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {formData.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {/* Password error text */}
                    <FormHelperText className="helper-text">
                        {errorText.passwordError}
                    </FormHelperText>
                    {errorText.fetchError && (
                        <FormHelperText className="helper-text">{errorText.fetchErrorMessage}</FormHelperText>
                    )}
                </FormControl>

                <Button
                    className="sign-in-button"
                    variant="contained"
                    component="label"
                >
                    SIGN UP
                    <input hidden type="submit" />
                </Button>
                
                <p className="login-here">If you already registered login here</p>

                <Link to="/login">
                    <Button className="sign-in-button-inverse"
                    variant="contained"
                    component="label"
                    >
                        Login
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export function Signup() {
    return (
        <div className="login">
            <div className="login-container">
                {/* Login form on left side */}
                <div className="login-form-container">
                    <SignupForm />
                </div>

                {/* Graphics on right side */}
                <div className="background-graphics">
                    <img
                        className="spaceman-image"
                        src={spaceman_url}
                        alt="spaceman"
                    />
                    <div className="large-circle" />
                    <img
                        className="background-blur"
                        src={hero_grad_url}
                        alt="background-blur"
                    />
                    <div className="small-circle" />
                </div>
            </div>
        </div>
    );
}
