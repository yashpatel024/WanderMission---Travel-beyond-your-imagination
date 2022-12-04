import "../styles/_commonFiles.scss";
import "../styles/Home.scss";
import React from "react";
import ShortTrips from "./ShortTrips";
import { spaceman_url } from "../links";
import { star_url } from "../links";
import { hero_grad_url } from "../links";
import { hero_ellipse_url } from "../links";
import LongTrips from "./LongTrips";


export function Home() {
    return (
        // main container
        <div className="container">
            {/* wrapper/start for hero section */}
            <div className="hero-wrapper">
                {/* background shape */}
                <div className="background-shape">
                    <img className="ellipse" src={hero_ellipse_url}></img>
                </div>
                {/* background gradient */}
                <div className="background-gradient">
                    <img
                        className="gradient"
                        src={hero_grad_url}
                        alt="gradient"
                    ></img>
                </div>
                {/* hero text */}
                <div className="text">
                    {/* helper top text */}
                    <h4 className="top-text">Satisfy Your</h4>
                    {/* Main hero text */}
                    <h1 className="main-text">Wander Lust</h1>
                    {/* decorative star */}
                    <div className="star-container">
                        <img className="star" src={star_url} alt="star"></img>
                    </div>
                </div>
                {/* hero image */}
                <div className="spaceman-container">
                    <img
                        className="spaceman"
                        src={spaceman_url}
                        alt="spaceman"
                    ></img>
                </div>
            </div>
            {/* end of the hero section */}
            <div className="wrapper-short_trips">
                <div className="background">
                    <div className="heading-container">
                        <img
                            className="heading-decoration"
                            src={star_url}
                            alt="star"
                        ></img>
                        <h4 className="section-heading">Short trips</h4>
                    </div>
                    <div className="services">
                        <ShortTrips/>
                    </div>
                </div>
            </div>
            <div className="wrapper-short_trips">
                <div className="background">
                    <div className="heading-container">
                        <img
                            className="heading-decoration"
                            src={star_url}
                            alt="star"
                        ></img>
                        <h4 className="section-heading">Long trips</h4>
                    </div>
                    <div className="services">
                        <LongTrips/>
                    </div>
                </div>
            </div>
        </div>
    );
}
