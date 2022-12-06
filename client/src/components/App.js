import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import  Home  from "./Home";
import { Cart } from "./Cart";
import { Product } from "./Product";
import Footer from "./Footer";
import "../styles/_commonFiles.scss";
import Header from "./Header";
import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Features/userSlice";
import { useEffect, useState } from "react";

//All routes are declared here
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
};
const App = () => {
    //Redux session varaible
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    //dispatch to access dispatch function from Redux store
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // const fetchUserAuth = async () => {
        //     try {
        //         setLoading(true);
        //         const response = await fetch("wandermission/user/isAuth");

        //         if (!response.ok) {
        //             return setLoading(false);
        //         }
        //         const resp = await response.json();

        //         console.log(resp);
        //         dispatch(
        //             signIn({
        //                 userid: resp.userid,
        //                 username: resp.username
        //             })
        //         );
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(true);
        //         console.log('Error while fetching use auth ', error);
        //         return;
        //     }
        // };

        // if (!isLoggedIn) {
        //     fetchUserAuth();
        // }
    }, []);

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
