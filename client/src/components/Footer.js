import "../styles/_commonFiles.scss";
import "../styles/Footer.scss";
import { Link } from "react-router-dom";
import { company_logo_url } from "../links";
import { useSelector } from "react-redux";

const Footer = () => {
    //Redux session varaible
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    return (
        <div className="footer">
            <div className="footer-container">
                <img
                    className="footer-logo"
                    src={company_logo_url}
                    alt="Wander mission logo"
                />
                <div className="footer-navigation">
                    <div className="footer-navigation-1">
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <div>
                            <Link to="/">Explore</Link>
                        </div>
                        <div>
                            <Link to="/cart">Cart</Link>
                        </div>
                    </div>

                    <div className="login-btn">
                        {
                            //If logged in, Set Username in profile badge
                            !isLoggedIn ? (
                                <Link to="/login">Login</Link>
                            ) : (
                                <Link to="/logout">
                                    {user.username}
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
