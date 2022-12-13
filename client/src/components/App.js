import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import Home from "./Home";
import { Cart } from "./Cart";
import { Product } from "./Product";
import Footer from "./Footer";
import "../styles/_commonFiles.scss";
import Header from "./Header";
import Logout from "./Logout";
import { Pay } from "./pay";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Features/userSlice";
import { useEffect, useState } from "react";
import { Celebration } from "./celebration";
import NotFoundPage from "./NotFoundPage";

//All routes are declared here
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/celebration" element={<Celebration />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

const App = () => {
    //Redux session varaible
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    //dispatch to access dispatch function from Redux store
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    return (
        <>
            {isLoading ? "...loading" :
                <>
                    <Header />
                    <AppRoutes />
                    <Footer />
                </>
            }
        </>
    );
};

export default App;
