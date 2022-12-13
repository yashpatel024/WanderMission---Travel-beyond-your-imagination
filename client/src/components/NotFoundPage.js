import "../styles/_commonFiles.scss";
import "../styles/NotFoundPage.scss";
import { spaceman_url } from "../links";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";

const NotFoundPage = () => {
    let navigate = useNavigate();
    return (
        <div className="container-notfound">
            <div className="lost">
                <h3 className="lost-text">
                    Are You lost?
                </h3>
            </div>
            <div className="a404">
                <h3 className="a404-text">
                    404
                </h3>
            </div>
            <div className="cry">
                <h3 className="cry-text">
                    Don't Cry
                </h3>
                <Button
                    variant="contained"
                    className="spaceman-btn"
                    onClick={navigate('/')}
                >
                    Home
                </Button>
            </div>
            <div className="spaceman">
                <img src={spaceman_url}/>
            </div>
        </div >
    );
}

export default NotFoundPage;