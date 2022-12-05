import React, { useEffect, useState } from "react";

export function GetAgencyURL(agency_id) {

    const [items, setItems] = useState([])
    const link = 'http://localhost:5000/wandermission/agency/a-id/' + agency_id;

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
            <img key={value._id} className="travelPartner-logo" src={value.agency_logo} />
        ))

    );

}

