import React, { useEffect, useState } from "react";
import Trip from "./Trip";
import { longlink } from "./Trip";

const ShortTrips = () => {
    
    const [items, setItems] = useState([])
    //To Fetch MetaData JSON

    useEffect(() => {
        fetch(longlink)
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
                        agency_id={value.agency_id}
                        tripName={value.trip_name}
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
