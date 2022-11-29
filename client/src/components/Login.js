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
        username: "",
        password: "",
        showPassword: false,
    };

    const initialErrorText = {
        usernameError: "",
        passwordError: "",
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
        if(user != null){
            navigate("/home");
        }
        fetch(user_details_json)
            .then((Response) => Response.json())
            .then((data) => {
                userJsonObj = data;
            });
    });

    //On Click of Sign In
    const sendLoginRequest = (e) => {
        e.preventDefault();
        let usernameError = "",
            passwordError = "";

        //Check for blank values
        usernameError = !formData.username ? "Please enter username" : "";
        passwordError = !formData.password ? "Please enter password" : "";

        setErrorText({
            usernameError: usernameError,
            passwordError: passwordError,
        });

        if (!formData.username || !formData.password) {
            return;
        }

        //User search
        let userFound = false;
        userJsonObj.users.forEach((element) => {
            if (formData.username == element.username) {
                //Check if both hase of password are same or not
                if (
                    CommonFunctions.hashCode(formData.password) ==
                    element.hash_password
                ) {
                    //use login reducer to add username in Redux session store
                    dispatch(
                        login({
                            username: formData.username,
                        })
                    );
                    //Navigate to home once successfully submitted
                    navigate("/home");
                } else {
                    //If both hashcode doesn't match
                    setErrorText({
                        usernameError: "",
                        passwordError: "User credential is incorrect",
                    });
                }
                userFound = true;
            }
        });

        if (!userFound) {
            //If no user found with entered username
            setErrorText({
                usernameError: "User not found",
                passwordError: "",
            });
        }
    };

    return (
        <div className="login-area">
            <form className="form" method="POST" onSubmit={sendLoginRequest}>
                {/* UserName field */}
                <FormControl
                    error={!!errorText.usernameError}
                    className="formcontrol_field"
                    variant="filled"
                >
                    <InputLabel htmlFor="login-form-email">Username</InputLabel>
                    <FilledInput
                        id="login-form-email"
                        type="text"
                        label="emailId"
                        value={formData.username}
                        onChange={changeFormData("username")}
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
                    {/* Username error text */}
                    <FormHelperText className="helper-text">
                        {errorText.usernameError}
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
