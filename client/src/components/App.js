import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { Product } from "./Product";
import Footer from "./Footer";
import "../styles/_commonFiles.scss";
import Header from "./Header";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { selectUser } from "../Features/userSlice";

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
    const user = useSelector(selectUser);

    return (
        <>
            <Header userLoggedIn={user} />
            <AppRoutes />
            <Footer userLoggedIn={user} />
        </>
    );
};

export default App;
