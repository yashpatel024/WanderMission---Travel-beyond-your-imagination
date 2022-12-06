import React, { useEffect, useState } from "react";

export function GetImageURLbyID(service_id) {

    const [items, setItems] = useState([])
    const link = '/wandermission/service/get/' + service_id;

    useEffect(() => {
        fetch(link)
            .then((Response) => Response.json())
            .then((service) => {
                const data = JSON.parse(JSON.stringify(service))
                setItems(data)
            });
    });

    return (
        items.map((value) => (
            <img key={value._id} className="travelPartner-logo" src={value.trip_logo} />
        ))

    );

}

