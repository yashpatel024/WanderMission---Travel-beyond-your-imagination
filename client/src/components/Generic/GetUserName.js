import React, { useEffect, useState } from "react";

export function GetUserName(user_id) {

    const [items, setItems] = useState([])
    const link = '/wandermission/user/get/'+user_id;

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
            <div><h1>{value.firstname}</h1></div>
        ))

    );

}