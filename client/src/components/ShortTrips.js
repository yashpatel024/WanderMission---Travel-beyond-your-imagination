import React, { useEffect } from "react";
import Trip from "./Trip";
import { trip_metadata_json } from "../links";
import { ShortTripsObject } from "./Generic/TripConstant";

const ShortTrips = () => {
    let shortTripDetails;

    //To Fetch MetaData JSON
    useEffect(() => {
        fetch(trip_metadata_json)
            .then((Response) => Response.json())
            .then((data) => {
                shortTripDetails = data.trip_metadata.short_trips_metadata;
            });
    });

    return (
        <ul>
            {
                //Mapping over MetaDataObject
                ShortTripsObject.map((value, key) => (
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
                ))
            }
        </ul>
    );
};

export default ShortTrips;
