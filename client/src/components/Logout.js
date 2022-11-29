import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../Features/userSlice";
import "../styles/logout.scss";

const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    const logout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="container">
            <form className="logout">
                <h1 className="welcome">
                    Welcome{" "}
                    <span className="loggedin_username">{user.username}</span>!
                </h1>
                <button className="logout_username" onClick={logout}>
                    Log out
                </button>
            </form>
        </div>
    );
};

export default Logout;
