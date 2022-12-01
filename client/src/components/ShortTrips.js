import React, { useEffect, useState } from "react";
import Trip from "./Trip";
import { trip_metadata_json } from "../links";
import { ShortTripsObject } from "./Generic/TripConstant";

const ShortTrips = async () => {
    let shortTripDetails;
    const apiurl = 'http://localhost:5000/service'
    const [showTrips, setShowTrips] = useState()
    let displayData

    //To Fetch MetaData JSON
    // useEffect(() => {
    //     fetch(trip_metadata_json)
    //         .then((Response) => Response.json())
    //         .then((data) => {
    //             shortTripDetails = data.trip_metadata.short_trips_metadata;
    //         });
    // });

    const response = await fetch(apiurl)
    const responseData = await response.json()
    displayData = responseData.map(function (value) {

        return (
            <ul>



                <Trip
                    tripimageURL={value.tripImageURL}
                    agencyLogo={value.travelPartnerLogoURL}
                    tripName={value.destinationName}
                    agencyName={value.travelPartnerName}
                    stars={value.reviewStar}
                    description={value.tripDescription}
                    travelTime={value.travelTime}
                    stayTime={value.stayTime}
                    price={value.tripPrice}
                    key={key}
                    id={value.tripId}
                />


            </ul>
        );
    })
};

export default ShortTrips;
