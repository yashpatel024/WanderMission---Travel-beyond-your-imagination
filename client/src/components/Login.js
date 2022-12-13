import "../styles/_commonFiles.scss";
import "../styles/Login.scss";
import { Link } from "react-router-dom";

import {
    hero_grad_url,
    spaceman_url,
    user_details_json,
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
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Features/userSlice";
import CommonFunctions from "./Generic/CommonFunctions";


const fetchUserAuth = async () => {
    try {
        const response = await fetch("wandermission/user/isAuth");

        if (!response.ok) {
            return;
        }
        const resp = await response.json();
        return resp;
    } catch (error) {
        console.log('Error while fetching use auth ', error);
        return;
    }
};

function LoginForm() {
    //Redux session varaible
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    //dispatch to access dispatch function from Redux store
    const dispatch = useDispatch();

    //Variable declaration
    let userJsonObj;

    //navigate obj for navigation between predefined routes
    let navigate = useNavigate();

    //Initial data for state
    const initialFormData = {
        email: "",
        password: "",
        showPassword: false,
    };

    const initialErrorText = {
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

    //On Click of Sign In
    const sendLoginRequest = async (e) => {
        e.preventDefault();
        let emailError = "",
            passwordError = "";

        //Check for blank values
        emailError = !formData.email ? "Please enter email" : "";
        passwordError = !formData.password ? "Please enter password" : "";

        setErrorText({
            emailError: emailError,
            passwordError: passwordError,
        });

        if (!formData.email || !formData.password) {
            return;
        }

        try {
            const res = await fetch('/wandermission/user/signin', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            })

            const resp = await res.json();

            if (!res.ok) {
                const error = resp;
                setErrorText({
                    emailError: emailError,
                    passwordError: passwordError,
                    fetchError: true,
                    fetchErrorMessage: error.message
                });

                return;
            }

            const userData = await fetchUserAuth();

            if (!userData) {
                setErrorText({
                    emailError: emailError,
                    passwordError: passwordError,
                    fetchError: true,
                    fetchErrorMessage: "Authentication error, Please try again"
                });
            }

            //use login reducer to add email in Redux session store
            dispatch(
                signIn({
                    userid: userData.userid,
                    username: userData.username
                })
            );

            //TODO - navigate to history page, where we came from
            //Navigate to home page
            navigate("/home");
        } catch (error) {
            setErrorText({
                emailError: emailError,
                passwordError: passwordError,
                fetchError: true,
                fetchErrorMessage: "Problem with server, Please try again!"
            });
            return console.log(error);
        }
    };

    return (
        <div className="login-area">
            <form className="form" method="POST" onSubmit={sendLoginRequest}>
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
                    SIGN IN
                    <input hidden type="submit" />
                </Button>
                <p className="login-here">New user signup here</p>

                <Link to="/signup">
                    <p className="sign-in-text">Signup</p>
                </Link>
            </form>
        </div>
    );
}

export function Login() {
    return (
        <div className="login">
            <div className="login-container">
                {/* Login form on left side */}
                <div className="login-form-container">
                    <LoginForm />
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
