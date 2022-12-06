import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../Features/userSlice";
// import { selectUser } from "../Features/userSlice";
import "../styles/logout.scss";

const Logout = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    console.log(isLoggedIn);
    const dispatch = useDispatch();

    //Redux session varaible
    const user = useSelector((state) => state.user);

    // const user = useSelector(selectUser);
    let navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/wandermission/user/logout', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
            })

            const resp = await res.json();
            
            if (!res.ok) {
                const error = resp;
                return;
            }
        }catch(error){
            console.log(error.message);
        }
        dispatch(signOut());
        navigate("/login");
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
