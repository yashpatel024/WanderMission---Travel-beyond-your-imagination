import React, { useEffect, useState } from "react";
import Trip from "./Trip";
import {shortlink} from "./Trip";

const ShortTrips = () => {
    const [items, setItems] = useState([])
    //To Fetch MetaData JSON

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch(shortlink);

            const resp = await response.json();
            setItems(resp)
        }

        if(items.length <=0 ){
            fetchTrip();
        }            
    });

    
    return (
        <ul >
            {
                //Mapping over MetaDataObject
                items.map((value) => (
                    <Trip
                        tripimageURL={value.trip_logo}
                        key = {value._id}
                        agency_id={value.agency_id}
                        tripName={value.trip_name}
                        stars={value.rating}
                        description={value.service_description}
                        userComments={value.comments}
                        travelTime={value.travel_time}
                        stayTime={value.stay_time}
                        price={value.price}
                        service_id={value._id}
                    />
                ))
            }
        </ul>
    );
};

export default ShortTrips;