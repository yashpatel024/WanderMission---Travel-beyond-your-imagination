import "../styles/pay.scss";
import React, { useEffect, useState } from "react";
import { copyicon, hashqr, finished, loading } from "../links";
import { useLocation, useNavigate } from "react-router-dom";


export function Pay() {

    const location = useLocation();
    let navigate = useNavigate();

    const [counter, setCounter] = React.useState(300);
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const [spinner1, setSpinner1] = useState(loading);
    const [spinner2, setSpinner2] = useState(loading);
    const [spinner3, setSpinner3] = useState(loading);

    useEffect(() => {
        setTimeout(() => setSpinner1(finished), 10000);
        setTimeout(() => setSpinner2(finished), 20000);
        setTimeout(() => setSpinner3(finished), 30000);
        setTimeout(() => navigate("/celebration"), 35000);
        
    });


    return (
        <div className="container-pay">
            <div className="right-side-container">
                <div className="payment-status">
                    <div className="waiting">
                        <div className="waiting-icon">
                            <img className="icon" src={spinner1} />
                        </div>
                        <div className="waiting-text">
                            Waiting For Payment
                        </div>
                    </div>
                    <div className="spacer1"></div>
                    <div className="confirm">
                        <div className="confirm-icon">
                            <img className="icon" src={spinner2} />
                        </div>
                        <div className="confirm-text">
                            Confirming on Blockchain
                        </div>
                    </div>
                    <div className="spacer2"></div>
                    <div className="verify">
                        <div className="verify-icon">
                            <img className="icon" src={spinner3} />
                        </div>
                        <div className="verify-text">
                            Verifying Payment
                        </div>
                    </div>

                </div>

            </div>
            <div className="left-side-container">
                <div className="row1-payment">
                    <div className="payment-number">
                        <h3 className="number-eth">
                            {location.state.totalAmount} ETH
                        </h3>
                    </div>
                    <div className="usd-prie">
                        <h3 className="usd-price-main">
                            ~{location.state.totalAmount * 1282.48} USD
                        </h3>
                    </div>
                    <div className="rate-counter">
                        <h3 className="update-text">
                            Rate will update in
                        </h3>
                        <h3 className="update-counter">
                            {counter} Seconds
                        </h3>
                    </div>
                </div>
                <div className="row2-hash">
                    <div className="warning-sign">
                        <h3 className="warning-text">
                            Send Only ETH to this address, or Risk losing your assets
                        </h3>
                    </div>
                    <div className="hash-address">
                        <h3 className="wallet-address">
                            0x66BFD575182976674A0c67a066802D878937a5c5
                        </h3>
                        <img className="copyicon" src={copyicon} onClick={() => navigator.clipboard.writeText('0x66BFD575182976674A0c67a066802D878937a5c5')} />
                    </div>
                    <div className="qrandid">
                        <div className="col1">
                            <img className="hashqr" src={hashqr} />
                        </div>
                        <div className="col2">
                            <h3 className="paymentid">
                                <h3 className="paymentid-text">
                                    Payment ID
                                </h3>
                                <h3 className="paymentid-id">
                                    4EBD020883285D698C44EC50939C0967
                                </h3>
                            </h3>
                        </div>

                    </div>

                </div>
            </div>

        </div >
    );
}
