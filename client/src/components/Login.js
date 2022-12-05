import "../styles/_commonFiles.scss";
import "../styles/Login.scss";
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
import { login, selectUser } from "../Features/userSlice";
import CommonFunctions from "./Generic/CommonFunctions";

function LoginForm() {
    //Redux session varaible
    const user = useSelector(selectUser);

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

    //dispatch to access dispatch fun. from Redux store
    const dispatch = useDispatch();

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
        // if(user != null){
        //     navigate("/home");
        // }
        // fetch(user_details_json)
        //     .then((Response) => Response.json())
        //     .then((data) => {
        //         userJsonObj = data;
        //     });
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
            const res = await fetch('http://localhost:5000/wandermission/user/signin', {
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

            console.log(resp)
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
        } catch (error) {
            setErrorText({
                emailError: emailError,
                passwordError: passwordError,
                fetchError: true,
                fetchErrorMessage: "Problem with server, Please try again!"
            });
            return console.log(error);
        }
        //User search
        // let userFound = false;
        // userJsonObj.users.forEach((element) => {
        //     if (formData.email == element.email) {
        //         //Check if both hase of password are same or not
        //         if (
        //             CommonFunctions.hashCode(formData.password) ==
        //             element.hash_password
        //         ) {
        //             //use login reducer to add email in Redux session store
        //             dispatch(
        //                 login({
        //                     email: formData.email,
        //                 })
        //             );
        //             //Navigate to home once successfully submitted
        //             navigate("/home");
        //         } else {
        //             //If both hashcode doesn't match
        //             setErrorText({
        //                 emailError: "",
        //                 passwordError: "User credential is incorrect",
        //             });
        //         }
        //         userFound = true;
        //     }
        // });

        // if (!userFound) {
        //     //If no user found with entered email
        //     setErrorText({
        //         emailError: "User not found",
        //         passwordError: "",
        //     });
        // }
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
                </FormControl>
                {errorText.fetchError && (
                    <FormHelperText className="helper-text">{errorText.fetchErrorMessage}</FormHelperText>
                )}
                <Button
                    className="sign-in-button"
                    variant="contained"
                    component="label"
                >
                    SIGN IN
                    <input hidden type="submit" />
                </Button>
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
