import React, { useEffect, useState } from "react";
import "../styles/Header.scss";
import "../styles/_commonFiles.scss";
import { Link, NavLink } from "react-router-dom";
import { company_logo_url } from "../links";
import { useSelector } from "react-redux";

const Header = () => {
    //Redux session varaible
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    //State of Scroll, to track scroll position for header
    const [isScrolled, setIsScrolled] = useState(false);
    let parent = document.getElementById("root");

    //Scroll Listener which change state to track scroll
    const handleScroll = () => {
        if (parent.scrollTop > 0.1 * window.innerHeight) {
            if (isScrolled !== true) {
                setIsScrolled(true);
            }
        } else {
            if (isScrolled !== false) {
                setIsScrolled(false);
            }
        }
    };

    //useEffect hook
    //at mounting - adding scroll listener
    //at unmounting - removing scroll listener
    useEffect(() => {
        parent.addEventListener("scroll", handleScroll);

        return () => parent.removeEventListener("scroll", handleScroll);
    });

    return (
        <div className="header">
            <div
                className={
                    "header-container " + (isScrolled ? "header-scrolled" : "")
                }
            >
                <div className="header-left">
                    <Link to="/">
                        <img
                            className="header-logo"
                            src={company_logo_url}
                            alt="Wander mission logo"
                        />
                    </Link>
                </div>
                <nav className="header-navigation">
                    <div>
                        <NavLink to="/" className="font-primary">
                            Home
                        </NavLink>
                    </div>
                    {/* TODO - Make route for explore */}
                    {/* <div className="font-primary">
                        <Link to="/">Explore</Link>
                    </div> */}
                    {!isLoggedIn ? (
                        ""
                    ) : (
                        <div>
                            <Link to="/cart">Cart</Link>
                        </div>
                    )}
                    <div>
                        {
                            //If logged in, Set Username in profile badge
                            !isLoggedIn? (
                                <Link to="/login">Login</Link>
                            ) : ""
                        }
                    </div>
                    
                    <div>
                        {
                            //If logged in, Set Username in profile badge
                            !isLoggedIn? (
                                <Link to="/signup">Signup</Link>
                            ) : (
                                <Link to="/logout">
                                    {user.username}
                                </Link>
                            )
                        }
                    </div>


                </nav>
            </div>
        </div>
    );
};

export default Header;
