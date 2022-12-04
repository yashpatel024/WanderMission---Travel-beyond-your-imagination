import React, { useEffect, useState } from "react";
import Trip from "./Trip";

const ShortTrips = () => {
    
    const [items, setItems] = useState([])
    //To Fetch MetaData JSON


    useEffect(() => {
        fetch('http://localhost:5000/wandermission/service/longTrips')
            .then((Response) => Response.json())
            .then((service) => {
                    const data = JSON.parse(JSON.stringify(service))
                    setItems(data)
            });
            
    });

    
    return (
        <ul >
            {
                //Mapping over MetaDataObject
                items.map((value) => (
                    <Trip
                        tripimageURL={value.trip_logo}
                        key = {value.service_id}
                        // agency_logo={value.travelPartnerLogoURL}
                        tripName={value.trip_name}
                        // trip_nae={value.travelPartnerName}
                        stars={value.rating}
                        description={value.service_description}
                        travelTime={value.travel_time}
                        stayTime={value.stay_time}
                        price={value.price}
                        service_id={value.tripId}
                    />
                ))
            }
        </ul>
    );
};

export default ShortTrips;
