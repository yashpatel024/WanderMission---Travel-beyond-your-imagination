import React from "react";
import Trip from "./Trip";
import { LongTripsObject } from "./Generic/TripConstant";

const LongTrips = () => {
    return (
        <ul>
            {
                //Mapping over MetaDataObject
                LongTripsObject.map((value, key) => (
                    <Trip
                        tripimageURL={value.tripImageURL}
                        agencyLogo={value.travelPartnerLogoURL}
                        tripName={value.destinationName}
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

export default LongTrips;
